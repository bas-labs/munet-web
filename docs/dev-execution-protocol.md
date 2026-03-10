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

**Active Phase:** Phase 4 — Polish & Launch (FINAL)
**Active Features:** Animations, Performance, Accessibility/SEO, Deployment
**Focus:** Production-ready quality, optimization, and launch preparation

---

## Session Log

| Date | Feature | Status | Notes |
|------|---------|--------|-------|
| 2026-03-10 | Project Setup | ✅ Complete | Repo created, stack configured |
| | | | |

---

## Parallel Phase Execution

### Overview

Development uses parallel agent execution within phases. Multiple agents work simultaneously on different features, but ONLY within the active phase.

### Rules

#### 1. Phase-Only Concurrency
```
✅ ALLOWED: Multiple features in Phase 1 running in parallel
❌ FORBIDDEN: Starting Phase 2 feature while Phase 1 is incomplete
```

Only ONE phase can be active at a time. All features in a phase must complete before advancing.

#### 2. Agent Ownership

Each agent owns exactly ONE feature:

```
┌─────────────────────────────────────────────────────┐
│              PHASE 1: FOUNDATION                    │
├─────────────────────────────────────────────────────┤
│  Agent A → Design System                            │
│  Agent B → Navigation & Layout                      │
│  Agent C → Homepage                                 │
│  Agent D → Core Content Pages                       │
└─────────────────────────────────────────────────────┘
```

Rules:
- One agent per feature
- No agent works on multiple features simultaneously
- Agents may run in parallel
- Agent must complete feature before taking new assignment

#### 3. Dependency Management

Some features depend on others:

```
Design System (foundational)
    ↓
    ├── Navigation & Layout
    ├── Homepage
    └── Core Content Pages
```

**Shared Components Rule:**
- Design System creates shared components first
- Other agents REUSE existing components (never duplicate)
- Import from @/components/ui/ for shared UI
- Import from @/lib/ for shared utilities

#### 4. Agent Completion Loop

Each agent follows this loop independently:

```
┌─────────────────────────────────────────────────────┐
│              AGENT COMPLETION LOOP                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. READ PRD                                         │
│     └── Open /docs/prd.md                           │
│     └── Find feature requirements                   │
│     └── Identify acceptance criteria                │
│                                                      │
│  2. IMPLEMENT                                        │
│     └── Write code for the feature                  │
│     └── Use Component Gallery patterns              │
│     └── Reuse shared components                     │
│                                                      │
│  3. TEST                                             │
│     └── npm run build (must pass)                   │
│     └── Visual verification                         │
│     └── Responsive check                            │
│                                                      │
│  4. EVALUATE                                         │
│     └── Compare implementation vs PRD               │
│     └── Check all requirements met                  │
│     └── Verify no regressions                       │
│                                                      │
│  5. RETRY (if needed)                                │
│     └── Fix errors/gaps                             │
│     └── Return to step 3                            │
│                                                      │
│  6. COMPLETE                                         │
│     └── Commit with descriptive message             │
│     └── Report completion to orchestrator           │
│     └── Await next assignment                       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### 5. PRD Verification Checklist

After each feature, agent must verify:

- [ ] All UI copy matches PRD exactly (Spanish)
- [ ] All components match PRD specifications
- [ ] All routes match PRD sitemap
- [ ] All interactions work as specified
- [ ] Responsive design implemented
- [ ] Accessibility basics in place

#### 6. Coordination Protocol

**Before starting:**
```
1. Pull latest from main
2. Check for new shared components
3. Read any updated protocols
```

**After completing:**
```
1. Commit changes
2. Push to feature branch or main
3. Update progress tracker in this file
4. Report completion
```

**Conflict Resolution:**
- If two agents need same component → first to implement wins
- Others must reuse, not duplicate
- Orchestrator resolves disputes

---

## Agent Assignment Log

### Phase 1: Foundation ✅ COMPLETE (2026-03-10)

| Agent | Feature | Status | Started | Completed |
|-------|---------|--------|---------|-----------|
| A | Design System | ✅ Complete | 2026-03-10 | 2026-03-10 |
| B | Navigation & Layout | ✅ Complete | 2026-03-10 | 2026-03-10 |
| C | Homepage | ✅ Complete | 2026-03-10 | 2026-03-10 |
| D | Core Content Pages | ✅ Complete | 2026-03-10 | 2026-03-10 |

### Phase 2: Revenue Integration ✅ COMPLETE (2026-03-10)

| Agent | Feature | Status | Started | Completed |
|-------|---------|--------|---------|-----------|
| E | Boletos Page UI | ✅ Complete | 2026-03-10 | 2026-03-10 |
| F | Checkout Flow (API + Lambda) | ✅ Complete | 2026-03-10 | 2026-03-10 |
| G | Post-Purchase Flow | ✅ Complete | 2026-03-10 | 2026-03-10 |
| H | Renta de Espacios | ✅ Complete | 2026-03-10 | 2026-03-10 |

### Phase 3: Content Expansion ✅ COMPLETE (2026-03-10)

| Agent | Feature | Status | Started | Completed |
|-------|---------|--------|---------|-----------|
| I | Actividades (Calendar + Events) | ✅ Complete | 2026-03-10 | 2026-03-10 |
| J | Servicios Page | ✅ Complete | 2026-03-10 | 2026-03-10 |
| K | Fotogalería | ✅ Complete | 2026-03-10 | 2026-03-10 |
| L | Secondary Pages (Involúcrate, Contacto, Aviso) | ✅ Complete | 2026-03-10 | 2026-03-10 |

### Phase 4: Polish & Launch 🔄 ACTIVE (FINAL PHASE)

| Agent | Feature | Status | Started | Completed |
|-------|---------|--------|---------|-----------|
| M | Animations & Interactions | 🔄 Active | 2026-03-10 | - |
| N | Performance Optimization | 🔄 Active | 2026-03-10 | - |
| O | Accessibility & SEO | 🔄 Active | 2026-03-10 | - |
| P | Deployment Setup | 🔄 Active | 2026-03-10 | - |

---

## Notes

- Component Gallery reference: https://component.gallery/
- PRD location: /docs/prd.md
- Project plan: /docs/project-plan.md
- Always commit after completing a feature
- Ask before deviating from stack or PRD

---

*This protocol is binding for all development sessions.*
