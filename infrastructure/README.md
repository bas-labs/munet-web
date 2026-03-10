# MUNET AWS Infrastructure Setup

This document describes the AWS infrastructure required for the MUNET checkout flow.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              MUNET Checkout Flow                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Frontend (Amplify)                                                      │
│       │                                                                  │
│       ▼                                                                  │
│  API Gateway ─────────────────────────────────────────────────────────┐  │
│       │                                                               │  │
│       ├── POST /api/checkout/create-session                          │  │
│       │         │                                                     │  │
│       │         ▼                                                     │  │
│       │    Lambda: createCheckoutSession                             │  │
│       │         │                                                     │  │
│       │         ├── Creates Stripe Checkout Session                  │  │
│       │         ├── Stores pending order in DynamoDB                 │  │
│       │         └── Returns session URL to frontend                  │  │
│       │                                                               │  │
│       └── POST /api/checkout/webhook                                 │  │
│                 │                                                     │  │
│                 ▼                                                     │  │
│            Lambda: handleStripeWebhook                               │  │
│                 │                                                     │  │
│                 ├── Verifies Stripe signature                        │  │
│                 ├── Updates order status in DynamoDB                 │  │
│                 ├── Generates QR code                                │  │
│                 └── Sends confirmation email via SES                 │  │
│                                                                          │
│  DynamoDB: munet-orders                                                 │
│       │                                                                  │
│       └── Stores all order data                                         │
│                                                                          │
│  SES: Email notifications                                                │
│       │                                                                  │
│       └── Sends purchase confirmations                                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## 1. DynamoDB Table

### Table: `munet-orders`

**Create Table via AWS Console or CLI:**

```bash
aws dynamodb create-table \
  --table-name munet-orders \
  --attribute-definitions \
    AttributeName=orderId,AttributeType=S \
  --key-schema \
    AttributeName=orderId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

**Table Schema:**

| Attribute | Type | Description |
|-----------|------|-------------|
| orderId | String (PK) | UUID for the order |
| date | String | Visit date (YYYY-MM-DD) |
| tickets | Array | Array of ticket objects |
| totalAmount | Number | Total in MXN centavos |
| customerEmail | String | Customer email address |
| stripeSessionId | String | Stripe Checkout Session ID |
| stripePaymentIntent | String | Stripe Payment Intent ID |
| status | String | pending/completed/cancelled/expired |
| createdAt | String | ISO timestamp |
| completedAt | String | ISO timestamp (when paid) |
| qrCode | String | Access code for museum entry |

**Optional GSI for status queries:**

```bash
aws dynamodb update-table \
  --table-name munet-orders \
  --attribute-definitions AttributeName=status,AttributeType=S \
  --global-secondary-index-updates \
    "[{\"Create\":{\"IndexName\":\"status-index\",\"KeySchema\":[{\"AttributeName\":\"status\",\"KeyType\":\"HASH\"}],\"Projection\":{\"ProjectionType\":\"ALL\"}}}]" \
  --region us-east-1
```

## 2. Lambda Functions

### 2.1 createCheckoutSession

**Runtime:** Node.js 20.x
**Handler:** `dist/createCheckoutSession.handler`
**Timeout:** 30 seconds
**Memory:** 256 MB

**Environment Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| STRIPE_SECRET_KEY | Stripe secret key | sk_test_xxx / sk_live_xxx |
| FRONTEND_URL | Frontend URL for redirects | https://museomunet.com |
| DYNAMODB_ORDERS_TABLE | DynamoDB table name | munet-orders |

**IAM Policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:ACCOUNT_ID:table/munet-orders"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2.2 handleStripeWebhook

**Runtime:** Node.js 20.x
**Handler:** `dist/handleStripeWebhook.handler`
**Timeout:** 30 seconds
**Memory:** 256 MB

**Environment Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| STRIPE_SECRET_KEY | Stripe secret key | sk_test_xxx |
| STRIPE_WEBHOOK_SECRET | Webhook signing secret | whsec_xxx |
| DYNAMODB_ORDERS_TABLE | DynamoDB table name | munet-orders |
| SES_FROM_EMAIL | Verified sender email | boletos@museomunet.com |
| SES_REGION | SES region | us-east-1 |

**IAM Policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:UpdateItem",
        "dynamodb:GetItem"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:ACCOUNT_ID:table/munet-orders"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

## 3. API Gateway

### REST API: munet-api

**Endpoints:**

| Method | Path | Lambda | Auth |
|--------|------|--------|------|
| POST | /api/checkout/create-session | createCheckoutSession | None (CORS) |
| POST | /api/checkout/webhook | handleStripeWebhook | None (Stripe signature) |

### CORS Configuration (for create-session)

```
Access-Control-Allow-Origin: https://museomunet.com
Access-Control-Allow-Headers: Content-Type,Authorization
Access-Control-Allow-Methods: POST,OPTIONS
```

### Webhook Endpoint Configuration

**Important:** The webhook endpoint must pass the raw request body to Lambda for signature verification. Configure API Gateway with:

- **Integration type:** Lambda Proxy
- **Content handling:** Passthrough
- Do NOT enable any request transformations

## 4. SES Setup

### Verify Domain or Email

```bash
# Verify email (for testing)
aws ses verify-email-identity --email-address boletos@museomunet.com --region us-east-1

# OR verify domain (for production)
aws ses verify-domain-identity --domain museomunet.com --region us-east-1
```

### Move out of Sandbox (Production)

Request production access via AWS Console → SES → Account dashboard → Request production access

## 5. Stripe Setup

### Create Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://xxx.execute-api.us-east-1.amazonaws.com/prod/api/checkout/webhook`
3. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
4. Copy the signing secret (whsec_xxx)

### Test with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local endpoint
stripe listen --forward-to localhost:3000/api/checkout/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

## 6. Deployment Steps

### Step 1: Build Lambda Functions

```bash
cd lambda
npm install
npm run build
```

### Step 2: Package for Lambda

```bash
# Create deployment package
zip -r function.zip dist/ node_modules/
```

### Step 3: Create/Update Lambda Functions

```bash
# Create function
aws lambda create-function \
  --function-name munet-createCheckoutSession \
  --runtime nodejs20.x \
  --handler dist/createCheckoutSession.handler \
  --role arn:aws:iam::ACCOUNT_ID:role/munet-lambda-role \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 256 \
  --region us-east-1

# Update function code
aws lambda update-function-code \
  --function-name munet-createCheckoutSession \
  --zip-file fileb://function.zip \
  --region us-east-1
```

### Step 4: Set Environment Variables

```bash
aws lambda update-function-configuration \
  --function-name munet-createCheckoutSession \
  --environment "Variables={STRIPE_SECRET_KEY=sk_test_xxx,FRONTEND_URL=https://museomunet.com,DYNAMODB_ORDERS_TABLE=munet-orders}" \
  --region us-east-1
```

## 7. Testing

### Test Create Checkout Session

```bash
curl -X POST https://xxx.execute-api.us-east-1.amazonaws.com/prod/api/checkout/create-session \
  -H "Content-Type: application/json" \
  -d '{
    "tickets": [{"type": "general", "quantity": 2, "price": 12000}],
    "date": "2026-03-15",
    "email": "test@example.com"
  }'
```

### Stripe Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Decline |
| 4000 0025 0000 3155 | Requires 3DS |

## 8. Monitoring

### CloudWatch Logs

Lambda logs are automatically sent to CloudWatch. Log groups:
- `/aws/lambda/munet-createCheckoutSession`
- `/aws/lambda/munet-handleStripeWebhook`

### Alarms

Set up CloudWatch alarms for:
- Lambda errors > 0
- Lambda duration > 10s
- DynamoDB throttling

## 9. Cost Estimate

| Service | Estimated Monthly Cost |
|---------|------------------------|
| API Gateway | ~$3.50/million requests |
| Lambda | ~$0.20/million invocations |
| DynamoDB | ~$1.25 for 25 read/write units |
| SES | ~$0.10/1000 emails |

**Total estimated:** < $10/month for moderate traffic

---

## Quick Reference

### Environment Variables Summary

**Frontend (.env):**
```
VITE_API_URL=https://xxx.execute-api.us-east-1.amazonaws.com/prod
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

**Lambda (createCheckoutSession):**
```
STRIPE_SECRET_KEY=sk_test_xxx
FRONTEND_URL=https://museomunet.com
DYNAMODB_ORDERS_TABLE=munet-orders
```

**Lambda (handleStripeWebhook):**
```
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
DYNAMODB_ORDERS_TABLE=munet-orders
SES_FROM_EMAIL=boletos@museomunet.com
SES_REGION=us-east-1
```
