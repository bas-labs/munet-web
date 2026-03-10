import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Clock, MapPin, Train, Bus, Car, Ticket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function AnimatedNumber({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix
        },
      })
    })
    return () => ctx.revert()
  }, [end, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export default function PlanificaSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section slide-over wipe
      gsap.from(sectionRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
          once: true,
        },
      })

      // Oversized number parallax
      gsap.to('.big-number', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Staggered info cards
      gsap.from('.info-card', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.info-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Oversized background numbers */}
      <div className="big-number absolute top-[5%] -right-[5%] font-display font-black text-[25vw] leading-none text-neutral-50 select-none pointer-events-none">
        <AnimatedNumber end={80} suffix="" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block bg-[#00D4AA]/10 text-[#00D4AA] text-label px-4 py-2 rounded-full">
              Tu Visita
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00D4AA]/30 to-transparent" />
          </div>
          <h2 className="text-display-lg text-foreground max-w-2xl">
            Planifica tu Visita al{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#00D4AA] bg-clip-text text-transparent">MUNET</span>
          </h2>
        </div>

        {/* Editorial two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Oversized price + stats */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-10">
              <p className="text-label text-muted-foreground mb-2">Entrada General</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-[clamp(4rem,8vw,8rem)] leading-none text-foreground">
                  $<AnimatedNumber end={80} />
                </span>
                <span className="text-body-lg text-muted-foreground">MXN</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FF6B35]/10 to-[#00D4AA]/10 border border-[#FF6B35]/20 mb-8">
              <p className="text-body-md text-foreground font-medium">
                🎉 <strong>Domingos:</strong> Entrada gratuita para mexicanos y residentes
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#FF6B35] hover:bg-[#e55a28] text-white py-6 text-lg rounded-xl shadow-lg shadow-[#FF6B35]/20 flex-1"
              >
                <Link to="/boletos" className="flex items-center justify-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Comprar Boletos
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-neutral-300 py-6 text-lg rounded-xl flex-1"
              >
                <Link to="/planifica-tu-visita">Más info</Link>
              </Button>
            </div>
          </div>

          {/* Right: Info cards */}
          <div className="lg:col-span-7 info-grid space-y-5">
            {/* Hours */}
            <div className="info-card rounded-2xl p-6 lg:p-8 border border-neutral-100 bg-neutral-50/80 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-500">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="h-10 w-10 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#FF6B35]" />
                </div>
                Horarios
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="font-semibold text-red-600">Lunes</span>
                  <span className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">CERRADO</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="text-foreground font-medium">Martes – Domingo</span>
                  <span className="text-foreground font-bold">10:00 – 18:00 hrs</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground text-sm">Última entrada</span>
                  <span className="text-muted-foreground text-sm">17:00 hrs</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="info-card rounded-2xl p-6 lg:p-8 border border-neutral-100 bg-neutral-50/80 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-500">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="h-10 w-10 bg-[#00D4AA]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-[#00D4AA]" />
                </div>
                Ubicación
              </h3>
              <address className="not-italic text-muted-foreground leading-relaxed mb-5">
                Av. de los Compositores s/n<br />
                Bosque de Chapultepec II Sección<br />
                Ciudad de México, CDMX
              </address>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Train, text: 'Metro Constituyentes' },
                  { icon: Bus, text: 'Metrobús Auditorio' },
                  { icon: Car, text: 'Estacionamiento' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 text-muted-foreground px-3 py-1.5 rounded-full text-sm">
                    <Icon className="h-3.5 w-3.5 text-[#00D4AA]" />
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
