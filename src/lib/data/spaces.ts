/**
 * Space Data for MUNET Venue Rentals
 * Based on PRD Section 5.9 - Renta de Espacios
 */

import type { Space } from '@/lib/types/spaces'

export const SPACES: Space[] = [
  {
    id: 'auditorio',
    name: 'Auditorio',
    capacity: '200 personas',
    description: 'Conferencias, presentaciones, proyecciones',
    fullDescription:
      'Nuestro auditorio principal cuenta con capacidad para 200 personas y está equipado con tecnología de vanguardia. Ideal para conferencias magistrales, presentaciones corporativas, proyecciones cinematográficas y eventos académicos de alto nivel.',
    equipment: [
      { id: 'audio', name: 'Sistema de audio', icon: 'Volume2' },
      { id: 'projector', name: 'Proyector/pantalla', icon: 'Projector' },
      { id: 'wifi', name: 'Wi-Fi de alta velocidad', icon: 'Wifi' },
      { id: 'furniture', name: 'Mobiliario configurable', icon: 'Armchair' },
      { id: 'lighting', name: 'Iluminación profesional', icon: 'Lightbulb' },
    ],
    capacityConfigurations: [
      'Teatro: 200 personas',
      'Conferencia: 80 personas',
      'Banquete: 100 personas',
    ],
  },
  {
    id: 'salas-exposicion',
    name: 'Salas de Exposición',
    capacity: 'Variable',
    description: 'Eventos privados, cócteles, exposiciones temporales',
    fullDescription:
      'Espacios versátiles que pueden adaptarse a diferentes necesidades. Perfectos para exposiciones temporales, eventos privados exclusivos, cócteles empresariales y presentaciones de productos. La configuración flexible permite crear ambientes únicos.',
    equipment: [
      { id: 'audio', name: 'Sistema de audio', icon: 'Volume2' },
      { id: 'wifi', name: 'Wi-Fi de alta velocidad', icon: 'Wifi' },
      { id: 'furniture', name: 'Mobiliario configurable', icon: 'Armchair' },
      { id: 'lighting', name: 'Iluminación profesional', icon: 'Lightbulb' },
      { id: 'climate', name: 'Climatización', icon: 'Thermometer' },
    ],
    capacityConfigurations: [
      'Exposición: 150 personas',
      'Cóctel: 200 personas',
      'Mesa redonda: 40 personas',
    ],
  },
  {
    id: 'talleres',
    name: 'Talleres',
    capacity: '30 personas',
    description: 'Workshops, capacitaciones, sesiones de trabajo',
    fullDescription:
      'Espacios diseñados para el aprendizaje colaborativo y la creatividad. Ideales para workshops interactivos, capacitaciones empresariales, sesiones de trabajo en equipo y actividades educativas prácticas.',
    equipment: [
      { id: 'projector', name: 'Proyector/pantalla', icon: 'Projector' },
      { id: 'wifi', name: 'Wi-Fi de alta velocidad', icon: 'Wifi' },
      { id: 'furniture', name: 'Mobiliario configurable', icon: 'Armchair' },
      { id: 'whiteboard', name: 'Pizarrón/pantalla táctil', icon: 'PenTool' },
      { id: 'materials', name: 'Material de trabajo', icon: 'Clipboard' },
    ],
    capacityConfigurations: [
      'Taller: 30 personas',
      'Mesa de trabajo: 20 personas',
      'Presentación: 25 personas',
    ],
  },
  {
    id: 'foro-aire-libre',
    name: 'Foro al Aire Libre',
    capacity: '500 personas',
    description: 'Conciertos, eventos masivos, festivales',
    fullDescription:
      'Un espacio al aire libre espectacular con vista al Bosque de Chapultepec. Perfecto para conciertos, festivales culturales, eventos masivos y celebraciones especiales que buscan conectar con la naturaleza y la arquitectura del museo.',
    equipment: [
      { id: 'audio', name: 'Sistema de audio', icon: 'Volume2' },
      { id: 'lighting', name: 'Iluminación profesional', icon: 'Lightbulb' },
      { id: 'stage', name: 'Tarima/escenario', icon: 'LayoutGrid' },
      { id: 'power', name: 'Conexiones eléctricas', icon: 'Zap' },
      { id: 'security', name: 'Seguridad', icon: 'Shield' },
    ],
    capacityConfigurations: [
      'Concierto: 500 personas',
      'Festival: 400 personas',
      'Evento corporativo: 300 personas',
    ],
  },
  {
    id: 'explanada',
    name: 'Explanada',
    capacity: '1000+ personas',
    description: 'Eventos al aire libre, ferias, activaciones',
    fullDescription:
      'El espacio exterior más grande del museo, con capacidad para más de 1000 personas. Ideal para ferias, activaciones de marca, eventos comunitarios y celebraciones a gran escala. Un escenario impresionante enmarcado por la arquitectura de Enrique Norten.',
    equipment: [
      { id: 'audio', name: 'Sistema de audio', icon: 'Volume2' },
      { id: 'lighting', name: 'Iluminación profesional', icon: 'Lightbulb' },
      { id: 'power', name: 'Conexiones eléctricas', icon: 'Zap' },
      { id: 'tents', name: 'Carpas disponibles', icon: 'Tent' },
      { id: 'security', name: 'Seguridad', icon: 'Shield' },
    ],
    capacityConfigurations: [
      'Feria: 1000+ personas',
      'Activación: 800 personas',
      'Evento con carpas: 500 personas',
    ],
  },
]

export function getSpaceById(id: string): Space | undefined {
  return SPACES.find((space) => space.id === id)
}
