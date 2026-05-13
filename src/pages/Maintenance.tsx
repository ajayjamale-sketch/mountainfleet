import { maintenance } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plus, Wrench, AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const tone: Record<string, "success" | "warning" | "info"> = { Scheduled: "info", "In Progress": "warning", Completed: "success" };

export default function Maintenance() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Maintenance & Service</h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule services and keep every vehicle road-ready.</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4" />Schedule service</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-amber-600" /></div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Upcoming</div>
            <div className="text-xl font-bold">{maintenance.filter((m) => m.status === "Scheduled").length} services</div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-sky-500/15 flex items-center justify-center"><Wrench className="w-5 h-5 text-sky-600" /></div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">In progress</div>
            <div className="text-xl font-bold">{maintenance.filter((m) => m.status === "In Progress").length}</div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Completed</div>
            <div className="text-xl font-bold">{maintenance.filter((m) => m.status === "Completed").length}</div>
          </div>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Service timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="relative pl-6 space-y-5">
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border" />
            {maintenance.map((m) => (
              <div key={m.id} className="relative">
                <div className={`absolute -left-[22px] top-1 w-4 h-4 rounded-full ring-4 ${m.status === "Completed" ? "bg-emerald-500 ring-emerald-500/20" : m.status === "In Progress" ? "bg-amber-500 ring-amber-500/20" : "bg-sky-500 ring-sky-500/20"}`} />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold">{m.type} · {m.vehicle}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.workshop} · {m.date}</div>
                  </div>
                  <div className="text-right">
                    <Badge tone={tone[m.status]}>{m.status}</Badge>
                    <div className="text-sm font-semibold mt-1">{formatCurrency(m.cost)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
