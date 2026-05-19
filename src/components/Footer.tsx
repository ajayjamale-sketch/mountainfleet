import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ship, Twitter, Linkedin, Github, Instagram, ArrowRight, Globe, Mail, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import { storageService, STORAGE_KEYS } from '../services/storageService';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid work email.');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      try {
        storageService.addItem(STORAGE_KEYS.NEWSLETTER, { 
          email, 
          subscribedAt: new Date().toISOString(),
          source: 'footer'
        });
        setStatus('success');
        setMessage('Successfully subscribed to MountainFleet Intel.');
        setEmail('');
      } catch (err) {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    }, 1200);
  };

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Services', href: '/services' },
        { name: 'Fleet Network', href: '/fleet' },
        { name: 'Pricing Plans', href: '/pricing' },
        { name: 'News & Media', href: '/news' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'SLA', href: '/sla' },
      ],
    },
  ];

  return (
    <footer className="bg-secondary dark:bg-slate-950 text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all shadow-xl shadow-primary/20">
                <Ship className="text-white w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">MOUNTAINFLEET</span>
                <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase mt-1">Logistics OS</span>
              </div>
            </Link>
            <p className="text-slate-400 text-lg font-medium max-w-sm leading-relaxed">
              Redefining global logistics with AI-powered orchestration and real-time fleet intelligence.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <p className="text-sm font-black uppercase tracking-widest text-slate-500">Subscribe to Intel</p>
              <div className="relative max-w-md">
                <form onSubmit={handleSubscribe} className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    placeholder="Enter your work email" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-32 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary/90 text-white px-6 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 disabled:opacity-50 disabled:hover:bg-primary"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : status === 'success' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <>
                        <span>Join</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
                
                {status === 'success' && (
                  <p className="mt-3 text-emerald-400 text-sm font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle size={14} />
                    <span>{message}</span>
                  </p>
                )}
                
                {status === 'error' && (
                  <p className="mt-3 text-rose-400 text-sm font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-top-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{message}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-12 sm:gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-8">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white transition-colors font-medium flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-1 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-8">
             <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium cursor-pointer hover:text-white transition-colors">
               <Globe size={16} />
               <span>English (US)</span>
             </div>
             <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium cursor-pointer hover:text-white transition-colors">
               <Mail size={16} />
               <span>support@mountainfleet.com</span>
             </div>
          </div>

          <p className="text-slate-500 text-sm font-medium order-3 md:order-2">
            © {currentYear} MountainFleet Inc. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 order-2 md:order-3">
            {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-500 hover:text-primary transition-all hover:-translate-y-1">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
