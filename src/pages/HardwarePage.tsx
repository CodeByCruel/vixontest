import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Thermometer,
  Zap,
  Server,
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

const gameServers = [
  {
    name: "Starter",
    cpu: "Intel Platinum 8269-CY",
    cores: "8 Cores / 16 Threads",
    clock: "3.5 GHz Base",
    ram: "DDR4 ECC",
    ramSpeed: "3200 MHz",
    storage: "NVMe SSD",
    storageSpeed: "3,200 MB/s Read",
    network: "1 Gbps",
    accent: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    performance: { cpu: 55, ram: 50, storage: 45, network: 50 },
  },
  {
    name: "Standard",
    cpu: "AMD EPYC 7K62",
    cores: "64 Cores / 128 Threads",
    clock: "3.5 GHz / 4.2 GHz Boost",
    ram: "DDR4 ECC",
    ramSpeed: "3200 MHz",
    storage: "NVMe RAID",
    storageSpeed: "5,500 MB/s Read",
    network: "5 Gbps",
    accent: "from-primary/20 to-violet-500/10 border-primary/30",
    badge: "bg-primary/15 text-primary border-primary/25",
    popular: true,
    performance: { cpu: 78, ram: 72, storage: 75, network: 75 },
  },
  {
    name: "Premium",
    cpu: "AMD EPYC 9754",
    cores: "128 Cores / 256 Threads",
    clock: "2,909 MHz Base",
    ram: "DDR5 ECC",
    ramSpeed: "4800 MHz",
    storage: "NVMe RAID-10",
    storageSpeed: "7,450 MB/s Read",
    network: "10 Gbps",
    accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    performance: { cpu: 98, ram: 95, storage: 95, network: 100 },
  },
];

const vpsNodes = [
  {
    name: "Starter VPS",
    cpu: "Intel Platinum 8269-CY",
    cores: "8 Cores / 16 Threads (Dedicated)",
    clock: "3.5 GHz Base",
    ram: "DDR4 ECC",
    ramSpeed: "3200 MHz",
    storage: "NVMe SSD",
    storageSpeed: "3,200 MB/s Read",
    network: "1 Gbps",
    accent: "from-blue-500/20 to-indigo-500/10 border-blue-500/30",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    performance: { cpu: 55, ram: 50, storage: 45, network: 50 },
  },
  {
    name: "Premium VPS",
    cpu: "AMD EPYC 7K62",
    cores: "16 Cores / 32 Threads (Dedicated)",
    clock: "3.5 GHz / 4.2 GHz Boost",
    ram: "DDR5 ECC",
    ramSpeed: "4800 MHz",
    storage: "NVMe SSD",
    storageSpeed: "5,500 MB/s Read",
    network: "5 Gbps",
    accent: "from-primary/20 to-violet-500/10 border-primary/30",
    badge: "bg-primary/15 text-primary border-primary/25",
    performance: { cpu: 78, ram: 72, storage: 75, network: 75 },
  },
];

const botHosting = [
  {
    name: "Bot Hosting",
    cpu: "Intel Platinum (Shared)",
    cores: "Shared Cores",
    clock: "3.5 GHz Base",
    ram: "DDR4 ECC",
    ramSpeed: "3200 MHz",
    storage: "NVMe SSD",
    storageSpeed: "3,200 MB/s Read",
    network: "1 Gbps",
    accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    performance: { cpu: 40, ram: 35, storage: 45, network: 50 },
  },
];

const whyUsCards = [
  {
    icon: HardDrive,
    title: "NVMe 7x Faster",
    description: "NVMe SSDs deliver up to 7,450 MB/s read speeds, 7x faster than traditional SATA SSDs.",
    stat: "7,450",
    unit: "MB/s",
    accent: "from-cyan-500/15 to-blue-500/5 border-cyan-500/25",
    iconColor: "text-cyan-400",
  },
  {
    icon: MemoryStick,
    title: "ECC RAM",
    description: "Error-Correcting Code memory automatically detects and fixes data corruption in real-time.",
    stat: "100%",
    unit: "Data Integrity",
    accent: "from-primary/15 to-violet-500/5 border-primary/25",
    iconColor: "text-primary",
  },
  {
    icon: Cpu,
    title: "Enterprise CPUs",
    description: "Server-class processors with 5.0 GHz+ boost clocks for maximum single-thread performance.",
    stat: "5.0+",
    unit: "GHz Boost",
    accent: "from-amber-500/15 to-orange-500/5 border-amber-500/25",
    iconColor: "text-amber-400",
  },
  {
    icon: Network,
    title: "10Gbps Network",
    description: "Redundant uplinks ensure maximum uptime and blazing-fast connectivity.",
    stat: "10",
    unit: "Gbps",
    accent: "from-emerald-500/15 to-teal-500/5 border-emerald-500/25",
    iconColor: "text-emerald-400",
  },
];

const SpecBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-[11px] text-muted-foreground w-20 shrink-0 text-right uppercase tracking-wider">
      {label}
    </span>
    <div className="flex-1 h-2 rounded-full bg-muted/50 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  </div>
);

const SpecCard = ({ tier, index }: { tier: typeof gameServers[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className={`p-6 h-full bg-gradient-to-br ${tier.accent} relative overflow-hidden`}>
      {tier.popular && (
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-primary-foreground text-[10px]">
            POPULAR
          </Badge>
        </div>
      )}
      <Badge className={`mb-4 ${tier.badge}`}>{tier.name}</Badge>
      <div className="space-y-4 mt-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Processor</p>
          </div>
          <p className="text-sm font-semibold">{tier.cpu}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{tier.cores} — {tier.clock}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MemoryStick className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Memory</p>
          </div>
          <p className="text-sm font-semibold">{tier.ram}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{tier.ramSpeed}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HardDrive className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Storage</p>
          </div>
          <p className="text-sm font-semibold">{tier.storage}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{tier.storageSpeed}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Network</p>
          </div>
          <p className="text-sm font-semibold">{tier.network}</p>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-border/30 space-y-2">
        <SpecBar label="CPU" value={tier.performance.cpu} color="bg-cyan-400" />
        <SpecBar label="RAM" value={tier.performance.ram} color="bg-primary" />
        <SpecBar label="Disk" value={tier.performance.storage} color="bg-amber-400" />
        <SpecBar label="Net" value={tier.performance.network} color="bg-emerald-400" />
      </div>
    </Card>
  </motion.div>
);

const HardwarePage = () => (
  <div className="min-h-screen relative">
    <SEOHead
      title="Hardware Specifications — VixonCloud"
      description="Detailed hardware specifications for all VixonCloud server tiers. Intel Platinum, AMD EPYC, DDR4/DDR5 ECC, NVMe RAID storage, and 10Gbps networking."
      path="/hardware"
    />
    <Navbar />
    <main className="pt-24 pb-20 relative z-10">
      {/* Hero */}
      <section className="container mx-auto px-4 max-w-5xl text-center mb-16">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Badge className="bg-primary/15 text-primary border border-primary/25 mb-5 gap-1.5">
            <Cpu className="h-3 w-3" /> HARDWARE
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight">
            Hardware <span className="gradient-text">Specifications</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade components powering every server. No compromises.
          </p>
        </motion.div>
      </section>

      {/* Game Servers */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <Badge className="bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 mb-4 gap-1.5">
            <Server className="h-3 w-3" /> GAME SERVERS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Game Server <span className="gradient-text">Tiers</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Optimized for Minecraft, Rust, and other game servers.
          </p>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {gameServers.map((tier, i) => (
            <SpecCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </section>

      {/* VPS Nodes */}
      <section className="container mx-auto px-4 max-w-4xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <Badge className="bg-blue-500/15 text-blue-400 border border-blue-500/25 mb-4 gap-1.5">
            <Server className="h-3 w-3" /> VPS NODES
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            VPS <span className="gradient-text">Hardware</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Dedicated resources with guaranteed performance.
          </p>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2">
          {vpsNodes.map((tier, i) => (
            <SpecCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </section>

      {/* Bot Hosting */}
      <section className="container mx-auto px-4 max-w-xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 mb-4 gap-1.5">
            <Zap className="h-3 w-3" /> BOT HOSTING
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Bot <span className="gradient-text">Hardware</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Lightweight infrastructure for Discord bots and web apps.
          </p>
        </motion.div>
        <div className="grid gap-5">
          {botHosting.map((tier, i) => (
            <SpecCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </section>

      {/* Why Our Hardware */}
      <section className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <Badge className="bg-primary/15 text-primary border border-primary/25 mb-4 gap-1.5">
            <Zap className="h-3 w-3" /> WHY US
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Why Our <span className="gradient-text">Hardware</span>?
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Built for performance, reliability, and speed.
          </p>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUsCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`p-5 h-full bg-gradient-to-br ${card.accent} text-center`}>
                <card.icon className={`h-8 w-8 ${card.iconColor} mx-auto mb-3`} />
                <h3 className="font-bold text-sm mb-2">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {card.description}
                </p>
                <div className="pt-3 border-t border-border/30">
                  <p className="text-lg font-bold font-mono gradient-text">{card.stat}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {card.unit}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default HardwarePage;
