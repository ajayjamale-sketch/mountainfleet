import { PublicNavbar } from "@/components/landing/PublicNavbar";
import { Footer } from "@/components/landing/Footer";
import { vehicles } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function FleetShowcase() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Meet the fleet</h1>
          <p className="mt-4 text-slate-300 text-lg">Real vehicles on real routes — see what's moving on MountainFleet right now.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((v, i) => (
            <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.06 }} className="rounded-2xl overflow-hidden border border-border bg-card">
              <img src={v.image} alt={v.model} className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{v.type} · {v.year}</div>
                <div className="text-lg font-bold">{v.model}</div>
                <div className="mt-2 text-xs text-muted-foreground">Plate {v.plate} · {v.location.city}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${v.status === "Active" ? "bg-emerald-500/15 text-emerald-600" : v.status === "Maintenance" ? "bg-amber-500/15 text-amber-600" : "bg-slate-500/15 text-slate-600"}`}>{v.status}</div>
                  <div className="text-sm font-semibold">{v.mileage.toLocaleString()} mi</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
