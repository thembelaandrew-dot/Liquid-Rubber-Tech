const fs = require('fs');
const content = `
import { motion } from 'motion/react';
import { MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/26876610372?text=Hello%20Liquid%20Rubber%20Tech%20Investments%2C%20I%20found%20your%20website%20and%20would%20like%20to%20enquire%20about%20your%20services.";

  return (
    <>
      {/* Desktop Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>

      {/* Mobile Sticky Bottom CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-brand-dark/95 backdrop-blur-md border-t border-white/10 p-4 pb-safe flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
      >
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold tracking-wide shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
        <Link 
          to="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-blue text-black font-bold tracking-wide shadow-lg"
        >
          <FileText className="w-5 h-5" />
          Get Quote
        </Link>
      </motion.div>
    </>
  );
}
`;
fs.writeFileSync('src/components/WhatsAppButton.tsx', content.trim());
