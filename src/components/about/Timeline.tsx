import { cn } from '@/lib/utils'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1942",
    title: "Decreto del DOF",
    description: "Se establece mediante decreto del Diario Oficial de la Federación la creación del primer espacio dedicado a la energía en México."
  },
  {
    year: "1970",
    title: "MUTEC",
    description: "Se inaugura el Museo Tecnológico de la CFE (MUTEC) en el Bosque de Chapultepec, convirtiéndose en un referente de divulgación tecnológica."
  },
  {
    year: "2015",
    title: "Creación de FIMUNET",
    description: "Se constituye el Fideicomiso del Museo Nacional de Energía y Tecnología para la transformación del espacio museístico."
  },
  {
    year: "2018",
    title: "Norten & Appelbaum",
    description: "Se selecciona al arquitecto Enrique Norten y a Ralph Appelbaum Associates para el diseño arquitectónico y museográfico del nuevo museo."
  },
  {
    year: "2026",
    title: "Apertura de MUNET",
    description: "El Museo Nacional de Energía y Tecnología abre sus puertas al público, marcando una nueva era en la divulgación científica de México."
  }
]

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
      
      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div
            key={event.year}
            className={cn(
              "relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8",
              index % 2 === 0 ? "md:text-right" : ""
            )}
          >
            {/* Dot */}
            <div className="absolute left-2 md:left-1/2 top-1 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm" />
            
            {/* Content */}
            <div className={cn(
              "md:col-span-1",
              index % 2 === 0 ? "md:pr-12" : "md:col-start-2 md:pl-12 md:text-left"
            )}>
              <span className="inline-block px-3 py-1 text-sm font-bold bg-primary text-primary-foreground rounded-full mb-2">
                {event.year}
              </span>
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
