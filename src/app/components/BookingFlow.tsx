import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Users, Shield, Wifi, Star, Phone, MessageCircle, X, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { FloatingInput } from './FloatingInput';
import { GoogleMapsAutocomplete, injectGoogleMapsStyles } from './GoogleMapsAutocomplete';
import { RouteMap } from './RouteMap';
import { motion, AnimatePresence } from 'motion/react';
import { useLoadScript } from '@react-google-maps/api';

interface BookingFlowProps {
  onClose: () => void;
}

interface FleetTier {
  id: string;
  name: string;
  tagline: string;
  vehicles: string[];
  passengers: string;
  features: string[];
  priceRange: string;
  backgroundImage: string;
  icon: typeof Shield;
}

const fleetTiers: FleetTier[] = [
  {
    id: 'corporate',
    name: 'Corporate Standard',
    tagline: 'Punctuality. Comfort. Space.',
    vehicles: ['Toyota Prado', 'Toyota Noah', 'Nissan X-Trail'],
    passengers: '4-6 PAX',
    features: ['Climate Control', 'Spacious Cabin', 'Professional Driver', 'Complimentary Water'],
    priceRange: 'KSh 3,000 - 5,000/hr',
    backgroundImage: 'https://images.unsplash.com/photo-1624951352908-3579b7df9c05?q=80&w=1080',
    icon: Users
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    tagline: 'Privacy. Prestige. Performance.',
    vehicles: ['Mercedes E-Class', 'Mercedes S-Class', 'BMW 5 Series'],
    passengers: '3-4 PAX',
    features: ['Premium Leather', 'On-board Wi-Fi', 'Privacy Glass', 'Refreshment Bar'],
    priceRange: 'KSh 6,000 - 10,000/hr',
    backgroundImage: 'https://images.unsplash.com/photo-1741088996480-5e4158b56396?q=80&w=1080',
    icon: Wifi
  },
  {
    id: 'diplomatic',
    name: 'Diplomatic Prime',
    tagline: 'Security. Exclusivity. Excellence.',
    vehicles: ['Armored SUV', 'Executive Range Rover', 'Premium Escalade'],
    passengers: '3-5 PAX',
    features: ['High Security', 'Meet & Greet', 'Luggage Service', 'VIP Lounge Access'],
    priceRange: 'KSh 15,000+/hr',
    backgroundImage: 'https://images.unsplash.com/photo-1661220715153-95724e5f3500?q=80&w=1080',
    icon: Shield
  }
];

// Google Maps libraries to load
const libraries: ("places" | "geometry")[] = ["places", "geometry"];

// IMPORTANT: Replace with your actual Google Maps API key
// For production, store this in environment variables
const GOOGLE_MAPS_API_KEY = 'AIzaSyC5uGPJ3fmQlLi0XMMWPSrRImAiCkVAwQI';

export function BookingFlow({ onClose }: BookingFlowProps) {
  // Load Google Maps Script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries as any,
  });

  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupPlace, setPickupPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [dropoffPlace, setDropoffPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [selectedTier, setSelectedTier] = useState<FleetTier | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [assignedDriver, setAssignedDriver] = useState<any>(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  // Inject custom styles for Google Maps autocomplete dropdown
  useEffect(() => {
    if (isLoaded) {
      injectGoogleMapsStyles();
    }
  }, [isLoaded]);

  // Step 1 validation
  const canProceedToStep2 = pickup && dropoff && date && time;

  // Step 3: Simulate fleet scan
  useEffect(() => {
    if (step === 3 && selectedTier && !scanComplete) {
      setIsScanning(true);
      
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);
        setAssignedDriver({
          name: 'James Mwangi',
          rating: 4.9,
          eta: '12 minutes',
          vehicle: selectedTier.vehicles[0],
          plate: 'KBZ 456C'
        });
      }, 2500);
    }
  }, [step, selectedTier, scanComplete]);

  // Generate confirmation code
  useEffect(() => {
    if (step === 5) {
      setConfirmationCode(Math.random().toString(36).substring(2, 8).toUpperCase());
    }
  }, [step]);

  const handleTierSelect = (tier: FleetTier) => {
    setSelectedTier(tier);
    setBackgroundImage(tier.backgroundImage);
    setTimeout(() => setStep(3), 300);
  };

  const handleCheckout = (method: 'mpesa' | 'concierge') => {
    if (method === 'mpesa') {
      // Simulate M-Pesa payment
      setTimeout(() => setStep(5), 1000);
    } else {
      // Open WhatsApp
      const message = `Hi! I'd like to book a ${selectedTier?.name} from ${pickup} to ${dropoff} on ${date} at ${time}.`;
      window.open(`https://wa.me/254759275857?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handlePickupChange = (value: string, place?: google.maps.places.PlaceResult) => {
    setPickup(value);
    if (place) {
      setPickupPlace(place);
    }
  };

  const handleDropoffChange = (value: string, place?: google.maps.places.PlaceResult) => {
    setDropoff(value);
    if (place) {
      setDropoffPlace(place);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/98 backdrop-blur-xl"
    >
      {/* Dynamic Background Transition */}
      <AnimatePresence mode="wait">
        {backgroundImage && (
          <motion.div
            key={backgroundImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
        )}
      </AnimatePresence>

      {/* Modal Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-4xl glass shadow-deeper rounded-none overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="progress-stem" style={{ width: `${(step / 5) * 100}%` }} />

        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8" style={{ borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
          <div>
            <span className="text-stem-green text-[10px] font-light tracking-[0.3em] uppercase">
              Step {step} of 5
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-1" style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}>
              {step === 1 && 'Journey Details'}
              {step === 2 && 'Select Service Level'}
              {step === 3 && 'Fleet Assignment'}
              {step === 4 && 'Secure Checkout'}
              {step === 5 && 'Booking Confirmed'}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-silver hover:text-white transition-all duration-400"
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-10 min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Logistics Foundation */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GoogleMapsAutocomplete
                    label="Pick-up Location"
                    value={pickup}
                    onChange={handlePickupChange}
                    placeholder="e.g., Moi International Airport"
                    isLoaded={isLoaded}
                  />
                  <GoogleMapsAutocomplete
                    label="Destination"
                    value={dropoff}
                    onChange={handleDropoffChange}
                    placeholder="e.g., Serena Beach Hotel"
                    isLoaded={isLoaded}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FloatingInput
                    label="Date"
                    value={date}
                    onChange={setDate}
                    type="date"
                    icon={Calendar}
                  />
                  <FloatingInput
                    label="Time"
                    value={time}
                    onChange={setTime}
                    type="time"
                    icon={Clock}
                  />
                  <FloatingInput
                    label="Passengers"
                    value={passengers}
                    onChange={setPassengers}
                    type="number"
                    icon={Users}
                  />
                </div>

                {/* Live Route Map */}
                {pickup && dropoff && pickupPlace && dropoffPlace && (
                  <RouteMap
                    pickup={pickupPlace}
                    dropoff={dropoffPlace}
                    isLoaded={isLoaded}
                  />
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="w-full btn-ghost mt-8 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue to Fleet Selection
                </button>
              </motion.div>
            )}

            {/* STEP 2: Fleet Tier Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ ease: [0.4, 0, 0.2, 1] }}
                className="space-y-6"
              >
                <p className="text-silver text-sm font-light tracking-[0.05em] mb-8" style={{ opacity: 0.6 }}>
                  Select your executive experience tier
                </p>

                <div className="space-y-4">
                  {fleetTiers.map((tier, index) => {
                    const IconComponent = tier.icon;
                    return (
                      <motion.button
                        key={tier.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                        onClick={() => handleTierSelect(tier)}
                        className="w-full glass p-6 text-left transition-all duration-400 group"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <IconComponent 
                                className="w-5 h-5 transition-colors duration-400" 
                                style={{ 
                                  color: 'rgba(76, 175, 80, 0.5)',
                                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                }} 
                              />
                              <h4 className="font-serif text-xl md:text-2xl font-semibold" style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}>
                                {tier.name}
                              </h4>
                            </div>
                            <p className="text-stem-green text-xs font-light tracking-[0.15em] uppercase mb-3" style={{ opacity: 0.7 }}>
                              {tier.tagline}
                            </p>
                            <p className="text-silver text-sm font-light mb-3" style={{ opacity: 0.6 }}>
                              {tier.vehicles.join(' • ')}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {tier.features.map((feature) => (
                                <span key={feature} className="text-[10px] text-silver tracking-[0.1em] uppercase" style={{ opacity: 0.4 }}>
                                  {feature}
                                </span>
                              ))}
                            </div>
                            <p className="text-silver text-sm font-light" style={{ opacity: 0.6 }}>
                              {tier.passengers} • {tier.priceRange}
                            </p>
                          </div>
                          <ArrowRight 
                            className="w-5 h-5 transition-all duration-400 group-hover:translate-x-2" 
                            style={{ 
                              color: 'rgba(76, 175, 80, 0.3)',
                              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                          />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="text-silver hover:text-white text-sm font-light tracking-[0.1em] mt-4 transition-colors duration-400"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', opacity: 0.6 }}
                >
                  ← Back to Journey Details
                </button>
              </motion.div>
            )}

            {/* STEP 3: Live Fleet Scan */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center justify-center min-h-[400px] space-y-8"
              >
                {isScanning && (
                  <>
                    <div className="relative pulse-live">
                      <Loader2 className="w-16 h-16 text-stem-green animate-spin" />
                      <div className="absolute inset-0 animate-ping">
                        <div className="w-16 h-16 rounded-full" style={{ border: '2px solid rgba(76, 175, 80, 0.2)' }} />
                      </div>
                    </div>
                    <p className="text-lg font-light tracking-[0.1em] text-center" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Synchronizing with Fleet...
                    </p>
                    <p className="text-sm font-light tracking-[0.05em] text-center" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>
                      Locating nearest {selectedTier?.name}
                    </p>
                  </>
                )}

                {scanComplete && assignedDriver && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ease: [0.4, 0, 0.2, 1] }}
                    className="w-full max-w-lg glass p-8 text-center space-y-6"
                  >
                    <CheckCircle className="w-12 h-12 text-stem-green mx-auto" />
                    <div>
                      <h4 className="font-serif text-2xl font-semibold mb-2" style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}>
                        Vehicle Assigned
                      </h4>
                      <p className="text-sm font-light tracking-[0.1em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                        {assignedDriver.vehicle} • {assignedDriver.plate}
                      </p>
                    </div>

                    <div className="py-6" style={{ borderTop: '1px solid rgba(76, 175, 80, 0.1)', borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
                      <p className="text-sm font-light tracking-[0.05em] mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Your Chauffeur
                      </p>
                      <p className="font-serif text-xl font-semibold mb-1" style={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                        {assignedDriver.name}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Star className="w-4 h-4 text-stem-green fill-current" />
                        <span className="text-sm font-light" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          {assignedDriver.rating} Rating
                        </span>
                      </div>
                    </div>

                    <p className="text-stem-green text-lg font-light tracking-[0.1em]">
                      ETA: {assignedDriver.eta} from your location
                    </p>

                    <button
                      onClick={() => setStep(4)}
                      className="w-full btn-liquid"
                    >
                      Proceed to Checkout
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* STEP 4: Multi-Channel Checkout */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ ease: [0.4, 0, 0.2, 1] }}
                className="space-y-6"
              >
                <div className="glass p-6 mb-8">
                  <p className="text-sm font-light tracking-[0.05em] mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Booking Summary
                  </p>
                  <div className="space-y-2 text-sm font-light">
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Service</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>{selectedTier?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Route</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>{pickup} → {dropoff}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Date & Time</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>{date} at {time}</span>
                    </div>
                    <div className="flex justify-between pt-4" style={{ borderTop: '1px solid rgba(76, 175, 80, 0.1)' }}>
                      <span className="text-stem-green">Estimated Rate</span>
                      <span className="text-stem-green font-serif text-lg">{selectedTier?.priceRange}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-light tracking-[0.05em] mb-6 text-center" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Choose your preferred booking method
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* M-Pesa Payment */}
                  <button
                    onClick={() => handleCheckout('mpesa')}
                    className="glass p-6 transition-all duration-400 group text-left btn-liquid"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
                        <CheckCircle className="w-5 h-5 text-stem-green" />
                      </div>
                      <h5 className="font-serif text-lg font-semibold" style={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                        Instant Secure Booking
                      </h5>
                      <p className="text-xs font-light tracking-[0.05em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                        Pay via M-Pesa or Card
                      </p>
                      <p className="text-[10px] font-light tracking-[0.1em] uppercase" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>
                        Direct Payment
                      </p>
                    </div>
                  </button>

                  {/* Concierge */}
                  <button
                    onClick={() => handleCheckout('concierge')}
                    className="glass p-6 transition-all duration-400 group text-left relative overflow-hidden btn-liquid"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
                        <MessageCircle className="w-5 h-5 text-stem-green" />
                      </div>
                      <h5 className="font-serif text-lg font-semibold" style={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                        Speak with Concierge
                      </h5>
                      <p className="text-xs font-light tracking-[0.05em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                        Connect via WhatsApp
                      </p>
                      <p className="text-[10px] font-light tracking-[0.1em] uppercase" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>
                        24/7 Dispatch • Custom Itineraries
                      </p>
                    </div>
                    
                    {/* Hover caption */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent flex items-end p-6"
                    >
                      <p className="text-stem-green text-xs font-light tracking-[0.1em]">
                        For special requests & custom arrangements
                      </p>
                    </motion.div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Digital Boarding Pass */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center justify-center min-h-[400px] space-y-8"
              >
                <CheckCircle className="w-16 h-16 text-stem-green pulse-live" />
                
                <div className="text-center space-y-2">
                  <h4 className="font-serif text-3xl font-semibold" style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}>
                    Booking Confirmed
                  </h4>
                  <p className="text-sm font-light tracking-[0.1em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                    Your journey is secured
                  </p>
                </div>

                {/* Digital Boarding Pass */}
                <div className="w-full max-w-md glass p-8 space-y-6">
                  <div className="text-center pb-6" style={{ borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
                    <p className="text-xs font-light tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                      VIP Confirmation Code
                    </p>
                    <p className="font-serif text-stem-green text-4xl font-semibold tracking-wider">
                      {confirmationCode}
                    </p>
                  </div>

                  <div className="space-y-4 text-sm font-light">
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Chauffeur</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>{assignedDriver?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Vehicle</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>{assignedDriver?.vehicle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>License Plate</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>{assignedDriver?.plate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Pickup Time</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>{time}</span>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3" style={{ borderTop: '1px solid rgba(76, 175, 80, 0.1)' }}>
                    <a
                      href={`tel:+254759275857`}
                      className="flex items-center justify-center gap-2 text-sm font-light tracking-[0.1em] transition-all duration-400"
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#4CAF50'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                    >
                      <Phone className="w-4 h-4" />
                      <span>+254 759 275857</span>
                    </a>
                    <p className="text-xs font-light tracking-[0.05em] text-center" style={{ color: 'rgba(176, 176, 176, 0.4)' }}>
                      Confirmation sent via WhatsApp & SMS
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="btn-liquid"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}