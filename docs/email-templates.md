# Email Templates Documentation

## Overview

This document covers the AWS SES email setup and templates for the MUNET web platform.

## AWS SES Setup Requirements

### 1. Verify Domain/Email Addresses

Before sending emails, you must verify sender identities in AWS SES:

```bash
# Verify a domain (recommended for production)
aws ses verify-domain-identity --domain museomunet.com

# Or verify individual email addresses (for development)
aws ses verify-email-identity --email-address no-reply@museomunet.com
```

### 2. Move Out of Sandbox (Production)

By default, SES is in sandbox mode. To send to any recipient:

1. Go to AWS SES Console → Account dashboard
2. Click "Request production access"
3. Fill out the request form with use case details
4. Wait for AWS approval (usually 24-48 hours)

### 3. Environment Variables

Set the following environment variables for Lambda functions:

```bash
AWS_REGION=us-east-1
SES_SENDER_EMAIL=no-reply@museomunet.com
ORDERS_TABLE=munet-orders
```

### 4. IAM Permissions

Lambda functions need the following SES permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

## Email Templates

### Order Confirmation Email

**Location:** `/lambda/emails/orderConfirmation.ts`

**Purpose:** Sent after successful payment confirmation via Stripe webhook.

#### Template Variables

| Variable | Type | Description |
|----------|------|-------------|
| `orderId` | string | Unique order reference (e.g., "MUN-ABC123-XYZ") |
| `customerName` | string | Customer's full name |
| `customerEmail` | string | Customer's email address |
| `visitDate` | string | Formatted visit date (e.g., "Sábado, 15 de Marzo 2026") |
| `tickets` | array | Array of ticket objects |
| `tickets[].type` | string | Ticket type name (e.g., "General", "Niño") |
| `tickets[].quantity` | number | Number of tickets |
| `tickets[].unitPrice` | number | Price per ticket in MXN |
| `tickets[].subtotal` | number | Subtotal for this ticket type |
| `totalAmount` | number | Total order amount in MXN |
| `qrCodeBase64` | string | Base64-encoded QR code data URL |
| `purchaseDate` | string | Formatted purchase date/time |

#### Usage Example

```typescript
import { generateOrderConfirmationEmail, OrderEmailData } from './emails/orderConfirmation';
import { sendEmail } from './emails/sendEmail';

const orderData: OrderEmailData = {
  orderId: 'MUN-ABC123-XYZ',
  customerName: 'Juan García',
  customerEmail: 'juan@example.com',
  visitDate: 'Sábado, 15 de Marzo 2026',
  tickets: [
    { type: 'General', quantity: 2, unitPrice: 120, subtotal: 240 },
    { type: 'Niño (3-12)', quantity: 1, unitPrice: 60, subtotal: 60 },
  ],
  totalAmount: 300,
  qrCodeBase64: 'data:image/png;base64,...',
  purchaseDate: '10 de Marzo 2026, 14:30 hrs',
};

const htmlBody = generateOrderConfirmationEmail(orderData);
const textBody = generateOrderConfirmationText(orderData);

await sendEmail({
  to: orderData.customerEmail,
  subject: `Confirmación de Compra - MUNET #${orderData.orderId}`,
  htmlBody,
  textBody,
});
```

## Send Email Utility

**Location:** `/lambda/emails/sendEmail.ts`

### Functions

#### `sendEmail(params)`

Sends an email via AWS SES.

**Parameters:**
- `to`: string | string[] - Recipient email address(es)
- `subject`: string - Email subject line
- `htmlBody`: string - HTML content
- `textBody`: string (optional) - Plain text fallback
- `from`: string (optional) - Sender email (defaults to env var)
- `replyTo`: string (optional) - Reply-to address

**Returns:** `Promise<SendEmailResult>`

#### `sendOrderConfirmationEmail(to, orderId, htmlBody, textBody?)`

Convenience wrapper for order confirmation emails.

#### `isValidEmail(email)`

Validates email format.

## QR Code Generation

**Location:** `/lambda/utils/qrCode.ts`

QR codes contain a JSON payload with shortened keys to minimize QR complexity:

```json
{
  "o": "MUN-ABC123-XYZ",  // orderId
  "d": "2026-03-15",      // visitDate
  "t": 3,                  // ticketCount
  "c": "2026-03-10T14:30:00Z"  // createdAt
}
```

### Usage

```typescript
import { generateQRCode, QRCodeData } from './utils/qrCode';

const data: QRCodeData = {
  orderId: 'MUN-ABC123-XYZ',
  visitDate: '2026-03-15',
  ticketCount: 3,
};

const qrCodeDataUrl = await generateQRCode(data);
// Returns: "data:image/png;base64,..."
```

## Testing

### Local Testing (Development)

1. Use SES sandbox with verified test email addresses
2. Set environment variables:
   ```bash
   export AWS_REGION=us-east-1
   export SES_SENDER_EMAIL=your-verified@email.com
   ```

3. Create a test script:
   ```typescript
   import { generateOrderConfirmationEmail, OrderEmailData } from './emails/orderConfirmation';
   import { sendEmail } from './emails/sendEmail';
   import { generateQRCode } from './utils/qrCode';

   async function testEmail() {
     const qrCode = await generateQRCode({
       orderId: 'MUN-TEST-123',
       visitDate: '2026-03-15',
       ticketCount: 2,
     });

     const orderData: OrderEmailData = {
       orderId: 'MUN-TEST-123',
       customerName: 'Test User',
       customerEmail: 'your-verified@email.com',
       visitDate: 'Sábado, 15 de Marzo 2026',
       tickets: [
         { type: 'General', quantity: 2, unitPrice: 120, subtotal: 240 },
       ],
       totalAmount: 240,
       qrCodeBase64: qrCode,
       purchaseDate: new Date().toLocaleString('es-MX'),
     };

     const html = generateOrderConfirmationEmail(orderData);
     
     const result = await sendEmail({
       to: orderData.customerEmail,
       subject: 'Test - Confirmación MUNET',
       htmlBody: html,
     });

     console.log(result);
   }

   testEmail();
   ```

### Testing Checklist

- [ ] Email sends successfully in sandbox mode
- [ ] HTML renders correctly in major email clients (Gmail, Outlook, Apple Mail)
- [ ] Plain text version is readable
- [ ] QR code scans correctly
- [ ] All template variables render properly
- [ ] Spanish copy is correct with proper accents
- [ ] Mobile responsive (email renders well on phones)

## Integration with Stripe Webhooks

The email is triggered by the Stripe webhook handler after `checkout.session.completed`:

```typescript
// In webhook handler
import { generateOrderConfirmationEmail, generateOrderConfirmationText } from '../emails/orderConfirmation';
import { sendOrderConfirmationEmail } from '../emails/sendEmail';
import { generateQRCode } from '../utils/qrCode';
import { getOrder, markEmailSent, markQRCodeGenerated } from '../utils/orders';

async function handleCheckoutComplete(sessionId: string) {
  const order = await getOrder(sessionId);
  
  // Generate QR code
  const qrCode = await generateQRCode({
    orderId: order.orderId,
    visitDate: order.visitDate,
    ticketCount: order.tickets.reduce((sum, t) => sum + t.quantity, 0),
  });
  
  await markQRCodeGenerated(order.orderId);
  
  // Generate and send email
  const emailData = {
    ...order,
    qrCodeBase64: qrCode,
    purchaseDate: new Date(order.createdAt).toLocaleString('es-MX'),
  };
  
  const html = generateOrderConfirmationEmail(emailData);
  const text = generateOrderConfirmationText(emailData);
  
  await sendOrderConfirmationEmail(
    order.customerEmail,
    order.orderId,
    html,
    text
  );
  
  await markEmailSent(order.orderId);
}
```

## DynamoDB Table Schema

### Orders Table

**Table Name:** `munet-orders`

**Primary Key:** `orderId` (String)

**GSI:** `email-index` on `customerEmail`

**Attributes:**
```typescript
{
  orderId: string;           // PK - "MUN-XXXXX-XXXX"
  customerEmail: string;     // GSI
  customerName: string;
  visitDate: string;
  tickets: OrderTicket[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded' | 'used';
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  qrCodeGenerated: boolean;
  emailSent: boolean;
  createdAt: string;         // ISO 8601
  updatedAt: string;         // ISO 8601
}
```

## Troubleshooting

### Email Not Sending

1. Check SES sandbox status and verified addresses
2. Verify IAM permissions for Lambda
3. Check CloudWatch logs for errors
4. Ensure `AWS_REGION` matches SES region

### QR Code Not Generating

1. Verify `qrcode` package is installed
2. Check payload size (keep data minimal)
3. Ensure proper async/await handling

### Email Rendering Issues

1. Test with Litmus or Email on Acid
2. Use inline styles (external CSS won't work)
3. Test on multiple email clients
4. Ensure images are properly base64 encoded

---

*Last Updated: March 2026*
