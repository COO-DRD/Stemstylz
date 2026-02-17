import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapsAutocompleteProps {
  value: string;
  onChange: (value: string, placeDetails?: google.maps.places.PlaceResult) => void;
  label: string;
  placeholder?: string;
  isLoaded: boolean;
}

export function GoogleMapsAutocomplete({
  value,
  onChange,
  label,
  placeholder,
  isLoaded
}: GoogleMapsAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    // Initialize Google Places Autocomplete
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'ke' }, // Restrict to Kenya
      fields: ['formatted_address', 'geometry', 'name', 'place_id'],
      types: ['establishment', 'geocode']
    });

    // Listen for place selection
    const listener = autocompleteRef.current.addListener('place_changed', () => {
      if (!autocompleteRef.current) return;
      
      const place = autocompleteRef.current.getPlace();
      
      if (place.formatted_address || place.name) {
        const address = place.formatted_address || place.name || '';
        onChange(address, place);
        setHasValue(!!address);
      }
    });

    return () => {
      if (listener) {
        google.maps.event.removeListener(listener);
      }
    };
  }, [isLoaded, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setHasValue(!!newValue);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          className="peer w-full input-stem pt-6 pb-2 px-4 font-light text-sm tracking-[0.05em] 
                     focus:outline-none transition-all duration-400"
          style={{ 
            color: 'rgba(255, 255, 255, 0.87)',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          disabled={!isLoaded}
        />
        
        {/* Floating Label */}
        <label
          className={`absolute left-4 pointer-events-none tracking-[0.05em]
                     transition-all duration-400`}
          style={{ 
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            ...(isFocused || hasValue
              ? { 
                  top: '8px', 
                  fontSize: '10px', 
                  color: '#4CAF50',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase'
                }
              : { 
                  top: '16px', 
                  fontSize: '14px', 
                  color: 'rgba(176, 176, 176, 0.6)'
                }
            )
          }}
        >
          {label}
        </label>

        {/* Icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <MapPin 
            className="w-4 h-4 transition-colors duration-400" 
            style={{ 
              color: isFocused ? '#4CAF50' : 'rgba(176, 176, 176, 0.3)',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
          />
        </div>

        {/* Active state indicator - green glow on focus */}
        {isFocused && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-stem-green"
            style={{
              boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)'
            }}
          />
        )}
      </div>

      {!isLoaded && (
        <p className="text-silver text-[10px] font-light tracking-[0.05em] uppercase mt-2" style={{ opacity: 0.6 }}>
          Loading location services...
        </p>
      )}
    </div>
  );
}

/* 
 * Custom Styles for Google Places Autocomplete Dropdown - Night Executive Theme
 */
export function injectGoogleMapsStyles() {
  if (typeof document === 'undefined') return;

  const styleId = 'google-maps-custom-styles';
  
  // Check if styles already exist
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    .pac-container {
      background-color: #121212 !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: 0 10px 30px rgba(0, 255, 76, 0.1), 0 5px 15px rgba(0, 0, 0, 0.7) !important;
      margin-top: 4px !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
      backdrop-filter: blur(20px) !important;
    }

    .pac-item {
      background-color: transparent !important;
      color: rgba(255, 255, 255, 0.87) !important;
      border-top: 1px solid rgba(76, 175, 80, 0.05) !important;
      padding: 12px 16px !important;
      font-size: 13px !important;
      font-weight: 300 !important;
      letter-spacing: 0.05em !important;
      cursor: pointer !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .pac-item:first-child {
      border-top: none !important;
    }

    .pac-item:hover,
    .pac-item-selected {
      background-color: rgba(76, 175, 80, 0.1) !important;
      color: #4CAF50 !important;
    }

    .pac-item-query {
      color: rgba(255, 255, 255, 0.87) !important;
      font-weight: 400 !important;
    }

    .pac-matched {
      color: #4CAF50 !important;
      font-weight: 500 !important;
    }

    .pac-icon {
      background-image: none !important;
      width: 20px !important;
      height: 20px !important;
      margin-right: 12px !important;
    }

    .pac-icon::before {
      content: '📍';
      font-size: 14px;
      opacity: 0.5;
    }

    .pac-item:hover .pac-icon::before {
      opacity: 1;
      filter: hue-rotate(90deg);
    }

    .pac-logo::after {
      display: none !important;
    }
  `;
  
  document.head.appendChild(style);
}
