import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import gsap from 'gsap'
import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import { DatePicker, TicketSelector, OrderSummary, TICKET_TYPES, type TicketQuantities } from '@/components/tickets'
import {
  TextClipReveal,
  useStaggerReveal,
} from '@/components/ui/gsap-primitives'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

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
 * Ticket outline SVG for hero stroke-draw animation
 */
function TicketSVG() {
  const pathRef = React.useRef<SVGPathElement>(null)

  React.useEffect(() => {
    if (prefersReducedMotion() || !pathRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        delay: 0.3,
        ease: 'power2.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg
      className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block"
      width="200"
      height="120"
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M20 10 h160 a10 10 0 0 1 10 10 v25 a15 15 0 0 0 0 30 v25 a10 10 0 0 1 -10 10 h-160 a10 10 0 0 1 -10 -10 v-25 a15 15 0 0 0 0 -30 v-25 a10 10 0 0 1 10 -10 z"
        stroke="#8DC63F"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
    </svg>
  )
}

/**
 * BoletosPage - Ticket purchasing interface for MUNET
 */
export default function BoletosPage() {
  const datePickerRef = React.useRef<HTMLDivElement>(null)
  const ticketSelectorRef = React.useRef<HTMLDivElement>(null)
  const orderSummaryRef = React.useRef<HTMLDivElement>(null)
  const infoCardsRef = React.useRef<HTMLDivElement>(null)

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

  // Form sections sequential reveal animation
  React.useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (datePickerRef.current) {
        gsap.from(datePickerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power3.out',
        })
      }
      if (ticketSelectorRef.current) {
        gsap.from(ticketSelectorRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.5,
          ease: 'power3.out',
        })
      }
      if (orderSummaryRef.current) {
        gsap.from(orderSummaryRef.current, {
          x: 40,
          opacity: 0,
          duration: 0.6,
          delay: 0.7,
          ease: 'power3.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  // Info cards stagger reveal
  useStaggerReveal(infoCardsRef, '[data-info-card]', { y: 30, stagger: 0.1 })

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

      {/* Light Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#8DC63F]/10 via-[#8DC63F]/5 to-white py-16 sm:py-20">
        <TicketSVG />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <TextClipReveal>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Comprar Boletos
              </h1>
            </TextClipReveal>
            <p className="mt-4 text-lg text-muted-foreground">
              Adquiere tus boletos en línea y evita filas. Selecciona la fecha de
              tu visita y el tipo de boleto que necesitas.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Formulario de compra de boletos"
        >
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left column: Date picker + Ticket selector */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Picker */}
              <div ref={datePickerRef}>
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
              </div>

              {/* Ticket Selector */}
              <div ref={ticketSelectorRef}>
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
            </div>

            {/* Right column: Order Summary (sticky) */}
            <div className="lg:col-span-1" ref={orderSummaryRef}>
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
          <div ref={infoCardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div data-info-card>
              <InfoCard
                title="Horario"
                description="Martes a domingo de 10:00 a 18:00 hrs. Lunes cerrado."
              />
            </div>
            <div data-info-card>
              <InfoCard
                title="Descuentos"
                description="Estudiantes, maestros y adultos mayores con credencial vigente."
              />
            </div>
            <div data-info-card>
              <InfoCard
                title="Domingos Gratuitos"
                description="Entrada gratuita para nacionales mexicanos todos los domingos."
              />
            </div>
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
