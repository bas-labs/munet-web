/**
 * Event Types for MUNET Activities
 * Based on PRD Section 5.6 - Actividades
 */

export type EventCategory =
  | 'taller'
  | 'conferencia'
  | 'visita-guiada'
  | 'programa-escolar'

export interface MunetEvent {
  id: string
  title: string
  description: string
  fullDescription: string
  category: EventCategory
  date: string // ISO date string
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  duration: string // e.g., "2 horas"
  location: string // Location within museum
  capacity: number
  spotsRemaining: number
  price: number | null // null = gratis
  requirements: string[]
  materials: string[]
  imageUrl?: string
  featured?: boolean
}

export interface EventRegistration {
  eventId: string
  name: string
  email: string
  phone: string
  participants: number
}

export const EVENT_CATEGORIES: {
  value: EventCategory
  label: string
  color: string
}[] = [
  { value: 'taller', label: 'Taller', color: 'bg-accent' },
  { value: 'conferencia', label: 'Conferencia', color: 'bg-blue-500' },
  { value: 'visita-guiada', label: 'Visita Guiada', color: 'bg-green-500' },
  { value: 'programa-escolar', label: 'Programa Escolar', color: 'bg-purple-500' },
]

export function getCategoryLabel(category: EventCategory): string {
  const cat = EVENT_CATEGORIES.find((c) => c.value === category)
  return cat?.label || category
}

export function getCategoryColor(category: EventCategory): string {
  const cat = EVENT_CATEGORIES.find((c) => c.value === category)
  return cat?.color || 'bg-muted'
}
