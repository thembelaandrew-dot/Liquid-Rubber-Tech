import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <div className="pt-20">
      <SEO 
        title="Contact Liquid Rubber Tech | Get a Quote in Eswatini" 
        description="Contact our team for a free consultation or project quote. Nationwide service in Eswatini for residential and commercial property protection."
        url="https://liquidrubbertech.netlify.app/contact"
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
                  { icon: MapPin, title: 'Location', lines: ['Eswatini (Nationwide Service)'] }, // DEVELOPER NOTE: For optimal Local SEO, provide a full physical street address here if available.
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

            {/* Form Replacement - CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 md:p-12 relative overflow-hidden flex flex-col justify-center text-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto bg-brand-green/10 rounded-full flex items-center justify-center mb-6 border border-brand-green/20">
                  <Phone className="w-10 h-10 text-brand-green" />
                </div>
                
                <h3 className="text-3xl font-display font-bold mb-4">Ready to start?</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                  Get in touch with us directly via WhatsApp or phone. We're ready to answer your questions and provide a quote for your project.
                </p>
                
                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                  <a href="https://wa.me/26876610372?text=Hello%20Liquid%20Rubber%20Tech%20Investments%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25D366] text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.4)]">
                    Chat on WhatsApp
                  </a>
                  
                  <a href="tel:+26876610372" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300">
                    Call 7661 0372
                  </a>
                </div>
              </div>
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
