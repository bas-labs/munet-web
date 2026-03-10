import { useEffect, useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/data/gallery'

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const currentImage = images[currentIndex]

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrevious()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    },
    [onClose, onPrevious, onNext]
  )

  // Add/remove keyboard listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  // Reset loading state when image changes
  useEffect(() => {
    setIsImageLoaded(false)
  }, [currentIndex])

  if (!isOpen || !currentImage) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/95 backdrop-blur-sm',
        'animate-in fade-in-0 duration-200'
      )}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className={cn(
          'absolute right-4 top-4 z-50 rounded-full p-3',
          'bg-white/10 text-white transition-colors hover:bg-white/20',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
        )}
        aria-label="Cerrar"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute left-4 top-4 z-50 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
        {currentIndex + 1} de {images.length}
      </div>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrevious()
        }}
        disabled={images.length <= 1}
        className={cn(
          'absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full p-3',
          'bg-white/10 text-white transition-colors hover:bg-white/20',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
          'disabled:opacity-30 disabled:cursor-not-allowed'
        )}
        aria-label="Imagen anterior"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        disabled={images.length <= 1}
        className={cn(
          'absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full p-3',
          'bg-white/10 text-white transition-colors hover:bg-white/20',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
          'disabled:opacity-30 disabled:cursor-not-allowed'
        )}
        aria-label="Siguiente imagen"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main image container */}
      <div
        className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading spinner */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          </div>
        )}

        {/* Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          onLoad={() => setIsImageLoaded(true)}
          className={cn(
            'max-h-[75vh] rounded-lg object-contain transition-opacity duration-300',
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Caption and category */}
        <div
          className={cn(
            'mt-4 text-center transition-opacity duration-300',
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="mb-2 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
            {currentImage.category}
          </span>
          <p className="mt-2 max-w-lg text-base text-white/90">
            {currentImage.caption}
          </p>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
        Usa las flechas ← → para navegar • Esc para cerrar
      </div>
    </div>
  )
}
