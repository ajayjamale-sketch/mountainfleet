import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 gradient-hero text-white text-center">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, #F97316 0, transparent 30%), radial-gradient(circle at 80% 80%, #0EA5E9 0, transparent 30%)"
          }} />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to take your fleet to new heights?</h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">Join hundreds of forward-thinking operators using MountainFleet to grow revenue and cut costs.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/signup"><Button variant="accent" size="lg">Get started free<ArrowRight className="w-4 h-4" /></Button></Link>
              <Link to="/contact"><Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10">Talk to sales</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
