import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/10 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 relative z-50">
            <img src="https://i.imgur.com/feZnmkl.jpeg" alt="Liquid Rubber Tech" className="h-12 w-auto object-contain rounded-full shadow-[0_0_15px_rgba(57,255,20,0.3)]" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-brand-green relative group ${location.pathname === link.path ? 'text-brand-green' : 'text-gray-300'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-green rounded-full transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
            <Link 
              to="/quote"
              className="ml-4 px-8 py-3 rounded-full bg-brand-green text-black font-bold text-sm hover:bg-brand-blue transition-colors duration-300 glow-green hover:glow-blue"
            >
              GET A QUOTE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center relative z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2 focus:outline-none">
              {isOpen ? <X className="w-7 h-7 text-brand-green" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full h-[calc(100vh-4rem)] bg-brand-dark/98 backdrop-blur-3xl border-t border-white/10 overflow-y-auto shadow-2xl flex flex-col"
          >
            <div className="px-6 py-10 flex flex-col space-y-8 flex-grow">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-3xl font-display font-bold tracking-wider ${location.pathname === link.path ? 'text-brand-green' : 'text-white hover:text-brand-blue'} transition-colors`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-8 mt-auto mb-8 border-t border-white/10"
              >
                <Link 
                  to="/quote"
                  className="flex items-center justify-center w-full py-5 rounded-xl bg-gradient-to-r from-brand-green to-brand-blue text-black font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(57,255,20,0.4)] text-lg"
                >
                  Get a Free Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
