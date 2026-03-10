import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const images = [
  '/images/fotogaleria/exteriormuseo/RHG_3698And8more_Optimizer.jpg',
  '/images/fotogaleria/exteriormuseo/RHG_3725And8more_Optimizer---copia.jpg',
  '/images/fotogaleria/exteriormuseo/RHG_3752And8more_Optimizer.jpg',
  '/images/fotogaleria/exteriormuseo/RHG_3860And8more_Optimizer.jpg',
  '/images/fotogaleria/exteriormuseo/RHG_3941And8more_Optimizer.jpg',
  '/images/fotogaleria/exteriormuseo/RHG_4004And8more_Optimizer.jpg',
]

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

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
    <div className="marquee-set flex shrink-0 items-center gap-4" key={key}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="h-[200px] w-auto rounded-lg shrink-0 grayscale hover:grayscale-0 transition-all duration-500 object-cover"
        />
      ))}
    </div>
  )

  return (
    <div className="relative overflow-hidden py-8 md:py-12 bg-white select-none">
      <div ref={trackRef} className="flex items-center gap-4 will-change-transform">
        {renderSet('a')}
        {renderSet('b')}
        {renderSet('c')}
      </div>
    </div>
  )
}
