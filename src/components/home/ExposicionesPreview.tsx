import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Exhibition {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

const exhibitions: Exhibition[] = [
  {
    id: 'electricidad',
    title: 'Electricidad',
    description: 'Descubre el flujo de electrones, tipos de circuitos y métodos de generación eléctrica.',
    icon: '⚡',
    color: 'from-yellow-500/20 to-amber-600/20',
  },
  {
    id: 'energia-solar',
    title: 'Energía Solar',
    description: 'El sol como fuente primaria, paneles fotovoltaicos y el futuro de la energía renovable.',
    icon: '☀️',
    color: 'from-orange-500/20 to-yellow-500/20',
  },
  {
    id: 'energia-nuclear',
    title: 'Energía Nuclear',
    description: 'Fusión y fisión nuclear, producción libre de gases de efecto invernadero.',
    icon: '⚛️',
    color: 'from-emerald-500/20 to-teal-600/20',
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad',
    description: 'Desarrollo sostenible y tecnología como habilitador del futuro energético.',
    icon: '🌱',
    color: 'from-green-500/20 to-emerald-600/20',
  },
  {
    id: 'energia-eolica',
    title: 'Energía Eólica',
    description: 'Historia de la energía del viento, aerogeneradores y tecnología de turbinas.',
    icon: '💨',
    color: 'from-sky-500/20 to-blue-600/20',
  },
  {
    id: 'bioenergia',
    title: 'Bioenergía',
    description: 'Tipos de biomasa, producción de biocombustibles y la energía más antigua de la humanidad.',
    icon: '🌿',
    color: 'from-lime-500/20 to-green-600/20',
  },
]

export default function ExposicionesPreview() {
  return (
    <section className="py-20 lg:py-32 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Explora el Universo de la Energía
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Sumérgete en las diferentes manifestaciones de la energía y descubre cómo transforman nuestro mundo.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {exhibitions.map((exhibition, index) => (
            <Link
              key={exhibition.id}
              to={`/exposiciones#${exhibition.id}`}
              className={`block group ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <Card className="relative h-full min-h-[200px] lg:min-h-[240px] p-6 border-0 bg-gradient-to-br ${exhibition.color} hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                  {exhibition.icon}
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <span className="text-4xl mb-4">{exhibition.icon}</span>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {exhibition.title}
                  </h3>
                  <p className="text-neutral-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {exhibition.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-neutral-300 hover:border-neutral-400 text-neutral-700 px-8"
          >
            <Link to="/exposiciones">Ver Todas las Exposiciones</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
