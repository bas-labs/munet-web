import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import GalleryImage from './GalleryImage'
import type { GalleryImage as GalleryImageType, GalleryCategory } from '@/data/gallery'

interface MasonryGridProps {
  images: GalleryImageType[]
  activeCategory: GalleryCategory | 'Todos'
  onImageClick: (index: number) => void
}

export default function MasonryGrid({
  images,
  activeCategory,
  onImageClick,
}: MasonryGridProps) {
  // Filter images based on category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'Todos') return images
    return images.filter((img) => img.category === activeCategory)
  }, [images, activeCategory])

  if (filteredImages.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-muted">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-muted-foreground/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            No hay imágenes en esta categoría
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'columns-1 gap-4',
        'sm:columns-2',
        'lg:columns-3'
      )}
    >
      {filteredImages.map((image, index) => (
        <div
          key={image.id}
          className="masonry-item animate-in fade-in-0 zoom-in-95 duration-300"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
        >
          <GalleryImage
            image={image}
            onClick={() => {
              // Find the index in the filtered array
              onImageClick(index)
            }}
          />
        </div>
      ))}
    </div>
  )
}
