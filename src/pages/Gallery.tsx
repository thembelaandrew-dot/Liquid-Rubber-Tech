import { motion } from 'motion/react';
import { galleryData } from '../data';
import { useState } from 'react';
import SEO from '../components/SEO';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(galleryData.map(item => item.category))];

  const filteredData = filter === 'All' ? galleryData : galleryData.filter(item => item.category === filter);

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <SEO 
        title="Project Gallery" 
        description="View our portfolio of successful construction and waterproofing projects across Eswatini by Liquid Rubber Tech Investments."
      />
      <section className="py-24 relative flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
              Our <span className="text-gradient">Projects</span>
            </motion.h1>
            
            {/* Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    filter === cat 
                      ? 'bg-brand-green text-black glow-green' 
                      : 'glass-panel text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredData.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative h-80 rounded-2xl overflow-hidden glass-panel cursor-pointer"
              >
                <img src={item.url} alt={item.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="px-3 py-1 rounded-md bg-brand-blue text-black text-xs font-bold uppercase tracking-wider">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
