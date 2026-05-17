import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Shield, Lock, FileText, Database, Server, Cpu, ShieldCheck, Download, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const SecurityDocsPage: React.FC = () => {
  const handleDownload = (doc: string) => {
    toast.success(`${doc} manifest downloading...`);
  };

  return (
    <PageSectionLayout
      banner={{
        title: "Security Architecture",
        subtitle: "Deep-dive into the cryptographic protocols and infrastructure safeguards protecting the MountainFleet network."
      }}
      main={{
        title: "Military-Grade Safeguards",
        content: (
          <>
            <p>MountainFleet's security architecture is built on a zero-trust model, ensuring that every data packet, API request, and fleet telemetry node is verified and encrypted at every stage of the logistical journey.</p>
            <p>Our infrastructure utilizes decentralized command nodes and advanced identity orchestration to prevent single points of failure and ensure maximum network resilience.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Core Protocols",
        items: [
          { icon: Lock, title: "AES-256 Encryption", desc: "Industry-standard cryptographic protection for all data at rest and in transit." },
          { icon: Shield, title: "Zero-Trust Sync", desc: "Mandatory multi-node verification for every operational dispatch and identity change." },
          { icon: Server, title: "Distributed Nodes", desc: "Resilient infrastructure spread across 12 global regions with 3x redundancy." },
        ]
      }}
      cta={{
        title: "Need a security audit?",
        subtitle: "Enterprise partners can request a dedicated security architect for deep-dive technical reviews.",
        buttonText: "Request Audit",
        link: "/contact"
      }}
    >
      {/* 4. Technical Specifications */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">Security<br />Matrix</h2>
            <div className="text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-2">
              System_Version: v2.4.0-SEC
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: "Identity Orchestration", desc: "Role-based access control (RBAC) with granular permission nodes." },
              { icon: Database, title: "Data Residency", desc: "Region-specific data storage compliant with local sovereignty laws." },
              { icon: ShieldCheck, title: "Threat Detection", desc: "AI-powered anomaly detection monitoring network throughput 24/7." },
              { icon: Zap, title: "Automated Patching", desc: "Zero-downtime security updates deployed across the global network." },
              { icon: Lock, title: "Hardware Security", desc: "FIPS 140-2 Level 3 compliant hardware security modules (HSM)." },
              { icon: FileText, title: "Audit Logging", desc: "Immutable logistical logs for every state change in the OS." }
            ].map((spec, i) => (
              <div key={i} className="p-10 border border-border bg-card hover:border-primary transition-all group">
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform"><spec.icon size={32} /></div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{spec.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Whitepapers & Documentation */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Security Library</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto uppercase text-xs tracking-widest">Formal verification and compliance manifests.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Technical Architecture Whitepaper", size: "14.2 MB", type: "PDF" },
              { title: "Network Encryption Protocol v2", size: "3.8 MB", type: "PDF" },
              { title: "Compliance Hub Certification", size: "2.1 MB", type: "PDF" },
              { title: "Logistical Privacy Manifesto", size: "1.5 MB", type: "PDF" }
            ].map((doc, i) => (
              <div 
                key={i} 
                onClick={() => handleDownload(doc.title)}
                className="p-8 border border-border bg-background flex flex-col items-center text-center hover:border-primary transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <Download size={48} className="text-slate-400 group-hover:text-primary transition-colors mb-6" />
                <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">{doc.type} · {doc.size}</p>
                <div className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  Initialize Download <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default SecurityDocsPage;
