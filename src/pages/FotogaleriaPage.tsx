import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import { CategoryFilter, MasonryGrid, Lightbox } from '@/components/gallery'
import { galleryImages, type GalleryCategory } from '@/data/gallery'
import { GrainOverlay, AmbientGlow, TextClipReveal } from '@/components/ui/gsap-primitives'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function FotogaleriaPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'Todos'>('Todos')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const shutterRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const prevCategoryRef = useRef<GalleryCategory | 'Todos'>('Todos')

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'Todos') return galleryImages
    return galleryImages.filter((img) => img.category === activeCategory)
  }, [activeCategory])

  // Camera shutter animation on mount
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (shutterRef.current) {
        gsap.fromTo(
          shutterRef.current,
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(100% at 50% 50%)',
            duration: 1.2,
            ease: 'power3.inOut',
          }
        )
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Masonry grid stagger reveal on mount
  useEffect(() => {
    if (prefersReducedMotion()) return

    const timer = setTimeout(() => {
      if (!gridRef.current) return
      const items = gridRef.current.querySelectorAll('.masonry-item')
      if (items.length === 0) return

      const ctx = gsap.context(() => {
        gsap.from(items, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: {
            each: 0.06,
            grid: 'auto',
            from: 'random',
          },
          ease: 'power3.out',
        })
      }, gridRef)

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Filter transition animation
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (prevCategoryRef.current === activeCategory) return
    prevCategoryRef.current = activeCategory

    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.masonry-item')
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(items, {
        scale: 0.8,
        opacity: 0,
        duration: 0.35,
        stagger: {
          each: 0.06,
          grid: 'auto',
          from: 'random',
        },
        ease: 'power3.out',
      })
    }, gridRef)

    return () => ctx.revert()
  }, [activeCategory])

  // Lightbox handlers
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === 0 ? filteredImages.length - 1 : prev - 1
    })
  }, [filteredImages.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === filteredImages.length - 1 ? 0 : prev + 1
    })
  }, [filteredImages.length])

  return (
    <PageLayout>
      <div ref={pageRef}>
        <SEOHead
          title="Fotogaleria"
          description="Explora MUNET a traves de imagenes. Arquitectura, exposiciones, eventos y construccion del Museo Nacional de Energia y Tecnologia."
          canonicalPath="/fotogaleria"
          keywords={['fotos museo', 'galeria MUNET', 'arquitectura Chapultepec', 'exposiciones CDMX']}
        />
        <StructuredData
          type="breadcrumb"
          breadcrumbItems={[
            { name: 'Inicio', path: '/' },
            { name: 'Fotogaleria', path: '/fotogaleria' },
          ]}
        />

        {/* Page Hero */}
        <section className="relative overflow-hidden bg-[#09090B]">
          <GrainOverlay />
          <AmbientGlow position="top-right" />

          {/* Camera shutter decorative element */}
          <div
            ref={shutterRef}
            className="absolute inset-0 bg-[#8DC63F]/5"
            style={{ clipPath: 'circle(0% at 50% 50%)' }}
            aria-hidden="true"
          />

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="max-w-3xl">
              <TextClipReveal>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Fotogaleria
                </h1>
              </TextClipReveal>
              <p className="mt-6 text-lg text-white/80 sm:text-xl">
                Explora MUNET a traves de imagenes
              </p>
              <p className="mt-2 text-base text-white/60">
                Descubre la arquitectura, exposiciones, eventos y el proceso de construccion
                del Museo Nacional de Energia y Tecnologia.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Category Filter */}
          <div className="mb-10">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Image count */}
          <p className="mb-6 text-sm text-muted-foreground">
            {filteredImages.length} {filteredImages.length === 1 ? 'imagen' : 'imagenes'}
            {activeCategory !== 'Todos' && ` en ${activeCategory}`}
          </p>

          {/* Masonry Grid */}
          <div ref={gridRef}>
            <MasonryGrid
              images={galleryImages}
              activeCategory={activeCategory}
              onImageClick={openLightbox}
            />
          </div>
        </section>

        {/* Lightbox */}
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex ?? 0}
          isOpen={lightboxIndex !== null}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </div>
    </PageLayout>
  )
}
