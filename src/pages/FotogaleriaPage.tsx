import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function FotogaleriaPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Fotogalería' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Fotogalería</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explora imágenes de nuestra arquitectura, exposiciones y eventos.
          </p>
          
          {/* Category Filter */}
          <div className="mt-8 flex flex-wrap gap-2">
            {['Todos', 'Arquitectura', 'Exposiciones', 'Eventos', 'Construcción'].map(
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
          
          {/* Masonry Grid Placeholder */}
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div
                key={i}
                className="mb-4 break-inside-avoid rounded-lg bg-muted"
                style={{ height: `${150 + (i % 3) * 50}px` }}
              >
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Imagen {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
