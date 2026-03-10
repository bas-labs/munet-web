/**
 * ActividadesPage
 * Events calendar, category filters, and event listings
 * Based on PRD Section 5.6 - Actividades
 */

import * as React from 'react'
import { Calendar, Sparkles } from 'lucide-react'

import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import {
  EventCalendar,
  EventCard,
  EventList,
} from '@/components/activities'
import {
  getUpcomingEvents,
  getFeaturedEvents,
  getEventsByCategory,
} from '@/lib/data/events'
import { EVENT_CATEGORIES } from '@/lib/types/events'
import type { EventCategory } from '@/lib/types/events'
import { cn } from '@/lib/utils'

type CategoryFilter = EventCategory | 'todos'

export default function ActividadesPage() {
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryFilter>('todos')
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null)
  const [calendarView, setCalendarView] = React.useState<'calendar' | 'list'>(
    'calendar'
  )

  // Get featured event for hero
  const featuredEvents = getFeaturedEvents()
  const featuredEvent = featuredEvents[0]

  // Get all upcoming events
  const allUpcomingEvents = getUpcomingEvents()

  // Filter events based on category and date
  const filteredEvents = React.useMemo(() => {
    let events = selectedCategory === 'todos'
      ? allUpcomingEvents
      : getEventsByCategory(selectedCategory).filter(
          (e) => e.date >= new Date().toISOString().split('T')[0]
        )

    if (selectedDate) {
      events = events.filter((e) => e.date === selectedDate)
    }

    return events
  }, [selectedCategory, selectedDate, allUpcomingEvents])

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    ...EVENT_CATEGORIES.map((cat) => ({
      value: cat.value as CategoryFilter,
      label: cat.label + 's',
    })),
  ]

  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl">
              Actividades y Programas
            </h1>
            <p className="text-lg text-primary-foreground/80 sm:text-xl">
              Talleres, conferencias, visitas guiadas y programas educativos para
              todas las edades. Descubre nuevas formas de explorar la energía y
              la tecnología.
            </p>

            {/* Featured Event Highlight */}
            {featuredEvent && (
              <div className="mt-8 inline-flex items-center gap-3 rounded-lg bg-background/10 px-4 py-3 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-medium text-primary-foreground/70">
                    Próximo evento destacado
                  </p>
                  <p className="font-semibold text-primary-foreground">
                    {featuredEvent.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Actividades' }]} className="mb-8" />

        {/* Category Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value)
                  setSelectedDate(null)
                }}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  selectedCategory === category.value
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout: Calendar + Events */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <EventCalendar
              events={allUpcomingEvents}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              view={calendarView}
              onViewChange={setCalendarView}
            />

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <p className="text-3xl font-bold text-accent">
                  {allUpcomingEvents.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Próximos eventos
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 text-center">
                <p className="text-3xl font-bold text-accent-alt">
                  {EVENT_CATEGORIES.length}
                </p>
                <p className="text-sm text-muted-foreground">Categorías</p>
              </div>
            </div>
          </div>

          {/* Events List/Grid */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">
                {selectedDate
                  ? 'Eventos del día'
                  : selectedCategory === 'todos'
                    ? 'Próximos Eventos'
                    : `${categories.find((c) => c.value === selectedCategory)?.label}`}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredEvents.length} evento
                {filteredEvents.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Show list view if calendar toggle is on list, otherwise grid */}
            {calendarView === 'list' ? (
              <EventList events={filteredEvents} />
            ) : (
              <>
                {filteredEvents.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
                    <Calendar className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-lg font-medium">
                      No hay eventos disponibles
                    </p>
                    <p className="text-muted-foreground">
                      {selectedDate
                        ? 'No hay eventos programados para esta fecha.'
                        : 'No hay eventos en esta categoría por el momento.'}
                    </p>
                    {(selectedDate || selectedCategory !== 'todos') && (
                      <button
                        onClick={() => {
                          setSelectedDate(null)
                          setSelectedCategory('todos')
                        }}
                        className="mt-4 text-accent hover:underline"
                      >
                        Ver todos los eventos
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Featured Events Section */}
        {featuredEvents.length > 1 && selectedCategory === 'todos' && !selectedDate && (
          <section className="mt-16">
            <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold">
              <Sparkles className="h-6 w-6 text-accent" />
              Eventos Destacados
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Info Section */}
        <section className="mt-16 rounded-xl bg-muted/50 p-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-display text-2xl font-bold">
              ¿Quieres organizar una actividad especial?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Si representas a una institución educativa, empresa u organización y
              deseas programar una visita grupal o actividad personalizada,
              contáctanos para conocer nuestras opciones.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground shadow-md transition-all hover:bg-accent/90 hover:shadow-lg"
            >
              Contáctanos
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
