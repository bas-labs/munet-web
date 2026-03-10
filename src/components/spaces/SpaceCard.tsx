/**
 * SpaceCard Component
 * Displays a venue rental space with image, capacity, description, and equipment icons
 * Based on PRD Section 5.9 - Renta de Espacios
 */

import {
  Volume2,
  Projector,
  Wifi,
  Armchair,
  Lightbulb,
  Thermometer,
  PenTool,
  Clipboard,
  LayoutGrid,
  Zap,
  Shield,
  Tent,
  type LucideIcon,
} from 'lucide-react'

import { Card, CardImage, CardBadge, CardOverlay } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Space } from '@/lib/types/spaces'

// Icon mapping for equipment
const iconMap: Record<string, LucideIcon> = {
  Volume2,
  Projector,
  Wifi,
  Armchair,
  Lightbulb,
  Thermometer,
  PenTool,
  Clipboard,
  LayoutGrid,
  Zap,
  Shield,
  Tent,
}

interface SpaceCardProps {
  space: Space
  onSelect?: (space: Space) => void
  className?: string
}

export function SpaceCard({ space, onSelect, className }: SpaceCardProps) {
  return (
    <Card
      variant="space"
      className={cn('flex flex-col', className)}
    >
      {/* Image Section */}
      <CardImage aspectRatio="video" className="relative">
        {space.image ? (
          <img
            src={space.image}
            alt={space.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/60">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-muted-foreground/30">
                <LayoutGrid className="h-16 w-16" />
              </div>
            </div>
          </div>
        )}
        
        {/* Capacity Badge */}
        <div className="absolute left-4 top-4 z-10">
          <CardBadge variant="accent" className="font-semibold">
            {space.capacity}
          </CardBadge>
        </div>
        
        {/* Gradient Overlay */}
        <CardOverlay position="bottom" />
      </CardImage>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        {/* Space Name */}
        <h3 className="font-display text-xl font-bold tracking-tight">
          {space.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {space.description}
        </p>

        {/* Equipment Icons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {space.equipment.slice(0, 4).map((eq) => {
            const IconComponent = iconMap[eq.icon]
            return IconComponent ? (
              <div
                key={eq.id}
                className="flex items-center justify-center rounded-md bg-muted p-2"
                title={eq.name}
              >
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </div>
            ) : null
          })}
          {space.equipment.length > 4 && (
            <div
              className="flex items-center justify-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              title={`+${space.equipment.length - 4} más`}
            >
              +{space.equipment.length - 4}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onSelect?.(space)}
          >
            Solicitar Información
          </Button>
        </div>
      </div>
    </Card>
  )
}
