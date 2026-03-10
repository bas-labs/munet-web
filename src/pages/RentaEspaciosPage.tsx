import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default function RentaEspaciosPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Renta de Espacios' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Renta de Espacios</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Haz de tu evento algo extraordinario en el entorno único de MUNET.
          </p>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Auditorio', capacity: '200 personas' },
              { name: 'Salas de Exposición', capacity: 'Variable' },
              { name: 'Talleres', capacity: '30 personas' },
              { name: 'Foro al Aire Libre', capacity: '500 personas' },
              { name: 'Explanada', capacity: '1000+ personas' },
            ].map((space) => (
              <div
                key={space.name}
                className="rounded-lg border border-border bg-card p-6"
              >
                <div className="mb-4 h-40 rounded-md bg-muted" />
                <h3 className="text-lg font-semibold">{space.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Capacidad: {space.capacity}
                </p>
                <Button variant="outline" className="mt-4 w-full">
                  Solicitar Información
                </Button>
              </div>
            ))}
          </div>
          
          {/* Inquiry Form Placeholder */}
          <div className="mt-12 rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold">Solicita una Cotización</h2>
            <p className="mt-2 text-muted-foreground">
              Completa el formulario y te contactaremos.
            </p>
            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nombre"
                className="rounded-md border border-input bg-background px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-md border border-input bg-background px-3 py-2"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="rounded-md border border-input bg-background px-3 py-2"
              />
              <input
                type="text"
                placeholder="Tipo de Evento"
                className="rounded-md border border-input bg-background px-3 py-2"
              />
              <textarea
                placeholder="Mensaje"
                rows={4}
                className="rounded-md border border-input bg-background px-3 py-2 sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <Button type="submit" size="lg">
                  Enviar Solicitud
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
