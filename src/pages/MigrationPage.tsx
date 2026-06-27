import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightLeft,
  FileText,
  Search,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  Zap,
  MessageSquare,
  Server,
  Upload,
  ArrowUpRight,
} from "lucide-react";
import { DISCORD_INVITE } from "@/lib/vixon";

const steps = [
  {
    icon: FileText,
    title: "Submit Request",
    desc: "Fill out the migration form with your current host details.",
    num: "01",
  },
  {
    icon: Search,
    title: "We Analyze",
    desc: "Our team reviews your server setup and plans the migration.",
    num: "02",
  },
  {
    icon: ArrowRightLeft,
    title: "Zero-Downtime Move",
    desc: "We transfer your files, databases, and configs.",
    num: "03",
  },
  {
    icon: CheckCircle2,
    title: "You're Live",
    desc: "Switch DNS and you're running on VixonCloud.",
    num: "04",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Zero Downtime",
    desc: "We migrate during off-peak hours to keep your server online.",
    accent: "from-primary/20 to-cyan-500/10 border-primary/30",
  },
  {
    icon: ShieldCheck,
    title: "Free of Charge",
    desc: "All migrations are completely free — no hidden fees.",
    accent: "from-emerald-500/20 to-green-500/10 border-emerald-500/30",
  },
  {
    icon: Zap,
    title: "Data Safe",
    desc: "Full backup before and after migration, guaranteed.",
    accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Done by our experienced sysadmins who've done this hundreds of times.",
    accent: "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
  },
];

const hosts = [
  "Aternos",
  "PebbleHost",
  "ScalaCube",
  "Hostinger",
  "BisectHosting",
  "Apex Hosting",
  "Shockbyte",
];

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

const MigrationPage = () => (
  <div className="min-h-screen relative">
    <SEOHead
      title="Free Migration — VixonCloud"
      description="Moving from another host? VixonCloud offers free, zero-downtime migrations. Our expert team handles the entire process."
      path="/migration"
    />
    <Navbar />
    <main className="pt-24 pb-20 relative z-10">
      {/* Hero */}
      <section className="container mx-auto px-4 max-w-5xl text-center mb-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Badge className="bg-primary/15 text-primary border border-primary/25 mb-5 gap-1.5">
            <ArrowRightLeft className="h-3 w-3" /> MIGRATION
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight">
            Free <span className="gradient-text">Migration</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Moving from another host? We'll handle everything.
          </p>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Four simple steps to your new home.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 h-full bg-card/60 border-primary/10 relative overflow-hidden group hover:border-primary/30 card-lift">
                <div className="text-5xl font-extrabold font-display text-primary/10 absolute top-3 right-4 select-none">
                  {step.num}
                </div>
                <step.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-sm mb-1.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Why choose our <span className="gradient-text">migration</span>?
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={`p-6 h-full bg-gradient-to-br ${b.accent} card-lift`}
              >
                <b.icon className="h-7 w-7 text-primary mb-3" />
                <h3 className="font-semibold text-sm mb-1.5">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Migration Form */}
      <section className="container mx-auto px-4 max-w-2xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Request a <span className="gradient-text">migration</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Fill out the form below and we'll get back to you on Discord.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 md:p-8 bg-card/60 border-primary/15">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(DISCORD_INVITE, "_blank");
              }}
              className="space-y-5"
            >
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Current Host
                </label>
                <input
                  type="text"
                  placeholder="e.g. PebbleHost, Aternos, etc."
                  className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Game / Service
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all">
                    <option value="">Select...</option>
                    <option value="minecraft">Minecraft</option>
                    <option value="vps">VPS</option>
                    <option value="bot">Bot</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Server Size
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all">
                    <option value="">Select...</option>
                    <option value="small">Small (&lt;4 GB RAM)</option>
                    <option value="medium">Medium (4-16 GB RAM)</option>
                    <option value="large">Large (16 GB+ RAM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Current Panel URL
                </label>
                <input
                  type="url"
                  placeholder="https://panel.example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Any extra details, special configs, mod packs, etc."
                  className="w-full px-4 py-2.5 rounded-lg bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 glow-primary bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <MessageSquare className="h-4 w-4" /> Submit via Discord
              </Button>
            </form>
          </Card>
        </motion.div>
      </section>

      {/* Compatible Hosts */}
      <section className="container mx-auto px-4 max-w-4xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Migrate from <span className="gradient-text">anywhere</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            We've successfully migrated servers from all major providers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {hosts.map((host, i) => (
            <motion.div
              key={host}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 bg-card/60 border-primary/10 hover:border-primary/30 card-lift text-center">
                <Server className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold">{host}</p>
              </Card>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: hosts.length * 0.05 }}
          >
            <Card className="p-5 bg-card/60 border-primary/10 border-dashed hover:border-primary/30 card-lift text-center flex flex-col items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">And more...</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-primary/4 to-transparent border-primary/25 text-center">
            <ArrowRightLeft className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold font-display mb-3">
              Ready to <span className="gradient-text">migrate</span>?
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
              Free, zero-downtime migrations handled by our expert team. You
              focus on your community — we'll handle the move.
            </p>
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="gap-2 glow-primary bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Migration <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
          </Card>
        </motion.div>
      </section>
    </main>
    <Footer />
  </div>
);

export default MigrationPage;
