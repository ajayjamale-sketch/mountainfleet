import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Truck, Navigation, History, ShieldCheck, 
  Package, Clock, PlusCircle, Star, Settings,
  ArrowUpRight, Zap, BarChart3, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { STORAGE_KEYS, storageService } from '../../services/storageService';
import { initialUsers, initialVehicles, initialTrips, initialBookings, initialExpenses } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const chartData = [
  { name: '01', value: 4000 }, 
  { name: '02', value: 3000 }, 
  { name: '03', value: 2000 },
  { name: '04', value: 2780 }, 
  { name: '05', value: 1890 }, 
  { name: '06', value: 2390 },
  { name: '07', value: 3490 },
];

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const data = useMemo(() => {
    const usersCount = storageService.get(STORAGE_KEYS.USERS, initialUsers).length;
    const fleetCount = storageService.get(STORAGE_KEYS.VEHICLES, initialVehicles).length;
    const tripsCount = storageService.get(STORAGE_KEYS.TRIPS, initialTrips).length;
    const bookings = storageService.get(STORAGE_KEYS.BOOKINGS, initialBookings);
    const expenses = storageService.get(STORAGE_KEYS.EXPENSES, initialExpenses);
    const totalRevenue = bookings.length * 1200;
    const totalExpenses = expenses.reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);

    return { usersCount, fleetCount, tripsCount, bookings, totalRevenue, totalExpenses };
  }, []);

  const getRoleStats = () => {
    switch (user?.role) {
      case 'Admin':
        return [
          { label: 'System Revenue', value: `$${data.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: '+12.5%', color: 'text-primary' },
          { label: 'Active Fleets', value: data.fleetCount.toString(), icon: Truck, trend: '+5.2%', color: 'text-primary' },
          { label: 'Total Users', value: data.usersCount.toString(), icon: Users, trend: '+2.4%', color: 'text-primary' },
          { label: 'Avg. Efficiency', value: '94.2%', icon: TrendingUp, trend: '+8.1%', color: 'text-accent' },
        ];
      case 'Fleet Manager':
        return [
          { label: 'My Vehicles', value: data.fleetCount.toString(), icon: Truck, trend: '8 Active', color: 'text-primary' },
          { label: 'Drivers Duty', value: '38', icon: Users, trend: '4 Avail', color: 'text-primary' },
          { label: 'Open Trips', value: data.tripsCount.toString(), icon: Navigation, trend: '2 Delay', color: 'text-accent' },
          { label: 'Ops Costs', value: `$${data.totalExpenses.toLocaleString()}`, icon: DollarSign, trend: '-5%', color: 'text-primary' },
        ];
      default: // Customer/Driver Simplified
        return [
          { label: 'Active Tasks', value: '12', icon: Package, trend: 'Live', color: 'text-primary' },
          { label: 'Performance', value: '4.9', icon: Star, trend: 'Top 5%', color: 'text-accent' },
          { label: 'Sync Status', value: '98%', icon: Zap, trend: 'Optimal', color: 'text-primary' },
          { label: 'Reward Hub', value: '4.5k', icon: DollarSign, trend: 'Sync', color: 'text-primary' },
        ];
    }
  };

  const stats = getRoleStats();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-3xl lg:text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none mb-2">
            Command Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-widest">
            Operator: <span className="text-primary font-black">{user?.name}</span> // System State: Nominal
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white dark:bg-white/5 border border-border text-secondary dark:text-white px-5 py-3 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            Export Audit
          </button>
          {user?.role === 'Customer' && (
            <Link to="/dashboard/book" className="bg-primary text-white px-6 py-3 font-bold text-[10px] uppercase tracking-widest flex items-center space-x-2 transition-all active:translate-y-[1px] shadow-lg shadow-primary/20">
              <PlusCircle size={14} />
              <span>New Shipment</span>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border p-6 hover:border-primary transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 bg-slate-50 dark:bg-white/5 border border-border ${stat.color} group-hover:bg-primary group-hover:text-white transition-all`}>
                <stat.icon size={18} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${stat.trend.includes('+') || stat.trend.includes('Active') ? 'text-accent' : 'text-slate-400'}`}>{stat.trend}</span>
            </div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-secondary dark:text-white tracking-tighter uppercase">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Chart */}
        <div className="lg:col-span-8 bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black text-secondary dark:text-white uppercase tracking-tighter">Network Throughput</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Real-time system telemetry</p>
            </div>
            <div className="flex bg-slate-50 dark:bg-white/5 border border-border p-1">
              <button className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest bg-white dark:bg-slate-800 border border-border shadow-sm">Wkly</button>
              <button className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-secondary">Mnth</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                   <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} fontWeight="black" tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} fontWeight="black" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0px',
                    fontSize: '10px',
                    fontWeight: '900',
                    textTransform: 'uppercase'
                  }}
                />
                <Area type="stepAfter" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Hub */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-secondary dark:bg-slate-900 p-8 text-white relative border border-white/5 group">
              <div className="mb-8">
                 <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 mb-4">
                    <div className="w-1.5 h-1.5 bg-accent animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent">Active Hub Sync</span>
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-tighter leading-tight mb-2">Sacramento Hub <br /> In Transit</h3>
                 <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Node MF-77 // ETA: 14:45</p>
              </div>
              <Link to="/dashboard/track" className="w-full flex items-center justify-between bg-accent text-white p-4 font-black text-[10px] uppercase tracking-widest transition-all active:translate-y-[1px] shadow-lg shadow-accent/20">
                 <span>View Tracking Matrix</span>
                 <ArrowUpRight size={14} />
              </Link>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <Link to="/dashboard/settings" className="bg-card border border-border p-6 hover:border-primary transition-all group">
                 <Settings size={18} className="text-slate-400 group-hover:text-primary mb-4 transition-colors" />
                 <p className="font-black text-secondary dark:text-white text-[9px] uppercase tracking-widest">Settings</p>
              </Link>
              <Link to="/dashboard/reports" className="bg-card border border-border p-6 hover:border-primary transition-all group">
                 <BarChart3 size={18} className="text-slate-400 group-hover:text-primary mb-4 transition-colors" />
                 <p className="font-black text-secondary dark:text-white text-[9px] uppercase tracking-widest">Audit</p>
              </Link>
           </div>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-card border border-border p-8">
         <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
            <h3 className="text-sm font-black text-secondary dark:text-white uppercase tracking-widest">Recent System Entries</h3>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Full Manifest</button>
         </div>
         <div className="space-y-1">
            {[
              { id: 'MF-092', desc: 'Fleet Expansion: Volvo FH16 added to Pacific Hub.', time: '02h' },
              { id: 'SEC-88', desc: 'Protocol Sync: MFA enforced across Admin nodes.', time: '05h' },
              { id: 'PRT-11', desc: 'Partner Sync: Terra Logistics onboarded.', time: '24h' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-border cursor-default group">
                <div className="flex items-center space-x-6">
                  <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 border border-primary/10">{item.id}</span>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-secondary dark:group-hover:text-white transition-colors uppercase tracking-tight">{item.desc}</p>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.time}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default DashboardHome;
