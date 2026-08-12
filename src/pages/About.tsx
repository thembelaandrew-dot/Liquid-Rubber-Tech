import { motion } from 'motion/react';
import { Target, Lightbulb, Users, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="pt-20">
      <SEO 
        title="About Us" 
        description="Learn about Liquid Rubber Tech Investments, Eswatini's premier construction and waterproofing firm dedicated to extending the life of your most valuable assets."
      />
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark z-0">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Engineering <span className="text-gradient">Resilience</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            Liquid Rubber Tech Investments is Eswatini's premier construction and waterproofing firm, dedicated to extending the life of your most valuable assets.
          </motion.p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Precision', desc: 'Every application is calculated, measured, and executed flawlessly.' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Utilizing advanced polymer and epoxy technologies for superior results.' },
              { icon: Users, title: 'Integrity', desc: 'Transparent pricing, honest assessments, and guaranteed workmanship.' }
            ].map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-6">
                  <val.icon className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-gray-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Story */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <img src="https://i.imgur.com/qewAt3S.jpeg" alt="Team at work" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-dark/40 mix-blend-multiply"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Built on Quality.<br/>Driven by Results.</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>We started with a simple mission: to provide structural protection that actually lasts. Traditional methods often fail under extreme weather, leading to costly recurring repairs.</p>
                <p>By investing in modern liquid rubber and high-grade epoxy technologies, we offer solutions that flex, breathe, and seal permanently.</p>
              </div>
              
              <ul className="mt-8 space-y-4">
                {['Licensed & Insured Professionals', 'Eswatini-wide Service Coverage', 'Commercial & Residential Expertise'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-blue" />
                    <span className="text-gray-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
