/**
 * EventCalendar Component
 * Monthly calendar view with event indicators and day selection
 * Based on PRD Section 5.6 - Actividades
 */

import * as React from 'react'
import { ChevronLeft, ChevronRight, CalendarDays, List } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { MunetEvent } from '@/lib/types/events'

interface EventCalendarProps {
  events: MunetEvent[]
  selectedDate: string | null
  onDateSelect: (date: string | null) => void
  view: 'calendar' | 'list'
  onViewChange: (view: 'calendar' | 'list') => void
  className?: string
}

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export function EventCalendar({
  events,
  selectedDate,
  onDateSelect,
  view,
  onViewChange,
  className,
}: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() => new Date())

  // Get event dates as a Set for quick lookup
  const eventDates = React.useMemo(() => {
    return new Set(events.map((event) => event.date))
  }, [events])

  // Get events count per date
  const eventsPerDate = React.useMemo(() => {
    return events.reduce(
      (acc, event) => {
        acc[event.date] = (acc[event.date] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
  }, [events])

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
    onDateSelect(null)
  }

  // Generate calendar days for current month
  const calendarDays = React.useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const daysInMonth = lastDayOfMonth.getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay()

    const days: (number | null)[] = []

    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }, [currentMonth])

  const getDateString = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const isPast = (day: number) => {
    const dateStr = getDateString(day)
    const today = new Date().toISOString().split('T')[0]
    return dateStr < today
  }

  return (
    <div className={cn('rounded-lg border border-border bg-card', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-xl font-bold">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <Button variant="ghost" size="sm" onClick={goToToday}>
            Hoy
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex rounded-md border border-border">
            <button
              onClick={() => onViewChange('calendar')}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 text-sm transition-colors',
                view === 'calendar'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Calendario</span>
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={cn(
                'flex items-center gap-1 px-3 py-1.5 text-sm transition-colors',
                view === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Lista</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex">
            <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      {view === 'calendar' && (
        <div className="p-4">
          {/* Days of Week Header */}
          <div className="mb-2 grid grid-cols-7 text-center text-sm font-medium text-muted-foreground">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const dateStr = getDateString(day)
              const hasEvents = eventDates.has(dateStr)
              const eventCount = eventsPerDate[dateStr] || 0
              const isSelected = dateStr === selectedDate
              const dayIsToday = isToday(day)
              const dayIsPast = isPast(day)

              return (
                <button
                  key={day}
                  onClick={() => {
                    if (hasEvents && !dayIsPast) {
                      onDateSelect(isSelected ? null : dateStr)
                    }
                  }}
                  disabled={dayIsPast && !hasEvents}
                  className={cn(
                    'relative aspect-square rounded-lg p-1 text-sm transition-all',
                    'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent/50',
                    dayIsPast && 'text-muted-foreground/50',
                    dayIsToday && 'font-bold',
                    isSelected && 'bg-accent text-accent-foreground',
                    hasEvents && !isSelected && 'font-semibold',
                    !hasEvents && !dayIsPast && 'hover:bg-muted/50'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-full w-full flex-col items-center justify-center',
                      dayIsToday && !isSelected && 'rounded-full bg-primary/10'
                    )}
                  >
                    {day}
                    {hasEvents && (
                      <span
                        className={cn(
                          'mt-0.5 flex gap-0.5',
                          isSelected && 'text-accent-foreground'
                        )}
                      >
                        {Array.from({ length: Math.min(eventCount, 3) }).map(
                          (_, i) => (
                            <span
                              key={i}
                              className={cn(
                                'h-1 w-1 rounded-full',
                                isSelected
                                  ? 'bg-accent-foreground'
                                  : 'bg-accent'
                              )}
                            />
                          )
                        )}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Selected Date Indicator */}
      {selectedDate && view === 'calendar' && (
        <div className="border-t border-border p-4">
          <p className="text-sm text-muted-foreground">
            Mostrando eventos para:{' '}
            <span className="font-semibold text-foreground">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </span>
            <button
              onClick={() => onDateSelect(null)}
              className="ml-2 text-accent hover:underline"
            >
              Ver todos
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
