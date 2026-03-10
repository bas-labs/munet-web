/**
 * Order Confirmation Email Template
 * 
 * Generates HTML email for order confirmations with:
 * - MUNET branding
 * - Order details
 * - Visit date and ticket breakdown
 * - QR code for ticket validation
 * - Museum contact information
 */

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  visitDate: string;
  tickets: {
    type: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  totalAmount: number;
  qrCodeBase64: string;
  purchaseDate: string;
}

/**
 * Generates the HTML email content for order confirmation
 */
export function generateOrderConfirmationEmail(data: OrderEmailData): string {
  const ticketRows = data.tickets
    .map(
      (ticket) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-family: 'Inter', sans-serif;">
          ${ticket.type}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; font-family: 'Inter', sans-serif;">
          ${ticket.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: 'Inter', sans-serif;">
          $${ticket.unitPrice.toFixed(2)} MXN
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: 'Inter', sans-serif;">
          $${ticket.subtotal.toFixed(2)} MXN
        </td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Compra - MUNET</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 32px; text-align: center;">
              <!-- MUNET Logo Placeholder -->
              <div style="width: 120px; height: 60px; background-color: #FF6B35; margin: 0 auto; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #ffffff; font-size: 24px; font-weight: bold; font-family: 'DM Sans', sans-serif;">MUNET</span>
              </div>
              <h1 style="color: #ffffff; margin: 24px 0 0 0; font-size: 24px; font-weight: 600; font-family: 'DM Sans', sans-serif;">
                ¡Gracias por tu compra!
              </h1>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 32px;">
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; font-family: 'Inter', sans-serif;">
                Hola <strong>${data.customerName}</strong>,
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; font-family: 'Inter', sans-serif;">
                Tu compra ha sido confirmada. A continuación encontrarás los detalles de tu visita al Museo Nacional de Energía y Tecnología.
              </p>

              <!-- Order Reference -->
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; font-family: 'Inter', sans-serif;">Número de confirmación</p>
                <p style="margin: 0; color: #1A1A1A; font-size: 20px; font-weight: 700; font-family: 'DM Sans', sans-serif; letter-spacing: 2px;">
                  ${data.orderId}
                </p>
              </div>

              <!-- Visit Details -->
              <h2 style="color: #1A1A1A; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; font-family: 'DM Sans', sans-serif;">
                Detalles de tu visita
              </h2>
              
              <div style="background-color: #FFF7ED; border-left: 4px solid #FF6B35; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0 0 4px 0; color: #9a3412; font-size: 14px; font-family: 'Inter', sans-serif;">Fecha de visita</p>
                <p style="margin: 0; color: #1A1A1A; font-size: 18px; font-weight: 600; font-family: 'DM Sans', sans-serif;">
                  ${data.visitDate}
                </p>
              </div>

              <!-- Ticket Breakdown -->
              <h2 style="color: #1A1A1A; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; font-family: 'DM Sans', sans-serif;">
                Desglose de boletos
              </h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; font-size: 14px; font-weight: 600; color: #4b5563; font-family: 'Inter', sans-serif;">Tipo</th>
                    <th style="padding: 12px; text-align: center; font-size: 14px; font-weight: 600; color: #4b5563; font-family: 'Inter', sans-serif;">Cantidad</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px; font-weight: 600; color: #4b5563; font-family: 'Inter', sans-serif;">Precio</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px; font-weight: 600; color: #4b5563; font-family: 'Inter', sans-serif;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${ticketRows}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 16px 12px; text-align: right; font-weight: 700; font-size: 16px; color: #1A1A1A; font-family: 'DM Sans', sans-serif;">
                      Total
                    </td>
                    <td style="padding: 16px 12px; text-align: right; font-weight: 700; font-size: 18px; color: #FF6B35; font-family: 'DM Sans', sans-serif;">
                      $${data.totalAmount.toFixed(2)} MXN
                    </td>
                  </tr>
                </tfoot>
              </table>

              <!-- QR Code -->
              <div style="text-align: center; background-color: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #1A1A1A; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; font-family: 'DM Sans', sans-serif;">
                  Tu código QR de entrada
                </h2>
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0; font-family: 'Inter', sans-serif;">
                  Presenta este código en la entrada del museo
                </p>
                <img src="${data.qrCodeBase64}" alt="Código QR de entrada" style="width: 200px; height: 200px; margin: 0 auto; display: block; border-radius: 8px; background-color: #ffffff; padding: 8px;" />
              </div>

              <!-- Important Information -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <h3 style="color: #166534; font-size: 16px; font-weight: 600; margin: 0 0 12px 0; font-family: 'DM Sans', sans-serif;">
                  Información importante
                </h3>
                <ul style="color: #166534; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px; font-family: 'Inter', sans-serif;">
                  <li>Horario: Martes a Domingo, 10:00 - 18:00 hrs</li>
                  <li>Última entrada: 17:00 hrs</li>
                  <li>Presenta tu código QR en taquilla</li>
                  <li>Los boletos son válidos únicamente para la fecha seleccionada</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 32px; text-align: center;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px 0; font-family: 'Inter', sans-serif;">
                <strong>MUNET</strong> — Museo Nacional de Energía y Tecnología
              </p>
              <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px 0; font-family: 'Inter', sans-serif;">
                Av. de los Compositores s/n, Bosque de Chapultepec II Secc.
              </p>
              <p style="color: #9ca3af; font-size: 14px; margin: 0 0 16px 0; font-family: 'Inter', sans-serif;">
                Ciudad de México, CP 11580
              </p>
              <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px 0; font-family: 'Inter', sans-serif;">
                📧 contacto@museomunet.com
              </p>
              <p style="color: #6b7280; font-size: 12px; margin: 16px 0 0 0; font-family: 'Inter', sans-serif;">
                Fecha de compra: ${data.purchaseDate}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates the plain text version of the order confirmation email
 */
export function generateOrderConfirmationText(data: OrderEmailData): string {
  const ticketLines = data.tickets
    .map(
      (ticket) =>
        `  - ${ticket.type}: ${ticket.quantity} x $${ticket.unitPrice.toFixed(2)} = $${ticket.subtotal.toFixed(2)} MXN`
    )
    .join('\n');

  return `
¡Gracias por tu compra!

Hola ${data.customerName},

Tu compra ha sido confirmada. A continuación encontrarás los detalles de tu visita al Museo Nacional de Energía y Tecnología.

NÚMERO DE CONFIRMACIÓN: ${data.orderId}

DETALLES DE TU VISITA
=====================
Fecha de visita: ${data.visitDate}

DESGLOSE DE BOLETOS
===================
${ticketLines}

TOTAL: $${data.totalAmount.toFixed(2)} MXN

INFORMACIÓN IMPORTANTE
======================
- Horario: Martes a Domingo, 10:00 - 18:00 hrs
- Última entrada: 17:00 hrs
- Presenta tu código QR en taquilla
- Los boletos son válidos únicamente para la fecha seleccionada

---
MUNET — Museo Nacional de Energía y Tecnología
Av. de los Compositores s/n, Bosque de Chapultepec II Secc.
Ciudad de México, CP 11580
📧 contacto@museomunet.com

Fecha de compra: ${data.purchaseDate}
  `.trim();
}
