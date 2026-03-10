import { Link } from 'react-router-dom'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Activity {
  id: string
  title: string
  date: string
  time: string
  category: string
  categoryColor: string
  spots?: number
  featured?: boolean
}

const upcomingActivities: Activity[] = [
  {
    id: '1',
    title: 'Taller: Construye tu Panel Solar',
    date: '15 Mar 2026',
    time: '11:00 hrs',
    category: 'Taller',
    categoryColor: '#FF6B35',
    spots: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'El Futuro de la Energía en México',
    date: '18 Mar 2026',
    time: '17:00 hrs',
    category: 'Conferencia',
    categoryColor: '#00D4AA',
  },
  {
    id: '3',
    title: 'Visita Guiada: Arquitectura del Museo',
    date: '22 Mar 2026',
    time: '12:00 hrs',
    category: 'Visita Guiada',
    categoryColor: '#22C55E',
    spots: 12,
  },
  {
    id: '4',
    title: 'Introducción a la Robótica',
    date: '25 Mar 2026',
    time: '10:00 hrs',
    category: 'Taller',
    categoryColor: '#FF6B35',
    spots: 15,
    featured: true,
  },
]

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(el, {
      rotateY: x * 12,
      rotateX: -y * 12,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' })
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

export default function ActividadesHighlight() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section wipe — clip-path reveal from bottom
      gsap.from(sectionRef.current, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
      })

      // Staggered card reveals
      gsap.from('.activity-card', {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.activity-grid',
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background energy effects */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#FF6B35]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00D4AA]/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block bg-[#FF6B35]/15 text-[#FF6B35] text-label px-4 py-2 rounded-full">
                Agenda Cultural
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#FF6B35]/30 to-transparent" />
            </div>
            <h2 className="text-display-lg text-white">
              Próximas<br />
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#00D4AA] bg-clip-text text-transparent">Actividades</span>
            </h2>
          </div>
          <MagneticWrap>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/15 text-white hover:bg-white/10 hover:border-[#FF6B35]/40 px-8 rounded-xl"
            >
              <Link to="/actividades" className="flex items-center gap-2">
                Ver Calendario Completo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </MagneticWrap>
        </div>

        {/* Bento grid — asymmetric layout */}
        <div className="activity-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          {upcomingActivities.map((activity, i) => {
            // Bento spans: first and last are large, middle are standard
            const spanClass = i === 0
              ? 'lg:col-span-7 lg:row-span-2'
              : i === 3
                ? 'lg:col-span-7'
                : 'lg:col-span-5'

            return (
              <TiltCard key={activity.id} className={`activity-card ${spanClass}`}>
                <Link to={`/actividades/${activity.id}`} className="block group h-full">
                  <div className={`relative h-full ${i === 0 ? 'min-h-[400px]' : 'min-h-[200px]'} rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/[0.06]`}>
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: activity.categoryColor }} />

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${activity.categoryColor}10, transparent 70%)`,
                      }}
                    />

                    <div className="relative z-10 p-6 lg:p-8 flex flex-col h-full">
                      {/* Category */}
                      <span
                        className="inline-block self-start text-xs font-bold text-white px-3 py-1.5 rounded-full mb-4"
                        style={{ backgroundColor: activity.categoryColor }}
                      >
                        {activity.category}
                      </span>

                      {/* Title */}
                      <h3 className={`font-display font-bold text-white mb-auto group-hover:text-[#FF6B35] transition-colors duration-300 ${i === 0 ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'}`}>
                        {activity.title}
                      </h3>

                      {/* Meta */}
                      <div className="mt-6 space-y-2 text-sm text-white/50">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#FF6B35]" />
                          {activity.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#FF6B35]" />
                          {activity.time}
                        </div>
                        {activity.spots && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-[#00D4AA]" />
                            <span className="text-[#00D4AA] font-medium">{activity.spots} lugares</span>
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <div className="mt-4 pt-4 border-t border-white/8 flex items-center gap-2 text-[#FF6B35] text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                        Ver detalles
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            )
          })}
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
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' })
  }, [])
  const handleLeave = useCallback(() => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }, [])
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="inline-block">
      {children}
    </div>
  )
}
