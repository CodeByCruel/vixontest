import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SEOHead from "@/components/SEOHead";
import MoneyBackBadge from "@/components/MoneyBackBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, Sparkles, Zap, Cpu, Check } from "lucide-react";

const tiers = [
 {
 slug: "starter", emoji: "", name: "Starter", price: "₹20/GB",
 cpu: "Intel Platinum 8269-CY",
 desc: "Best value for small SMPs, friends-only worlds and lightweight modpacks.",
 accent: "from-green-500/15 to-emerald-500/5 border-green-500/30",
 badge: "bg-green-500/15 text-green-400",
 perks: ["From ₹40/mo", "Up to ~150 players", "DDoS Protected", "Instant setup"],
 },
 {
 slug: "standard", emoji: "", name: "Standard", price: "₹40/GB",
 cpu: "AMD EPYC 7K62",
 desc: "The sweet spot. High clocks, NVMe SSDs, ideal for active modded servers & networks.",
 accent: "from-blue-500/15 to-cyan-500/5 border-blue-500/30",
 badge: "bg-blue-500/15 text-blue-400",
 perks: ["From ₹80/mo", "4.2 GHz boost CPU", "DDR4 RAM", "Most popular ⭐"],
 featured: true,
 },
 {
 slug: "premium", emoji: "", name: "Premium", price: "₹55/GB",
 cpu: "AMD EPYC 9754 96C/192T",
 desc: "Absolute top-tier. Monster core counts, priority support, built for massive networks.",
 accent: "from-amber-500/15 to-orange-500/5 border-amber-500/30",
 badge: "bg-amber-500/15 text-amber-400",
 perks: ["From ₹110/mo", "EPYC 96-core CPU", "Priority support", "Highest performance"],
 },
];

const MinecraftPlans = () => (
 <div className="min-h-screen relative">
 <SEOHead title="Minecraft Hosting Plans — Starter, Standard & Premium" description="Choose Starter, Standard, or Premium Minecraft hosting. NVMe SSDs, DDoS protection, instant setup. From ₹40/month." path="/minecraft-plans" />
 <AnimatedBackground />
 <Navbar />
 <main className="pt-24 pb-20 relative z-10">
 <div className="container mx-auto px-4 max-w-6xl">
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
 <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs text-primary mb-6">
 MINECRAFT HOSTING
 </div>
 <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-display">
 Pick your <span className="gradient-text">Minecraft tier</span>
 </h1>
 <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
 Three tiers, one purpose — get the smoothest Minecraft experience. Each tier has its own page with full plan list, specs and pricing.
 </p>
 </motion.div>

 <div className="grid gap-6 md:grid-cols-3">
 {tiers.map((t, i) => (
 <motion.div key={t.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
 <Card className={`p-6 h-full flex flex-col card-lift bg-gradient-to-br ${t.accent} relative overflow-hidden card-theme-minecraft`}>
 {t.featured && (
 <div className="absolute top-3 right-3 text-[10px] font-bold text-blue-300 bg-blue-500/20 border border-blue-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
 <Sparkles className="h-3 w-3" /> POPULAR
 </div>
 )}
 <div className="relative z-10">
 <div className="text-4xl mb-3">{t.emoji}</div>
 <div className={`inline-flex w-fit items-center text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md ${t.badge} mb-2`}>{t.price}</div>
 <h2 className="text-2xl font-extrabold font-display">{t.name}</h2>
 <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Cpu className="h-3 w-3" /> {t.cpu}</p>
 <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{t.desc}</p>

 <ul className="mt-4 space-y-1.5 flex-1">
 {t.perks.map(p => (
 <li key={p} className="flex items-center gap-2 text-xs text-foreground/80">
 <Check className="h-3.5 w-3.5 text-primary shrink-0" /> {p}
 </li>
 ))}
 </ul>

 <Link to={`/minecraft-${t.slug}`} className="mt-5">
 <Button className="w-full gap-2 glow-primary bg-primary text-primary-foreground hover:bg-primary/90 group">
 View {t.name} plans <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
 </Button>
 </Link>
 </div>
 </Card>
 </motion.div>
 ))}
 </div>

 <div className="mt-12">
  <MoneyBackBadge />
 </div>

 <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-8">
 <div className="text-center lg:text-left max-w-md">
 <h2 className="text-2xl font-extrabold font-display mb-2">Talk to us live </h2>
 <p className="text-sm text-muted-foreground">Join the VixonCloud Discord — get help picking, custom pricing, and instant support.</p>
 </div>
 </div>
 </div>
 </main>
 <Footer />
 </div>
);

export default MinecraftPlans;
