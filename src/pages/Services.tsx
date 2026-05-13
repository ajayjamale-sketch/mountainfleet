import { PublicNavbar } from "@/components/landing/PublicNavbar";
import { Footer } from "@/components/landing/Footer";
import { Truck, Bus, Package, Users, Plane, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Truck, title: "Logistics & Freight", desc: "Long-haul, last-mile and intermodal freight powered by real-time dispatch." },
  { icon: Bus, title: "Tour Operations", desc: "Coach, shuttle and tour booking with customer-facing reservation experience." },
  { icon: Package, title: "Delivery Services", desc: "Same-day, scheduled and on-demand deliveries with proof-of-delivery." },
  { icon: Users, title: "Corporate Shuttles", desc: "Recurring employee transport with smart scheduling and capacity management." },
  { icon: Plane, title: "Airport Transfers", desc: "Premium ground transport with flight tracking and dynamic ETA updates." },
  { icon: MapPin, title: "Field Services", desc: "Dispatch technicians and crews with routing, ETAs and digital paperwork." },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Services we power</h1>
          <p className="mt-4 text-slate-300 text-lg">From two trucks to two thousand, MountainFleet adapts to your business.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-6 bg-card rounded-2xl border border-border hover:shadow-xl hover:border-primary/30 transition">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
