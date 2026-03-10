import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import { Building2, Landmark, Banknote, Scale, ChevronDown, ChevronUp } from 'lucide-react'

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

const sections = [
  {
    id: 'antecedentes',
    icon: Landmark,
    title: 'Antecedentes',
    summary: 'Conozca la historia y el origen de nuestro museo.',
    content: `El 22 de octubre de 1942 fue publicado en el Diario Oficial de la Federación un Acuerdo del Ejecutivo Federal mediante el cual, el entonces Departamento del Distrito Federal (DDF), cedió en forma gratuita a la Comisión Federal de Electricidad (CFE) un predio ubicado en la Segunda Sección del Bosque de Chapultepec de la Ciudad de México. Sin embargo no es sino hasta 1993 cuando por Acuerdo Presidencial del 2 de marzo, la CFE y el DDF formalizaron el Contrato de Donación del predio, de aproximadamente 55,000 m².

El Museo Tecnológico de la CFE se inauguró en 1970, enfocándose principalmente al tema de la energía eléctrica. El conocido como MUTEC se remodeló en el año 2000, sin registrar desde entonces cambios, actualizaciones o ampliaciones significativas en sus contenidos. Con el objetivo de fomentar el conocimiento sobre la energía y la tecnología, coadyuvando a una mayor vinculación entre la ciudadanía, los actores relacionados con el desarrollo de la ciencia y la tecnología, el gobierno y la iniciativa privada, es que se plantea en el sector energético gubernamental la necesidad de modernizar radicalmente este Museo, ampliando sustancialmente su temática y alcances.`,
    color: '#FF6B35',
  },
  {
    id: 'proyecto',
    icon: Building2,
    title: 'Proyecto',
    summary: 'Descubra el propósito y la visión detrás del MUNET.',
    content: `El Proyecto tuvo como fin la construcción, equipamiento, promoción y operación de un museo de ciencias de última generación, cuyo objeto de atención y divulgación es todo lo relacionado con los distintos tipos de energía y las tecnologías existentes para generarla, distribuirla y aprovecharla, sirviendo como promotor vocacional para los jóvenes que lo visiten y punto de exposición de la capacidad energética del país.

El Fideicomiso del Museo Nacional de Energía y Tecnología (FIMUNET) se constituye teniendo al Banco Mercantil del Norte (BANORTE) como institución fiduciaria. El FIMUNET tiene un Comité Técnico integrado por 15 miembros, de los cuales 8 provienen del sector privado y 7 son del ámbito gubernamental.

Para seleccionar el proyecto arquitectónico y el diseño museográfico del MUNET se realizó un concurso, al que se convocaron a 11 reconocidos arquitectos mexicanos. El jurado seleccionó como ganadores al Arq. Enrique Norten, en mancuerna con el despacho museográfico de Ralph Appelbaum.`,
    color: '#00D4AA',
  },
  {
    id: 'financiamiento',
    icon: Banknote,
    title: 'Financiamiento',
    summary: 'Información sobre las fuentes y el manejo de fondos.',
    content: `Inicialmente el Proyecto se ideó financiar totalmente con aportaciones y donativos privados, para lo cual se obtuvo y mantiene vigente el carácter de Donatario Autorizado. Se recurrió entonces al Banco Nacional de Obras y Servicios Públicos (BANOBRAS) para solicitar su intervención a través de un apoyo no recuperable en modalidad de Subvención.

El Proyecto del Museo fue redimensionado, autorizándosele una inversión de 1,695.4 millones de pesos, estando inscrito y dándosele seguimiento en la Unidad de Inversiones de la Secretaría de Hacienda y Crédito Público (SHCP).

De acuerdo con el Convenio de Apoyo Financiero, el 50.8% de la inversión del Museo es cubierta con aportaciones y donativos, mientras que el 49.2% restante corresponde a la Subvención de BANOBRAS, canalizada a través del Fondo Nacional de Infraestructura (FONADIN).`,
    color: '#8DC63F',
  },
  {
    id: 'principios',
    icon: Scale,
    title: 'Principios Rectores del Fideicomiso y del Museo',
    summary: 'Conozca los valores y directrices que nos rigen.',
    content: `El MUNET es un museo cuya operación, administración, comercialización y promoción está a cargo de un fideicomiso con autonomía técnica y de gestión.

El Museo es un espacio de paz, de libre circulación conforme a sus procedimientos operativos y de fomento a la educación científica, responsable de potenciar su contribución al desarrollo educativo, científico y tecnológico nacional.

El MUNET incentivará la educación, la ciencia y el desarrollo tecnológico con recursos y equipos adaptados a las necesidades nacionales. Generará un vínculo permanente entre la política educativa, la política cultural y la política científica y tecnológica del país.

El MUNET evitará en sus exhibiciones y mensajes contenidos de carácter político, religioso o discriminatorio en cualquier sentido, promoviendo en cambio valores como la honradez, la equidad de género, la empatía y la justicia social.`,
    color: '#FF6B35',
  },
]

function ExpandableCard({ section, index }: { section: typeof sections[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <Reveal delay={index}>
      <div className="group bg-[#F5F5F5]/70 rounded-xl overflow-hidden border border-transparent hover:border-[#E5E7EB] hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
        <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: section.color }} />
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-7 flex items-start gap-5"
        >
          <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${section.color}15` }}>
            <section.icon className="w-5 h-5" style={{ color: section.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-2">{section.title}</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">{section.summary}</p>
          </div>
          <div className="shrink-0 mt-1">
            {expanded ? <ChevronUp className="w-5 h-5 text-[#6B7280]" /> : <ChevronDown className="w-5 h-5 text-[#6B7280]" />}
          </div>
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-7 pb-7 pt-0">
                <div className="border-t border-[#E5E7EB] pt-6">
                  {section.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-sm text-[#6B7280] leading-relaxed mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function QuienesSomosPage() {
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
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FF6B35]">Conócenos</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Quiénes <span className="bg-gradient-to-r from-[#FF6B35] to-[#8DC63F] bg-clip-text text-transparent">Somos</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/50 max-w-2xl leading-relaxed">
            MUNET — Museo Nacional de Energía y Tecnología es el primer museo nacional de México dedicado a la energía y tecnología.
          </motion.p>
        </div>
      </section>

      {/* Content Cards */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Nuestra Historia" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
              Conoce el <span className="text-[#8DC63F]">MUNET</span>
            </h2>
            <p className="text-[#6B7280] max-w-lg text-base leading-relaxed mb-16">
              Desde su concepción hasta su apertura, el MUNET representa un hito en la divulgación científica en México.
            </p>
          </Reveal>

          <div className="space-y-4">
            {sections.map((section, i) => (
              <ExpandableCard key={section.id} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Museum Image */}
      <section className="py-24 sm:py-32 bg-[#F5F5F5]/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
              <img src="/images/2c.jpg" alt="Museo Nacional de Energía y Tecnología" className="w-full aspect-[16/9] object-cover" />
            </div>
            <p className="text-center text-sm text-[#6B7280] mt-6">
              Museo Nacional de Energía y Tecnología — Bosque de Chapultepec, Ciudad de México
            </p>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  )
}
