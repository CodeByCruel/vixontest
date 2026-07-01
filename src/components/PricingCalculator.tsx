import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, HardDrive, MemoryStick, Users, ShoppingCart, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

type Tier = "starter" | "standard" | "premium";

const tiers: Record<Tier, { name: string; cpu: string; ramPrice: number; maxPlayersPerGb: number; gradient: string; color: string }> = {
  starter: { name: "Starter", cpu: "Intel Platinum 8269-CY", ramPrice: 20, maxPlayersPerGb: 40, gradient: "from-blue-500/20 to-cyan-500/20", color: "text-cyan-400" },
  standard: { name: "Standard", cpu: "AMD EPYC 7K62", ramPrice: 40, maxPlayersPerGb: 80, gradient: "from-purple-500/20 to-pink-500/20", color: "text-purple-400" },
  premium: { name: "Premium", cpu: "AMD EPYC 9754", ramPrice: 55, maxPlayersPerGb: 160, gradient: "from-amber-500/20 to-orange-500/20", color: "text-amber-400" },
};

const BASE_STORAGE = 10;

function calculatePrice(ram: number, storage: number, tier: Tier) {
  const t = tiers[tier];
  const ramCost = ram * t.ramPrice;
  const extraStorage = Math.max(0, storage - BASE_STORAGE);
  const storageCost = extraStorage * 5;
  return ramCost + storageCost;
}

function calculatePlayers(ram: number, tier: Tier) {
  return ram * tiers[tier].maxPlayersPerGb;
}

function getRecommendedTier(ram: number, players: number): Tier {
  const minRamNeeded = players / 160;
  if (ram >= minRamNeeded * 2.5) return "premium";
  if (ram >= minRamNeeded * 1.2) return "standard";
  return "starter";
}

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const start = prev.current;
    const end = value;
    prev.current = value;
    if (start === end) return;

    const duration = 300;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>₹{display.toLocaleString("en-IN")}</span>;
}

export default function PricingCalculator() {
  const [ram, setRam] = useState(8);
  const [storage, setStorage] = useState(40);
  const [selectedTier, setSelectedTier] = useState<Tier>("standard");

  const recommended = getRecommendedTier(ram, calculatePlayers(ram, selectedTier));
  const players = calculatePlayers(ram, selectedTier);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Main Controls Card */}
      <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${tiers[selectedTier].gradient} opacity-60 pointer-events-none`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="relative p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
              <Zap className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Configure Your Server</h2>
              <p className="text-sm text-white/50">Adjust specs to see real-time pricing</p>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* RAM Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MemoryStick className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white/80">RAM</span>
                </div>
                <motion.span
                  key={ram}
                  initial={{ scale: 1.2, color: "#60a5fa" }}
                  animate={{ scale: 1, color: "rgba(255,255,255,0.9)" }}
                  className="text-lg font-bold tabular-nums"
                >
                  {ram} GB
                </motion.span>
              </div>
              <Slider
                value={[ram]}
                onValueChange={(v) => setRam(v[0])}
                min={2}
                max={32}
                step={2}
                className="[&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-400 [&_[role=slider]]:shadow-[0_0_12px_rgba(59,130,246,0.5)] [&_[data-orientation=horizontal]>.bg-primary]:bg-gradient-to-r [&_[data-orientation=horizontal]>.bg-primary]:from-blue-500 [&_[data-orientation=horizontal]>.bg-primary]:to-cyan-400"
              />
              <div className="flex justify-between text-xs text-white/40">
                <span>2 GB</span>
                <span>32 GB</span>
              </div>
            </div>

            {/* Storage Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white/80">Storage</span>
                </div>
                <motion.span
                  key={storage}
                  initial={{ scale: 1.2, color: "#34d399" }}
                  animate={{ scale: 1, color: "rgba(255,255,255,0.9)" }}
                  className="text-lg font-bold tabular-nums"
                >
                  {storage} GB
                </motion.span>
              </div>
              <Slider
                value={[storage]}
                onValueChange={(v) => setStorage(v[0])}
                min={10}
                max={160}
                step={5}
                className="[&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-400 [&_[role=slider]]:shadow-[0_0_12px_rgba(16,185,129,0.5)] [&_[data-orientation=horizontal]>.bg-primary]:bg-gradient-to-r [&_[data-orientation=horizontal]>.bg-primary]:from-emerald-500 [&_[data-orientation=horizontal]>.bg-primary]:to-teal-400"
              />
              <div className="flex justify-between text-xs text-white/40">
                <span>10 GB</span>
                <span>160 GB</span>
              </div>
            </div>
          </div>

          {/* Auto-calculated info */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2.5">
              <Users className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-white/60">Players:</span>
              <motion.span
                key={players}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-sm font-bold text-white/90"
              >
                {players}
              </motion.span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2.5">
              <HardDrive className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-white/60">Base storage: {BASE_STORAGE} GB (included)</span>
            </div>
            {storage > BASE_STORAGE && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-2.5"
              >
                <span className="text-sm text-amber-400">+{storage - BASE_STORAGE} GB extra storage</span>
              </motion.div>
            )}
          </div>
        </div>
      </Card>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {(Object.keys(tiers) as Tier[]).map((tierKey) => {
          const tier = tiers[tierKey];
          const price = calculatePrice(ram, storage, tierKey);
          const tierPlayers = calculatePlayers(ram, tierKey);
          const isRecommended = recommended === tierKey;
          const isSelected = selectedTier === tierKey;

          return (
            <motion.div
              key={tierKey}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTier(tierKey)}
              className="cursor-pointer"
            >
              <Card
                className={`relative overflow-hidden border transition-all duration-300 backdrop-blur-xl ${
                  isSelected
                    ? "border-white/30 bg-white/10 shadow-xl shadow-white/5 ring-1 ring-white/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} pointer-events-none transition-opacity ${isSelected ? "opacity-80" : "opacity-40"}`} />

                <div className="relative p-6 space-y-4">
                  {/* Recommended badge */}
                  {isRecommended && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-3 right-3"
                    >
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-amber-500/25">
                        <Zap className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    </motion.div>
                  )}

                  {/* Tier info */}
                  <div className="space-y-2">
                    <h3 className={`text-xl font-bold ${tier.color}`}>{tier.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <Cpu className="h-3 w-3" />
                      <span>{tier.cpu}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-extrabold ${tier.color}`}>
                        <AnimatedPrice value={price} />
                      </span>
                      <span className="text-sm text-white/40">/mo</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">RAM</span>
                      <span className="font-medium text-white/80">{ram} GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">Storage</span>
                      <span className="font-medium text-white/80">{storage} GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">Max Players</span>
                      <span className="font-medium text-white/80">{tierPlayers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">Price/GB RAM</span>
                      <span className="font-medium text-white/80">₹{tier.ramPrice}</span>
                    </div>
                  </div>

                  {/* Order Button */}
                  <a
                    href="https://discord.gg/TtV26hZEJx"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center justify-center gap-2 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isSelected
                        ? "bg-white text-black hover:bg-white/90 shadow-lg"
                        : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Order Now
                  </a>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
