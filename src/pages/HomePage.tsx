import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import HeroSection from '@/components/home/HeroSection'
import ExposicionesPreview from '@/components/home/ExposicionesPreview'
import ActividadesHighlight from '@/components/home/ActividadesHighlight'
import PlanificaSection from '@/components/home/PlanificaSection'
import RentaCTA from '@/components/home/RentaCTA'

export default function HomePage() {
  return (
    <PageLayout>
      {/* SEO */}
      <SEOHead
        title="Inicio"
        description="MUNET — Museo Nacional de Energía y Tecnología. El primer museo nacional de México dedicado a la energía y tecnología. Ubicado en el Bosque de Chapultepec, CDMX."
        canonicalPath="/"
        keywords={['museo CDMX', 'energía renovable', 'ciencia para niños', 'actividades familiares', 'Chapultepec']}
      />
      <StructuredData type="organization" />
      <StructuredData type="museum" />

      {/* Hero - Full screen with logo and parallax */}
      <HeroSection />

      {/* Exposiciones - Bento grid with animations */}
      <ExposicionesPreview />

      {/* Actividades - Horizontal scroll carousel */}
      <ActividadesHighlight />

      {/* Planifica - Split layout with map */}
      <PlanificaSection />

      {/* Renta - Dramatic CTA */}
      <RentaCTA />
    </PageLayout>
  )
}
