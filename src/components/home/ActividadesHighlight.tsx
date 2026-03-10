import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Activity {
  id: string
  title: string
  date: string
  time: string
  category: string
  image: string
}

const upcomingActivities: Activity[] = [
  {
    id: '1',
    title: 'Taller de Energía Solar para Niños',
    date: '15 Mar 2026',
    time: '11:00 hrs',
    category: 'Taller',
    image: '☀️',
  },
  {
    id: '2',
    title: 'Conferencia: El Futuro de la Energía Nuclear',
    date: '18 Mar 2026',
    time: '17:00 hrs',
    category: 'Conferencia',
    image: '⚛️',
  },
  {
    id: '3',
    title: 'Visita Guiada: Historia de la Electricidad',
    date: '22 Mar 2026',
    time: '10:30 hrs',
    category: 'Visita Guiada',
    image: '⚡',
  },
]

export default function ActividadesHighlight() {
  return (
    <section className="py-20 lg:py-32 bg-neutral-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Próximas Actividades
            </h2>
            <p className="text-lg text-neutral-400 max-w-xl">
              Talleres, conferencias y experiencias diseñadas para todas las edades.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-neutral-600 text-white hover:bg-neutral-800 shrink-0"
          >
            <Link to="/actividades">Ver Todas las Actividades</Link>
          </Button>
        </div>

        {/* Horizontal scroll cards */}
        <div className="relative -mx-4 px-4">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {upcomingActivities.map((activity) => (
              <Link
                key={activity.id}
                to={`/actividades/${activity.id}`}
                className="shrink-0 w-[320px] md:w-[360px] snap-start"
              >
                <Card className="h-full bg-neutral-800 border-neutral-700 hover:border-orange-500/50 transition-all duration-300 group overflow-hidden">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {activity.image}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    {/* Category badge */}
                    <span className="inline-block text-xs font-semibold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full mb-3">
                      {activity.category}
                    </span>
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors line-clamp-2">
                      {activity.title}
                    </h3>
                    {/* Date & Time */}
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <span className="flex items-center gap-2">
                        <span>📅</span>
                        {activity.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <span>🕐</span>
                        {activity.time}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            {/* View more card */}
            <Link
              to="/actividades"
              className="shrink-0 w-[320px] md:w-[360px] snap-start"
            >
              <Card className="h-full bg-neutral-800/50 border-neutral-700 border-dashed hover:border-orange-500/50 transition-all duration-300 flex items-center justify-center min-h-[320px]">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">→</span>
                  </div>
                  <p className="text-neutral-400 font-medium">Ver más actividades</p>
                </div>
              </Card>
            </Link>
          </div>
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
