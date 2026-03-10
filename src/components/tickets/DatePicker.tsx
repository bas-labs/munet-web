import * as React from 'react'
import { ChevronLeft, ChevronRight, Sun, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface DatePickerProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  className?: string
}

/**
 * DatePicker component for MUNET ticket system
 * - Calendar view for selecting visit date
 * - Highlights Sundays with "Entrada gratuita para nacionales"
 * - Disables past dates and Mondays (museum closed)
 */
export function DatePicker({ selectedDate, onDateSelect, className }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (Date | null)[] = []
    
    // Add empty slots for days before the first day
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    if (date < today) return true
    // Disable Mondays (museum closed)
    if (date.getDay() === 1) return true
    return false
  }

  const isSunday = (date: Date) => date.getDay() === 0

  const isSelected = (date: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isPreviousMonthDisabled = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    const todayMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    return prevMonth < todayMonth
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-bold">Selecciona la Fecha</h2>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousMonth}
          disabled={isPreviousMonthDisabled()}
          aria-label="Mes anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-lg font-semibold">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextMonth}
          aria-label="Mes siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={cn(
              'text-center text-sm font-medium py-2',
              index === 0 ? 'text-accent' : 'text-muted-foreground'
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const disabled = isDateDisabled(date)
          const sunday = isSunday(date)
          const selected = isSelected(date)
          const todayDate = isToday(date)

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onDateSelect(date)}
              className={cn(
                'aspect-square rounded-md flex flex-col items-center justify-center text-sm transition-all duration-200 relative',
                disabled && 'opacity-30 cursor-not-allowed',
                !disabled && 'hover:bg-muted cursor-pointer',
                selected && !disabled && 'bg-accent text-accent-foreground hover:bg-accent/90',
                todayDate && !selected && 'ring-2 ring-accent ring-inset',
                sunday && !selected && !disabled && 'text-accent font-medium'
              )}
            >
              <span>{date.getDate()}</span>
              {sunday && !disabled && (
                <Sun className="h-3 w-3 absolute bottom-1" />
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-accent">
          <Sun className="h-4 w-4" />
          <span>Domingo — Entrada gratuita para nacionales</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="h-4 w-4 rounded-sm bg-muted opacity-30" />
          <span>Lunes — Museo cerrado</span>
        </div>
      </div>

      {/* Selected date display */}
      {selectedDate && (
        <div className="mt-4 p-3 rounded-md bg-muted">
          <p className="text-sm text-muted-foreground">Fecha seleccionada:</p>
          <p className="font-semibold">
            {selectedDate.toLocaleDateString('es-MX', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {isSunday(selectedDate) && (
            <p className="text-sm text-accent mt-1 font-medium">
              🎉 ¡Entrada gratuita para nacionales!
            </p>
          )}
        </div>
      )}
    </div>
  )
}
