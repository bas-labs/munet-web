import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion, type Variants, type Easing } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Exposiciones', href: '/exposiciones' },
  { label: 'Planifica tu Visita', href: '/planifica-tu-visita' },
  { label: 'Actividades', href: '/actividades' },
  { label: 'Quiénes Somos', href: '/quienes-somos' },
]

// Custom easing as proper tuple
const easeStandard: Easing = [0.4, 0, 0.2, 1]

// Animation variants
const menuVariants: Variants = {
  closed: {
    x: '100%',
    transition: {
      type: 'tween' as const,
      duration: 0.3,
      ease: easeStandard,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'tween' as const,
      duration: 0.3,
      ease: easeStandard,
    },
  },
}

const menuItemVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: easeStandard,
    },
  }),
}

const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="MUNET - Ir a inicio"
        >
          <img 
            src="/images/logo_verde.png" 
            alt="MUNET - Museo Nacional de Energía y Tecnología" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav 
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegación principal"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <Button asChild>
              <Link to="/boletos">Comprar Boletos</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation Drawer with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 top-16 z-40 bg-black/20 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.2 }}
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-navigation"
              className="fixed inset-0 top-16 z-50 bg-background md:hidden"
              aria-hidden={!mobileMenuOpen}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación móvil"
              variants={shouldReduceMotion ? undefined : menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav 
                className="flex flex-col gap-2 p-4"
                aria-label="Navegación principal móvil"
              >
                {navItems.map((item, i) => {
                  const isActive = location.pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      custom={i}
                      variants={shouldReduceMotion ? undefined : menuItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'block rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                          isActive
                            ? 'bg-muted text-foreground'
                            : 'text-muted-foreground'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  className="mt-4 pt-4 border-t border-border"
                  custom={navItems.length}
                  variants={shouldReduceMotion ? undefined : menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Button 
                    asChild 
                    className="w-full" 
                    size="lg"
                  >
                    <Link 
                      to="/boletos" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Comprar Boletos
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
