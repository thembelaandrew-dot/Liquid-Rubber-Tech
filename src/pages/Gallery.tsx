import { motion } from 'motion/react';
import { galleryData } from '../data';
import SEO from '../components/SEO';

export default function Gallery() {
  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <SEO 
        title="Featured Work" 
        description="View our portfolio of featured construction and waterproofing projects across Eswatini by Liquid Rubber Tech Investments."
      />

      <section className="py-24 relative flex-grow overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
              Featured <span className="text-gradient">Work</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              Take a look at some of our recent projects showcasing our premium finishes and robust construction standards.
            </motion.p>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryData.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={item.id}
                className="group relative h-80 rounded-2xl overflow-hidden glass-panel cursor-pointer"
              >
                <img src={item.url} alt="Featured Work" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
