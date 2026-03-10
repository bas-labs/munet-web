import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'

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

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false)

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contacto@museomunet.com', href: 'mailto:contacto@museomunet.com' },
    { icon: MapPin, label: 'Dirección', value: 'Av. de los Compositores s/n, Bosque de Chapultepec II Secc, Miguel Hidalgo, 11100 CDMX', href: undefined },
    { icon: Phone, label: 'Teléfono', value: 'Próximamente', href: undefined },
  ]

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
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FF6B35]">Contacto</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            <span className="text-[#00D4AA]">Contacto</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/50 max-w-2xl leading-relaxed">
            ¿Tienes preguntas? Estamos aquí para ayudarte.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            {/* Contact Info */}
            <Reveal>
              <div>
                <SectionLabel text="Información" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-5 tracking-tight">
                  Encuéntranos en <span className="text-[#8DC63F]">Chapultepec</span>
                </h2>
                <p className="text-[#6B7280] text-base leading-relaxed mb-10">
                  Estamos ubicados en el Bosque de Chapultepec, Ciudad de México. No dudes en contactarnos.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-[#FF6B35]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280] mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-medium text-[#1A1A1A] hover:text-[#FF6B35] transition-colors no-underline">{item.value}</a>
                        ) : (
                          <p className="text-sm font-medium text-[#1A1A1A]">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
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
                  <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-3">¡Mensaje enviado!</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Hemos recibido tu mensaje. Te contactaremos pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                  className="bg-[#F5F5F5]/50 border border-[#E5E7EB]/50 rounded-2xl p-8 lg:p-10 space-y-5">
                  <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-2">Envíanos un Mensaje</h3>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Nombre</label>
                    <Input required placeholder="Tu nombre" className="h-12 bg-white border-[#E5E7EB] rounded-lg text-sm focus-visible:border-[#FF6B35] focus-visible:ring-[#FF6B35]/20" />
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Email</label>
                    <Input type="email" required placeholder="tu@email.com" className="h-12 bg-white border-[#E5E7EB] rounded-lg text-sm focus-visible:border-[#FF6B35] focus-visible:ring-[#FF6B35]/20" />
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Asunto</label>
                    <Input placeholder="Asunto de tu mensaje" className="h-12 bg-white border-[#E5E7EB] rounded-lg text-sm focus-visible:border-[#FF6B35] focus-visible:ring-[#FF6B35]/20" />
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] block mb-2">Mensaje</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Escribe tu mensaje aquí..."
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#6B7280]/60 focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/20 focus:outline-none resize-none transition-all"
                    />
                  </div>

                  <Button type="submit" size="lg"
                    className="w-full h-13 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold tracking-wide rounded-lg shadow-lg shadow-[#FF6B35]/20 hover:shadow-[#FF6B35]/30 hover:-translate-y-0.5 transition-all duration-300 text-sm">
                    <Send className="w-4 h-4 mr-2" />
                    ENVIAR MENSAJE
                  </Button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
