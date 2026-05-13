import { vehicles } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Filter, Download, Fuel, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Vehicles() {
  const [filter, setFilter] = useState<string>("All");
  const filtered = vehicles.filter((v) => filter === "All" || v.status === filter);
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Fleet Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all vehicles, documents and availability.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4" />Export</Button>
          <Button variant="primary" size="sm"><Plus className="w-4 h-4" />Add vehicle</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", "Active", "Idle", "Maintenance", "Offline"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${filter === s ? "bg-primary text-white" : "bg-muted hover:bg-muted/80"}`}>{s}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((v, i) => (
          <motion.div key={v.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="overflow-hidden hover:shadow-xl hover:border-primary/30 transition">
              <div className="relative h-44 overflow-hidden">
                <img src={v.image} alt={v.model} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge tone={v.status === "Active" ? "success" : v.status === "Maintenance" ? "warning" : v.status === "Idle" ? "info" : "neutral"}>{v.status}</Badge>
                  <Badge tone="neutral">{v.type}</Badge>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs uppercase tracking-wider opacity-80">{v.plate}</div>
                  <div className="text-lg font-bold">{v.model}</div>
                </div>
              </div>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground flex items-center gap-1"><Fuel className="w-3 h-3" />Fuel</div>
                    <div className="font-semibold">{v.fuelLevel}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />Location</div>
                    <div className="font-semibold truncate">{v.location.city}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />Insurance</div>
                    <div className="font-semibold">{new Date(v.insuranceExpiry).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Health</span>
                    <span className="font-semibold">{v.health}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${v.health > 80 ? "bg-emerald-500" : v.health > 60 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${v.health}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">{v.mileage.toLocaleString()} mi</span>
                  <Button variant="ghost" size="sm">View details →</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
