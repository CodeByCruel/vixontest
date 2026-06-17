import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const beforeItems = [
  { icon: "✕", text: "Frequent Downtime", detail: "Servers crash daily" },
  { icon: "✕", text: "Slow Support", detail: "24-72h response time" },
  { icon: "✕", text: "Shared Resources", detail: "CPU/RAM throttled" },
  { icon: "✕", text: "No DDoS Protection", detail: "Vulnerable to attacks" },
  { icon: "✕", text: "3-5s Page Load", detail: "Slow unoptimized servers" },
];

const afterItems = [
  { icon: "✓", text: "99.99% Uptime", detail: "Guaranteed reliability" },
  { icon: "✓", text: "<5min Support", detail: "Expert help, fast" },
  { icon: "✓", text: "Dedicated Resources", detail: "Full CPU & RAM access" },
  { icon: "✓", text: "DDoS Shield", detail: "Enterprise protection" },
  { icon: "✓", text: "<200ms Load", detail: "Blazing fast performance" },
];

const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            See the{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Drag the slider to compare cheap hosting with VixonCloud
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden border border-white/10 select-none"
          style={{
            background:
              "linear-gradient(135deg, hsl(220 30% 12%) 0%, hsl(220 40% 8%) 100%)",
            boxShadow:
              "0 0 60px hsl(210 100% 55% / 0.08), 0 25px 50px -12px rgba(0,0,0,0.5)",
            backdropFilter: "blur(20px)",
            height: "420px",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Before Panel (left side) */}
          <div
            className="absolute inset-0 flex flex-col justify-center p-8 md:p-12"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 mb-3">
                BEFORE
              </span>
              <h3 className="text-2xl font-bold text-red-400">Cheap Hosting</h3>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-xs font-bold mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">{item.text}</p>
                    <p className="text-red-400/60 text-xs">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* After Panel (right side) */}
          <div
            className="absolute inset-0 flex flex-col justify-center p-8 md:p-12"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
                AFTER
              </span>
              <h3 className="text-2xl font-bold text-emerald-400">
                VixonCloud
              </h3>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">{item.text}</p>
                    <p className="text-emerald-400/60 text-xs">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 z-20"
            style={{
              left: `${position}%`,
              background:
                "linear-gradient(to bottom, hsl(210 100% 55%), hsl(210 80% 70%))",
              boxShadow: "0 0 12px hsl(210 100% 55% / 0.6)",
            }}
            animate={{
              boxShadow: [
                "0 0 12px hsl(210 100% 55% / 0.6)",
                "0 0 20px hsl(210 100% 55% / 0.8)",
                "0 0 12px hsl(210 100% 55% / 0.6)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/90 border-2 border-white/30 flex items-center justify-center cursor-grab active:cursor-grabbing z-30"
              style={{ boxShadow: "0 0 20px hsl(210 100% 55% / 0.5)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white"
              >
                <path
                  d="M3 8L6 5M3 8L6 11M13 8L10 5M13 8L10 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Labels */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-red-400/40 text-xs font-mono uppercase tracking-widest">
              ◀ Before
            </span>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <span className="text-emerald-400/40 text-xs font-mono uppercase tracking-widest">
              After ▶
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
