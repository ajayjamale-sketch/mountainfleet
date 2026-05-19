import React, { useMemo } from "react";
import { Award, CalendarDays, FileText, Star, UserCheck, Users } from "lucide-react";
import { getPlatformSnapshot } from "../../lib/platformData";

const DriverOps: React.FC = () => {
  const snapshot = useMemo(() => getPlatformSnapshot(), []);
  const topDrivers = [...snapshot.drivers].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <p className="text-sm font-medium text-primary">Driver Management System</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Manage driver performance, shift readiness, trip history, and onboarding status with a unified personnel view.
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Use the leaderboard, attendance summary, document readiness, and assignment data to balance operational load and recognize high-performing teams.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Driver count", String(snapshot.drivers.length), "Registered operators"],
          ["Available now", String(snapshot.metrics.availableDrivers), "Ready for assignment"],
          ["Avg rating", (snapshot.drivers.reduce((sum, driver) => sum + driver.rating, 0) / snapshot.drivers.length).toFixed(1), "Service quality benchmark"],
          ["Active trips", String(snapshot.metrics.inProgressTrips), "Trips in execution"],
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
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Driver roster</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Availability, ratings, contact information, and assigned vehicles.</p>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3 font-medium">Driver</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Rating</th>
                  <th className="pb-3 font-medium">Trips</th>
                  <th className="pb-3 font-medium">Experience</th>
                  <th className="pb-3 font-medium">Vehicle</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.drivers.map((driver) => (
                  <tr key={driver.id} className="border-b border-slate-100 dark:border-slate-800/80">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img src={driver.avatar} alt={driver.name} className="h-12 w-12 rounded-2xl object-cover" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{driver.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{driver.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                        {driver.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="inline-flex items-center gap-1 font-medium text-slate-900 dark:text-white">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        {driver.rating.toFixed(1)}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{driver.trips}</td>
                    <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{driver.experience} yrs</td>
                    <td className="py-4 text-slate-600 dark:text-slate-300">{driver.vehicleId ?? "Unassigned"}</td>
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
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Driver leaderboard</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Top performers by rating and trip volume.</p>
              </div>
              <Award size={18} className="text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {topDrivers.map((driver, index) => (
                <div key={driver.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">{driver.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {driver.trips} trips · {driver.experience} years experience
                    </p>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">{driver.rating.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Workflow modules</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Key enterprise driver operations.</p>
              </div>
              <Users size={18} className="text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Attendance tracking", "Track shifts, breaks, and route readiness with daily check-in logic.", CalendarDays],
                ["Document center", "Manage licenses, contracts, compliance, and onboarding files.", FileText],
                ["Assignment workflow", "Pair drivers to vehicles and trips using availability and performance.", UserCheck],
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

export default DriverOps;
