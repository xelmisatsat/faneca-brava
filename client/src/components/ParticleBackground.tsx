import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1500;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.001 - 0.001;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] + Math.sin(time * 0.2 + i) * 0.0005;
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      if (arr[i * 3 + 1] < -10) {
        arr[i * 3 + 1] = 10;
        arr[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    posAttr.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.01;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#C8A96E"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FogMesh() {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!matRef.current) return;
    const time = state.clock.elapsedTime;
    matRef.current.opacity = 0.03 + Math.sin(time * 0.3) * 0.01;
  });

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial
        ref={matRef}
        color="#1A2744"
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.6 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
        <FogMesh />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}
