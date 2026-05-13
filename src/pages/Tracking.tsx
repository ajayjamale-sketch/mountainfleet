import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { vehicles } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Gauge, Fuel, MapPin } from "lucide-react";

// Fix default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const truckIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${color};width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.35);border:3px solid white"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3 18V6h11v3h4l3 4v5h-2a2 2 0 11-4 0H9a2 2 0 11-4 0H3zm12-8v3h4l-2-3h-2z"/></svg></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

export default function Tracking() {
  const [positions, setPositions] = useState(() => vehicles.map((v) => ({ ...v, lat: v.location.lat, lng: v.location.lng })));
  const [selected, setSelected] = useState(positions[0].id);

  useEffect(() => {
    const t = setInterval(() => {
      setPositions((prev) => prev.map((p) => ({ ...p, lat: p.lat + (Math.random() - 0.5) * 0.02, lng: p.lng + (Math.random() - 0.5) * 0.02 })));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const route = useMemo(() => {
    const s = positions.find((p) => p.id === selected);
    if (!s) return [];
    return [
      [s.lat - 0.05, s.lng - 0.08],
      [s.lat - 0.02, s.lng - 0.04],
      [s.lat, s.lng],
    ] as [number, number][];
  }, [positions, selected]);

  const selectedVehicle = positions.find((p) => p.id === selected)!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Live Tracking</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time GPS positions, routes and geo-fences.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        <Card className="overflow-hidden">
          <div className="h-[560px] relative">
            <MapContainer center={[39.5501, -105.7821]} zoom={7} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
              <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {positions.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]} icon={truckIcon(p.status === "Active" ? "#10B981" : p.status === "Maintenance" ? "#F59E0B" : p.status === "Idle" ? "#0EA5E9" : "#64748B")} eventHandlers={{ click: () => setSelected(p.id) }}>
                  <Popup>
                    <strong>{p.model}</strong><br />
                    Plate: {p.plate}<br />
                    Status: {p.status}
                  </Popup>
                </Marker>
              ))}
              {route.length > 0 && <Polyline positions={route} pathOptions={{ color: "#F97316", weight: 4, dashArray: "8 6" }} />}
            </MapContainer>
          </div>
        </Card>

        <div className="space-y-3">
          <Card>
            <CardContent>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Currently selected</div>
              <div className="mt-2 flex items-center gap-3">
                <img src={selectedVehicle.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
                <div>
                  <div className="font-bold">{selectedVehicle.model}</div>
                  <div className="text-xs text-muted-foreground">{selectedVehicle.plate} · {selectedVehicle.location.city}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <div className="p-2.5 rounded-lg bg-muted/50">
                  <div className="text-muted-foreground flex items-center gap-1"><Gauge className="w-3 h-3" />Speed</div>
                  <div className="font-bold">{Math.round(40 + Math.random() * 30)} mph</div>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/50">
                  <div className="text-muted-foreground flex items-center gap-1"><Fuel className="w-3 h-3" />Fuel</div>
                  <div className="font-bold">{selectedVehicle.fuelLevel}%</div>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/50">
                  <div className="text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />Status</div>
                  <div className="font-bold">{selectedVehicle.status}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2 max-h-[400px] overflow-y-auto scroll-hide pr-1">
            {positions.map((p) => (
              <button key={p.id} onClick={() => setSelected(p.id)} className={`w-full text-left p-3 rounded-2xl border transition ${selected === p.id ? "bg-primary/10 border-primary" : "bg-card border-border hover:border-primary/30"}`}>
                <div className="flex items-center gap-3">
                  <div className={`relative w-2.5 h-2.5 rounded-full ${p.status === "Active" ? "bg-emerald-500" : p.status === "Maintenance" ? "bg-amber-500" : "bg-slate-400"}`}>
                    {p.status === "Active" && <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{p.plate}</div>
                    <div className="text-xs text-muted-foreground truncate">{p.model} · {p.location.city}</div>
                  </div>
                  <Badge tone={p.status === "Active" ? "success" : p.status === "Maintenance" ? "warning" : "neutral"}>{p.status}</Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
