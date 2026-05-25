import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";
// Haptics imported dynamically so root web build doesn't fail

const G = {
  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
  backdropFilter: "blur(48px)",
  WebkitBackdropFilter: "blur(48px)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderTop: "1px solid rgba(255,255,255,0.22)",
  borderRadius: "24px",
  boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
};

const isCapacitor = () => !!(window as any).Capacitor;

const PHOTOS = [
  {
    id: "martina",
    title: "Martina Gontá Martínez",
    subtitle: "Colaboradora e Promotora (Videocrítica)",
    img: "/manus-storage/collaborator-martina.png",
  },
  {
    id: "emma",
    title: "Emma Tabuyo Rodríguez",
    subtitle: "Colaboradora e Promotora (Documental)",
    img: "/manus-storage/collaborator-emma.png",
  },
  {
    id: "jun",
    title: "Jun Sieira Gerpe",
    subtitle: "Deseñador gráfico, Dev web e Arquitecto técnico",
    img: "/manus-storage/collaborator-jun.jpg",
  },
  {
    id: "alvaro",
    title: "Álvaro Villar Gómez",
    subtitle: "Desenvolvemento web, Voces e Arquitectura técnica",
    img: "/manus-storage/collaborator-alvaro.jpg",
  },
];

/* ── Reusable Video Player ───────────────────────────────────── */
function VideoPlayer({ src, title, subtitle, isMobile }: {
  src: string; title: string; subtitle: string; isMobile: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play().catch(() => {}); setPlaying(true); }
  };
  const toggleMute = () => {
    if (!ref.current) return;
    ref.current.muted = !muted;
    setMuted(!muted);
  };
  const onTime = () => {
    if (!ref.current) return;
    setProgress((ref.current.currentTime / (ref.current.duration || 1)) * 100);
  };
  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!ref.current) return;
    const v = parseFloat(e.target.value);
    ref.current.currentTime = (v / 100) * (ref.current.duration || 0);
    setProgress(v);
  };

  return (
    <div style={{ ...G, overflow: "hidden" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
        <video ref={ref} src={src} loop muted={muted} playsInline
          onTimeUpdate={onTime} onClick={toggle}
          style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" }} />
        {!playing && (
          <div onClick={toggle} style={{ position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", cursor: "pointer" }}>
            <motion.div whileHover={{ scale: 1.14 }}
              style={{ width: "60px", height: "60px", borderRadius: "50%",
                background: "rgba(200,169,110,0.9)", display: "flex", alignItems: "center",
                justifyContent: "center", boxShadow: "0 0 25px rgba(200,169,110,0.4)", paddingLeft: "3px" }}>
              <Play size={24} color="#08080D" fill="#08080D" />
            </motion.div>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(8,8,13,0.95) 0%, rgba(8,8,13,0.4) 60%, transparent 100%)",
          padding: "10px 14px", display: "flex", flexDirection: "column", gap: "6px", zIndex: 20 }}>
          <input type="range" min="0" max="100" value={progress} onChange={onSeek}
            style={{ width: "100%", accentColor: "#C8A96E", height: "4px", borderRadius: "2px", cursor: "pointer", outline: "none" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={toggle} style={{ background: "none", border: "none", color: "#EAE2D2", cursor: "pointer", padding: 0 }}>
                {playing ? <Pause size={16} /> : <Play size={16} fill="#EAE2D2" />}
              </button>
              <button onClick={toggleMute} style={{ background: "none", border: "none", color: "#EAE2D2", cursor: "pointer", padding: 0 }}>
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
            <button onClick={() => ref.current?.requestFullscreen?.()}
              style={{ background: "none", border: "none", color: "#EAE2D2", cursor: "pointer", padding: 0 }}>
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
      <div style={{ padding: "1.25rem" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.2rem" : "1.4rem",
          fontWeight: 300, color: "#C8A96E", marginBottom: "6px" }}>{title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem",
          lineHeight: 1.6, color: "#8B9BB4", margin: 0 }}>{subtitle}</p>
      </div>
    </div>
  );
}

export default function NosSection() {
  const [mounted, setMounted] = useState(false);
  const m = useIsMobile();
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [reelVisible, setReelVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof PHOTOS)[0] | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleCameraClick = async () => {
    if (isTakingPhoto) return;
    setIsTakingPhoto(true);
    try {
      const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (_) {}
    setTimeout(() => {
      setIsTakingPhoto(false);
      setReelVisible(true);
    }, 350);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 40) setCurrentIndex(prev => Math.max(0, prev - 1));
    else if (info.offset.x < -40) setCurrentIndex(prev => Math.min(PHOTOS.length - 1, prev + 1));
  };

  const video1Src = isCapacitor() ? "assets/images/nos-video.mp4" : "/manus-storage/nos-video.mp4";
  const video2Src = isCapacitor() ? "assets/images/nos-video-2.mp4" : "/manus-storage/nos-video-2.mp4";
  const stickerSrc = isCapacitor() ? "assets/images/camera-sticker.png" : "/manus-storage/camera-sticker.png";

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{ 
              position: "fixed", 
              top: 0, 
              left: 0, 
              width: "100vw", 
              height: "100vh", 
              background: "rgba(5,5,8,0.98)", 
              zIndex: 999999,
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center",
              padding: m ? "1.5rem" : "3rem",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxSizing: "border-box"
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                position: "relative", 
                width: m ? "90vw" : "auto",
                maxWidth: "600px",
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center" 
              }}
            >
              <button onClick={() => setSelectedPhoto(null)}
                style={{ 
                  position: "absolute", 
                  top: m ? "-42px" : "-48px", 
                  right: 0, 
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.2)", 
                  borderRadius: "50%",
                  width: "32px", 
                  height: "32px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "#fff", 
                  cursor: "pointer", 
                  padding: 0, 
                  zIndex: 10 
                }}
              >
                <X size={18} />
              </button>
              <img src={selectedPhoto.img} alt={selectedPhoto.title}
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: m ? "65vh" : "75vh", 
                  objectFit: "contain", 
                  display: "block",
                  borderRadius: "8px", 
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8)" 
                }} 
              />
              <div style={{ textAlign: "center", marginTop: m ? "14px" : "20px", flexShrink: 0 }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? "1.3rem" : "1.8rem",
                  fontWeight: 400, color: "#EAE2D2", margin: 0 }}>{selectedPhoto.title}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? "0.78rem" : "0.88rem", color: "#8B9BB4", marginTop: "8px", lineHeight: 1.4 }}>
                  {selectedPhoto.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="nos" style={{ position: "relative", padding: m ? "4rem 0 3rem" : "8rem 0 6rem",
        overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 80% 80%, rgba(26,39,68,0.25) 0%, transparent 50%)" }} />

        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: m ? "0 1.25rem" : "0 5rem",
          position: "relative", zIndex: 10, width: "100%" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
            animate={mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: m ? "2.5rem" : "4rem", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "1.5rem" }}>
              <motion.div initial={{ scaleX: 0 }} animate={mounted ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
                style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, transparent, #C8A96E)", transformOrigin: "right" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.35em",
                textTransform: "uppercase", color: "#C8A96E" }}>O Proxecto</span>
              <motion.div initial={{ scaleX: 0 }} animate={mounted ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
                style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, #C8A96E, transparent)", transformOrigin: "left" }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.9, letterSpacing: "-0.02em", color: "#EAE2D2" }}>
              Nós, o <span style={{ color: "#C8A96E" }}>Equipo</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: m ? "0.9rem" : "1.05rem", lineHeight: 1.8, color: "#8B9BB4",
              maxWidth: "600px", margin: "1.5rem auto 0" }}>
              O equipo de traballo e colaboradores detrás da análise literaria de Faneca Brava.
            </p>
          </motion.div>

          {/* Video de Martina - principal, máis grande */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: m ? "100%" : "900px", margin: "0 auto", marginBottom: m ? "1.5rem" : "2.5rem" }}>
            <VideoPlayer src={video2Src} isMobile={m}
              title="Videoanálise do Libro"
              subtitle="Martina Gontá Martínez, a través desta videocrítica do libro Faneca Brava." />
          </motion.div>

          {/* Video de Emma - secundario, máis pequeno */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: m ? "100%" : "640px", margin: "0 auto", marginBottom: m ? "2rem" : "3rem" }}>
            <VideoPlayer src={video1Src} isMobile={m}
              title="A Nosa Compañeira"
              subtitle="Emma Tabuyo Rodríguez, a través deste pequeno documental do libro Faneca Brava." />
          </motion.div>

          {/* Camera section - centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...G, padding: "2.5rem 1.5rem", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "220px",
              maxWidth: m ? "100%" : "480px", margin: "0 auto",
              marginBottom: reelVisible ? (m ? "2rem" : "3rem") : 0 }}>
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <motion.div
                animate={{ scale: [1, 1.14, 1], opacity: [0.14, 0.3, 0.14] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", top: "50%", left: "50%", width: "190px", height: "110px",
                  borderRadius: "50%", background: "radial-gradient(circle, #C8A96E 0%, transparent 70%)",
                  transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={handleCameraClick}
                style={{ position: "relative", zIndex: 10, width: m ? "180px" : "220px",
                  height: m ? "140px" : "170px", cursor: "pointer" }}>
                <img src={stickerSrc} alt="Camera Sticker"
                  style={{ width: "100%", height: "100%", objectFit: "contain",
                    filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.6))",
                    mixBlendMode: "multiply",
                    transform: isTakingPhoto ? "scale(0.93) rotate(-2deg)" : "scale(1) rotate(0deg)",
                    transition: "transform 0.15s ease-out" }} />
              </motion.div>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem",
              fontWeight: 300, color: "#C8A96E", marginBottom: "8px" }}>
              {reelVisible ? "Equipo e Colaboradores" : "Colaboradores do Proxecto"}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              lineHeight: 1.6, color: "#EAE2D2", opacity: 0.78, maxWidth: "280px", margin: 0 }}>
              {reelVisible
                ? "Arrastra ou usa as frechas para ver as nosas fotos."
                : "Preme a cámara analóxica para revelar o noso equipo e colaboradores."}
            </p>
          </motion.div>

          {/* Curved Film Reel Carousel */}
          <AnimatePresence>
            {reelVisible && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}>

                {/* Film reel top strip */}
                <div style={{ width: "100%", background: "#0A0A0A", height: "20px", display: "flex",
                  alignItems: "center", justifyContent: "space-around", padding: "0 12px",
                  borderRadius: "6px 6px 0 0", border: "1px solid #222" }}>
                  {Array.from({ length: 22 }).map((_, i) => (
                    <div key={i} style={{ width: "12px", height: "10px", background: "#000",
                      borderRadius: "2px", border: "1px solid #1A1A1A", flexShrink: 0 }} />
                  ))}
                </div>

                <div style={{ width: "100%", height: m ? "310px" : "400px", display: "flex",
                  alignItems: "center", justifyContent: "center", position: "relative",
                  overflow: "visible", background: "#0C0C0C", borderLeft: "1px solid #222", borderRight: "1px solid #222" }}>

                  <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}
                    style={{ width: "100%", height: "100%", position: "relative", display: "flex",
                      alignItems: "center", justifyContent: "center", cursor: "grab" }}
                    whileTap={{ cursor: "grabbing" }}>
                    {PHOTOS.map((photo, index) => {
                      const diff = index - currentIndex;
                      const isActive = index === currentIndex;
                      const offsetMult = m ? 130 : 210;
                      const curveFactor = m ? 7 : 12;
                      const rotateFactor = m ? 5 : 8;
                      const tx = diff * offsetMult;
                      const ty = Math.abs(diff) * Math.abs(diff) * curveFactor;
                      const rot = diff * rotateFactor;
                      const sc = 1 - Math.abs(diff) * 0.08;
                      const opacity = Math.abs(diff) > 3 ? 0 : 1 - Math.abs(diff) * 0.26;
                      const z = 100 - Math.abs(diff);
                      const cardW = m ? 140 : 195;
                      const cardH = m ? 185 : 265;

                      return (
                        <motion.div key={photo.id}
                          animate={{ x: tx, y: ty, rotate: rot, scale: sc, opacity, zIndex: z }}
                          transition={{ type: "spring", damping: 26, stiffness: 185 }}
                          onClick={() => {
                            if (isActive) setSelectedPhoto(photo);
                            else setCurrentIndex(index);
                          }}
                          style={{
                            position: "absolute",
                            width: `${cardW}px`,
                            height: `${cardH}px`,
                            background: "#0A0A0A",
                            border: "4px solid #1A1A1A",
                            outline: "1px solid #2E2E2E",
                            boxShadow: isActive
                              ? "0 20px 50px rgba(0,0,0,0.85), 0 0 0 1px #333, 0 0 20px rgba(200,169,110,0.2)"
                              : "0 8px 20px rgba(0,0,0,0.6), 0 0 0 1px #222",
                            cursor: "pointer",
                            transformOrigin: "center bottom",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                          }}
                          whileHover={isActive ? { y: ty - 8 } : {}}
                        >
                          {/* Sprocket holes strip - top */}
                          <div style={{ height: "14px", background: "#060606", display: "flex",
                            alignItems: "center", justifyContent: "space-around", padding: "0 4px", flexShrink: 0,
                            borderBottom: "1px solid #1E1E1E" }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div key={i} style={{ width: "9px", height: "7px", background: "#000",
                                borderRadius: "1px", border: "0.5px solid #2A2A2A" }} />
                            ))}
                          </div>

                          {/* Photo */}
                          <div style={{ flex: 1, overflow: "hidden", position: "relative",
                            borderTop: "2px solid #111", borderBottom: "2px solid #111" }}>
                            <img src={photo.img} alt={photo.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover",
                                filter: "sepia(0.1) contrast(1.08) brightness(0.9)", display: "block" }} />
                            <span style={{ position: "absolute", top: "4px", left: "5px",
                              fontFamily: "monospace", fontSize: "9px", color: "#C8A96E",
                              opacity: 0.7, pointerEvents: "none", letterSpacing: "0.05em" }}>
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {isActive && (
                              <div style={{ position: "absolute", inset: 0,
                                background: "linear-gradient(135deg, rgba(200,169,110,0.08) 0%, transparent 60%)",
                                pointerEvents: "none" }} />
                            )}
                          </div>

                          {/* Sprocket holes strip - bottom */}
                          <div style={{ height: "14px", background: "#060606", display: "flex",
                            alignItems: "center", justifyContent: "space-around", padding: "0 4px", flexShrink: 0,
                            borderTop: "1px solid #1E1E1E", borderBottom: "1px solid #1E1E1E" }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div key={i} style={{ width: "9px", height: "7px", background: "#000",
                                borderRadius: "1px", border: "0.5px solid #2A2A2A" }} />
                            ))}
                          </div>

                          {/* Caption */}
                          <div style={{ height: m ? "38px" : "48px", background: "#0A0A0A",
                            display: "flex", flexDirection: "column", justifyContent: "center",
                            alignItems: "center", padding: "4px 6px", flexShrink: 0 }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif",
                              fontSize: m ? "0.75rem" : "0.95rem", fontWeight: 500,
                              color: "#EAE2D2", whiteSpace: "nowrap", overflow: "hidden",
                              textOverflow: "ellipsis", width: "100%", textAlign: "center" }}>
                              {photo.title}
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: m ? "5px" : "6.5px",
                              letterSpacing: "0.06em", textTransform: "uppercase",
                              color: "#555", marginTop: "2px" }}>
                              {photo.subtitle}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Navigation arrows */}
                  <button onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    style={{ position: "absolute", left: m ? "4px" : "16px", background: "rgba(200,169,110,0.12)",
                      border: "1px solid rgba(200,169,110,0.25)", color: "#C8A96E", borderRadius: "50%",
                      width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", opacity: currentIndex === 0 ? 0.25 : 0.9, zIndex: 110,
                      backdropFilter: "blur(10px)" }}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setCurrentIndex(prev => Math.min(PHOTOS.length - 1, prev + 1))}
                    disabled={currentIndex === PHOTOS.length - 1}
                    style={{ position: "absolute", right: m ? "4px" : "16px", background: "rgba(200,169,110,0.12)",
                      border: "1px solid rgba(200,169,110,0.25)", color: "#C8A96E", borderRadius: "50%",
                      width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", opacity: currentIndex === PHOTOS.length - 1 ? 0.25 : 0.9, zIndex: 110,
                      backdropFilter: "blur(10px)" }}>
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Film reel bottom strip */}
                <div style={{ width: "100%", background: "#0A0A0A", height: "20px", display: "flex",
                  alignItems: "center", justifyContent: "space-around", padding: "0 12px",
                  borderRadius: "0 0 6px 6px", border: "1px solid #222", borderTop: "none" }}>
                  {Array.from({ length: 22 }).map((_, i) => (
                    <div key={i} style={{ width: "12px", height: "10px", background: "#000",
                      borderRadius: "2px", border: "1px solid #1A1A1A", flexShrink: 0 }} />
                  ))}
                </div>

                <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem", color: "#444", marginTop: "12px" }}>
                  Arrastra ou usa as frechas · Preme a foto activa para ampliala
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}
