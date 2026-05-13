import { Menu, Search, Sun, Moon, Bell } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { notifications } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        <button className="lg:hidden p-2" onClick={onMenu}><Menu className="w-5 h-5" /></button>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search vehicles, drivers, trips, customers…"
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/60 border border-transparent focus:bg-background focus:border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border">⌘K</kbd>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={toggle} className="p-2 rounded-xl hover:bg-muted transition" title="Toggle theme">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <Link to="/app/notifications" className="relative p-2 rounded-xl hover:bg-muted transition">
            <Bell className="w-5 h-5" />
            {unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-accent text-white text-[9px] font-bold flex items-center justify-center">{unread}</span>}
          </Link>
          <div className="hidden md:flex items-center gap-2.5 pl-2 ml-1 border-l border-border">
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="text-right pr-1">
              <div className="text-xs font-semibold">{user?.name}</div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{user?.company}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
