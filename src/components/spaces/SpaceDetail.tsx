/**
 * SpaceDetail Component
 * Modal/Panel displaying full space details, gallery, equipment, and inquiry CTA
 * Based on PRD Section 5.9 - Renta de Espacios
 */

import * as React from 'react'
import {
  X,
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
  Users,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardBadge } from '@/components/ui/card'
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

interface SpaceDetailProps {
  space: Space
  isOpen: boolean
  onClose: () => void
  onInquiry: (space: Space) => void
}

export function SpaceDetail({
  space,
  isOpen,
  onClose,
  onInquiry,
}: SpaceDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  // Gallery images (placeholders for now)
  const galleryCount = 4

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryCount - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryCount - 1 ? 0 : prev + 1))
  }

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto bg-background shadow-2xl sm:rounded-l-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
          <h2 className="font-display text-2xl font-bold">{space.name}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Photo Gallery */}
          <div className="relative mb-8 overflow-hidden rounded-xl">
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/60">
              {space.image ? (
                <img
                  src={space.image}
                  alt={space.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-muted-foreground/50">
                    <LayoutGrid className="mx-auto h-20 w-20" />
                    <p className="mt-2 text-sm">Imagen {currentImageIndex + 1}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Navigation */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Gallery Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {Array.from({ length: galleryCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    i === currentImageIndex
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/70'
                  )}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Capacity Badge */}
          <div className="mb-6 flex items-center gap-3">
            <CardBadge variant="accent" className="text-sm">
              <Users className="mr-1.5 h-4 w-4" />
              {space.capacity}
            </CardBadge>
          </div>

          {/* Full Description */}
          <div className="mb-8">
            <h3 className="mb-3 font-display text-lg font-semibold">
              Descripción
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {space.fullDescription}
            </p>
          </div>

          {/* Equipment List */}
          <div className="mb-8">
            <h3 className="mb-4 font-display text-lg font-semibold">
              Equipamiento Incluido
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {space.equipment.map((eq) => {
                const IconComponent = iconMap[eq.icon]
                return (
                  <div
                    key={eq.id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                  >
                    {IconComponent && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                        <IconComponent className="h-5 w-5 text-accent" />
                      </div>
                    )}
                    <span className="text-sm font-medium">{eq.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Capacity Configurations */}
          {space.capacityConfigurations && (
            <div className="mb-8">
              <h3 className="mb-4 font-display text-lg font-semibold">
                Configuraciones de Capacidad
              </h3>
              <ul className="space-y-2">
                {space.capacityConfigurations.map((config, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {config}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Button */}
          <div className="sticky bottom-0 border-t border-border bg-background pt-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => onInquiry(space)}
            >
              Solicitar Cotización
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
