import React, { useState, useEffect } from 'react';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { Plus, Search, Edit2, Trash2, X, MoreVertical } from 'lucide-react';
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
  initialData: any[];
  columns: Column[];
  icon: React.ElementType;
}

const GenericCRUD: React.FC<GenericCRUDProps> = ({ title, description, storageKey, initialData, columns, icon: Icon }) => {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});

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

  const openModal = (item: any | null = null) => {
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
                          item[col.key] === 'Active' || item[col.key] === 'Completed' || item[col.key] === 'Approved' 
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
                        onClick={() => openModal(item)} 
                        className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-primary transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 bg-slate-50 dark:bg-white/5 border border-border text-slate-500 hover:text-red-500 transition-all"
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
                       item[col.key] === 'Active' || item[col.key] === 'Completed' || item[col.key] === 'Approved' 
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
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
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
                          className="w-full bg-slate-50 dark:bg-white/5 border border-border p-3.5 text-[11px] font-bold text-secondary dark:text-white focus:border-primary outline-none uppercase tracking-widest appearance-none cursor-pointer"
                        >
                          <option value="">SELECT {col.label.toUpperCase()}</option>
                          {(col.options || (col.type === 'status' ? ['Active', 'Inactive', 'Completed', 'In Progress', 'Approved', 'Pending'] : [])).map(opt => (
                            <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          required
                          type={col.type === 'number' ? 'number' : 'text'}
                          value={formData[col.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [col.key]: col.type === 'number' ? Number(e.target.value) : e.target.value })}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-border p-3.5 text-[11px] font-bold text-secondary dark:text-white focus:border-primary outline-none uppercase tracking-widest"
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
      </AnimatePresence>
    </div>
  );
};

export default GenericCRUD;
