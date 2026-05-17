import React, { useState } from "react";
import { vehicles } from "@/lib/mockData";
import { motion } from "framer-motion";

import {
  Truck,
  Search,
  Filter,
  Gauge,
  MapPin,
  Shield,
  Activity,
  Globe,
} from "lucide-react";

import { cn } from "@/utils/cn";

export default function FleetShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Truck", "Van", "SUV"];

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.model
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vehicle.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (activeFilter === "All") return matchesSearch;

    return matchesSearch && vehicle.type === activeFilter;
  });

  const stats = [
    {
      label: "Active Units",
      value: vehicles.length,
      icon: Truck,
    },
    {
      label: "Sync Status",
      value: "99.8%",
      icon: Activity,
    },
    {
      label: "Coverage",
      value: "24/7",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-16">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-border">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-black" />

        <div className="container mx-auto px-6 py-28 relative z-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs uppercase tracking-widest font-bold mb-6"
          >
            <Truck size={12} />
            Fleet System
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white"
          >
            Mountain Fleet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg"
          >
            Monitor vehicles, logistics, and operational status
            across your entire transportation network.
          </motion.p>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="py-12 border-b border-border bg-slate-50 dark:bg-secondary/5">

        <div className="container mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">

                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    {stat.label}
                  </p>

                  <stat.icon
                    size={18}
                    className="text-primary"
                  />
                </div>

                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </h2>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEARCH + FILTER ================= */}

      <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4">

        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-4 items-center justify-between">

          {/* SEARCH */}

          <div className="relative w-full md:w-96">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-primary transition"
            />
          </div>

          {/* FILTERS */}

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">

            <Filter
              size={14}
              className="text-slate-400 shrink-0"
            />

            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition whitespace-nowrap",
                  activeFilter === filter
                    ? "bg-primary border-primary text-white"
                    : "bg-card border-border text-slate-500 hover:border-primary hover:text-primary"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VEHICLES ================= */}

      <section className="py-20">

        <div className="container mx-auto px-6">

          {filteredVehicles.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredVehicles.map((vehicle, index) => (

                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all duration-300"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[16/10] overflow-hidden">

                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">

                      <span className="px-2 py-1 rounded-md bg-primary text-white text-[10px] uppercase font-bold tracking-widest">
                        {vehicle.type}
                      </span>

                      <span
                        className={cn(
                          "px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest",
                          vehicle.status === "Active"
                            ? "bg-emerald-500/20 text-emerald-500"
                            : "bg-amber-500/20 text-amber-500"
                        )}
                      >
                        {vehicle.status}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    <div className="mb-6">

                      <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                        {vehicle.year}
                      </p>

                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        {vehicle.model}
                      </h3>
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                          <MapPin
                            size={15}
                            className="text-slate-500"
                          />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-500">
                            Location
                          </p>

                          <p className="text-sm font-semibold">
                            {vehicle.location.city}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                          <Gauge
                            size={15}
                            className="text-slate-500"
                          />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-500">
                            Mileage
                          </p>

                          <p className="text-sm font-semibold">
                            {vehicle.mileage.toLocaleString()} MI
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">

                        <Shield
                          size={14}
                          className="text-emerald-500"
                        />

                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                          Verified Secure
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          ) : (

            <div className="text-center py-20 border border-dashed border-border rounded-2xl">

              <p className="text-slate-500 uppercase tracking-widest text-sm">
                No vehicles found
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}