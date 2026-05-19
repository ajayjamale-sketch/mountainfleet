import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Ship, LogOut, LayoutDashboard, ChevronRight, Handshake, Truck, DollarSign, Newspaper } from 'lucide-react';
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Services', href: '/services', icon: Handshake },
    { name: 'Fleet', href: '/fleet', icon: Truck },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] py-4'
          : 'bg-transparent border-b border-transparent py-6'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="MountainFleet Home">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            <Ship className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-primary transition-colors">
              MountainFleet
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mt-1 leading-none">
              Logistics OS
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/50 dark:bg-slate-900/50 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="mr-2">
            <ThemeToggle />
          </div>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/dashboard" 
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <LayoutDashboard size={16} className="transition-transform group-hover:-translate-x-0.5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-rose-900/50 dark:hover:bg-rose-950/30 dark:hover:text-rose-500"
                aria-label="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Get Started
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-900 backdrop-blur-sm transition-colors hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-900" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl text-sm font-semibold transition-all",
                      isActive
                        ? "bg-slate-50 dark:bg-slate-800/50 text-primary"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon size={18} className={cn(isActive ? "text-primary" : "text-slate-400")} />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                    >
                      <LayoutDashboard size={18} />
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 py-3.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90"
                    >
                      Get Started
                      <ChevronRight size={18} />
                    </Link>
                    <Link 
                      to="/login" 
                      className="flex w-full items-center justify-center rounded-xl bg-slate-100 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      Log In
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
