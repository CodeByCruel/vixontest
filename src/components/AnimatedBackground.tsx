import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* Subtle drifting starfield */
const Starfield = () => {
  const ref = useRef<THREE.Points>(null!);
  const positions = useRef<Float32Array>();
  if (!positions.current) {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    positions.current = arr;
  }
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.005;
  });
  return (
    <Points ref={ref} positions={positions.current} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#5eb6ff"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
};

const FloatingOrb = ({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.x = position[0] + Math.sin(t) * 0.6;
    ref.current.position.y = position[1] + Math.cos(t * 1.2) * 0.4;
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.45} wireframe />
    </mesh>
  );
};

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

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {/* Base dark blue gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(220 50% 8%) 0%, hsl(220 60% 3%) 60%, hsl(220 70% 2%) 100%)",
        }}
      />

      {!lowPower && (
        <div className="absolute inset-0 opacity-90">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
            <Suspense fallback={null}>
              <Starfield />
              <FloatingOrb position={[-3, 1, -2]} color="#3b9eff" size={0.5} speed={0.3} />
              <FloatingOrb position={[3, -1, -3]} color="#5eb6ff" size={0.7} speed={0.25} />
              <FloatingOrb position={[1, 2, -4]} color="#2d7fd9" size={0.4} speed={0.35} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Ambient blue glows */}
      {!lowPower && <motion.div
        className="absolute -top-32 -left-16 w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ background: "hsl(210 100% 50% / 0.15)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />}
      {!lowPower && <motion.div
        className="absolute -bottom-24 -right-20 w-[450px] h-[450px] rounded-full blur-[100px]"
        style={{ background: "hsl(195 100% 55% / 0.12)" }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />}
      {!lowPower && <motion.div
        className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{ background: "hsl(220 100% 45% / 0.1)" }}
        animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />}

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
