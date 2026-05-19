import React, { useMemo, useState } from "react";
import { CreditCard, Download, ReceiptText, Wallet, ShieldCheck, Zap, RefreshCw, XCircle } from "lucide-react";
import { getPlatformSnapshot } from "../../lib/platformData";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const FinancePage: React.FC = () => {
  const snapshot = useMemo(() => getPlatformSnapshot(), []);
  const [autoRenew, setAutoRenew] = useState(true);

  const handleDownloadInvoice = (id: string) => {
    toast.success(`GENERATING INVOICE: ${id} // DOWNLOADING PDF`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <h1 className="text-3xl lg:text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none">
              Billing & Subscriptions
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
            Manage your MountainFleet enterprise plan and payment history.
          </p>
        </div>
        
        <button 
          onClick={() => handleDownloadInvoice('ALL_STATEMENT')}
          className="bg-card border border-border text-secondary dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 px-6 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center space-x-3 active:scale-[0.98]"
        >
          <Download size={16} />
          <span>Download Statement</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Subscription & Methods */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Plan Card */}
          <div className="bg-secondary dark:bg-slate-900 border border-border rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
              <ShieldCheck size={200} />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Subscription
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">Professional Plan</h2>
                  <p className="text-slate-400 font-medium">Billed annually • Next charge on May 25, 2027</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-5xl font-black text-white tracking-tighter">$1,428</p>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">/ Year (Saved 20%)</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => toast.success('UPGRADE PROTOCOL INITIATED // CONTACTING SALES')}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Zap size={14} /> Upgrade to Enterprise
                </button>
                <button 
                  onClick={() => toast('Downgrade requested. A support ticket has been opened.', { icon: 'ℹ️' })}
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  Change Plan
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method & Settings */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} className="text-primary" />
                  <h3 className="text-sm font-black text-secondary dark:text-white uppercase tracking-tight">Payment Method</h3>
                </div>
                <button onClick={() => toast.success('PAYMENT PORTAL OPENED')} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Edit</button>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-border rounded-2xl p-5">
                <div className="w-12 h-8 bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center font-black text-secondary dark:text-white text-xs italic tracking-tighter">VISA</div>
                <div>
                  <p className="text-sm font-black text-secondary dark:text-white font-mono tracking-widest">•••• •••• •••• 4242</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Expires 12/28</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                <Wallet size={18} className="text-primary" />
                <h3 className="text-sm font-black text-secondary dark:text-white uppercase tracking-tight">Billing Settings</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-secondary dark:text-white uppercase tracking-tight">Auto-Renew Subscription</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Avoid service interruption</p>
                  </div>
                  <button 
                    onClick={() => {
                      setAutoRenew(!autoRenew);
                      toast.success(`AUTO-RENEW ${!autoRenew ? 'ENABLED' : 'DISABLED'}`);
                    }}
                    className={`relative w-12 h-6 rounded-full transition-colors p-1 ${autoRenew ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}
                  >
                    <motion.div 
                      animate={{ x: autoRenew ? 24 : 0 }}
                      className={`w-4 h-4 rounded-full shadow-sm ${autoRenew ? 'bg-white' : 'bg-white dark:bg-slate-500'}`}
                    />
                  </button>
                </div>
                
                <button 
                  onClick={() => toast.error('CANCEL PROTOCOL INITIATED // ARE YOU SURE?')}
                  className="flex items-center gap-2 text-[10px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest transition-colors"
                >
                  <XCircle size={14} /> Cancel Subscription
                </button>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column: Invoices & History */}
        <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-4 shrink-0">
            <ReceiptText size={18} className="text-primary" />
            <h3 className="text-sm font-black text-secondary dark:text-white uppercase tracking-tight">Invoice History</h3>
          </div>

          <div className="flex-grow overflow-y-auto space-y-3 styled-scrollbar pr-2">
            {[
              { id: "INV-2026-05", date: "May 25, 2026", amount: "$1,428.00", status: "Paid" },
              { id: "INV-2025-05", date: "May 25, 2025", amount: "$1,428.00", status: "Paid" },
              { id: "INV-2024-05", date: "May 25, 2024", amount: "$490.00", status: "Paid", note: "Starter Plan" },
            ].map((invoice) => (
              <div key={invoice.id} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <div>
                  <p className="text-xs font-black text-secondary dark:text-white uppercase tracking-tight">{invoice.date}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] font-mono font-bold text-slate-500">{invoice.id}</p>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500">
                      {invoice.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-black text-secondary dark:text-white">{invoice.amount}</p>
                  <button 
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Download PDF"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border mt-6 shrink-0">
            <p className="text-[10px] font-medium text-slate-500 text-center leading-relaxed">
              If you have questions about your billing cycle or need to update tax information, please contact <a href="#" className="text-primary hover:underline font-bold">finance@mountainfleet.com</a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FinancePage;
