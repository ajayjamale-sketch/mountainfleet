import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Activity, MapPin, Gauge, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-secondary dark:text-white transition-colors">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-32 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-500 dark:text-slate-400">Live operations · 1,240 vehicles tracked</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase"
          >
            Move <span className="text-primary">mountains.</span><br />
            <span className="text-slate-400 dark:text-slate-600">Track every mile.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed"
          >
            The rugged, real-time platform for fleets, logistics and trip operations. Dispatch faster, save fuel, and delight customers — all from one high-fidelity dashboard.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Link to="/signup">
              <Button variant="primary" size="lg" className="px-10 py-7 rounded-2xl shadow-2xl shadow-primary/20">
                Start free trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-10 py-7 rounded-2xl border-2 hover:bg-slate-100 dark:hover:bg-white/5 font-black uppercase tracking-widest text-[11px]">
                View live demo
              </Button>
            </Link>
          </motion.div>
          
          <div className="mt-16 flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {[
              { icon: ShieldCheck, label: "SOC 2 · ISO 27001" },
              { icon: Activity, label: "99.99% uptime" },
              { icon: MapPin, label: "Global GPS Sync" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 group transition-colors hover:text-primary">
                <Icon className="w-4 h-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Floating dashboard preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2, duration: 0.8 }} 
          className="relative lg:ml-auto"
        >
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent blur-3xl rounded-full opacity-50" />
          
          <div className="relative bg-white dark:bg-slate-900 rounded-[48px] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Truck size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Live Fleet Node</div>
                  <div className="text-lg font-black text-secondary dark:text-white uppercase tracking-tighter">North Route 7</div>
                </div>
              </div>
              <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-500/10">
                Operational
              </div>
            </div>
            
            <div className="rounded-[32px] overflow-hidden h-72 relative bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5">
              <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=900&h=600&fit=crop" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
              
              <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full p-8">
                <path d="M30 200 Q120 120 200 140 T370 40" stroke="currentColor" className="text-primary/20 dark:text-primary/40" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M30 200 Q120 120 200 140 T370 40" stroke="currentColor" className="text-primary" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="12 12" />
                <circle cx="30" cy="200" r="8" fill="currentColor" className="text-accent" />
                <circle cx="370" cy="40" r="10" fill="currentColor" className="text-primary shadow-xl" />
              </svg>
              
              <motion.div
                animate={{ x: [0, 340], y: [0, -160] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute left-8 bottom-8 z-20"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary shadow-2xl flex items-center justify-center text-white border-4 border-white dark:border-slate-800">
                  <Truck size={20} />
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Gauge, label: "Velocity", value: "62 mph", color: "text-primary" },
                { icon: Activity, label: "ETA Sync", value: "12:45 PM", color: "text-accent" },
                { icon: MapPin, label: "Destination", value: "Aspen Hub", color: "text-emerald-500" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    <Icon className={`w-3 h-3 ${color}`} />
                    {label}
                  </div>
                  <div className="text-xs font-black text-secondary dark:text-white uppercase truncate">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating metrics */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 5, repeat: Infinity }} 
            className="absolute -left-12 top-24 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-white/10 hidden xl:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg">
                <Zap size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fleet Load</div>
                <div className="text-lg font-black text-secondary dark:text-white uppercase tracking-tighter">84.2% Active</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ duration: 6, repeat: Infinity }} 
            className="absolute -right-8 bottom-20 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-white/10 hidden xl:block"
          >
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Network Health</div>
            <div className="text-2xl font-black text-emerald-500 uppercase tracking-tighter">High Fidelity</div>
            <div className="flex items-center gap-2 mt-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black text-emerald-500/60 uppercase">System Nominal</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
