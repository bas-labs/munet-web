import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import { cn } from '@/lib/utils'
import {
  GrainOverlay,
  AmbientGlow,
  TextClipReveal,
  TiltCard,
  useStaggerReveal,
} from '@/components/ui/gsap-primitives'

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

const tabs = [
  { level: 1 as const, label: 'Nivel 1' },
  { level: 2 as const, label: 'Nivel 2' },
]

export default function ExposicionesPage() {
  const [activeLevel, setActiveLevel] = useState<1 | 2>(1)
  const [displayedLevel, setDisplayedLevel] = useState<1 | 2>(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const exposiciones = displayedLevel === 1 ? nivel1Exposiciones : nivel2Exposiciones

  const gridRef = useRef<HTMLDivElement>(null)
  const initialRevealDone = useRef(false)

  // Initial stagger reveal for cards on first load
  useStaggerReveal(gridRef, '.expo-card', { y: 40, stagger: 0.08, triggerStart: 'top 90%' })

  // Handle level switching with GSAP animation
  const handleLevelSwitch = useCallback(
    (level: 1 | 2) => {
      if (level === activeLevel || isTransitioning) return
      setIsTransitioning(true)
      setActiveLevel(level)

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReduced || !gridRef.current) {
        setDisplayedLevel(level)
        setIsTransitioning(false)
        return
      }

      const cards = gridRef.current.querySelectorAll('.expo-card')
      if (cards.length === 0) {
        setDisplayedLevel(level)
        setIsTransitioning(false)
        return
      }

      // Animate out current cards
      gsap.to(cards, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.03,
        onComplete: () => {
          setDisplayedLevel(level)
          // After React re-renders, animate new cards in
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!gridRef.current) return
              const newCards = gridRef.current.querySelectorAll('.expo-card')
              gsap.fromTo(
                newCards,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.08,
                  ease: 'power3.out',
                  onComplete: () => setIsTransitioning(false),
                },
              )
            })
          })
        },
      })
    },
    [activeLevel, isTransitioning],
  )

  // Mark initial reveal done after mount
  useEffect(() => {
    initialRevealDone.current = true
  }, [])

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

      {/* Dark Hero */}
      <section className="relative overflow-hidden bg-[#09090B] pb-28 pt-12">
        <GrainOverlay />
        <AmbientGlow position="top-right" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <TextClipReveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Camina por el Universo
              </h1>
            </TextClipReveal>
            <TextClipReveal delay={0.3}>
              <p className="font-display text-3xl font-bold tracking-tight text-[#8DC63F] sm:text-4xl lg:text-5xl">
                de la Energía
              </p>
            </TextClipReveal>
            <p className="mt-6 text-lg text-white/60">
              Explora nuestras exposiciones interactivas sobre energía y tecnología
              en dos niveles del museo.
            </p>
          </div>

          {/* Floor toggle tabs */}
          <div
            className="relative mt-12 flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 w-fit"
            role="tablist"
            aria-label="Niveles del museo"
          >
            {tabs.map((tab) => (
              <button
                key={tab.level}
                role="tab"
                aria-selected={activeLevel === tab.level}
                aria-controls="exposiciones-panel"
                id={`nivel${tab.level}-tab`}
                onClick={() => handleLevelSwitch(tab.level)}
                className={cn(
                  'relative z-10 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                  activeLevel === tab.level
                    ? 'text-[#09090B]'
                    : 'text-white/60 hover:text-white/90',
                )}
              >
                {tab.label}
              </button>
            ))}
            {/* Sliding indicator */}
            <span
              className="absolute top-1 bottom-1 rounded-full bg-[#8DC63F] transition-all duration-300 ease-out"
              style={{
                width: `calc(50% - 4px)`,
                transform: activeLevel === 1 ? 'translateX(4px)' : 'translateX(calc(100% + 4px))',
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Dark-to-white gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent z-[1] pointer-events-none" />
      </section>

      {/* Card Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div
          ref={gridRef}
          id="exposiciones-panel"
          role="tabpanel"
          aria-labelledby={`nivel${activeLevel}-tab`}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {exposiciones.map((expo) => (
            <TiltCard key={expo.id} className="expo-card">
              <article className="group relative rounded-lg border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-[#8DC63F]/10 focus-within:ring-2 focus-within:ring-ring">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#8DC63F]/0 to-[#8DC63F]/0 transition-all duration-500 group-hover:from-[#8DC63F]/5 group-hover:to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="mb-4 h-40 rounded-md bg-muted" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">{expo.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {expo.description}
                  </p>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
