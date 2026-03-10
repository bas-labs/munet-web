import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SEOHead, StructuredData } from '@/components/seo'

export default function QuienesSomosPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Quiénes Somos"
        description="Conoce la historia, el proyecto arquitectónico y los principios rectores de MUNET, el primer museo nacional de México dedicado a la energía y tecnología."
        canonicalPath="/quienes-somos"
        keywords={['historia MUNET', 'Enrique Norten', 'Bosque de Chapultepec', 'FIMUNET']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Quiénes Somos', path: '/quienes-somos' },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Quiénes Somos' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Quiénes Somos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            MUNET — Museo Nacional de Energía y Tecnología es el primer museo
            nacional de México dedicado a la energía y tecnología.
          </p>
          
          <div className="mt-12 space-y-12">
            <section aria-labelledby="historia-heading">
              <h2 id="historia-heading" className="text-2xl font-bold">Nuestra Historia</h2>
              <p className="mt-4 text-muted-foreground">
                Contenido de la historia del museo próximamente.
              </p>
            </section>
            
            <section aria-labelledby="proyecto-heading">
              <h2 id="proyecto-heading" className="text-2xl font-bold">El Proyecto</h2>
              <p className="mt-4 text-muted-foreground">
                Información sobre el proyecto arquitectónico próximamente.
              </p>
            </section>
            
            <section aria-labelledby="principios-heading">
              <h2 id="principios-heading" className="text-2xl font-bold">Principios Rectores</h2>
              <p className="mt-4 text-muted-foreground">
                Nuestros principios y valores próximamente.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
