import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Network, Server, Shield, Zap, Database, ArrowRight, Globe2, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { BILLING_URL } from "@/lib/vixon";

const nodes = [
  { id: "core", x: 50, y: 50, label: "Core Network", color: "#3b82f6", size: 40 },
  { id: "mumbai", x: 30, y: 25, label: "Mumbai DC", color: "#10b981", size: 30 },
  { id: "delhi", x: 25, y: 55, label: "Delhi DC", color: "#10b981", size: 28 },
  { id: "singapore", x: 70, y: 25, label: "Singapore DC", color: "#8b5cf6", size: 26 },
  { id: "tokyo", x: 75, y: 55, label: "Tokyo DC", color: "#f59e0b", size: 24 },
  { id: "us-west", x: 15, y: 75, label: "US West DC", color: "#ec4899", size: 22 },
  { id: "frankfurt", x: 50, y: 80, label: "Frankfurt DC", color: "#06b6d4", size: 22 },
];

const features = [
  { icon: Network, title: "Mesh Topology", description: "Every node is interconnected. Traffic reroutes instantly if one path fails — zero downtime guaranteed.", color: "#3b82f6" },
  { icon: Shield, title: "DDoS Mitigation", description: "Distributed scrubbing centers absorb attacks at the network edge before they reach your server.", color: "#10b981" },
  { icon: Zap, title: "Anycast Routing", description: "Players auto-connect to the closest healthy node. No manual configuration required.", color: "#f59e0b" },
  { icon: Database, title: "Edge Caching", description: "Game assets cached at edge nodes worldwide. Players download at 10x faster speeds.", color: "#8b5cf6" },
];

function NetworkTopology() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g opacity="0.08">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="hsl(210 100% 55%)" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="hsl(210 100% 55%)" />
          ))}
        </g>

        {nodes.slice(1).map((node, i) => (
          <motion.line
            key={`line-${i}`}
            x1={nodes[0].x}
            y1={nodes[0].y}
            x2={node.x}
            y2={node.y}
            stroke={node.color}
            strokeWidth={0.4}
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {[
          [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6],
        ].map(([a, b], i) => (
          <motion.line
            key={`inter-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="hsl(210 100% 55%)"
            strokeWidth={0.3}
            strokeDasharray="1.5 1.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
          />
        ))}

        {nodes.slice(1).map((node, i) => (
          <motion.circle
            key={`packet-${i}`}
            r={0.8}
            fill={node.color}
            animate={{
              cx: [nodes[0].x, node.x, nodes[0].x],
              cy: [nodes[0].y, node.y, nodes[0].y],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}

        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {i === 0 && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size / 5 + 2}
                fill="none"
                stroke={node.color}
                strokeWidth={0.3}
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            )}
            <circle cx={node.x} cy={node.y} r={node.size / 5 + 1} fill={node.color} opacity={0.1} />
            <circle cx={node.x} cy={node.y} r={node.size / 8} fill={node.color} opacity={0.9} />
            <circle cx={node.x} cy={node.y} r={node.size / 16} fill="#fff" opacity={0.8} />
            <text
              x={node.x}
              y={node.y - node.size / 5 - 2}
              textAnchor="middle"
              fill="white"
              fontSize={2.5}
              fontWeight={600}
              fontFamily="'Plus Jakarta Sans', sans-serif"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export default function NodesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(210_100%_12%/0.25),transparent_60%)]" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6 animate-shimmer">
            <Network className="h-3.5 w-3.5" />
            Smart Networking
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-display">
            Intelligent <span className="gradient-text">Node Network</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our mesh network automatically routes traffic through the fastest path.
            If one node goes down, traffic shifts in milliseconds — your players never notice.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <motion.div style={{ scale }} className="glass gradient-border rounded-2xl p-6">
            <NetworkTopology />
          </motion.div>

          <div className="space-y-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass gradient-border rounded-xl p-5 card-hover group"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl grid place-items-center shrink-0"
                    style={{ backgroundColor: feature.color + "15" }}
                    whileHover={{ rotate: 12, scale: 1.15 }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-sm font-display mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 pt-4"
            >
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong font-semibold text-sm hover:bg-secondary/60 transition-colors"
              >
                All Features <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={BILLING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm glow-primary transition-all"
              >
                <Zap className="w-3.5 h-3.5" /> Deploy Now
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
