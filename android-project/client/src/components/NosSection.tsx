import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

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
    subtitle: "Deseno & Direccion",
    img: isCapacitor() ? "assets/images/opinion-jun.jpg" : "/manus-storage/opinion-jun.jpg",
  },
  {
    id: "alvaro",
    title: "Alvaro Villar",
    subtitle: "Programacion & Codigo",
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

/* -------- 35mm Film Perforations row -------- */
function FilmPerforations({ count }: { count: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 8px",
        height: "18px",
        background: "#111",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "14px",
            height: "10px",
            borderRadius: "2px",
            background: "#000",
            border: "1px solid #2a2a2a",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

/* -------- Lightbox -------- */
function Lightbox({ photo, onClose }: { photo: (typeof PHOTOS)[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.96)",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(900px, 96vw)",
          width: "100%",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-44px",
            right: 0,
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.9rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <X size={20} /> Pechar
        </button>
        <img
          src={photo.img}
          alt={photo.title}
          style={{
            width: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "4px",
            display: "block",
          }}
        />
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <h4
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.6rem",
              fontWeight: 400,
              color: "#EAE2D2",
              margin: 0,
            }}
          >
            {photo.title}
          </h4>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "#888",
              marginTop: "6px",
            }}
          >
            {photo.subtitle}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------- Film Strip Overlay -------- */
function FilmStripOverlay({ onClose, onSelectPhoto }: { onClose: () => void; onSelectPhoto: (p: (typeof PHOTOS)[0]) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const FRAME_W = 220;
  const FRAME_H = 160;
  const perfCount = PHOTOS.length * 3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(10px)",
        zIndex: 99990,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          borderRadius: "50px",
          padding: "8px 18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem",
          zIndex: 100,
        }}
      >
        <X size={18} /> Pechar
      </button>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#C8A96E",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontSize: "0.7rem",
          marginBottom: "20px",
        }}
      >
        Desliza para ver o carrete completo
      </p>

      {/* Film Strip */}
      <div
        ref={scrollRef}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
          cursor: "grab",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            background: "#111",
            padding: "0 24px",
            minWidth: "max-content",
          }}
        >
          {/* Top perforations */}
          <FilmPerforations count={perfCount} />

          {/* Frames row */}
          <div style={{ display: "flex", gap: "6px", padding: "8px 0", background: "#111" }}>
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectPhoto(photo)}
                style={{
                  width: `${FRAME_W}px`,
                  flexShrink: 0,
                  cursor: "pointer",
                  border: "3px solid #222",
                  background: "#000",
                  outline: "1px solid #333",
                  position: "relative",
                }}
              >
                {/* Frame number */}
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    left: "6px",
                    fontFamily: "monospace",
                    fontSize: "10px",
                    color: "#C8A96E",
                    opacity: 0.7,
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <img
                  src={photo.img}
                  alt={photo.title}
                  style={{
                    width: "100%",
                    height: `${FRAME_H}px`,
                    objectFit: "cover",
                    display: "block",
                    filter: "sepia(0.1) contrast(1.1) brightness(0.92)",
                  }}
                />
                <div
                  style={{
                    background: "#0a0a0a",
                    padding: "6px 8px",
                    borderTop: "1px solid #222",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.9rem",
                      color: "#EAE2D2",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {photo.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      color: "#666",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {photo.subtitle}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom perforations */}
          <FilmPerforations count={perfCount} />
        </div>
      </div>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#555",
          fontSize: "0.75rem",
          marginTop: "16px",
        }}
      >
        Preme calquera foto para ampliala
      </p>
    </motion.div>
  );
}

/* -------- Camera SVG -------- */
function CameraSVG({ isActive }: { isActive: boolean }) {
  return (
    <svg
      viewBox="0 0 220 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.7))",
      }}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2A36" />
          <stop offset="100%" stopColor="#16161E" />
        </linearGradient>
        <linearGradient id="metalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D0D0DC" />
          <stop offset="50%" stopColor="#A8A8B8" />
          <stop offset="100%" stopColor="#78788A" />
        </linearGradient>
        <radialGradient id="lensDeep" cx="48%" cy="46%" r="50%">
          <stop offset="0%" stopColor="#1A3050" />
          <stop offset="60%" stopColor="#080E14" />
          <stop offset="100%" stopColor="#010305" />
        </radialGradient>
        <radialGradient id="lensShine" cx="35%" cy="32%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#4499cc" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Body */}
      <rect x="8" y="38" width="204" height="102" rx="9" fill="url(#bodyGrad)" stroke="#333" strokeWidth="0.8" />
      {/* Top plate */}
      <path d="M28 22C28 17.5817 31.5817 14 36 14H184C188.418 14 192 17.5817 192 22V38H28V22Z" fill="url(#metalGrad)" />
      {/* Shutter button */}
      <motion.ellipse
        cx="60"
        cy="16"
        rx="10"
        ry="5"
        fill="url(#metalGrad)"
        animate={{ ry: isActive ? 3 : 5 }}
        transition={{ duration: 0.08 }}
      />
      {/* Mode dial */}
      <circle cx="168" cy="20" r="10" fill="#222" stroke="url(#metalGrad)" strokeWidth="1.5" />
      <line x1="168" y1="11" x2="168" y2="29" stroke="#666" strokeWidth="1" />
      <line x1="159" y1="20" x2="177" y2="20" stroke="#666" strokeWidth="1" />

      {/* Lens barrel */}
      <circle cx="110" cy="90" r="48" fill="#111" stroke="#2A2A36" strokeWidth="1.5" />
      <circle cx="110" cy="90" r="42" fill="url(#metalGrad)" stroke="#1A1A24" strokeWidth="0.8" />
      <circle cx="110" cy="90" r="37" fill="#0A0A0F" stroke="#333" strokeWidth="1.5" />
      <circle cx="110" cy="90" r="32" fill="none" stroke="#C8A96E" strokeWidth="1" opacity="0.6" />
      <circle cx="110" cy="90" r="27" fill="url(#lensDeep)" />

      {/* Iris blades */}
      <motion.g
        animate={{ rotate: isActive ? 60 : 0, scale: isActive ? 0.3 : 1 }}
        transition={{ duration: 0.18 }}
        style={{ originX: "110px", originY: "90px" }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <path
            key={angle}
            d={`M110 90 L${110 + 20 * Math.cos((angle * Math.PI) / 180)} ${90 + 20 * Math.sin((angle * Math.PI) / 180)} L${110 + 20 * Math.cos(((angle + 60) * Math.PI) / 180)} ${90 + 20 * Math.sin(((angle + 60) * Math.PI) / 180)} Z`}
            fill="#141418"
            opacity="0.9"
          />
        ))}
      </motion.g>

      {/* Lens reflection */}
      <ellipse cx="102" cy="82" rx="14" ry="9" fill="url(#lensShine)" />

      {/* Red dot */}
      <circle cx="188" cy="52" r="5" fill="#CC2222" />

      {/* Grip texture */}
      {[0, 3, 6, 9].map((dx) => (
        <line key={dx} x1={16 + dx} y1="50" x2={16 + dx} y2="128" stroke="#333" strokeWidth="0.8" />
      ))}
    </svg>
  );
}

/* -------- Main Component -------- */
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
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof PHOTOS)[0] | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
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
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (_) {}
    setTimeout(() => {
      setShutterFlash(false);
      setIsTakingPhoto(false);
      setReelVisible(true);
    }, 280);
  };

  const videoSrc = isCapacitor() ? "assets/images/nos-video.mp4" : "/manus-storage/nos-video.mp4";

  return (
    <>
      {/* Shutter flash */}
      <AnimatePresence>
        {shutterFlash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#fff",
              zIndex: 999998,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Film Strip Overlay */}
      <AnimatePresence>
        {reelVisible && (
          <FilmStripOverlay
            onClose={() => setReelVisible(false)}
            onSelectPhoto={(p) => setSelectedPhoto(p)}
          />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>

      <section
        id="nos"
        style={{
          position: "relative",
          padding: m ? "4rem 0 3rem" : "8rem 0 6rem",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 60%)",
          }}
        />

        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: m ? "0 1.25rem" : "0 5rem",
            position: "relative",
            zIndex: 10,
            width: "100%",
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
            animate={mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: m ? "2.5rem" : "4rem", textAlign: "center" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginBottom: "1.5rem",
              }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={mounted ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
                style={{
                  width: "48px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #C8A96E)",
                  transformOrigin: "right",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#C8A96E",
                }}
              >
                O Proxecto
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={mounted ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
                style={{
                  width: "48px",
                  height: "1px",
                  background: "linear-gradient(90deg, #C8A96E, transparent)",
                  transformOrigin: "left",
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "#EAE2D2",
              }}
            >
              Nos, os <span style={{ color: "#C8A96E" }}>Creadores</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: m ? "0.9rem" : "1.05rem",
                lineHeight: 1.8,
                color: "#8B9BB4",
                maxWidth: "600px",
                margin: "1.5rem auto 0",
              }}
            >
              Unha viaxe dixital a traves da memoria, do insomnio e da revelacion fotografica de
              Faneca Brava.
            </p>
          </motion.div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 1fr",
              gap: m ? "2rem" : "3.5rem",
              alignItems: "center",
            }}
          >
            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: m ? 0 : -50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...G, overflow: "hidden" }}
            >
              <div
                style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  loop
                  muted={muted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                    display: "block",
                  }}
                />
                {!playing && (
                  <div
                    onClick={togglePlay}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.3)",
                      cursor: "pointer",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.14 }}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "rgba(200,169,110,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 25px rgba(200,169,110,0.4)",
                        paddingLeft: "3px",
                      }}
                    >
                      <Play size={24} color="#08080D" fill="#08080D" />
                    </motion.div>
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(8,8,13,0.95) 0%, rgba(8,8,13,0.4) 60%, transparent 100%)",
                    padding: "10px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    zIndex: 20,
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    style={{
                      width: "100%",
                      accentColor: "#C8A96E",
                      height: "4px",
                      borderRadius: "2px",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        onClick={togglePlay}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#EAE2D2",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {playing ? <Pause size={16} /> : <Play size={16} fill="#EAE2D2" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#EAE2D2",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                    <button
                      onClick={() => videoRef.current?.requestFullscreen?.()}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#EAE2D2",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    color: "#C8A96E",
                    marginBottom: "6px",
                  }}
                >
                  A Nosa Companeira
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.83rem",
                    lineHeight: 1.6,
                    color: "#8B9BB4",
                    margin: 0,
                  }}
                >
                  Emma Tabuyo Rodriguez, a traves deste pequeno documental do libro Faneca Brava.
                </p>
              </div>
            </motion.div>

            {/* Camera */}
            <motion.div
              initial={{ opacity: 0, x: m ? 0 : 50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...G,
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: "280px",
              }}
            >
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <motion.div
                  animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.28, 0.12] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "200px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #C8A96E 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCameraClick}
                  style={{
                    position: "relative",
                    width: m ? "200px" : "240px",
                    height: m ? "136px" : "162px",
                    cursor: "pointer",
                  }}
                >
                  <CameraSVG isActive={isTakingPhoto} />
                </motion.div>
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "#C8A96E",
                  marginBottom: "8px",
                }}
              >
                {reelVisible ? "Carrete Revelado" : "Camara de Concha"}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "#EAE2D2",
                  opacity: 0.75,
                  maxWidth: "260px",
                  margin: 0,
                }}
              >
                {reelVisible
                  ? "Preme de novo a camara para abrir o carrete outra vez."
                  : "Preme a camara analoxico para disparar o flash e revelar o noso carrete de fotos."}
              </p>
              {reelVisible && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setReelVisible(true)}
                  style={{
                    marginTop: "16px",
                    background: "rgba(200,169,110,0.15)",
                    border: "1px solid rgba(200,169,110,0.4)",
                    color: "#C8A96E",
                    borderRadius: "50px",
                    padding: "8px 20px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  Ver carrete
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
