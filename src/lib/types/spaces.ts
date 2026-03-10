/**
 * Space Types for Renta de Espacios
 * Based on PRD Section 5.9
 */

export interface SpaceEquipment {
  id: string
  name: string
  icon: string // Lucide icon name
}

export interface Space {
  id: string
  name: string
  capacity: string
  description: string
  fullDescription: string
  equipment: SpaceEquipment[]
  capacityConfigurations?: string[]
  image?: string
  imageUrl?: string
  galleryImages?: string[]
}

export interface InquiryFormData {
  name: string
  company?: string
  email: string
  phone: string
  spaceId: string
  eventDate: string
  attendees: number
  eventType: 'corporativo' | 'social' | 'cultural' | 'otro'
  message?: string
}

export interface InquirySubmission extends InquiryFormData {
  inquiryId: string
  status: 'new' | 'contacted' | 'booked' | 'declined'
  createdAt: string
}

export type EventType = {
  value: InquiryFormData['eventType']
  label: string
}

export const EVENT_TYPES: EventType[] = [
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'social', label: 'Social' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'otro', label: 'Otro' },
]
