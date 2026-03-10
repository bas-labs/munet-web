import { Link } from 'react-router-dom'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react'

export default function CheckoutCancelPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Cancel Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>

          {/* Cancel Message */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Pago cancelado
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tu pago no fue procesado. No se ha realizado ningún cargo.
          </p>

          {/* Reason Card */}
          <div className="mt-8 rounded-lg border border-border bg-card p-6 text-left">
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
            <Button variant="default" size="lg" asChild className="gap-2">
              <Link to="/boletos">
                <ArrowLeft className="h-4 w-4" />
                Intentar de nuevo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="gap-2">
              <Link to="/contacto">
                <HelpCircle className="h-4 w-4" />
                Necesito ayuda
              </Link>
            </Button>
          </div>

          {/* Help Notice */}
          <div className="mt-8 rounded-md bg-muted p-4 text-sm text-muted-foreground">
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
