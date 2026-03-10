import { Link } from 'react-router-dom'
import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { SEOHead, StructuredData } from '@/components/seo'

export default function PlanificaPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Planifica tu Visita"
        description="Horarios, ubicación, tarifas y servicios de accesibilidad de MUNET. Martes a domingo de 10:00 a 18:00 hrs. Entrada gratuita domingos para nacionales."
        canonicalPath="/planifica-tu-visita"
        keywords={['horario museo', 'cómo llegar MUNET', 'precios boletos', 'Chapultepec museo']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Planifica tu Visita', path: '/planifica-tu-visita' },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Planifica tu Visita' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Planifica tu Visita</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Todo lo que necesitas saber para planificar tu visita al museo.
          </p>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Hours */}
            <section 
              className="rounded-lg border border-border p-6"
              aria-labelledby="horarios-heading"
            >
              <h2 id="horarios-heading" className="text-xl font-bold">Horarios de Apertura</h2>
              <dl className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <dt>Lunes</dt>
                  <dd className="text-muted-foreground">CERRADO</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Martes – Domingo</dt>
                  <dd className="text-muted-foreground">10:00 – 18:00 hrs</dd>
                </div>
              </dl>
            </section>
            
            {/* Pricing */}
            <section 
              className="rounded-lg border border-border p-6"
              aria-labelledby="tarifas-heading"
            >
              <h2 id="tarifas-heading" className="text-xl font-bold">Tarifas</h2>
              <dl className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <dt>General</dt>
                  <dd>$120 MXN</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Estudiantes / INAPAM</dt>
                  <dd>$60 MXN</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Niños (3-12 años)</dt>
                  <dd>$60 MXN</dd>
                </div>
                <div className="flex justify-between font-semibold text-primary">
                  <dt>Domingos — Nacionales</dt>
                  <dd>GRATIS</dd>
                </div>
              </dl>
              <Button asChild className="mt-4 w-full">
                <Link to="/boletos">Comprar Boletos</Link>
              </Button>
            </section>
            
            {/* Location */}
            <section 
              className="rounded-lg border border-border p-6"
              aria-labelledby="ubicacion-heading"
            >
              <h2 id="ubicacion-heading" className="text-xl font-bold">Cómo Llegar</h2>
              <address className="mt-4 text-muted-foreground not-italic">
                Av. de los Compositores s/n, Bosque de Chapultepec II Secc.,
                Ciudad de México.
              </address>
              <div 
                className="mt-4 h-48 rounded-md bg-muted"
                role="img"
                aria-label="Mapa de ubicación del museo MUNET"
              >
                {/* Map placeholder */}
              </div>
            </section>
            
            {/* Accessibility */}
            <section 
              className="rounded-lg border border-border p-6"
              aria-labelledby="accesibilidad-heading"
            >
              <h2 id="accesibilidad-heading" className="text-xl font-bold">Accesibilidad</h2>
              <ul className="mt-4 space-y-2 text-muted-foreground" role="list">
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
