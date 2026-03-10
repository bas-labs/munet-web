import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { GalleryImage as GalleryImageType } from '@/data/gallery'

interface GalleryImageProps {
  image: GalleryImageType
  onClick: () => void
}

export default function GalleryImage({ image, onClick }: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(true)
  }, [])

  // Determine height based on aspect ratio
  const heightClass = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    square: 'aspect-square',
  }[image.aspectRatio || 'landscape']

  return (
    <div
      className={cn(
        'group relative mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl',
        heightClass
      )}
      onClick={onClick}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}

      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <svg
              className="mx-auto h-12 w-12 opacity-50"
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
            <p className="mt-2 text-sm">Error al cargar</p>
          </div>
        </div>
      ) : (
        <>
          {/* Image */}
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'h-full w-full object-cover transition-transform duration-500',
              'group-hover:scale-110',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />

          {/* Hover overlay */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent',
              'p-4 opacity-0 transition-opacity duration-300',
              'group-hover:opacity-100'
            )}
          >
            {/* Category badge */}
            <span className="mb-2 w-fit rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
              {image.category}
            </span>

            {/* Caption */}
            <p className="text-sm font-medium text-white line-clamp-2">
              {image.caption}
            </p>
          </div>

          {/* Focus ring for accessibility */}
          <div
            className={cn(
              'absolute inset-0 rounded-xl ring-2 ring-primary ring-offset-2',
              'opacity-0 transition-opacity focus-within:opacity-100'
            )}
          />
        </>
      )}
    </div>
  )
}
