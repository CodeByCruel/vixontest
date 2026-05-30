import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import AnimatedBackground from "@/components/AnimatedBackground";
import { refreshDiscordInvite } from "@/lib/vixon";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ClerkRoot } from "@/integrations/clerk/ClerkRoot";

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
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const ProfilePage = lazy(() => import("./pages/dashboard/ProfilePage"));
const OrdersPage = lazy(() => import("./pages/dashboard/OrdersPage"));
const BillingPage = lazy(() => import("./pages/dashboard/BillingPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));
const SupportPage = lazy(() => import("./pages/dashboard/SupportPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const [showLoader, setShowLoader] = useState(() => typeof window !== "undefined" && document.readyState !== "complete");

  useEffect(() => {
    document.documentElement.classList.remove("light");
    try { localStorage.removeItem("vixon-theme"); } catch {}
    refreshDiscordInvite();
  }, []);

  useEffect(() => {
    if (!showLoader) return;
    const t = setTimeout(() => setShowLoader(false), 800);
    return () => clearTimeout(t);
  }, [showLoader]);

  const P = (el: JSX.Element, adminOnly = false) => <ProtectedRoute adminOnly={adminOnly}>{el}</ProtectedRoute>;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showLoader && <LoadingScreen onComplete={() => setShowLoader(false)} />}
        <BrowserRouter>
         <ClerkRoot>
          <AuthProvider>
            <AnimatedBackground />
            <CustomCursor />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/minecraft" element={<MinecraftHosting />} />
                <Route path="/minecraft-plans" element={<MinecraftPlans />} />
                <Route path="/bot-hosting" element={<BotHosting />} />
                <Route path="/bot-plans" element={<BotPlans />} />
                <Route path="/games" element={<AllGames />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/why-us" element={<WhyUsPage />} />
                <Route path="/tos" element={<TermsOfService />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/website-plans" element={<WebsitePlans />} />
                <Route path="/vps-starter" element={<VpsStarter />} />
                <Route path="/vps-premium" element={<VpsPremium />} />

                <Route path="/sign-in/*" element={<SignIn />} />
                <Route path="/sign-up/*" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/cart" element={<CartPage />} />
                <Route path="/dashboard" element={P(<Dashboard />)} />
                <Route path="/dashboard/profile" element={P(<ProfilePage />)} />
                <Route path="/dashboard/orders" element={P(<OrdersPage />)} />
                <Route path="/dashboard/billing" element={P(<BillingPage />)} />
                <Route path="/dashboard/settings" element={P(<SettingsPage />)} />
                <Route path="/dashboard/support" element={P(<SupportPage />)} />

                <Route path="/adminpagemeow/*" element={<AdminLogin />} />
                <Route path="/adminpagemeow/panel" element={P(<AdminPanel />, true)} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <BackToTop />
          </AuthProvider>
         </ClerkRoot>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
