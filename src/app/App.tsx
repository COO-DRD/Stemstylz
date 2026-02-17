import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { TrustBar } from '@/app/components/TrustBar';
import { HomePage } from '@/app/pages/HomePage';
import { FleetPage } from '@/app/pages/FleetPage';
import { AboutPage } from '@/app/pages/AboutPage';
import { ContactPage } from '@/app/pages/ContactPage';
import { useEffect, useState } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  const handleBookNowClick = () => {
    if (isHomePage) {
      const heroElement = document.querySelector('.hero-section');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      }
      setShowBookingFlow(true);
    } else {
      window.location.href = '/?booking=open';
    }
  };

  return (
    <div className="min-h-screen bg-obsidian">
      <ScrollToTop />
      <Header onBookNowClick={handleBookNowClick} />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fleet" element={<FleetPage onBookNow={handleBookNowClick} />} />
          <Route path="/about" element={<AboutPage onBookNow={handleBookNowClick} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      
      <Footer onBookNow={handleBookNowClick} />
      <TrustBar />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;