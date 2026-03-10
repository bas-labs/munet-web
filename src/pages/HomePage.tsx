import { Link } from 'react-router-dom'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { SEOHead, StructuredData } from '@/components/seo'

export default function HomePage() {
  return (
    <PageLayout>
      {/* SEO */}
      <SEOHead
        title="Inicio"
        description="MUNET — Museo Nacional de Energía y Tecnología. El primer museo nacional de México dedicado a la energía y tecnología. Ubicado en el Bosque de Chapultepec, CDMX."
        canonicalPath="/"
        keywords={['museo CDMX', 'energía renovable', 'ciencia para niños', 'actividades familiares']}
      />
      <StructuredData type="organization" />
      <StructuredData type="museum" />

      {/* Hero Section */}
      <section 
        className="relative flex min-h-[80vh] flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4 text-center"
        aria-labelledby="hero-heading"
      >
        <h1 
          id="hero-heading"
          className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          El conocimiento no te crea ni te destruye.{' '}
          <span className="text-primary">Te transforma.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Museo Nacional de Energía y Tecnología — El primer museo nacional de
          México dedicado a la energía y tecnología.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/boletos">Comprar Boletos</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/exposiciones">Explorar Exposiciones</Link>
          </Button>
        </div>
      </section>

      {/* Exposiciones Preview */}
      <section 
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="exposiciones-heading"
      >
        <h2 id="exposiciones-heading" className="text-2xl font-bold sm:text-3xl">
          Explora el Universo de la Energía
        </h2>
        <p className="mt-2 text-muted-foreground">
          Descubre nuestras exposiciones interactivas sobre energía y tecnología.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder cards - will be replaced with actual exhibition data */}
          {['Energía Solar', 'Energía Eólica', 'Electricidad'].map((title) => (
            <article
              key={title}
              className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring"
            >
              <div className="mb-4 h-32 rounded-md bg-muted" aria-hidden="true" />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Explora los conceptos fundamentales de {title.toLowerCase()}.
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/exposiciones">Ver Todas las Exposiciones</Link>
          </Button>
        </div>
      </section>

      {/* Planifica Section */}
      <section 
        className="border-y border-border bg-muted/30 py-16"
        aria-labelledby="planifica-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="planifica-heading" className="text-2xl font-bold sm:text-3xl">
                Planifica tu Visita
              </h2>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold">Horario</h3>
                  <p className="text-muted-foreground">
                    Martes a Domingo: 10:00 - 18:00 hrs
                  </p>
                  <p className="text-muted-foreground">Lunes: Cerrado</p>
                </div>
                <div>
                  <h3 className="font-semibold">Ubicación</h3>
                  <address className="text-muted-foreground not-italic">
                    Av. de los Compositores s/n, Bosque de Chapultepec II Secc.
                  </address>
                </div>
              </div>
              <Button asChild className="mt-6">
                <Link to="/planifica-tu-visita">Ver Horarios Completos</Link>
              </Button>
            </div>
            <div 
              className="h-64 rounded-lg bg-muted" 
              role="img" 
              aria-label="Mapa de ubicación del museo"
            >
              {/* Map placeholder */}
            </div>
          </div>
        </div>
      </section>

      {/* Actividades Highlight */}
      <section 
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="actividades-heading"
      >
        <h2 id="actividades-heading" className="text-2xl font-bold sm:text-3xl">
          Próximas Actividades
        </h2>
        <p className="mt-2 text-muted-foreground">
          Talleres, conferencias y eventos especiales.
        </p>
        <div 
          className="mt-8 flex gap-4 overflow-x-auto pb-4"
          role="region"
          aria-label="Carrusel de actividades"
        >
          {[1, 2, 3].map((i) => (
            <article
              key={i}
              className="min-w-[280px] flex-shrink-0 rounded-lg border border-border bg-card p-4"
            >
              <div className="mb-3 h-24 rounded-md bg-muted" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">Próximamente</p>
              <h3 className="font-semibold">Actividad {i}</h3>
            </article>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button asChild variant="outline">
            <Link to="/actividades">Ver Todas las Actividades</Link>
          </Button>
        </div>
      </section>

      {/* Renta CTA */}
      <section 
        className="relative bg-primary py-20 text-primary-foreground"
        aria-labelledby="renta-heading"
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="renta-heading" className="text-2xl font-bold sm:text-3xl">
            Haz de tu Evento algo Extraordinario
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Renta nuestros espacios para tu próximo evento corporativo o social.
          </p>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-8"
          >
            <Link to="/renta-de-espacios">Conoce Nuestros Espacios</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}
