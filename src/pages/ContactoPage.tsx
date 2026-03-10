/**
 * ContactoPage
 * Contact page with form, information, map, and social links
 * Based on PRD Section 5.11 - Contacto
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink,
} from 'lucide-react'
import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ContactForm } from '@/components/contact'
import {
  GrainOverlay,
  AmbientGlow,
  TextClipReveal,
  SectionReveal,
  MagneticWrap,
  useStaggerReveal,
} from '@/components/ui/gsap-primitives'

// TikTok icon (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
)

// Department contacts
const DEPARTMENT_CONTACTS = [
  {
    name: 'Información General',
    email: 'info@museomunet.com',
    description: 'Consultas generales sobre el museo',
  },
  {
    name: 'Prensa',
    email: 'prensa@museomunet.com',
    description: 'Solicitudes de medios y comunicación',
  },
  {
    name: 'Grupos Escolares',
    email: 'educacion@museomunet.com',
    description: 'Visitas educativas y programas escolares',
  },
  {
    name: 'Renta de Espacios',
    email: 'eventos@museomunet.com',
    description: 'Eventos corporativos y privados',
  },
]

// Social media links
const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/museomunet',
    icon: Facebook,
    color: 'hover:text-blue-600',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/museomunet',
    icon: Instagram,
    color: 'hover:text-pink-600',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@museomunet',
    icon: Youtube,
    color: 'hover:text-red-600',
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@museomunet',
    icon: TikTokIcon,
    color: 'hover:text-foreground',
  },
]

export default function ContactoPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const infoCardsRef = useRef<HTMLDivElement>(null)

  // Animated concentric pulse circles
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to('.pulse-circle', {
        scale: 2,
        opacity: 0,
        duration: 2.5,
        stagger: 0.6,
        repeat: -1,
        ease: 'power1.out',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Stagger reveal for info cards
  useStaggerReveal(infoCardsRef, '.info-card', { y: 30, stagger: 0.1 })

  return (
    <PageLayout>
      <SEOHead
        title="Contacto"
        description="Contáctanos para información sobre visitas, grupos escolares, renta de espacios y más. MUNET - Museo Nacional de Energía y Tecnología."
        canonicalPath="/contacto"
        keywords={['contacto MUNET', 'teléfono museo', 'email museo', 'visitas grupales']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Contacto', path: '/contacto' },
        ]}
      />

      {/* Dark Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#09090B] pb-28 pt-12">
        <img
          src="/images/fotogaleria/exteriormuseo/RHG_4004And8more_Optimizer.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <GrainOverlay />
        <AmbientGlow position="top-right" />

        {/* Animated concentric pulse circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              className="pulse-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width="200"
              height="200"
              viewBox="0 0 200 200"
              style={{ scale: 0.5, opacity: 0.3 }}
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#8DC63F"
                strokeWidth="1"
              />
            </svg>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <TextClipReveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Contacto
              </h1>
            </TextClipReveal>
            <TextClipReveal delay={0.3}>
              <p className="mt-6 text-xl text-white/70 sm:text-2xl">
                ¿Tienes preguntas? Estamos aquí para ayudarte.
              </p>
            </TextClipReveal>
          </div>
        </div>

        {/* Dark-to-white gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent z-[1] pointer-events-none" />
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right Column: Contact Info, Map, Socials */}
          <div ref={infoCardsRef} className="space-y-8">
            {/* General Contact Info */}
            <Card variant="default" className="info-card">
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:contacto@museomunet.com"
                      className="text-muted-foreground transition-colors hover:text-accent"
                    >
                      contacto@museomunet.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <a
                      href="tel:+525512345678"
                      className="text-muted-foreground transition-colors hover:text-accent"
                    >
                      +52 (55) 1234-5678
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Dirección</p>
                    <address className="not-italic text-muted-foreground">
                      Av. de los Compositores s/n,
                      <br />
                      Bosque de Chapultepec II Secc.,
                      <br />
                      Ciudad de México, C.P. 11580
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Horario</p>
                    <p className="text-muted-foreground">
                      Martes - Domingo: 10:00 - 18:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lunes: Cerrado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Contacts */}
            <Card variant="default" className="info-card">
              <CardHeader>
                <CardTitle>Contacto por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {DEPARTMENT_CONTACTS.map((dept, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                    >
                      <p className="font-medium">{dept.name}</p>
                      <a
                        href={`mailto:${dept.email}`}
                        className="text-sm text-accent hover:underline"
                      >
                        {dept.email}
                      </a>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {dept.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <SectionReveal direction="bottom" triggerStart="top 90%">
              <Card variant="default" className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Ubicación
                    <a
                      href="https://maps.google.com/?q=Museo+Nacional+de+Energia+y+Tecnologia+MUNET"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-normal text-accent hover:underline"
                    >
                      Ver en Google Maps
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Google Maps Embed Placeholder */}
                  <div className="relative aspect-video w-full bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661234567890!2d-99.21234567890123!3d19.42345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBosque+de+Chapultepec!5e0!3m2!1ses!2smx!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: 250 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de MUNET"
                      className="absolute inset-0"
                    />
                    {/* Fallback if iframe doesn't load */}
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center">
                        <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Bosque de Chapultepec II Secc.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            {/* Social Media */}
            <Card variant="default" className="info-card">
              <CardHeader>
                <CardTitle>Síguenos en Redes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4 sm:justify-start">
                  {SOCIAL_LINKS.map((social, index) => (
                    <MagneticWrap key={index} strength={0.2}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-accent/50 hover:shadow-md ${social.color}`}
                        title={social.name}
                        aria-label={`Síguenos en ${social.name}`}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    </MagneticWrap>
                  ))}
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground sm:text-left">
                  Mantente al día con las últimas noticias, eventos y
                  exhibiciones del museo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
