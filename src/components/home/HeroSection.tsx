import { Link } from 'react-router-dom'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Ticket, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EnergyCanvas from './EnergyCanvas'

gsap.registerPlugin(ScrollTrigger)

/* ─── Magnetic Button ─── */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const btnRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
  }, [])

  return (
    <div ref={btnRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="inline-block">
      {children}
    </div>
  )
}

/* ─── Hero Section ─── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax content fade on scroll
      gsap.to('.hero-content-wrap', {
        yPercent: 25,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Cinematic text reveal - each word clips in
      const words = textWrapRef.current?.querySelectorAll('.hero-word')
      if (words) {
        gsap.set(words, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
        gsap.to(words, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.inOut',
          delay: 0.6,
        })
      }

      // "TE TRANSFORMA" - special entrance with scale
      gsap.from('.hero-transform', {
        scale: 1.4,
        opacity: 0,
        duration: 1.2,
        delay: 1.8,
        ease: 'expo.out',
      })

      // Badge
      gsap.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, delay: 0.2 })

      // CTAs stagger in
      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 2.2,
        ease: 'power3.out',
      })

      // Bottom strip slides up
      gsap.from('.hero-bottom', { y: 60, opacity: 0, duration: 1, delay: 2.6, ease: 'power2.out' })

      // Energy pulse orbs
      gsap.to('.energy-orb-1', {
        scale: 1.3,
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.energy-orb-2', {
        scale: 1.5,
        opacity: 0.3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Energy particle canvas */}
      <EnergyCanvas className="z-[1]" />

      {/* Gradient orbs */}
      <div className="energy-orb-1 absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#FF6B35]/8 blur-[120px] z-0" />
      <div className="energy-orb-2 absolute bottom-[5%] left-[0%] w-[500px] h-[500px] rounded-full bg-[#00D4AA]/6 blur-[100px] z-0" />

      {/* Vignette */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      {/* Content */}
      <div className="hero-content-wrap relative z-10 container mx-auto px-4 flex flex-col items-center">
        {/* Location badge */}
        <div className="hero-badge mb-10">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-medium text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B35] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B35]" />
            </span>
            Bosque de Chapultepec, CDMX
          </span>
        </div>

        {/* ENORMOUS headline */}
        <div ref={textWrapRef} className="text-center mb-12 max-w-[95vw]">
          <div className="mb-4">
            <span className="hero-word inline-block font-display font-black text-white opacity-0 text-[clamp(2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              EL&nbsp;
            </span>
            <span className="hero-word inline-block font-display font-black text-white opacity-0 text-[clamp(2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              CONOCIMIENTO&nbsp;
            </span>
            <span className="hero-word inline-block font-display font-black text-white opacity-0 text-[clamp(2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              NO&nbsp;
            </span>
          </div>
          <div className="mb-4">
            <span className="hero-word inline-block font-display font-black text-white/60 opacity-0 text-[clamp(2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              TE&nbsp;
            </span>
            <span className="hero-word inline-block font-display font-black text-white/60 opacity-0 text-[clamp(2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              CREA&nbsp;
            </span>
            <span className="hero-word inline-block font-display font-black text-white/60 opacity-0 text-[clamp(2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              NI&nbsp;
            </span>
            <span className="hero-word inline-block font-display font-black text-white/60 opacity-0 text-[clamp(2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              TE&nbsp;
            </span>
            <span className="hero-word inline-block font-display font-black text-white/60 opacity-0 text-[clamp(2rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]">
              DESTRUYE.
            </span>
          </div>
          <div className="hero-transform">
            <span className="inline-block font-display font-black text-[clamp(2.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.04em] bg-gradient-to-r from-[#FF6B35] via-[#FF8F6B] to-[#00D4AA] bg-clip-text text-transparent">
              TE TRANSFORMA.
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 items-center mb-16">
          <MagneticButton>
            <div className="hero-cta">
              <Button
                asChild
                size="lg"
                className="bg-[#FF6B35] hover:bg-[#e55a28] text-white px-10 py-7 text-lg font-bold rounded-2xl shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:shadow-[0_0_60px_rgba(255,107,53,0.6)] transition-all duration-500"
              >
                <Link to="/boletos" className="flex items-center gap-3">
                  <Ticket className="h-5 w-5" />
                  Comprar Boletos
                </Link>
              </Button>
            </div>
          </MagneticButton>
          <MagneticButton>
            <div className="hero-cta">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/15 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-[#00D4AA]/40 px-10 py-7 text-lg font-bold rounded-2xl transition-all duration-500"
              >
                <Link to="/exposiciones" className="flex items-center gap-3">
                  <Compass className="h-5 w-5" />
                  Explorar
                </Link>
              </Button>
            </div>
          </MagneticButton>
        </div>

        {/* Bottom stat strip */}
        <div className="hero-bottom flex items-center gap-12 text-white/50 text-sm font-medium tracking-wider uppercase">
          <span>11 Exposiciones</span>
          <span className="w-px h-4 bg-white/20" />
          <span>2 Niveles</span>
          <span className="w-px h-4 bg-white/20" />
          <span>Chapultepec, CDMX</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-3">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#FF6B35] to-transparent" />
        </div>
      </div>

      {/* Dark-to-light transition gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
    </section>
  )
}
