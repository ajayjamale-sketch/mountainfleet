import React, { useState, useMemo } from 'react';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { initialBookings } from '../../data/mockData';
import { Search, Filter, Calendar, MapPin, Package, Download, ChevronRight, Clock, CheckCircle2, AlertCircle, User, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MyBookings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  const bookings = useMemo(() => {
    return storageService.get(STORAGE_KEYS.BOOKINGS, initialBookings);
  }, []);

  const filteredBookings = bookings.filter((b: any) => {
    const matchesSearch = b.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.pickup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    if (bookings.length === 0) {
      toast.error("No logistics logs available to export.");
      return;
    }

    // Define CSV headers
    const headers = ['ID', 'Service Name', 'Origin Hub', 'Destination Node', 'Onboarding Date', 'Sync Time', 'Payload Weight (kg)', 'Total Value ($)', 'Status', 'Created At'];
    
    // Map bookings to CSV rows
    const rows = bookings.map((b: any) => [
      b.id || '',
      `"${(b.service || '').replace(/"/g, '""')}"`,
      `"${(b.pickup || '').replace(/"/g, '""')}"`,
      `"${(b.destination || 'Global Hub').replace(/"/g, '""')}"`,
      b.date || '',
      b.time || '',
      b.weight || '',
      b.amount || '',
      b.status || '',
      b.createdAt || ''
    ]);

    // Construct CSV content
    const csvContent = [headers.join(','), ...rows.map((row: any) => row.join(','))].join('\n');
    
    // Create blob and trigger native file download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MountainFleet_Audit_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Logistics manifest audit logs exported successfully as CSV.");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black text-secondary dark:text-white tracking-tighter mb-2">Logistics Intelligence</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Comprehensive audit of your past shipments and live orchestration records.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="w-full lg:w-auto flex items-center justify-center space-x-3 bg-card border border-border text-secondary dark:text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-xl active:scale-95"
        >
          <Download size={20} className="text-primary" />
          <span>Export Audit Logs</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="relative flex-grow group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="Search by logistics service or geographic node..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card border border-border rounded-3xl py-5 pl-16 pr-8 text-secondary dark:text-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold shadow-sm"
          />
        </div>
        <div className="flex flex-wrap gap-3 p-1.5 bg-slate-100 dark:bg-white/5 rounded-[28px] border border-border self-start">
          {['All', 'Confirmed', 'Pending', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-8 py-3.5 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all ${
                statusFilter === status 
                  ? 'bg-primary text-white shadow-2xl shadow-primary/30' 
                  : 'text-slate-500 hover:text-secondary dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBookings.map((booking: any, i: number) => (
            <motion.div
              key={booking.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-[32px] p-8 sm:p-10 hover:border-primary/50 transition-all shadow-sm group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-12 text-primary/5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                  <Package size={200} />
               </div>

              <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-10 relative z-10">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 bg-primary/10 rounded-[20px] flex items-center justify-center text-primary group-hover:rotate-6 transition-all">
                    <Package size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-secondary dark:text-white tracking-tighter">{booking.service}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{booking.id || 'BK-7721'}</span>
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Priority Sync</span>
                    </div>
                  </div>
                </div>
                <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                  booking.status === 'Confirmed' ? 'bg-emerald-500 text-white' : 
                  booking.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-secondary text-white'
                }`}>
                  {booking.status}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mb-10 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 p-2 bg-slate-50 dark:bg-white/5 rounded-xl text-primary">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Origin Hub</p>
                      <p className="text-sm font-bold text-secondary dark:text-white">{booking.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 p-2 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Onboarding Date</p>
                      <p className="text-sm font-bold text-secondary dark:text-white">{booking.date}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 p-2 bg-slate-50 dark:bg-white/5 rounded-xl text-accent">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Destination Node</p>
                      <p className="text-sm font-bold text-secondary dark:text-white">{booking.destination || 'Global Hub'}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 p-2 bg-slate-50 dark:bg-white/5 rounded-xl text-emerald-500">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Payload Value</p>
                      <p className="text-sm font-bold text-secondary dark:text-white">${booking.amount || '1,200.00'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-4 border-card bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                        <User size={14} />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">+2 Active Personnel</span>
                </div>
                <button 
                  onClick={() => navigate('/dashboard/track')}
                  className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-black text-xs shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group/btn"
                >
                  <span>Track Live Payload</span>
                  <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredBookings.length === 0 && (
        <div className="bg-card border border-border border-dashed rounded-[32px] p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <AlertCircle size={40} />
          </div>
          <h3 className="text-2xl font-black text-secondary dark:text-white mb-2">Null Results Detected</h3>
          <p className="text-slate-500 font-medium max-w-sm mx-auto text-sm">No logistics records match your current filter parameters. Initialize a new booking to start tracking.</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
