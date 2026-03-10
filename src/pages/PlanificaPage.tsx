import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import {
  Clock, MapPin, Ticket, Car, Train, Bus,
  Accessibility, Baby, Dog, Camera
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' as const }
  })
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={delay} className={className}>
      {children}
    </motion.div>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-[2px] bg-accent" />
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{text}</span>
    </div>
  )
}

export default function PlanificaPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  const schedule = [
    { day: 'Lunes', hours: 'CERRADO', closed: true },
    { day: 'Martes', hours: '10:00 a 18:00 hrs', closed: false },
    { day: 'Miércoles', hours: '10:00 a 18:00 hrs', closed: false },
    { day: 'Jueves', hours: '10:00 a 18:00 hrs', closed: false },
    { day: 'Viernes', hours: '10:00 a 18:00 hrs', closed: false },
    { day: 'Sábado', hours: '10:00 a 18:00 hrs', closed: false },
    { day: 'Domingo', hours: '10:00 a 18:00 hrs', closed: false },
  ]

  const prices = [
    { label: 'General', price: '$120 MXN' },
    { label: 'Estudiantes / INAPAM', price: '$60 MXN' },
    { label: 'Niños (3-12 años)', price: '$60 MXN' },
    { label: 'Domingos — Entrada Gratuita', price: 'GRATIS', highlight: true },
  ]

  const tips = [
    { icon: Accessibility, text: 'El museo es completamente accesible para personas con discapacidad' },
    { icon: Baby, text: 'Áreas especiales para familias con niños pequeños' },
    { icon: Dog, text: 'No se permite el acceso con mascotas (excepto perros guía)' },
    { icon: Camera, text: 'Fotografía permitida sin flash en todas las áreas' },
  ]

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#1A1A1A]/95" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FF6B35 0.5px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/10 blur-[200px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#FF6B35]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FF6B35]">Planifica</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Planifica tu <span className="text-[#FF6B35]">Visita</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/50 max-w-2xl leading-relaxed">
            Todo lo que necesitas saber para planificar tu visita al museo. Apertura marzo 2026.
          </motion.p>
        </div>
      </section>

      {/* Schedule + Prices */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Schedule */}
            <Reveal>
              <div className="bg-[#F5F5F5]/70 rounded-xl p-8 border border-transparent hover:border-[#E5E7EB] transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">Horarios de Apertura</h2>
                </div>
                <div className="space-y-3">
                  {schedule.map((item) => (
                    <div key={item.day} className={`flex justify-between items-center py-3 border-b border-[#E5E7EB]/50 last:border-0 ${item.closed ? 'opacity-50' : ''}`}>
                      <span className="text-sm font-medium text-[#1A1A1A]">{item.day}</span>
                      <span className={`text-sm ${item.closed ? 'text-red-500 font-semibold' : 'text-[#6B7280]'}`}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Prices */}
            <Reveal delay={1}>
              <div className="bg-[#F5F5F5]/70 rounded-xl p-8 border border-transparent hover:border-[#E5E7EB] transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-lg bg-[#00D4AA]/10 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-[#00D4AA]" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">Tarifas</h2>
                </div>
                <div className="space-y-3">
                  {prices.map((item) => (
                    <div key={item.label} className={`flex justify-between items-center py-3 border-b border-[#E5E7EB]/50 last:border-0 ${item.highlight ? 'bg-[#8DC63F]/10 -mx-4 px-4 rounded-lg border-0' : ''}`}>
                      <span className={`text-sm font-medium ${item.highlight ? 'text-[#8DC63F]' : 'text-[#1A1A1A]'}`}>{item.label}</span>
                      <span className={`text-sm font-semibold ${item.highlight ? 'text-[#8DC63F]' : 'text-[#1A1A1A]'}`}>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button asChild size="lg" className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white shadow-lg shadow-[#FF6B35]/20 h-13 text-sm font-semibold tracking-wide">
                    <Link to="/boletos">COMPRAR BOLETOS EN LÍNEA</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How to Get There */}
      <section className="py-24 sm:py-32 bg-[#F5F5F5]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Cómo Llegar" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
              Encuéntranos en <span className="text-[#8DC63F]">Chapultepec</span>
            </h2>
            <p className="text-[#6B7280] max-w-lg text-base leading-relaxed mb-16">
              Av. de los Compositores s/n, Bosque de Chapultepec II Secc, Miguel Hidalgo, 11100 Ciudad de México, CDMX
            </p>
          </Reveal>

          <div ref={ref} className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { icon: Car, title: 'En Auto', desc: 'Estacionamiento disponible para visitantes.' },
              { icon: Train, title: 'Metro', desc: 'Estación Constituyentes (Línea 7) a 10 minutos caminando.' },
              { icon: Bus, title: 'Autobús', desc: 'Rutas de transporte público sobre Av. Constituyentes.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i}
                className="group bg-white rounded-xl p-7 border border-[#E5E7EB]/50 hover:border-[#E5E7EB] hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
                <div className="w-12 h-12 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-3">{item.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <Reveal delay={2}>
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm">
              <div className="flex items-center gap-3 p-4 bg-white">
                <MapPin className="w-5 h-5 text-[#FF6B35]" />
                <p className="text-sm text-[#6B7280]">Av. de los Compositores s/n, Bosque de Chapultepec II Secc, Ciudad de México</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6!2d-99.2!3d19.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzEyLjAiTiA5OcKwMTInMDAuMCJX!5e0!3m2!1ses!2smx!4v1"
                className="w-full h-[400px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Ubicación MUNET"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tips */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Información útil" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-16 tracking-tight">
              Antes de tu <span className="text-[#FF6B35]">visita</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {tips.map((tip, i) => (
              <Reveal key={i} delay={i}>
                <div className="group flex gap-5 items-start bg-[#F5F5F5]/70 rounded-xl p-6 border border-transparent hover:border-[#E5E7EB] hover:shadow-lg transition-all duration-500">
                  <div className="shrink-0 w-11 h-11 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FF6B35]/15 transition-colors">
                    <tip.icon className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <p className="text-[#1A1A1A] text-[15px] leading-relaxed pt-2">{tip.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
