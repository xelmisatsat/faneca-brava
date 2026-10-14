import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";
import { createBlobCreature } from "./blobCreature";
import { createGPUFurPhysics } from "./gpuPhysics";
import { createGPUFurSystem } from "./furSystem";
import { Sparkles, Heart, Hand } from "lucide-react";

interface MochiCompanionProps {
  isMobile?: boolean;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: CSSProperties;
}

export default function MochiCompanion({
  isMobile = false,
  scrollContainerRef,
  className = "",
  style = {},
}: MochiCompanionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [boopCount, setBoopCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 260;

    // 1. WebGL Renderer con fondo transparente para fundirse co deseño
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.4 : 1.8);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    // 2. Escena e cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 40);
    camera.position.set(0.0, 0.35, isMobile ? 4.8 : 4.4);

    // 3. Luces de estudio suaves (Sakura Mochi)
    const keyLight = new THREE.DirectionalLight("#fff7ed", 1.4);
    keyLight.position.set(1.8, 2.2, 2.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#c4b5fd", 1.25);
    rimLight.position.set(-2.0, 1.6, -2.8);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight("#f5d0fe", "#1e1b4b", 0.75);
    scene.add(hemiLight);

    // 4. Criatura Mochi-Puff e sistema de pelaxe híbrido (GPU / WebGL optimizado)
    const creature = createBlobCreature();
    scene.add(creature.root);

    const simState = {
      baseColor: "#5e2bff",
      tipColor: "#ff9ec7",
      furLength: 0.30,
      furDensity: isMobile ? 0.42 : 0.68,
      clumping: 0.35,
      curliness: 0.23,
      roughness: 0.77,
      specular: 0.24,
      lightIntensity: 1.35,
      rimIntensity: 1.35,
      windStrength: 0.85,
      gpuFurEnabled: !isMobile, // En móbiles usamos o modo optimizado analítico para manter 60 FPS estables
    };

    const gpuPhysics = createGPUFurPhysics(renderer);
    if (simState.gpuFurEnabled && !gpuPhysics.isGPGPUActive) {
      simState.gpuFurEnabled = false;
    }

    const furSystem = createGPUFurSystem(creature.bodyGeometry, simState);
    creature.root.add(furSystem.shellMesh);
    creature.root.add(furSystem.strandMesh);

    // Axustar escala e altura inicial
    const baseScale = isMobile ? 0.95 : 1.05;
    creature.setEnvironmentScale(baseScale, 0.0, 0.0);

    // Sincronizar uniforms de iluminación
    furSystem.sharedUniforms.uKeyLightDir.value.copy(keyLight.position).normalize();
    furSystem.sharedUniforms.uKeyLightColor.value.set("#fff7ed");
    furSystem.sharedUniforms.uKeyLightIntensity.value = 1.35;
    furSystem.sharedUniforms.uRimLightDir.value.copy(rimLight.position).normalize();
    furSystem.sharedUniforms.uRimLightColor.value.set("#c4b5fd");
    furSystem.sharedUniforms.uRimIntensity.value = 1.35;

    // 5. Interacción de rato e toque (Raycasting para peitear e facer chimpar)
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(0, 0);
    const pointerLocalPos = new THREE.Vector3(0, 0, 2);
    const prevPointerLocalPos = new THREE.Vector3(0, 0, 2);
    const pointerVelocity = new THREE.Vector3(0, 0, 0);
    let isPointerOver = false;
    let pointerDownPos = { x: 0, y: 0 };
    let boopShockwave = 0.0;
    let targetScrollY = 0;
    let currentScrollY = 0;

    // Seguimento do scroll do panel para que o muñeco baixe e reaccione ao desprazamento
    const scrollContainer = scrollContainerRef?.current;
    const handleScroll = () => {
      if (!scrollContainer) return;
      const st = scrollContainer.scrollTop;
      const maxScroll = Math.max(1, scrollContainer.scrollHeight - scrollContainer.clientHeight);
      targetScrollY = (st / maxScroll) * -0.45; // O muñeco descende suavemente conforme se avanza no panel
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Posición global do rato / dedo
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      pointerNDC.x = (x / rect.width) * 2.0 - 1.0;
      pointerNDC.y = -(y / rect.height) * 2.0 + 1.0;

      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObject(creature.bodyMesh, false);

      if (hits.length > 0) {
        prevPointerLocalPos.copy(pointerLocalPos);
        pointerLocalPos.copy(hits[0].point);
        creature.root.worldToLocal(pointerLocalPos);

        if (isPointerOver) {
          pointerVelocity
            .subVectors(pointerLocalPos, prevPointerLocalPos)
            .multiplyScalar(28.0);
        }
        isPointerOver = true;
        setIsHovered(true);
        canvas.style.cursor = "pointer";
      } else {
        isPointerOver = false;
        pointerVelocity.multiplyScalar(0.4);
        canvas.style.cursor = "grab";
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist < 10) {
        // Clic ou toque directo: boop!
        creature.triggerBoop();
        boopShockwave = 1.0;
        setBoopCount((c) => c + 1);
      }
    };

    const handlePointerLeave = () => {
      isPointerOver = false;
      setIsHovered(false);
      pointerNDC.set(0, 0);
    };

    // Seguimento global da fiestra para que a mirada siga o cursor mesmo fóra do canvas
    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      const dx = (e.clientX - midX) / (window.innerWidth * 0.5);
      const dy = -(e.clientY - midY) / (window.innerHeight * 0.5);
      if (!isPointerOver) {
        pointerNDC.set(
          Math.max(-1.5, Math.min(1.5, dx * 0.9)),
          Math.max(-1.5, Math.min(1.5, dy * 0.9))
        );
      }
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });

    // Observador de redimensionamento
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          width = w;
          height = h;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    ro.observe(container);

    // 6. Ciclo de animación a 60 FPS
    let animId: number;
    let lastTime = performance.now();
    let totalTime = 0;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      totalTime += dt;

      // Suavizado do movemento vertical co scroll
      currentScrollY += (targetScrollY - currentScrollY) * Math.min(1.0, dt * 5.0);
      creature.root.position.y += currentScrollY * 0.15;

      // Actualizar criatura (ollos, meixelas, chimpo boop e balanceo)
      creature.update(dt, pointerNDC, camera.position);

      // Decaemento da onda de choque no pelame
      if (boopShockwave > 0.01) {
        boopShockwave *= Math.exp(-dt * 4.2);
      } else {
        boopShockwave = 0.0;
      }

      // Física na gráfica ou analítica
      if (gpuPhysics.isGPGPUActive && simState.gpuFurEnabled) {
        const physTex = gpuPhysics.step({
          time: totalTime,
          dt,
          windStrength: 0.85,
          creatureVelocity: creature.animState.velocity,
          creatureAngularVel: creature.animState.angularVelocity,
          pointerLocalPos,
          pointerVelocity,
          pointerActive: isPointerOver,
          boopShockwave,
        });
        if (physTex) {
          furSystem.sharedUniforms.uPhysicsTex.value = physTex;
        }
      }

      // Actualizar uniforms de tempo e peiteado
      furSystem.sharedUniforms.uTime.value = totalTime;
      furSystem.sharedUniforms.uPointerLocalPos.value.copy(pointerLocalPos);
      furSystem.sharedUniforms.uPointerActive.value = isPointerOver ? 1.0 : 0.0;
      furSystem.sharedUniforms.uBoopShockwave.value = boopShockwave;
      furSystem.sharedUniforms.uWebGLInertia.value
        .copy(creature.animState.velocity)
        .multiplyScalar(-0.15);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      renderer.dispose();
      creature.bodyGeometry.dispose();
      creature.skinMaterial.dispose();
    };
  }, [isMobile, scrollContainerRef]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: isMobile ? 220 : 260,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        touchAction: "none",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          outline: "none",
        }}
      />

      {/* Indicador interactivo e contador de apertas */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          borderRadius: 9999,
          background: "rgba(20, 20, 24, 0.65)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          color: "#FFFFFF",
          fontSize: 11,
          fontWeight: 600,
          pointerEvents: "none",
          transition: "opacity 0.2s ease",
          opacity: isHovered ? 1 : 0.8,
        }}
      >
        {boopCount > 0 ? (
          <>
            <Heart size={13} color="#FF6584" fill="#FF6584" />
            <span>{boopCount} {boopCount === 1 ? "aperta" : "apertas"}</span>
          </>
        ) : (
          <>
            <Hand size={13} color="#D6F36A" />
            <span>Tócame ou acaríñame!</span>
          </>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: 12,
          left: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px",
          borderRadius: 9999,
          background: "rgba(255, 101, 132, 0.15)",
          border: "1px solid rgba(255, 101, 132, 0.35)",
          color: "#FF9EC7",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.02em",
          pointerEvents: "none",
        }}
      >
        <Sparkles size={11} />
        Mochi-Puff 3D
      </div>
    </div>
  );
}
