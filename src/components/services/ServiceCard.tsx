/**
 * ServiceCard Component
 * Displays a visitor service with icon, description, and optional CTA
 * Based on PRD Section 5.7 - Servicios
 */

import {
  Coffee,
  ShoppingBag,
  Briefcase,
  Car,
  Wifi,
  Bath,
  Accessibility,
  Baby,
  MapPin,
  type LucideIcon,
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Service } from '@/lib/types/services'

// Icon mapping for services
const iconMap: Record<string, LucideIcon> = {
  Coffee,
  ShoppingBag,
  Briefcase,
  Car,
  Wifi,
  Bath,
  Accessibility,
  Baby,
}

interface ServiceCardProps {
  service: Service
  onSelect?: (service: Service) => void
  isSelected?: boolean
  className?: string
}

export function ServiceCard({
  service,
  onSelect,
  isSelected,
  className,
}: ServiceCardProps) {
  const IconComponent = iconMap[service.icon]

  const floorLabel = {
    'nivel-1': 'Nivel 1',
    'nivel-2': 'Nivel 2',
    both: 'Ambos niveles',
  }[service.location.floor]

  return (
    <Card
      variant="exhibition"
      className={cn(
        'flex flex-col p-6 cursor-pointer',
        isSelected && 'ring-2 ring-accent border-accent',
        className
      )}
      onClick={() => onSelect?.(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(service)
        }
      }}
      aria-pressed={isSelected}
    >
      {/* Icon */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        {IconComponent && <IconComponent className="h-7 w-7" />}
      </div>

      {/* Service Name */}
      <h3 className="font-display text-lg font-bold tracking-tight">
        {service.name}
      </h3>

      {/* Short Description */}
      <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
        {service.shortDescription}
      </p>

      {/* Location Badge */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>{floorLabel}</span>
      </div>
    </Card>
  )
}
