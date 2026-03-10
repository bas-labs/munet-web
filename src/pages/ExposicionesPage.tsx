import { useState } from 'react'
import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SEOHead, StructuredData } from '@/components/seo'
import { cn } from '@/lib/utils'

const nivel1Exposiciones = [
  {
    id: 'conceptos-basicos',
    title: 'Conceptos Básicos',
    description: 'Definición de energía, transformación materia-energía y manifestaciones de la energía.',
  },
  {
    id: 'electricidad',
    title: 'Electricidad',
    description: 'Energía secundaria, flujo de electrones, tipos de circuitos y métodos de generación.',
  },
  {
    id: 'combustibles-fosiles',
    title: 'Combustibles Fósiles',
    description: 'Carbón, gas natural, petróleo y su impacto ambiental.',
  },
  {
    id: 'energia-nuclear',
    title: 'Energía Nuclear',
    description: 'Fusión y fisión, producción libre de GHG y aplicaciones médicas.',
  },
  {
    id: 'sostenibilidad-n1',
    title: 'Sostenibilidad',
    description: 'Desarrollo sostenible y la tecnología como habilitador del futuro energético.',
  },
]

const nivel2Exposiciones = [
  {
    id: 'energia-solar',
    title: 'Energía Solar',
    description: 'El sol como fuente primaria, paneles fotovoltaicos y energía renovable.',
  },
  {
    id: 'energia-eolica',
    title: 'Energía Eólica',
    description: 'Historia de la energía eólica, aerogeneradores y tecnología de turbinas.',
  },
  {
    id: 'energia-hidraulica',
    title: 'Energía Hidráulica',
    description: 'Energía hidroeléctrica, energía potencial y cinética del agua.',
  },
  {
    id: 'energia-geotermica',
    title: 'Energía Geotérmica',
    description: 'Calor interno de la Tierra, géiseres y generación de electricidad.',
  },
  {
    id: 'bioenergia',
    title: 'Bioenergía',
    description: 'Tipos de biomasa, producción de biocombustibles y la energía más antigua.',
  },
  {
    id: 'sostenibilidad-n2',
    title: 'Sostenibilidad',
    description: 'Retos globales de sostenibilidad.',
  },
]

export default function ExposicionesPage() {
  const [activeLevel, setActiveLevel] = useState<1 | 2>(1)
  const exposiciones = activeLevel === 1 ? nivel1Exposiciones : nivel2Exposiciones

  return (
    <PageLayout>
      <SEOHead
        title="Exposiciones"
        description="Explora las exposiciones interactivas de MUNET sobre energía solar, eólica, nuclear, hidráulica, geotérmica y más. Dos niveles de experiencias educativas."
        canonicalPath="/exposiciones"
        keywords={['exposiciones museo', 'energía solar', 'energía eólica', 'energía nuclear', 'sostenibilidad']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Exposiciones', path: '/exposiciones' },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Exposiciones' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Exposiciones</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explora nuestras exposiciones interactivas sobre energía y tecnología
            en dos niveles del museo.
          </p>
          
          <div className="mt-12">
            {/* Floor toggle */}
            <div 
              className="mb-8 flex gap-4" 
              role="tablist" 
              aria-label="Niveles del museo"
            >
              <button 
                role="tab"
                aria-selected={activeLevel === 1}
                aria-controls="exposiciones-panel"
                id="nivel1-tab"
                onClick={() => setActiveLevel(1)}
                className={cn(
                  'rounded-md px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  activeLevel === 1 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                Nivel 1
              </button>
              <button 
                role="tab"
                aria-selected={activeLevel === 2}
                aria-controls="exposiciones-panel"
                id="nivel2-tab"
                onClick={() => setActiveLevel(2)}
                className={cn(
                  'rounded-md px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  activeLevel === 2 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                Nivel 2
              </button>
            </div>
            
            <div 
              id="exposiciones-panel"
              role="tabpanel"
              aria-labelledby={`nivel${activeLevel}-tab`}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {exposiciones.map((expo) => (
                <article
                  key={expo.id}
                  className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring"
                >
                  <div className="mb-4 h-40 rounded-md bg-muted" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">{expo.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {expo.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
