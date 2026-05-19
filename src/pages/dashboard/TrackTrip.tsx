import React, { useState, useEffect } from 'react';
import { Navigation, Truck, User, Clock, Shield, MapPin, Phone, MessageSquare, ExternalLink, Zap, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { initialTrips } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

const TrackTrip: React.FC = () => {
  const [progress, setProgress] = useState(65);
  const [activeTrip, setActiveTrip] = useState<Record<string, unknown>>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const trips = storageService.get(STORAGE_KEYS.TRIPS, initialTrips);
    const trip = trips.find((t: Record<string, unknown>) => t.status === 'In Transit') || trips[0];
    setActiveTrip(trip);
    
    const interval = setInterval(() => {
      setProgress(p => (p < 99 ? p + 0.05 : 99.9));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCallOperator = () => {
    toast.success(`Initializing encrypted voice link to ${activeTrip?.driver || 'Operator'}...`);
  };

  const handleMessageOperator = () => {
    toast.success(`Secure messaging channel synchronized with Node ${activeTrip?.id || 'MF-7721'}.`);
  };

  const handleFullManifest = () => {
    toast.success("Full payload manifest synchronized with command center.");
  };

  // Bezier Road Points
  const p0 = [100, 400];
  const p1 = [250, 150];
  const p2 = [550, 450];
  const p3 = [700, 200];

  const t = progress / 100;
  
  // Bezier Point calculation B(t)
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  const truckX = mt3 * p0[0] + 3 * mt2 * t * p1[0] + 3 * mt * t2 * p2[0] + t3 * p3[0];
  const truckY = mt3 * p0[1] + 3 * mt2 * t * p1[1] + 3 * mt * t2 * p2[1] + t3 * p3[1];

  // Bezier Tangent (derivative) B'(t) to compute the exact steering angle
  const dx = 3 * mt2 * (p1[0] - p0[0]) + 6 * mt * t * (p2[0] - p1[0]) + 3 * t2 * (p3[0] - p2[0]);
  const dy = 3 * mt2 * (p1[1] - p0[1]) + 6 * mt * t * (p2[1] - p1[1]) + 3 * t2 * (p3[1] - p2[1]);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

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
        {/* Map Simulation Container */}
        <div className="xl:col-span-8 bg-card border border-border rounded-[32px] aspect-[8/5] w-full min-h-[350px] max-h-[600px] relative overflow-hidden shadow-2xl group transition-all duration-500 hover:border-primary/20">
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

          {/* Location Badge */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 max-w-[calc(100%-32px)] z-30">
            <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border border-border px-4 sm:px-6 py-3 sm:py-4 rounded-[20px] shadow-2xl">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner shrink-0">
                  <Navigation size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5 leading-none">Telemetry Origin</p>
                  <p className="text-sm sm:text-base font-black text-secondary dark:text-white truncate tracking-tighter">Sacramento Hub Delta-9</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col space-y-3 z-30">
            <button 
              onClick={() => toast.success("Centering orchestration view on active unit...")}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-4 sm:p-5 rounded-[20px] border border-border text-secondary dark:text-white hover:bg-primary hover:text-white transition-all shadow-2xl group active:scale-95"
            >
              <Navigation size={20} className="group-hover:rotate-45 transition-transform" />
            </button>
            <div className="flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[20px] border border-border shadow-2xl overflow-hidden">
              <button onClick={() => toast.info("Zoom level increased.")} className="p-4 sm:p-5 border-b border-border text-secondary dark:text-white hover:bg-primary hover:text-white text-lg font-black transition-all active:scale-95">+</button>
              <button onClick={() => toast.info("Zoom level decreased.")} className="p-4 sm:p-5 text-secondary dark:text-white hover:bg-primary hover:text-white text-lg font-black transition-all active:scale-95">-</button>
            </div>
          </div>

          {/* Responsive SVG Live Tracking Layer */}
          <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full p-6 sm:p-10 select-none z-10" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="road-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="road-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>

            {/* Glowing road underlay */}
            <path
              d="M 100 400 C 250 150, 550 450, 700 200"
              fill="none"
              stroke="url(#road-glow)"
              strokeWidth="24"
              strokeLinecap="round"
              opacity="0.15"
            />

            {/* Main Road Tarmac */}
            <path
              d="M 100 400 C 250 150, 550 450, 700 200"
              fill="none"
              stroke={theme === 'dark' ? "#1e293b" : "#e2e8f0"}
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Road Inner Black Track */}
            <path
              d="M 100 400 C 250 150, 550 450, 700 200"
              fill="none"
              stroke={theme === 'dark' ? "#0f172a" : "#f1f5f9"}
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Yellow Dash Line */}
            <path
              d="M 100 400 C 250 150, 550 450, 700 200"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="6, 8"
              opacity="0.8"
            />

            {/* Travelled Route Progress Layer */}
            <path
              d="M 100 400 C 250 150, 550 450, 700 200"
              fill="none"
              stroke="url(#road-gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              className="transition-all duration-300"
            />

            {/* Start Node Marker */}
            <g transform="translate(100, 400)">
              <foreignObject x="-30" y="-30" width="60" height="60">
                <div className="flex items-center justify-center w-full h-full">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full border-4 border-slate-100 dark:border-slate-700 shadow-2xl flex items-center justify-center">
                    <MapPin size={16} className="text-slate-400 dark:text-slate-500" />
                  </div>
                </div>
              </foreignObject>
              <foreignObject x="-60" y="20" width="120" height="40">
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Origin</p>
                  <p className="text-[10px] font-bold text-secondary dark:text-slate-400 mt-1 truncate">Sacramento</p>
                </div>
              </foreignObject>
            </g>

            {/* Target Node Marker */}
            <g transform="translate(700, 200)">
              <foreignObject x="-30" y="-35" width="60" height="60">
                <div className="flex items-center justify-center w-full h-full animate-bounce">
                  <div className="w-11 h-11 bg-primary rounded-[16px] border-4 border-white dark:border-slate-900 shadow-2xl flex items-center justify-center">
                    <MapPin size={18} className="text-white" />
                  </div>
                </div>
              </foreignObject>
              {/* Pulse Ring */}
              <circle r="22" fill="none" stroke="#0284c7" strokeWidth="2" className="animate-ping opacity-25" />
              <foreignObject x="-60" y="25" width="120" height="40">
                <div className="text-center">
                  <p className="text-[8px] font-black text-primary uppercase tracking-widest leading-none">Destination</p>
                  <p className="text-[10px] font-bold text-secondary dark:text-white mt-1 truncate">{activeTrip?.destination || 'Seattle Hub'}</p>
                </div>
              </foreignObject>
            </g>

            {/* Dynamically Positioned and Steered Truck */}
            <g transform={`translate(${truckX}, ${truckY})`}>
              {/* Tooltip Label (Non-rotating) */}
              <foreignObject x="-100" y="-85" width="200" height="50">
                <div className="flex justify-center">
                  <div className="bg-secondary/95 dark:bg-slate-950/95 backdrop-blur-2xl px-4 py-2 rounded-xl text-[9px] font-black text-white border border-white/10 shadow-2xl uppercase tracking-[0.2em] whitespace-nowrap">
                    NODE-{activeTrip?.id || 'MF-7721'} • {Math.round(progress)}%
                  </div>
                </div>
              </foreignObject>

              {/* Truck Icon (Steers along direction tangent) */}
              <g transform={`rotate(${angle})`}>
                <foreignObject x="-30" y="-30" width="60" height="60">
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="bg-primary p-4 rounded-[20px] shadow-[0_10px_35px_rgba(3,105,161,0.6)] relative border-2 border-white dark:border-slate-800">
                      <Truck size={18} className="text-white" />
                      <div className="absolute inset-0 rounded-[20px] bg-primary animate-ping opacity-30" />
                    </div>
                  </div>
                </foreignObject>
              </g>
            </g>
          </svg>
        </div>

        {/* Info Panel */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-card border border-border p-8 lg:p-10 rounded-[32px] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
               <Zap size={120} />
            </div>
            <h3 className="text-2xl font-black text-secondary dark:text-white mb-8 tracking-tighter relative z-10">Asset Intelligence</h3>
            <div className="space-y-8 relative z-10">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/5 shadow-inner shrink-0">
                  <User size={28} />
                </div>
                <div>
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1 leading-none">Assigned Operator</p>
                  <p className="text-secondary dark:text-white font-black text-lg tracking-tighter leading-none">{activeTrip?.driver || 'Alex Morgan'}</p>
                  <div className="flex items-center space-x-1.5 mt-2 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                    <Shield size={12} />
                    <span>Integrity Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-white/5 border border-border p-4 sm:p-5 rounded-[20px] group/item hover:border-primary transition-all">
                  <p className="text-slate-400 text-[8px] sm:text-[9px] font-black uppercase tracking-widest mb-2 leading-none">Est. Sync</p>
                  <div className="flex items-center space-x-2 text-secondary dark:text-white">
                    <Clock size={16} className="text-primary" />
                    <span className="text-lg sm:text-xl font-black tracking-tighter leading-none">42m</span>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 border border-border p-4 sm:p-5 rounded-[20px] group/item hover:border-primary transition-all">
                  <p className="text-slate-400 text-[8px] sm:text-[9px] font-black uppercase tracking-widest mb-2 leading-none">Core Temp.</p>
                  <div className="flex items-center space-x-2 text-secondary dark:text-white">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                    <span className="text-lg sm:text-xl font-black tracking-tighter leading-none">4.2°C</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3 leading-none">
                  <span>Protocol Milestone</span>
                  <span className="text-primary">{Math.round(progress)}% Sync</span>
                </div>
                <div className="h-4 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-1 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(3,105,161,0.6)]"
                  />
                </div>
                <div className="mt-3 flex justify-between text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  <span>Origin Node</span>
                  <span>Target Node</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-secondary dark:bg-slate-950 border border-border p-8 lg:p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
              <MessageSquare size={140} />
            </div>
            <div className="relative z-10">
              <h4 className="text-xl font-black mb-2 tracking-tighter uppercase leading-none">Emergency Hub</h4>
              <p className="text-white/40 text-xs mb-8 leading-relaxed font-medium">Direct synchronization with operator or global dispatch orchestration.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleCallOperator}
                  className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border border-white/10 active:scale-95 group/call"
                >
                  <Phone size={14} className="group-hover/call:rotate-12 transition-transform" />
                  <span>Call Operator</span>
                </button>
                <button 
                  onClick={handleMessageOperator}
                  className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 active:scale-95 group/msg"
                >
                  <MessageSquare size={14} className="group-hover/msg:translate-x-0.5 transition-transform" />
                  <span>Secure Msg</span>
                </button>
              </div>
              
              <button 
                onClick={handleFullManifest}
                className="w-full mt-6 flex items-center justify-center space-x-2 text-white/20 hover:text-white py-2 text-[9px] font-black uppercase tracking-widest transition-all"
              >
                <ExternalLink size={14} />
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
