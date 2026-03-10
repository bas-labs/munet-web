import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Users, Lightbulb, Heart, Briefcase, Upload, Send, Sparkles,
  Zap, Globe, GraduationCap, ArrowRight, CheckCircle2, FileText
} from 'lucide-react'

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" as const }
  })
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const }
  })
}

/* ─── Reveal Wrapper ─── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Section Label ─── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-[2px] bg-accent" />
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{text}</span>
    </div>
  )
}

/* ─── HERO SECTION ─── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#1A1A1A]/95" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FF6B35 0.5px, transparent 0)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B35]/10 blur-[200px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00D4AA]/10 blur-[180px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-[#FF6B35]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FF6B35]">Únete a MUNET</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            >
              Involúcrate con{' '}
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#00D4AA] bg-clip-text text-transparent">MUNET</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-white/50 max-w-lg leading-relaxed mb-10"
            >
              Si estás interesado en formar parte de nuestro equipo, te invitamos a llenar el siguiente formulario y enviarnos tu Curriculum Vitae. Buscamos talento apasionado por la energía y la tecnología.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#postulacion"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FF6B35] text-white text-sm font-semibold tracking-wide rounded-lg hover:bg-[#FF6B35]/90 transition-all duration-300 shadow-xl shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 hover:-translate-y-0.5">
                POSTÚLATE AHORA
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#formas"
                className="inline-flex items-center gap-3 px-8 py-4 text-white/60 text-sm font-medium tracking-wide border border-white/15 hover:border-white/30 hover:text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5">
                CONOCE MÁS
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Zap, label: 'Energía', desc: 'Pasión por la ciencia y tecnología energética' },
                { icon: Globe, label: 'Impacto', desc: 'Contribuye a la educación de miles de visitantes' },
                { icon: GraduationCap, label: 'Crecimiento', desc: 'Desarrollo profesional en un museo de clase mundial' },
                { icon: Sparkles, label: 'Innovación', desc: 'Sé parte de experiencias interactivas únicas' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                  className="group bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.07] hover:border-[#FF6B35]/20 transition-all duration-500"
                >
                  <item.icon className="w-5 h-5 text-[#FF6B35]/70 mb-4 group-hover:text-[#FF6B35] transition-colors duration-500" />
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{item.label}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── WAYS TO GET INVOLVED ─── */
function FormasSection() {
  const cards = [
    { icon: Users, title: 'Voluntariado', desc: 'Sé parte del equipo MUNET y contribuye a la educación sobre energía y tecnología. Guía visitantes, apoya eventos y comparte tu pasión.' },
    { icon: Heart, title: 'Donaciones', desc: 'Apoya nuestra misión educativa con tu contribución. Cada donación impulsa nuevas exposiciones y programas para la comunidad.' },
    { icon: Briefcase, title: 'Alianzas Corporativas', desc: 'Establece una alianza estratégica con MUNET. Conecta tu marca con la innovación energética y la responsabilidad social.' },
    { icon: Lightbulb, title: 'Bolsa de Trabajo', desc: 'Conoce las oportunidades laborales en MUNET. Buscamos talento apasionado por la energía y la tecnología.' },
  ]

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="formas" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel text="Formas de participar" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
                Encuentra tu forma de{' '}
                <span className="text-[#FF6B35]">contribuir</span>
              </h2>
              <p className="text-[#6B7280] max-w-lg text-base leading-relaxed">
                Ya sea como voluntario, donador, aliado corporativo o como parte de nuestro equipo — hay muchas formas de ser parte de MUNET.
              </p>
            </div>
          </div>
        </Reveal>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i}
              className="group relative bg-[#F5F5F5]/70 rounded-xl p-7 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-transparent hover:border-[#E5E7EB] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#FF6B35] group-hover:w-full transition-all duration-700 ease-out rounded-t-xl" />
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-500 ${
                i % 2 === 0 ? 'bg-[#FF6B35]/10 group-hover:bg-[#FF6B35]/15' : 'bg-[#00D4AA]/10 group-hover:bg-[#00D4AA]/15'
              }`}>
                <card.icon className={`w-5 h-5 ${i % 2 === 0 ? 'text-[#FF6B35]' : 'text-[#00D4AA]'}`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-3">{card.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{card.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-[#6B7280]/30 group-hover:text-[#FF6B35] transition-colors duration-500">
                <div className="w-5 h-[1px] bg-current" />
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── WHY MUNET ─── */
function WhySection() {
  const reasons = [
    { icon: Zap, text: 'Trabaja en uno de los museos de ciencia más innovadores de México' },
    { icon: GraduationCap, text: 'Desarrollo profesional continuo y capacitación especializada' },
    { icon: Globe, text: 'Impacta a miles de visitantes con educación sobre energía y sostenibilidad' },
    { icon: Sparkles, text: 'Colabora con un equipo multidisciplinario apasionado' },
  ]

  return (
    <section className="relative py-24 sm:py-32 bg-[#F5F5F5]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionLabel text="¿Por qué MUNET?" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
              Más que un trabajo, una{' '}
              <span className="text-[#00D4AA]">misión</span>
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              En MUNET transformamos la manera en que México entiende la energía y la tecnología. Sé parte de algo más grande.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i * 1.5}>
              <div className="group flex gap-5 items-start bg-white rounded-xl p-6 border border-[#E5E7EB]/50 hover:border-[#FF6B35]/20 hover:shadow-lg transition-all duration-500">
                <div className="shrink-0 w-11 h-11 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FF6B35]/15 transition-colors">
                  <r.icon className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <p className="text-[#1A1A1A] text-[15px] leading-relaxed pt-2">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── APPLICATION FORM ─── */
function ApplicationForm() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="postulacion" className="relative py-24 sm:py-32 bg-white">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          <Reveal>
            <div>
              <SectionLabel text="Postulación" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-5 tracking-tight">
                Envía tu{' '}
                <span className="text-[#FF6B35]">postulación</span>
              </h2>
              <p className="text-[#6B7280] text-base leading-relaxed mb-10">
                Si estás interesado en formar parte de nuestro equipo, te invitamos a llenar el siguiente formulario y enviarnos tu Curriculum Vitae. Buscamos talento apasionado por la energía y la tecnología.
              </p>

              <div className="space-y-5">
                {[
                  { icon: FileText, text: 'Formatos aceptados: PDF, DOC, DOCX' },
                  { icon: Upload, text: 'Tamaño máximo: 5MB' },
                  { icon: Send, text: 'Recibirás confirmación por correo' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#6B7280]">
                    <div className="w-8 h-8 rounded-md bg-[#F5F5F5] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#FF6B35]" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#00D4AA]/5 border border-[#00D4AA]/20 rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[#00D4AA]/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#00D4AA]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-3">¡Postulación enviada!</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Hemos recibido tu información. Nuestro equipo revisará tu perfil y te contactaremos pronto.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#F5F5F5]/50 border border-[#E5E7EB]/50 rounded-2xl p-8 lg:p-10 space-y-5">
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Nombre Completo</label>
                  <Input
                    placeholder="Tu nombre completo"
                    required
                    className="h-12 bg-white border-[#E5E7EB] rounded-lg text-sm focus-visible:border-[#FF6B35] focus-visible:ring-[#FF6B35]/20"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Correo Electrónico</label>
                    <Input
                      type="email"
                      placeholder="tu.email@ejemplo.com"
                      required
                      className="h-12 bg-white border-[#E5E7EB] rounded-lg text-sm focus-visible:border-[#FF6B35] focus-visible:ring-[#FF6B35]/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Teléfono</label>
                    <Input
                      type="tel"
                      placeholder="Ej. +52 55 1234 5678"
                      className="h-12 bg-white border-[#E5E7EB] rounded-lg text-sm focus-visible:border-[#FF6B35] focus-visible:ring-[#FF6B35]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Adjuntar Curriculum Vitae (PDF, DOCX)</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="group cursor-pointer border-2 border-dashed border-[#E5E7EB] hover:border-[#FF6B35]/40 rounded-xl p-6 text-center transition-all duration-300 bg-white hover:bg-[#FF6B35]/[0.02]"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 mx-auto mb-3 text-[#6B7280]/40 group-hover:text-[#FF6B35] transition-colors duration-300" />
                    {fileName ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4 text-[#FF6B35]" />
                        <span className="text-sm font-medium text-[#1A1A1A]">{fileName}</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-[#6B7280] mb-1">Haz clic para seleccionar un archivo</p>
                        <p className="text-xs text-[#6B7280]/60">Tamaño máximo 5MB. Formatos: PDF, DOC, DOCX</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Mensaje o Comentarios</label>
                  <textarea
                    placeholder="Cuéntanos sobre tu experiencia o por qué te gustaría ser parte del MUNET..."
                    rows={4}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#6B7280]/60 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/20 focus:outline-none resize-none transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-13 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold tracking-wide rounded-lg shadow-lg shadow-[#FF6B35]/20 hover:shadow-[#FF6B35]/30 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  ENVIAR POSTULACIÓN
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── PAGE ─── */
export default function InvolucratePage() {
  return (
    <PageLayout>
      <HeroSection />
      <FormasSection />
      <WhySection />
      <ApplicationForm />
    </PageLayout>
  )
}
