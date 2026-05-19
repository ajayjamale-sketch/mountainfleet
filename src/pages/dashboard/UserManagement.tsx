import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { initialUsers } from '../../data/mockData';
import { 
  Plus, Search, Edit2, Trash2, X, Filter,
  User as UserIcon, Shield, CheckCircle2, AlertCircle, Mail, ChevronRight,
  MapPin, MessageSquare, Radio, Activity, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface UserLog {
  timestamp: string;
  author: string;
  message: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  logs?: UserLog[];
  coordinates?: { lat: string; lng: string; speed: string; signal: string };
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Customer', status: 'Active' });

  // Telemetry and Communication Drawer States
  const [trackingUser, setTrackingUser] = useState<User | null>(null);
  const [messagingUser, setMessagingUser] = useState<User | null>(null);
  const [newLogMessage, setNewLogMessage] = useState('');

  useEffect(() => {
    const data = storageService.get(STORAGE_KEYS.USERS, initialUsers);
    setUsers(data);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      storageService.updateItem(STORAGE_KEYS.USERS, editingUser.id, formData);
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      toast.success('User protocol updated');
    } else {
      const newUser = storageService.addItem(STORAGE_KEYS.USERS, formData);
      setUsers([...users, newUser as User]);
      toast.success('New user synchronized');
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      storageService.deleteItem(STORAGE_KEYS.USERS, id);
      setUsers(users.filter(u => u.id !== id));
      toast.success('User de-synchronized');
    }
  };

  const openModal = (user: User | null = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'Customer', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // Helper to resolve user logs dynamically
  const getUserLogs = (u: User): UserLog[] => {
    if (u.logs && u.logs.length > 0) return u.logs;
    return [
      { timestamp: '2026-05-16 10:24:12', author: 'SYSTEM_ADMIN', message: 'Identity credential initialized in MountainFleet core registry.' },
      { timestamp: '2026-05-16 14:15:30', author: 'GATEWAY_NODE', message: `Access level permissions configured to role protocol: [${u.role}].` }
    ];
  };

  // Helper to generate coordinates based on user ID hash
  const getUserCoordinates = (u: User) => {
    if (u.coordinates) return u.coordinates;
    const hash = u.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const lat = (39.7392 + (hash % 100) * 0.001).toFixed(4);
    const lng = (-104.9903 - (hash % 80) * 0.001).toFixed(4);
    const speed = hash % 2 === 0 ? `${45 + (hash % 30)} mph` : 'Idle';
    const signal = `${85 + (hash % 15)}% Secure`;
    return { lat, lng, speed, signal };
  };

  // Handle adding log comments permanently to local storage
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messagingUser || !newLogMessage.trim()) return;

    const currentLogs = messagingUser.logs && messagingUser.logs.length > 0
      ? messagingUser.logs
      : getUserLogs(messagingUser);

    const newLog: UserLog = {
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      author: 'SYSTEM_ADMIN',
      message: newLogMessage.trim()
    };

    const updatedUser: User = {
      ...messagingUser,
      logs: [newLog, ...currentLogs]
    };

    const updatedUsers = users.map(u => u.id === messagingUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    storageService.set(STORAGE_KEYS.USERS, updatedUsers);

    setMessagingUser(updatedUser);
    setNewLogMessage('');
    toast.success('Secure log broadcasted and saved');
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-secondary dark:text-white tracking-tighter">Identity Management</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Synchronize and orchestrate access control for the MountainFleet network.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center space-x-3 transition-all active:scale-95 shadow-2xl shadow-primary/30"
        >
          <Plus size={20} />
          <span>Register New Identity</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by identity or business email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card border border-border rounded-3xl py-5 pl-16 pr-6 text-secondary dark:text-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center space-x-3 bg-card border border-border px-8 py-5 rounded-3xl text-slate-500 hover:text-primary font-bold transition-all shadow-sm">
          <Filter size={20} />
          <span>Protocol Filter</span>
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identity Node</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Access Level</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-5">
                      <div className="w-12 h-12 rounded-[18px] bg-primary/10 flex items-center justify-center text-primary font-black shadow-inner">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-secondary dark:text-white leading-tight">{u.name}</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-3 text-secondary dark:text-slate-300">
                      <Shield size={16} className="text-primary" />
                      <span className="text-sm font-bold">{u.role}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      u.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {u.status === 'Active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      <span>{u.status}</span>
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => setTrackingUser(u)} 
                        className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-accent transition-all rounded-xl"
                        title="Live Coordinate Tracking"
                      >
                        <MapPin size={16} />
                      </button>
                      <button 
                        onClick={() => setMessagingUser(u)} 
                        className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-primary transition-all rounded-xl"
                        title="Secure Comm Logs"
                      >
                        <MessageSquare size={16} />
                      </button>
                      <button 
                        onClick={() => openModal(u)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:scale-105 transition-all text-[10px] font-black shadow-lg shadow-primary/20"
                      >
                        <Edit2 size={12} />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:scale-105 transition-all text-[10px] font-black shadow-lg shadow-red-500/20"
                      >
                        <Trash2 size={12} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="grid md:hidden gap-6">
        {filteredUsers.map((u) => (
          <div key={u.id} className="bg-card border border-border p-8 rounded-[32px] shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black">
                   {u.name.charAt(0)}
                </div>
                <div>
                   <p className="text-lg font-black text-secondary dark:text-white leading-none">{u.name}</p>
                   <p className="text-xs text-slate-500 font-medium mt-1">{u.email}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Role</p>
                  <p className="text-sm font-bold text-secondary dark:text-white">{u.role}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    u.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {u.status}
                  </span>
               </div>
            </div>

            {/* Direct Mobile Quick Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-border">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Direct Actions</span>
               <div className="flex space-x-2">
                 <button 
                   onClick={() => setTrackingUser(u)} 
                   className="p-3 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-accent transition-all rounded-xl"
                   title="Live Approach"
                 >
                   <MapPin size={18} />
                 </button>
                 <button 
                   onClick={() => setMessagingUser(u)} 
                   className="p-3 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-primary transition-all rounded-xl"
                   title="Secure Message"
                 >
                   <MessageSquare size={18} />
                 </button>
               </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
               <button onClick={() => openModal(u)} className="flex-grow flex items-center justify-center space-x-2 py-4 bg-primary text-white rounded-2xl font-black text-xs shadow-lg shadow-primary/20">
                  <Edit2 size={16} />
                  <span>Update Profile</span>
               </button>
               <button onClick={() => handleDelete(u.id)} className="flex items-center justify-center p-4 bg-red-500 text-white rounded-2xl shadow-lg shadow-red-500/20">
                  <Trash2 size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-card border border-border border-dashed rounded-[32px] p-24 text-center">
          <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
            <UserIcon size={48} />
          </div>
          <h3 className="text-2xl font-black text-secondary dark:text-white mb-2">Identity Not Found</h3>
          <p className="text-slate-500 font-medium">Verify your search parameters or register a new identity node.</p>
        </div>
      )}

      {/* Identity Registration Modal - Portaled */}
      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-secondary/60 dark:bg-slate-950/80 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} className="relative w-full max-w-xl bg-card border border-border rounded-[32px] p-10 lg:p-14 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black text-secondary dark:text-white tracking-tighter">
                    {editingUser ? 'Synchronize Identity' : 'Initialize New Identity'}
                  </h2>
                  <button onClick={closeModal} className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-400 hover:text-secondary dark:hover:text-white transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-6">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-primary transition-colors">Identity Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-3xl py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-secondary dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-primary transition-colors">Business Email</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-3xl py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-secondary dark:text-white"
                          placeholder="name@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 block">Protocol Role</label>
                        <select 
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-4 px-5 text-secondary dark:text-white outline-none focus:border-primary font-bold transition-all cursor-pointer appearance-none"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Fleet Manager">Fleet Manager</option>
                          <option value="Driver">Driver</option>
                          <option value="Customer">Customer</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 block">System Status</label>
                        <select 
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-4 px-5 text-secondary dark:text-white outline-none focus:border-primary font-bold transition-all cursor-pointer appearance-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-10">
                    <button type="button" onClick={closeModal} className="order-2 sm:order-1 flex-grow py-5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl text-secondary dark:text-white font-black text-sm transition-all uppercase tracking-widest">Cancel</button>
                    <button type="submit" className="order-1 sm:order-2 flex-grow py-5 bg-primary hover:bg-primary/90 rounded-2xl text-white font-black text-sm shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] uppercase tracking-widest">Synchronize</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* 1. REAL-TIME TELEMETRY GEOGRAPHIC RADAR MODAL - Portaled */}
      {createPortal(
        <AnimatePresence>
          {trackingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setTrackingUser(null)} className="absolute inset-0 bg-secondary/60 dark:bg-slate-950/80 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-card border border-border rounded-[32px] p-8 shadow-2xl text-center overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="flex items-center space-x-2 text-[10px] font-black bg-primary/10 text-primary px-4 py-1.5 rounded-full uppercase tracking-widest">
                    <Radio size={12} className="animate-pulse" />
                    <span>Live Tracking Node</span>
                  </span>
                  <button onClick={() => setTrackingUser(null)} className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-border rounded-xl text-slate-400 hover:text-secondary dark:hover:text-white transition-all">
                    <X size={18} />
                  </button>
                </div>

                <div className="py-6 relative flex justify-center">
                  <svg viewBox="0 0 200 200" className="w-48 h-48 text-emerald-500">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                    
                    <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                    <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                    
                    <g transform="translate(140, 70)">
                      <circle cx="0" cy="0" r="8" fill="currentColor">
                        <animate attributeName="r" values="4;12;4" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="fill-opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="0" cy="0" r="4" fill="currentColor" />
                    </g>
                    
                    <g transform="translate(100, 100)">
                      <line x1="0" y1="0" x2="80" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <animateTransform 
                          attributeName="transform" 
                          type="rotate" 
                          from="0" 
                          to="360" 
                          dur="4s" 
                          repeatCount="indefinite" 
                        />
                      </line>
                    </g>
                  </svg>
                </div>

                <div className="space-y-4 text-left">
                  <div className="border-b border-border pb-3">
                    <h3 className="text-xl font-black text-secondary dark:text-white tracking-tight">{trackingUser.name}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Identity UID: {trackingUser.id}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center space-x-1.5">
                        <MapPin size={10} className="text-primary" />
                        <span>Coordinates</span>
                      </p>
                      <p className="text-xs font-black text-secondary dark:text-white truncate">{getUserCoordinates(trackingUser).lat}° N</p>
                      <p className="text-xs font-black text-slate-500 truncate">{getUserCoordinates(trackingUser).lng}° W</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center space-x-1.5">
                        <Activity size={10} className="text-emerald-500" />
                        <span>Velocity</span>
                      </p>
                      <p className="text-base font-black text-secondary dark:text-white">{getUserCoordinates(trackingUser).speed}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Signal integrity</p>
                      <p className="text-xs font-black text-emerald-500">{getUserCoordinates(trackingUser).signal}</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* 2. SECURE COMM LOG DRIVER / NOTE MODAL - Portaled */}
      {createPortal(
        <AnimatePresence>
          {messagingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMessagingUser(null)} className="absolute inset-0 bg-secondary/60 dark:bg-slate-950/80 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-xl bg-card border border-border rounded-[32px] p-8 lg:p-10 shadow-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center border-b border-border pb-5 mb-5 shrink-0">
                  <div>
                    <h3 className="text-2xl font-black text-secondary dark:text-white tracking-tighter">Secure Comm Manifest</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Identity Channel: {messagingUser.name}</p>
                  </div>
                  <button onClick={() => setMessagingUser(null)} className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-border rounded-2xl text-slate-400 hover:text-secondary dark:hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>

                {/* Audit Logs Scroller */}
                <div className="flex-grow overflow-y-auto space-y-4 pr-2 mb-6">
                  {getUserLogs(messagingUser).map((log, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center space-x-1.5">
                          <UserIcon size={10} className="text-primary" />
                          <span>{log.author}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <Clock size={10} />
                          <span>{log.timestamp}</span>
                        </span>
                      </div>
                      <p className="text-xs font-bold text-secondary dark:text-slate-200 leading-relaxed">{log.message}</p>
                    </div>
                  ))}
                </div>

                {/* Broadcast Form */}
                <form onSubmit={handleAddLog} className="border-t border-border pt-5 shrink-0 space-y-4">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2.5 block group-focus-within:text-primary transition-colors">Broadcast Secure Log / Note</label>
                    <textarea 
                      required
                      rows={3}
                      value={newLogMessage}
                      onChange={(e) => setNewLogMessage(e.target.value)}
                      placeholder="Type secure comment, manifest notes, or routing instructions..."
                      className="w-full bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-3.5 px-5 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-sm text-secondary dark:text-white resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
                    Broadcast Comm Entry
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default UserManagement;
