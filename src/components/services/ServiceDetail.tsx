/**
 * ServiceDetail Component
 * Displays expanded information about a selected service
 * Based on PRD Section 5.7 - Servicios
 */

import { Link } from 'react-router-dom'
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
  Clock,
  AlertCircle,
  Lightbulb,
  X,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
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

interface ServiceDetailProps {
  service: Service
  onClose?: () => void
  className?: string
}

export function ServiceDetail({
  service,
  onClose,
  className,
}: ServiceDetailProps) {
  const IconComponent = iconMap[service.icon]

  const floorLabel = {
    'nivel-1': 'Nivel 1',
    'nivel-2': 'Nivel 2',
    both: 'Ambos niveles',
  }[service.location.floor]

  return (
    <Card className={cn('p-6 lg:p-8', className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            {IconComponent && <IconComponent className="h-7 w-7" />}
          </div>

          {/* Title */}
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {service.name}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{floorLabel}</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
            aria-label="Cerrar detalle"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Full Description */}
      <p className="mt-6 text-muted-foreground leading-relaxed">
        {service.fullDescription}
      </p>

      {/* Info Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {/* Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <MapPin className="h-4 w-4 text-accent" />
            <span>Ubicación</span>
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            {service.location.description}
          </p>
        </div>

        {/* Hours */}
        {service.hours && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4 text-accent" />
              <span>Horario</span>
            </div>
            <div className="text-sm text-muted-foreground pl-6 space-y-1">
              <p>Lun-Dom: {service.hours.weekdays}</p>
              {service.hours.note && (
                <p className="text-xs italic">{service.hours.note}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Rules */}
      {service.rules && service.rules.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-4 w-4 text-accent" />
            <span>Reglas</span>
          </div>
          <ul className="space-y-2 pl-6">
            {service.rules.map((rule, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tips */}
      {service.tips && service.tips.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <Lightbulb className="h-4 w-4 text-accent-alt" />
            <span>Tips</span>
          </div>
          <ul className="space-y-2 pl-6">
            {service.tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-alt/50" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      {service.ctaText && (
        <div className="mt-6 pt-4 border-t border-border">
          {service.ctaLink ? (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to={service.ctaLink}>
                {service.ctaText}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="w-full sm:w-auto">
              {service.ctaText}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}
