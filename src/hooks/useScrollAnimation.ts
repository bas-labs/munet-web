import { useEffect, useRef, useState, useCallback } from 'react'

interface UseScrollAnimationOptions {
  /** Intersection threshold (0-1) */
  threshold?: number
  /** Only trigger once */
  once?: boolean
  /** Delay before marking as visible (ms) */
  delay?: number
  /** Root margin for earlier/later trigger */
  rootMargin?: string
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>
  isVisible: boolean
  hasAnimated: boolean
}

/**
 * useScrollAnimation - Custom hook using Intersection Observer
 * Triggers animations when elements enter viewport
 * 
 * @example
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true })
 * return <div ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'}>...</div>
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const { threshold = 0.1, once = true, delay = 0, rootMargin = '0px' } = options

  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
              setHasAnimated(true)
            }, delay)
          } else {
            setIsVisible(true)
            setHasAnimated(true)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      })
    },
    [once, delay]
  )

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, handleIntersection])

  return { ref, isVisible, hasAnimated }
}

/**
 * useParallax - Scroll-linked parallax effect
 * Returns a transform value based on scroll position
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      setOffset(scrollProgress * speed * 100)
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, offset }
}

export default useScrollAnimation
