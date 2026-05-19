import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { 
  Plus, Search, Edit2, Trash2, X, MoreVertical, 
  MapPin, MessageSquare, Radio, Activity, Clock, User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface Column {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'status';
  options?: string[];
}

interface GenericCRUDProps {
  title: string;
  description: string;
  storageKey: string;
  initialData: Record<string, unknown>[];
  columns: Column[];
  icon: React.ElementType;
}

const GenericCRUD: React.FC<GenericCRUDProps> = ({ title, description, storageKey, initialData, columns, icon: Icon }) => {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  // Telemetry and Communication Drawer States
  const [trackingItem, setTrackingItem] = useState<Record<string, unknown> | null>(null);
  const [messagingItem, setMessagingItem] = useState<Record<string, unknown> | null>(null);
  const [newLogMessage, setNewLogMessage] = useState('');
  const [logRefreshKey, setLogRefreshKey] = useState(0);

  useEffect(() => {
    const data = storageService.get(storageKey, initialData);
    setItems(data);
  }, [storageKey, initialData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      storageService.updateItem(storageKey, editingItem.id, formData);
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
      toast.success(`${title} UPDATED`);
    } else {
      const newItem = storageService.addItem(storageKey, formData);
      setItems([...items, newItem]);
      toast.success(`${title} ADDED`);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('TERMINATE RECORD PERMANENTLY?')) {
      storageService.deleteItem(storageKey, id);
      setItems(items.filter(item => item.id !== id));
      toast.success('RECORD PURGED');
    }
  };

  const openModal = (item: Record<string, unknown> | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      const emptyData = columns.reduce((acc, col) => ({ ...acc, [col.key]: col.type === 'number' ? 0 : '' }), {});
      setFormData(emptyData);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Helper to resolve record logs dynamically with local storage persistence
  const getItemLogs = (item: Record<string, unknown>): { timestamp: string; author: string; message: string }[] => {
    const customLogsKey = `mountainfleet_logs_${storageKey}_${item.id}`;
    const saved = localStorage.getItem(customLogsKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback below
      }
    }
    
    // Default fallback audit logs
    const itemName = item.name || item.title || item.operator || item.vehicle || item.id.slice(0, 8);
    return [
      { timestamp: '2026-05-16 10:24:12', author: 'SYSTEM_ADMIN', message: `Identity node [${itemName}] successfully registered in MountainFleet database.` },
      { timestamp: '2026-05-16 14:15:30', author: 'GATEWAY_NODE', message: `Operational status synchronized. Current protocol level active.` }
    ];
  };

  // Helper to generate coordinates based on item ID hash
  const getItemCoordinates = (item: Record<string, unknown>) => {
    const hash = item.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const lat = (39.7392 + (hash % 100) * 0.001).toFixed(4);
    const lng = (-104.9903 - (hash % 80) * 0.001).toFixed(4);
    const speed = hash % 2 === 0 ? `${45 + (hash % 30)} mph` : 'Idle';
    const signal = `${85 + (hash % 15)}% Secure`;
    return { lat, lng, speed, signal };
  };

  // Handle adding log comments permanently to local storage
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messagingItem || !newLogMessage.trim()) return;

    const currentLogs = getItemLogs(messagingItem);
    const newLog = {
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      author: 'SYSTEM_ADMIN',
      message: newLogMessage.trim()
    };

    const updatedLogs = [newLog, ...currentLogs];
    const customLogsKey = `mountainfleet_logs_${storageKey}_${messagingItem.id}`;
    localStorage.setItem(customLogsKey, JSON.stringify(updatedLogs));

    setNewLogMessage('');
    setLogRefreshKey(prev => prev + 1);
    toast.success('Secure log broadcasted and saved');
  };

  const filteredItems = items.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2.5 bg-primary text-white">
              <Icon size={20} />
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none">{title}</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">{description}</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3.5 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center space-x-3 transition-all active:translate-y-[1px]"
        >
          <Plus size={16} />
          <span>New Record</span>
        </button>
      </div>

      {/* Search Section */}
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder={`SEARCH DATABASE: ${title.toUpperCase()}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-card border border-border py-4 pl-14 pr-6 text-secondary dark:text-white focus:outline-none focus:border-primary transition-all font-bold text-xs uppercase tracking-widest"
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.02] border-b border-border">
                {columns.map(col => (
                  <th key={col.key} className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">{col.label}</th>
                ))}
                <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">System Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-all group">
                  {columns.map(col => (
                    <td key={col.key} className="px-8 py-4 text-xs text-secondary dark:text-slate-300 font-bold uppercase tracking-tight">
                      {col.type === 'status' ? (
                        <span className={`px-3 py-1 border text-[8px] font-black uppercase tracking-widest ${
                          item[col.key] === 'Active' || item[col.key] === 'Completed' || item[col.key] === 'Approved' || item[col.key] === 'Available' || item[col.key] === 'On Trip'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {item[col.key]}
                        </span>
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => setTrackingItem(item)} 
                        className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-accent transition-all"
                        title="Live Approach"
                      >
                        <MapPin size={14} />
                      </button>
                      <button 
                        onClick={() => setMessagingItem(item)} 
                        className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-primary transition-all"
                        title="Secure Message"
                      >
                        <MessageSquare size={14} />
                      </button>
                      <button 
                        onClick={() => openModal(item)} 
                        className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-primary transition-all"
                        title="Edit Record"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-red-500 transition-all"
                        title="Delete Record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid md:hidden gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-card border border-border p-6 space-y-4">
            <div className="flex justify-between items-start border-b border-border pb-4">
              <div className="min-w-0">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Entity ID: {item.id.slice(0, 8)}</p>
                <p className="text-sm font-black text-secondary dark:text-white uppercase tracking-tight truncate">{item[columns[0].key]}</p>
              </div>
              <div className="flex space-x-2">
                 <button onClick={() => openModal(item)} className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-primary"><Edit2 size={14} /></button>
                 <button onClick={() => handleDelete(item.id)} className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {columns.slice(1).map(col => (
                <div key={col.key} className="min-w-0">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{col.label}</p>
                   {col.type === 'status' ? (
                     <span className={`inline-block px-2 py-0.5 border text-[7px] font-black uppercase tracking-widest ${
                       item[col.key] === 'Active' || item[col.key] === 'Completed' || item[col.key] === 'Approved' || item[col.key] === 'Available' || item[col.key] === 'On Trip'
                         ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                         : 'bg-red-500/10 text-red-500 border-red-500/20'
                     }`}>
                       {item[col.key]}
                     </span>
                   ) : (
                     <p className="text-[10px] font-bold text-secondary dark:text-white uppercase truncate">{item[col.key]}</p>
                   )}
                </div>
              ))}
            </div>

            {/* Direct Mobile Quick Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-border">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Direct Actions</span>
               <div className="flex space-x-2">
                 <button 
                   onClick={() => setTrackingItem(item)} 
                   className="p-3 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-accent transition-all rounded-xl"
                   title="Live Approach"
                 >
                   <MapPin size={16} />
                 </button>
                 <button 
                   onClick={() => setMessagingItem(item)} 
                   className="p-3 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-primary transition-all rounded-xl"
                   title="Secure Message"
                 >
                   <MessageSquare size={16} />
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-lg bg-card border border-border p-8 sm:p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                  <h2 className="text-xl font-black text-secondary dark:text-white tracking-tighter uppercase">{editingItem ? 'Update' : 'Initialize'} Entity</h2>
                  <button onClick={closeModal} className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-400 hover:text-secondary transition-all">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid gap-4">
                    {columns.map(col => (
                      <div key={col.key}>
                        <label className="block text-[9px] font-black text-slate-500 mb-1.5 uppercase tracking-widest ml-1">{col.label}</label>
                        {col.type === 'select' || col.type === 'status' ? (
                          <select 
                            value={formData[col.key] || ''}
                            onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-border p-3.5 text-[11px] font-bold text-secondary dark:text-white focus:border-primary outline-none uppercase tracking-widest cursor-pointer"
                          >
                            <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">SELECT {col.label.toUpperCase()}</option>
                            {(col.options || (col.type === 'status' ? ['Active', 'Inactive', 'Completed', 'In Progress', 'Approved', 'Pending', 'Available', 'On Trip', 'Off Duty'] : [])).map(opt => (
                              <option key={opt} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                {opt.toUpperCase()}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input 
                            required
                            type={col.type === 'number' ? 'number' : 'text'}
                            value={formData[col.key] || ''}
                            onChange={(e) => setFormData({ ...formData, [col.key]: col.type === 'number' ? Number(e.target.value) : e.target.value })}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-border p-3.5 text-[11px] font-bold text-secondary dark:text-white focus:border-primary outline-none uppercase tracking-widest"
                            placeholder={`Enter ${col.label.toUpperCase()}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-6">
                    <button type="button" onClick={closeModal} className="flex-grow py-3.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-secondary dark:text-white font-black text-[10px] uppercase tracking-widest border border-border">Cancel</button>
                    <button type="submit" className="flex-grow py-3.5 bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all">Execute Sync</button>
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
          {trackingItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setTrackingItem(null)} className="absolute inset-0 bg-secondary/60 dark:bg-slate-950/80 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-card border border-border rounded-[32px] p-8 shadow-2xl text-center overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="flex items-center space-x-2 text-[10px] font-black bg-primary/10 text-primary px-4 py-1.5 rounded-full uppercase tracking-widest">
                    <Radio size={12} className="animate-pulse" />
                    <span>Live Tracking Node</span>
                  </span>
                  <button onClick={() => setTrackingItem(null)} className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-border rounded-xl text-slate-400 hover:text-secondary dark:hover:text-white transition-all">
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
                    <h3 className="text-xl font-black text-secondary dark:text-white tracking-tight">
                      {trackingItem.name || trackingItem.title || trackingItem.operator || trackingItem.vehicle || trackingItem.id.slice(0, 8)}
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Identity UID: {trackingItem.id}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center space-x-1.5">
                        <MapPin size={10} className="text-primary" />
                        <span>Coordinates</span>
                      </p>
                      <p className="text-xs font-black text-secondary dark:text-white truncate">{getItemCoordinates(trackingItem).lat}° N</p>
                      <p className="text-xs font-black text-slate-500 truncate">{getItemCoordinates(trackingItem).lng}° W</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center space-x-1.5">
                        <Activity size={10} className="text-emerald-500" />
                        <span>Velocity</span>
                      </p>
                      <p className="text-base font-black text-secondary dark:text-white">{getItemCoordinates(trackingItem).speed}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Signal integrity</p>
                      <p className="text-xs font-black text-emerald-500">{getItemCoordinates(trackingItem).signal}</p>
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
          {messagingItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMessagingItem(null)} className="absolute inset-0 bg-secondary/60 dark:bg-slate-950/80 backdrop-blur-md" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-xl bg-card border border-border rounded-[32px] p-8 lg:p-10 shadow-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center border-b border-border pb-5 mb-5 shrink-0">
                  <div>
                    <h3 className="text-2xl font-black text-secondary dark:text-white tracking-tighter">Secure Comm Manifest</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      Identity Channel: {messagingItem.name || messagingItem.title || messagingItem.operator || messagingItem.vehicle || messagingItem.id.slice(0, 8)}
                    </p>
                  </div>
                  <button onClick={() => setMessagingItem(null)} className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-border rounded-2xl text-slate-400 hover:text-secondary dark:hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>

                {/* Audit Logs Scroller */}
                <div className="flex-grow overflow-y-auto space-y-4 pr-2 mb-6">
                  {getItemLogs(messagingItem).map((log, idx) => (
                    <div key={`${logRefreshKey}-${idx}`} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border space-y-2">
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

export default GenericCRUD;
