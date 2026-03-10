/**
 * Services Data
 * Based on PRD Section 5.7 - Servicios
 */

import type { Service, FAQItem } from '@/lib/types/services'

export const services: Service[] = [
  {
    id: 'cafeteria',
    name: 'Cafetería',
    icon: 'Coffee',
    shortDescription: 'Alimentos y bebidas durante tu visita',
    fullDescription:
      'Disfruta de una variedad de alimentos y bebidas en nuestra cafetería ubicada en el Nivel 1. Ofrecemos opciones para todos los gustos, desde snacks ligeros hasta comidas completas.',
    location: {
      floor: 'nivel-1',
      description: 'Junto a la entrada principal',
      coordinates: { x: 25, y: 70 },
    },
    hours: {
      weekdays: '10:00 - 17:30 hrs',
      weekends: '10:00 - 17:30 hrs',
      note: 'Última orden 30 minutos antes del cierre',
    },
    rules: [
      'No se permite sacar alimentos al área de exposiciones',
      'Disponible servicio para llevar',
    ],
    tips: [
      'Prueba nuestro café de especialidad de Chiapas',
      'Menú especial para niños disponible',
    ],
  },
  {
    id: 'tienda',
    name: 'Tienda MUNET',
    icon: 'ShoppingBag',
    shortDescription: 'Souvenirs, libros y artículos exclusivos',
    fullDescription:
      'Llévate un recuerdo único de tu visita. Encuentra souvenirs exclusivos, libros sobre energía y tecnología, juguetes educativos y artículos de diseño inspirados en las exposiciones del museo.',
    location: {
      floor: 'nivel-1',
      description: 'Cerca de la salida principal',
      coordinates: { x: 75, y: 70 },
    },
    hours: {
      weekdays: '10:00 - 18:00 hrs',
      weekends: '10:00 - 18:00 hrs',
    },
    tips: [
      'Artículos exclusivos diseñados por artistas mexicanos',
      'Libros infantiles sobre ciencia disponibles',
    ],
    ctaText: 'Ver catálogo',
  },
  {
    id: 'guardarropa',
    name: 'Guardarropa',
    icon: 'Briefcase',
    shortDescription: 'Servicio gratuito de resguardo',
    fullDescription:
      'Guarda tus pertenencias de forma segura y gratuita. Ofrecemos casilleros y servicio de guardarropa para que puedas disfrutar tu visita sin preocupaciones.',
    location: {
      floor: 'nivel-1',
      description: 'A un costado de la taquilla',
      coordinates: { x: 20, y: 85 },
    },
    hours: {
      weekdays: '10:00 - 17:45 hrs',
      note: 'Recoger pertenencias 15 minutos antes del cierre',
    },
    rules: [
      'No se aceptan objetos de valor (joyas, dinero)',
      'Máximo 2 artículos por persona',
      'Se requiere identificación oficial',
    ],
    tips: ['Llega temprano para asegurar disponibilidad en días concurridos'],
  },
  {
    id: 'estacionamiento',
    name: 'Estacionamiento',
    icon: 'Car',
    shortDescription: 'Ubicación, tarifas y horarios',
    fullDescription:
      'Contamos con estacionamiento para visitantes con tarifa preferencial. El acceso es por Av. de los Compositores con espacio para automóviles y autobuses escolares.',
    location: {
      floor: 'nivel-1',
      description: 'Acceso por Av. de los Compositores',
      coordinates: { x: 50, y: 95 },
    },
    hours: {
      weekdays: '9:30 - 18:30 hrs',
      note: 'Tarifa: $30 MXN por hora / $120 MXN máximo por día',
    },
    rules: [
      'Conservar boleto de estacionamiento',
      'No dejar objetos de valor en el vehículo',
    ],
    tips: [
      'Llegada temprana recomendada los domingos',
      'Área designada para autobuses escolares',
    ],
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Gratuito',
    icon: 'Wifi',
    shortDescription: 'Red disponible en todo el museo',
    fullDescription:
      'Conéctate a nuestra red Wi-Fi gratuita en todas las áreas del museo. Ideal para compartir tu experiencia en redes sociales o consultar información adicional sobre las exposiciones.',
    location: {
      floor: 'both',
      description: 'Disponible en todo el museo',
    },
    rules: [
      'Uso personal únicamente',
      'Red: MUNET-Visitantes',
      'Sin contraseña requerida',
    ],
    tips: [
      'Descarga la app MUNET para contenido interactivo',
      'Comparte tu visita con #MUNET',
    ],
  },
  {
    id: 'sanitarios',
    name: 'Sanitarios',
    icon: 'Bath',
    shortDescription: 'Ubicaciones en Nivel 1 y Nivel 2',
    fullDescription:
      'Sanitarios limpios y accesibles en ambos niveles del museo. Incluyen instalaciones para personas con discapacidad y cambiadores para bebés.',
    location: {
      floor: 'both',
      description: 'Nivel 1: junto a cafetería | Nivel 2: área central',
      coordinates: { x: 30, y: 60 },
    },
    rules: ['Acceso libre durante horario del museo'],
    tips: ['Cambiadores disponibles en ambos niveles'],
  },
  {
    id: 'accesibilidad',
    name: 'Accesibilidad',
    icon: 'Accessibility',
    shortDescription: 'Elevadores, rampas y servicios especiales',
    fullDescription:
      'MUNET es un museo 100% accesible. Contamos con elevadores, rampas, sanitarios accesibles y sillas de ruedas disponibles para préstamo gratuito.',
    location: {
      floor: 'both',
      description: 'Elevadores en área central de cada nivel',
      coordinates: { x: 50, y: 50 },
    },
    rules: ['Sillas de ruedas sujetas a disponibilidad', 'Solicitar en taquilla'],
    tips: [
      'Personal capacitado disponible para asistencia',
      'Señalización en Braille en áreas principales',
      'Audioguías con descripción para personas con discapacidad visual',
    ],
    ctaText: 'Más información',
    ctaLink: '/contacto',
  },
  {
    id: 'lactancia',
    name: 'Área de Lactancia',
    icon: 'Baby',
    shortDescription: 'Espacio privado para madres',
    fullDescription:
      'Espacio cómodo y privado para madres lactantes. Equipado con sillones confortables, cambiador y lavabo. Acceso libre durante el horario del museo.',
    location: {
      floor: 'nivel-1',
      description: 'Junto a sanitarios del Nivel 1',
      coordinates: { x: 35, y: 60 },
    },
    tips: [
      'Acceso con llave disponible en taquilla',
      'Agua purificada disponible',
    ],
  },
]

export const faqItems: FAQItem[] = [
  {
    id: 'faq-alimentos',
    question: '¿Puedo ingresar con alimentos?',
    answer:
      'No está permitido ingresar con alimentos al área de exposiciones. Sin embargo, puedes disfrutar de nuestra cafetería en el Nivel 1, donde encontrarás una variedad de opciones para todos los gustos. También puedes guardar tus alimentos en el guardarropa y consumirlos en áreas designadas.',
  },
  {
    id: 'faq-estacionamiento',
    question: '¿Hay estacionamiento gratuito?',
    answer:
      'El estacionamiento tiene un costo de $30 MXN por hora, con un máximo de $120 MXN por día completo. El acceso es por Av. de los Compositores. Contamos con espacios para autobuses escolares. Te recomendamos llegar temprano los domingos, ya que suele haber mayor afluencia.',
  },
  {
    id: 'faq-accesibilidad',
    question: '¿El museo es accesible para sillas de ruedas?',
    answer:
      'Sí, MUNET es un museo 100% accesible. Contamos con rampas de acceso, elevadores entre ambos niveles, sanitarios accesibles y sillas de ruedas disponibles para préstamo gratuito (sujeto a disponibilidad). Nuestro personal está capacitado para brindar asistencia cuando sea necesario.',
  },
  {
    id: 'faq-fotos',
    question: '¿Puedo tomar fotografías?',
    answer:
      'Sí, puedes tomar fotografías para uso personal en todas las áreas del museo. No está permitido el uso de flash ni trípodes. Para fotografía profesional o comercial, es necesario solicitar autorización previa contactando a comunicacion@museomunet.com.',
  },
  {
    id: 'faq-tours',
    question: '¿Hay tours guiados disponibles?',
    answer:
      'Sí, ofrecemos visitas guiadas para grupos escolares y visitantes en general. Los tours tienen una duración aproximada de 90 minutos y están disponibles en español. Para grupos de más de 15 personas, te recomendamos reservar con anticipación en la sección de Actividades o contactarnos directamente.',
  },
  {
    id: 'faq-mascotas',
    question: '¿Puedo ingresar con mascotas?',
    answer:
      'No está permitido el ingreso con mascotas, excepto perros guía o de asistencia certificados. Esta política es para garantizar la seguridad y comodidad de todos nuestros visitantes.',
  },
  {
    id: 'faq-duracion',
    question: '¿Cuánto tiempo toma recorrer el museo?',
    answer:
      'El recorrido completo del museo toma aproximadamente 2 a 3 horas. Sin embargo, puedes tomarte el tiempo que desees. Te recomendamos planificar al menos 2 horas para disfrutar de las exposiciones principales.',
  },
]
