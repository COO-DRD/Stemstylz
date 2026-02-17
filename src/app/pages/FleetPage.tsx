import { useState } from 'react';
import { fleetVehicles } from '@/data/fleet-data';
import { Users, Briefcase, ArrowRight, Shield, Wifi, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FleetPageProps {
  onBookNow: () => void;
}

export function FleetPage({ onBookNow }: FleetPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'ECONOMY' | 'BUSINESS' | 'PREMIUM'>('ALL');

  const filteredVehicles = selectedCategory === 'ALL' 
    ? fleetVehicles 
    : fleetVehicles.filter(v => v.category === selectedCategory);

  const getTexture = (index: number) => {
    const textures = [
      'https://images.unsplash.com/photo-1763098905157-9dc89f617829?q=80&w=1080',
      'https://images.unsplash.com/photo-1650921906719-d163a7970a95?q=80&w=1080',
      'https://images.unsplash.com/photo-1763098905157-9dc89f617829?q=80&w=1080'
    ];
    return textures[index % textures.length];
  };

  const categoryInfo = {
    ECONOMY: {
      icon: Users,
      title: 'Corporate Standard',
      description: 'Punctuality. Comfort. Space.',
      details: 'Perfect for airport transfers and daily corporate commutes. Our economy fleet combines reliability with professional service.'
    },
    BUSINESS: {
      icon: Wifi,
      title: 'Executive Suite',
      description: 'Privacy. Prestige. Performance.',
      details: 'Premium vehicles for executives who demand excellence. Features include on-board Wi-Fi, privacy glass, and luxury amenities.'
    },
    PREMIUM: {
      icon: Shield,
      title: 'Diplomatic Prime',
      description: 'Security. Exclusivity. Excellence.',
      details: 'The pinnacle of luxury transport. Armored options available, with meet & greet service and VIP lounge access.'
    }
  };

  return (
    <div className="min-h-screen bg-obsidian pt-32 md:pt-40 safe-zone">
      {/* Editorial Hero */}
      <section className="luxury-container pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="editorial-grid"
        >
          <div className="col-span-16 lg:col-span-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-[1px] bg-stem-green" />
              <span className="text-stem-green text-xs font-light tracking-[0.3em] uppercase">
                Our Collection
              </span>
            </div>
            
            <h1 className="font-serif text-white font-semibold" style={{ letterSpacing: '-0.02em', opacity: 0.87 }}>
              The Fleet
            </h1>
            
            <p className="text-whisper max-w-2xl text-lg" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
              Meticulously curated vehicles engineered for executive precision.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Floating Filter Tabs - No Boxes */}
      <section className="luxury-container pb-12 md:pb-16">
        <div className="flex flex-wrap gap-6 md:gap-8">
          {['ALL', 'ECONOMY', 'BUSINESS', 'PREMIUM'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className="group relative"
            >
              <span 
                className="text-xs font-light tracking-[0.2em] uppercase transition-all duration-400"
                style={{ 
                  color: selectedCategory === category ? '#4CAF50' : 'rgba(176, 176, 176, 0.6)',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => selectedCategory !== category && (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.87)')}
                onMouseLeave={(e) => selectedCategory !== category && (e.currentTarget.style.color = 'rgba(176, 176, 176, 0.6)')}
              >
                {category}
              </span>
              <div 
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-stem-green transition-transform duration-400 origin-left"
                style={{ 
                  transform: selectedCategory === category ? 'scaleX(1)' : 'scaleX(0)',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }} 
              />
            </button>
          ))}
        </div>
      </section>

      {/* Category Details Panel - Glassmorphism */}
      <AnimatePresence mode="wait">
        {selectedCategory !== 'ALL' && categoryInfo[selectedCategory] && (
          <motion.section
            key={selectedCategory}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="luxury-container pb-16"
          >
            <div className="glass p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-2 flex items-start justify-center md:justify-start">
                  {(() => {
                    const IconComponent = categoryInfo[selectedCategory].icon;
                    return <IconComponent className="w-12 h-12 text-stem-green" />;
                  })()}
                </div>
                <div className="md:col-span-10 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-2" style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}>
                      {categoryInfo[selectedCategory].title}
                    </h3>
                    <p className="text-stem-green text-xs font-light tracking-[0.15em] uppercase">
                      {categoryInfo[selectedCategory].description}
                    </p>
                  </div>
                  <p className="text-sm font-light tracking-[0.05em] leading-relaxed" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                    {categoryInfo[selectedCategory].details}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Fleet Grid - Asymmetric, Floating Vehicles */}
      <section className="luxury-container pb-20 md:pb-32">
        <div className="space-y-24 md:space-y-32">
          {filteredVehicles.map((vehicle, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="editorial-grid gap-8 items-center"
              >
                {/* Vehicle Image - Floating over Texture (alternates left/right) */}
                <div className={`col-span-16 lg:col-span-9 ${isEven ? 'lg:col-start-1' : 'lg:col-start-8'} ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative group">
                    {/* Luxury Texture Background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-700 group-hover:opacity-30"
                      style={{
                        backgroundImage: `url('${getTexture(index)}')`,
                        transform: 'scale(1.1)'
                      }}
                    />
                    
                    {/* Floating Vehicle */}
                    <div className="relative z-10 transform transition-transform duration-700 group-hover:scale-105">
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                        className="w-full h-auto mix-blend-lighten opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          filter: 'contrast(1.1) brightness(1.05)',
                          maxHeight: '400px',
                          objectFit: 'contain'
                        }}
                      />
                    </div>

                    {/* Category Badge - Floating */}
                    <div className="absolute top-4 right-4 lg:top-8 lg:right-8">
                      <span className="inline-block px-4 py-2 glass text-stem-green text-[10px] font-light tracking-[0.3em] uppercase">
                        {vehicle.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Details - Editorial Typography */}
                <div className={`col-span-16 lg:col-span-7 ${isEven ? 'lg:col-start-10' : 'lg:col-start-1'} ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                  {/* Name */}
                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-2" style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}>
                      {vehicle.name}
                    </h2>
                    <p className="text-sm font-light tracking-[0.1em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                      {vehicle.model}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-whisper leading-relaxed" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                    {vehicle.description}
                  </p>

                  {/* Pricing - Editorial Format */}
                  <div className="flex items-baseline gap-4 pl-6" style={{ borderLeft: '1px solid rgba(76, 175, 80, 0.2)' }}>
                    <div>
                      <span className="font-serif text-4xl md:text-5xl text-stem-green font-semibold">
                        {vehicle.hourlyRate.toLocaleString()}
                      </span>
                      <span className="text-xs font-light tracking-[0.15em] uppercase ml-2" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                        KSh/Hr
                      </span>
                    </div>
                    <div className="text-xs font-light" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>
                      {vehicle.dailyRate.toLocaleString()} KSh daily
                    </div>
                  </div>

                  {/* Specifications - Minimal */}
                  <div className="flex items-center gap-8 pt-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ color: 'rgba(76, 175, 80, 0.5)' }} />
                      <span className="text-xs font-light tracking-[0.1em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                        {vehicle.passengers} PAX
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" style={{ color: 'rgba(76, 175, 80, 0.5)' }} />
                      <span className="text-xs font-light tracking-[0.1em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                        {vehicle.luggage} Bags
                      </span>
                    </div>
                  </div>

                  {/* Features - Whisper List */}
                  <div className="space-y-2 pt-2">
                    {vehicle.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: 'rgba(76, 175, 80, 0.5)' }} />
                        <span className="text-xs font-light tracking-[0.05em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                          {feature}
                        </span>
                      </div>
                    ))}</div>

                  {/* Reserve Button */}
                  <button
                    onClick={onBookNow}
                    className="btn-liquid inline-flex items-center gap-3 mt-4"
                  >
                    <span className="text-xs tracking-[0.2em]">
                      RESERVE THIS CLASS
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm font-light tracking-[0.15em] uppercase" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
              No vehicles in this category
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
