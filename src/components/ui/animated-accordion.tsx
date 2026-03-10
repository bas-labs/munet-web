import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ============================================================================
// Accordion Context
// ============================================================================

interface AccordionContextValue {
  expandedItems: Set<string>
  toggle: (value: string) => void
  allowMultiple: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion')
  }
  return context
}

// ============================================================================
// Animated Accordion Root
// ============================================================================

interface AnimatedAccordionProps {
  children: ReactNode
  className?: string
  /** Allow multiple items to be expanded */
  allowMultiple?: boolean
  /** Initially expanded items */
  defaultExpanded?: string[]
}

export function AnimatedAccordion({
  children,
  className,
  allowMultiple = false,
  defaultExpanded = [],
}: AnimatedAccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(defaultExpanded)
  )

  const toggle = (value: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        if (!allowMultiple) {
          next.clear()
        }
        next.add(value)
      }
      return next
    })
  }

  return (
    <AccordionContext.Provider value={{ expandedItems, toggle, allowMultiple }}>
      <div className={cn('divide-y divide-border', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

// ============================================================================
// Accordion Item
// ============================================================================

interface AccordionItemProps {
  children: ReactNode
  value: string
  className?: string
}

const AccordionItemContext = createContext<string | null>(null)

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn('py-2', className)}>{children}</div>
    </AccordionItemContext.Provider>
  )
}

// ============================================================================
// Accordion Trigger
// ============================================================================

interface AccordionTriggerProps {
  children: ReactNode
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { expandedItems, toggle } = useAccordion()
  const value = useContext(AccordionItemContext)
  const shouldReduceMotion = useReducedMotion()

  if (!value) {
    throw new Error('AccordionTrigger must be used within an AccordionItem')
  }

  const isExpanded = expandedItems.has(value)

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      className={cn(
        'flex w-full items-center justify-between py-3 text-left font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
        isExpanded ? 'text-foreground' : 'text-muted-foreground',
        className
      )}
      aria-expanded={isExpanded}
    >
      {children}
      <motion.div
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 300, damping: 30 }
        }
        className="shrink-0 ml-2"
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </button>
  )
}

// ============================================================================
// Accordion Content
// ============================================================================

interface AccordionContentProps {
  children: ReactNode
  className?: string
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { expandedItems } = useAccordion()
  const value = useContext(AccordionItemContext)
  const shouldReduceMotion = useReducedMotion()

  if (!value) {
    throw new Error('AccordionContent must be used within an AccordionItem')
  }

  const isExpanded = expandedItems.has(value)

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.2 },
          }}
          className="overflow-hidden"
        >
          <div className={cn('pb-3 pt-1 text-sm text-muted-foreground', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// FAQ Accordion - Pre-styled for FAQ sections
// ============================================================================

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <AnimatedAccordion className={className}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger className="text-base">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </AnimatedAccordion>
  )
}
