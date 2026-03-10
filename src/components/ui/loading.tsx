import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================================================
// EnergyLoader - Animated energy-themed spinner
// ============================================================================

interface EnergyLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function EnergyLoader({ size = 'md', className }: EnergyLoaderProps) {
  const shouldReduceMotion = useReducedMotion()

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent/50"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={shouldReduceMotion ? undefined : {
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear' as const,
        }}
      />
      {/* Inner pulsing core */}
      <motion.div
        className="w-1/3 h-1/3 rounded-full bg-accent"
        animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={shouldReduceMotion ? undefined : {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
      {/* Energy glow effect */}
      <div className="absolute inset-0 rounded-full bg-accent/20 blur-md animate-pulse" />
    </div>
  )
}

// ============================================================================
// SkeletonPulse - Pulsing skeleton loader
// ============================================================================

interface SkeletonPulseProps {
  className?: string
  /** Width (CSS value) */
  width?: string
  /** Height (CSS value) */
  height?: string
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

export function SkeletonPulse({
  className,
  width,
  height,
  rounded = 'md',
}: SkeletonPulseProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        roundedClasses[rounded],
        className
      )}
      style={{ width, height }}
    />
  )
}

// ============================================================================
// Skeleton Card - Pre-built card skeleton
// ============================================================================

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg overflow-hidden',
        className
      )}
    >
      {/* Image placeholder */}
      <SkeletonPulse className="aspect-video" rounded="none" />
      {/* Content */}
      <div className="p-4 space-y-3">
        <SkeletonPulse height="1.25rem" width="75%" />
        <SkeletonPulse height="0.875rem" width="100%" />
        <SkeletonPulse height="0.875rem" width="60%" />
      </div>
    </div>
  )
}

// ============================================================================
// SkeletonText - Text line skeleton
// ============================================================================

interface SkeletonTextProps {
  lines?: number
  className?: string
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonPulse
          key={i}
          height="0.875rem"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}

// ============================================================================
// PageLoader - Full-page loading state
// ============================================================================

interface PageLoaderProps {
  /** Loading message */
  message?: string
  className?: string
}

export function PageLoader({ message = 'Cargando...', className }: PageLoaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <EnergyLoader size="lg" />
        <motion.p
          className="text-sm text-muted-foreground font-medium"
          animate={
            shouldReduceMotion
              ? {}
              : { opacity: [0.5, 1, 0.5] }
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  )
}

// ============================================================================
// ButtonSpinner - Loading spinner for buttons
// ============================================================================

interface ButtonSpinnerProps {
  size?: 'sm' | 'md'
  className?: string
}

export function ButtonSpinner({ size = 'sm', className }: ButtonSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  }

  return (
    <motion.svg
      className={cn('animate-spin', sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  )
}

// ============================================================================
// LoadingDots - Three bouncing dots
// ============================================================================

export function LoadingDots({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-accent"
          animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
          transition={shouldReduceMotion ? undefined : {
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut' as const,
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// Checkmark Animation - Success indicator
// ============================================================================

interface CheckmarkProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CheckmarkAnimation({ size = 'md', className }: CheckmarkProps) {
  const shouldReduceMotion = useReducedMotion()

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        pathLength: { duration: 0.4, ease: 'easeOut' as const },
        opacity: { duration: 0.1 },
      },
    },
  }

  const circleVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : {
        duration: 0.3,
        ease: 'backOut' as const,
      },
    },
  }

  return (
    <motion.div
      className={cn(
        'relative flex items-center justify-center rounded-full bg-green-500/20',
        sizeClasses[size],
        className
      )}
      initial="hidden"
      animate="visible"
      variants={circleVariants}
    >
      <svg
        className="w-1/2 h-1/2 text-green-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M5 13l4 4L19 7"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </motion.div>
  )
}

export {
  EnergyLoader as Spinner,
}
