import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    
    // Simulate API call - replace with actual implementation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setStatus('success')
    setEmail('')
    
    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section className="py-20 lg:py-32 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Manténte Informado
          </h2>
          <p className="text-lg text-neutral-600 mb-10">
            Recibe noticias sobre exposiciones, actividades especiales y eventos exclusivos 
            directamente en tu correo.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-6 py-4 rounded-xl border border-neutral-300 bg-white 
                         text-neutral-900 placeholder:text-neutral-400
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200"
              />
              <Button
                type="submit"
                size="lg"
                disabled={status === 'loading' || status === 'success'}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg 
                         font-semibold rounded-xl transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Enviando...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2">
                    <span>✓</span>
                    ¡Suscrito!
                  </span>
                ) : (
                  'Suscribirse'
                )}
              </Button>
            </div>

            {/* Success message */}
            {status === 'success' && (
              <p className="mt-4 text-green-600 font-medium animate-fade-in">
                ¡Gracias por suscribirte! Pronto recibirás noticias de MUNET.
              </p>
            )}
          </form>

          {/* Privacy note */}
          <p className="mt-6 text-sm text-neutral-500">
            Al suscribirte, aceptas nuestro{' '}
            <a href="/aviso-de-privacidad" className="underline hover:text-neutral-700">
              Aviso de Privacidad
            </a>
            . Puedes cancelar en cualquier momento.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
