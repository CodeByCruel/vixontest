import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Server, Cpu, HardDrive, Wifi, Shield, Zap, Activity, Database,
  Gauge, Boxes, CheckCircle2, Rocket, Globe2, Network, Lock,
} from "lucide-react";
import { BILLING_URL, DISCORD_INVITE } from "@/lib/vixon";

/* ---------- helpers ---------- */
const clampProgress = (n: number) => Math.min(1, Math.max(0, n));

const between = (v: MotionValue<number>, a: number, b: number, vals: [number, number, number, number] = [0, 1, 1, 0]) =>
  useTransform(v, [a - 0.06, a, b, b + 0.06].map(clampProgress), vals);

/* ---------- background SVG scene that "comes alive" ---------- */
function InfrastructureScene({ p }: { p: MotionValue<number> }) {
  const reduce = useReducedMotion();

  // Camera zoom across the whole timeline
  const scale = useTransform(p, [0, 1], [1, reduce ? 1 : 1.55]);
  const y = useTransform(p, [0, 1], ["0%", reduce ? "0%" : "-8%"]);

  // Phase-based opacities
  const racksOn      = useTransform(p, [0.04, 0.14], [0.15, 1]);
  const coolingOn    = useTransform(p, [0.10, 0.18], [0, 1]);
  const linesOn      = useTransform(p, [0.18, 0.30], [0, 1]);
  const packetsOn    = useTransform(p, [0.22, 0.32], [0, 1]);
  const gameOn       = useTransform(p, [0.36, 0.46], [0, 1]);
  const vpsOn        = useTransform(p, [0.54, 0.64], [0, 1]);
  const shieldsOn    = useTransform(p, [0.72, 0.82], [0, 1]);
  const deployOn     = useTransform(p, [0.86, 0.94], [0, 1]);

  // Packet flow
  const packetX1 = useTransform(p, [0.22, 0.5], [120, 880]);
  const packetX2 = useTransform(p, [0.30, 0.6], [880, 120]);
  const packetX3 = useTransform(p, [0.40, 0.7], [200, 800]);

  const ringR = useTransform(p, [0.7, 0.85], [0, 320]);
  const ringO = useTransform(p, [0.7, 0.78, 0.85], [0.0, 0.5, 0]);

  const lights = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({ i, delay: (i % 6) * 0.15 })),
    []
  );

  return (
    <motion.div className="absolute inset-0" style={{ scale, y }}>
      {/* deep gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(210_100%_18%/0.35),transparent_60%),radial-gradient(ellipse_at_bottom,hsl(195_100%_30%/0.18),transparent_55%)]" />
      {/* dot grid floor */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      <svg viewBox="0 0 1000 700" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="rack" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(210 50% 14%)" />
            <stop offset="100%" stopColor="hsl(220 40% 8%)" />
          </linearGradient>
          <linearGradient id="line" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(195 100% 60%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(195 100% 65%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(210 100% 60%)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="glow" r="50%">
            <stop offset="0%" stopColor="hsl(195 100% 70%)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(195 100% 70%)" stopOpacity="0" />
          </radialGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        {/* ------- DATACENTER FLOOR PERSPECTIVE GRID ------- */}
        <g opacity="0.35">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={420 + i * 22} x2="1000" y2={420 + i * 22}
              stroke="hsl(210 100% 55%)" strokeOpacity={0.08 + i * 0.02} />
          ))}
          {Array.from({ length: 22 }).map((_, i) => {
            const x = i * 50;
            return <line key={`v${i}`} x1={x} y1="420" x2={500 + (x - 500) * 2.2} y2="700"
              stroke="hsl(210 100% 55%)" strokeOpacity="0.12" />;
          })}
        </g>

        {/* ------- SERVER RACKS ------- */}
        <motion.g style={{ opacity: racksOn }}>
          {Array.from({ length: 7 }).map((_, i) => {
            const x = 110 + i * 115;
            return (
              <g key={i}>
                <rect x={x} y={220} width={80} height={210} rx={6} fill="url(#rack)" stroke="hsl(210 100% 55% / 0.25)" />
                {Array.from({ length: 9 }).map((__, j) => (
                  <g key={j}>
                    <rect x={x + 6} y={232 + j * 21} width={68} height={15} rx={2}
                      fill="hsl(220 30% 10%)" stroke="hsl(210 100% 55% / 0.15)" />
                    <motion.circle
                      cx={x + 14} cy={239 + j * 21} r={2.2}
                      fill="hsl(140 90% 60%)"
                      style={{ opacity: racksOn }}
                      animate={reduce ? {} : { opacity: [0.35, 1, 0.35] }}
                      transition={{ duration: 2 + (j % 3), repeat: Infinity, delay: (i + j) * 0.1 }}
                    />
                    <rect x={x + 22} y={237} height={2} width={40} fill="hsl(210 100% 55% / 0.25)" />
                  </g>
                ))}
              </g>
            );
          })}
        </motion.g>

        {/* ------- COOLING / AMBIENT GLOWS ------- */}
        <motion.g style={{ opacity: coolingOn }}>
          {[180, 410, 640, 870].map((cx, i) => (
            <circle key={i} cx={cx} cy={210} r="90" fill="url(#glow)" filter="url(#soft)" />
          ))}
        </motion.g>

        {/* ------- CONNECTION LINES (network) ------- */}
        <motion.g style={{ opacity: linesOn }}>
          <path d="M120 320 C 300 120, 700 120, 880 320" stroke="url(#line)" strokeWidth="1.5" fill="none" />
          <path d="M120 360 C 350 220, 650 500, 880 360" stroke="url(#line)" strokeWidth="1.5" fill="none" />
          <path d="M200 280 C 400 80, 600 80, 800 280" stroke="url(#line)" strokeWidth="1" fill="none" opacity="0.7" />
        </motion.g>

        {/* ------- DATA PACKETS ------- */}
        <motion.g style={{ opacity: packetsOn }}>
          <motion.circle r="4" fill="hsl(195 100% 70%)" style={{ cx: packetX1 as any, cy: 200 }} />
          <motion.circle r="3" fill="hsl(210 100% 75%)" style={{ cx: packetX2 as any, cy: 340 }} />
          <motion.circle r="3.5" fill="hsl(140 90% 65%)" style={{ cx: packetX3 as any, cy: 160 }} />
        </motion.g>

        {/* ------- NETWORK NODES (game hosting clusters) ------- */}
        <motion.g style={{ opacity: gameOn }}>
          {[
            { cx: 200, cy: 150 }, { cx: 500, cy: 110 }, { cx: 800, cy: 150 },
            { cx: 340, cy: 80 }, { cx: 660, cy: 80 },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.cx} cy={n.cy} r="14" fill="hsl(220 30% 8%)" stroke="hsl(195 100% 60%)" />
              <circle cx={n.cx} cy={n.cy} r="4" fill="hsl(195 100% 70%)" />
              <motion.circle cx={n.cx} cy={n.cy} r="14" fill="none"
                stroke="hsl(195 100% 60%)" strokeOpacity="0.6"
                style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                animate={reduce ? {} : { scale: [1, 2], opacity: [0.6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
            </g>
          ))}
        </motion.g>

        {/* ------- VPS VIRTUAL MACHINES (blocks rising) ------- */}
        <motion.g style={{ opacity: vpsOn }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 140 + (i % 6) * 130;
            const y = 60 + Math.floor(i / 6) * 50;
            return (
              <motion.g key={i}
                initial={false}
                animate={reduce ? {} : { y: [0, -3, 0] }}
                transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
              >
                <rect x={x} y={y} width="46" height="34" rx="4"
                  fill="hsl(220 30% 10%)" stroke="hsl(210 100% 60% / 0.55)" />
                <rect x={x + 4} y={y + 4} width="38" height="3" fill="hsl(195 100% 65%)" opacity="0.8" />
                <rect x={x + 4} y={y + 10} width="26" height="2" fill="hsl(210 100% 60% / 0.55)" />
                <rect x={x + 4} y={y + 15} width="32" height="2" fill="hsl(210 100% 60% / 0.4)" />
                <circle cx={x + 40} cy={y + 28} r="2" fill="hsl(140 90% 60%)" />
              </motion.g>
            );
          })}
        </motion.g>

        {/* ------- SECURITY SHIELDS ------- */}
        <motion.g style={{ opacity: shieldsOn }}>
          <circle cx="500" cy="320" r="180" stroke="hsl(195 100% 65%)" fill="none" strokeWidth="2" opacity="0.35" />
          <circle cx="500" cy="320" r="110" stroke="hsl(210 100% 70%)" fill="none" strokeWidth="1.5" opacity="0.45" />
          {!reduce && (
            <motion.circle cx="500" cy="320" r="60" stroke="hsl(195 100% 65%)" fill="none" strokeWidth="2"
              animate={{ opacity: [0.6, 0], scale: [1, 1.8] }}
              style={{ transformOrigin: "500px 320px" }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          )}
        </motion.g>

        {/* ------- DEPLOY PULSE ------- */}
        <motion.g style={{ opacity: deployOn }}>
          <motion.circle cx="500" cy="320" r="8" fill="hsl(140 90% 60%)"
            animate={reduce ? {} : { opacity: [1, 0.4, 1], scale: [1, 1.6, 1] }}
            style={{ transformOrigin: "500px 320px" }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.g>

        {/* live rack status lights (always twinkling) */}
        {lights.map(({ i, delay }) => (
          <motion.circle key={i} cx={120 + (i % 9) * 95} cy={440 + Math.floor(i / 9) * 12} r="1.5"
            fill="hsl(195 100% 65%)"
            animate={reduce ? {} : { opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, delay }}
          />
        ))}
      </svg>

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(220_30%_4%)_100%)]" />
    </motion.div>
  );
}

/* ---------- HUD chip ---------- */
function Chip({ icon: Icon, label, value, color = "primary" }: any) {
  return (
    <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[180px]">
      <div className={`w-9 h-9 rounded-xl bg-${color}/15 grid place-items-center`}>
        <Icon className={`w-4 h-4 text-${color}`} />
      </div>
      <div className="leading-tight">
        <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

/* ---------- pricing cards integrated into the scene ---------- */
const plans = [
  { name: "Minecraft", from: "₹99/mo", desc: "Paper · Forge · Fabric · Modpacks", to: "/minecraft-plans",
    specs: ["NVMe SSD", "Pterodactyl", "Auto Backups", "DDoS Protection"], icon: Boxes, accent: "from-emerald-400/30 to-cyan-400/10" },
  { name: "VPS Starter", from: "₹400/mo", desc: "Intel Xeon · Delhi DC", to: "/vps-starter",
    specs: ["8–64 GB RAM", "NVMe Storage", "1 Gbps Port", "Full Root"], icon: Server, accent: "from-sky-400/30 to-indigo-400/10" },
  { name: "VPS Premium", from: "₹500/mo", desc: "AMD EPYC · Mumbai DC", to: "/vps-premium",
    specs: ["8–64 GB RAM", "2 Gbps Port", "Unmetered BW", "Priority Support"], icon: Rocket, accent: "from-fuchsia-400/30 to-rose-400/10" },
];

/* ---------- main ---------- */
export default function ScrollExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // hero rises
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // phase positions
  const phases = [
    { at: 0.14, title: "Datacenter Activation", sub: "Racks online. Cooling engaged. Power stable.",
      chips: [{ icon: Server, label: "Racks", value: "Online" }, { icon: Gauge, label: "Power", value: "Stable" }, { icon: Activity, label: "Cooling", value: "Optimal" }] },
    { at: 0.28, title: "Network Expansion", sub: "Routes propagating across the backbone.",
      chips: [{ icon: Network, label: "Backbone", value: "2 Gbps" }, { icon: Wifi, label: "Latency", value: "<10 ms" }, { icon: Globe2, label: "Edge", value: "IN · APAC" }] },
    { at: 0.44, title: "Game Hosting Online", sub: "Minecraft & game clusters accepting players.",
      chips: [{ icon: Zap, label: "TPS", value: "20.0" }, { icon: Activity, label: "Players", value: "Live" }, { icon: Shield, label: "DDoS", value: "Protected" }] },
    { at: 0.6,  title: "VPS Infrastructure", sub: "Virtual machines scaling on demand.",
      chips: [{ icon: Cpu, label: "vCPU", value: "Dedicated" }, { icon: HardDrive, label: "NVMe", value: "Allocated" }, { icon: Database, label: "RAM", value: "8–64 GB" }] },
    { at: 0.78, title: "Security & Health", sub: "Shields up. Threats blocked. 100% health.",
      chips: [{ icon: Shield, label: "Mitigation", value: "Auto" }, { icon: Lock, label: "Backups", value: "Synced" }, { icon: Activity, label: "Health", value: "100%" }] },
    { at: 0.92, title: "Instant Deployment", sub: "Order → Provision → Online in seconds.",
      chips: [{ icon: Rocket, label: "Provision", value: "60 s" }, { icon: CheckCircle2, label: "Status", value: "Online" }, { icon: Zap, label: "Setup", value: "Instant" }] },
  ];

  return (
    <div ref={ref} className="relative" style={{ height: "700vh" }}>
      {/* PINNED SCENE */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <InfrastructureScene p={scrollYProgress} />

        {/* HERO (above the fold) */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-extrabold tracking-tight"
          >
            <span className="gradient-text">VIXONCLOUD</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-5 text-lg md:text-2xl text-muted-foreground max-w-2xl"
          >
            High Performance Game &amp; VPS Hosting
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href={BILLING_URL} target="_blank" rel="noreferrer"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold glow-primary transition">
              <Rocket className="w-4 h-4" /> Deploy Server
            </a>
            <Link to="/minecraft-plans"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-strong font-semibold hover:bg-secondary/60 transition">
              <Boxes className="w-4 h-4" /> View Plans
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase">Scroll to enter the datacenter</span>
            <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.div>

        {/* PHASE OVERLAYS */}
        {phases.map((ph, idx) => {
          const opacity = between(scrollYProgress, ph.at - 0.06, ph.at + 0.06);
          const yMv = useTransform(scrollYProgress, [ph.at - 0.08, ph.at + 0.08], [40, -20]);
          return (
            <motion.div
              key={idx}
              style={{ opacity, y: yMv }}
              className="absolute inset-x-0 bottom-10 md:bottom-16 z-10 px-4 md:px-12 pointer-events-none"
            >
              <div className="max-w-5xl mx-auto">
                <div className="text-[11px] uppercase tracking-widest text-primary mb-2">
                  Phase {idx + 1}
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                  {ph.title}
                </h2>
                <p className="mt-2 text-muted-foreground text-base md:text-lg max-w-2xl">{ph.sub}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {ph.chips.map((c, i) => <Chip key={i} {...c} />)}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* PRICING — appears naturally during VPS phase */}
        <PricingFloat p={scrollYProgress} />

        {/* FINAL CTA */}
        <FinalCTA p={scrollYProgress} />
      </div>
    </div>
  );
}

function PricingFloat({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.62, 0.7, 0.84, 0.9], [0, 1, 1, 0]);
  const y = useTransform(p, [0.62, 0.7], [80, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-20 pointer-events-auto max-w-[420px] hidden md:block"
    >
      <div className="text-[11px] uppercase tracking-widest text-primary mb-2">Live Pricing</div>
      <div className="space-y-3">
        {plans.map((pl) => (
          <Link to={pl.to} key={pl.name}
            className={`block relative overflow-hidden rounded-2xl glass-strong p-4 card-hover bg-gradient-to-br ${pl.accent}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-background/60 grid place-items-center">
                <pl.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{pl.name}</div>
                <div className="text-xs text-muted-foreground">{pl.desc}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground">from</div>
                <div className="font-bold text-primary">{pl.from}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {pl.specs.map((s) => (
                <div key={s} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary/70" /> {s}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function FinalCTA({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.94, 0.99], [0, 1]);
  const scale = useTransform(p, [0.94, 1], [0.95, 1]);
  return (
    <motion.div style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
      <div className="pointer-events-auto text-center max-w-2xl px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-strong mb-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs">Server Online · 100% Health</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold">
          Your infrastructure, <span className="gradient-text">ready in seconds.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Join the network. Deploy your first server now.</p>
        <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
          <a href={BILLING_URL} target="_blank" rel="noreferrer"
            className="px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold glow-primary inline-flex items-center gap-2">
            <Rocket className="w-4 h-4" /> Deploy Server
          </a>
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"
            className="px-7 py-3.5 rounded-xl glass-strong font-semibold">
            Join Discord
          </a>
        </div>
      </div>
    </motion.div>
  );
}
