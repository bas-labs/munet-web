/**
 * EventList Component
 * Chronological list of upcoming events, filterable by category
 * Based on PRD Section 5.6 - Actividades
 */

import { Link } from 'react-router-dom'
import { Calendar, Clock, Users, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { getCategoryLabel, getCategoryColor } from '@/lib/types/events'
import type { MunetEvent } from '@/lib/types/events'

interface EventListProps {
  events: MunetEvent[]
  className?: string
}

export function EventList({ events, className }: EventListProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  // Group events by date
  const eventsByDate = events.reduce(
    (acc, event) => {
      const date = event.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(event)
      return acc
    },
    {} as Record<string, MunetEvent[]>
  )

  const sortedDates = Object.keys(eventsByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )

  if (events.length === 0) {
    return (
      <div className={cn('rounded-lg border border-dashed border-border p-8 text-center', className)}>
        <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">
          No hay eventos programados para esta categoría.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {sortedDates.map((date) => (
        <div key={date}>
          {/* Date Header */}
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(date)}
          </h3>

          {/* Events for this date */}
          <div className="space-y-3">
            {eventsByDate[date].map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface EventListItemProps {
  event: MunetEvent
}

function EventListItem({ event }: EventListItemProps) {
  const isFull = event.spotsRemaining === 0
  const isAlmostFull = event.spotsRemaining <= 5 && event.spotsRemaining > 0

  return (
    <Link
      to={`/actividades/${event.id}`}
      className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/30 hover:shadow-md"
    >
      {/* Time */}
      <div className="flex w-20 flex-col text-center">
        <span className="text-lg font-bold text-primary">{event.startTime}</span>
        <span className="text-xs text-muted-foreground">{event.duration}</span>
      </div>

      {/* Divider */}
      <div className="h-12 w-px bg-border" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="truncate font-semibold group-hover:text-accent">
            {event.title}
          </h4>
          <span
            className={cn(
              'inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium text-white',
              getCategoryColor(event.category)
            )}
          >
            {getCategoryLabel(event.category)}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {event.startTime} - {event.endTime}
          </span>
          <span
            className={cn(
              'flex items-center gap-1',
              isFull && 'text-destructive',
              isAlmostFull && 'text-amber-600'
            )}
          >
            <Users className="h-3.5 w-3.5" />
            {isFull
              ? 'Lleno'
              : `${event.spotsRemaining}/${event.capacity}`}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        {event.price !== null ? (
          <span className="font-semibold text-primary">
            ${event.price}
          </span>
        ) : (
          <span className="font-semibold text-accent-alt">Gratis</span>
        )}
      </div>

      {/* Arrow */}
      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
    </Link>
  )
}
