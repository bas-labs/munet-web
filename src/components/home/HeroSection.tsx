import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, Ticket, Compass } from 'lucide-react'

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Mexican-inspired gradient */}
      <motion.div
        className="absolute inset-0"
        style={shouldReduceMotion ? {} : { y: backgroundY }}
      >
        {/* Deep forest green base - evokes Chapultepec */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f0a] via-[#122912] to-[#0d1f0d]" />
        
        {/* Energy glow overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#8DC63F]/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#43A047]/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4CAF50]/10 via-transparent to-transparent" />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#8DC63F] rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        style={shouldReduceMotion ? {} : { y: contentY, opacity }}
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 text-sm font-medium text-white/90">
            <MapPin className="h-4 w-4 text-[#8DC63F]" />
            Bosque de Chapultepec, Ciudad de México
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img 
            src="/images/logo_bco.png" 
            alt="MUNET - Museo Nacional de Energía y Tecnología" 
            className="h-24 sm:h-32 md:h-40 w-auto mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 leading-relaxed tracking-tight">
            "El conocimiento no te crea ni te destruye.{' '}
            <motion.span
              className="text-[#8DC63F] font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Te transforma.
            </motion.span>
            "
          </p>
        </motion.blockquote>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-[#8DC63F] hover:bg-[#7BBF35] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl shadow-[#8DC63F]/30 hover:shadow-[#8DC63F]/50 transition-all duration-300"
            >
              <Link to="/boletos" className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Comprar Boletos
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              <Link to="/exposiciones" className="flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Explorar Exposiciones
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {[
            { value: '11', label: 'Exposiciones' },
            { value: '2', label: 'Niveles' },
            { value: '∞', label: 'Descubrimientos' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#8DC63F]">{stat.value}</div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1.5 h-2.5 bg-[#8DC63F] rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
