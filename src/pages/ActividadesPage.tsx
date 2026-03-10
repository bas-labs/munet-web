import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function ActividadesPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Actividades' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Actividades y Programas</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Talleres, conferencias, visitas guiadas y programas escolares.
          </p>
          
          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {['Todos', 'Talleres', 'Conferencias', 'Visitas Guiadas', 'Programas Escolares'].map(
              (category) => (
                <button
                  key={category}
                  className="rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground first:bg-primary first:text-primary-foreground"
                >
                  {category}
                </button>
              )
            )}
          </div>
          
          {/* Calendar Placeholder */}
          <div className="mt-8 rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold">Calendario de Actividades</h2>
            <div className="mt-4 h-64 rounded-md bg-muted">
              <p className="flex h-full items-center justify-center text-muted-foreground">
                Calendario de actividades próximamente
              </p>
            </div>
          </div>
          
          {/* Events Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6"
              >
                <div className="mb-4 h-32 rounded-md bg-muted" />
                <p className="text-sm text-muted-foreground">Próximamente</p>
                <h3 className="text-lg font-semibold">Evento {i}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Descripción del evento próximamente.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
