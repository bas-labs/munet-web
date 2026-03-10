import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Clock, MapPin, Train, Bus, Car, Ticket } from 'lucide-react'

export default function PlanificaSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#8DC63F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-[#8DC63F]/10 text-[#43A047] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Información para Visitantes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Planifica tu Visita
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Todo lo que necesitas saber para disfrutar al máximo tu experiencia en MUNET.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Hours & Address */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Hours card */}
            <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8 border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <div className="h-10 w-10 bg-[#8DC63F]/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#8DC63F]" />
                </div>
                Horarios de Apertura
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="font-semibold text-red-600">Lunes</span>
                  <span className="text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full text-sm">
                    CERRADO
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="text-neutral-700 font-medium">Martes – Domingo</span>
                  <span className="text-neutral-900 font-bold">10:00 – 18:00 hrs</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-neutral-500 text-sm">Última entrada</span>
                  <span className="text-neutral-500 text-sm">17:00 hrs</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#8DC63F]/10 rounded-xl border border-[#8DC63F]/20">
                <p className="text-sm text-[#43A047] font-medium">
                  🎉 <strong>Domingos:</strong> Entrada gratuita para mexicanos y residentes
                </p>
              </div>
            </div>

            {/* Address card */}
            <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8 border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                <div className="h-10 w-10 bg-[#8DC63F]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-[#8DC63F]" />
                </div>
                Ubicación
              </h3>
              <address className="not-italic text-neutral-700 leading-relaxed mb-5">
                Av. de los Compositores s/n<br />
                Bosque de Chapultepec II Sección<br />
                Ciudad de México, CDMX
              </address>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 text-neutral-700 px-3 py-1.5 rounded-full text-sm">
                  <Train className="h-3.5 w-3.5 text-[#8DC63F]" />
                  Metro Constituyentes
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 text-neutral-700 px-3 py-1.5 rounded-full text-sm">
                  <Bus className="h-3.5 w-3.5 text-[#8DC63F]" />
                  Metrobús Auditorio
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 text-neutral-700 px-3 py-1.5 rounded-full text-sm">
                  <Car className="h-3.5 w-3.5 text-[#8DC63F]" />
                  Estacionamiento
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#8DC63F] hover:bg-[#7BBF35] text-white py-6 text-lg rounded-xl"
                >
                  <Link to="/boletos" className="flex items-center justify-center gap-2">
                    <Ticket className="h-5 w-5" />
                    Comprar Boletos
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-neutral-300 py-6 text-lg rounded-xl"
                >
                  <Link to="/planifica-tu-visita">Más información</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Map visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-[450px] lg:h-[550px] bg-gradient-to-br from-[#8DC63F]/10 to-[#43A047]/10 rounded-3xl overflow-hidden border border-[#8DC63F]/20">
              {/* Abstract map visualization */}
              <div className="absolute inset-0">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(to right, #8DC63F 1px, transparent 1px), linear-gradient(to bottom, #8DC63F 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
                
                {/* Organic shapes representing Chapultepec forest */}
                <motion.div 
                  className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#8DC63F]/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#43A047]/20 rounded-full blur-xl"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.2, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#4CAF50]/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.25, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Center pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10">
                <motion.div 
                  className="relative"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-12 h-12 bg-[#8DC63F] rounded-full shadow-lg shadow-[#8DC63F]/50 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{ 
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderTop: '15px solid #8DC63F',
                    }} 
                  />
                </motion.div>
              </div>
              
              {/* Label */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-[#8DC63F] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">MUNET</p>
                    <p className="text-sm text-neutral-600">Bosque de Chapultepec, Segunda Sección</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price floating card */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-neutral-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs text-neutral-500 mb-1">Entrada general</p>
              <p className="text-3xl font-bold text-neutral-900">
                $80 <span className="text-base font-normal text-neutral-400">MXN</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
