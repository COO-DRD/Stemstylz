import { useState } from 'react';
import { Briefcase, Star, Plane } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    id: 'corporate',
    icon: Briefcase,
    title: 'Corporate Executive Cab Services',
    description: 'Premium and reliable transport for corporate organizations. We understand the importance of punctuality and professionalism in business. Our corporate services include dedicated account management, flexible billing options, and priority booking for your team members.'
  },
  {
    id: 'luxury',
    icon: Star,
    title: 'Personalised Luxury Cab Services',
    description: 'Reliable and personalized cab services that allow you to plan your journey exactly as you want it. Whether it\'s a special occasion, a night out, or simply the comfort of a premium ride, we tailor our service to meet your specific needs with attention to every detail.'
  },
  {
    id: 'airport',
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Professional meet-and-greet service at Moi International Airport. Our drivers track your flight in real-time and provide 45 minutes of complimentary waiting time. We ensure a smooth, stress-free transfer to your destination with luggage assistance and route optimization.'
  }
];

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState('corporate');

  const activeService = services.find(s => s.id === activeTab) || services[0];
  const Icon = activeService.icon;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" id="services">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-[#1D4ED8] mb-3 md:mb-4">
            Our Services
          </h2>
          <p className="text-[#4B5563] max-w-3xl mx-auto">
            Tailored transportation solutions for every need
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-10 lg:mb-12">
          {services.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex items-center justify-center space-x-2 md:space-x-3 px-4 md:px-6 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === service.id
                    ? 'bg-[#059669] text-white shadow-lg'
                    : 'bg-gray-100 text-[#111827] hover:bg-gray-200'
                }`}
              >
                <ServiceIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden md:inline">{service.title}</span>
                <span className="md:hidden text-xs">{service.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#F9FAFB] rounded-xl md:rounded-2xl p-6 md:p-10 lg:p-12">
            <div className="flex items-center justify-center mb-5 md:mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-[#059669]">
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            <h3 className="text-[#1D4ED8] text-center mb-4 md:mb-6">
              {activeService.title}
            </h3>
            <p className="text-[#4B5563] leading-relaxed text-center">
              {activeService.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
