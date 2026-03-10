# MUNET — Museo Nacional de Energía y Tecnología

## PRODUCT REQUIREMENTS DOCUMENT
### Website Redesign & Digital Experience Platform

**Version 1.0 | March 2026**
**Prepared by:** iaGO — AI-First Product & Engineering
**Classification:** Confidential

---

## Table of Contents

1. Product Vision
2. Business Goals
3. User Personas
4. Information Architecture
5. Page Breakdown
6. Component System
7. Visual Direction
8. Interactive Features
9. Ticket System (Stripe)
10. Technical Architecture
11. SEO & Performance
12. Implementation Phases
13. Feature Prioritization
14. Key Risks
Appendix

---

## 1. Product Vision

### 1.1 Purpose

MUNET — Museo Nacional de Energía y Tecnología is Mexico's first national museum dedicated to energy and technology, located in the Second Section of Bosque de Chapultepec, Ciudad de México. Designed by internationally recognized architect Enrique Norten with exhibition design by Ralph Appelbaum Associates, MUNET is positioned to become a landmark institution on par with major science museums worldwide.

The current website (museomunet.com) was built as a pre-launch informational site. It lacks modern UX patterns, has no integrated ticketing, incomplete sections (Actividades, Servicios redirect to homepage), minimal SEO, no accessibility compliance, and does not reflect the museum's architectural and educational ambition.

### 1.2 Vision Statement

> *Create a world-class digital experience that extends MUNET's mission of transforming visitors through knowledge about energy and technology — making the museum discoverable, accessible, and immersive from the first digital touchpoint to the post-visit journey.*

### 1.3 Design Philosophy

The digital experience must embody five principles:

- **Scientific:** Data-driven layouts, precise typography, and structured information hierarchy that reflects intellectual rigor.
- **Energetic:** Motion design, dynamic color transitions, and interactive elements that communicate energy transformation.
- **Innovative:** Cutting-edge UI patterns, micro-interactions, and immersive storytelling that feel future-forward.
- **Educational:** Clear content architecture, multi-layered information depth, and accessible language for all audiences.
- **Premium:** Museum-grade visual quality, refined typography, and deliberate whitespace that communicates institutional authority.

### 1.4 Digital Positioning

MUNET's website should position itself between two reference points: the authoritative institutional presence of major national museums (Museo Nacional de Antropología) and the bold, immersive digital experiences of contemporary design studios (Pentagram, Studio Dumbar). The result should feel like a premier science museum — not a government institution's informational portal.

---

## 2. Business Goals

### 2.1 Primary Objectives

| # | Goal | Success Metric | Target |
|---|------|----------------|--------|
| G1 | Drive online ticket sales | Monthly online tickets sold | 60% of total admissions via web within 6 months |
| G2 | Improve visit planning | Bounce rate on Planifica tu Visita | < 35% bounce rate |
| G3 | Increase exhibition awareness | Time on Exposiciones page | > 3 min avg session duration |
| G4 | Grow education program enrollment | Activity/workshop registrations | +40% QoQ growth |
| G5 | Generate venue rental leads | Rental inquiry form submissions | 15+ qualified leads/month |
| G6 | Build institutional credibility | Organic search impressions | +200% within 12 months |
| G7 | Enable operational autonomy | CMS-managed content updates | 100% of routine content via admin |

### 2.2 Revenue Model

The website serves as the primary revenue channel through three streams:

- **Ticket Sales (Primary):** Direct-to-consumer via Stripe integration, eliminating third-party commissions from eticket.mx.
- **Venue Rentals (Secondary):** Online inquiry-to-booking pipeline for 5 rental spaces (Auditorio, Salas, Talleres, Foro, Explanada).
- **Education Programs (Tertiary):** Workshop and activity registration with optional paid tiers.

---

## 3. User Personas

### 3.1 Familias

**Profile:** Parents (30–45) planning weekend outings with children in CDMX. Price-sensitive, value Sunday free admission. Need clear logistics: hours, parking, age-appropriate exhibits.

**Key Needs:** Simple visit planning, ticket pricing clarity, family-friendly content, Sunday free admission visibility.

### 3.2 Estudiantes

**Profile:** University and preparatoria students (16–25) visiting for academic purposes or personal interest. Eligible for student discounts.

**Key Needs:** Discount ticket access, educational content depth, exhibition details for research, event calendar.

### 3.3 Turistas Nacionales

**Profile:** Mexican visitors from outside CDMX, often planning museum visits as part of a broader Chapultepec itinerary.

**Key Needs:** Location/transit info, combined itinerary planning, ticket purchase before arrival, multilingual support (secondary).

### 3.4 Turistas Internacionales

**Profile:** Foreign visitors seeking cultural experiences in CDMX. Higher willingness to pay. English language support valuable.

**Key Needs:** English content, foreigner ticket pricing, transit directions, cultural context about Mexican energy history.

### 3.5 Grupos Escolares

**Profile:** Teachers and school administrators organizing field trips. Need group pricing, educational alignment, and logistics.

**Key Needs:** Group booking flow, educational materials, curriculum alignment, logistics for 30–50+ students.

### 3.6 Investigadores

**Profile:** Academics, journalists, and energy sector professionals seeking technical information.

**Key Needs:** Deep exhibition content, institutional background (Quiénes Somos), press resources, contact for collaboration.

### 3.7 Organizadores de Eventos

**Profile:** Corporate event planners and organizations seeking venue rental in Chapultepec.

**Key Needs:** Space specifications, capacity details, equipment lists, inquiry form, pricing request flow.

### 3.8 Aspirantes Laborales

**Profile:** Job seekers interested in joining MUNET's team.

**Key Needs:** Clear application process, CV upload, role information, organizational culture visibility.

---

## 4. Information Architecture

### 4.1 Sitemap

The restructured sitemap consolidates existing pages, eliminates dead redirects, and introduces new sections to support ticketing and education programs.

| Route | Page Title (ES) | Status | Priority |
|-------|----------------|--------|----------|
| / | Inicio | Redesign | P0 |
| /quienes-somos | Quiénes Somos | Redesign | P0 |
| /exposiciones | Exposiciones | Redesign | P0 |
| /planifica-tu-visita | Planifica tu Visita | Redesign | P0 |
| /boletos | Boletos | NEW | P0 |
| /actividades | Actividades | NEW (currently 301) | P1 |
| /servicios | Servicios | NEW (currently 301) | P1 |
| /fotogaleria | Fotogalería | Redesign | P1 |
| /renta-de-espacios | Renta de Espacios | Redesign | P1 |
| /involucrate | Involúcrate | Redesign | P2 |
| /contacto | Contacto | NEW | P2 |
| /aviso-de-privacidad | Aviso de Privacidad | Migrate | P2 |
| /blog | Blog / Noticias | NEW (Phase 3) | P3 |

### 4.2 Navigation Structure

**Primary Navigation (Header)**

Persistent top navigation with the following items:

- Logo MUNET (links to Inicio)
- Exposiciones
- Planifica tu Visita
- Actividades
- Quiénes Somos
- CTA Button: "Comprar Boletos" (primary action, always visible)

**Secondary Navigation (Footer)**

Multi-column footer organized as:

- **Column 1 — Visita:** Horarios, Cómo Llegar, Boletos, Servicios
- **Column 2 — Explora:** Exposiciones, Actividades, Fotogalería
- **Column 3 — Institucional:** Quiénes Somos, Renta de Espacios, Involúcrate, Contacto
- **Column 4 — Legal:** Aviso de Privacidad, Términos y Condiciones

Footer also includes: social media icons (Facebook, YouTube, Instagram, TikTok), contact email (contacto@museomunet.com), physical address, and newsletter subscription input.

### 4.3 Content Reorganization

Key changes from current site:

- **Duplicate elimination:** planifica_visita.html and planifica_tu_visita.html merged into single /planifica-tu-visita route.
- **Dead links resolved:** Actividades and Servicios currently redirect (301) to homepage — both will be built as full pages.
- **Ticketing extracted:** Ticket purchase modal removed from Planifica tu Visita; dedicated /boletos page created with full Stripe checkout.
- **Contact centralized:** New /contacto page aggregates contact information currently scattered across footer and Aviso de Privacidad.
- **URL normalization:** All routes converted from .html to clean paths with hyphens (e.g., quienes_somos.html → /quienes-somos).

---

## 5. Page Breakdown

All UI copy defined below is in Spanish. Technical annotations are in English.

### 5.1 Inicio (Homepage)

**Route:** /
**Purpose:** First impression, emotional hook, and gateway to all key actions.

**Section Layout**

| Section | UI Copy (ES) | Component | Notes |
|---------|-------------|-----------|-------|
| Hero | "El conocimiento no te crea ni te destruye. Te transforma." | Full-viewport video hero | Looping background video (existing banner_placeholder.mp4). CTA: "Comprar Boletos" + "Explorar Exposiciones" |
| Exposiciones Preview | "Explora el Universo de la Energía" | Bento grid (3-col) | Interactive cards for top 4-6 exhibition areas. Hover reveals short description. |
| Planifica Section | "Planifica tu Visita" | Split layout | Left: hours + address. Right: mini map. CTA: "Ver Horarios Completos" |
| Actividades Highlight | "Próximas Actividades" | Horizontal scroll cards | 3 upcoming events/workshops. CTA: "Ver Todas las Actividades" |
| Renta CTA | "Haz de tu Evento algo Extraordinario" | Full-bleed image + overlay | Single CTA: "Conoce Nuestros Espacios" |
| Newsletter | "Manténte Informado" | Centered input + button | Email capture. CTA: "Suscribirse" |

### 5.2 Quiénes Somos

**Route:** /quienes-somos
**Purpose:** Institutional credibility, history, and organizational transparency.

Preserves all existing content (Antecedentes, Proyecto, Financiamiento, Principios Rectores) while restructuring the layout from hidden expandable cards to a storytelling timeline format.

**Section Layout**

| Section | UI Copy (ES) | Component |
|---------|-------------|-----------|
| Page Hero | "Quiénes Somos" | Compact hero with architectural photo background |
| Timeline: Antecedentes | "Nuestra Historia" | Vertical timeline module (1942 DOF decree → 1970 MUTEC → FIMUNET → Norten/Appelbaum → 2026 Apertura) |
| Proyecto | "El Proyecto" | Two-column: text + architectural renders |
| Financiamiento | "Financiamiento" | Stats cards: 50.8% donations, 49.2% BANOBRAS/FONADIN |
| Principios | "Principios Rectores" | Numbered list with icons (10 guiding principles) |
| Comité Técnico | "Comité Técnico" | Grid of 15 committee members |

### 5.3 Exposiciones

**Route:** /exposiciones
**Purpose:** Showcase all exhibition areas across both museum levels. Core content page.

The current page uses a JS-rendered interactive SVG floor plan with modals. The redesign preserves the interactive map concept but elevates it with an immersive exhibition explorer.

**Exhibition Areas**

| Level | Exhibition | Topic Summary |
|-------|-----------|---------------|
| Nivel 1 | Conceptos Básicos | Energy definition, matter-energy transformation, energy manifestations |
| Nivel 1 | Electricidad | Secondary energy, electron flow, circuit types, generation methods |
| Nivel 1 | Combustibles Fósiles | Coal, natural gas, petroleum; environmental impact |
| Nivel 1 | Energía Nuclear | Fusion/fission, GHG-free production, medical applications |
| Nivel 1 | Sostenibilidad | Sustainable development, technology as energy future enabler |
| Nivel 2 | Energía Solar | Sun as primary source, photovoltaic panels, renewable energy |
| Nivel 2 | Energía Eólica | Wind power history, aerogenerators, turbine technology |
| Nivel 2 | Energía Hidráulica | Hydroelectric power, potential/kinetic water energy |
| Nivel 2 | Energía Geotérmica | Earth's internal heat, geysers, electricity generation |
| Nivel 2 | Bioenergía | Biomass types, biofuel production, oldest human energy |
| Nivel 2 | Sostenibilidad | Global sustainability challenges |

**Interactive Features**

- **Floor Plan Navigator:** SVG-based interactive map with floor toggle (Nivel 1 / Nivel 2). Clicking an area opens a detail panel (not modal).
- **Exhibition Detail Panel:** Sliding panel with: title, hero image, educational text, key facts, related exhibitions links.
- **Energy Transformation Timeline:** Horizontal scrollable timeline showing evolution of energy sources (Phase 2 feature).

### 5.4 Planifica tu Visita

**Route:** /planifica-tu-visita
**Purpose:** All practical information for visit planning in one page.

| Section | UI Copy (ES) | Content |
|---------|-------------|---------|
| Hours | "Horarios de Apertura" | Lunes: CERRADO \| Martes–Domingo: 10:00–18:00 hrs \| Días festivos: consultar horario especial |
| Pricing Quick View | "Tarifas" | Quick pricing summary with link to /boletos. Highlight: "Domingos — entrada gratuita para nacionales" |
| Getting There | "Cómo Llegar" | Address: Av. de los Compositores s/n, Bosque de Chapultepec II Secc. Interactive Google Maps embed. Transit options: Metro, Metrobus, car/parking. |
| Accessibility | "Accesibilidad" | Wheelchair access, elevators between Nivel 1 and 2, assistance services |
| Services | "Servicios en el Museo" | Wi-Fi, lockers, cafeteria, gift shop, restrooms (links to /servicios) |
| CTA | "Comprar Boletos" | Prominent button linking to /boletos |

### 5.5 Boletos (Ticket System)

**Route:** /boletos
**Purpose:** Direct ticket sales via Stripe. Primary revenue page.

This is a NEW page replacing the current eticket.mx redirect. Full details in Section 9 (Ticket System).

### 5.6 Actividades

**Route:** /actividades
**Purpose:** Education programs, workshops, events calendar. Currently redirects to homepage (301).

| Section | UI Copy (ES) | Component |
|---------|-------------|-----------|
| Page Hero | "Actividades y Programas" | Hero with upcoming event highlight |
| Event Calendar | "Calendario de Actividades" | Monthly calendar view + list toggle. Filterable by category. |
| Categories | "Talleres" / "Conferencias" / "Visitas Guiadas" / "Programas Escolares" | Category filter tabs |
| Event Detail | "[Nombre del Evento]" | Individual event page with: description, date/time, capacity, price, registration CTA |
| Registration | "Regístrate" | Form: name, email, phone, participant count. Confirmation via SES. |

### 5.7 Servicios

**Route:** /servicios
**Purpose:** Visitor services and amenities. Currently redirects to homepage (301).

Sections:
- Cafetería
- Tienda MUNET (gift shop)
- Guardarropa / Lockers
- Wi-Fi gratuito
- Sanitarios
- Estacionamiento

### 5.8 Fotogalería

**Route:** /fotogaleria
**Purpose:** Visual showcase of museum architecture, exhibitions, and events.

Masonry grid layout with lightbox. Categories: Arquitectura, Exposiciones, Eventos, Construcción.

### 5.9 Renta de Espacios

**Route:** /renta-de-espacios
**Purpose:** Venue rental information and inquiry generation.

**Available Spaces:**
- Auditorio (200 pax)
- Salas de Exposición
- Talleres (workshop rooms)
- Foro al Aire Libre
- Explanada

Each space includes: photos, capacity, equipment list, and inquiry CTA.

### 5.10 Involúcrate

**Route:** /involucrate
**Purpose:** Volunteer, donation, and partnership opportunities.

Sections: Voluntariado, Donaciones, Alianzas Corporativas, Bolsa de Trabajo.

### 5.11 Contacto

**Route:** /contacto
**Purpose:** Centralized contact information and inquiry form.

Includes: general contact form, email addresses by department, physical address, map, social media links.

### 5.12 Aviso de Privacidad

**Route:** /aviso-de-privacidad
**Purpose:** Legal privacy notice compliance.

---

## 6. Component System

### 6.1 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --color-primary | #1A1A1A | Headlines, primary actions |
| --color-secondary | #F5F5F5 | Backgrounds, cards |
| --color-accent | #FF6B35 | CTAs, highlights, energy theme |
| --color-accent-alt | #00D4AA | Secondary accent, sustainability theme |
| --font-display | "DM Sans", sans-serif | Headlines |
| --font-body | "Inter", sans-serif | Body text |
| --radius-sm | 4px | Small elements |
| --radius-md | 8px | Cards, buttons |
| --radius-lg | 16px | Large containers |

### 6.2 Core Components

- **Button:** Primary, Secondary, Ghost, Link variants
- **Card:** Exhibition card, Event card, Space card
- **Hero:** Full-bleed video, Image, Compact variants
- **Navigation:** Header (desktop/mobile), Footer, Breadcrumbs
- **Form:** Input, Select, Checkbox, Radio, Textarea
- **Modal:** Lightbox, Confirmation, Alert
- **Calendar:** Month view, List view
- **Map:** Google Maps embed, Floor plan SVG
- **Timeline:** Vertical, Horizontal variants
- **Gallery:** Masonry grid, Carousel, Lightbox

---

## 7. Visual Direction

### 7.1 Photography

- Architectural photography emphasizing scale and light
- Human-centric shots showing visitor engagement
- Detail shots of exhibition interactives
- Aerial/drone shots of Chapultepec context

### 7.2 Motion Design

- Subtle parallax on scroll
- Card hover states with elevation changes
- Page transitions (fade/slide)
- Loading states with energy-themed animations

### 7.3 Iconography

Custom icon set reflecting energy themes: lightning, sun, wind, water, atom, leaf.

---

## 8. Interactive Features

### 8.1 Exhibition Explorer

SVG-based floor plan with:
- Floor level toggle (Nivel 1 / Nivel 2)
- Clickable zones with hover states
- Sliding detail panel
- Related exhibitions suggestions

### 8.2 Virtual Tour (Phase 2)

360° panoramic views of key exhibition areas.

### 8.3 Energy Calculator (Phase 2)

Interactive tool showing personal energy consumption and museum equivalents.

---

## 9. Ticket System (Stripe)

### 9.1 Ticket Types

| Type | Price (MXN) | Conditions |
|------|-------------|------------|
| General | $120 | Adult admission |
| Estudiante | $60 | With valid ID |
| Maestro | $60 | With valid ID |
| INAPAM | $60 | Senior citizen |
| Niño (3-12) | $60 | Ages 3-12 |
| Niño (<3) | Gratis | Under 3 years |
| Domingo Nacional | Gratis | Mexicans on Sundays |

### 9.2 Checkout Flow

1. Select visit date (calendar picker)
2. Select ticket quantities by type
3. Review order summary
4. Stripe Checkout (embedded or redirect)
5. Confirmation page + email receipt

### 9.3 Technical Requirements

- Stripe Elements or Checkout Sessions
- Webhook handling for payment confirmation
- Email confirmation via AWS SES
- QR code generation for ticket validation
- Admin dashboard for sales reporting

---

## 10. Technical Architecture

### 10.1 Frontend Stack

- **Framework:** React 18+ with TypeScript
- **Build:** Vite
- **Styling:** TailwindCSS + shadcn/ui
- **Routing:** React Router v6
- **Forms:** React Hook Form + Zod validation
- **State:** React Context (minimal) or Zustand if needed
- **Animation:** Framer Motion

### 10.2 Backend Stack

- **Hosting:** AWS Amplify
- **API:** API Gateway + Lambda
- **Database:** DynamoDB
- **Auth:** Cognito (admin only, not visitor-facing)
- **Email:** SES
- **Payments:** Stripe

### 10.3 CMS Strategy

Content management via:
- Markdown files in repo (static content)
- DynamoDB tables (dynamic content: events, activities)
- Admin dashboard (Phase 2)

---

## 11. SEO & Performance

### 11.1 SEO Requirements

- Semantic HTML5 structure
- Meta tags (title, description, OG, Twitter)
- Structured data (Organization, Museum, Event schemas)
- XML sitemap
- robots.txt
- Canonical URLs
- Spanish language optimization

### 11.2 Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse Score | > 90 |

### 11.3 Optimization Strategies

- Image optimization (WebP, lazy loading)
- Code splitting per route
- CDN delivery via CloudFront
- Preloading critical resources
- Service worker for offline basics

---

## 12. Implementation Phases

### Phase 1: Foundation (Weeks 1-4)

- Project setup and architecture
- Design system and component library
- Core pages: Inicio, Exposiciones, Planifica tu Visita, Quiénes Somos
- Basic responsive layouts
- SEO foundation

### Phase 2: Revenue (Weeks 5-8)

- Boletos page with Stripe integration
- Checkout flow implementation
- Email confirmation system
- QR code ticket generation
- Renta de Espacios with inquiry form

### Phase 3: Content (Weeks 9-12)

- Actividades page with calendar
- Servicios page
- Fotogalería
- Involúcrate
- Contacto
- Blog/Noticias (optional)

### Phase 4: Polish (Weeks 13-14)

- Animation and micro-interactions
- Performance optimization
- Accessibility audit (WCAG 2.1 AA)
- Cross-browser testing
- Launch preparation

---

## 13. Feature Prioritization

| Priority | Features | Rationale |
|----------|----------|-----------|
| P0 | Homepage, Exposiciones, Planifica, Boletos, Navigation | Core user journeys + revenue |
| P1 | Actividades, Servicios, Renta, Fotogalería | Complete visitor experience |
| P2 | Involúcrate, Contacto, Aviso Privacidad | Secondary pages |
| P3 | Blog, Virtual Tour, Energy Calculator | Enhancement features |

---

## 14. Key Risks

| Risk | Mitigation |
|------|------------|
| Stripe integration complexity | Use Stripe Checkout (hosted) for MVP, migrate to Elements later |
| Content availability | Define content requirements early; use placeholder content |
| Exhibition SVG complexity | Start with static images; add interactivity incrementally |
| Multilingual scope creep | Spanish only for v1; English as Phase 2 enhancement |
| Performance with video hero | Implement proper video compression and lazy loading |

---

## Appendix

### A. Current Site Analysis

- **URL:** museomunet.com
- **Technology:** Static HTML/CSS/JS
- **Issues:** Dead links, duplicate pages, no ticketing, incomplete sections
- **Strengths:** Good photography, existing floor plan SVG, brand elements

### B. Competitor References

- Museo Nacional de Antropología (mna.inah.gob.mx)
- Universum UNAM (universum.unam.mx)
- Papalote Museo del Niño (papalote.mx)
- Exploratorium San Francisco (exploratorium.edu)
- Science Museum London (sciencemuseum.org.uk)

### C. Brand Assets Required

- MUNET logo (SVG, various formats)
- Brand colors (finalized palette)
- Typography files (if custom)
- Photography library
- Video assets (hero, backgrounds)
- Icon set (energy themes)

---

*Document Version: 1.0*
*Last Updated: March 2026*
*Prepared by: iaGO — AI-First Product & Engineering*
