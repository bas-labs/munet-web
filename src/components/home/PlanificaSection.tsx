import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function PlanificaSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Planifica tu Visita
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Todo lo que necesitas saber para disfrutar al máximo tu experiencia en MUNET.
          </p>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Hours & Address */}
          <div className="space-y-8">
            {/* Hours */}
            <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-3">
                <span className="text-2xl">🕐</span>
                Horarios de Apertura
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="font-medium text-red-600">Lunes</span>
                  <span className="text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full text-sm">
                    CERRADO
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                  <span className="text-neutral-700">Martes – Domingo</span>
                  <span className="text-neutral-900 font-semibold">10:00 – 18:00 hrs</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-neutral-600 text-sm">Días festivos</span>
                  <span className="text-neutral-600 text-sm">Consultar horario especial</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-sm text-orange-800">
                  <span className="font-semibold">🎉 Domingos:</span> Entrada gratuita para nacionales mexicanos
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
                <span className="text-2xl">📍</span>
                Ubicación
              </h3>
              <address className="not-italic text-neutral-700 leading-relaxed mb-4">
                Av. de los Compositores s/n<br />
                Bosque de Chapultepec II Sección<br />
                Ciudad de México, México
              </address>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
                  🚇 Metro Constituyentes
                </span>
                <span className="bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
                  🚌 Metrobús Auditorio
                </span>
                <span className="bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full">
                  🚗 Estacionamiento disponible
                </span>
              </div>
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-6 text-lg rounded-xl"
            >
              <Link to="/planifica-tu-visita">Ver Horarios Completos</Link>
            </Button>
          </div>

          {/* Right: Map placeholder */}
          <div className="relative h-[400px] lg:h-full lg:min-h-[500px] bg-neutral-100 rounded-2xl overflow-hidden">
            {/* Map placeholder with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-neutral-600 font-medium">Mapa interactivo</p>
                <p className="text-neutral-500 text-sm mt-2">
                  Bosque de Chapultepec, Segunda Sección
                </p>
              </div>
            </div>
            {/* Decorative pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="relative">
                <div className="w-8 h-8 bg-orange-500 rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-4 bg-orange-500" 
                     style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
