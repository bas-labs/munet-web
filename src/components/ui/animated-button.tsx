import * as React from 'react'
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * AnimatedButton - Button with Framer Motion animations
 * 
 * Features:
 * - Press effect (scale down)
 * - Loading spinner animation
 * - Respects prefers-reduced-motion
 */

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:shadow-lg',
        secondary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        outline:
          'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
        ghost: 'text-foreground hover:bg-muted hover:text-foreground',
        link: 'text-accent underline-offset-4 hover:underline p-0 h-auto',
        sustainability:
          'bg-accent-alt text-accent-alt-foreground shadow-md hover:bg-accent-alt/90 hover:shadow-lg',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        default:
          'bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:shadow-lg',
      },
      size: {
        default: 'h-10 px-5 py-2 text-sm rounded-md',
        sm: 'h-8 px-4 py-1.5 text-xs rounded-md',
        lg: 'h-12 px-8 py-3 text-base rounded-lg',
        xl: 'h-14 px-10 py-4 text-lg rounded-lg',
        icon: 'h-10 w-10 rounded-md',
        'icon-sm': 'h-8 w-8 rounded-md',
        'icon-lg': 'h-12 w-12 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Show loading spinner */
  loading?: boolean
  /** Text to show while loading */
  loadingText?: string
  /** Disable hover/tap animations */
  noAnimation?: boolean
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      noAnimation = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion()
    const shouldAnimate = !noAnimation && !shouldReduceMotion

    // When using asChild, render without motion wrapper
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLElement>}
          {...(props as React.HTMLAttributes<HTMLElement>)}
        >
          {children}
        </Slot>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        whileHover={shouldAnimate ? { scale: 1.02 } : undefined}
        whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)
AnimatedButton.displayName = 'AnimatedButton'

/**
 * RippleButton - Button with ripple effect on click
 */
interface RippleButtonProps extends AnimatedButtonProps {
  /** Ripple color (CSS color value) */
  rippleColor?: string
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, rippleColor = 'rgba(255, 255, 255, 0.3)', children, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([])
    const shouldReduceMotion = useReducedMotion()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (shouldReduceMotion) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples((prev) => [...prev, { x, y, id }])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)

      // Call original onClick if present
      props.onClick?.(e)
    }

    return (
      <AnimatedButton
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        {...props}
        onClick={handleClick}
      >
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              backgroundColor: rippleColor,
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              width: 300,
              height: 300,
              x: -150,
              y: -150,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
        {children}
      </AnimatedButton>
    )
  }
)
RippleButton.displayName = 'RippleButton'

export { AnimatedButton, RippleButton, buttonVariants }
