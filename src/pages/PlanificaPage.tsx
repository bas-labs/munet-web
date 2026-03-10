import * as React from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { SEOHead, StructuredData } from '@/components/seo'
import {
  TextClipReveal,
  TiltCard,
  AnimatedCounter,
  useStaggerReveal,
} from '@/components/ui/gsap-primitives'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Compass SVG icon for hero section
 */
function CompassIcon() {
  const ref = React.useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        rotation: -180,
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: 'back.out(1.5)',
        transformOrigin: '50% 50%',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={ref}
      className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="55" stroke="#8DC63F" strokeWidth="2" strokeOpacity="0.2" />
      <circle cx="60" cy="60" r="45" stroke="#8DC63F" strokeWidth="1" strokeOpacity="0.15" />
      <path d="M60 15 L63 55 L60 60 L57 55 Z" fill="#8DC63F" fillOpacity="0.3" />
      <path d="M60 105 L63 65 L60 60 L57 65 Z" fill="#8DC63F" fillOpacity="0.15" />
      <path d="M15 60 L55 57 L60 60 L55 63 Z" fill="#8DC63F" fillOpacity="0.15" />
      <path d="M105 60 L65 57 L60 60 L65 63 Z" fill="#8DC63F" fillOpacity="0.3" />
      <circle cx="60" cy="60" r="4" fill="#8DC63F" fillOpacity="0.4" />
    </svg>
  )
}

export default function PlanificaPage() {
  const cardsGridRef = React.useRef<HTMLDivElement>(null)
  const hoursRef = React.useRef<HTMLDListElement>(null)
  const mapRef = React.useRef<HTMLDivElement>(null)
  const accessibilityRef = React.useRef<HTMLUListElement>(null)

  // Stagger reveal for cards grid
  useStaggerReveal(cardsGridRef, '[data-plan-card]', { y: 40, stagger: 0.12 })

  // Hours rows left-to-right stagger
  React.useEffect(() => {
    if (prefersReducedMotion() || !hoursRef.current) return

    const ctx = gsap.context(() => {
      const rows = hoursRef.current?.querySelectorAll('[data-hour-row]')
      if (!rows || rows.length === 0) return

      gsap.from(rows, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: hoursRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, hoursRef)

    return () => ctx.revert()
  }, [])

  // Map clip-path reveal from center
  React.useEffect(() => {
    if (prefersReducedMotion() || !mapRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, mapRef)

    return () => ctx.revert()
  }, [])

  // Accessibility icons scale-in sequentially
  React.useEffect(() => {
    if (prefersReducedMotion() || !accessibilityRef.current) return

    const ctx = gsap.context(() => {
      const items = accessibilityRef.current?.querySelectorAll('[data-access-item]')
      if (!items || items.length === 0) return

      gsap.from(items, {
        scale: 0.5,
        opacity: 0,
        duration: 0.4,
        stagger: 0.12,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: accessibilityRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, accessibilityRef)

    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      <SEOHead
        title="Planifica tu Visita"
        description="Horarios, ubicación, tarifas y servicios de accesibilidad de MUNET. Martes a domingo de 10:00 a 18:00 hrs. Entrada gratuita domingos para nacionales."
        canonicalPath="/planifica-tu-visita"
        keywords={['horario museo', 'cómo llegar MUNET', 'precios boletos', 'Chapultepec museo']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Planifica tu Visita', path: '/planifica-tu-visita' },
        ]}
      />

      {/* Light Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-white py-16 sm:py-20">
        <CompassIcon />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <TextClipReveal>
              <h1 className="text-3xl font-bold font-display sm:text-4xl lg:text-5xl">
                Planifica tu Visita
              </h1>
            </TextClipReveal>
            <p className="mt-4 text-lg text-muted-foreground">
              Todo lo que necesitas saber para planificar tu visita al museo.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div ref={cardsGridRef} className="mt-4 grid gap-8 lg:grid-cols-2">
          {/* Hours */}
          <div data-plan-card>
            <TiltCard className="h-full">
              <section
                className="rounded-lg border border-border p-6 h-full bg-card"
                aria-labelledby="horarios-heading"
              >
                <h2 id="horarios-heading" className="text-xl font-bold">Horarios de Apertura</h2>
                <dl ref={hoursRef} className="mt-4 space-y-2">
                  <div className="flex justify-between" data-hour-row>
                    <dt>Lunes</dt>
                    <dd className="text-muted-foreground">CERRADO</dd>
                  </div>
                  <div className="flex justify-between" data-hour-row>
                    <dt>Martes – Domingo</dt>
                    <dd className="text-muted-foreground">10:00 – 18:00 hrs</dd>
                  </div>
                </dl>
              </section>
            </TiltCard>
          </div>

          {/* Pricing */}
          <div data-plan-card>
            <TiltCard className="h-full">
              <section
                className="rounded-lg border border-border p-6 h-full bg-card"
                aria-labelledby="tarifas-heading"
              >
                <h2 id="tarifas-heading" className="text-xl font-bold">Tarifas</h2>
                <dl className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <dt>General</dt>
                    <dd>
                      <AnimatedCounter end={120} prefix="$" suffix=" MXN" />
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Estudiantes / INAPAM</dt>
                    <dd>
                      <AnimatedCounter end={60} prefix="$" suffix=" MXN" />
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Niños (3-12 años)</dt>
                    <dd>$60 MXN</dd>
                  </div>
                  <div className="flex justify-between font-semibold text-primary">
                    <dt>Domingos — Nacionales</dt>
                    <dd>GRATIS</dd>
                  </div>
                </dl>
                <Button asChild className="mt-4 w-full">
                  <Link to="/boletos">Comprar Boletos</Link>
                </Button>
              </section>
            </TiltCard>
          </div>

          {/* Location */}
          <div data-plan-card>
            <TiltCard className="h-full">
              <section
                className="rounded-lg border border-border p-6 h-full bg-card"
                aria-labelledby="ubicacion-heading"
              >
                <h2 id="ubicacion-heading" className="text-xl font-bold">Cómo Llegar</h2>
                <address className="mt-4 text-muted-foreground not-italic">
                  Av. de los Compositores s/n, Bosque de Chapultepec II Secc.,
                  Ciudad de México.
                </address>
                <div
                  ref={mapRef}
                  className="mt-4 h-48 rounded-md bg-muted"
                  role="img"
                  aria-label="Mapa de ubicación del museo MUNET"
                >
                  {/* Map placeholder */}
                </div>
              </section>
            </TiltCard>
          </div>

          {/* Accessibility */}
          <div data-plan-card>
            <TiltCard className="h-full">
              <section
                className="rounded-lg border border-border p-6 h-full bg-card"
                aria-labelledby="accesibilidad-heading"
              >
                <h2 id="accesibilidad-heading" className="text-xl font-bold">Accesibilidad</h2>
                <ul ref={accessibilityRef} className="mt-4 space-y-2 text-muted-foreground" role="list">
                  <li data-access-item>• Acceso para sillas de ruedas</li>
                  <li data-access-item>• Elevadores entre Nivel 1 y Nivel 2</li>
                  <li data-access-item>• Servicios de asistencia disponibles</li>
                </ul>
              </section>
            </TiltCard>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
