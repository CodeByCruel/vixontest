import { motion } from "framer-motion";
import { Puzzle, GitBranch, Package, Check, Shield, Globe2, Monitor, Layers, RefreshCw, Zap, Clock, HardDrive } from "lucide-react";

const features = [
  { icon: Puzzle, title: "One-Click Plugin Installer", desc: "Browse and install thousands of Spigot and Modrinth plugins directly from your panel — no file uploads needed.", bullets: ["1000+ plugins available", "Auto dependency resolution", "No FTP or SSH required"], color: "#10b981" },
  { icon: GitBranch, title: "Instant Version Changer", desc: "Switch between Vanilla, Paper, Fabric, Forge, NeoForge, Velocity with a single click. Zero downtime.", bullets: ["All major server loaders", "Hundreds of builds available", "Seamless switching"], color: "#3b82f6" },
  { icon: Package, title: "Built-in Mod Installer", desc: "Install Fabric and Forge mods from Modrinth directly in your panel. Auto-updates keep everything current.", bullets: ["Modrinth integration built-in", "Auto-updates enabled", "Conflict detection included"], color: "#8b5cf6" },
  { icon: Shield, title: "Always-On DDoS Protection", desc: "L3/L4/L7 DDoS mitigation that runs 24/7. Your server stays online through even the largest volumetric attacks.", bullets: ["Auto-mitigation in real-time", "Zero configuration needed", "24/7 network monitoring"], color: "#f59e0b" },
  { icon: RefreshCw, title: "Automated Daily Backups", desc: "Daily automatic snapshots with one-click restore. Never lose your world, plugins, or player data again.", bullets: ["Daily automated snapshots", "One-click instant restore", "30-day retention period"], color: "#ec4899" },
  { icon: Globe2, title: "Global CDN for Game Assets", desc: "Game assets cached at edge locations worldwide. Your players download mods and packs at maximum speed.", bullets: ["Edge caching worldwide", "10x faster downloads", "Auto-optimization built-in"], color: "#06b6d4" },
  { icon: Monitor, title: "Pterodactyl Panel", desc: "Industry-standard game server management with full file access, live console, and real-time performance metrics.", bullets: ["Full file manager included", "Live server console", "Real-time performance metrics"], color: "#10b981" },
  { icon: Layers, title: "Instant Snapshot System", desc: "Take instant snapshots of your server state before any change. Roll back or clone with one click.", bullets: ["Instant server snapshots", "One-click rollback", "Server cloning available"], color: "#3b82f6" },
  { icon: Clock, title: "Smart Auto Restarts", desc: "Intelligent crash detection with automatic recovery. Your server heals itself — uptime monitoring included.", bullets: ["Smart crash detection", "Auto-recovery system", "24/7 uptime monitoring"], color: "#8b5cf6" },
  { icon: Zap, title: "One-Click Deploy", desc: "Deploy a fully configured game server in under 60 seconds. Pre-installed mods, world generation, and all.", bullets: ["60-second deployment", "Pre-configured setup", "Zero manual steps"], color: "#f59e0b" },
  { icon: HardDrive, title: "NVMe SSD Storage", desc: "All servers run on ultra-fast NVMe SSDs with RAID redundancy. Faster chunk loading, faster world saves.", bullets: ["NVMe SSD speeds", "RAID redundancy", "Consistent IOPS"], color: "#ec4899" },
  { icon: Shield, title: "24/7 Priority Support", desc: "Expert support team available around the clock. Average response time under 5 minutes for urgent issues.", bullets: ["24/7 expert team", "<5min response time", "Discord & ticket support"], color: "#06b6d4" },
];

export default function FeaturesEnhanced() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(210_100%_12%/0.2),transparent_60%)]" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6 animate-shimmer">
            <Puzzle className="h-3.5 w-3.5" />
            Powerful Panel Features
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-display">
            Everything <span className="gradient-text animate-text-glow">Built-in</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our custom panel comes loaded with tools to manage your server — no SSH, no FTP,
            no third-party plugins required. Everything just works.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="relative rounded-2xl glass gradient-border p-6 group overflow-hidden"
            >
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <motion.div
                  className="w-11 h-11 rounded-xl grid place-items-center mb-4"
                  style={{ backgroundColor: f.color + "15" }}
                  whileHover={{ rotate: 12, scale: 1.15 }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </motion.div>
                <h3 className="text-lg font-semibold font-display mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
                <ul className="space-y-1.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: f.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
