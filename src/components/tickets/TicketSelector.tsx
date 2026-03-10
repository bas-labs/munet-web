import { Minus, Plus, Ticket, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface TicketType {
  id: string
  name: string
  price: number
  description: string
  maxQuantity: number
}

export interface TicketQuantities {
  [ticketId: string]: number
}

interface TicketSelectorProps {
  quantities: TicketQuantities
  onQuantityChange: (ticketId: string, quantity: number) => void
  isSunday: boolean
  className?: string
}

/**
 * Ticket types based on PRD Section 9.1
 */
export const TICKET_TYPES: TicketType[] = [
  {
    id: 'general',
    name: 'General',
    price: 120,
    description: 'Adultos',
    maxQuantity: 10,
  },
  {
    id: 'estudiante',
    name: 'Estudiante',
    price: 60,
    description: 'Con credencial vigente',
    maxQuantity: 10,
  },
  {
    id: 'maestro',
    name: 'Maestro',
    price: 60,
    description: 'Con credencial vigente',
    maxQuantity: 10,
  },
  {
    id: 'inapam',
    name: 'INAPAM',
    price: 60,
    description: 'Adultos mayores con credencial',
    maxQuantity: 10,
  },
  {
    id: 'nino',
    name: 'Niño (3-12 años)',
    price: 60,
    description: 'Niños de 3 a 12 años',
    maxQuantity: 10,
  },
  {
    id: 'nino-gratis',
    name: 'Niño (<3 años)',
    price: 0,
    description: 'Menores de 3 años',
    maxQuantity: 10,
  },
]

/**
 * TicketSelector component for MUNET ticket system
 * - Displays all ticket types with prices from PRD
 * - Quantity controls (+/-) for each type
 * - Shows conditions (e.g., "Con credencial vigente")
 * - Sunday detection: shows "Entrada gratuita para nacionales"
 */
export function TicketSelector({
  quantities,
  onQuantityChange,
  isSunday,
  className,
}: TicketSelectorProps) {
  const handleIncrement = (ticketId: string, currentQty: number, maxQty: number) => {
    if (currentQty < maxQty) {
      onQuantityChange(ticketId, currentQty + 1)
    }
  }

  const handleDecrement = (ticketId: string, currentQty: number) => {
    if (currentQty > 0) {
      onQuantityChange(ticketId, currentQty - 1)
    }
  }

  const getDisplayPrice = (ticket: TicketType) => {
    // On Sundays, nationals get free entry (except paid categories remain available)
    if (isSunday && ticket.id !== 'nino-gratis') {
      return 0
    }
    return ticket.price
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratis'
    return `$${price} MXN`
  }

  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <div className="flex items-center gap-2 mb-6">
        <Ticket className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-bold">Tipo de Boleto</h2>
      </div>

      {/* Sunday free admission notice */}
      {isSunday && (
        <div className="mb-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-accent">
                ¡Domingo de entrada gratuita!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Todos los boletos son gratuitos para nacionales mexicanos.
                Presenta una identificación oficial al ingresar.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ticket type list */}
      <div className="space-y-3">
        {TICKET_TYPES.map((ticket) => {
          const quantity = quantities[ticket.id] || 0
          const displayPrice = getDisplayPrice(ticket)
          const originalPrice = ticket.price

          return (
            <div
              key={ticket.id}
              className={cn(
                'flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border transition-colors',
                quantity > 0 && 'border-accent/50 bg-accent/5'
              )}
            >
              {/* Ticket info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{ticket.name}</h3>
                  {isSunday && originalPrice > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                      ¡Gratis!
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{ticket.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  {isSunday && originalPrice > 0 ? (
                    <>
                      <span className="text-sm line-through text-muted-foreground">
                        ${originalPrice} MXN
                      </span>
                      <span className="text-sm font-semibold text-accent">
                        Gratis
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold">
                      {formatPrice(displayPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecrement(ticket.id, quantity)}
                  disabled={quantity === 0}
                  aria-label={`Reducir cantidad de ${ticket.name}`}
                  className="h-10 w-10 shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span
                  className="w-8 text-center text-lg font-semibold tabular-nums"
                  aria-label={`Cantidad de ${ticket.name}: ${quantity}`}
                >
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncrement(ticket.id, quantity, ticket.maxQuantity)}
                  disabled={quantity >= ticket.maxQuantity}
                  aria-label={`Aumentar cantidad de ${ticket.name}`}
                  className="h-10 w-10 shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info note */}
      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          <strong>Nota:</strong> Los boletos con descuento requieren identificación
          oficial vigente al momento de ingresar al museo.
        </p>
      </div>
    </div>
  )
}
