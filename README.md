# StemConcepts - Premium Executive Transportation Platform

A modern, luxury executive transportation platform for Mombasa and Nairobi, Kenya. Built with React, TypeScript, Tailwind CSS v4, and powered by Supabase.

## 🚀 Features

- **5-Step Booking Engine** with Google Maps integration
- **Role-Based Dashboards** for customers, corporate clients, drivers, and admins
- **Real-Time Fleet Management** with live tracking
- **M-Pesa Payment Integration** support
- **Responsive Design** with mobile-first approach
- **Glassmorphism UI** with luxury aesthetic
- **Three-Tier Vehicle Selection**: Corporate Standard, Executive Suite, Diplomatic Prime

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1 + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 + Custom Theme
- **Animations**: Motion (formerly Framer Motion)
- **Maps**: Google Maps API with React Google Maps
- **Backend**: Supabase (Authentication, Database, Storage)
- **Build Tool**: Vite 6.3.5

## 📋 Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm
- Google Maps API Key
- Supabase Account

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stemconcepts.git
   cd stemconcepts
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Google Maps API Key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Google Maps Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API
     - Directions API
   - Create an API key
   - Add the key to your `.env` file

5. **Supabase Setup**
   - Create a new project at [Supabase](https://supabase.com)
   - Copy your project URL and anon key
   - Add them to your `.env` file

## 🚀 Development

Run the development server:

```bash
pnpm run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build for Production

Build the application:

```bash
pnpm run build
# or
npm run build
```

The build output will be in the `dist` directory.

## 📦 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Deploy to Netlify

1. Build the project:
   ```bash
   pnpm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Add environment variables in Netlify dashboard

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   pnpm add -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "vite build && gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts` with base path:
   ```typescript
   export default defineConfig({
     base: '/stemconcepts/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   pnpm run deploy
   ```

## 🎨 Design System

### Color Palette
- **Stem Green**: `#4CAF50` - Primary action color
- **Obsidian Black**: `#000000` - Base background
- **Charcoal**: `#121212` - Surface background
- **White**: `rgba(255, 255, 255, 0.87)` - Primary text
- **Silver Mist**: `rgba(176, 176, 176, 0.6)` - Secondary text

### Typography
- **Headers**: Playfair Display (Serif, 600 weight, -0.02em spacing)
- **Body**: Inter (300 weight, 0.05em spacing)

### Animation Timing
- **Luxury Motion**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Duration**: 300-400ms for interactions

## 📂 Project Structure

```
stemconcepts/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/          # UI primitives
│   │   │   └── figma/       # Figma-specific components
│   │   ├── pages/           # Page components
│   │   └── App.tsx          # Main app component
│   ├── data/                # Static data
│   ├── styles/              # Global styles & theme
│   └── utils/               # Utility functions
├── supabase/                # Supabase functions
├── public/                  # Static assets
├── package.json
├── vite.config.ts
└── README.md
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes |
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## 📱 Features Overview

### Booking Flow
1. **Location Selection**: Pickup & dropoff with Google Maps autocomplete
2. **Schedule**: Date, time, and trip type selection
3. **Fleet Selection**: Three-tier vehicle classes
4. **Passenger Details**: Contact information
5. **Payment**: M-Pesa integration (coming soon)

### Pages
- **Home**: Hero section with booking engine
- **Fleet**: Vehicle catalog with specifications
- **About**: Company story and values
- **Contact**: Contact form and information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by StemConcepts. All rights reserved.

## 📞 Contact

StemConcepts Kenya
- Phone: +254 759 275857
- Email: info@stemconcepts.co.ke
- WhatsApp: +254 759 275857
- Location: Mombasa, Kenya

---

**Built with precision. Designed for excellence.** ✨
