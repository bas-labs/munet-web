import { Link } from 'react-router-dom'
import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default function PlanificaPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Planifica tu Visita' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Planifica tu Visita</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Todo lo que necesitas saber para planificar tu visita al museo.
          </p>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Hours */}
            <section className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Horarios de Apertura</h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Lunes</span>
                  <span className="text-muted-foreground">CERRADO</span>
                </div>
                <div className="flex justify-between">
                  <span>Martes – Domingo</span>
                  <span className="text-muted-foreground">10:00 – 18:00 hrs</span>
                </div>
              </div>
            </section>
            
            {/* Pricing */}
            <section className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Tarifas</h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>General</span>
                  <span>$120 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span>Estudiantes / INAPAM</span>
                  <span>$60 MXN</span>
                </div>
                <div className="flex justify-between">
                  <span>Niños (3-12 años)</span>
                  <span>$60 MXN</span>
                </div>
                <div className="flex justify-between font-semibold text-primary">
                  <span>Domingos — Nacionales</span>
                  <span>GRATIS</span>
                </div>
              </div>
              <Button asChild className="mt-4 w-full">
                <Link to="/boletos">Comprar Boletos</Link>
              </Button>
            </section>
            
            {/* Location */}
            <section className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Cómo Llegar</h2>
              <p className="mt-4 text-muted-foreground">
                Av. de los Compositores s/n, Bosque de Chapultepec II Secc.,
                Ciudad de México.
              </p>
              <div className="mt-4 h-48 rounded-md bg-muted">
                {/* Map placeholder */}
              </div>
            </section>
            
            {/* Accessibility */}
            <section className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Accesibilidad</h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>• Acceso para sillas de ruedas</li>
                <li>• Elevadores entre Nivel 1 y Nivel 2</li>
                <li>• Servicios de asistencia disponibles</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
