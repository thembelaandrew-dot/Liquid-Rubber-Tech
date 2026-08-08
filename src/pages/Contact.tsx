import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace these with actual EmailJS credentials
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Liquid Rubber Tech Investments for professional consultation and high-end construction execution in Eswatini."
      />
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Let's <span className="text-gradient">Talk</span></h1>
              <p className="text-xl text-gray-400 mb-12">
                Have a project in mind? Reach out to us for professional consultation and high-end execution.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Phone, title: 'Call Us', lines: ['7661 0372', '7836 3059'], hrefPrefix: 'tel:+268' },
                  { icon: Mail, title: 'Email', lines: ['lrteswatini@gmail.com'], hrefPrefix: 'mailto:' },
                  { icon: MapPin, title: 'Location', lines: ['Eswatini (Nationwide Service)'] },
                  { icon: Clock, title: 'Business Hours', lines: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM'] },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-14 h-14 shrink-0 rounded-2xl glass-panel flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      {item.lines.map((line, j) => (
                        item.hrefPrefix ? 
                          <a key={j} href={`${item.hrefPrefix}${line.replace(/\s/g, '')}`} className="block text-gray-400 hover:text-brand-green transition-colors">{line}</a> :
                          <p key={j} className="text-gray-400">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-[80px]"></div>
              
              <h3 className="text-2xl font-bold mb-8 relative z-10">Send a Message</h3>
              
              {submitStatus === 'success' ? (
                <div className="relative z-10 p-6 rounded-xl bg-brand-green/10 border border-brand-green/30 text-center">
                  <h4 className="text-brand-green font-bold text-xl mb-2">Message Sent!</h4>
                  <p className="text-gray-300">Thank you. Your request has been received. Our team will contact you shortly.</p>
                  <button onClick={() => setSubmitStatus('idle')} className="mt-4 text-sm text-gray-400 hover:text-white transition-colors">Send another message</button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                      <input name="customer_name" required type="text" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                      <input name="customer_phone" required type="tel" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors" placeholder="7661 0372" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input name="customer_email" required type="email" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea name="message" required rows={4} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>
                  
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-sm">Failed to send message. Please try again or contact us via WhatsApp.</p>
                  )}

                  <button disabled={isSubmitting} type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-green to-brand-blue text-black font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-70 disabled:hover:scale-100">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">Prefer WhatsApp? <a href="https://wa.me/26876610372?text=Hello%20Liquid%20Rubber%20Tech%20Investments%2C%20I%20found%20your%20website%20and%20would%20like%20to%20enquire%20about%20your%20services." className="text-brand-green hover:underline font-bold" target="_blank" rel="noreferrer">Chat with us directly.</a></p>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 h-[400px] w-full rounded-2xl overflow-hidden glass-panel p-2"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114170.81734267885!2d31.114704381395567!3d-26.505703478950153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e8e89f89fb0e5bf%3A0x6b2ec0473a216f46!2sManzini%2C%20Eswatini!5e0!3m2!1sen!2sus!4v1707000000000!5m2!1sen!2sus" 
              className="w-full h-full rounded-xl" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
