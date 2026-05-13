import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How fast can we onboard our fleet?", a: "Most fleets are live within 48 hours. Import vehicles via CSV, invite drivers, and start tracking instantly." },
  { q: "Does MountainFleet work with my existing GPS hardware?", a: "Yes. We integrate with all major OBD-II and telematics devices, or you can use our mobile-only tracking." },
  { q: "Is there a mobile app for drivers?", a: "Absolutely. Drivers get a dedicated iOS/Android app for trips, documents, fuel logs and proof-of-delivery." },
  { q: "Can customers track their bookings?", a: "Yes — customers receive a tracking link with live ETA, driver details and trip status updates." },
  { q: "What about data security?", a: "MountainFleet is SOC 2 Type II and ISO 27001 certified. All data is encrypted in transit and at rest." },
  { q: "Do you support multi-company / franchise operations?", a: "Yes. Our Enterprise plan supports unlimited companies, granular roles and consolidated reporting." },
];

export function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently asked questions</h2>
          <p className="mt-3 text-muted-foreground">Everything you need to know — and a few extras.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold">{f.q}</span>
                <motion.div animate={{ rotate: open === i ? 45 : 0 }}>
                  <Plus className="w-5 h-5 text-primary" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
