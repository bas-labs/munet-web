import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PageLayout } from '@/components/layout'
import { X } from 'lucide-react'

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

const galleryCategories = [
  { id: 'todos', label: 'Todos' },
  { id: 'columnas', label: 'Columnas de la Sustentabilidad' },
  { id: 'experiencia', label: 'Experiencia MUNET' },
  { id: 'exposiciones', label: 'Exposiciones' },
  { id: 'auditorio', label: 'Auditorio' },
  { id: 'exterior', label: 'Exterior Museo' },
]

const images = [
  { src: '/images/fotogaleria/RHG_5645And8more_Optimizer.jpg', category: 'columnas', alt: 'Columnas de la Sustentabilidad 1' },
  { src: '/images/fotogaleria/RHG_5834And8more_Optimizer.jpg', category: 'columnas', alt: 'Columnas de la Sustentabilidad 2' },
  { src: '/images/fotogaleria/RHG_5969And8more_Optimizer.jpg', category: 'columnas', alt: 'Columnas de la Sustentabilidad 3' },
  { src: '/images/fotogaleria/RHG_6230And8more_Optimizer.jpg', category: 'columnas', alt: 'Columnas de la Sustentabilidad 4' },
  { src: '/images/fotogaleria/RHG_5503.jpg', category: 'experiencia', alt: 'Experiencia MUNET 1' },
  { src: '/images/fotogaleria/RHG_5508.jpg', category: 'experiencia', alt: 'Experiencia MUNET 2' },
  { src: '/images/fotogaleria/RHG_0001And8more_Optimizer.jpg', category: 'exposiciones', alt: 'Exposiciones 1' },
  { src: '/images/fotogaleria/RHG_0019And8more_Optimizer.jpg', category: 'exposiciones', alt: 'Exposiciones 2' },
  { src: '/images/fotogaleria/1.jpg', category: 'auditorio', alt: 'Auditorio 1' },
  { src: '/images/fotogaleria/10.jpg', category: 'auditorio', alt: 'Auditorio 2' },
  { src: '/images/fotogaleria/RHG_3698And8more_Optimizer.jpg', category: 'exterior', alt: 'Exterior Museo 1' },
  { src: '/images/fotogaleria/RHG_3725And8more_Optimizer---copia.jpg', category: 'exterior', alt: 'Exterior Museo 2' },
  { src: '/images/fotogaleria/RHG_3752And8more_Optimizer.jpg', category: 'exterior', alt: 'Exterior Museo 3' },
]

export default function FotogaleriaPage() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const filtered = activeCategory === 'todos' ? images : images.filter(img => img.category === activeCategory)

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

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
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FF6B35]">Galería</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Foto<span className="text-[#FF6B35]">galería</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/50 max-w-2xl leading-relaxed">
            Explora imágenes de nuestra arquitectura, exposiciones y eventos.
          </motion.p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel text="Explorar" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-10 tracking-tight">
              Imágenes del <span className="text-[#8DC63F]">MUNET</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex flex-wrap gap-2 mb-12">
              {galleryCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/20'
                      : 'bg-[#F5F5F5] text-[#6B7280] hover:bg-[#E5E7EB] border border-[#E5E7EB]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div ref={ref} className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={`${img.src}-${i}`}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i * 0.5}
                className="mb-4 break-inside-avoid group cursor-pointer"
                onClick={() => setLightboxImage(img.src)}
              >
                <div className="relative rounded-xl overflow-hidden border border-[#E5E7EB]/50 hover:border-[#E5E7EB] hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all duration-500">
                  <img src={img.src} alt={img.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white text-sm font-semibold tracking-wide bg-black/40 px-4 py-2 rounded-lg">Ver</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button onClick={() => setLightboxImage(null)} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Foto ampliada"
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
