import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Starter",
    price: 49,
    desc: "Perfect for small operators just getting on the road.",
    features: ["Up to 10 vehicles", "Live GPS tracking", "Trip & booking management", "Email support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Growth",
    price: 149,
    desc: "Most popular for growing fleets with multi-role teams.",
    features: ["Up to 50 vehicles", "Driver mobile app", "Maintenance & fuel logs", "Advanced analytics", "Priority support"],
    cta: "Start free",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: 0,
    desc: "Custom plan for 100+ vehicles & multi-region ops.",
    features: ["Unlimited vehicles", "SSO & role permissions", "API & integrations", "Dedicated success manager", "99.99% SLA"],
    cta: "Talk to sales",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">Pricing</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">Simple plans that scale with you</h2>
          <p className="mt-3 text-muted-foreground">Try free for 14 days. No credit card required. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 border ${p.highlight ? "bg-slate-950 text-white border-slate-800 shadow-2xl scale-105" : "bg-card border-border"}`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider gradient-accent text-white">
                  Most popular
                </div>
              )}
              <div className="text-lg font-bold">{p.name}</div>
              <p className={`text-sm mt-1 ${p.highlight ? "text-slate-400" : "text-muted-foreground"}`}>{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                {p.price > 0 ? (
                  <>
                    <span className="text-4xl font-bold">${p.price}</span>
                    <span className={p.highlight ? "text-slate-400" : "text-muted-foreground"}>/month</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold">Custom</span>
                )}
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${p.highlight ? "text-orange-400" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block mt-7">
                <Button variant={p.highlight ? "accent" : "primary"} className="w-full">{p.cta}</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
