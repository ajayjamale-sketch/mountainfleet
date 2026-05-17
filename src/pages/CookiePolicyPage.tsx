import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Fingerprint, Settings, BarChart, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const CookiePolicyPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Node Tracking Protocols",
        subtitle: "How we utilize session tokens and tracking nodes to optimize your orchestration experience."
      }}
      main={{
        title: "Session Synchronicity",
        content: (
          <>
            <p>Our platform utilizes small datasets known as cookies to maintain your session integrity and ensure seamless synchronization across our distributed network. These 'Nodes' allow us to remember your identity and preference parameters.</p>
            <p>By interacting with the MountainFleet interface, you acknowledge the deployment of these essential tracking protocols designed for system stability and user authentication.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Tracking Categories",
        items: [
          { icon: Shield, title: "Essential Nodes", desc: "Mandatory tokens for security authentication and core orchestration stability." },
          { icon: Settings, title: "Preference Sync", desc: "Used to remember your UI parameters, theme selection, and language protocols." },
          { icon: BarChart, title: "Performance Data", desc: "Anonymous telemetry used to measure system throughput and optimize interface latency." },
        ]
      }}
      cta={{
        title: "Manage your Nodes?",
        subtitle: "You can adjust your tracking parameters in the system settings or through your browser's governance console.",
        buttonText: "System Settings",
        link: "/dashboard/settings"
      }}
    >
      {/* 4. Preference Matrix Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Preference<br /><span className="text-primary">Orchestration.</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">Functional cookies allow us to provide enhanced capabilities like remembering your fleet filters and recently accessed unit datasets.</p>
              <div className="flex items-center gap-4 p-5 border border-border bg-card">
                <Fingerprint size={24} className="text-primary" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight">Identity Persistence</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Ensures your session remains active across reloads.</p>
                </div>
              </div>
            </motion.div>
            <div className="bg-secondary p-8 border border-border relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 technical-grid opacity-20" />
               <div className="relative z-10 space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-2 w-full bg-white/5 border border-white/10" />
                  ))}
                  <div className="h-2 w-2/3 bg-primary" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Governance Console Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6">
            <Info size={12} /> Privacy Control
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8">Protocol Governance</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-12">You have the right to purge all non-essential tracking nodes. Please note that desynchronizing certain cookies may degrade your orchestration experience and UI performance.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <button 
              onClick={() => toast.success("All tracking protocols accepted.")}
              className="bg-primary text-white py-4 font-black uppercase tracking-widest text-[10px] hover:bg-secondary transition-all shadow-xl shadow-primary/20"
            >
              Accept All Protocols
            </button>
            <button 
              onClick={() => toast.info("Governance console synchronized.")}
              className="bg-background border border-border text-secondary dark:text-white py-4 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all"
            >
              Custom Governance
            </button>
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default CookiePolicyPage;
