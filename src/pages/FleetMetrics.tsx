import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  Gauge,
  MapPin,
  ArrowLeft,
  Download,
  RefreshCw,
  Bell,
  Activity,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { toast } from "sonner";

const chartData = [
  { day: "Mon", usage: 80 },
  { day: "Tue", usage: 72 },
  { day: "Wed", usage: 90 },
  { day: "Thu", usage: 85 },
  { day: "Fri", usage: 95 },
  { day: "Sat", usage: 70 },
  { day: "Sun", usage: 60 },
];

export default function FleetMetrics() {
  const [syncing, setSyncing] = useState(false);
  const [alerts, setAlerts] = useState(true);

  // ================= BUTTON ACTIONS =================

  const handleExport = () => {
    toast.success("Fleet report exported");
  };

  const handleSync = () => {
    setSyncing(true);

    toast.loading("Syncing fleet systems...");

    setTimeout(() => {
      setSyncing(false);
      toast.success("Fleet sync completed");
    }, 2000);
  };

  const handleAlerts = () => {
    setAlerts(!alerts);

    toast.success(
      alerts ? "Alerts disabled" : "Alerts enabled"
    );
  };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="container mx-auto px-6">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">

          <div>
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-slate-500 hover:text-primary mb-4"
            >
              <ArrowLeft size={14} />
              Back to Fleet
            </Link>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              Fleet <span className="text-primary">Metrics</span>
            </h1>

            <p className="text-slate-500 text-xs uppercase tracking-widest mt-2">
              Real-Time Fleet Monitoring Dashboard
            </p>
          </div>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-3">

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-3 border border-border text-xs font-bold uppercase hover:bg-card transition"
            >
              <Download size={14} />
              Export
            </button>

            <button
              onClick={handleSync}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-white text-xs font-bold uppercase hover:opacity-90 transition"
            >
              <RefreshCw
                size={14}
                className={syncing ? "animate-spin" : ""}
              />

              {syncing ? "Syncing..." : "Sync"}
            </button>

            <button
              onClick={handleAlerts}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase border transition ${
                alerts
                  ? "border-emerald-500 text-emerald-500"
                  : "border-rose-500 text-rose-500"
              }`}
            >
              <Bell size={14} />

              {alerts ? "Alerts ON" : "Alerts OFF"}
            </button>
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {[
            {
              title: "Active Vehicles",
              value: "1,248",
              icon: Truck,
            },
            {
              title: "Performance",
              value: "94.2%",
              icon: Gauge,
            },
            {
              title: "Safety Score",
              value: "98.5",
              icon: Shield,
            },
            {
              title: "Distance",
              value: "3.2M",
              icon: MapPin,
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border p-6 hover:border-primary transition"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  {item.title}
                </p>

                <item.icon size={18} className="text-primary" />
              </div>

              <h2 className="text-3xl font-black tracking-tight">
                {item.value}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* ================= CHART ================= */}

        <div className="bg-card border border-border p-8 mb-12">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase">
              Fleet Usage
            </h2>

            <div className="flex items-center gap-2 text-xs uppercase font-bold text-emerald-500">
              <Activity size={14} />
              Live
            </div>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="usageGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#0369A1"
                      stopOpacity={0.4}
                    />

                    <stop
                      offset="95%"
                      stopColor="#0369A1"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#0369A1"
                  fill="url(#usageGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= STATUS ================= */}

        <div className="bg-secondary text-white border border-border p-8 rounded-none">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-xs uppercase font-bold mb-4">
                <Activity size={12} className="animate-pulse" />
                Live Status
              </div>

              <h2 className="text-3xl font-black uppercase mb-2">
                Fleet Operating Normally
              </h2>

              <p className="text-white/50">
                All systems are active and synchronized.
              </p>
            </div>

            <button
              onClick={() =>
                toast.success("System diagnostics completed")
              }
              className="px-6 py-3 bg-primary text-white text-xs font-bold uppercase hover:opacity-90 transition h-fit"
            >
              Run Diagnostics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}