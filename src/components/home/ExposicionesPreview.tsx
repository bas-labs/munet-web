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
    accent: '#8DC63F',
    level: 1,
    number: '01',
    image: '/images/fotogaleria/exposiciones/RHG_0001And8more_Optimizer.jpg',
  },
  {
    id: 'energia-solar',
    title: 'Energía Solar',
    description: 'El sol como fuente primaria de energía renovable para el futuro de la humanidad.',
    icon: Sun,
    accent: '#FFB800',
    level: 2,
    number: '02',
    image: '/images/fotogaleria/exposiciones/RHG_0019And8more_Optimizer.jpg',
  },
  {
    id: 'energia-nuclear',
    title: 'Energía Nuclear',
    description: 'Fusión, fisión y el futuro de la energía limpia que transformará nuestra civilización.',
    icon: Atom,
    accent: '#6BB52A',
    level: 1,
    number: '03',
    image: '/images/fotogaleria/exposiciones/RHG_0091And8more_Optimizer.jpg',
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad',
    description: 'Tecnología como habilitador del futuro energético sostenible del planeta.',
    icon: Leaf,
    accent: '#22C55E',
    level: 1,
    number: '04',
    image: '/images/fotogaleria/exposiciones/RHG_0226And8more_Optimizer.jpg',
  },
  {
    id: 'energia-eolica',
    title: 'Energía Eólica',
    description: 'El poder del viento transformado en electricidad a escala industrial.',
    icon: Wind,
    accent: '#06B6D4',
    level: 2,
    number: '05',
    image: '/images/fotogaleria/exposiciones/RHG_0343And8more_Optimizer.jpg',
  },
  {
    id: 'combustibles',
    title: 'Combustibles Fósiles',
    description: 'Historia, impacto y la necesaria transición energética de la humanidad.',
    icon: Flame,
    accent: '#EF4444',
    level: 1,
    number: '06',
    image: '/images/fotogaleria/exposiciones/RHG_0001And8more_Optimizer.jpg',
  },
]

export default function ExposicionesPreview() {
  const outerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Set runway height directly on DOM — must be synchronous so ScrollTrigger
  // measures the correct outer height (React setState is async and would cause
  // ScrollTrigger to measure the stale initial height).
  const setRunway = () => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return
    const scrollDistance = track.scrollWidth - track.clientWidth
    outer.style.height = `${window.innerHeight + scrollDistance}px`
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const track = trackRef.current

    // 1. Set height synchronously BEFORE ScrollTrigger init
    setRunway()

    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Header fade-up
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 90%',
          once: true,
        },
      })

      // Cards stagger in
      gsap.from('.expo-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.expo-track',
          start: 'top 85%',
          once: true,
        },
      })

      // Horizontal scroll driven by vertical scroll
      if (track) {
        gsap.to(track, {
          scrollLeft: () => track.scrollWidth - track.clientWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      }
    }, outerRef)

    const handleResize = () => {
      setRunway()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={outerRef} className="relative bg-white">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="container mx-auto px-4 pt-16 lg:pt-20 mb-8 shrink-0">
          <div ref={headerRef}>
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block bg-[#8DC63F]/10 text-[#8DC63F] text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full">
                Exposiciones
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#8DC63F]/30 to-transparent" />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Camina por el Universo<br />
                de la <span className="text-[#8DC63F]">Energía</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-md">
                Recorre nuestras 11 salas interactivas, distribuidas en 2 niveles.
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling cards */}
        <div ref={trackRef} className="expo-track flex gap-6 overflow-x-hidden px-4 pb-16 items-center flex-1 min-h-0 scrollbar-hide">
          {/* Left spacer for container alignment */}
          <div className="shrink-0 w-[max(0px,calc((100vw-1280px)/2+0.5rem))]" />

          {exhibitions.map((expo) => {
            const Icon = expo.icon
            return (
              <Link
                key={expo.id}
                to={`/exposiciones#${expo.id}`}
                className="expo-card group block shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30vw]"
              >
                <div className="relative h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-[#09090B] transition-all duration-500 hover:shadow-xl hover:shadow-black/20 hover:border-white/20">
                  {/* Background photo */}
                  <img src={expo.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-700" />
                  {/* Dark gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Number watermark */}
                  <div className="absolute top-4 right-6 font-display font-black text-[6rem] leading-none text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500 select-none">
                    {expo.number}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full p-7 lg:p-8">
                    {/* Icon */}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.06] mb-auto">
                      <Icon className="h-6 w-6 text-white/70" />
                    </div>

                    {/* Level badge */}
                    <span className="inline-block self-start text-[11px] font-medium uppercase tracking-wider text-white/40 bg-white/[0.06] px-3 py-1 rounded-full mb-3 mt-6">
                      Nivel {expo.level}
                    </span>

                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-400">
                      {expo.title}
                    </h3>

                    <p className="text-sm text-white/50 mb-5 max-w-sm leading-relaxed">
                      {expo.description}
                    </p>

                    {/* Explore link */}
                    <div className="flex items-center gap-2 text-[#8DC63F] font-semibold text-sm mt-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                      Explorar sala
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom accent line — thin white */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            )
          })}

          {/* Final CTA card */}
          <Link to="/exposiciones" className="expo-card group block shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30vw]">
            <div className="relative h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border-2 border-dashed border-[#8DC63F]/25 bg-gradient-to-br from-[#8DC63F]/[0.03] to-[#6BB52A]/[0.03] flex items-center justify-center hover:border-[#8DC63F]/50 transition-all duration-500">
              <div className="text-center px-8">
                <div className="w-16 h-16 bg-[#8DC63F]/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#8DC63F]/15 transition-colors">
                  <ArrowRight className="h-6 w-6 text-[#8DC63F] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="font-display text-xl font-bold text-foreground mb-1">Ver las 11 exposiciones</p>
                <p className="text-sm text-muted-foreground">Descubre todo lo que MUNET tiene para ti</p>
              </div>
            </div>
          </Link>

          {/* Right spacer */}
          <div className="shrink-0 w-4" />
        </div>
      </div>
    </div>
  )
}
