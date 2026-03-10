import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function ExposicionesPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Exposiciones' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Exposiciones</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explora nuestras exposiciones interactivas sobre energía y tecnología
            en dos niveles del museo.
          </p>
          
          <div className="mt-12">
            {/* Floor toggle and exhibition grid will be implemented here */}
            <div className="mb-8 flex gap-4">
              <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
                Nivel 1
              </button>
              <button className="rounded-md bg-muted px-4 py-2 text-muted-foreground">
                Nivel 2
              </button>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Conceptos Básicos',
                'Electricidad',
                'Combustibles Fósiles',
                'Energía Nuclear',
                'Sostenibilidad',
              ].map((expo) => (
                <div
                  key={expo}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="mb-4 h-40 rounded-md bg-muted" />
                  <h3 className="text-lg font-semibold">{expo}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Descripción de la exposición próximamente.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
