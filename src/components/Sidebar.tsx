import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
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
  Building,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { useAuth, type UserRole } from "../context/AuthContext";
import { cn } from "../utils/cn";

interface SubMenuItem {
  name: string;
  path: string;
  roles: UserRole[];
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  path?: string;
  roles: UserRole[];
  badge?: number;
  subItems?: SubMenuItem[];
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
    heading: "Core",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", roles: ["Admin", "Fleet Manager", "Driver", "Customer"] },
      { name: "Analytics", icon: FileText, path: "/dashboard/reports", roles: ["Admin", "Fleet Manager"] },
      { name: "Notifications", icon: Bell, path: "/dashboard/notifications", roles: ["Admin", "Fleet Manager", "Driver", "Customer"] },
    ],
  },
  {
    heading: "Operations",
    items: [
      { 
        name: "Fleet Management", 
        icon: Truck, 
        roles: ["Admin", "Fleet Manager"],
        subItems: [
          { name: "Vehicles", path: "/dashboard/fleet", roles: ["Admin", "Fleet Manager"] },
          { name: "Maintenance", path: "/dashboard/maintenance", roles: ["Admin", "Fleet Manager"] },
        ]
      },
      { name: "Drivers", icon: Users, path: "/dashboard/drivers", roles: ["Admin", "Fleet Manager"] },
      { name: "Trips & Routes", icon: Briefcase, path: "/dashboard/trips", roles: ["Admin", "Fleet Manager"] },
      { name: "GPS Tracking", icon: Map, path: "/dashboard/track", roles: ["Customer", "Admin", "Fleet Manager"] },
    ],
  },
  {
    heading: "Workspace",
    items: [
      { name: "My Trips", icon: Navigation, path: "/dashboard/my-trips", roles: ["Driver"] },
      { name: "Expenses", icon: Receipt, path: "/dashboard/submit-expense", roles: ["Driver"] },
      { name: "Book Vehicle", icon: Search, path: "/dashboard/book", roles: ["Customer"] },
      { name: "Booking History", icon: History, path: "/dashboard/my-bookings", roles: ["Customer"] },
      { 
        name: "Payments & Billing", 
        icon: CreditCard, 
        roles: ["Admin"],
        subItems: [
          { name: "Invoices", path: "/dashboard/finance", roles: ["Admin"] },
          { name: "Subscriptions", path: "/dashboard/finance/subscriptions", roles: ["Admin"] },
        ]
      },
    ],
  },
  {
    heading: "System",
    items: [
      { name: "Documents", icon: FolderOpen, path: "/dashboard/documents", roles: ["Admin", "Fleet Manager", "Driver"] },
      { name: "Messages", icon: MessageSquare, path: "/dashboard/messages", roles: ["Admin", "Fleet Manager", "Driver", "Customer"] },
      { name: "Users & Roles", icon: ShieldCheck, path: "/dashboard/users", roles: ["Admin"] },
      { name: "Settings", icon: Settings, path: "/dashboard/settings", roles: ["Admin", "Fleet Manager", "Driver", "Customer"] },
    ],
  },
];



const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggleCollapse, onNavigate, notificationCount = 0 }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const role = user?.role as UserRole | undefined;
  
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  // Auto-expand menus based on current path
  useEffect(() => {
    const newExpanded: Record<string, boolean> = {};
    menuGroups.forEach(group => {
      group.items.forEach(item => {
        if (item.subItems) {
          const isChildActive = item.subItems.some(sub => location.pathname === sub.path || location.pathname.startsWith(sub.path + "/"));
          if (isChildActive) {
            newExpanded[item.name] = true;
          }
        }
      });
    });
    setExpandedMenus(prev => ({ ...prev, ...newExpanded }));
  }, [location.pathname]);

  const toggleSubmenu = (name: string) => {
    if (collapsed && onToggleCollapse) {
      onToggleCollapse();
    }
    setExpandedMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-slate-200 bg-white text-slate-900 transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-white",
        collapsed ? "w-[76px]" : "w-[280px]",
      )}
    >
      {/* Logo */}
      <div className="relative px-3 py-5">
        <Link 
          to="/dashboard" 
          className={cn("flex items-center gap-3 group", collapsed && "justify-center")} 
          aria-label="MountainFleet Dashboard"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            <Ship size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-[15px] font-bold text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-primary transition-colors">
                MountainFleet
              </span>
              <span className="mt-1 truncate text-[10px] font-semibold uppercase tracking-widest text-slate-500 leading-none">
                Logistics OS
              </span>
            </div>
          )}
        </Link>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:hover:text-white lg:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        )}
      </div>

      {/* Global Search Button */}
      <div className="px-3 pb-2">
        <button
          onClick={() => {
            const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
            window.dispatchEvent(event);
          }}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 transition hover:border-slate-300 hover:text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-300",
            collapsed && "justify-center px-0"
          )}
        >
          <Search size={16} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">Search...</span>
              <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium dark:bg-slate-800">⌘K</kbd>
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 styled-scrollbar">
        {menuGroups.map((group) => {
          const items = group.items.filter((item) => {
            if (item.subItems) {
              return item.subItems.some(sub => role && sub.roles.includes(role));
            }
            return role && item.roles.includes(role);
          });
          
          if (!items.length) return null;

          return (
            <div key={group.heading} className="mb-6">
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.heading}
                </p>
              )}
              <ul className="space-y-1">
                {items.map((item) => {
                  const hasSubmenu = !!item.subItems && item.subItems.length > 0;
                  const isExpanded = expandedMenus[item.name];
                  
                  const isDirectlyActive = item.path && (location.pathname === item.path || (item.path !== "/dashboard" && location.pathname.startsWith(item.path)));
                  const isChildActive = hasSubmenu && item.subItems?.some(sub => location.pathname === sub.path || location.pathname.startsWith(sub.path + "/"));
                  const isActive = isDirectlyActive || isChildActive;

                  const showBadge = item.name === "Notifications" && notificationCount > 0;

                  return (
                    <li key={item.name} className="relative">
                      {hasSubmenu ? (
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          title={collapsed ? item.name : undefined}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                            collapsed && "justify-center px-2",
                            isActive
                              ? "bg-primary/5 text-primary dark:bg-primary/10"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                          )}
                        >
                          <item.icon size={18} className={cn("shrink-0", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                          {!collapsed && <span className="flex-1 text-left">{item.name}</span>}
                          {!collapsed && (
                            <ChevronDown 
                              size={14} 
                              className={cn("transition-transform duration-200 text-slate-400", isExpanded && "rotate-180")} 
                            />
                          )}
                        </button>
                      ) : (
                        <Link
                          to={item.path!}
                          onClick={onNavigate}
                          title={collapsed ? item.name : undefined}
                          className={cn(
                            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                            collapsed && "justify-center px-2",
                            isActive
                              ? "bg-primary text-white shadow-md shadow-primary/20 dark:shadow-none"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                          )}
                        >
                          <item.icon size={18} className={cn("shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                          {!collapsed && <span className="flex-1">{item.name}</span>}
                          
                          {!collapsed && showBadge && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white shadow-sm">
                              {notificationCount > 99 ? "99+" : notificationCount}
                            </span>
                          )}
                          {collapsed && showBadge && (
                            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-rose-500 dark:border-slate-950" />
                          )}
                        </Link>
                      )}

                      {/* Submenu */}
                      <AnimatePresence>
                        {hasSubmenu && isExpanded && !collapsed && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-1 space-y-1 overflow-hidden px-3 pl-11"
                          >
                            {item.subItems!.filter(sub => role && sub.roles.includes(role)).map(sub => {
                              const isSubActive = location.pathname === sub.path || location.pathname.startsWith(sub.path + "/");
                              return (
                                <li key={sub.path}>
                                  <Link
                                    to={sub.path}
                                    onClick={onNavigate}
                                    className={cn(
                                      "block rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                                      isSubActive
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    )}
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        {!collapsed ? (
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{user?.name ?? "Operator"}</p>
              <p className="truncate text-[10px] uppercase tracking-wider text-slate-500">{role ?? "Guest"}</p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            className="flex w-full justify-center rounded-xl p-2.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
            title="Log out"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

