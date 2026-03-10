export type GalleryCategory = 'Columnas de la Sustentabilidad' | 'Experiencia MUNET' | 'Exposiciones' | 'Auditorio' | 'Exterior Museo'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  caption: string
  aspectRatio?: 'portrait' | 'landscape' | 'square'
}

export const galleryImages: GalleryImage[] = [
  // Columnas de la Sustentabilidad (5)
  {
    id: 'torres-1',
    src: '/images/fotogaleria/torresdeluz/RHG_5645And8more_Optimizer.jpg',
    alt: 'Columnas de la Sustentabilidad - Vista 1',
    category: 'Columnas de la Sustentabilidad',
    caption: 'Las Columnas de la Sustentabilidad iluminadas',
    aspectRatio: 'landscape',
  },
  {
    id: 'torres-2',
    src: '/images/fotogaleria/torresdeluz/RHG_5834And8more_Optimizer.jpg',
    alt: 'Columnas de la Sustentabilidad - Vista 2',
    category: 'Columnas de la Sustentabilidad',
    caption: 'Detalle de las columnas al atardecer',
    aspectRatio: 'portrait',
  },
  {
    id: 'torres-3',
    src: '/images/fotogaleria/torresdeluz/RHG_5969And8more_Optimizer.jpg',
    alt: 'Columnas de la Sustentabilidad - Vista 3',
    category: 'Columnas de la Sustentabilidad',
    caption: 'Vista panorámica de las columnas',
    aspectRatio: 'landscape',
  },
  {
    id: 'torres-4',
    src: '/images/fotogaleria/torresdeluz/RHG_6140And8more_Optimizer.jpg',
    alt: 'Columnas de la Sustentabilidad - Vista 4',
    category: 'Columnas de la Sustentabilidad',
    caption: 'Estructura de las columnas de sustentabilidad',
    aspectRatio: 'square',
  },
  {
    id: 'torres-5',
    src: '/images/fotogaleria/torresdeluz/RHG_6230And8more_Optimizer.jpg',
    alt: 'Columnas de la Sustentabilidad - Vista 5',
    category: 'Columnas de la Sustentabilidad',
    caption: 'Columnas de la Sustentabilidad en perspectiva',
    aspectRatio: 'portrait',
  },

  // Experiencia MUNET (5)
  {
    id: 'sala-1',
    src: '/images/fotogaleria/salainteractiva/RHG_5503.jpg',
    alt: 'Sala Interactiva MUNET - Vista 1',
    category: 'Experiencia MUNET',
    caption: 'Sala interactiva del museo',
    aspectRatio: 'landscape',
  },
  {
    id: 'sala-2',
    src: '/images/fotogaleria/salainteractiva/RHG_5508.jpg',
    alt: 'Sala Interactiva MUNET - Vista 2',
    category: 'Experiencia MUNET',
    caption: 'Experiencia inmersiva de energía',
    aspectRatio: 'square',
  },
  {
    id: 'sala-3',
    src: '/images/fotogaleria/salainteractiva/RHG_5540.jpg',
    alt: 'Sala Interactiva MUNET - Vista 3',
    category: 'Experiencia MUNET',
    caption: 'Módulos interactivos para visitantes',
    aspectRatio: 'landscape',
  },
  {
    id: 'sala-4',
    src: '/images/fotogaleria/salainteractiva/RHG_5576.jpg',
    alt: 'Sala Interactiva MUNET - Vista 4',
    category: 'Experiencia MUNET',
    caption: 'Tecnología y naturaleza en la sala interactiva',
    aspectRatio: 'portrait',
  },
  {
    id: 'sala-5',
    src: '/images/fotogaleria/salainteractiva/RHG_5614.jpg',
    alt: 'Sala Interactiva MUNET - Vista 5',
    category: 'Experiencia MUNET',
    caption: 'Zona de descubrimiento interactivo',
    aspectRatio: 'landscape',
  },

  // Exposiciones (5)
  {
    id: 'expo-1',
    src: '/images/fotogaleria/exposiciones/RHG_0001And8more_Optimizer.jpg',
    alt: 'Exposición MUNET - Vista 1',
    category: 'Exposiciones',
    caption: 'Sala principal de exposiciones',
    aspectRatio: 'landscape',
  },
  {
    id: 'expo-2',
    src: '/images/fotogaleria/exposiciones/RHG_0019And8more_Optimizer.jpg',
    alt: 'Exposición MUNET - Vista 2',
    category: 'Exposiciones',
    caption: 'Exhibición de energía y naturaleza',
    aspectRatio: 'portrait',
  },
  {
    id: 'expo-3',
    src: '/images/fotogaleria/exposiciones/RHG_0091And8more_Optimizer.jpg',
    alt: 'Exposición MUNET - Vista 3',
    category: 'Exposiciones',
    caption: 'Instalación sobre energías renovables',
    aspectRatio: 'square',
  },
  {
    id: 'expo-4',
    src: '/images/fotogaleria/exposiciones/RHG_0226And8more_Optimizer.jpg',
    alt: 'Exposición MUNET - Vista 4',
    category: 'Exposiciones',
    caption: 'Área de exposiciones temporales',
    aspectRatio: 'landscape',
  },
  {
    id: 'expo-5',
    src: '/images/fotogaleria/exposiciones/RHG_0343And8more_Optimizer.jpg',
    alt: 'Exposición MUNET - Vista 5',
    category: 'Exposiciones',
    caption: 'Recorrido por las exposiciones del museo',
    aspectRatio: 'portrait',
  },

  // Auditorio (5)
  {
    id: 'audi-1',
    src: '/images/fotogaleria/auditorio/1.jpg',
    alt: 'Auditorio MUNET - Vista 1',
    category: 'Auditorio',
    caption: 'Vista general del auditorio',
    aspectRatio: 'landscape',
  },
  {
    id: 'audi-2',
    src: '/images/fotogaleria/auditorio/3.jpg',
    alt: 'Auditorio MUNET - Vista 2',
    category: 'Auditorio',
    caption: 'Escenario del auditorio MUNET',
    aspectRatio: 'square',
  },
  {
    id: 'audi-3',
    src: '/images/fotogaleria/auditorio/5.jpg',
    alt: 'Auditorio MUNET - Vista 3',
    category: 'Auditorio',
    caption: 'Butacas y diseño interior del auditorio',
    aspectRatio: 'landscape',
  },
  {
    id: 'audi-4',
    src: '/images/fotogaleria/auditorio/8.jpg',
    alt: 'Auditorio MUNET - Vista 4',
    category: 'Auditorio',
    caption: 'Iluminación del auditorio',
    aspectRatio: 'portrait',
  },
  {
    id: 'audi-5',
    src: '/images/fotogaleria/auditorio/10.jpg',
    alt: 'Auditorio MUNET - Vista 5',
    category: 'Auditorio',
    caption: 'Espacio multifuncional del auditorio',
    aspectRatio: 'landscape',
  },

  // Exterior Museo (8)
  {
    id: 'ext-1',
    src: '/images/fotogaleria/exteriormuseo/RHG_3698And8more_Optimizer.jpg',
    alt: 'Exterior del Museo - Vista 1',
    category: 'Exterior Museo',
    caption: 'Fachada principal del museo MUNET',
    aspectRatio: 'landscape',
  },
  {
    id: 'ext-2',
    src: '/images/fotogaleria/exteriormuseo/RHG_3725And8more_Optimizer---copia.jpg',
    alt: 'Exterior del Museo - Vista 2',
    category: 'Exterior Museo',
    caption: 'Vista lateral del edificio',
    aspectRatio: 'portrait',
  },
  {
    id: 'ext-3',
    src: '/images/fotogaleria/exteriormuseo/RHG_3752And8more_Optimizer.jpg',
    alt: 'Exterior del Museo - Vista 3',
    category: 'Exterior Museo',
    caption: 'Arquitectura exterior del museo',
    aspectRatio: 'landscape',
  },
  {
    id: 'ext-4',
    src: '/images/fotogaleria/exteriormuseo/RHG_3860And8more_Optimizer.jpg',
    alt: 'Exterior del Museo - Vista 4',
    category: 'Exterior Museo',
    caption: 'Jardines y entorno del museo',
    aspectRatio: 'square',
  },
  {
    id: 'ext-5',
    src: '/images/fotogaleria/exteriormuseo/RHG_3941And8more_Optimizer.jpg',
    alt: 'Exterior del Museo - Vista 5',
    category: 'Exterior Museo',
    caption: 'Perspectiva del museo al atardecer',
    aspectRatio: 'landscape',
  },
  {
    id: 'ext-6',
    src: '/images/fotogaleria/exteriormuseo/RHG_4004And8more_Optimizer.jpg',
    alt: 'Exterior del Museo - Vista 6',
    category: 'Exterior Museo',
    caption: 'Acceso principal y plaza',
    aspectRatio: 'portrait',
  },
  {
    id: 'ext-7',
    src: '/images/fotogaleria/exteriormuseo/RHG_4463And8more_Optimizer.jpg',
    alt: 'Exterior del Museo - Vista 7',
    category: 'Exterior Museo',
    caption: 'Vista panorámica del museo y su entorno',
    aspectRatio: 'landscape',
  },
  {
    id: 'ext-8',
    src: '/images/fotogaleria/exteriormuseo/RHG_4544And8more_Optimizer.jpg',
    alt: 'Exterior del Museo - Vista 8',
    category: 'Exterior Museo',
    caption: 'El museo integrado en el paisaje natural',
    aspectRatio: 'square',
  },
]

export const categories: Array<GalleryCategory | 'Todos'> = [
  'Todos',
  'Columnas de la Sustentabilidad',
  'Experiencia MUNET',
  'Exposiciones',
  'Auditorio',
  'Exterior Museo',
]
