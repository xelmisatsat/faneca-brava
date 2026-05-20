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
    id: "jun",
    title: "Jun Sieira",
    subtitle: "Deseno e Direccion",
    img: isCapacitor() ? "assets/images/opinion-jun.jpg" : "/manus-storage/opinion-jun.jpg",
  },
  {
    id: "alvaro",
    title: "Alvaro Villar",
    subtitle: "Programacion e Codigo",
    img: isCapacitor() ? "assets/images/opinion-alvaro.jpg" : "/manus-storage/opinion-alvaro.jpg",
  },
  {
    id: "santiago",
    title: "Santiago de Compostela",
    subtitle: "Ruas de pedra e choiva",
    img: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "cies",
    title: "Illas Cies",
    subtitle: "Praia de Rodas, area e mar",
    img: "https://images.unsplash.com/photo-1544913716-6081a1fd0411?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fragas",
    title: "Fragas do Eume",
    subtitle: "Bosque maxuco e neboa",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "sil",
    title: "Canon do Sil",
    subtitle: "Ribeira Sacra",
    img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "combarro",
    title: "Combarro",
    subtitle: "Horreos ao pe da ria",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "barona",
    title: "Castro de Barona",
    subtitle: "Historia celta sobre o mar",
    img: "https://images.unsplash.com/photo-1579712267787-0431e1e39ff7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "lugo",
    title: "Muralla de Lugo",
    subtitle: "Pedra romana milenaria",
    img: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "loiba",
    title: "Acantilados de Loiba",
    subtitle: "O mellor banco do mundo",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "catedrais",
    title: "Praia das Catedrais",
    subtitle: "Catedrais de pedra e mar",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fisterra",
    title: "Cabo Fisterra",
    subtitle: "A fin do mundo antigo",
    img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=600&auto=format&fit=crop",
  },
];

function CameraIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.7))" }}>
      <defs>
        <linearGradient id="cBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C2C3A" />
          <stop offset="100%" stopColor="#16161E" />
        </linearGradient>
        <linearGradient id="cMetalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4D4E0" />
          <stop offset="50%" stopColor="#ABABBA" />
          <stop offset="100%" stopColor="#7A7A8A" />
        </linearGradient>
        <radialGradient id="cLensGrad" cx="45%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#1C3552" />
          <stop offset="65%" stopColor="#060C14" />
          <stop offset="100%" stopColor="#010204" />
        </radialGradient>
        <radialGradient id="cShineGrad" cx="32%" cy="30%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#55AADD" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="10" y="40" width="200" height="100" rx="8" fill="url(#cBodyGrad)" stroke="#2E2E3E" strokeWidth="1" />
      <path d="M30 24C30 19.58 33.58 16 38 16H182C186.42 16 190 19.58 190 24V40H30V24Z" fill="url(#cMetalGrad)" />
      <motion.ellipse cx="62" cy="18" rx="11" ry="5.5"
        fill="url(#cMetalGrad)"
        animate={{ ry: active ? 3 : 5.5 }}
        transition={{ duration: 0.08 }} />
      <circle cx="164" cy="22" r="9" fill="#1E1E28" stroke="url(#cMetalGrad)" strokeWidth="1.5" />
      <line x1="164" y1="14" x2="164" y2="30" stroke="#555" strokeWidth="1.2" />
      <line x1="156" y1="22" x2="172" y2="22" stroke="#555" strokeWidth="1.2" />
      <circle cx="110" cy="88" r="46" fill="#0E0E14" stroke="#252530" strokeWidth="1.5" />
      <circle cx="110" cy="88" r="40" fill="url(#cMetalGrad)" stroke="#18181F" strokeWidth="1" />
      <circle cx="110" cy="88" r="35" fill="#080A0E" stroke="#2E2E3E" strokeWidth="1.5" />
      <circle cx="110" cy="88" r="30" fill="none" stroke="#C8A96E" strokeWidth="1" opacity="0.7" />
      <circle cx="110" cy="88" r="25" fill="url(#cLensGrad)" />
      <motion.g
        animate={{ rotate: active ? 72 : 0, scale: active ? 0.28 : 1 }}
        transition={{ duration: 0.18 }}
        style={{ originX: "110px", originY: "88px" }}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path key={a}
            d={`M110 88 L${110 + 22 * Math.cos((a * Math.PI) / 180)} ${88 + 22 * Math.sin((a * Math.PI) / 180)} L${110 + 22 * Math.cos(((a + 60) * Math.PI) / 180)} ${88 + 22 * Math.sin(((a + 60) * Math.PI) / 180)} Z`}
            fill="#0E101A" opacity="0.92" />
        ))}
      </motion.g>
      <ellipse cx="102" cy="80" rx="13" ry="8" fill="url(#cShineGrad)" />
      <circle cx="186" cy="50" r="5" fill="#CC2222" />
      {[0, 3, 6, 9].map((dx) => (
        <line key={dx} x1={18 + dx} y1="50" x2={18 + dx} y2="128" stroke="#2A2A36" strokeWidth="1" />
      ))}
    </svg>
  );
}

export default function NosSection() {
  const [mounted, setMounted] = useState(false);
  const m = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [shutterFlash, setShutterFlash] = useState(false);
  const [reelVisible, setReelVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof PHOTOS)[0] | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play().catch(() => {}); setPlaying(true); }
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress((videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100);
  };
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const v = parseFloat(e.target.value);
    videoRef.current.currentTime = (v / 100) * (videoRef.current.duration || 0);
    setProgress(v);
  };

  const handleCameraClick = async () => {
    if (isTakingPhoto) return;
    setIsTakingPhoto(true);
    setShutterFlash(true);
    try {
      const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (_) {}
    setTimeout(() => {
      setShutterFlash(false);
      setIsTakingPhoto(false);
      setReelVisible(true);
    }, 280);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 40) setCurrentIndex(prev => Math.max(0, prev - 1));
    else if (info.offset.x < -40) setCurrentIndex(prev => Math.min(PHOTOS.length - 1, prev + 1));
  };

  const videoSrc = isCapacitor() ? "assets/images/nos-video.mp4" : "/manus-storage/nos-video.mp4";

  return (
    <>
      {/* Shutter flash */}
      <AnimatePresence>
        {shutterFlash && (
          <motion.div key="flash"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{ position: "fixed", inset: 0, background: "#fff", zIndex: 999998, pointerEvents: "none" }} />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.96)", zIndex: 999999,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", width: "min(900px, 94vw)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button onClick={() => setSelectedPhoto(null)}
                style={{ position: "absolute", top: "-44px", right: 0, background: "none", border: "none",
                  color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                <X size={20} /> Pechar
              </button>
              <img src={selectedPhoto.img} alt={selectedPhoto.title}
                style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", display: "block",
                  border: "6px solid #111", boxShadow: "0 0 0 1px #333, 0 20px 60px rgba(0,0,0,0.8)" }} />
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem",
                  fontWeight: 400, color: "#EAE2D2", margin: 0 }}>{selectedPhoto.title}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#777", marginTop: "8px" }}>
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
              Nos, os <span style={{ color: "#C8A96E" }}>Creadores</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: m ? "0.9rem" : "1.05rem", lineHeight: 1.8, color: "#8B9BB4",
              maxWidth: "600px", margin: "1.5rem auto 0" }}>
              Unha viaxe dixital a traves da memoria, do insomnio e da revelacion fotografica de Faneca Brava.
            </p>
          </motion.div>

          {/* Two-column grid */}
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr",
            gap: m ? "2rem" : "3.5rem", alignItems: "center",
            marginBottom: reelVisible ? (m ? "2rem" : "3rem") : 0 }}>

            {/* Video column */}
            <motion.div
              initial={{ opacity: 0, x: m ? 0 : -50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...G, overflow: "hidden" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
                <video ref={videoRef} src={videoSrc} loop muted={muted} playsInline
                  onTimeUpdate={handleTimeUpdate} onClick={togglePlay}
                  style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" }} />
                {!playing && (
                  <div onClick={togglePlay} style={{ position: "absolute", inset: 0, display: "flex",
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
                  <input type="range" min="0" max="100" value={progress} onChange={handleProgressChange}
                    style={{ width: "100%", accentColor: "#C8A96E", height: "4px", borderRadius: "2px", cursor: "pointer", outline: "none" }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button onClick={togglePlay} style={{ background: "none", border: "none", color: "#EAE2D2", cursor: "pointer", padding: 0 }}>
                        {playing ? <Pause size={16} /> : <Play size={16} fill="#EAE2D2" />}
                      </button>
                      <button onClick={toggleMute} style={{ background: "none", border: "none", color: "#EAE2D2", cursor: "pointer", padding: 0 }}>
                        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                    <button onClick={() => videoRef.current?.requestFullscreen?.()}
                      style={{ background: "none", border: "none", color: "#EAE2D2", cursor: "pointer", padding: 0 }}>
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem",
                  fontWeight: 300, color: "#C8A96E", marginBottom: "6px" }}>A Nosa Companeira</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem",
                  lineHeight: 1.6, color: "#8B9BB4", margin: 0 }}>
                  Emma Tabuyo Rodriguez, a traves deste pequeno documental do libro Faneca Brava.
                </p>
              </div>
            </motion.div>

            {/* Camera column */}
            <motion.div
              initial={{ opacity: 0, x: m ? 0 : 50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...G, padding: "2.5rem 1.5rem", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "260px" }}>
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <motion.div
                  animate={{ scale: [1, 1.14, 1], opacity: [0.14, 0.3, 0.14] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", top: "50%", left: "50%", width: "190px", height: "110px",
                    borderRadius: "50%", background: "radial-gradient(circle, #C8A96E 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={handleCameraClick}
                  style={{ position: "relative", zIndex: 10, width: m ? "200px" : "240px",
                    height: m ? "136px" : "162px", cursor: "pointer" }}>
                  <CameraIcon active={isTakingPhoto} />
                </motion.div>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem",
                fontWeight: 300, color: "#C8A96E", marginBottom: "8px" }}>
                {reelVisible ? "Carrete Revelado" : "Camara de Concha"}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
                lineHeight: 1.6, color: "#EAE2D2", opacity: 0.78, maxWidth: "280px", margin: 0 }}>
                {reelVisible
                  ? "Arrastra ou usa as frechas para ollar as nosas fotos."
                  : "Preme a camara analoxico para disparar o flash e revelar o noso carrete."}
              </p>
            </motion.div>
          </div>

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
                            /* Film frame: dark background with film borders */
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
                            {/* Frame number */}
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
