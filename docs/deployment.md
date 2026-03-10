# MUNET Deployment Guide

**Version:** 1.0
**Platform:** AWS Amplify + Vite
**Last Updated:** March 2026

---

## Overview

MUNET uses AWS Amplify for hosting with CloudFront CDN. The frontend is a Vite-built React SPA, with backend services on API Gateway + Lambda.

---

## Environment Variables

### Frontend (Vite)

Set these in AWS Amplify Console → App settings → Environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | API Gateway endpoint | `https://api.museomunet.com` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_xxx` or `pk_test_xxx` |

**Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to the client.

### Backend (Lambda)

Set these in AWS Lambda Console → Configuration → Environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe secret key (NEVER expose to frontend) | `sk_live_xxx` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_xxx` |
| `SES_FROM_EMAIL` | Verified SES sender email | `no-reply@museomunet.com` |
| `SES_REGION` | AWS region for SES | `us-east-1` |
| `DYNAMODB_ORDERS_TABLE` | DynamoDB orders table name | `munet-orders` |
| `DYNAMODB_INQUIRIES_TABLE` | DynamoDB inquiries table name | `munet-inquiries` |
| `DYNAMODB_REGION` | AWS region for DynamoDB | `us-east-1` |

---

## Build Configuration

### amplify.yml

Located at project root. Defines build phases:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Build Scripts

```bash
npm run build       # Production build (tsc + vite)
npm run build:prod  # Explicit production build
npm run preview     # Preview production build locally
npm run type-check  # TypeScript type checking
npm run lint        # ESLint checks
```

---

## SPA Routing

The `public/_redirects` file handles client-side routing:

```
/*  /index.html  200
```

This ensures all routes return the SPA shell, allowing React Router to handle routing.

---

## CloudFront Configuration

Amplify automatically provisions CloudFront. Recommended settings:

### Caching Behavior

| Path Pattern | Cache Policy | TTL |
|--------------|--------------|-----|
| `/assets/*` | CachingOptimized | 1 year (immutable) |
| `/index.html` | CachingDisabled | 0 (always fresh) |
| `/*.js`, `/*.css` | CachingOptimized | 1 year (immutable) |
| Default (`/*`) | CachingOptimized | 1 day |

### Compression

- Enable automatic compression (Gzip, Brotli)
- Vite already produces optimized bundles

### HTTPS

- Amplify auto-provisions SSL certificates
- All HTTP traffic redirects to HTTPS

### Security Headers

Configured in `amplify.yml` customHeaders section:

- `X-Frame-Options: DENY` — Prevent clickjacking
- `X-Content-Type-Options: nosniff` — Prevent MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` — Control referrer info
- `X-XSS-Protection: 1; mode=block` — XSS filter (legacy browsers)

For enhanced security, consider adding CSP header in Amplify Console:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.museomunet.com https://api.stripe.com; frame-src https://js.stripe.com;
```

---

## Domain Configuration

### Step 1: Add Custom Domain in Amplify

1. Go to AWS Amplify Console
2. Select MUNET app
3. Go to **App settings → Domain management**
4. Click **Add domain**
5. Enter `museomunet.com`

### Step 2: Configure DNS Records

Add these records at your DNS provider:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `<amplify-cloudfront-url>` | 300 |
| ALIAS/ANAME | `@` | `<amplify-cloudfront-url>` | 300 |

For apex domain (`museomunet.com`):
- If your DNS supports ALIAS/ANAME records (Route 53, Cloudflare), use that
- Otherwise, use a redirect from apex to `www`

### Step 3: SSL Certificate

- Amplify automatically provisions and renews SSL certificates via ACM
- Certificates include both `museomunet.com` and `www.museomunet.com`
- Verification is automatic after DNS propagation (usually 5-30 minutes)

### Step 4: Subdomain for API (Optional)

For API Gateway custom domain (`api.museomunet.com`):

1. Go to API Gateway Console → Custom domain names
2. Create domain name: `api.museomunet.com`
3. Request/import certificate in ACM
4. Add CNAME record pointing to API Gateway domain
5. Add base path mapping to your API stage

---

## CI/CD Pipeline

### Automatic Deployments

Amplify auto-deploys when commits are pushed to connected branches:

| Branch | Environment | Auto-deploy |
|--------|-------------|-------------|
| `main` | Production | ✅ Yes |
| `develop` | Staging | ✅ Yes (optional) |
| `feature/*` | Preview | ✅ Yes (optional) |

### Branch Previews (Optional)

Enable branch previews for PRs:

1. Amplify Console → App settings → Previews
2. Enable previews
3. Each PR gets a unique preview URL

### Build Notifications

Set up notifications in Amplify Console → Notifications:
- Build started
- Build succeeded
- Build failed

Connect to Slack, email, or webhook.

---

## Monitoring & Logging

### CloudWatch Logs

**Frontend (Amplify):**
- Build logs in Amplify Console
- CloudFront access logs (enable in Amplify → Monitoring)

**Backend (Lambda):**
- Lambda execution logs in CloudWatch Logs
- Log groups: `/aws/lambda/munet-*`

### Recommended Alarms

Create CloudWatch alarms for:

| Metric | Threshold | Action |
|--------|-----------|--------|
| Lambda errors | > 5/min | SNS notification |
| Lambda duration | > 5000ms | SNS notification |
| API Gateway 5xx | > 10/min | SNS notification |
| DynamoDB throttles | > 0 | SNS notification |

### Stripe Dashboard

Monitor payments at https://dashboard.stripe.com:
- Successful/failed payments
- Webhook deliveries
- Disputes and refunds

### Google Analytics (Optional)

Add GA4 tracking:

```typescript
// src/lib/analytics.ts
export const GA_TRACKING_ID = import.meta.env.VITE_GA_ID;

// Initialize in main.tsx
```

---

## Troubleshooting

### Build Fails

1. Check Amplify build logs for errors
2. Ensure all environment variables are set
3. Verify `npm ci` can resolve all dependencies
4. Check TypeScript errors: `npm run type-check`

### 404 on Page Refresh

- Verify `public/_redirects` exists with `/*  /index.html  200`
- Check Amplify rewrites/redirects in Console

### Environment Variables Not Working

- Frontend vars MUST start with `VITE_`
- Rebuild after changing env vars (changes don't apply to existing builds)
- Check for typos in variable names

### Stripe Integration Issues

- Verify webhook endpoint URL is production URL
- Check webhook secret matches env var
- Monitor Stripe Dashboard → Developers → Webhooks for failures

---

## Security Checklist

- [ ] All secrets stored in environment variables (never in code)
- [ ] Stripe keys are correct mode (live vs test)
- [ ] SES is out of sandbox mode for production
- [ ] DynamoDB tables have appropriate IAM policies
- [ ] API Gateway has throttling configured
- [ ] Lambda functions have minimal IAM permissions
- [ ] CORS is properly configured on API Gateway
- [ ] No sensitive data in client-side code

---

## Rollback Procedure

If a deployment causes issues:

1. Go to Amplify Console → App
2. Click on **Deployments**
3. Find the last working deployment
4. Click **Redeploy this version**

Alternatively, revert the git commit and push:
```bash
git revert HEAD
git push origin main
```

---

*Document maintained by MUNET engineering team.*
