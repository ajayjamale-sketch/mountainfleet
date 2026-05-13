import { PublicNavbar } from "@/components/landing/PublicNavbar";
import { Footer } from "@/components/landing/Footer";
import { FAQSection } from "@/components/landing/FAQSection";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <FAQSection />
      <Footer />
    </div>
  );
}
