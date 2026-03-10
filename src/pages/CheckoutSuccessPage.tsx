import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Download, Home, Ticket } from 'lucide-react'

interface OrderDetails {
  orderId: string
  date: string
  email: string
  totalAmount: number
  qrCode: string
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const loadingCircleRef = useRef<SVGCircleElement>(null)
  const checkmarkRef = useRef<SVGPolylineElement>(null)
  const orderCardRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  const confettiContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (sessionId) {
        setOrderDetails({
          orderId: sessionId.slice(0, 8).toUpperCase(),
          date: new Date().toISOString().split('T')[0],
          email: 'usuario@ejemplo.com',
          totalAmount: 30000,
          qrCode: `MUNET-${sessionId.slice(0, 8).toUpperCase()}-XXXX`,
        })
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [sessionId])

  // Loading circle animation
  useEffect(() => {
    if (!isLoading || !loadingCircleRef.current) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to(loadingCircleRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [isLoading])

  // Success animations - fire after state transition
  useEffect(() => {
    if (isLoading || !orderDetails) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Checkmark stroke draw
      if (checkmarkRef.current) {
        const length = checkmarkRef.current.getTotalLength()
        gsap.set(checkmarkRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(checkmarkRef.current, {
          strokeDashoffset: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        })
      }

      // Order card fade up
      if (orderCardRef.current) {
        gsap.from(orderCardRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.9,
        })
      }

      // QR / access code section scale in
      if (qrRef.current) {
        gsap.from(qrRef.current, {
          scale: 0,
          duration: 0.5,
          delay: 1.2,
          ease: 'back.out(1.5)',
        })
      }

      // Confetti burst
      if (confettiContainerRef.current) {
        const colors = ['#8DC63F', '#FFD700', '#8DC63F', '#FFD700']
        const pieces: HTMLDivElement[] = []

        for (let i = 0; i < 20; i++) {
          const piece = document.createElement('div')
          piece.style.position = 'absolute'
          piece.style.width = '8px'
          piece.style.height = '8px'
          piece.style.borderRadius = '1px'
          piece.style.backgroundColor = colors[i % colors.length]
          piece.style.left = '50%'
          piece.style.top = '50%'
          piece.style.transform = 'translate(-50%, -50%)'
          confettiContainerRef.current.appendChild(piece)
          pieces.push(piece)
        }

        gsap.to(pieces, {
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-200, 200),
          rotation: () => gsap.utils.random(0, 360),
          opacity: 0,
          duration: 1,
          stagger: 0.02,
          delay: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            pieces.forEach((p) => p.remove())
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isLoading, orderDetails])

  return (
    <PageLayout>
      <div ref={containerRef} className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg width="50" height="50" viewBox="0 0 50 50" className="rotate-[-90deg]">
                <circle
                  ref={loadingCircleRef}
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#8DC63F"
                  strokeWidth={3}
                  strokeDasharray={126}
                  strokeDashoffset={126}
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-4 text-muted-foreground">Procesando tu compra...</p>
            </div>
          ) : (
            <>
              {/* Animated Checkmark Icon */}
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                <div
                  ref={confettiContainerRef}
                  className="pointer-events-none absolute inset-0 overflow-visible"
                  aria-hidden="true"
                />
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <polyline
                      ref={checkmarkRef}
                      points="10,20 18,28 30,12"
                      fill="none"
                      stroke="#8DC63F"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                ¡Gracias por tu compra!
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Tu pago ha sido procesado exitosamente.
              </p>

              {/* Order Details Card */}
              {orderDetails && (
                <div ref={orderCardRef} className="mt-8 rounded-lg border border-border bg-card p-6 text-left">
                  <h2 className="text-lg font-semibold">Detalles de tu pedido</h2>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Número de orden</dt>
                      <dd className="font-medium">#{orderDetails.orderId}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Fecha de visita</dt>
                      <dd className="font-medium">{orderDetails.date}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Total pagado</dt>
                      <dd className="font-medium">
                        ${(orderDetails.totalAmount / 100).toFixed(0)} MXN
                      </dd>
                    </div>
                  </dl>

                  {/* QR Code / Access Code */}
                  <div ref={qrRef} className="mt-6 rounded-md bg-muted p-4 text-center">
                    <p className="text-xs text-muted-foreground">CÓDIGO DE ACCESO</p>
                    <p className="mt-1 font-mono text-xl font-bold tracking-wider text-primary">
                      {orderDetails.qrCode}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Presenta este código en la entrada del museo
                    </p>
                  </div>
                </div>
              )}

              {/* Email Confirmation Notice */}
              <div className="mt-6 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                <p>
                  Hemos enviado un correo de confirmación con tus boletos a tu dirección de email.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button variant="default" size="lg" disabled className="gap-2">
                  <Download className="h-4 w-4" />
                  Descargar Boletos
                </Button>
                <Button variant="outline" size="lg" asChild className="gap-2">
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    Volver al Inicio
                  </Link>
                </Button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                La descarga de boletos estará disponible próximamente
              </p>

              {/* Visit Information */}
              <div className="mt-12 border-t border-border pt-8">
                <h3 className="text-lg font-semibold">Información para tu visita</h3>
                <div className="mt-4 grid gap-4 text-left text-sm sm:grid-cols-2">
                  <div className="rounded-md border border-border p-4">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Horario</h4>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Martes a Domingo<br />
                      10:00 - 18:00 hrs
                    </p>
                  </div>
                  <div className="rounded-md border border-border p-4">
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Ubicación</h4>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Av. de los Compositores s/n<br />
                      Bosque de Chapultepec II Secc.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
