import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRight, Gamepad2, Search, Sparkles, Zap, Shield, Clock, Server,
  Star, Quote, ThumbsUp, MessageCircle, Check, X, ChevronRight, Users, HardDrive,
} from "lucide-react";

import minecraft from "@/assets/games/minecraft.png";
import rust from "@/assets/games/rust.png";
import palworld from "@/assets/games/palworld.png";
import valheim from "@/assets/games/valheim.png";
import ark from "@/assets/games/ark.png";
import terraria from "@/assets/games/terraria.png";
import hytale from "@/assets/games/hytale.png";
import satisfactory from "@/assets/games/satisfactory.png";
import sevenDays from "@/assets/games/7days.png";

import minecraftBg from "@/assets/hero/minecraft-bg.jpg";
import rustBg from "@/assets/hero/rust-bg.jpg";
import palworldBg from "@/assets/hero/palworld-bg.jpg";
import terrariaBg from "@/assets/hero/terraria-bg.jpg";
import hytaleBg from "@/assets/hero/hytale-bg.jpg";
import gta5Bg from "@/assets/hero/gta5-bg.jpg";

const BILLING_URL = "https://billing.vixoncloud.com";
const DISCORD_LINK = "https://discord.gg/TtV26hZEJx";

type Category = "all" | "survival" | "sandbox" | "adventure" | "building" | "popular";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All Games" },
  { key: "survival", label: "Survival" },
  { key: "sandbox", label: "Sandbox" },
  { key: "adventure", label: "Adventure" },
  { key: "building", label: "Building" },
  { key: "popular", label: "Popular" },
];

const games = [
  { name: "Minecraft", img: minecraft, bg: minecraftBg, desc: "World's most popular sandbox game with endless possibilities", price: "From ₹20/GB", available: true, link: "/minecraft-plans", tag: "Popular", category: "sandbox" as Category, players: "100+", mods: true, storage: "NVMe" },
  { name: "Hytale", img: hytale, bg: hytaleBg, desc: "Next-gen adventure and building with voxel graphics", price: "Coming Soon", available: false, tag: "Coming Soon", category: "adventure" as Category, players: "50+", mods: false, storage: "NVMe" },
  { name: "Rust", img: rust, bg: rustBg, desc: "Survive, build, and dominate in this harsh multiplayer world", price: "From ₹80/slot", available: true, tag: "Popular", category: "survival" as Category, players: "200+", mods: true, storage: "NVMe" },
  { name: "Palworld", img: palworld, bg: palworldBg, desc: "Open-world survival crafting with mysterious creatures", price: "From ₹60/GB", available: true, category: "survival" as Category, players: "32+", mods: true, storage: "NVMe" },
  { name: "ARK: Survival", img: ark, bg: minecraftBg, desc: "Tame dinosaurs and survive in a prehistoric world", price: "From ₹70/GB", available: true, category: "survival" as Category, players: "70+", mods: true, storage: "NVMe" },
  { name: "Terraria", img: terraria, bg: terrariaBg, desc: "2D sandbox adventure with tModLoader support", price: "From ₹30/GB", available: true, category: "sandbox" as Category, players: "8+", mods: true, storage: "NVMe" },
  { name: "Valheim", img: valheim, bg: palworldBg, desc: "Explore a Viking world with friends", price: "From ₹50/GB", available: true, category: "adventure" as Category, players: "10+", mods: true, storage: "NVMe" },
  { name: "Satisfactory", img: satisfactory, bg: gta5Bg, desc: "Build giant factories on an alien planet", price: "From ₹60/GB", available: true, category: "building" as Category, players: "8+", mods: false, storage: "NVMe" },
  { name: "7 Days to Die", img: sevenDays, bg: rustBg, desc: "Zombie survival with crafting and base building", price: "From ₹50/GB", available: true, category: "survival" as Category, players: "8+", mods: true, storage: "NVMe" },
];

const marqueeGames = [...games, ...games];

const stats = [
  { icon: Gamepad2, label: "9 Games Supported" },
  { icon: Clock, label: "99.9% Uptime" },
  { icon: Zap, label: "Instant Deployment" },
  { icon: Shield, label: "DDoS Protected" },
  { icon: HardDrive, label: "NVMe Storage" },
  { icon: Server, label: "24/7 Support" },
];

const comparisonData = [
  { game: "Minecraft", mods: true, players: "100+", storage: "5× RAM", price: "₹20/GB", slug: "/minecraft-plans" },
  { game: "Rust", mods: true, players: "200", storage: "20GB+", price: "₹80/slot", slug: null },
  { game: "Palworld", mods: true, players: "32", storage: "25GB+", price: "₹60/GB", slug: null },
  { game: "ARK", mods: true, players: "70", storage: "50GB+", price: "₹70/GB", slug: null },
  { game: "Terraria", mods: true, players: "8", storage: "5GB+", price: "₹30/GB", slug: null },
  { game: "Valheim", mods: true, players: "10", storage: "10GB+", price: "₹50/GB", slug: null },
  { game: "Satisfactory", mods: false, players: "8", storage: "10GB+", price: "₹60/GB", slug: null },
  { game: "7 Days", mods: true, players: "8", storage: "10GB+", price: "₹50/GB", slug: null },
];

const reviews = [
  { name: "Aarav K.", text: "Best MC hosting I've ever used. Zero lag with 80+ players on my SMP. The DDoS protection saved us three times last month alone.", stars: 5, role: "SMP Owner" },
  { name: "Sneha R.", text: "Deployed a Rust server in 45 seconds flat. The one-click mod installer saved me hours of manual setup. Highly recommended!", stars: 5, role: "Game Developer" },
  { name: "Rohan M.", text: "Ryzen 9 performance is insane — consistent 20 TPS with 100+ players, mods, and plugins. The NVMe storage makes chunk loading instant.", stars: 5, role: "Server Admin" },
];

const featuredGame = games[0];

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AllGames = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Category>("all");

  const filtered = games.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "popular" && g.tag === "Popular") || g.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      <main className="pt-20 relative z-10">

        {/* ═══ HERO SECTION ═══ */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <motion.div
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6 animate-shimmer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Gamepad2 className="h-3.5 w-3.5" />
                Game Server Hosting
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight font-display mb-5">
                Host Your{" "}
                <motion.span
                  className="gradient-text inline-block"
                  whileInView={{ scale: [0.8, 1.05, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Favorite Games
                </motion.span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Lightning-fast performance, unbeatable reliability, and 24/7 support for all your favorite games with VixonCloud.
              </p>
            </motion.div>

            {/* Quick Stats Row */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-2 glass rounded-xl px-4 py-2.5"
                >
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground/80">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating game icons background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[minecraft, rust, palworld, terraria, valheim].map((img, i) => (
              <motion.img
                key={i}
                src={img}
                className="absolute w-10 h-10 rounded-lg opacity-[0.04] object-cover"
                style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
            ))}
          </div>
        </section>

        {/* ═══ FEATURED GAME SPOTLIGHT ═══ */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold tracking-wider text-primary uppercase font-display">Featured Game</h2>
              <div className="flex-1 h-px bg-primary/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="rounded-2xl overflow-hidden glass gradient-border"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img src={featuredGame.bg} alt={featuredGame.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:hidden" />
                <Badge className="absolute top-4 left-4 gap-1 bg-primary/90 text-primary-foreground text-xs font-semibold">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </Badge>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <img src={featuredGame.img} alt={featuredGame.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-2xl font-extrabold font-display">{featuredGame.name}</h3>
                    <p className="text-xs text-primary font-semibold">{featuredGame.price}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{featuredGame.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    { icon: Users, text: `${featuredGame.players} Players` },
                    { icon: HardDrive, text: `${featuredGame.storage} Storage` },
                    { icon: Zap, text: "Instant Setup" },
                    { icon: Shield, text: "DDoS Protected" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className="h-3.5 w-3.5 text-primary" /> {text}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => navigate(featuredGame.link!)}
                  className="w-full gap-2 glow-primary font-semibold text-sm"
                  size="lg"
                >
                  Deploy {featuredGame.name} Server <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ SCROLLING MARQUEE ═══ */}
        <section className="relative py-6 overflow-hidden mb-16 border-y border-border/8">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Row 1 */}
          <motion.div
            className="flex gap-4 w-max mb-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {marqueeGames.map((game, i) => (
              <div
                key={`r1-${i}`}
                className="relative flex-shrink-0 w-40 h-24 rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => game.link ? navigate(game.link) : window.open(BILLING_URL, "_blank")}
              >
                <img src={game.img} alt={game.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-bold text-white font-display">{game.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Row 2 - reverse */}
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeGames].reverse().map((game, i) => (
              <div
                key={`r2-${i}`}
                className="relative flex-shrink-0 w-40 h-24 rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => game.link ? navigate(game.link) : window.open(BILLING_URL, "_blank")}
              >
                <img src={game.img} alt={game.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-bold text-white font-display">{game.name}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══ GAMES GRID WITH FILTERS ═══ */}
        <section className="container mx-auto px-4 pb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold font-display">All Games</h2>
              <p className="text-xs text-muted-foreground mt-1">Showing {filtered.length} games</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search games..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 w-44 text-xs rounded-lg bg-secondary/50 border-border/30"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  filter === cat.key
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Game Cards Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((game, i) => (
                <motion.div
                  key={game.name}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <TiltCard className="h-full">
                    <Card className="overflow-hidden h-full glass gradient-border card-hover transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img src={game.img} alt={game.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {game.tag && (
                            <Badge className="gap-1 bg-primary/90 text-primary-foreground text-[10px] font-semibold">
                              <Sparkles className="h-3 w-3" /> {game.tag}
                            </Badge>
                          )}
                          <Badge className="bg-secondary/80 text-muted-foreground text-[10px] font-semibold backdrop-blur-sm">
                            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
                          </Badge>
                        </div>
                        {game.mods && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-emerald-500/90 text-white text-[10px] font-semibold gap-1">
                              <Check className="h-3 w-3" /> Mods
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5 space-y-3">
                        <h3 className="font-bold text-lg font-display">{game.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{game.desc}</p>
                        <div className="flex items-center gap-4 pt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3 text-primary" /> {game.players}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <HardDrive className="h-3 w-3 text-primary" /> {game.storage}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-sm font-bold text-primary">{game.price}</span>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground animate-pulse">
                            <Zap className="h-3 w-3 text-primary" /> Instant Setup
                          </div>
                        </div>
                        <Button
                          onClick={() => game.link ? navigate(game.link) : window.open(BILLING_URL, "_blank")}
                          disabled={!game.available}
                          className="w-full gap-2 text-xs font-semibold"
                          variant={game.available ? "default" : "outline"}
                          size="sm"
                        >
                          {game.available ? (
                            <>Deploy Server <ArrowRight className="h-3.5 w-3.5" /></>
                          ) : (
                            "Coming Soon"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Gamepad2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">No games found matching "{search}"</p>
            </motion.div>
          )}
        </section>

        {/* ═══ GAME COMPARISON TABLE ═══ */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold font-display">Compare <span className="gradient-text">Games</span></h2>
            <p className="text-xs text-muted-foreground mt-2">See what each game offers at a glance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl glass gradient-border overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="px-5 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Game</th>
                    <th className="px-5 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Mod Support</th>
                    <th className="px-5 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Max Players</th>
                    <th className="px-5 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Storage</th>
                    <th className="px-5 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Price</th>
                    <th className="px-5 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <motion.tr
                      key={row.game}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/30 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm font-semibold font-display">{row.game}</td>
                      <td className="px-5 py-3.5">
                        {row.mods ? (
                          <span className="flex items-center gap-1.5 text-xs text-emerald-400"><Check className="h-3.5 w-3.5" /> Yes</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground/50"><X className="h-3.5 w-3.5" /> No</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{row.players}</td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{row.storage}</td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-primary">{row.price}</td>
                      <td className="px-5 py-3.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1 text-xs text-primary h-7 px-2"
                          onClick={() => row.slug ? navigate(row.slug) : window.open(BILLING_URL, "_blank")}
                        >
                          View <ChevronRight className="h-3 w-3" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-4 animate-shimmer">
              <MessageCircle className="h-3.5 w-3.5" />
              Trusted by Gamers
            </div>
            <h2 className="text-2xl font-bold font-display">Loved by <span className="gradient-text">Players</span></h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
            {reviews.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full glass gradient-border p-5 relative overflow-hidden">
                  <Quote className="absolute top-4 right-4 h-7 w-7 text-primary/5" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center font-bold text-sm text-primary font-display">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm font-display">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.role}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: t.stars }).map((_, j) => (
                          <Star key={j} className="h-2.5 w-2.5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">"{t.text}"</p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> Helpful</span>
                    <span>Verified Customer</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl mx-auto text-center rounded-2xl glass gradient-border p-10 md:p-14 overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(210 100% 55% / 0.08), transparent 70%)" }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10">
                <motion.h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4 font-display">
                  Ready to{" "}
                  <motion.span
                    className="gradient-text inline-block"
                    whileInView={{ rotateY: [90, 0] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Deploy?
                  </motion.span>
                </motion.h2>
                <motion.p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed">
                  Join thousands of gamers on VixonCloud. Deploy your game server in under 60 seconds.
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                    <Button size="lg" onClick={() => window.open(BILLING_URL, "_blank")} className="glow-primary gap-2 px-8 text-sm font-bold rounded-xl h-11 bg-primary text-primary-foreground hover:bg-primary/90">
                      Order Now
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                    <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" variant="outline" className="gap-2 px-8 text-sm border-border/30 hover:border-primary/30 rounded-xl h-11">
                        <MessageCircle className="h-4 w-4" /> Discord
                      </Button>
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllGames;
