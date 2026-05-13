import { notifications as initial } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bell, CheckCheck } from "lucide-react";
import { useState } from "react";

const tone: Record<string, "info" | "warning" | "success" | "danger"> = { info: "info", warning: "warning", success: "success", danger: "danger" };

export default function Notifications() {
  const [items, setItems] = useState(initial);
  const markAll = () => setItems(items.map((i) => ({ ...i, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">Stay on top of every alert across your operations.</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAll}><CheckCheck className="w-4 h-4" />Mark all read</Button>
      </div>

      <Card>
        <CardContent className="divide-y divide-border p-0">
          {items.map((n) => (
            <div key={n.id} className={`p-5 flex items-start gap-4 ${!n.read ? "bg-primary/5" : ""}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${n.type === "danger" ? "bg-rose-500/15" : n.type === "warning" ? "bg-amber-500/15" : n.type === "success" ? "bg-emerald-500/15" : "bg-sky-500/15"}`}>
                <Bell className={`w-5 h-5 ${n.type === "danger" ? "text-rose-600" : n.type === "warning" ? "text-amber-600" : n.type === "success" ? "text-emerald-600" : "text-sky-600"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold">{n.title}</div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">{n.message}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge tone={tone[n.type]}>{n.type}</Badge>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
