import React, { useState } from "react";
import { HelpCircle, Search, BookOpen, MessageSquare, FileText, ChevronRight, ExternalLink, Mail } from "lucide-react";
import toast from "react-hot-toast";

const faqs = [
  { q: "How do I add a new vehicle to my fleet?", a: "Navigate to Fleet Management → Click 'Add Vehicle' → Fill in the vehicle details including model, license plate, and assign a driver." },
  { q: "How do I create a trip schedule?", a: "Go to Trip Manager → Click 'Create Trip' → Select origin, destination, vehicle, and driver. Set the departure time and the system will calculate the optimal route." },
  { q: "How do I submit an expense report?", a: "Navigate to Expenses → Click 'Submit Expense' → Upload receipts, categorize the expense, and submit for manager approval." },
  { q: "How do I track a vehicle in real-time?", a: "Go to Live Tracking → Select the vehicle from the map. You can view speed, location, ETA, and route history." },
  { q: "How do I generate reports?", a: "Navigate to Reports → Select the report type (Fleet, Financial, Trip) → Choose the date range and click 'Generate'. Reports can be exported as CSV or PDF." },
  { q: "How do I manage user roles?", a: "Go to User Management → Select a user → Click 'Edit Role'. Available roles are Admin, Fleet Manager, Driver, and Customer." },
];

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket submitted! We'll respond within 24 hours.");
    setContactForm({ subject: "", message: "" });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 px-6 py-8 text-white sm:px-8">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={20} />
            <span className="text-sm font-medium text-violet-200">Help & Support</span>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">How can we help you?</h1>
          <p className="mt-2 text-sm text-violet-100/80">Search our knowledge base or contact our support team.</p>
          <div className="mt-5 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 py-3 pl-12 pr-4 text-sm text-white placeholder:text-violet-200 outline-none backdrop-blur-sm focus:border-white/40"
              aria-label="Search help articles"
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: BookOpen, title: "Documentation", desc: "Platform guides and tutorials", color: "text-sky-500", bg: "bg-sky-500/10" },
          { icon: MessageSquare, title: "Live Chat", desc: "Chat with support team", color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { icon: FileText, title: "API Reference", desc: "Developer documentation", color: "text-violet-500", bg: "bg-violet-500/10" },
        ].map((item) => (
          <button
            key={item.title}
            onClick={() => toast.success(`${item.title} opened`)}
            className="premium-card-interactive p-5 text-left"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}>
              <item.icon size={20} className={item.color} />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">{item.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <span>{faq.q}</span>
                <ChevronRight size={16} className={`shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground bg-slate-50/50 dark:bg-slate-800/30 animate-slide-down">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
          )}
        </div>
      </div>

      {/* Contact Form */}
      <div className="premium-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Contact Support</h2>
        </div>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
            <input
              type="text"
              value={contactForm.subject}
              onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
              placeholder="Brief description of your issue"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Describe your issue in detail..."
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
              required
            />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;
