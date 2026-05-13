import React, { useState, useEffect } from 'react';
import { Navigation, Truck, User, Clock, Shield, MapPin, Phone, MessageSquare, ExternalLink, Zap, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { initialTrips } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

const TrackTrip: React.FC = () => {
  const [progress, setProgress] = useState(65);
  const [activeTrip, setActiveTrip] = useState<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const trips = storageService.get(STORAGE_KEYS.TRIPS, initialTrips);
    const trip = trips.find((t: any) => t.status === 'In Transit') || trips[0];
    setActiveTrip(trip);
    
    const interval = setInterval(() => {
      setProgress(p => (p < 99 ? p + 0.05 : 99.9));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary dark:text-white tracking-tighter leading-none mb-4">Live Orchestration</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            GPS monitoring for payload <span className="text-primary font-black">{activeTrip?.id || 'MF-7721'}</span> in real-time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-emerald-500/10 text-emerald-500 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/10 flex items-center space-x-3 shadow-lg shadow-emerald-500/5">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
            <span>Satellite Active</span>
          </div>
          <div className="bg-primary/10 text-primary px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10 flex items-center space-x-3 shadow-lg shadow-primary/5">
            <Wifi size={14} className="animate-pulse" />
            <span>5G Sync High</span>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-12 gap-10">
        {/* Map Simulation */}
        <div className="xl:col-span-8 bg-card border border-border rounded-[48px] sm:rounded-[64px] h-[450px] sm:h-[650px] lg:h-[750px] relative overflow-hidden shadow-2xl group transition-all duration-500 hover:border-primary/20">
          <div className={theme === 'dark' ? "absolute inset-0 bg-[#0f172a]" : "absolute inset-0 bg-slate-50"}>
            <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: theme === 'dark' 
                ? `radial-gradient(#334155 1.5px, transparent 1.5px)` 
                : `radial-gradient(#cbd5e1 1.5px, transparent 1.5px)`, 
              backgroundSize: '40px 40px' 
            }} />
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: theme === 'dark'
                ? 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)'
                : 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '120px 120px'
            }} />
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none p-10 sm:p-20 lg:p-32">
            <motion.path
              d="M 50 450 C 200 150, 400 500, 750 300"
              fill="none"
              stroke={theme === 'dark' ? "#1e293b" : "#e2e8f0"}
              strokeWidth="12"
              strokeLinecap="round"
            />
            <motion.path
              d="M 50 450 C 200 150, 400 500, 750 300"
              fill="none"
              stroke="#0369A1"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset={1000 - (progress * 10)}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>

          <div className="absolute inset-0 p-10 sm:p-20 lg:p-32 pointer-events-none">
            <div className="absolute left-[50px] top-[450px] -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full border-4 border-slate-100 dark:border-slate-700 shadow-2xl flex items-center justify-center">
                <MapPin size={20} className="text-slate-300" />
              </div>
            </div>
            <div className="absolute left-[750px] top-[300px] -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-primary rounded-[24px] border-8 border-white dark:border-slate-900 shadow-2xl flex items-center justify-center">
                <MapPin size={24} className="text-white" />
              </div>
            </div>
            
            <motion.div 
              style={{ left: `${50 + (progress * 7)}px`, top: `${450 - (progress * 1.5)}px` }}
              className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-primary p-6 rounded-[32px] shadow-[0_32px_80px_rgba(3,105,161,0.5)] relative border-4 border-white dark:border-slate-800">
                <Truck size={32} className="text-white" />
                <div className="absolute inset-0 rounded-[32px] bg-primary animate-ping opacity-30" />
              </div>
              <div className="mt-6 bg-secondary/95 dark:bg-slate-950/95 backdrop-blur-2xl px-6 py-3 rounded-2xl text-[10px] font-black text-white border border-white/10 shadow-2xl uppercase tracking-[0.2em] whitespace-nowrap">
                NODE-{activeTrip?.id || 'MF-7721'} • {Math.round(progress)}%
              </div>
            </motion.div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 flex flex-col space-y-4">
            <button className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-6 rounded-[24px] border border-border text-secondary dark:text-white hover:bg-primary hover:text-white transition-all shadow-2xl group active:scale-95">
              <Navigation size={28} className="group-hover:rotate-45 transition-transform" />
            </button>
            <div className="flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[24px] border border-border shadow-2xl overflow-hidden">
              <button className="p-6 border-b border-border text-secondary dark:text-white hover:bg-primary hover:text-white text-2xl font-black transition-all active:scale-95">+</button>
              <button className="p-6 text-secondary dark:text-white hover:bg-primary hover:text-white text-2xl font-black transition-all active:scale-95">-</button>
            </div>
          </div>

          {/* Location Badge */}
          <div className="absolute top-8 sm:top-12 left-8 sm:left-12 max-w-[calc(100%-64px)]">
            <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-[40px] shadow-2xl">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-inner">
                  <Navigation size={28} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 leading-none">Telemetry Origin</p>
                  <p className="text-lg font-black text-secondary dark:text-white truncate tracking-tighter">Sacramento Hub Delta-9</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-card border border-border p-10 lg:p-14 rounded-[56px] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 text-primary/5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
               <Zap size={140} />
            </div>
            <h3 className="text-3xl font-black text-secondary dark:text-white mb-12 tracking-tighter relative z-10">Asset Intelligence</h3>
            <div className="space-y-12 relative z-10">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary border border-primary/5 shadow-inner">
                  <User size={32} />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 leading-none">Assigned Operator</p>
                  <p className="text-secondary dark:text-white font-black text-xl tracking-tighter">{activeTrip?.driver || 'Alex Morgan'}</p>
                  <div className="flex items-center space-x-2 mt-2.5 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                    <Shield size={14} />
                    <span>Integrity Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-white/5 border border-border p-6 rounded-[32px] group/item hover:border-primary transition-all">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Est. Sync</p>
                  <div className="flex items-center space-x-3 text-secondary dark:text-white">
                    <Clock size={20} className="text-primary" />
                    <span className="text-2xl font-black tracking-tighter">42m</span>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 border border-border p-6 rounded-[32px] group/item hover:border-primary transition-all">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Core Temp.</p>
                  <div className="flex items-center space-x-3 text-secondary dark:text-white">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-2xl font-black tracking-tighter">4.2°C</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-5">
                  <span>Protocol Milestone</span>
                  <span className="text-primary">{Math.round(progress)}% Sync</span>
                </div>
                <div className="h-5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-1.5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(3,105,161,0.6)]"
                  />
                </div>
                <div className="mt-5 flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Origin Node</span>
                  <span>Target Node</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-secondary dark:bg-slate-950 border border-border p-10 lg:p-14 rounded-[56px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
              <MessageSquare size={160} />
            </div>
            <div className="relative z-10">
              <h4 className="text-2xl font-black mb-4 tracking-tighter">Emergency Hub</h4>
              <p className="text-white/40 text-sm mb-12 leading-relaxed font-medium">Direct synchronization with operator or global dispatch orchestration.</p>
              
              <div className="grid grid-cols-2 gap-5">
                <button className="flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 active:scale-95 group/call">
                  <Phone size={18} className="group-hover/call:rotate-12 transition-transform" />
                  <span>Call Operator</span>
                </button>
                <button className="flex items-center justify-center space-x-3 bg-primary hover:bg-primary/90 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 active:scale-95 group/msg">
                  <MessageSquare size={18} className="group-hover/msg:translate-x-1 transition-transform" />
                  <span>Secure Msg</span>
                </button>
              </div>
              
              <button className="w-full mt-8 flex items-center justify-center space-x-3 text-white/20 hover:text-white py-3 text-[10px] font-black uppercase tracking-widest transition-all">
                <ExternalLink size={16} />
                <span>Synchronize Full Manifest</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackTrip;
