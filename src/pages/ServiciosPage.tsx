/**
 * ServiciosPage
 * Visitor services and amenities page
 * Based on PRD Section 5.7 - Servicios
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Ticket, Mail, ChevronRight } from 'lucide-react'

import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SEOHead, StructuredData } from '@/components/seo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ServiceCard,
  ServiceDetail,
  ServiceMap,
  ServicesFAQ,
} from '@/components/services'
import { services, faqItems } from '@/lib/data/services'
import type { Service } from '@/lib/types/services'

export default function ServiciosPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleSelectService = (service: Service) => {
    setSelectedService(service)
    // Scroll to detail section on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('service-detail')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
    }
  }

  const handleCloseDetail = () => {
    setSelectedService(null)
  }

  return (
    <PageLayout>
      <SEOHead
        title="Servicios"
        description="Servicios y amenidades de MUNET: cafetería, tienda, guardarropa, Wi-Fi gratuito, sanitarios y estacionamiento. Todo para tu comodidad."
        canonicalPath="/servicios"
        keywords={['servicios museo', 'cafetería MUNET', 'tienda museo', 'estacionamiento Chapultepec']}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Inicio', path: '/' },
          { name: 'Servicios', path: '/servicios' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Servicios' }]} />

          <div className="mt-8 max-w-3xl">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Servicios
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed sm:text-xl">
              Todo lo que necesitas para disfrutar tu visita al museo. Conoce los
              servicios y amenidades disponibles para ti y tu familia.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Service Cards Grid */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-xl font-bold mb-6">
                Nuestros Servicios
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={handleSelectService}
                    isSelected={selectedService?.id === service.id}
                  />
                ))}
              </div>
            </div>

            {/* Service Detail Panel (Desktop Sidebar) */}
            <div
              id="service-detail"
              className="mt-8 lg:mt-0 lg:sticky lg:top-24 lg:self-start"
            >
              {selectedService ? (
                <ServiceDetail
                  service={selectedService}
                  onClose={handleCloseDetail}
                />
              ) : (
                <Card className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <ChevronRight className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Selecciona un servicio para ver más detalles
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceMap
            services={services}
            selectedService={selectedService}
            onSelectService={handleSelectService}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ServicesFAQ items={faqItems} />
        </div>
      </section>

      {/* Quick Access Links */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-center mb-8">
            Planifica tu Visita
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Planifica tu Visita Link */}
            <Card className="p-6 text-center hover:border-accent/30 hover:shadow-md transition-all">
              <Link to="/planifica-tu-visita" className="block">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Planifica tu Visita</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Horarios, ubicación y cómo llegar
                </p>
                <Button variant="link" className="mt-4">
                  Ver más <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>

            {/* Boletos Link */}
            <Card className="p-6 text-center hover:border-accent/30 hover:shadow-md transition-all">
              <Link to="/boletos" className="block">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Ticket className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Comprar Boletos</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reserva tu entrada en línea
                </p>
                <Button variant="link" className="mt-4">
                  Comprar ahora <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>

            {/* Contacto Link */}
            <Card className="p-6 text-center hover:border-accent/30 hover:shadow-md transition-all">
              <Link to="/contacto" className="block">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Contacto</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  ¿Tienes dudas? Escríbenos
                </p>
                <Button variant="link" className="mt-4">
                  Contactar <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
