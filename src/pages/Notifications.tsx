import { useMemo, useState } from "react";
import { Bell, CheckCheck, Eye, Filter } from "lucide-react";
import { STORAGE_KEYS, storageService } from "@/services/storageService";
import { getNotifications } from "@/lib/platformData";

type NotificationType = "all" | "info" | "warning" | "success" | "danger";

const typeStyles: Record<Exclude<NotificationType, "all">, string> = {
  info: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  danger: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function Notifications() {
  const [items, setItems] = useState(() => getNotifications());
  const [filter, setFilter] = useState<NotificationType>("all");

  const filteredItems = useMemo(
    () => items.filter((item) => filter === "all" || item.type === filter),
    [filter, items],
  );

  const markAll = () => {
    const updated = items.map((item) => ({ ...item, read: true }));
    setItems(updated);
    storageService.set(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const markRead = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, read: true } : item,
    );
    setItems(updated);
    storageService.set(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Notification Center</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Review real-time alerts, maintenance warnings, booking updates, and safety incidents from one filtered inbox.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              The platform now supports categorized notifications, read state management, and a clearer incident feed for dispatchers and operators.
            </p>
          </div>
          <button
            type="button"
            onClick={markAll}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary/90"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total notifications", String(items.length), "All events in the inbox"],
          ["Unread", String(items.filter((item) => !item.read).length), "Actionable items"],
          ["Warnings", String(items.filter((item) => item.type === "warning").length), "Risk-related operational events"],
          ["Critical alerts", String(items.filter((item) => item.type === "danger").length), "Safety or escalation items"],
        ].map(([label, value, description]) => (
          <article key={label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Filters and states</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Quick ways to segment the alert feed.</p>
            </div>
            <Filter size={18} className="text-primary" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["all", "info", "warning", "success", "danger"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type as NotificationType)}
                className={`rounded-full px-3 py-2 text-xs font-medium capitalize transition ${
                  filter === type
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {[
              "Push-style incident panel for dispatch teams",
              "Read and unread state persistence",
              "Maintenance, booking, and emergency alert categories",
              "Filter-ready layout for future real-time integrations",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Activity feed</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filteredItems.length} notification{filteredItems.length === 1 ? "" : "s"} in the current view.
            </p>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`flex gap-4 px-6 py-5 transition ${!item.read ? "bg-primary/5" : ""}`}
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${typeStyles[item.type]}`}>
                  <Bell size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.message}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${typeStyles[item.type]}`}>
                        {item.type}
                      </span>
                      {!item.read ? (
                        <button
                          type="button"
                          onClick={() => markRead(item.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary"
                        >
                          <Eye size={14} />
                          Mark read
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Read</span>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
