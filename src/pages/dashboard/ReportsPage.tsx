import React, { useState, useMemo } from 'react';
import { 
  FileText, Download, TrendingUp, BarChart3, Calendar, 
  Search, Zap, Shield, Activity, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, Filter, ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, BarChart, Bar
} from 'recharts';
import { toast } from 'react-hot-toast';

// --- Mock Data ---

const generateMainChartData = (points: number) => {
  return Array.from({ length: points }).map((_, i) => ({
    name: `Day ${i + 1}`,
    volume: Math.floor(Math.random() * 5000) + 2000,
    efficiency: Math.floor(Math.random() * 100) + 800,
  }));
};

const generateSparklineData = () => {
  return Array.from({ length: 14 }).map(() => ({
    value: Math.floor(Math.random() * 100),
  }));
};

const intelligenceFeeds = [
  { id: 'SYNC-928', type: 'Fleet Utilization', node: 'HQ-Alpha', status: 'Optimal', delta: '+4.2%', size: '2.4 MB', timestamp: '10 mins ago' },
  { id: 'SYNC-927', type: 'Revenue Hub', node: 'Global-Net', status: 'Warning', delta: '-1.8%', size: '1.8 MB', timestamp: '45 mins ago' },
  { id: 'SYNC-926', type: 'Integrity Audit', node: 'Sector-4', status: 'Optimal', delta: '+0.4%', size: '3.1 MB', timestamp: '2 hours ago' },
  { id: 'SYNC-925', type: 'Efficiency Delta', node: 'HQ-Beta', status: 'Optimal', delta: '+2.1%', size: '0.9 MB', timestamp: '5 hours ago' },
  { id: 'SYNC-924', type: 'Fuel Consumption', node: 'Global-Net', status: 'Critical', delta: '-5.5%', size: '4.2 MB', timestamp: '12 hours ago' },
];

// --- Sub-components ---

const Sparkline = ({ data, color }: { data: Record<string, unknown>[]; color: string }) => (
  <div className="h-12 w-full mt-4 opacity-60">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('30D');
  const [activeTab, setActiveTab] = useState<'volume' | 'efficiency'>('volume');

  const mainData = useMemo(() => {
    const points = timeRange === '7D' ? 7 : timeRange === '30D' ? 30 : 90;
    return generateMainChartData(points);
  }, [timeRange]);

  const handleDownload = (id: string) => {
    toast.success(`DOWNLOADING MANIFEST: ${id}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <h1 className="text-3xl lg:text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none">
              Analytics Hub
            </h1>
            <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Sync</span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
            High-fidelity operational telemetry & financial modeling
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex bg-card border border-border p-1 rounded-lg shadow-sm">
            {['7D', '30D', '90D'].map((range) => (
              <button 
                key={range}
                onClick={() => setTimeRange(range as '7D' | '30D' | '90D')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-md ${
                  timeRange === range 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-slate-500 hover:text-secondary dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => toast.success('EXPORTING FULL DATASET')}
            className="bg-secondary dark:bg-white text-white dark:text-secondary px-6 py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all hover:opacity-90 flex items-center gap-2 shadow-lg"
          >
            <Download size={14} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Grid with Micro-charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Volume', value: '24,592', delta: '+12.5%', isUp: true, icon: BarChart3, color: '#0ea5e9' },
          { label: 'Active Fleet', value: '1,482', delta: '+4.2%', isUp: true, icon: Zap, color: '#10b981' },
          { label: 'Fuel Efficiency', value: '8.4 MPG', delta: '-1.8%', isUp: false, icon: Activity, color: '#f43f5e' },
          { label: 'System Uptime', value: '99.99%', delta: '0.0%', isUp: true, icon: Shield, color: '#8b5cf6' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl text-slate-500 dark:text-slate-400">
                <stat.icon size={18} />
              </div>
              <div className={`flex items-center space-x-1 text-[10px] font-black tracking-widest px-2 py-1 rounded-lg ${
                stat.isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                <span>{stat.delta}</span>
              </div>
            </div>
            
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-secondary dark:text-white tracking-tighter">{stat.value}</p>
            
            <Sparkline data={generateSparklineData()} color={stat.color} />
          </motion.div>
        ))}
      </div>

      {/* 3. Main Chart Area */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-black text-secondary dark:text-white uppercase tracking-tighter">Operational Telemetry</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cross-node performance distribution</p>
          </div>
          
          <div className="flex bg-slate-50 dark:bg-white/5 border border-border p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('volume')}
              className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-md flex items-center gap-2 ${
                activeTab === 'volume' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500 hover:text-secondary'
              }`}
            >
              <BarChart3 size={14} />
              Volume
            </button>
            <button 
              onClick={() => setActiveTab('efficiency')}
              className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-md flex items-center gap-2 ${
                activeTab === 'efficiency' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500 hover:text-secondary'
              }`}
            >
              <TrendingUp size={14} />
              Efficiency
            </button>
          </div>
        </div>

        <div className="p-6 lg:p-8 h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'volume' ? (
              <AreaChart data={mainData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  itemStyle={{ color: '#0ea5e9', fontWeight: '900' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            ) : (
              <BarChart data={mainData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                  contentStyle={{ 
                    background: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Bar dataKey="efficiency" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Intelligence Feed Data Table */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <FileText size={18} />
            </div>
            <h3 className="text-lg font-black text-secondary dark:text-white uppercase tracking-tighter">Intelligence Feed</h3>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search feeds..." 
                className="w-full sm:w-64 bg-slate-50 dark:bg-slate-900 border border-border pl-9 pr-4 py-2 rounded-lg text-xs font-medium focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button className="p-2 border border-border rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.02] border-b border-border">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Node ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Report Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Origin</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Delta</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {intelligenceFeeds.map((feed) => (
                <tr key={feed.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-secondary dark:text-white">{feed.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-secondary dark:text-slate-200">{feed.type}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{feed.size} • {feed.timestamp}</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {feed.node}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                      feed.status === 'Optimal' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                        : feed.status === 'Warning'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}>
                      {feed.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${feed.delta.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {feed.delta}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDownload(feed.id)}
                        className="p-1.5 text-slate-400 hover:text-primary transition-colors bg-white dark:bg-slate-800 rounded shadow-sm border border-border"
                        title="Download Manifest"
                      >
                        <Download size={14} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-secondary transition-colors bg-white dark:bg-slate-800 rounded shadow-sm border border-border">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border bg-slate-50/50 dark:bg-white/[0.02] flex justify-center">
           <button className="text-[10px] font-black text-slate-500 hover:text-primary uppercase tracking-widest flex items-center gap-1 transition-colors">
              Load Previous Records <ChevronDown size={14} />
           </button>
        </div>
      </div>
      
    </div>
  );
};

export default ReportsPage;
