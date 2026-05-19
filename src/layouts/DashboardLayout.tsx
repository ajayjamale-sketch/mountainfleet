import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Bell, Menu, Search, User, X, Command } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import ScrollToTop from "../components/ScrollToTop";
import CommandPalette from "../components/CommandPalette";
import AIAssistant from "../components/AIAssistant";
import { useAuth } from "../context/AuthContext";
import { getNotifications, getPlatformSnapshot } from "../lib/platformData";

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

  const snapshot = useMemo(() => getPlatformSnapshot(), []);

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
    <div className="flex h-screen overflow-hidden bg-slate-50 text-foreground dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <div className="hidden h-full shrink-0 lg:block">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          notificationCount={unreadCount}
        />
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onNavigate={() => setMobileMenuOpen(false)} notificationCount={unreadCount} />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute right-3 top-3 rounded-lg bg-slate-800 p-2 text-white shadow-lg"
          aria-label="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            {/* Left: Mobile menu + Breadcrumbs */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={18} />
              </button>
              <div className="hidden min-w-0 md:block">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                      {index > 0 && <span className="text-slate-300 dark:text-slate-600">/</span>}
                      <Link
                        to={crumb.href}
                        className={
                          index === breadcrumbs.length - 1
                            ? "font-medium text-slate-900 dark:text-white"
                            : "hover:text-primary transition-colors"
                        }
                      >
                        {crumb.label}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <h1 className="truncate text-lg font-semibold text-slate-900 dark:text-white md:hidden">
                {pageTitle}
              </h1>
            </div>

            {/* Center: Search trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 transition hover:border-slate-300 hover:text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 xl:flex xl:w-80"
              aria-label="Open command palette"
            >
              <Search size={16} />
              <span className="flex-1 text-left">Search...</span>
              <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Link
                to="/dashboard/notifications"
                className="relative rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>

              <div className="hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="truncate text-[11px] text-slate-400">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* AI Assistant */}
      <AIAssistant />

      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "dark:bg-slate-900 dark:text-white dark:border-slate-800",
          style: {
            borderRadius: "12px",
            boxShadow: "0 20px 40px -18px rgba(15, 23, 42, 0.25)",
            border: "1px solid rgba(148, 163, 184, 0.12)",
            padding: "14px 18px",
            fontWeight: 500,
          },
        }}
      />
    </div>
  );
};

export default DashboardLayout;
