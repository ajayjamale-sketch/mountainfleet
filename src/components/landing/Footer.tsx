import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Twitter, Linkedin, Facebook, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-24">
      <div className="container mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Logo variant="light" />
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            Rugged. Reliable. Real-time. The modern operating system for fleet, logistics and trip operations.
          </p>
          <div className="flex gap-3 mt-6">
            {[Twitter, Linkedin, Facebook, Github, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary/30 flex items-center justify-center transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/fleet" className="hover:text-white">Fleet</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/signup" className="hover:text-white">Get Started</Link></li>
            <li><a href="#" className="hover:text-white">Docs</a></li>
            <li><a href="#" className="hover:text-white">Status</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} MountainFleet. All rights reserved.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
            <Link to="/sla" className="hover:text-primary transition-colors">SLA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
