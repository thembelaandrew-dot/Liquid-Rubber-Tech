import { useParams, Navigate, Link } from 'react-router-dom';
import { servicesData } from '../data';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="pt-20">
      <SEO 
        title={`${service.title} | Eswatini`}
        description={service.description}
        image={service.image}
        url={`https://liquidrubbertech.netlify.app/services/${service.id}`}
      />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 mx-auto rounded-2xl glass-panel flex items-center justify-center mb-8"
          >
            <service.icon className="w-10 h-10 text-brand-green" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 text-white"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-8">Key Benefits</h2>
              <ul className="space-y-6">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 glass-panel">
                    <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-8">Our Process</h2>
              <div className="space-y-6">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center font-display font-bold text-brand-green text-xl">
                      {i + 1}
                    </div>
                    <p className="text-gray-300 text-lg">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-transparent border border-brand-blue/20">
                <h3 className="font-bold text-xl mb-4">Ready to start?</h3>
                <a href="https://wa.me/26876610372?text=Hello%20Liquid%20Rubber%20Tech%20Investments%2C%20I%20would%20like%20to%20request%20a%20quote." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-brand-blue text-black font-bold hover:bg-white transition-colors duration-300 w-full sm:w-auto text-center">
                  Book This Service <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
