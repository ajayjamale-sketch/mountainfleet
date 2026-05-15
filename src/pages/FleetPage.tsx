import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Truck, Shield, Zap, Activity, Leaf, Award, ChevronRight, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
        // Keeping this prop for layout logic
        image: "/assets/fleet/fleet-hero-standard.png", 
        content: (
          <div className="space-y-6">
            <p>
              Every vehicle in the MountainFleet network undergoes rigorous weekly safety inspections 
              and performance tuning. We utilize the latest telematics to ensure optimal efficiency and safety.
            </p>
            <p>
              From zero-emission electric delivery vans to heavy-duty transcontinental haulers, 
              our fleet is designed to meet the demands of modern commerce without compromising on reliability.
            </p>
            
            <div className="pt-4">
              <a 
                href="/fleet-showcase" 
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-secondary dark:hover:bg-white dark:hover:text-secondary transition-all"
              >
                <span>Explore Full Fleet</span>
                <ChevronRight size={14} />
              </a>
            </div>
            
            {/* Explicit Image Injection: This ensures the image renders even if the layout prop fails */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-8 rounded-sm border border-border overflow-hidden bg-card"
            >
              <img 
                src="/assets/fleet/fleet-hero-standard.png" 
                alt="MountainFleet Standard of Excellence" 
                className="w-full h-auto object-cover"
                // Adding an onError handler to catch broken paths during dev
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/800x450?text=Fleet+Hero+Image+Missing")}
              />
            </motion.div>
          </div>
        ),
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
      <FleetShowcaseSection />

      {/* 2. Elite Operations & Maintenance */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6">
                <Activity size={12} /> Operational Intelligence
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Elite<br /><span className="text-primary">Operations.</span></h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                Our command center monitors every asset in real-time. We utilize predictive diagnostics to preemptive mechanical failures before they impact your delivery schedule.
              </p>
              
              <div className="space-y-8 mb-10">
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

              <Link 
                to="/fleet-metrics" 
                className="inline-flex items-center gap-3 bg-secondary dark:bg-white dark:text-secondary text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-primary transition-all group"
              >
                <span>View Global Metrics</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-card border border-border overflow-hidden">
                  <img 
                    src="/assets/fleet/maintenance-diagnostics.png" 
                    className="w-full h-full object-cover" 
                    alt="Maintenance" 
                    onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800")}
                  />
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
                  <img 
                    src="/assets/fleet/vehicle-inspection.png" 
                    className="w-full h-full object-cover" 
                    alt="Inspection" 
                    onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800")}
                  />
                </div>
              </div>
            </div>
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
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none text-emerald-500">Driving towards<br /><span className="text-foreground">Zero Emissions.</span></h2>
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
            
            {/* Sustainability Images Grid */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img 
                src="/assets/fleet/ev-truck.png" 
                className="border border-border hover:scale-105 transition-all duration-500 bg-card aspect-[4/5] object-cover" 
                alt="EV Truck" 
                onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1606185540410-d6ca68b0fde3?auto=format&fit=crop&q=80&w=800")}
              />
              <img 
                src="/assets/fleet/eco-hub.png" 
                className="border border-border pt-12 hover:scale-105 transition-all duration-500 bg-card aspect-[4/5] object-cover" 
                alt="Eco Plant" 
                onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1581091226835-a5a24e1d821a?auto=format&fit=crop&q=80&w=800")}
              />
            </div>
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default FleetPage;