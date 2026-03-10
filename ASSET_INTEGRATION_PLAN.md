# MUNET Asset Integration Plan

All assets have been scraped from museomunet.com and downloaded to `public/images/`.

---

## Asset Inventory

### Core Branding
| File | Path | Description |
|------|------|-------------|
| `logo_verde.png` | `/images/logo_verde.png` | Green MUNET logo (primary) |
| `logo_bco.png` | `/images/logo_bco.png` | White MUNET logo (for dark backgrounds) |
| `popup.jpg` | `/images/popup.jpg` | Promotional popup image |
| `banner_placeholder.mp4` | `/images/banner_placeholder.mp4` | Hero video (dark museum interior, glowing exhibits) |

### Social Icons
| File | Path |
|------|------|
| `rsfa.png` | `/images/icons/social/rsfa.png` — Facebook |
| `rsin.png` | `/images/icons/social/rsin.png` — Instagram |
| `rsti.png` | `/images/icons/social/rsti.png` — TikTok |
| `rsyo.png` | `/images/icons/social/rsyo.png` — YouTube |

### Exhibition Level Maps
| File | Path | Description |
|------|------|-------------|
| `nivel1.png` | `/images/nivel1.png` | Floor plan — Level 1 (Energía Nuclear, Combustibles Fósiles, Sostenibilidad) |
| `nivel2.png` | `/images/nivel2.png` | Floor plan — Level 2 (Básicos, Electricidad) |

### Renta de Espacios (5 images)
| File | Space |
|------|-------|
| `escenario-de-proscenio.png` | Auditorio Principal (proscenium stage) |
| `escenario.png` | Auditorio stage view |
| `exposicion.png` | Exhibition/expo hall |
| `foro.png` | Foro space |
| `profesor.png` | Workshop/classroom |

### Fotogalería — 28 photos across 5 sections
1. **Columnas de la Sustentabilidad** (`torresdeluz/`) — 5 photos
2. **Experiencia MUNET** (`salainteractiva/`) — 5 photos
3. **Exposiciones** (`exposiciones/`) — 5 photos
4. **Auditorio** (`auditorio/`) — 5 photos
5. **Exterior Museo** (`exteriormuseo/`) — 8 photos ⭐ (the building)

---

## Page-by-Page Integration Prompts

### 1. HomePage.tsx

**PROMPT:** Redesign the MUNET homepage to lead with a cinematic full-viewport hero using `banner_placeholder.mp4` as a looping muted autoplay video background. Overlay with a dark gradient (black 60% opacity) and place the quote "EL CONOCIMIENTO NO TE CREA NI TE DESTRUYE. TE TRANSFORMA." in massive display font with GSAP character-by-character clip-path reveal animation. Use `logo_bco.png` as a subtle centered watermark above the text.

Below the hero, add a horizontal auto-scrolling photo marquee strip using 6 exterior museum photos from `/images/fotogaleria/exteriormuseo/` — infinite CSS scroll, no gaps, slight grayscale filter with orange tint on hover.

Add an "Exposiciones" preview section with two overlapping museum photos at different sizes (asymmetric editorial layout — one large 60% width, one smaller overlapping at 35% width offset down-right) using photos from `/images/fotogaleria/exposiciones/`. Orange gradient text "Descubre nuestras exposiciones" with a CTA to /exposiciones.

Add a stats section using exterior museum photos as darkened card backgrounds behind visitor counts, exhibition counts, etc. Numbers animate with GSAP ScrollTrigger counters.

Newsletter section: glowing teal input field with energy pulse animation, blurred museum interior photo as background.

**Assets:** `banner_placeholder.mp4`, `logo_bco.png`, 6x `exteriormuseo/*.jpg`, 2x `exposiciones/*.jpg`

---

### 2. QuienesSomosPage.tsx

**PROMPT:** Create an immersive "Quiénes Somos" page. Start with a full-width exterior museum photo (`exteriormuseo/RHG_3698And8more_Optimizer.jpg`) as a parallax page banner with dark overlay and the title "Quiénes Somos" in large display font.

Below, create a 4-card grid for: Antecedentes, Proyecto, Financiamiento, Principios Rectores. Each card uses a different gallery photo as background with a dark gradient overlay and white text title. On click, cards expand into a drawer/modal showing the full historical text (see content reference below).

Add a timeline component showing key dates: 1942 (land grant from DDF to CFE), 1970 (MUTEC inauguration), 1993 (donation formalized), 2000 (remodel), present (MUNET transformation). Each timeline node has a small circular photo thumbnail. Use `logo_verde.png` in the origin story section.

**Content — Antecedentes:** "El 22 de octubre de 1942 fue publicado en el Diario Oficial de la Federación un Acuerdo del Ejecutivo Federal mediante el cual, el entonces Departamento del Distrito Federal (DDF), cedió en forma gratuita a la Comisión Federal de Electricidad (CFE) un predio ubicado en la Segunda Sección del Bosque de Chapultepec de la Ciudad de México. Sin embargo no es sino hasta 1993 cuando por Acuerdo Presidencial del 2 de marzo, la CFE y el DDF formalizaron el Contrato de Donación del predio, de aproximadamente 55,000 m2. En dicho Contrato se acordó que la CFE seguiría utilizando el inmueble para un Museo Tecnológico, estableciendo que en caso de que le diera un uso distinto, el DDF podría gestionar la revocación de la donación. El Museo Tecnológico de la CFE se inauguró en 1970, enfocándose principalmente al tema de la energía eléctrica. El conocido como MUTEC se remodeló en el año 2000, sin registrar desde entonces cambios, actualizaciones o ampliaciones significativas en sus contenidos."

**Assets:** `exteriormuseo/RHG_3698*.jpg`, `logo_verde.png`, 4x gallery photos for cards

---

### 3. ExposicionesPage.tsx

**PROMPT:** Build an interactive exhibitions page. Use a tabbed interface with "Nivel 1" and "Nivel 2" tabs.

Each tab shows the actual floor plan image (`nivel1.png` or `nivel2.png`) as a large centered element. Overlay clickable hotspot divs positioned over each room on the floor plan. When a room is clicked, a side panel slides in showing the room name, 1-2 gallery photos from `/images/fotogaleria/exposiciones/`, and a brief description.

Exhibition rooms — Level 1: Energía Nuclear, Combustibles Fósiles, Sostenibilidad. Level 2: Básicos, Electricidad.

As the user scrolls, implement a horizontal scroll-through animation where each exhibition room highlights sequentially with GSAP ScrollTrigger.

**Assets:** `nivel1.png`, `nivel2.png`, 5x `exposiciones/*.jpg`

---

### 4. PlanificaPage.tsx

**PROMPT:** Redesign the "Planifica tu Visita" page. Hero banner using exterior museum photo (`exteriormuseo/RHG_3752*.jpg`) with dark overlay and title.

Schedule section as a clean modern card: Lunes CERRADO, Martes-Domingo 10:00-18:00. Museum green accent (#8DC63F) for open days, red for closed.

"Cómo Llegar" section with: Address (Av. de los Compositores s/n, Bosque de Chapultepec II Secc, Miguel Hidalgo, 11100 CDMX), embedded Google Maps iframe, transport option icon cards (Metro, Car, Bus).

Ticket section with CTA buttons linking to /boletos.

**Assets:** `exteriormuseo/RHG_3752*.jpg`, `logo_verde.png`

---

### 5. ActividadesPage.tsx

**PROMPT:** Create a bento grid layout of activity cards: Talleres, Visitas Guiadas, Eventos Especiales, Programas Educativos. Each card uses a gallery photo as background — use `salainteractiva/` photos for interactive activities and `torresdeluz/` for sustainability workshops.

Cards have dark gradient overlay with white text. On hover, cards tilt in 3D (perspective: 800px transform) revealing the activity description. GSAP stagger animation on scroll.

**Assets:** 2x `salainteractiva/*.jpg`, 2x `torresdeluz/*.jpg`

---

### 6. ServiciosPage.tsx

**PROMPT:** Build alternating full-width service sections (image left/text right, then reversed). Services: Visitas Escolares, Eventos Corporativos, Talleres Especializados, Renta de Espacios.

Use `auditorio/` photos for corporate events, `salainteractiva/` for educational services. Each section has a CTA button. Final section links prominently to /renta-espacios.

**Assets:** 2x `auditorio/*.jpg`, 2x `salainteractiva/*.jpg`

---

### 7. FotogaleriaPage.tsx

**PROMPT:** Rebuild the gallery page with a tabbed section nav matching the old site's 5 categories: "Columnas de la Sustentabilidad", "Experiencia MUNET", "Exposiciones", "Auditorio", "Exterior Museo" — displayed as horizontal scrollable pills.

Each section shows its photos in a masonry/bento grid with varying image aspect ratios (2:3, 3:2, 1:1) for visual rhythm. Lazy load all images with a blur-up placeholder effect.

On click, open a lightbox with smooth blur-to-focus transition, prev/next navigation, and caption text. On section switch, images stagger-animate in with GSAP.

**Assets:** ALL 28 gallery photos across 5 directories

---

### 8. RentaEspaciosPage.tsx

**PROMPT:** Create space rental cards using the actual venue photos. Each of the 5 spaces gets a card with its photo as the primary visual:

1. **Auditorio Principal** (use `escenario-de-proscenio.png`) — 250 personas, pantalla gigante, proyector HD, sonido profesional, iluminación controlada, cabina de control técnico
2. **Salas de Reuniones** (use `profesor.png`) — 10-30 personas, mobiliario adaptable, pizarrón interactivo, videoconferencia, internet alta velocidad, catering
3. **Espacios para Talleres** (use `profesor.png` alt angle or `exposicion.png`) — 20-50 personas, mesas de trabajo, herramientas, proyectores, ambiente creativo
4. **Foro** (use `foro.png`) — 100+ personas, área diáfana adaptable, iluminación especializada, soporte técnico
5. **Explanada Principal** (use `exposicion.png`) — 100+ personas, área exterior, ideal para ferias/exposiciones temporales

Photo on left, specs on right for desktop; stacked on mobile. Each card has a "Solicitar Información" CTA that scrolls to an inquiry form at the bottom of the page.

**Assets:** `escenario-de-proscenio.png`, `escenario.png`, `exposicion.png`, `foro.png`, `profesor.png`

---

### 9. InvolucratePage.tsx

**PROMPT:** Enhance the existing redesigned page by adding museum photos as backgrounds. Use an exterior museum photo for the hero section with dark overlay. Use a sala interactiva photo in the "¿Por qué MUNET?" section with an orange glow overlay.

Keep existing modular structure (HeroSection, FormasSection, WhySection, ApplicationForm).

**Assets:** 1x `exteriormuseo/*.jpg`, 1x `salainteractiva/*.jpg`

---

### 10. Shared Components

**Navbar:** Swap between `logo_verde.png` (light backgrounds) and `logo_bco.png` (dark/transparent hero state) based on scroll position. Use IntersectionObserver or scroll listener.

**Footer:** Use `logo_verde.png` or `logo_bco.png`. Replace social icon PNGs with Lucide React icons for consistency (or keep originals for brand authenticity). Add: contacto@museomunet.com, Aviso de Privacidad link.

---

## Work Packages (for agent team)

| WP | Scope | Files | Dependencies |
|----|-------|-------|-------------|
| **WP1** | Core: Navbar logo swap, Footer update, shared ImageReveal + PageBanner components | `Navbar.tsx`, `Footer.tsx`, new `ui/` components | None (do first) |
| **WP2** | HomePage: video hero, photo marquee, exhibition preview, stats, newsletter | `HomePage.tsx` + section components | WP1 |
| **WP3** | ExposicionesPage + QuienesSomosPage | `ExposicionesPage.tsx`, `QuienesSomosPage.tsx` | WP1 |
| **WP4** | FotogaleriaPage: full gallery rebuild with lightbox | `FotogaleriaPage.tsx`, new `Lightbox.tsx` | WP1 |
| **WP5** | RentaEspaciosPage + ServiciosPage | `RentaEspaciosPage.tsx`, `ServiciosPage.tsx` | WP1 |
| **WP6** | PlanificaPage + ActividadesPage + InvolucratePage | `PlanificaPage.tsx`, `ActividadesPage.tsx`, `InvolucratePage.tsx` | WP1 |
