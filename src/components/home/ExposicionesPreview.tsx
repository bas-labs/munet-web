import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants, type Easing } from 'framer-motion'
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

// Custom easing as proper tuple
const easeOutQuad: Easing = [0.25, 0.46, 0.45, 0.94]

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutQuad,
    },
  },
}

export default function ExposicionesPreview() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-20 lg:py-32 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Explora el Universo de la Energía
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Sumérgete en las diferentes manifestaciones de la energía y descubre cómo transforman nuestro mundo.
          </p>
        </motion.div>

        {/* Bento grid with stagger animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {exhibitions.map((exhibition, index) => (
            <motion.div
              key={exhibition.id}
              variants={shouldReduceMotion ? undefined : itemVariants}
              className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <Link
                to={`/exposiciones#${exhibition.id}`}
                className="block group h-full"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card className={`relative h-full min-h-[200px] lg:min-h-[240px] p-6 border-0 bg-gradient-to-br ${exhibition.color} transition-shadow duration-300 hover:shadow-xl overflow-hidden`}>
                    {/* Background decoration */}
                    <motion.div
                      className="absolute top-4 right-4 text-6xl opacity-20"
                      whileHover={shouldReduceMotion ? {} : { opacity: 0.35, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {exhibition.icon}
                    </motion.div>
                    
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
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="inline-block"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-neutral-300 hover:border-neutral-400 text-neutral-700 px-8"
            >
              <Link to="/exposiciones">Ver Todas las Exposiciones</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
