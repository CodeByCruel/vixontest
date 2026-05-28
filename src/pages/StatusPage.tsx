import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ExternalLink } from "lucide-react";
import { refreshSettings, useStatusRedirect } from "@/lib/vixon";

const StatusPage = () => {
  const redirect = useStatusRedirect();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Force a fresh fetch on mount, then mark ready
    refreshSettings().finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready && redirect) {
      window.location.replace(redirect);
    }
  }, [ready, redirect]);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      <main className="pt-28 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs text-primary mb-6">
              <Activity className="h-3.5 w-3.5" /> System Status
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Service <span className="gradient-text">Status</span>
            </h1>

            {!ready ? (
              <Card className="p-10 mt-6">
                <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              </Card>
            ) : redirect ? (
              <Card className="p-8 mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Redirecting you to our live status page…
                </p>
                <a href={redirect} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 glow-primary"><ExternalLink className="h-4 w-4" /> Open Status Page</Button>
                </a>
              </Card>
            ) : (
              <Card className="p-10 mt-6 text-left sm:text-center">
                <p className="text-base text-foreground mb-2 font-medium">Status page not configured yet</p>
                <p className="text-sm text-muted-foreground">
                  Our team will publish a live status URL shortly. In the meantime, please reach out on Discord for any incidents.
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatusPage;
