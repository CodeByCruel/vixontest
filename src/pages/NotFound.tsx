import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

const FloatingBlock = ({
  delay,
  x,
  size,
  duration,
}: {
  delay: number;
  x: number;
  size: number;
  duration: number;
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, width: size, height: size }}
    initial={{ y: "110vh", opacity: 0, rotate: 0 }}
    animate={{
      y: "-10vh",
      opacity: [0, 0.6, 0.6, 0],
      rotate: 360,
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <div
      className="w-full h-full rounded border border-primary/20"
      style={{
        background:
          "linear-gradient(135deg, hsl(210 100% 55% / 0.1), hsl(210 100% 55% / 0.03))",
      }}
    />
  </motion.div>
);

const ServerIcon = () => (
  <motion.svg
    viewBox="0 0 120 120"
    className="w-28 h-28 mx-auto"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
  >
    {/* Server body */}
    <rect
      x="20"
      y="15"
      width="80"
      height="90"
      rx="8"
      fill="none"
      stroke="hsl(210 100% 55% / 0.5)"
      strokeWidth="2"
    />
    {/* Rack lines */}
    <line
      x1="28"
      y1="38"
      x2="92"
      y2="38"
      stroke="hsl(210 100% 55% / 0.2)"
      strokeWidth="1"
    />
    <line
      x1="28"
      y1="61"
      x2="92"
      y2="61"
      stroke="hsl(210 100% 55% / 0.2)"
      strokeWidth="1"
    />
    <line
      x1="28"
      y1="84"
      x2="92"
      y2="84"
      stroke="hsl(210 100% 55% / 0.2)"
      strokeWidth="1"
    />
    {/* Status LEDs */}
    <motion.circle
      cx="32"
      cy="26"
      r="3"
      fill="hsl(152 100% 50%)"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.circle
      cx="32"
      cy="49"
      r="3"
      fill="hsl(210 100% 55%)"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
    />
    <motion.circle
      cx="32"
      cy="72"
      r="3"
      fill="hsl(210 100% 55%)"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
    />
    {/* Blinking error light */}
    <motion.circle
      cx="32"
      cy="95"
      r="3"
      fill="hsl(0 100% 55%)"
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
    {/* Vent lines */}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect
        key={i}
        x={48 + i * 10}
        y="23"
        width="6"
        height="3"
        rx="1"
        fill="hsl(210 100% 55% / 0.15)"
      />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect
        key={`b-${i}`}
        x={48 + i * 10}
        y="46"
        width="6"
        height="3"
        rx="1"
        fill="hsl(210 100% 55% / 0.15)"
      />
    ))}
  </motion.svg>
);

const NotFound = () => {
  const location = useLocation();
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (showSecret) return;
      const expected = KONAMI_CODE[konamiProgress];
      if (e.code === expected) {
        const next = konamiProgress + 1;
        if (next === KONAMI_CODE.length) {
          setShowSecret(true);
        } else {
          setKonamiProgress(next);
        }
      } else {
        setKonamiProgress(0);
      }
    },
    [konamiProgress, showSecret]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const blocks = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        size: 6 + Math.random() * 14,
        duration: 10 + Math.random() * 12,
      })),
    []
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      {/* Floating blocks */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {blocks.map((b) => (
          <FloatingBlock
            key={b.id}
            x={b.x}
            delay={b.delay}
            size={b.size}
            duration={b.duration}
          />
        ))}
      </div>

      <main className="pt-24 pb-16 relative z-10 flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4 max-w-lg mx-auto"
        >
          {/* Server Icon */}
          <ServerIcon />

          {/* 404 Text */}
          <motion.h1
            className="text-[10rem] font-black leading-none select-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              background:
                "linear-gradient(135deg, hsl(210 100% 60%), hsl(195 100% 70%), hsl(210 100% 55%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 0 40px hsl(210 100% 55% / 0.4)) drop-shadow(0 0 80px hsl(210 100% 55% / 0.2))",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.1,
            }}
          >
            404
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl font-bold tracking-widest text-white/80 mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            PAGE NOT FOUND
          </motion.p>

          {/* Fun message */}
          <motion.p
            className="text-sm text-white/40 mb-8 max-w-xs mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Looks like this page spawned in a different dimension.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link to="/">
              <Button
                className="gap-2 font-semibold text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(210 100% 55%), hsl(210 80% 45%))",
                  boxShadow: "0 0 30px hsl(210 100% 55% / 0.3)",
                }}
              >
                <Home className="h-4 w-4" /> Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="gap-2 text-sm border-white/10 hover:bg-white/5 text-white/60 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </motion.div>

          {/* Easter egg secret */}
          {showSecret && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mt-8 p-4 rounded-xl border border-primary/20"
              style={{
                background:
                  "linear-gradient(135deg, hsl(210 100% 55% / 0.1), hsl(210 100% 55% / 0.03))",
                backdropFilter: "blur(10px)",
              }}
            >
              <p className="text-sm font-bold text-primary">
                You found the secret! 🎮
              </p>
              <p className="text-xs text-white/40 mt-1">
                The Konami Code still lives on.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
