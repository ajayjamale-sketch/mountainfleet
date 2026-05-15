import React from 'react';
import { vehicles } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Truck, MapPin, Gauge, Shield, Search, Filter } from 'lucide-react';

export default function FleetShowcase() {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredVehicles = vehicles.filter(v => 
    v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white pt-16">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, #0369A1 0, transparent 40%), radial-gradient(circle at 80% 80%, #F97316 0, transparent 40%)"
          }} />
          <div className="absolute inset-0 technical-grid opacity-10" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            >
              <Truck size={12} /> Asset Directory v2.4
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8"
            >
              The <span className="text-primary">Mountain</span> Fleet.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
            >
              Real-time visualization of our global logistical assets. Every vehicle is equipped with enterprise-grade telemetry and AI-driven safety protocols.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by model or class..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border pl-12 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-primary transition-all placeholder:text-slate-500"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Filter size={14} className="text-slate-400 shrink-0" />
            {['All Units', 'Heavy Duty', 'Delivery', 'Specialized', 'Electric'].map((filter) => (
              <button 
                key={filter}
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-border hover:border-primary hover:text-primary transition-all whitespace-nowrap bg-card"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Showcase */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-6">
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((v, i) => (
                <motion.div 
                  key={v.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.05 }}
                  className="group relative bg-card border border-border hover:border-primary transition-all duration-500 overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={v.image} 
                      alt={v.model} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-sm ${
                        v.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : 
                        v.status === "Maintenance" ? "bg-amber-500/20 text-amber-400" : 
                        "bg-slate-500/20 text-white"
                      }`}>
                        {v.status}
                      </div>
                      <div className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-primary text-white">
                        {v.type}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{v.year} Release</p>
                        <h3 className="text-2xl font-black text-secondary dark:text-white uppercase tracking-tighter">{v.model}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">ID Plate</p>
                        <p className="text-sm font-black text-primary uppercase">{v.plate}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                          <MapPin size={14} />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Base Hub</p>
                          <p className="text-xs font-bold text-secondary dark:text-white">{v.location.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                          <Gauge size={14} />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Odometer</p>
                          <p className="text-xs font-bold text-secondary dark:text-white">{v.mileage.toLocaleString()} MI</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <Shield size={14} className="text-emerald-500" />
                         <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Certified Secure</span>
                       </div>
                       <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-secondary dark:hover:text-white transition-colors">
                         View Telemetry →
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border">
              <p className="text-slate-500 font-medium uppercase tracking-widest">No matching assets found in registry.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
