import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function ServiciosPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Servicios' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Servicios</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Conoce los servicios disponibles durante tu visita al museo.
          </p>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Cafetería',
                description: 'Disfruta de bebidas y alimentos en nuestro café.',
              },
              {
                title: 'Tienda MUNET',
                description: 'Llévate un recuerdo de tu visita.',
              },
              {
                title: 'Guardarropa / Lockers',
                description: 'Guarda tus pertenencias de forma segura.',
              },
              {
                title: 'Wi-Fi Gratuito',
                description: 'Conéctate durante tu visita.',
              },
              {
                title: 'Sanitarios',
                description: 'Instalaciones limpias y accesibles.',
              },
              {
                title: 'Estacionamiento',
                description: 'Estacionamiento disponible para visitantes.',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-border bg-card p-6"
              >
                <div className="mb-4 h-12 w-12 rounded-md bg-muted" />
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
