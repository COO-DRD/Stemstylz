import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBookNow?: () => void;
}

export function Hero({ onBookNow }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-obsidian safe-zone">
      {/* Cinematic Background - Layered */}
      <div className="absolute inset-0">
        {/* Chauffeur Door Opening - Hero Shot */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1712097243009-ba8516e023f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
            backgroundPosition: '65% center'
          }}
        />
        
        {/* Mombasa Skyline - Bokeh Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-soft-light"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1613453578536-2409c9314ee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
            filter: 'blur(8px)'
          }}
        />
        
        {/* Deep Gradient Overlay - Midnight Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        
        {/* Luxury Texture */}
        <div className="absolute inset-0 texture-overlay opacity-40" />
      </div>

      {/* Editorial Asymmetric Content */}
      <div className="relative z-10 w-full">
        <div className="editorial-grid luxury-container py-20 md:py-32 lg:py-40 gap-8">
          {/* Left Column - Editorial Typography (spans 10 of 16 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="col-span-16 lg:col-span-10 space-y-8 lg:space-y-12"
          >
            {/* Overline - Whisper Text */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-[1px] bg-gold" />
              <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">
                Executive Transport
              </span>
            </div>

            {/* Main Headline - Asymmetric */}
            <div className="space-y-4">
              <h1 className="font-serif text-platinum">
                Precision
                <br />
                in Every
                <br />
                <span className="text-gold">Journey</span>
              </h1>
              
              <p className="text-whisper max-w-2xl text-platinum/70 text-base md:text-lg lg:text-xl pl-1">
                Where surgical timing meets uncompromising luxury.
                <br className="hidden md:block" />
                Your VIP chauffeur experience across Mombasa & Nairobi.
              </p>
            </div>

            {/* Booking Interface - Glassmorphic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass shadow-deeper p-6 md:p-8 lg:p-10 max-w-3xl"
            >
              <div className="space-y-6">
                <p className="text-platinum/70 text-sm font-light tracking-[0.05em]">
                  Begin your executive journey with precision-timed transport
                </p>

                {/* Ghost Button with Arrow */}
                <button
                  onClick={onBookNow}
                  className="group relative overflow-hidden"
                >
                  <span className="flex items-center gap-3 text-gold text-xs font-light tracking-[0.2em] uppercase transition-all duration-400">
                    Reserve Your Experience
                    <ArrowRight className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-2" />
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </button>
              </div>
            </motion.div>

            {/* Trust Indicators - Minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-wrap items-center gap-8 text-platinum/50 text-xs font-light tracking-[0.15em] uppercase"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <span>24/7 Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <span>Fixed Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <span>45min Free Wait</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Negative Space (intentionally empty for 40% breathing room) */}
          <div className="hidden lg:block col-span-6" />
        </div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-platinum/30 text-[10px] font-light tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </div>
  );
}
