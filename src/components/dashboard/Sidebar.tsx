import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Truck, Users, MapPin, Route, CalendarRange, Fuel, Wrench, CreditCard, BarChart3, Bell, Settings as SettingsIcon, LogOut, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/vehicles", label: "Vehicles", icon: Truck },
  { to: "/app/drivers", label: "Drivers", icon: Users },
  { to: "/app/trips", label: "Trips", icon: Route },
  { to: "/app/tracking", label: "Live Tracking", icon: MapPin },
  { to: "/app/bookings", label: "Bookings", icon: CalendarRange },
  { to: "/app/expenses", label: "Fuel & Expenses", icon: Fuel },
  { to: "/app/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/app/payments", label: "Payments", icon: CreditCard },
  { to: "/app/reports", label: "Analytics", icon: BarChart3 },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/settings", label: "Settings", icon: SettingsIcon },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {open && <div className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0 flex flex-col",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5 flex items-center justify-between border-b border-sidebar-border">
          <Logo variant="light" />
          <button className="lg:hidden p-1" onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto scroll-hide p-3 space-y-0.5">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition group",
                  isActive
                    ? "bg-sidebar-accent text-white shadow-inner"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/40 hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn("w-1 h-5 rounded-full transition", isActive ? "bg-orange-500" : "bg-transparent")} />
                  <item.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-sidebar-accent/40">
            <img src={user?.avatar} className="w-9 h-9 rounded-full object-cover" alt={user?.name} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{user?.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">{user?.role}</div>
            </div>
            <button onClick={() => { logout(); navigate("/"); }} className="p-2 rounded-lg hover:bg-white/10" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
