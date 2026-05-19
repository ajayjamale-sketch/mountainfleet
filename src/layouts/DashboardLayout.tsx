import React, { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Bell, Menu, Search, X, ChevronRight, Home } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import ScrollToTop from "../components/ScrollToTop";
import CommandPalette from "../components/CommandPalette";
import AIAssistant from "../components/AIAssistant";
import { useAuth } from "../context/AuthContext";
import { getNotifications } from "../lib/platformData";
import { cn } from "../utils/cn";

const titleMap: Record<string, string> = {
  dashboard: "Overview",
  users: "User Management",
  finance: "Finance",
  fleet: "Fleet Management",
  drivers: "Driver Management",
  trips: "Trip Management",
  maintenance: "Maintenance",
  reports: "Reports",
  notifications: "Notifications",
  settings: "Settings",
  book: "Booking Center",
  "my-bookings": "My Bookings",
  "my-trips": "My Trips",
  track: "Live Tracking",
  "submit-expense": "Expense Submission",
  help: "Help Center",
  documents: "Documents",
  messages: "Messages",
};

const SIDEBAR_STORAGE_KEY = "mf_sidebar_collapsed";

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
  });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
    }
  }, [collapsed]);

  useEffect(() => {
    const syncUnreadCount = () => {
      setUnreadCount(getNotifications().filter((item) => !item.read).length);
    };
    syncUnreadCount();
    window.addEventListener("focus", syncUnreadCount);
    window.addEventListener("storage", syncUnreadCount);
    return () => {
      window.removeEventListener("focus", syncUnreadCount);
      window.removeEventListener("storage", syncUnreadCount);
    };
  }, []);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const breadcrumbs = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean).slice(1);
    const crumbs = [{ label: "Dashboard", href: "/dashboard" }];
    if (parts.length) {
      let currentPath = "/dashboard";
      parts.forEach((part) => {
        currentPath += `/${part}`;
        crumbs.push({
          label: titleMap[part] ?? part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          href: currentPath,
        });
      });
    }
    return crumbs;
  }, [location.pathname]);

  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafafa] text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-primary/20 selection:text-primary">
      {/* Desktop Sidebar */}
      <div className="hidden h-full shrink-0 lg:block z-40">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          notificationCount={unreadCount}
        />
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm transition-all lg:hidden dark:bg-slate-950/60"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) lg:hidden",
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <Sidebar onNavigate={() => setMobileMenuOpen(false)} notificationCount={unreadCount} />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute right-3 top-3 rounded-lg bg-slate-100 p-2 text-slate-600 shadow-sm transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          aria-label="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/70">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Left: Mobile menu + Breadcrumbs */}
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={18} />
              </button>
              
              {/* Premium Breadcrumbs */}
              <div className="hidden min-w-0 md:flex items-center space-x-1.5 text-sm">
                <Link to="/dashboard" className="text-slate-400 hover:text-primary transition-colors flex items-center justify-center">
                  <Home size={14} />
                </Link>
                {breadcrumbs.map((crumb, index) => {
                  if (index === 0) return null; // Skip dashboard as we use home icon
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <React.Fragment key={crumb.href}>
                      <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
                      <Link
                        to={crumb.href}
                        className={cn(
                          "truncate font-medium transition-colors",
                          isLast
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-500 hover:text-primary dark:text-slate-400"
                        )}
                      >
                        {crumb.label}
                      </Link>
                    </React.Fragment>
                  );
                })}
              </div>
              <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white md:hidden">
                {pageTitle}
              </h1>
            </div>

            {/* Center: Global Search */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-100/50 px-4 py-2 text-sm text-slate-400 shadow-sm transition hover:border-slate-300 hover:bg-white hover:text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-300 xl:flex xl:w-96"
              aria-label="Open command palette"
            >
              <Search size={16} />
              <span className="flex-1 text-left">Search anything...</span>
              <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <Link
                to="/dashboard/notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-950">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown Profile (Simple version for now) */}
              <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 sm:flex cursor-pointer">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-900 dark:text-white leading-none">
                    {user?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto styled-scrollbar relative z-0">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlays */}
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <AIAssistant />
      <ScrollToTop />
      
      <Toaster
        position="top-right"
        toastOptions={{
          className: "dark:bg-slate-900 dark:text-white dark:border-slate-800",
          style: {
            borderRadius: "16px",
            boxShadow: "0 20px 40px -18px rgba(15, 23, 42, 0.25)",
            border: "1px solid rgba(148, 163, 184, 0.15)",
            padding: "14px 20px",
            fontWeight: 500,
            fontSize: "14px",
            backdropFilter: "blur(8px)",
          },
        }}
      />
    </div>
  );
};

export default DashboardLayout;
