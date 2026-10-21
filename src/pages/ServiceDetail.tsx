import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ChevronRight, Home } from 'lucide-react';
import SEO from '../components/SEO';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = servicesData.find(s => 
    s.id === id || 
    (s.id === 'plumbing' && (id === 'plumbing-and-bathroom-restoration' || id === 'plumbing-bathroom-restoration')) ||
    (s.id === 'paving' && (id === 'paving-and-concrete-work' || id === 'paving-concrete-work' || id === 'paving-restoration'))
  );

  if (!service) {
    return <NotFound />;
  }

  // Get related services (excluding current one)
  const relatedServices = servicesData
    .filter(s => s.id !== service.id)
    .slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://liquidrubbertech.co.za/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://liquidrubbertech.co.za/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://liquidrubbertech.co.za/services/${service.id}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "image": service.image,
    "url": `https://liquidrubbertech.co.za/services/${service.id}`,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Liquid Rubber Tech Investments",
      "url": "https://liquidrubbertech.co.za/"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Eswatini"
    }
  };

  return (
    <div className="pt-20">
      <SEO 
        title={service.metaTitle || `${service.title} in Eswatini | Liquid Rubber Tech`}
        description={service.metaDescription || service.description}
        image={service.image}
        url={`https://liquidrubbertech.co.za/services/${service.id}`}
        schema={[serviceSchema, breadcrumbSchema]}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={`${service.title} services by Liquid Rubber Tech in Eswatini`} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-400">
            <Link to="/" className="hover:text-brand-green flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <Link to="/services" className="hover:text-brand-green transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-brand-green font-medium truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 mx-auto rounded-2xl glass-panel flex items-center justify-center mb-6"
          >
            <service.icon className="w-10 h-10 text-brand-green" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-white"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
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
                <a 
                  href={`https://wa.me/26876610372?text=Hello%20Liquid%20Rubber%20Tech%20Investments%2C%20I%20would%20like%20to%20request%20a%20quote%20for%20${encodeURIComponent(service.title)}.`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-brand-blue text-black font-bold hover:bg-white transition-colors duration-300 w-full sm:w-auto text-center"
                >
                  Book This Service <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* More Services (Internal Linking & Crawlability) */}
          <div className="mt-24 pt-16 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">More Services in Eswatini</h2>
                <p className="text-gray-400 text-sm mt-1">Explore our full suite of property protection and improvement solutions.</p>
              </div>
              <Link 
                to="/services" 
                className="inline-flex items-center text-sm font-bold text-brand-green hover:underline"
              >
                View All Services <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/services/${rel.id}`}
                  className="glass-panel p-6 group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
                      <rel.icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <h3 className="font-bold text-white group-hover:text-brand-green transition-colors text-base">
                      {rel.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {rel.description}
                  </p>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-blue group-hover:text-white">
                    Learn More <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
