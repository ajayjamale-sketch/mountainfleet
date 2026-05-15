import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Send, CheckCircle2, 
  Building2, Users, Globe, Phone, Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function TrialRequest() {
  const [submitted, setSubmitted] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Operational request received. Syncing with HQ.");
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card border border-border p-12 text-center"
        >
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Request Logged</h2>
          <p className="text-slate-500 font-medium mb-8">Your trial activation manifest has been queued. A logistics specialist will contact your node within 4 operational hours.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
            Return to Command Center <ChevronLeft size={14} className="rotate-180" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-primary selection:text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/pricing" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-12">
          <ChevronLeft size={14} /> Back to Pricing
        </Link>

        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">Initialize <span className="text-primary">Trial.</span></h1>
            <p className="text-slate-500 font-medium mb-12">Complete the protocol below to unlock 14 days of full-spectrum fleet orchestration. No financial commitment required.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity Name</label>
                  <input required type="text" placeholder="FULL NAME" className="w-full bg-card border border-border px-4 py-4 text-sm font-bold uppercase tracking-widest focus:border-primary focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Entity Name</label>
                  <input required type="text" placeholder="COMPANY NAME" className="w-full bg-card border border-border px-4 py-4 text-sm font-bold uppercase tracking-widest focus:border-primary focus:outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Operational Email</label>
                <input required type="email" placeholder="CORPORATE EMAIL ADDRESS" className="w-full bg-card border border-border px-4 py-4 text-sm font-bold uppercase tracking-widest focus:border-primary focus:outline-none transition-all" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fleet Scale</label>
                  <select className="w-full bg-card border border-border px-4 py-4 text-sm font-bold uppercase tracking-widest focus:border-primary focus:outline-none transition-all">
                    <option>1-5 VEHICLES</option>
                    <option>6-20 VEHICLES</option>
                    <option>21-100 VEHICLES</option>
                    <option>100+ VEHICLES</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Region</label>
                  <input required type="text" placeholder="NORTH AMERICA / EUROPE / ETC" className="w-full bg-card border border-border px-4 py-4 text-sm font-bold uppercase tracking-widest focus:border-primary focus:outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mission Parameters (Optional)</label>
                <textarea rows={4} placeholder="DESCRIBE YOUR LOGISTICS CHALLENGES" className="w-full bg-card border border-border px-4 py-4 text-sm font-bold uppercase tracking-widest focus:border-primary focus:outline-none transition-all resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-6 font-black uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center gap-4">
                Deploy Trial Protocol <Send size={20} />
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-secondary text-white relative overflow-hidden">
              <div className="absolute inset-0 technical-grid opacity-10" />
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6">Trial Manifest</h3>
                <ul className="space-y-4">
                  {[
                    "Full Dashboard Access",
                    "Unlimited Driver Nodes",
                    "Real-time Telemetry Sync",
                    "24/7 Priority Support Hub"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                      <div className="w-1 h-1 bg-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 border border-border bg-card">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Security Assurance</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed mb-6">Every trial node is protected by AES-256 encryption and isolated in a dedicated sandbox environment during the evaluation period.</p>
              <div className="flex items-center gap-4">
                 <Globe size={16} className="text-slate-400" />
                 <Users size={16} className="text-slate-400" />
                 <Building2 size={16} className="text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
