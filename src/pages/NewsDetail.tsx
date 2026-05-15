import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, User, Share2, 
  MessageSquare, ArrowRight, Download, Mail
} from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-primary selection:text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/news" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-12">
          <ChevronLeft size={14} /> Back to Dispatch
        </Link>

        <article>
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest">Technology</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dispatch ID: #N-2024-0512</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12">Autonomous Trucking: The Future of <span className="text-primary">Long-Haul.</span></h1>

          <div className="flex flex-wrap items-center gap-8 mb-16 py-6 border-y border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Marcus Thorne</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase">Lead Analyst</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <Calendar size={14} /> May 12, 2026
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <MessageSquare size={14} /> 14 Comments
            </div>
            <div className="flex-grow" />
            <div className="flex items-center gap-4">
              <button className="p-2 hover:text-primary transition-colors"><Share2 size={18} /></button>
              <button className="p-2 hover:text-primary transition-colors"><Mail size={18} /></button>
            </div>
          </div>

          <div className="aspect-video mb-16 border border-border overflow-hidden p-1 bg-card relative">
             <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" alt="Autonomous Truck" className="w-full h-full object-cover grayscale" />
             <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none mb-20">
             <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">The integration of Level 4 autonomy into heavy-duty logistical assets is no longer a theoretical exercise. It is becoming a core operational requirement for enterprises looking to scale efficiency in transcontinental transport.</p>
             <h2 className="text-2xl font-black uppercase tracking-tight text-secondary dark:text-white mb-6">Network Synchronization</h2>
             <p className="text-base text-slate-500 font-medium leading-relaxed mb-8">Current telemetry nodes allow for sub-20ms latency in decision-making cycles. When connected to the MountainFleet global orchestration layer, these autonomous units act as perfectly synchronized agents within a massive logistical hive mind.</p>
             <blockquote className="border-l-4 border-primary pl-8 my-12 italic text-2xl font-black tracking-tight text-secondary dark:text-white uppercase leading-tight">
               \"Autonomy is not about removing humans; it's about extending human capability to manage complexity at scale.\"
             </blockquote>
             <p className="text-base text-slate-500 font-medium leading-relaxed mb-8">As we look toward the 2027 roadmap, the focus shifts from individual vehicle intelligence to swarm-based coordination. This is where the true gains in throughput will be realized.</p>
          </div>

          <div className="p-12 bg-secondary text-white border border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-2">Deep-Dive Available</h4>
              <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Download the full technical whitepaper (PDF, 42MB)</p>
            </div>
            <button className="bg-primary text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all flex items-center gap-3">
              <Download size={20} /> Access Manifest
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
