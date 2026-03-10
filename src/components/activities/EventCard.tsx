/**
 * EventCard Component
 * Activity/event card with image, date badge, category, and registration CTA
 * Based on PRD Section 5.6 - Actividades
 */

import { Link } from 'react-router-dom'
import { Calendar, Clock, Users, MapPin } from 'lucide-react'

import { Card, CardContent, CardImage, CardBadge } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getCategoryLabel, getCategoryColor } from '@/lib/types/events'
import type { MunetEvent } from '@/lib/types/events'

interface EventCardProps {
  event: MunetEvent
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('es-MX', { month: 'short' }).toUpperCase(),
      weekday: date.toLocaleDateString('es-MX', { weekday: 'short' }),
    }
  }

  const formattedDate = formatDate(event.date)
  const isFull = event.spotsRemaining === 0
  const isAlmostFull = event.spotsRemaining <= 5 && event.spotsRemaining > 0

  return (
    <Card variant="event" className={cn('flex flex-col', className)}>
      {/* Image with Date Badge */}
      <CardImage aspectRatio="video" className="relative">
        {/* Placeholder image */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Calendar className="h-12 w-12 opacity-30" />
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-lg bg-background/95 px-3 py-2 shadow-md backdrop-blur-sm">
          <span className="text-2xl font-bold leading-none text-primary">
            {formattedDate.day}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {formattedDate.month}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute right-4 top-4">
          <span
            className={cn(
              'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium text-white',
              getCategoryColor(event.category)
            )}
          >
            {getCategoryLabel(event.category)}
          </span>
        </div>

        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute bottom-4 left-4">
            <CardBadge variant="accent">Destacado</CardBadge>
          </div>
        )}
      </CardImage>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 font-display text-lg font-semibold leading-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="mb-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>
              {event.startTime} - {event.endTime} ({event.duration})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span
              className={cn(
                isFull && 'text-destructive',
                isAlmostFull && 'text-amber-600'
              )}
            >
              {isFull
                ? 'Sin lugares disponibles'
                : `${event.spotsRemaining} lugares disponibles`}
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            {event.price !== null ? (
              <span className="text-lg font-bold text-primary">
                ${event.price.toLocaleString('es-MX')}{' '}
                <span className="text-sm font-normal text-muted-foreground">
                  MXN
                </span>
              </span>
            ) : (
              <span className="text-lg font-bold text-accent-alt">Gratis</span>
            )}
          </div>
          <Button
            variant={isFull ? 'outline' : 'primary'}
            size="sm"
            asChild
            disabled={isFull}
          >
            <Link to={`/actividades/${event.id}`}>
              {isFull ? 'Ver Detalles' : 'Registrarse'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
