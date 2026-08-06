import { motion } from 'motion/react';
import { servicesData } from '../data';
import { FileUp, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Reset for demo purposes
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
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto bg-brand-green/20 rounded-full flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center shadow-[0_0_20px_#39ff14]">
                     <ArrowRight className="w-6 h-6 text-black rotate-90" />
                  </div>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">Request Sent!</h3>
                <p className="text-gray-400">Thank you. Our experts are reviewing your details and will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center text-sm font-bold">1</span>
                    Your Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                      <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone / WhatsApp *</label>
                      <input required type="tel" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                      <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
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
                      <select required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors appearance-none">
                        <option value="">Select a service...</option>
                        {servicesData.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Property Type</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors appearance-none">
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Project Description</label>
                      <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors resize-none" placeholder="Briefly describe what you need done..."></textarea>
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Date for Inspection</label>
                       <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input type="date" className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors [color-scheme:dark]" />
                       </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Attach Images (Optional)</label>
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-brand-blue hover:bg-white/5 transition-all cursor-pointer">
                        <FileUp className="w-8 h-8 mx-auto text-brand-blue mb-3" />
                        <p className="text-sm text-gray-400">Click to upload photos of the area (Max 5MB)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/5">
                  <p className="text-sm text-gray-500">Or book instantly via <a href="https://wa.me/26876610372" className="text-[#25D366] hover:underline font-bold">WhatsApp</a></p>
                  <button type="submit" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-brand-green text-black font-bold text-lg hover:bg-brand-blue transition-all duration-300 glow-green hover:glow-blue">
                    Submit Request
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
