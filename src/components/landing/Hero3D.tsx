import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Stars,
  Sparkles,
  Icosahedron,
  Torus,
} from "@react-three/drei";

import * as THREE from "three";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Sparkles as SparklesIcon } from "lucide-react";

const DISCORD_LINK = "https://discord.gg/TtV26hZEJx";

/* ---------- 3D crystal planet ---------- */
const CrystalPlanet = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.25;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.15;
      const s = 1 + Math.sin(t * 1.2) * 0.04;
      glowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Outer glow halo */}
      <Icosahedron ref={glowRef} args={[1.55, 2]}>
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.08}
          wireframe
        />
      </Icosahedron>

      {/* Core crystal */}
      <Icosahedron ref={meshRef} args={[1.3, 4]}>
        <MeshDistortMaterial
          color="#0d2818"
          emissive="#10b981"
          emissiveIntensity={0.55}
          roughness={0.15}
          metalness={0.9}
          distort={0.32}
          speed={1.6}
        />
      </Icosahedron>

      {/* Inner core point */}
      <pointLight color="#fbbf24" intensity={2.5} distance={4} />
    </group>
  );
};

/* ---------- Orbiting rings ---------- */
const OrbitRing = ({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * speed;
    }
  });
  return (
    <Torus
      ref={ref}
      args={[radius, 0.012, 16, 128]}
      rotation={[tilt, 0, 0]}
    >
      <meshBasicMaterial color={color} transparent opacity={0.45} />
    </Torus>
  );
};

/* ---------- Orbiting nodes ---------- */
const OrbitingNode = ({
  radius,
  speed,
  phase,
  color,
  size = 0.07,
}: {
  radius: number;
  speed: number;
  phase: number;
  color: string;
  size?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * 0.15;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
};

/* ---------- Scene ---------- */
const Scene = () => {
  return (
    <>
      <color attach="background" args={["#0a0a1a"]} />
      <fog attach="fog" args={["#0a0a1a", 5, 15]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#fbbf24" />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#10b981" />

      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.6}
      />

      <Sparkles
        count={60}
        scale={6}
        size={2}
        speed={0.4}
        color="#10b981"
      />
      <Sparkles
        count={30}
        scale={5}
        size={3}
        speed={0.3}
        color="#fbbf24"
      />

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <CrystalPlanet />
      </Float>

      <OrbitRing radius={2.0} speed={0.3} tilt={Math.PI / 2.5} color="#10b981" />
      <OrbitRing radius={2.4} speed={-0.2} tilt={Math.PI / 3} color="#fbbf24" />
      <OrbitRing radius={2.8} speed={0.15} tilt={Math.PI / 2.2} color="#10b981" />

      <OrbitingNode radius={2.0} speed={0.6} phase={0} color="#10b981" />
      <OrbitingNode radius={2.0} speed={0.6} phase={Math.PI} color="#10b981" size={0.05} />
      <OrbitingNode radius={2.4} speed={-0.4} phase={Math.PI / 2} color="#fbbf24" />
      <OrbitingNode radius={2.8} speed={0.3} phase={Math.PI / 1.5} color="#fbbf24" size={0.05} />

      
    </>
  );
};

/* ---------- Public component ---------- */
const Hero3D = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#050b1a]">
      {/* 3D canvas — absolute background, mounts immediately */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Side fade so text remains readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050b1a] via-[#050b1a]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050b1a] via-transparent to-[#050b1a]/40 pointer-events-none" />


      {/* Foreground content */}
      <div className="container relative z-10 mx-auto px-4 py-28">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2.5 rounded-full glass border border-primary/30 px-4 py-2 text-[11px] font-medium text-primary mb-6 backdrop-blur-md"
          >
            <SparklesIcon className="h-3 w-3" />
            Next-gen game hosting in 3D
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 font-display text-white"
            style={{ lineHeight: 1.08, letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Power Your
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #10b981 0%, #fbbf24 100%)",
              }}
            >
              Universe
            </span>
            <br />
            of Servers.
          </motion.h1>

          <motion.p
            className="text-white/70 text-base sm:text-lg max-w-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            Deploy Minecraft, GTA, Rust and 50+ games in 60 seconds.
            Cinema-grade infra, zero lag, 99.99% uptime — running on a
            living 3D cloud you can almost touch.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                size="lg"
                onClick={() => navigate("/minecraft-plans")}
                className="gap-2 px-8 text-sm font-bold h-12 rounded-xl text-black relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #10b981, #fbbf24)",
                  boxShadow: "0 10px 40px -10px rgba(16,185,129,0.6)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch Your Server
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </motion.div>
            <motion.a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 text-sm border-white/20 text-white hover:bg-white/10 hover:text-white h-12 rounded-xl bg-white/5 backdrop-blur-md"
              >
                <ExternalLink className="h-4 w-4" /> Join Discord
              </Button>
            </motion.a>
          </motion.div>

          {/* Floating stat chips */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              { k: "99.99%", v: "Uptime" },
              { k: "60s", v: "Setup" },
              { k: "24/7", v: "Support" },
              { k: "50+", v: "Games" },
            ].map((s, i) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2"
              >
                <div
                  className="text-lg font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #10b981, #fbbf24)",
                  }}
                >
                  {s.k}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/50">
                  {s.v}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-[2] pointer-events-none" />
    </section>
  );
};

export default Hero3D;