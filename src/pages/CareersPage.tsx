import React from 'react';
import PageSectionLayout from '../components/PageSectionLayout';
import { Briefcase, Heart, Globe, Zap, ArrowRight, UserPlus, Monitor, Coffee, Smile, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const CareersPage: React.FC = () => {
  return (
    <PageSectionLayout
      banner={{
        title: "Join the Elite Fleet",
        subtitle: "We are looking for innovators, problem-solvers, and logistics experts to build the future of global supply chains."
      }}
      main={{
        title: "Why Work With Us?",
        content: (
          <>
            <p>At MountainFleet, you'll be part of a mission-driven team working at the intersection of technology and physical infrastructure. We solve complex problems that impact millions of lives every day.</p>
            <p>We value ownership, transparency, and a relentless focus on customer success. Whether you're an engineer, an operations specialist, or a driver partner, you'll have the autonomy to make a real impact.</p>
          </>
        ),
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
      }}
      features={{
        title: "Our Culture & Benefits",
        items: [
          { icon: Heart, title: "Wellness First", desc: "Comprehensive health, dental, and vision insurance for you and your family." },
          { icon: Globe, title: "Remote Friendly", desc: "Work from anywhere in the world with our global distributed team." },
          { icon: Zap, title: "Hyper-Growth", desc: "Access to professional development budgets and rapid career advancement." },
        ]
      }}
      cta={{
        title: "Ready to start your journey?",
        subtitle: "Check out our open positions and find your place at MountainFleet.",
        buttonText: "View Openings",
        link: "/careers" // Point back to self or a specific careers hub
      }}
    >
      {/* 1. Open Roles Grid */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">Current<br />Openings</h2>
            <div 
              onClick={() => toast.info("Filter nodes synchronized.")}
              className="text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-2 cursor-pointer hover:text-secondary transition-colors"
            >
              Filter by Department
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { role: "Senior Frontend Engineer", dept: "Engineering", loc: "Remote / SF", type: "Full-time" },
              { role: "Product Designer (UI/UX)", dept: "Design", loc: "Berlin / Hub", type: "Full-time" },
              { role: "Logistics Ops Manager", dept: "Operations", loc: "Singapore", type: "Full-time" },
              { role: "Fullstack Developer", dept: "Engineering", loc: "Remote", type: "Contract" }
            ].map((job, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => toast.success("Application gateway initialized for " + job.role)}
                className="group p-8 border border-border bg-card flex flex-col sm:flex-row justify-between items-center hover:border-primary transition-all cursor-pointer"
              >
                <div className="text-center sm:text-left mb-6 sm:mb-0">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{job.role}</h3>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{job.dept}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">•</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{job.loc}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-secondary text-white">{job.type}</span>
                  <ArrowRight size={20} className="text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Work-Life Balance Section */}
      <section className="py-16 sm:py-24 border-b border-border bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-background border border-border overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" alt="Office Culture" className="w-full h-full object-cover grayscale opacity-50" />
              </div>
              <div className="absolute -bottom-8 -right-8 p-12 bg-primary text-white border border-border hidden sm:block">
                <Monitor size={64} />
              </div>
            </motion.div>
            
            <div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Designed for<br /><span className="text-primary">Human Performance.</span></h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Coffee, title: "Flexible Time", desc: "No core hours. Work when you are most productive." },
                  { icon: Monitor, title: "Tech Stipend", desc: "$3,000 yearly budget for your home office setup." },
                  { icon: Heart, title: "Mental Health", desc: "Access to top-tier coaching and therapy sessions." },
                  { icon: UserPlus, title: "Family Leave", desc: "16 weeks fully paid parental leave for all new parents." }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-primary mb-4"><item.icon size={24} /></div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Life at MountainFleet Gallery */}
      <section className="py-16 sm:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-16 text-center">Life inside the OS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
              "https://images.unsplash.com/photo-1554469384-e58fac16e23a",
              "https://images.unsplash.com/photo-1504384308090-c89e12bf9a51",
              "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square border border-border bg-card overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair"
              >
                <img src={`${img}?auto=format&fit=crop&q=80&w=400`} alt="Architecture" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interview Process */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4">The Path to Joining</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">Our process is designed to be transparent, fast, and respectful of your time.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Application", desc: "Submit your profile and portfolio for review." },
              { step: "02", title: "Initial Chat", desc: "A 30-min call to discuss alignment and role." },
              { step: "03", title: "Technical", desc: "Collaborative problem-solving with the team." },
              { step: "04", title: "Decision", desc: "Quick feedback and offer within 48 hours." }
            ].map((step, i) => (
              <div key={i} className="relative p-8 border border-border bg-background group hover:border-primary transition-colors">
                <div className="text-4xl font-black text-slate-100 dark:text-slate-800 absolute top-4 right-4 group-hover:text-primary/10 transition-colors">{step.step}</div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4 relative z-10">{step.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. D&I Statement */}
      <section className="py-16 sm:py-24 bg-secondary text-white border-b border-border overflow-hidden relative">
        <div className="absolute inset-0 technical-grid opacity-10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter mb-8">Built by<br />Everyone.</h2>
          <p className="text-white/40 text-lg font-medium leading-relaxed mb-12">We are committed to building a workforce that represents the global community we serve. Diversity isn't a metric at MountainFleet; it's our engine for innovation.</p>
          <div 
            onClick={() => toast.success("D&I Manifest downloading...")}
            className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
          >
            Our D&I Report 2026 <ChevronRight size={20} />
          </div>
        </div>
      </section>
    </PageSectionLayout>
  );
};

export default CareersPage;

