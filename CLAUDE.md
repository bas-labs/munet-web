# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MUNET Web — a production-grade, animation-heavy museum website (Museo de la Naturaleza y Energía Tecnológica) built with React 19, Vite 7, TypeScript 5.9, and Tailwind CSS 4. Spanish-language content. Full-stack with AWS Lambda backend for Stripe payments and DynamoDB.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript check + Vite production build
npm run build:prod   # Production build (NODE_ENV=production)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking only (no emit)
```

No test framework is configured. Quality is enforced via ESLint (flat config) and strict TypeScript.

## Architecture

### Routing & Code Splitting
All pages in `src/pages/` are lazy-loaded via `React.lazy()` in `src/App.tsx`. Routes use Spanish paths (`/quienes-somos`, `/planifica-tu-visita`, `/boletos`, etc.). Route preloading is triggered on link hover via `preloadRoute()` in the Header. Pages are wrapped in `<AnimatePresence>` for Framer Motion page transitions.

### Animation Stack
- **Framer Motion** — Primary animation library. Reusable motion components and variants live in `src/components/ui/motion.tsx` (FadeIn, ScaleIn, SlideIn, HoverCard, Parallax, stagger containers).
- **GSAP + ScrollTrigger** — Scroll-based animations, initialized in `src/components/layout/PageLayout.tsx` alongside Lenis smooth scrolling.
- **Lenis** — Smooth scroll provider, synced with GSAP ticker in PageLayout.
- All animations respect `prefers-reduced-motion`.

### Layout System
`PageLayout.tsx` is the root layout wrapper that initializes Lenis smooth scrolling and GSAP ScrollTrigger. `PageTransition.tsx` handles enter/exit animations. `Header.tsx` is a sticky nav with mobile drawer.

### Component Organization
Feature-based structure under `src/components/`: `home/`, `tickets/`, `gallery/`, `spaces/`, `exhibitions/`, `activities/`, `contact/`, `about/`, `services/`, `seo/`, `layout/`, `ui/`. Barrel exports (`index.ts`) in each feature folder.

### Design System
- **Brand color:** MUNET green `#8DC63F` (defined as CSS custom properties in `src/index.css`)
- **Fonts:** DM Sans (headings), Inter (body), loaded as variable fonts
- **UI primitives:** Shadcn/ui (base-nova style) configured in `components.json`, uses Radix UI
- **Utility:** `cn()` helper in `src/lib/utils.ts` (clsx + tailwind-merge)

### Path Alias
`@/*` maps to `src/*` (configured in tsconfig and vite).

### Backend
AWS Lambda functions in `lambda/` handle Stripe checkout, webhooks, and space rental inquiries. They connect to DynamoDB and SES. Frontend API clients are in `src/lib/api/`.

### Build Optimization
Vite config has manual chunk splitting (react-vendor, router, forms, motion, ui-utils), asset hashing, and dev server warmup for critical paths. Deployed via AWS Amplify (`amplify.yml`).

### Forms
React Hook Form + Zod validation throughout. Resolvers via `@hookform/resolvers`.

## Key Conventions

- Functional components with hooks; default exports for pages, named exports for utilities
- Framer Motion variants defined at module level for reuse
- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`
- CSS custom properties for theming; Tailwind utility-first
- Environment variables prefixed with `VITE_` for client-side (see `.env.example`)
