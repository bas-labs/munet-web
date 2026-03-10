import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagneticWrap, GrainOverlay } from '@/components/ui/gsap-primitives'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Generate random particles
const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
}))

export default function NotFoundPage() {
  const glitchRef = useRef<HTMLHeadingElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  // Floating particles animation
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const dots = particlesRef.current?.querySelectorAll('.particle-dot')
      if (!dots) return

      dots.forEach((dot) => {
        const duration = 3 + Math.random() * 3
        const yDist = -(20 + Math.random() * 40)

        gsap.to(dot, {
          y: yDist,
          opacity: 0.2 + Math.random() * 0.4,
          duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, particlesRef)

    return () => ctx.revert()
  }, [])

  // 404 glitch effect
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const el = glitchRef.current
      if (!el) return

      const tl = gsap.timeline({ delay: 0.8 })

      // First burst
      tl.to(el, { clipPath: 'inset(20% 0 30% 0)', duration: 0.05 })
        .to(el, { clipPath: 'inset(50% 0 10% 0)', duration: 0.05 })
        .to(el, { clipPath: 'inset(10% 0 60% 0)', duration: 0.05 })
        .to(el, { clipPath: 'inset(0 0 0 0)', duration: 0.05 })
        // Second burst
        .to(el, { clipPath: 'inset(30% 0 20% 0)', duration: 0.05 }, '+=0.3')
        .to(el, { clipPath: 'inset(5% 0 50% 0)', duration: 0.05 })
        .to(el, { clipPath: 'inset(40% 0 10% 0)', duration: 0.05 })
        .to(el, { clipPath: 'inset(0 0 0 0)', duration: 0.05 })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#09090B] flex items-center justify-center px-4 overflow-hidden">
      <GrainOverlay />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle-dot absolute w-1 h-1 rounded-full bg-[#8DC63F]"
            style={{ left: p.left, top: p.top, opacity: 0.3 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md relative z-10"
      >
        {/* 404 Number */}
        <motion.h1
          ref={glitchRef}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="text-[120px] sm:text-[160px] font-bold text-[#8DC63F] leading-none"
        >
          404
        </motion.h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-4 mb-2">
          Pagina no encontrada
        </h2>
        <p className="text-white/60 mb-8">
          Lo sentimos, la pagina que buscas no existe o ha sido movida.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <MagneticWrap>
            <Button asChild size="lg" className="bg-[#8DC63F] hover:bg-[#8DC63F]/90 text-black">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Ir al inicio
              </Link>
            </Button>
          </MagneticWrap>
          <MagneticWrap>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Link to="/exposiciones">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ver exposiciones
              </Link>
            </Button>
          </MagneticWrap>
        </div>
      </motion.div>
    </div>
  )
}
