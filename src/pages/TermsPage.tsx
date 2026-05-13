import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { FileText, Scale, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Operational Governance",
        subtitle: "The legal and logistical framework for the MountainFleet network and orchestration protocols."
      }}
      main={{
        title: "Network Agreement",
        content: (
          <>
            <p>By synchronizing with our platform, you agree to the standard operating protocols and service level agreements (SLA). We guarantee 99.99% system availability and high-fidelity telemetry across the network.</p>
            <p>These terms govern the utilization of our orchestration dashboard, API nodes, and the physical logistical infrastructure provided by our elite fleet units.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Governance Nodes",
        items: [
          { icon: FileText, title: "SLA Protocols", desc: "Defined response latencies and system support availability based on your tier." },
          { icon: Scale, title: "Network Usage", desc: "Fair utilization policies regarding API throughput, dataset storage, and unit dispatch." },
          { icon: ShieldCheck, title: "Cargo Integrity", desc: "Mandatory insurance parameters and payload protection for every synchronized dispatch." },
        ]
      }}
      cta={{
        title: "Need a custom Protocol?",
        subtitle: "Enterprise nodes can request custom governance terms and dedicated architecture support.",
        buttonText: "Contact Sales Hub",
        link: "/contact"
      }}
    >
      {/* 4. Logistical Liability Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Logistical<br /><span className="text-primary">Liability.</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">We maintain high-fidelity insurance manifests for all network operations. Our liability parameters are strictly defined by the synchronized payload value and transit risk vectors.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-border bg-card">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center"><AlertTriangle size={20} /></div>
                  <div className="text-sm font-bold uppercase tracking-tight">Standard Indemnification Protocols</div>
                </div>
                <div className="flex items-center gap-4 p-4 border border-border bg-card">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center"><ShieldCheck size={20} /></div>
                  <div className="text-sm font-bold uppercase tracking-tight">Multi-Node Cargo Protection</div>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" alt="Logistics Warehouse" className="border border-border grayscale" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Node Termination Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6">
            <Zap size={12} /> Sync Termination
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-16">System Desynchronization</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-10 border border-border bg-background hover:border-primary transition-all text-left">
              <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-primary">Voluntary Purge</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Users may terminate their network synchronization at any time with a 30-day notice period for enterprise nodes.</p>
            </div>
            <div className="p-10 border border-border bg-background hover:border-primary transition-all text-left">
              <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-rose-500">Protocol Breach</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Violation of network integrity or fair-usage protocols may result in immediate node suspension or terminal desynchronization.</p>
            </div>
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default TermsPage;
