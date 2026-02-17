# 🚀 Quick Deploy Guide - StemConcepts

Get your StemConcepts platform live in under 10 minutes!

## Prerequisites Checklist
- [ ] GitHub account
- [ ] Google Maps API Key ([Get it here](https://console.cloud.google.com/))
- [ ] Supabase account ([Sign up here](https://supabase.com))
- [ ] Vercel or Netlify account (free tier works!)

---

## 🎯 Deploy to Vercel (Fastest - 5 Minutes)

### Step 1: Push to GitHub (2 minutes)

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit - StemConcepts"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/stemconcepts.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com) and click "Sign Up" (use GitHub)
2. Click "Add New Project"
3. Import your `stemconcepts` repository
4. Click "Deploy" (it will fail first, that's expected!)

### Step 3: Add Environment Variables (1 minute)

1. Go to Project Settings → Environment Variables
2. Add these three variables:

```
Name: VITE_GOOGLE_MAPS_API_KEY
Value: [Paste your Google Maps API key]
Environment: Production, Preview, Development

Name: VITE_SUPABASE_URL  
Value: [Paste your Supabase URL]
Environment: Production, Preview, Development

Name: VITE_SUPABASE_ANON_KEY
Value: [Paste your Supabase anon key]
Environment: Production, Preview, Development
```

3. Click "Save"

### Step 4: Redeploy

1. Go to "Deployments" tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"
4. Wait ~2 minutes

### ✅ Done!

Your site is live at: `https://your-project.vercel.app`

---

## 🌐 Deploy to Netlify (Alternative - 7 Minutes)

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Configure:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

### Step 3: Add Environment Variables

1. Go to Site settings → Environment variables
2. Click "Add a variable" and add:
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Step 4: Trigger Rebuild

1. Go to Deploys
2. Click "Trigger deploy" → "Clear cache and deploy site"

### ✅ Done!

Your site is live at: `https://your-site.netlify.app`

---

## 🔑 Getting Your Keys

### Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Click "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "API Key"
5. Enable these APIs (Navigation menu → "Library"):
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API
6. **Important**: Enable billing (required even for free tier)
7. Copy your API key

### Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New project"
3. Fill in details and wait for provisioning (~2 minutes)
4. Go to Project Settings → API
5. Copy:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - anon public key (the long string starting with `eyJ...`)

---

## 🎨 Custom Domain Setup (Optional)

### On Vercel

1. Buy domain from any registrar (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings → Domains
3. Add your domain: `stemconcepts.co.ke`
4. Follow DNS instructions provided
5. Wait for DNS propagation (up to 48 hours)

### On Netlify

1. In Netlify: Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic)

---

## ✅ Verify Deployment

Visit your site and check:
- [ ] Homepage loads
- [ ] All pages accessible (Fleet, About, Contact)
- [ ] Booking flow opens
- [ ] Google Maps loads
- [ ] No console errors (F12 → Console)
- [ ] Works on mobile

---

## 🆘 Troubleshooting

### "Map failed to load" Error
**Fix**: 
1. Verify Google Maps API key is correct
2. Check billing is enabled on Google Cloud
3. Ensure all 4 APIs are enabled (Maps JavaScript, Places, Geocoding, Directions)
4. Check API key restrictions allow your domain

### "Cannot connect to Supabase" Error
**Fix**:
1. Verify Supabase URL is correct (should start with https://)
2. Check anon key is the public key (not service role)
3. Ensure Supabase project is not paused

### Build Fails
**Fix**:
1. Check environment variables are set correctly
2. Ensure variable names start with `VITE_`
3. Verify pnpm-lock.yaml is committed to git
4. Check Node version is 18+ or 20+

### 404 on Page Refresh
**Fix**: Already handled by vercel.json and netlify.toml!
If still happening:
- Vercel: Should work automatically
- Netlify: Verify netlify.toml is in root directory

---

## 📞 Need Help?

- **StemConcepts Support**: info@stemconcepts.co.ke
- **Phone**: +254 759 275857
- **Documentation**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)

---

## 🎉 Success!

Once deployed, share your site:
- Production URL: `https://your-site.vercel.app`
- Custom Domain: `https://stemconcepts.co.ke` (when configured)

**Next Steps**:
1. Test all functionality
2. Set up monitoring
3. Configure analytics
4. Share with team
5. Go live! 🚀

---

**Deployment Time**: ~5-10 minutes
**Cost**: $0 (free tier)
**Maintenance**: Automatic updates on git push
