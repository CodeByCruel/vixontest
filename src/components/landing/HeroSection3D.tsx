import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket, Boxes, Server, ArrowRight, ChevronDown, Sparkles,
  Globe2, Zap, Shield, Wifi, Cpu, Users, Star, ExternalLink,
  Clock, Gauge,
} from "lucide-react";
import { BILLING_URL, DISCORD_INVITE } from "@/lib/vixon";
import HeroScene3D from "./HeroScene3D";

const heroWords = ["Gaming", "VPS", "Bots", "Websites", "Infrastructure"];
const heroColors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

function TypingWord() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = heroWords[index];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(word.substring(0, text.length + 1));
          if (text === word) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setText(word.substring(0, text.length - 1));
          if (text === "") {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % heroWords.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <span style={{ color: heroColors[index] }} className="inline-block min-w-[200px]">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <HeroScene3D />

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2.5 rounded-full glass border border-primary/30 px-4 py-2 text-[11px] font-medium text-primary mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            All systems operational — 99.99% uptime guaranteed
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 font-display"
            style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Blazing-Fast
            <br />
            <TypingWord />
            <br />
            <span className="gradient-text animate-text-glow">Hosting</span>
          </motion.h1>

          <motion.p
            className="text-white/60 text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Deploy Minecraft, GTA, Rust and 50+ games in{" "}
            <span className="text-white/90 font-semibold">under 60 seconds</span>.
            Enterprise Ryzen 9 hardware, sub-10ms latency, and a global mesh network
            built for{" "}
            <span className="text-white/90 font-semibold">zero lag</span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href={BILLING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold glow-primary transition-all text-sm animate-glow-pulse"
                style={{
                  boxShadow: "0 10px 40px -10px rgba(59,130,246,0.5)",
                }}
              >
                <Rocket className="h-4 w-4" />
                Deploy Now — It's Free to Start
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/minecraft-plans"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass-strong font-semibold text-sm hover:bg-white/10 transition-all group"
              >
                <Boxes className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                View Plans & Pricing
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass-strong font-semibold text-sm hover:bg-white/10 transition-all group"
              >
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                Join Community
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              { k: "99.99%", v: "Uptime SLA", icon: Shield, color: "#10b981" },
              { k: "<60s", v: "Deploy Time", icon: Zap, color: "#f59e0b" },
              { k: "<10ms", v: "Avg Latency", icon: Wifi, color: "#3b82f6" },
              { k: "24/7", v: "Expert Support", icon: Clock, color: "#06b6d4" },
            ].map((s, i) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2.5 cursor-default"
              >
                <div
                  className="w-8 h-8 rounded-lg grid place-items-center"
                  style={{ backgroundColor: s.color + "15" }}
                >
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{s.k}</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">{s.v}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-[2] pointer-events-none" />
    </section>
  );
}
