import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronLeft, ArrowRight, Zap, Shield, 
  Globe, Layout, Database, Cpu, Lock
} from 'lucide-react';

const addons = {
  'white-label': {
    title: "White Label Interface",
    desc: "Seamlessly integrate MountainFleet's power under your own corporate identity.",
    features: [
      "Custom Domain & SSL Mapping",
      "Branded Mobile Apps (iOS/Android)",
      "Identity-matched Color Systems",
      "Custom Notification Templates"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    icon: Layout
  },
  'sap-erp': {
    title: "SAP/ERP Integration Hub",
    desc: "Connect your physical logistics data directly into your existing financial and resource systems.",
    features: [
      "Bi-directional SAP Sync",
      "Custom Webhook Architecture",
      "Oracle & Microsoft Dynamics Connectors",
      "Automated Ledger Synchronization"
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    icon: Database
  },
  'iot-hub': {
    title: "Custom IoT Hub",
    desc: "Expand your telemetry network with proprietary hardware and non-standard sensors.",
    features: [
      "Raw Data Stream Processing",
      "MQTT & HTTP Bridge Nodes",
      "Legacy Hardware Adapters",
      "Custom Edge Computing Rules"
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    icon: Cpu
  },
  'global-sla': {
    title: "Global SLA+",
    desc: "Mission-critical reliability protocols for massive-scale logistics infrastructure.",
    features: [
      "99.999% Availability Guarantee",
      "15-Minute Critical Response",
      "Geographic Redundancy Nodes",
      "Dedicated On-site Engineering"
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    icon: Lock
  }
};

export default function AddonDetails() {
  const { id } = useParams();
  const addon = addons[id as keyof typeof addons] || addons['white-label'];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-primary selection:text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link to="/pricing" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-12">
          <ChevronLeft size={14} /> Back to Pricing
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-8">
              <addon.icon size={12} /> Enterprise Protocol
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">{addon.title}</h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">{addon.desc}</p>
            
            <div className="space-y-6 mb-12">
              {addon.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 bg-primary group-hover:scale-150 transition-transform" />
                  <span className="text-sm font-black uppercase tracking-tight text-secondary dark:text-white">{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/contact" className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 font-black uppercase tracking-widest hover:bg-secondary transition-all group">
              <span>Initialize Integration</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] border border-border bg-card overflow-hidden p-1">
              <img src={addon.image} alt={addon.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary border border-border flex flex-col justify-end p-8 text-white hidden xl:flex">
               <Zap size={40} className="text-primary mb-4" />
               <div className="text-[10px] font-black uppercase tracking-widest">Protocol Version v4.2</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
