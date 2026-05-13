import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Shield, Lock, Eye, Database, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Data Integrity Protocols",
        subtitle: "How we protect operational telemetry, fleet datasets, and network privacy at MountainFleet."
      }}
      main={{
        title: "Security Orchestration",
        content: (
          <>
            <p>At MountainFleet, we treat your operational data with the highest level of cryptographic security. We use industry-standard AES-256 encryption and distributed cloud infrastructure to ensure your information is never compromised.</p>
            <p>We do not sell your data to third parties. Your fleet's coordinates, operator information, and financial manifests are only accessible to authorized identity nodes within your organization.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Integrity Principles",
        items: [
          { icon: Shield, title: "End-to-End Encryption", desc: "All data transmitted between your fleet units and our command nodes is fully encrypted." },
          { icon: Lock, title: "Zero-Knowledge Storage", desc: "Even our system architects cannot access your sensitive business logic or private route parameters." },
          { icon: Eye, title: "Access Orchestration", desc: "You have complete control over identity permissions and data visibility within your network." },
        ]
      }}
      cta={{
        title: "Questions about security?",
        subtitle: "Review our full technical security whitepaper or talk to our lead compliance architect.",
        buttonText: "Read Security Docs",
        link: "/contact"
      }}
    >
      {/* 4. Data Lifecycle Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Telemetry<br /><span className="text-primary">Lifecycle.</span></h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">We maintain strict data retention protocols to ensure your historical telemetry is available for audit while minimizing surface area for potential breaches.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-border bg-card">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center"><Database size={20} /></div>
                  <div className="text-sm font-bold uppercase tracking-tight">7-Year Audit Retention</div>
                </div>
                <div className="flex items-center gap-4 p-4 border border-border bg-card">
                  <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center"><Lock size={20} /></div>
                  <div className="text-sm font-bold uppercase tracking-tight">Instant Node Purge Capability</div>
                </div>
              </div>
            </motion.div>
            <div>
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" alt="Data Network" className="border border-border grayscale" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Global Compliance Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6">
            <Globe size={12} /> Global Standards
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-16">Universal Compliance Matrix</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "GDPR Sync", desc: "Full alignment with European data protection and privacy orchestrations." },
              { title: "SOC2 Type II", desc: "Annual independent audit of our security and availability nodes." },
              { title: "ISO 27001", desc: "Global benchmark for information security management systems." }
            ].map((std, i) => (
              <div key={i} className="p-10 border border-border bg-background hover:border-primary transition-all group">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{std.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default PrivacyPage;
