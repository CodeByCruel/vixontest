import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import logo from "@/assets/zeyroncloud-logo.png";

/* 3D logo reveal scene */
const LoadingCrystal = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.8;
      ref.current.rotation.x = Math.sin(t * 0.6) * 0.2;
      const s = 1 + Math.sin(t * 2.4) * 0.08;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#10b981" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#fbbf24" />
      <Icosahedron ref={ref} args={[1.1, 4]}>
        <MeshDistortMaterial
          color="#0d2818"
          emissive="#10b981"
          emissiveIntensity={0.7}
          roughness={0.1}
          metalness={0.95}
          distort={0.45}
          speed={3}
        />
      </Icosahedron>
      <Sparkles count={40} scale={4} size={2.5} speed={0.8} color="#10b981" />
      <Sparkles count={20} scale={3.5} size={3} speed={0.6} color="#fbbf24" />
    </>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      // ramp up to 95 over ~900ms, then wait for window load
      const target = Math.min(95, (elapsed / 900) * 95);
      setProgress((p) => (p < target ? p + (target - p) * 0.15 : p));
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setProgress(100);
      setDone(true);
      setTimeout(onComplete, 600);
    };
    if (document.readyState === "complete") {
      // Already loaded — finish quickly
      setTimeout(finish, 200);
    } else {
      window.addEventListener("load", finish, { once: true });
      // safety timeout
      const safety = setTimeout(finish, 4000);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("load", finish);
        clearTimeout(safety);
      };
    }
    return () => cancelAnimationFrame(raf);
  }, [onComplete, done]);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#0a0a1a" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 3D scene */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 4], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                <LoadingCrystal />
              </Suspense>
            </Canvas>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, #0a0a1a 80%)",
            }}
          />

          {/* Logo + title floating in the middle */}
          <div className="relative z-10 flex flex-col items-center pointer-events-none">
            <motion.img
              src={logo}
              alt="ZeyronCloud"
              className="h-14 w-14 rounded-2xl mb-4"
              style={{
                filter:
                  "drop-shadow(0 0 32px rgba(16,185,129,0.55))",
              }}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl font-bold tracking-tight font-display text-white"
            >
              Zeyron
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#10b981,#fbbf24)",
                }}
              >
                Cloud
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 w-40"
            >
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background:
                      "linear-gradient(90deg,#10b981,#fbbf24)",
                    boxShadow: "0 0 14px rgba(16,185,129,0.6)",
                  }}
                />
              </div>
              <p className="text-center text-[9px] text-white/40 mt-2 tracking-[0.3em] font-mono uppercase">
                {pct < 100 ? `Booting ${pct}%` : "Ready"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
