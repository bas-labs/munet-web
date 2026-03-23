# MUNET Web — Scope del Proyecto

> **Museo Nacional de Energía y Tecnología**  
> Web/App responsiva con módulos funcionales

---

## 📋 Resumen Ejecutivo

Creación y configuración de webapp responsiva para el Museo Nacional de Energía y Tecnología (MUNET), incluyendo módulos de información, venta de boletos, renta de espacios, y dashboard operativo.

---

## 🏗️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | React 19 + TypeScript 5.9 + Vite 7 |
| **Styling** | Tailwind CSS 4 + Shadcn/ui |
| **Animaciones** | Framer Motion + GSAP + Lenis |
| **Backend** | AWS Lambda (Node.js) |
| **Base de datos** | AWS DynamoDB |
| **Pagos** | Stripe (checkout, webhooks) |
| **Email** | AWS SES |
| **Hosting** | AWS Amplify + CloudFront |
| **Dominio** | munet.mx |

---

## 📦 Módulos — Estado Actual

### ✅ Completados

| Módulo | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| **Home** | `/` | Hero, exposiciones preview, actividades, renta CTA, newsletter | ✅ Live |
| **Quiénes Somos** | `/quienes-somos` | Historia de MUNET, misión, visión, timeline | ✅ Live |
| **Exposiciones** | `/exposiciones` | Catálogo de exposiciones permanentes y temporales | ✅ Live |
| **Actividades** | `/actividades` | Calendario de eventos, talleres, visitas guiadas | ✅ Live |
| **Detalle Evento** | `/actividades/:id` | Página individual de evento con registro | ✅ Live |
| **Planifica tu Visita** | `/planifica-tu-visita` | Ubicación, horarios, estacionamiento, accesibilidad | ✅ Live |
| **Servicios** | `/servicios` | Tienda, cafetería, audioguías, accesibilidad | ✅ Live |
| **Fotogalería** | `/fotogaleria` | Galería masonry con lightbox y filtros por categoría | ✅ Live |
| **Renta de Espacios** | `/renta-de-espacios` | Catálogo de espacios, capacidades, formulario de cotización | ✅ Live |
| **Compra de Boletos** | `/boletos` | Selector de fecha/cantidad, integración Stripe | ✅ Live |
| **Checkout Flow** | `/checkout/*` | Success, cancel, lookup de órdenes | ✅ Live |
| **Involúcrate** | `/involucrate` | Voluntariado, donaciones, membresías | ✅ Live |
| **Contacto** | `/contacto` | Formulario de contacto general | ✅ Live |
| **Aviso de Privacidad** | `/aviso-de-privacidad` | Legal | ✅ Live |

### 🔄 En Desarrollo / Pendientes

| Módulo | Ruta | Descripción | Prioridad |
|--------|------|-------------|-----------|
| **Mapa Interactivo** | `/mapa` | Mapa del museo por niveles con puntos de interés | 🟡 P1 |
| **Noticias / Blog** | `/noticias` | Sistema de publicaciones con CMS headless | 🟡 P1 |
| **Dashboard Operativo** | `/admin/*` | Panel de administración para el museo | 🔴 P2 |

---

## 🗺️ Mapa Interactivo — Especificación

**Objetivo:** Navegación visual del museo por niveles con puntos de interés interactivos.

### Funcionalidades
- Vista de planta por nivel (Nivel 1, Nivel 2, Sótano)
- Puntos de interés clickeables (exposiciones, servicios, salidas)
- Tooltip/modal con info de cada punto
- Filtros por categoría (exposiciones, servicios, accesibilidad)
- Indicador de "Estás aquí" (futuro: integración con beacons)
- Responsive: zoom/pan en móvil

### Assets Requeridos
- SVG de planta arquitectónica por nivel (ya hay `nivel1.png`, `nivel2.png`)
- Iconografía de puntos de interés
- Datos de coordenadas de cada punto

### Implementación Técnica
- React + SVG interactivo (o librería como `react-zoom-pan-pinch`)
- Data layer en JSON o DynamoDB
- Componente `InteractiveMap.tsx` con estado de nivel activo

---

## 📰 Noticias / Blog — Especificación

**Objetivo:** Publicar noticias, comunicados y artículos del museo.

### Funcionalidades
- Listado de artículos con paginación
- Página de detalle de artículo
- Categorías/tags
- Búsqueda básica
- SEO optimizado (structured data, meta tags)
- Compartir en redes sociales

### Backend Options
1. **DynamoDB + Lambda** — Consistente con stack actual
2. **CMS Headless** — Sanity, Strapi, o Contentful (más fácil para editores)
3. **MDX en repo** — Para contenido estático (sin CMS)

### Rutas
- `/noticias` — Listado
- `/noticias/:slug` — Detalle

---

## 🎛️ Dashboard Operativo — Especificación

**Objetivo:** Panel de administración para gestión del museo.

### Módulos del Dashboard

| Módulo | Funcionalidad |
|--------|---------------|
| **Ventas** | Reportes de boletos vendidos, ingresos por día/semana/mes |
| **Eventos** | CRUD de actividades y eventos |
| **Espacios** | Ver/gestionar solicitudes de renta |
| **Contenido** | Editar exposiciones, servicios, noticias |
| **Usuarios** | Gestión de accesos administrativos |
| **Analytics** | Integración con GA4, métricas de uso |

### Autenticación
- AWS Cognito (user pools)
- Roles: Admin, Editor, Viewer

### Stack Sugerido
- Ruta: `/admin/*` (lazy loaded, separado del sitio público)
- UI: Shadcn/ui dashboard components
- Charts: Recharts o Tremor
- Tables: TanStack Table

---

## 🌐 Infraestructura

### Dominio y DNS
- **Dominio:** munet.mx
- **Configuración:** Route 53 o registrador externo → CloudFront

### Setup de Correos
- **Transaccionales:** AWS SES (confirmaciones de compra, contacto)
- **Corporativos:** Google Workspace o Zoho (info@munet.mx, etc.)

### Plataforma AWS
| Servicio | Uso |
|----------|-----|
| **Amplify** | Hosting frontend, CI/CD |
| **CloudFront** | CDN, SSL |
| **Lambda** | API serverless (Stripe, forms) |
| **DynamoDB** | Datos (órdenes, espacios, eventos) |
| **SES** | Email transaccional |
| **S3** | Assets estáticos, backups |
| **Cognito** | Auth para dashboard |

### Monitoreo
- CloudWatch Logs (Lambda)
- CloudWatch Alarms (errores, latencia)
- Amplify deploy notifications
- UptimeRobot o similar (health checks)

### Actualizaciones
- Dependabot para seguridad
- Deploys automáticos en push a `main`
- Staging branch para QA

---

## 📅 Roadmap Sugerido

### Fase 1 — Lanzamiento MVP ✅
- [x] Sitio público completo
- [x] Sistema de boletos con Stripe
- [x] Renta de espacios (formulario)
- [x] Deploy en Amplify

### Fase 2 — Contenido Dinámico (2-3 semanas)
- [ ] Mapa interactivo
- [ ] Blog/Noticias con CMS
- [ ] Dominio munet.mx + correos

### Fase 3 — Dashboard Operativo (4-6 semanas)
- [ ] Autenticación Cognito
- [ ] Dashboard de ventas
- [ ] CRUD de eventos
- [ ] Gestión de solicitudes de renta

### Fase 4 — Optimización (Ongoing)
- [ ] Analytics avanzados
- [ ] PWA / App móvil
- [ ] Integración con POS físico
- [ ] Beacons para mapa interactivo

---

## 📁 Estructura del Repositorio

```
munet-web/
├── src/
│   ├── pages/           # Páginas (lazy loaded)
│   ├── components/      # Componentes por feature
│   │   ├── home/
│   │   ├── tickets/
│   │   ├── gallery/
│   │   ├── spaces/
│   │   ├── activities/
│   │   ├── about/
│   │   ├── services/
│   │   ├── layout/
│   │   ├── ui/          # Shadcn/ui components
│   │   └── seo/
│   ├── lib/             # Utilities, API clients, types
│   └── data/            # Static data files
├── lambda/              # AWS Lambda functions
│   ├── createCheckoutSession.ts
│   ├── handleStripeWebhook.ts
│   └── submitInquiry.ts
├── public/              # Static assets
└── amplify.yml          # Amplify build config
```

---

## 🔐 Variables de Entorno

### Frontend (`.env`)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_API_URL=https://api.munet.mx
VITE_GA_MEASUREMENT_ID=G-XXXXXXX
```

### Lambda
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SES_FROM_EMAIL=boletos@munet.mx
DYNAMODB_TABLE_ORDERS=munet-orders
```

---

## ✅ Entregables Incluidos

1. ✅ Webapp responsiva con todos los módulos públicos
2. ✅ Sistema de venta de boletos (Stripe)
3. ✅ Sistema de renta de espacios (formulario + notificaciones)
4. ✅ Backend serverless (Lambda + DynamoDB + SES)
5. ✅ Hosting en AWS Amplify + CloudFront
6. 🔄 Dominio munet.mx y setup de correos
7. 🔄 Mapa interactivo del museo
8. 🔄 Sistema de noticias/blog
9. 🔄 Dashboard operativo
10. ✅ Monitoreo básico (CloudWatch)
11. 🔄 Documentación de operación

---

*Última actualización: 2026-03-23*
