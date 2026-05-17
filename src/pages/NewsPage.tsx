import React, { useState } from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Newspaper, Globe, TrendingUp, Zap, Calendar, ArrowRight, Mail, Download, Share2, Phone, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const NewsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Technology", "Environment", "Market", "Corporate"];

  const articles = [
    { id: 0, title: "Autonomous Trucking: The Future of Long-Haul", category: "Technology", date: "May 12, 2026", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600" },
    { id: 1, title: "Sustainable Fuel: Hydrogen vs Electric", category: "Environment", date: "May 10, 2026", img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600" },
    { id: 2, title: "Global Supply Chain Disruptions: Q2 Report", category: "Market", date: "May 08, 2026", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" },
    { id: 3, title: "MountainFleet Expansion: New Hubs in Singapore", category: "Corporate", date: "May 05, 2026", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" },
    { id: 4, title: "Predictive Maintenance: AI Efficiency Gains", category: "Technology", date: "May 01, 2026", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600" },
    { id: 5, title: "Maritime Logistics: Port Congestion Easing", category: "Market", date: "April 28, 2026", img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=600" }
  ];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || art.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleMediaContact = () => {
    toast.success("Connecting to Media Relations Hub... Encrypted channel open.");
  };

  const handlePressKit = () => {
    toast.success("Press Asset Manifest (ZIP) download initiated.");
  };

  return (
    <PageSectionLayout
      banner={{
        title: "Logistics Intelligence",
        subtitle: "The latest news, trends, and insights from the world of global supply chain and fleet technology."
      }}
      main={{
        title: "Staying Ahead of the Curve",
        content: (
          <>
            <p>The world of logistics is changing faster than ever. From autonomous driving to sustainable fuels, we cover the topics that matter most to your business operations.</p>
            <p>Follow our journey as we expand into new markets, release cutting-edge dashboard features, and partner with the world's leading infrastructure companies.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Featured Insights",
        items: [
          { icon: Newspaper, title: "Industry Reports", desc: "Deep dives into quarterly logistics data and emerging market trends." },
          { icon: Globe, title: "Global Updates", desc: "Live updates on international shipping routes and port statuses." },
          { icon: TrendingUp, title: "Tech Trends", desc: "Expert analysis on how AI and blockchain are transforming supply chains." },
        ]
      }}
      cta={{
        title: "Never miss an update",
        subtitle: "Subscribe to our weekly digest and stay informed on the future of logistics.",
        buttonText: "Subscribe Now",
        link: "/register"
      }}
    >
      {/* 1. Latest Articles Grid with Filtering */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Latest Dispatch</h2>
              <p className="text-slate-500 font-medium">Real-time intelligence from the operational front lines.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative group flex-grow">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH DISPATCH..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-card border border-border pl-10 pr-4 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary border-primary text-white' : 'bg-card border-border text-slate-500 hover:border-primary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredArticles.map((art, i) => (
                <motion.div 
                  key={art.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group border border-border bg-card overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="aspect-video overflow-hidden relative transition-all duration-700">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1">
                      {art.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-bold uppercase tracking-widest">
                      <Calendar size={12} /> {art.date}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-6 group-hover:text-primary transition-colors min-h-[3.5rem]">{art.title}</h3>
                    <Link to={`/news/${art.id}`} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary dark:text-white cursor-pointer hover:text-primary transition-colors">
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <div className="py-20 text-center border border-dashed border-border">
              <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No intelligence matching your parameters.</p>
              <button 
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-4 text-primary font-bold uppercase tracking-widest text-[10px] border-b border-primary"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Newsletter Subscription */}
      <section className="py-16 sm:py-24 border-b border-border bg-secondary text-white overflow-hidden relative">
        <div className="absolute inset-0 technical-grid opacity-10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 bg-primary text-white flex items-center justify-center mx-auto mb-8">
            <Mail size={32} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-6">Logistics Intelligence</h2>
          <p className="text-white/40 font-medium mb-10 max-w-2xl mx-auto">Join 12,000+ logistics professionals receiving our weekly analysis on fleet tech and global markets.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="ENTER YOUR CORPORATE EMAIL" 
              className="flex-grow bg-white/5 border border-white/10 px-6 py-4 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              onClick={() => toast.success("Node successfully registered for Dispatch updates.")}
              className="bg-primary text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all"
            >
              Join Dispatch
            </button>
          </div>
        </div>
      </section>

      {/* 3. Industry Reports */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Technical<br /><span className="text-primary">Whitepapers.</span></h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12">Download our deep-dive analysis into the technology driving the next generation of fleet management.</p>
              
              <div className="space-y-4">
                {[
                  "2026 Fleet Decarbonization Roadmap",
                  "AI in Route Optimization: Efficiency Benchmarks",
                  "Cybersecurity in Telematics Infrastructure"
                ].map((report, i) => (
                  <div 
                    key={i} 
                    onClick={() => toast.success("Manifest download initiated.")}
                    className="flex items-center justify-between p-6 border border-border bg-card group hover:border-primary cursor-pointer transition-all"
                  >
                    <span className="text-sm font-black uppercase tracking-tight">{report}</span>
                    <Download size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-[4/5] bg-secondary border border-border overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1000" alt="Reports" className="w-full h-full object-cover opacity-50" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary p-8 text-white flex flex-col justify-end">
                <div className="text-4xl font-black mb-2">180+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Pages of Data</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Social Media Wall */}
      <section className="py-16 sm:py-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <Share2 className="text-primary" />
            <h2 className="text-xl font-black uppercase tracking-tight">Social Feed</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-background border border-border relative group overflow-hidden">
                <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 p-4 text-center">
                  <p className="text-[10px] text-white font-bold uppercase tracking-wider">Follow @MountainFleet for daily updates.</p>
                </div>
                <img 
                  src={`https://images.unsplash.com/photo-${["1586528116311-ad8dd3c8310d", "1506784983877-45594efa4cbe", "1519003722824-192d99a24bb7", "1521737604893-d14cc237f11d"][i-1]}?auto=format&fit=crop&q=80&w=400`} 
                  alt="Social" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                  onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=400")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Press Contact */}
      <section className="py-16 sm:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 bg-card p-12 border border-border">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Press & Media Kit</h2>
              <p className="text-xs text-slate-500 font-medium max-w-md">Need assets or an interview with our leadership team? Access our press kit or contact our media office.</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handlePressKit}
                className="flex items-center gap-3 border border-border px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all"
              >
                <Download size={16} /> Press Kit
              </button>
              <Link 
                to="/contact"
                className="flex items-center gap-3 bg-primary text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-secondary transition-all"
              >
                <Phone size={16} /> Media Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default NewsPage;
