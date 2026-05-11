import { useState, useCallback, lazy, Suspense, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import NavPill from "@/components/NavPill";
// AudioPlayer agora está integrado na NavPill

const HeroSection       = lazy(() => import("@/components/HeroSection"));
const SobreSection      = lazy(() => import("@/components/SobreSection"));
const HistoriaSection   = lazy(() => import("@/components/HistoriaSection"));
const PersonaxesSection = lazy(() => import("@/components/PersonaxesSection"));
const GaleriaSection    = lazy(() => import("@/components/GaleriaSection"));
const TimelineSection   = lazy(() => import("@/components/TimelineSection"));
const ArquivoSection    = lazy(() => import("@/components/ArquivoSection"));
const LibroSection      = lazy(() => import("@/components/LibroSection"));
const AutorSection      = lazy(() => import("@/components/AutorSection"));
const ConversaSection   = lazy(() => import("@/components/ConversaSection"));
const MercarSection     = lazy(() => import("@/components/MercarSection"));
const OpinionSection    = lazy(() => import("@/components/OpinionSection"));
const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));

const SECTIONS = [
  { id: "hero",       label: "Inicio",     short: "01" },
  { id: "sobre",      label: "A Novela",   short: "02" },
  { id: "historia",   label: "Historia",   short: "03" },
  { id: "personaxes", label: "Personaxes", short: "04" },
  { id: "galeria",    label: "Galería",    short: "05" },
  { id: "timeline",   label: "Cronoloxía", short: "06" },
  { id: "arquivo",    label: "Análise",    short: "07" },
  { id: "libro",      label: "O Libro",    short: "08" },
  { id: "autor",      label: "O Autor",    short: "09" },
  { id: "conversa",   label: "IA",         short: "10" },
  { id: "opinion",    label: "Opinión",    short: "11" },
  { id: "mercar",     label: "Mercar",     short: "12" },
];

const COMPONENTS: Record<string, React.ComponentType> = {
  hero: HeroSection, sobre: SobreSection, historia: HistoriaSection,
  personaxes: PersonaxesSection, galeria: GaleriaSection, timeline: TimelineSection,
  arquivo: ArquivoSection, libro: LibroSection, autor: AutorSection,
  conversa: ConversaSection,
  opinion: OpinionSection,
  mercar: MercarSection,
};

// Animación de carga de sección con skeleton
const SectionSkeleton = ({ label }: { label: string }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
    {/* Skeleton lines animadas */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      {[80, 60, 90, 50].map((w, i) => (
        <motion.div
          key={i}
          style={{ height: i === 0 ? '8px' : '4px', borderRadius: '4px', background: 'rgba(200,169,110,0.15)', width: `${w}%` }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
    <motion.p
      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(139,155,180,0.4)' }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {label}
    </motion.p>
  </div>
);

// Overlay de transición entre seccións
const TransitionOverlay = ({ visible, label }: { visible: boolean; label: string }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 4000,
          background: 'rgba(8,8,13,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            style={{ width: '40px', height: '1px', background: '#C8A96E', margin: '0 auto 12px' }}
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 0.3 }}
          />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#EAE2D2', letterSpacing: '0.05em' }}>
            {label}
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function Home() {
  const [loaded, setLoaded]             = useState(false);
  const [showContent, setShowContent]   = useState(false);
  const [activeIdx, setActiveIdx]       = useState(0);
  const [prevIdx, setPrevIdx]           = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 200);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= SECTIONS.length || idx === activeIdx || transitioning) return;

    // Mostrar overlay de transición brevemente
    setTransitioning(true);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);

    transitionTimer.current = setTimeout(() => {
      setPrevIdx(activeIdx);
      setActiveIdx(idx);
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Ocultar overlay despois de que a nova sección cargue
      setTimeout(() => setTransitioning(false), 350);
    }, 200);
  }, [activeIdx, transitioning]);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!showContent) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(activeIdx + 1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(activeIdx - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [showContent, activeIdx, goTo]);

  const ActiveComp = COMPONENTS[SECTIONS[activeIdx].id];
  const dir = activeIdx > prevIdx ? 1 : -1;

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      {showContent && <CustomCursor />}
      {showContent && <Suspense fallback={null}><ParticleBackground /></Suspense>}
      {showContent && <div className="grain-overlay" />}

      {showContent && (
        <>
          <NavPill sections={SECTIONS} activeIdx={activeIdx} onSelect={goTo} />

          {/* Overlay de transición cinematográfica */}
          <TransitionOverlay visible={transitioning} label={SECTIONS[activeIdx].label} />

          {/* Sección activa con animación de entrada */}
          <AnimatePresence mode="wait">
            <motion.div
              key={SECTIONS[activeIdx].id}
              initial={{
                opacity: 0,
                y: dir > 0 ? 50 : -50,
                scale: 0.97,
                filter: 'blur(8px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                transition: {
                  duration: 0.65,
                  ease: 'easeOut' as const,
                  delay: 0.1,
                },
              }}
              exit={{
                opacity: 0,
                y: dir > 0 ? -30 : 30,
                scale: 0.98,
                filter: 'blur(5px)',
                transition: {
                  duration: 0.3,
                  ease: 'easeIn' as const,
                },
              }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <Suspense fallback={<SectionSkeleton label={SECTIONS[activeIdx].label} />}>
                <ActiveComp />
              </Suspense>
            </motion.div>
          </AnimatePresence>


          {/* Dots de navegación eliminados por agora */}

          {/* Contador de sección */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`counter-${activeIdx}`}
              style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 900 }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 300, color: 'rgba(200,169,110,0.45)' }}>
                {String(activeIdx + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Nome da sección activa (esquerda) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`lbl-${activeIdx}`}
              style={{ position: 'fixed', bottom: 32, left: 32, zIndex: 900 }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(139,155,180,0.4)' }}>
                {SECTIONS[activeIdx].label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Barra de progreso superior */}
          <motion.div
            style={{
              position: 'fixed', top: 0, left: 0, height: '2px', zIndex: 2000,
              background: 'linear-gradient(90deg, #C8A96E, rgba(200,169,110,0.3))',
              transformOrigin: 'left',
            }}
            animate={{
              width: `${((activeIdx + 1) / SECTIONS.length) * 100}%`,
              opacity: transitioning ? 1 : 0.6,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </>
      )}
    </>
  );
}
