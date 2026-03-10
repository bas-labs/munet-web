# MUNET Web Platform — Project Plan

**Version:** 1.0
**Created:** March 2026
**Based on:** PRD v1.0

---

## Executive Summary

This document outlines the implementation roadmap for the MUNET website redesign. The project spans 14 weeks across 4 phases, delivering a world-class digital experience with integrated ticketing.

---

## Phase 1: Foundation (Weeks 1-4)

### Week 1: Project Setup & Design System

**Objectives:**
- Establish project architecture
- Create design token system
- Build core component library foundation

**Deliverables:**
- [x] Repository initialization (React + Vite + TypeScript)
- [x] TailwindCSS + shadcn/ui configuration
- [x] Folder structure (/components, /pages, /lib, /hooks)
- [ ] Design tokens implementation (colors, typography, spacing)
- [ ] Core components: Button, Card, Input variants
- [ ] Base layout components: Header, Footer, Container

**Technical Tasks:**
```
- Configure path aliases (@/)
- Set up ESLint + Prettier
- Create component documentation structure
- Implement dark/light mode tokens (if applicable)
```

### Week 2: Navigation & Layout

**Objectives:**
- Implement responsive navigation system
- Create page layout templates

**Deliverables:**
- [ ] Header component (desktop + mobile hamburger)
- [ ] Footer component (4-column layout)
- [ ] Mobile navigation drawer
- [ ] Page layout wrapper
- [ ] Breadcrumb component
- [ ] React Router setup with all routes

**Routes to implement:**
```
/                    → HomePage
/quienes-somos       → QuienesSomosPage
/exposiciones        → ExposicionesPage
/planifica-tu-visita → PlanificaPage
/boletos             → BoletosPage
/actividades         → ActividadesPage
/servicios           → ServiciosPage
/fotogaleria         → FotogaleriaPage
/renta-de-espacios   → RentaEspaciosPage
/involucrate         → InvolucratePage
/contacto            → ContactoPage
/aviso-de-privacidad → AvisoPrivacidadPage
```

### Week 3: Homepage Development

**Objectives:**
- Build complete homepage with all sections
- Implement hero with video background

**Deliverables:**
- [ ] Hero section (video background + CTAs)
- [ ] Exposiciones preview (Bento grid)
- [ ] Planifica tu Visita section (split layout)
- [ ] Actividades highlight (horizontal scroll)
- [ ] Renta CTA section (full-bleed)
- [ ] Newsletter subscription component
- [ ] Responsive adjustments for all breakpoints

### Week 4: Core Content Pages

**Objectives:**
- Build P0 content pages
- Establish content patterns

**Deliverables:**
- [ ] Quiénes Somos page
  - Timeline component (vertical)
  - Stats cards
  - Committee member grid
- [ ] Exposiciones page
  - Exhibition cards grid
  - Floor level toggle (Nivel 1 / Nivel 2)
  - Exhibition detail panel (sliding)
- [ ] Planifica tu Visita page
  - Hours section
  - Pricing quick view
  - Google Maps embed
  - Accessibility info
  - Services preview

---

## Phase 2: Revenue Integration (Weeks 5-8)

### Week 5: Stripe Setup & Boletos Page UI

**Objectives:**
- Configure Stripe account and keys
- Build ticket selection interface

**Deliverables:**
- [ ] Stripe account configuration
- [ ] Environment variables setup
- [ ] Boletos page layout
- [ ] Date picker component (calendar)
- [ ] Ticket type selector
- [ ] Quantity controls
- [ ] Order summary component
- [ ] Price calculation logic

**Ticket Types:**
```
General        → $120 MXN
Estudiante     → $60 MXN (requires ID)
Maestro        → $60 MXN (requires ID)
INAPAM         → $60 MXN (senior)
Niño (3-12)    → $60 MXN
Niño (<3)      → Gratis
Domingo Nac.   → Gratis (Mexicans on Sundays)
```

### Week 6: Checkout Flow

**Objectives:**
- Implement Stripe Checkout integration
- Build confirmation flow

**Deliverables:**
- [ ] Stripe Checkout Sessions (API Gateway + Lambda)
- [ ] Checkout redirect/embed
- [ ] Success page with order details
- [ ] Cancel/error handling
- [ ] Loading states

### Week 7: Post-Purchase Flow

**Objectives:**
- Email confirmations
- Ticket generation

**Deliverables:**
- [ ] Stripe webhook handler (Lambda)
- [ ] AWS SES email templates
- [ ] Order confirmation email
- [ ] QR code generation for tickets
- [ ] PDF ticket generation (optional)
- [ ] DynamoDB order storage

### Week 8: Renta de Espacios

**Objectives:**
- Build venue rental page
- Implement inquiry form

**Deliverables:**
- [ ] Renta de Espacios page
- [ ] Space cards (5 venues)
- [ ] Space detail views
- [ ] Inquiry form (React Hook Form + Zod)
- [ ] Form submission to DynamoDB
- [ ] Email notification to admin

**Spaces:**
```
- Auditorio (200 pax)
- Salas de Exposición
- Talleres
- Foro al Aire Libre
- Explanada
```

---

## Phase 3: Content Expansion (Weeks 9-12)

### Week 9: Actividades Page

**Objectives:**
- Build activities/events system
- Implement calendar view

**Deliverables:**
- [ ] Actividades page layout
- [ ] Calendar component (month view)
- [ ] List view toggle
- [ ] Category filter tabs
- [ ] Event card component
- [ ] Event detail page
- [ ] Registration form

**Categories:**
```
- Talleres
- Conferencias
- Visitas Guiadas
- Programas Escolares
```

### Week 10: Servicios & Fotogalería

**Objectives:**
- Complete visitor services page
- Build photo gallery

**Deliverables:**
- [ ] Servicios page
  - Cafetería section
  - Tienda MUNET
  - Guardarropa/Lockers
  - Wi-Fi info
  - Estacionamiento
- [ ] Fotogalería page
  - Masonry grid layout
  - Lightbox component
  - Category filters

### Week 11: Secondary Pages

**Objectives:**
- Complete remaining content pages

**Deliverables:**
- [ ] Involúcrate page
  - Voluntariado section
  - Donaciones
  - Alianzas Corporativas
  - Bolsa de Trabajo
- [ ] Contacto page
  - Contact form
  - Department emails
  - Map integration
  - Social links
- [ ] Aviso de Privacidad page

### Week 12: Content Population & Refinement

**Objectives:**
- Replace placeholder content
- Content QA

**Deliverables:**
- [ ] Real photography integration
- [ ] Copy finalization (all pages)
- [ ] Video assets optimization
- [ ] Icon set implementation
- [ ] Content review with stakeholders

---

## Phase 4: Polish & Launch (Weeks 13-14)

### Week 13: Animation & Interactions

**Objectives:**
- Add micro-interactions
- Implement motion design

**Deliverables:**
- [ ] Framer Motion integration
- [ ] Page transitions
- [ ] Scroll animations (parallax)
- [ ] Hover states refinement
- [ ] Loading animations
- [ ] Button/card interactions

### Week 14: Optimization & Launch

**Objectives:**
- Performance optimization
- Accessibility compliance
- Launch preparation

**Deliverables:**
- [ ] Lighthouse audit (target: 90+)
- [ ] Image optimization (WebP, lazy loading)
- [ ] Code splitting verification
- [ ] WCAG 2.1 AA accessibility audit
- [ ] Cross-browser testing
- [ ] SEO checklist completion
- [ ] AWS Amplify deployment
- [ ] CloudFront CDN configuration
- [ ] DNS configuration
- [ ] Launch!

---

## Technical Milestones

| Milestone | Target Date | Dependencies |
|-----------|-------------|--------------|
| Dev environment ready | Week 1 | - |
| Design system complete | Week 1 | - |
| Navigation functional | Week 2 | Design system |
| Homepage complete | Week 3 | Navigation |
| P0 pages complete | Week 4 | Homepage |
| Stripe integration live | Week 6 | API Gateway setup |
| Email system working | Week 7 | SES configuration |
| All pages complete | Week 11 | Content assets |
| Performance optimized | Week 14 | All features |
| Production launch | Week 14 | All milestones |

---

## Infrastructure Requirements

### AWS Services

| Service | Purpose | Setup Phase |
|---------|---------|-------------|
| Amplify | Frontend hosting | Week 1 |
| API Gateway | REST API | Week 5 |
| Lambda | Serverless functions | Week 5 |
| DynamoDB | Orders, events, inquiries | Week 5 |
| Cognito | Admin authentication | Week 7 |
| SES | Transactional emails | Week 7 |
| S3 | Media storage | Week 1 |
| CloudFront | CDN | Week 14 |

### External Services

| Service | Purpose | Setup Phase |
|---------|---------|-------------|
| Stripe | Payment processing | Week 5 |
| Google Maps | Location embeds | Week 4 |

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Content delays | Medium | High | Use placeholder content; parallelize |
| Stripe complexity | Low | High | Use Checkout Sessions (simpler) |
| Performance issues | Medium | Medium | Continuous Lighthouse monitoring |
| Scope creep | High | Medium | Strict PRD adherence; change control |
| Browser compatibility | Low | Medium | Test early; use polyfills |

---

## Success Criteria

### Phase 1 Exit Criteria
- [ ] All P0 pages rendered correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Navigation fully functional
- [ ] Lighthouse > 80

### Phase 2 Exit Criteria
- [ ] Test purchase successful
- [ ] Email confirmation received
- [ ] QR code generated
- [ ] Inquiry form submits correctly

### Phase 3 Exit Criteria
- [ ] All 12 pages complete
- [ ] Real content integrated
- [ ] Calendar system functional

### Phase 4 Exit Criteria
- [ ] Lighthouse > 90
- [ ] WCAG 2.1 AA compliant
- [ ] Cross-browser verified
- [ ] Production deployed

---

## Next Steps

1. **Immediate:** Complete Week 1 deliverables
2. **This week:** Design tokens + core components
3. **Coordination needed:** 
   - Photography/video assets from MUNET
   - Stripe account credentials
   - AWS account access verification
   - Content copy in final form

---

*This plan is a living document. Update as project progresses.*
