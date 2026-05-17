import { motion } from "framer-motion";
import { vehicles } from "@/lib/mockData";
import { Truck } from "lucide-react";

export function FleetShowcaseSection() {
  const featured = vehicles.slice(0, 6);
  return (
    <section className="py-24 bg-white dark:bg-slate-950 text-secondary dark:text-white relative overflow-hidden transition-colors">
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, #0369A1 0, transparent 35%), radial-gradient(circle at 80% 80%, #F97316 0, transparent 35%)"
      }} />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-300 text-xs font-black uppercase tracking-wider">
              <Truck className="w-3 h-3" /> Featured fleet
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight uppercase leading-none">Built for every terrain</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl font-medium">From snow-covered passes to busy city streets — MountainFleet powers diverse fleets with one unified platform.</p>
          </div>
          <a href="/fleet-showcase" className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">View full fleet →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-white hover:dark:bg-white/[0.05] transition-all duration-300 shadow-sm hover:shadow-2xl"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={v.image} 
                  alt={v.model} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  onError={(e) => (e.currentTarget.src = `https://images.unsplash.com/photo-1586191712102-141e6e479ac2?auto=format&fit=crop&q=80&w=800`)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider shadow-lg ${
                  v.status === "Active" ? "bg-emerald-500 text-white" :
                  v.status === "Maintenance" ? "bg-amber-500 text-white" :
                  v.status === "Idle" ? "bg-sky-500 text-white" : "bg-slate-500 text-white"
                }`}>{v.status}</div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{v.type} · {v.year}</div>
                    <div className="text-xl font-black text-secondary dark:text-white uppercase tracking-tighter">{v.model}</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Plate {v.plate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Health</div>
                    <div className={`text-xl font-black tracking-tighter ${v.health > 80 ? "text-emerald-500" : v.health > 60 ? "text-amber-500" : "text-rose-500"}`}>{v.health}%</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {v.location.city}
                  </span>
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
