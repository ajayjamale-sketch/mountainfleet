import React, { useState } from 'react';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { MapPin, Shield, CheckCircle, Package, Clock, Calendar, ArrowRight, Truck, Info, Star, Battery, Gauge, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const BookVehicle: React.FC = () => {
  const [step, setStep] = useState(1);
  const { theme } = useTheme();
  const [bookingData, setBookingData] = useState({ 
    service: 'Standard Delivery', 
    pickup: '', 
    destination: '', 
    date: '', 
    time: '',
    weight: '',
    vehicleType: 'Prime'
  });

  const vehicles = [
    { 
      id: 1, 
      name: 'Eco Delivery Van', 
      price: 45, 
      capacity: '500kg', 
      category: 'Eco',
      desc: 'Perfect for small city deliveries, swift documents, and high-frequency parcel routing.',
      image: 'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&q=80&w=600',
      specs: { range: '240 mi', power: 'Electric', metric: '100% Bat' }
    },
    { 
      id: 2, 
      name: 'Prime Heavy Truck', 
      price: 120, 
      capacity: '5000kg', 
      category: 'Heavy',
      desc: 'Robust heavy-duty solution optimized for high-volume bulk cargo and long-distance operations.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
      specs: { range: '650 mi', power: 'Clean Diesel', metric: '85% Fuel' }
    },
    { 
      id: 3, 
      name: 'Arctic Cold Storage', 
      price: 180, 
      capacity: '2000kg', 
      category: 'Special',
      desc: 'Advanced temperature-controlled refrigeration unit designed for high-integrity perishables and pharmaceuticals.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600',
      specs: { range: '400 mi', power: 'Refrigerated', metric: '-18°C Stable' }
    },
  ];

  const handleBook = (v: any) => {
    storageService.addItem(STORAGE_KEYS.BOOKINGS, { 
      ...bookingData, 
      service: v.name, 
      amount: v.price, 
      status: 'Pending', 
      createdAt: new Date().toISOString(),
      id: `BK-${Math.floor(Math.random() * 10000)}`
    });
    toast.success('Logistics protocol initiated');
    setStep(3);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-24">
      {/* Premium Stepper Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border pb-8">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-secondary dark:text-white tracking-tighter leading-none mb-4">Initialize Payload</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Orchestrate your next shipment through the MountainFleet premium network.</p>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-white/5 p-2 rounded-[20px] border border-border shadow-inner">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center space-x-2 px-3 py-1.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${step === s ? 'bg-primary text-white shadow-lg shadow-primary/20' : step > s ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-slate-800 text-slate-400'}`}>
                {step > s ? <CheckCircle size={16} /> : s}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] hidden sm:block ${step === s ? 'text-primary' : 'text-slate-400'}`}>
                {s === 1 ? 'Parameters' : s === 2 ? 'Fleet Select' : 'Final Sync'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-8 bg-card border border-border rounded-[32px] p-8 sm:p-10 space-y-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-4 block group-focus-within:text-primary transition-colors">Origin Node</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        value={bookingData.pickup}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-[20px] py-4 pl-14 pr-5 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
                        placeholder="Warehouse ID or Address"
                        onChange={(e) => setBookingData({ ...bookingData, pickup: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-4 block group-focus-within:text-primary transition-colors">Destination Node</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-accent group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        value={bookingData.destination}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-[20px] py-4 pl-14 pr-5 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
                        placeholder="Delivery Target Location"
                        onChange={(e) => setBookingData({ ...bookingData, destination: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-4 block group-focus-within:text-primary transition-colors">Protocol Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" size={16} />
                        <input 
                          type="date" 
                          value={bookingData.date}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-xl py-3.5 pl-11 pr-3 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold text-xs transition-all dark:[color-scheme:dark]"
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-4 block group-focus-within:text-primary transition-colors">Sync Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" size={16} />
                        <input 
                          type="time" 
                          value={bookingData.time}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-xl py-3.5 pl-11 pr-3 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold text-xs transition-all dark:[color-scheme:dark]"
                          onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-4 block group-focus-within:text-primary transition-colors">Estimated Payload (kg)</label>
                    <div className="relative">
                      <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="number" 
                        value={bookingData.weight}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-[20px] py-4 pl-14 pr-5 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
                        placeholder="e.g. 5000"
                        onChange={(e) => setBookingData({ ...bookingData, weight: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2.5 text-slate-500 bg-slate-50 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-border">
                  <Info size={16} className="text-primary shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Protocol includes automated load insurance</p>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  disabled={!bookingData.pickup || !bookingData.destination}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-[20px] font-black text-sm shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-40 flex items-center justify-center space-x-3"
                >
                  <span>Select Network Fleet</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-secondary dark:bg-slate-900 rounded-[32px] p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:scale-150 transition-transform duration-1000">
                   <Shield size={100} />
                </div>
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl text-primary rounded-[20px] shadow-2xl flex items-center justify-center mb-6 ring-4 ring-white/5 relative z-10">
                  <Shield size={32} />
                </div>
                <h4 className="text-xl font-black text-white mb-2 tracking-tighter relative z-10 uppercase">Secure Routing</h4>
                <p className="text-white/60 text-xs font-medium leading-relaxed relative z-10">
                  All payloads inside our ecosystem are monitored via clean telemetry and backed by physical orchestration nodes.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-[32px] p-8 shadow-sm flex flex-col items-center text-center">
                 <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-4">
                    <Star size={24} />
                 </div>
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Priority Network</p>
                 <h5 className="text-lg font-black text-secondary dark:text-white mb-2 tracking-tight">Need Enterprise Scale?</h5>
                 <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 font-medium leading-relaxed">For high-volume containerized orchestration or heavy military-grade routing.</p>
                 <Link to="/contact" className="w-full py-3.5 bg-background border border-border text-secondary dark:text-white rounded-[16px] font-black text-[9px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Contact Logistics Intelligence</Link>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {vehicles.map((v) => (
                <div key={v.id} className="bg-card border border-border rounded-[32px] overflow-hidden group hover:border-primary/50 transition-all shadow-sm hover:shadow-xl flex flex-col">
                  <div className="h-48 sm:h-56 overflow-hidden relative">
                    <img src={v.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={v.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl text-[9px] font-black text-secondary dark:text-white shadow-2xl uppercase tracking-[0.2em]">
                      {v.capacity} Payload
                    </div>
                    <div className="absolute bottom-4 left-4">
                       <span className="text-[8px] font-black bg-primary text-white px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">{v.category}</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-black text-secondary dark:text-white tracking-tighter mb-2">{v.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-6 leading-relaxed">{v.desc}</p>
                      
                      {/* Industrial Spec Badges */}
                      <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border mb-6">
                        <div className="text-center">
                          <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Range</p>
                          <div className="flex items-center justify-center space-x-1 text-secondary dark:text-white font-black text-[10px]">
                            <Gauge size={10} className="text-primary" />
                            <span>{v.specs.range}</span>
                          </div>
                        </div>
                        <div className="text-center border-x border-border">
                          <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Drive</p>
                          <div className="flex items-center justify-center space-x-1 text-secondary dark:text-white font-black text-[10px] truncate">
                            {v.specs.power === 'Electric' ? <Battery size={10} className="text-emerald-500" /> : <Droplet size={10} className="text-amber-500" />}
                            <span>{v.specs.power}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Status</p>
                          <p className="text-[10px] font-black text-emerald-500">{v.specs.metric}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Payload Rate</p>
                        <span className="text-2xl sm:text-3xl font-black text-secondary dark:text-white tracking-tighter">${v.price}<span className="text-xs font-bold text-slate-400">/sync</span></span>
                      </div>
                      <button 
                        onClick={() => handleBook(v)}
                        className="bg-primary hover:bg-primary/90 text-white p-4 rounded-xl transition-all shadow-2xl shadow-primary/30 active:scale-95 group-hover:scale-105"
                        aria-label="Confirm Vehicle"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setStep(1)}
                className="group flex items-center space-x-2 text-slate-400 hover:text-primary font-black transition-all uppercase tracking-widest text-[10px]"
              >
                <div className="w-8 h-8 border border-border rounded-lg flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                  <ArrowRight size={14} className="rotate-180" />
                </div>
                <span>Adjust Parameters</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-[32px] p-10 sm:p-16 lg:p-24 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
            <div className="w-20 h-20 bg-emerald-500/10 rounded-[28px] flex items-center justify-center text-emerald-500 mx-auto mb-8 ring-8 ring-emerald-500/5 shadow-inner">
              <CheckCircle size={44} />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-secondary dark:text-white mb-6 tracking-tighter leading-none">Payload Synchronized</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed font-medium">
              Your orchestration request for <span className="text-primary font-black">{bookingData.service}</span> has been broadcast. Our network will maintain full visibility of your shipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/dashboard/track"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-[20px] font-black text-sm transition-all active:scale-[0.98] shadow-2xl shadow-primary/30 flex items-center justify-center space-x-3"
              >
                <Truck size={18} />
                <span>Track Live Node</span>
              </Link>
              <button 
                onClick={() => setStep(1)}
                className="bg-slate-100 dark:bg-white/5 border border-border text-secondary dark:text-white px-8 py-4 rounded-[20px] font-black text-sm transition-all active:scale-[0.98] hover:bg-slate-200 dark:hover:bg-white/10"
              >
                New Orchestration
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookVehicle;
