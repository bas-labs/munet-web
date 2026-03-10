import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Helpers ─── */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ═══════════════════════════════════════════════════════════════
   1. MagneticWrap
   ═══════════════════════════════════════════════════════════════ */

interface MagneticWrapProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticWrap({ children, strength = 0.2, className = 'inline-block' }: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: 'power2.out' })
    },
    [strength],
  )

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
    }
  }, [])

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   2. TiltCard
   ═══════════════════════════════════════════════════════════════ */

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
}

export function TiltCard({ children, className = '', maxTilt = 12, perspective = 800 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(el, {
        rotateY: x * maxTilt,
        rotateX: -y * maxTilt,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: perspective,
      })
    },
    [maxTilt, perspective],
  )

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' })
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3. AnimatedCounter
   ═══════════════════════════════════════════════════════════════ */

interface AnimatedCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  triggerStart?: string
}

export function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  duration = 2.5,
  triggerStart = 'top 80%',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (ref.current) ref.current.textContent = prefix + Math.round(end) + suffix
      return
    }

    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: triggerStart, once: true },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = prefix + Math.round(obj.val) + suffix
        },
      })
    })
    return () => ctx.revert()
  }, [end, prefix, suffix, duration, triggerStart])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   4. SectionReveal
   ═══════════════════════════════════════════════════════════════ */

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'bottom' | 'top' | 'left' | 'diagonal'
  triggerStart?: string
}

const clipPathMap: Record<string, string> = {
  bottom: 'inset(100% 0 0 0)',
  top: 'inset(0 0 100% 0)',
  left: 'inset(0 100% 0 0)',
  diagonal: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
}

const clipPathEnd: Record<string, string> = {
  bottom: 'inset(0 0 0 0)',
  top: 'inset(0 0 0 0)',
  left: 'inset(0 0 0 0)',
  diagonal: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
}

export function SectionReveal({
  children,
  className,
  direction = 'bottom',
  triggerStart = 'top 90%',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: clipPathMap[direction] },
        {
          clipPath: clipPathEnd[direction],
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: triggerStart,
            once: true,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [direction, triggerStart])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   5. TextClipReveal
   ═══════════════════════════════════════════════════════════════ */

interface TextClipRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'right' | 'left' | 'up'
}

const textClipStart: Record<string, string> = {
  right: 'inset(0 100% 0 0)',
  left: 'inset(0 0 0 100%)',
  up: 'inset(100% 0 0 0)',
}

const textClipEnd: Record<string, string> = {
  right: 'inset(0 0% 0 0)',
  left: 'inset(0 0 0 0%)',
  up: 'inset(0% 0 0 0)',
}

export function TextClipReveal({ children, className, delay = 0, direction = 'right' }: TextClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.set(ref.current, { clipPath: textClipStart[direction] })
      gsap.to(ref.current, {
        clipPath: textClipEnd[direction],
        duration: 0.8,
        delay,
        ease: 'power4.inOut',
      })
    }, ref)

    return () => ctx.revert()
  }, [delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   6. GrainOverlay
   ═══════════════════════════════════════════════════════════════ */

interface GrainOverlayProps {
  opacity?: number
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

export function GrainOverlay({ opacity = 0.03 }: GrainOverlayProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{
        backgroundImage: NOISE_SVG,
        opacity,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
      aria-hidden="true"
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   7. AmbientGlow
   ═══════════════════════════════════════════════════════════════ */

interface AmbientGlowProps {
  color?: string
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center'
  size?: number
  opacity?: number
}

const positionStyles: Record<string, string> = {
  'top-right': 'top-[15%] right-[10%]',
  'top-left': 'top-[15%] left-[10%]',
  'bottom-right': 'bottom-[15%] right-[10%]',
  'bottom-left': 'bottom-[15%] left-[10%]',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

export function AmbientGlow({
  color = '#8DC63F',
  position = 'top-right',
  size = 800,
  opacity = 0.08,
}: AmbientGlowProps) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[200px] z-0 ${positionStyles[position]}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, '0')} 0%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   8. useStaggerReveal (hook)
   ═══════════════════════════════════════════════════════════════ */

export function useStaggerReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  itemSelector: string,
  options?: {
    y?: number
    stagger?: number
    triggerStart?: string
  },
): void {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const y = options?.y ?? 40
    const stagger = options?.stagger ?? 0.08
    const triggerStart = options?.triggerStart ?? 'top 85%'

    const ctx = gsap.context(() => {
      gsap.from(itemSelector, {
        y,
        opacity: 0,
        duration: 0.6,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          once: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, itemSelector, options?.y, options?.stagger, options?.triggerStart])
}
