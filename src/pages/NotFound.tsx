import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Phone, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="pt-24 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <SEO 
        title="Page Not Found | Liquid Rubber Tech"
        description="The requested page could not be found. Return to Liquid Rubber Tech home or explore our roofing and waterproofing services in Eswatini."
        url="https://liquidrubbertech.co.za/404"
        noIndex={true}
      />

      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl glass-panel border border-white/10 mb-8 shadow-[0_0_30px_rgba(57,255,20,0.15)]"
        >
          <span className="font-display font-bold text-5xl text-brand-green">404</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-display font-bold text-white mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-lg mb-10 leading-relaxed"
        >
          The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let us help you find what you need.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-green text-black font-bold text-base hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link 
            to="/services" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-panel glass-panel-hover text-white font-bold text-base transition-all duration-300"
          >
            <ShieldCheck className="w-5 h-5 text-brand-blue" />
            Our Services
          </Link>
        </motion.div>

        <div className="pt-8 border-t border-white/10 text-sm text-gray-400">
          Need immediate assistance?{' '}
          <Link to="/contact" className="text-brand-green hover:underline font-semibold inline-flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> Contact our Eswatini team
          </Link>
        </div>
      </div>
    </div>
  );
}
