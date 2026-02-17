# 📋 Quick Reference Card

## 🚀 Deploy Commands (Copy & Paste)

### Push to GitHub
```bash
git init
git add .
git commit -m "StemConcepts production ready"
git remote add origin https://github.com/YOUR_USERNAME/stemconcepts.git
git branch -M main
git push -u origin main
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel login
vercel
```

---

## 🔑 Environment Variables (Required)

Add these in your deployment platform:

```env
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

**Get Google Maps Key**: [console.cloud.google.com](https://console.cloud.google.com/)  
**Get Supabase Keys**: [supabase.com/dashboard](https://supabase.com/dashboard)

---

## ✅ Post-Deployment Checklist

1. [ ] Add environment variables
2. [ ] Verify site loads
3. [ ] Test booking flow
4. [ ] Check Google Maps loads
5. [ ] Verify mobile responsive
6. [ ] Test all contact methods

---

## 🎨 Design System Quick Ref

```css
Primary Color: #4CAF50 (Stem Green)
Background: #000000 (Obsidian)
Surface: #121212 (Charcoal)
Text Primary: rgba(255, 255, 255, 0.87)
Text Secondary: rgba(176, 176, 176, 0.6)

Font Headers: Playfair Display, 600, -0.02em
Font Body: Inter, 300, 0.05em

Transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
Hover: text-shadow: 0 0 8px rgba(76, 175, 80, 0.5)
```

---

## 📞 Support Contacts

**StemConcepts**  
📧 info@stemconcepts.co.ke  
📱 +254 759 275857  
💬 [WhatsApp](https://wa.me/254759275857)

---

## 📚 Documentation Files

- `README.md` - Main documentation
- `DEPLOYMENT_GUIDE.md` - Detailed deployment steps
- `QUICK_DEPLOY.md` - 5-minute quick start
- `PRODUCTION_CHECKLIST.md` - Complete pre-launch checklist
- `DEPLOYMENT_STATUS.md` - Current status report
- `GITHUB_DEPLOYMENT_READY.md` - Deployment summary
- `FINAL_SUMMARY.md` - Complete overview

---

## 🐛 Quick Troubleshooting

**Build fails**: `rm -rf node_modules && pnpm install`  
**Map blank**: Enable billing + check API keys  
**404 on refresh**: Already fixed (vercel.json)  
**Env vars not working**: Must start with `VITE_`

---

## ✨ Status

```
✅ Supabase: CONNECTED
✅ Code: COMPLETE
✅ Design: STANDARDIZED  
✅ Config: READY
✅ Docs: COMPREHENSIVE

🚀 STATUS: READY TO DEPLOY
```

**Estimated Deploy Time**: 10 minutes  
**Platform**: Vercel (recommended)  
**Cost**: $0 (free tier)

---

**Last Updated**: February 17, 2026  
**Version**: 1.0.0  
**Ready**: ✅ YES
