import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Briefcase, Heart, Globe, Zap } from 'lucide-react';

const CareersPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Join the Elite Fleet",
        subtitle: "We are looking for innovators, problem-solvers, and logistics experts to build the future of global supply chains."
      }}
      main={{
        title: "Why Work With Us?",
        content: (
          <>
            <p>At MountainFleet, you'll be part of a mission-driven team working at the intersection of technology and physical infrastructure. We solve complex problems that impact millions of lives every day.</p>
            <p>We value ownership, transparency, and a relentless focus on customer success. Whether you're an engineer, an operations specialist, or a driver partner, you'll have the autonomy to make a real impact.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Our Culture & Benefits",
        items: [
          { icon: Heart, title: "Wellness First", desc: "Comprehensive health, dental, and vision insurance for you and your family." },
          { icon: Globe, title: "Remote Friendly", desc: "Work from anywhere in the world with our global distributed team." },
          { icon: Zap, title: "Hyper-Growth", desc: "Access to professional development budgets and rapid career advancement." },
        ]
      }}
      cta={{
        title: "Ready to start your journey?",
        subtitle: "Check out our open positions and find your place at MountainFleet.",
        buttonText: "View Openings",
        link: "#"
      }}
    />
  );
};

export default CareersPage;
