import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/vixoncloud-logo.png";

/**
 * Lightweight, fast loading screen — no 3D, no heavy assets.
 * Auto-dismisses in <800ms or on window load, whichever is sooner.
 */
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

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

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(220 40% 8%) 0%, hsl(220 50% 3%) 70%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Animated glow rings */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 220,
                height: 220,
                background:
                  "radial-gradient(circle, hsl(210 100% 55% / 0.35), transparent 70%)",
                filter: "blur(30px)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: 120 + i * 40,
                  height: 120 + i * 40,
                  borderColor: "hsl(195 100% 65% / 0.25)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8 + i * 4,
                  repeat: Infinity,
                  ease: "linear",
                  ...(i % 2 ? { repeatType: "loop" as const } : {}),
                }}
              />
            ))}
            <motion.img
              src={logo}
              alt="VixonCloud"
              className="relative w-24 h-24 object-contain"
              style={{
                filter: "drop-shadow(0 0 30px hsl(210 100% 55% / 0.7))",
              }}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="mt-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-extrabold tracking-tight font-display">
              <span className="text-white">VIXON</span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(210 100% 60%), hsl(195 100% 65%))",
                }}
              >
                CLOUD
              </span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] text-white/40 mt-2 uppercase">
              We host whatever you want
            </p>

            <div className="mt-6 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, hsl(210 100% 55%), hsl(195 100% 65%))",
                  boxShadow: "0 0 12px hsl(210 100% 55% / 0.7)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
