/**
 * Service Types
 * Based on PRD Section 5.7 - Servicios
 */

export interface ServiceLocation {
  floor: 'nivel-1' | 'nivel-2' | 'both'
  description: string
  coordinates?: { x: number; y: number }
}

export interface ServiceHours {
  weekdays: string
  weekends?: string
  note?: string
}

export interface Service {
  id: string
  name: string
  icon: string
  shortDescription: string
  fullDescription: string
  location: ServiceLocation
  hours?: ServiceHours
  rules?: string[]
  tips?: string[]
  ctaText?: string
  ctaLink?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}
