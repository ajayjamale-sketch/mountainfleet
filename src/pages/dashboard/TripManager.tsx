import React, { useMemo } from "react";
import { CalendarClock, MapPinned, MoveRight, Route, TimerReset } from "lucide-react";
import { getPlatformSnapshot, getTripStatusTone } from "../../lib/platformData";

const TripManager: React.FC = () => {
  const snapshot = useMemo(() => getPlatformSnapshot(), []);
  const completionTrend = snapshot.chartSeries.utilizationSeries;

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <p className="text-sm font-medium text-primary">Trip Management System</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Plan trips, assign drivers, manage routes, and keep every pickup-to-dropoff milestone visible in real time.
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          This workspace is structured for dispatch teams that need route optimization, trip analytics, scheduling support, and live progress tracking without switching tools.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total trips", String(snapshot.trips.length), "Trips in the planning board"],
          ["In progress", String(snapshot.metrics.inProgressTrips), "Live routes currently underway"],
          ["Delayed", String(snapshot.metrics.delayedTrips), "Trips needing intervention"],
          ["Completion rate", `${snapshot.metrics.completionRate}%`, "End-to-end execution quality"],
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
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Dispatch board</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Core trip records with assignment and route performance.</p>
          </div>
          <div className="mt-5 space-y-4">
            {snapshot.trips.map((trip) => (
              <div key={trip.id} className="rounded-[24px] border border-slate-200 p-5 dark:border-slate-800">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        {trip.origin}
                        <MoveRight className="mx-2 inline-block text-primary" size={18} />
                        {trip.destination}
                      </p>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getTripStatusTone(trip.status)}`}>
                        {trip.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Driver {trip.driverId} · Vehicle {trip.vehicleId} · ${trip.revenue.toLocaleString()} projected revenue
                    </p>
                  </div>
                  <div className="min-w-[220px]">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Progress</span>
                      <span>{trip.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${trip.progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Start time</p>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">{new Date(trip.startTime).toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">ETA</p>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">{new Date(trip.eta).toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Distance</p>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">{trip.distance} km</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Scheduler modules</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Features included in the rebuilt trip flow.</p>
              </div>
              <CalendarClock size={18} className="text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Drag-and-drop planning", "Move trips between time windows and dispatch lanes.", CalendarClock],
                ["Route optimization", "Recommend faster or lower-cost alternatives for mountain corridors.", Route],
                ["ETA simulation", "Track expected completion and escalation thresholds in one place.", TimerReset],
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

          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Route density</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Trips vs idle capacity by day.</p>
              </div>
              <MapPinned size={18} className="text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {completionTrend.map((day) => (
                <div key={day.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{day.name}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{day.trips} trips</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(day.trips * 1.8, 100)}%` }} />
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

export default TripManager;
