import FeaturesSection from "@/components/landing/feature";
import HeroSection from "@/components/landing/hero";
import PrivacySection from "@/components/landing/privacy";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <PrivacySection />
      <FeaturesSection />
    </div>
  );
}
