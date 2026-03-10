import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ExhibitionCardProps {
  title: string
  description: string
  level: 1 | 2
  imageUrl?: string
}

export function ExhibitionCard({ title, description, level, imageUrl }: ExhibitionCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      {/* Image Placeholder */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <div className="text-4xl opacity-20">⚡</div>
          </div>
        )}
        
        {/* Level Badge */}
        <span className={cn(
          "absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full",
          level === 1 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary text-secondary-foreground border border-border"
        )}>
          Nivel {level}
        </span>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
