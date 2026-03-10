import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  pulse: number
  pulseSpeed: number
}

export default function EnergyCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []
    const mouse = { x: -1000, y: -1000 }

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    function createParticles() {
      if (!canvas) return
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000)
      particles = Array.from({ length: Math.min(count, 120) }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? '#FF6B35' : '#00D4AA',
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      }))
    }

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.vx += (dx / dist) * force * 0.15
          p.vy += (dy / dist) * force * 0.15
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = currentAlpha
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.globalAlpha = currentAlpha * 0.3
        ctx.fill()
      }

      // Draw connections
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = (1 - dist / 120) * 0.12
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    resize()
    createParticles()
    draw()
    window.addEventListener('resize', () => { resize(); createParticles() })
    canvas.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />
}
