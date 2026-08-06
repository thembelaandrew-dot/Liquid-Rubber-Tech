import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Droplet, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData, testimonials } from '../data';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Home" 
        description="Liquid Rubber Tech Investments provides high-end construction and waterproofing solutions in Eswatini. We protect, restore, and transform your property."
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Liquid Rubber Tech Investments",
          "image": "https://i.imgur.com/feZnmkl.jpeg",
          "description": "High-end construction and waterproofing solutions in Eswatini.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Eswatini",
            "addressCountry": "SZ"
          },
          "telephone": "+268-7661-0372",
          "url": "https://liquidrubbertech.com"
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-brand-dark z-0">
          <img 
            src="https://i.imgur.com/K1Pyv2G.jpeg" 
            alt="Modern Construction" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/50 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/10 via-transparent to-transparent"></div>
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-24 md:py-32 lg:py-48">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-green/30 mb-8 backdrop-blur-xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_rgba(57,255,20,0.8)]"></span>
              <span className="text-xs md:text-sm font-bold text-brand-green uppercase tracking-[0.2em]">Eswatini's Premier Choice</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.05] mb-6 tracking-tight"
            >
              We Protect, <br />
              <span className="text-gradient">Restore &amp; Transform</span><br />
              Your Property
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light"
            >
              Sealing Strength. Lasting Protection. From leaks to complete restorations, we deliver high-end construction and waterproofing solutions built to last.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/quote" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-green to-brand-blue text-black font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="https://wa.me/26876610372" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel glass-panel-hover text-white font-bold text-lg hover:scale-105 transition-all duration-300">
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 relative z-10 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Our Core Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive solutions for structural integrity and aesthetic perfection.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.slice(0, 4).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8 glass-panel-hover group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <service.icon className="w-24 h-24 text-brand-blue" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-green/20 to-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{service.description}</p>
                  <Link to={`/services/${service.id}`} className="inline-flex items-center text-sm font-bold text-brand-blue group-hover:text-brand-green transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-brand-green text-white hover:text-brand-green transition-all duration-300">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative z-10 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Strong. Professional.<br/><span className="text-brand-green">Built to Last.</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We don't just fix problems; we engineer lasting solutions. Our advanced materials and expert application ensure your property stands strong against the elements.
              </p>
              <ul className="space-y-6">
                {[
                  { icon: ShieldCheck, title: 'Premium Materials', desc: 'We use industry-leading liquid rubber and epoxy compounds.' },
                  { icon: Zap, title: 'Rapid Execution', desc: 'Efficient project management without compromising quality.' },
                  { icon: Droplet, title: 'Waterproof Guarantee', desc: '100% sealed, seamless finishes that completely repel water.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full glass-panel flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10">
                <Link to="/about" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-green transition-colors uppercase tracking-wider text-sm">
                  Discover Our Story <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[600px] rounded-2xl overflow-hidden glass-panel p-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              <img src="https://i.imgur.com/K1Pyv2G.jpeg" alt="Construction Work" className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent pointer-events-none rounded-xl"></div>
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 flex items-center justify-between">
                <div>
                  <p className="text-3xl font-display font-bold text-brand-green">15+</p>
                  <p className="text-sm text-gray-300 font-bold tracking-wider uppercase">Years Added Lifespan</p>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <p className="text-3xl font-display font-bold text-brand-blue">100%</p>
                  <p className="text-sm text-gray-300 font-bold tracking-wider uppercase">Leak-Free Guarantee</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-brand-green/10 to-brand-blue/10 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=2000&q=80')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-6">Ready to secure your investment?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/quote" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-brand-green transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]">
              Schedule a Free Inspection <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/gallery" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl glass-panel glass-panel-hover text-white font-bold text-lg transition-all duration-300">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
