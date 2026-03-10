import { useEffect } from 'react'

// Schema type definitions
interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  contactPoint: {
    '@type': 'ContactPoint'
    email: string
    contactType: string
  }
  sameAs: string[]
}

interface MuseumSchema {
  '@context': 'https://schema.org'
  '@type': 'Museum'
  name: string
  description: string
  url: string
  image: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  priceRange: string
  telephone?: string
  isAccessibleForFree: boolean
  publicAccess: boolean
}

interface EventSchema {
  '@context': 'https://schema.org'
  '@type': 'Event'
  name: string
  description: string
  startDate: string
  endDate?: string
  location: {
    '@type': 'Place'
    name: string
    address: {
      '@type': 'PostalAddress'
      streetAddress: string
      addressLocality: string
      addressRegion: string
      addressCountry: string
    }
  }
  organizer: {
    '@type': 'Organization'
    name: string
    url: string
  }
  offers?: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
    availability: string
    url: string
  }
  image?: string
  eventStatus?: string
  eventAttendanceMode?: string
}

interface BreadcrumbSchema {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

// Pre-built schemas
const BASE_URL = 'https://museomunet.com'

export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MUNET — Museo Nacional de Energía y Tecnología',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'El primer museo nacional de México dedicado a la energía y tecnología.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. de los Compositores s/n, Bosque de Chapultepec II Secc.',
    addressLocality: 'Ciudad de México',
    addressRegion: 'CDMX',
    addressCountry: 'MX',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contacto@museomunet.com',
    contactType: 'customer service',
  },
  sameAs: [
    'https://facebook.com/museomunet',
    'https://instagram.com/museomunet',
    'https://youtube.com/museomunet',
    'https://tiktok.com/@museomunet',
  ],
}

export const museumSchema: MuseumSchema = {
  '@context': 'https://schema.org',
  '@type': 'Museum',
  name: 'MUNET — Museo Nacional de Energía y Tecnología',
  description: 'El primer museo nacional de México dedicado a la energía y tecnología. Exposiciones interactivas sobre energía solar, eólica, nuclear, y más.',
  url: BASE_URL,
  image: `${BASE_URL}/og-image.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. de los Compositores s/n',
    addressLocality: 'Ciudad de México',
    addressRegion: 'CDMX',
    postalCode: '11580',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.4194,
    longitude: -99.1998,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  priceRange: '$60-$120 MXN',
  isAccessibleForFree: false,
  publicAccess: true,
}

// Helper function to create event schema
export function createEventSchema(event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  price?: number
  image?: string
}): EventSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: 'MUNET — Museo Nacional de Energía y Tecnología',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. de los Compositores s/n, Bosque de Chapultepec II Secc.',
        addressLocality: 'Ciudad de México',
        addressRegion: 'CDMX',
        addressCountry: 'MX',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'MUNET',
      url: BASE_URL,
    },
    offers: event.price !== undefined
      ? {
          '@type': 'Offer',
          price: String(event.price),
          priceCurrency: 'MXN',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/actividades`,
        }
      : undefined,
    image: event.image || `${BASE_URL}/og-image.jpg`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  }
}

// Helper function to create breadcrumb schema
export function createBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}

// Component props
interface StructuredDataProps {
  /** Type of schema to render */
  type: 'organization' | 'museum' | 'event' | 'breadcrumb'
  /** Event data (required when type is 'event') */
  eventData?: Parameters<typeof createEventSchema>[0]
  /** Breadcrumb items (required when type is 'breadcrumb') */
  breadcrumbItems?: Array<{ name: string; path: string }>
}

export function StructuredData({ type, eventData, breadcrumbItems }: StructuredDataProps) {
  useEffect(() => {
    let schema: object

    switch (type) {
      case 'organization':
        schema = organizationSchema
        break
      case 'museum':
        schema = museumSchema
        break
      case 'event':
        if (!eventData) {
          console.error('StructuredData: eventData is required for event type')
          return
        }
        schema = createEventSchema(eventData)
        break
      case 'breadcrumb':
        if (!breadcrumbItems) {
          console.error('StructuredData: breadcrumbItems is required for breadcrumb type')
          return
        }
        schema = createBreadcrumbSchema(breadcrumbItems)
        break
      default:
        return
    }

    // Create and inject script tag
    const scriptId = `structured-data-${type}`
    let script = document.getElementById(scriptId) as HTMLScriptElement | null

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(schema)

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(scriptId)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [type, eventData, breadcrumbItems])

  return null
}

export default StructuredData
