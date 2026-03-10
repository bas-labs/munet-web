/**
 * QRTicket Component
 * 
 * Displays a ticket QR code with order details for museum entry
 */

import { cn } from '@/lib/utils';

interface QRTicketProps {
  qrCodeDataUrl: string;
  orderId: string;
  visitDate: string;
  ticketCount: number;
  tickets?: {
    type: string;
    quantity: number;
  }[];
  className?: string;
}

export function QRTicket({
  qrCodeDataUrl,
  orderId,
  visitDate,
  ticketCount,
  tickets,
  className,
}: QRTicketProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto',
        className
      )}
    >
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold font-display">MUNET</h3>
          <p className="text-sm opacity-90">Museo Nacional de Energía y Tecnología</p>
        </div>
      </div>

      {/* QR Code */}
      <div className="p-6 bg-gray-50 flex flex-col items-center">
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <img
            src={qrCodeDataUrl}
            alt="Código QR de entrada"
            className="w-48 h-48"
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground text-center">
          Presenta este código en la entrada del museo
        </p>
      </div>

      {/* Order Details */}
      <div className="p-6 space-y-4">
        {/* Order Reference */}
        <div className="bg-gray-100 rounded-lg px-4 py-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Número de confirmación
          </p>
          <p className="font-mono text-lg font-bold text-primary tracking-wider">
            {orderId}
          </p>
        </div>

        {/* Visit Date */}
        <div className="flex items-center gap-3 bg-accent/10 rounded-lg px-4 py-3 border-l-4 border-accent">
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Fecha de visita</p>
            <p className="font-semibold text-foreground">{visitDate}</p>
          </div>
        </div>

        {/* Ticket Summary */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total de boletos</span>
            <span className="text-lg font-bold text-primary">
              {ticketCount} {ticketCount === 1 ? 'boleto' : 'boletos'}
            </span>
          </div>

          {/* Ticket Breakdown (if provided) */}
          {tickets && tickets.length > 0 && (
            <div className="space-y-2">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{ticket.type}</span>
                  <span className="font-medium">{ticket.quantity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-primary/5 px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Horario: Martes a Domingo, 10:00 - 18:00 hrs
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Av. de los Compositores s/n, Chapultepec II Secc.
        </p>
      </div>
    </div>
  );
}

export default QRTicket;
