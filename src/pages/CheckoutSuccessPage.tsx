import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, Home, Ticket } from 'lucide-react'

interface OrderDetails {
  orderId: string
  date: string
  email: string
  totalAmount: number
  qrCode: string
}

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, you would fetch order details from the API
    // using the session_id. For now, we show a generic success message.
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Mock order details for display
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

  return (
    <PageLayout>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="mt-4 text-muted-foreground">Procesando tu compra...</p>
            </div>
          ) : (
            <>
              {/* Success Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
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
                <div className="mt-8 rounded-lg border border-border bg-card p-6 text-left">
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
                  <div className="mt-6 rounded-md bg-muted p-4 text-center">
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
