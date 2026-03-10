/**
 * Order Management Utilities
 * 
 * Provides CRUD operations for orders in DynamoDB
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const docClient = DynamoDBDocumentClient.from(dynamoClient);

// Table name from environment
const ORDERS_TABLE = process.env.ORDERS_TABLE || 'munet-orders';

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'refunded'
  | 'used';

export interface OrderTicket {
  type: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  visitDate: string;
  tickets: OrderTicket[];
  totalAmount: number;
  status: OrderStatus;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  qrCodeGenerated?: boolean;
  emailSent?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  orderId: string;
  customerEmail: string;
  customerName: string;
  visitDate: string;
  tickets: OrderTicket[];
  totalAmount: number;
  stripeSessionId?: string;
}

/**
 * Creates a new order in DynamoDB
 * 
 * @param orderData - The order data to create
 * @returns Promise with the created order
 */
export async function createOrder(orderData: CreateOrderInput): Promise<OrderData> {
  const now = new Date().toISOString();

  const order: OrderData = {
    ...orderData,
    status: 'pending',
    qrCodeGenerated: false,
    emailSent: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await docClient.send(
      new PutCommand({
        TableName: ORDERS_TABLE,
        Item: order,
        // Ensure we don't overwrite existing orders
        ConditionExpression: 'attribute_not_exists(orderId)',
      })
    );

    return order;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order in database');
  }
}

/**
 * Retrieves an order by its ID
 * 
 * @param orderId - The order ID to retrieve
 * @returns Promise with the order data or null if not found
 */
export async function getOrder(orderId: string): Promise<OrderData | null> {
  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: ORDERS_TABLE,
        Key: { orderId },
      })
    );

    return (result.Item as OrderData) || null;
  } catch (error) {
    console.error('Failed to get order:', error);
    throw new Error('Failed to retrieve order from database');
  }
}

/**
 * Updates the status of an order
 * 
 * @param orderId - The order ID to update
 * @param status - The new status
 * @returns Promise with the updated order
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<OrderData | null> {
  const now = new Date().toISOString();

  try {
    const result = await docClient.send(
      new UpdateCommand({
        TableName: ORDERS_TABLE,
        Key: { orderId },
        UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':status': status,
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      })
    );

    return (result.Attributes as OrderData) || null;
  } catch (error) {
    console.error('Failed to update order status:', error);
    throw new Error('Failed to update order status in database');
  }
}

/**
 * Marks an order as having its QR code generated
 * 
 * @param orderId - The order ID to update
 * @returns Promise with the updated order
 */
export async function markQRCodeGenerated(orderId: string): Promise<OrderData | null> {
  const now = new Date().toISOString();

  try {
    const result = await docClient.send(
      new UpdateCommand({
        TableName: ORDERS_TABLE,
        Key: { orderId },
        UpdateExpression: 'SET qrCodeGenerated = :qr, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':qr': true,
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      })
    );

    return (result.Attributes as OrderData) || null;
  } catch (error) {
    console.error('Failed to mark QR code as generated:', error);
    throw new Error('Failed to update order QR code status');
  }
}

/**
 * Marks an order as having its confirmation email sent
 * 
 * @param orderId - The order ID to update
 * @returns Promise with the updated order
 */
export async function markEmailSent(orderId: string): Promise<OrderData | null> {
  const now = new Date().toISOString();

  try {
    const result = await docClient.send(
      new UpdateCommand({
        TableName: ORDERS_TABLE,
        Key: { orderId },
        UpdateExpression: 'SET emailSent = :email, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':email': true,
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      })
    );

    return (result.Attributes as OrderData) || null;
  } catch (error) {
    console.error('Failed to mark email as sent:', error);
    throw new Error('Failed to update order email status');
  }
}

/**
 * Finds orders by customer email
 * 
 * @param email - The customer email to search for
 * @returns Promise with array of matching orders
 */
export async function getOrdersByEmail(email: string): Promise<OrderData[]> {
  try {
    const result = await docClient.send(
      new QueryCommand({
        TableName: ORDERS_TABLE,
        IndexName: 'email-index',
        KeyConditionExpression: 'customerEmail = :email',
        ExpressionAttributeValues: {
          ':email': email,
        },
      })
    );

    return (result.Items as OrderData[]) || [];
  } catch (error) {
    console.error('Failed to query orders by email:', error);
    throw new Error('Failed to query orders from database');
  }
}

/**
 * Generates a unique order ID
 * 
 * @returns A unique order ID string
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MUN-${timestamp}-${random}`;
}

/**
 * Updates order with Stripe payment details after successful payment
 * 
 * @param orderId - The order ID to update
 * @param paymentIntentId - The Stripe payment intent ID
 * @returns Promise with the updated order
 */
export async function confirmOrderPayment(
  orderId: string,
  paymentIntentId: string
): Promise<OrderData | null> {
  const now = new Date().toISOString();

  try {
    const result = await docClient.send(
      new UpdateCommand({
        TableName: ORDERS_TABLE,
        Key: { orderId },
        UpdateExpression: `
          SET #status = :status, 
              stripePaymentIntentId = :paymentId,
              updatedAt = :updatedAt
        `,
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':status': 'confirmed',
          ':paymentId': paymentIntentId,
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      })
    );

    return (result.Attributes as OrderData) || null;
  } catch (error) {
    console.error('Failed to confirm order payment:', error);
    throw new Error('Failed to confirm order payment in database');
  }
}
