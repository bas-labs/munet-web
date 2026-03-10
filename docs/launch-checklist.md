# MUNET Launch Checklist

**Target Launch Date:** _________________
**Last Updated:** March 2026

---

## Pre-Launch

### AWS Infrastructure

- [ ] AWS account configured with appropriate billing alerts
- [ ] IAM roles created with least-privilege permissions
- [ ] DynamoDB tables created:
  - [ ] `munet-orders`
  - [ ] `munet-inquiries`
  - [ ] `munet-events` (if applicable)
- [ ] Lambda functions deployed to production
- [ ] API Gateway deployed to `prod` stage
- [ ] API Gateway custom domain configured (`api.museomunet.com`)

### Amplify Hosting

- [ ] Amplify app connected to GitHub repository
- [ ] Build settings verified (`amplify.yml`)
- [ ] All environment variables set:
  - [ ] `VITE_API_URL`
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY`
- [ ] Custom domain added (`museomunet.com`)
- [ ] SSL certificate active and valid
- [ ] Branch auto-deploy enabled for `main`

### DNS & Domain

- [ ] DNS records configured correctly
- [ ] DNS propagation complete (check with `dig` or whatsmydns.net)
- [ ] HTTPS working on both `museomunet.com` and `www.museomunet.com`
- [ ] Redirect from HTTP to HTTPS working

### Stripe Integration

- [ ] Stripe account in live mode
- [ ] Live API keys configured in Lambda environment
- [ ] Webhook endpoint created: `https://api.museomunet.com/webhook/stripe`
- [ ] Webhook signing secret configured
- [ ] Webhook events subscribed:
  - [ ] `checkout.session.completed`
  - [ ] `payment_intent.succeeded`
  - [ ] `payment_intent.payment_failed`
- [ ] Test purchase completed successfully with test keys
- [ ] Products/prices configured in Stripe Dashboard

### Email (SES)

- [ ] SES domain verified (`museomunet.com`)
- [ ] Production access granted (out of sandbox)
- [ ] Sender email verified: `no-reply@museomunet.com`
- [ ] Email templates tested:
  - [ ] Order confirmation
  - [ ] Inquiry confirmation

### Content & Assets

- [ ] All production images uploaded and optimized
- [ ] All copy reviewed and finalized (Spanish)
- [ ] Legal pages complete:
  - [ ] Aviso de Privacidad
  - [ ] Términos y Condiciones
- [ ] Favicon and app icons set
- [ ] Open Graph images configured
- [ ] No placeholder/lorem ipsum content remaining

### SEO

- [ ] Meta titles and descriptions on all pages
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] robots.txt allows crawling
- [ ] sitemap.xml generated and submitted to Google
- [ ] Google Search Console verified
- [ ] Structured data (JSON-LD) implemented:
  - [ ] Organization schema
  - [ ] Museum schema
  - [ ] Event schema (for activities)

### Performance

- [ ] Lighthouse audit score ≥ 90 on all categories
- [ ] LCP < 2.5 seconds
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Images optimized (WebP format)
- [ ] Code splitting working (check network tab)
- [ ] Gzip/Brotli compression enabled

### Accessibility

- [ ] WCAG 2.1 AA compliance checked
- [ ] Keyboard navigation working
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Color contrast ratios compliant
- [ ] Alt text on all images
- [ ] Focus indicators visible
- [ ] Skip link present

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS (mobile)
- [ ] Chrome Android (mobile)

### Responsive Design

- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

---

## Launch Day

### Deployment

- [ ] Final code review completed
- [ ] Main branch is clean and up-to-date
- [ ] Amplify build successful
- [ ] Production URL accessible

### Verification

- [ ] Homepage loads correctly
- [ ] All pages accessible via navigation
- [ ] Responsive design working
- [ ] Forms submitting correctly
- [ ] Stripe checkout working (use test mode first)

### Go-Live Checklist

- [ ] Switch Stripe to live mode keys
- [ ] Remove any test/debug code
- [ ] Clear CDN cache if needed
- [ ] Notify stakeholders of launch
- [ ] Social media announcement ready

---

## Post-Launch (First 24-48 Hours)

### Functional Verification

- [ ] All pages load correctly on production URL
- [ ] Navigation works on all pages
- [ ] Ticket purchase flow complete (real transaction test)
- [ ] Contact form submission working
- [ ] Inquiry form submission working
- [ ] Email deliverability confirmed
- [ ] QR codes scanning correctly

### Monitoring

- [ ] CloudWatch logs flowing
- [ ] No Lambda errors in logs
- [ ] Amplify build logs clean
- [ ] Stripe webhook events processing
- [ ] No 404 errors in access logs

### Performance Validation

- [ ] Lighthouse audit on production
- [ ] Real user metrics collecting (if analytics set up)
- [ ] CDN cache working (check response headers)

### Security Check

- [ ] SSL certificate valid (check expiration)
- [ ] HSTS header present
- [ ] No mixed content warnings
- [ ] Stripe keys are live (not test)

---

## Post-Launch (First Week)

### Analytics Setup

- [ ] Google Analytics tracking confirmed
- [ ] Conversion goals configured
- [ ] Search Console data populating

### Ongoing Monitoring

- [ ] Daily check of CloudWatch logs
- [ ] Daily check of Stripe Dashboard
- [ ] Daily check of SES bounce/complaint rates
- [ ] Weekly Lighthouse audits

### Documentation

- [ ] Runbook completed for common issues
- [ ] Contact list for escalations
- [ ] Deployment rollback procedure documented

---

## Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| Project Lead | | |
| Backend Engineer | | |
| Frontend Engineer | | |
| AWS Support | | |
| Stripe Support | support@stripe.com | |

---

## Rollback Plan

If critical issues arise:

1. **Immediate:** Revert to previous Amplify deployment
   - Amplify Console → Deployments → Redeploy previous version

2. **Code rollback:**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Complete rollback:** Point DNS to maintenance page

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Technical Lead | | | |
| Product Owner | | | |
| QA Lead | | | |

---

*Last verified: _________________*
