import { useState, useEffect } from 'react';
import { Hero } from '@/app/components/Hero';
import { BookingFlow } from '@/app/components/BookingFlow';
import { GoogleMapsNotice } from '@/app/components/GoogleMapsNotice';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function HomePage() {
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [showGoogleMapsNotice, setShowGoogleMapsNotice] = useState(true);

  // Check URL params for booking=open
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('booking') === 'open') {
      setShowBookingFlow(true);
      // Clean URL
      window.history.replaceState({}, '', '/');
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Hero onBookNow={() => setShowBookingFlow(true)} />
      </div>

      {/* Google Maps Setup Notice - Only shown if not dismissed */}
      {showGoogleMapsNotice && (
        <GoogleMapsNotice onDismiss={() => setShowGoogleMapsNotice(false)} />
      )}

      {/* Booking Flow Modal */}
      {showBookingFlow && (
        <BookingFlow onClose={() => setShowBookingFlow(false)} />
      )}

      {/* Values Section - Editorial */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-charcoal safe-zone">
        <div className="luxury-container">
          <div className="editorial-grid gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-16 lg:col-span-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-[1px] bg-gold" />
                <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">
                  The StemConcepts Standard
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    title: 'Surgical Precision',
                    description: 'Every journey timed to the second. We understand your schedule is non-negotiable.'
                  },
                  {
                    title: 'Unwavering Luxury',
                    description: 'Premium fleet maintained to showroom standards. Every detail matters.'
                  },
                  {
                    title: 'Absolute Discretion',
                    description: 'Professional chauffeurs trained in executive service protocol and confidentiality.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="font-serif text-platinum text-2xl md:text-3xl font-light">
                      {item.title}
                    </h3>
                    <p className="text-whisper text-platinum/70 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Minimal Grid */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-obsidian safe-zone">
        <div className="luxury-container">
          <div className="editorial-grid gap-12">
            <div className="col-span-16 lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-[1px] bg-gold" />
                <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">
                  Elite Services
                </span>
              </div>

              <h2 className="font-serif text-platinum mb-12">
                Crafted for<br />Executives
              </h2>

              <div className="space-y-6">
                {[
                  { label: 'Airport Transfers', sub: 'Guaranteed punctuality' },
                  { label: 'Corporate Charters', sub: 'Multi-day executive service' },
                  { label: 'VIP Events', sub: 'Red carpet arrivals' },
                  { label: 'Hotel Transfers', sub: 'Seamless transitions' }
                ].map((service, index) => (
                  <motion.div
                    key={service.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between py-4 border-b border-gold/10 group cursor-pointer"
                  >
                    <div>
                      <span className="text-platinum text-lg font-light tracking-wide block">
                        {service.label}
                      </span>
                      <span className="text-platinum/40 text-xs font-light tracking-[0.15em] uppercase">
                        {service.sub}
                      </span>
                    </div>
                    <div className="w-6 h-[1px] bg-gold transform scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA - Glassmorphic */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-gradient-to-br from-charcoal to-obsidian safe-zone">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass shadow-deeper p-8 md:p-12 lg:p-16 max-w-4xl mx-auto"
          >
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-gold text-xs font-light tracking-[0.3em] uppercase">
                  24/7 Concierge
                </span>
                <div className="w-12 h-[1px] bg-gold" />
              </div>

              <h2 className="font-serif text-platinum">
                Your Journey<br />Begins Here
              </h2>

              <p className="text-whisper text-platinum/70 max-w-2xl mx-auto text-lg">
                Relationship champions standing by to orchestrate your perfect journey
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <a
                  href="tel:+254759275857"
                  className="group flex items-center gap-3"
                >
                  <Phone className="w-5 h-5 text-gold/50 transition-all duration-400 group-hover:text-gold group-hover:rotate-12" />
                  <span className="text-platinum text-sm font-light tracking-[0.15em] group-hover:text-gold transition-colors duration-400">
                    +254 759 275857
                  </span>
                </a>

                <div className="w-[1px] h-6 bg-gold/20 hidden sm:block" />

                <a
                  href="https://wa.me/254759275857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <MessageCircle className="w-5 h-5 text-gold/50 transition-all duration-400 group-hover:text-gold" />
                  <span className="text-platinum text-sm font-light tracking-[0.15em] group-hover:text-gold transition-colors duration-400">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}