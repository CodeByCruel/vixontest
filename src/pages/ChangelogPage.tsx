import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, Zap, Shield, Bug, Sparkles, Server } from "lucide-react";

const tagConfig: Record<string, { icon: typeof Plus; color: string; bg: string }> = {
  "New Features": { icon: Sparkles, color: "text-blue-400", bg: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
  Plans: { icon: Tag, color: "text-green-400", bg: "bg-green-500/15 text-green-400 border-green-500/25" },
  Infrastructure: { icon: Server, color: "text-purple-400", bg: "bg-purple-500/15 text-purple-400 border-purple-500/25" },
  Community: { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
};

const dotColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-400"];
const lineColors = ["from-blue-500/30", "from-green-500/30", "from-purple-500/30", "from-amber-400/30"];

const changelog = [
  {
    date: "June 28, 2026",
    title: "Major Website Overhaul",
    tags: ["New Features"],
    changes: [
      "New Knowledge Base, Affiliate Program, Server Configurator, Benchmarks, Migration pages",
      "Interactive pricing calculator",
      "Enhanced loading screen with particles and animations",
      "Dark/Light theme toggle",
      "WhatsApp support button",
      "Cookie consent banner",
      "Scroll progress indicator",
      "Keyboard shortcuts (Ctrl+K, ?)",
      "Updated refund policy (12h Minecraft, none for VPS)",
      "New ToS with 24 sections",
      "New Privacy Policy",
      "Performance: Three.js replaced with CSS (bundle 78% smaller)",
    ],
  },
  {
    date: "June 20, 2026",
    title: "New Hosting Plans",
    tags: ["Plans"],
    changes: [
      "Minecraft Starter from ₹20/GB (Intel Platinum 8269-CY)",
      "Minecraft Standard from ₹40/GB (AMD EPYC 7K62)",
      "Minecraft Premium from ₹55/GB (AMD EPYC 9754)",
      "Bot Hosting from ₹25/mo",
      "VPS Starter and VPS Premium plans",
    ],
  },
  {
    date: "June 15, 2026",
    title: "Infrastructure Upgrade",
    tags: ["Infrastructure"],
    changes: [
      "New AMD EPYC 9754 nodes for premium tier",
      "NVMe RAID-10 storage arrays",
      "10Gbps redundant network uplinks",
      "7 global data center locations",
    ],
  },
  {
    date: "June 10, 2026",
    title: "Community Features",
    tags: ["Community"],
    changes: [
      "Discord integration with live member count",
      "Affiliate program launch (₹100–₹500 per referral)",
      "Server latency test tool",
      "Before/After hosting comparison slider",
      "Game panel walkthrough tour",
    ],
  },
];

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

const ChangelogPage = () => (
  <div className="min-h-screen relative">
    <SEOHead
      title="Changelog — VixonCloud"
      description="See what's new at VixonCloud. Full changelog with every feature, improvement, and fix."
      path="/changelog"
    />
    <Navbar />
    <main className="pt-24 pb-20 relative z-10">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge className="bg-primary/15 text-primary border border-primary/25 mb-5 gap-1.5">
            <Tag className="h-3 w-3" /> CHANGELOG
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight">
            What's <span className="gradient-text">new</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every update, improvement, and fix — all in one place.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />

          <div className="space-y-16">
            {changelog.map((entry, entryIdx) => {
              const dotColor = dotColors[entryIdx % dotColors.length];
              const isLeft = entryIdx % 2 === 0;

              return (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: entryIdx * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-10 h-4 w-4 rounded-full border-[3px] border-background ${dotColor} shadow-lg shadow-${dotColor.replace("bg-", "")}/20`}
                  />

                  {/* Card */}
                  <div
                    className={`md:w-[calc(50%-2.5rem)] ${
                      isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                    } ml-12 md:ml-0`}
                  >
                    <Card className="p-6 glass gradient-border card-lift">
                      {/* Date & Title */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs font-mono text-muted-foreground">
                          {entry.date}
                        </span>
                        {entry.tags.map((tag) => {
                          const cfg = tagConfig[tag];
                          return (
                            <Badge key={tag} className={`text-[10px] ${cfg.bg} gap-1`}>
                              <cfg.icon className="h-2.5 w-2.5" />
                              {tag}
                            </Badge>
                          );
                        })}
                      </div>

                      <h2 className="text-xl font-extrabold font-display mb-4">
                        {entry.title}
                      </h2>

                      <ul className="space-y-2">
                        {entry.changes.map((change, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: entryIdx * 0.05 + i * 0.03 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                          >
                            <Plus className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            {change}
                          </motion.li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom cap */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 bottom-0 h-2 w-2 rounded-full bg-primary/40" />
        </div>

      </div>
    </main>
    <Footer />
  </div>
);

export default ChangelogPage;
