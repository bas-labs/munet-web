import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * MUNET Container Component
 * Provides consistent page widths and padding across the site
 *
 * Based on PRD Section 6.2 - Base Layout
 *
 * Sizes:
 * - sm: 640px max-width (for narrow content like articles)
 * - md: 768px max-width (for medium content)
 * - lg: 1024px max-width (for standard pages)
 * - xl: 1280px max-width (default, main content area)
 * - 2xl: 1536px max-width (for wide layouts like galleries)
 * - full: 100% width (for full-bleed sections)
 */
const containerVariants = cva(
  "mx-auto w-full px-4 sm:px-6 lg:px-8",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full px-0 sm:px-0 lg:px-0",
      },
      padding: {
        default: "", // Uses base px classes
        none: "px-0 sm:px-0 lg:px-0",
        tight: "px-2 sm:px-4 lg:px-6",
        loose: "px-6 sm:px-8 lg:px-12",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "default",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

/**
 * Container - Main content wrapper
 *
 * @example
 * // Standard page container
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 *
 * @example
 * // Narrow container for article content
 * <Container size="md">
 *   <article>...</article>
 * </Container>
 *
 * @example
 * // Full-width container for hero sections
 * <Container size="full">
 *   <Hero />
 * </Container>
 *
 * @example
 * // Using as a section element
 * <Container as="section" className="py-16">
 *   <h2>Section Title</h2>
 * </Container>
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padding, className }))}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

/**
 * Section - Semantic section with built-in container and spacing
 *
 * Combines Container with vertical padding for page sections
 */
const sectionVariants = cva(
  "",
  {
    variants: {
      spacing: {
        default: "py-12 md:py-16 lg:py-20",
        sm: "py-8 md:py-10 lg:py-12",
        lg: "py-16 md:py-20 lg:py-24",
        xl: "py-20 md:py-24 lg:py-32",
        none: "py-0",
      },
      background: {
        default: "bg-background",
        muted: "bg-muted",
        primary: "bg-primary text-primary-foreground",
        accent: "bg-accent text-accent-foreground",
        "accent-alt": "bg-accent-alt text-accent-alt-foreground",
      },
    },
    defaultVariants: {
      spacing: "default",
      background: "default",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants>,
    VariantProps<typeof containerVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, size, padding, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing, background }), className)}
        {...props}
      >
        <Container size={size} padding={padding}>
          {children}
        </Container>
      </section>
    )
  }
)
Section.displayName = "Section"

/**
 * PageWrapper - Full page wrapper with consistent structure
 *
 * Used as the main wrapper for page content,
 * provides consistent spacing from header/footer
 */
const PageWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn("min-h-screen", className)}
    {...props}
  />
))
PageWrapper.displayName = "PageWrapper"

export {
  Container,
  Section,
  PageWrapper,
  containerVariants,
  sectionVariants,
}
