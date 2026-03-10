import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import {
  GrainOverlay,
  AmbientGlow,
  SectionReveal,
  TiltCard,
  useStaggerReveal,
} from '@/components/ui/gsap-primitives'
import { Timeline } from '@/components/about/Timeline'

gsap.registerPlugin(ScrollTrigger)

const PRINCIPIOS = [
  { label: 'Educación', description: 'Inspirar el aprendizaje continuo a través de experiencias interactivas.' },
  { label: 'Sostenibilidad', description: 'Promover un futuro energético responsable y consciente.' },
  { label: 'Innovación', description: 'Impulsar soluciones tecnológicas que transformen nuestra relación con la energía.' },
  { label: 'Inclusión', description: 'Garantizar que el conocimiento sea accesible para todas las personas.' },
]

export default function QuienesSomosPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const principiosRef = useRef<HTMLDivElement>(null)

  // Word-by-word 3D reveal for hero headline
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const words = heroRef.current?.querySelectorAll('.hero-word')
      if (!words) return

      gsap.from(words, {
        y: 50,
        rotateX: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      })

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.5,
        ease: 'power2.out',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Stagger reveal for principios cards
  useStaggerReveal(principiosRef, '.principio-card', { y: 40, stagger: 0.1, triggerStart: 'top 85%' })

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

      {/* Dark Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#09090B] pb-28 pt-12">
        <img
          src="/images/fotogaleria/exteriormuseo/RHG_3698And8more_Optimizer.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <GrainOverlay />
        <AmbientGlow position="top-right" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" style={{ perspective: '600px' }}>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {'Quiénes Somos'.split(' ').map((word, i) => (
                <span key={i} className="hero-word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </h1>
          </div>
          <p className="hero-subtitle mt-6 max-w-2xl text-lg text-white/60">
            MUNET — Museo Nacional de Energía y Tecnología es el primer museo
            nacional de México dedicado a la energía y tecnología.
          </p>
        </div>

        {/* Dark-to-white gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent z-[1] pointer-events-none" />
      </section>

      {/* Nuestra Historia */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionReveal direction="left" triggerStart="top 90%">
          <section aria-labelledby="historia-heading" className="mb-20">
            <div className="border-l-4 border-[#8DC63F] pl-8 py-4">
              <img src="/images/logo_verde.png" alt="MUNET" className="h-16 w-auto mb-6" />
              <h2 id="historia-heading" className="font-display text-3xl font-bold">Nuestra Historia</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                El 22 de octubre de 1942 fue publicado en el Diario Oficial de la Federación un Acuerdo del Ejecutivo Federal mediante el cual, el entonces Departamento del Distrito Federal (DDF), cedió en forma gratuita a la Comisión Federal de Electricidad (CFE) un predio ubicado en la Segunda Sección del Bosque de Chapultepec de la Ciudad de México. Sin embargo no es sino hasta 1993 cuando por Acuerdo Presidencial del 2 de marzo, la CFE y el DDF formalizaron el Contrato de Donación del predio, de aproximadamente 55,000 m2. En dicho Contrato se acordó que la CFE seguiría utilizando el inmueble para un Museo Tecnológico, estableciendo que en caso de que le diera un uso distinto, el DDF podría gestionar la revocación de la donación. El Museo Tecnológico de la CFE se inauguró en 1970, enfocándose principalmente al tema de la energía eléctrica. El conocido como MUTEC se remodeló en el año 2000, sin registrar desde entonces cambios, actualizaciones o ampliaciones significativas en sus contenidos.
              </p>
            </div>
          </section>
        </SectionReveal>

        {/* Timeline */}
        <section aria-labelledby="proyecto-heading" className="mb-20">
          <h2 id="proyecto-heading" className="font-display text-3xl font-bold mb-12">El Proyecto</h2>
          <Timeline />
        </section>

        {/* Principios Rectores */}
        <section aria-labelledby="principios-heading">
          <h2 id="principios-heading" className="font-display text-3xl font-bold mb-8">Principios Rectores</h2>
          <div ref={principiosRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPIOS.map((p) => (
              <TiltCard key={p.label} className="principio-card">
                <div className="group relative rounded-lg border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-[#8DC63F]/10">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#8DC63F]/0 to-[#8DC63F]/0 transition-all duration-500 group-hover:from-[#8DC63F]/5 group-hover:to-transparent pointer-events-none" />
                  <div className="relative">
                    <h3 className="text-lg font-semibold mb-2">{p.label}</h3>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
