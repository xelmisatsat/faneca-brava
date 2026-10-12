import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight, X, Film, Aperture } from "lucide-react";

const isCapacitor = () => typeof window !== "undefined" && !!(window as any).Capacitor;

const PHOTOS = [
  {
    id: "jun",
    title: "Jun Sieira Gerpe",
    subtitle: "Deseñador gráfico, Dev web e Arquitecto técnico",
    img: "/manus-storage/collaborator-jun-shanghai.png",
  },
  {
    id: "alvaro",
    title: "Álvaro Villar Gómez",
    subtitle: "Desenvolvemento web, Voces e Arquitectura técnica",
    img: "/manus-storage/collaborator-alvaro.jpg",
  },
  {
    id: "martina",
    title: "Martina Gontá Martínez",
    subtitle: "Colaboradora e Promotora (Videocrítica)",
    img: "/manus-storage/collaborator-martina.png?v=2",
  },
  {
    id: "emma",
    title: "Emma Tabuyo Rodríguez",
    subtitle: "Colaboradora e Promotora (Documental)",
    img: "/manus-storage/collaborator-emma.png?v=2",
  },
  {
    id: "olga",
    title: "María Olga Rosario Iglesias de la Fuente",
    subtitle: "Titora do Proxecto e Mestra de Galego",
    img: "/manus-storage/collaborator-olga.png",
  },
];

function Screw({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #D4D8E0 45%, #7D8494 100%)",
        boxShadow: "inset 0 1px 1px #FFF, 0 1px 2px rgba(0,0,0,0.22)",
        position: "relative",
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "15%",
          right: "15%",
          height: "1px",
          background: "#4A505C",
          transform: "translateY(-50%) rotate(42deg)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.7)",
        }}
      />
    </div>
  );
}

function SprocketHole() {
  return (
    <div
      style={{
        width: "11px",
        height: "8px",
        borderRadius: "1.5px",
        background: "#080706",
        boxShadow: "inset 0 1.5px 2px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.12)",
        borderTop: "1px solid rgba(0,0,0,0.9)",
        flexShrink: 0,
      }}
    />
  );
}

function VideoPlayer({
  src,
  title,
  subtitle,
  isMobile,
}: {
  src: string;
  title: string;
  subtitle: string;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.play().catch(() => {});
      setPlaying(true);
    }
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
    <div
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F7F3EB 40%, #EDE5D8 100%)",
        borderRadius: isMobile ? "18px" : "22px",
        padding: isMobile ? "9px" : "14px",
        boxShadow: "0 20px 48px -10px rgba(60,45,25,0.16), 0 6px 16px rgba(0,0,0,0.06), inset 0 1px 0 #FFFFFF",
        border: "1px solid #D8CFC0",
        borderTop: "1px solid #FFFFFF",
      }}
    >
      <Screw style={{ position: "absolute", top: "7px", left: "7px", zIndex: 10 }} />
      <Screw style={{ position: "absolute", top: "7px", right: "7px", zIndex: 10 }} />
      <Screw style={{ position: "absolute", bottom: "7px", left: "7px", zIndex: 10 }} />
      <Screw style={{ position: "absolute", bottom: "7px", right: "7px", zIndex: 10 }} />

      <div
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          border: "2px solid #23201C",
          background: "#000000",
          boxShadow: "inset 0 0 25px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
          <video
            ref={ref}
            src={src}
            loop
            muted={muted}
            playsInline
            onTimeUpdate={onTime}
            onClick={toggle}
            style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" }}
          />

          {!playing && (
            <div
              onClick={toggle}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.38)",
                cursor: "pointer",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: isMobile ? "54px" : "64px",
                  height: isMobile ? "54px" : "64px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #FDE68A 0%, #D97706 55%, #92400E 100%)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.7), inset 0 2px 2px rgba(255,255,255,0.7), inset 0 -2px 3px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "3px",
                  border: "1px solid #78350F",
                }}
              >
                <Play size={isMobile ? 22 : 26} color="#FFFFFF" fill="#FFFFFF" />
              </motion.div>
            </div>
          )}

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(8,9,13,0.96) 0%, rgba(8,9,13,0.72) 65%, transparent 100%)",
              padding: "10px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              zIndex: 20,
            }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={onSeek}
              style={{
                width: "100%",
                accentColor: "#F59E0B",
                height: "4px",
                borderRadius: "2px",
                cursor: "pointer",
                outline: "none",
                background: "#2A2E38",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={toggle}
                  style={{
                    background: "linear-gradient(180deg, #FFFFFF 0%, #E6E1D8 100%)",
                    border: "1px solid #B8B0A2",
                    borderRadius: "6px",
                    color: "#181A20",
                    cursor: "pointer",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 #FFF",
                  }}
                >
                  {playing ? <Pause size={14} /> : <Play size={14} fill="#181A20" />}
                </button>

                <button
                  onClick={toggleMute}
                  style={{
                    background: "linear-gradient(180deg, #FFFFFF 0%, #E6E1D8 100%)",
                    border: "1px solid #B8B0A2",
                    borderRadius: "6px",
                    color: "#181A20",
                    cursor: "pointer",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 #FFF",
                  }}
                >
                  {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "4px" }}>
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: playing ? "#22C55E" : "#F59E0B",
                      boxShadow: playing ? "0 0 8px #22C55E" : "0 0 6px #F59E0B",
                    }}
                  />
                  <span style={{ fontFamily: "monospace", fontSize: "9px", color: playing ? "#22C55E" : "#F59E0B", letterSpacing: "0.08em" }}>
                    {playing ? "REC" : "PAUSE"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => ref.current?.requestFullscreen?.()}
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #E6E1D8 100%)",
                  border: "1px solid #B8B0A2",
                  borderRadius: "6px",
                  color: "#181A20",
                  cursor: "pointer",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 #FFF",
                }}
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "10px",
          padding: "10px 14px",
          background: "linear-gradient(180deg, #FBF9F5 0%, #EFE9DE 100%)",
          borderRadius: "10px",
          border: "1px solid #D5CBB9",
          borderTop: "1px solid #FFFFFF",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8), 0 1px 3px rgba(60,45,25,0.08)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: isMobile ? "1.22rem" : "1.45rem",
            fontWeight: 700,
            color: "#181A20",
            marginBottom: "3px",
            textShadow: "0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.84rem",
            lineHeight: 1.5,
            color: "#475569",
            margin: 0,
          }}
        >
          {subtitle}
        </p>
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

  const startCoords = useRef({ x: 0, y: 0 });
  const startTimestamp = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    startCoords.current = { x: e.clientX, y: e.clientY };
    startTimestamp.current = Date.now();
  };

  const handlePointerUp = (e: React.PointerEvent, photo: (typeof PHOTOS)[0], isActive: boolean, index: number) => {
    const dx = e.clientX - startCoords.current.x;
    const dy = e.clientY - startCoords.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = Date.now() - startTimestamp.current;

    if (distance < 8 && duration < 300) {
      if (isActive) {
        setSelectedPhoto(photo);
      } else {
        setCurrentIndex(index);
      }
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleCameraClick = async () => {
    if (isTakingPhoto) return;
    setIsTakingPhoto(true);
    try {
      const cap = typeof window !== "undefined" ? (window as any).Capacitor : null;
      if (cap?.Plugins?.Haptics) {
        await cap.Plugins.Haptics.impact({ style: "HEAVY" });
      }
    } catch (_) {}
    setTimeout(() => {
      setIsTakingPhoto(false);
      setReelVisible(true);
    }, 320);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 35) setCurrentIndex((prev) => Math.max(0, prev - 1));
    else if (info.offset.x < -35) setCurrentIndex((prev) => Math.min(PHOTOS.length - 1, prev + 1));
  };

  const video1Src = isCapacitor() ? "assets/images/nos-video.mp4" : "/manus-storage/nos-video.mp4";
  const video2Src = isCapacitor() ? "assets/images/nos-video-2.mp4" : "/manus-storage/nos-video-2.mp4";
  const stickerSrc = isCapacitor() ? "assets/images/camera-sticker.png" : "/manus-storage/camera-sticker.png";

  return (
    <>
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "radial-gradient(circle at 50% 50%, rgba(24,20,16,0.95) 0%, rgba(10,8,6,0.98) 100%)",
                  zIndex: 999999,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: m ? "16px" : "32px",
                  backdropFilter: "blur(14px)",
                }}
              >
                <motion.div
                  initial={{ scale: 0.88, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.88, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "relative",
                    maxWidth: m ? "92vw" : "620px",
                    width: "100%",
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FAF7F0 100%)",
                    border: "1px solid #D6CEBE",
                    borderRadius: "16px",
                    padding: m ? "14px" : "20px",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.85), inset 0 1px 0 #FFFFFF",
                  }}
                >
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "linear-gradient(180deg, #FFFFFF 0%, #EDE6DC 100%)",
                      border: "1px solid #C8BCAC",
                      color: "#78350F",
                      borderRadius: "50%",
                      width: "34px",
                      height: "34px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: 30,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    }}
                  >
                    <X size={18} />
                  </button>

                  <div
                    style={{
                      background: "#F6F3EC",
                      padding: "8px 8px 12px 8px",
                      borderRadius: "6px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.25), inset 0 0 1px rgba(0,0,0,0.2)",
                    }}
                  >
                    <img
                      src={selectedPhoto.img}
                      alt={selectedPhoto.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: m ? "60vh" : "70vh",
                        objectFit: "contain",
                        display: "block",
                        borderRadius: "2px",
                        margin: "0 auto",
                      }}
                    />
                  </div>

                  <div style={{ textAlign: "center", marginTop: "14px" }}>
                    <h4
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: m ? "1.45rem" : "1.85rem",
                        fontWeight: 700,
                        color: "#181A20",
                        margin: 0,
                      }}
                    >
                      {selectedPhoto.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: m ? "0.85rem" : "0.95rem",
                        color: "#475569",
                        marginTop: "6px",
                        lineHeight: 1.4,
                      }}
                    >
                      {selectedPhoto.subtitle}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <section
        id="nos"
        style={{
          position: "relative",
          padding: m ? "4.5rem 0 3.5rem" : "7.5rem 0 6rem",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          scrollMarginTop: "95px",
          background: "radial-gradient(circle at 50% 25%, #FFFDF8 0%, #F5EFEB 45%, #EBE1D1 100%)",
          borderTop: "1px solid rgba(255,255,255,0.5)",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
          boxShadow: "inset 0 20px 40px rgba(60,45,25,0.05), inset 0 -20px 40px rgba(60,45,25,0.05)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: "radial-gradient(#CBBDA8 1px, transparent 1px)",
            backgroundSize: m ? "20px 20px" : "28px 28px",
            opacity: 0.35,
          }}
        />

        <div
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            padding: m ? "0 1.25rem" : "0 4rem",
            position: "relative",
            zIndex: 10,
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: m ? "2.25rem" : "3.5rem", textAlign: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "1.25rem" }}>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #D97706)", opacity: 0.7 }} />
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "linear-gradient(180deg, #FFFFFF 0%, #EDE7DC 100%)",
                  padding: "5px 16px",
                  borderRadius: "8px",
                  border: "1px solid #D5C9B5",
                  borderTop: "1px solid #FFFFFF",
                  boxShadow: "0 2px 6px rgba(60,45,25,0.08), inset 0 1px 0 #FFFFFF",
                }}
              >
                <Aperture size={13} color="#B45309" />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "#92400E",
                  }}
                >
                  O Proxecto
                </span>
              </div>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #D97706, transparent)", opacity: 0.7 }} />
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2.6rem, 5.5vw, 5.6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#181A20",
                textShadow: "0 1px 0 rgba(255,255,255,0.9)",
                margin: "0 0 0.8rem",
              }}
            >
              Nós, o <span style={{ color: "#B45309", fontStyle: "italic" }}>Equipo</span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: m ? "0.95rem" : "1.08rem",
                lineHeight: 1.7,
                color: "#475569",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              O equipo de traballo e colaboradores detrás da análise literaria de Faneca Brava.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: m ? "100%" : "880px", margin: "0 auto", marginBottom: m ? "1.75rem" : "2.5rem" }}
          >
            <VideoPlayer
              src={video2Src}
              isMobile={m}
              title="Videoanálise do Libro"
              subtitle="Martina Gontá Martínez, a través desta videocrítica do libro Faneca Brava."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: m ? "100%" : "640px", margin: "0 auto", marginBottom: m ? "2.25rem" : "3rem" }}
          >
            <VideoPlayer
              src={video1Src}
              isMobile={m}
              title="A Nosa Compañeira"
              subtitle="Emma Tabuyo Rodríguez, a través deste pequeno documental do libro Faneca Brava."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              background: "linear-gradient(180deg, #FFFFFF 0%, #F5EFEB 50%, #ECE4D6 100%)",
              border: "1px solid #D8CFC0",
              borderTop: "1px solid #FFFFFF",
              borderRadius: "20px",
              boxShadow: "0 22px 55px -10px rgba(60,45,25,0.18), 0 6px 18px rgba(0,0,0,0.06), inset 0 1px 0 #FFFFFF",
              padding: m ? "2rem 1.25rem" : "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: m ? "100%" : "480px",
              margin: "0 auto",
              marginBottom: reelVisible ? (m ? "2.25rem" : "3.25rem") : 0,
            }}
          >
            <Screw style={{ position: "absolute", top: "8px", left: "8px" }} />
            <Screw style={{ position: "absolute", top: "8px", right: "8px" }} />
            <Screw style={{ position: "absolute", bottom: "8px", left: "8px" }} />
            <Screw style={{ position: "absolute", bottom: "8px", right: "8px" }} />

            <div
              style={{
                position: "relative",
                marginBottom: "1.25rem",
                width: m ? "170px" : "200px",
                height: m ? "130px" : "155px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: m ? "130px" : "150px",
                  height: m ? "130px" : "150px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #F8F5EE 0%, #E8DFC8 70%, #D1C5B0 100%)",
                  border: "2px solid #C8BC9E",
                  boxShadow: "inset 0 3px 6px rgba(0,0,0,0.15), 0 1px 0 #FFF",
                }}
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleCameraClick}
                style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", cursor: "pointer" }}
              >
                <img
                  src={stickerSrc}
                  alt="Camera Sticker"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 10px 20px rgba(60,45,25,0.35))",
                    transform: isTakingPhoto ? "scale(0.92) rotate(-3deg)" : "scale(1) rotate(0deg)",
                    transition: "transform 0.15s ease-out",
                  }}
                />
              </motion.div>
            </div>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.55rem",
                fontWeight: 700,
                color: "#181A20",
                marginBottom: "6px",
                textShadow: "0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              {reelVisible ? "Equipo e Colaboradores" : "Colaboradores do Proxecto"}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                color: "#475569",
                maxWidth: "300px",
                margin: "0 0 1.25rem",
              }}
            >
              {reelVisible
                ? "Arrastra ou usa as frechas para ver as nosas fotos."
                : "Preme a cámara analóxica para revelar o noso equipo e colaboradores."}
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCameraClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(180deg, #FDE68A 0%, #D97706 60%, #92400E 100%)",
                border: "1px solid #78350F",
                borderRadius: "8px",
                padding: "9px 20px",
                color: "#FFFFFF",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(180,83,9,0.35), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 2px rgba(0,0,0,0.3)",
              }}
            >
              <Film size={14} color="#FFFFFF" />
              <span>{reelVisible ? "Bobina Revelada" : "Revelar Bobina"}</span>
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {reelVisible && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    width: "100%",
                    background: "linear-gradient(180deg, #26221F 0%, #171412 100%)",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                    borderRadius: "8px 8px 0 0",
                    border: "1px solid #3D3732",
                    borderTop: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 4px 12px rgba(60,45,25,0.15)",
                  }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: "7.5px", color: "#F59E0B", opacity: 0.85, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    KODAK SAFETY FILM 5063
                  </span>
                  <div style={{ display: "flex", gap: m ? "8px" : "16px", alignItems: "center" }}>
                    {Array.from({ length: m ? 14 : 26 }).map((_, i) => (
                      <SprocketHole key={i} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "7.5px", color: "#F59E0B", opacity: 0.85, letterSpacing: "0.15em" }}>
                    ISO 400
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: m ? "350px" : "440px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "visible",
                    background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.98) 0%, rgba(248,244,236,0.92) 55%, rgba(235,226,212,0.85) 100%)",
                    borderLeft: "1px solid #D5CBB9",
                    borderRight: "1px solid #D5CBB9",
                    boxShadow: "inset 0 0 35px rgba(160,135,100,0.18)",
                  }}
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "grab",
                    }}
                    whileTap={{ cursor: "grabbing" }}
                  >
                    {PHOTOS.map((photo, index) => {
                      const diff = index - currentIndex;
                      const isActive = index === currentIndex;
                      const offsetMult = m ? 130 : 210;
                      const curveFactor = m ? 6 : 10;
                      const rotateFactor = m ? 5 : 6;
                      const tx = diff * offsetMult;
                      const ty = Math.abs(diff) * Math.abs(diff) * curveFactor;
                      const rot = diff * rotateFactor;
                      const sc = 1 - Math.abs(diff) * 0.08;
                      const opacity = Math.abs(diff) > 3 ? 0 : 1 - Math.abs(diff) * 0.24;
                      const z = 100 - Math.abs(diff);
                      const cardW = m ? 165 : 220;
                      const cardH = m ? 260 : 330;

                      return (
                        <motion.div
                          key={photo.id}
                          animate={{ x: tx, y: ty, rotate: rot, scale: sc, opacity, zIndex: z }}
                          transition={{ type: "spring", damping: 26, stiffness: 185 }}
                          onPointerDown={handlePointerDown}
                          onPointerUp={(e) => handlePointerUp(e, photo, isActive, index)}
                          style={{
                            position: "absolute",
                            width: `${cardW}px`,
                            height: `${cardH}px`,
                            background: "#FFFFFF",
                            border: "1px solid #D6CEBE",
                            outline: isActive ? "2px solid #D97706" : "1px solid rgba(0,0,0,0.08)",
                            boxShadow: isActive
                              ? "0 25px 50px -10px rgba(70,50,30,0.28), 0 10px 20px rgba(0,0,0,0.1)"
                              : "0 14px 28px rgba(70,50,30,0.12), 0 2px 6px rgba(0,0,0,0.06)",
                            cursor: "pointer",
                            transformOrigin: "center bottom",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            borderRadius: "10px",
                          }}
                          whileHover={isActive ? { y: ty - 8 } : {}}
                        >
                          <div
                            style={{
                              height: "15px",
                              background: "linear-gradient(180deg, #26221F 0%, #171412 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-around",
                              padding: "0 4px",
                              flexShrink: 0,
                            }}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <SprocketHole key={i} />
                            ))}
                          </div>

                          <div
                            style={{
                              flex: 1,
                              minHeight: 0,
                              overflow: "hidden",
                              position: "relative",
                              background: "#0A0B0E",
                            }}
                          >
                            <img
                              src={photo.img}
                              alt={photo.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: photo.id === "jun" ? "center 15%" : "center 20%",
                                filter: "contrast(1.05) brightness(0.96)",
                                display: "block",
                              }}
                            />

                            <span
                              style={{
                                position: "absolute",
                                top: "5px",
                                left: "6px",
                                fontFamily: "monospace",
                                fontSize: "9px",
                                color: "#F59E0B",
                                opacity: 0.9,
                                pointerEvents: "none",
                                letterSpacing: "0.08em",
                                textShadow: "0 1px 2px rgba(0,0,0,0.9)",
                              }}
                            >
                              ▲ {String(index + 21).padStart(2, "0")}A
                            </span>

                            {isActive && (
                              <div
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  background: "linear-gradient(135deg, rgba(217,119,6,0.12) 0%, transparent 60%)",
                                  pointerEvents: "none",
                                }}
                              />
                            )}

                            {isActive && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPhoto(photo);
                                }}
                                style={{
                                  position: "absolute",
                                  bottom: "7px",
                                  right: "7px",
                                  background: "linear-gradient(180deg, #FFFFFF 0%, #EDE7DC 100%)",
                                  border: "1px solid #D97706",
                                  borderRadius: "50%",
                                  width: "30px",
                                  height: "30px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#92400E",
                                  cursor: "pointer",
                                  boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 #FFF",
                                  zIndex: 20,
                                  padding: 0,
                                }}
                              >
                                <Maximize2 size={13} />
                              </button>
                            )}
                          </div>

                          <div
                            style={{
                              height: "15px",
                              background: "linear-gradient(180deg, #171412 0%, #26221F 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-around",
                              padding: "0 4px",
                              flexShrink: 0,
                            }}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <SprocketHole key={i} />
                            ))}
                          </div>

                          <div
                            style={{
                              minHeight: m ? "54px" : "66px",
                              background: "linear-gradient(180deg, #FFFFFF 0%, #FAF8F4 100%)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: m ? "6px 8px 8px" : "8px 10px 10px",
                              flexShrink: 0,
                              borderTop: "1px solid #E5DED1",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: m ? "0.95rem" : "1.18rem",
                                fontWeight: 700,
                                color: "#181A20",
                                lineHeight: 1.15,
                                textAlign: "center",
                                width: "100%",
                                marginBottom: "2px",
                              }}
                            >
                              {photo.title}
                            </div>
                            <div
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: m ? "7.5px" : "9px",
                                fontWeight: 500,
                                lineHeight: 1.25,
                                color: "#4B5563",
                                textAlign: "center",
                                width: "100%",
                              }}
                            >
                              {photo.subtitle}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    style={{
                      position: "absolute",
                      left: m ? "6px" : "18px",
                      background: "linear-gradient(180deg, #FFFFFF 0%, #EDE7DC 100%)",
                      border: "1px solid #D5C9B5",
                      borderTop: "1px solid #FFFFFF",
                      color: "#92400E",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      opacity: currentIndex === 0 ? 0.3 : 0.95,
                      zIndex: 110,
                      boxShadow: "0 6px 16px rgba(60,45,25,0.18), inset 0 1px 0 #FFF",
                    }}
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(PHOTOS.length - 1, prev + 1))}
                    disabled={currentIndex === PHOTOS.length - 1}
                    style={{
                      position: "absolute",
                      right: m ? "6px" : "18px",
                      background: "linear-gradient(180deg, #FFFFFF 0%, #EDE7DC 100%)",
                      border: "1px solid #D5C9B5",
                      borderTop: "1px solid #FFFFFF",
                      color: "#92400E",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      opacity: currentIndex === PHOTOS.length - 1 ? 0.3 : 0.95,
                      zIndex: 110,
                      boxShadow: "0 6px 16px rgba(60,45,25,0.18), inset 0 1px 0 #FFF",
                    }}
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>

                <div
                  style={{
                    width: "100%",
                    background: "linear-gradient(180deg, #171412 0%, #26221F 100%)",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                    borderRadius: "0 0 8px 8px",
                    border: "1px solid #3D3732",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 8px 22px rgba(60,45,25,0.18)",
                  }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: "7.5px", color: "#F59E0B", opacity: 0.85, letterSpacing: "0.15em" }}>
                    FRAME 01-05
                  </span>
                  <div style={{ display: "flex", gap: m ? "8px" : "16px", alignItems: "center" }}>
                    {Array.from({ length: m ? 14 : 26 }).map((_, i) => (
                      <SprocketHole key={i} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "7.5px", color: "#F59E0B", opacity: 0.85, letterSpacing: "0.15em" }}>
                    MADE IN SPAIN
                  </span>
                </div>

                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "#475569",
                    marginTop: "14px",
                    letterSpacing: "0.02em",
                  }}
                >
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
