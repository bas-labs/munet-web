import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Building2, Users, TreePine, Sparkles } from 'lucide-react'

export default function RentaCTA() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Green gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f0a] via-[#122912] to-[#0d1f0d]" />
        
        {/* Glow effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8DC63F]/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#43A047]/15 via-transparent to-transparent" />
        
        {/* Architectural pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Floating particles */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#8DC63F]/40 rounded-full"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 4) * 20}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.span 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-[#8DC63F]" />
            Espacios Únicos
          </motion.span>
          
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Haz de tu Evento algo{' '}
            <span className="text-[#8DC63F]">Extraordinario</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Espacios arquitectónicos únicos en el corazón del Bosque de Chapultepec 
            para eventos corporativos, conferencias y celebraciones especiales.
          </p>
          
          {/* CTA */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="inline-block"
          >
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-neutral-100 text-neutral-900 px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300 shadow-2xl shadow-black/20"
            >
              <Link to="/renta-de-espacios" className="flex items-center gap-2">
                Conoce Nuestros Espacios
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Features grid */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { icon: Building2, label: 'Auditorio', value: '200 pax' },
            { icon: Users, label: 'Salas', value: 'Múltiples' },
            { icon: TreePine, label: 'Foro', value: 'Al aire libre' },
            { icon: Sparkles, label: 'Explanada', value: 'Eventos grandes' },
          ].map((space, i) => (
            <motion.div
              key={space.label}
              className="text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="h-12 w-12 bg-[#8DC63F]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <space.icon className="h-6 w-6 text-[#8DC63F]" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-white mb-1">
                {space.value}
              </div>
              <div className="text-sm text-white/60">{space.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
