/**
 * EventDetailPage
 * Individual event page with full details and registration
 * Based on PRD Section 5.6 - Actividades
 */

import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Tag,
  ClipboardList,
  Package,
  Share2,
} from 'lucide-react'

import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { EventRegistrationForm } from '@/components/activities/EventRegistrationForm'
import { EventCard } from '@/components/activities/EventCard'
import { getEventById, getEventsByCategory } from '@/lib/data/events'
import { getCategoryLabel, getCategoryColor } from '@/lib/types/events'
import { cn } from '@/lib/utils'
import { TextClipReveal, MagneticWrap, useStaggerReveal } from '@/components/ui/gsap-primitives'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const infoGridRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLDivElement>(null)

  const event = eventId ? getEventById(eventId) : undefined

  // Hero image clip-path reveal
  useEffect(() => {
    if (!event || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.from(heroImageRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1,
          ease: 'power3.inOut',
        })
      }

      if (sidebarRef.current) {
        gsap.from(sidebarRef.current, {
          x: 40,
          opacity: 0,
          duration: 0.6,
          delay: 0.8,
          ease: 'power3.out',
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [event])

  // Info grid stagger
  useStaggerReveal(infoGridRef, '.info-card', { y: 30, stagger: 0.1 })

  // Related events stagger
  useStaggerReveal(relatedRef, '.related-event-card', { y: 30, stagger: 0.1 })

  if (!event) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Calendar className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h1 className="mb-2 text-2xl font-bold">Evento no encontrado</h1>
            <p className="mb-6 text-muted-foreground">
              El evento que buscas no existe o ya no esta disponible.
            </p>
            <Button variant="primary" asChild>
              <Link to="/actividades">Ver todas las actividades</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Get related events (same category, excluding current)
  const relatedEvents = getEventsByCategory(event.category)
    .filter((e) => e.id !== event.id)
    .slice(0, 2)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Enlace copiado al portapapeles')
    }
  }

  return (
    <PageLayout>
      <div ref={pageRef} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mt-4">
          <MagneticWrap>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>
          </MagneticWrap>
        </div>

        {/* Main Content */}
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div
              ref={heroImageRef}
              className="relative mb-6 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-muted to-muted/80"
            >
              <div className="flex h-full items-center justify-center">
                <Calendar className="h-24 w-24 text-muted-foreground/30" />
              </div>

              {/* Category Badge */}
              <div className="absolute left-4 top-4">
                <span
                  className={cn(
                    'inline-flex items-center rounded-md px-3 py-1 text-sm font-medium text-white',
                    getCategoryColor(event.category)
                  )}
                >
                  {getCategoryLabel(event.category)}
                </span>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Title & Description */}
            <TextClipReveal delay={0.5}>
              <h1 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                {event.title}
              </h1>
            </TextClipReveal>

            <p className="mb-6 text-lg text-muted-foreground">
              {event.fullDescription}
            </p>

            {/* Event Info Grid */}
            <div ref={infoGridRef} className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="info-card flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                <Calendar className="h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Fecha</p>
                  <p className="text-muted-foreground">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="info-card flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                <Clock className="h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Horario</p>
                  <p className="text-muted-foreground">
                    {event.startTime} - {event.endTime} ({event.duration})
                  </p>
                </div>
              </div>

              <div className="info-card flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                <MapPin className="h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Ubicacion</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>

              <div className="info-card flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                <Users className="h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Capacidad</p>
                  <p className="text-muted-foreground">
                    {event.spotsRemaining} de {event.capacity} lugares disponibles
                  </p>
                </div>
              </div>

              <div className="info-card flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                <Tag className="h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium">Precio</p>
                  <p className="text-muted-foreground">
                    {event.price !== null ? (
                      <span className="font-semibold text-primary">
                        ${event.price.toLocaleString('es-MX')} MXN
                      </span>
                    ) : (
                      <span className="font-semibold text-accent-alt">
                        Entrada gratuita
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {event.requirements.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
                  <ClipboardList className="h-5 w-5 text-accent" />
                  Requisitos
                </h2>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials */}
            {event.materials.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
                  <Package className="h-5 w-5 text-accent" />
                  Materiales
                </h2>
                <ul className="space-y-2">
                  {event.materials.map((material, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-alt" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Registration Form */}
          <div className="lg:col-span-1">
            <div ref={sidebarRef} className="sticky top-8">
              <EventRegistrationForm event={event} />
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div ref={relatedRef} className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold">
              Mas {getCategoryLabel(event.category)}s
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedEvents.map((relatedEvent) => (
                <div key={relatedEvent.id} className="related-event-card">
                  <EventCard event={relatedEvent} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
