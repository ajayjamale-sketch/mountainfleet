import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, Handshake, Truck, DollarSign, HelpCircle, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/services", label: "Services", icon: Handshake },
  { to: "/fleet", label: "Fleet", icon: Truck },
  { to: "/pricing", label: "Pricing", icon: DollarSign },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/contact", label: "Contact", icon: Mail },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/"><Logo /></Link>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded-lg transition font-medium flex items-center gap-2 ${
                  isActive ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`
              }
            >
              <l.icon className="w-4 h-4 text-primary/70" />
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
          <Link to="/signup"><Button variant="primary" size="sm">Get Started</Button></Link>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between p-4">
              <Logo variant="light" />
              <button className="p-2 text-white" onClick={() => setOpen(false)}><X /></button>
            </div>
            <div className="flex flex-col gap-2 p-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-white text-xl font-semibold py-3 border-b border-white/10 flex items-center gap-3"
                >
                  <l.icon className="w-5 h-5 text-primary" />
                  <span>{l.label}</span>
                </Link>
              ))}
              <div className="flex gap-2 pt-4">
                <Link to="/login" className="flex-1" onClick={() => setOpen(false)}><Button variant="outline" className="w-full text-white border-white/20">Login</Button></Link>
                <Link to="/signup" className="flex-1" onClick={() => setOpen(false)}><Button variant="accent" className="w-full">Get Started</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
