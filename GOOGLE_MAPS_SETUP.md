# Google Maps API Integration Guide

## Setup Instructions

### 1. Get Your Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Directions API**
   - **Geocoding API**

4. Create credentials (API Key)
5. Restrict your API key (recommended):
   - Set HTTP referrer restrictions to your domain
   - Limit API access to only the APIs listed above

### 2. Add Your API Key

Open `/src/app/components/BookingFlow.tsx` and replace:

```typescript
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';
```

with:

```typescript
const GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_API_KEY';
```

### 3. Production Best Practices

For production deployment:

1. **Never commit API keys to version control**
2. Use environment variables instead:

```typescript
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
```

3. Create a `.env.local` file (add to .gitignore):

```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Set up billing in Google Cloud Console
5. Monitor API usage and set up alerts

## Features Implemented

### Location Search
- **Autocomplete**: Real-time location suggestions as you type
- **Kenya-focused**: Results prioritized for Kenya (can be changed)
- **Dark Mode UI**: Custom styled dropdown matching StemConcepts brand

### Route Visualization
- **Live Map**: Night mode styled Google Map
- **Route Drawing**: Green (#059669) route line between pickup and dropoff
- **Distance & Duration**: Automatically calculated route metrics
- **Responsive**: Smooth animations and mobile-friendly

### Luxury Aesthetic
- **Glassmorphism**: Dark glass panels with subtle borders
- **Gold Accents**: Champagne gold (#D4AF37) highlights
- **Editorial Typography**: Cormorant Garamond and Inter fonts
- **Smooth Transitions**: 400ms easing animations

## API Costs

Google Maps Platform pricing (as of 2026):
- Autocomplete: $2.83 per 1000 requests
- Directions API: $5 per 1000 requests
- Map loads: $7 per 1000 loads

**First $200/month is free** (Google Cloud credit)

## Customization

### Change Location Restrictions

In `GoogleMapsAutocomplete.tsx`, modify:

```typescript
componentRestrictions: { country: 'ke' }, // Change 'ke' to your country code
```

### Adjust Route Color

In `RouteMap.tsx`, change:

```typescript
strokeColor: '#059669', // Change to any hex color
```

### Modify Map Center

In `RouteMap.tsx`:

```typescript
const mombasaCenter = { lat: -4.0435, lng: 39.6682 }; // Update coordinates
```

## Troubleshooting

**Map not loading?**
- Check API key is correct
- Verify APIs are enabled in Google Cloud Console
- Check browser console for errors

**Autocomplete not working?**
- Ensure Places API is enabled
- Check API key restrictions aren't too strict
- Verify billing is enabled (required for production)

**Custom styles not appearing?**
- Check browser console for errors
- Ensure `injectGoogleMapsStyles()` is being called
- Try clearing browser cache
