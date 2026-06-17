import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/vixoncloud-logo.png";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [taglineIdx, setTaglineIdx] = useState(0);

  const taglines = useMemo(
    () => [
      "We host whatever you want",
      "Minecraft · Rust · VPS",
      "99.99% Uptime Guaranteed",
      "Instant Deployment",
    ],
    []
  );

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = Math.min((performance.now() - start) / 700, 1);
      setProgress(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setDone(true);
      setTimeout(onComplete, 350);
    };
    const safety = setTimeout(finish, 1200);
    if (document.readyState === "complete") {
      setTimeout(finish, 600);
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      window.removeEventListener("load", finish);
    };
  }, [onComplete]);

  // rotate taglines
  useEffect(() => {
    const iv = setInterval(() => {
      setTaglineIdx((i) => (i + 1) % taglines.length);
    }, 350);
    return () => clearInterval(iv);
  }, [taglines.length]);

  // floating particles
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 2,
        dur: 3 + Math.random() * 4,
      })),
    []
  );

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, hsl(220 40% 10%) 0%, hsl(220 50% 3%) 80%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(210 100% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(210 100% 55% / 0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(210 100% 55% / 0.25), transparent)",
            }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-primary/60"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Glow backdrop */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle, hsl(210 100% 55% / 0.2), transparent 70%)",
              filter: "blur(50px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Orbit rings */}
          <div className="relative flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 110 + i * 45,
                  height: 110 + i * 45,
                  border: `1px solid hsl(${195 + i * 10} 100% 65% / ${0.15 - i * 0.03})`,
                }}
                animate={{ rotate: i % 2 ? -360 : 360 }}
                transition={{
                  duration: 6 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Orbit dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 4 + i,
                  height: 4 + i,
                  background: `hsl(${210 + i * 15} 100% 65%)`,
                  boxShadow: `0 0 8px hsl(${210 + i * 15} 100% 65% / 0.6)`,
                  top: "50%",
                  left: "50%",
                  marginLeft: -(55 + i * 22.5),
                }}
                animate={{ rotate: i % 2 ? -360 : 360 }}
                transition={{
                  duration: 6 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Logo */}
            <motion.img
              src={logo}
              alt="VixonCloud"
              className="relative w-28 h-28 object-contain"
              style={{
                filter: "drop-shadow(0 0 40px hsl(210 100% 55% / 0.8))",
              }}
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Text */}
          <motion.div
            className="mt-12 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight font-display">
              <span className="text-white">VIXON</span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(210 100% 60%), hsl(195 100% 70%))",
                }}
              >
                CLOUD
              </span>
            </h1>

            {/* Tagline typewriter */}
            <div className="mt-3 h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIdx}
                  className="text-xs tracking-[0.3em] text-white/40 uppercase"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {taglines[taglineIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="mt-8 w-56 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, hsl(210 100% 55%), hsl(195 100% 70%))",
                  boxShadow: "0 0 16px hsl(210 100% 55% / 0.7)",
                }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Percentage */}
            <motion.span
              className="mt-3 text-[11px] font-mono text-white/30 tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {progress}%
            </motion.span>
          </motion.div>

          {/* Bottom dots */}
          <div className="absolute bottom-8 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/50"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
