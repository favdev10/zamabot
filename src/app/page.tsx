import Footer from "@/components/common/footer";
import Header from "@/components/common/header/Header";
import FeaturesSection from "@/components/landing/feature";
import HeroSection from "@/components/landing/hero";
import PrivacySection from "@/components/landing/privacy";

export default function Home() {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <PrivacySection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
