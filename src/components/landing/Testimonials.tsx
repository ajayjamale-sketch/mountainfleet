import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marisol Vega",
    role: "COO · Northpeak Logistics",
    avatar: "https://i.pravatar.cc/100?img=44",
    quote: "MountainFleet replaced 4 tools for us. Dispatch is 3x faster and we cut fuel costs 18% in the first quarter.",
  },
  {
    name: "Daniel Cho",
    role: "Fleet Director · Alpine Tours",
    avatar: "https://i.pravatar.cc/100?img=12",
    quote: "Our drivers love the mobile workflow. Our customers love real-time tracking. It’s the best decision we made in 2025.",
  },
  {
    name: "Priya Singh",
    role: "Founder · Summit Couriers",
    avatar: "https://i.pravatar.cc/100?img=49",
    quote: "From maintenance reminders to billing, every operations problem we had now has an answer in MountainFleet.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Loved by operators worldwide</h2>
          <p className="mt-3 text-muted-foreground">Hundreds of fleets — from 5 vehicles to 5,000 — run on MountainFleet.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex gap-1 text-amber-400 mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
