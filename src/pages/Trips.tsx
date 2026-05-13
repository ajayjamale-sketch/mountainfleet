import { trips, drivers, vehicles } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, MapPin, Clock, Truck } from "lucide-react";

const statusTone: Record<string, "success" | "info" | "warning" | "danger" | "neutral"> = {
  "In Progress": "info",
  Scheduled: "neutral",
  Completed: "success",
  Delayed: "warning",
  Cancelled: "danger",
};

export default function Trips() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Trips & Routes</h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule, monitor and complete every trip.</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4" />New trip</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {trips.map((t) => {
          const d = drivers.find((x) => x.id === t.driverId);
          const v = vehicles.find((x) => x.id === t.vehicleId);
          return (
            <Card key={t.id} className="hover:shadow-xl hover:border-primary/30 transition">
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Trip {t.id}</div>
                    <div className="text-lg font-bold mt-0.5">{t.origin} → {t.destination}</div>
                  </div>
                  <Badge tone={statusTone[t.status]}>{t.status}</Badge>
                </div>

                {/* Route timeline */}
                <div className="relative pl-5 space-y-3 mb-4">
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
                  <div className="relative">
                    <div className="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/20" />
                    <div className="text-xs text-muted-foreground">Origin</div>
                    <div className="text-sm font-semibold">{t.origin}</div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-accent/20" />
                    <div className="text-xs text-muted-foreground">Destination · ETA {new Date(t.eta).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</div>
                    <div className="text-sm font-semibold">{t.destination}</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{t.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full gradient-accent" style={{ width: `${t.progress}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={d?.avatar} className="w-7 h-7 rounded-full object-cover" alt="" />
                    <span className="truncate">{d?.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Truck className="w-3.5 h-3.5" />
                    <span>{v?.plate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{t.distance} mi</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
