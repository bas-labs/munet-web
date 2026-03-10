import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4">MUNET</h1>
      <p className="text-muted-foreground mb-8">
        Museo Nacional de Energía y Tecnología
      </p>
      <Button>Comprar Boletos</Button>
    </div>
  )
}
