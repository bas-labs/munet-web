import { useState, useMemo, useCallback } from 'react'
import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CategoryFilter, MasonryGrid, Lightbox } from '@/components/gallery'
import { galleryImages, type GalleryCategory } from '@/data/gallery'

export default function FotogaleriaPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'Todos'>('Todos')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'Todos') return galleryImages
    return galleryImages.filter((img) => img.category === activeCategory)
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
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
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
          <Breadcrumb
            items={[{ label: 'Fotogalería' }]}
            className="mb-8 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/50 [&_li:last-child_span]:text-white"
          />
          
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Fotogalería
            </h1>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              Explora MUNET a través de imágenes
            </p>
            <p className="mt-2 text-base text-white/60">
              Descubre la arquitectura, exposiciones, eventos y el proceso de construcción 
              del Museo Nacional de Energía y Tecnología.
            </p>
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-0 right-0 hidden h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/20 blur-3xl lg:block" />
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
          {filteredImages.length} {filteredImages.length === 1 ? 'imagen' : 'imágenes'}
          {activeCategory !== 'Todos' && ` en ${activeCategory}`}
        </p>

        {/* Masonry Grid */}
        <MasonryGrid
          images={galleryImages}
          activeCategory={activeCategory}
          onImageClick={openLightbox}
        />
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
    </PageLayout>
  )
}
