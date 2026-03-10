/**
 * Sample Event Data for MUNET Activities
 * Based on PRD Section 5.6 - Actividades
 */

import type { MunetEvent } from '@/lib/types/events'

// Helper to generate dates relative to "today" (for demo purposes)
function getRelativeDate(daysFromNow: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

export const EVENTS: MunetEvent[] = [
  // Talleres (2)
  {
    id: 'taller-energia-solar',
    title: 'Taller: Construye tu Panel Solar',
    description:
      'Aprende los fundamentos de la energía solar construyendo tu propio mini panel fotovoltaico.',
    fullDescription:
      'En este taller práctico, los participantes aprenderán cómo funcionan las celdas fotovoltaicas y construirán su propio mini panel solar funcional. Exploraremos la física detrás de la conversión de luz en electricidad, los materiales semiconductores y el futuro de la energía solar en México. Cada participante se llevará su panel a casa.',
    category: 'taller',
    date: getRelativeDate(5),
    startTime: '10:00',
    endTime: '13:00',
    duration: '3 horas',
    location: 'Sala de Talleres - Nivel 1',
    capacity: 20,
    spotsRemaining: 8,
    price: 350,
    requirements: [
      'Edad mínima: 12 años',
      'Menores de 16 años deben estar acompañados',
    ],
    materials: [
      'Kit de panel solar (incluido)',
      'Herramientas proporcionadas',
      'Se recomienda ropa cómoda',
    ],
    featured: true,
  },
  {
    id: 'taller-robotica-basica',
    title: 'Taller: Introducción a la Robótica',
    description:
      'Descubre el mundo de la robótica programando tu primer robot móvil.',
    fullDescription:
      'Un taller interactivo donde los participantes aprenderán los conceptos básicos de programación y robótica. Utilizando kits educativos, cada equipo construirá y programará un robot móvil capaz de seguir instrucciones y superar obstáculos. Ideal para quienes quieren dar sus primeros pasos en el mundo de la tecnología.',
    category: 'taller',
    date: getRelativeDate(12),
    startTime: '11:00',
    endTime: '14:00',
    duration: '3 horas',
    location: 'Laboratorio de Innovación - Nivel 2',
    capacity: 15,
    spotsRemaining: 15,
    price: 400,
    requirements: [
      'Edad: 10 a 16 años',
      'No se requiere experiencia previa',
    ],
    materials: [
      'Kit de robótica (uso durante el taller)',
      'Computadoras proporcionadas',
      'Manual de instrucciones incluido',
    ],
  },

  // Conferencias (2)
  {
    id: 'conferencia-futuro-energia',
    title: 'Conferencia: El Futuro de la Energía en México',
    description:
      'Expertos discuten las tendencias y desafíos de la transición energética nacional.',
    fullDescription:
      'Panel de expertos de la industria energética mexicana que analizarán el panorama actual y futuro de la generación de energía en el país. Se abordarán temas como la transición a energías renovables, políticas públicas, inversión en infraestructura y el rol de México en el contexto energético global. Incluye sesión de preguntas y respuestas.',
    category: 'conferencia',
    date: getRelativeDate(3),
    startTime: '18:00',
    endTime: '20:00',
    duration: '2 horas',
    location: 'Auditorio Principal',
    capacity: 150,
    spotsRemaining: 42,
    price: null,
    requirements: [
      'Entrada general al museo',
      'Se recomienda llegar 15 minutos antes',
    ],
    materials: [],
    featured: true,
  },
  {
    id: 'conferencia-innovacion-tecnologica',
    title: 'Conferencia: Innovación Tecnológica y Sostenibilidad',
    description:
      'Cómo la tecnología está transformando nuestra relación con el medio ambiente.',
    fullDescription:
      'Una conferencia que explora la intersección entre innovación tecnológica y sostenibilidad ambiental. Presentada por investigadores y emprendedores, se mostrarán casos de éxito en México y el mundo donde la tecnología ha permitido reducir el impacto ambiental y crear soluciones para los desafíos del cambio climático.',
    category: 'conferencia',
    date: getRelativeDate(10),
    startTime: '17:00',
    endTime: '19:00',
    duration: '2 horas',
    location: 'Auditorio Principal',
    capacity: 150,
    spotsRemaining: 98,
    price: null,
    requirements: [
      'Entrada general al museo',
      'Abierto a todo público',
    ],
    materials: [],
  },

  // Visitas Guiadas (2)
  {
    id: 'visita-arquitectura',
    title: 'Visita Guiada: Arquitectura del Museo',
    description:
      'Recorre el museo con un experto y descubre los secretos de su diseño arquitectónico.',
    fullDescription:
      'Una visita especial enfocada en la arquitectura del edificio diseñado por Enrique Norten. Un guía experto te llevará por los espacios más emblemáticos del museo, explicando las decisiones de diseño, los materiales utilizados, la integración con el Bosque de Chapultepec y cómo la arquitectura refleja los temas de energía y sostenibilidad.',
    category: 'visita-guiada',
    date: getRelativeDate(2),
    startTime: '12:00',
    endTime: '13:30',
    duration: '1.5 horas',
    location: 'Punto de encuentro: Vestíbulo principal',
    capacity: 25,
    spotsRemaining: 12,
    price: 80,
    requirements: [
      'Entrada general al museo incluida',
      'Calzado cómodo recomendado',
    ],
    materials: [],
  },
  {
    id: 'visita-energia-renovable',
    title: 'Visita Guiada: Energías Renovables',
    description:
      'Explora las exhibiciones de energía solar, eólica e hidráulica con explicaciones detalladas.',
    fullDescription:
      'Un recorrido especializado por las exhibiciones del Nivel 2 dedicadas a las energías renovables. El guía explicará en detalle cómo funcionan los paneles solares, los aerogeneradores y las plantas hidroeléctricas, con demostraciones interactivas y datos sobre la producción de energía limpia en México.',
    category: 'visita-guiada',
    date: getRelativeDate(7),
    startTime: '11:00',
    endTime: '12:30',
    duration: '1.5 horas',
    location: 'Punto de encuentro: Escaleras Nivel 2',
    capacity: 20,
    spotsRemaining: 20,
    price: 80,
    requirements: [
      'Entrada general al museo incluida',
      'Recomendado para mayores de 10 años',
    ],
    materials: [],
  },

  // Programas Escolares (2)
  {
    id: 'programa-primaria',
    title: 'Programa Escolar: Energía para Primaria',
    description:
      'Programa educativo diseñado para grupos escolares de nivel primaria.',
    fullDescription:
      'Un programa educativo integral de medio día diseñado específicamente para grupos escolares de primaria (4° a 6° grado). Incluye visita guiada a las exhibiciones principales, taller práctico de energía, material didáctico alineado con el programa de la SEP y espacio para lunch. Los docentes reciben guía de actividades complementarias.',
    category: 'programa-escolar',
    date: getRelativeDate(8),
    startTime: '09:00',
    endTime: '13:00',
    duration: '4 horas',
    location: 'Recorrido completo del museo',
    capacity: 40,
    spotsRemaining: 40,
    price: 60, // por estudiante
    requirements: [
      'Grupos de 20 a 40 estudiantes',
      'Reservación con 2 semanas de anticipación',
      '1 docente por cada 15 estudiantes',
    ],
    materials: [
      'Material didáctico incluido',
      'Distintivos para el grupo',
      'Certificado de participación',
    ],
  },
  {
    id: 'programa-secundaria',
    title: 'Programa Escolar: Ciencia y Tecnología (Secundaria)',
    description:
      'Experiencia educativa completa para estudiantes de secundaria y preparatoria.',
    fullDescription:
      'Programa de día completo para grupos de secundaria y preparatoria que combina teoría y práctica. Incluye recorrido especializado por todas las exhibiciones, taller de laboratorio (elegir entre robótica o energía solar), conferencia con investigadores del museo y material de apoyo para proyectos escolares.',
    category: 'programa-escolar',
    date: getRelativeDate(15),
    startTime: '09:00',
    endTime: '15:00',
    duration: '6 horas',
    location: 'Recorrido completo + Laboratorio',
    capacity: 35,
    spotsRemaining: 35,
    price: 120, // por estudiante
    requirements: [
      'Grupos de 15 a 35 estudiantes',
      'Reservación con 3 semanas de anticipación',
      'Incluir alimentación propia',
    ],
    materials: [
      'Kit de laboratorio',
      'Material didáctico especializado',
      'Certificado de participación',
      'Acceso a recursos digitales',
    ],
  },
]

export function getEventById(id: string): MunetEvent | undefined {
  return EVENTS.find((event) => event.id === id)
}

export function getEventsByCategory(
  category: string
): MunetEvent[] {
  if (category === 'todos' || !category) {
    return EVENTS
  }
  return EVENTS.filter((event) => event.category === category)
}

export function getUpcomingEvents(limit?: number): MunetEvent[] {
  const today = new Date().toISOString().split('T')[0]
  const upcoming = EVENTS.filter((event) => event.date >= today).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  return limit ? upcoming.slice(0, limit) : upcoming
}

export function getFeaturedEvents(): MunetEvent[] {
  return EVENTS.filter((event) => event.featured)
}

export function getEventsForDate(date: string): MunetEvent[] {
  return EVENTS.filter((event) => event.date === date)
}

export function getEventDates(): string[] {
  return [...new Set(EVENTS.map((event) => event.date))]
}
