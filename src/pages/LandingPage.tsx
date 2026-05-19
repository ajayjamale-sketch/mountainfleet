import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Shield, Globe, Zap, BarChart3, 
  Truck, CheckCircle2, ChevronRight, Activity, 
  Smartphone, Map, Layers, BellRing, Route, BrainCircuit,
  Settings2, ActivitySquare, LayoutDashboard, Clock, UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Stats } from '../components/landing/Stats';
import { Testimonials } from '../components/landing/Testimonials';
import { FAQSection } from '../components/landing/FAQSection';
import { cn } from '../utils/cn';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);

  const newFeatures = [
    { title: "AI Fleet Assistant", desc: "Predictive maintenance and fuel optimization insights powered by advanced machine learning models.", icon: BrainCircuit, color: "text-blue-500" },
    { title: "Real-Time Operations", desc: "Live activity feeds, operational alerts, and dynamic fleet heatmaps for instant decision making.", icon: Activity, color: "text-emerald-500" },
    { title: "Smart Analytics Engine", desc: "Revenue forecasting, driver behavior analysis, and comprehensive utilization metrics.", icon: BarChart3, color: "text-purple-500" },
    { title: "Command Center", desc: "Global search, keyboard shortcuts (⌘K), and quick actions for lightning-fast navigation.", icon: LayoutDashboard, color: "text-amber-500" },
    { title: "Advanced Notifications", desc: "Real-time alerts, maintenance reminders, and critical emergency broadcasts.", icon: BellRing, color: "text-rose-500" },
    { title: "Smart Scheduling", desc: "Drag-and-drop trip planning with automated routing and scheduling suggestions.", icon: Clock, color: "text-indigo-500" },
    { title: "AI Trip Insights", desc: "Delay predictions, route efficiency scoring, and automated driver performance tracking.", icon: Route, color: "text-cyan-500" },
    { title: "Fleet Health Monitoring", desc: "Real-time vehicle health scores, service tracking, and automated compliance alerts.", icon: ActivitySquare, color: "text-teal-500" },
    { title: "Multi-Company Workspace", desc: "Seamless organization switching, granular team management, and workspace controls.", icon: Layers, color: "text-orange-500" },
    { title: "Driver Management", desc: "Comprehensive driver profiles, performance metrics, and automated compliance tracking.", icon: UserCheck, color: "text-sky-500" }
  ];

  const workflowSteps = [
    { phase: "Customer", action: "Requests Transport", desc: "Instant quoting and booking via the customer portal." },
    { phase: "System AI", action: "Optimizes Routing", desc: "Calculates the most efficient path and assigns the best vehicle." },
    { phase: "Dispatcher", action: "Approves Dispatch", desc: "One-click approval from the unified command center." },
    { phase: "Driver", action: "Executes Route", desc: "Turn-by-turn navigation and live status updates." }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-primary/20 selection:text-primary">
      
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-100" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">MountainFleet v2.0 is now live</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-extrabold tracking-tighter leading-[1.05] mb-8 text-slate-900 dark:text-white">
              The operating system for <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">modern logistics.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl font-medium leading-relaxed">
              Automate dispatching, track assets with centimeter precision, and scale your operations with real-time AI-driven intelligence. Built for enterprise fleets.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link 
                to={user ? "/dashboard" : "/register"} 
                className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold text-sm shadow-[0_0_40px_rgba(15,23,42,0.2)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <span>{user ? "Go to Dashboard" : "Start Free Trial"}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 2. LIVE DASHBOARD PREVIEW */}
        <div className="max-w-6xl mx-auto px-6 mt-20 relative z-10 perspective-1000">
          <motion.div 
            initial={{ opacity: 0, rotateX: 10, y: 40 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 p-2 backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-950 z-20 pointer-events-none rounded-2xl" />
            <img 
              src="/dashboard.png" 
              alt="MountainFleet Command Center" 
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000";
              }}
            />
            
            {/* Floating Live Stat Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -right-6 top-1/4 z-30 hidden lg:flex flex-col gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-64"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Fleet Efficiency</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">98.4% Optimal</p>
                  </div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[98.4%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by innovative logistics teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {['LOGICORP', 'OCEANIC', 'FASTPATH', 'FLUXPORT', 'TERRA'].map(logo => (
               <span key={logo} className="text-xl font-black tracking-tighter text-slate-900 dark:text-white cursor-default">{logo}</span>
             ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURE SHOWCASE SECTION */}
      <section className="py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800 relative bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">Everything you need to run a modern fleet.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Ten powerful new modules designed to automate workflows, reduce overhead, and increase operational efficiency.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newFeatures.map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform", feature.color)}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SMART AI INSIGHTS SECTION */}
      <section className="py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">AI Assistant</h4>
                    <p className="text-sm text-slate-500">Processing live telemetry...</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { msg: "Detected a 15 min delay on Route A due to weather. Re-routing Vehicle #42.", time: "Just now" },
                    { msg: "Maintenance required for Vehicle #12 (Brake pads) within 500 miles.", time: "2 hours ago" },
                    { msg: "Fuel efficiency dropped by 4% on long-haul routes. Suggesting alternative paths.", time: "Yesterday" }
                  ].map((chat, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{chat.msg}</p>
                        <p className="text-[11px] text-slate-400 mt-2">{chat.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 text-primary font-bold text-sm tracking-widest uppercase mb-6">
                <SparklesIcon />
                <span>MountainFleet AI</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Your fleet, <br />smarter than ever.</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Stop guessing. Our proprietary AI analyzes millions of data points from your vehicles to predict maintenance, optimize routes, and save you money before issues happen.
              </p>
              <ul className="space-y-5">
                 {[
                   'Predictive maintenance alerts to prevent breakdowns.',
                   'Dynamic route optimization to save fuel and time.',
                   'Automated driver performance scoring and coaching.'
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium">
                     <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                       <CheckCircle2 size={14} />
                     </div>
                     <span>{item}</span>
                   </li>
                 ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WORKFLOW SECTION */}
      <section className="py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">Seamless orchestration.</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-20 max-w-2xl mx-auto">From the moment a customer requests a quote to the final delivery, MountainFleet connects every step of the journey.</p>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200 dark:bg-slate-800 z-0" />
            {workflowSteps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-white dark:border-slate-950 shadow-xl flex items-center justify-center text-primary text-2xl font-black mb-6">
                  0{i + 1}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{step.phase}</p>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{step.action}</h4>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PERFORMANCE STATS */}
      <Stats />

      {/* 11. MOBILE APP PREVIEW */}
      <section className="py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 opacity-50" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-sky-400 font-bold text-sm tracking-widest uppercase mb-6">
                <Smartphone size={16} />
                <span>Driver App</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">Power in your pocket.</h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                Empower your drivers with a dedicated mobile application that provides turn-by-turn navigation, digital proof of delivery, and seamless expense reporting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-xl transition-transform hover:scale-105">
                  Download for iOS
                </button>
                <button className="bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-700">
                  Download for Android
                </button>
              </div>
            </div>
            <div className="relative flex justify-center">
               <div className="w-72 h-[600px] bg-slate-950 rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                 {/* Mobile Notch */}
                 <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-3xl w-1/2 mx-auto z-50" />
                 {/* App Interface Mockup */}
                 <div className="flex-1 bg-slate-100 dark:bg-slate-900 p-6 pt-12 flex flex-col gap-4">
                   <div className="flex justify-between items-center mb-4">
                     <div className="text-slate-900 dark:text-white font-bold text-lg">Active Trip</div>
                     <div className="bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded text-xs font-bold">ON TIME</div>
                   </div>
                   <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                     <p className="text-xs text-slate-500 mb-1">Destination</p>
                     <p className="font-bold text-slate-900 dark:text-white text-sm">Port of Los Angeles, CA</p>
                     <div className="my-4 h-32 bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center">
                       <Map size={32} className="text-slate-400" />
                     </div>
                     <button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm">Navigate</button>
                   </div>
                   <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mt-auto">
                     <div className="flex justify-between items-center">
                       <span className="font-bold text-slate-900 dark:text-white">Proof of Delivery</span>
                       <ChevronRight size={16} className="text-slate-400" />
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <Testimonials />

      {/* 10. FAQ */}
      <FAQSection />

      {/* 12. CTA SECTION */}
      <section className="py-24 sm:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-8">Ready to upgrade your fleet?</h2>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto font-medium">Join 500+ modern logistics companies that use MountainFleet to orchestrate their daily operations.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto bg-white text-primary px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Start Your Free Trial
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto text-white border-2 border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Icon
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);

export default LandingPage;
