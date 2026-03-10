import { cn } from '@/lib/utils'
import { categories, type GalleryCategory } from '@/data/gallery'

interface CategoryFilterProps {
  activeCategory: GalleryCategory | 'Todos'
  onCategoryChange: (category: GalleryCategory | 'Todos') => void
}

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
      <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              activeCategory === category
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
