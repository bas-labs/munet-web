# MUNET Web — Alcance de la Plataforma

> **Museo Nacional de Energía y Tecnología**  
> Web/App responsiva con módulos funcionales

---

## 📋 Entregables Principales

### 🌐 Sitio Web MUNET

**13 páginas:**
- Inicio, Exposiciones, Boletos, Planifica tu Visita
- Actividades, Quiénes Somos, Servicios, Fotogalería
- Renta de Espacios, Involúcrate, Contacto, Blog, Privacidad

**Stack técnico:**
- React + Vite + TypeScript + TailwindCSS + shadcn/ui
- Framer Motion: scroll reveals, transiciones, micro-interacciones
- SEO: meta tags, Open Graph, JSON-LD, sitemap.xml, robots.txt
- Mobile-first responsive · WCAG 2.1 AA

**Estado:** ✅ 12/13 páginas implementadas | 🔄 Blog pendiente

---

### 🎟️ Sistema de Boletaje

**8 tipos de boleto:**

| Tipo | Precio |
|------|--------|
| Nacional | $100 |
| Extranjero | $200 |
| Estudiante | $50 |
| Docente | $50 |
| INAPAM | Gratis |
| Niño 0-5 años | Gratis |
| Niño 6-12 años | $50 |
| Grupo (≥20) | $40/alumno |

**Funcionalidades:**
- Motor de reglas DynamoDB: domingos gratis, festivos, grupos ≥20, eventos especiales
- Selector de fecha (30 días) + capacidad en tiempo real
- Cálculo server-side: API Gateway + Lambda
- QR único por orden + email con PDF (SES)

**Estado:** ✅ Implementado con Stripe | 🔄 Migrar a OpenPay

---

### 💳 Pagos — OpenPay

**Métodos de pago:**
- Tarjeta crédito/débito (Visa, MC, AMEX)
- OXXO Pay (referencia, vence 72 hrs)

**Integraciones:**
- Webhooks: confirmación, fallo, reembolso
- Reconciliación automática vs MUNET_Orders
- Sandbox → Producción
- Fallback: eticket.mx

**Estado:** 🔄 Actualmente en Stripe, migrar a OpenPay

---

## 🔧 Plataforma Técnica

### 🎫 Emisión y Control de Acceso

- PDF + QR generado en Lambda, adjunto vía SES
- QR: `orderId + visitDate + hash de validación`
- Escaneo tótem/taquilla con validación server-side
- Prevención duplicados: estado `USED` en DynamoDB
- Reservación domingos gratis (mismo flujo, sin cobro)

**Estado:** 🔄 Pendiente implementar

---

### 📊 Panel Operativo (Dashboard)

**Módulos:**
- Ventas tiempo real: órdenes, ingresos, ticket promedio
- Ocupación por día + proyección de capacidad
- Gestión contenido: precios, horarios, eventos, festivos
- Reportes CSV / PDF exportables
- Alertas: capacidad 80%, errores pago, SES bounces

**Estado:** 🔄 Pendiente implementar

---

### ☁️ Infraestructura AWS

| Servicio | Configuración |
|----------|---------------|
| **Amplify Hosting** | + CloudFront CDN (museomunet.com) |
| **API Gateway REST** | → 10 Lambdas (Node.js 20, ESM) |
| **DynamoDB** | 6 tablas: Orders, TicketConfig, Events, Inquiries, Applications, Newsletter |
| **SES** | 6 templates transaccionales |
| **S3** | Assets + backups |
| **Secrets Manager** | API keys, tokens |
| **X-Ray** | Tracing |
| **CloudWatch** | Logs + Alarms |

**Estado:** ✅ Parcialmente implementado (3 Lambdas, 1 tabla)

---

## 📦 Estado por Módulo

### ✅ Completados

| Módulo | Ruta | Notas |
|--------|------|-------|
| Home | `/` | Hero, exposiciones preview, actividades, renta CTA, newsletter |
| Quiénes Somos | `/quienes-somos` | Historia, misión, visión, timeline |
| Exposiciones | `/exposiciones` | Catálogo permanentes y temporales |
| Actividades | `/actividades` | Calendario, eventos, talleres |
| Detalle Evento | `/actividades/:id` | Registro individual |
| Planifica tu Visita | `/planifica-tu-visita` | Ubicación, horarios, estacionamiento |
| Servicios | `/servicios` | Tienda, cafetería, audioguías |
| Fotogalería | `/fotogaleria` | Masonry grid, lightbox, filtros |
| Renta de Espacios | `/renta-de-espacios` | Catálogo, capacidades, formulario |
| Boletos | `/boletos` | Selector fecha/cantidad, checkout Stripe |
| Checkout Flow | `/checkout/*` | Success, cancel, lookup |
| Involúcrate | `/involucrate` | Voluntariado, donaciones, membresías |
| Contacto | `/contacto` | Formulario general |
| Aviso de Privacidad | `/aviso-de-privacidad` | Legal |

### 🔄 Pendientes

| Módulo | Ruta | Prioridad | Esfuerzo |
|--------|------|-----------|----------|
| Blog / Noticias | `/blog` | P1 | 2-3 semanas |
| Mapa Interactivo | `/mapa` | P2 | 1-2 semanas |
| Dashboard Operativo | `/admin/*` | P1 | 4-6 semanas |
| Migración a OpenPay | — | P0 | 1-2 semanas |
| QR + Control Acceso | — | P1 | 2 semanas |
| Dominio museomunet.com | — | P0 | 1-2 días |

---

## 🗃️ Tablas DynamoDB

| Tabla | Descripción | Estado |
|-------|-------------|--------|
| `Orders` | Órdenes de boletos | ✅ Existe |
| `TicketConfig` | Precios, reglas, festivos | 🔄 Pendiente |
| `Events` | Actividades y eventos | 🔄 Pendiente |
| `Inquiries` | Solicitudes de renta | ✅ Existe |
| `Applications` | Voluntariado, membresías | 🔄 Pendiente |
| `Newsletter` | Suscriptores | 🔄 Pendiente |

---

## 📧 Templates SES (6)

1. `ticket-confirmation` — Confirmación de compra con PDF adjunto
2. `ticket-reminder` — Recordatorio día anterior
3. `ticket-cancelled` — Cancelación/reembolso
4. `inquiry-received` — Confirmación solicitud de renta
5. `event-registration` — Registro a actividad
6. `newsletter-welcome` — Bienvenida a newsletter

**Estado:** 🔄 Solo 2 implementados actualmente

---

## 🔐 Lambdas (10 target)

| Lambda | Descripción | Estado |
|--------|-------------|--------|
| `createCheckoutSession` | Iniciar pago | ✅ |
| `handleStripeWebhook` | Procesar webhooks pago | ✅ |
| `submitInquiry` | Formulario renta | ✅ |
| `generateTicketPDF` | Generar PDF con QR | 🔄 |
| `validateTicket` | Validar QR en entrada | 🔄 |
| `getTicketConfig` | Obtener precios/reglas | 🔄 |
| `getCapacity` | Disponibilidad por fecha | 🔄 |
| `registerEvent` | Registro a actividad | 🔄 |
| `subscribeNewsletter` | Suscripción newsletter | 🔄 |
| `adminReports` | Reportes dashboard | 🔄 |

---

## 📅 Roadmap

### Fase 1 — MVP Público ✅
- [x] 12 páginas públicas
- [x] Sistema boletos (Stripe)
- [x] Formulario renta
- [x] Deploy Amplify

### Fase 2 — Pagos y Acceso (3-4 semanas)
- [ ] Migración Stripe → OpenPay
- [ ] OXXO Pay
- [ ] Generación PDF con QR
- [ ] Validación QR server-side
- [ ] Motor de reglas (domingos, festivos, grupos)

### Fase 3 — Dashboard (4-6 semanas)
- [ ] Auth Cognito
- [ ] Dashboard ventas
- [ ] Gestión de contenido
- [ ] Reportes exportables
- [ ] Alertas

### Fase 4 — Contenido (2-3 semanas)
- [ ] Blog/Noticias con CMS
- [ ] Mapa interactivo

### Fase 5 — Dominio y Correos
- [ ] Dominio museomunet.com
- [ ] Setup correos corporativos
- [ ] 6 templates SES

---

## 📁 Estructura del Repositorio

```
munet-web/
├── src/
│   ├── pages/           # 13 páginas (lazy loaded)
│   ├── components/      # Por feature
│   │   ├── home/
│   │   ├── tickets/
│   │   ├── gallery/
│   │   ├── spaces/
│   │   ├── activities/
│   │   ├── about/
│   │   ├── services/
│   │   ├── blog/        # 🔄 Pendiente
│   │   ├── admin/       # 🔄 Pendiente
│   │   ├── layout/
│   │   ├── ui/
│   │   └── seo/
│   ├── lib/
│   └── data/
├── lambda/              # 10 funciones (3 implementadas)
├── public/
└── amplify.yml
```

---

## ✅ Checklist Entregables

- [x] Webapp responsiva (12/13 páginas)
- [x] Sistema de venta de boletos (Stripe)
- [ ] Sistema de venta de boletos (OpenPay + OXXO)
- [x] Formulario renta de espacios
- [ ] Emisión QR + control de acceso
- [ ] Dashboard operativo
- [ ] Blog/Noticias
- [ ] Mapa interactivo
- [x] Backend serverless (Lambda + DynamoDB)
- [ ] 6 tablas DynamoDB
- [ ] 6 templates SES
- [ ] Dominio museomunet.com + correos
- [x] Amplify + CloudFront
- [ ] Monitoreo completo (X-Ray + CloudWatch)

---

*Última actualización: 2026-03-23*
