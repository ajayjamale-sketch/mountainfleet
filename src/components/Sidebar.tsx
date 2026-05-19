import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  FolderOpen,
  HelpCircle,
  History,
  LayoutDashboard,
  LogOut,
  Map,
  MessageSquare,
  Navigation,
  Receipt,
  Search,
  Settings,
  ShieldCheck,
  Ship,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { useAuth, type UserRole } from "../context/AuthContext";
import { cn } from "../utils/cn";

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  path: string;
  roles: UserRole[];
  badge?: number;
}

interface MenuGroup {
  heading: string;
  items: MenuItem[];
}

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
  notificationCount?: number;
}

const menuGroups: MenuGroup[] = [
  {
    heading: "Command",
    items: [
      { name: "Overview", icon: LayoutDashboard, path: "/dashboard", roles: ["Admin", "Fleet Manager", "Driver", "Customer"] },
      { name: "Notifications", icon: Bell, path: "/dashboard/notifications", roles: ["Admin", "Fleet Manager", "Driver", "Customer"] },
      { name: "Reports", icon: FileText, path: "/dashboard/reports", roles: ["Admin", "Fleet Manager"] },
    ],
  },
  {
    heading: "Operations",
    items: [
      { name: "Fleet", icon: Truck, path: "/dashboard/fleet", roles: ["Admin", "Fleet Manager"] },
      { name: "Drivers", icon: Users, path: "/dashboard/drivers", roles: ["Admin", "Fleet Manager"] },
      { name: "Trips", icon: Briefcase, path: "/dashboard/trips", roles: ["Admin", "Fleet Manager"] },
      { name: "Maintenance", icon: Wrench, path: "/dashboard/maintenance", roles: ["Admin", "Fleet Manager"] },
      { name: "Finance", icon: CreditCard, path: "/dashboard/finance", roles: ["Admin"] },
      { name: "Users", icon: ShieldCheck, path: "/dashboard/users", roles: ["Admin"] },
    ],
  },
  {
    heading: "Workspace",
    items: [
      { name: "My Trips", icon: Navigation, path: "/dashboard/my-trips", roles: ["Driver"] },
      { name: "Expenses", icon: Receipt, path: "/dashboard/submit-expense", roles: ["Driver"] },
      { name: "Book Vehicle", icon: Search, path: "/dashboard/book", roles: ["Customer"] },
      { name: "Booking History", icon: History, path: "/dashboard/my-bookings", roles: ["Customer"] },
      { name: "Tracking", icon: Map, path: "/dashboard/track", roles: ["Customer"] },
    ],
  },
  {
    heading: "Tools",
    items: [
      { name: "Documents", icon: FolderOpen, path: "/dashboard/documents", roles: ["Admin", "Fleet Manager", "Driver"] },
      { name: "Messages", icon: MessageSquare, path: "/dashboard/messages", roles: ["Admin", "Fleet Manager", "Driver", "Customer"] },
      { name: "Settings", icon: Settings, path: "/dashboard/settings", roles: ["Admin", "Fleet Manager", "Driver", "Customer"] },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggleCollapse, onNavigate, notificationCount = 0 }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const role = user?.role as UserRole | undefined;

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white transition-all duration-300",
        collapsed ? "w-[76px]" : "w-[280px]",
      )}
    >
      {/* Logo Header */}
      <div className="sticky top-0 z-20 px-4 py-5">
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={onNavigate}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/20">
              <Ship className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold tracking-tight">MountainFleet</p>
                <p className="text-[10px] font-medium text-sky-400/80">Logistics OS</p>
              </div>
            )}
          </Link>
          {onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white lg:block"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* User Card (expanded only) */}
      {!collapsed && (
        <div className="mx-3 mb-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 text-sm font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user?.name ?? "Operator"}</p>
              <p className="truncate text-xs text-slate-500">{role ?? "Guest"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4" aria-label="Main navigation">
        {menuGroups.map((group) => {
          const items = group.items.filter((item) => role && item.roles.includes(role));
          if (!items.length) return null;

          return (
            <section key={group.heading} className="mb-5">
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {group.heading}
                </p>
              )}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

                  const showBadge = item.name === "Notifications" && notificationCount > 0;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      title={collapsed ? item.name : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        collapsed && "justify-center px-2",
                        isActive
                          ? "bg-sky-500/10 text-white"
                          : "text-slate-400 hover:bg-white/[0.04] hover:text-white",
                      )}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-sky-400" />
                      )}

                      <item.icon size={18} className={cn("shrink-0", isActive ? "text-sky-400" : "text-slate-500 group-hover:text-sky-400")} />

                      {!collapsed && (
                        <span className="flex-1 truncate">{item.name}</span>
                      )}

                      {!collapsed && showBadge && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-500 px-1.5 text-[10px] font-bold text-white">
                          {notificationCount > 99 ? "99+" : notificationCount}
                        </span>
                      )}

                      {collapsed && showBadge && (
                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-sky-400" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/[0.06] px-3 py-3">
        {!collapsed && (
          <Link
            to="/dashboard/help"
            onClick={onNavigate}
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            <HelpCircle size={18} className="text-slate-500" />
            <span>Help & Support</span>
          </Link>
        )}
        <button
          onClick={logout}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition hover:bg-rose-500/10",
            collapsed && "px-2",
          )}
          aria-label="Log out"
        >
          <LogOut size={18} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
