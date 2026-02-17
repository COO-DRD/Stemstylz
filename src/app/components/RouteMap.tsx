import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface RouteMapProps {
  pickup: google.maps.places.PlaceResult | null;
  dropoff: google.maps.places.PlaceResult | null;
  isLoaded: boolean;
}

// Night Executive Map Styles - Absolute Palette
const nightExecutiveStyles: google.maps.MapTypeStyle[] = [
  // Base landscape and water to pure black
  { elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#000000' }] },
  
  // Roads to charcoal
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a1a' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a1a' }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a1a' }]
  },
  
  // Text labels
  { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#4CAF50' }] },
  
  // POI labels with green accent
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4CAF50' }]
  },
  
  // Administrative labels
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#B0B0B0' }]
  },
  
  // Transit hidden for cleaner look
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }]
  },
  
  // Parks subtle
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0a0a0a' }]
  }
];

export function RouteMap({ pickup, dropoff, isLoaded }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Center on Mombasa, Kenya
    const mombasaCenter = { lat: -4.0435, lng: 39.6682 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: mombasaCenter,
      zoom: 12,
      styles: nightExecutiveStyles,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      gestureHandling: 'greedy',
      backgroundColor: '#000000'
    });

    directionsServiceRef.current = new google.maps.DirectionsService();
    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      map: mapInstanceRef.current,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#4CAF50', // Stem green
        strokeWeight: 3,
        strokeOpacity: 1.0
      },
      markerOptions: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#4CAF50',
          fillOpacity: 1,
          strokeColor: '#000000',
          strokeWeight: 2
        }
      }
    });
  }, [isLoaded]);

  // Draw route when both locations are selected
  useEffect(() => {
    if (
      !isLoaded ||
      !pickup?.geometry?.location ||
      !dropoff?.geometry?.location ||
      !directionsServiceRef.current ||
      !directionsRendererRef.current
    ) {
      return;
    }

    setIsCalculating(true);

    const request: google.maps.DirectionsRequest = {
      origin: pickup.geometry.location,
      destination: dropoff.geometry.location,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsServiceRef.current.route(request, (result, status) => {
      setIsCalculating(false);

      if (status === google.maps.DirectionsStatus.OK && result) {
        directionsRendererRef.current?.setDirections(result);

        // Extract distance and duration
        const leg = result.routes[0]?.legs[0];
        if (leg) {
          setDistance(leg.distance?.text || '');
          setDuration(leg.duration?.text || '');
        }
      } else {
        console.error('Directions request failed:', status);
      }
    });
  }, [pickup, dropoff, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="relative bg-obsidian h-[300px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-stem-green mx-auto animate-spin" />
          <p className="text-silver text-sm font-light tracking-[0.05em]">
            Loading Map Services
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 300 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden route-glow"
    >
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-[300px]" />

      {/* Route Info Overlay - Glassmorphism */}
      {(distance || duration) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-4 left-4 right-4 glass p-4 flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-[10px] text-stem-green tracking-[0.2em] uppercase font-light">
              Estimated Route
            </p>
            <div className="flex items-center gap-4">
              {distance && (
                <span className="text-white text-sm font-light tracking-[0.05em]" style={{ opacity: 0.87 }}>
                  {distance}
                </span>
              )}
              {duration && (
                <span className="text-silver text-sm font-light tracking-[0.05em]">
                  • {duration}
                </span>
              )}
            </div>
          </div>

          {isCalculating && (
            <Loader2 className="w-4 h-4 text-stem-green animate-spin" />
          )}
        </motion.div>
      )}

      {/* Green accent line at bottom with glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-stem-green to-transparent opacity-50 shadow-[0_0_10px_rgba(76,175,80,0.5)]" />
    </motion.div>
  );
}
