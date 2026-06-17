import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackToTop from "@/components/BackToTop";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import AnimatedBackground from "@/components/AnimatedBackground";
import ErrorBoundary from "@/components/ErrorBoundary";
import { refreshDiscordInvite } from "@/lib/vixon";

const Index = lazy(() => import("./pages/Index"));
const MinecraftHosting = lazy(() => import("./pages/MinecraftHosting"));
const MinecraftPlans = lazy(() => import("./pages/MinecraftPlans"));
const BotHosting = lazy(() => import("./pages/BotHosting"));
const BotPlans = lazy(() => import("./pages/BotPlans"));
const AllGames = lazy(() => import("./pages/AllGames"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const WhyUsPage = lazy(() => import("./pages/WhyUsPage"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const StatusPage = lazy(() => import("./pages/StatusPage"));
const WebsitePlans = lazy(() => import("./pages/WebsitePlans"));
const VpsStarter = lazy(() => import("./pages/VpsStarter"));
const VpsPremium = lazy(() => import("./pages/VpsPremium"));
const MinecraftTierPage = lazy(() => import("./pages/MinecraftTierPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));
const AffiliatePage = lazy(() => import("./pages/AffiliatePage"));

const BenchmarksPage = lazy(() => import("./pages/BenchmarksPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const [showLoader, setShowLoader] = useState(() => typeof window !== "undefined" && document.readyState !== "complete");

  useEffect(() => {
    const saved = localStorage.getItem("vixon-theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    refreshDiscordInvite();
  }, []);

  useEffect(() => {
    if (!showLoader) return;
    const t = setTimeout(() => setShowLoader(false), 800);
    return () => clearTimeout(t);
  }, [showLoader]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showLoader && <LoadingScreen onComplete={() => setShowLoader(false)} />}
        <BrowserRouter>
        <KeyboardShortcuts />
        <ScrollProgress />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <AnimatedBackground />
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <div id="main-content">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/minecraft" element={<MinecraftHosting />} />
                <Route path="/minecraft-plans" element={<MinecraftPlans />} />
                <Route path="/minecraft-starter" element={<MinecraftTierPage tier="starter" />} />
                <Route path="/minecraft-standard" element={<MinecraftTierPage tier="standard" />} />
                <Route path="/minecraft-premium" element={<MinecraftTierPage tier="premium" />} />
                <Route path="/bot-hosting" element={<BotHosting />} />
                <Route path="/bot-plans" element={<BotPlans />} />
                <Route path="/games" element={<AllGames />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/why-us" element={<WhyUsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/affiliate" element={<AffiliatePage />} />
                <Route path="/benchmarks" element={<BenchmarksPage />} />
                <Route path="/website-plans" element={<WebsitePlans />} />
                <Route path="/vps-starter" element={<VpsStarter />} />
                <Route path="/vps-premium" element={<VpsPremium />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/tos" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </div>
            </Suspense>
          </ErrorBoundary>
          <BackToTop />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
