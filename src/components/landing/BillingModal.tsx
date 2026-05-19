import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
}

export const BillingModal: React.FC<BillingModalProps> = ({ isOpen, onClose, planName, price, billingCycle }) => {
  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>('checkout');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setStep('success');
      toast.success('Subscription activated successfully!');
    }, 2000);
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setStep('checkout');
    }, 300);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={resetAndClose} 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-50 dark:bg-white/5 border-b border-border p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-secondary dark:text-white uppercase tracking-tighter">Secure Checkout</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">MountainFleet Encrypted Connection</p>
              </div>
              <button 
                onClick={resetAndClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-border text-slate-500 hover:text-secondary dark:hover:text-white transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {step === 'checkout' && (
                <div className="space-y-8">
                  {/* Order Summary */}
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                    <div className="flex justify-between items-center border-b border-primary/10 pb-4 mb-4">
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary block mb-1">Selected Plan</span>
                        <span className="text-lg font-bold text-secondary dark:text-white">{planName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-secondary dark:text-white">${price}</span>
                        <span className="text-xs font-medium text-slate-500 block">/{billingCycle === 'yearly' ? 'yr' : 'mo'}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                      <span className="text-secondary dark:text-white">${price}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium mt-2">
                      <span className="text-slate-600 dark:text-slate-400">Taxes</span>
                      <span className="text-secondary dark:text-white">Calculated at checkout</span>
                    </div>
                  </div>

                  {/* Payment Form Simulation */}
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Card Information</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          required
                          placeholder="0000 0000 0000 0000" 
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl py-3.5 pl-12 pr-4 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <input 
                          type="text" 
                          required
                          placeholder="MM/YY" 
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl py-3.5 px-4 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                        <input 
                          type="text" 
                          required
                          placeholder="CVC" 
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl py-3.5 px-4 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-4 mt-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      Subscribe Now
                    </button>
                    
                    <p className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 mt-4">
                      <ShieldCheck size={12} />
                      Secured by MountainFleet 256-bit Encryption
                    </p>
                  </form>
                </div>
              )}

              {step === 'processing' && (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Loader2 size={32} className="text-primary animate-spin" />
                  </div>
                  <h3 className="text-xl font-black text-secondary dark:text-white uppercase tracking-tighter mb-2">Processing Payment</h3>
                  <p className="text-sm text-slate-500 font-medium">Please do not close this window. We are securing your transaction...</p>
                </div>
              )}

              {step === 'success' && (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-secondary dark:text-white uppercase tracking-tighter mb-2">Payment Successful!</h3>
                  <p className="text-sm text-slate-500 font-medium mb-8 max-w-[280px]">Your {planName} subscription is now active. Your dashboard has been upgraded.</p>
                  <button 
                    onClick={resetAndClose}
                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
