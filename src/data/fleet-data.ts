// FLEET DATA - Easy to update
// Simply edit the values below to update your fleet information

export interface FleetVehicle {
  id: string;
  category: 'ECONOMY' | 'BUSINESS' | 'PREMIUM';
  name: string;
  model: string;
  description: string;
  hourlyRate: number;
  dailyRate: number;
  passengers: number;
  luggage: number;
  features: string[];
  imageUrl: string;
  available: boolean;
}

export const fleetVehicles: FleetVehicle[] = [
  {
    id: 'eco-1',
    category: 'ECONOMY',
    name: 'Economy Sedan',
    model: 'Toyota Premio / Allion',
    description: 'Perfect for budget-conscious travelers who don\'t want to compromise on reliability and comfort.',
    hourlyRate: 1500,
    dailyRate: 8000,
    passengers: 4,
    luggage: 2,
    features: [
      'Air Conditioning',
      'Professional Driver',
      'GPS Navigation',
      'Clean & Sanitized',
      'Fuel Included',
      'Insurance Covered'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1760421130946-b0b3d12baa51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    available: true
  },
  {
    id: 'bus-1',
    category: 'BUSINESS',
    name: 'Business Class',
    model: 'Mercedes-Benz E-Class / Toyota Crown',
    description: 'The perfect blend of luxury and professionalism for executive travel and corporate clients.',
    hourlyRate: 2500,
    dailyRate: 12000,
    passengers: 4,
    luggage: 3,
    features: [
      'Leather Interior',
      'Premium Sound System',
      'Climate Control',
      'Tinted Windows',
      'Professional Chauffeur',
      'Complimentary Water',
      'Phone Charging Ports',
      'Wi-Fi Hotspot'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1706977384830-df8b515e6b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    available: true
  },
  {
    id: 'prem-1',
    category: 'PREMIUM',
    name: 'Luxury SUV',
    model: 'Range Rover / Mercedes-Benz GLE',
    description: 'Ultimate luxury and comfort for VIP clients, special occasions, and those who demand the best.',
    hourlyRate: 4000,
    dailyRate: 18000,
    passengers: 6,
    luggage: 5,
    features: [
      'Premium Leather Seats',
      'Advanced Climate Control',
      'Panoramic Sunroof',
      'High-End Sound System',
      'Executive Chauffeur',
      'Complimentary Refreshments',
      'Priority Booking',
      'Airport VIP Service',
      'Phone & Tablet Charging',
      'Privacy Glass'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    available: true
  }
];

// Helper function to get vehicles by category
export const getVehiclesByCategory = (category: 'ECONOMY' | 'BUSINESS' | 'PREMIUM') => {
  return fleetVehicles.filter(v => v.category === category);
};

// Helper function to get available vehicles
export const getAvailableVehicles = () => {
  return fleetVehicles.filter(v => v.available);
};
