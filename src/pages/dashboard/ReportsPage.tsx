import React, { useMemo } from 'react';
import { FileText, Download, TrendingUp, BarChart3, PieChart as PieIcon, Calendar, ArrowUpRight, Search, Zap, Shield, FileCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

const ReportsPage: React.FC = () => {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = React.useState<'30D' | '90D'>('30D');

  const data = useMemo(() => {
    const multiplier = timeRange === '90D' ? 2.5 : 1;
    return [
      { name: 'FUEL OPS', value: 4000 * multiplier },
      { name: 'PERSONNEL', value: 3000 * multiplier },
      { name: 'FLEET MAINT.', value: 2000 * multiplier },
      { name: 'ORCHESTRATION', value: 2780 * multiplier },
      { name: 'INTELLIGENCE', value: 1890 * multiplier },
    ];
  }, [timeRange]);

  const reports = [
    { id: 'R-01', title: 'Global Fleet Utilization', date: 'MAY 2024', type: 'OPERATIONAL', size: '2.4 MB', icon: Zap },
    { id: 'R-02', title: 'Revenue Hub Sync', date: 'Q2 2024', type: 'FINANCIAL', size: '1.8 MB', icon: TrendingUp },
    { id: 'R-03', title: 'Personnel Integrity Audit', date: 'MAY 2024', type: 'PERFORMANCE', size: '3.1 MB', icon: Shield },
    { id: 'R-04', title: 'Efficiency Delta Report', date: 'APR 2024', type: 'SYSTEM', size: '0.9 MB', icon: FileCheck },
  ];

  const handleDownload = (report: any) => {
    const csvContent = `ID,Title,Type,Size,Date\n${report.id},${report.title},${report.type},${report.size},${report.date}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${report.title.toLowerCase().replace(/ /g, '_')}_manifest.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`DOWNLOADING: ${report.title.toUpperCase()}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-3xl lg:text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase leading-none mb-3">Intelligence Archive</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">Audit and export high-fidelity datasets // Network orchestration</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative hidden xl:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH ARCHIVE..." 
              className="bg-card border border-border pl-12 pr-6 py-3.5 text-[10px] uppercase tracking-widest outline-none focus:border-primary transition-all font-black w-64" 
            />
          </div>
          <button 
            onClick={() => toast.success('AUDIT PROTOCOL SCHEDULED // SYNCING WITH HQ')}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 font-bold text-[10px] uppercase tracking-widest transition-all active:translate-y-[1px] flex items-center justify-center space-x-3 shadow-lg shadow-primary/20"
          >
            <Calendar size={16} />
            <span>Schedule Audit</span>
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Archived Logs', value: '14,284', icon: FileText, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Active Syncs', value: '12', icon: BarChart3, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Payload Points', value: '8.4M', icon: Zap, color: 'text-accent', bg: 'bg-accent/5' },
          { label: 'Node Health', value: '98%', icon: Activity, color: 'text-accent', bg: 'bg-accent/5' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border p-8 hover:border-primary transition-all group relative overflow-hidden"
          >
            <div className={`p-3 ${stat.bg} ${stat.color} border border-current/10 w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-all`}>
              <stat.icon size={22} />
            </div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-black text-secondary dark:text-white tracking-tighter uppercase">{stat.value}</p>
              <ArrowUpRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Visual Analytics */}
        <div className="lg:col-span-8 bg-card border border-border p-8 lg:p-12 shadow-sm">
          <div className="flex items-center justify-between mb-12 border-b border-border pb-6">
            <div>
              <h3 className="text-xl font-black text-secondary dark:text-white uppercase tracking-tighter">Throughput Distribution</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cross-node operational telemetry</p>
            </div>
            <div className="flex bg-slate-50 dark:bg-white/5 border border-border p-1">
              <button 
                onClick={() => setTimeRange('30D')}
                className={`px-5 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${timeRange === '30D' ? 'bg-white dark:bg-slate-800 border border-border shadow-sm text-primary' : 'text-slate-500 hover:text-secondary'}`}
              >
                30D
              </button>
              <button 
                onClick={() => setTimeRange('90D')}
                className={`px-5 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${timeRange === '90D' ? 'bg-white dark:bg-slate-800 border border-border shadow-sm text-primary' : 'text-slate-500 hover:text-secondary'}`}
              >
                90D
              </button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} fontWeight="black" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} fontWeight="black" tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(3, 105, 161, 0.05)' }}
                  contentStyle={{ 
                    background: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0px',
                    fontSize: '10px',
                    fontWeight: '900',
                    textTransform: 'uppercase'
                  }}
                />
                <Bar dataKey="value" radius={[0, 0, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 || index === 3 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Intelligence List */}
        <div className="lg:col-span-4 bg-secondary dark:bg-slate-900 border border-border p-8 flex flex-col shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 text-white/5 pointer-events-none group-hover:scale-150 transition-transform duration-1000">
              <FileCheck size={140} />
           </div>
           
           <div className="mb-10 relative z-10 border-b border-white/10 pb-6">
              <h3 className="text-xl font-black text-white tracking-tighter uppercase">Audit Manifest</h3>
              <p className="text-accent text-[9px] font-black uppercase tracking-widest mt-1">Status: High Fidelity Sync</p>
           </div>

           <div className="space-y-3 relative z-10 flex-grow">
              {reports.map((report, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className="p-4 bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all group cursor-pointer"
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    <div className="w-10 h-10 bg-primary/20 text-primary flex items-center justify-center">
                      <report.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-black text-white group-hover:text-accent transition-colors truncate">{report.title}</p>
                      <p className="text-[8px] text-white/60 font-black uppercase tracking-widest mt-1.5">{report.type} // {report.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownload(report)}
                    className="p-2.5 text-white/20 hover:text-white hover:bg-primary transition-all"
                  >
                    <Download size={16} />
                  </button>
                </motion.div>
              ))}
           </div>
           
           <div className="mt-8 relative z-10">
              <button 
                onClick={() => {
                  toast.success('PROTOCOL AUDIT INITIALIZED // CALCULATING DELTA');
                  handleDownload({ id: 'FULL-AUDIT', title: 'Full Protocol Audit', date: 'LIVE', type: 'SYSTEM', size: '12.4 MB' });
                }}
                className="w-full py-4 bg-accent hover:bg-accent/90 text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-accent/20 active:translate-y-[1px]"
              >
                Initialize Protocol Audit
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
