import Hero from "@/components/hero/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import SolutionsSection from "@/components/sections/SolutionsSection";
import Ticker from "@/components/sections/Ticker";
import Story from "@/components/sections/Story";
import LiveStats from "@/components/sections/LiveStats";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import FraudRadar from "@/components/sections/FraudRadar";
import Terminal from "@/components/sections/Terminal";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <SolutionsSection />
      <Story />
      <Ticker />
      <Terminal />
      <FraudRadar />
      <LiveStats />
      <HorizontalShowcase />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  );
}
