import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe2, Radio } from "lucide-react";

const locations = [
  { name: "Mumbai, India", short: "MUM", x: 67, y: 51, latency: "4ms", status: "Primary DC", color: "#3b82f6", servers: 1200, flag: "\ud83c\uddee\ud83c\uddf3", description: "Flagship data center with Ryzen 9 fleet", ring: true },
  { name: "Delhi, India", short: "DEL", x: 64.5, y: 43, latency: "6ms", status: "Active", color: "#10b981", servers: 800, flag: "\ud83c\uddee\ud83c\uddf3", description: "North India hub, ultra-low latency" },
  { name: "Singapore", short: "SIN", x: 73, y: 58, latency: "12ms", status: "Active", color: "#8b5cf6", servers: 450, flag: "\ud83c\uddf8\ud83c\uddec", description: "Southeast Asia gateway" },
  { name: "Dubai, UAE", short: "DXB", x: 58.5, y: 47, latency: "22ms", status: "Active", color: "#f97316", servers: 200, flag: "\ud83c\udde6\ud83c\uddea", description: "Middle East hub" },
  { name: "Frankfurt, DE", short: "FRA", x: 47.5, y: 34, latency: "52ms", status: "Active", color: "#06b6d4", servers: 197, flag: "\ud83c\udde9\ud83c\uddea", description: "European Union entry point" },
  { name: "US West", short: "LAX", x: 13, y: 41, latency: "45ms", status: "Active", color: "#ec4899", servers: 280, flag: "\ud83c\uddfa\ud83c\uddf8", description: "West Coast US coverage" },
  { name: "Tokyo, Japan", short: "TYO", x: 86, y: 38, latency: "18ms", status: "Active", color: "#f59e0b", servers: 320, flag: "\ud83c\uddef\ud83c\uddf5", description: "East Asia premium node" },
];

const connections: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 3], [2, 6], [4, 5], [4, 6], [3, 4],
];

function LatencyLine({ from, to, color, delay }: { from: { x: number; y: number }; to: { x: number; y: number }; color: string; delay: number }) {
  const points = useMemo(() => {
    const mx = (from.x + to.x) / 2;
    const my = Math.min(from.y, to.y) - 8;
    return `M ${from.x * 10} ${from.y * 10} Q ${mx * 10} ${my * 10} ${to.x * 10} ${to.y * 10}`;
  }, [from, to]);

  return (
    <motion.path
      d={points}
      stroke={color}
      strokeWidth={0.8}
      fill="none"
      strokeDasharray="3 3"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.3 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
    />
  );
}

function LocationNode({ loc, index }: { loc: typeof locations[0]; index: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.08, type: "spring" }}
    >
      {/* Outer pulse ring */}
      <motion.circle
        cx={loc.x * 10}
        cy={loc.y * 10}
        r={loc.ring ? 14 : 10}
        fill="none"
        stroke={loc.color}
        strokeWidth={loc.ring ? 1.2 : 0.8}
        animate={{ scale: [1, 3], opacity: [0.45, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
        style={{ transformOrigin: `${loc.x * 10}px ${loc.y * 10}px` }}
      />
      {/* Second pulse for primary DC */}
      {loc.ring && (
        <motion.circle
          cx={loc.x * 10}
          cy={loc.y * 10}
          r={14}
          fill="none"
          stroke={loc.color}
          strokeWidth={0.6}
          animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 + 0.8 }}
          style={{ transformOrigin: `${loc.x * 10}px ${loc.y * 10}px` }}
        />
      )}
      {/* Glow aura */}
      <circle cx={loc.x * 10} cy={loc.y * 10} r={20} fill={loc.color} opacity={0.05} />
      {/* Outer ring */}
      <circle cx={loc.x * 10} cy={loc.y * 10} r={6} fill="none" stroke={loc.color} strokeWidth={1.2} opacity={0.5} />
      {/* Solid dot */}
      <circle cx={loc.x * 10} cy={loc.y * 10} r={4} fill={loc.color} opacity={0.85} />
      {/* Inner bright core */}
      <circle cx={loc.x * 10} cy={loc.y * 10} r={2} fill="#fff" opacity={0.95} />

      {/* Background pill for label */}
      <rect
        x={loc.x * 10 - 22}
        y={loc.y * 10 - 26}
        width={44}
        height={14}
        rx={7}
        fill="hsl(215 30% 8%)"
        stroke={loc.color}
        strokeWidth={0.5}
        opacity={0.85}
      />
      {/* City label */}
      <text
        x={loc.x * 10}
        y={loc.y * 10 - 16.5}
        textAnchor="middle"
        fill="white"
        fontSize={8}
        fontWeight={700}
        fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
        letterSpacing={0.5}
      >
        {loc.short}
      </text>
      {/* Latency badge below */}
      <rect
        x={loc.x * 10 - 14}
        y={loc.y * 10 + 10}
        width={28}
        height={12}
        rx={6}
        fill={loc.color}
        opacity={0.15}
      />
      <text
        x={loc.x * 10}
        y={loc.y * 10 + 19}
        textAnchor="middle"
        fill={loc.color}
        fontSize={7.5}
        fontWeight={700}
        fontFamily="'JetBrains Mono', monospace"
      >
        {loc.latency}
      </text>
    </motion.g>
  );
}

export default function GlobalNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mapScale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(210_100%_12%/0.3),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6 animate-shimmer">
            <Globe2 className="h-3.5 w-3.5" />
            Global Infrastructure
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-display">
            <span className="gradient-text">Global Network</span>, Local Speed
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            7 data centers across 4 continents with sub-10ms latency to India.
            Your players connect to the nearest node automatically — zero configuration needed.
          </p>
        </motion.div>

        <motion.div
          style={{ scale: mapScale, opacity: mapOpacity }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(215 40% 6%) 0%, hsl(220 35% 4%) 100%)", border: "1px solid hsl(210 100% 55% / 0.12)" }}>
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <svg viewBox="0 0 1000 500" className="w-full h-auto relative z-10">
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(210 100% 55%)" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="hsl(210 100% 55%)" stopOpacity="0" />
                </radialGradient>
                <filter id="continentGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
                <linearGradient id="continentFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4a8ec2" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3a7eb2" stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id="continentStroke" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5aa0d4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#4a90c4" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              {/* Background glow */}
              <circle cx="500" cy="250" r="450" fill="url(#mapGlow)" />

              {/* Grid lines - latitude */}
              <g opacity="0.035">
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={`lat-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} stroke="#5aa0d4" strokeWidth={0.5} />
                ))}
                {Array.from({ length: 21 }).map((_, i) => (
                  <line key={`lon-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#5aa0d4" strokeWidth={0.5} />
                ))}
              </g>

              {/* World Map - detailed continental outlines */}
              <g fill="url(#continentFill)" stroke="url(#continentStroke)" strokeWidth={0.7}>
                {/* North America */}
                <path d="M55,85 L65,78 L80,72 L100,68 L120,65 L140,68 L155,62 L170,58 L190,62 L205,68 L215,75 L225,82 L240,88 L255,95 L265,105 L272,118 L278,135 L280,155 L275,172 L268,185 L258,195 L248,205 L238,212 L228,218 L215,225 L205,232 L195,238 L185,245 L178,252 L172,262 L168,275 L162,282 L152,288 L140,280 L128,268 L118,252 L108,235 L100,218 L92,200 L84,182 L76,165 L68,148 L60,130 L54,112 L50,98 Z" />
                {/* Central America */}
                <path d="M152,288 L160,292 L168,298 L175,305 L180,315 L178,322 L172,328 L165,325 L158,318 L152,308 L148,298 Z" />
                {/* South America */}
                <path d="M195,305 L205,298 L218,295 L230,298 L240,305 L248,315 L255,328 L258,345 L258,362 L255,378 L248,392 L240,405 L232,415 L222,422 L212,428 L202,425 L195,415 L190,400 L186,385 L183,368 L182,350 L184,335 L188,320 L192,312 Z" />
                {/* Europe */}
                <path d="M432,72 L445,66 L458,62 L472,58 L485,60 L498,65 L508,72 L515,82 L520,95 L518,108 L515,118 L510,128 L505,135 L498,142 L490,148 L482,152 L475,158 L468,162 L460,165 L452,162 L445,155 L438,145 L434,135 L430,122 L428,108 L426,95 L428,82 Z" />
                {/* UK/Ireland */}
                <path d="M430,80 L436,76 L440,78 L442,85 L439,90 L434,92 L430,88 Z" />
                {/* Iceland */}
                <path d="M368,52 L378,48 L388,52 L390,58 L385,62 L375,62 L368,58 Z" />
                {/* Africa */}
                <path d="M438,168 L455,162 L472,165 L488,172 L500,182 L510,195 L518,212 L522,232 L525,255 L525,278 L522,300 L518,318 L510,335 L500,348 L488,358 L475,362 L462,360 L450,352 L442,340 L436,322 L432,302 L428,278 L425,255 L424,232 L426,212 L430,195 L435,182 Z" />
                {/* Middle East */}
                <path d="M530,130 L545,125 L558,128 L568,138 L575,152 L578,168 L575,180 L568,188 L558,192 L548,188 L540,178 L535,165 L530,150 L528,138 Z" />
                {/* Asia */}
                <path d="M528,58 L548,48 L568,42 L590,40 L612,42 L635,48 L658,55 L678,62 L698,72 L718,82 L738,92 L755,102 L772,112 L788,122 L800,135 L810,148 L818,162 L822,178 L818,195 L808,208 L795,218 L780,225 L765,230 L748,232 L730,230 L712,225 L695,218 L678,210 L662,205 L648,200 L635,195 L622,190 L610,185 L598,178 L585,170 L572,162 L560,152 L548,140 L540,128 L535,115 L530,100 L528,85 Z" />
                {/* India */}
                <path d="M625,205 L638,208 L648,215 L658,225 L665,238 L668,252 L665,268 L658,282 L648,292 L638,298 L628,295 L620,285 L615,272 L612,255 L610,238 L612,222 L618,212 Z" />
                {/* Southeast Asia */}
                <path d="M718,232 L732,228 L745,230 L755,238 L760,248 L758,258 L750,265 L740,268 L730,265 L722,258 L718,248 Z" />
                {/* Japan */}
                <path d="M835,95 L840,88 L845,85 L850,88 L852,98 L852,112 L850,125 L848,135 L844,142 L840,145 L836,140 L834,130 L832,118 L832,105 Z" />
                {/* Indonesia */}
                <path d="M730,272 L742,268 L755,272 L765,278 L772,285 L768,292 L758,295 L748,292 L738,288 L732,280 Z" />
                {/* Australia */}
                <path d="M762,340 L785,332 L810,330 L835,335 L855,345 L865,358 L868,375 L862,390 L850,400 L835,408 L818,412 L800,410 L785,402 L775,390 L768,375 L765,358 L762,345 Z" />
                {/* Greenland */}
                <path d="M278,38 L295,32 L315,30 L332,35 L342,45 L345,55 L342,65 L332,72 L318,75 L305,72 L292,65 L282,55 L278,45 Z" />
                {/* New Zealand */}
                <path d="M872,398 L878,392 L884,395 L886,405 L882,412 L876,415 L872,410 L870,402 Z" />
              </g>

              {/* Continent glow layer */}
              <g fill="none" stroke="#5aa0d4" strokeWidth={1.2} opacity={0.08} filter="url(#continentGlow)">
                <path d="M55,85 L65,78 L80,72 L100,68 L120,65 L140,68 L155,62 L170,58 L190,62 L205,68 L215,75 L225,82 L240,88 L255,95 L265,105 L272,118 L278,135 L280,155 L275,172 L268,185 L258,195 L248,205 L238,212 L228,218 L215,225 L205,232 L195,238 L185,245 L178,252 L172,262 L168,275 L162,282 L152,288 L140,280 L128,268 L118,252 L108,235 L100,218 L92,200 L84,182 L76,165 L68,148 L60,130 L54,112 L50,98 Z" />
                <path d="M432,72 L445,66 L458,62 L472,58 L485,60 L498,65 L508,72 L515,82 L520,95 L518,108 L515,118 L510,128 L505,135 L498,142 L490,148 L482,152 L475,158 L468,162 L460,165 L452,162 L445,155 L438,145 L434,135 L430,122 L428,108 L426,95 L428,82 Z" />
                <path d="M625,205 L638,208 L648,215 L658,225 L665,238 L668,252 L665,268 L658,282 L648,292 L638,298 L628,295 L620,285 L615,272 L612,255 L610,238 L612,222 L618,212 Z" />
                <path d="M528,58 L548,48 L568,42 L590,40 L612,42 L635,48 L658,55 L678,62 L698,72 L718,82 L738,92 L755,102 L772,112 L788,122 L800,135 L810,148 L818,162 L822,178 L818,195 L808,208 L795,218 L780,225 L765,230 L748,232 L730,230 L712,225 L695,218 L678,210 L662,205 L648,200 L635,195 L622,190 L610,185 L598,178 L585,170 L572,162 L560,152 L548,140 L540,128 L535,115 L530,100 L528,85 Z" />
              </g>

              {/* Connection arcs */}
              {connections.map(([i, j], idx) => (
                <LatencyLine
                  key={`conn-${idx}`}
                  from={{ x: locations[i].x, y: locations[i].y }}
                  to={{ x: locations[j].x, y: locations[j].y }}
                  color={locations[i].color}
                  delay={0.4 + idx * 0.08}
                />
              ))}

              {/* Location nodes */}
              {locations.map((loc, i) => (
                <LocationNode key={loc.name} loc={loc} index={i} />
              ))}
            </svg>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/40 to-transparent" />
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/40 to-transparent" />
            </div>
            <div className="absolute top-0 right-0 w-16 h-16">
              <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-primary/40 to-transparent" />
              <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-primary/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16">
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-primary/40 to-transparent" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Location cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass gradient-border rounded-xl p-5 card-hover group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: loc.color }} />
                  <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-30" style={{ backgroundColor: loc.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{loc.flag}</span>
                    <div className="font-semibold text-sm">{loc.name}</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground">{loc.status}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold" style={{ color: loc.color }}>{loc.latency}</div>
                  <div className="text-[10px] text-muted-foreground">{loc.servers} servers</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/70 mb-3 leading-relaxed">{loc.description}</p>
              <div className="h-1 rounded-full bg-secondary/50 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: loc.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, (100 - parseInt(loc.latency)) * 1.2)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
