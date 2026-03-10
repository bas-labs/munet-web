import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1942",
    title: "Decreto del DOF",
    description: "El DDF cedió en forma gratuita a la CFE un predio en la Segunda Sección del Bosque de Chapultepec. Publicado en el Diario Oficial de la Federación."
  },
  {
    year: "1970",
    title: "MUTEC",
    description: "Se inaugura el Museo Tecnológico de la CFE (MUTEC) en el Bosque de Chapultepec, convirtiéndose en un referente de divulgación tecnológica."
  },
  {
    year: "1993",
    title: "Formalización",
    description: "La CFE y el DDF formalizaron el Contrato de Donación del predio de aproximadamente 55,000 m2 por Acuerdo Presidencial."
  },
  {
    year: "2000",
    title: "Remodelación MUTEC",
    description: "El MUTEC se remodeló, sin registrar desde entonces cambios significativos en sus contenidos."
  },
  {
    year: "2015",
    title: "Creación de FIMUNET",
    description: "Se constituye el Fideicomiso del Museo Nacional de Energía y Tecnología para la transformación del espacio museístico."
  },
  {
    year: "2018",
    title: "Norten & Appelbaum",
    description: "Se selecciona al arquitecto Enrique Norten y a Ralph Appelbaum Associates para el diseño arquitectónico y museográfico del nuevo museo."
  },
  {
    year: "2026",
    title: "Apertura de MUNET",
    description: "El Museo Nacional de Energía y Tecnología abre sus puertas al público, marcando una nueva era en la divulgación científica de México."
  }
]

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Animate vertical line growing down via scaleY (NOT opacity)
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      })

      // Animate each dot: scale 0 -> 1
      gsap.utils.toArray<HTMLElement>('.timeline-dot').forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 85%',
            once: true,
          },
        })
      })

      // Animate each content block
      gsap.utils.toArray<HTMLElement>('.timeline-content').forEach((content) => {
        gsap.from(content, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical line */}
      <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div
            key={event.year}
            className={cn(
              "relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8",
              index % 2 === 0 ? "md:text-right" : ""
            )}
          >
            {/* Dot */}
            <div className="timeline-dot absolute left-2 md:left-1/2 top-1 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm" />

            {/* Content */}
            <div className={cn(
              "timeline-content md:col-span-1",
              index % 2 === 0 ? "md:pr-12" : "md:col-start-2 md:pl-12 md:text-left"
            )}>
              <span className="inline-block px-3 py-1 text-sm font-bold bg-primary text-primary-foreground rounded-full mb-2">
                {event.year}
              </span>
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
