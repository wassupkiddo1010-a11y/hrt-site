import HeroSection from "@/components/home/HeroSection";
import GenderCards from "@/components/home/GenderCards";
import BenefitsBar from "@/components/home/BenefitsBar";
import SymptomsGrid from "@/components/home/SymptomsGrid";
import CarePathways from "@/components/home/CarePathways";
import TreatmentOptions from "@/components/home/TreatmentOptions";
import HowItWorks from "@/components/home/HowItWorks";
import ProductShowcase from "@/components/home/ProductShowcase";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GenderCards />
      <BenefitsBar />
      <SymptomsGrid />
      <CarePathways />
      <TreatmentOptions />
      <HowItWorks />
      <ProductShowcase />
      <WhyChoose />
      <Testimonials />
      <CTABanner />
    </>
  );
}
