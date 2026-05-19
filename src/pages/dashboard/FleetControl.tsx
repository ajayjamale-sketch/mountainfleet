import React, { useMemo, useState } from "react";
import { Download, FileBadge2, Filter, QrCode, ShieldCheck, Truck, UploadCloud } from "lucide-react";
import { getPlatformSnapshot, getVehicleStatusTone } from "../../lib/platformData";

const FleetControl: React.FC = () => {
  const snapshot = useMemo(() => getPlatformSnapshot(), []);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Idle" | "Maintenance" | "Offline">("All");

  const vehicles = statusFilter === "All"
    ? snapshot.vehicles
    : snapshot.vehicles.filter((vehicle) => vehicle.status === statusFilter);

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Advanced Fleet Management</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Monitor vehicle health, assignment readiness, insurance, and service risk from one operational hub.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Every vehicle profile includes a live health score, current location, insurance expiry visibility, and a clear availability state for dispatch planning.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-slate-300 dark:border-slate-700">
              <UploadCloud size={16} />
              Upload documents
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary/90">
              <Download size={16} />
              Export fleet register
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Fleet size", String(snapshot.vehicles.length), "Vehicles in the active database"],
          ["Avg health", `${snapshot.metrics.avgHealth}%`, "Across all asset classes"],
          ["Maintenance", String(snapshot.metrics.pendingMaintenance), "Open workshop records"],
          ["Utilization", `${snapshot.metrics.utilizationRate}%`, "Assets currently in service"],
        ].map(([label, value, description]) => (
          <article key={label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Vehicle portfolio</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Availability, health, fuel, and location context.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
              {["All", "Active", "Idle", "Maintenance", "Offline"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status as typeof statusFilter)}
                  className={`rounded-2xl px-3 py-2 text-xs font-medium transition ${
                    statusFilter === status
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                      : "text-slate-500"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3 font-medium">Vehicle</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Driver</th>
                  <th className="pb-3 font-medium">Fuel</th>
                  <th className="pb-3 font-medium">Health</th>
                  <th className="pb-3 font-medium">Insurance</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-slate-100 align-top dark:border-slate-800/80">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img src={vehicle.image} alt={vehicle.model} className="h-12 w-12 rounded-2xl object-cover" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{vehicle.model}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{vehicle.plate} · {vehicle.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getVehicleStatusTone(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{vehicle.driver || "Unassigned"}</td>
                    <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{vehicle.fuelLevel}%</td>
                    <td className="py-4 pr-4">
                      <div className="w-28">
                        <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Score</span>
                          <span>{vehicle.health}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${vehicle.health}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-300">{vehicle.insuranceExpiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Availability map</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Current city distribution by asset.</p>
              </div>
              <Filter size={18} className="text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {snapshot.vehicles.slice(0, 4).map((vehicle) => (
                <div key={vehicle.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{vehicle.location.city}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{vehicle.model}</p>
                    </div>
                    <Truck size={18} className="text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Vehicle profile toolkit</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Enterprise actions for each unit.</p>
              </div>
              <ShieldCheck size={18} className="text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["QR access", "Generate a unique QR code for inspections and handoff flows.", QrCode],
                ["Documents", "Store registration, insurance, permits, and maintenance files.", FileBadge2],
                ["Assignments", "Track driver allocation and vehicle utilization history.", Truck],
              ].map(([title, description, Icon]) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default FleetControl;
