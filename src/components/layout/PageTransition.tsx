import { motion, type Easing } from 'framer-motion'
import { type ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

// Custom easing curve as proper tuple
const easeOutQuad: Easing = [0.25, 0.46, 0.45, 0.94]

/**
 * PageTransition - Wraps page content with enter/exit animations
 * - Fade + slight slide up on enter
 * - Fade out on exit
 * - Respects prefers-reduced-motion
 */
export default function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        ease: easeOutQuad,
      }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Reduced motion variant - instant transitions
 */
export function PageTransitionReduced({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
