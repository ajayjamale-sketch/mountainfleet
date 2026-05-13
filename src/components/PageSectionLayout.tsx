import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageSectionLayoutProps {
  banner: { title: string; subtitle: string; bgImage?: string };
  main: { title: string; content: React.ReactNode; image?: string };
  features: { title: string; items: { title: string; desc: string; icon: any }[] };
  cta: { title: string; subtitle: string; buttonText: string; link: string };
  children?: React.ReactNode;
}

const PageSectionLayout: React.FC<PageSectionLayoutProps> = ({ banner, main, features, cta, children }) => {
  return (
    <div className="bg-background text-foreground transition-colors duration-300 technical-grid">
      {/* 1. Banner Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 text-secondary dark:text-white tracking-tighter uppercase leading-none"
          >
            {banner.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 max-w-3xl font-medium leading-relaxed"
          >
            {banner.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-8 text-secondary dark:text-white tracking-tighter uppercase leading-none">{main.title}</h2>
              <div className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed space-y-6 font-medium">
                {main.content}
              </div>
            </motion.div>
            {main.image && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 border border-border bg-background overflow-hidden shadow-xl">
                  {/* Removed grayscale filter to show original color */}
                  <img src={main.image} alt={main.title} className="w-full h-auto transition-all duration-700 object-cover min-h-[300px]" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-border bg-slate-50 dark:bg-white/5 -z-10" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Feature Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-12 lg:mb-16 text-left text-secondary dark:text-white tracking-tighter uppercase leading-none">{features.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {features.items.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-10 border-r border-b border-border hover:bg-background transition-all group"
              >
                <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg font-bold mb-4 text-secondary dark:text-white uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-xs sm:text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Sections */}
      {children}

      {/* 4. CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="bg-secondary dark:bg-slate-900 p-12 sm:p-20 border border-border relative overflow-hidden group">
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-none">{cta.title}</h2>
              <p className="text-base sm:text-lg text-white/40 mb-10 lg:mb-12 max-w-2xl mx-auto font-medium">{cta.subtitle}</p>
              <Link 
                to={cta.link} 
                className="inline-flex items-center space-x-3 bg-primary text-white px-10 py-5 font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-white hover:text-primary transition-all active:translate-y-[1px] shadow-xl shadow-primary/20"
              >
                <span>{cta.buttonText}</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageSectionLayout;
