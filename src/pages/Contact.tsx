import { PublicNavbar } from "@/components/landing/PublicNavbar";
import { Footer } from "@/components/landing/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back within 24 hours.");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 800);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Get in touch</h1>
          <p className="mt-4 text-slate-300 text-lg">We answer every message within one business day.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", value: "hello@mountainfleet.io" },
              { icon: Phone, title: "Phone", value: "+1 (720) 555 0100" },
              { icon: MapPin, title: "HQ", value: "1700 Pearl St, Denver CO" },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <c.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="p-7 rounded-2xl bg-card border border-border space-y-4">
            <Input placeholder="Your name" required />
            <Input type="email" placeholder="Your email" required />
            <Input placeholder="Company" />
            <textarea rows={5} placeholder="How can we help?" required className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>{loading ? "Sending…" : "Send message"}</Button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
