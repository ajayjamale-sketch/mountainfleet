import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
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
    />
  );
};

export default ContactPage;
