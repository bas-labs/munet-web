/**
 * Lambda Handler: Submit Inquiry
 * Receives venue rental inquiry data, validates, stores in DynamoDB,
 * and sends notification email via SES
 *
 * Environment Variables:
 * - INQUIRIES_TABLE: DynamoDB table name (default: munet-inquiries)
 * - ADMIN_EMAIL: Email address to receive notifications
 * - SES_SOURCE_EMAIL: Verified SES sender email
 * - AWS_REGION: AWS region
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

// Initialize clients
const dynamoClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(dynamoClient)
const sesClient = new SESClient({})

// Environment variables
const INQUIRIES_TABLE = process.env.INQUIRIES_TABLE || 'munet-inquiries'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contacto@museomunet.com'
const SES_SOURCE_EMAIL = process.env.SES_SOURCE_EMAIL || 'noreply@museomunet.com'

// Valid space IDs
const VALID_SPACES = [
  'auditorio',
  'salas-exposicion',
  'talleres',
  'foro-aire-libre',
  'explanada',
]

// Valid event types
const VALID_EVENT_TYPES = ['corporativo', 'social', 'cultural', 'otro']

// Space names for email
const SPACE_NAMES: Record<string, string> = {
  'auditorio': 'Auditorio',
  'salas-exposicion': 'Salas de Exposición',
  'talleres': 'Talleres',
  'foro-aire-libre': 'Foro al Aire Libre',
  'explanada': 'Explanada',
}

// Event type names for email
const EVENT_TYPE_NAMES: Record<string, string> = {
  'corporativo': 'Corporativo',
  'social': 'Social',
  'cultural': 'Cultural',
  'otro': 'Otro',
}

interface InquiryInput {
  name: string
  company?: string
  email: string
  phone: string
  spaceId: string
  eventDate: string
  attendees: number
  eventType: string
  message?: string
}

interface ValidationResult {
  valid: boolean
  errors: string[]
}

/**
 * Validate inquiry input data
 */
function validateInput(data: unknown): ValidationResult {
  const errors: string[] = []
  const input = data as InquiryInput

  // Required fields
  if (!input.name || typeof input.name !== 'string' || input.name.length < 2) {
    errors.push('El nombre es requerido y debe tener al menos 2 caracteres')
  }

  if (!input.email || typeof input.email !== 'string') {
    errors.push('El email es requerido')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push('El email no es válido')
  }

  if (!input.phone || typeof input.phone !== 'string' || input.phone.length < 10) {
    errors.push('El teléfono es requerido y debe tener al menos 10 dígitos')
  }

  if (!input.spaceId || !VALID_SPACES.includes(input.spaceId)) {
    errors.push('El espacio seleccionado no es válido')
  }

  if (!input.eventDate || typeof input.eventDate !== 'string') {
    errors.push('La fecha del evento es requerida')
  } else {
    const eventDate = new Date(input.eventDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (eventDate <= today) {
      errors.push('La fecha del evento debe ser futura')
    }
  }

  if (!input.attendees || typeof input.attendees !== 'number' || input.attendees < 1) {
    errors.push('El número de asistentes debe ser al menos 1')
  }

  if (!input.eventType || !VALID_EVENT_TYPES.includes(input.eventType)) {
    errors.push('El tipo de evento no es válido')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Generate a unique inquiry ID
 */
function generateInquiryId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `INQ-${timestamp}-${random}`.toUpperCase()
}

/**
 * Store inquiry in DynamoDB
 */
async function storeInquiry(inquiryId: string, data: InquiryInput): Promise<void> {
  const item = {
    inquiryId,
    name: data.name,
    company: data.company || null,
    email: data.email,
    phone: data.phone,
    spaceId: data.spaceId,
    eventDate: data.eventDate,
    attendees: data.attendees,
    eventType: data.eventType,
    message: data.message || null,
    status: 'new',
    createdAt: new Date().toISOString(),
  }

  await docClient.send(
    new PutCommand({
      TableName: INQUIRIES_TABLE,
      Item: item,
    })
  )
}

/**
 * Send notification email to admin
 */
async function sendNotificationEmail(
  inquiryId: string,
  data: InquiryInput
): Promise<void> {
  const spaceName = SPACE_NAMES[data.spaceId] || data.spaceId
  const eventTypeName = EVENT_TYPE_NAMES[data.eventType] || data.eventType
  const formattedDate = new Date(data.eventDate).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const subject = `Nueva Solicitud de Renta: ${spaceName} - ${data.name}`

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #FF6B35; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; }
    .value { font-size: 16px; margin-top: 4px; }
    .highlight { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 20px;">Nueva Solicitud de Renta de Espacios</h1>
      <p style="margin: 10px 0 0; opacity: 0.9;">ID: ${inquiryId}</p>
    </div>
    <div class="content">
      <div class="highlight">
        <div class="field">
          <div class="label">Espacio Solicitado</div>
          <div class="value" style="font-size: 18px; font-weight: 600;">${spaceName}</div>
        </div>
        <div class="field">
          <div class="label">Fecha del Evento</div>
          <div class="value">${formattedDate}</div>
        </div>
        <div class="field">
          <div class="label">Asistentes</div>
          <div class="value">${data.attendees} personas</div>
        </div>
        <div class="field">
          <div class="label">Tipo de Evento</div>
          <div class="value">${eventTypeName}</div>
        </div>
      </div>
      
      <h3 style="margin-top: 25px;">Datos del Solicitante</h3>
      <div class="field">
        <div class="label">Nombre</div>
        <div class="value">${data.name}</div>
      </div>
      ${data.company ? `
      <div class="field">
        <div class="label">Empresa / Organización</div>
        <div class="value">${data.company}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Teléfono</div>
        <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
      </div>
      ${data.message ? `
      <div class="highlight" style="background: #fff3e0;">
        <div class="label">Mensaje Adicional</div>
        <div class="value">${data.message}</div>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>Este email fue enviado automáticamente desde museomunet.com</p>
      <p>MUNET — Museo Nacional de Energía y Tecnología</p>
    </div>
  </div>
</body>
</html>
`

  const textBody = `
Nueva Solicitud de Renta de Espacios
ID: ${inquiryId}

ESPACIO SOLICITADO: ${spaceName}
FECHA DEL EVENTO: ${formattedDate}
ASISTENTES: ${data.attendees} personas
TIPO DE EVENTO: ${eventTypeName}

DATOS DEL SOLICITANTE
Nombre: ${data.name}
${data.company ? `Empresa: ${data.company}` : ''}
Email: ${data.email}
Teléfono: ${data.phone}
${data.message ? `\nMensaje: ${data.message}` : ''}

---
Este email fue enviado automáticamente desde museomunet.com
MUNET — Museo Nacional de Energía y Tecnología
`

  await sesClient.send(
    new SendEmailCommand({
      Source: SES_SOURCE_EMAIL,
      Destination: {
        ToAddresses: [ADMIN_EMAIL],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
          Text: {
            Data: textBody,
            Charset: 'UTF-8',
          },
        },
      },
    })
  )
}

/**
 * Lambda handler
 */
export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    }
  }

  try {
    // Parse body
    let data: unknown
    try {
      data = JSON.parse(event.body || '{}')
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid JSON body',
        }),
      }
    }

    // Validate input
    const validation = validateInput(data)
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        }),
      }
    }

    const inquiryData = data as InquiryInput
    const inquiryId = generateInquiryId()

    // Store in DynamoDB
    await storeInquiry(inquiryId, inquiryData)

    // Send notification email (non-blocking)
    try {
      await sendNotificationEmail(inquiryId, inquiryData)
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error('Failed to send notification email:', emailError)
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        inquiryId,
        message: 'Solicitud recibida correctamente',
      }),
    }
  } catch (error) {
    console.error('Error processing inquiry:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Error interno del servidor',
      }),
    }
  }
}
