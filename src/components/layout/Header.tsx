import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion, type Variants, type Easing } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Exposiciones', href: '/exposiciones' },
  { label: 'Planifica tu Visita', href: '/planifica-tu-visita' },
  { label: 'Actividades', href: '/actividades' },
  { label: 'Quiénes Somos', href: '/quienes-somos' },
]

const easeStandard: Easing = [0.4, 0, 0.2, 1]

const menuVariants: Variants = {
  closed: {
    x: '100%',
    transition: { type: 'tween' as const, duration: 0.3, ease: easeStandard },
  },
  open: {
    x: 0,
    transition: { type: 'tween' as const, duration: 0.3, ease: easeStandard },
  },
}

const menuItemVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: easeStandard },
  }),
}

const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const navRef = useRef<HTMLElement>(null)
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0 })

  // Track scroll for subtle header elevation change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  // Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Calculate hover pill position
  const handleNavHover = (idx: number, el: HTMLAnchorElement) => {
    setHoverIdx(idx)
    const nav = navRef.current
    if (!nav) return
    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setHoverStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    })
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500',
        scrolled
          ? 'bg-[#09090B]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(141,198,63,0.1),0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-[#09090B] shadow-none'
      )}
      role="banner"
    >
      {/* Subtle green accent line at top */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8DC63F]/40 to-transparent transition-opacity duration-500',
          scrolled ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
          aria-label="MUNET - Ir a inicio"
        >
          <img
            src="/images/logo_bco.png"
            alt="MUNET - Museo Nacional de Energía y Tecnología"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          ref={navRef}
          className="relative hidden items-center gap-0.5 md:flex"
          aria-label="Navegación principal"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* Hover pill background */}
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-white/[0.06] transition-all duration-300 ease-out pointer-events-none',
              hoverIdx !== null ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              left: hoverStyle.left,
              width: hoverStyle.width,
            }}
            aria-hidden="true"
          />

          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                onMouseEnter={(e) => handleNavHover(idx, e.currentTarget)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
                  isActive
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/90'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-[#8DC63F]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          >
            <Link
              to="/boletos"
              className="group relative inline-flex items-center gap-2 rounded-full bg-[#8DC63F] px-5 py-2 text-[13px] font-semibold text-[#09090B] transition-all duration-300 hover:bg-[#9DD34F] hover:shadow-[0_0_20px_rgba(141,198,63,0.3)]"
            >
              Comprar Boletos
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-white/70 hover:text-white hover:bg-white/[0.06] md:hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
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
                <X className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm md:hidden"
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
              className="fixed inset-0 top-16 z-50 bg-[#09090B] md:hidden"
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
                className="flex flex-col gap-1 p-5"
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
                          'flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]',
                          isActive
                            ? 'bg-white/[0.06] text-white'
                            : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#8DC63F] flex-shrink-0" />
                        )}
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  className="mt-6 pt-6 border-t border-white/[0.06]"
                  custom={navItems.length}
                  variants={shouldReduceMotion ? undefined : menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    to="/boletos"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-[#8DC63F] px-6 py-3.5 text-base font-semibold text-[#09090B] transition-all hover:bg-[#9DD34F]"
                  >
                    Comprar Boletos
                    <span>&rarr;</span>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
