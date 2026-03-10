import * as React from 'react'
import { ShoppingCart, Calendar, CreditCard, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TICKET_TYPES, type TicketQuantities } from './TicketSelector'

interface OrderSummaryProps {
  selectedDate: Date | null
  quantities: TicketQuantities
  isSunday: boolean
  onCheckout: () => void
  isValid: boolean
  className?: string
}

/**
 * OrderSummary component for MUNET ticket system
 * - Selected date display
 * - Line items with quantities and subtotals
 * - Total calculation
 * - "Proceder al Pago" CTA button (disabled if no tickets selected)
 */
export function OrderSummary({
  selectedDate,
  quantities,
  isSunday,
  onCheckout,
  isValid,
  className,
}: OrderSummaryProps) {
  // Calculate line items
  const lineItems = React.useMemo(() => {
    return TICKET_TYPES.map((ticket) => {
      const quantity = quantities[ticket.id] || 0
      if (quantity === 0) return null

      const unitPrice = isSunday && ticket.price > 0 ? 0 : ticket.price
      const subtotal = unitPrice * quantity

      return {
        id: ticket.id,
        name: ticket.name,
        quantity,
        unitPrice,
        originalPrice: ticket.price,
        subtotal,
        isFree: isSunday && ticket.price > 0,
      }
    }).filter(Boolean)
  }, [quantities, isSunday])

  // Calculate totals
  const { totalTickets, totalPrice, totalSavings } = React.useMemo(() => {
    let tickets = 0
    let price = 0
    let savings = 0

    Object.entries(quantities).forEach(([ticketId, quantity]) => {
      if (quantity > 0) {
        tickets += quantity
        const ticket = TICKET_TYPES.find((t) => t.id === ticketId)
        if (ticket) {
          const unitPrice = isSunday && ticket.price > 0 ? 0 : ticket.price
          price += unitPrice * quantity
          if (isSunday && ticket.price > 0) {
            savings += ticket.price * quantity
          }
        }
      }
    })

    return { totalTickets: tickets, totalPrice: price, totalSavings: savings }
  }, [quantities, isSunday])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-MX')} MXN`
  }

  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-bold">Resumen de Compra</h2>
      </div>

      {/* Selected date */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Calendar className="h-4 w-4" />
          <span>Fecha de visita</span>
        </div>
        {selectedDate ? (
          <p className="font-medium capitalize">{formatDate(selectedDate)}</p>
        ) : (
          <p className="text-muted-foreground italic">Selecciona una fecha</p>
        )}
      </div>

      {/* Line items */}
      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Boletos</h3>
        
        {lineItems.length === 0 ? (
          <p className="text-muted-foreground italic text-sm py-4">
            No hay boletos seleccionados
          </p>
        ) : (
          <div className="space-y-3">
            {lineItems.map((item) => (
              <div key={item!.id} className="flex justify-between items-start text-sm">
                <div className="flex-1">
                  <p className="font-medium">{item!.name}</p>
                  <p className="text-muted-foreground">
                    {item!.quantity} × {item!.isFree ? (
                      <span>
                        <span className="line-through">{formatPrice(item!.originalPrice)}</span>
                        {' '}
                        <span className="text-accent">Gratis</span>
                      </span>
                    ) : (
                      formatPrice(item!.unitPrice)
                    )}
                  </p>
                </div>
                <span className="font-medium">
                  {formatPrice(item!.subtotal)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Savings (if Sunday) */}
      {totalSavings > 0 && (
        <div className="mt-4 p-3 rounded-md bg-accent/10 border border-accent/20">
          <div className="flex justify-between items-center text-sm">
            <span className="text-accent font-medium">🎉 Ahorro domingo</span>
            <span className="text-accent font-bold">-{formatPrice(totalSavings)}</span>
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="mt-6 pt-4 border-t border-border space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total de boletos</span>
          <span>{totalTickets}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full mt-6"
        disabled={!isValid}
        onClick={onCheckout}
      >
        <CreditCard className="h-5 w-5 mr-2" />
        Proceder al Pago
      </Button>

      {/* Security note */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" />
        <span>Pago seguro con Stripe</span>
      </div>

      {/* Validation message */}
      {!isValid && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {!selectedDate && !totalTickets
            ? 'Selecciona una fecha y al menos un boleto'
            : !selectedDate
            ? 'Selecciona una fecha para continuar'
            : 'Selecciona al menos un boleto'}
        </p>
      )}
    </div>
  )
}
