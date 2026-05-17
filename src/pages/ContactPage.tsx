import React, { useState } from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Linkedin, Twitter, Github, ChevronRight, CheckCircle2, Download, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQSection } from '../components/landing/FAQSection';
import { toast } from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      toast.success("Operational dispatch received. Monitoring channel for response.");
    }, 1500);
  };

  const handleSalesMeeting = () => {
    toast.success("Sales orchestration calendar initialized.");
  };

  const handleMediaDownload = () => {
    toast.success("Media Kit manifest downloading...");
  };

  const handleSocialClick = (platform: string) => {
    toast.info(`Connecting to ${platform} external node...`);
  };

  return (
    <PageSectionLayout
      banner={{
        title: "Get in Touch",
        subtitle: "Have questions? Our elite support team is here to help you navigate your fleet operations."
      }}
      main={{
        title: "Contact Intelligence",
        content: (
          <div className="space-y-10">
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                <p className="text-lg font-bold text-secondary dark:text-white">support@mountainfleet.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                <p className="text-lg font-bold text-secondary dark:text-white">+1 (800) FLEET-99</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Visit Headquarters</p>
                <p className="text-lg font-bold text-secondary dark:text-white">123 Logistics Way, San Francisco, CA</p>
              </div>
            </div>
          </div>
        ),
        image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Global Support Network",
        items: [
          { icon: Mail, title: "24/7 Digital Desk", desc: "Our AI-powered help desk is always online to solve basic queries instantly." },
          { icon: Phone, title: "Expert Hotline", desc: "Direct access to senior logistics consultants for enterprise partners." },
          { icon: MapPin, title: "Regional Hubs", desc: "On-the-ground support teams located in major global logistics centers." },
        ]
      }}
      cta={{
        title: "Still have questions?",
        subtitle: "Experience the future of fleet management for yourself with a guided tour.",
        buttonText: "Book a Demo",
        link: "/register"
      }}
    >
      {/* 1. Technical Contact Form */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Initialize<br /><span className="text-primary">Communication.</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-12">Submit a technical inquiry or business request and our orchestration team will respond within 4 business hours.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                  <Clock size={16} className="text-primary" /> Average Response: 127 Minutes
                </div>
                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                  <Globe size={16} className="text-primary" /> Support in 42 Languages
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border p-8 sm:p-12 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Dispatch Sent</h3>
                    <p className="text-slate-500 font-medium mb-8">Your message has been successfully broadcast to our support network.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-primary"
                    >
                      Initialize New Dispatch
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">First Name</label>
                        <input required type="text" className="w-full bg-background border border-border p-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-primary transition-colors" placeholder="ALEX" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last Name</label>
                        <input required type="text" className="w-full bg-background border border-border p-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-primary transition-colors" placeholder="VANCE" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Corporate Email</label>
                      <input required type="email" className="w-full bg-background border border-border p-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-primary transition-colors" placeholder="ALEX@COMPANY.COM" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message Intelligence</label>
                      <textarea required rows={4} className="w-full bg-background border border-border p-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-primary transition-colors" placeholder="DESCRIBE YOUR FLEET CHALLENGE..." />
                    </div>
                    <button 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-primary text-white py-5 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-secondary transition-all disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? "Broadcasting..." : "Send Dispatch"} <Send size={18} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Global Support Hubs */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-16 text-center">Regional Operations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { region: "Americas", city: "San Francisco", phone: "+1 800 123 4567", hours: "08:00 - 20:00 PST" },
              { region: "Europe", city: "London", phone: "+44 20 7946 0958", hours: "09:00 - 18:00 GMT" },
              { region: "Asia Pacific", city: "Sydney", phone: "+61 2 9876 5432", hours: "08:00 - 18:00 AEST" }
            ].map((hub, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-border bg-background hover:border-primary transition-colors shadow-sm"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{hub.region}</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-6">{hub.city}</h3>
                <div className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-3"><Phone size={14} className="text-primary" /> {hub.phone}</div>
                  <div className="flex items-center gap-3"><Clock size={14} className="text-primary" /> {hub.hours}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sales Inquiry Booking */}
      <section className="py-16 sm:py-24 border-b border-border bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 technical-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">Scale Your<br />Fleet Today.</h2>
          <p className="text-white/40 max-w-2xl mx-auto font-medium mb-12">Connect with our enterprise sales team to build a custom solution for your global logistics challenges.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleSalesMeeting}
              className="bg-primary text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
            >
              <Calendar size={18} /> Book Sales Meeting
            </button>
            <button 
              onClick={handleMediaDownload}
              className="border border-white/20 text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <Download size={18} /> Download Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* 4. Social Intelligence */}
      <section className="py-16 sm:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Linkedin, label: "LinkedIn", handle: "@mountainfleet" },
              { icon: Twitter, label: "Twitter", handle: "@mf_logistics" },
              { icon: Github, label: "GitHub", handle: "mountainfleet-labs" },
              { icon: MessageSquare, label: "Discord", handle: "Community" }
            ].map((social, i) => (
              <div 
                key={i} 
                onClick={() => handleSocialClick(social.label)}
                className="flex flex-col items-center p-8 border border-border hover:border-primary transition-colors cursor-pointer group shadow-sm hover:shadow-md"
              >
                <social.icon size={32} className="text-slate-400 group-hover:text-primary transition-colors mb-4" />
                <h4 className="text-xs font-black uppercase tracking-widest mb-1">{social.label}</h4>
                <p className="text-[10px] font-medium text-slate-500">{social.handle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <FAQSection />
    </PageSectionLayout>
  );
};

export default ContactPage;
