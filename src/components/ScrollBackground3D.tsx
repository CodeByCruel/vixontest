import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Scroll Store (shared across scene) ───
const scrollStore = { y: 0, velocity: 0 };
if (typeof window !== "undefined") {
  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const newY = window.scrollY;
        scrollStore.velocity = (newY - lastY) * 0.1;
        scrollStore.y = newY;
        lastY = newY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ─── Floating Particles (parallax depth layers) ───
const ParticleLayer = ({ count, depth, speed, color, size }: {
  count: number;
  depth: number;
  speed: number;
  color: string;
  size: number;
}) => {
  const ref = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - depth;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [count, depth]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollStore.y * speed;
    const vel = scrollStore.velocity;

    ref.current.rotation.y = t * 0.02;
    ref.current.position.y = -scroll * 0.01;
    ref.current.position.x = Math.sin(t * 0.3) * 0.5;
    ref.current.rotation.x = vel * 0.001;
    ref.current.position.z = depth + Math.sin(t * 0.2) * 0.3;

    const mat = ref.current.material as THREE.PointsMaterial;
    mat.size = size + Math.sin(t * 1.5) * size * 0.2;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ─── Orbiting Ring (scroll-responsive) ───
const OrbitRing = ({ radius, speed, tilt, color, thickness = 0.006 }: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  thickness?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollStore.y;
    const scrollFactor = scroll * 0.0003;

    ref.current.rotation.x = tilt + scrollFactor * 0.5;
    ref.current.rotation.z = t * speed + scroll * 0.001;
    ref.current.rotation.y = t * speed * 0.3;
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
};

// ─── Grid Floor (scroll parallax) ───
const GridFloor = () => {
  const ref = useRef<THREE.Mesh>(null!);

  const gridTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "rgba(59,130,246,0.25)";
    ctx.lineWidth = 1;
    const step = size / 32;
    for (let i = 0; i <= 32; i++) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * step);
      ctx.lineTo(size, i * step);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const scroll = scrollStore.y;
    ref.current.position.z = -8 - scroll * 0.005;
    ref.current.position.y = -4;
    ref.current.rotation.x = -Math.PI / 2.2;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -4, -8]}>
      <planeGeometry args={[120, 120]} />
      <meshBasicMaterial map={gridTexture} transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
};

// ─── Nebula Glow (scroll-reactive) ───
const NebulaGlow = ({ position, color, scale }: {
  position: [number, number, number];
  color: string;
  scale: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollStore.y;

    ref.current.position.x = position[0] + Math.sin(t * 0.2 + position[0]) * 2;
    ref.current.position.y = position[1] - scroll * 0.008 + Math.cos(t * 0.15) * 1;
    ref.current.position.z = position[2] + Math.sin(t * 0.1) * 0.5;

    const s = scale * (1 + Math.sin(t * 0.5 + position[0]) * 0.15);
    ref.current.scale.set(s, s * 0.6, s);
    ref.current.rotation.z = t * 0.05;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.BackSide} />
    </mesh>
  );
};

// ─── Floating Wireframe Shape ───
const WireframeShape = ({ position, color, size, rotSpeed }: {
  position: [number, number, number];
  color: string;
  size: number;
  rotSpeed: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollStore.y;

    ref.current.rotation.x = t * rotSpeed;
    ref.current.rotation.y = t * rotSpeed * 0.7;
    ref.current.position.y = position[1] - scroll * 0.003 + Math.sin(t * 0.5) * 0.3;
    ref.current.position.x = position[0] + Math.sin(t * 0.3 + position[0]) * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} wireframe />
    </mesh>
  );
};

// ─── Camera Controller (scroll-driven) ───
const CameraController = () => {
  const { camera } = useThree();

  useFrame(() => {
    const scroll = scrollStore.y;
    const vel = scrollStore.velocity;

    camera.position.z = 5 - scroll * 0.0008;
    camera.position.y = scroll * 0.0003;
    camera.rotation.x = vel * -0.001;
    camera.rotation.y = Math.sin(scroll * 0.0001) * 0.03;
    camera.lookAt(0, -scroll * 0.0005, 0);
  });

  return null;
};

// ─── Main Scene ───
const Scene = () => {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 8, 40]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#60a5fa" />
      <pointLight position={[-3, 2, -5]} intensity={0.5} color="#3b82f6" distance={15} />
      <pointLight position={[3, -2, -8]} intensity={0.3} color="#10b981" distance={12} />

      <CameraController />

      {/* Deep space particle layers */}
      <ParticleLayer count={600} depth={-8} speed={0.05} color="#3b82f6" size={0.02} />
      <ParticleLayer count={400} depth={-4} speed={0.1} color="#60a5fa" size={0.025} />
      <ParticleLayer count={250} depth={-1} speed={0.2} color="#93c5fd" size={0.03} />
      <ParticleLayer count={80} depth={0} speed={0.3} color="#60a5fa" size={0.04} />

      {/* Orbiting rings */}
      <OrbitRing radius={4} speed={0.12} tilt={Math.PI / 2.5} color="#3b82f6" thickness={0.005} />
      <OrbitRing radius={5} speed={-0.08} tilt={Math.PI / 3} color="#10b981" thickness={0.004} />
      <OrbitRing radius={6} speed={0.05} tilt={Math.PI / 2.2} color="#8b5cf6" thickness={0.004} />
      <OrbitRing radius={7} speed={-0.03} tilt={Math.PI / 4} color="#f59e0b" thickness={0.003} />

      {/* Floating wireframe shapes */}
      <WireframeShape position={[-4, 1, -6]} color="#3b82f6" size={0.8} rotSpeed={0.15} />
      <WireframeShape position={[5, -2, -8]} color="#10b981" size={0.6} rotSpeed={-0.1} />
      <WireframeShape position={[0, 3, -10]} color="#8b5cf6" size={1.0} rotSpeed={0.08} />
      <WireframeShape position={[-3, -4, -5]} color="#06b6d4" size={0.5} rotSpeed={-0.12} />

      {/* Nebula glows */}
      <NebulaGlow position={[-6, 2, -12]} color="#3b82f6" scale={5} />
      <NebulaGlow position={[5, -3, -14]} color="#10b981" scale={4} />
      <NebulaGlow position={[0, 5, -16]} color="#8b5cf6" scale={6} />
      <NebulaGlow position={[-4, -5, -10]} color="#06b6d4" scale={3.5} />

      {/* Grid floor */}
      <GridFloor />
    </>
  );
};

// ─── Component ───
export default function ScrollBackground3D() {
  const [lowPower, setLowPower] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mobile = window.matchMedia("(max-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLowPower(mobile.matches || reduced.matches);
    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  if (lowPower || !webglSupported) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(220 50% 8%) 0%, hsl(220 60% 3%) 60%, hsl(220 70% 2%) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(220_60%_3%/0.8)_100%)]" />
    </div>
  );
}
