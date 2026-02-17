import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onBookNowClick?: () => void;
}

export function Header({ onBookNowClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleBookNowClick = () => {
    if (onBookNowClick) {
      onBookNowClick();
    } else {
      window.location.href = '/?booking=open';
    }
  };

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/fleet', label: 'FLEET' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism Navigation */}
      <div className="glass" style={{ borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
        <div className="luxury-container py-6 md:py-8">
          <div className="flex items-center justify-between">
            {/* Logo - Editorial Stacked */}
            <Link to="/" className="flex flex-col leading-none group">
              <span 
                className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold transition-all duration-400"
                style={{ 
                  color: '#4CAF50',
                  letterSpacing: '-0.02em',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Stem
              </span>
              <span 
                className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold transition-all duration-400"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.87)',
                  letterSpacing: '-0.02em',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Concepts
              </span>
            </Link>

            {/* Desktop Navigation - Ultra-Minimal */}
            <nav className="hidden lg:flex items-center gap-12 xl:gap-16">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative group"
                  >
                    <span 
                      className="text-xs font-sans font-light tracking-[0.2em] transition-all duration-400"
                      style={{ 
                        color: isActive ? '#4CAF50' : 'rgba(176, 176, 176, 0.6)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#4CAF50'}
                      onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = 'rgba(176, 176, 176, 0.6)')}
                    >
                      {item.label}
                    </span>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-stem-green origin-left"
                      initial={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="tel:+254759275857"
                className="flex items-center gap-3 text-sm font-light tracking-[0.15em] transition-all duration-400 group"
                style={{ 
                  color: 'rgba(176, 176, 176, 0.6)',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#4CAF50'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(176, 176, 176, 0.6)'}
              >
                <Phone className="w-4 h-4 transition-transform duration-400 group-hover:rotate-12" />
                <span>+254 759 275857</span>
              </a>
              
              <button
                onClick={handleBookNowClick}
                className="btn-liquid"
              >
                RESERVE
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-8 h-8 flex flex-col items-end justify-center gap-1.5 group"
            >
              <span className={`w-full h-[1px] bg-stem-green transition-all duration-400 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-[1px] bg-stem-green transition-all duration-400 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[1px] bg-stem-green transition-all duration-400 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden fixed inset-0 bg-obsidian/95 backdrop-blur-2xl z-40 pt-24"
          >
            <div className="luxury-container h-full flex flex-col justify-center">
              <nav className="space-y-8">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block"
                      >
                        <span className={`font-serif text-4xl md:text-5xl font-light tracking-tight transition-all duration-400 ${
                          isActive ? 'text-gold' : 'text-platinum/70 hover:text-platinum'
                        }`}>
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-16 space-y-6"
              >
                <a
                  href="tel:+254759275857"
                  className="flex items-center gap-3 text-platinum/70 hover:text-gold transition-all duration-400"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-light tracking-[0.15em]">+254 759 275857</span>
                </a>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleBookNowClick();
                  }}
                  className="btn-ghost text-left"
                >
                  RESERVE YOUR EXPERIENCE
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}