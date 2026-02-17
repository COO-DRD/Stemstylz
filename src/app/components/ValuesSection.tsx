import { Clock, Shield, MessageCircle, Handshake, Star } from 'lucide-react';
import { motion } from 'motion/react';

const values = [
  {
    icon: Clock,
    title: 'PUNCTUALITY',
    description: 'We are not just about being always on time but we also upholding our promise of delivering timely, reliable and efficient service to our esteemed clients.'
  },
  {
    icon: Shield,
    title: 'RELIABILITY',
    description: 'We are trustworthy and consistent, and always deliver high-quality services that meet the needs and expectations of our customers.'
  },
  {
    icon: MessageCircle,
    title: 'COMMUNICATION',
    description: 'We strive to provide open, honest, timely and proactively share information with our clients, ensuring transparency and building trust.'
  },
  {
    icon: Handshake,
    title: 'INTEGRITY',
    description: 'We consistently demonstrate integrity through our actions, ensuring we always do what is right and maintain the highest ethical standards in our business.'
  },
  {
    icon: Star,
    title: 'DRIVEN FOR EXCELLENCE',
    description: 'We are a premier Cabs and Car hire service provider committed to excellence, constantly striving to exceed expectations and deliver exceptional value.'
  }
];

export function ValuesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F9FAFB]" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-[#1D4ED8] mb-3 md:mb-4">
            Our Core Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 20px 40px rgba(5, 150, 105, 0.15)',
                  borderColor: '#059669'
                }}
                className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent group"
              >
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full bg-[#059669]/10 group-hover:bg-[#059669] transition-all duration-300">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-[#059669] group-hover:text-white transition-all duration-300" />
                  </div>
                </div>
                <h3 className="text-[#1D4ED8] text-center mb-3 md:mb-4 group-hover:text-[#059669] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-[#4B5563] text-center leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
