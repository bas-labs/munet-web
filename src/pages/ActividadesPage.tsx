import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import {
  GraduationCap, Users, Mic2, FlaskConical, Calendar, ArrowRight
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

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'talleres', label: 'Talleres' },
  { id: 'conferencias', label: 'Conferencias' },
  { id: 'visitas', label: 'Visitas Guiadas' },
  { id: 'escolares', label: 'Programas Escolares' },
]

const activities = [
  { icon: FlaskConical, title: 'Talleres de Ciencia', category: 'talleres', desc: 'Experimenta con la energía en nuestros talleres interactivos para todas las edades.', color: '#FF6B35' },
  { icon: Mic2, title: 'Conferencias', category: 'conferencias', desc: 'Ponencias de expertos en energía, tecnología y sostenibilidad.', color: '#00D4AA' },
  { icon: Users, title: 'Visitas Guiadas', category: 'visitas', desc: 'Recorre el museo con nuestros guías especializados y descubre cada exposición.', color: '#8DC63F' },
  { icon: GraduationCap, title: 'Programas Escolares', category: 'escolares', desc: 'Programas educativos diseñados para complementar el aprendizaje escolar sobre energía.', color: '#FF6B35' },
  { icon: FlaskConical, title: 'Taller de Energías Renovables', category: 'talleres', desc: 'Construye tu propio panel solar y aprende cómo funciona la energía renovable.', color: '#00D4AA' },
  { icon: Mic2, title: 'Ciclo de Charlas MUNET', category: 'conferencias', desc: 'Charlas mensuales con investigadores y profesionales del sector energético.', color: '#8DC63F' },
]

export default function ActividadesPage() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const filtered = activeCategory === 'todos' ? activities : activities.filter(a => a.category === activeCategory)

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#1A1A1A]/95" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00D4AA 0.5px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D4AA]/10 blur-[200px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#FF6B35]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FF6B35]">Actividades</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Actividades y <span className="text-[#00D4AA]">Programas</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/50 max-w-2xl leading-relaxed">
            Talleres, conferencias, visitas guiadas y programas escolares.
          </motion.p>
        </div>
      </section>

      {/* Calendar Placeholder */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Calendario" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-10 tracking-tight">
              Calendario de <span className="text-[#FF6B35]">Actividades</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="bg-[#F5F5F5]/70 rounded-2xl border border-[#E5E7EB]/50 p-12 flex flex-col items-center justify-center min-h-[280px]">
              <Calendar className="w-12 h-12 text-[#FF6B35]/30 mb-4" />
              <h3 className="font-display text-xl font-semibold text-[#1A1A1A] mb-2">Calendario de Actividades</h3>
              <p className="text-sm text-[#6B7280]">Próximamente — Consulta nuestras actividades disponibles a partir de la apertura</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-24 sm:py-32 bg-[#F5F5F5]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Programas" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-10 tracking-tight">
              Nuestros <span className="text-[#8DC63F]">Programas</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/20'
                      : 'bg-white text-[#6B7280] hover:bg-[#E5E7EB] border border-[#E5E7EB]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((activity, i) => (
              <motion.div
                key={`${activity.title}-${i}`}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i}
                className="group relative bg-white rounded-xl p-7 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-[#E5E7EB]/50 hover:border-[#E5E7EB] overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 ease-out rounded-t-xl" style={{ backgroundColor: activity.color }} />
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${activity.color}15` }}>
                  <activity.icon className="w-6 h-6" style={{ color: activity.color }} />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-3">{activity.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{activity.desc}</p>
                <div className="flex items-center gap-2 text-[#6B7280]/30 group-hover:text-[#FF6B35] transition-colors duration-500">
                  <div className="w-5 h-[1px] bg-current" />
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
