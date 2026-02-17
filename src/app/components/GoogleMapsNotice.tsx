import { AlertCircle, ExternalLink, X } from 'lucide-react';

interface GoogleMapsNoticeProps {
  onDismiss?: () => void;
}

export function GoogleMapsNotice({ onDismiss }: GoogleMapsNoticeProps) {
  return (
    <div className="fixed top-32 right-4 z-50 max-w-sm">
      <div className="glass shadow-deeper p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-platinum text-sm font-light tracking-[0.1em]">
                Google Maps Setup Required
              </h4>
              <p className="text-platinum/60 text-xs font-light tracking-[0.05em] leading-relaxed">
                To enable live location search and route visualization, add your Google Maps API key.
              </p>
              <a
                href="/GOOGLE_MAPS_SETUP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-xs font-light tracking-[0.15em] hover:text-gold/70 transition-colors duration-400"
              >
                Setup Guide
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-platinum/30 hover:text-platinum transition-colors duration-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="pt-4 border-t border-gold/10">
          <p className="text-platinum/40 text-[10px] font-light tracking-[0.05em]">
            The booking system works without Google Maps, but locations must be entered manually.
          </p>
        </div>
      </div>
    </div>
  );
}
