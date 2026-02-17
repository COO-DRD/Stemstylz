# 🚀 Production Deployment Checklist for StemConcepts

## ✅ Pre-Deployment Verification

### 1. Code Quality
- [ ] All TypeScript errors resolved
- [ ] No console errors in browser
- [ ] All routes tested and working
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested (Chrome, Safari, Firefox, Edge)

### 2. Environment Configuration
- [ ] `.env.example` file created with all required variables
- [ ] `.env` file exists locally with actual values
- [ ] Environment variables documented in README
- [ ] `.gitignore` includes `.env` file

### 3. Google Maps Setup
- [ ] Google Cloud Project created
- [ ] Billing enabled on Google Cloud
- [ ] Maps JavaScript API enabled
- [ ] Places API enabled
- [ ] Geocoding API enabled
- [ ] Directions API enabled
- [ ] API key created
- [ ] API key restrictions configured (domain/IP whitelist)
- [ ] Daily quota limits set appropriately

### 4. Supabase Configuration
- [ ] Supabase project created
- [ ] Database schema designed
- [ ] Row Level Security (RLS) policies configured
- [ ] Authentication methods set up
- [ ] Storage buckets created (if needed)
- [ ] API keys obtained (URL + anon key)
- [ ] Database backup enabled

### 5. Security
- [ ] All secrets stored in environment variables (never in code)
- [ ] CORS properly configured in Supabase
- [ ] API rate limiting considered
- [ ] SQL injection prevention (using parameterized queries)
- [ ] XSS protection enabled
- [ ] HTTPS enforced
- [ ] Security headers configured (see vercel.json/netlify.toml)

### 6. Performance Optimization
- [ ] Images optimized (compressed, proper formats)
- [ ] Code splitting implemented
- [ ] Lazy loading for routes/components
- [ ] Bundle size analyzed (<500KB gzipped ideal)
- [ ] Lighthouse score >90 for Performance
- [ ] Core Web Vitals passing
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

### 7. SEO & Meta Tags
- [ ] Title tags optimized (50-60 characters)
- [ ] Meta descriptions added (150-160 characters)
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Favicon.ico in public folder
- [ ] robots.txt created
- [ ] sitemap.xml generated
- [ ] Canonical URLs set

### 8. Analytics & Monitoring
- [ ] Google Analytics installed (optional)
- [ ] Error tracking set up (Sentry, LogRocket, etc.)
- [ ] Performance monitoring configured
- [ ] Uptime monitoring enabled
- [ ] User feedback mechanism

### 9. Content Review
- [ ] All placeholder text replaced with final copy
- [ ] Contact information correct (+254 759 275857)
- [ ] Email addresses verified (info@stemconcepts.co.ke)
- [ ] Legal pages ready (Terms, Privacy Policy)
- [ ] Copyright year current (2026)

### 10. Testing
- [ ] Unit tests passing (if applicable)
- [ ] E2E tests passing (if applicable)
- [ ] Manual testing completed
- [ ] Booking flow tested end-to-end
- [ ] Form submissions working
- [ ] Payment integration tested (M-Pesa when ready)
- [ ] Email notifications working (if applicable)
- [ ] SMS notifications working (if applicable)

---

## 🌐 Deployment Platform Setup

### Option A: Vercel (Recommended)

#### Initial Setup
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported to Vercel

#### Configuration
- [ ] Build command: `pnpm run build`
- [ ] Output directory: `dist`
- [ ] Install command: `pnpm install`
- [ ] Node version: 20.x

#### Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:
- [ ] `VITE_GOOGLE_MAPS_API_KEY` (Production, Preview, Development)
- [ ] `VITE_SUPABASE_URL` (Production, Preview, Development)
- [ ] `VITE_SUPABASE_ANON_KEY` (Production, Preview, Development)

#### Custom Domain
- [ ] Domain purchased and verified
- [ ] DNS records configured:
  - A record: `@` → Vercel IP
  - CNAME record: `www` → `cname.vercel-dns.com`
- [ ] SSL certificate issued (automatic in Vercel)
- [ ] Domain propagation verified (24-48 hours)

#### Vercel Settings
- [ ] Auto-deploy on git push enabled
- [ ] Preview deployments enabled for PRs
- [ ] Production branch set to `main`
- [ ] Deployment protection enabled (optional)

---

### Option B: Netlify

#### Initial Setup
- [ ] Netlify account created
- [ ] GitHub repository connected
- [ ] Site created from repository

#### Build Settings
- [ ] Build command: `pnpm run build`
- [ ] Publish directory: `dist`
- [ ] Node version: 20

#### Environment Variables
Add these in Netlify Dashboard → Site settings → Environment variables:
- [ ] `VITE_GOOGLE_MAPS_API_KEY`
- [ ] `VITE_SUPABASE_URL`
- [ ] `VITE_SUPABASE_ANON_KEY`

#### Custom Domain
- [ ] Domain added in Netlify
- [ ] DNS records configured
- [ ] HTTPS enabled
- [ ] SSL certificate issued

#### Netlify Settings
- [ ] Deploy previews enabled
- [ ] Branch deploys configured
- [ ] Forms enabled (if using Netlify Forms)

---

## 🔒 Security Configuration

### Google Maps API Security
- [ ] API key restricted to specific domains:
  - `stemconcepts.co.ke`
  - `www.stemconcepts.co.ke`
  - `*.vercel.app` (for previews)
- [ ] Daily quota alerts set up
- [ ] Unused APIs disabled

### Supabase Security
- [ ] Row Level Security enabled on all tables
- [ ] Service role key secured (never exposed to client)
- [ ] Auth redirect URLs configured
- [ ] CORS origins set correctly
- [ ] Database backups automated

### Application Security
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all forms
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens (if using forms)
- [ ] Content Security Policy headers

---

## 📊 Post-Deployment Verification

### Immediate Checks (Within 1 hour)
- [ ] Homepage loads successfully
- [ ] All pages accessible via navigation
- [ ] Booking flow functional
- [ ] Google Maps loads correctly
- [ ] Forms submit successfully
- [ ] Mobile view renders properly
- [ ] SSL certificate active (HTTPS)
- [ ] No console errors
- [ ] No 404 errors

### Performance Checks
- [ ] Run Google PageSpeed Insights
- [ ] Score >90 on mobile
- [ ] Score >95 on desktop
- [ ] Core Web Vitals passing
- [ ] GTmetrix analysis completed

### Functionality Testing
- [ ] Test from different devices:
  - [ ] iPhone (Safari)
  - [ ] Android (Chrome)
  - [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Test booking flow completely
- [ ] Test all contact methods (phone, email, WhatsApp)
- [ ] Verify Google Maps directions
- [ ] Check fleet page vehicle display
- [ ] Test about page animations
- [ ] Verify footer links

### SEO Verification
- [ ] Google Search Console configured
- [ ] Sitemap submitted to Google
- [ ] Robots.txt accessible
- [ ] Meta tags rendering correctly
- [ ] Open Graph preview working (Facebook Debugger)
- [ ] Twitter Card preview working (Twitter Card Validator)

---

## 📈 Monitoring Setup

### Analytics
- [ ] Google Analytics 4 installed
- [ ] Conversion goals configured:
  - Booking form submissions
  - Phone clicks
  - WhatsApp clicks
  - Contact form submissions
- [ ] E-commerce tracking (if applicable)

### Error Monitoring
- [ ] Error tracking service integrated
- [ ] Email alerts for critical errors configured
- [ ] Error rate threshold set

### Uptime Monitoring
- [ ] Uptime monitoring service configured
- [ ] Check frequency: 5 minutes
- [ ] Alert channels set up (email, SMS, Slack)
- [ ] Status page created (optional)

### Performance Monitoring
- [ ] Real User Monitoring (RUM) enabled
- [ ] Synthetic monitoring set up
- [ ] Performance budgets defined
- [ ] Alerts for slow pages

---

## 🚨 Emergency Procedures

### Rollback Plan
- [ ] Previous deployment accessible
- [ ] Rollback procedure documented
- [ ] Rollback can be executed in <5 minutes

### Incident Response
- [ ] On-call person designated
- [ ] Contact list maintained
- [ ] Escalation procedure defined
- [ ] Communication channels established

### Backup & Recovery
- [ ] Database backups verified
- [ ] Backup restoration tested
- [ ] Recovery time objective (RTO) defined
- [ ] Recovery point objective (RPO) defined

---

## 📞 Support Contacts

### Technical Support
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Netlify Support**: [netlify.com/support](https://netlify.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Google Cloud Support**: [cloud.google.com/support](https://cloud.google.com/support)

### StemConcepts Team
- **Technical Lead**: [contact info]
- **Operations**: info@stemconcepts.co.ke
- **Emergency**: +254 759 275857

---

## ✅ Final Sign-Off

- [ ] **Development Team Lead** - Code review complete
- [ ] **QA Team** - Testing approved
- [ ] **Security Team** - Security audit passed
- [ ] **DevOps** - Infrastructure ready
- [ ] **Product Owner** - Business requirements met
- [ ] **Stakeholder** - Final approval granted

### Deployment Approval
- **Date**: _______________
- **Time**: _______________
- **Approved By**: _______________
- **Signature**: _______________

---

## 🎉 Post-Launch

### Week 1
- [ ] Monitor error rates daily
- [ ] Review performance metrics
- [ ] Analyze user behavior
- [ ] Collect user feedback
- [ ] Address critical issues immediately

### Month 1
- [ ] Conduct post-mortem meeting
- [ ] Document lessons learned
- [ ] Plan next iteration
- [ ] Review KPIs
- [ ] Optimize based on data

---

**Last Updated**: February 17, 2026
**Version**: 1.0
**Status**: ✅ Ready for Deployment
