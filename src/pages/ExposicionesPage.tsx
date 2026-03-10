import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import {
  Atom, Flame, Leaf, Zap, Lightbulb, Sun, Wind, Droplets, Thermometer, Sprout
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

const nivel1 = [
  { icon: Atom, title: 'Energía Nuclear', color: '#FF6B35', id: 'nuclear' },
  { icon: Flame, title: 'Combustibles Fósiles', color: '#FF6B35', id: 'combustibles' },
  { icon: Leaf, title: 'Sostenibilidad', color: '#8DC63F', id: 'sostenibilidad_pb' },
  { icon: Lightbulb, title: 'Conceptos Básicos', color: '#00D4AA', id: 'basicos' },
  { icon: Zap, title: 'Electricidad', color: '#00D4AA', id: 'electricidad' },
]

const nivel2 = [
  { icon: Droplets, title: 'Energía Hidráulica', color: '#00D4AA', id: 'hidraulica' },
  { icon: Thermometer, title: 'Energía Geotérmica', color: '#FF6B35', id: 'geotermica' },
  { icon: Sprout, title: 'Bioenergía', color: '#8DC63F', id: 'bioenergia' },
  { icon: Leaf, title: 'Sostenibilidad', color: '#8DC63F', id: 'sostenibilidad_pa' },
  { icon: Sun, title: 'Energía Solar', color: '#FF6B35', id: 'solar' },
  { icon: Wind, title: 'Energía Eólica', color: '#00D4AA', id: 'eolica' },
]

export default function ExposicionesPage() {
  const [activeLevel, setActiveLevel] = useState<1 | 2>(1)
  const exhibitions = activeLevel === 1 ? nivel1 : nivel2
  const mapImage = activeLevel === 1 ? '/images/nivel1.png' : '/images/nivel2.png'

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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/10 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00D4AA]/10 blur-[180px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#FF6B35]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FF6B35]">Exposiciones</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Explora el Universo de la <span className="text-[#FF6B35]">Energía</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/50 max-w-2xl leading-relaxed">
            Explora nuestras exposiciones interactivas sobre energía y tecnología en dos niveles del museo.
          </motion.p>
        </div>
      </section>

      {/* Level Selector + Map */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Mapa interactivo" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-10 tracking-tight">
              Mapa del <span className="text-[#8DC63F]">Museo</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex gap-3 mb-8">
              {[1, 2].map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level as 1 | 2)}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                    activeLevel === level
                      ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25'
                      : 'bg-[#F5F5F5] text-[#6B7280] hover:bg-[#E5E7EB]'
                  }`}
                >
                  Nivel {level}
                </button>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white shadow-sm">
              <img src={mapImage} alt={`Mapa Nivel ${activeLevel}`} className="w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Exhibition Cards */}
      <section className="py-24 sm:py-32 bg-[#F5F5F5]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text={`Nivel ${activeLevel}`} />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-16 tracking-tight">
              Exposiciones — <span className="text-[#FF6B35]">Nivel {activeLevel}</span>
            </h2>
          </Reveal>

          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exhibitions.map((expo, i) => (
              <motion.div
                key={expo.id}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i}
                className="group relative bg-white rounded-xl p-7 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-[#E5E7EB]/50 hover:border-[#E5E7EB] overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 ease-out rounded-t-xl" style={{ backgroundColor: expo.color }} />
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${expo.color}15` }}>
                  <expo.icon className="w-6 h-6" style={{ color: expo.color }} />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#1A1A1A] mb-3">{expo.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Exposición interactiva sobre {expo.title.toLowerCase()} en el Nivel {activeLevel} del museo.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
