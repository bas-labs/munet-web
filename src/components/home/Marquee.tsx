import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const items = [
  'ENERGÍA',
  'TECNOLOGÍA',
  'SOSTENIBILIDAD',
  'INNOVACIÓN',
  'CIENCIA',
  'FUTURO',
  'DESCUBRIMIENTO',
  'TRANSFORMACIÓN',
]

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return
      // Get width of one set of items
      const firstSet = track.querySelector('.marquee-set') as HTMLElement
      if (!firstSet) return
      const w = firstSet.offsetWidth

      gsap.to(track, {
        x: -w,
        duration: 30,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  const renderSet = (key: string) => (
    <div className="marquee-set flex shrink-0 items-center gap-8" key={key}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8 shrink-0">
          <span className="font-display text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap">
            {item}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#8DC63F] shrink-0" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative overflow-hidden py-8 md:py-12 bg-white text-[#09090B] select-none">
      <div ref={trackRef} className="flex items-center gap-8 will-change-transform">
        {renderSet('a')}
        {renderSet('b')}
        {renderSet('c')}
      </div>
    </div>
  )
}
