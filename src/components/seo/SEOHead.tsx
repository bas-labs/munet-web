import { useEffect } from 'react'

interface SEOHeadProps {
  /** Page title */
  title: string
  /** Meta description */
  description: string
  /** Canonical URL path (e.g., '/exposiciones') */
  canonicalPath?: string
  /** OG image path */
  ogImage?: string
  /** Page type for Open Graph */
  ogType?: 'website' | 'article'
  /** Additional keywords */
  keywords?: string[]
  /** Don't index this page */
  noIndex?: boolean
}

const BASE_URL = 'https://museomunet.com'
const DEFAULT_IMAGE = '/og-image.jpg'
const BASE_TITLE = 'MUNET — Museo Nacional de Energía y Tecnología'
const BASE_KEYWORDS = ['MUNET', 'museo', 'energía', 'tecnología', 'México', 'Chapultepec', 'CDMX']

export function SEOHead({
  title,
  description,
  canonicalPath = '',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  keywords = [],
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title === 'Inicio' 
    ? BASE_TITLE 
    : `${title} | MUNET`
  
  const canonicalUrl = `${BASE_URL}${canonicalPath}`
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`
  const allKeywords = [...BASE_KEYWORDS, ...keywords].join(', ')

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Helper to update or create meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Helper to update or create link tags
    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      
      if (!link) {
        link = document.createElement('link')
        link.rel = rel
        document.head.appendChild(link)
      }
      link.href = href
    }

    // Standard meta tags
    setMeta('description', description)
    setMeta('keywords', allKeywords)
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow')

    // Canonical URL
    setLink('canonical', canonicalUrl)

    // Open Graph
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:url', canonicalUrl, true)
    setMeta('og:image', imageUrl, true)
    setMeta('og:type', ogType, true)

    // Twitter Card
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', imageUrl)

    // Cleanup - restore defaults when component unmounts
    return () => {
      document.title = BASE_TITLE
    }
  }, [fullTitle, description, canonicalUrl, imageUrl, ogType, allKeywords, noIndex])

  return null
}

export default SEOHead
