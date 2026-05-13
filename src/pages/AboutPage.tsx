import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Users, Globe, Target, Shield, Zap, Heart, Award, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Stats } from '../components/landing/Stats';

const AboutPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "About MountainFleet",
        subtitle: "Revolutionizing global logistics through innovation, data, and human-centric design."
      }}
      main={{
        title: "The Vision for a Unified Logistics OS",
        content: (
          <>
            <p>At MountainFleet, we view the global supply chain as a complex, living network that requires a sophisticated operating system to function at peak efficiency. Our mission is to provide that backbone—an intelligence layer that synchronizes physical infrastructure with digital precision.</p>
            <p>We are building more than just a tracking tool; we are engineering a platform that anticipates bottlenecks, optimizes resource allocation, and provides unprecedented visibility into every node of the logistics journey.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Our Core Pillars",
        items: [
          { icon: Target, title: "Precision", desc: "Every coordinate and timestamp is validated through our multi-node verification system." },
          { icon: Globe, title: "Global Sync", desc: "Real-time synchronization across continents, time zones, and complex jurisdictions." },
          { icon: Award, title: "Excellence", desc: "Maintaining a 99.99% operational uptime for the world's most critical supply chains." },
        ]
      }}
      cta={{
        title: "Join the Logistics Revolution",
        subtitle: "Experience the power of a fully synchronized global fleet network today.",
        buttonText: "Explore the Platform",
        link: "/dashboard"
      }}
    >
      {/* 3. Core Values */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 border-t border-l border-border">
            {[
              { icon: Zap, title: "Velocity", desc: "We move fast, iterate constantly, and never settle for 'good enough'." },
              { icon: Shield, title: "Integrity", desc: "Data privacy and ethical operations are baked into every line of code." },
              { icon: Heart, title: "Humanity", desc: "We build tech that empowers people, not tech that replaces them." }
            ].map((value, i) => (
              <div key={i} className="p-12 border-r border-b border-border hover:bg-card transition-colors group">
                <div className="w-12 h-12 bg-secondary text-white flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <value.icon size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{value.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Reach Stats */}
      <Stats />

      {/* 5. Office Locations */}
      <section className="py-16 sm:py-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">Global<br />Headquarters</h2>
            <div className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <MapPin size={16} /> 12 Hubs Worldwide
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { city: "San Francisco", region: "North America", img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600" },
              { city: "Berlin", region: "Europe", img: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=600" },
              { city: "Singapore", region: "Asia Pacific", img: "https://images.unsplash.com/photo-1525625239513-94c947523285?auto=format&fit=crop&q=80&w=600" }
            ].map((office, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-border bg-background overflow-hidden hover:border-primary transition-all"
              >
                <div className="aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={office.img} alt={office.city} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{office.city}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{office.region}</p>
                  </div>
                  <ChevronRight size={20} className="text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default AboutPage;
