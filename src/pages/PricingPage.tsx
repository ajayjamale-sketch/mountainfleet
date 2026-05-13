import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { CheckCircle, Zap, Star } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Flexible Pricing Plans",
        subtitle: "Scaling with your business. Choose the plan that's right for your fleet today."
      }}
      main={{
        title: "Transparent Value",
        content: (
          <>
            <p>No hidden fees. No complicated contracts. Just simple, monthly or annual billing based on the number of vehicles you manage.</p>
            <p>Our goal is to provide maximum value from day one, helping you save more on fuel and maintenance than the cost of the subscription itself.</p>
          </>
        ),
        // Using a professional business/data image in original color
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Plan Features",
        items: [
          { icon: CheckCircle, title: "Starter Pack", desc: "Perfect for local businesses with up to 5 vehicles." },
          { icon: Star, title: "Professional", desc: "Our most popular plan for growing fleets up to 50 vehicles." },
          { icon: Zap, title: "Enterprise", desc: "Unlimited power and support for global logistics giants." },
        ]
      }}
      cta={{
        title: "Start your free trial",
        subtitle: "Experience the full power of MountainFleet for 14 days, no credit card required.",
        buttonText: "Register Now",
        link: "/register"
      }}
    />
  );
};

export default PricingPage;
