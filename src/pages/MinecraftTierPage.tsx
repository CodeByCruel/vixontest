import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import CurrencyConverter from "@/components/CurrencyConverter";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, Shield, Wifi, MemoryStick, ShoppingCart, Crown, Check, Sparkles, Zap, Rocket, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Plan { ram: string; ramGb: number; price: number; storage: string; players: number; cpu: string; }

const getPlayers = (r: number) => r <= 4 ? 40 : r <= 8 ? 80 : r <= 16 ? 160 : r <= 24 ? 300 : 500;

const makePlans = (cpu: string, pricePerGb: number): Plan[] =>
 [2, 4, 6, 8, 10, 12, 16, 18, 20, 22, 24, 26, 28, 30, 32].map(r => ({
 ram: `${r} GB`, ramGb: r, price: r * pricePerGb,
 storage: `${r * 5} GB NVMe`, players: getPlayers(r), cpu,
 }));

type Tier = "starter" | "standard" | "premium";

const tierConfig: Record<Tier, {
 title: string; emoji: string; tagline: string; pricePerGb: number; cpu: string;
 card: string; badge: string; price: string; icon: string; btn: string; chip: string; glow: string;
 blurb: string;
}> = {
 starter: {
 title: "Starter", emoji: "", tagline: "Affordable Minecraft hosting that just works.",
 pricePerGb: 20, cpu: "Intel Xeon E5-2699 v4 3.2GHz",
 card: "border-green-500/25 bg-gradient-to-br from-green-500/8 to-emerald-500/4",
 badge: "bg-green-500/15 text-green-400 border-green-500/30",
 price: "text-green-400", icon: "text-green-400",
 btn: "bg-green-500/20 hover:bg-green-500/30 text-green-200 border border-green-500/40",
 chip: "from-green-500/20 to-emerald-500/10 border-green-500/30",
 glow: "shadow-green-500/15",
 blurb: "Perfect for small SMP servers, friends-only worlds and modpacks up to ~25 players. Reliable performance at the lowest price.",
 },
 standard: {
 title: "Standard", emoji: "", tagline: "Balanced performance for serious communities.",
 pricePerGb: 40, cpu: "Intel Platinum 8573C 4.2GHz",
 card: "border-blue-500/25 bg-gradient-to-br from-blue-500/8 to-cyan-500/4",
 badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
 price: "text-blue-400", icon: "text-blue-400",
 btn: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/40",
 chip: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
 glow: "shadow-blue-500/15",
 blurb: "Sapphire-class CPUs, NVMe storage and 4+ GHz clocks. Ideal for active modded servers, networks and growing communities.",
 },
 premium: {
 title: "Premium", emoji: "", tagline: "Top-tier AMD EPYC for the best experience.",
 pricePerGb: 55, cpu: "AMD Epyc 9J14 96C/192T",
 card: "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/4",
 badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
 price: "text-amber-400", icon: "text-amber-400",
 btn: "bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40",
 chip: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
 glow: "shadow-amber-500/15",
 blurb: "Absolute top tier. AMD EPYC 9J14 with monstrous core counts, premium NVMe and priority support — built for huge networks.",
 },
};

const MinecraftTierPage = ({ tier }: { tier: Tier }) => {
 const t = tierConfig[tier];
 const plans = makePlans(t.cpu, t.pricePerGb);
 const BILLING_URL = "https://billing.vixoncloud.com";

 return (
 <div className="min-h-screen relative">
 <SEOHead
 title={`Minecraft ${t.title} Hosting — From ₹${t.pricePerGb}/GB`}
 description={`${t.title} Minecraft hosting on ${t.cpu}. ${t.blurb}`}
 path={`/minecraft-${tier}`}
 />
 <AnimatedBackground />
 <Navbar />
 <main className="pt-24 pb-20 relative z-10">
 <div className="container mx-auto px-4">
 <Link to="/minecraft-plans" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-6 transition-colors">
 <ArrowLeft className="h-3.5 w-3.5" /> All Minecraft plans
 </Link>

 <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 max-w-3xl mx-auto">
 <div className={`inline-flex items-center gap-2 rounded-full border bg-gradient-to-r ${t.chip} px-4 py-1.5 text-xs mb-5`}>
 <span className="text-base leading-none animate-bounce-soft">{t.emoji}</span>
 <span className="tracking-[0.2em] font-semibold">{t.title.toUpperCase()} TIER</span>
 </div>
 <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-display">
 Minecraft <span className={t.price}>{t.title}</span>
 </h1>
 <p className="mt-4 text-muted-foreground text-base">{t.tagline}</p>
 <p className="mt-2 text-sm text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">{t.blurb}</p>

 <div className="mt-6 flex flex-wrap justify-center gap-2">
 {[
 { icon: Cpu, text: t.cpu },
 { icon: Shield, text: "DDoS Protected" },
 { icon: Zap, text: "Instant Setup" },
 { icon: Sparkles, text: `From ₹${t.pricePerGb}/GB` },
 ].map(({ icon: Icon, text }) => (
 <span key={text} className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground">
 <Icon className={`h-3.5 w-3.5 ${t.icon}`} />{text}
 </span>
 ))}
 </div>
 </motion.div>

 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
 {plans.map((plan, i) => (
 <motion.div key={plan.ramGb} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.025 }} className="group">
    <Card className={`${t.card} h-full card-lift transition-all duration-300 shadow-lg ${t.glow} card-theme-minecraft`}>
 <CardContent className="p-5 space-y-4 flex flex-col h-full relative z-10">
 <div className="flex items-center justify-between">
 <Badge className={`text-xs border ${t.badge}`}>
 {tier === "premium" && <Crown className="h-3 w-3 mr-1" />}{plan.ram}
 </Badge>
 <div className="text-right">
 <span className={`font-extrabold text-2xl ${t.price} font-display`}>₹{plan.price}</span>
 <span className="text-xs text-muted-foreground">/mo</span>
 </div>
 </div>
 <div className="space-y-2 text-sm flex-1">
 {[
 { icon: Cpu, text: plan.cpu },
 { icon: MemoryStick, text: `${plan.ram} DDR4 RAM` },
 { icon: HardDrive, text: plan.storage },
 { icon: Shield, text: "DDoS Protection" },
 { icon: Wifi, text: "99.99% Uptime" },
 ].map(({ icon: Icon, text }) => (
 <div key={text} className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground/80 transition-colors">
 <Icon className={`h-3.5 w-3.5 ${t.icon} shrink-0`} /><span className="text-xs">{text}</span>
 </div>
 ))}
 </div>
 <div className="flex items-center gap-1 text-xs text-muted-foreground">
 <Check className={`h-3 w-3 ${t.icon}`} /> Up to {plan.players} players
 </div>
 <CurrencyConverter amount={plan.price} />
 <Button onClick={() => window.open(BILLING_URL, "_blank")} className={`w-full gap-1.5 text-xs font-semibold tracking-wider ${t.btn}`} variant="outline" size="sm">
 <ShoppingCart className="h-3.5 w-3.5" /> Order Now
 </Button>
 </CardContent>
 </Card>
 </motion.div>
 ))}
 </div>

 <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-8">
 <div className="text-center lg:text-left max-w-md">
 <h2 className="text-2xl font-extrabold font-display mb-2">Need help choosing? </h2>
 <p className="text-sm text-muted-foreground">Join our Discord — our team replies in minutes and helps you pick the right plan.</p>
 </div>
 </div>
 </div>
 </main>
 <Footer />
 </div>
 );
};

export default MinecraftTierPage;
