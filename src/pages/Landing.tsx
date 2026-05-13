import { PublicNavbar } from "@/components/landing/PublicNavbar";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { FleetShowcaseSection } from "@/components/landing/FleetShowcaseSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTA } from "@/components/landing/CTA";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <FleetShowcaseSection />
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
