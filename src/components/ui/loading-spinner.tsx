import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'border-munet-accent/30 border-t-munet-accent rounded-full animate-spin',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

/**
 * PageLoadingFallback - Full page loading state for Suspense boundaries
 */
export function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">Cargando...</p>
      </div>
    </div>
  )
}

/**
 * SectionLoadingFallback - Section-level loading state
 */
export function SectionLoadingFallback({ height = '400px' }: { height?: string }) {
  return (
    <div 
      className="flex items-center justify-center bg-munet-secondary/50 rounded-lg"
      style={{ minHeight: height }}
    >
      <LoadingSpinner size="md" />
    </div>
  )
}

export default LoadingSpinner
