import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import CurrencyConverter from "@/components/CurrencyConverter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot, HardDrive, Shield, Wifi, MemoryStick, ShoppingCart, Sparkles,
  Check, Zap, Crown, MessageCircle,
} from "lucide-react";

const BILLING_URL = "https://billing.vixoncloud.com";
const DISCORD_LINK = "https://discord.gg/TtV26hZEJx";

const botPlans = [
  {
    name: "Starter",
    price: 25,
    ram: "512 MB",
    storage: "2.5 GB NVMe",
    cpu: "Shared Core",
    features: ["Optimized for Discord Bots", "512 MB DDR4 RAM", "2.5 GB NVMe Storage", "DDoS Protection", "99.99% Uptime", "Instant Setup"],
    accent: "from-green-500/10 to-emerald-500/5",
    border: "border-green-500/25",
    badge: "bg-green-500/15 text-green-400",
    priceColor: "text-green-400",
    iconColor: "text-green-400",
    btn: "bg-green-500/15 hover:bg-green-500/25 text-green-300 border border-green-500/35",
    popular: false,
  },
  {
    name: "Intermediate",
    price: 50,
    ram: "1 GB",
    storage: "5 GB NVMe",
    cpu: "Shared Core",
    features: ["Optimized for Discord Bots", "1 GB DDR4 RAM", "5 GB NVMe Storage", "DDoS Protection", "99.99% Uptime", "Instant Setup", "Priority Support"],
    accent: "from-primary/15 to-cyan-500/5",
    border: "border-primary/30",
    badge: "bg-primary/15 text-primary",
    priceColor: "text-primary",
    iconColor: "text-primary",
    btn: "glow-primary bg-primary text-primary-foreground hover:bg-primary/90",
    popular: true,
  },
  {
    name: "Advanced",
    price: 100,
    ram: "2 GB",
    storage: "10 GB NVMe",
    cpu: "Dedicated Core",
    features: ["Optimized for Discord Bots", "2 GB DDR4 RAM", "10 GB NVMe Storage", "DDoS Protection", "99.99% Uptime", "Instant Setup", "Priority Support", "Custom Domain"],
    accent: "from-amber-500/10 to-orange-500/5",
    border: "border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-400",
    priceColor: "text-amber-400",
    iconColor: "text-amber-400",
    btn: "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/35",
    popular: false,
  },
];

const BotPlans = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs text-primary mb-6">
              <Bot className="h-3.5 w-3.5" /> BOT HOSTING
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display">
              Bot Hosting <span className="gradient-text">Plans</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Reliable, always-on hosting for your Discord bots. All plans include DDR4 RAM, NVMe storage, DDoS protection, and 99.99% uptime.
            </p>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {botPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-primary text-primary-foreground text-[10px] font-bold gap-1 px-3 py-1 shadow-lg shadow-primary/20">
                      <Sparkles className="h-3 w-3" /> MOST POPULAR
                    </Badge>
                  </div>
                )}
                <Card className={`h-full bg-gradient-to-br ${plan.accent} ${plan.border} border card-lift transition-all duration-300 ${plan.popular ? "ring-1 ring-primary/30 shadow-lg shadow-primary/10" : ""} card-theme-bot`}>
                  <CardContent className="p-6 flex flex-col h-full relative z-10">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex rounded-xl p-3 mb-3 bg-background/40`}>
                        <Bot className={`h-6 w-6 ${plan.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-extrabold font-display">{plan.name}</h3>
                      <div className="mt-3 flex items-baseline justify-center gap-1">
                        <span className={`font-extrabold text-4xl ${plan.priceColor} font-display`}>₹{plan.price}</span>
                        <span className="text-xs text-muted-foreground">/mo</span>
                      </div>
                      <CurrencyConverter amount={plan.price} />
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {[
                        { icon: MemoryStick, text: `${plan.ram} DDR4` },
                        { icon: HardDrive, text: plan.storage },
                        { icon: Shield, text: "DDoS Protected" },
                        { icon: Wifi, text: "99.99% Uptime" },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background/30 rounded-lg px-2.5 py-2">
                          <Icon className={`h-3 w-3 ${plan.iconColor} shrink-0`} />{text}
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                          <Check className={`h-3.5 w-3.5 ${plan.iconColor} shrink-0`} />{f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      onClick={() => window.open(BILLING_URL, "_blank")}
                      className={`w-full gap-2 text-xs font-semibold tracking-wider ${plan.btn}`}
                      variant="outline"
                      size="lg"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Order Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 glass rounded-xl px-6 py-4">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-semibold">Need a custom plan?</p>
                <p className="text-xs text-muted-foreground">Join our Discord — we'll set up exactly what you need.</p>
              </div>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="glow-primary gap-1.5 text-xs font-semibold">
                  <Zap className="h-3.5 w-3.5" /> Get Started
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BotPlans;
