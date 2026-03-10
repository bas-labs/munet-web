# MUNET Development Execution Protocol

**Version:** 1.0
**Created:** March 2026
**Status:** ACTIVE

---

## Purpose

This document defines the execution protocol for implementing the MUNET web platform. Follow these rules strictly for every development session.

---

## Tech Stack (Non-Negotiable)

### Frontend
- React 18+
- Vite
- TypeScript
- TailwindCSS
- shadcn/ui components

### Backend (AWS Only)
- AWS Amplify (hosting)
- API Gateway (REST APIs)
- DynamoDB (database)
- Cognito (authentication)
- SES (email)
- Lambda (serverless functions)

**Rule:** No technologies outside this stack without explicit approval.

---

## Execution Rules

### Rule 1: Always Read the PRD First
Before starting ANY task:
```
1. Open /docs/prd.md
2. Locate the relevant section
3. Understand requirements completely
4. Then proceed with implementation
```

### Rule 2: Work in Order (Phases → Features → Tasks)
```
Phase 1: Foundation
  └── Feature: Design System
       └── Task: Implement color tokens
       └── Task: Create Button variants
       └── ...
  └── Feature: Navigation
       └── Task: Header component
       └── ...
```
Never skip ahead. Complete current phase before moving to next.

### Rule 3: One Feature at a Time
- Focus on a single feature
- Complete it fully before starting another
- No parallel feature development

### Rule 4: Break Features into Steps
Every feature must have:
1. Clear implementation steps
2. Acceptance criteria (from PRD)
3. Verification method

### Rule 5: Use Component Gallery
Before building custom UI:
1. Check https://component.gallery/
2. Find suitable component patterns
3. Adapt to our stack (React + Tailwind + shadcn)
4. Only build custom if no suitable pattern exists

### Rule 6: Stack Compliance
- Use ONLY approved technologies
- If a feature seems to need something outside stack → STOP and ask
- Document any approved exceptions

---

## Feature Completion Loop

```
┌─────────────────────────────────────────────────────┐
│                  COMPLETION LOOP                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. IMPLEMENT                                        │
│     └── Write the code for the feature              │
│                                                      │
│  2. VERIFY                                           │
│     └── Run build: npm run build                    │
│     └── Run dev: npm run dev (visual check)         │
│     └── Run tests if applicable                     │
│                                                      │
│  3. COMPARE                                          │
│     └── Re-read PRD section for this feature        │
│     └── Check all requirements met                  │
│     └── Verify UI matches specifications            │
│                                                      │
│  4. FIX (if needed)                                  │
│     └── Identify gaps or errors                     │
│     └── Fix implementation                          │
│     └── Return to step 2                            │
│                                                      │
│  5. COMPLETE                                         │
│     └── Mark feature as ✅ in this file             │
│     └── Commit changes                              │
│     └── Proceed to next feature                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Post-Feature Checklist

After completing each feature:

- [ ] Feature implemented and working
- [ ] Build passes (`npm run build`)
- [ ] Matches PRD requirements
- [ ] Code committed with descriptive message
- [ ] Feature marked complete below
- [ ] PRD re-opened for next feature
- [ ] Next feature identified

---

## Progress Tracker

### Phase 1: Foundation (Weeks 1-4)

#### Week 1: Project Setup & Design System
- [x] Repository initialization
- [x] Vite + React + TypeScript setup
- [x] TailwindCSS v4 configuration
- [x] shadcn/ui initialization
- [x] Folder structure created
- [x] PRD added to /docs/prd.md
- [x] Project plan created
- [ ] Design tokens implementation
- [ ] Typography system
- [ ] Color palette (--color-primary, --color-accent, etc.)
- [ ] Spacing scale
- [ ] Core components: Button variants
- [ ] Core components: Card variants
- [ ] Core components: Input variants
- [ ] Base layout: Container component

#### Week 2: Navigation & Layout
- [ ] Header component (desktop)
- [ ] Header component (mobile/hamburger)
- [ ] Footer component (4-column)
- [ ] Mobile navigation drawer
- [ ] Page layout wrapper
- [ ] Breadcrumb component
- [ ] All routes configured in React Router

#### Week 3: Homepage
- [ ] Hero section (video background)
- [ ] Hero CTAs
- [ ] Exposiciones preview (Bento grid)
- [ ] Planifica tu Visita section
- [ ] Actividades highlight (horizontal scroll)
- [ ] Renta CTA section
- [ ] Newsletter component
- [ ] Homepage responsive adjustments

#### Week 4: Core Content Pages
- [ ] Quiénes Somos: Page hero
- [ ] Quiénes Somos: Timeline component
- [ ] Quiénes Somos: Stats cards
- [ ] Quiénes Somos: Committee grid
- [ ] Exposiciones: Exhibition cards
- [ ] Exposiciones: Floor toggle
- [ ] Exposiciones: Detail panel
- [ ] Planifica tu Visita: Hours section
- [ ] Planifica tu Visita: Pricing view
- [ ] Planifica tu Visita: Map embed
- [ ] Planifica tu Visita: Accessibility info

---

### Phase 2: Revenue Integration (Weeks 5-8)

#### Week 5: Stripe Setup & Boletos UI
- [ ] Stripe account configuration
- [ ] Environment variables
- [ ] Boletos page layout
- [ ] Date picker component
- [ ] Ticket type selector
- [ ] Quantity controls
- [ ] Order summary component
- [ ] Price calculation logic

#### Week 6: Checkout Flow
- [ ] API Gateway setup
- [ ] Lambda: Create checkout session
- [ ] Stripe Checkout integration
- [ ] Success page
- [ ] Error handling
- [ ] Loading states

#### Week 7: Post-Purchase Flow
- [ ] Lambda: Stripe webhook handler
- [ ] DynamoDB: Orders table
- [ ] SES: Email templates
- [ ] Order confirmation email
- [ ] QR code generation
- [ ] Ticket PDF (optional)

#### Week 8: Renta de Espacios
- [ ] Renta page layout
- [ ] Space cards (5 venues)
- [ ] Space detail views
- [ ] Inquiry form (React Hook Form + Zod)
- [ ] Lambda: Form submission handler
- [ ] DynamoDB: Inquiries table
- [ ] Admin email notification

---

### Phase 3: Content Expansion (Weeks 9-12)

#### Week 9: Actividades
- [ ] Actividades page layout
- [ ] Calendar component (month view)
- [ ] List view toggle
- [ ] Category filter tabs
- [ ] Event card component
- [ ] Event detail page
- [ ] Registration form
- [ ] DynamoDB: Events table

#### Week 10: Servicios & Fotogalería
- [ ] Servicios page (all sections)
- [ ] Fotogalería: Masonry grid
- [ ] Fotogalería: Lightbox component
- [ ] Fotogalería: Category filters

#### Week 11: Secondary Pages
- [ ] Involúcrate page
- [ ] Contacto page
- [ ] Contact form
- [ ] Aviso de Privacidad page

#### Week 12: Content Population
- [ ] Real photography integration
- [ ] Copy finalization
- [ ] Video optimization
- [ ] Icon set implementation

---

### Phase 4: Polish & Launch (Weeks 13-14)

#### Week 13: Animation & Interactions
- [ ] Framer Motion setup
- [ ] Page transitions
- [ ] Scroll animations
- [ ] Hover states
- [ ] Loading animations

#### Week 14: Optimization & Launch
- [ ] Lighthouse audit (target: 90+)
- [ ] Image optimization
- [ ] Code splitting
- [ ] WCAG 2.1 AA audit
- [ ] Cross-browser testing
- [ ] SEO completion
- [ ] Amplify deployment
- [ ] CloudFront CDN
- [ ] DNS configuration
- [ ] 🚀 LAUNCH

---

## Current Status

**Active Phase:** Phase 1 — Foundation
**Active Feature:** Design System
**Next Task:** Design tokens implementation

---

## Session Log

| Date | Feature | Status | Notes |
|------|---------|--------|-------|
| 2026-03-10 | Project Setup | ✅ Complete | Repo created, stack configured |
| | | | |

---

## Notes

- Component Gallery reference: https://component.gallery/
- PRD location: /docs/prd.md
- Project plan: /docs/project-plan.md
- Always commit after completing a feature
- Ask before deviating from stack or PRD

---

*This protocol is binding for all development sessions.*
