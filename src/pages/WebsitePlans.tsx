import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2, Layers, Sparkles, Zap, Globe, ShieldCheck, ExternalLink,
  Palette, Rocket, Server, Wand2, Check, Star, MonitorSmartphone, Crown,
} from "lucide-react";
import VisitDiscordButton from "@/components/VisitDiscordButton";
import { useDiscordInvite } from "@/lib/vixon";

const perks = [
  { icon: Palette,            title: "Premium custom design",   desc: "Modern, unique, and on-brand." },
  { icon: MonitorSmartphone,  title: "Mobile-first responsive", desc: "Looks great on every screen." },
  { icon: Wand2,              title: "Smooth animations",       desc: "Framer Motion + GSAP polish." },
  { icon: Rocket,             title: "Fast delivery",           desc: "From 2 days for landing pages." },
  { icon: Server,             title: "Hosting + domain help",   desc: "We deploy and connect for you." },
  { icon: ShieldCheck,        title: "Free revisions",          desc: "We iterate until you love it." },
];

const tiers = [
  {
    name: "Basic Landing",
    tag: "From ₹299",
    price: 299,
    desc: "Single-page site for your community, Discord or small project.",
    features: ["1 page", "Mobile responsive", "Discord / social links", "Delivered in 2–3 days"],
    accent: "from-sky-500/20 to-cyan-500/10",
    border: "border-sky-500/30",
    icon: Globe,
  },
  {
    name: "Multi-Page",
    tag: "Most ordered",
    price: 999,
    desc: "3–5 page website with custom design and animations.",
    features: ["Up to 5 pages", "Custom design", "Smooth animations", "Contact form", "1 week delivery"],
    accent: "from-violet-500/20 to-indigo-500/10",
    border: "border-violet-500/30",
    icon: Layers,
  },
  {
    name: "Pro",
    tag: "Business",
    price: 2499,
    desc: "Full marketing site with rich content sections and SEO.",
    features: ["Up to 10 pages", "Custom illustrations", "Premium animations", "SEO setup", "Blog / CMS section"],
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    icon: Sparkles,
  },
  {
    name: "VixonCloud-Tier",
    tag: "Best — like this site",
    price: 4999,
    desc: "A site of this exact quality — full-stack, animated, backend included.",
    features: [
      "Unlimited pages",
      "Custom backend / admin",
      "3D / cinematic animations",
      "Hosting + domain setup",
      "30-day free support",
      "Source code included",
    ],
    accent: "from-amber-500/20 via-orange-500/10 to-rose-500/10",
    border: "border-amber-500/40",
    icon: Crown,
    featured: true,
  },
];

const process = [
  { step: "01", title: "Tell us your idea", desc: "Hop into Discord and share your vision, references and goals." },
  { step: "02", title: "We design + quote", desc: "Mockups within 24h. Lock the scope and price upfront." },
  { step: "03", title: "We build it",       desc: "Daily progress updates while we build your site." },
  { step: "04", title: "Launch + support",  desc: "We deploy, connect your domain and support you for 30 days." },
];

const faqs = [
  { q: "How do I order?",        a: "Click any 'Order on Discord' button — our team replies within an hour." },
  { q: "What payment methods?",  a: "UPI, INR bank transfer, USDT and PayPal — we'll confirm in Discord." },
  { q: "Do you provide hosting?",a: "Yes. We can deploy on Vercel/Netlify or our own VPS at no extra cost." },
  { q: "Will I own the code?",   a: "Yes — on the Pro and VixonCloud-Tier plans you get the full source code." },
];

const WebsitePlans = () => {
  const invite = useDiscordInvite();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <main className="pt-24 pb-20 relative z-10">
        {/* HERO */}
        <section className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs text-primary mb-6">
              <Code2 className="h-3.5 w-3.5" /> Website Development
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display mb-5">
              We build websites <span className="gradient-text">like this one</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Love the VixonCloud site? Our developers can build you the same quality —
              starting from just <span className="text-primary font-semibold">₹299</span> up to
              <span className="text-primary font-semibold"> ₹5,000</span>. Premium design,
              smooth animations, fully mobile-ready.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="#tiers"><Button size="lg" className="glow-primary bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Rocket className="h-4 w-4" /> See plans
              </Button></a>
              <a href={invite} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Talk on Discord
                </Button>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> 30+ sites delivered</span>
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> 5.0 rating on Discord</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-primary" /> Avg. delivery 3–5 days</span>
            </div>
          </motion.div>

          {/* PERKS */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {perks.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5 h-full bg-card/50 card-lift hover:border-primary/30">
                  <div className="rounded-lg bg-primary/10 border border-primary/20 p-2 w-fit mb-3">
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-semibold text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRICING TIERS */}
        <section id="tiers" className="container mx-auto px-4 max-w-6xl mb-16 scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display mb-2">
              Pick your <span className="gradient-text">plan</span>
            </h2>
            <p className="text-sm text-muted-foreground">Transparent pricing. No hidden fees. Pay only after you approve the design.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Card className={`relative overflow-hidden h-full flex flex-col p-6 card-lift ${t.featured ? `${t.border} bg-gradient-to-br ${t.accent}` : t.border}`}>
                  {t.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 gap-1">
                        <Sparkles className="h-3 w-3" /> Best
                      </Badge>
                    </div>
                  )}
                  <div className={`rounded-xl p-2.5 w-fit mb-3 bg-gradient-to-br ${t.accent}`}>
                    <t.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <p className="text-[11px] uppercase text-muted-foreground tracking-wider">{t.tag}</p>
                  <p className="font-semibold text-base mt-0.5">{t.name}</p>
                  <div className="mt-2 mb-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-display">₹{t.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">one-time</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{t.desc}</p>
                  <ul className="space-y-2 text-sm flex-1 mb-5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-foreground/85">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-[13px]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <VisitDiscordButton
                    label="Order on Discord"
                    fullWidth
                    className={t.featured
                      ? "glow-primary bg-amber-500 text-black hover:bg-amber-400"
                      : "glow-primary bg-primary text-primary-foreground hover:bg-primary/90"}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display mb-2">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-sm text-muted-foreground">From idea to live website in days.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="p-5 h-full relative overflow-hidden card-lift">
                  <div className="absolute -right-2 -top-3 text-6xl font-extrabold text-primary/10 font-display select-none">{p.step}</div>
                  <p className="text-xs text-primary font-semibold mb-1">Step {p.step}</p>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SHOWCASE */}
        <section className="container mx-auto px-4 max-w-6xl mb-16">
          <Card className="p-7 sm:p-10 bg-gradient-to-br from-primary/12 via-primary/4 to-transparent border-primary/30 overflow-hidden relative">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <Badge className="bg-primary/20 text-primary border-primary/30 mb-3 gap-1">
                  <Star className="h-3 w-3 fill-primary" /> Live example
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display mb-3">
                  This entire site is <span className="gradient-text">our work</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  The 3D hero, animations, smooth scroll, admin panel, dynamic settings,
                  responsive layouts — every pixel was built by our team. That's exactly
                  what you get on the <span className="text-foreground font-semibold">VixonCloud-Tier</span> plan.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React + Vite", "Tailwind", "Framer Motion", "Three.js", "Supabase", "TypeScript"].map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "30+",   v: "Sites delivered" },
                  { k: "3 days", v: "Avg. delivery" },
                  { k: "5.0★",  v: "Client rating" },
                  { k: "30 days",v: "Free support" },
                ].map((s) => (
                  <div key={s.v} className="rounded-xl border border-border/30 bg-card/50 p-4 text-center">
                    <p className="text-2xl font-extrabold gradient-text font-display">{s.k}</p>
                    <p className="text-[11px] uppercase text-muted-foreground mt-1">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 max-w-3xl mb-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Quick <span className="gradient-text">questions</span>
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((f) => (
              <Card key={f.q} className="p-4">
                <p className="font-semibold text-sm">{f.q}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 sm:p-10 text-center bg-secondary/40 border-primary/20">
            <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-extrabold font-display mb-2">Need something custom?</h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
              Tell us what you want and we'll quote it in Discord — usually within an hour.
            </p>
            <VisitDiscordButton
              label="Talk on Discord"
              size="lg"
              className="glow-primary bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            />
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WebsitePlans;
