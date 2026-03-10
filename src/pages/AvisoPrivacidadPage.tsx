/**
 * AvisoPrivacidadPage
 * Privacy notice page with full legal content in Spanish
 * Based on PRD Section 5.12 - Aviso de Privacidad
 */

import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Shield, FileText, AlertCircle } from 'lucide-react'

// Table of contents sections
const SECTIONS = [
  { id: 'responsable', label: 'Responsable del Tratamiento' },
  { id: 'datos-recabados', label: 'Datos Personales Recabados' },
  { id: 'finalidades', label: 'Finalidades del Tratamiento' },
  { id: 'transferencia', label: 'Transferencia de Datos' },
  { id: 'derechos-arco', label: 'Derechos ARCO' },
  { id: 'cookies', label: 'Cookies y Tecnologías de Rastreo' },
  { id: 'cambios', label: 'Cambios al Aviso' },
  { id: 'contacto', label: 'Contacto' },
]

export default function AvisoPrivacidadPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 py-16 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/images/pattern-energy.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: 'Aviso de Privacidad' }]}
            className="mb-8 text-primary-foreground/70"
          />
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Aviso de Privacidad
              </h1>
              <p className="mt-2 text-primary-foreground/70">
                Última actualización: Marzo 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Sidebar - Table of Contents (Desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Card variant="default">
                <CardContent className="py-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Contenido</span>
                  </div>
                  <nav className="space-y-1">
                    {SECTIONS.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="block w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-neutral max-w-none dark:prose-invert">
              {/* Important Notice */}
              <Card variant="glass" className="not-prose mb-8">
                <CardContent className="flex items-start gap-4 py-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm text-muted-foreground">
                    Este Aviso de Privacidad describe cómo MUNET — Museo Nacional
                    de Energía y Tecnología recopila, utiliza y protege su
                    información personal conforme a la Ley Federal de Protección
                    de Datos Personales en Posesión de los Particulares.
                  </p>
                </CardContent>
              </Card>

              {/* Section 1: Responsable del Tratamiento */}
              <section id="responsable" className="scroll-mt-24">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    1
                  </span>
                  Responsable del Tratamiento
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  MUNET — Museo Nacional de Energía y Tecnología, con domicilio
                  en Av. de los Compositores s/n, Bosque de Chapultepec II
                  Sección, Alcaldía Miguel Hidalgo, Ciudad de México, C.P.
                  11580, es el responsable del uso y protección de sus datos
                  personales, y al respecto le informamos lo siguiente:
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  El Museo Nacional de Energía y Tecnología es un fideicomiso
                  público constituido con la finalidad de promover la educación,
                  la divulgación científica y tecnológica, así como el
                  conocimiento sobre las diversas formas de energía y su
                  aprovechamiento sostenible.
                </p>
              </section>

              {/* Section 2: Datos Personales Recabados */}
              <section id="datos-recabados" className="scroll-mt-24 mt-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    2
                  </span>
                  Datos Personales Recabados
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Para las finalidades señaladas en el presente Aviso de
                  Privacidad, podemos recabar sus datos personales de distintas
                  formas: cuando usted nos los proporciona directamente al
                  visitar nuestro sitio web, realizar una compra de boletos,
                  inscribirse a actividades, solicitar información o enviar una
                  consulta a través de nuestros formularios de contacto.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Los datos personales que podemos recabar incluyen:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Datos de identificación:</strong> nombre completo,
                    fecha de nacimiento, nacionalidad.
                  </li>
                  <li>
                    <strong>Datos de contacto:</strong> correo electrónico,
                    número telefónico, dirección postal.
                  </li>
                  <li>
                    <strong>Datos financieros:</strong> información de tarjeta
                    de crédito o débito para procesar pagos (estos datos son
                    procesados directamente por nuestro proveedor de pagos
                    Stripe y no son almacenados en nuestros servidores).
                  </li>
                  <li>
                    <strong>Datos de navegación:</strong> dirección IP, tipo de
                    navegador, páginas visitadas, tiempo de permanencia.
                  </li>
                  <li>
                    <strong>Datos laborales o académicos:</strong> únicamente
                    cuando aplique para verificar elegibilidad de descuentos
                    (estudiantes, maestros, INAPAM).
                  </li>
                </ul>
              </section>

              {/* Section 3: Finalidades del Tratamiento */}
              <section id="finalidades" className="scroll-mt-24 mt-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    3
                  </span>
                  Finalidades del Tratamiento
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Sus datos personales serán utilizados para las siguientes
                  finalidades primarias, que son necesarias para la prestación
                  de nuestros servicios:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>
                    Procesar la compra de boletos y emisión de comprobantes
                    fiscales.
                  </li>
                  <li>
                    Gestionar reservaciones para visitas grupales y escolares.
                  </li>
                  <li>
                    Procesar inscripciones a talleres, cursos y actividades
                    educativas.
                  </li>
                  <li>
                    Atender solicitudes de información, quejas y sugerencias.
                  </li>
                  <li>
                    Gestionar solicitudes de renta de espacios para eventos.
                  </li>
                  <li>
                    Administrar el programa de voluntariado y bolsa de trabajo.
                  </li>
                </ul>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Adicionalmente, utilizaremos su información para las
                  siguientes finalidades secundarias que no son necesarias para
                  el servicio, pero nos permiten brindarle una mejor
                  experiencia:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>
                    Enviar comunicaciones sobre eventos, exposiciones y
                    actividades del museo.
                  </li>
                  <li>
                    Enviar nuestro boletín informativo (newsletter) con
                    novedades del museo.
                  </li>
                  <li>
                    Realizar estudios y estadísticas sobre el perfil de nuestros
                    visitantes.
                  </li>
                  <li>
                    Mejorar nuestros servicios con base en el análisis de
                    preferencias.
                  </li>
                </ul>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  En caso de que no desee que sus datos personales sean tratados
                  para las finalidades secundarias, puede manifestarlo enviando
                  un correo electrónico a{' '}
                  <a
                    href="mailto:privacidad@museomunet.com"
                    className="text-accent hover:underline"
                  >
                    privacidad@museomunet.com
                  </a>
                  .
                </p>
              </section>

              {/* Section 4: Transferencia de Datos */}
              <section id="transferencia" className="scroll-mt-24 mt-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    4
                  </span>
                  Transferencia de Datos
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Sus datos personales pueden ser transferidos y tratados dentro
                  y fuera del país por las siguientes entidades:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Procesadores de pago:</strong> Stripe, Inc. para el
                    procesamiento seguro de pagos con tarjeta.
                  </li>
                  <li>
                    <strong>Proveedores de servicios tecnológicos:</strong>{' '}
                    Amazon Web Services (AWS) para el almacenamiento seguro de
                    datos.
                  </li>
                  <li>
                    <strong>Autoridades competentes:</strong> cuando sea
                    requerido por ley o por orden judicial.
                  </li>
                </ul>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Le informamos que sus datos personales no serán compartidos
                  con terceros para fines publicitarios o de mercadotecnia sin
                  su consentimiento expreso.
                </p>
              </section>

              {/* Section 5: Derechos ARCO */}
              <section id="derechos-arco" className="scroll-mt-24 mt-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    5
                  </span>
                  Derechos ARCO
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Usted tiene derecho a conocer qué datos personales tenemos de
                  usted, para qué los utilizamos y las condiciones del uso que
                  les damos (Acceso). Asimismo, es su derecho solicitar la
                  corrección de su información personal en caso de que esté
                  desactualizada, sea inexacta o incompleta (Rectificación); que
                  la eliminemos de nuestros registros o bases de datos cuando
                  considere que la misma no está siendo utilizada adecuadamente
                  (Cancelación); así como oponerse al uso de sus datos
                  personales para fines específicos (Oposición). Estos derechos
                  se conocen como derechos ARCO.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Para el ejercicio de cualquiera de los derechos ARCO, usted
                  deberá presentar la solicitud respectiva enviando un correo
                  electrónico a{' '}
                  <a
                    href="mailto:privacidad@museomunet.com"
                    className="text-accent hover:underline"
                  >
                    privacidad@museomunet.com
                  </a>{' '}
                  con la siguiente información:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>Nombre completo del titular.</li>
                  <li>
                    Copia de identificación oficial vigente (INE, pasaporte o
                    cédula profesional).
                  </li>
                  <li>
                    Descripción clara y precisa de los datos personales respecto
                    de los que se busca ejercer alguno de los derechos ARCO.
                  </li>
                  <li>
                    Cualquier otro elemento o documento que facilite la
                    localización de los datos personales.
                  </li>
                </ul>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Daremos respuesta a su solicitud en un plazo máximo de 20 días
                  hábiles contados desde la fecha en que se reciba la solicitud.
                </p>
              </section>

              {/* Section 6: Cookies y Tecnologías de Rastreo */}
              <section id="cookies" className="scroll-mt-24 mt-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    6
                  </span>
                  Cookies y Tecnologías de Rastreo
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Le informamos que en nuestra página de internet utilizamos
                  cookies, web beacons y otras tecnologías a través de las
                  cuales es posible monitorear su comportamiento como usuario de
                  internet, así como brindarle un mejor servicio y experiencia
                  de usuario al navegar en nuestra página.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Los datos personales que obtenemos de estas tecnologías de
                  rastreo son los siguientes:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>Identificadores y tipo de dispositivo.</li>
                  <li>Navegador y sistema operativo.</li>
                  <li>Sitio web de referencia.</li>
                  <li>Páginas visitadas en nuestro sitio.</li>
                  <li>Fecha y hora de acceso.</li>
                  <li>Dirección IP.</li>
                </ul>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Estas cookies pueden deshabilitarse desde la configuración de
                  su navegador. Sin embargo, le informamos que al deshabilitar
                  las cookies, algunas funcionalidades de nuestro sitio web
                  podrían no estar disponibles.
                </p>
              </section>

              {/* Section 7: Cambios al Aviso */}
              <section id="cambios" className="scroll-mt-24 mt-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    7
                  </span>
                  Cambios al Aviso de Privacidad
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  El presente Aviso de Privacidad puede sufrir modificaciones,
                  cambios o actualizaciones derivadas de nuevos requerimientos
                  legales, de nuestras propias necesidades por los productos o
                  servicios que ofrecemos, de nuestras prácticas de privacidad,
                  de cambios en nuestro modelo de negocio, o por otras causas.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Nos comprometemos a mantenerlo informado sobre los cambios que
                  pueda sufrir el presente Aviso de Privacidad a través de
                  nuestra página de internet{' '}
                  <a
                    href="https://museomunet.com/aviso-de-privacidad"
                    className="text-accent hover:underline"
                  >
                    museomunet.com/aviso-de-privacidad
                  </a>
                  .
                </p>
              </section>

              {/* Section 8: Contacto */}
              <section id="contacto" className="scroll-mt-24 mt-12">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                    8
                  </span>
                  Contacto para Dudas
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Si tiene alguna duda o comentario sobre el presente Aviso de
                  Privacidad, puede contactarnos a través de los siguientes
                  medios:
                </p>
                <Card variant="default" className="not-prose mt-6">
                  <CardContent className="py-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          Correo electrónico de privacidad
                        </p>
                        <a
                          href="mailto:privacidad@museomunet.com"
                          className="text-accent hover:underline"
                        >
                          privacidad@museomunet.com
                        </a>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Tiempo de respuesta: máximo 5 días hábiles
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 rounded-lg bg-muted p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Domicilio del responsable:</strong>
                        <br />
                        Av. de los Compositores s/n, Bosque de Chapultepec II
                        Secc., Alcaldía Miguel Hidalgo, Ciudad de México, C.P.
                        11580
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Footer Note */}
              <div className="mt-12 rounded-lg border border-border bg-muted/50 p-6">
                <p className="text-sm text-muted-foreground">
                  Al proporcionar sus datos personales a través de nuestro sitio
                  web, usted acepta los términos y condiciones establecidos en
                  el presente Aviso de Privacidad. El uso continuado de nuestros
                  servicios constituye su aceptación de cualquier cambio que
                  realicemos a este aviso.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong>Fecha de última actualización:</strong> 1 de marzo de
                  2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
