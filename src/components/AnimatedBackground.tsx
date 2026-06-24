import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mobile = window.matchMedia("(max-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLowPower(mobile.matches || reduced.matches);
    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        dur: 15 + Math.random() * 25,
        delay: Math.random() * 10,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(220 50% 8%) 0%, hsl(220 60% 3%) 60%, hsl(220 70% 2%) 100%)",
        }}
      />

      {/* Floating star particles */}
      {!lowPower &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-400/50"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Floating orbs (CSS only) */}
      {!lowPower && (
        <>
          <motion.div
            className="absolute w-32 h-32 rounded-full border border-blue-500/20"
            style={{ top: "15%", left: "10%", filter: "blur(1px)" }}
            animate={{
              x: [0, 60, 0],
              y: [0, 40, 0],
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full border border-blue-400/15"
            style={{ top: "60%", right: "8%", filter: "blur(1px)" }}
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              rotate: [0, -360],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full border border-cyan-500/20"
            style={{ top: "40%", left: "40%", filter: "blur(1px)" }}
            animate={{
              x: [0, 40, 0],
              y: [0, -50, 0],
              rotate: [0, 360],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </>
      )}

      {/* Ambient blue glows */}
      {!lowPower && (
        <>
          <motion.div
            className="absolute -top-32 -left-16 w-[500px] h-[500px] rounded-full blur-[100px]"
            style={{ background: "hsl(210 100% 50% / 0.15)" }}
            animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -right-20 w-[450px] h-[450px] rounded-full blur-[100px]"
            style={{ background: "hsl(195 100% 55% / 0.12)" }}
            animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ background: "hsl(220 100% 45% / 0.1)" }}
            animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </>
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(210 100% 60% / 0.6) 1px, transparent 1px),
            linear-gradient(90deg, hsl(210 100% 60% / 0.6) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(220_60%_3%)_100%)]" />
    </div>
  );
};

export default AnimatedBackground;
