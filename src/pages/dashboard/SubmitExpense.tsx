import React, { useState } from 'react';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { initialExpenses } from '../../data/mockData';
import { Receipt, Camera, DollarSign, Calendar, FileText, Send, Trash2, Edit2, History, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const SubmitExpense: React.FC = () => {
  const [formData, setFormData] = useState({ type: 'Fuel', amount: '', date: new Date().toISOString().split('T')[0], note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expenses, setExpenses] = useState(() => storageService.get(STORAGE_KEYS.EXPENSES, initialExpenses));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error('INVALID AMOUNT DETECTED');
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 600));
    
    const newExpense = {
      ...formData,
      status: 'Pending',
      id: `EXP-${Date.now()}`
    };
    
    storageService.addItem(STORAGE_KEYS.EXPENSES, newExpense);
    setExpenses([newExpense, ...expenses]);
    
    toast.success('EXPENSE LOG SYNCHRONIZED');
    setFormData({ type: 'Fuel', amount: '', date: new Date().toISOString().split('T')[0], note: '' });
    setIsSubmitting(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('TERMINATE LOG ENTRY?')) {
      storageService.deleteItem(STORAGE_KEYS.EXPENSES, id);
      setExpenses(expenses.filter((e: any) => e.id !== id));
      toast.success('LOG PURGED');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-3xl lg:text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none mb-3">Expense Audit</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">Synchronize operational costs // Field telemetry</p>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 border border-border p-4 flex items-center space-x-4">
          <div className="p-2.5 bg-primary text-white">
            <Receipt size={18} />
          </div>
          <div>
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Available Budget</p>
             <p className="text-lg font-black text-secondary dark:text-white leading-none tracking-tight">$2,450.00</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Submission Form */}
        <div className="lg:col-span-5">
           <div className="bg-card border border-border p-8 sm:p-10 relative group">
              <h3 className="text-xl font-black text-secondary dark:text-white tracking-tighter uppercase mb-8 border-b border-border pb-4">Initialize Log</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 block">Cost Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Fuel', 'Maintenance', 'Parking', 'Toll'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type })}
                        className={`py-3.5 border font-black text-[10px] uppercase tracking-widest transition-all ${
                          formData.type === type 
                            ? 'bg-primary border-primary text-white' 
                            : 'bg-slate-50 dark:bg-white/5 border-border text-slate-400 hover:border-primary'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Amount ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        required
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-10 text-xs font-black uppercase tracking-widest text-secondary dark:text-white outline-none focus:border-primary transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Log Date</label>
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 text-[11px] font-black uppercase tracking-widest text-secondary dark:text-white outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Physical Audit</label>
                  <div className="border border-dashed border-border p-8 text-center hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group/upload">
                    <Camera className="text-slate-400 group-hover/upload:text-primary mx-auto mb-3" size={24} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scan Receipt Data</p>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Audit Note</label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 text-xs font-bold text-secondary dark:text-white outline-none focus:border-primary transition-all min-h-[100px]"
                    placeholder="ENTER LOCATION/SPECIFICS..."
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 font-black text-xs uppercase tracking-widest transition-all active:translate-y-[1px] disabled:opacity-50 flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? <span className="animate-pulse">SYNCHRONIZING...</span> : (
                    <>
                      <span>Submit to Audit Hub</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
           </div>
        </div>

        {/* History */}
        <div className="lg:col-span-7 space-y-6">
           <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center space-x-3">
                 <History size={18} className="text-primary" />
                 <h3 className="text-lg font-black text-secondary dark:text-white tracking-tighter uppercase">Audit Stream</h3>
              </div>
              <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-primary">Manifest Archive</button>
           </div>

           <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {expenses.map((expense: any, i: number) => (
                  <motion.div
                    key={expense.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border p-6 group flex items-center justify-between gap-6 hover:border-primary transition-all"
                  >
                    <div className="flex items-center space-x-5 min-w-0">
                      <div className="p-3.5 bg-slate-50 dark:bg-white/5 border border-border text-slate-400 group-hover:text-primary transition-colors">
                         <Receipt size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                           <p className="text-sm font-black text-secondary dark:text-white uppercase tracking-tight truncate">{expense.type}</p>
                           <span className={`px-2 py-0.5 border text-[7px] font-black uppercase tracking-widest ${
                             expense.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-primary/10 text-primary border-primary/20'
                           }`}>
                             {expense.status || 'Pending'}
                           </span>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Calendar size={10} /> {expense.date} • {expense.note || 'NO DATA'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                          <p className="text-xl font-black text-secondary dark:text-white tracking-tighter">${Number(expense.amount).toLocaleString()}</p>
                       </div>
                       <div className="flex gap-2">
                          <button 
                            onClick={() => handleDelete(expense.id)}
                            className="p-2 text-slate-400 hover:text-red-500 border border-transparent hover:border-red-500/20 transition-all"
                          >
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {expenses.length === 0 && (
                <div className="bg-card border border-border border-dashed p-16 text-center">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Zero Log Data Detected</h3>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitExpense;
