import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Leaf, Zap, Globe, BarChart3, Download, Users, ShieldCheck, ArrowRight, Heart, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const SustainabilityPage: React.FC = () => {
  const handleReportDownload = (title: string) => {
    toast.success(`${title} download protocol initiated.`);
  };

  const handlePartnerConnect = (name: string) => {
    toast.success(`Connecting to ${name} sustainability node...`);
  };

  return (
    <PageSectionLayout
      banner={{
        title: "MountainGreen Initiative",
        subtitle: "Building the world's most sustainable logistics network through AI and electrification."
      }}
      main={{
        title: "Logistics for a Greener Future",
        content: (
          <>
            <p>At MountainFleet, we recognize that the transportation sector is a significant contributor to global carbon emissions. We don't just see this as a challenge; we see it as an opportunity to lead.</p>
            <p>Our Sustainability OS integrates directly with your fleet to optimize fuel usage, reduce idle times, and accelerate the transition to zero-emission vehicles.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Our Sustainability Pillars",
        items: [
          { icon: Leaf, title: "Zero Emission", desc: "Goal to transition 60% of our fleet to electric by 2028." },
          { icon: Zap, title: "Route Efficiency", desc: "AI optimization that reduces fuel consumption by an average of 24%." },
          { icon: Globe, title: "Carbon Offsetting", desc: "100% of non-electric miles are offset through verified global projects." },
        ]
      }}
      cta={{
        title: "Ready to go green?",
        subtitle: "Join the network of sustainable logistics and start reducing your carbon footprint today.",
        buttonText: "Join Initiative",
        link: "/register"
      }}
    >
      {/* 4. Carbon Dashboard Visual */}
      <section className="py-16 sm:py-24 border-b border-border bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Intelligence<br /><span className="text-primary">Measures Impact.</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-12">Every mile tracked by MountainFleet is analyzed for its environmental impact, providing you with real-time ESG data.</p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="p-8 border border-border bg-card">
                  <div className="text-primary mb-4"><BarChart3 size={32} /></div>
                  <div className="text-3xl font-black mb-1">12.4k</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Tons CO2 Avoided</div>
                </div>
                <div className="p-8 border border-border bg-card">
                  <div className="text-primary mb-4"><Zap size={32} /></div>
                  <div className="text-3xl font-black mb-1">8.2M</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Electric Miles</div>
                </div>
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="aspect-square bg-secondary border border-border overflow-hidden p-8">
                <div className="w-full h-full border border-white/10 relative">
                  <div className="absolute inset-0 technical-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-8 border-primary border-t-transparent rounded-full animate-[spin_10s_linear_infinite]" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <div className="text-4xl font-black text-white">74%</div>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Efficiency Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Electric Transition Timeline */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Road to Net Zero</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">Our roadmap for transforming the global logistics infrastructure.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -z-0" />
            {[
              { year: "2024", title: "Pilot Hubs", desc: "Launch of 100% electric delivery hubs in San Francisco and Berlin." },
              { year: "2026", title: "Scale Phase", desc: "Transitioning all long-haul routes to hydrogen-electric hybrids." },
              { year: "2028", title: "The Standard", desc: "Achieving carbon neutrality across all primary network operations." }
            ].map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border border-border p-8 relative z-10 hover:border-primary transition-colors"
              >
                <div className="text-4xl font-black text-primary/10 mb-4">{phase.year}</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{phase.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Community Impact */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1000" alt="Community" className="border border-border shadow-xl" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6">
                <Users size={12} /> Social Responsibility
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">More than just<br />a Network.</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">We invest in the communities we serve. From driver education programs to local environment restoration, MountainFleet is a force for positive change.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-border bg-card">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center"><Heart size={20} /></div>
                  <div className="text-sm font-bold uppercase tracking-tight">1M+ Trees Planted Annually</div>
                </div>
                <div className="flex items-center gap-4 p-4 border border-border bg-card">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center"><Globe size={20} /></div>
                  <div className="text-sm font-bold uppercase tracking-tight">Support for Local Infrastructure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ESG Reports */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-16">Transparency in Action</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "2025 Sustainability Report", type: "PDF · 12MB" },
              { title: "ESG Governance Framework", type: "PDF · 4MB" }
            ].map((report, i) => (
              <div 
                key={i} 
                onClick={() => handleReportDownload(report.title)}
                className="group p-10 border border-border bg-background flex flex-col items-center hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <Download size={40} className="text-slate-400 group-hover:text-primary transition-colors mb-6" />
                <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{report.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">{report.type}</p>
                <div className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  Download Report <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Green Partners */}
      <section className="py-16 sm:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <ShieldCheck size={48} className="text-primary" />
              <div>
                <h4 className="text-lg font-black uppercase tracking-tight">Certified Green Operator</h4>
                <p className="text-xs text-slate-500 font-medium">Compliance with International ISO 14001 Standards.</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: "ECODRIVE", icon: Zap },
                { name: "SOLARGRID", icon: Sun },
                { name: "GREENPATH", icon: Leaf },
                { name: "NATUREX", icon: Globe }
              ].map((partner, i) => (
                <motion.div 
                  key={i} 
                  onClick={() => handlePartnerConnect(partner.name)}
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  className="h-12 flex items-center gap-3 px-5 bg-card border border-border cursor-pointer hover:border-primary transition-all group shadow-sm hover:shadow-md"
                >
                  <partner.icon size={14} className="text-slate-400 group-hover:text-primary transition-colors" />
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-secondary dark:group-hover:text-white transition-colors">{partner.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default SustainabilityPage;
