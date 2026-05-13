import { Truck, Users, Route as RouteIcon, DollarSign, Activity } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { revenueSeries, utilizationSeries, fleetMix, trips, drivers, notifications, vehicles } from "@/lib/mockData";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

const pieColors = ["#0369A1", "#F97316", "#10B981", "#8B5CF6"];

export default function Dashboard() {
  const { user } = useAuth();
  const activeVehicles = vehicles.filter((v) => v.status === "Active").length;
  const onlineDrivers = drivers.filter((d) => d.status !== "Off Duty").length;
  const activeTrips = trips.filter((t) => t.status === "In Progress").length;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Good morning, {user?.name.split(" ")[0]} 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening across your fleet today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Active vehicles" value={`${activeVehicles}/${vehicles.length}`} trend={8} icon={Truck} color="primary" />
        <KpiCard label="Drivers online" value={onlineDrivers.toString()} trend={4} icon={Users} color="emerald" />
        <KpiCard label="Trips in progress" value={activeTrips.toString()} trend={-2} icon={RouteIcon} color="accent" />
        <KpiCard label="Today revenue" value={formatCurrency(48210)} trend={12} icon={DollarSign} color="violet" />
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Revenue vs Expenses</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Last 12 months performance</p>
            </div>
            <Badge tone="success">▲ 18.4%</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,140,0.15)" />
                <XAxis dataKey="name" stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <YAxis stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={2.5} fill="url(#rev)" />
                <Area type="monotone" dataKey="expense" stroke="#F97316" strokeWidth={2.5} fill="url(#exp)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fleet mix</CardTitle>
            <Badge tone="info">{vehicles.length} vehicles</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={fleetMix} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3} cornerRadius={6}>
                  {fleetMix.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
                <Legend verticalAlign="bottom" iconType="circle" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly utilization</CardTitle>
            <Badge tone="accent">Live</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={utilizationSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,140,0.15)" />
                <XAxis dataKey="name" stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <YAxis stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Bar dataKey="trips" fill="#0369A1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="idle" fill="#F97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.slice(0, 5).map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-3">
                <div className={`mt-1 w-2.5 h-2.5 rounded-full ${n.type === "danger" ? "bg-rose-500" : n.type === "warning" ? "bg-amber-500" : n.type === "success" ? "bg-emerald-500" : "bg-sky-500"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{n.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{n.message}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{n.time}</div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active trips</CardTitle>
          <Badge tone="info">{activeTrips} in progress</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 font-semibold">Trip</th>
                  <th className="py-2 font-semibold">Route</th>
                  <th className="py-2 font-semibold">Driver</th>
                  <th className="py-2 font-semibold">Progress</th>
                  <th className="py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.filter((t) => t.status === "In Progress" || t.status === "Delayed").map((t) => {
                  const d = drivers.find((x) => x.id === t.driverId);
                  return (
                    <tr key={t.id} className="border-t border-border">
                      <td className="py-3 font-semibold">{t.id}</td>
                      <td className="py-3"><div>{t.origin}</div><div className="text-xs text-muted-foreground">→ {t.destination}</div></td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {d?.avatar && <img src={d.avatar} className="w-7 h-7 rounded-full object-cover" alt="" />}
                          <span>{d?.name}</span>
                        </div>
                      </td>
                      <td className="py-3 min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full gradient-primary" style={{ width: `${t.progress}%` }} />
                          </div>
                          <span className="text-xs font-mono">{t.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3"><Badge tone={t.status === "Delayed" ? "warning" : "info"}>{t.status}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
