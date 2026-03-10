import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Users } from 'lucide-react'
import { TiltCard, MagneticWrap, SectionReveal } from '@/components/ui/gsap-primitives'

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
    categoryColor: '#8DC63F',
    spots: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'El Futuro de la Energía en México',
    date: '18 Mar 2026',
    time: '17:00 hrs',
    category: 'Conferencia',
    categoryColor: '#6BB52A',
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
    categoryColor: '#8DC63F',
    spots: 15,
    featured: true,
  },
]

export default function ActividadesHighlight() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <SectionReveal direction="bottom">
      <section ref={sectionRef} className="py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background energy effects */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#8DC63F]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#6BB52A]/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-[#8DC63F]/15 text-[#8DC63F] text-label px-4 py-2 rounded-full">
                  Agenda Cultural
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#8DC63F]/30 to-transparent" />
              </div>
              <h2 className="text-display-lg text-white">
                Próximas<br />
                <span className="bg-gradient-to-r from-[#8DC63F] to-[#6BB52A] bg-clip-text text-transparent">Actividades</span>
              </h2>
            </div>
            <MagneticWrap strength={0.25}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/15 text-white hover:bg-white/10 hover:border-[#8DC63F]/40 px-8 rounded-xl"
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
                        <h3 className={`font-display font-bold text-white mb-auto group-hover:text-[#8DC63F] transition-colors duration-300 ${i === 0 ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'}`}>
                          {activity.title}
                        </h3>

                        {/* Meta */}
                        <div className="mt-6 space-y-2 text-sm text-white/50">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#8DC63F]" />
                            {activity.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#8DC63F]" />
                            {activity.time}
                          </div>
                          {activity.spots && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-[#6BB52A]" />
                              <span className="text-[#6BB52A] font-medium">{activity.spots} lugares</span>
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <div className="mt-4 pt-4 border-t border-white/8 flex items-center gap-2 text-[#8DC63F] text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
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
    </SectionReveal>
  )
}
