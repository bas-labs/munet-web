/**
 * Renta de Espacios Page
 * Venue rental information and inquiry generation
 * Based on PRD Section 5.9
 */

import * as React from 'react'
import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { SpaceCard, SpaceDetail, InquiryForm } from '@/components/spaces'
import { SPACES } from '@/lib/data/spaces'
import type { Space } from '@/lib/types/spaces'

export default function RentaEspaciosPage() {
  const [selectedSpace, setSelectedSpace] = React.useState<Space | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [preselectedSpaceId, setPreselectedSpaceId] = React.useState<string>('')

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Renta de Espacios
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-primary-foreground/80 sm:text-2xl">
              Haz de tu evento algo extraordinario en un espacio único
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/60">
              Descubre nuestros espacios diseñados para crear experiencias memorables en el 
              corazón del Bosque de Chapultepec, con la arquitectura icónica de MUNET como telón de fondo.
            </p>
            <div className="mt-10">
              <Button
                variant="primary"
                size="xl"
                onClick={handleOpenGeneralInquiry}
              >
                Solicitar Cotización
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: 'Renta de Espacios' }]}
            className="mb-8"
          />

          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Nuestros Espacios
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cinco espacios versátiles para todo tipo de eventos, desde conferencias 
              íntimas hasta festivales al aire libre.
            </p>
          </div>

          {/* Space Cards Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SPACES.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                onSelect={handleSpaceSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Text Content */}
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                ¿Por qué elegir MUNET?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                MUNET ofrece una experiencia única para eventos, combinando arquitectura 
                de clase mundial con tecnología de vanguardia y un entorno natural incomparable.
              </p>

              <ul className="mt-10 space-y-6">
                {[
                  {
                    title: 'Arquitectura Icónica',
                    description:
                      'Diseñado por Enrique Norten, MUNET es una obra maestra arquitectónica que impresionará a tus invitados.',
                  },
                  {
                    title: 'Ubicación Privilegiada',
                    description:
                      'En el corazón del Bosque de Chapultepec, con fácil acceso y estacionamiento amplio.',
                  },
                  {
                    title: 'Equipamiento Profesional',
                    description:
                      'Audio, video, iluminación y conectividad de última generación en todos nuestros espacios.',
                  },
                  {
                    title: 'Equipo de Eventos',
                    description:
                      'Personal capacitado para asistirte en la planificación y ejecución de tu evento.',
                  },
                ].map((feature) => (
                  <li key={feature.title} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
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

            {/* Right: Image Placeholder */}
            <div className="relative overflow-hidden rounded-2xl bg-muted lg:order-first">
              <div className="flex aspect-[4/3] items-center justify-center lg:aspect-auto lg:h-full">
                <div className="text-center text-muted-foreground/30">
                  <svg
                    className="mx-auto h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0.5}
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>
                  <p className="mt-4 text-sm">Imagen del Museo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent/80 px-6 py-16 text-center shadow-2xl sm:px-16 sm:py-24">
            <h2 className="font-display text-3xl font-bold tracking-tight text-accent-foreground sm:text-4xl">
              ¿Listo para crear algo extraordinario?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-accent-foreground/80">
              Nuestro equipo está listo para ayudarte a planificar el evento perfecto. 
              Contáctanos hoy y recibe una cotización personalizada.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleOpenGeneralInquiry}
              >
                Solicitar Cotización
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10"
                asChild
              >
                <a href="tel:+525512345678">Llamar: 55 1234 5678</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
