import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function RentaCTA() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        {/* Placeholder image background using gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        {/* Architectural pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Haz de tu Evento algo{' '}
          <span className="text-orange-400">Extraordinario</span>
        </h2>
        <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10">
          Espacios únicos en el corazón de Chapultepec para eventos corporativos, 
          conferencias, exposiciones y celebraciones especiales.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white hover:bg-neutral-100 text-neutral-900 px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
        >
          <Link to="/renta-de-espacios">Conoce Nuestros Espacios</Link>
        </Button>

        {/* Stats or features */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Auditorio', capacity: '200 pax' },
            { label: 'Salas', capacity: 'Múltiples' },
            { label: 'Foro', capacity: 'Al aire libre' },
            { label: 'Explanada', capacity: 'Eventos grandes' },
          ].map((space) => (
            <div key={space.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">
                {space.capacity}
              </div>
              <div className="text-sm text-neutral-400">{space.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
