import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PageLoadingFallback } from '@/components/ui/loading-spinner'
import { ToastProvider } from '@/components/ui/toast'

// =============================================================================
// LAZY LOADED PAGES - Code Splitting per Route
// Each page is loaded only when the route is accessed
// =============================================================================

// Priority pages - preloaded on hover/focus
const HomePage = lazy(() => import('@/pages/HomePage'))
const ExposicionesPage = lazy(() => import('@/pages/ExposicionesPage'))
const BoletosPage = lazy(() => import('@/pages/BoletosPage'))
const PlanificaPage = lazy(() => import('@/pages/PlanificaPage'))

// Secondary pages
const QuienesSomosPage = lazy(() => import('@/pages/QuienesSomosPage'))
const ActividadesPage = lazy(() => import('@/pages/ActividadesPage'))
const EventDetailPage = lazy(() => import('@/pages/EventDetailPage'))
const ServiciosPage = lazy(() => import('@/pages/ServiciosPage'))
const FotogaleriaPage = lazy(() => import('@/pages/FotogaleriaPage'))
const RentaEspaciosPage = lazy(() => import('@/pages/RentaEspaciosPage'))

// Tertiary pages
const InvolucratePage = lazy(() => import('@/pages/InvolucratePage'))
const ContactoPage = lazy(() => import('@/pages/ContactoPage'))
const AvisoPrivacidadPage = lazy(() => import('@/pages/AvisoPrivacidadPage'))

// Checkout flow
const OrderLookupPage = lazy(() => import('@/pages/OrderLookupPage'))
const CheckoutSuccessPage = lazy(() => import('@/pages/CheckoutSuccessPage'))
const CheckoutCancelPage = lazy(() => import('@/pages/CheckoutCancelPage'))

// =============================================================================
// PRELOAD HANDLERS - Preload routes on link hover for faster navigation
// =============================================================================

// Map of route paths to their import functions for preloading
const routePreloadMap: Record<string, () => Promise<unknown>> = {
  '/': () => import('@/pages/HomePage'),
  '/exposiciones': () => import('@/pages/ExposicionesPage'),
  '/boletos': () => import('@/pages/BoletosPage'),
  '/planifica-tu-visita': () => import('@/pages/PlanificaPage'),
  '/quienes-somos': () => import('@/pages/QuienesSomosPage'),
  '/actividades': () => import('@/pages/ActividadesPage'),
  '/servicios': () => import('@/pages/ServiciosPage'),
  '/fotogaleria': () => import('@/pages/FotogaleriaPage'),
  '/renta-de-espacios': () => import('@/pages/RentaEspaciosPage'),
  '/involucrate': () => import('@/pages/InvolucratePage'),
  '/contacto': () => import('@/pages/ContactoPage'),
}

/**
 * Preload a route's code when user hovers over a link
 * Call this from navigation components on mouseEnter/focus
 */
export function preloadRoute(path: string) {
  const preloadFn = routePreloadMap[path]
  if (preloadFn) {
    preloadFn()
  }
}

// =============================================================================
// ANIMATED ROUTES COMPONENT
// Wraps routes with AnimatePresence for page transitions
// =============================================================================

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* P0 - Core pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/quienes-somos" element={<QuienesSomosPage />} />
        <Route path="/exposiciones" element={<ExposicionesPage />} />
        <Route path="/planifica-tu-visita" element={<PlanificaPage />} />
        <Route path="/boletos" element={<BoletosPage />} />
        
        {/* Checkout flow */}
        <Route path="/mis-boletos" element={<OrderLookupPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
        
        {/* P1 - Content pages */}
        <Route path="/actividades" element={<ActividadesPage />} />
        <Route path="/actividades/:eventId" element={<EventDetailPage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/fotogaleria" element={<FotogaleriaPage />} />
        <Route path="/renta-de-espacios" element={<RentaEspaciosPage />} />
        
        {/* P2 - Secondary pages */}
        <Route path="/involucrate" element={<InvolucratePage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/aviso-de-privacidad" element={<AvisoPrivacidadPage />} />
      </Routes>
    </AnimatePresence>
  )
}

// =============================================================================
// APP COMPONENT
// =============================================================================

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Suspense fallback={<PageLoadingFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
