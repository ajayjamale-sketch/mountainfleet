import React, { useState, useEffect } from 'react';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { initialTrips } from '../../data/mockData';
import { Navigation, Play, CheckCircle, Map as MapIcon, Clock, AlertTriangle, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const MyTrips: React.FC = () => {
  const [trips, setTrips] = useState<Record<string, unknown>[]>([]);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const data = storageService.get(STORAGE_KEYS.TRIPS, initialTrips);
    setTrips(data);
  }, []);

  const handleStatusUpdate = (id: string, newStatus: string) => {
    const updated = trips.map(t => t.id === id ? { ...t, status: newStatus } : t);
    setTrips(updated);
    storageService.set(STORAGE_KEYS.TRIPS, updated);
    toast.success(`System synchronized: Status updated to ${newStatus}`);
  };

  const handleLiveRoute = (tripId: string) => {
    toast.success(`Redirecting to Live Orchestration for Node ${tripId}`);
    setTimeout(() => {
      navigate('/dashboard/track');
    }, 1000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-10">
        <div>
          <h1 className="text-5xl font-black text-secondary dark:text-white tracking-tighter leading-none mb-4">Route Assignment</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Execute and synchronize your active operational paths within the network.</p>
        </div>
        <div className="flex items-center space-x-3 bg-slate-50 dark:bg-white/5 p-2 rounded-2xl border border-border">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
             <Zap size={20} />
          </div>
          <div className="pr-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Priority</p>
             <p className="text-sm font-black text-secondary dark:text-white leading-none mt-1 uppercase">High Performance</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {trips.length > 0 ? trips.map((trip, idx) => (
          <motion.div 
            key={trip.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-[48px] sm:rounded-[64px] overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary transition-all group"
          >
            <div className="p-8 sm:p-12 border-b border-border flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
              <div className="flex items-center space-x-6 sm:space-x-8">
                <div className="p-6 bg-primary/10 rounded-[32px] text-primary group-hover:scale-110 group-hover:rotate-6 transition-all shadow-inner">
                  <Navigation size={40} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border ${
                      trip.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      trip.status === 'In Transit' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-border'
                    }`}>
                      {trip.status}
                    </span>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest px-3 border-l border-border">{trip.id}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-secondary dark:text-white tracking-tighter leading-tight">{trip.route}</h3>
                  <p className="text-slate-500 font-bold mt-2 uppercase text-xs tracking-widest">{trip.vehicle} • Orchestration Active</p>
                </div>
              </div>
              <div className="w-full xl:w-auto flex items-center space-x-3">
                 <button 
                  onClick={() => handleLiveRoute(trip.id)}
                  className="flex-grow xl:flex-grow-0 p-5 bg-slate-50 dark:bg-white/5 text-secondary dark:text-white rounded-2xl hover:bg-primary hover:text-white transition-all group/btn active:scale-95 border border-border shadow-sm"
                  title="View Route Map"
                 >
                    <MapIcon size={24} className="group-hover/btn:scale-110 transition-transform" />
                 </button>
                 <button 
                  onClick={() => toast.info('Time optimization protocol synchronized.')}
                  className="flex-grow xl:flex-grow-0 p-5 bg-slate-50 dark:bg-white/5 text-secondary dark:text-white rounded-2xl hover:bg-primary hover:text-white transition-all group/btn active:scale-95 border border-border shadow-sm"
                  title="Route Timer"
                 >
                    <Clock size={24} className="group-hover/btn:scale-110 transition-transform" />
                 </button>
              </div>
            </div>

            <div className="p-8 sm:p-12 bg-slate-50/50 dark:bg-white/5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-12">
                <div className="flex items-center space-x-5 group/stat">
                  <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-[22px] shadow-sm flex items-center justify-center text-slate-400 group-hover/stat:text-primary transition-colors border border-border">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Est. Arrival</p>
                    <p className="text-secondary dark:text-white font-black text-lg tracking-tight">02:45 PM • <span className="text-primary">1h 45m</span></p>
                  </div>
                </div>
                <div className="flex items-center space-x-5 group/stat">
                  <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-[22px] shadow-sm flex items-center justify-center text-slate-400 group-hover/stat:text-primary transition-colors border border-border">
                    <MapIcon size={24} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Distance</p>
                    <p className="text-secondary dark:text-white font-black text-lg tracking-tight">124.8 KM • <span className="text-slate-400">Target Range</span></p>
                  </div>
                </div>
                <div className="flex items-center space-x-5 group/stat sm:col-span-2 lg:col-span-1">
                  <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-[22px] shadow-sm flex items-center justify-center text-accent group-hover/stat:scale-110 transition-transform border border-border">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Alerts</p>
                    <p className="text-accent font-black text-lg tracking-tight">Low Fuel Protocol Sync</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {trip.status === 'Pending' && (
                  <button 
                    onClick={() => handleStatusUpdate(trip.id, 'In Transit')}
                    className="flex-grow flex items-center justify-center space-x-4 bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-[28px] font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-2xl shadow-primary/30 group/action"
                  >
                    <Play size={22} fill="currentColor" className="group-hover/action:scale-110 transition-transform" />
                    <span>Initialize Trip</span>
                  </button>
                )}
                {trip.status === 'In Transit' && (
                  <button 
                    onClick={() => handleStatusUpdate(trip.id, 'Completed')}
                    className="flex-grow flex items-center justify-center space-x-4 bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-[28px] font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-2xl shadow-emerald-600/30 group/action"
                  >
                    <CheckCircle size={22} className="group-hover/action:scale-110 transition-transform" />
                    <span>Synchronize Completion</span>
                  </button>
                )}
                <button 
                  onClick={() => handleLiveRoute(trip.id)}
                  className="flex-grow flex items-center justify-center space-x-4 bg-white dark:bg-slate-900 border border-border hover:bg-slate-50 dark:hover:bg-white/10 text-secondary dark:text-white px-12 py-6 rounded-[28px] font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-sm group/action"
                >
                  <Navigation size={22} className="group-hover/action:translate-x-1 group-hover/action:-translate-y-1 transition-transform" />
                  <span>Execute Live Route</span>
                </button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="bg-card border-2 border-border border-dashed rounded-[64px] p-24 text-center group">
            <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-[40px] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform">
               <Navigation size={48} className="text-slate-200 dark:text-white/10" />
            </div>
            <h3 className="text-3xl font-black text-secondary dark:text-white mb-4 tracking-tighter">Zero Active Assignments</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-md mx-auto">You are currently unassigned from the operational network. New paths will be synchronized soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
