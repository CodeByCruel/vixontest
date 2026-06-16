import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sparkles, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const DataGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.1;
      wireRef.current.rotation.z = t * 0.05;
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 0.8) * 0.03;
      glowRef.current.scale.set(s, s, s);
      glowRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.04} wireframe />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.12} wireframe />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 4]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
      <pointLight color="#3b82f6" intensity={3} distance={6} />
      <pointLight color="#10b981" intensity={1.5} distance={4} position={[2, 1, 0]} />
    </group>
  );
};

const OrbitRing = ({
  radius,
  speed,
  tilt,
  color,
  thickness = 0.008,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  thickness?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * speed;
    }
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
};

const DataNode = ({
  radius,
  speed,
  phase,
  color,
  size = 0.06,
}: {
  radius: number;
  speed: number;
  phase: number;
  color: string;
  size?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.5) * 0.2;
    }
    if (trailRef.current) {
      const prevT = (state.clock.getElapsedTime() - 0.1) * speed + phase;
      trailRef.current.position.x = Math.cos(prevT) * radius;
      trailRef.current.position.z = Math.sin(prevT) * radius;
      trailRef.current.position.y = Math.sin(prevT * 1.5) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={trailRef}>
        <sphereGeometry args={[size * 0.5, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </group>
  );
};

const ConnectionLine = ({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) => {
  const ref = useRef<THREE.Line>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current && ref.current.material) {
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t * 2) * 0.1;
    }
  });

  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        Math.max(start[1], end[1]) + 1,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(30);
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line ref={ref as any} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  );
};

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null!);
  const positions = useRef<Float32Array>();
  if (!positions.current) {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 16;
    }
    positions.current = arr;
  }
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.003;
  });
  return (
    <Points ref={ref} positions={positions.current} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 6, 18]} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#60a5fa" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#10b981" />

      <Stars radius={60} depth={60} count={3000} factor={4} saturation={0} fade speed={0.4} />
      <Sparkles count={80} scale={8} size={2.5} speed={0.3} color="#3b82f6" />
      <Sparkles count={40} scale={6} size={3} speed={0.2} color="#10b981" />

      <ParticleField />

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <DataGlobe />
      </Float>

      <OrbitRing radius={2.5} speed={0.25} tilt={Math.PI / 2.5} color="#3b82f6" thickness={0.006} />
      <OrbitRing radius={3.0} speed={-0.18} tilt={Math.PI / 3} color="#10b981" thickness={0.005} />
      <OrbitRing radius={3.5} speed={0.12} tilt={Math.PI / 2.2} color="#8b5cf6" thickness={0.004} />
      <OrbitRing radius={4.0} speed={-0.08} tilt={Math.PI / 4} color="#f59e0b" thickness={0.003} />

      <DataNode radius={2.5} speed={0.5} phase={0} color="#3b82f6" size={0.08} />
      <DataNode radius={2.5} speed={0.5} phase={Math.PI} color="#3b82f6" size={0.05} />
      <DataNode radius={3.0} speed={-0.35} phase={Math.PI / 2} color="#10b981" size={0.07} />
      <DataNode radius={3.0} speed={-0.35} phase={Math.PI * 1.5} color="#10b981" size={0.04} />
      <DataNode radius={3.5} speed={0.25} phase={Math.PI / 3} color="#8b5cf6" size={0.06} />
      <DataNode radius={4.0} speed={-0.15} phase={Math.PI / 1.5} color="#f59e0b" size={0.05} />

      <ConnectionLine start={[2.5, 0, 0]} end={[-2.5, 0, 0]} color="#3b82f6" />
      <ConnectionLine start={[0, 2, 0]} end={[0, -2, 0]} color="#10b981" />
      <ConnectionLine start={[1.5, 1.5, 0]} end={[-1.5, -1.5, 0]} color="#8b5cf6" />
    </>
  );
};

export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
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
  );
}
