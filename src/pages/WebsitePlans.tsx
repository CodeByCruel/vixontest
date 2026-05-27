import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Layers, Sparkles, Zap, Globe, ShieldCheck } from "lucide-react";
import VisitDiscordButton from "@/components/VisitDiscordButton";

const tiers = [
  { name: "Basic Landing", price: 299, desc: "Single-page site for your community / Discord / project.", features: ["1 page", "Mobile responsive", "Discord / social links", "Delivered in 2–3 days"] },
  { name: "Multi-Page", price: 999, desc: "3–5 page website with custom design.", features: ["Up to 5 pages", "Custom design", "Animations", "Contact form"] },
  { name: "Pro", price: 2499, desc: "Full marketing site with CMS-style sections.", features: ["Up to 10 pages", "Custom illustrations", "Premium animations", "SEO setup"] },
  { name: "VixonCloud-Tier", price: 4999, desc: "A site of this exact quality — full-stack, animated, backend included.", features: ["Unlimited pages", "Custom backend / dashboard", "Premium 3D / animations", "Hosting setup", "30-day support"] },
];

const WebsitePlans = () => (
  <div className="min-h-screen relative">
    <AnimatedBackground />
    <Navbar />
    <main className="pt-24 pb-16 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs text-primary mb-6">
            <Code2 className="h-3.5 w-3.5" /> Website Development
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            We build websites <span className="gradient-text">like this one</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Love the VixonCloud site? Our developers can build the same quality for you — starting from just <span className="text-primary font-semibold">₹299</span> up to <span className="text-primary font-semibold">₹5,000</span>. Premium design, smooth animations, mobile-ready.
          </p>
        </motion.div>

        <div className="grid gap-6 mb-12 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            { icon: Sparkles, title: "Premium design", desc: "Modern, animated, unique to your brand." },
            { icon: Zap, title: "Fast delivery", desc: "From 2 days for landing pages." },
            { icon: ShieldCheck, title: "Free revisions", desc: "We iterate until you're happy." },
          ].map((f) => (
            <Card key={f.title} className="p-5 text-center bg-card/40">
              <f.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold text-sm">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className={`p-5 h-full flex flex-col card-lift ${i === 3 ? "border-primary/40 bg-primary/5" : ""}`}>
                {i === 3 && <Badge className="bg-primary/20 text-primary border-primary/30 self-start mb-2 gap-1"><Sparkles className="h-3 w-3" /> Best</Badge>}
                <p className="text-sm text-muted-foreground">{t.name}</p>
                <p className="text-3xl font-extrabold mt-1 mb-1 font-display">₹{t.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mb-4">{t.desc}</p>
                <ul className="space-y-1.5 text-sm flex-1 mb-4">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-muted-foreground">
                      <Layers className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /> <span className="text-xs">{f}</span>
                    </li>
                  ))}
                </ul>
                <VisitDiscordButton label="Order on Discord" fullWidth className="glow-primary bg-primary text-primary-foreground hover:bg-primary/90" />
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mt-10 p-6 bg-secondary/30 text-center">
          <Globe className="h-7 w-7 text-primary mx-auto mb-2" />
          <p className="font-semibold mb-1">Need something custom?</p>
          <p className="text-sm text-muted-foreground mb-4">Tell us what you want and we'll quote it in Discord — usually within an hour.</p>
          <VisitDiscordButton label="Talk on Discord" className="glow-primary bg-primary text-primary-foreground hover:bg-primary/90" />
        </Card>
      </div>
    </main>
    <Footer />
  </div>
);

export default WebsitePlans;
