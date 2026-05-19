import React, { useState } from "react";
import { Check, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { BillingModal } from "./BillingModal";

const plans = [
  {
    name: "Starter",
    priceMonthly: 49,
    priceYearly: 39,
    desc: "Perfect for small operators just getting on the road.",
    features: ["Up to 10 vehicles", "Live GPS tracking", "Trip & booking management", "Email support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Professional",
    priceMonthly: 149,
    priceYearly: 119,
    desc: "Most popular for growing fleets with multi-role teams.",
    features: ["Up to 50 vehicles", "Driver mobile app", "Maintenance & fuel logs", "Advanced analytics", "Priority support"],
    cta: "Start free",
    highlight: true,
  },
  {
    name: "Enterprise",
    priceMonthly: 0,
    priceYearly: 0,
    desc: "Custom plan for 100+ vehicles & multi-region ops.",
    features: ["Unlimited vehicles", "SSO & role permissions", "API & integrations", "Dedicated success manager", "99.99% SLA"],
    cta: "Talk to sales",
    highlight: false,
  },
];

export function PricingSection() {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: 0 });

  const handleSubscribe = (plan: typeof plans[0]) => {
    if (plan.priceMonthly === 0) {
      window.location.href = '/contact';
      return;
    }
    const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    setSelectedPlan({ name: plan.name, price });
    setIsModalOpen(true);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 mb-6">
            Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-secondary dark:text-white">
            Simple plans that <span className="text-primary">scale</span> with you.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl mx-auto">
            Try any plan free for 14 days. No credit card required. Cancel anytime. Secure, transparent, and built for modern logistics.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className={`text-xs font-black uppercase tracking-widest transition-colors ${billingCycle === 'monthly' ? 'text-secondary dark:text-white' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors p-1"
            >
              <motion.div 
                animate={{ x: billingCycle === 'yearly' ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 rounded-full bg-primary shadow-md"
              />
            </button>
            <span className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors ${billingCycle === 'yearly' ? 'text-secondary dark:text-white' : 'text-slate-400'}`}>
              Yearly 
              <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[8px] border border-emerald-500/20">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((p, i) => {
            const price = billingCycle === 'yearly' ? p.priceYearly : p.priceMonthly;
            const annualPrice = p.priceYearly * 12;

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-[32px] p-8 md:p-10 transition-all duration-300 ${
                  p.highlight 
                    ? "bg-secondary dark:bg-slate-900 text-white shadow-2xl md:-translate-y-4 border border-slate-800 dark:border-white/10" 
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg border border-white/20 z-10 whitespace-nowrap">
                    Most popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${p.highlight ? 'text-white' : 'text-secondary dark:text-white'}`}>{p.name}</h3>
                  <p className={`text-sm font-medium ${p.highlight ? "text-slate-400" : "text-slate-500"}`}>{p.desc}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    {price > 0 ? (
                      <>
                        <span className={`text-6xl font-black tracking-tighter ${p.highlight ? 'text-white' : 'text-secondary dark:text-white'}`}>${price}</span>
                        <span className={`text-xs font-black uppercase tracking-widest ${p.highlight ? "text-slate-500" : "text-slate-400"}`}>/mo</span>
                      </>
                    ) : (
                      <span className={`text-5xl font-black tracking-tighter ${p.highlight ? 'text-white' : 'text-secondary dark:text-white'}`}>Custom</span>
                    )}
                  </div>
                  {price > 0 && billingCycle === 'yearly' && (
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${p.highlight ? "text-emerald-400" : "text-emerald-500"}`}>
                      Billed ${annualPrice} annually
                    </p>
                  )}
                </div>

                <button 
                  onClick={() => handleSubscribe(p)}
                  className={`w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-[0.98] mb-8 ${
                    p.highlight 
                      ? "bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20" 
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-secondary dark:text-white border border-border"
                  }`}
                >
                  {p.priceMonthly === 0 ? p.cta : (user ? "Subscribe Now" : "Start 14-Day Free Trial")}
                </button>

                <ul className="space-y-4">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-sm font-medium ${p.highlight ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}`}>
                      <div className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${p.highlight ? "bg-primary/20 text-primary" : "bg-emerald-500/10 text-emerald-500"}`}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <Shield size={14} className="text-primary" />
          All plans include 256-bit encryption and SOC2 compliance.
        </div>
      </div>

      <BillingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planName={selectedPlan.name}
        price={selectedPlan.price}
        billingCycle={billingCycle}
      />
    </section>
  );
}
