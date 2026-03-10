import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import {
  Coffee, ShoppingBag, Lock, Wifi, Accessibility, Car
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

const services = [
  { icon: Coffee, title: 'Cafetería', desc: 'Disfruta de bebidas y alimentos en nuestro café.', color: '#FF6B35' },
  { icon: ShoppingBag, title: 'Tienda MUNET', desc: 'Llévate un recuerdo de tu visita.', color: '#00D4AA' },
  { icon: Lock, title: 'Guardarropa / Lockers', desc: 'Guarda tus pertenencias de forma segura.', color: '#8DC63F' },
  { icon: Wifi, title: 'Wi-Fi Gratuito', desc: 'Conéctate durante tu visita.', color: '#FF6B35' },
  { icon: Accessibility, title: 'Sanitarios', desc: 'Instalaciones limpias y accesibles.', color: '#00D4AA' },
  { icon: Car, title: 'Estacionamiento', desc: 'Estacionamiento disponible para visitantes.', color: '#8DC63F' },
]

export default function ServiciosPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#1A1A1A]/95" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #8DC63F 0.5px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8DC63F]/10 blur-[200px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#FF6B35]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FF6B35]">Servicios</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Nuestros <span className="text-[#8DC63F]">Servicios</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/50 max-w-2xl leading-relaxed">
            Conoce los servicios disponibles durante tu visita al museo.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Para tu comodidad" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-16 tracking-tight">
              Todo lo que <span className="text-[#FF6B35]">necesitas</span>
            </h2>
          </Reveal>

          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i}
                className="group relative bg-[#F5F5F5]/70 rounded-xl p-7 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-transparent hover:border-[#E5E7EB] overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 ease-out rounded-t-xl" style={{ backgroundColor: service.color }} />
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${service.color}15` }}>
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#1A1A1A] mb-3">{service.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Museum Image */}
      <section className="py-24 sm:py-32 bg-[#F5F5F5]/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
              <img src="/images/2c.jpg" alt="MUNET - Servicios del museo" className="w-full aspect-[16/9] object-cover" />
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  )
}
