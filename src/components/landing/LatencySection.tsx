import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wifi, Activity, TrendingDown, BarChart3, Zap, Globe2 } from "lucide-react";

const latencyData = [
  { city: "Mumbai", ms: 4, color: "#10b981", bar: 95, flag: "🇮🇳" },
  { city: "Delhi", ms: 6, color: "#3b82f6", bar: 90, flag: "🇮🇳" },
  { city: "Bangalore", ms: 8, color: "#60a5fa", bar: 85, flag: "🇮🇳" },
  { city: "Singapore", ms: 12, color: "#8b5cf6", bar: 78, flag: "🇸🇬" },
  { city: "Tokyo", ms: 18, color: "#a78bfa", bar: 70, flag: "🇯🇵" },
  { city: "Sydney", ms: 35, color: "#f59e0b", bar: 55, flag: "🇦🇺" },
  { city: "Frankfurt", ms: 45, color: "#fb923c", bar: 45, flag: "🇩🇪" },
  { city: "US West", ms: 52, color: "#f97316", bar: 38, flag: "🇺🇸" },
];

function LatencyBar({ data, index }: { data: typeof latencyData[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 group"
    >
      <div className="w-28 text-right flex items-center justify-end gap-1.5">
        <span className="text-sm">{data.flag}</span>
        <span className="text-sm font-semibold text-foreground/80">{data.city}</span>
      </div>
      <div className="flex-1 h-8 rounded-lg bg-secondary/30 overflow-hidden relative">
        <motion.div
          className="h-full rounded-lg flex items-center justify-end pr-3"
          style={{ backgroundColor: data.color + "25", borderRight: `3px solid ${data.color}` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${data.bar}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: "easeOut" }}
        >
          <span className="text-xs font-mono font-bold" style={{ color: data.color }}>
            {data.ms}ms
          </span>
        </motion.div>
        <motion.div
          className="absolute top-0 bottom-0 w-1 rounded-full"
          style={{ backgroundColor: data.color, left: `${data.bar}%` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
        />
      </div>
    </motion.div>
  );
}

function PingAnimation() {
  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl glass gradient-border">
      <svg viewBox="0 0 600 160" className="w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 20} x2="600" y2={i * 20} stroke="hsl(210 100% 55%)" strokeOpacity="0.05" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="160" stroke="hsl(210 100% 55%)" strokeOpacity="0.05" />
        ))}

        <motion.polyline
          points="0,120 50,110 100,80 150,90 200,60 250,50 300,70 350,40 400,30 450,35 500,20 550,25 600,15"
          fill="none"
          stroke="url(#pingGrad)"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <motion.polygon
          points="0,120 50,110 100,80 150,90 200,60 250,50 300,70 350,40 400,30 450,35 500,20 550,25 600,15 600,160 0,160"
          fill="url(#pingFillGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        />

        <motion.circle
          r="5"
          fill="#3b82f6"
          animate={{
            cx: [0, 100, 200, 300, 400, 500, 600],
            cy: [120, 80, 60, 70, 30, 20, 15],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          r="8"
          fill="none"
          stroke="#3b82f6"
          strokeWidth={1}
          animate={{
            cx: [0, 100, 200, 300, 400, 500, 600],
            cy: [120, 80, 60, 70, 30, 20, 15],
            opacity: [0.6, 0],
            r: [5, 15],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <defs>
          <linearGradient id="pingGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="pingFillGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <text x="20" y="15" fill="hsl(210 20% 96%)" fontSize="10" fontWeight="600" fontFamily="'Plus Jakarta Sans', sans-serif">
          LATENCY MONITOR
        </text>
        <text x="540" y="15" fill="#10b981" fontSize="9" fontWeight="500" fontFamily="'JetBrains Mono', monospace">
          LIVE
        </text>
      </svg>
    </div>
  );
}

export default function LatencySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,hsl(210_100%_15%/0.25),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6 animate-shimmer">
            <Wifi className="h-3.5 w-3.5" />
            Lightning Fast
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-display">
            Sub-10ms <span className="gradient-text animate-text-glow">Latency</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Strategically placed data centers ensure your players experience zero lag.
            Our mesh network routes traffic through the fastest path — automatically.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div style={{ y }} className="space-y-6">
            <PingAnimation />

            <div className="glass gradient-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">Network Health</span>
                <span className="ml-auto text-xs text-emerald-400 font-mono">100%</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Packet Loss", value: "0.00%", color: "#10b981" },
                  { label: "Jitter", value: "<1ms", color: "#3b82f6" },
                  { label: "Bandwidth", value: "2 Gbps", color: "#8b5cf6" },
                ].map((m) => (
                  <motion.div
                    key={m.label}
                    className="text-center rounded-lg bg-secondary/30 p-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-lg font-bold" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Latency by Location</span>
              <span className="ml-auto text-[10px] text-muted-foreground uppercase">Lower is better</span>
            </div>
            {latencyData.map((data, i) => (
              <LatencyBar key={data.city} data={data} index={i} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mt-4 glass rounded-lg px-4 py-3"
            >
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-muted-foreground">
                Global average: <span className="text-emerald-400 font-bold font-mono">22ms</span>
                {" "}&middot; India average: <span className="text-emerald-400 font-bold font-mono">6ms</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
