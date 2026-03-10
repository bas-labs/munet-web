import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * MUNET Card Component System
 * Based on PRD Section 6.2 Core Components
 *
 * Variants:
 * - default: Standard card for general content
 * - exhibition: For exhibition area cards (interactive hover, energy accent)
 * - event: For activity/event cards (date badge, registration CTA)
 * - space: For venue rental space cards (capacity info, image-forward)
 * - glass: Glassmorphism style for overlays
 */
const cardVariants = cva(
  "rounded-lg bg-card text-card-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border border-border shadow-sm",
        exhibition:
          "border border-border shadow-md hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 cursor-pointer group",
        event:
          "border border-border shadow-md hover:shadow-lg overflow-hidden",
        space:
          "border border-border shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden group",
        glass:
          "bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg",
        featured:
          "border-2 border-accent shadow-xl bg-gradient-to-br from-card to-accent/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-xl font-semibold leading-tight tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

/**
 * CardImage - Image container for cards
 * Used in exhibition, event, and space cards
 */
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { aspectRatio?: "video" | "square" | "wide" }
>(({ className, aspectRatio = "video", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden",
      {
        "aspect-video": aspectRatio === "video",
        "aspect-square": aspectRatio === "square",
        "aspect-[21/9]": aspectRatio === "wide",
      },
      className
    )}
    {...props}
  />
))
CardImage.displayName = "CardImage"

/**
 * CardBadge - Badge/label for cards
 * Used for dates, categories, status indicators
 */
const CardBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "accent" | "sustainability" | "muted"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
      {
        "bg-primary text-primary-foreground": variant === "default",
        "bg-accent text-accent-foreground": variant === "accent",
        "bg-accent-alt text-accent-alt-foreground": variant === "sustainability",
        "bg-muted text-muted-foreground": variant === "muted",
      },
      className
    )}
    {...props}
  />
))
CardBadge.displayName = "CardBadge"

/**
 * CardOverlay - Overlay for image cards
 * Provides gradient overlay for text readability
 */
const CardOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    position?: "bottom" | "full"
  }
>(({ className, position = "bottom", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-x-0 pointer-events-none",
      {
        "bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent":
          position === "bottom",
        "inset-0 bg-black/40": position === "full",
      },
      className
    )}
    {...props}
  />
))
CardOverlay.displayName = "CardOverlay"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  CardBadge,
  CardOverlay,
  cardVariants,
}
