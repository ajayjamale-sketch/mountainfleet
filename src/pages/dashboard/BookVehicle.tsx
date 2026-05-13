import React, { useState } from 'react';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { Search, MapPin, Shield, CheckCircle, Package, Clock, Calendar, ArrowRight, Truck, Info, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const BookVehicle: React.FC = () => {
  const [step, setStep] = useState(1);
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
      desc: 'Perfect for small city deliveries and documents.',
      image: 'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      id: 2, 
      name: 'Prime Heavy Truck', 
      price: 120, 
      capacity: '5000kg', 
      category: 'Heavy',
      desc: 'Robust solution for bulk cargo and long haul.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      id: 3, 
      name: 'Arctic Cold Storage', 
      price: 180, 
      capacity: '2000kg', 
      category: 'Special',
      desc: 'Temperature controlled for perishables and pharma.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600' 
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
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24">
      {/* Premium Stepper Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border pb-10">
        <div>
          <h1 className="text-5xl font-black text-secondary dark:text-white tracking-tighter leading-none mb-4">Initialize Payload</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Orchestrate your next shipment through the MountainFleet premium network.</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-white/5 p-2 rounded-[24px] border border-border shadow-inner">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center space-x-3 px-4 py-2">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${step === s ? 'bg-primary text-white shadow-lg shadow-primary/20' : step > s ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-slate-800 text-slate-400'}`}>
                {step > s ? <CheckCircle size={20} /> : s}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] hidden xl:block ${step === s ? 'text-primary' : 'text-slate-400'}`}>
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-8 bg-card border border-border rounded-[48px] p-10 lg:p-14 space-y-10 shadow-sm">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-4 block group-focus-within:text-primary transition-colors">Origin Node</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-3xl py-5 pl-16 pr-6 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all"
                        placeholder="Warehouse ID or Address"
                        onChange={(e) => setBookingData({ ...bookingData, pickup: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-4 block group-focus-within:text-primary transition-colors">Destination Node</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-accent group-focus-within:text-primary transition-colors" size={20} />
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-3xl py-5 pl-16 pr-6 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all"
                        placeholder="Delivery Target"
                        onChange={(e) => setBookingData({ ...bookingData, destination: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-4 block group-focus-within:text-primary transition-colors">Protocol Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" size={18} />
                        <input type="date" className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-4.5 pl-14 pr-4 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold text-sm transition-all" />
                      </div>
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-4 block group-focus-within:text-primary transition-colors">Sync Time</label>
                      <div className="relative">
                        <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" size={18} />
                        <input type="time" className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-4.5 pl-14 pr-4 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold text-sm transition-all" />
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-4 block group-focus-within:text-primary transition-colors">Estimated Payload (kg)</label>
                    <div className="relative">
                      <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                      <input 
                        type="number" 
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-3xl py-5 pl-16 pr-6 text-secondary dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold transition-all"
                        placeholder="e.g. 5000"
                        onChange={(e) => setBookingData({ ...bookingData, weight: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-3 text-slate-500 bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-2xl border border-border">
                  <Info size={18} className="text-primary" />
                  <p className="text-xs font-bold uppercase tracking-widest">Protocol includes base insurance.</p>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  disabled={!bookingData.pickup || !bookingData.destination}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-3xl font-black text-lg shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-4"
                >
                  <span>Select Network Fleet</span>
                  <ArrowRight size={22} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-secondary dark:bg-slate-900 rounded-[48px] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:scale-150 transition-transform duration-1000">
                   <Shield size={120} />
                </div>
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl text-primary rounded-[32px] shadow-2xl flex items-center justify-center mb-8 ring-8 ring-white/5 relative z-10">
                  <Shield size={40} />
                </div>
                <h4 className="text-2xl font-black text-white mb-4 tracking-tighter relative z-10">Encrypted Logistics</h4>
                <p className="text-white/60 text-sm font-medium leading-relaxed relative z-10">
                  Every payload in our network is synchronized via encrypted GPS and monitored by AI orchestration nodes.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-[48px] p-10 shadow-sm flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Star size={28} />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Priority Network</p>
                 <h5 className="text-xl font-black text-secondary dark:text-white mb-4 tracking-tight">Need Enterprise Scale?</h5>
                 <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 font-medium leading-relaxed">For high-volume orchestration or specialized hardware requirements.</p>
                 <Link to="/contact" className="w-full py-4 bg-background border border-border text-secondary dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Contact Intelligence</Link>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
              {vehicles.map((v) => (
                <div key={v.id} className="bg-card border border-border rounded-[48px] overflow-hidden group hover:border-primary transition-all shadow-sm hover:shadow-2xl flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img src={v.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black text-secondary dark:text-white shadow-2xl uppercase tracking-[0.2em]">
                      {v.capacity}
                    </div>
                    <div className="absolute bottom-8 left-8">
                       <span className="text-[10px] font-black bg-primary text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">{v.category}</span>
                    </div>
                  </div>
                  <div className="p-10 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-2xl font-black text-secondary dark:text-white tracking-tighter mb-4">{v.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-10 leading-relaxed">{v.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-border">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payload Rate</p>
                        <span className="text-4xl font-black text-secondary dark:text-white tracking-tighter">${v.price}<span className="text-sm font-bold text-slate-400">/sync</span></span>
                      </div>
                      <button 
                        onClick={() => handleBook(v)}
                        className="bg-primary hover:bg-primary/90 text-white p-5 rounded-2xl transition-all shadow-2xl shadow-primary/30 active:scale-95 group-hover:scale-110"
                        aria-label="Confirm Vehicle"
                      >
                        <ArrowRight size={28} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setStep(1)}
                className="group flex items-center space-x-3 text-slate-400 hover:text-primary font-black transition-all uppercase tracking-widest text-xs"
              >
                <div className="w-10 h-10 border border-border rounded-xl flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                  <ArrowRight size={18} className="rotate-180" />
                </div>
                <span>Adjust Parameters</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-[64px] p-16 lg:p-32 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-3 bg-emerald-500" />
            <div className="w-28 h-28 bg-emerald-500/10 rounded-[40px] flex items-center justify-center text-emerald-500 mx-auto mb-10 ring-12 ring-emerald-500/5 shadow-inner">
              <CheckCircle size={64} />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-secondary dark:text-white mb-8 tracking-tighter leading-none">Payload Synchronized</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl mb-16 max-w-lg mx-auto leading-relaxed font-medium">
              Your orchestration request for <span className="text-primary font-black">{bookingData.service}</span> has been broadcast. Our network will maintain full visibility of your shipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/dashboard/track"
                className="bg-primary hover:bg-primary/90 text-white px-14 py-6 rounded-3xl font-black text-lg transition-all active:scale-[0.98] shadow-2xl shadow-primary/30 flex items-center justify-center space-x-4"
              >
                <Truck size={24} />
                <span>Track Live Node</span>
              </Link>
              <button 
                onClick={() => setStep(1)}
                className="bg-slate-100 dark:bg-white/5 border border-border text-secondary dark:text-white px-14 py-6 rounded-3xl font-black text-lg transition-all active:scale-[0.98] hover:bg-slate-200 dark:hover:bg-white/10"
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
