import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Truck, Shield, Zap, Activity, Leaf, Award, ChevronRight, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { FleetShowcaseSection } from '../components/landing/FleetShowcaseSection';

const FleetPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Our Elite Fleet",
        subtitle: "A diverse, modern, and perfectly maintained network of vehicles ready for any logistics challenge."
      }}
      main={{
        title: "Standard of Excellence",
        content: (
          <>
            <p>Every vehicle in the MountainFleet network undergoes rigorous weekly safety inspections and performance tuning. We utilize the latest telematics to ensure optimal efficiency and safety.</p>
            <p>From zero-emission electric delivery vans to heavy-duty transcontinental haulers, our fleet is designed to meet the demands of modern commerce without compromising on reliability.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Fleet Capabilities",
        items: [
          { icon: Truck, title: "Diverse Loadouts", desc: "Specialized vehicles for refrigerated goods, hazardous materials, and bulk cargo." },
          { icon: Shield, title: "AI-Monitored", desc: "Every truck is equipped with AI safety systems and 24/7 GPS tracking." },
          { icon: Zap, title: "Fast Dispatch", desc: "Our network allows for vehicle assignment in under 15 minutes in major hubs." },
        ]
      }}
      cta={{
        title: "Need a dedicated fleet?",
        subtitle: "Talk to our logistics experts about long-term leasing and custom fleet management solutions.",
        buttonText: "Inquire Now",
        link: "/contact"
      }}
    >
      {/* 1. Fleet Showcase */}
      <FleetShowcaseSection />

      {/* 2. Maintenance Excellence */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Predictive<br /><span className="text-primary">Maintenance.</span></h2>
              <div className="space-y-8">
                {[
                  { icon: Wrench, title: "Real-time Diagnostics", desc: "Sensors monitor engine health, tire pressure, and brake wear every second." },
                  { icon: Activity, title: "Performance Tuning", desc: "Automatic ECU updates via satellite to optimize fuel consumption based on terrain." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-card border border-border overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1486006396193-471a2abc881a?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale opacity-50" alt="Maintenance" />
                </div>
                <div className="p-6 bg-secondary text-white border border-border">
                  <div className="text-3xl font-black mb-1">99.8%</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Fleet Uptime</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-6 bg-primary text-white border border-border">
                  <div className="text-3xl font-black mb-1">2,400+</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Weekly Inspections</div>
                </div>
                <div className="h-48 bg-card border border-border overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1530124560677-bdaeaefd2fc1?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale opacity-50" alt="Inspection" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Safety First */}
      <section className="py-16 sm:py-24 bg-secondary text-white border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter mb-16">Safety is our<br />Operating System.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { label: "Driver Score", val: "4.95/5", desc: "Continuous monitoring for safe driving habits." },
              { label: "Accident Rate", val: "<0.01%", desc: "Industry-leading safety records across all hubs." },
              { label: "AI Intervention", val: "Instant", desc: "Automated braking and lane keeping on all trucks." }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">{stat.label}</div>
                <div className="text-4xl font-black mb-4">{stat.val}</div>
                <p className="text-xs text-white/40 font-medium">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sustainability Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest mb-6">
                <Leaf size={12} /> Green Logistics
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Driving towards<br />Zero Emissions.</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12">Our "MountainGreen" initiative is committed to converting 60% of our last-mile fleet to electric by 2028.</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                    <span>Electric Conversion Progress</span>
                    <span>32%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 border border-border">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "32%" }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full bg-emerald-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                    <span>Carbon Offset Goal</span>
                    <span>100% by 2030</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 border border-border">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1593941707882-a5bba1491017?auto=format&fit=crop&q=80&w=800" className="border border-border grayscale" alt="EV Truck" />
              <img src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800" className="border border-border grayscale pt-12" alt="Eco Plant" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Driver Elite Section */}
      <section className="py-16 sm:py-24 bg-card border-b border-border overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Elite Operators</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">Our systems are powered by the world's most advanced logistics intelligence and telemetry.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-square bg-background border border-border mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={`https://images.unsplash.com/photo-${["1519003722824-192d99a24bb7", "1580674285054-bed31e145f59", "1494412519320-aa613dfb7738", "1512413316925-fd30921a2832"][i-1]}?auto=format&fit=crop&q=80&w=400`} alt="Operations" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-primary text-white p-2">
                    <Award size={16} />
                  </div>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-1">{["Fleet Analytics", "Safety Metrics", "Global Dispatch", "Telemetry Core"][i-1]}</h3>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">Operational Excellence</div>
                <div className="flex items-center gap-1 text-primary text-xs font-bold">
                  View Metrics <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default FleetPage;
