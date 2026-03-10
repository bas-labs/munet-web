import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [focused, setFocused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.newsletter-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Energy glow behind input */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full transition-all duration-1000 ${focused ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}`}
        style={{
          background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, rgba(0,212,170,0.08) 50%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 relative newsletter-content">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#8DC63F]/10 text-[#8DC63F] text-sm font-bold px-4 py-2 rounded-full mb-6">
            <Zap className="h-4 w-4" />
            Newsletter
          </div>

          <h2 className="text-display-md text-white mb-4">
            Mantente <span className="bg-gradient-to-r from-[#8DC63F] to-[#6BB52A] bg-clip-text text-transparent">Conectado</span>
          </h2>
          <p className="text-body-lg text-white/60 mb-10">
            Recibe noticias sobre exposiciones, actividades especiales y eventos exclusivos.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
            <div className={`relative rounded-2xl p-1 transition-all duration-500 ${focused ? 'bg-gradient-to-r from-[#8DC63F] to-[#6BB52A] shadow-[0_0_40px_rgba(255,107,53,0.3)]' : 'bg-white/10'}`}>
              <div className="flex flex-col sm:flex-row gap-2 bg-[#0a0a0a] rounded-xl p-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="tu@email.com"
                  required
                  disabled={status === 'loading' || status === 'success'}
                  className="flex-1 px-6 py-4 rounded-lg bg-transparent text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50 text-lg"
                />
                <Button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="bg-[#8DC63F] hover:bg-[#7BBF35] text-white px-8 py-4 text-base font-bold rounded-lg transition-all duration-300 disabled:opacity-50 shrink-0"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : status === 'success' ? '✓ ¡Suscrito!' : 'Suscribirse'}
                </Button>
              </div>
            </div>

            {status === 'success' && (
              <p className="mt-4 text-[#6BB52A] font-medium animate-pulse">
                ¡Gracias por suscribirte! Pronto recibirás noticias de MUNET.
              </p>
            )}
          </form>

          <p className="mt-6 text-sm text-white/30">
            Al suscribirte, aceptas nuestro{' '}
            <a href="/aviso-de-privacidad" className="underline hover:text-white/50 transition-colors">
              Aviso de Privacidad
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}
