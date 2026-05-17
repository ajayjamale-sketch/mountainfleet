import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Ship, LogOut, LayoutDashboard, ChevronRight, User, Bell, Settings, Handshake, Truck, DollarSign, Newspaper } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services', icon: Handshake },
    { name: 'Fleet', href: '/fleet', icon: Truck },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border py-3 shadow-sm'
          : 'bg-transparent border-b border-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group relative">
          <div className="w-10 h-10 bg-primary flex items-center justify-center transition-all">
            <Ship className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black text-secondary dark:text-white tracking-tighter leading-none">
              MOUNTAINFLEET
            </span>
            <span className="text-[8px] font-bold text-primary tracking-[0.2em] uppercase mt-1 leading-none">System Hub</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest transition-all hover:text-primary relative py-2',
                  location.pathname === link.href ? 'text-primary' : 'text-slate-500 dark:text-slate-400'
                )}
              >
                <div className="flex items-center space-x-2">
                  {link.icon && <link.icon size={12} className="text-primary/70" />}
                  <span>{link.name}</span>
                </div>
                {location.pathname === link.href && (
                   <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-6 ml-4 pl-4 border-l border-border">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/dashboard" 
                  className="bg-primary text-white px-5 py-2.5 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:translate-y-[1px] flex items-center space-x-2"
                >
                  <LayoutDashboard size={14} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-red-500 transition-all border border-border"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all active:translate-y-[1px] flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button 
            className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-white/5 text-secondary dark:text-white border border-border" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-10 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-base font-black text-secondary dark:text-white hover:text-primary transition-colors group uppercase tracking-tighter"
                >
                  <div className="flex items-center space-x-3">
                    {link.icon && <link.icon size={18} className="text-primary" />}
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                </Link>
              ))}
              <div className="pt-6 border-t border-border flex flex-col space-y-4">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="bg-primary text-white py-4 font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3"
                    >
                      <LayoutDashboard size={18} />
                      <span>Go to Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="py-4 bg-red-500/5 text-red-500 font-black text-xs uppercase tracking-widest border border-red-500/10"
                    >
                      <span>Terminate Session</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="bg-primary text-white py-4 text-center font-black text-xs uppercase tracking-widest"
                    >
                      Initialize Account
                    </Link>
                    <Link 
                      to="/login" 
                      onClick={() => setIsOpen(false)} 
                      className="py-4 bg-slate-100 dark:bg-white/5 text-center text-secondary dark:text-white font-black text-xs uppercase tracking-widest border border-border"
                    >
                      Login to Portal
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
