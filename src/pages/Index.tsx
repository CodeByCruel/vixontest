import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollExperience from "@/components/landing/ScrollExperience";
import FeaturesShowcase from "@/components/landing/FeaturesShowcase";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import DiscordBanner from "@/components/landing/DiscordBanner";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-background">
      <SEOHead
        title="VixonCloud — Premium Game & VPS Hosting"
        description="High performance Minecraft, game and VPS hosting. 99.99% uptime, DDoS protection, instant deployment. Watch the infrastructure come alive."
        path="/"
      />
      <Navbar />
      <main>
        <ScrollExperience />
        {/* Existing features remain, revealed after the immersive scene */}
        <FeaturesShowcase />
        <TestimonialsSection />
        <DiscordBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
