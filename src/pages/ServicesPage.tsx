import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Zap, Shield, BarChart3, Search, Settings, Rocket, Globe, Users, Box, Anchor, Ship } from 'lucide-react';
import { motion } from 'framer-motion';
import { Stats } from '../components/landing/Stats';
import { Testimonials } from '../components/landing/Testimonials';
import { FAQSection } from '../components/landing/FAQSection';

const ServicesPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Our Premium Services",
        subtitle: "Comprehensive solutions designed to tackle the most complex logistics challenges."
      }}
      main={{
        title: "Enterprise Solutions",
        content: (
          <>
            <p>We provide a suite of tools that integrate seamlessly with your existing infrastructure. From real-time GPS tracking to AI-powered route optimization, our services are built to scale.</p>
            <p>Our platform handles everything from small local delivery fleets to massive international shipping operations.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Service Highlights",
        items: [
          { icon: Zap, title: "Real-time Tracking", desc: "Live location updates with millisecond latency and geofencing alerts." },
          { icon: Shield, title: "Fleet Maintenance", desc: "Predictive analytics to prevent breakdowns before they happen." },
          { icon: BarChart3, title: "Custom Analytics", desc: "Deep-dive reports tailored to your specific business KPIs." },
        ]
      }}
      cta={{
        title: "Need a custom solution?",
        subtitle: "Our enterprise team can build a package that fits your exact specifications.",
        buttonText: "Talk to Sales",
        link: "/contact"
      }}
    >
      {/* 1. Service Process Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-6">Our Workflow</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">We follow a rigorous, data-driven process to ensure your fleet operations are optimized from day one.</p>
            </div>
            <div className="bg-primary/5 border border-primary/20 p-4 text-xs font-mono uppercase tracking-widest text-primary">
              System_Status: Optimized
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -z-10" />
            
            {[
              { icon: Search, title: "01. Analysis", desc: "We audit your current routes, fuel usage, and maintenance logs." },
              { icon: Settings, title: "02. Integration", desc: "Hardware and software deployment across your entire fleet." },
              { icon: Rocket, title: "03. Launch", desc: "Go live with 24/7 monitoring and real-time efficiency gains." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-card border border-border p-8 relative hover:border-primary transition-colors group"
              >
                <div className="w-12 h-12 bg-secondary text-white flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <Stats />

      {/* 3. Global Network Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Global Network,<br /><span className="text-primary">Local Support.</span></h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">With operations in over 184 cities, we provide the infrastructure needed for international logistics while maintaining the personalized support of a local partner.</p>
              
              <div className="space-y-6">
                {[
                  { label: "Active Hubs", val: "42 Countries" },
                  { label: "Uptime", val: "99.99% Network Availability" },
                  { label: "Support", val: "24/7 Technical Response" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-border pb-4">
                    <span className="text-xs uppercase font-black tracking-widest text-slate-400">{item.label}</span>
                    <span className="text-sm font-bold text-secondary dark:text-white">{item.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video bg-background border border-border overflow-hidden"
            >
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" alt="Global Network" className="w-full h-full object-cover opacity-80 hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Globe className="text-primary animate-pulse" size={64} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <Testimonials />

      {/* 5. Partner Section */}
      <section className="py-16 sm:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-xs uppercase font-black tracking-[0.3em] text-slate-400 mb-12">Trusted by Global Leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "LOGICORP", icon: Box },
              { name: "OCEANIC", icon: Anchor },
              { name: "FASTPATH", icon: Zap },
              { name: "FLUXPORT", icon: Ship },
              { name: "TERRA", icon: Globe },
              { name: "APEX", icon: Rocket }
            ].map((partner, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-16 flex flex-col items-center justify-center border border-border bg-card p-4 hover:border-primary transition-all cursor-pointer group"
              >
                <partner.icon size={18} className="text-slate-400 group-hover:text-primary mb-2 transition-colors" />
                <div className="text-[10px] font-black tracking-tighter uppercase italic text-slate-500 group-hover:text-secondary dark:group-hover:text-white transition-colors">{partner.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </PageSectionLayout>
  );
};

export default ServicesPage;
