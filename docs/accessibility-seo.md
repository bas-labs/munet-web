# Accessibility & SEO Documentation

## MUNET Web Platform - Phase 4 Implementation

**Date:** March 2026  
**Status:** Complete

---

## Table of Contents

1. [Accessibility (WCAG 2.1 AA)](#accessibility-wcag-21-aa)
2. [SEO Implementation](#seo-implementation)
3. [Structured Data Schemas](#structured-data-schemas)
4. [Testing Recommendations](#testing-recommendations)

---

## Accessibility (WCAG 2.1 AA)

### 1. Semantic HTML

All pages use proper semantic HTML5 elements:

- **Landmark elements:** `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<aside>`
- **Heading hierarchy:** Proper `h1` → `h2` → `h3` structure throughout
- **Lists:** `<ul>`, `<ol>`, `<li>` for navigation and content lists
- **Description lists:** `<dl>`, `<dt>`, `<dd>` for key-value content (hours, prices)
- **Address:** `<address>` element for location information

### 2. Keyboard Navigation

#### Skip Link
Located in `src/components/ui/skip-link.tsx`:
```tsx
<SkipLink targetId="main-content">
  Saltar al contenido principal
</SkipLink>
```

Features:
- Hidden by default (sr-only)
- Visible on focus
- Links to `#main-content` on the `<main>` element
- Spanish language text for Mexican audience

#### Focus Management
- All interactive elements are keyboard focusable
- Visible focus indicators via Tailwind's `focus-visible:` utilities
- `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Logical tab order follows visual order
- Mobile menu respects `tabIndex` when closed

### 3. ARIA Labels & Attributes

#### Navigation
```tsx
<nav aria-label="Navegación principal">
<nav aria-label="Enlaces de visita">
<nav aria-label="Redes sociales">
```

#### Active States
```tsx
<Link aria-current={isActive ? 'page' : undefined}>
```

#### Expandable Menus
```tsx
<button
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-navigation"
  aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
>
```

#### Tabs (Exposiciones)
```tsx
<div role="tablist" aria-label="Niveles del museo">
  <button role="tab" aria-selected={activeLevel === 1}>
  </button>
</div>
<div role="tabpanel" aria-labelledby="nivel1-tab">
```

### 4. Color Contrast

The design system uses high-contrast colors:
- Primary text: `#1A1A1A` on light backgrounds
- Muted text: sufficient contrast with `text-muted-foreground`
- Accent colors: `#FF6B35` (orange) and `#00D4AA` (teal) meet 3:1 for interactive elements

### 5. Form Accessibility

All forms include:
```tsx
<label htmlFor="newsletter-email" className="sr-only">
  Correo electrónico
</label>
<input
  id="newsletter-email"
  type="email"
  required
  aria-required="true"
  autoComplete="email"
/>
```

Features:
- Labels associated with inputs via `htmlFor`/`id`
- `aria-required="true"` for required fields
- `aria-describedby` for error messages
- Proper `autoComplete` attributes

---

## SEO Implementation

### 1. Base HTML (`index.html`)

```html
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#1A1A1A" />
  
  <!-- Base SEO -->
  <title>MUNET — Museo Nacional de Energía y Tecnología</title>
  <meta name="description" content="El primer museo nacional de México..." />
  <meta name="keywords" content="MUNET, museo, energía, tecnología..." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://museomunet.com/" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="MUNET" />
  <meta property="og:locale" content="es_MX" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  
  <!-- Geo Tags -->
  <meta name="geo.region" content="MX-CMX" />
  <meta name="geo.position" content="19.4194;-99.1998" />
</head>
```

### 2. Per-Page SEO Component

Located in `src/components/seo/SEOHead.tsx`:

```tsx
<SEOHead
  title="Exposiciones"
  description="Explora las exposiciones interactivas de MUNET..."
  canonicalPath="/exposiciones"
  keywords={['exposiciones museo', 'energía solar']}
  ogImage="/images/exposiciones-og.jpg"
/>
```

Features:
- Dynamic `document.title` update
- Meta description, keywords, robots
- Canonical URL
- Open Graph tags (title, description, image, url, type)
- Twitter Card tags
- Cleanup on unmount

### 3. Sitemap

Located at `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://museomunet.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- All 12 public routes -->
</urlset>
```

Pages included:
- Homepage (priority 1.0)
- Exposiciones, Planifica, Boletos (priority 0.9)
- Actividades, Quiénes Somos (priority 0.8)
- Servicios, Renta, Contacto (priority 0.7)
- Fotogalería, Involúcrate (priority 0.6)
- Aviso de Privacidad (priority 0.3)

### 4. Robots.txt

Located at `public/robots.txt`:

```
User-agent: *
Allow: /

Disallow: /checkout/
Disallow: /mis-boletos

Sitemap: https://museomunet.com/sitemap.xml
Crawl-delay: 1
```

---

## Structured Data Schemas

Located in `src/components/seo/StructuredData.tsx`:

### 1. Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MUNET — Museo Nacional de Energía y Tecnología",
  "url": "https://museomunet.com",
  "logo": "https://museomunet.com/logo.png",
  "description": "El primer museo nacional de México...",
  "address": {...},
  "contactPoint": {...},
  "sameAs": ["facebook", "instagram", "youtube", "tiktok"]
}
```

### 2. Museum Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Museum",
  "name": "MUNET — Museo Nacional de Energía y Tecnología",
  "description": "...",
  "url": "https://museomunet.com",
  "address": {...},
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.4194,
    "longitude": -99.1998
  },
  "openingHoursSpecification": [...],
  "priceRange": "$60-$120 MXN",
  "isAccessibleForFree": false,
  "publicAccess": true
}
```

### 3. Event Schema (for Actividades)

```tsx
<StructuredData
  type="event"
  eventData={{
    name: "Taller de Energía Solar",
    description: "...",
    startDate: "2026-03-15T10:00:00",
    price: 150
  }}
/>
```

### 4. BreadcrumbList Schema

```tsx
<StructuredData
  type="breadcrumb"
  breadcrumbItems={[
    { name: 'Inicio', path: '/' },
    { name: 'Exposiciones', path: '/exposiciones' },
  ]}
/>
```

---

## Testing Recommendations

### Accessibility Testing

1. **Automated Tools:**
   - axe DevTools browser extension
   - Lighthouse Accessibility audit (target: 90+)
   - WAVE Web Accessibility Evaluator

2. **Manual Testing:**
   - Keyboard-only navigation (Tab, Enter, Escape, Arrow keys)
   - Screen reader testing (VoiceOver, NVDA)
   - High contrast mode
   - 200% zoom without horizontal scrolling

3. **Checklist:**
   - [ ] All images have alt text
   - [ ] Skip link works on all pages
   - [ ] Forms have proper labels
   - [ ] Color contrast meets 4.5:1 for text
   - [ ] Focus indicators visible
   - [ ] Page has single h1
   - [ ] Heading hierarchy is correct

### SEO Testing

1. **Automated Tools:**
   - Google Search Console
   - Google Rich Results Test
   - Schema.org Validator
   - Lighthouse SEO audit

2. **Manual Checks:**
   - [ ] Each page has unique title and description
   - [ ] Canonical URLs are correct
   - [ ] Open Graph tags render correctly (Facebook Debugger)
   - [ ] Twitter Card preview correct
   - [ ] sitemap.xml accessible at /sitemap.xml
   - [ ] robots.txt accessible at /robots.txt
   - [ ] Structured data validates without errors

### Performance Impact

SEO components are lightweight:
- SEOHead: ~2KB (uses native DOM APIs)
- StructuredData: ~4KB (JSON-LD injection)
- No external dependencies added

---

## File Reference

| File | Purpose |
|------|---------|
| `src/components/ui/skip-link.tsx` | Skip to main content link |
| `src/components/seo/SEOHead.tsx` | Page-level meta tags |
| `src/components/seo/StructuredData.tsx` | JSON-LD schemas |
| `src/components/seo/index.ts` | SEO module exports |
| `src/components/layout/PageLayout.tsx` | Layout with skip link + main id |
| `src/components/layout/Header.tsx` | Accessible header navigation |
| `src/components/layout/Footer.tsx` | Accessible footer with landmark roles |
| `public/sitemap.xml` | XML sitemap for search engines |
| `public/robots.txt` | Crawler directives |
| `index.html` | Base HTML with default SEO tags |

---

## Implementation Notes

1. **Language:** All UI copy is in Spanish (es-MX) as per PRD requirements
2. **SPA Considerations:** SEO components use `useEffect` to dynamically update meta tags for client-side routing
3. **Canonical URLs:** Base URL is `https://museomunet.com`
4. **OG Image:** Default image at `/og-image.jpg` (1200x630 recommended)
5. **No React Helmet:** Implementation uses native DOM APIs to avoid additional dependencies

---

*Last updated: March 2026*
