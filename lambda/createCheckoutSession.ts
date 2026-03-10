/**
 * Lambda: createCheckoutSession
 * 
 * Creates a Stripe Checkout Session for MUNET ticket purchases.
 * 
 * Environment Variables Required:
 * - STRIPE_SECRET_KEY: Stripe secret key (sk_test_xxx or sk_live_xxx)
 * - FRONTEND_URL: Frontend URL for success/cancel redirects
 * - DYNAMODB_ORDERS_TABLE: DynamoDB table name for orders
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Stripe from 'stripe';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

// Initialize clients
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

// Types
interface TicketItem {
  type: string;
  quantity: number;
  price: number; // Price in MXN centavos
}

interface CheckoutRequest {
  tickets: TicketItem[];
  date: string; // ISO date string (YYYY-MM-DD)
  email: string;
}

interface CheckoutResponse {
  sessionId: string;
  url: string;
}

// Ticket type configuration (prices in MXN centavos)
const TICKET_TYPES: Record<string, { name: string; price: number }> = {
  general: { name: 'Entrada General', price: 12000 }, // $120 MXN
  estudiante: { name: 'Estudiante', price: 6000 }, // $60 MXN
  maestro: { name: 'Maestro', price: 6000 }, // $60 MXN
  inapam: { name: 'INAPAM', price: 6000 }, // $60 MXN
  nino: { name: 'Niño (3-12 años)', price: 6000 }, // $60 MXN
  nino_gratis: { name: 'Niño (<3 años)', price: 0 }, // Gratis
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const request: CheckoutRequest = JSON.parse(event.body);

    // Validate request
    if (!request.tickets || !Array.isArray(request.tickets) || request.tickets.length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'At least one ticket is required' }),
      };
    }

    if (!request.date) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Visit date is required' }),
      };
    }

    if (!request.email || !request.email.includes('@')) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Valid email is required' }),
      };
    }

    // Filter out zero-quantity and free tickets, build line items
    const paidTickets = request.tickets.filter(
      (t) => t.quantity > 0 && TICKET_TYPES[t.type]?.price > 0
    );

    if (paidTickets.length === 0) {
      // All tickets are free - handle differently (no Stripe checkout needed)
      // For now, we'll still create an order but skip Stripe
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'No paid tickets selected. Free tickets do not require checkout.' 
        }),
      };
    }

    // Create Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = paidTickets.map((ticket) => {
      const ticketConfig = TICKET_TYPES[ticket.type];
      return {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: ticketConfig.name,
            description: `Visita: ${request.date}`,
            metadata: {
              ticket_type: ticket.type,
              visit_date: request.date,
            },
          },
          unit_amount: ticketConfig.price,
        },
        quantity: ticket.quantity,
      };
    });

    // Calculate total amount
    const totalAmount = paidTickets.reduce(
      (sum, t) => sum + (TICKET_TYPES[t.type]?.price || 0) * t.quantity,
      0
    );

    // Generate order ID
    const orderId = randomUUID();

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
      customer_email: request.email,
      metadata: {
        orderId,
        visitDate: request.date,
        tickets: JSON.stringify(request.tickets),
      },
      locale: 'es',
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    });

    // Store pending order in DynamoDB
    await docClient.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_ORDERS_TABLE!,
        Item: {
          orderId,
          date: request.date,
          tickets: request.tickets,
          totalAmount,
          customerEmail: request.email,
          stripeSessionId: session.id,
          status: 'pending',
          createdAt: new Date().toISOString(),
          qrCode: '', // Generated after payment confirmation
        },
      })
    );

    const response: CheckoutResponse = {
      sessionId: session.id,
      url: session.url!,
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);

    // Handle Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: error.message }),
      };
    }

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
