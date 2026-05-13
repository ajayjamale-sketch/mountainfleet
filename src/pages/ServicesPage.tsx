import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Zap, Shield, BarChart3 } from 'lucide-react';

const ServicesPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Our Premium Services",
        subtitle: "Comprehensive solutions designed to tackle the most complex logistics challenges."
      }}
      main={{
        title: "Enterprise Solutions",
        content: (
          <>
            <p>We provide a suite of tools that integrate seamlessly with your existing infrastructure. From real-time GPS tracking to AI-powered route optimization, our services are built to scale.</p>
            <p>Our platform handles everything from small local delivery fleets to massive international shipping operations.</p>
          </>
        ),
        // Using a high-quality logistics/shipping image in original color
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Service Highlights",
        items: [
          { icon: Zap, title: "Real-time Tracking", desc: "Live location updates with millisecond latency and geofencing alerts." },
          { icon: Shield, title: "Fleet Maintenance", desc: "Predictive analytics to prevent breakdowns before they happen." },
          { icon: BarChart3, title: "Custom Analytics", desc: "Deep-dive reports tailored to your specific business KPIs." },
        ]
      }}
      cta={{
        title: "Need a custom solution?",
        subtitle: "Our enterprise team can build a package that fits your exact specifications.",
        buttonText: "Talk to Sales",
        link: "/contact"
      }}
    />
  );
};

export default ServicesPage;
