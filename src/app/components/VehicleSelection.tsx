import { useState } from 'react';
import { Users, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Vehicle {
  id: string;
  class: string;
  model: string;
  hourlyRate: number;
  passengers: number;
  available: boolean;
  badge: string;
  features: string[];
}

interface VehicleSelectionProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelect: (vehicle: Vehicle) => void;
}

const vehicleImages = {
  'ECONOMY': 'https://images.unsplash.com/photo-1760421130946-b0b3d12baa51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBwcmVtaW8lMjBzZWRhbnxlbnwxfHx8fDE3NjkzNDU5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'BUSINESS': 'https://images.unsplash.com/photo-1706977384830-df8b515e6b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZXJjZWRlcyUyMHNlZGFufGVufDF8fHx8MTc2OTM0NTkwMXww&ixlib=rb-4.1.0&q=80&w=1080',
  'PREMIUM': 'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW5nZSUyMHJvdmVyJTIwbHV4dXJ5fGVufDF8fHx8MTc2OTI3Nzk0NXww&ixlib=rb-4.1.0&q=80&w=1080'
};

export function VehicleSelection({ vehicles, selectedVehicle, onSelect }: VehicleSelectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getBadgeColor = (badge: string) => {
    if (badge.includes('Available')) return 'bg-[#059669] text-white';
    if (badge.includes('Airport')) return 'bg-[#1D4ED8] text-white';
    if (badge.includes('Luxury')) return 'bg-[#D4AF37] text-[#111827]';
    return 'bg-gray-500 text-white';
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" id="fleet">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-[#1D4ED8] mb-3 md:mb-4">
            Choose Your Ride
          </h2>
          <p className="text-[#4B5563] max-w-3xl mx-auto">
            Select from our premium fleet of vehicles, each offering comfort and reliability
          </p>
        </motion.div>

        {/* Desktop: 3 column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => {
            const isSelected = selectedVehicle?.id === vehicle.id;
            const image = vehicleImages[vehicle.class as keyof typeof vehicleImages];
            
            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(vehicle.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  isSelected ? 'border-[#059669] ring-4 ring-[#059669]/20' : 'border-gray-200'
                }`}
              >
                {/* Vehicle Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={image}
                    alt={vehicle.model}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold ${getBadgeColor(vehicle.badge)}`}>
                    {vehicle.badge}
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-5 md:p-6">
                  <h3 className="text-[#1D4ED8] mb-2">
                    {vehicle.class}
                  </h3>
                  <p className="text-[#4B5563] mb-4">{vehicle.model}</p>
                  
                  <div className="flex items-center justify-between mb-5 md:mb-6">
                    <div>
                      <div className="text-[#059669] text-2xl md:text-3xl font-bold">
                        KSh {vehicle.hourlyRate.toLocaleString()}
                      </div>
                      <div className="text-[#4B5563] text-xs md:text-sm">per hour</div>
                    </div>
                    <div className="flex items-center space-x-1.5 md:space-x-2 text-[#4B5563]">
                      <Users className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-sm md:text-base">{vehicle.passengers}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-5 md:mb-6 space-y-2">
                    {vehicle.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-[#4B5563] text-xs md:text-sm">
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#059669] flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => onSelect(vehicle)}
                    className={`w-full py-2.5 md:py-3 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 text-sm ${
                      isSelected
                        ? 'bg-[#059669] text-white shadow-lg'
                        : 'bg-gray-100 text-[#111827] hover:bg-[#059669] hover:text-white'
                    }`}
                  >
                    {isSelected ? 'SELECTED' : 'SELECT'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet: Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 px-4 pb-4">
            {vehicles.map((vehicle, index) => {
              const isSelected = selectedVehicle?.id === vehicle.id;
              const image = vehicleImages[vehicle.class as keyof typeof vehicleImages];
              
              return (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-lg border-2 ${
                    isSelected ? 'border-[#059669] ring-4 ring-[#059669]/20' : 'border-gray-200'
                  }`}
                  style={{ scrollSnapAlign: 'center' }}
                >
                  {/* Vehicle Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={vehicle.model}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(vehicle.badge)}`}>
                      {vehicle.badge}
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-6">
                    <h3 className="text-[#1D4ED8] text-xl mb-2">
                      {vehicle.class}
                    </h3>
                    <p className="text-[#4B5563] mb-4">{vehicle.model}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-[#059669] text-2xl font-bold">
                          KSh {vehicle.hourlyRate.toLocaleString()}
                        </div>
                        <div className="text-[#4B5563] text-xs">per hour</div>
                      </div>
                      <div className="flex items-center space-x-1 text-[#4B5563]">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{vehicle.passengers}</span>
                      </div>
                    </div>

                    {/* Select Button */}
                    <button
                      onClick={() => onSelect(vehicle)}
                      className={`w-full py-3 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#059669] text-white shadow-lg'
                          : 'bg-gray-100 text-[#111827]'
                      }`}
                    >
                      {isSelected ? 'SELECTED' : 'SELECT'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
