import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants, type Easing } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Sun, Atom, Leaf, Wind, Flame } from 'lucide-react'

interface Exhibition {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  level: number
}

const exhibitions: Exhibition[] = [
  {
    id: 'electricidad',
    title: 'Electricidad',
    description: 'El flujo de electrones, circuitos y generación eléctrica.',
    icon: Zap,
    gradient: 'from-amber-500 to-yellow-600',
    level: 1,
  },
  {
    id: 'energia-solar',
    title: 'Energía Solar',
    description: 'El sol como fuente primaria de energía renovable.',
    icon: Sun,
    gradient: 'from-orange-400 to-amber-500',
    level: 2,
  },
  {
    id: 'energia-nuclear',
    title: 'Energía Nuclear',
    description: 'Fusión, fisión y el futuro de la energía limpia.',
    icon: Atom,
    gradient: 'from-emerald-500 to-teal-600',
    level: 1,
  },
  {
    id: 'sostenibilidad',
    title: 'Sostenibilidad',
    description: 'Tecnología como habilitador del futuro energético.',
    icon: Leaf,
    gradient: 'from-green-500 to-emerald-600',
    level: 1,
  },
  {
    id: 'energia-eolica',
    title: 'Energía Eólica',
    description: 'El poder del viento transformado en electricidad.',
    icon: Wind,
    gradient: 'from-cyan-400 to-blue-600',
    level: 2,
  },
  {
    id: 'combustibles',
    title: 'Combustibles Fósiles',
    description: 'Historia, impacto y transición energética.',
    icon: Flame,
    gradient: 'from-red-500 to-orange-600',
    level: 1,
  },
]

const easeOutQuad: Easing = [0.25, 0.46, 0.45, 0.94]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOutQuad,
    },
  },
}

export default function ExposicionesPreview() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8DC63F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#43A047]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block bg-[#8DC63F]/10 text-[#43A047] text-sm font-semibold px-4 py-2 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            11 Exposiciones Interactivas
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Explora el Universo de la{' '}
            <span className="text-[#8DC63F]">Energía</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Sumérgete en las diferentes manifestaciones de la energía y descubre cómo transforman nuestro mundo.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-14"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {exhibitions.map((exhibition, index) => {
            const Icon = exhibition.icon
            return (
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
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -6 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <Card className="relative h-full min-h-[220px] p-6 border border-neutral-200 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-200/50 hover:border-[#8DC63F]/30 overflow-hidden rounded-2xl">
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${exhibition.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      {/* Level badge */}
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">
                          Nivel {exhibition.level}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon */}
                        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${exhibition.gradient} shadow-lg mb-5`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-[#43A047] transition-colors">
                          {exhibition.title}
                        </h3>
                        <p className="text-neutral-600 text-sm flex-grow">
                          {exhibition.description}
                        </p>
                        
                        {/* Arrow indicator */}
                        <div className="mt-4 flex items-center text-[#8DC63F] font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                          Explorar
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
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
              size="lg"
              className="bg-[#8DC63F] hover:bg-[#7BBF35] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-[#8DC63F]/20"
            >
              <Link to="/exposiciones" className="flex items-center gap-2">
                Ver Todas las Exposiciones
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
