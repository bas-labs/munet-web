import { PageLayout } from '@/components/layout'
import { SEOHead, StructuredData } from '@/components/seo'
import HeroSection from '@/components/home/HeroSection'
import Marquee from '@/components/home/Marquee'
import ExposicionesPreview from '@/components/home/ExposicionesPreview'
import ActividadesHighlight from '@/components/home/ActividadesHighlight'
import PlanificaSection from '@/components/home/PlanificaSection'
import NewsletterSection from '@/components/home/NewsletterSection'
import RentaCTA from '@/components/home/RentaCTA'

export default function HomePage() {
  return (
    <PageLayout>
      <SEOHead
        title="Inicio"
        description="MUNET — Museo Nacional de Energía y Tecnología. El primer museo nacional de México dedicado a la energía y tecnología. Ubicado en el Bosque de Chapultepec, CDMX."
        canonicalPath="/"
        keywords={['museo CDMX', 'energía renovable', 'ciencia para niños', 'actividades familiares', 'Chapultepec']}
      />
      <StructuredData type="organization" />
      <StructuredData type="museum" />

      <HeroSection />
      <Marquee />
      <ExposicionesPreview />
      <ActividadesHighlight />
      <PlanificaSection />
      <NewsletterSection />
      <RentaCTA />
    </PageLayout>
  )
}
