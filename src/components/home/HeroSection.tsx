import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticWrap, GrainOverlay, AmbientGlow } from '@/components/ui/gsap-primitives'

gsap.registerPlugin(ScrollTrigger)

/* ─── Hero Section ─── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    /* Respect reduced motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Show everything immediately
      const els = sectionRef.current?.querySelectorAll(
        '.hero-eyebrow, .hero-line, .hero-rule, .hero-desc, .hero-cta, .hero-stats, .hero-scroll'
      )
      els?.forEach((el) => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
        ;(el as HTMLElement).style.clipPath = 'none'
      })
      return
    }

    const ctx = gsap.context(() => {
      /* Eyebrow */
      gsap.from('.hero-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.out',
      })

      /* Headline lines — clip-path reveal */
      gsap.set('.hero-line', { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
      gsap.to('.hero-line', {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.inOut',
        delay: 0.5,
      })

      /* Horizontal rule */
      gsap.from('.hero-rule', {
        scaleX: 0,
        duration: 1,
        delay: 1.2,
        ease: 'power3.inOut',
      })

      /* Descriptor */
      gsap.from('.hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 1.4,
        ease: 'power3.out',
      })

      /* CTAs */
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 1.6,
        ease: 'power3.out',
      })

      /* Stats */
      gsap.from('.hero-stats', {
        opacity: 0,
        duration: 0.8,
        delay: 2,
        ease: 'power2.out',
      })

      /* Scroll indicator */
      gsap.from('.hero-scroll', {
        opacity: 0,
        duration: 0.8,
        delay: 2.2,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[700px] flex items-end overflow-hidden bg-[#09090B]"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="/images/fotogaleria/exteriormuseo/RHG_3698And8more_Optimizer.jpg"
      >
        <source src="/images/banner_placeholder.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />

      {/* Grain texture overlay */}
      <GrainOverlay />

      {/* Ambient gradient glow */}
      <AmbientGlow />

      {/* Content */}
      <div className="hero-content-wrap relative z-10 w-full">
        <div className="container mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-16">
            {/* Left column — main content */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-3xl">
              {/* Watermark logo */}
              <img
                src="/images/logo_bco.png"
                alt=""
                className="w-[120px] opacity-15 mb-8"
              />

              {/* Eyebrow */}
              <div className="hero-eyebrow flex items-center gap-2.5 mb-10 md:mb-14">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8DC63F] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#8DC63F]" />
                </span>
                <span className="text-white/50 text-sm tracking-wide">
                  Bosque de Chapultepec, CDMX
                </span>
              </div>

              {/* Headline */}
              <h1 className="mb-10 md:mb-14">
                <span
                  className="hero-line block font-display font-light text-white opacity-0"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  El conocimiento
                </span>
                <span
                  className="hero-line block font-display font-light text-white/40 opacity-0"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  no te crea ni te destruye.
                </span>
                <span
                  className="hero-line block font-display font-bold text-[#8DC63F] opacity-0 mt-1"
                  style={{
                    fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  Te transforma.
                </span>
              </h1>

              {/* Horizontal rule */}
              <div
                className="hero-rule w-full max-w-[60%] h-px bg-white/10 mb-8 origin-left"
                aria-hidden="true"
              />

              {/* Descriptor */}
              <p className="hero-desc text-white/50 text-base md:text-lg max-w-md mb-10 leading-relaxed">
                El primer museo de México dedicado a la naturaleza, energía y tecnología.
              </p>

              {/* CTAs */}
              <div className="flex flex-col min-[480px]:flex-row items-center gap-5">
                <MagneticWrap>
                  <div className="hero-cta">
                    <Link
                      to="/boletos"
                      className="inline-flex items-center justify-center rounded-full bg-[#8DC63F] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:brightness-110"
                    >
                      Comprar Boletos
                    </Link>
                  </div>
                </MagneticWrap>
                <MagneticWrap>
                  <div className="hero-cta">
                    <Link
                      to="/exposiciones"
                      className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 hover:text-white/80"
                    >
                      Explorar Museo
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </MagneticWrap>
              </div>
            </div>

            {/* Right column — stats (desktop: bottom-right, mobile: bottom-center) */}
            <div className="hero-stats flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-3 justify-center md:justify-end md:pb-2">
              <span className="text-[11px] text-white/30 uppercase tracking-[0.15em]">
                11 Salas
              </span>
              <span className="w-px h-3 md:w-8 md:h-px bg-white/10" aria-hidden="true" />
              <span className="text-[11px] text-white/30 uppercase tracking-[0.15em]">
                2 Niveles
              </span>
              <span className="w-px h-3 md:w-8 md:h-px bg-white/10" aria-hidden="true" />
              <span className="text-[11px] text-white/30 uppercase tracking-[0.15em]">
                Desde 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <span className="block text-white/20 text-lg animate-bounce">
          &#8595;
        </span>
      </div>

      {/* Dark-to-light transition at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent z-[1] pointer-events-none" aria-hidden="true" />
    </section>
  )
}
