/**
 * Lambda: handleStripeWebhook
 * 
 * Handles Stripe webhook events, specifically checkout.session.completed.
 * Updates order status in DynamoDB and triggers confirmation email via SES.
 * 
 * Environment Variables Required:
 * - STRIPE_SECRET_KEY: Stripe secret key
 * - STRIPE_WEBHOOK_SECRET: Stripe webhook signing secret (whsec_xxx)
 * - DYNAMODB_ORDERS_TABLE: DynamoDB table name for orders
 * - SES_FROM_EMAIL: Verified SES sender email address
 * - SES_REGION: AWS region for SES (e.g., us-east-1)
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Stripe from 'stripe';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { randomBytes } from 'crypto';

// Initialize clients
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const sesClient = new SESClient({ region: process.env.SES_REGION || 'us-east-1' });

// Types
interface TicketItem {
  type: string;
  quantity: number;
  price: number;
}

interface OrderRecord {
  orderId: string;
  date: string;
  tickets: TicketItem[];
  totalAmount: number;
  customerEmail: string;
  stripeSessionId: string;
  status: string;
  createdAt: string;
  qrCode: string;
}

// Generate a simple QR code data string (to be rendered by frontend or embedded in PDF)
function generateQRCodeData(orderId: string): string {
  const verificationCode = randomBytes(4).toString('hex').toUpperCase();
  return `MUNET-${orderId.slice(0, 8).toUpperCase()}-${verificationCode}`;
}

// Format ticket type for display
function formatTicketType(type: string): string {
  const types: Record<string, string> = {
    general: 'Entrada General',
    estudiante: 'Estudiante',
    maestro: 'Maestro',
    inapam: 'INAPAM',
    nino: 'Niño (3-12 años)',
    nino_gratis: 'Niño (<3 años)',
  };
  return types[type] || type;
}

// Format price in MXN
function formatPrice(centavos: number): string {
  return `$${(centavos / 100).toFixed(2)} MXN`;
}

// Send confirmation email via SES
async function sendConfirmationEmail(order: OrderRecord): Promise<void> {
  const ticketsList = order.tickets
    .filter((t) => t.quantity > 0)
    .map((t) => `• ${formatTicketType(t.type)}: ${t.quantity}`)
    .join('\n');

  const emailBody = `
¡Gracias por tu compra en MUNET!

Tu pedido ha sido confirmado.

DETALLES DE TU VISITA
━━━━━━━━━━━━━━━━━━━━━
Fecha de visita: ${order.date}
Número de orden: ${order.orderId.slice(0, 8).toUpperCase()}

BOLETOS
${ticketsList}

Total pagado: ${formatPrice(order.totalAmount)}

CÓDIGO DE ACCESO
${order.qrCode}

Presenta este código en la entrada del museo.

━━━━━━━━━━━━━━━━━━━━━

INFORMACIÓN IMPORTANTE
• Horario: Martes a Domingo, 10:00 - 18:00 hrs
• Ubicación: Av. de los Compositores s/n, Bosque de Chapultepec II Secc.
• Los boletos no son reembolsables pero pueden ser reprogramados con 24 horas de anticipación.

¿Tienes preguntas? Escríbenos a contacto@museomunet.com

¡Te esperamos en MUNET!

---
MUNET - Museo Nacional de Energía y Tecnología
"El conocimiento no te crea ni te destruye. Te transforma."
`.trim();

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #FF6B35;">
    <h1 style="margin: 0; font-size: 24px; color: #1a1a1a;">MUNET</h1>
    <p style="margin: 5px 0 0; color: #666;">Museo Nacional de Energía y Tecnología</p>
  </div>
  
  <div style="padding: 30px 0;">
    <h2 style="color: #FF6B35; margin-bottom: 20px;">¡Gracias por tu compra!</h2>
    <p>Tu pedido ha sido confirmado.</p>
    
    <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #1a1a1a;">Detalles de tu visita</h3>
      <p><strong>Fecha:</strong> ${order.date}</p>
      <p><strong>Orden:</strong> #${order.orderId.slice(0, 8).toUpperCase()}</p>
      
      <h4 style="margin-bottom: 10px;">Boletos:</h4>
      <ul style="margin: 0; padding-left: 20px;">
        ${order.tickets
          .filter((t) => t.quantity > 0)
          .map((t) => `<li>${formatTicketType(t.type)}: ${t.quantity}</li>`)
          .join('')}
      </ul>
      
      <p style="font-size: 18px; margin-top: 15px;"><strong>Total:</strong> ${formatPrice(order.totalAmount)}</p>
    </div>
    
    <div style="background: #1a1a1a; color: white; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
      <p style="margin: 0 0 10px; font-size: 14px;">CÓDIGO DE ACCESO</p>
      <p style="font-size: 24px; font-family: monospace; margin: 0; letter-spacing: 2px; color: #FF6B35;">${order.qrCode}</p>
      <p style="margin: 10px 0 0; font-size: 12px; opacity: 0.8;">Presenta este código en la entrada</p>
    </div>
    
    <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; font-size: 14px; color: #666;">
      <h4 style="color: #1a1a1a;">Información importante</h4>
      <ul>
        <li>Horario: Martes a Domingo, 10:00 - 18:00 hrs</li>
        <li>Ubicación: Av. de los Compositores s/n, Bosque de Chapultepec II Secc.</li>
        <li>Los boletos no son reembolsables pero pueden ser reprogramados con 24 horas de anticipación.</li>
      </ul>
    </div>
  </div>
  
  <div style="text-align: center; padding: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
    <p style="margin: 0;">¿Tienes preguntas? <a href="mailto:contacto@museomunet.com" style="color: #FF6B35;">contacto@museomunet.com</a></p>
    <p style="margin: 10px 0 0; font-style: italic;">"El conocimiento no te crea ni te destruye. Te transforma."</p>
  </div>
</body>
</html>
`.trim();

  await sesClient.send(
    new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [order.customerEmail],
      },
      Message: {
        Subject: {
          Data: `¡Confirmación de compra MUNET! - Orden #${order.orderId.slice(0, 8).toUpperCase()}`,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: emailBody,
            Charset: 'UTF-8',
          },
          Html: {
            Data: emailHtml,
            Charset: 'UTF-8',
          },
        },
      },
    })
  );
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Get the raw body and signature
    const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
    
    if (!sig) {
      console.error('Missing Stripe signature');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing signature' }),
      };
    }

    // Verify webhook signature
    let stripeEvent: Stripe.Event;
    
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        event.body!,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        
        console.log('Processing checkout.session.completed:', session.id);

        // Extract order ID from metadata
        const orderId = session.metadata?.orderId;
        
        if (!orderId) {
          console.error('No orderId in session metadata');
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing orderId' }),
          };
        }

        // Generate QR code data
        const qrCode = generateQRCodeData(orderId);

        // Update order status in DynamoDB
        const updateResult = await docClient.send(
          new UpdateCommand({
            TableName: process.env.DYNAMODB_ORDERS_TABLE!,
            Key: { orderId },
            UpdateExpression: 'SET #status = :status, qrCode = :qrCode, completedAt = :completedAt, stripePaymentIntent = :paymentIntent',
            ExpressionAttributeNames: {
              '#status': 'status',
            },
            ExpressionAttributeValues: {
              ':status': 'completed',
              ':qrCode': qrCode,
              ':completedAt': new Date().toISOString(),
              ':paymentIntent': session.payment_intent,
            },
            ReturnValues: 'ALL_NEW',
          })
        );

        const order = updateResult.Attributes as OrderRecord;

        // Send confirmation email
        try {
          await sendConfirmationEmail(order);
          console.log('Confirmation email sent to:', order.customerEmail);
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the webhook - order is already confirmed
        }

        break;
      }

      case 'checkout.session.expired': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          // Update order status to expired
          await docClient.send(
            new UpdateCommand({
              TableName: process.env.DYNAMODB_ORDERS_TABLE!,
              Key: { orderId },
              UpdateExpression: 'SET #status = :status, expiredAt = :expiredAt',
              ExpressionAttributeNames: {
                '#status': 'status',
              },
              ExpressionAttributeValues: {
                ':status': 'expired',
                ':expiredAt': new Date().toISOString(),
              },
            })
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
