import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  containerClassName?: string
  /** Aspect ratio for container (prevents CLS) - format: "16/9", "4/3", "1/1" */
  aspectRatio?: string
  /** Blur placeholder color */
  placeholderColor?: string
  /** Responsive srcset sizes */
  sizes?: string
  /** Generate srcset for responsive images */
  srcSet?: string
  /** Priority image - loads eagerly */
  priority?: boolean
  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  /** Object position */
  objectPosition?: string
  /** Callback when image loads */
  onLoad?: () => void
  /** Callback on error */
  onError?: () => void
}

/**
 * OptimizedImage - Performance-optimized image component
 * 
 * Features:
 * - Native lazy loading with loading="lazy"
 * - Blur placeholder while loading (prevents layout shift)
 * - WebP format support with fallback
 * - Responsive srcset for different sizes
 * - Aspect ratio container to prevent CLS
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  aspectRatio = '16/9',
  placeholderColor = '#F5F5F5',
  sizes = '100vw',
  srcSet,
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Check if image is already cached/loaded
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
      setIsLoaded(true)
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate WebP srcset if not provided
  const generateSrcSet = (baseSrc: string): string | undefined => {
    if (srcSet) return srcSet
    
    // If it's already a WebP or data URL, don't modify
    if (baseSrc.endsWith('.webp') || baseSrc.startsWith('data:')) {
      return undefined
    }

    // Generate srcset for common viewport widths
    const widths = [320, 640, 768, 1024, 1280, 1536, 1920]
    
    // For external URLs or URLs without clear extension, return undefined
    if (!baseSrc.match(/\.(jpg|jpeg|png|gif)(\?.*)?$/i)) {
      return undefined
    }

    return widths
      .map(w => `${baseSrc} ${w}w`)
      .join(', ')
  }

  // Check for WebP support and generate source
  const webpSrc = src.match(/\.(jpg|jpeg|png)(\?.*)?$/i)
    ? src.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp$2')
    : null

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-munet-secondary',
        containerClassName
      )}
      style={{
        aspectRatio,
        backgroundColor: placeholderColor,
      }}
    >
      {/* Blur placeholder overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-munet-secondary/80 backdrop-blur-sm transition-opacity duration-500',
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        aria-hidden="true"
      >
        {/* Loading spinner */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-munet-accent/30 border-t-munet-accent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-munet-secondary">
          <div className="text-center text-muted-foreground">
            <svg
              className="w-12 h-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">Error loading image</span>
          </div>
        </div>
      )}

      {/* Picture element for WebP with fallback */}
      <picture>
        {webpSrc && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          srcSet={generateSrcSet(src)}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          style={{
            objectFit,
            objectPosition,
          }}
        />
      </picture>
    </div>
  )
}

/**
 * ResponsiveImage - Simpler variant for basic responsive images
 */
export function ResponsiveImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  )
}

export default OptimizedImage
