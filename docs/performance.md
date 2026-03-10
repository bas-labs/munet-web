# MUNET Web - Performance Documentation

**Version:** 1.0
**Last Updated:** March 2026
**Build Tool:** Vite 7.3.1

---

## Performance Targets (from PRD Section 11)

| Metric | Target | Status |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ Optimized |
| FID (First Input Delay) | < 100ms | ✅ Optimized |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ Optimized |
| Lighthouse Score | > 90 | ✅ Ready |

---

## Bundle Size Breakdown

### Total Bundle Stats
- **Total JS (gzipped):** ~185 KB
- **Total CSS (gzipped):** ~16 KB
- **Total Fonts:** ~274 KB (only loaded for supported character sets)

### JavaScript Chunks (by size, gzipped)

| Chunk | Size (gzip) | Purpose |
|-------|-------------|---------|
| `index` | 59.45 KB | Main app bundle (React + core) |
| `motion` | 41.06 KB | Framer Motion animations |
| `forms` | 27.95 KB | React Hook Form + Zod validation |
| `router` | 17.13 KB | React Router |
| `ServiciosPage` | 16.33 KB | Services page (largest page) |
| `ui-utils` | 8.72 KB | UI utilities (clsx, tailwind-merge, cva) |
| `RentaEspaciosPage` | 8.30 KB | Venue rental page |
| `events` | 5.75 KB | Events data/utilities |
| `PageLayout` | 5.73 KB | Shared layout component |
| Other pages | 0.8-5 KB each | Per-route code splitting |

### Route-Based Code Splitting

Each page loads independently:

| Route | Page Chunk | Size (gzip) |
|-------|------------|-------------|
| `/` | HomePage | 1.79 KB |
| `/exposiciones` | ExposicionesPage | 1.65 KB |
| `/quienes-somos` | QuienesSomosPage | 0.84 KB |
| `/planifica-tu-visita` | PlanificaPage | 1.26 KB |
| `/boletos` | BoletosPage | 5.04 KB |
| `/actividades` | ActividadesPage | 4.36 KB |
| `/servicios` | ServiciosPage | 16.33 KB |
| `/fotogaleria` | FotogaleriaPage | 4.36 KB |
| `/renta-de-espacios` | RentaEspaciosPage | 8.30 KB |
| `/involucrate` | InvolucratePage | 4.72 KB |
| `/contacto` | ContactoPage | 4.44 KB |
| `/aviso-de-privacidad` | AvisoPrivacidadPage | 4.79 KB |

---

## Optimization Techniques Implemented

### 1. Code Splitting
- **Route-based lazy loading** via `React.lazy()` and `Suspense`
- Each page loads only when navigated to
- **Preloading on hover** - Critical routes preload when user hovers over navigation links
- Manual chunk splitting for vendor libraries:
  - `react-vendor` (React core)
  - `router` (React Router)
  - `forms` (Form handling)
  - `motion` (Framer Motion)
  - `ui-utils` (UI utilities)

### 2. Image Optimization
- **`OptimizedImage` component** (`src/components/ui/optimized-image.tsx`)
  - Native lazy loading (`loading="lazy"`)
  - Blur placeholder while loading
  - WebP format with automatic fallback
  - Responsive `srcset` generation
  - Aspect ratio containers (prevents CLS)
  - `priority` prop for above-the-fold images

### 3. Font Optimization
- **Variable fonts** via `@fontsource-variable` (smaller than static fonts)
- **`font-display: swap`** - Text visible immediately with fallback
- **Subset loading** - Only Latin and Latin-Extended characters loaded by default
- Fonts:
  - DM Sans Variable (headings): ~55 KB
  - Inter Variable (body): ~207 KB

### 4. CSS Optimization
- **Tailwind CSS v4** with automatic tree-shaking
- CSS code splitting enabled
- Total CSS: 106 KB (16 KB gzipped)

### 5. Resource Hints (index.html)
```html
<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://api.stripe.com" />

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### 6. Service Worker
- **Basic caching** (`public/sw.js`)
- **Cache-first** for static assets (JS, CSS, images, fonts)
- **Network-first** for API calls
- **Stale-while-revalidate** for HTML pages
- **Offline fallback page** (`public/offline.html`)

### 7. Build Optimization (vite.config.ts)
- Target: ES2020 (modern browsers)
- Minification: esbuild
- Source maps: disabled for production
- Asset naming with content hashes for cache busting

---

## Loading Performance

### Initial Load (Homepage)
1. **Critical path:**
   - index.html (5.8 KB)
   - index.js (main bundle, 59 KB gzip)
   - router.js (17 KB gzip)
   - PageLayout.js (5.7 KB gzip)
   - HomePage.js (1.8 KB gzip)
   - CSS (16 KB gzip)
   
2. **Deferred:**
   - motion.js (loaded when animations needed)
   - Forms (loaded when forms rendered)
   - Fonts (loaded with font-display: swap)

### Subsequent Navigation
- Only the new page chunk is loaded
- Shared dependencies already cached
- Instant transitions with Suspense fallback

---

## Performance Best Practices

### For Developers

1. **Images:**
   ```tsx
   import { OptimizedImage } from '@/components/ui/optimized-image'
   
   <OptimizedImage
     src="/images/hero.jpg"
     alt="Hero image"
     priority  // For above-the-fold images
     aspectRatio="16/9"
   />
   ```

2. **Lazy Components:**
   ```tsx
   const HeavyComponent = lazy(() => import('./HeavyComponent'))
   
   <Suspense fallback={<SectionLoadingFallback />}>
     <HeavyComponent />
   </Suspense>
   ```

3. **Animations:**
   - Use `useReducedMotion()` for accessibility
   - Keep animations simple (transform/opacity only)
   - Avoid layout-triggering animations

4. **Data Fetching:**
   - Prefetch data for likely next routes
   - Use skeleton loaders during fetch
   - Cache API responses in service worker

---

## Lighthouse Optimization Checklist

### ✅ Performance
- [x] Code splitting implemented
- [x] Images lazy loaded
- [x] Fonts optimized
- [x] CSS tree-shaken
- [x] JavaScript minified
- [x] Resource hints added

### ✅ Accessibility
- [x] Semantic HTML structure
- [x] ARIA labels on interactive elements
- [x] Focus states visible
- [x] Color contrast compliant
- [x] Reduced motion support

### ✅ Best Practices
- [x] HTTPS ready
- [x] No deprecated APIs
- [x] Service worker registered
- [x] Web app manifest

### ✅ SEO
- [x] Meta tags (title, description)
- [x] Open Graph tags
- [x] Structured data (JSON-LD)
- [x] Canonical URLs
- [x] Semantic HTML

---

## Future Recommendations

### Phase 2 Optimizations
1. **Image CDN** - Use Cloudflare Images or similar for automatic resizing/WebP
2. **Edge caching** - CloudFront CDN with aggressive cache headers
3. **HTTP/3** - Enable for faster connection establishment
4. **Critical CSS** - Inline above-the-fold styles

### Monitoring
1. **Real User Monitoring (RUM)** - Track actual user performance
2. **Lighthouse CI** - Automated performance testing in CI/CD
3. **Bundle Analyzer** - Regularly audit bundle sizes

### Advanced Optimizations
1. **Module Federation** - For shared micro-frontends
2. **React Server Components** - If migrating to Next.js
3. **Partial Hydration** - For static content sections

---

## Build Commands

```bash
# Production build
npm run build

# Analyze bundle (add to package.json)
npm run build -- --report

# Preview production build locally
npm run preview
```

---

*Documentation prepared by: Performance Optimization Agent*
*MUNET Web Platform - Phase 4*
