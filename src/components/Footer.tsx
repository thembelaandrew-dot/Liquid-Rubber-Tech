import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="https://i.imgur.com/96Q9RnA.jpeg" alt="Liquid Rubber Tech" className="h-10 w-auto object-contain rounded-full" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium construction, waterproofing, and property improvement services in Eswatini. Built to last.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61588501700280" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-white/10 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/liquid_rubber_tech_sz?igsh=cXFuaGJtazA3NDh1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-white/10 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 tracking-wider text-sm">SERVICES</h4>
            <ul className="space-y-3">
              <li><Link to="/services/roof-restoration" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Roof Restoration</Link></li>
              <li><Link to="/services/waterproofing" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Waterproofing</Link></li>
              <li><Link to="/services/painting" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Painting</Link></li>
              <li><Link to="/services" className="text-brand-blue hover:text-brand-green text-sm transition-colors">View All Services &rarr;</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 tracking-wider text-sm">COMPANY</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-brand-green text-sm transition-colors">About Us</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Featured Work</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Contact</Link></li>
              <li><a href="https://wa.me/26876610372?text=Hello%20Liquid%20Rubber%20Tech%20Investments%2C%20I%20would%20like%20to%20request%20a%20quote." target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Get Quote</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 tracking-wider text-sm">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-green shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+26876610372" className="text-gray-400 hover:text-white text-sm">7661 0372</a>
                  <a href="tel:+26878363059" className="text-gray-400 hover:text-white text-sm">7836 3059</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0" />
                <span className="text-gray-400 text-sm">Eswatini</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-green shrink-0" />
                <a href="mailto:lrteswatini@gmail.com" className="text-gray-400 hover:text-white text-sm">lrteswatini@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Liquid Rubber Tech Investments. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-brand-green text-xs font-bold tracking-widest uppercase">Restore. Protect. Perform.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
