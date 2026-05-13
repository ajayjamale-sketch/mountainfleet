import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Activity, Clock, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SLAPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Service Level Agreement",
        subtitle: "Our commitment to 99.99% system availability and high-performance logistical orchestration."
      }}
      main={{
        title: "Operational Guarantee",
        content: (
          <>
            <p>The MountainFleet Service Level Agreement (SLA) outlines our promise of reliability to every node in our network. We maintain a geographically distributed infrastructure to ensure that your command center remains active even during regional disruptions.</p>
            <p>We measure our performance across three primary vectors: API Latency, Dashboard Availability, and GPS Sync Reliability. Failure to meet these thresholds triggers automatic service credits for enterprise nodes.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Performance Metrics",
        items: [
          { icon: Activity, title: "99.99% Uptime", desc: "Our core orchestration services are guaranteed to be available around the clock." },
          { icon: Clock, title: "<200ms Latency", desc: "Global API response times optimized for real-time fleet synchronization." },
          { icon: ShieldCheck, title: "Data Integrity", desc: "Verified delivery of 100% of telemetry packets between vehicles and hubs." },
        ]
      }}
      cta={{
        title: "Need custom Uptime?",
        subtitle: "Mission-critical enterprise hubs can request enhanced 99.999% availability protocols.",
        buttonText: "Contact Support Hub",
        link: "/contact"
      }}
    >
      {/* 4. Latency Thresholds Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Response<br /><span className="text-primary">Thresholds.</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">We define our support response protocols based on the severity of the system desynchronization.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 border border-border bg-card">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                     <span className="text-xs font-black uppercase tracking-tight">Critical Outage</span>
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">15 Min Response</span>
                </div>
                <div className="flex items-center justify-between p-5 border border-border bg-card">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-amber-500" />
                     <span className="text-xs font-black uppercase tracking-tight">System Degradation</span>
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">2 Hour Response</span>
                </div>
              </div>
            </motion.div>
            <div className="bg-secondary p-12 border border-border relative">
               <div className="absolute inset-0 technical-grid opacity-10" />
               <div className="relative z-10 flex items-center justify-center">
                  <Zap size={120} className="text-primary animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Incident Orchestration Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6">
            <AlertCircle size={12} /> Support Protocols
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-16">Incident Recovery Lifecycle</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Detection", desc: "Automated monitoring nodes flag system latency." },
              { step: "02", title: "Triage", desc: "Engineering squad assigned to the sync incident." },
              { step: "03", title: "Resolution", desc: "Patch deployment or network rerouting initiated." },
              { step: "04", title: "Audit", desc: "Post-mortem manifest shared with affected nodes." }
            ].map((step, i) => (
              <div key={i} className="p-8 border border-border bg-background hover:border-primary transition-all">
                <div className="text-2xl font-black text-primary/20 mb-4">{step.step}</div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-3">{step.title}</h3>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default SLAPage;
