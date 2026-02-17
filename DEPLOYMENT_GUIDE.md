# StemConcepts Deployment Guide

This guide will walk you through deploying the StemConcepts platform to various hosting providers.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Google Maps API Key with required APIs enabled
- [ ] Supabase project set up with URL and anon key
- [ ] All environment variables ready
- [ ] Tested the application locally
- [ ] Committed all changes to Git

---

## 🚀 Option 1: Deploy to Vercel (Recommended)

Vercel offers the best performance and easiest deployment for Vite applications.

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - StemConcepts platform"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/stemconcepts.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

5. Add Environment Variables:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_ANON_KEY=your_key_here
   ```

6. Click "Deploy"

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

### Step 3: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain (e.g., `stemconcepts.co.ke`)
4. Update DNS records as instructed

---

## 🌐 Option 2: Deploy to Netlify

### Step 1: Build the Project

```bash
pnpm run build
```

### Step 2: Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command**: `pnpm run build`
   - **Publish directory**: `dist`
   - **Node version**: `20`

6. Add Environment Variables in "Site settings" → "Environment variables":
   ```
   VITE_GOOGLE_MAPS_API_KEY
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   ```

7. Click "Deploy site"

### Step 3: Deploy via Netlify CLI (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

---

## 📱 Option 3: Deploy to GitHub Pages

GitHub Pages is free but has some limitations (no server-side features).

### Step 1: Install gh-pages

```bash
pnpm add -D gh-pages
```

### Step 2: Update package.json

Add the following scripts:

```json
{
  "scripts": {
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/stemconcepts"
}
```

### Step 3: Update vite.config.ts

```typescript
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/stemconcepts/', // Replace with your repo name
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Step 4: Deploy

```bash
pnpm run deploy
```

### Step 5: Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Source", select "gh-pages" branch
4. Save

**Note**: Environment variables need to be hardcoded in the build for GitHub Pages (not recommended for production).

---

## 🔧 Environment Variables Setup

### Required Variables

| Variable | Description | How to Get |
|----------|-------------|------------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | [Google Cloud Console](https://console.cloud.google.com/) |
| `VITE_SUPABASE_URL` | Supabase project URL | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API |

### Google Maps Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key
6. (Optional) Restrict the API key to your domain

### Supabase Setup

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Wait for the project to be provisioned
4. Go to Project Settings → API
5. Copy the "Project URL" and "anon public" key

---

## 🛡️ Security Best Practices

### 1. API Key Security

- Never commit `.env` files to Git
- Use environment variables in deployment platforms
- Restrict Google Maps API key to your domain
- Rotate keys regularly

### 2. Supabase Security

- Enable Row Level Security (RLS) on all tables
- Set up proper authentication rules
- Use the anon key only for public data
- Never expose service role keys

### 3. HTTPS

- Always use HTTPS in production
- Most hosting providers (Vercel, Netlify) provide automatic SSL
- For custom domains, ensure SSL certificates are configured

---

## 📊 Post-Deployment Tasks

### 1. Test Everything

- [ ] All pages load correctly
- [ ] Booking flow works end-to-end
- [ ] Google Maps integration functions
- [ ] Forms submit successfully
- [ ] Mobile responsiveness
- [ ] Performance (Google PageSpeed Insights)

### 2. Set Up Analytics (Optional)

Add Google Analytics or similar:

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Monitor Performance

- Set up Vercel Analytics or Netlify Analytics
- Monitor error logs
- Set up uptime monitoring (e.g., UptimeRobot)

### 4. Configure DNS

If using a custom domain:

1. Add CNAME record pointing to deployment platform
2. Wait for DNS propagation (can take up to 48 hours)
3. Verify SSL certificate is issued

---

## 🐛 Troubleshooting

### Build Failures

**Issue**: Build fails with module not found
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

**Issue**: Environment variables not working
- Ensure variables are prefixed with `VITE_`
- Restart development server after adding new variables
- Check deployment platform has variables set correctly

### Google Maps Not Loading

**Issue**: Map shows blank or "For development purposes only"
- Verify API key is correct
- Ensure billing is enabled on Google Cloud
- Check API restrictions match your domain
- Confirm all required APIs are enabled

### Routing Issues

**Issue**: Refreshing page shows 404
- Ensure rewrites are configured (see vercel.json / netlify.toml)
- For Apache, use .htaccess redirect rules
- For Nginx, configure try_files directive

### Performance Issues

**Issue**: Slow page loads
- Enable code splitting in Vite
- Optimize images (use WebP format)
- Enable CDN caching
- Lazy load components

---

## 📞 Support

For deployment issues:

- **Platform Issues**: Check respective platform documentation
  - [Vercel Docs](https://vercel.com/docs)
  - [Netlify Docs](https://docs.netlify.com)
  - [GitHub Pages Docs](https://docs.github.com/pages)

- **Application Issues**: Contact StemConcepts support
  - Email: info@stemconcepts.co.ke
  - Phone: +254 759 275857

---

## ✅ Deployment Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Google Maps API key set up and restricted
- [ ] Supabase project configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] All pages tested
- [ ] Mobile responsiveness verified
- [ ] Forms and booking flow working
- [ ] Error tracking set up
- [ ] Analytics configured
- [ ] Performance optimized
- [ ] SEO meta tags added
- [ ] Favicon and manifest configured

---

**Congratulations!** 🎉 Your StemConcepts platform is now live!
