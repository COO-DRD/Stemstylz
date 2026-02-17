# Quick Start: Google Maps Integration

## ⚡ 5-Minute Setup

### 1. Get API Key (2 min)
```bash
1. Visit: https://console.cloud.google.com/
2. Create/Select Project
3. Enable APIs: Maps JavaScript, Places, Directions, Geocoding
4. Create API Key
```

### 2. Add to Code (30 sec)
```typescript
// File: /src/app/components/BookingFlow.tsx
// Line 66: Replace this line:

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

// With your actual key:
const GOOGLE_MAPS_API_KEY = 'AIzaSyC...your-key-here';
```

### 3. Test (2 min)
```bash
1. Click "Book Now" button
2. Type "Moi Airport" in pickup field
3. See dropdown with suggestions
4. Select location
5. Type "Serena Hotel" in dropoff
6. Watch map appear with green route
```

## 🎨 Visual Features at a Glance

| Feature | Description | Color |
|---------|-------------|-------|
| **Autocomplete** | Dark dropdown, gold hover | Gold: #D4AF37 |
| **Route Line** | Drawn on map | Green: #059669 |
| **Map Style** | Night mode, minimal UI | Black: #0a0a0a |
| **Info Overlay** | Distance + Duration | Glass panel |

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Map not loading | Check API key, enable billing |
| No dropdown | Enable Places API in console |
| "For development only" | Add domain restrictions |
| TypeScript errors | Run `npm install` again |

## 📍 Quick Customizations

### Change Country
```typescript
// GoogleMapsAutocomplete.tsx, line 26
componentRestrictions: { country: 'ke' }, // ← Change 'ke' to your code
```

### Change Route Color
```typescript
// RouteMap.tsx, line 98
strokeColor: '#059669', // ← Change to any color
```

### Change Map Center
```typescript
// RouteMap.tsx, line 126
const mombasaCenter = { lat: -4.0435, lng: 39.6682 }; // ← Your coords
```

## 💰 Cost Calculator

For **X bookings per month:**
- Autocomplete: X × 2 × $0.00283 = $___
- Directions: X × 1 × $0.005 = $___
- Map loads: X × 1 × $0.007 = $___

**Free if under 11,000 bookings/month** ($200 credit)

## 🔗 Important Links

- **Full Setup Guide:** `/GOOGLE_MAPS_SETUP.md`
- **Implementation Details:** `/GOOGLE_MAPS_IMPLEMENTATION.md`
- **Google Console:** https://console.cloud.google.com/
- **Pricing Calculator:** https://mapsplatform.google.com/pricing/

## ✅ Production Checklist

Before going live:

- [ ] Move API key to environment variable
- [ ] Enable billing in Google Cloud
- [ ] Add domain restrictions to API key
- [ ] Set up usage alerts
- [ ] Test on mobile devices
- [ ] Verify all locations work
- [ ] Check console for errors
- [ ] Test with slow connection

## 🎯 What's Working Right Now

Even without API key:
✅ Booking flow works  
✅ All 5 steps function  
✅ Fleet selection  
✅ Payment options  
✅ Confirmation codes  

With API key:
🎉 Live location search  
🎉 Google Maps visualization  
🎉 Distance calculation  
🎉 Duration estimates  
🎉 Route optimization  

---

**Need Help?** Check `/GOOGLE_MAPS_SETUP.md` for detailed instructions.
