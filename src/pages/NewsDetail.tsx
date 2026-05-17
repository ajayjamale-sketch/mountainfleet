import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, Share2, 
  MessageSquare, Download, Mail, Send,
  User, Facebook, Twitter, Linkedin
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NewsDetail() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (platform: string) => {
    toast.success(`Broadcasting to ${platform} network...`);
    setIsSharing(false);
  };

  const handleEmailShare = () => {
    toast.success("Dispatch manifest prepared for email transmission.");
  };

  const handleManifestAccess = () => {
    toast.success("Technical manifest decryption initiated. Check downloads.");
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    toast.success("Comment logged to local node. Syncing with global feed.");
    setComment("");
  };

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
            <a href="#comments" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
              <MessageSquare size={14} /> 14 Comments
            </a>
            <div className="flex-grow" />
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setIsSharing(!isSharing)}
                  className="p-2 hover:text-primary transition-colors"
                >
                  <Share2 size={18} />
                </button>
                <AnimatePresence>
                  {isSharing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full right-0 mb-2 bg-card border border-border p-2 flex gap-2 shadow-xl z-20"
                    >
                      <button onClick={() => handleShare('Twitter')} className="p-2 hover:bg-primary/10 hover:text-primary transition-colors"><Twitter size={14} /></button>
                      <button onClick={() => handleShare('Facebook')} className="p-2 hover:bg-primary/10 hover:text-primary transition-colors"><Facebook size={14} /></button>
                      <button onClick={() => handleShare('LinkedIn')} className="p-2 hover:bg-primary/10 hover:text-primary transition-colors"><Linkedin size={14} /></button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={handleEmailShare}
                className="p-2 hover:text-primary transition-colors"
              >
                <Mail size={18} />
              </button>
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
               "Autonomy is not about removing humans; it's about extending human capability to manage complexity at scale."
             </blockquote>
             <p className="text-base text-slate-500 font-medium leading-relaxed mb-8">As we look toward the 2027 roadmap, the focus shifts from individual vehicle intelligence to swarm-based coordination. This is where the true gains in throughput will be realized.</p>
          </div>

          <div className="p-12 bg-secondary text-white border border-border flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
            <div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-2">Deep-Dive Available</h4>
              <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Download the full technical whitepaper (PDF, 42MB)</p>
            </div>
            <button 
              onClick={handleManifestAccess}
              className="bg-primary text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all flex items-center gap-3"
            >
              <Download size={20} /> Access Manifest
            </button>
          </div>

          {/* Comments Section */}
          <section id="comments" className="border-t border-border pt-16">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-3">
              <MessageSquare className="text-primary" /> Intelligence Feed
            </h3>
            
            <form onSubmit={handlePostComment} className="mb-12">
              <div className="relative group">
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="LOG YOUR INTEL..."
                  rows={4}
                  className="w-full bg-card border border-border p-6 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-all resize-none"
                />
                <div className="absolute bottom-4 right-4">
                  <button 
                    type="submit"
                    className="w-12 h-12 bg-primary text-white flex items-center justify-center hover:bg-secondary transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-8">
              {[
                { user: "Sarah Jenkins", role: "Ops Director", time: "2h ago", text: "Brilliant analysis on Level 4 autonomy. We're seeing similar latency benchmarks in our northern route trials." },
                { user: "David Chen", role: "Fleet Engineer", time: "5h ago", text: "The network sync is the real bottleneck. Sub-20ms is impressive but maintaining that in remote areas is the challenge." }
              ].map((c, i) => (
                <div key={i} className="flex gap-6 p-8 bg-card border border-border group hover:border-primary transition-all">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest">{c.user}</span>
                      <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 font-bold uppercase">{c.role}</span>
                      <span className="text-[8px] text-slate-500 uppercase font-bold">{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
