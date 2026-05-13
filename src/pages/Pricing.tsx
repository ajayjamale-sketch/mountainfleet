import { PublicNavbar } from "@/components/landing/PublicNavbar";
import { Footer } from "@/components/landing/Footer";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTA } from "@/components/landing/CTA";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
}
