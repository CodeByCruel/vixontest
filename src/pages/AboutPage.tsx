import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, HeartHandshake, History, Sparkles, Rocket, ShieldCheck, Users, Globe2, MessagesSquare } from "lucide-react";
import { DISCORD_INVITE } from "@/lib/vixon";

const pillars = [
 {
 icon: Target, emoji: "", title: "Our Mission",
 body: "We're dedicated to providing powerful, user-friendly tools that help our customers manage their digital infrastructure with ease — fast servers, beautiful panels, zero headaches.",
 accent: "from-primary/20 to-cyan-500/10 border-primary/30",
 },
 {
 icon: Brain, emoji: "", title: "Our Expertise",
 body: "Our team has years of hands-on experience in cloud computing, server engineering and developer tooling. From hardware to UI, every layer is tuned by people who actually use it.",
 accent: "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
 },
 {
 icon: HeartHandshake, emoji: "", title: "Our Commitment",
 body: "We're obsessed with continuous improvement, honest support and shipping fast. If something is broken — we fix it. If something can be better — we rebuild it.",
 accent: "from-rose-500/20 to-pink-500/10 border-rose-500/30",
 },
 {
 icon: History, emoji: "", title: "Our History",
 body: "Established in 2026, VixonCloud has rapidly grown into a trusted home for thousands of gamers, developers and bot creators looking for reliable, secure hosting.",
 accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
 },
];

const stats = [
 { k: "5,000+", v: "Servers hosted", emoji: "" },
 { k: "99.99%", v: "Uptime SLA", emoji: "" },
 { k: "24/7", v: "Discord support", emoji: "" },
 { k: "2026", v: "Founded", emoji: "⭐" },
];

const values = [
 { icon: Rocket, emoji: "", title: "Speed first", desc: "NVMe SSDs, low-latency network and instant deploys." },
 { icon: ShieldCheck, emoji: "", title: "Always protected", desc: "DDoS shielded edges, isolated containers, daily backups." },
 { icon: Users, emoji: "", title: "Community-built", desc: "Built by gamers and developers, shaped by feedback." },
 { icon: Globe2, emoji: "", title: "Global reach", desc: "Mumbai & Delhi nodes with worldwide accessibility." },
];

const AboutPage = () => (
 <div className="min-h-screen relative">
 <SEOHead title="About VixonCloud — Mission, Expertise & History" description="Learn about VixonCloud — our mission, expertise, commitment and history. Premium game and VPS hosting trusted by thousands." path="/about" />
 <AnimatedBackground />
 <Navbar />
 <main className="pt-24 pb-20 relative z-10">
 {/* Hero */}
 <section className="container mx-auto px-4 max-w-5xl text-center mb-16">
 <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
 <Badge className="bg-primary/15 text-primary border border-primary/25 mb-5 gap-1.5">
 <Sparkles className="h-3 w-3" /> ABOUT US
 </Badge>
 <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight">
 We host whatever you <span className="gradient-text">dream up</span> 
 </h1>
 <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
 VixonCloud is a team of gamers and engineers building the cleanest, fastest, most affordable hosting platform out there.
 </p>
 </motion.div>
 </section>

 {/* Pillars */}
 <section className="container mx-auto px-4 max-w-6xl mb-16">
 <div className="grid gap-5 md:grid-cols-2">
 {pillars.map((p, i) => (
 <motion.div key={p.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
 <Card className={`p-6 h-full card-lift bg-gradient-to-br ${p.accent}`}>
 <div className="flex items-start gap-4">
 <div className="text-4xl leading-none shrink-0 animate-bounce-soft">{p.emoji}</div>
 <div>
 <h2 className="text-xl font-extrabold font-display flex items-center gap-2">
 {p.title}
 </h2>
 <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.body}</p>
 </div>
 </div>
 </Card>
 </motion.div>
 ))}
 </div>
 </section>

 {/* Stats */}
 <section className="container mx-auto px-4 max-w-5xl mb-16">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {stats.map((s, i) => (
 <motion.div key={s.v} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
 <Card className="p-5 text-center bg-card/60 border-primary/15">
 <div className="text-2xl mb-1">{s.emoji}</div>
 <div className="text-2xl font-extrabold gradient-text font-display">{s.k}</div>
 <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
 </Card>
 </motion.div>
 ))}
 </div>
 </section>

 {/* Values */}
 <section className="container mx-auto px-4 max-w-6xl mb-16">
 <div className="text-center mb-8">
 <h2 className="text-3xl md:text-4xl font-extrabold font-display">What we <span className="gradient-text">stand for</span> </h2>
 </div>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {values.map((v, i) => (
 <motion.div key={v.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
 <Card className="p-5 h-full bg-card/60 hover:border-primary/30 card-lift">
 <div className="text-3xl mb-2">{v.emoji}</div>
 <p className="font-semibold text-sm">{v.title}</p>
 <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{v.desc}</p>
 </Card>
 </motion.div>
 ))}
 </div>
 </section>

 {/* Discord widget */}
 <section className="container mx-auto px-4 max-w-5xl">
 <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/4 to-transparent border-primary/25">
 <div className="grid lg:grid-cols-2 gap-8 items-center">
 <div>
 <h2 className="text-3xl font-extrabold font-display mb-3">Come hang out </h2>
 <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
 Our entire community lives in Discord. Get instant support, talk to our team, see live announcements and meet other players.
 </p>
 <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
 <Button size="lg" className="gap-2 glow-primary bg-primary text-primary-foreground hover:bg-primary/90">
 <MessagesSquare className="h-4 w-4" /> Join the Discord
 </Button>
 </a>
 </div>
 <div className="flex justify-center lg:justify-end">
 </div>
 </div>
 </Card>
 </section>
 </main>
 <Footer />
 </div>
);

export default AboutPage;
