import { motion } from "framer-motion";
import { Star, Building2 } from "lucide-react";

const testimonials = [
  {
    name: "Strategic Logistics Partner",
    role: "NORTHPEAK OPERATIONS",
    icon: "NP",
    quote: "MountainFleet replaced 4 tools for us. Dispatch is 3x faster and we cut fuel costs 18% in the first quarter.",
  },
  {
    name: "Fleet Management Director",
    role: "ALPINE INFRASTRUCTURE",
    icon: "AI",
    quote: "Our systems are now unified. Customers love the real-time tracking, and our efficiency has peaked.",
  },
  {
    name: "Operations Orchestrator",
    role: "SUMMIT COURIER NETWORK",
    icon: "SC",
    quote: "From maintenance reminders to billing, every operations problem we had now has an answer in MountainFleet.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Loved by operators worldwide</h2>
          <p className="mt-3 text-slate-500 font-medium">Hundreds of fleets — from 5 vehicles to 5,000 — run on MountainFleet.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card p-8 border border-border hover:border-primary transition-colors">
              <div className="flex gap-1 text-primary mb-6">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-medium leading-relaxed italic">"{t.quote}"</p>
              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-10 h-10 bg-secondary text-white flex items-center justify-center font-black text-xs">
                  {t.icon}
                </div>
                <div>
                  <div className="font-black text-[10px] uppercase tracking-widest text-primary">{t.role}</div>
                  <div className="text-xs font-bold uppercase tracking-tight">{t.name}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
