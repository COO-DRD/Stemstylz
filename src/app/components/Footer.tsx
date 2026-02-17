import { Link } from 'react-router';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onBookNow: () => void;
}

export function Footer({ onBookNow }: FooterProps) {
  const services = [
    {
      title: 'Airport Transfers',
      description: 'Guaranteed punctuality for all flights',
      action: onBookNow
    },
    {
      title: 'Corporate Travel',
      description: 'Multi-day executive service',
      action: onBookNow
    },
    {
      title: 'Executive Charters',
      description: 'Premium long-distance journeys',
      action: onBookNow
    },
    {
      title: 'VIP Events',
      description: 'Red carpet arrivals',
      action: onBookNow
    }
  ];

  return (
    <footer className="bg-charcoal" style={{ borderTop: '1px solid rgba(76, 175, 80, 0.1)' }}>
      <div className="luxury-container py-16 md:py-20 lg:py-24">
        <div className="editorial-grid gap-12 md:gap-16">
          {/* Brand Column */}
          <div className="col-span-16 lg:col-span-6 space-y-6">
            <Link to="/" className="inline-flex flex-col leading-none group">
              <span 
                className="font-serif text-3xl md:text-4xl font-semibold transition-all duration-500 group-hover:tracking-wider"
                style={{ 
                  color: '#4CAF50',
                  letterSpacing: '-0.02em',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Stem
              </span>
              <span 
                className="font-serif text-3xl md:text-4xl font-semibold transition-all duration-500 group-hover:tracking-wider"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.87)',
                  letterSpacing: '-0.02em',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Concepts
              </span>
            </Link>
            
            <p className="text-sm font-light tracking-[0.05em] max-w-md leading-relaxed" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
              Surgical precision in executive transport.
              <br />
              Your VIP chauffeur experience across Kenya.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="col-span-8 lg:col-span-3 space-y-4">
            <h4 className="text-stem-green text-xs font-light tracking-[0.3em] uppercase mb-6">
              Navigate
            </h4>
            <nav className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/fleet', label: 'Fleet' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-sm font-light tracking-[0.05em] transition-all duration-300"
                  style={{ 
                    color: 'rgba(176, 176, 176, 0.6)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    textShadow: '0 0 0px rgba(76, 175, 80, 0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4CAF50';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(76, 175, 80, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(176, 176, 176, 0.6)';
                    e.currentTarget.style.textShadow = '0 0 0px rgba(76, 175, 80, 0)';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Column - Clickable */}
          <div className="col-span-8 lg:col-span-3 space-y-4">
            <h4 className="text-stem-green text-xs font-light tracking-[0.3em] uppercase mb-6">
              Services
            </h4>
            <div className="space-y-3">
              {services.map((service) => (
                <button
                  key={service.title}
                  onClick={service.action}
                  className="block text-left text-sm font-light tracking-[0.05em] transition-all duration-300 group"
                  style={{ 
                    color: 'rgba(176, 176, 176, 0.6)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    textShadow: '0 0 0px rgba(76, 175, 80, 0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4CAF50';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(76, 175, 80, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(176, 176, 176, 0.6)';
                    e.currentTarget.style.textShadow = '0 0 0px rgba(76, 175, 80, 0)';
                  }}
                >
                  <div>{service.title}</div>
                  <div className="text-xs" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>{service.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="col-span-16 lg:col-span-4 space-y-4">
            <h4 className="text-stem-green text-xs font-light tracking-[0.3em] uppercase mb-6">
              Connect
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+254759275857"
                className="flex items-center gap-3 group transition-all duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <Phone 
                  className="w-4 h-4 transition-all duration-300 group-hover:rotate-12" 
                  style={{ 
                    color: 'rgba(76, 175, 80, 0.5)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <span 
                  className="text-xs font-light tracking-[0.1em] transition-all duration-300"
                  style={{ 
                    color: 'rgba(176, 176, 176, 0.6)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    textShadow: '0 0 0px rgba(76, 175, 80, 0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4CAF50';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(76, 175, 80, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(176, 176, 176, 0.6)';
                    e.currentTarget.style.textShadow = '0 0 0px rgba(76, 175, 80, 0)';
                  }}
                >
                  +254 759 275857
                </span>
              </a>

              <a
                href="https://wa.me/254759275857"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-all duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <MessageCircle 
                  className="w-4 h-4 transition-all duration-300" 
                  style={{ 
                    color: 'rgba(76, 175, 80, 0.5)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <span 
                  className="text-xs font-light tracking-[0.1em] transition-all duration-300"
                  style={{ 
                    color: 'rgba(176, 176, 176, 0.6)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    textShadow: '0 0 0px rgba(76, 175, 80, 0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4CAF50';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(76, 175, 80, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(176, 176, 176, 0.6)';
                    e.currentTarget.style.textShadow = '0 0 0px rgba(76, 175, 80, 0)';
                  }}
                >
                  WhatsApp
                </span>
              </a>

              <a
                href="mailto:info@stemconcepts.co.ke"
                className="flex items-center gap-3 group transition-all duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <Mail 
                  className="w-4 h-4 transition-all duration-300" 
                  style={{ 
                    color: 'rgba(76, 175, 80, 0.5)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <span 
                  className="text-xs font-light tracking-[0.1em] transition-all duration-300"
                  style={{ 
                    color: 'rgba(176, 176, 176, 0.6)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    textShadow: '0 0 0px rgba(76, 175, 80, 0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4CAF50';
                    e.currentTarget.style.textShadow = '0 0 8px rgba(76, 175, 80, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(176, 176, 176, 0.6)';
                    e.currentTarget.style.textShadow = '0 0 0px rgba(76, 175, 80, 0)';
                  }}
                >
                  info@stemconcepts.co.ke
                </span>
              </a>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" style={{ color: 'rgba(76, 175, 80, 0.5)' }} />
                <span className="text-xs font-light tracking-[0.1em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                  Mombasa, Kenya
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Minimal */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(76, 175, 80, 0.1)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-light tracking-[0.2em] uppercase" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>
              © {new Date().getFullYear()} StemConcepts. All Rights Reserved.
            </p>
            <p className="text-[10px] font-light tracking-[0.15em]" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>
              Precision in Every Journey
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
