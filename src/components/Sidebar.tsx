import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User,
  LayoutDashboard, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Ship,
  Briefcase,
  FileText,
  Map,
  Truck,
  Navigation,
  CreditCard,
  Search,
  Wrench,
  Receipt,
  History,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';
import { cn } from '../utils/cn';

interface MenuItem {
  name: string;
  icon: any;
  path: string;
  roles: UserRole[];
}

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard', roles: ['Admin', 'Fleet Manager', 'Driver', 'Customer'] },
    { name: 'Identity Sync', icon: Users, path: '/dashboard/users', roles: ['Admin'] },
    { name: 'Revenue Hub', icon: CreditCard, path: '/dashboard/finance', roles: ['Admin'] },
    { name: 'Fleet Command', icon: Truck, path: '/dashboard/fleet', roles: ['Admin', 'Fleet Manager'] },
    { name: 'Personnel', icon: Users, path: '/dashboard/drivers', roles: ['Admin', 'Fleet Manager'] },
    { name: 'Dispatch Ops', icon: Briefcase, path: '/dashboard/trips', roles: ['Admin', 'Fleet Manager'] },
    { name: 'Maintenance', icon: Wrench, path: '/dashboard/maintenance', roles: ['Admin', 'Fleet Manager'] },
    { name: 'Intelligence', icon: FileText, path: '/dashboard/reports', roles: ['Admin', 'Fleet Manager'] },
    { name: 'My Routes', icon: Navigation, path: '/dashboard/my-trips', roles: ['Driver'] },
    { name: 'Expense Logs', icon: Receipt, path: '/dashboard/submit-expense', roles: ['Driver'] },
    { name: 'Initialize Ship', icon: Search, path: '/dashboard/book', roles: ['Customer'] },
    { name: 'Logistics Hist.', icon: History, path: '/dashboard/my-bookings', roles: ['Customer'] },
    { name: 'Live Tracking', icon: Map, path: '/dashboard/track', roles: ['Customer'] },
    { name: 'Alerts', icon: Bell, path: '/dashboard/notifications', roles: ['Admin', 'Fleet Manager', 'Driver', 'Customer'] },
    { name: 'Preferences', icon: Settings, path: '/dashboard/settings', roles: ['Admin', 'Fleet Manager', 'Driver', 'Customer'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role as UserRole));

  return (
    <aside className="w-full bg-secondary dark:bg-slate-900 border-r border-border flex flex-col h-full overflow-y-auto transition-all">
      <div className="p-8 sticky top-0 bg-secondary dark:bg-slate-900 z-20 border-b border-border">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <Ship className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-white tracking-tighter leading-none">MOUNTAINFLEET</span>
            <span className="text-[7px] font-bold text-primary tracking-[0.2em] uppercase mt-1 leading-none">Command Center</span>
          </div>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-1 py-6">
        <div className="mb-4 px-4">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Operations</p>
        </div>
        {filteredMenu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'flex items-center justify-between px-4 py-3.5 transition-all group border-l-2',
                isActive
                  ? 'bg-primary text-white border-primary'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border-transparent'
              )}
            >
              <div className="flex items-center space-x-4">
                <item.icon size={18} className={cn(
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-primary transition-colors'
                )} />
                <span className="font-bold text-xs uppercase tracking-widest leading-none">{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight size={14} className="text-white/50" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t border-border bg-slate-950/20">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <User size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-black truncate uppercase leading-none">{user?.name}</p>
            <p className="text-[8px] text-primary uppercase font-black tracking-widest mt-1 leading-none">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all group font-black text-[9px] uppercase tracking-widest border border-red-500/10"
        >
          <LogOut size={16} />
          <span>Terminate Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
