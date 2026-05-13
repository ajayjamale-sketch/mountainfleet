import { PublicNavbar } from "@/components/landing/PublicNavbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Mountain, Users, Target, Award } from "lucide-react";

export default function About() {
  const values = [
    { icon: Mountain, title: "Rugged reliability", desc: "Built to perform when the roads — and the data — get tough." },
    { icon: Users, title: "Operator-first", desc: "Designed with dispatchers, drivers and ops leaders, every step." },
    { icon: Target, title: "Outcome obsessed", desc: "Every feature ships with a measurable ROI for your business." },
    { icon: Award, title: "Enterprise quality", desc: "SOC 2, ISO 27001 and 99.99% uptime — without enterprise pricing." },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <section className="gradient-hero text-white py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">About MountainFleet</div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold">We help operators move mountains.</h1>
          <p className="mt-5 text-slate-300 text-lg">Founded in 2022 by logistics veterans, MountainFleet is rebuilding the fleet operating system for the modern era — beautiful, fast and honest.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&h=700&fit=crop" alt="Truck in mountains" className="rounded-3xl shadow-2xl" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our mission</h2>
            <p className="mt-4 text-muted-foreground">We believe every truck, van and shuttle deserves software that's as rugged as the work they do. From the snowy passes of Colorado to the deserts of Nevada, MountainFleet keeps wheels turning and revenue flowing.</p>
            <p className="mt-4 text-muted-foreground">Today we power fleets in 18 countries — and we're just getting started.</p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight">What we stand for</h2>
          <div className="grid md:grid-cols-4 gap-5 mt-12">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card p-6 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
