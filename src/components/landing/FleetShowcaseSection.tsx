import { motion } from "framer-motion";
import { vehicles } from "@/lib/mockData";
import { Truck } from "lucide-react";

export function FleetShowcaseSection() {
  const featured = vehicles.slice(0, 6);
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, #0369A1 0, transparent 35%), radial-gradient(circle at 80% 80%, #F97316 0, transparent 35%)"
      }} />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3 h-3" /> Featured fleet
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">Built for every terrain</h2>
            <p className="mt-3 text-slate-400 max-w-xl">From snow-covered passes to busy city streets — MountainFleet powers diverse fleets with one unified platform.</p>
          </div>
          <a href="/fleet-showcase" className="text-sm font-semibold text-orange-400 hover:text-orange-300">View full fleet →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={v.image} 
                  alt={v.model} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                  onError={(e) => (e.currentTarget.src = `https://images.unsplash.com/photo-1586191712102-141e6e479ac2?auto=format&fit=crop&q=80&w=800`)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  v.status === "Active" ? "bg-emerald-500/20 text-emerald-300" :
                  v.status === "Maintenance" ? "bg-amber-500/20 text-amber-300" :
                  v.status === "Idle" ? "bg-sky-500/20 text-sky-300" : "bg-slate-500/20 text-slate-300"
                }`}>{v.status}</div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400">{v.type} · {v.year}</div>
                    <div className="text-lg font-bold mt-0.5">{v.model}</div>
                    <div className="text-xs text-slate-400">Plate {v.plate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400">Health</div>
                    <div className={`text-lg font-bold ${v.health > 80 ? "text-emerald-400" : v.health > 60 ? "text-amber-400" : "text-rose-400"}`}>{v.health}%</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>{v.location.city}</span>
                  <span>{v.mileage.toLocaleString()} mi</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
