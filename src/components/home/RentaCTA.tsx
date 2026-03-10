import { Link } from 'react-router-dom'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { ArrowRight, Building2, Users, TreePine, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix
        },
      })
    })
    return () => ctx.revert()
  }, [end, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export default function RentaCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dramatic section wipe — diagonal clip
      gsap.from(sectionRef.current, {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      // Stagger features
      gsap.from('.renta-feature', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.renta-features',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-24 bg-[#0a0a0a]">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0f0a] to-[#0a0a0a]" />
        <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-[radial-gradient(ellipse,rgba(255,107,53,0.12),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse,rgba(0,212,170,0.08),transparent_70%)]" />

        {/* Architectural grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-bold px-5 py-2.5 rounded-full">
              <Sparkles className="h-4 w-4 text-[#8DC63F]" />
              Espacios Únicos
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* Headline — editorial asymmetric */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-8">
              <h2 className="font-display font-black text-white text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]">
                Haz de tu Evento algo{' '}
                <span className="bg-gradient-to-r from-[#8DC63F] to-[#6BB52A] bg-clip-text text-transparent">
                  Extraordinario
                </span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-body-lg text-white/50 mb-6">
                Espacios arquitectónicos únicos en el corazón del Bosque de Chapultepec.
              </p>
              <MagneticWrap>
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-neutral-100 text-[#0a0a0a] px-10 py-7 text-lg font-bold rounded-2xl shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-500 w-full"
                >
                  <Link to="/renta-de-espacios" className="flex items-center justify-center gap-2">
                    Conoce los Espacios
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </MagneticWrap>
            </div>
          </div>

          {/* Features */}
          <div className="renta-features grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Building2, label: 'Auditorio', value: 200 },
              { icon: Users, label: 'Capacidad Total', value: 500 },
              { icon: TreePine, label: 'Foro al Aire Libre', value: 300 },
              { icon: Sparkles, label: 'Eventos/Año', value: 150 },
            ].map((space) => (
              <div key={space.label} className="renta-feature text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-500">
                <div className="h-12 w-12 bg-gradient-to-br from-[#8DC63F]/20 to-[#6BB52A]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <space.icon className="h-6 w-6 text-[#8DC63F]" />
                </div>
                <div className="font-display font-black text-3xl md:text-4xl text-white mb-1">
                  <AnimatedCounter end={space.value} suffix={space.label === 'Auditorio' ? ' pax' : space.label === 'Eventos/Año' ? '+' : ''} />
                </div>
                <div className="text-sm text-white/40">{space.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' })
  }, [])
  const handleLeave = useCallback(() => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }, [])
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}
