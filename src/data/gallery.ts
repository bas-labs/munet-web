export type GalleryCategory = 'Arquitectura' | 'Exposiciones' | 'Eventos' | 'Construcción'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  caption: string
  aspectRatio?: 'portrait' | 'landscape' | 'square'
}

// Using picsum.photos for varied placeholder images
export const galleryImages: GalleryImage[] = [
  // Arquitectura (6 images)
  {
    id: 'arq-1',
    src: 'https://picsum.photos/seed/munet-arq1/800/1200',
    alt: 'Fachada principal del museo MUNET',
    category: 'Arquitectura',
    caption: 'Fachada principal diseñada por Enrique Norten',
    aspectRatio: 'portrait',
  },
  {
    id: 'arq-2',
    src: 'https://picsum.photos/seed/munet-arq2/1200/800',
    alt: 'Vista aérea del museo en Chapultepec',
    category: 'Arquitectura',
    caption: 'Vista aérea del complejo en la Segunda Sección',
    aspectRatio: 'landscape',
  },
  {
    id: 'arq-3',
    src: 'https://picsum.photos/seed/munet-arq3/800/800',
    alt: 'Detalle arquitectónico del techo',
    category: 'Arquitectura',
    caption: 'Estructura del techo con paneles solares integrados',
    aspectRatio: 'square',
  },
  {
    id: 'arq-4',
    src: 'https://picsum.photos/seed/munet-arq4/1200/800',
    alt: 'Vestíbulo principal del museo',
    category: 'Arquitectura',
    caption: 'Vestíbulo principal con doble altura',
    aspectRatio: 'landscape',
  },
  {
    id: 'arq-5',
    src: 'https://picsum.photos/seed/munet-arq5/800/1200',
    alt: 'Escalera central del museo',
    category: 'Arquitectura',
    caption: 'Escalera helicoidal conectando niveles',
    aspectRatio: 'portrait',
  },
  {
    id: 'arq-6',
    src: 'https://picsum.photos/seed/munet-arq6/800/800',
    alt: 'Iluminación natural en galerías',
    category: 'Arquitectura',
    caption: 'Sistema de iluminación natural cenital',
    aspectRatio: 'square',
  },

  // Exposiciones (6 images)
  {
    id: 'exp-1',
    src: 'https://picsum.photos/seed/munet-exp1/1200/800',
    alt: 'Sala de Energía Solar',
    category: 'Exposiciones',
    caption: 'Área interactiva de Energía Solar - Nivel 2',
    aspectRatio: 'landscape',
  },
  {
    id: 'exp-2',
    src: 'https://picsum.photos/seed/munet-exp2/800/1200',
    alt: 'Exposición de Electricidad',
    category: 'Exposiciones',
    caption: 'Módulos interactivos de Electricidad',
    aspectRatio: 'portrait',
  },
  {
    id: 'exp-3',
    src: 'https://picsum.photos/seed/munet-exp3/800/800',
    alt: 'Instalación de Energía Nuclear',
    category: 'Exposiciones',
    caption: 'Modelo de reactor nuclear educativo',
    aspectRatio: 'square',
  },
  {
    id: 'exp-4',
    src: 'https://picsum.photos/seed/munet-exp4/1200/800',
    alt: 'Área de Sostenibilidad',
    category: 'Exposiciones',
    caption: 'Zona de reflexión sobre desarrollo sostenible',
    aspectRatio: 'landscape',
  },
  {
    id: 'exp-5',
    src: 'https://picsum.photos/seed/munet-exp5/800/1200',
    alt: 'Turbina eólica interactiva',
    category: 'Exposiciones',
    caption: 'Modelo funcional de aerogenerador',
    aspectRatio: 'portrait',
  },
  {
    id: 'exp-6',
    src: 'https://picsum.photos/seed/munet-exp6/800/800',
    alt: 'Pantallas de Bioenergía',
    category: 'Exposiciones',
    caption: 'Displays multimedia de Bioenergía',
    aspectRatio: 'square',
  },

  // Eventos (6 images)
  {
    id: 'evt-1',
    src: 'https://picsum.photos/seed/munet-evt1/1200/800',
    alt: 'Inauguración del museo',
    category: 'Eventos',
    caption: 'Ceremonia de inauguración oficial',
    aspectRatio: 'landscape',
  },
  {
    id: 'evt-2',
    src: 'https://picsum.photos/seed/munet-evt2/800/800',
    alt: 'Taller infantil de energías',
    category: 'Eventos',
    caption: 'Taller de ciencia para niños',
    aspectRatio: 'square',
  },
  {
    id: 'evt-3',
    src: 'https://picsum.photos/seed/munet-evt3/800/1200',
    alt: 'Conferencia de expertos',
    category: 'Eventos',
    caption: 'Ciclo de conferencias sobre energía',
    aspectRatio: 'portrait',
  },
  {
    id: 'evt-4',
    src: 'https://picsum.photos/seed/munet-evt4/1200/800',
    alt: 'Visita escolar guiada',
    category: 'Eventos',
    caption: 'Grupos escolares explorando el museo',
    aspectRatio: 'landscape',
  },
  {
    id: 'evt-5',
    src: 'https://picsum.photos/seed/munet-evt5/800/800',
    alt: 'Noche de museos',
    category: 'Eventos',
    caption: 'Evento especial Noche de Museos',
    aspectRatio: 'square',
  },
  {
    id: 'evt-6',
    src: 'https://picsum.photos/seed/munet-evt6/800/1200',
    alt: 'Presentación de libro',
    category: 'Eventos',
    caption: 'Lanzamiento de publicación institucional',
    aspectRatio: 'portrait',
  },

  // Construcción (6 images)
  {
    id: 'con-1',
    src: 'https://picsum.photos/seed/munet-con1/1200/800',
    alt: 'Inicio de obra MUNET',
    category: 'Construcción',
    caption: 'Primeras etapas de construcción - 2020',
    aspectRatio: 'landscape',
  },
  {
    id: 'con-2',
    src: 'https://picsum.photos/seed/munet-con2/800/1200',
    alt: 'Estructura principal en proceso',
    category: 'Construcción',
    caption: 'Levantamiento de estructura metálica',
    aspectRatio: 'portrait',
  },
  {
    id: 'con-3',
    src: 'https://picsum.photos/seed/munet-con3/800/800',
    alt: 'Trabajadores en obra',
    category: 'Construcción',
    caption: 'Equipo de construcción en acción',
    aspectRatio: 'square',
  },
  {
    id: 'con-4',
    src: 'https://picsum.photos/seed/munet-con4/1200/800',
    alt: 'Instalación de fachada',
    category: 'Construcción',
    caption: 'Colocación de paneles de fachada',
    aspectRatio: 'landscape',
  },
  {
    id: 'con-5',
    src: 'https://picsum.photos/seed/munet-con5/800/800',
    alt: 'Vista nocturna de obra',
    category: 'Construcción',
    caption: 'Avances nocturnos de construcción',
    aspectRatio: 'square',
  },
  {
    id: 'con-6',
    src: 'https://picsum.photos/seed/munet-con6/800/1200',
    alt: 'Acabados interiores',
    category: 'Construcción',
    caption: 'Fase final de acabados interiores',
    aspectRatio: 'portrait',
  },
]

export const categories: Array<GalleryCategory | 'Todos'> = [
  'Todos',
  'Arquitectura',
  'Exposiciones',
  'Eventos',
  'Construcción',
]
