import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { FileText, Scale, ShieldCheck, HelpCircle } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Terms of Service",
        subtitle: "The legal framework for using the MountainFleet platform and our logistics services."
      }}
      main={{
        title: "Operational Agreement",
        content: (
          <>
            <p>By using our platform, you agree to our standard operating procedures and service level agreements. We aim for 99.9% uptime and reliable delivery schedules across our entire network.</p>
            <p>These terms cover the use of our dashboard software, API integrations, and the physical logistics services provided by our fleet partners.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Key Terms",
        items: [
          { icon: FileText, title: "Service Levels", desc: "Guaranteed response times and support availability based on your plan." },
          { icon: Scale, title: "Fair Usage", desc: "Policies regarding API calls, data storage, and vehicle dispatch frequency." },
          { icon: ShieldCheck, title: "Liability Coverage", desc: "Details on insurance limits and cargo protection for every trip." },
        ]
      }}
      cta={{
        title: "Need a custom SLA?",
        subtitle: "Enterprise clients can request custom terms and dedicated support packages.",
        buttonText: "Contact Enterprise Sales",
        link: "/contact"
      }}
    />
  );
};

export default TermsPage;
