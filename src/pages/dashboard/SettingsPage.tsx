import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bell, Shield, Palette, Globe, Mail, Lock, Moon, Sun, 
  Smartphone, Save, Trash2, Camera, LogOut, ChevronRight, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Identity Profile', icon: User },
    { id: 'notifications', label: 'Alert Protocols', icon: Bell },
    { id: 'security', label: 'Security Node', icon: Shield },
    { id: 'appearance', label: 'Interface Sync', icon: Palette },
  ];

  const handleSave = () => {
    toast.success('SYSTEM PARAMETERS SYNCHRONIZED');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-3xl lg:text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none mb-3">Core Preferences</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">Orchestrate identity // Security nodes // Interface parameters</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 font-bold text-[10px] uppercase tracking-widest transition-all active:translate-y-[1px] flex items-center justify-center space-x-3 shadow-lg shadow-primary/20"
        >
          <Save size={16} />
          <span>Synchronize Parameters</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-6 py-4 font-black text-[10px] uppercase tracking-widest transition-all group border-l-2 ${
                activeTab === tab.id 
                  ? 'bg-primary text-white border-primary' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 border-transparent'
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
              className="w-full flex items-center space-x-4 px-6 py-4 font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all group"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Terminate Session</span>
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-9">
          <div className="bg-card border border-border shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-10 text-primary/5 pointer-events-none group-hover:scale-150 transition-transform duration-1000">
               <Zap size={140} />
            </div>
            
            <div className="p-8 lg:p-12 relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                    <div className="flex flex-col sm:flex-row items-center gap-10 pb-10 border-b border-border">
                      <div className="relative group/avatar">
                        <div className="w-24 h-24 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover/avatar:bg-primary group-hover/avatar:text-white transition-all">
                          <User size={40} />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-accent text-white border border-accent/20 shadow-xl shadow-accent/20">
                          <Camera size={14} />
                        </button>
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-3xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none mb-3">{user?.name}</h3>
                        <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
                           <span className="bg-primary/5 text-primary border border-primary/10 px-3 py-1 text-[8px] font-black uppercase tracking-widest">{user?.role}</span>
                           <span className="text-slate-400 text-[8px] font-black uppercase tracking-widest">Node: {user?.id.slice(0, 8)}</span>
                        </div>
                        <button className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline">Update Security Matrix</button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Identity Identifier</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="text" defaultValue={user?.name} className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-10 text-xs font-black uppercase tracking-widest text-secondary dark:text-white outline-none focus:border-primary transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Comm. Protocol</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="email" defaultValue={user?.email} className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-10 text-[11px] font-bold text-secondary dark:text-white outline-none focus:border-primary transition-all" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Operational Mission</label>
                        <textarea rows={4} className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 text-xs font-bold text-secondary dark:text-white outline-none focus:border-primary transition-all resize-none" placeholder="ENTER MISSION PARAMETERS..." />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                    <div className="mb-8">
                       <h3 className="text-xl font-black text-secondary dark:text-white tracking-tighter uppercase border-b border-border pb-4">Alert Protocols</h3>
                    </div>
                    {[
                      { title: 'Payload Updates', desc: 'Real-time synchronization for active shipments.', active: true },
                      { title: 'Integrity Alerts', desc: 'Security notifications regarding account access.', active: true },
                      { title: 'Network Intelligence', desc: 'Strategic updates and fleet enhancements.', active: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/5 border border-border group hover:border-primary transition-all">
                        <div className="max-w-[70%]">
                          <p className="text-sm font-black text-secondary dark:text-white uppercase tracking-tight mb-1">{item.title}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.desc}</p>
                        </div>
                        <div className={`w-12 h-6 relative cursor-pointer transition-all duration-300 ${item.active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white transition-all duration-300 ${item.active ? 'left-7' : 'left-1'}`} />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'appearance' && (
                  <motion.div key="appearance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                    <div className="mb-8">
                       <h3 className="text-xl font-black text-secondary dark:text-white tracking-tighter uppercase border-b border-border pb-4">Interface Sync</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <button 
                        onClick={() => theme === 'dark' && toggleTheme()}
                        className={`p-10 border transition-all flex flex-col items-center group relative ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border bg-slate-50'}`}
                      >
                        <div className={`p-4 mb-4 transition-all ${theme === 'light' ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-border'}`}>
                          <Sun size={32} />
                        </div>
                        <p className={`font-black uppercase tracking-[0.2em] text-[10px] ${theme === 'light' ? 'text-primary' : 'text-slate-500'}`}>Light Protocol</p>
                        {theme === 'light' && <div className="absolute top-3 right-3 w-2 h-2 bg-primary animate-pulse" />}
                      </button>
                      <button 
                        onClick={() => theme === 'light' && toggleTheme()}
                        className={`p-10 border transition-all flex flex-col items-center group relative ${theme === 'dark' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-border dark:bg-white/5'}`}
                      >
                        <div className={`p-4 mb-4 transition-all ${theme === 'dark' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-400 border border-border'}`}>
                          <Moon size={32} />
                        </div>
                        <p className={`font-black uppercase tracking-[0.2em] text-[10px] ${theme === 'dark' ? 'text-primary' : 'text-slate-500'}`}>Dark Protocol</p>
                        {theme === 'dark' && <div className="absolute top-3 right-3 w-2 h-2 bg-primary animate-pulse" />}
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                    <div className="mb-8">
                       <h3 className="text-xl font-black text-secondary dark:text-white tracking-tighter uppercase border-b border-border pb-4">Security Node</h3>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Access Key</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-10 text-xs font-black uppercase tracking-widest text-secondary dark:text-white outline-none focus:border-primary transition-all" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">New Protocol</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-10 text-xs font-black uppercase tracking-widest text-secondary dark:text-white outline-none focus:border-primary transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1.5 block">Confirm Protocol</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border border-border p-4 pl-10 text-xs font-black uppercase tracking-widest text-secondary dark:text-white outline-none focus:border-primary transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-border mt-10">
                      <div className="bg-red-500/5 border border-red-500/10 p-8 relative overflow-hidden group">
                         <h4 className="text-lg font-black text-red-500 tracking-tighter uppercase mb-2 relative z-10">Termination Node</h4>
                         <p className="text-slate-500 text-[10px] mb-8 font-bold uppercase tracking-widest leading-relaxed relative z-10 max-w-sm">Permanently dissolve identity and purge associated datasets. Irreversible protocol.</p>
                         <button className="relative z-10 bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 font-black text-[9px] uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 active:translate-y-[1px]">
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
