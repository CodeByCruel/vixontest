import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Cpu,
  HardDrive,
  Users,
  Zap,
  ShoppingCart,
  Gamepad2,
  Check,
  ArrowRight,
} from "lucide-react";
import { BILLING_URL } from "@/lib/vixon";

interface GameConfig {
  name: string;
  pricePerGb: Record<string, number>;
  playersPerGb: number;
}

const games: Record<string, GameConfig> = {
  minecraft: {
    name: "Minecraft",
    pricePerGb: { starter: 20, standard: 40, premium: 55 },
    playersPerGb: 8,
  },
  rust: {
    name: "Rust",
    pricePerGb: { starter: 30, standard: 30, premium: 30 },
    playersPerGb: 2.5,
  },
  palworld: {
    name: "Palworld",
    pricePerGb: { starter: 30, standard: 30, premium: 30 },
    playersPerGb: 3,
  },
  ark: {
    name: "Ark",
    pricePerGb: { starter: 30, standard: 30, premium: 30 },
    playersPerGb: 2,
  },
  valheim: {
    name: "Valheim",
    pricePerGb: { starter: 30, standard: 30, premium: 30 },
    playersPerGb: 5,
  },
  terraria: {
    name: "Terraria",
    pricePerGb: { starter: 30, standard: 30, premium: 30 },
    playersPerGb: 10,
  },
};

const presets = [
  {
    name: "Small SMP",
    desc: "2-10 players",
    ram: 2,
    cores: 2,
    storage: 20,
    price: "₹99",
    icon: Users,
  },
  {
    name: "Medium Network",
    desc: "20-50 players",
    ram: 8,
    cores: 4,
    storage: 80,
    price: "₹399",
    icon: Gamepad2,
  },
  {
    name: "Large Server",
    desc: "50-100+ players",
    ram: 16,
    cores: 8,
    storage: 200,
    price: "₹899",
    icon: Zap,
  },
];

const ServerConfigurator = () => {
  const [game, setGame] = useState("minecraft");
  const [ram, setRam] = useState([4]);
  const [cores, setCores] = useState([2]);
  const [storage, setStorage] = useState([40]);

  const currentGame = games[game];

  const calculated = useMemo(() => {
    const pricePerGb = currentGame.pricePerGb.starter;
    const rawPrice = ram[0] * pricePerGb;
    const price = Math.max(rawPrice, 99);

    const players = Math.floor(ram[0] * currentGame.playersPerGb);

    let tier = "Starter";
    let tierSlug = "starter";
    if (price >= 500) {
      tier = "Premium";
      tierSlug = "premium";
    } else if (price >= 200) {
      tier = "Standard";
      tierSlug = "standard";
    }

    return { price, players, tier, tierSlug, pricePerGb };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, ram]);

  const applyPreset = (preset: (typeof presets)[number]) => {
    setRam([preset.ram]);
    setCores([preset.cores]);
    setStorage([preset.storage]);
  };

  const orderUrl = `${BILLING_URL}`;

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title="Server Configurator — VixonCloud"
        description="Build and configure your perfect game server. Choose your game, RAM, CPU cores, and storage. Get instant pricing."
        path="/configurator"
      />
      <AnimatedBackground />
      <Navbar />
      <main className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs text-primary mb-6">
              SERVER CONFIGURATOR
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-display">
              Build <span className="gradient-text">Your Server</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Configure exactly what you need. Pick your game, tweak the specs, and see the price update in real-time.
            </p>
          </motion.div>

          {/* Main configurator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl gradient-border overflow-hidden mb-16"
          >
            <div className="grid lg:grid-cols-5 gap-0">

              {/* Left — Controls */}
              <div className="lg:col-span-3 p-8 space-y-8">
                {/* Game Type */}
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-medium tracking-wider uppercase">
                    Game Type
                  </label>
                  <Select value={game} onValueChange={setGame}>
                    <SelectTrigger className="h-11 bg-secondary/50 border-border/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(games).map(([key, g]) => (
                        <SelectItem key={key} value={key}>
                          {g.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* RAM */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs text-muted-foreground font-medium tracking-wider uppercase flex items-center gap-1.5">
                      <HardDrive className="h-3.5 w-3.5 text-primary" /> RAM
                    </label>
                    <motion.span
                      key={ram[0]}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-sm font-bold font-display text-primary"
                    >
                      {ram[0]} GB
                    </motion.span>
                  </div>
                  <Slider
                    value={ram}
                    onValueChange={setRam}
                    min={1}
                    max={32}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-1">
                    <span>1 GB</span>
                    <span>32 GB</span>
                  </div>
                </div>

                {/* CPU Cores */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs text-muted-foreground font-medium tracking-wider uppercase flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-primary" /> CPU Cores
                    </label>
                    <motion.span
                      key={cores[0]}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-sm font-bold font-display text-primary"
                    >
                      {cores[0]} cores
                    </motion.span>
                  </div>
                  <Slider
                    value={cores}
                    onValueChange={setCores}
                    min={1}
                    max={8}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-1">
                    <span>1</span>
                    <span>8</span>
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs text-muted-foreground font-medium tracking-wider uppercase flex items-center gap-1.5">
                      <HardDrive className="h-3.5 w-3.5 text-primary" /> Storage
                    </label>
                    <motion.span
                      key={storage[0]}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-sm font-bold font-display text-primary"
                    >
                      {storage[0]} GB NVMe
                    </motion.span>
                  </div>
                  <Slider
                    value={storage}
                    onValueChange={setStorage}
                    min={10}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-1">
                    <span>10 GB</span>
                    <span>500 GB</span>
                  </div>
                </div>

                {/* Player estimate */}
                <div className="flex items-center gap-3 rounded-xl bg-secondary/40 border border-border/30 px-4 py-3">
                  <Users className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground">Estimated players</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={calculated.players}
                        initial={{ y: -6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 6, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-lg font-bold font-display"
                      >
                        Up to {calculated.players} players
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Right — Summary */}
              <div className="lg:col-span-2 bg-secondary/20 border-l border-border/20 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
                    Configuration summary
                  </div>

                  {/* Specs list */}
                  <div className="space-y-3">
                    {[
                      { label: "Game", value: currentGame.name },
                      { label: "RAM", value: `${ram[0]} GB DDR4` },
                      { label: "CPU", value: `${cores[0]} Cores` },
                      { label: "Storage", value: `${storage[0]} GB NVMe` },
                      { label: "Players", value: `Up to ${calculated.players}` },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-border/20" />

                  {/* Tier badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Recommended tier</span>
                    <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                      {calculated.tier}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    ₹{calculated.pricePerGb}/GB • DDoS Protected
                  </div>

                  {/* Price */}
                  <div className="text-center py-4 rounded-xl bg-secondary/40 border border-border/20">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={calculated.price}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-4xl font-extrabold font-display gradient-text">
                          ₹{calculated.price}
                        </span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Order button */}
                <a href={orderUrl} target="_blank" rel="noopener noreferrer" className="mt-6">
                  <Button className="w-full gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold">
                    Order This Configuration <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Presets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-center mb-3">
              Not sure what you need?
            </h2>
            <p className="text-muted-foreground text-sm text-center mb-10 max-w-lg mx-auto">
              Try one of our recommended presets and customize from there.
            </p>
            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              {presets.map((preset, i) => (
                <motion.div
                  key={preset.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                >
                  <Card className="p-6 glass gradient-border card-lift h-full flex flex-col">
                    <preset.icon className="h-5 w-5 text-primary mb-3" />
                    <h3 className="font-display font-bold text-base mb-1">{preset.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{preset.desc}</p>
                    <div className="space-y-1.5 text-xs text-muted-foreground flex-1 mb-5">
                      <div className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary shrink-0" /> {preset.ram} GB RAM
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary shrink-0" /> {preset.cores} CPU Cores
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary shrink-0" /> {preset.storage} GB Storage
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-extrabold font-display gradient-text">
                        {preset.price}
                      </span>
                      <span className="text-xs text-muted-foreground">/mo</span>
                    </div>
                    <Button
                      onClick={() => applyPreset(preset)}
                      variant="outline"
                      className="w-full gap-1.5 text-xs font-semibold border-primary/30 hover:bg-primary/10"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Use this config
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServerConfigurator;
