import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Zap, Sun, Atom, Leaf, Wind, Flame } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const exhibitions = [
  {
    id: 'electricidad',
    title: 'Electricidad',
    description: 'El flujo de electrones, circuitos y la generación eléctrica que ilumina nuestro mundo.',
    icon: Zap,
    gradient: 'from-amber-400 to-orange-600',
    accent: '#FF6B35',
    level: 1,
    number: '01',
  },
  {
    id: 'energia-solar',
    title: 'Energía Solar',
    description: 'El sol como fuente primaria de energía renovable para el futuro de la humanidad.',
    icon: Sun,
    gradient: 'from-yellow-400 to-amber-600',
    accent: '#FFB800',
    level: 2,
    number: '02',
  },
  {
    id: 'energia-nuclear',
    title: 'Energía Nuclear',
    description: 'Fusión, fisión y el futuro de la energía limpia que transformará nuestra civilización.',
    icon: Atom,
    gradient: 'from-[#00D4AA] to-teal-700',
    accent: '#00D4AA',
    level: 1,
    number: '03',
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad',
    description: 'Tecnología como habilitador del futuro energético sostenible del planeta.',
    icon: Leaf,
    gradient: 'from-emerald-400 to-green-700',
    accent: '#22C55E',
    level: 1,
    number: '04',
  },
  {
    id: 'energia-eolica',
    title: 'Energía Eólica',
    description: 'El poder del viento transformado en electricidad a escala industrial.',
    icon: Wind,
    gradient: 'from-cyan-400 to-blue-700',
    accent: '#06B6D4',
    level: 2,
    number: '05',
  },
  {
    id: 'combustibles',
    title: 'Combustibles Fósiles',
    description: 'Historia, impacto y la necesaria transición energética de la humanidad.',
    icon: Flame,
    gradient: 'from-red-500 to-orange-700',
    accent: '#EF4444',
    level: 1,
    number: '06',
  },
]

export default function ExposicionesPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      // Section header clip reveal
      gsap.from(headerRef.current, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      // Horizontal scroll
      const cards = track.querySelectorAll('.expo-card')
      const totalScroll = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Each card staggers in as it enters viewport
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.85,
          rotateY: -15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById?.('hscroll') || undefined,
            start: 'left 80%',
            once: true,
            // Use the section scroll instead
            scroller: undefined,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Header — sits above the pinned area */}
      <div className="pt-24 lg:pt-32 pb-12 container mx-auto px-4">
        <div ref={headerRef}>
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block bg-[#FF6B35]/10 text-[#FF6B35] text-label px-4 py-2 rounded-full">
              Exposiciones
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#FF6B35]/30 to-transparent" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-display-lg text-foreground">
              Camina por el Universo<br />
              de la <span className="text-gradient-energy">Energía</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-md">
              Desliza horizontalmente para recorrer nuestras 11 salas interactivas, distribuidas en 2 niveles.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="h-screen flex items-center">
        <div ref={trackRef} className="flex gap-8 pl-8 pr-[30vw] items-stretch" style={{ willChange: 'transform' }}>
          {exhibitions.map((expo) => {
            const Icon = expo.icon
            return (
              <Link
                key={expo.id}
                to={`/exposiciones#${expo.id}`}
                className="expo-card group block shrink-0 w-[80vw] sm:w-[50vw] lg:w-[35vw] relative"
              >
                <div
                  className="relative h-[65vh] rounded-3xl overflow-hidden border border-neutral-200/60 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:border-transparent"
                  style={{ perspective: '1200px' }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${expo.gradient} opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-700`} />

                  {/* Number watermark */}
                  <div className="absolute top-6 right-8 font-display font-black text-[8rem] leading-none text-neutral-100 group-hover:text-neutral-200/80 transition-colors duration-500 select-none">
                    {expo.number}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full p-8 lg:p-10">
                    {/* Icon */}
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${expo.gradient} shadow-lg mb-auto`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Level badge */}
                    <span className="inline-block self-start text-label-sm text-muted-foreground bg-neutral-100 px-3 py-1.5 rounded-full mb-4 mt-8">
                      Nivel {expo.level}
                    </span>

                    <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3 group-hover:translate-x-2 transition-transform duration-500">
                      {expo.title}
                    </h3>

                    <p className="text-body-md text-muted-foreground mb-6 max-w-sm">
                      {expo.description}
                    </p>

                    {/* Explore link */}
                    <div className="flex items-center gap-2 text-[#FF6B35] font-semibold text-sm mt-auto opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Explorar sala
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                    style={{ backgroundColor: expo.accent }}
                  />
                </div>
              </Link>
            )
          })}

          {/* Final CTA card */}
          <Link to="/exposiciones" className="expo-card group block shrink-0 w-[80vw] sm:w-[50vw] lg:w-[35vw]">
            <div className="relative h-[65vh] rounded-3xl overflow-hidden border-2 border-dashed border-[#FF6B35]/30 bg-gradient-to-br from-[#FF6B35]/5 to-[#00D4AA]/5 flex items-center justify-center hover:border-[#FF6B35]/60 transition-all duration-500">
              <div className="text-center px-8">
                <div className="w-20 h-20 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FF6B35]/20 transition-colors">
                  <ArrowRight className="h-8 w-8 text-[#FF6B35] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground mb-2">Ver las 11 exposiciones</p>
                <p className="text-muted-foreground">Descubre todo lo que MUNET tiene para ti</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
