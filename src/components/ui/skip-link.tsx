/**
 * SkipLink - Accessibility component for keyboard navigation
 * Allows users to skip directly to main content
 * WCAG 2.1 AA compliant
 */

interface SkipLinkProps {
  /** Target element ID (without #) */
  targetId?: string
  /** Link text */
  children?: React.ReactNode
}

export function SkipLink({ 
  targetId = 'main-content',
  children = 'Saltar al contenido principal'
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      {children}
    </a>
  )
}

export default SkipLink
