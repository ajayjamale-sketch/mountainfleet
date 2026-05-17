import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { CheckCircle, Zap, Star, ShieldCheck, HelpCircle, Calculator, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PricingSection } from '../components/landing/PricingSection';
import { FAQSection } from '../components/landing/FAQSection';

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
        image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=1000"
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

    >
      {/* 1. Core Pricing Grid */}
      <PricingSection />

      {/* 2. Comparison Matrix */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-16 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-border">
              <thead>
                <tr className="bg-secondary text-white uppercase text-[10px] tracking-widest">
                  <th className="p-6 border border-white/10">Feature</th>
                  <th className="p-6 border border-white/10">Starter</th>
                  <th className="p-6 border border-white/10">Professional</th>
                  <th className="p-6 border border-white/10">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {[
                  { name: "Max Vehicles", s: "5", p: "50", e: "Unlimited" },
                  { name: "Live Tracking", s: "Yes", p: "Yes", e: "Yes" },
                  { name: "AI Route Optimization", s: "No", p: "Yes", e: "Yes" },
                  { name: "Custom API Access", s: "No", p: "No", e: "Yes" },
                  { name: "24/7 Phone Support", s: "No", p: "Yes", e: "Yes" },
                  { name: "Dedicated Manager", s: "No", p: "No", e: "Yes" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-colors">
                    <td className="p-6 border border-border text-secondary dark:text-white uppercase tracking-tight font-bold">{row.name}</td>
                    <td className="p-6 border border-border text-slate-500">{row.s}</td>
                    <td className="p-6 border border-border text-slate-500">{row.p}</td>
                    <td className="p-6 border border-border text-primary font-bold">{row.e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. ROI Calculator Component */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-secondary p-12 border border-border text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calculator size={200} />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Calculate your<br /><span className="text-primary">Efficiency Gains.</span></h2>
              <p className="text-white/40 mb-12 font-medium">Most MountainFleet customers see a 24% reduction in fuel costs and a 40% decrease in idle time within the first 6 months.</p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 border border-white/10 bg-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-2">Estimated Savings</div>
                  <div className="text-4xl font-black">$2.4k<span className="text-sm font-normal text-white/40 ml-2">/truck /yr</span></div>
                </div>
                <div className="p-6 border border-white/10 bg-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-2">Payback Period</div>
                  <div className="text-4xl font-black">3.2<span className="text-sm font-normal text-white/40 ml-2">Months</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Enterprise Add-ons */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Enterprise Add-ons</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Extend your platform with modular components designed for scale.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: "white-label", title: "White Label", desc: "Your branding on every dashboard and mobile app interface." },
              { id: "sap-erp", title: "SAP/ERP Integration", desc: "Seamless data sync with your existing enterprise systems." },
              { id: "iot-hub", title: "Custom IoT Hub", desc: "Connect non-standard sensors and hardware to the grid." },
              { id: "global-sla", title: "Global SLA", desc: "Guaranteed uptime and response times for mission-critical ops." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-border hover:border-primary bg-background transition-all">
                <h3 className="text-lg font-black uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6">{item.desc}</p>
                <Link to={`/addon/${item.id}`} className="text-xs font-bold text-primary flex items-center gap-1 group cursor-pointer hover:underline">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 5. Trust & Security */}
      <section className="py-16 sm:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <ShieldCheck size={48} className="text-primary" />
              <div>
                <h4 className="text-lg font-black uppercase tracking-tight">SOC2 Type II Certified</h4>
                <p className="text-xs text-slate-500 font-medium">Enterprise-grade security and data privacy.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-24 bg-card border border-border flex items-center justify-center grayscale opacity-50 text-[8px] font-black uppercase tracking-widest text-slate-400">
                  SECURITY_{i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
    </PageSectionLayout>
  );
};

export default PricingPage;
