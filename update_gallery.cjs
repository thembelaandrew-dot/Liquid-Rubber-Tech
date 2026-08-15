const fs = require('fs');

let code = fs.readFileSync('src/pages/Gallery.tsx', 'utf8');

const newGalleryContent = `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryData } from '../data';
import SEO from '../components/SEO';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(galleryData.map(item => item.category))];
  
  const filteredData = filter === 'All' ? galleryData : galleryData.filter(item => item.category === filter);

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <SEO 
        title="Project Gallery | Liquid Rubber Tech Past Work" 
        description="View our portfolio of completed projects in Eswatini. See the quality of our waterproofing, roofing, painting, and construction work."
        url="https://liquidrubbertech.netlify.app/gallery"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={\`px-6 py-2 rounded-full font-bold transition-all duration-300 \${
                  filter === category
                    ? 'bg-brand-green text-black'
                    : 'glass-panel text-gray-300 hover:text-white hover:bg-white/10'
                }\`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="group relative h-80 rounded-2xl overflow-hidden glass-panel cursor-pointer"
                >
                  <img src={item.url} alt={\`\${item.category} project by Liquid Rubber Tech in Eswatini\`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Gallery.tsx', newGalleryContent);
console.log('Gallery rewritten');

