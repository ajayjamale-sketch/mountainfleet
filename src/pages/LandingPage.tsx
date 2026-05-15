import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Shield, Globe, Zap, BarChart3, 
  Truck, Ship, CheckCircle2, ChevronRight, Play,
  Users, Star, MapPin, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Stats } from '../components/landing/Stats';
import { FleetShowcaseSection } from '../components/landing/FleetShowcaseSection';
import { Testimonials } from '../components/landing/Testimonials';
import { FAQSection } from '../components/landing/FAQSection';
import { useAuth } from '../context/AuthContext';


const LandingPage: React.FC = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden selection:bg-primary selection:text-white technical-grid">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-border bg-background overflow-hidden">
        {/* Background Hero Image - Relative Path */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.png" 
            alt="Logistics Command Center" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left max-w-4xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 bg-accent/5 border border-accent/20 px-4 py-1 mb-8">
              <div className="w-1.5 h-1.5 bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">System v2.0 Live // Protocol Active</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-8xl font-black text-secondary dark:text-white leading-[0.9] mb-8 tracking-tighter uppercase">
              Elite Fleet <br />
              <span className="text-primary">Orchestration.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-10 lg:mb-12 max-w-2xl font-medium leading-relaxed">
              High-fidelity platform for global logistics. Automate dispatching, track assets with centimeter precision, and scale with real-time technical intelligence.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start justify-start gap-4 mb-20 lg:mb-24">
              <Link 
                to={user ? "/dashboard" : "/register"} 
                className="w-full sm:w-auto bg-primary text-white px-10 py-5 font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center space-x-3 hover:bg-primary/90 shadow-xl shadow-primary/20"
              >
                <span>{user ? "Enter Command Center" : "Establish Network"}</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/services" className="w-full sm:w-auto flex items-center justify-center space-x-3 text-secondary dark:text-white font-bold text-sm uppercase tracking-widest px-10 py-5 border border-border hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                <span>View Protocols</span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Dashboard Preview - Relative Path */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-6xl"
          >
            <div className="relative border border-border bg-background shadow-2xl overflow-hidden group">
              <img 
                src="/dashboard.png" 
                alt="Technical Interface" 
                className="w-full transition-all duration-700 min-h-[300px] sm:min-h-[400px] object-cover opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
            </div>
            
            {/* Floating Technical Stat */}
            <div className="absolute -right-4 top-1/4 hidden xl:block p-6 bg-background border border-border shadow-2xl max-w-xs">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-accent/10 text-accent flex items-center justify-center">
                  <Activity size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Throughput</p>
                  <p className="text-sm font-bold text-secondary dark:text-white">98.4% Nominal</p>
                </div>
              </div>
              <div className="h-0.5 bg-border">
                <div className="h-full bg-accent w-[98.4%] shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-12 sm:py-16 border-b border-border bg-slate-50 dark:bg-background/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12">Synchronizing with global infrastructure nodes</p>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-40 transition-all duration-700">
             {['LOGICORP', 'OCEANIC', 'FASTPATH', 'FLUXPORT', 'TERRA'].map(logo => (
               <span key={logo} className="text-lg sm:text-xl font-black tracking-tighter text-secondary dark:text-white cursor-default uppercase">{logo}</span>
             ))}
          </div>
        </div>
      </section>

      {/* FEATURES - GRID SYSTEM */}
      <section className="py-20 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-secondary dark:text-white mb-6 uppercase tracking-tighter">Core Infrastructure.</h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl">Precision tools engineered for complex network orchestration.</p>
          </div>

          <div className="grid lg:grid-cols-3 border-t border-l border-border">
            {[
              { title: 'Global Network', desc: 'Operate across borders. Automatic multi-currency and customs sync.', icon: Globe },
              { title: 'Instant Sync', desc: 'Low-latency data streaming keeps your fleet connected in real-time.', icon: Zap },
              { title: 'Deep Insight', desc: 'Advanced analytics that reveal hidden throughput opportunities.', icon: BarChart3 },
              { title: 'Secure Protocol', desc: 'Operational data is encrypted with military-grade 256-bit protocols.', icon: Shield },
              { title: 'Fleet Tracking', desc: 'Centimeter precision GPS tracking across the entire global network.', icon: MapPin },
              { title: 'Fleet Audit', desc: 'Comprehensive financial and operational logs for every node.', icon: Truck },
            ].map((feature, i) => (
              <div key={i} className="p-10 border-r border-b border-border group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-secondary dark:text-white mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONAL EXCELLENCE */}
      <section className="py-20 sm:py-32 border-b border-border bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-background border border-border overflow-hidden p-1">
                 <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1000" alt="Control Center" className="w-full h-full object-cover grayscale opacity-50" />
                 <div className="absolute inset-0 technical-grid opacity-20" />
              </div>
              <div className="absolute -bottom-10 -right-10 p-10 bg-primary text-white border border-border hidden xl:block shadow-2xl">
                 <BarChart3 size={64} />
              </div>
            </motion.div>
            <div>
              <div className="inline-flex items-center space-x-2 text-primary mb-6">
                <Zap size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">AI-Driven Logistics</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-secondary dark:text-white mb-8 tracking-tighter uppercase leading-[0.9]">Autonomous <br /><span className="text-primary">Intelligence.</span></h2>
              <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-10 font-medium leading-relaxed">Our proprietary AI engine optimizes routes in real-time, accounting for terrain, fuel efficiency, and terminal wait times across the global network.</p>
              <ul className="space-y-6">
                 {[
                   { title: 'Predictive Dispatch', desc: 'Anticipate demand surges before they occur with historical telemetry.' },
                   { icon: CheckCircle2, title: 'Dynamic Rerouting', desc: 'Automatic path optimization to bypass network bottlenecks.' }
                 ].map((item, i) => (
                   <li key={i} className="flex gap-4">
                     <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                       <CheckCircle2 size={14} />
                     </div>
                     <div>
                       <h4 className="text-sm font-black uppercase tracking-tight text-secondary dark:text-white mb-1">{item.title}</h4>
                       <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                     </div>
                   </li>
                 ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE STATS */}
      <Stats />

      {/* FLEET SHOWCASE */}
      <FleetShowcaseSection />

      {/* SECURITY & RESILIENCE */}
      <section className="py-20 sm:py-32 border-b border-border bg-secondary dark:bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 technical-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">Network <br /><span className="text-primary">Resilience.</span></h2>
              <p className="text-white/40 text-base sm:text-lg mb-12 font-medium leading-relaxed">Built for mission-critical operations, MountainFleet operates with redundant command nodes and satellite-linked telemetry for zero-fail communication.</p>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                   { label: 'Uptime Protocol', value: '99.999%', desc: 'Carrier-grade availability across all hubs.' },
                   { label: 'Security Sync', value: 'AES-256', desc: 'Military-standard logistical encryption.' },
                   { label: 'Sync Latency', value: '<24ms', desc: 'Near-instant global telemetry updates.' },
                   { label: 'Node Backup', value: 'Triple', desc: 'Distributed cloud and satellite redundancy.' }
                ].map((stat, i) => (
                  <div key={i} className="p-6 border border-white/10 bg-white/5 group hover:border-primary transition-all">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{stat.label}</p>
                    <p className="text-3xl font-black tracking-tight mb-2">{stat.value}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="aspect-[4/3] border border-white/10 bg-background/20 relative"
               >
                 <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" alt="Security Grid" className="w-full h-full object-cover grayscale opacity-30" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Shield size={120} className="text-primary animate-pulse" />
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-secondary dark:bg-slate-950 relative overflow-hidden">
        {/* CTA Background Image - Relative Path */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/fleet.png" 
            alt="Logistics Hub" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <div className="p-12 sm:p-20 border border-white/10 relative overflow-hidden group bg-secondary/50 backdrop-blur-sm">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-10 uppercase tracking-tighter leading-none">Scale Your Operations.</h2>
              <p className="text-white/40 text-sm sm:text-lg max-w-2xl mx-auto mb-12 font-medium">Join 500+ enterprises that trust MountainFleet for global logistics.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  to={user ? "/dashboard" : "/register"} 
                  className="w-full sm:w-auto bg-primary text-white px-12 py-6 font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-2xl shadow-primary/20"
                >
                  {user ? "Access Dashboard" : "Start Free Trial"}
                </Link>

                <Link to="/contact" className="w-full sm:w-auto text-white border border-white/20 px-12 py-6 font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
