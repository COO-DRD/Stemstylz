import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you! We will get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSending(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+254 759 275857',
      link: 'tel:+254759275857',
      description: 'Call us 24/7'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+254 759 275857',
      link: 'https://wa.me/254759275857',
      description: 'Chat with us'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@stemconcepts.co.ke',
      link: 'mailto:info@stemconcepts.co.ke',
      description: 'Send us an email'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Mombasa, Kenya',
      link: null,
      description: 'Visit our office'
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-32 md:pt-40 safe-zone">
      {/* Editorial Hero */}
      <section className="luxury-container pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="editorial-grid"
        >
          <div className="col-span-16 lg:col-span-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-[1px] bg-stem-green" />
              <span className="text-stem-green text-xs font-light tracking-[0.3em] uppercase">
                Get In Touch
              </span>
            </div>
            
            <h1 
              className="font-serif font-semibold" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.87)', 
                letterSpacing: '-0.02em',
                fontSize: 'clamp(3rem, 8vw, 7rem)'
              }}
            >
              Contact Us
            </h1>
            
            <p className="text-lg font-light tracking-[0.05em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
              We're here to help 24/7. Get in touch with our team for bookings, inquiries, or support.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact Info Cards - Glassmorphism */}
      <section className="luxury-container pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="glass p-6 transition-all duration-300 group"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{ background: 'rgba(76, 175, 80, 0.1)' }}
                  >
                    <Icon className="w-7 h-7 text-stem-green" />
                  </div>
                </div>
                <h3 
                  className="text-lg font-light text-center mb-2 tracking-[0.05em]"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                >
                  {info.title}
                </h3>
                <p 
                  className="text-xs font-light text-center mb-3 tracking-[0.1em] uppercase"
                  style={{ color: 'rgba(176, 176, 176, 0.6)' }}
                >
                  {info.description}
                </p>
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-stem-green font-light text-center block transition-all duration-300 truncate text-sm"
                    style={{ 
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      textShadow: '0 0 0px rgba(76, 175, 80, 0)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textShadow = '0 0 8px rgba(76, 175, 80, 0.5)'}
                    onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 0px rgba(76, 175, 80, 0)'}
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-stem-green font-light text-center truncate text-sm">
                    {info.content}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="luxury-container pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="glass p-8 md:p-10 shadow-deeper"
          >
            <h2 
              className="font-serif text-3xl font-semibold mb-6"
              style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}
            >
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  className="block text-sm font-light mb-2 tracking-[0.05em]"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 input-stem font-light text-sm tracking-[0.05em] focus:outline-none"
                  placeholder="John Doe"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-light mb-2 tracking-[0.05em]"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 input-stem font-light text-sm tracking-[0.05em] focus:outline-none"
                  placeholder="john@example.com"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-light mb-2 tracking-[0.05em]"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 input-stem font-light text-sm tracking-[0.05em] focus:outline-none"
                  placeholder="+254 700 000 000"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-light mb-2 tracking-[0.05em]"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                >
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 input-stem font-light text-sm tracking-[0.05em] focus:outline-none"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="corporate">Corporate Account</option>
                  <option value="support">Customer Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label 
                  className="block text-sm font-light mb-2 tracking-[0.05em]"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 input-stem font-light text-sm tracking-[0.05em] resize-none focus:outline-none"
                  placeholder="How can we help you?"
                  style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full btn-liquid flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Additional Info - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            {/* Office Hours */}
            <div className="glass p-8 shadow-deeper">
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-14 h-14 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ background: 'rgba(76, 175, 80, 0.1)' }}
                >
                  <Clock className="w-7 h-7 text-stem-green" />
                </div>
                <div>
                  <h3 
                    className="font-serif text-2xl font-semibold mb-2"
                    style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}
                  >
                    Office Hours
                  </h3>
                  <p className="text-sm font-light tracking-[0.05em]" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>
                    We're available 24/7 for bookings and emergencies
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm font-light">
                <div className="flex justify-between py-3" style={{ borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
                  <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Monday - Friday</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>24 Hours</span>
                </div>
                <div className="flex justify-between py-3" style={{ borderBottom: '1px solid rgba(76, 175, 80, 0.1)' }}>
                  <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Saturday - Sunday</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>24 Hours</span>
                </div>
                <div className="flex justify-between py-3">
                  <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Public Holidays</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.87)' }}>24 Hours</span>
                </div>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="glass p-8 shadow-deeper">
              <h3 
                className="font-serif text-2xl font-semibold mb-6"
                style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}
              >
                Why Choose StemConcepts?
              </h3>
              <ul className="space-y-4 text-sm font-light">
                {[
                  'Instant response to all inquiries',
                  'Professional and courteous service',
                  'Flexible booking and payment options',
                  'Dedicated account managers for corporate clients'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-stem-green text-lg flex-shrink-0">✓</span>
                    <span style={{ color: 'rgba(176, 176, 176, 0.6)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="glass p-8 shadow-deeper">
              <h3 
                className="font-serif text-2xl font-semibold mb-6"
                style={{ color: 'rgba(255, 255, 255, 0.87)', letterSpacing: '-0.02em' }}
              >
                Quick Actions
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+254759275857"
                  className="flex items-center gap-4 p-4 glass transition-all duration-300 group"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 76, 0.05)';
                  }}
                >
                  <Phone className="w-6 h-6 text-stem-green flex-shrink-0" />
                  <div>
                    <div className="font-light text-sm" style={{ color: 'rgba(255, 255, 255, 0.87)' }}>Call Now</div>
                    <div className="text-xs font-light" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Speak to our team</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/254759275857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glass transition-all duration-300 group"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 76, 0.05)';
                  }}
                >
                  <MessageCircle className="w-6 h-6 text-stem-green flex-shrink-0" />
                  <div>
                    <div className="font-light text-sm" style={{ color: 'rgba(255, 255, 255, 0.87)' }}>WhatsApp</div>
                    <div className="text-xs font-light" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Chat with us instantly</div>
                  </div>
                </a>
                <a
                  href="/?booking=open"
                  className="flex items-center gap-4 p-4 glass transition-all duration-300 group"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 76, 0.05)';
                  }}
                >
                  <Send className="w-6 h-6 text-stem-green flex-shrink-0" />
                  <div>
                    <div className="font-light text-sm" style={{ color: 'rgba(255, 255, 255, 0.87)' }}>Book Online</div>
                    <div className="text-xs font-light" style={{ color: 'rgba(176, 176, 176, 0.6)' }}>Quick and easy booking</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
