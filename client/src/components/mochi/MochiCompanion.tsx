import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { createBlobCreature } from "./blobCreature";
import { createGPUFurPhysics } from "./gpuPhysics";
import { createGPUFurSystem } from "./furSystem";
import { Heart } from "lucide-react";

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
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [boopCount, setBoopCount] = useState(0);
  const [showHeartToast, setShowHeartToast] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);

  // Tamaño ampliado do lenzo para garantir marxe ampla e evitar que se corte o pelo nos extremos
  const size = isMobile ? 172 : 216;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. WebGL Renderer con fondo transparente
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.4 : 1.8);
    renderer.setPixelRatio(dpr);
    renderer.setSize(size, size);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    // 2. Escena e cámara con campo de visión máis amplo para que non recorte as puntas do peluxe
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1.0, 0.1, 40);
    camera.position.set(0.0, 0.20, isMobile ? 5.3 : 4.9);

    // 3. Luces de estudio suaves (Sakura Mochi)
    const keyLight = new THREE.DirectionalLight("#fff7ed", 1.45);
    keyLight.position.set(1.8, 2.2, 2.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#c4b5fd", 1.3);
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
      furDensity: isMobile ? 0.40 : 0.68,
      clumping: 0.35,
      curliness: 0.23,
      roughness: 0.77,
      specular: 0.24,
      lightIntensity: 1.35,
      rimIntensity: 1.35,
      windStrength: 0.85,
      gpuFurEnabled: !isMobile, // En móbiles usamos o modo analítico optimizado a 60 FPS
    };

    const gpuPhysics = createGPUFurPhysics(renderer);
    if (simState.gpuFurEnabled && !gpuPhysics.isGPGPUActive) {
      simState.gpuFurEnabled = false;
    }

    const furSystem = createGPUFurSystem(creature.bodyGeometry, simState);
    creature.root.add(furSystem.shellMesh);
    creature.root.add(furSystem.strandMesh);

    // Escala equilibrada con marxe de seguridade anti-recorte
    const baseScale = isMobile ? 0.90 : 0.98;
    creature.setEnvironmentScale(baseScale, 0.0, 0.0);

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
    let pointerDownTime = 0;
    let boopShockwave = 0.0;

    let currentX = window.innerWidth * 0.5 - size * 0.5;
    let currentY = window.innerHeight * 0.25;

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
            .multiplyScalar(36.0); // Sensibilidade de peiteado incrementada
        }
        isPointerOver = true;
        canvas.style.cursor = "pointer";
      } else {
        isPointerOver = false;
        pointerVelocity.multiplyScalar(0.45);
        canvas.style.cursor = "grab";
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      pointerDownTime = performance.now();
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      const duration = performance.now() - pointerDownTime;

      if (dist < 14 && duration < 400) {
        creature.triggerBoop();
        boopShockwave = 1.0;
        setBoopCount((c) => c + 1);

        setShowHeartToast(true);
        if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = window.setTimeout(() => {
          setShowHeartToast(false);
        }, 1800);

        try {
          if (typeof window !== "undefined" && window.navigator?.vibrate) {
            window.navigator.vibrate(15);
          }
        } catch {}
      }
    };

    const handlePointerLeave = () => {
      isPointerOver = false;
      pointerNDC.set(0, 0);
    };

    // Seguimento global da fiestra: a mirada segue o cursor en calquera lugar da pantalla
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isPointerOver) return;
      const rect = canvas.getBoundingClientRect();
      const midX = rect.left + rect.width * 2;
      const midY = rect.top + rect.height * 2;
      const dx = (e.clientX - midX) / (window.innerWidth * 0.45);
      const dy = -(e.clientY - midY) / (window.innerHeight * 0.45);
      pointerNDC.set(
        Math.max(-1.5, Math.min(1.5, dx * 0.95)),
        Math.max(-1.5, Math.min(1.5, dy * 0.95))
      );
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });

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

      // 7. Percorrido en hélice continua e acompañamento sincronizado co scroll
      const modal = scrollContainerRef?.current;
      if (modal && floatingRef.current) {
        const rect = modal.getBoundingClientRect();
        const maxScroll = Math.max(1, modal.scrollHeight - modal.clientHeight);
        const scrollFraction = Math.min(1, Math.max(0, modal.scrollTop / maxScroll));

        // Centro horizontal da pantalla e amplitude da hélice
        const centerX = rect.left + rect.width * 0.5;
        // Posición vertical base que viaxa acompasada co scroll
        const minY = rect.top + (isMobile ? 36 : 52);
        const maxY = rect.bottom - (isMobile ? 165 : 210);
        const scrollBaseY = minY + (maxY - minY) * scrollFraction;

        // Cadencia e fase do ciclo en hélice
        const helixSpeed = 0.68;
        const phase = totalTime * helixSpeed;

        // Amplitude lateral (vai alternando de lado: dereita <-> esquerda)
        const spanX = rect.width * (isMobile ? 0.38 : 0.44);
        // Amplitude vertical do lazo (subir por arriba e saír por abaixo)
        const amplitudeY = isMobile ? 36 : 52;

        // Traxectoria en hélice / figura-8:
        // Cando sin(phase) > 0: lado dereito. Cando sin(phase) < 0: lado esquerdo (alterna lados).
        // Cando cos(2*phase) == 1: pasa por arriba. Cando cos(2*phase) == -1: sae por abaixo.
        const helixX = centerX + Math.sin(phase) * spanX - size * 0.5;
        const helixY = scrollBaseY - Math.cos(phase * 2.0) * amplitudeY - size * 0.5;

        // Interpolares amortiguados con inercia suave (lerp)
        const lerpX = Math.min(1.0, dt * 5.4);
        const lerpY = Math.min(1.0, dt * 4.6);
        const prevX = currentX;
        const prevY = currentY;
        currentX += (helixX - currentX) * lerpX;
        currentY += (helixY - currentY) * lerpY;

        // Velocidade vectorial para inclinación e alabeo dinámico
        const velX = (currentX - prevX) / Math.max(dt, 0.001);
        const velY = (currentY - prevY) / Math.max(dt, 0.001);

        const bankZ = Math.max(-18, Math.min(18, (velX / Math.max(1, spanX)) * 26.0));
        const pitchX = Math.max(-14, Math.min(14, (velY / Math.max(1, amplitudeY)) * 14.0));

        // Profundidade 3D (lixeiramente máis preto ao pasar por diante)
        const depth = Math.sin(phase * 2.0 + 1.2);
        const depthScale = 1.0 + depth * 0.07;

        floatingRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(${depthScale.toFixed(3)}) rotate(${bankZ.toFixed(2)}deg) rotateX(${pitchX.toFixed(2)}deg)`;
      }

      // Olhar curioso cando non hai rato activo (ex: en móbiles)
      if (isMobile && !isPointerOver) {
        pointerNDC.x = Math.sin(totalTime * 0.75) * 0.6;
        pointerNDC.y = Math.cos(totalTime * 0.55) * 0.35;
      }

      // Actualizar criatura (ollos, pestanexo, brinco e respiración)
      creature.update(dt, pointerNDC, camera.position);

      // Decaemento da onda de choque no pelame
      if (boopShockwave > 0.01) {
        boopShockwave *= Math.exp(-dt * 4.2);
      } else {
        boopShockwave = 0.0;
      }

      // Física na GPU ou analítica optimizada
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
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
      renderer.dispose();
      creature.bodyGeometry.dispose();
      creature.skinMaterial.dispose();
    };
  }, [isMobile, scrollContainerRef, size]);

  return (
    <div
      className={`fixed inset-0 select-none ${className}`}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100050,
        ...style,
      }}
    >
      <motion.div
        ref={floatingRef}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          pointerEvents: "auto",
          touchAction: "pan-y",
          willChange: "transform",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            outline: "none",
            filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.40))",
          }}
        />

        {/* Notificación suave de caricia ou toque (sen recadros pesados nin interferencias) */}
        <AnimatePresence>
          {showHeartToast && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -8, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.85 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: -24,
                left: "50%",
                transform: "translateX(-50%)",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 9999,
                background: "rgba(22, 22, 28, 0.85)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 158, 199, 0.4)",
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 700,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
              }}
            >
              <Heart size={12} color="#FF6584" fill="#FF6584" />
              <span>{boopCount > 1 ? `${boopCount} apertas!` : "Boop! ✨"}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
