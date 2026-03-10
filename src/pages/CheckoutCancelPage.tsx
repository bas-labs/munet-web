import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ArrowLeft, HelpCircle } from 'lucide-react'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function CheckoutCancelPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const xIconRef = useRef<SVGSVGElement>(null)
  const redGlowRef = useRef<HTMLDivElement>(null)
  const redCircleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Red circle scales from 0
      if (redCircleRef.current) {
        gsap.from(redCircleRef.current, {
          scale: 0,
          duration: 0.4,
          ease: 'back.out(2)',
        })
      }

      // X icon animation
      if (xIconRef.current) {
        gsap.from(xIconRef.current, {
          scale: 0,
          rotation: -90,
          duration: 0.5,
          ease: 'back.out(2)',
        })
        // Pulse after settling
        gsap.to(xIconRef.current, {
          scale: 1.1,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          delay: 0.6,
        })
      }

      // Red glow fade in
      if (redGlowRef.current) {
        gsap.from(redGlowRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
        })
      }

      // Error card slide up
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: 0.7,
        })
      }

      // Buttons stagger in
      gsap.from('.cancel-btn', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        delay: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      <div ref={containerRef} className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Cancel Icon */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
            {/* Red glow behind */}
            <div
              ref={redGlowRef}
              className="absolute inset-0 rounded-full bg-red-500/20 blur-[40px]"
              aria-hidden="true"
            />
            <div
              ref={redCircleRef}
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
            >
              <svg
                ref={xIconRef}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-red-600"
              >
                <line
                  x1="8"
                  y1="8"
                  x2="24"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <line
                  x1="24"
                  y1="8"
                  x2="8"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Cancel Message */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Pago cancelado
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tu pago no fue procesado. No se ha realizado ningún cargo.
          </p>

          {/* Reason Card */}
          <div ref={cardRef} className="mt-8 rounded-lg border border-border bg-card p-6 text-left">
            <h2 className="text-lg font-semibold">¿Qué pasó?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              El proceso de pago fue cancelado o no se completó. Esto puede ocurrir si:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Decidiste no continuar con la compra
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                La sesión de pago expiró (30 minutos máximo)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Hubo un problema con tu método de pago
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                El banco rechazó la transacción
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="default" size="lg" asChild className="cancel-btn gap-2">
              <Link to="/boletos">
                <ArrowLeft className="h-4 w-4" />
                Intentar de nuevo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="cancel-btn gap-2">
              <Link to="/contacto">
                <HelpCircle className="h-4 w-4" />
                Necesito ayuda
              </Link>
            </Button>
          </div>

          {/* Help Notice */}
          <div className="cancel-btn mt-8 rounded-md bg-muted p-4 text-sm text-muted-foreground">
            <p>
              ¿Tienes problemas para completar tu compra?{' '}
              <Link to="/contacto" className="text-primary underline hover:no-underline">
                Contáctanos
              </Link>{' '}
              y te ayudaremos.
            </p>
          </div>

          {/* Alternative Options */}
          <div className="mt-12 border-t border-border pt-8">
            <h3 className="text-lg font-semibold">Otras opciones</h3>
            <div className="mt-4 grid gap-4 text-left text-sm sm:grid-cols-2">
              <Link
                to="/planifica-tu-visita"
                className="rounded-md border border-border p-4 transition-colors hover:bg-muted"
              >
                <h4 className="font-medium">Planifica tu visita</h4>
                <p className="mt-1 text-muted-foreground">
                  Consulta horarios, precios y cómo llegar
                </p>
              </Link>
              <Link
                to="/exposiciones"
                className="rounded-md border border-border p-4 transition-colors hover:bg-muted"
              >
                <h4 className="font-medium">Conoce las exposiciones</h4>
                <p className="mt-1 text-muted-foreground">
                  Explora lo que te espera en MUNET
                </p>
              </Link>
            </div>
          </div>

          {/* Domingo Note */}
          <div className="mt-8 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <p className="font-medium">¿Sabías que?</p>
            <p className="mt-1">
              Los domingos la entrada es gratuita para mexicanos con identificación oficial.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
