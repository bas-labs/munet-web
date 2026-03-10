/**
 * ServicesFAQ Component
 * Accordion-based FAQ section for visitor services
 * Based on PRD Section 5.7 - Servicios
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/lib/types/services'

interface ServicesFAQProps {
  items: FAQItem[]
  className?: string
}

export function ServicesFAQ({ items, className }: ServicesFAQProps) {
  return (
    <section className={cn('', className)}>
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Preguntas Frecuentes
        </h2>
        <p className="mt-2 text-muted-foreground">
          Encuentra respuestas a las preguntas más comunes sobre tu visita.
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion className="w-full space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={index}
            className="rounded-lg border border-border bg-card px-6 data-[open]:border-accent/30 data-[open]:shadow-sm transition-all"
          >
            <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline hover:text-accent transition-colors data-[open]:text-accent">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
