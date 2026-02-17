# StemConcepts Component Architecture

## Booking Flow with Google Maps Integration

```
App.tsx
└── BrowserRouter
    └── Routes
        └── HomePage.tsx
            ├── Hero.tsx
            │   └── "Book Now" button → triggers BookingFlow
            │
            ├── GoogleMapsNotice.tsx (dismissible)
            │   └── Links to setup documentation
            │
            └── BookingFlow.tsx (Modal - z-50)
                ├── useLoadScript (Google Maps loader)
                │
                ├── STEP 1: Logistics Foundation
                │   ├── GoogleMapsAutocomplete.tsx (Pickup)
                │   │   ├── Google Places API
                │   │   ├── Custom dark dropdown styling
                │   │   └── Returns: address string + PlaceResult object
                │   │
                │   ├── GoogleMapsAutocomplete.tsx (Dropoff)
                │   │   ├── Same as pickup
                │   │   └── Returns: address string + PlaceResult object
                │   │
                │   ├── FloatingInput (Date)
                │   ├── FloatingInput (Time)
                │   ├── FloatingInput (Passengers)
                │   │
                │   └── RouteMap.tsx (conditionally rendered)
                │       ├── Google Maps instance
                │       │   ├── Dark night mode styles
                │       │   └── Mombasa, Kenya center
                │       │
                │       ├── DirectionsService
                │       │   └── Calculates route
                │       │
                │       ├── DirectionsRenderer
                │       │   └── Draws green route line (#059669)
                │       │
                │       └── Info Overlay (glassmorphism)
                │           ├── Distance display
                │           └── Duration display
                │
                ├── STEP 2: Fleet Tier Selection
                │   ├── Corporate Standard
                │   ├── Executive Suite
                │   └── Diplomatic Prime
                │
                ├── STEP 3: Live Fleet Scan
                │   ├── Scanning animation
                │   └── Driver assignment
                │
                ├── STEP 4: Multi-Channel Checkout
                │   ├── M-Pesa payment
                │   └── WhatsApp concierge
                │
                └── STEP 5: Digital Boarding Pass
                    ├── 6-digit confirmation code
                    └── Journey details
```

## Data Flow

### Location Selection Flow
```
User types → Google Places API → Suggestions dropdown → User selects
                                                              ↓
                                    Store: formatted_address (string)
                                    Store: PlaceResult (object with geometry)
                                                              ↓
                                    Both locations filled? → Render RouteMap
                                                              ↓
                                    DirectionsService calculates route
                                                              ↓
                                    DirectionsRenderer draws green line
                                                              ↓
                                    Display distance + duration in overlay
```

### State Management (BookingFlow.tsx)
```typescript
// Location data
[pickup, setPickup]                          // String: "Moi International Airport"
[dropoff, setDropoff]                        // String: "Serena Beach Hotel"
[pickupPlace, setPickupPlace]                // PlaceResult: { geometry: {...}, ... }
[dropoffPlace, setDropoffPlace]              // PlaceResult: { geometry: {...}, ... }

// Journey data
[date, setDate]                              // String: "2026-02-15"
[time, setTime]                              // String: "14:30"
[passengers, setPassengers]                  // String: "2"

// Booking flow
[step, setStep]                              // Number: 1-5
[selectedTier, setSelectedTier]              // FleetTier object
[assignedDriver, setAssignedDriver]          // Driver object
[confirmationCode, setConfirmationCode]      // String: "A3X9K2"
```

## File Structure

```
/src
├── app
│   ├── components
│   │   ├── BookingFlow.tsx ..................... Main booking modal (5 steps)
│   │   ├── GoogleMapsAutocomplete.tsx .......... Location search component
│   │   ├── RouteMap.tsx ........................ Map visualization component
│   │   ├── GoogleMapsNotice.tsx ................ Setup reminder component
│   │   ├── FloatingInput.tsx ................... Styled input component
│   │   ├── Hero.tsx ............................ Homepage hero section
│   │   └── Header.tsx .......................... Navigation header
│   │
│   └── pages
│       └── HomePage.tsx ........................ Main landing page
│
├── styles
│   ├── theme.css ............................... Luxury color system
│   ├── fonts.css ............................... Cormorant Garamond + Inter
│   └── tailwind.css ............................ Tailwind imports
│
└── data
    └── fleet-data.ts ........................... Vehicle tier definitions

/package.json .................................... Dependencies
/GOOGLE_MAPS_SETUP.md ............................ Full setup guide
/GOOGLE_MAPS_IMPLEMENTATION.md ................... Technical details
/QUICKSTART_GOOGLE_MAPS.md ....................... Quick reference
```

## Styling Architecture

### Theme Variables (theme.css)
```css
--obsidian-black: #050505       /* Page background */
--charcoal: #1A1A1B             /* Glass panels */
--champagne-gold: #D4AF37       /* Accents & highlights */
--platinum: #E5E4E2             /* Primary text */
--stem-green: #059669           /* Route line, success states */
```

### Component Styles
```
Glassmorphism Panel
├── Background: rgba(26, 26, 27, 0.6)
├── Backdrop: blur(20px) saturate(180%)
├── Border: 1px solid rgba(212, 175, 55, 0.1)
└── Shadow: 0 20px 60px rgba(0, 0, 0, 0.7)

Ghost Button
├── Background: transparent
├── Color: champagne-gold
├── Underline: 1px gold, animates on hover
└── Transition: 400ms cubic-bezier

Floating Input
├── Border-bottom: 1px platinum/20
├── Focus: 1px gold/50
├── Label: Floats up on focus/fill
└── Icon: Changes to gold on focus
```

## API Integration Points

### Google Maps Platform APIs Used

1. **Maps JavaScript API**
   - Renders interactive map
   - Applies custom dark styling
   - Controls: zoom only

2. **Places API** (Autocomplete)
   - Powers location search
   - Returns: address, geometry, place_id
   - Restriction: Kenya only (configurable)

3. **Directions API**
   - Calculates optimal route
   - Returns: distance, duration, polyline
   - Mode: DRIVING

4. **Geocoding API** (indirect)
   - Converts addresses to coordinates
   - Used internally by Places API

## Performance Optimizations

### Lazy Loading
```typescript
useLoadScript({
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"]
})
// Script loaded only when booking modal opens
```

### Conditional Rendering
```typescript
{pickup && dropoff && pickupPlace && dropoffPlace && (
  <RouteMap ... />
)}
// Map rendered only when both locations selected
```

### CSS Injection
```typescript
useEffect(() => {
  if (isLoaded) {
    injectGoogleMapsStyles();
  }
}, [isLoaded]);
// Styles injected once, not on every render
```

## Security Considerations

### API Key Protection
- ⚠️ Current: Hardcoded (development only)
- ✅ Production: Environment variables
- ✅ Restrictions: HTTP referrer limits
- ✅ Monitoring: Usage alerts enabled

### Data Privacy
- No location data stored server-side
- No user tracking
- No third-party analytics on map
- Compliant with GDPR principles

## Testing Scenarios

### Happy Path
1. User clicks "Book Now"
2. Types "Moi Airport" → sees suggestions
3. Selects from dropdown
4. Types "Serena Hotel" → sees suggestions
5. Selects from dropdown
6. Map appears with green route
7. Sees "39.2 km • 45 min"
8. Continues to fleet selection

### Edge Cases
- No API key → Manual text input works
- Invalid location → No map rendered
- Slow network → Loading spinner shown
- API error → Console logged, flow continues

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 8+)

## Responsive Breakpoints

- **Mobile:** < 768px (1 column layout)
- **Tablet:** 768px - 1024px (2 column layout)
- **Desktop:** > 1024px (full layout)

Map height: 300px (fixed across breakpoints)

---

**Last Updated:** February 13, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
