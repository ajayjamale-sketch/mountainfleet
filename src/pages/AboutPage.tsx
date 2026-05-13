import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Users, Globe, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "About MountainFleet",
        subtitle: "Revolutionizing global logistics through innovation, data, and human-centric design."
      }}
      main={{
        title: "Our Mission & Vision",
        content: (
          <>
            <p>At MountainFleet, we believe that the backbone of global commerce is its logistics network. Our mission is to make that network smarter, cleaner, and more efficient than ever before.</p>
            <p>Founded by industry veterans, we saw the friction and inefficiency in traditional fleet management and decided to build the solution ourselves.</p>
          </>
        ),
        // Using a more professional team/office image in original color
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Why Choose Us?",
        items: [
          { icon: Users, title: "Expert Team", desc: "Our specialists have decades of experience in global supply chain management." },
          { icon: Globe, title: "Global Network", desc: "Operating in over 150 countries with localized support and tracking." },
          { icon: Target, title: "Precision Focus", desc: "We don't just track fleets; we optimize every single mile for maximum ROI." },
        ]
      }}
      cta={{
        title: "Ready to join the revolution?",
        subtitle: "Discover how MountainFleet can scale your operations to new heights.",
        buttonText: "Get Started Now",
        link: "/register"
      }}
    />
  );
};

export default AboutPage;
