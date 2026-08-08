import { motion } from 'motion/react';
import { servicesData } from '../data';
import { FileUp, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, useRef } from 'react';
import SEO from '../components/SEO';
import emailjs from '@emailjs/browser';

export default function Quote() {
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
        title="Get a Quote" 
        description="Request a free quote for your construction or waterproofing project in Eswatini with Liquid Rubber Tech Investments."
      />
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1541888086225-f6731034f71a?auto=format&fit=crop&w=2000&q=80')] opacity-5 mix-blend-luminosity"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Request a <span className="text-gradient">Quote</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              Fill out the form below and our team will get back to you with a comprehensive estimate.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 md:p-12 relative overflow-hidden"
          >
            {submitStatus === 'success' ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto bg-brand-green/20 rounded-full flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center shadow-[0_0_20px_#39ff14]">
                     <CheckCircle2 className="w-6 h-6 text-black" />
                  </div>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">Request Sent!</h3>
                <p className="text-gray-400">Thank you. Your request has been received. Our team will contact you shortly.</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-8 text-brand-green font-bold hover:underline">Submit another request</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center text-sm font-bold">1</span>
                    Your Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                      <input name="customer_name" required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone / WhatsApp *</label>
                      <input name="customer_phone" required type="tel" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                      <input name="customer_email" required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Project Location *</label>
                      <input name="project_location" required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="e.g. Mbabane, Manzini" />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center text-sm font-bold">2</span>
                    Project Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Service Required *</label>
                      <select name="service" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors appearance-none">
                        <option value="">Select a service...</option>
                        {servicesData.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Project Type *</label>
                      <select name="project_type" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors appearance-none">
                        <option value="">Select a type...</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                      </select>
                    </div>
                    
                    <div>
                       <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Date</label>
                       <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input name="preferred_date" type="date" className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors [color-scheme:dark]" />
                       </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Budget Range</label>
                      <select name="budget" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors appearance-none">
                        <option value="Not Sure">Not Sure</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Message / Project Details</label>
                      <textarea name="message" rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors resize-none" placeholder="Briefly describe what you need done..."></textarea>
                    </div>

                  </div>
                </div>
                
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm">Failed to send request. Please try again or contact us via WhatsApp.</p>
                )}

                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/5">
                  <p className="text-sm text-gray-500">Or book instantly via <a href="https://wa.me/26876610372?text=Hello%20Liquid%20Rubber%20Tech%20Investments%2C%20I%20found%20your%20website%20and%20would%20like%20to%20enquire%20about%20your%20services." className="text-[#25D366] hover:underline font-bold" target="_blank" rel="noreferrer">WhatsApp</a></p>
                  <button disabled={isSubmitting} type="submit" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-brand-green to-brand-blue text-black font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-70 disabled:hover:scale-100">
                    {isSubmitting ? 'Sending...' : 'Request a Quote'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
