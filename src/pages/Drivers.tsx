import { drivers, vehicles } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Phone, Mail, Star, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function Drivers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Drivers</h1>
          <p className="text-sm text-muted-foreground mt-1">Track performance, ratings and availability.</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4" />Onboard driver</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {drivers.map((d, i) => {
          const v = vehicles.find((x) => x.id === d.vehicleId);
          return (
            <motion.div key={d.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="hover:shadow-xl hover:border-primary/30 transition">
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img src={d.avatar} alt={d.name} className="w-16 h-16 rounded-2xl object-cover" />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${d.status === "On Trip" ? "bg-emerald-500" : d.status === "Available" ? "bg-sky-500" : "bg-slate-400"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg truncate">{d.name}</div>
                      <div className="text-xs text-muted-foreground">License {d.license}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold">{d.rating}</span>
                        <span className="text-xs text-muted-foreground">· {d.trips} trips</span>
                      </div>
                    </div>
                    <Badge tone={d.status === "On Trip" ? "success" : d.status === "Available" ? "info" : "neutral"}>{d.status}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-muted/50">
                      <div className="text-muted-foreground">Experience</div>
                      <div className="font-bold">{d.experience} yrs</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/50">
                      <div className="text-muted-foreground">Trips</div>
                      <div className="font-bold">{d.trips}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/50">
                      <div className="text-muted-foreground">Vehicle</div>
                      <div className="font-bold truncate">{v?.plate || "—"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg hover:bg-muted transition"><Phone className="w-3.5 h-3.5" />Call</button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg hover:bg-muted transition"><Mail className="w-3.5 h-3.5" />Email</button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg hover:bg-muted transition"><Truck className="w-3.5 h-3.5" />Assign</button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
