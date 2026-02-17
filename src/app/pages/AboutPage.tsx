import { Shield, Clock, Star, Users, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  onBookNow: () => void;
}

export function AboutPage({ onBookNow }: AboutPageProps) {
  const stats = [
    { label: 'Years of Service', value: '10+', icon: Award },
    { label: 'Happy Clients', value: '5000+', icon: Users },
    { label: 'Vehicles', value: '25+', icon: Star },
    { label: 'On-Time Rate', value: '99%', icon: Clock }
  ];

  const values = [
    {
      icon: Clock,
      title: 'Punctuality',
      description: 'We understand that time is money. Our commitment to punctuality ensures you never miss an important meeting or flight.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Count on us for consistent, high-quality service. Our well-maintained fleet and professional drivers guarantee a smooth experience every time.'
    },
    {
      icon: Heart,
      title: 'Customer Care',
      description: 'Your satisfaction is our priority. Our 24/7 relationship champions are always ready to assist you with personalized service.'
    }
  ];

  const team = [
    {
      role: 'Professional Drivers',
      description: 'Experienced, licensed, and trained chauffeurs with extensive knowledge of Mombasa and Nairobi routes.'
    },
    {
      role: 'Customer Support',
      description: 'Dedicated team available 24/7 to handle bookings, inquiries, and ensure your journey is seamless.'
    },
    {
      role: 'Fleet Management',
      description: 'Expert technicians ensuring every vehicle meets our high standards of safety and luxury.'
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian safe-zone">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-charcoal to-obsidian text-white py-12 md:py-16 lg:py-20">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-serif text-platinum text-5xl md:text-6xl lg:text-7xl font-light mb-6">
              About StemConcepts
            </h1>
            <p className="text-platinum/70 text-base md:text-lg font-light tracking-[0.05em]">
              Your trusted partner in premium executive transportation across Mombasa and Nairobi since 2014.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-charcoal">
        <div className="luxury-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gold/10">
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-gold" />
                    </div>
                  </div>
                  <div className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-gold mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-platinum/70 font-light tracking-[0.1em] uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-obsidian">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="font-serif text-gold text-4xl md:text-5xl font-light mb-4">
                Our Story
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-6 md:p-8 lg:p-10 shadow-deeper"
            >
              <p className="text-platinum/70 mb-4 leading-relaxed font-light">
                Founded in 2014, StemConcepts has established itself as the premier executive transportation service in Mombasa and Nairobi. What started as a vision to provide reliable, luxury transport for business travelers has grown into a comprehensive chauffeur service trusted by corporations, executives, and VIP clients across Kenya.
              </p>
              <p className="text-platinum/70 mb-4 leading-relaxed font-light">
                Our journey has been driven by one simple philosophy: delivering surgical precision in transport. Every journey, every client interaction, and every detail matters. We understand that our clients demand excellence, and we've built our reputation on delivering it consistently.
              </p>
              <p className="text-platinum/70 leading-relaxed font-light">
                Today, with a fleet of premium vehicles and a team of professional chauffeurs, we continue to set the standard for luxury transportation in Kenya. Our commitment to punctuality, reliability, and customer satisfaction remains unwavering.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-charcoal">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <h2 
              className="font-serif text-4xl md:text-5xl font-semibold mb-4"
              style={{ color: '#4CAF50', letterSpacing: '-0.02em' }}
            >
              Our Values
            </h2>
            <p className="max-w-3xl mx-auto font-light tracking-[0.05em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              // Cinematic images for each value
              const valueImages = [
                'https://images.unsplash.com/photo-1562070204-a7a7c3259397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', // Driver's hand on steering wheel
                'https://images.unsplash.com/photo-1761486554787-89b2b4eb64ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', // Black sedan at modern building
                'https://images.unsplash.com/photo-1709661077154-912482749e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'  // Luxury car interior
              ];
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className="glass shadow-deeper overflow-hidden transition-all duration-400 group"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  {/* Cinematic Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={valueImages[index]}
                      alt={value.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ 
                        filter: 'brightness(0.7) contrast(1.1)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                    
                    {/* Icon floating on image */}
                    <div 
                      className="absolute top-6 left-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full transition-all duration-400"
                      style={{ background: 'rgba(76, 175, 80, 0.15)', backdropFilter: 'blur(10px)' }}
                    >
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-stem-green" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 
                      className="font-serif text-xl md:text-2xl font-semibold mb-3 md:mb-4"
                      style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}
                    >
                      {value.title}
                    </h3>
                    <p className="leading-relaxed font-light text-sm" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-obsidian">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="font-serif text-gold text-4xl md:text-5xl font-light mb-4">
              Our Team
            </h2>
            <p className="text-platinum/70 max-w-3xl mx-auto font-light tracking-[0.05em]">
              Experienced professionals dedicated to your comfort and safety
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 md:p-8 shadow-deeper"
              >
                <h3 className="font-serif text-gold text-xl md:text-2xl font-light mb-3 md:mb-4">
                  {member.role}
                </h3>
                <p className="text-platinum/70 leading-relaxed font-light">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-charcoal to-obsidian text-white">
        <div className="luxury-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-platinum text-4xl md:text-5xl font-light mb-4 md:mb-6">
              Experience the StemConcepts Difference
            </h2>
            <p className="text-platinum/70 text-base md:text-lg mb-6 md:mb-8 max-w-3xl mx-auto font-light tracking-[0.05em]">
              Join thousands of satisfied clients who trust us for their executive transportation needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onBookNow();
                }}
                className="btn-liquid"
              >
                Book Now
              </button>
              <a
                href="tel:+254759275857"
                className="glass px-6 md:px-8 py-3 md:py-4 transition-all duration-300 font-light tracking-[0.1em] uppercase text-sm"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.87)',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  textShadow: '0 0 0px rgba(76, 175, 80, 0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#4CAF50';
                  e.currentTarget.style.textShadow = '0 0 8px rgba(76, 175, 80, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.87)';
                  e.currentTarget.style.textShadow = '0 0 0px rgba(76, 175, 80, 0)';
                }}
              >
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}