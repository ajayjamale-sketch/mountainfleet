import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Truck, Shield, Zap, Info } from 'lucide-react';

const FleetPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Our Elite Fleet",
        subtitle: "A diverse, modern, and perfectly maintained network of vehicles ready for any logistics challenge."
      }}
      main={{
        title: "Standard of Excellence",
        content: (
          <>
            <p>Every vehicle in the MountainFleet network undergoes rigorous weekly safety inspections and performance tuning. We utilize the latest telematics to ensure optimal efficiency and safety.</p>
            <p>From zero-emission electric delivery vans to heavy-duty transcontinental haulers, our fleet is designed to meet the demands of modern commerce without compromising on reliability.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Fleet Capabilities",
        items: [
          { icon: Truck, title: "Diverse Loadouts", desc: "Specialized vehicles for refrigerated goods, hazardous materials, and bulk cargo." },
          { icon: Shield, title: "AI-Monitored", desc: "Every truck is equipped with AI safety systems and 24/7 GPS tracking." },
          { icon: Zap, title: "Fast Dispatch", desc: "Our network allows for vehicle assignment in under 15 minutes in major hubs." },
        ]
      }}
      cta={{
        title: "Need a dedicated fleet?",
        subtitle: "Talk to our logistics experts about long-term leasing and custom fleet management solutions.",
        buttonText: "Inquire Now",
        link: "/contact"
      }}
    />
  );
};

export default FleetPage;
