import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Ship, ArrowRight, Github, Chrome, ChevronLeft, User, Shield, Truck, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Access Granted. Synchronizing Dashboard...');
        navigate('/dashboard');
      } else {
        toast.error('Authentication Failed. Please verify credentials.');
      }
    } catch (error) {
      toast.error('System error during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const autoFill = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('password');
    toast.success(`${roleEmail.split('@')[0]} credentials applied`, { icon: '🔑' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Hero / Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary dark:bg-slate-950 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/60" />
        
        <div className="relative z-10 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 mb-12"
          >
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30">
              <Ship className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase">MountainFleet</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-white tracking-tighter leading-none mb-8"
          >
            GLOBAL <br /> <span className="text-primary">LOGISTICS</span> <br /> OPERATING SYSTEM.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg font-medium leading-relaxed"
          >
            Secure, high-fidelity orchestration for the world's most complex supply chains.
          </motion.p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-grow flex items-center justify-center p-8 lg:p-24 relative">
        <Link to="/" className="absolute top-10 left-10 flex items-center space-x-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest">
          <ChevronLeft size={18} />
          <span>Back to Hub</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-black text-secondary dark:text-white tracking-tighter mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Please enter your credentials to synchronize.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 block">Access Node (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-secondary dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 block">Security Protocol (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-secondary dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold px-2">
              <label className="flex items-center space-x-2 text-slate-500 cursor-pointer hover:text-secondary dark:hover:text-white transition-colors">
                <input type="checkbox" className="rounded-md border-border text-primary focus:ring-primary" />
                <span>Remember Protocol</span>
              </label>
              <button type="button" className="text-primary hover:underline">Reset Identity</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-3 group"
            >
              <span>{isLoading ? 'Synchronizing...' : 'Establish Connection'}</span>
              {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Quick Access Roles */}
          <div className="mt-12">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <span className="relative z-10 bg-background px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Access Protcols</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => autoFill('admin@mountainfleet.com')}
                className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-white/5 border border-border rounded-2xl hover:border-primary transition-all group text-left"
              >
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield size={18} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Admin</p>
                   <p className="text-xs font-bold text-secondary dark:text-white">Full Ops</p>
                </div>
              </button>
              <button 
                onClick={() => autoFill('manager@mountainfleet.com')}
                className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-white/5 border border-border rounded-2xl hover:border-primary transition-all group text-left"
              >
                <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase size={18} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Manager</p>
                   <p className="text-xs font-bold text-secondary dark:text-white">Fleet Ctrl</p>
                </div>
              </button>
              <button 
                onClick={() => autoFill('driver@mountainfleet.com')}
                className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-white/5 border border-border rounded-2xl hover:border-primary transition-all group text-left"
              >
                <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Truck size={18} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Driver</p>
                   <p className="text-xs font-bold text-secondary dark:text-white">Navigation</p>
                </div>
              </button>
              <button 
                onClick={() => autoFill('customer@mountainfleet.com')}
                className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-white/5 border border-border rounded-2xl hover:border-primary transition-all group text-left"
              >
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User size={18} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Customer</p>
                   <p className="text-xs font-bold text-secondary dark:text-white">Bookings</p>
                </div>
              </button>
            </div>
          </div>

          <p className="mt-12 text-center text-sm font-bold text-slate-500">
            New to the network? <Link to="/register" className="text-primary hover:underline">Register Identity</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
