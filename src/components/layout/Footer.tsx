import { Link } from 'react-router-dom'
import { Facebook, Youtube, Instagram, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

// TikTok icon (not in lucide)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  )
}

const footerLinks = {
  visita: {
    title: 'Visita',
    links: [
      { label: 'Horarios', href: '/planifica-tu-visita' },
      { label: 'Cómo Llegar', href: '/planifica-tu-visita' },
      { label: 'Boletos', href: '/boletos' },
      { label: 'Servicios', href: '/servicios' },
    ],
  },
  explora: {
    title: 'Explora',
    links: [
      { label: 'Exposiciones', href: '/exposiciones' },
      { label: 'Actividades', href: '/actividades' },
      { label: 'Fotogalería', href: '/fotogaleria' },
    ],
  },
  institucional: {
    title: 'Institucional',
    links: [
      { label: 'Quiénes Somos', href: '/quienes-somos' },
      { label: 'Renta de Espacios', href: '/renta-de-espacios' },
      { label: 'Involúcrate', href: '/involucrate' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Aviso de Privacidad', href: '/aviso-de-privacidad' },
      { label: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
    ],
  },
}

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com/museomunet', icon: Facebook },
  { label: 'YouTube', href: 'https://youtube.com/museomunet', icon: Youtube },
  { label: 'Instagram', href: 'https://instagram.com/museomunet', icon: Instagram },
  { label: 'TikTok', href: 'https://tiktok.com/@museomunet', icon: TikTokIcon },
]

export default function Footer() {
  return (
    <footer 
      className="border-t border-border bg-muted/30"
      role="contentinfo"
      aria-label="Pie de página del sitio"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-10">
          <Link to="/" aria-label="MUNET - Ir a inicio">
            <img 
              src="/images/logo_verde.png" 
              alt="MUNET" 
              className="h-12 w-auto"
            />
          </Link>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Column 1: Visita */}
          <nav aria-label="Enlaces de visita">
            <h2 className="text-sm font-semibold text-foreground">
              {footerLinks.visita.title}
            </h2>
            <ul className="mt-4 space-y-3" role="list">
              {footerLinks.visita.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2: Explora */}
          <nav aria-label="Enlaces para explorar">
            <h2 className="text-sm font-semibold text-foreground">
              {footerLinks.explora.title}
            </h2>
            <ul className="mt-4 space-y-3" role="list">
              {footerLinks.explora.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Institucional */}
          <nav aria-label="Enlaces institucionales">
            <h2 className="text-sm font-semibold text-foreground">
              {footerLinks.institucional.title}
            </h2>
            <ul className="mt-4 space-y-3" role="list">
              {footerLinks.institucional.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Legal */}
          <nav aria-label="Enlaces legales">
            <h2 className="text-sm font-semibold text-foreground">
              {footerLinks.legal.title}
            </h2>
            <ul className="mt-4 space-y-3" role="list">
              {footerLinks.legal.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter & Social Section */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Newsletter */}
            <section aria-labelledby="newsletter-heading">
              <h2 id="newsletter-heading" className="text-sm font-semibold text-foreground">
                Mantente Informado
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Suscríbete a nuestro boletín para recibir noticias y eventos.
              </p>
              <form 
                className="mt-4 flex gap-2" 
                onSubmit={(e) => e.preventDefault()}
                aria-label="Formulario de suscripción al boletín"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                  aria-required="true"
                  autoComplete="email"
                />
                <Button type="submit">Suscribirse</Button>
              </form>
            </section>

            {/* Contact & Social */}
            <section className="md:text-right" aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-sm font-semibold text-foreground">
                Contacto
              </h2>
              <a
                href="mailto:contacto@museomunet.com"
                className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>contacto@museomunet.com</span>
              </a>
              <address className="mt-2 text-sm text-muted-foreground not-italic">
                Av. de los Compositores s/n, Bosque de Chapultepec II Secc.
              </address>

              {/* Social Icons */}
              <nav 
                className="mt-4 flex gap-4 md:justify-end"
                aria-label="Redes sociales"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded p-1"
                    aria-label={`Visita nuestro perfil de ${social.label}`}
                  >
                    <social.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </section>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MUNET — Museo Nacional de Energía y Tecnología.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
