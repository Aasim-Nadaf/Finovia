import { Header } from "@/components/section/header";
import { HeroSection } from "@/components/section/hero";
import { ResumeAnalyzer } from "@/components/resume/resume-analyzer";
import { PlatformOverviewSection } from "@/components/section/platform-overview-section";
import { BentoStatsSection } from "@/components/section/bento-stats-section";
import { FinoviaPricingSection } from "@/components/section/finovia-pricing-section";
import { FinoviaTestimonialsSection } from "@/components/section/finovia-testimonials-section";
import { FinoviaNewsSection } from "@/components/section/finovia-news-section";
import { Footer } from "@/components/section/footer";

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8faf7] text-[#0e2118] selection:bg-[#bef264] selection:text-[#0e2118]">
      <Header />
      <main className="grow">
        <HeroSection />
        <ResumeAnalyzer />
        <PlatformOverviewSection />
        <BentoStatsSection />
        <FinoviaPricingSection />
        <FinoviaTestimonialsSection />
        <FinoviaNewsSection />
      </main>
      <Footer />
    </div>
  );
}

