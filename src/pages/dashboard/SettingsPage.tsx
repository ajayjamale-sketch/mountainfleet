import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bell, Shield, Palette, Globe, Mail, Lock, Moon, Sun, 
  Smartphone, Save, Trash2, Camera, LogOut, ChevronRight, Zap, Info, ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Identity Profile', icon: User },
    { id: 'notifications', label: 'Alert Protocols', icon: Bell },
    { id: 'security', label: 'Security Node', icon: Shield },
    { id: 'appearance', label: 'Interface Sync', icon: Palette },
  ];

  // Profile Identity States
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mission, setMission] = useState('');

  // Security Credentials States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Alert Protocol States
  const [notifs, setNotifs] = useState([
    { id: 1, title: 'Payload Updates', desc: 'Real-time synchronization for active shipments.', active: true },
    { id: 2, title: 'Integrity Alerts', desc: 'Security notifications regarding account access.', active: true },
    { id: 3, title: 'Network Intelligence', desc: 'Strategic updates and fleet enhancements.', active: false },
  ]);

  // Unified validations
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Identity Identifier cannot be left blank.');
      return;
    }
    if (name.trim().length < 3) {
      toast.error('Identity Identifier must be at least 3 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      toast.error('Communication Protocol email is required.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid cryptographic email format.');
      return;
    }

    toast.success('IDENTITY PARAMETERS SYNCHRONIZED');
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error('Current Verification Key is required to verify identity.');
      return;
    }
    if (currentPassword.length < 6) {
      toast.error('Current Verification Key must be at least 6 characters.');
      return;
    }

    if (!newPassword) {
      toast.error('New Password node cannot be left blank.');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New Password must be at least 8 characters for registry compliance.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Security Protocol mismatch. New passwords do not match.');
      return;
    }

    toast.success('ACCESS CREDENTIAL MATRIX RE-SYNCHRONIZED');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('ALERT PROTOCOLS RE-CONFIGURED');
  };

  const toggleNotif = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, active: !n.active } : n));
    toast.success('ALERT PROTOCOL STATE CHANGED');
  };

  const handlePurge = () => {
    const confirm = window.confirm('DANGER: INITIALIZE IDENTITY PURGE? THIS ACTION IS IRREVERSIBLE AND PURGES ALL REGISTRY DATA.');
    if (confirm) {
      toast.loading('PURGING INSTANCE DATASETS...');
      setTimeout(() => {
        toast.dismiss();
        logout();
        toast.error('IDENTITY DISSOLVED');
      }, 2000);
    }
  };

  const SubmitButton = () => (
    <div className="pt-8 border-t border-border mt-8">
      <button 
        type="submit"
        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center space-x-3 shadow-xl shadow-primary/20"
      >
        <Save size={16} />
        <span>Synchronize Parameters</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-3xl lg:text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none mb-3">Core Preferences</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">Orchestrate identity // Security nodes // Interface parameters</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-3 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-6 py-4 font-black text-[10px] uppercase tracking-widest transition-all group border border-border rounded-2xl ${
                activeTab === tab.id 
                  ? 'bg-primary text-white border-primary shadow-xl shadow-primary/10' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 bg-card'
              }`}
            >
              <div className="flex items-center space-x-4">
                <tab.icon size={16} className={activeTab === tab.id ? 'text-white' : 'text-slate-400 group-hover:text-primary transition-colors'} />
                <span>{tab.label}</span>
              </div>
              {activeTab === tab.id && <ChevronRight size={14} className="opacity-50" />}
            </button>
          ))}
          <div className="pt-6 mt-6 border-t border-border">
            <button 
              onClick={() => { logout(); toast.success('CONNECTION TERMINATED'); }}
              className="w-full flex items-center space-x-4 px-6 py-4 font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all group border border-dashed border-red-500/20 rounded-2xl bg-red-500/[0.02]"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Terminate Session</span>
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-9">
          <div className="bg-card border border-border shadow-sm overflow-hidden relative group min-h-[500px] rounded-[32px]">
            <div className="absolute top-0 right-0 p-10 text-primary/5 pointer-events-none group-hover:scale-150 transition-transform duration-1000">
               <Zap size={140} />
            </div>
            
            <div className="p-8 lg:p-12 relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <form onSubmit={handleSaveProfile} className="space-y-8">
                      <div className="flex flex-col sm:flex-row items-center gap-10 pb-8 border-b border-border">
                        <div className="relative group/avatar">
                          <div className="w-24 h-24 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover/avatar:bg-primary group-hover/avatar:text-white transition-all rounded-[24px]">
                            <User size={40} />
                          </div>
                          <button 
                            type="button"
                            onClick={() => toast.info('BIOMETRIC SCAN INITIATED...')}
                            className="absolute -bottom-2 -right-2 p-2 bg-accent text-white border border-accent/20 shadow-xl shadow-accent/20 hover:scale-110 transition-transform rounded-[12px]"
                            title="Initiate Biometric Sync"
                          >
                            <Camera size={14} />
                          </button>
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-3xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none mb-3">{user?.name}</h3>
                          <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
                             <span className="bg-primary/5 text-primary border border-primary/10 px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-md">{user?.role}</span>
                             <span className="text-slate-400 text-[8px] font-black uppercase tracking-widest">Node: {user?.id.slice(0, 8)}</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => toast.info('UPDATING SECURITY ENCRYPTION...')}
                            className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline"
                          >
                            Update Security Matrix
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="group">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-primary transition-colors">Identity Identifier</label>
                          <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              required
                              type="text" 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-12 text-xs font-black uppercase tracking-widest text-secondary dark:text-white rounded-[20px] outline-none focus:border-primary transition-all" 
                            />
                          </div>
                        </div>
                        <div className="group">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-primary transition-colors">Comm. Protocol</label>
                          <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              required
                              type="text" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-12 text-[11px] font-bold text-secondary dark:text-white rounded-[20px] outline-none focus:border-primary transition-all" 
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 group">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-primary transition-colors">Operational Mission</label>
                          <textarea 
                            rows={4} 
                            value={mission}
                            onChange={(e) => setMission(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 text-xs font-bold text-secondary dark:text-white rounded-[20px] outline-none focus:border-primary transition-all resize-none" 
                            placeholder="ENTER MISSION PARAMETERS..." 
                          />
                        </div>
                      </div>
                      <SubmitButton />
                    </form>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <form onSubmit={handleSaveNotifications} className="space-y-6">
                      <div className="mb-8">
                         <h3 className="text-xl font-black text-secondary dark:text-white tracking-tighter uppercase border-b border-border pb-4">Alert Protocols</h3>
                      </div>
                      <div className="space-y-4">
                        {notifs.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 border border-border group hover:border-primary transition-all rounded-[24px]">
                            <div className="max-w-[70%]">
                              <p className="text-sm font-black text-secondary dark:text-white uppercase tracking-tight mb-1">{item.title}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.desc}</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => toggleNotif(item.id)}
                              className={`w-12 h-6 relative cursor-pointer transition-all duration-300 rounded-full ${item.active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 bg-white shadow-sm transition-all duration-300 rounded-full ${item.active ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <SubmitButton />
                    </form>
                  </motion.div>
                )}

                {activeTab === 'appearance' && (
                  <motion.div key="appearance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                    <div className="mb-8">
                       <h3 className="text-xl font-black text-secondary dark:text-white tracking-tighter uppercase border-b border-border pb-4">Interface Sync</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <button 
                        type="button"
                        onClick={() => { setTheme('light'); toast.success('LIGHT PROTOCOL SYNCHRONIZED'); }}
                        className={`p-10 border transition-all flex flex-col items-center group relative rounded-[24px] ${theme === 'light' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' : 'border-border bg-slate-50'}`}
                      >
                        <div className={`p-4 mb-4 transition-all rounded-[16px] ${theme === 'light' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-400 border border-border'}`}>
                          <Sun size={32} />
                        </div>
                        <p className={`font-black uppercase tracking-[0.2em] text-[10px] ${theme === 'light' ? 'text-primary' : 'text-slate-500'}`}>Light Protocol</p>
                        {theme === 'light' && <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse" />}
                      </button>
                      <button 
                        type="button"
                        onClick={() => { setTheme('dark'); toast.success('DARK PROTOCOL SYNCHRONIZED'); }}
                        className={`p-10 border transition-all flex flex-col items-center group relative rounded-[24px] ${theme === 'dark' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-border dark:bg-white/5'}`}
                      >
                        <div className={`p-4 mb-4 transition-all rounded-[16px] ${theme === 'dark' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-800 text-slate-400 border border-border'}`}>
                          <Moon size={32} />
                        </div>
                        <p className={`font-black uppercase tracking-[0.2em] text-[10px] ${theme === 'dark' ? 'text-primary' : 'text-slate-500'}`}>Dark Protocol</p>
                        {theme === 'dark' && <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse" />}
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                    <form onSubmit={handleSaveSecurity} className="space-y-8">
                      <div className="mb-4">
                         <h3 className="text-xl font-black text-secondary dark:text-white tracking-tighter uppercase border-b border-border pb-4">Security Node</h3>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="group">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-primary transition-colors">Current Access Key</label>
                          <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              required
                              type="password" 
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              placeholder="••••••••" 
                              className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-12 text-xs font-black tracking-widest text-secondary dark:text-white rounded-[20px] outline-none focus:border-primary transition-all" 
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="group">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-primary transition-colors">New Protocol Key</label>
                            <div className="relative">
                              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                              <input 
                                required
                                type="password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••" 
                                className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-12 text-xs font-black tracking-widest text-secondary dark:text-white rounded-[20px] outline-none focus:border-primary transition-all" 
                              />
                            </div>
                          </div>
                          <div className="group">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-primary transition-colors">Confirm Protocol Key</label>
                            <div className="relative">
                              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                              <input 
                                required
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••" 
                                className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-12 text-xs font-black tracking-widest text-secondary dark:text-white rounded-[20px] outline-none focus:border-primary transition-all" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <SubmitButton />
                    </form>

                    <div className="pt-10 border-t border-border mt-10">
                      <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-[24px] relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-6 text-red-500/5 pointer-events-none group-hover:scale-125 transition-transform duration-700">
                           <ShieldAlert size={120} />
                         </div>
                         <h4 className="text-lg font-black text-red-500 tracking-tighter uppercase mb-2 relative z-10">Termination Node</h4>
                         <p className="text-slate-500 text-[10px] mb-8 font-bold uppercase tracking-widest leading-relaxed relative z-10 max-w-sm">Permanently dissolve identity and purge associated datasets. Irreversible protocol.</p>
                         <button 
                           type="button"
                           onClick={handlePurge}
                           className="relative z-10 bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-[16px] font-black text-[9px] uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 active:translate-y-[1px]"
                         >
                           Initialize Purge
                         </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
