import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gauge,
  Server,
  HardDrive,
  MemoryStick,
  Network,
  Zap,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { BILLING_URL } from "@/lib/vixon";

const serverTiers = [
  {
    name: "Starter",
    cpu: "Intel Xeon E5-2699 v4",
    clock: "3.2 GHz",
    ram: "DDR4 ECC",
    storage: "NVMe SSD",
    accent: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  },
  {
    name: "Standard",
    cpu: "Intel Platinum 8573C",
    clock: "4.2 GHz Boost",
    ram: "DDR4 ECC",
    storage: "NVMe RAID",
    accent: "from-primary/20 to-violet-500/10 border-primary/30",
    badge: "bg-primary/15 text-primary border-primary/25",
    popular: true,
  },
  {
    name: "Premium",
    cpu: "AMD EPYC 9J14",
    clock: "96C / 192T",
    ram: "DDR5 ECC",
    storage: "NVMe RAID-10",
    accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  },
];

const benchmarks = [
  {
    label: "Single-Core Performance",
    sub: "Geekbench 6 Style",
    icon: Zap,
    unit: "pts",
    data: [
      { tier: "Starter", value: 1450, max: 2100 },
      { tier: "Standard", value: 1820, max: 2100 },
      { tier: "Premium", value: 2100, max: 2100 },
    ],
    colors: ["bg-cyan-500", "bg-primary", "bg-amber-400"],
  },
  {
    label: "Multi-Core Performance",
    sub: "Geekbench 6 Style",
    icon: BarChart3,
    unit: "pts",
    data: [
      { tier: "Starter", value: 8200, max: 42000 },
      { tier: "Standard", value: 15400, max: 42000 },
      { tier: "Premium", value: 42000, max: 42000 },
    ],
    colors: ["bg-cyan-500", "bg-primary", "bg-amber-400"],
  },
  {
    label: "Disk Sequential Read",
    sub: "NVMe Throughput",
    icon: HardDrive,
    unit: "MB/s",
    data: [
      { tier: "Starter", value: 3200, max: 7450 },
      { tier: "Standard", value: 5500, max: 7450 },
      { tier: "Premium", value: 7450, max: 7450 },
    ],
    colors: ["bg-cyan-500", "bg-primary", "bg-amber-400"],
  },
  {
    label: "Disk Sequential Write",
    sub: "NVMe Throughput",
    icon: HardDrive,
    unit: "MB/s",
    data: [
      { tier: "Starter", value: 2800, max: 6900 },
      { tier: "Standard", value: 4800, max: 6900 },
      { tier: "Premium", value: 6900, max: 6900 },
    ],
    colors: ["bg-cyan-500", "bg-primary", "bg-amber-400"],
  },
  {
    label: "Memory Bandwidth",
    sub: "DDR4 / DDR5",
    icon: MemoryStick,
    unit: "GB/s",
    data: [
      { tier: "Starter", value: 38, max: 95 },
      { tier: "Standard", value: 52, max: 95 },
      { tier: "Premium", value: 95, max: 95 },
    ],
    colors: ["bg-cyan-500", "bg-primary", "bg-amber-400"],
  },
];

const minecraftData = [
  { metric: "TPS (20 players)", starter: "19.8", standard: "20.0", premium: "20.0" },
  { metric: "TPS (50 players)", starter: "18.5", standard: "19.7", premium: "20.0" },
  { metric: "TPS (100 players)", starter: "15.2", standard: "19.2", premium: "19.9" },
  { metric: "Chunk Load Time", starter: "120ms", standard: "45ms", premium: "18ms" },
  { metric: "World Save Time", starter: "8.5s", standard: "3.2s", premium: "1.1s" },
  { metric: "Mod Pack Load", starter: "45s", standard: "22s", premium: "12s" },
];

const networkData = [
  { city: "Mumbai", latency: "2ms", tier: "Primary Node" },
  { city: "Delhi", latency: "8ms", tier: "Primary Node" },
  { city: "Singapore", latency: "22ms", tier: "Edge" },
  { city: "Tokyo", latency: "48ms", tier: "Edge" },
  { city: "Frankfurt", latency: "95ms", tier: "Edge" },
  { city: "New York", latency: "140ms", tier: "Edge" },
];

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

const BenchmarksPage = () => (
  <div className="min-h-screen relative">
    <SEOHead
      title="Performance Benchmarks — VixonCloud"
      description="See real performance benchmarks for VixonCloud servers. Compare hardware tiers, Minecraft TPS, disk speeds, and network latency."
      path="/benchmarks"
    />
    <AnimatedBackground />
    <Navbar />
    <main className="pt-24 pb-20 relative z-10">
      {/* Hero */}
      <section className="container mx-auto px-4 max-w-5xl text-center mb-16">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Badge className="bg-primary/15 text-primary border border-primary/25 mb-5 gap-1.5">
            <Gauge className="h-3 w-3" /> BENCHMARKS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight">
            Performance <span className="gradient-text">Benchmarks</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            See the numbers, don't just trust the words.
          </p>
        </motion.div>
      </section>

      {/* Hardware Specs */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Hardware <span className="gradient-text">Specs</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Enterprise-grade components across every tier.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {serverTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`p-6 h-full bg-gradient-to-br ${tier.accent} relative overflow-hidden`}
              >
                {tier.popular && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground text-[10px]">
                      POPULAR
                    </Badge>
                  </div>
                )}
                <Badge className={`mb-4 ${tier.badge}`}>{tier.name}</Badge>
                <div className="space-y-3 mt-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Processor
                    </p>
                    <p className="text-sm font-semibold">{tier.cpu}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Clock Speed
                    </p>
                    <p className="text-sm font-semibold">{tier.clock}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Memory
                    </p>
                    <p className="text-sm font-semibold">{tier.ram}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Storage
                    </p>
                    <p className="text-sm font-semibold">{tier.storage}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benchmark Results */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Benchmark <span className="gradient-text">Results</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Real-world performance measured across all tiers.
          </p>
        </motion.div>

        <div className="space-y-6">
          {benchmarks.map((bench, idx) => (
            <motion.div
              key={bench.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
            >
              <Card className="p-5 bg-card/60 border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <bench.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">{bench.label}</p>
                    <p className="text-[11px] text-muted-foreground">{bench.sub}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {bench.data.map((d, i) => (
                    <div key={d.tier} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-20 shrink-0 text-right">
                        {d.tier}
                      </span>
                      <div className="flex-1 h-5 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${bench.colors[i]}`}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(d.value / d.max) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.07 + i * 0.15, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs font-mono font-semibold w-24 text-right">
                        {d.value.toLocaleString()} {bench.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Minecraft Benchmarks */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Minecraft <span className="gradient-text">Benchmarks</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            How our servers handle real Minecraft workloads.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden bg-card/60 border-primary/15">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-semibold text-muted-foreground">
                      Metric
                    </th>
                    <th className="text-center p-4 font-semibold text-cyan-400">
                      Starter
                    </th>
                    <th className="text-center p-4 font-semibold text-primary">
                      Standard
                    </th>
                    <th className="text-center p-4 font-semibold text-amber-400">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {minecraftData.map((row, i) => (
                    <motion.tr
                      key={row.metric}
                      className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td className="p-4 font-medium">{row.metric}</td>
                      <td className="p-4 text-center font-mono">{row.starter}</td>
                      <td className="p-4 text-center font-mono">{row.standard}</td>
                      <td className="p-4 text-center font-mono">{row.premium}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Network Benchmarks */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">
            Network <span className="gradient-text">Latency</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
            Low-latency connections to major cities worldwide.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {networkData.map((n, i) => (
            <motion.div
              key={n.city}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="p-4 bg-card/60 border-primary/10 hover:border-primary/30 card-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{n.city}</p>
                    <p className="text-[11px] text-muted-foreground">{n.tier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold font-mono gradient-text">
                      {n.latency}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      RTT
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
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
            <Server className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold font-display mb-3">
              Ready to experience the{" "}
              <span className="gradient-text">performance</span>?
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
              Deploy on hardware that actually delivers. No overselling, no shared
              cores, no bottlenecks.
            </p>
            <a href={BILLING_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="gap-2 glow-primary bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Order Now <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </Card>
        </motion.div>
      </section>
    </main>
    <Footer />
  </div>
);

export default BenchmarksPage;
