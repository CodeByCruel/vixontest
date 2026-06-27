import { Suspense, useRef, useEffect, useState, useMemo, useCallback } from "react";
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
  const positions = useRef<Float32Array>();

  if (!positions.current) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - depth;
    }
    positions.current = arr;
  }

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
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
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

// ─── Grid Plane (scroll parallax) ───
const GridPlane = () => {
  const ref = useRef<THREE.GridHelper>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>();

  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uColor: { value: new THREE.Color("#3b82f6") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDist;
        void main() {
          vUv = uv;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vDist = -mvPos.z;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform vec3 uColor;
        varying vec2 vUv;
        varying float vDist;
        void main() {
          float grid = step(0.97, fract(vUv.x * 20.0)) + step(0.97, fract(vUv.y * 20.0));
          grid = min(grid, 1.0);
          float fade = 1.0 - smoothstep(2.0, 15.0, vDist);
          float pulse = 0.5 + 0.5 * sin(uTime * 0.5 + vUv.x * 10.0);
          float alpha = grid * fade * 0.08 * (0.8 + pulse * 0.2);
          alpha *= 1.0 - smoothstep(0.0, 0.15, abs(vUv.x - 0.5) - 0.4);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollStore.y;

    ref.current.rotation.x = -Math.PI / 2 + scroll * 0.0002;
    ref.current.position.z = -5 - scroll * 0.005;
    ref.current.position.y = -3;

    const children = ref.current.children as THREE.Mesh[];
    if (children[0] && (children[0] as THREE.Mesh).material) {
      const mat = children[0].material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      mat.uniforms.uScroll.value = scroll;
    }
  });

  return (
    <gridHelper ref={ref} args={[80, 80, "#3b82f6", "#3b82f6"]}>
      <shaderMaterial attach="material" {...shader} transparent side={THREE.DoubleSide} />
    </gridHelper>
  );
};

// ─── Nebula Glow (scroll-reactive color shift) ───
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
    const scrollFactor = scroll * 0.0003;

    ref.current.position.x = position[0] + Math.sin(t * 0.2 + position[0]) * 2;
    ref.current.position.y = position[1] - scroll * 0.008 + Math.cos(t * 0.15) * 1;
    ref.current.position.z = position[2] + Math.sin(t * 0.1) * 0.5;

    const s = scale * (1 + Math.sin(t * 0.5 + position[0]) * 0.15);
    ref.current.scale.set(s, s * 0.6, s);
    ref.current.rotation.z = t * 0.05 + scrollFactor;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} side={THREE.BackSide} />
    </mesh>
  );
};

// ─── Camera Controller (scroll-driven) ───
const CameraController = () => {
  const { camera } = useThree();

  useFrame(() => {
    const scroll = scrollStore.y;
    const vel = scrollStore.velocity;

    // Camera slowly moves forward as you scroll
    camera.position.z = 5 - scroll * 0.001;
    // Slight vertical movement
    camera.position.y = scroll * 0.0005;
    // Velocity-based tilt
    camera.rotation.x = vel * -0.002;
    camera.rotation.y = Math.sin(scroll * 0.0001) * 0.05;

    camera.lookAt(0, -scroll * 0.001, 0);
  });

  return null;
};

// ─── Main Scene ───
const Scene = () => {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 8, 35]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#60a5fa" />
      <pointLight position={[-3, 2, -5]} intensity={0.5} color="#3b82f6" distance={15} />
      <pointLight position={[3, -2, -8]} intensity={0.3} color="#10b981" distance={12} />

      <CameraController />

      {/* Deep space particle layers */}
      <ParticleLayer count={800} depth={-8} speed={0.05} color="#3b82f6" size={0.015} />
      <ParticleLayer count={500} depth={-4} speed={0.1} color="#60a5fa" size={0.02} />
      <ParticleLayer count={300} depth={-1} speed={0.2} color="#93c5fd" size={0.025} />
      <ParticleLayer count={100} depth={0} speed={0.3} color="#60a5fa" size={0.03} />

      {/* Orbiting rings */}
      <OrbitRing radius={4} speed={0.12} tilt={Math.PI / 2.5} color="#3b82f6" thickness={0.004} />
      <OrbitRing radius={5} speed={-0.08} tilt={Math.PI / 3} color="#10b981" thickness={0.003} />
      <OrbitRing radius={6} speed={0.05} tilt={Math.PI / 2.2} color="#8b5cf6" thickness={0.003} />
      <OrbitRing radius={7} speed={-0.03} tilt={Math.PI / 4} color="#f59e0b" thickness={0.002} />

      {/* Nebula glows */}
      <NebulaGlow position={[-6, 2, -10]} color="#3b82f6" scale={4} />
      <NebulaGlow position={[5, -3, -12]} color="#10b981" scale={3.5} />
      <NebulaGlow position={[0, 5, -15]} color="#8b5cf6" scale={5} />
      <NebulaGlow position={[-4, -5, -8]} color="#06b6d4" scale={3} />

      {/* Grid plane */}
      <GridPlane />
    </>
  );
};

// ─── Component ───
export default function ScrollBackground3D() {
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

  if (lowPower) {
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
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
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
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(220_60%_3%/0.8)_100%)]" />
    </div>
  );
}
