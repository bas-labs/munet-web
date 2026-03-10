import { motion, useReducedMotion, type Variants, type HTMLMotionProps, type Easing } from 'framer-motion'
import { type ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

// ============================================================================
// Animation Variants
// ============================================================================

// Custom easing curves as proper tuples
const easeOutQuad: Easing = [0.25, 0.46, 0.45, 0.94]

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// ============================================================================
// Base Motion Props
// ============================================================================

interface MotionComponentProps {
  children: ReactNode
  className?: string
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Animation duration (seconds) */
  duration?: number
  /** Trigger when in viewport */
  viewport?: boolean
  /** Only animate once */
  once?: boolean
}

const defaultTransition = {
  duration: 0.5,
  ease: easeOutQuad,
}

// ============================================================================
// FadeIn Component
// ============================================================================

interface FadeInProps extends MotionComponentProps {
  /** Direction to fade from */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Distance to travel (pixels) */
  distance?: number
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  viewport = true,
  once = true,
  direction = 'up',
  distance = 30,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  const getInitialState = () => {
    if (shouldReduceMotion) return { opacity: 0 }
    
    const base = { opacity: 0 }
    switch (direction) {
      case 'up': return { ...base, y: distance }
      case 'down': return { ...base, y: -distance }
      case 'left': return { ...base, x: distance }
      case 'right': return { ...base, x: -distance }
      default: return base
    }
  }

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport ? { once, margin: '-50px' } : undefined}
      transition={{ ...defaultTransition, duration, delay }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// FadeInStagger - For Lists
// ============================================================================

interface FadeInStaggerProps extends MotionComponentProps {
  /** Stagger delay between children (seconds) */
  staggerDelay?: number
}

export function FadeInStagger({
  children,
  className,
  delay = 0,
  viewport = true,
  once = true,
  staggerDelay = 0.1,
}: FadeInStaggerProps) {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport ? { once, margin: '-50px' } : undefined}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Stagger item - use inside FadeInStagger */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={variants}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// ScaleIn - For Cards
// ============================================================================

interface ScaleInProps extends MotionComponentProps {
  /** Initial scale (0-1) */
  initialScale?: number
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  viewport = true,
  once = true,
  initialScale = 0.95,
}: ScaleInProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: initialScale }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport ? { once, margin: '-50px' } : undefined}
      transition={{ ...defaultTransition, duration, delay }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// SlideIn - Left/Right Variants
// ============================================================================

interface SlideInProps extends MotionComponentProps {
  /** Direction to slide from */
  from?: 'left' | 'right'
  /** Distance to travel (pixels) */
  distance?: number
}

export function SlideIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  viewport = true,
  once = true,
  from = 'left',
  distance = 100,
}: SlideInProps) {
  const shouldReduceMotion = useReducedMotion()

  const initialX = from === 'left' ? -distance : distance

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport ? { once, margin: '-50px' } : undefined}
      transition={{ ...defaultTransition, duration, delay }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// Hover Card Wrapper
// ============================================================================

interface HoverCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  /** Scale on hover (default: 1.02) */
  hoverScale?: number
  /** Enable shadow elevation */
  elevate?: boolean
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ children, className, hoverScale = 1.02, elevate = true, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion()

    return (
      <motion.div
        ref={ref}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                scale: hoverScale,
                transition: { duration: 0.2, ease: 'easeOut' as const },
              }
        }
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className={cn(
          elevate && 'transition-shadow duration-200 hover:shadow-xl',
          className
        )}
        style={{ willChange: 'transform' }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
HoverCard.displayName = 'HoverCard'

// ============================================================================
// Hover Image Zoom
// ============================================================================

interface HoverImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  zoomScale?: number
}

export function HoverImage({
  src,
  alt,
  className,
  containerClassName,
  zoomScale = 1.1,
}: HoverImageProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={cn('overflow-hidden', containerClassName)}>
      <motion.img
        src={src}
        alt={alt}
        whileHover={shouldReduceMotion ? {} : { scale: zoomScale }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
        className={cn('w-full h-full object-cover', className)}
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

// ============================================================================
// Parallax Container
// ============================================================================

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Parallax speed (-1 to 1, negative = opposite direction) */
  speed?: number
}

export function Parallax({ children, className }: ParallaxProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      style={{ willChange: 'transform' }}
      className={className}
      transition={{
        type: 'tween',
        ease: 'linear' as const,
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// Export Variants for Custom Use
// ============================================================================

export {
  fadeInUpVariants,
  fadeInVariants,
  scaleInVariants,
  slideInLeftVariants,
  slideInRightVariants,
  staggerContainerVariants,
  staggerItemVariants,
}
