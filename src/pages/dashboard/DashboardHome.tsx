import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Activity, ArrowUpRight, BrainCircuit, CalendarRange, CircleAlert,
  Download, Fuel, Route, ShieldCheck, Truck, Users, TrendingUp,
  Zap, Clock, CheckCircle2, Wrench, Bell,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getPlatformSnapshot, getTripStatusTone, getVehicleStatusTone } from "../../lib/platformData";
import { cn } from "../../utils/cn";

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [range, setRange] = useState<"week" | "year">("year");

  const snapshot = useMemo(() => getPlatformSnapshot(), []);
  const { metrics, vehicles, drivers, trips, maintenance, notifications, chartSeries } = snapshot;

  const kpis = [
    {
      label: "Live Fleet",
      value: metrics.activeVehicles,
      detail: `${metrics.utilizationRate}% utilization`,
      icon: Truck,
      trend: "+4.2%",
      trendUp: true,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
    },
    {
      label: "Active Trips",
      value: metrics.inProgressTrips,
      detail: `${metrics.delayedTrips} delayed`,
      icon: Route,
      trend: "+12.5%",
      trendUp: true,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Active Drivers",
      value: drivers.length - drivers.filter((d) => d.status === "Off Duty").length,
      detail: `${metrics.availableDrivers} available`,
      icon: Users,
      trend: "+2.1%",
      trendUp: true,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Revenue",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      detail: `$${metrics.totalExpense.toLocaleString()} costs`,
      icon: Activity,
      trend: "+8.3%",
      trendUp: true,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const exportReport = () => {
    const csvRows = [
      ["Metric", "Value"],
      ["Active Vehicles", String(metrics.activeVehicles)],
      ["Trips In Progress", String(metrics.inProgressTrips)],
      ["Completion Rate", `${metrics.completionRate}%`],
      ["Fleet Utilization", `${metrics.utilizationRate}%`],
      ["Trip Revenue", `$${metrics.totalRevenue}`],
      ["Booking Revenue", `$${metrics.bookingRevenue}`],
      ["Operating Cost", `$${metrics.totalExpense}`],
    ];
    const csv = csvRows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mountainfleet-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 px-6 py-8 text-white sm:px-8">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back, {user?.name}
              </h1>
              <p className="mt-2 text-sm text-sky-100/80 sm:text-base">
                {metrics.activeVehicles} vehicles active · {metrics.inProgressTrips} trips in progress · {metrics.completionRate}% completion rate
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={exportReport}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition hover:bg-white/20"
              >
                <Download size={16} />
                Export
              </button>
              <Link
                to={user?.role === "Customer" ? "/dashboard/book" : "/dashboard/trips"}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-sky-50"
              >
                <ArrowUpRight size={16} />
                {user?.role === "Customer" ? "New Booking" : "Plan Trip"}
              </Link>
            </div>
          </div>

          {/* Quick Stats in Hero */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Fleet Health", `${metrics.avgHealth}%`],
              ["Completion", `${metrics.completionRate}%`],
              ["Pending Maintenance", String(metrics.pendingMaintenance)],
              ["Unread Alerts", String(metrics.unreadNotifications)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-[11px] font-medium text-sky-100/70">{label}</p>
                <p className="mt-1 text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item, i) => (
          <article
            key={item.label}
            className="group premium-card p-5"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-center justify-between">
              <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", item.bg)}>
                <item.icon size={20} className={item.color} />
              </div>
              <span className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                item.trendUp ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              )}>
                <TrendingUp size={12} />
                {item.trend}
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground">{item.label}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{item.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
          </article>
        ))}
      </section>

      {/* Charts Row */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Revenue Chart */}
        <article className="premium-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm font-semibold text-foreground">Revenue Analytics</p>
              <p className="text-xs text-muted-foreground">Income vs operational expenses</p>
            </div>
            <div className="inline-flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
              {[["year", "12 Months"], ["week", "Fuel"]].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRange(value as "week" | "year")}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition",
                    range === value
                      ? "bg-white text-foreground shadow-sm dark:bg-slate-700"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {range === "year" ? (
                <AreaChart data={chartSeries.revenueSeries}>
                  <defs>
                    <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0369A1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0369A1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#0369A1" fill="url(#revFill)" strokeWidth={2} />
                  <Area type="monotone" dataKey="expense" stroke="#F97316" fill="url(#expFill)" strokeWidth={2} />
                </AreaChart>
              ) : (
                <BarChart data={chartSeries.fuelSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.15)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} tick={{ fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartSeries.fuelSeries.map((item) => (
                      <Cell key={item.name} fill={item.value > 1300 ? "#F97316" : "#0369A1"} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </article>

        {/* Fleet Mix */}
        <article className="premium-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Fleet Composition</p>
              <p className="text-xs text-muted-foreground">Vehicle distribution by type</p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-500">
              <Fuel size={16} />
            </div>
          </div>
          <div className="mt-4 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartSeries.fleetMix} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={3} strokeWidth={0}>
                  {chartSeries.fleetMix.map((_, i) => (
                    <Cell key={i} fill={["#0369A1", "#0EA5E9", "#F97316", "#334155"][i % 4]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2.5 mt-2">
            {chartSeries.fleetMix.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ["#0369A1", "#0EA5E9", "#F97316", "#334155"][i % 4] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Operational Grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Trip Board */}
        <article className="premium-card p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-sm font-semibold text-foreground">Live Trips</p>
              <p className="text-xs text-muted-foreground">Current progress and ETA</p>
            </div>
            <Link to="/dashboard/trips" className="text-xs font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {trips.slice(0, 3).map((trip) => (
              <div key={trip.id} className="rounded-xl border border-border p-4 transition hover:border-primary/20">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{trip.origin} → {trip.destination}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{trip.distance} km · ETA {new Date(trip.eta).toLocaleTimeString()}</p>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", getTripStatusTone(trip.status))}>
                    {trip.status}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>Progress</span>
                    <span className="font-medium">{trip.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${trip.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Fleet Health */}
        <article className="premium-card p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-sm font-semibold text-foreground">Fleet Health</p>
              <p className="text-xs text-muted-foreground">Vehicle readiness status</p>
            </div>
            <CalendarRange size={16} className="text-primary" />
          </div>
          <div className="space-y-3">
            {vehicles.slice(0, 3).map((v) => (
              <div key={v.id} className="rounded-xl border border-border p-4 transition hover:border-primary/20">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{v.model}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{v.plate} · {v.location.city}</p>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", getVehicleStatusTone(v.status))}>
                    {v.status}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>Health</span>
                    <span className="font-medium">{v.health}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={cn("h-1.5 rounded-full transition-all", v.health > 70 ? "bg-emerald-500" : v.health > 40 ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${v.health}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* AI Insights */}
        <article className="premium-card p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-sm font-semibold text-foreground">AI Insights</p>
              <p className="text-xs text-muted-foreground">Smart recommendations</p>
            </div>
            <div className="rounded-lg bg-violet-500/10 p-2 text-violet-500">
              <BrainCircuit size={16} />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { icon: Zap, title: "Route Optimization", desc: `${metrics.delayedTrips} trip delayed — reassign to available driver for faster delivery.`, color: "text-amber-500" },
              { icon: Wrench, title: "Maintenance Alert", desc: `${metrics.pendingMaintenance} units need servicing. Prioritize MTN-1027 (brake check).`, color: "text-rose-500" },
              { icon: TrendingUp, title: "Revenue Opportunity", desc: "North Corridor shows 15% demand increase. Add 2 vehicles for $4.8K additional monthly revenue.", color: "text-emerald-500" },
            ].map((insight) => (
              <div key={insight.title} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <insight.icon size={14} className={insight.color} />
                  <p className="text-sm font-medium text-foreground">{insight.title}</p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{insight.desc}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Bottom Row: Maintenance + Notifications */}
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="premium-card p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-sm font-semibold text-foreground">Maintenance Queue</p>
              <p className="text-xs text-muted-foreground">Items requiring attention</p>
            </div>
            <CircleAlert size={16} className="text-amber-500" />
          </div>
          <div className="space-y-3">
            {maintenance.slice(0, 3).map((record) => (
              <div key={record.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-4 transition hover:border-primary/20">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{record.type}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{record.vehicle} · {record.workshop}</p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="premium-card p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-sm font-semibold text-foreground">Recent Activity</p>
              <p className="text-xs text-muted-foreground">Platform events feed</p>
            </div>
            <Link to="/dashboard/notifications" className="text-xs font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-xl border border-border p-4 transition hover:border-primary/20">
                <div className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  item.type === "success" ? "bg-emerald-500/10 text-emerald-500" :
                  item.type === "warning" ? "bg-amber-500/10 text-amber-500" :
                  item.type === "error" ? "bg-rose-500/10 text-rose-500" :
                  "bg-sky-500/10 text-sky-500"
                )}>
                  {item.type === "success" ? <CheckCircle2 size={14} /> :
                   item.type === "warning" ? <CircleAlert size={14} /> :
                   <Bell size={14} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.message}</p>
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default DashboardHome;
