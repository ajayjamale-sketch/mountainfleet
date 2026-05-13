import { motion } from "framer-motion";
import { Map, Truck, Users, Calendar, Fuel, Wrench, CreditCard, Bell, BarChart3, Shield, Zap, Globe } from "lucide-react";

const features = [
  { icon: Map, title: "Live GPS Tracking", desc: "Real-time vehicle positions with breadcrumb history and geo-fences.", color: "from-sky-500 to-cyan-500" },
  { icon: Truck, title: "Fleet Operations", desc: "Manage vehicles, documents, insurance & inspections in one place.", color: "from-orange-500 to-amber-500" },
  { icon: Users, title: "Driver Management", desc: "Onboarding, performance scoring, shifts and license verification.", color: "from-emerald-500 to-teal-500" },
  { icon: Calendar, title: "Trip & Bookings", desc: "Schedule, optimize routes and accept customer bookings 24/7.", color: "from-violet-500 to-fuchsia-500" },
  { icon: Fuel, title: "Fuel & Expenses", desc: "Capture fuel logs, approvals and operational cost analytics.", color: "from-rose-500 to-pink-500" },
  { icon: Wrench, title: "Maintenance", desc: "Service reminders, workshop tracking and downtime control.", color: "from-amber-500 to-yellow-500" },
  { icon: CreditCard, title: "Billing & Payouts", desc: "Invoices, driver payouts, commissions and revenue dashboards.", color: "from-indigo-500 to-blue-500" },
  { icon: Bell, title: "Smart Alerts", desc: "Speed, idle, geo-fence and SLA alerts pushed in real-time.", color: "from-red-500 to-orange-500" },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Exportable, interactive reports across every operations KPI.", color: "from-teal-500 to-emerald-500" },
];

export function Features() {
  return (
    <section className="py-24 topo-bg">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3 h-3" />All-in-one platform
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Everything you need to run a modern fleet</h2>
          <p className="mt-4 text-muted-foreground">From dispatch to delivery — orchestrate every vehicle, driver, trip and dollar in one beautiful workspace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden"
            >
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
