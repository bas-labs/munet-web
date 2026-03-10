import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SEOHead, StructuredData } from '@/components/seo'
import { DatePicker, TicketSelector, OrderSummary, TICKET_TYPES, type TicketQuantities } from '@/components/tickets'

/**
 * Zod schema for ticket form validation
 * - Requires at least one ticket selected
 * - Requires a valid date selected
 */
const ticketFormSchema = z.object({
  selectedDate: z
    .date({ message: 'Selecciona una fecha de visita' })
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: 'La fecha no puede ser en el pasado',
    }),
  quantities: z
    .record(z.string(), z.number().min(0).max(10))
    .refine(
      (quantities) => {
        const totalTickets = Object.values(quantities).reduce(
          (sum, qty) => sum + qty,
          0
        )
        return totalTickets > 0
      },
      {
        message: 'Selecciona al menos un boleto',
      }
    ),
})

type TicketFormData = z.infer<typeof ticketFormSchema>

/**
 * BoletosPage - Ticket purchasing interface for MUNET
 *
 * Features:
 * - Date picker with Sunday free admission detection
 * - Ticket type selector with quantity controls
 * - Order summary with total calculation
 * - Form validation with React Hook Form + Zod
 * - Responsive design (stacked mobile, side-by-side desktop)
 */
export default function BoletosPage() {
  // Initialize quantities with 0 for each ticket type
  const initialQuantities: TicketQuantities = React.useMemo(() => {
    return TICKET_TYPES.reduce((acc, ticket) => {
      acc[ticket.id] = 0
      return acc
    }, {} as TicketQuantities)
  }, [])

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketFormSchema),
    mode: 'onChange',
    defaultValues: {
      selectedDate: undefined,
      quantities: initialQuantities,
    },
  })

  const selectedDate = watch('selectedDate')
  const quantities = watch('quantities')

  // Check if selected date is a Sunday
  const isSunday = React.useMemo(() => {
    if (!selectedDate) return false
    return selectedDate.getDay() === 0
  }, [selectedDate])

  // Handle checkout - will be connected to Stripe in checkout flow
  const onSubmit = (data: TicketFormData) => {
    console.log('Checkout data:', data)
    // TODO: Implement Stripe checkout flow
    alert(
      `¡Gracias! Serás redirigido al pago.\n\nFecha: ${data.selectedDate.toLocaleDateString('es-MX')}\nBoletos: ${Object.values(data.quantities).reduce((a, b) => a + b, 0)}`
    )
  }

  return (
    <PageLayout>
      <SEOHead
        title="Comprar Boletos"
        description="Compra tus boletos en línea para MUNET. Entrada general $120 MXN, descuentos para estudiantes e INAPAM. Domingos entrada gratuita para nacionales mexicanos."
        canonicalPath="/boletos"
        keywords={['boletos museo', 'comprar tickets', 'entrada MUNET', 'precios museo']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Boletos', path: '/boletos' },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Boletos' }]} />

        {/* Page Hero */}
        <div className="mt-8 mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Comprar Boletos
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Adquiere tus boletos en línea y evita filas. Selecciona la fecha de
            tu visita y el tipo de boleto que necesitas.
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Formulario de compra de boletos"
        >
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left column: Date picker + Ticket selector */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Picker */}
              <Controller
                name="selectedDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selectedDate={field.value || null}
                    onDateSelect={(date) => field.onChange(date)}
                  />
                )}
              />

              {/* Ticket Selector */}
              <Controller
                name="quantities"
                control={control}
                render={({ field }) => (
                  <TicketSelector
                    quantities={field.value}
                    onQuantityChange={(ticketId, quantity) => {
                      field.onChange({
                        ...field.value,
                        [ticketId]: quantity,
                      })
                    }}
                    isSunday={isSunday}
                  />
                )}
              />
            </div>

            {/* Right column: Order Summary (sticky) */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <OrderSummary
                  selectedDate={selectedDate || null}
                  quantities={quantities}
                  isSunday={isSunday}
                  onCheckout={() => handleSubmit(onSubmit)()}
                  isValid={isValid}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Additional info section */}
        <section 
          className="mt-16 border-t border-border pt-12"
          aria-labelledby="info-heading"
        >
          <h2 id="info-heading" className="text-2xl font-bold mb-6">
            Información Importante
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              title="Horario"
              description="Martes a domingo de 10:00 a 18:00 hrs. Lunes cerrado."
            />
            <InfoCard
              title="Descuentos"
              description="Estudiantes, maestros y adultos mayores con credencial vigente."
            />
            <InfoCard
              title="Domingos Gratuitos"
              description="Entrada gratuita para nacionales mexicanos todos los domingos."
            />
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

/**
 * InfoCard - Simple info card for additional information
 */
function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </article>
  )
}
