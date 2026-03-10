import { PageLayout } from '@/components/layout'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default function InvolucratePage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Involúcrate' }]} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Involúcrate</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Únete a nosotros como voluntario, donador o aliado corporativo.
          </p>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {/* Voluntariado */}
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Voluntariado</h2>
              <p className="mt-2 text-muted-foreground">
                Sé parte del equipo MUNET y contribuye a la educación sobre
                energía y tecnología.
              </p>
              <Button className="mt-4">Aplicar</Button>
            </div>
            
            {/* Donaciones */}
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Donaciones</h2>
              <p className="mt-2 text-muted-foreground">
                Apoya nuestra misión educativa con tu contribución.
              </p>
              <Button className="mt-4">Donar</Button>
            </div>
            
            {/* Alianzas */}
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Alianzas Corporativas</h2>
              <p className="mt-2 text-muted-foreground">
                Establece una alianza estratégica con MUNET.
              </p>
              <Button className="mt-4">Conocer Más</Button>
            </div>
            
            {/* Bolsa de Trabajo */}
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold">Bolsa de Trabajo</h2>
              <p className="mt-2 text-muted-foreground">
                Conoce las oportunidades laborales en MUNET.
              </p>
              <Button className="mt-4">Ver Vacantes</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
