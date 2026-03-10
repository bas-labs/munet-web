/**
 * Renta de Espacios Page
 * Venue rental information and inquiry generation
 * Based on PRD Section 5.9
 */

import * as React from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import { Button } from '@/components/ui/button'
import { SpaceCard, SpaceDetail, InquiryForm } from '@/components/spaces'
import { SPACES } from '@/lib/data/spaces'
import type { Space } from '@/lib/types/spaces'
import {
  GrainOverlay,
  AmbientGlow,
  TextClipReveal,
  MagneticWrap,
  TiltCard,
  SectionReveal,
  useStaggerReveal,
} from '@/components/ui/gsap-primitives'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function RentaEspaciosPage() {
  const [selectedSpace, setSelectedSpace] = React.useState<Space | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [preselectedSpaceId, setPreselectedSpaceId] = React.useState<string>('')

  const heroRef = useRef<HTMLElement>(null)
  const spacesGridRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLElement>(null)

  // Hero parallax on gradient blobs
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const blobs = heroRef.current?.querySelectorAll('.hero-blob')
      if (!blobs) return

      blobs.forEach((blob) => {
        gsap.to(blob, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Space cards stagger
  useStaggerReveal(spacesGridRef, '.space-card', { y: 40, stagger: 0.1 })

  // Features stagger
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from('.feature-item', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      gsap.from('.feature-check', {
        scale: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.3,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, featuresRef)

    return () => ctx.revert()
  }, [])

  // Open space detail panel
  const handleSpaceSelect = (space: Space) => {
    setSelectedSpace(space)
    setIsDetailOpen(true)
  }

  // Open inquiry form from space detail
  const handleInquiryFromDetail = (space: Space) => {
    setPreselectedSpaceId(space.id)
    setIsDetailOpen(false)
    setIsFormOpen(true)
  }

  // Open inquiry form directly (general)
  const handleOpenGeneralInquiry = () => {
    setPreselectedSpaceId('')
    setIsFormOpen(true)
  }

  // Close detail panel
  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setSelectedSpace(null)
  }

  // Close inquiry form
  const handleCloseForm = () => {
    setIsFormOpen(false)
    setPreselectedSpaceId('')
  }

  return (
    <PageLayout>
      <SEOHead
        title="Renta de Espacios"
        description="Renta espacios unicos en MUNET para tu evento. Auditorio, salas, talleres, foro al aire libre y explanada. Arquitectura de Enrique Norten en Chapultepec."
        canonicalPath="/renta-de-espacios"
        keywords={['renta espacios CDMX', 'eventos corporativos', 'venue Chapultepec', 'auditorio museo']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Renta de Espacios', path: '/renta-de-espacios' },
        ]}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#09090B]">
        <img
          src="/images/fotogaleria/exteriormuseo/RHG_4544And8more_Optimizer.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <GrainOverlay />
        <AmbientGlow position="top-right" />
        <AmbientGlow position="bottom-left" color="#8DC63F" opacity={0.05} />

        {/* Gradient blobs for parallax */}
        <div className="hero-blob absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#8DC63F]/10 blur-[120px]" aria-hidden="true" />
        <div className="hero-blob absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#8DC63F]/5 blur-[100px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <TextClipReveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Renta de Espacios
              </h1>
            </TextClipReveal>
            <p className="mt-6 text-xl leading-relaxed text-white/80 sm:text-2xl">
              Haz de tu evento algo extraordinario en un espacio unico
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
              Descubre nuestros espacios disenados para crear experiencias memorables en el
              corazon del Bosque de Chapultepec, con la arquitectura iconica de MUNET como telon de fondo.
            </p>
            <div className="mt-10">
              <MagneticWrap>
                <Button
                  variant="primary"
                  size="xl"
                  onClick={handleOpenGeneralInquiry}
                >
                  Solicitar Cotizacion
                </Button>
              </MagneticWrap>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Nuestros Espacios
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cinco espacios versatiles para todo tipo de eventos, desde conferencias
              intimas hasta festivales al aire libre.
            </p>
          </div>

          {/* Space Cards Grid */}
          <div ref={spacesGridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SPACES.map((space) => (
              <TiltCard key={space.id} className="space-card">
                <SpaceCard
                  space={space}
                  onSelect={handleSpaceSelect}
                />
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="border-t border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Text Content */}
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Por que elegir MUNET?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                MUNET ofrece una experiencia unica para eventos, combinando arquitectura
                de clase mundial con tecnologia de vanguardia y un entorno natural incomparable.
              </p>

              <ul className="mt-10 space-y-6">
                {[
                  {
                    title: 'Arquitectura Iconica',
                    description:
                      'Disenado por Enrique Norten, MUNET es una obra maestra arquitectonica que impresionara a tus invitados.',
                  },
                  {
                    title: 'Ubicacion Privilegiada',
                    description:
                      'En el corazon del Bosque de Chapultepec, con facil acceso y estacionamiento amplio.',
                  },
                  {
                    title: 'Equipamiento Profesional',
                    description:
                      'Audio, video, iluminacion y conectividad de ultima generacion en todos nuestros espacios.',
                  },
                  {
                    title: 'Equipo de Eventos',
                    description:
                      'Personal capacitado para asistirte en la planificacion y ejecucion de tu evento.',
                  },
                ].map((feature) => (
                  <li key={feature.title} className="feature-item flex gap-4">
                    <div className="feature-check flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Museum Image */}
            <div className="relative overflow-hidden rounded-2xl lg:order-first">
              <img
                src="/images/fotogaleria/exteriormuseo/RHG_3860And8more_Optimizer.jpg"
                alt="Museo MUNET - Vista exterior"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SectionReveal direction="diagonal">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent/80 px-6 py-16 text-center shadow-2xl sm:px-16 sm:py-24">
              <h2 className="font-display text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl">
                Listo para crear algo extraordinario?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-accent-foreground/80">
                Nuestro equipo esta listo para ayudarte a planificar el evento perfecto.
                Contactanos hoy y recibe una cotizacion personalizada.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticWrap>
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={handleOpenGeneralInquiry}
                  >
                    Solicitar Cotizacion
                  </Button>
                </MagneticWrap>
                <MagneticWrap>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10"
                    asChild
                  >
                    <a href="tel:+525512345678">Llamar: 55 1234 5678</a>
                  </Button>
                </MagneticWrap>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Space Detail Panel */}
      {selectedSpace && (
        <SpaceDetail
          space={selectedSpace}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
          onInquiry={handleInquiryFromDetail}
        />
      )}

      {/* Inquiry Form Modal */}
      <InquiryForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        preselectedSpaceId={preselectedSpaceId}
      />
    </PageLayout>
  )
}
