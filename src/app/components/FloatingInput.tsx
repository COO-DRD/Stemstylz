import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: LucideIcon;
  placeholder?: string;
}

export function FloatingInput({ label, value, onChange, type = 'text', icon: Icon, placeholder }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative group">
      {Icon && (
        <Icon 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 z-10 transition-colors duration-400" 
          style={{ 
            color: isFocused || hasValue ? '#4CAF50' : 'rgba(176, 176, 176, 0.3)',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      )}
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ''}
        className={`w-full input-stem py-4 focus:outline-none font-light tracking-[0.05em] ${
          Icon ? 'pl-6 pr-2' : 'px-2'
        }`}
        style={{ 
          color: 'rgba(255, 255, 255, 0.87)',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      <label
        className={`absolute transition-all duration-400 pointer-events-none ${
          Icon ? 'left-6' : 'left-2'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          ...(isFocused || hasValue
            ? {
                top: '-12px',
                fontSize: '10px',
                color: '#4CAF50',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }
            : {
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '14px',
                color: 'rgba(176, 176, 176, 0.6)'
              }
          )
        }}
      >
        {label}
      </label>

      {/* Active state green glow */}
      {isFocused && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-stem-green"
          style={{
            boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)'
          }}
        />
      )}
    </div>
  );
}
