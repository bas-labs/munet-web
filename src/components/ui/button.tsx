import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * MUNET Button Component
 * Variants based on PRD Section 6.2 Core Components
 *
 * Variants:
 * - primary: Accent orange (#FF6B35) - Main CTAs like "Comprar Boletos"
 * - secondary: Dark (#1A1A1A) - Secondary actions
 * - outline: Bordered style with transparent background
 * - ghost: No background, subtle hover state
 * - link: Text link style with underline on hover
 * - sustainability: Teal accent (#00D4AA) - Eco/sustainability themed actions
 */
const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary: Energy Orange - Main CTAs (Comprar Boletos, etc.)
        primary:
          "bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:shadow-lg active:scale-[0.98]",

        // Secondary: Dark/Primary color - Secondary actions
        secondary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]",

        // Outline: Bordered variant
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98]",

        // Ghost: Minimal, no background
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground",

        // Link: Text link style
        link:
          "text-accent underline-offset-4 hover:underline p-0 h-auto",

        // Sustainability: Teal accent for eco-themed actions
        sustainability:
          "bg-accent-alt text-accent-alt-foreground shadow-md hover:bg-accent-alt/90 hover:shadow-lg active:scale-[0.98]",

        // Destructive: For dangerous actions
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.98]",

        // Default (alias for primary for backwards compatibility)
        default:
          "bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:shadow-lg active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm rounded-md",
        sm: "h-8 px-4 py-1.5 text-xs rounded-md",
        lg: "h-12 px-8 py-3 text-base rounded-lg",
        xl: "h-14 px-10 py-4 text-lg rounded-lg",
        icon: "h-10 w-10 rounded-md",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
