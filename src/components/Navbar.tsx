import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Ship, LogOut, LayoutDashboard, ChevronRight, Handshake, Truck, DollarSign, Newspaper, HelpCircle } from 'lucide-react';
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-border shadow-sm py-3'
          : 'bg-transparent border-b border-transparent py-5'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="MountainFleet Home">
          <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Ship className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground tracking-tight leading-none">
              MountainFleet
            </span>
            <span className="text-[9px] font-medium text-primary mt-0.5 leading-none">Logistics OS</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                location.pathname === link.href
                  ? 'text-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-destructive transition"
                aria-label="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                Get Started
                <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-foreground" 
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-border shadow-xl"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center justify-between py-3 text-sm font-medium text-foreground hover:text-primary transition"
                >
                  <div className="flex items-center gap-3">
                    <link.icon size={18} className="text-primary" />
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-2">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="w-full bg-primary text-white py-3 rounded-xl font-medium text-sm text-center transition hover:bg-primary/90"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full py-3 rounded-xl bg-rose-500/10 text-rose-500 font-medium text-sm"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="w-full bg-primary text-white py-3 rounded-xl font-medium text-sm text-center"
                    >
                      Get Started
                    </Link>
                    <Link 
                      to="/login" 
                      className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-foreground font-medium text-sm text-center"
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
