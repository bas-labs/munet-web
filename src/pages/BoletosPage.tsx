import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default function BoletosPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Boletos' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Comprar Boletos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Adquiere tus boletos en línea y evita filas.
          </p>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Date Picker Placeholder */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold">Selecciona la Fecha</h2>
                <div className="mt-4 h-64 rounded-md bg-muted">
                  {/* Calendar component placeholder */}
                  <p className="flex h-full items-center justify-center text-muted-foreground">
                    Calendario de fechas próximamente
                  </p>
                </div>
              </div>
              
              {/* Ticket Types */}
              <div className="mt-6 rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold">Tipo de Boleto</h2>
                <div className="mt-4 space-y-4">
                  {[
                    { type: 'General', price: '$120 MXN' },
                    { type: 'Estudiante', price: '$60 MXN' },
                    { type: 'Maestro', price: '$60 MXN' },
                    { type: 'INAPAM', price: '$60 MXN' },
                    { type: 'Niño (3-12 años)', price: '$60 MXN' },
                    { type: 'Niño (<3 años)', price: 'Gratis' },
                  ].map((ticket) => (
                    <div
                      key={ticket.type}
                      className="flex items-center justify-between rounded-md border border-border p-4"
                    >
                      <div>
                        <p className="font-medium">{ticket.type}</p>
                        <p className="text-sm text-muted-foreground">{ticket.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="rounded-md border border-border px-3 py-1">
                          -
                        </button>
                        <span className="w-8 text-center">0</span>
                        <button className="rounded-md border border-border px-3 py-1">
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="sticky top-24 rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold">Resumen</h2>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha</span>
                    <span>—</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Boletos</span>
                    <span>0</span>
                  </div>
                  <div className="my-4 border-t border-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>$0 MXN</span>
                  </div>
                </div>
                <Button className="mt-6 w-full" size="lg" disabled>
                  Proceder al Pago
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Pago seguro con Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
