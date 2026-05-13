import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Your Privacy Matters",
        subtitle: "How we protect your data, your fleet information, and your operational privacy at MountainFleet."
      }}
      main={{
        title: "Data Security First",
        content: (
          <>
            <p>At MountainFleet, we treat your operational data with the highest level of security. We use industry-standard encryption and secure cloud infrastructure to ensure your information is never compromised.</p>
            <p>We do not sell your data to third parties. Your fleet's location, driver information, and financial records are only accessible to authorized personnel within your organization.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Privacy Principles",
        items: [
          { icon: Shield, title: "End-to-End Encryption", desc: "All data transmitted between your vehicles and our servers is fully encrypted." },
          { icon: Lock, title: "Zero-Knowledge Storage", desc: "Even our administrators cannot see your sensitive business logic or private routes." },
          { icon: Eye, title: "Full Transparency", desc: "You have complete control over who sees what data within your organization." },
        ]
      }}
      cta={{
        title: "Questions about security?",
        subtitle: "Review our full technical security whitepaper or talk to our compliance officer.",
        buttonText: "Read Security Docs",
        link: "/contact"
      }}
    />
  );
};

export default PrivacyPage;
