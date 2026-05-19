import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Ship, ArrowRight, Github, Chrome, ChevronLeft, Building2, Shield, Truck, Briefcase } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<UserRole>('Customer');
  const [isLoading, setIsLoading] = React.useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await register(name, email, password, role);
      if (success) {
        toast.success('Identity Registered. Welcome to MountainFleet!');
        navigate('/dashboard');
      } else {
        toast.error('Registration failed. Identity already exists.');
      }
    } catch (error) {
      toast.error('System error during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles: { id: UserRole; name: string; icon: Record<string, unknown>; color: string }[] = [
    { id: 'Admin', name: 'Admin', icon: Shield, color: 'text-primary' },
    { id: 'Fleet Manager', name: 'Manager', icon: Briefcase, color: 'text-blue-500' },
    { id: 'Driver', name: 'Driver', icon: Truck, color: 'text-amber-500' },
    { id: 'Customer', name: 'Customer', icon: User, color: 'text-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex-grow flex items-center justify-center p-8 lg:p-24 relative overflow-y-auto scrollbar-hide">
        <Link to="/" className="absolute top-10 left-10 flex items-center space-x-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest">
          <ChevronLeft size={18} />
          <span>Back to Hub</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl py-12"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-black text-secondary dark:text-white tracking-tighter mb-2">Register Identity</h2>
            <p className="text-slate-500 font-medium">Initialize your operational node in the network.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 block">Identity Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-secondary dark:text-white"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 block">Business Email</label>
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

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 block">Operational Protocol Selection</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all group ${
                      role === r.id 
                        ? 'bg-primary/5 border-primary shadow-lg shadow-primary/10' 
                        : 'bg-slate-50 dark:bg-white/5 border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${r.color}`}>
                       <r.icon size={24} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${role === r.id ? 'text-primary' : 'text-slate-400'}`}>{r.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-4 group"
            >
              <span>{isLoading ? 'Initializing...' : 'Join Orchestration Network'}</span>
              {!isLoading && <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-12 text-center text-sm font-bold text-slate-500">
            Already in the network? <Link to="/login" className="text-primary hover:underline">Establish Connection</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Hero / Branding */}
      <div className="hidden lg:flex lg:w-1/3 bg-secondary dark:bg-slate-950 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/60" />
        
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-primary/20 backdrop-blur-xl rounded-[32px] flex items-center justify-center text-primary mx-auto mb-10 shadow-2xl ring-8 ring-white/5">
             <Building2 size={40} />
          </div>
          <h3 className="text-3xl font-black text-white tracking-tighter mb-4">Enterprise Grade</h3>
          <p className="text-white/60 font-medium text-sm leading-relaxed">
            Scalable infrastructure designed for the next generation of global trade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
