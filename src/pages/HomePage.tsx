import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import {
  ArrowRight, Zap, Atom, Flame, Sun, Wind, Droplets, Leaf,
  Clock, MapPin, Ticket, Calendar
} from 'lucide-react'

/* ─── Animation Helpers ─── */
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

/* ─── HERO ─── */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/2c.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/60 to-[#1A1A1A]/90" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #8DC63F 0.5px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <img src="/images/logo_bco.png" alt="MUNET Logo" className="mx-auto h-28 sm:h-36 lg:h-44 mb-8 drop-shadow-2xl" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="space-y-2">
          <p className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight">EL CONOCIMIENTO</p>
          <p className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight">NO TE CREA NI TE DESTRUYE.</p>
          <p className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#8DC63F] bg-clip-text text-transparent">TE TRANSFORMA.</span>
          </p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
          Museo Nacional de Energía y Tecnología — El primer museo nacional de México dedicado a la energía y tecnología.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white shadow-xl shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 hover:-translate-y-0.5 transition-all duration-300 h-13 px-8 text-sm font-semibold tracking-wide">
            <Link to="/boletos">COMPRAR BOLETOS <Ticket className="w-4 h-4 ml-2" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-13 px-8 text-sm font-medium tracking-wide hover:-translate-y-0.5 transition-all duration-300 bg-transparent">
            <Link to="/exposiciones">EXPLORAR EXPOSICIONES <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

/* ─── QUICK INFO BAR ─── */
function QuickInfoBar() {
  const items = [
    { icon: Clock, label: 'Horario', value: 'Mar–Dom 10:00–18:00' },
    { icon: MapPin, label: 'Ubicación', value: 'Bosque de Chapultepec II Secc.' },
    { icon: Ticket, label: 'General', value: '$120 MXN' },
    { icon: Calendar, label: 'Domingos', value: 'Entrada Gratuita' },
  ]

  return (
    <section className="relative -mt-16 z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[#E5E7EB]/50 p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280] mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── EXHIBITIONS PREVIEW ─── */
function ExhibitionsPreview() {
  const exhibitions = [
    { icon: Atom, title: 'Energía Nuclear', color: '#FF6B35', level: 'Nivel 1' },
    { icon: Flame, title: 'Combustibles Fósiles', color: '#FF6B35', level: 'Nivel 1' },
    { icon: Leaf, title: 'Sostenibilidad', color: '#8DC63F', level: 'Nivel 1 y 2' },
    { icon: Zap, title: 'Electricidad', color: '#00D4AA', level: 'Nivel 1' },
    { icon: Sun, title: 'Energía Solar', color: '#FF6B35', level: 'Nivel 2' },
    { icon: Wind, title: 'Energía Eólica', color: '#00D4AA', level: 'Nivel 2' },
    { icon: Droplets, title: 'Energía Hidráulica', color: '#00D4AA', level: 'Nivel 2' },
  ]

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel text="Exposiciones" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
                Explora el Universo de la <span className="text-[#FF6B35]">Energía</span>
              </h2>
              <p className="text-[#6B7280] max-w-lg text-base leading-relaxed">
                Descubre nuestras exposiciones interactivas sobre energía y tecnología en dos niveles del museo.
              </p>
            </div>
            <Link to="/exposiciones" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B35] hover:text-[#FF6B35]/80 transition-colors shrink-0">
              VER TODAS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {exhibitions.slice(0, 4).map((expo, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i}
              className="group relative bg-[#F5F5F5]/70 rounded-xl p-7 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-transparent hover:border-[#E5E7EB] overflow-hidden">
              <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 ease-out rounded-t-xl" style={{ backgroundColor: expo.color }} />
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: `${expo.color}15` }}>
                <expo.icon className="w-5 h-5" style={{ color: expo.color }} />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280] mb-2">{expo.level}</p>
              <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-3">{expo.title}</h3>
              <div className="mt-4 flex items-center gap-2 text-[#6B7280]/30 group-hover:text-[#FF6B35] transition-colors duration-500">
                <div className="w-5 h-[1px] bg-current" />
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid sm:grid-cols-3 gap-5">
          {exhibitions.slice(4).map((expo, i) => (
            <Reveal key={i} delay={i}>
              <div className="group relative bg-[#F5F5F5]/70 rounded-xl p-7 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-transparent hover:border-[#E5E7EB] overflow-hidden">
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 ease-out rounded-t-xl" style={{ backgroundColor: expo.color }} />
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: `${expo.color}15` }}>
                  <expo.icon className="w-5 h-5" style={{ color: expo.color }} />
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280] mb-2">{expo.level}</p>
                <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-3">{expo.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── VIDEO SECTION ─── */
function VideoSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F5F5]/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <SectionLabel text="Descubre MUNET" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              Un museo de <span className="text-[#8DC63F]">clase mundial</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#E5E7EB]/50">
            <video controls playsInline loop className="w-full aspect-video bg-[#1A1A1A]" poster="/images/2c.jpg">
              <source src="/images/banner_placeholder.mp4" type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative bg-[#1A1A1A] rounded-3xl overflow-hidden p-12 sm:p-16 lg:p-20">
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #8DC63F 0.5px, transparent 0)', backgroundSize: '32px 32px' }}
            />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B35]/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00D4AA]/10 blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Planifica tu <span className="text-[#FF6B35]">visita</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10">
                El MUNET te espera en el Bosque de Chapultepec. Ven a explorar la energía que mueve al mundo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white shadow-xl shadow-[#FF6B35]/25 h-13 px-8 text-sm font-semibold tracking-wide">
                  <Link to="/boletos">COMPRAR BOLETOS</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-13 px-8 text-sm font-medium tracking-wide bg-transparent">
                  <Link to="/planifica-tu-visita">PLANIFICA TU VISITA</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── PAGE ─── */
export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <QuickInfoBar />
      <ExhibitionsPreview />
      <VideoSection />
      <CTASection />
    </PageLayout>
  )
}
