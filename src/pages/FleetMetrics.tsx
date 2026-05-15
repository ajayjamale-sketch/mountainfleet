import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Truck, Users, 
  MapPin, Shield, Zap, ArrowLeft, Download, 
  Search, Filter, Activity, Gauge
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

const data = [
  { name: 'Mon', usage: 85, maintenance: 12, idle: 3 },
  { name: 'Tue', usage: 78, maintenance: 15, idle: 7 },
  { name: 'Wed', usage: 92, maintenance: 5, idle: 3 },
  { name: 'Thu', usage: 88, maintenance: 8, idle: 4 },
  { name: 'Fri', usage: 95, maintenance: 3, idle: 2 },
  { name: 'Sat', usage: 70, maintenance: 20, idle: 10 },
  { name: 'Sun', usage: 60, maintenance: 25, idle: 15 },
];

const COLORS = ['#0369A1', '#F97316', '#10B981', '#8B5CF6'];

export default function FleetMetrics() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link to="/fleet" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Fleet
            </Link>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">Fleet <span className="text-primary">Intelligence.</span></h1>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Real-time Telemetry & Performance Audit</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-card transition-all">
               <Download size={14} /> Export Manifest
             </button>
             <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all">
               Initialize Sync
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Units', value: '1,248', icon: Truck, trend: '+12%', trendUp: true },
            { label: 'Avg Throughput', value: '94.2%', icon: Gauge, trend: '+2.4%', trendUp: true },
            { label: 'Safety Score', value: '98.5', icon: Shield, trend: 'Nominal', trendUp: true },
            { label: 'Total Distance', value: '3.2M', icon: MapPin, trend: '-4.2%', trendUp: false },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-card border border-border relative group hover:border-primary transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={80} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">{stat.label}</p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                <span className={`text-[10px] font-bold mb-1 ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Utilization Chart */}
          <div className="lg:col-span-2 p-8 bg-card border border-border">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black uppercase tracking-tight">System Utilization</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-primary" />
                   <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Usage</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500" />
                   <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Maintenance</span>
                 </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0369A1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0369A1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '0', color: '#fff' }}
                    itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900 }}
                  />
                  <Area type="monotone" dataKey="usage" stroke="#0369A1" strokeWidth={3} fillOpacity={1} fill="url(#usageGrad)" />
                  <Area type="monotone" dataKey="maintenance" stroke="#F97316" strokeWidth={2} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="p-8 bg-card border border-border">
            <h3 className="text-xl font-black uppercase tracking-tight mb-10">Asset Mix</h3>
            <div className="h-[250px] w-full mb-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Heavy Duty', value: 45 },
                      { name: 'Light Van', value: 25 },
                      { name: 'Electric', value: 20 },
                      { name: 'Support', value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Heavy Duty', value: '45%', color: 'bg-sky-700' },
                { name: 'Light Van', value: '25%', color: 'bg-orange-500' },
                { name: 'Electric Delivery', value: '20%', color: 'bg-emerald-500' },
                { name: 'Support Units', value: '10%', color: 'bg-violet-500' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 ${item.color}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Feed */}
        <div className="p-8 bg-secondary text-white border border-border relative overflow-hidden">
          <div className="absolute inset-0 technical-grid opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-primary/20 text-primary border border-primary/30 text-[9px] font-black uppercase tracking-widest mb-4">
                <Activity size={10} className="animate-pulse" /> Live Telemetry Feed
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">99.8% Sync Efficiency</h4>
              <p className="text-white/40 text-sm font-medium">All nodes reporting nominal performance across the global infrastructure.</p>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-secondary bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-secondary bg-primary flex items-center justify-center text-[10px] font-black">
                +42
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
