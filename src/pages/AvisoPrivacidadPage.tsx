import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function AvisoPrivacidadPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Aviso de Privacidad' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Aviso de Privacidad</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Última actualización: Marzo 2026
          </p>
          
          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
            <section className="mt-8">
              <h2 className="text-xl font-bold">Responsable del Tratamiento</h2>
              <p className="mt-4 text-muted-foreground">
                MUNET — Museo Nacional de Energía y Tecnología, con domicilio en
                Av. de los Compositores s/n, Bosque de Chapultepec II Secc.,
                Ciudad de México, es responsable del tratamiento de sus datos
                personales.
              </p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-bold">Datos Personales Recabados</h2>
              <p className="mt-4 text-muted-foreground">
                Para las finalidades señaladas en el presente aviso de privacidad,
                podemos recabar sus datos personales de distintas formas: cuando
                usted nos los proporciona directamente, cuando visita nuestro sitio
                web, y cuando obtenemos información a través de otras fuentes que
                están permitidas por la ley.
              </p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-bold">Finalidades del Tratamiento</h2>
              <p className="mt-4 text-muted-foreground">
                Sus datos personales serán utilizados para las siguientes
                finalidades: procesar sus compras de boletos, enviar información
                sobre eventos y actividades, responder a sus consultas, y mejorar
                nuestros servicios.
              </p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-bold">Derechos ARCO</h2>
              <p className="mt-4 text-muted-foreground">
                Usted tiene derecho a conocer qué datos personales tenemos de usted,
                para qué los utilizamos y las condiciones del uso que les damos
                (Acceso). Asimismo, es su derecho solicitar la corrección de su
                información personal en caso de que esté desactualizada, sea
                inexacta o incompleta (Rectificación).
              </p>
            </section>
            
            <section className="mt-8">
              <h2 className="text-xl font-bold">Contacto</h2>
              <p className="mt-4 text-muted-foreground">
                Para ejercer sus derechos o para cualquier duda relacionada con el
                tratamiento de sus datos personales, puede contactarnos en:{' '}
                <a
                  href="mailto:privacidad@museomunet.com"
                  className="text-primary hover:underline"
                >
                  privacidad@museomunet.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
