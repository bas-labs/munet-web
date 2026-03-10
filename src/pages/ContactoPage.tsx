import { Mail, MapPin, Phone } from 'lucide-react'
import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default function ContactoPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Contacto' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Contacto</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Tienes preguntas? Estamos aquí para ayudarte.
          </p>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Envíanos un Mensaje</h2>
              <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium">Nombre</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Asunto</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Mensaje</label>
                  <textarea
                    rows={5}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  />
                </div>
                <Button type="submit" size="lg">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold">Información de Contacto</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:contacto@museomunet.com"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        contacto@museomunet.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-muted-foreground">+52 (55) 1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-muted-foreground">
                        Av. de los Compositores s/n,
                        <br />
                        Bosque de Chapultepec II Secc.,
                        <br />
                        Ciudad de México
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="h-64 rounded-lg bg-muted">
                {/* Map embed placeholder */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
