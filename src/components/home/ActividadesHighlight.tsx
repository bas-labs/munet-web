import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Users } from 'lucide-react'

interface Activity {
  id: string
  title: string
  date: string
  time: string
  category: string
  categoryColor: string
  spots?: number
}

const upcomingActivities: Activity[] = [
  {
    id: '1',
    title: 'Taller: Construye tu Panel Solar',
    date: '15 Mar 2026',
    time: '11:00 hrs',
    category: 'Taller',
    categoryColor: 'bg-amber-500',
    spots: 8,
  },
  {
    id: '2',
    title: 'El Futuro de la Energía en México',
    date: '18 Mar 2026',
    time: '17:00 hrs',
    category: 'Conferencia',
    categoryColor: 'bg-blue-500',
  },
  {
    id: '3',
    title: 'Visita Guiada: Arquitectura del Museo',
    date: '22 Mar 2026',
    time: '12:00 hrs',
    category: 'Visita Guiada',
    categoryColor: 'bg-emerald-500',
    spots: 12,
  },
  {
    id: '4',
    title: 'Introducción a la Robótica',
    date: '25 Mar 2026',
    time: '10:00 hrs',
    category: 'Taller',
    categoryColor: 'bg-amber-500',
    spots: 15,
  },
]

export default function ActividadesHighlight() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-24 lg:py-32 bg-neutral-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8DC63F]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#43A047]/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="inline-block bg-[#8DC63F]/20 text-[#8DC63F] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Agenda Cultural
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Próximas Actividades
            </h2>
            <p className="text-lg text-neutral-400 max-w-xl">
              Talleres, conferencias y experiencias diseñadas para todas las edades.
            </p>
          </div>
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-neutral-700 text-white hover:bg-neutral-800 hover:border-[#8DC63F]/50 shrink-0 px-6"
            >
              <Link to="/actividades" className="flex items-center gap-2">
                Ver Calendario
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Horizontal scroll cards */}
        <div className="relative -mx-4 px-4">
          <motion.div 
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {upcomingActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link
                  to={`/actividades/${activity.id}`}
                  className="block shrink-0 w-[320px] md:w-[360px] snap-start"
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Card className="h-full bg-neutral-800/80 backdrop-blur-sm border-neutral-700 hover:border-[#8DC63F]/50 transition-all duration-300 group overflow-hidden">
                      {/* Top color bar */}
                      <div className={`h-1.5 ${activity.categoryColor}`} />
                      
                      <CardContent className="p-6">
                        {/* Category badge */}
                        <span className={`inline-block text-xs font-semibold text-white ${activity.categoryColor} px-3 py-1.5 rounded-full mb-4`}>
                          {activity.category}
                        </span>
                        
                        {/* Title */}
                        <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#8DC63F] transition-colors line-clamp-2 min-h-[56px]">
                          {activity.title}
                        </h3>
                        
                        {/* Meta info */}
                        <div className="space-y-2 text-sm text-neutral-400">
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
                              <Users className="h-4 w-4 text-[#8DC63F]" />
                              <span className="text-[#8DC63F] font-medium">{activity.spots} lugares disponibles</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Arrow */}
                        <div className="mt-5 pt-4 border-t border-neutral-700">
                          <span className="text-sm font-medium text-[#8DC63F] flex items-center gap-1 group-hover:gap-2 transition-all">
                            Ver detalles
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
            
            {/* View more card */}
            <Link
              to="/actividades"
              className="block shrink-0 w-[320px] md:w-[360px] snap-start"
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <Card className="h-full min-h-[280px] bg-neutral-800/50 border-neutral-700 border-dashed hover:border-[#8DC63F]/50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-[#8DC63F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="h-6 w-6 text-[#8DC63F]" />
                    </div>
                    <p className="text-white font-semibold mb-1">Ver más actividades</p>
                    <p className="text-sm text-neutral-500">Consulta el calendario completo</p>
                  </div>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
