import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Activity, MapPin, Gauge, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      {/* Mountain silhouette */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-60" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ height: 220 }}>
        <path fill="#0b1220" d="M0,224 L120,176 L240,224 L360,128 L480,192 L600,96 L720,176 L840,112 L960,208 L1080,144 L1200,224 L1320,176 L1440,224 L1440,320 L0,320 Z" />
        <path fill="#0369A1" opacity="0.35" d="M0,256 L160,208 L320,272 L480,192 L640,240 L800,176 L960,240 L1120,192 L1280,256 L1440,224 L1440,320 L0,320 Z" />
      </svg>

      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live operations · 1,240 vehicles tracked right now
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
          >
            Move mountains.<br />
            <span className="text-gradient">Track every mile.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-slate-300 max-w-xl"
          >
            The rugged, real-time platform for fleets, logistics and trip operations. Dispatch faster, save fuel, and delight customers — all from one beautiful dashboard.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="/signup"><Button variant="accent" size="lg">Start free trial <ArrowRight className="w-4 h-4" /></Button></Link>
            <Link to="/login"><Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10">View live demo</Button></Link>
          </motion.div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
            {[
              { icon: ShieldCheck, label: "SOC 2 · ISO 27001" },
              { icon: Activity, label: "99.99% uptime" },
              { icon: MapPin, label: "Global GPS" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-orange-400" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Floating dashboard preview */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
          <div className="absolute -inset-8 bg-gradient-to-tr from-sky-500/30 via-orange-500/20 to-transparent blur-3xl rounded-full" />
          <div className="relative glass-dark rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Live Fleet</div>
                <div className="text-lg font-semibold">North Route 7</div>
              </div>
              <div className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold rounded-full uppercase tracking-wider">On Time</div>
            </div>
            <div className="rounded-2xl overflow-hidden h-56 relative bg-gradient-to-br from-sky-900 to-slate-900 border border-white/5">
              <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=900&h=600&fit=crop" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              {/* Route */}
              <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="route" x1="0" x2="1">
                    <stop offset="0" stopColor="#F97316" />
                    <stop offset="1" stopColor="#0EA5E9" />
                  </linearGradient>
                </defs>
                <path d="M30 200 Q120 120 200 140 T370 40" stroke="url(#route)" strokeWidth="3" fill="none" strokeDasharray="6 6" />
                <circle cx="30" cy="200" r="6" fill="#F97316" />
                <circle cx="370" cy="40" r="6" fill="#0EA5E9" />
              </svg>
              <motion.div
                animate={{ x: [30, 370], y: [200, 40] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full bg-orange-500/30 flex items-center justify-center"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5 text-white" />
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Gauge, label: "Speed", value: "62 mph" },
                { icon: Activity, label: "ETA", value: "12:45" },
                { icon: MapPin, label: "Next stop", value: "Aspen" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400"><Icon className="w-3 h-3" />{label}</div>
                  <div className="text-sm font-semibold mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating cards */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-6 top-10 glass-dark rounded-2xl p-3 shadow-2xl border border-white/10 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center"><Truck className="w-5 h-5" /></div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Active</div>
                <div className="text-sm font-bold">38 vehicles</div>
              </div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -right-6 bottom-12 glass-dark rounded-2xl p-3 shadow-2xl border border-white/10 hidden md:block">
            <div className="text-[10px] text-slate-400 uppercase">Today revenue</div>
            <div className="text-lg font-bold text-emerald-300">$48,210</div>
            <div className="text-[10px] text-emerald-300">▲ 12.4% vs yesterday</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
