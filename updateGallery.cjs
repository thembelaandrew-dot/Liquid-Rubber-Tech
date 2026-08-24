const fs = require('fs');
const content = `
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryData, GalleryProject } from '../data';
import SEO from '../components/SEO';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['All', ...new Set(galleryData.map(item => item.category))];
  const filteredData = filter === 'All' ? galleryData : galleryData.filter(item => item.category === filter);

  const openModal = (project: GalleryProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject && currentImageIndex < selectedProject.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

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
              Take a look at some of our recent projects. See our process from start to finish, showcasing our premium finishes and robust construction standards.
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
              {filteredData.map((item) => {
                const coverImage = item.images[item.images.length - 1]; // Use last image (After/Combined) as cover
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    onClick={() => openModal(item)}
                    className="group relative h-80 rounded-2xl overflow-hidden glass-panel cursor-pointer"
                  >
                    <img 
                      src={coverImage.url} 
                      alt={\`\${item.title} - \${item.category}\`} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-brand-green font-bold text-sm tracking-wider uppercase mb-1">{item.category}</p>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      {item.type === 'sequence' && (
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white">
                          View Progress ({item.images.length} Images)
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal with Slider */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
            onClick={closeModal}
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-brand-green rounded-full text-white hover:text-black transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div 
              className="w-full max-w-5xl bg-brand-dark border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Image Slider Area */}
              <div className="relative w-full md:w-2/3 h-[50vh] md:h-[70vh] bg-black flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    src={selectedProject.images[currentImageIndex].url}
                    alt={\`\${selectedProject.title} - \${selectedProject.images[currentImageIndex].stage}\`}
                    className="max-w-full max-h-full object-contain"
                  />
                </AnimatePresence>

                {/* Stage Badge on Image */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-brand-green text-black font-bold tracking-widest uppercase rounded-full shadow-lg z-10">
                  {selectedProject.images[currentImageIndex].stage}
                </div>

                {/* Slider Controls */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      disabled={currentImageIndex === 0}
                      className={\`absolute left-4 p-3 rounded-full bg-black/50 text-white backdrop-blur-md transition-all \${currentImageIndex === 0 ? 'opacity-0' : 'opacity-100 hover:bg-brand-green hover:text-black'}\`}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={nextImage}
                      disabled={currentImageIndex === selectedProject.images.length - 1}
                      className={\`absolute right-4 p-3 rounded-full bg-black/50 text-white backdrop-blur-md transition-all \${currentImageIndex === selectedProject.images.length - 1 ? 'opacity-0' : 'opacity-100 hover:bg-brand-green hover:text-black'}\`}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={\`w-2 h-2 rounded-full transition-all duration-300 \${idx === currentImageIndex ? 'bg-brand-green w-6' : 'bg-white/50'}\`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Project Info Area */}
              <div className="w-full md:w-1/3 p-8 flex flex-col">
                <p className="text-brand-green font-bold tracking-wider uppercase mb-2">{selectedProject.category}</p>
                <h2 className="text-3xl font-display font-bold text-white mb-6">{selectedProject.title}</h2>
                
                {selectedProject.type === 'sequence' && (
                  <div className="flex-grow">
                    <p className="text-gray-400 mb-4">Project Progression:</p>
                    <div className="flex flex-col gap-3">
                      {selectedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={\`flex items-center gap-4 p-3 rounded-xl border text-left transition-all \${currentImageIndex === idx ? 'border-brand-green bg-brand-green/10' : 'border-white/10 hover:bg-white/5'}\`}
                        >
                          <div className={\`w-10 h-10 rounded-lg overflow-hidden shrink-0 \${currentImageIndex === idx ? 'ring-2 ring-brand-green ring-offset-2 ring-offset-brand-dark' : ''}\`}>
                            <img src={img.url} className="w-full h-full object-cover" alt="thumbnail" />
                          </div>
                          <span className={\`font-bold \${currentImageIndex === idx ? 'text-brand-green' : 'text-gray-300'}\`}>
                            {img.stage} Phase
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <a 
                    href={\`https://wa.me/26876610372?text=Hello%20Liquid%20Rubber%20Tech%20Investments%2C%20I%20am%20interested%20in%20a%20project%20similar%20to%20your%20\${encodeURIComponent(selectedProject.title)}.\`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 text-center rounded-xl bg-brand-blue text-black font-bold hover:bg-white transition-colors"
                  >
                    Enquire About Similar Project
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/Gallery.tsx', content.trim());
