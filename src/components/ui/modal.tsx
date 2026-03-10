import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'
import { X } from 'lucide-react'
import { type ReactNode, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

// ============================================================================
// Modal Component
// ============================================================================

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  /** Modal title for accessibility */
  title?: string
  /** Show close button */
  showClose?: boolean
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Additional class names */
  className?: string
  /** Close on backdrop click */
  closeOnBackdrop?: boolean
  /** Close on escape key */
  closeOnEscape?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

// Animation variants
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 },
  },
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  showClose = true,
  size = 'md',
  className,
  closeOnBackdrop = true,
  closeOnEscape = true,
}: ModalProps) {
  const shouldReduceMotion = useReducedMotion()

  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose()
      }
    },
    [onClose, closeOnEscape]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={shouldReduceMotion ? undefined : backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            className={cn(
              'relative w-full bg-background rounded-lg shadow-xl border border-border overflow-hidden',
              sizeClasses[size],
              className
            )}
            variants={
              shouldReduceMotion
                ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } as Variants
                : modalVariants
            }
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Title */}
            {title && (
              <h2 id="modal-title" className="sr-only">
                {title}
              </h2>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// Modal Parts
// ============================================================================

export function ModalHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('px-6 pt-6 pb-4', className)}>
      {children}
    </div>
  )
}

export function ModalTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn('text-lg font-semibold text-foreground', className)}
    >
      {children}
    </h2>
  )
}

export function ModalDescription({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn('text-sm text-muted-foreground mt-1', className)}>
      {children}
    </p>
  )
}

export function ModalBody({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}

export function ModalFooter({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'px-6 py-4 bg-muted/50 flex items-center justify-end gap-3',
        className
      )}
    >
      {children}
    </div>
  )
}
