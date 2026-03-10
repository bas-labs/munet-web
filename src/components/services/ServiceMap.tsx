/**
 * ServiceMap Component
 * Interactive floor plan showing service locations
 * Based on PRD Section 5.7 - Servicios
 */

import { useState } from 'react'
import {
  Coffee,
  ShoppingBag,
  Briefcase,
  Car,
  Wifi,
  Bath,
  Accessibility,
  Baby,
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

interface ServiceMapProps {
  services: Service[]
  selectedService?: Service | null
  onSelectService?: (service: Service) => void
  className?: string
}

export function ServiceMap({
  services,
  selectedService,
  onSelectService,
  className,
}: ServiceMapProps) {
  const [activeFloor, setActiveFloor] = useState<'nivel-1' | 'nivel-2'>('nivel-1')

  // Filter services for current floor (including 'both')
  const floorServices = services.filter(
    (s) => s.location.floor === activeFloor || s.location.floor === 'both'
  )

  return (
    <Card className={cn('p-6', className)}>
      {/* Floor Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-bold">
          Mapa de Servicios
        </h3>
        <div className="flex rounded-lg bg-muted p-1">
          <Button
            variant={activeFloor === 'nivel-1' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveFloor('nivel-1')}
            className="rounded-md"
          >
            Nivel 1
          </Button>
          <Button
            variant={activeFloor === 'nivel-2' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveFloor('nivel-2')}
            className="rounded-md"
          >
            Nivel 2
          </Button>
        </div>
      </div>

      {/* Floor Plan */}
      <div className="relative aspect-[16/10] rounded-lg bg-muted/50 border-2 border-dashed border-border overflow-hidden">
        {/* Floor Plan Background */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Building outline */}
          <rect
            x="5"
            y="5"
            width="90"
            height="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-border"
            rx="2"
          />

          {/* Main areas */}
          <rect
            x="10"
            y="10"
            width="35"
            height="35"
            fill="currentColor"
            className="text-muted/30"
            rx="1"
          />
          <rect
            x="55"
            y="10"
            width="35"
            height="35"
            fill="currentColor"
            className="text-muted/30"
            rx="1"
          />
          <rect
            x="10"
            y="55"
            width="80"
            height="35"
            fill="currentColor"
            className="text-muted/30"
            rx="1"
          />

          {/* Center area / Elevator */}
          <rect
            x="45"
            y="40"
            width="10"
            height="10"
            fill="currentColor"
            className="text-accent/20"
            rx="1"
          />

          {/* Labels */}
          <text
            x="27.5"
            y="30"
            textAnchor="middle"
            className="text-[3px] fill-muted-foreground/50 font-medium"
          >
            Exposiciones
          </text>
          <text
            x="72.5"
            y="30"
            textAnchor="middle"
            className="text-[3px] fill-muted-foreground/50 font-medium"
          >
            Exposiciones
          </text>
          <text
            x="50"
            y="75"
            textAnchor="middle"
            className="text-[3px] fill-muted-foreground/50 font-medium"
          >
            {activeFloor === 'nivel-1' ? 'Vestíbulo Principal' : 'Área Central'}
          </text>
          <text
            x="50"
            y="46"
            textAnchor="middle"
            className="text-[2px] fill-accent/70 font-medium"
          >
            Elevador
          </text>

          {/* Entry indicator (Nivel 1 only) */}
          {activeFloor === 'nivel-1' && (
            <>
              <line
                x1="50"
                y1="90"
                x2="50"
                y2="95"
                stroke="currentColor"
                strokeWidth="2"
                className="text-accent"
              />
              <text
                x="50"
                y="99"
                textAnchor="middle"
                className="text-[2.5px] fill-accent font-bold"
              >
                ENTRADA
              </text>
            </>
          )}
        </svg>

        {/* Service Icons */}
        {floorServices.map((service) => {
          const IconComponent = iconMap[service.icon]
          const coords = service.location.coordinates

          // Default positions for services without coordinates
          const defaultPositions: Record<string, { x: number; y: number }> = {
            cafeteria: { x: 25, y: 70 },
            tienda: { x: 75, y: 70 },
            guardarropa: { x: 20, y: 85 },
            estacionamiento: { x: 50, y: 92 },
            wifi: { x: 50, y: 25 },
            sanitarios: { x: 30, y: 60 },
            accesibilidad: { x: 50, y: 45 },
            lactancia: { x: 35, y: 65 },
          }

          const position = coords || defaultPositions[service.id] || { x: 50, y: 50 }
          const isSelected = selectedService?.id === service.id

          return (
            <button
              key={service.id}
              className={cn(
                'absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200',
                'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                isSelected
                  ? 'bg-accent text-accent-foreground scale-110 shadow-lg z-10'
                  : 'bg-card text-foreground border border-border shadow-md hover:border-accent hover:bg-accent/10'
              )}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
              onClick={() => onSelectService?.(service)}
              title={service.name}
              aria-label={`Ver ${service.name}`}
            >
              {IconComponent && (
                <IconComponent className="h-4 w-4" />
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Servicios en {activeFloor === 'nivel-1' ? 'Nivel 1' : 'Nivel 2'}:</span>
        {floorServices.map((service) => {
          const IconComponent = iconMap[service.icon]
          return (
            <button
              key={service.id}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors',
                'hover:bg-muted',
                selectedService?.id === service.id && 'bg-accent/10 text-accent'
              )}
              onClick={() => onSelectService?.(service)}
            >
              {IconComponent && <IconComponent className="h-3 w-3" />}
              <span>{service.name}</span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
