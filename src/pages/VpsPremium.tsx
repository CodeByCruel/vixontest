import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SEOHead from "@/components/SEOHead";
import CurrencyConverter from "@/components/CurrencyConverter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Cpu, HardDrive, MapPin, MemoryStick, Network, Server, MessagesSquare, Wifi } from "lucide-react";
import { DISCORD_INVITE } from "@/lib/vixon";
import DiscordWidget from "@/components/DiscordWidget";

const plans = [
  { name: "8GB Plan", ram: "8GB DDR4 RAM", cpu: "2 vCores", storage: "50GB NVMe SSD", price: 500 },
  { name: "16GB Plan", ram: "16GB DDR4 RAM", cpu: "4 vCores", storage: "80GB NVMe SSD", price: 1100 },
  { name: "32GB Plan", ram: "32GB DDR4 RAM", cpu: "8 vCores", storage: "120GB NVMe SSD", price: 1800 },
  { name: "48GB Plan", ram: "48GB DDR4 RAM", cpu: "10 vCores", storage: "150GB NVMe SSD", price: 2300 },
  { name: "64GB Plan", ram: "64GB DDR4 RAM", cpu: "12 vCores", storage: "200GB NVMe SSD", price: 2600 },
  { name: "64GB Ultra Plan", ram: "64GB DDR4 RAM", cpu: "16 vCores", storage: "200GB NVMe SSD", price: 3100 },
];

const shared = [
  { icon: Server, text: "AMD Epyc 7K62" },
  { icon: Wifi, text: "Dedicated IPv4" },
  { icon: MapPin, text: "India, Mumbai" },
  { icon: Network, text: "Unmetered Bandwidth" },
  { icon: Network, text: "2GBPS Network Speed" },
];

const VpsPremium = () => {

  return (
    <div className="min-h-screen relative">
      <SEOHead title="Premium VPS Plans" description="High performance AMD EPYC Milan VPS in India with NVMe SSD, dedicated IPv4, unmetered bandwidth and 2GBPS network." path="/vps-premium" />
      <AnimatedBackground />
      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-10">
            <Badge className="mb-4 bg-primary/15 text-primary border border-primary/20"><Crown className="h-3.5 w-3.5 mr-1" /> PREMIUM VPS</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display">Premium VPS Plans</h1>
            <p className="mt-4 text-muted-foreground">AMD EPYC Milan VPS built for high performance, stable uptime, NVMe storage, and ultra-low latency.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {shared.map(({ icon: Icon, text }) => <span key={text} className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5 text-primary" />{text}</span>)}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="h-full border-primary/15 bg-card/70 card-lift">
                  <CardContent className="p-5 flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-bold font-display">{plan.name}</h2>
                        <p className="text-xs text-muted-foreground">AMD Epyc 7K62</p>
                      </div>
                      <div className="text-right shrink-0"><span className="text-2xl font-extrabold text-primary">₹{plan.price}</span><span className="text-xs text-muted-foreground">/mo</span></div>
                    </div>
                    <div className="space-y-2 text-sm flex-1">
                      {[{ icon: MemoryStick, text: plan.ram }, { icon: Cpu, text: plan.cpu }, { icon: HardDrive, text: plan.storage }, ...shared.slice(1)].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-2 text-muted-foreground"><Icon className="h-3.5 w-3.5 text-primary shrink-0" /><span className="text-xs">{text}</span></div>
                      ))}
                    </div>
                    <CurrencyConverter amount={plan.price} />
                    <Button onClick={() => window.open(DISCORD_INVITE, "_blank")} className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"><MessagesSquare className="h-4 w-4" /> Order on Discord</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="text-center lg:text-left max-w-md">
              <h2 className="text-2xl font-extrabold font-display mb-2">VPS is sold via Discord only <span>💬</span></h2>
              <p className="text-sm text-muted-foreground">Open a ticket in our Discord — premium VPS provisioning, billing & priority support live there.</p>
            </div>
            <DiscordWidget />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VpsPremium;