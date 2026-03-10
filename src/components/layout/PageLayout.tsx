import Header from './Header'
import Footer from './Footer'
import PageTransition from './PageTransition'
import { SkipLink } from '@/components/ui/skip-link'

interface PageLayoutProps {
  children: React.ReactNode
  /** Disable page transition animation */
  noTransition?: boolean
}

export default function PageLayout({ children, noTransition = false }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip to main content link for keyboard users */}
      <SkipLink />
      
      <Header />
      
      {/* Main content area with id for skip link */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {noTransition ? (
          children
        ) : (
          <PageTransition>{children}</PageTransition>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
