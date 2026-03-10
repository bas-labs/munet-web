/**
 * AWS SES Email Sender Utility
 * 
 * Provides functionality to send emails via AWS Simple Email Service (SES)
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Initialize SES client
// Region is typically set via environment variable or AWS config
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

// Default sender email - must be verified in SES
const DEFAULT_SENDER = process.env.SES_SENDER_EMAIL || 'no-reply@museomunet.com';

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  htmlBody: string;
  textBody?: string;
  from?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends an email via AWS SES
 * 
 * @param params - Email parameters
 * @returns Promise with the result of the send operation
 */
export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const { to, subject, htmlBody, textBody, from, replyTo } = params;

  // Normalize recipients to array
  const recipients = Array.isArray(to) ? to : [to];

  try {
    const command = new SendEmailCommand({
      Source: from || DEFAULT_SENDER,
      Destination: {
        ToAddresses: recipients,
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
          // Include plain text version if provided
          ...(textBody && {
            Text: {
              Charset: 'UTF-8',
              Data: textBody,
            },
          }),
        },
      },
      ...(replyTo && {
        ReplyToAddresses: [replyTo],
      }),
    });

    const response = await sesClient.send(command);

    return {
      success: true,
      messageId: response.MessageId,
    };
  } catch (error) {
    console.error('Failed to send email via SES:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Sends an order confirmation email
 * 
 * @param to - Recipient email address
 * @param orderId - Order reference number
 * @param htmlBody - HTML content of the email
 * @param textBody - Plain text content of the email
 * @returns Promise with the result of the send operation
 */
export async function sendOrderConfirmationEmail(
  to: string,
  orderId: string,
  htmlBody: string,
  textBody?: string
): Promise<SendEmailResult> {
  return sendEmail({
    to,
    subject: `Confirmación de Compra - MUNET #${orderId}`,
    htmlBody,
    textBody,
    replyTo: 'boletos@museomunet.com',
  });
}

/**
 * Validates an email address format
 * 
 * @param email - Email address to validate
 * @returns boolean indicating if the email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
