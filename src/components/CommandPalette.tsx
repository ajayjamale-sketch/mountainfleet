import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, LayoutDashboard, Truck, Users, Briefcase, Wrench, CreditCard,
  FileText, Settings, Bell, Map, FolderOpen, MessageSquare, HelpCircle,
  Navigation, Receipt, History, ShieldCheck, ArrowRight, Command, Hash
} from "lucide-react";
import { cn } from "../utils/cn";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  action: () => void;
  category: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const allItems: CommandItem[] = useMemo(() => [
    { id: "dashboard", label: "Dashboard Overview", description: "Fleet KPIs and live operations", icon: LayoutDashboard, action: () => navigate("/dashboard"), category: "Navigation", keywords: ["home", "overview"] },
    { id: "fleet", label: "Fleet Management", description: "Vehicles, health, assignments", icon: Truck, action: () => navigate("/dashboard/fleet"), category: "Navigation", keywords: ["vehicles", "cars"] },
    { id: "drivers", label: "Driver Operations", description: "Performance and onboarding", icon: Users, action: () => navigate("/dashboard/drivers"), category: "Navigation", keywords: ["team", "people"] },
    { id: "trips", label: "Trip Manager", description: "Scheduling and routing", icon: Briefcase, action: () => navigate("/dashboard/trips"), category: "Navigation", keywords: ["routes", "delivery"] },
    { id: "maintenance", label: "Maintenance Hub", description: "Service planning and workshop", icon: Wrench, action: () => navigate("/dashboard/maintenance"), category: "Navigation", keywords: ["repair", "service"] },
    { id: "finance", label: "Finance & Billing", description: "Revenue and expenses", icon: CreditCard, action: () => navigate("/dashboard/finance"), category: "Navigation", keywords: ["money", "billing", "invoice"] },
    { id: "reports", label: "Reports & Analytics", description: "Executive analytics", icon: FileText, action: () => navigate("/dashboard/reports"), category: "Navigation", keywords: ["charts", "data"] },
    { id: "users", label: "User Management", description: "Access control and roles", icon: ShieldCheck, action: () => navigate("/dashboard/users"), category: "Navigation", keywords: ["admin", "permissions"] },
    { id: "notifications", label: "Notifications", description: "Alerts and updates", icon: Bell, action: () => navigate("/dashboard/notifications"), category: "Navigation", keywords: ["alerts"] },
    { id: "settings", label: "Settings", description: "Profile and preferences", icon: Settings, action: () => navigate("/dashboard/settings"), category: "Navigation", keywords: ["profile", "account"] },
    { id: "documents", label: "Documents", description: "File storage and verification", icon: FolderOpen, action: () => navigate("/dashboard/documents"), category: "Navigation", keywords: ["files", "upload"] },
    { id: "messages", label: "Messages", description: "Internal communication", icon: MessageSquare, action: () => navigate("/dashboard/messages"), category: "Navigation", keywords: ["chat", "inbox"] },
    { id: "tracking", label: "Live Tracking", description: "Real-time trip visibility", icon: Map, action: () => navigate("/dashboard/track"), category: "Navigation", keywords: ["gps", "location"] },
    { id: "help", label: "Help Center", description: "Support and documentation", icon: HelpCircle, action: () => navigate("/dashboard/help"), category: "Navigation", keywords: ["support", "faq"] },
    { id: "my-trips", label: "My Trips", description: "Your assigned routes", icon: Navigation, action: () => navigate("/dashboard/my-trips"), category: "Navigation" },
    { id: "expenses", label: "Submit Expense", description: "Expense logs", icon: Receipt, action: () => navigate("/dashboard/submit-expense"), category: "Navigation" },
    { id: "bookings", label: "Booking History", description: "Past reservations", icon: History, action: () => navigate("/dashboard/my-bookings"), category: "Navigation" },
    { id: "home", label: "Go to Homepage", description: "Public landing page", icon: ArrowRight, action: () => navigate("/"), category: "Quick Actions" },
  ], [navigate]);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filtered.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered]);

  const flatFiltered = useMemo(() => filtered, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % flatFiltered.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + flatFiltered.length) % flatFiltered.length);
          break;
        case "Enter":
          e.preventDefault();
          if (flatFiltered[selectedIndex]) {
            flatFiltered[selectedIndex].action();
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [flatFiltered, selectedIndex, onClose]
  );

  if (!open) return null;

  let itemIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Palette */}
      <div className="relative z-10 w-full max-w-xl animate-scale-in rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-700">
          <Search size={18} className="shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands, pages, actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
            aria-label="Search commands"
          />
          <kbd className="hidden rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:inline">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2" role="listbox">
          {flatFiltered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-400">
              No results found for "{query}"
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-2">
                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {category}
                </p>
                {items.map((item) => {
                  itemIndex++;
                  const idx = itemIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={selectedIndex === idx}
                      data-index={idx}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        selectedIndex === idx
                          ? "bg-primary/10 text-primary"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      )}
                    >
                      <item.icon size={18} className={selectedIndex === idx ? "text-primary" : "text-slate-400"} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{item.label}</p>
                        {item.description && (
                          <p className="truncate text-xs text-slate-400">{item.description}</p>
                        )}
                      </div>
                      {selectedIndex === idx && <ArrowRight size={14} className="shrink-0 text-primary" />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2.5 dark:border-slate-700">
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800">↵</kbd> Select</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Command size={12} />
            <span>MountainFleet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
