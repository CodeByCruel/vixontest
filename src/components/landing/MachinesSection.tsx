import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Server, Cpu, HardDrive, MemoryStick, Wifi, Zap, Boxes, Rocket, Crown, ArrowRight, Check, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { BILLING_URL } from "@/lib/vixon";

const machines = [
  {
    name: "Minecraft Starter",
    tag: "Most Popular",
    icon: Boxes,
    price: "₹99",
    period: "/mo",
    description: "Perfect for small SMPs, testing, and personal projects",
    specs: [
      { icon: Cpu, label: "2 vCPUs", detail: "Shared threads" },
      { icon: MemoryStick, label: "2 GB RAM", detail: "DDR4 ECC" },
      { icon: HardDrive, label: "20 GB NVMe", detail: "Ultra-fast SSD" },
      { icon: Wifi, label: "1 Gbps", detail: "Unmetered BW" },
    ],
    features: ["Pterodactyl Panel", "Auto Backups", "DDoS Protection", "Mod & Plugin Support", "Instant Setup"],
    accent: "from-emerald-500/20 to-cyan-500/5",
    borderColor: "border-emerald-500/20",
    to: "/minecraft-plans",
    color: "#10b981",
    popular: true,
  },
  {
    name: "VPS Standard",
    tag: "Best Value",
    icon: Server,
    price: "₹400",
    period: "/mo",
    description: "Full root access, Intel Xeon power for any workload",
    specs: [
      { icon: Cpu, label: "4 vCPUs", detail: "Dedicated" },
      { icon: MemoryStick, label: "8 GB RAM", detail: "DDR4 ECC" },
      { icon: HardDrive, label: "80 GB NVMe", detail: "Raid-10" },
      { icon: Wifi, label: "1 Gbps", detail: "Port speed" },
    ],
    features: ["Full Root Access", "OS Choice (10+)", "1-Click Apps", "Snapshots", "Weekly Backups"],
    accent: "from-blue-500/20 to-indigo-500/5",
    borderColor: "border-blue-500/20",
    to: "/vps-starter",
    color: "#3b82f6",
    popular: false,
  },
  {
    name: "VPS Premium",
    tag: "Enterprise",
    icon: Crown,
    price: "₹500",
    period: "/mo",
    description: "AMD EPYC, Mumbai DC, top-tier performance guaranteed",
    specs: [
      { icon: Cpu, label: "8 vCPUs", detail: "Dedicated" },
      { icon: MemoryStick, label: "16 GB RAM", detail: "DDR5 ECC" },
      { icon: HardDrive, label: "160 GB NVMe", detail: "Raid-10" },
      { icon: Wifi, label: "2 Gbps", detail: "Unmetered" },
    ],
    features: ["AMD EPYC 9004", "Priority Support", "Auto Backups", "DDoS Shield", "Daily Snapshots"],
    accent: "from-violet-500/20 to-fuchsia-500/5",
    borderColor: "border-violet-500/20",
    to: "/vps-premium",
    color: "#8b5cf6",
    popular: false,
  },
  {
    name: "Bot Hosting",
    tag: "24/7 Online",
    icon: Zap,
    price: "₹49",
    period: "/mo",
    description: "Keep your Discord bots alive forever, zero maintenance",
    specs: [
      { icon: Cpu, label: "1 vCPU", detail: "Shared" },
      { icon: MemoryStick, label: "512 MB RAM", detail: "Guaranteed" },
      { icon: HardDrive, label: "5 GB SSD", detail: "Storage" },
      { icon: Wifi, label: "100 Mbps", detail: "Uplink" },
    ],
    features: ["Node.js / Python / Java", "Auto Restart on Crash", "Live Log Viewer", "Cron Job Scheduler"],
    accent: "from-amber-500/20 to-orange-500/5",
    borderColor: "border-amber-500/20",
    to: "/bot-plans",
    color: "#f59e0b",
    popular: false,
  },
];

function MachineCard({ machine, index }: { machine: typeof machines[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ scale: cardScale }}
      whileHover={{ scale: 1.03, y: -8 }}
      className={`relative rounded-2xl glass gradient-border overflow-hidden group ${machine.borderColor}`}
    >
      {machine.popular && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-shimmer" />
      )}

      <div
        className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider z-10"
        style={{ backgroundColor: machine.color + "20", color: machine.color }}
      >
        <div className="flex items-center gap-1">
          {machine.popular && <Star className="w-3 h-3 fill-current" />}
          {machine.tag}
        </div>
      </div>

      <div className={`h-1 w-full bg-gradient-to-r ${machine.accent}`} />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-12 h-12 rounded-xl grid place-items-center"
            style={{ backgroundColor: machine.color + "15" }}
            whileHover={{ rotate: 12, scale: 1.15 }}
          >
            <machine.icon className="w-6 h-6" style={{ color: machine.color }} />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg font-display">{machine.name}</h3>
            <p className="text-xs text-muted-foreground">{machine.description}</p>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-3xl font-extrabold" style={{ color: machine.color }}>
            {machine.price}
          </span>
          <span className="text-sm text-muted-foreground">{machine.period}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5">
          {machine.specs.map((spec) => (
            <motion.div
              key={spec.label}
              className="flex items-center gap-2 rounded-lg bg-secondary/30 px-3 py-2"
              whileHover={{ scale: 1.03 }}
            >
              <spec.icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <div>
                <div className="text-xs font-semibold">{spec.label}</div>
                <div className="text-[10px] text-muted-foreground">{spec.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <ul className="space-y-2 mb-6">
          {machine.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
              <Check className="w-3.5 h-3.5 shrink-0" style={{ color: machine.color }} />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Link
            to={machine.to}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: machine.color,
              color: "#fff",
              boxShadow: `0 4px 20px ${machine.color}30`,
            }}
          >
            View Plans
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={BILLING_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold glass hover:bg-secondary/60 transition-colors"
          >
            Order
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function MachinesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(210_100%_10%/0.2),transparent_60%)]" />
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
            <Boxes className="h-3.5 w-3.5" />
            Choose Your Machine
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-display">
            Pick Your <span className="gradient-text">Power</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From lightweight bot hosting to enterprise VPS — every machine runs on premium
            hardware with instant deployment and zero hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {machines.map((machine, i) => (
            <MachineCard key={machine.name} machine={machine} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          <Link
            to="/minecraft-plans"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-strong font-semibold text-sm hover:bg-secondary/60 transition-colors"
          >
            <Boxes className="w-4 h-4" /> All Minecraft Plans
          </Link>
          <Link
            to="/vps-starter"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-strong font-semibold text-sm hover:bg-secondary/60 transition-colors"
          >
            <Server className="w-4 h-4" /> VPS Starter
          </Link>
          <Link
            to="/vps-premium"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-strong font-semibold text-sm hover:bg-secondary/60 transition-colors"
          >
            <Crown className="w-4 h-4" /> VPS Premium
          </Link>
          <Link
            to="/bot-plans"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-strong font-semibold text-sm hover:bg-secondary/60 transition-colors"
          >
            <Zap className="w-4 h-4" /> Bot Hosting
          </Link>
          <a
            href={BILLING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary transition-all"
          >
            <Rocket className="w-4 h-4" /> Deploy Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
