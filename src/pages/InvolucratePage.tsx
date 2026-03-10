/**
 * InvolucratePage
 * Get involved page with volunteer, donations, partnerships, and jobs sections
 * Based on PRD Section 5.10 - Involúcrate
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Heart,
  Users,
  Building2,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Mail,
  Sparkles,
  HandHeart,
  Trophy,
  Clock,
  GraduationCap,
} from 'lucide-react'
import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  GrainOverlay,
  AmbientGlow,
  TextClipReveal,
  SectionReveal,
  TiltCard,
  MagneticWrap,
  useStaggerReveal,
} from '@/components/ui/gsap-primitives'

// Volunteer benefits
const VOLUNTEER_BENEFITS = [
  'Capacitación en divulgación científica',
  'Acceso gratuito al museo',
  'Credencial de voluntario',
  'Carta de servicio social (estudiantes)',
  'Experiencia en un museo de clase mundial',
  'Networking con profesionales del sector',
]

// Volunteer requirements
const VOLUNTEER_REQUIREMENTS = [
  'Ser mayor de 18 años',
  'Disponibilidad mínima de 8 horas semanales',
  'Interés en ciencia, energía o tecnología',
  'Habilidades de comunicación',
  'Compromiso mínimo de 3 meses',
]

// Donation impact tiers
const DONATION_TIERS = [
  {
    amount: '$500 MXN',
    title: 'Amigo del Museo',
    impact: 'Apoya la visita de 5 estudiantes de escasos recursos',
    icon: Heart,
  },
  {
    amount: '$2,000 MXN',
    title: 'Benefactor',
    impact: 'Financia un taller educativo para 20 niños',
    icon: Sparkles,
  },
  {
    amount: '$5,000 MXN',
    title: 'Padrino MUNET',
    impact: 'Patrocina el mantenimiento de una exhibición por un mes',
    icon: Trophy,
  },
  {
    amount: 'Personalizado',
    title: 'Aliado Estratégico',
    impact: 'Contribuye a proyectos especiales del museo',
    icon: HandHeart,
  },
]

// Partnership benefits
const PARTNERSHIP_BENEFITS = [
  'Reconocimiento de marca en materiales del museo',
  'Acceso preferencial para eventos corporativos',
  'Visitas guiadas exclusivas para colaboradores',
  'Inclusión en comunicados de prensa',
  'Activaciones de marca en el museo',
  'Beneficios fiscales por donación',
]

// Placeholder partner logos (would be replaced with actual images)
const PARTNERS = [
  { name: 'CFE', initials: 'CFE' },
  { name: 'PEMEX', initials: 'PX' },
  { name: 'SENER', initials: 'SN' },
  { name: 'CONACYT', initials: 'CY' },
  { name: 'UNAM', initials: 'UN' },
  { name: 'IPN', initials: 'IP' },
]

// Current job openings (placeholder)
const JOB_OPENINGS = [
  {
    title: 'Guía de Museo',
    department: 'Educación',
    type: 'Tiempo completo',
  },
  {
    title: 'Diseñador Gráfico',
    department: 'Comunicación',
    type: 'Tiempo completo',
  },
  {
    title: 'Community Manager',
    department: 'Marketing',
    type: 'Medio tiempo',
  },
]

const NAV_ITEMS = [
  { label: 'Voluntariado', href: '#voluntariado' },
  { label: 'Donaciones', href: '#donaciones' },
  { label: 'Alianzas', href: '#alianzas' },
  { label: 'Bolsa de Trabajo', href: '#bolsa-de-trabajo' },
]

export default function InvolucratePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const donationGridRef = useRef<HTMLDivElement>(null)
  const partnersGridRef = useRef<HTMLDivElement>(null)
  const jobsGridRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLUListElement>(null)

  // Floating energy dots animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to('.energy-dot', {
        y: -100,
        opacity: 0,
        duration: 2,
        stagger: { each: 0.3, repeat: -1 },
        ease: 'power1.in',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Volunteer benefits checkmark scale-in
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.benefit-icon', {
        scale: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, benefitsRef)

    return () => ctx.revert()
  }, [])

  // Stagger reveals
  useStaggerReveal(donationGridRef, '.donation-card', { y: 40, stagger: 0.1 })
  useStaggerReveal(partnersGridRef, '.partner-item', { y: 30, stagger: 0.06 })
  useStaggerReveal(jobsGridRef, '.job-card', { y: 30, stagger: 0.08 })

  return (
    <PageLayout>
      <SEOHead
        title="Involúcrate"
        description="Voluntariado, donaciones, alianzas corporativas y bolsa de trabajo en MUNET. Sé parte del movimiento por la educación y la sostenibilidad."
        canonicalPath="/involucrate"
        keywords={['voluntariado museo', 'donaciones MUNET', 'vacantes museo', 'alianzas corporativas']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Involúcrate', path: '/involucrate' },
        ]}
      />

      {/* Dark Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#09090B] pb-28 pt-12">
        <GrainOverlay />
        <AmbientGlow position="top-right" />

        {/* Floating energy dots */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="energy-dot absolute rounded-full bg-[#8DC63F]"
            style={{
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              bottom: '10%',
              left: `${10 + i * 12}%`,
              opacity: 0.6,
            }}
            aria-hidden="true"
          />
        ))}

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <TextClipReveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Involúcrate
              </h1>
            </TextClipReveal>
            <TextClipReveal delay={0.3}>
              <p className="mt-4 text-xl text-white/70 sm:text-2xl">
                Sé parte de la transformación
              </p>
            </TextClipReveal>
            <p className="mt-4 max-w-2xl text-lg text-white/50">
              MUNET es más que un museo — es un movimiento por la educación y la
              sostenibilidad. Descubre cómo puedes contribuir a nuestra misión.
            </p>
          </div>

          {/* Horizontal anchor nav */}
          <nav className="mt-10 flex flex-wrap gap-3" aria-label="Secciones">
            {NAV_ITEMS.map((item) => (
              <MagneticWrap key={item.href} strength={0.15}>
                <a
                  href={item.href}
                  className="inline-block rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </MagneticWrap>
            ))}
          </nav>
        </div>

        {/* Dark-to-white gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent z-[1] pointer-events-none" />
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Section 1: Voluntariado */}
        <SectionReveal direction="bottom" triggerStart="top 90%">
          <section id="voluntariado" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-3xl font-bold">Voluntariado</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Description */}
              <div>
                <p className="text-lg text-muted-foreground">
                  Nuestro programa de voluntariado te permite ser parte del equipo
                  MUNET y contribuir directamente a la educación de miles de
                  visitantes sobre energía y tecnología. Los voluntarios son
                  embajadores del museo, apoyando en recorridos guiados, talleres
                  educativos y eventos especiales.
                </p>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Beneficios del Voluntariado
                  </h3>
                  <ul ref={benefitsRef} className="space-y-3">
                    {VOLUNTEER_BENEFITS.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="benefit-icon mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="mt-8"
                  onClick={() =>
                    window.open('mailto:voluntariado@museomunet.com', '_blank')
                  }
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Aplicar como Voluntario
                </Button>
              </div>

              {/* Requirements Card */}
              <Card variant="default" className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-accent" />
                    Requisitos
                  </CardTitle>
                  <CardDescription>
                    Para formar parte del programa de voluntariado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {VOLUNTEER_REQUIREMENTS.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Horarios flexibles
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Turnos matutinos y vespertinos disponibles de martes a
                      domingo.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </SectionReveal>

        {/* Divider */}
        <hr className="my-16 border-border" />

        {/* Section 2: Donaciones */}
        <SectionReveal direction="bottom" triggerStart="top 85%">
          <section id="donaciones" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-3xl font-bold">Donaciones</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-5">
              {/* Why Donate */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold mb-4">
                  ¿Por qué donar a MUNET?
                </h3>
                <p className="text-muted-foreground">
                  Tu donación ayuda a mantener nuestros programas educativos
                  accesibles para todos. Cada peso contribuye a:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
                    <span className="text-muted-foreground">
                      Mantener la entrada gratuita los domingos para mexicanos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
                    <span className="text-muted-foreground">
                      Ofrecer becas para visitas escolares
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
                    <span className="text-muted-foreground">
                      Desarrollar nuevas exhibiciones interactivas
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
                    <span className="text-muted-foreground">
                      Financiar investigación y divulgación científica
                    </span>
                  </li>
                </ul>

                <Button
                  variant="primary"
                  size="lg"
                  className="mt-8"
                  onClick={() =>
                    window.open('mailto:donaciones@museomunet.com', '_blank')
                  }
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Hacer una Donación
                </Button>
              </div>

              {/* Donation Tiers */}
              <div className="lg:col-span-3">
                <h3 className="text-xl font-semibold mb-4">
                  Impacto de tu Donación
                </h3>
                <div ref={donationGridRef} className="grid gap-4 sm:grid-cols-2">
                  {DONATION_TIERS.map((tier, index) => (
                    <TiltCard key={index} className="donation-card">
                      <Card variant="default" className="relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-accent/20 to-transparent" />
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <tier.icon className="h-6 w-6 text-accent" />
                            <span className="text-lg font-bold text-accent">
                              {tier.amount}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{tier.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {tier.impact}
                          </p>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Divider */}
        <hr className="my-16 border-border" />

        {/* Section 3: Alianzas Corporativas */}
        <SectionReveal direction="bottom" triggerStart="top 88%">
          <section id="alianzas" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-3xl font-bold">
                Alianzas Corporativas
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Partnership Info */}
              <div>
                <p className="text-lg text-muted-foreground">
                  Establece una alianza estratégica con MUNET y asocia tu marca
                  con la innovación, la educación y la sostenibilidad. Ofrecemos
                  diversos niveles de patrocinio y colaboración adaptados a tus
                  objetivos corporativos.
                </p>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Beneficios para Aliados
                  </h3>
                  <ul className="space-y-3">
                    {PARTNERSHIP_BENEFITS.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-alt" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="mt-8"
                  onClick={() =>
                    window.open('mailto:alianzas@museomunet.com', '_blank')
                  }
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Contactar para Alianzas
                </Button>
              </div>

              {/* Partners Grid */}
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Nuestros Aliados</CardTitle>
                  <CardDescription>
                    Organizaciones que hacen posible nuestra misión
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div ref={partnersGridRef} className="grid grid-cols-3 gap-4">
                    {PARTNERS.map((partner, index) => (
                      <div
                        key={index}
                        className="partner-item flex h-20 items-center justify-center rounded-lg bg-muted"
                        title={partner.name}
                      >
                        <span className="text-xl font-bold text-muted-foreground">
                          {partner.initials}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    ¿Tu empresa quiere unirse? Contáctanos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </SectionReveal>

        {/* Divider */}
        <hr className="my-16 border-border" />

        {/* Section 4: Bolsa de Trabajo */}
        <SectionReveal direction="bottom" triggerStart="top 85%">
          <section id="bolsa-de-trabajo" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-3xl font-bold">Bolsa de Trabajo</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Work Culture */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Trabaja en MUNET
                </h3>
                <p className="text-muted-foreground">
                  Únete a un equipo apasionado por la educación, la ciencia y la
                  tecnología. En MUNET valoramos la creatividad, la colaboración
                  y el compromiso con la divulgación científica.
                </p>

                <div className="mt-6 rounded-lg bg-muted p-6">
                  <h4 className="font-semibold mb-3">Nuestra Cultura</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-alt" />
                      Ambiente de trabajo colaborativo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-alt" />
                      Oportunidades de desarrollo profesional
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-alt" />
                      Proyecto de impacto nacional
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-alt" />
                      Instalaciones de vanguardia
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Proceso de Aplicación</h4>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        1
                      </div>
                      <span className="text-muted-foreground">
                        Envía tu CV y carta de motivos
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        2
                      </div>
                      <span className="text-muted-foreground">
                        Evaluación de perfil por Recursos Humanos
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        3
                      </div>
                      <span className="text-muted-foreground">
                        Entrevista con el área correspondiente
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        4
                      </div>
                      <span className="text-muted-foreground">
                        Notificación de resultados
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Current Openings */}
              <div ref={jobsGridRef}>
                <h3 className="text-xl font-semibold mb-4">Vacantes Actuales</h3>

                {JOB_OPENINGS.length > 0 ? (
                  <div className="space-y-4">
                    {JOB_OPENINGS.map((job, index) => (
                      <Card key={index} variant="default" className="job-card">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium">
                              {job.department}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                              {job.type}
                            </span>
                          </div>
                          <Button
                            variant="link"
                            className="mt-2 h-auto p-0 text-accent"
                            onClick={() =>
                              window.open(
                                `mailto:rh@museomunet.com?subject=Aplicación: ${job.title}`,
                                '_blank'
                              )
                            }
                          >
                            Ver detalles
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card variant="default">
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">
                        No hay vacantes disponibles en este momento.
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card variant="glass" className="mt-6">
                  <CardContent className="py-6">
                    <p className="text-sm text-muted-foreground">
                      ¿No encuentras una vacante que se ajuste a tu perfil? Envía
                      tu CV a{' '}
                      <a
                        href="mailto:rh@museomunet.com"
                        className="font-medium text-accent hover:underline"
                      >
                        rh@museomunet.com
                      </a>{' '}
                      y te contactaremos cuando surja una oportunidad.
                    </p>
                  </CardContent>
                </Card>

                <Button
                  variant="primary"
                  size="lg"
                  className="mt-6 w-full"
                  onClick={() =>
                    window.open('mailto:rh@museomunet.com?subject=Envío de CV', '_blank')
                  }
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Enviar CV
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>
      </div>
    </PageLayout>
  )
}
