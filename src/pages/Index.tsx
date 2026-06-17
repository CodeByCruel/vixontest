import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection3D from "@/components/landing/HeroSection3D";
import TerminalDemo from "@/components/landing/TerminalDemo";
import InfrastructureShowcase from "@/components/landing/InfrastructureShowcase";
import GlobalNetwork from "@/components/landing/GlobalNetwork";
import MachinesSection from "@/components/landing/MachinesSection";
import LatencySection from "@/components/landing/LatencySection";
import NodesSection from "@/components/landing/NodesSection";
import FeaturesEnhanced from "@/components/landing/FeaturesEnhanced";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import DiscordBanner from "@/components/landing/DiscordBanner";
import PingTest from "@/components/PingTest";
import DiscordWidget from "@/components/DiscordWidget";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import PanelTour from "@/components/PanelTour";
import MoneyBackBadge from "@/components/MoneyBackBadge";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-background">
      <SEOHead
        title="VixonCloud — Premium Game & VPS Hosting"
        description="High performance Minecraft, game and VPS hosting. 99.99% uptime, DDoS protection, instant deployment on a global mesh network."
        path="/"
      />
      <Navbar />
      <main>
        <HeroSection3D />
        <MoneyBackBadge />
        <TerminalDemo />
        <InfrastructureShowcase />
        <PingTest />
        <GlobalNetwork />
        <MachinesSection />
        <BeforeAfterSlider />
        <LatencySection />
        <NodesSection />
        <PanelTour />
        <FeaturesEnhanced />
        <TestimonialsSection />
        <DiscordWidget />
        <DiscordBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
