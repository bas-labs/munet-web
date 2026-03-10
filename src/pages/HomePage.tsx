import HeroSection from '@/components/home/HeroSection'
import ExposicionesPreview from '@/components/home/ExposicionesPreview'
import PlanificaSection from '@/components/home/PlanificaSection'
import ActividadesHighlight from '@/components/home/ActividadesHighlight'
import RentaCTA from '@/components/home/RentaCTA'
import NewsletterSection from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero: Full-viewport video background with quote and CTAs */}
      <HeroSection />
      
      {/* Exposiciones: Bento grid preview of exhibition areas */}
      <ExposicionesPreview />
      
      {/* Planifica: Hours, address, and map placeholder */}
      <PlanificaSection />
      
      {/* Actividades: Horizontal scroll of upcoming events */}
      <ActividadesHighlight />
      
      {/* Renta: Full-bleed CTA for venue rental */}
      <RentaCTA />
      
      {/* Newsletter: Email subscription */}
      <NewsletterSection />
    </main>
  )
}
