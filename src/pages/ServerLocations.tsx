import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Wifi,
  Server,
  Shield,
  Zap,
  Clock,
} from "lucide-react";

const locations = [
  {
    name: "Mumbai",
    country: "India",
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
    latency: ["2-8ms (India)", "40-80ms (SEA)"],
    type: "Primary DC",
    hardware: "Intel/AMD mix",
    network: "10 Gbps",
    ddos: true,
    status: "online" as const,
  },
  {
    name: "Delhi",
    country: "India",
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
    latency: ["5-12ms (North India)"],
    type: "Edge Node",
    hardware: "Intel Xeon",
    network: "1 Gbps",
    ddos: true,
    status: "online" as const,
  },
  {
    name: "Singapore",
    country: "Singapore",
    flag: "\uD83C\uDDF8\uD83C\uDDEC",
    latency: ["30-60ms (India)", "10-30ms (SEA)"],
    type: "Asian Hub",
    hardware: "AMD EPYC",
    network: "10 Gbps",
    ddos: true,
    status: "online" as const,
  },
  {
    name: "Frankfurt",
    country: "Germany",
    flag: "\uD83C\uDDE9\uD83C\uDDEA",
    latency: ["80-120ms (India)", "10-30ms (EU)"],
    type: "European Hub",
    hardware: "Intel Platinum",
    network: "10 Gbps",
    ddos: true,
    status: "online" as const,
  },
  {
    name: "US West",
    country: "Oregon, USA",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    latency: ["150-200ms (India)", "5-20ms (US West)"],
    type: "Americas",
    hardware: "AMD EPYC",
    network: "10 Gbps",
    ddos: true,
    status: "online" as const,
  },
  {
    name: "US East",
    country: "Virginia, USA",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    latency: ["170-220ms (India)", "10-30ms (US East)"],
    type: "Americas",
    hardware: "Intel Xeon",
    network: "10 Gbps",
    ddos: true,
    status: "online" as const,
  },
  {
    name: "Sydney",
    country: "Australia",
    flag: "\uD83C\uDDE6\uD83C\uDDFA",
    latency: ["100-150ms (India)", "5-25ms (Oceania)"],
    type: "Oceania Hub",
    hardware: "AMD EPYC",
    network: "10 Gbps",
    ddos: true,
    status: "online" as const,
  },
];

const bestFor: { region: string; recommended: string; latency: string }[] = [
  { region: "India", recommended: "Mumbai / Delhi", latency: "2-12ms" },
  { region: "Southeast Asia", recommended: "Singapore", latency: "10-30ms" },
  { region: "East Asia", recommended: "Singapore", latency: "30-60ms" },
  { region: "Europe", recommended: "Frankfurt", latency: "10-30ms" },
  { region: "US West Coast", recommended: "US West (Oregon)", latency: "5-20ms" },
  { region: "US East Coast", recommended: "US East (Virginia)", latency: "10-30ms" },
  { region: "Oceania", recommended: "Sydney", latency: "5-25ms" },
  { region: "South America", recommended: "US East (Virginia)", latency: "40-80ms" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const ServerLocations = () => {
  return (
    <div className="min-h-screen relative">
      <SEOHead
        title="Server Locations — VixonCloud"
        description="Explore VixonCloud's global data center network across 7 locations worldwide. Low latency, DDoS protection, and NVMe storage on every node."
        path="/server-locations"
      />
      <AnimatedBackground />
      <Navbar />
      <main className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="inline-flex items-center gap-2 mb-5 bg-primary/10 text-primary border border-primary/20">
              <Globe className="h-3 w-3" />
              Global Network
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-3">
              Server <span className="gradient-text">Locations</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
              A worldwide network of data centers delivering low latency and high performance to every region.
            </p>

            {/* Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {[
                { icon: Globe, label: "7 Locations" },
                { icon: Clock, label: "99.99% Uptime" },
                { icon: Shield, label: "DDoS Protected" },
                { icon: Server, label: "NVMe Storage" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-primary/15 text-xs font-medium text-foreground"
                >
                  <stat.icon className="h-3.5 w-3.5 text-primary" />
                  {stat.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Location Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-20"
          >
            {locations.map((loc) => (
              <motion.div key={loc.name} variants={item}>
                <Card className="relative p-5 h-full bg-card/60 border-primary/15 hover:border-primary/25 card-lift transition-all overflow-hidden">
                  {/* Gradient accent top */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center text-lg">
                        {loc.flag}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm leading-tight">
                          {loc.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground">
                          {loc.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </div>
                      <span className="text-[10px] text-emerald-400 font-medium capitalize">
                        {loc.status}
                      </span>
                    </div>
                  </div>

                  {/* Latency */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Wifi className="h-3 w-3 text-primary" />
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                        Latency
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.latency.map((l) => (
                        <span
                          key={l}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15 font-mono"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-[11px]">
                      <span className="text-muted-foreground block mb-0.5">Type</span>
                      <span className="font-medium">{loc.type}</span>
                    </div>
                    <div className="text-[11px]">
                      <span className="text-muted-foreground block mb-0.5">Hardware</span>
                      <span className="font-medium">{loc.hardware}</span>
                    </div>
                    <div className="text-[11px]">
                      <span className="text-muted-foreground block mb-0.5">Network</span>
                      <span className="font-medium">{loc.network}</span>
                    </div>
                    <div className="text-[11px]">
                      <span className="text-muted-foreground block mb-0.5">DDoS</span>
                      <span className="font-medium flex items-center gap-1">
                        <Shield className="h-3 w-3 text-emerald-400" />
                        Protected
                      </span>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-amber-400" />
                      {loc.network} Uplink
                    </span>
                    <span className="flex items-center gap-1">
                      <Server className="h-3 w-3" />
                      {loc.hardware}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Find Best Location */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold font-display mb-2">
                Find the Best <span className="gradient-text">Location</span>
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Choose the data center closest to your players for the lowest ping.
              </p>
            </div>

            <Card className="overflow-hidden bg-card/60 border-primary/15">
              {/* Desktop table */}
              <div className="hidden sm:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left px-6 py-4 font-display font-bold text-xs text-muted-foreground uppercase tracking-wider">
                        Your Region
                      </th>
                      <th className="text-left px-6 py-4 font-display font-bold text-xs text-muted-foreground uppercase tracking-wider">
                        Best Server
                      </th>
                      <th className="text-left px-6 py-4 font-display font-bold text-xs text-muted-foreground uppercase tracking-wider">
                        Expected Latency
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bestFor.map((row, i) => (
                      <tr
                        key={row.region}
                        className={`border-b border-border/30 last:border-0 hover:bg-primary/5 transition-colors ${
                          i % 2 === 0 ? "bg-transparent" : "bg-primary/[0.02]"
                        }`}
                      >
                        <td className="px-6 py-3.5 font-medium text-foreground">
                          {row.region}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            {row.recommended}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 font-mono text-xs text-primary">
                          {row.latency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden divide-y divide-border/30">
                {bestFor.map((row) => (
                  <div key={row.region} className="p-4 hover:bg-primary/5 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{row.region}</span>
                      <span className="font-mono text-xs text-primary">{row.latency}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {row.recommended}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-16"
          >
            <Card className="p-8 text-center bg-gradient-to-br from-primary/10 via-primary/4 to-transparent border-primary/25">
              <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold mb-2">
                Ready to get started?
              </h3>
              <p className="text-muted-foreground text-xs mb-5 max-w-md mx-auto">
                Deploy your server on any of our 7 global locations. Instant setup, DDoS protection, and NVMe storage included.
              </p>
              <a href="https://billing.vixoncloud.com">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors glow-primary">
                  <Zap className="h-4 w-4" />
                  Deploy Now
                </button>
              </a>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServerLocations;
