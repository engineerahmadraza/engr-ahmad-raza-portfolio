/// <reference types="@react-three/fiber" />
'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ─── ARC REACTOR ──────────────────────────────────────────────────────── */
function ArcReactor({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.5 + Math.sin(t * 3) * 0.5;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.18, 32]} />
      <meshStandardMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={2}
        metalness={0.8}
        roughness={0.1}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ─── EYE ───────────────────────────────────────────────────────────────── */
function Eye({ position, phase = 0 }: { position: [number, number, number]; phase?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        2.5 + Math.sin(t * 2.5 + phase) * 0.8;
    }
  });
  return (
    <group position={position}>
      {/* Main eye lens */}
      <mesh ref={ref}>
        <boxGeometry args={[0.22, 0.09, 0.04]} />
        <meshStandardMaterial
          color="#ffd740"
          emissive="#ffab00"
          emissiveIntensity={3}
          metalness={0.3}
          roughness={0}
          toneMapped={false}
        />
      </mesh>
      {/* Eye glow halo */}
      <mesh>
        <boxGeometry args={[0.28, 0.14, 0.01]} />
        <meshStandardMaterial
          color="#ff6f00"
          emissive="#ff6f00"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─── IRON MAN HELMET ───────────────────────────────────────────────────── */
function IronManHelmet({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  // Materials
  const redMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c62828',
        metalness: 0.95,
        roughness: 0.15,
        envMapIntensity: 1.5,
      }),
    []
  );
  const darkRedMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8e0000',
        metalness: 0.95,
        roughness: 0.2,
        envMapIntensity: 1.2,
      }),
    []
  );
  const goldMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffb300',
        metalness: 1,
        roughness: 0.05,
        envMapIntensity: 2,
      }),
    []
  );
  const darkVisor = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a0a0a',
        metalness: 0.9,
        roughness: 0.05,
        transparent: true,
        opacity: 0.92,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Idle slow rotation
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3 + mouse.current.x * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.08 + mouse.current.y * 0.15;
    // Slight bob
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.06;
  });

  return (
    <group ref={groupRef} scale={[1.1, 1.1, 1.1]}>
      <group ref={innerRef}>
        {/* ── MAIN SKULL (slightly oblate sphere) ── */}
        <mesh material={redMetal} scale={[1, 1.1, 0.95]}>
          <sphereGeometry args={[1, 64, 48]} />
        </mesh>

        {/* ── FOREHEAD PLATE (upper front) ── */}
        <mesh material={redMetal} position={[0, 0.55, 0.85]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[1.1, 0.3, 0.08]} />
        </mesh>
        {/* Forehead brow ridge */}
        <mesh material={goldMetal} position={[0, 0.42, 0.9]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.05, 0.06, 0.06]} />
        </mesh>

        {/* ── VISOR AREA ── */}
        {/* Left brow angled piece */}
        <mesh material={redMetal} position={[-0.35, 0.38, 0.88]} rotation={[0.25, -0.15, 0.1]}>
          <boxGeometry args={[0.4, 0.12, 0.1]} />
        </mesh>
        {/* Right brow angled piece */}
        <mesh material={redMetal} position={[0.35, 0.38, 0.88]} rotation={[0.25, 0.15, -0.1]}>
          <boxGeometry args={[0.4, 0.12, 0.1]} />
        </mesh>
        {/* Dark visor glass */}
        <mesh material={darkVisor} position={[0, 0.18, 0.93]} rotation={[0.05, 0, 0]}>
          <boxGeometry args={[1.0, 0.28, 0.04]} />
        </mesh>

        {/* ── EYES ── */}
        <Eye position={[-0.28, 0.2, 0.97]} phase={0} />
        <Eye position={[0.28, 0.2, 0.97]} phase={Math.PI} />

        {/* ── NOSE BRIDGE ── */}
        <mesh material={redMetal} position={[0, 0.05, 0.96]}>
          <boxGeometry args={[0.12, 0.18, 0.06]} />
        </mesh>
        {/* Center T-bar */}
        <mesh material={darkRedMetal} position={[0, 0.12, 0.97]}>
          <boxGeometry args={[0.06, 0.22, 0.04]} />
        </mesh>

        {/* ── CHEEKBONES ── */}
        <mesh material={redMetal} position={[-0.58, 0.05, 0.78]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.3, 0.28, 0.14]} />
        </mesh>
        <mesh material={redMetal} position={[0.58, 0.05, 0.78]} rotation={[0, -0.4, 0]}>
          <boxGeometry args={[0.3, 0.28, 0.14]} />
        </mesh>
        {/* Cheek gold trim */}
        <mesh material={goldMetal} position={[-0.6, 0.05, 0.82]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.32, 0.04, 0.02]} />
        </mesh>
        <mesh material={goldMetal} position={[0.6, 0.05, 0.82]} rotation={[0, -0.4, 0]}>
          <boxGeometry args={[0.32, 0.04, 0.02]} />
        </mesh>

        {/* ── FACEPLATE LOWER ── */}
        <mesh material={redMetal} position={[0, -0.18, 0.93]}>
          <boxGeometry args={[0.85, 0.22, 0.08]} />
        </mesh>
        {/* Mouth grill slits */}
        {[-0.24, -0.08, 0.08, 0.24].map((x, i) => (
          <mesh key={i} material={darkVisor} position={[x, -0.2, 0.97]}>
            <boxGeometry args={[0.04, 0.06, 0.02]} />
          </mesh>
        ))}

        {/* ── CHIN ── */}
        <mesh material={redMetal} position={[0, -0.42, 0.84]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.7, 0.25, 0.12]} />
        </mesh>
        <mesh material={goldMetal} position={[0, -0.38, 0.9]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.65, 0.04, 0.04]} />
        </mesh>

        {/* ── EAR / SIDE PLATES ── */}
        {/* Left ear */}
        <mesh material={redMetal} position={[-0.92, 0.12, 0.2]} rotation={[0, 0.6, 0]}>
          <boxGeometry args={[0.12, 0.55, 0.35]} />
        </mesh>
        <mesh material={goldMetal} position={[-0.93, 0.3, 0.22]} rotation={[0, 0.6, 0]}>
          <boxGeometry args={[0.04, 0.06, 0.06]} />
        </mesh>
        {/* Right ear */}
        <mesh material={redMetal} position={[0.92, 0.12, 0.2]} rotation={[0, -0.6, 0]}>
          <boxGeometry args={[0.12, 0.55, 0.35]} />
        </mesh>
        <mesh material={goldMetal} position={[0.93, 0.3, 0.22]} rotation={[0, -0.6, 0]}>
          <boxGeometry args={[0.04, 0.06, 0.06]} />
        </mesh>

        {/* ── NECK GUARD ── */}
        <mesh material={darkRedMetal} position={[0, -0.82, 0.2]} scale={[0.75, 1, 0.8]}>
          <cylinderGeometry args={[0.5, 0.55, 0.25, 32]} />
        </mesh>

        {/* ── BACK NECK ── */}
        <mesh material={redMetal} position={[0, -0.62, -0.72]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.9, 0.35, 0.18]} />
        </mesh>

        {/* ── TOP CREST ── */}
        <mesh material={redMetal} position={[0, 1.12, 0]} scale={[0.7, 0.2, 0.7]}>
          <sphereGeometry args={[0.6, 32, 16]} />
        </mesh>

        {/* ── ARC REACTOR (chest area hint) ── */}
        <ArcReactor position={[0, -0.55, 0.98]} />
      </group>

      {/* ── DYNAMIC LIGHTS ── */}
      <pointLight position={[-0.28, 0.2, 1.5]} color="#ffd740" intensity={3} distance={2} />
      <pointLight position={[0.28, 0.2, 1.5]} color="#ffd740" intensity={3} distance={2} />
      <pointLight position={[0, -0.55, 1.5]} color="#00e5ff" intensity={4} distance={2} />
    </group>
  );
}

/* ─── RING PARTICLES ──────────────────────────────────────────────────── */
function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.3;
    }
  });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ─── DATA HUD LINES ─────────────────────────────────────────────────── */
function HudLines() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });
  return (
    <group ref={ref}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 2.2;
        const z = Math.sin(angle) * 2.2;
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.003, 0.4, 0.003]} />
            <meshBasicMaterial color="#c62828" transparent opacity={0.4} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── SCENE WRAPPER ─────────────────────────────────────────────────── */
function Scene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} color="#1a0a0a" />
      <directionalLight position={[-4, 6, 3]} color="#ffb300" intensity={1.5} />
      <directionalLight position={[4, 2, -2]} color="#c62828" intensity={0.8} />
      <pointLight position={[0, 5, 5]} color="#ffffff" intensity={0.5} />

      <Environment preset="city" />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <IronManHelmet mouse={mouse} />
      </Float>

      <OrbitRing radius={1.8} speed={0.4} color="#c62828" />
      <OrbitRing radius={2.1} speed={-0.25} color="#ffb300" />
      <OrbitRing radius={2.4} speed={0.18} color="#00bcd4" />

      <HudLines />

      <Sparkles
        count={80}
        scale={6}
        size={1.2}
        speed={0.3}
        color="#ffb300"
        opacity={0.4}
      />
      <Sparkles
        count={40}
        scale={5}
        size={0.8}
        speed={0.2}
        color="#c62828"
        opacity={0.3}
      />
    </>
  );
}

/* ─── EXPORTED COMPONENT ──────────────────────────────────────────────── */
export default function IronManScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.2 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
