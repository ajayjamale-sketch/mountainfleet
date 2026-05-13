import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';
import { Search, Bell, Menu, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import ScrollToTop from '../components/ScrollToTop';

const DashboardLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 h-full flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-secondary/60 dark:bg-slate-950/80 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed top-0 left-0 bottom-0 z-50 w-80 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-[-60px] w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-secondary dark:text-white shadow-2xl"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0 h-full overflow-hidden">
        {/* Dashboard Header */}
        <header className="h-20 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 transition-all">
          <div className="flex items-center gap-6">
            <button 
              className="lg:hidden text-slate-500 dark:text-slate-400 p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl border border-border transition-all shadow-sm"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Synchronize analytics, payloads, etc..."
                className="bg-slate-50 dark:bg-white/5 border border-border rounded-2xl py-3 pl-14 pr-6 text-sm text-secondary dark:text-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary w-80 lg:w-96 transition-all font-bold"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-6">
            <ThemeToggle />
            <button className="p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl border border-border relative transition-all shadow-sm group">
              <Bell size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse shadow-lg shadow-primary/40"></span>
            </button>
            <div className="h-10 w-[1px] bg-border mx-2 hidden sm:block"></div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden xl:block">
                <p className="text-sm font-black text-secondary dark:text-white leading-none tracking-tighter">{user?.name}</p>
                <p className="text-[10px] text-primary uppercase font-black tracking-widest mt-1.5">{user?.role}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl border border-border p-0.5 shadow-sm overflow-hidden bg-primary/5 flex items-center justify-center text-primary ring-4 ring-primary/5">
                <User size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto p-6 lg:p-12 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <ScrollToTop />
      
      <Toaster position="top-center" toastOptions={{
        className: 'dark:bg-slate-900 dark:text-white dark:border-slate-800',
        style: {
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 24px',
          fontWeight: 'bold',
        },
      }} />
    </div>
  );
};

export default DashboardLayout;
