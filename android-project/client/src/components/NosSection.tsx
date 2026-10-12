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
    img: "/manus-storage/collaborator-martina.png",
  },
  {
    id: "emma",
    title: "Emma Tabuyo Rodríguez",
    subtitle: "Colaboradora e Promotora (Documental)",
    img: "/manus-storage/collaborator-emma.png",
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
        background: "radial-gradient(circle at 35% 35%, #8E9299 0%, #3B3F47 65%, #181A20 100%)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.45), 0 1px 3px rgba(0,0,0,0.9)",
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
          background: "#101216",
          transform: "translateY(-50%) rotate(42deg)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.2)",
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
        background: "#030406",
        boxShadow: "inset 0 2px 3px rgba(0,0,0,0.98), 0 1px 0 rgba(255,255,255,0.18)",
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
        background: "linear-gradient(180deg, #1C2028 0%, #12151D 50%, #0A0C11 100%)",
        borderRadius: isMobile ? "18px" : "22px",
        padding: isMobile ? "8px" : "12px",
        boxShadow: "0 25px 60px -12px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.8)",
        border: "1px solid #090B0F",
        borderTop: "1px solid rgba(255,255,255,0.22)",
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
          border: "2px solid #050609",
          background: "#000000",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.12)",
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
                background: "rgba(0,0,0,0.42)",
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
                  background: "radial-gradient(circle at 35% 35%, #F0D59E 0%, #C8A96E 50%, #7A5F30 100%)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.6), inset 0 -2px 3px rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "3px",
                  border: "1px solid #3F2F14",
                }}
              >
                <Play size={isMobile ? 22 : 26} color="#0D0904" fill="#0D0904" />
              </motion.div>
            </div>
          )}

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(8,9,13,0.96) 0%, rgba(8,9,13,0.7) 65%, transparent 100%)",
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
                accentColor: "#C8A96E",
                height: "4px",
                borderRadius: "2px",
                cursor: "pointer",
                outline: "none",
                background: "#1E222B",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={toggle}
                  style={{
                    background: "linear-gradient(180deg, #2A2F3B 0%, #161820 100%)",
                    border: "1px solid #090B0F",
                    borderTop: "1px solid rgba(255,255,255,0.22)",
                    borderRadius: "6px",
                    color: "#EAE2D2",
                    cursor: "pointer",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  {playing ? <Pause size={14} /> : <Play size={14} fill="#EAE2D2" />}
                </button>

                <button
                  onClick={toggleMute}
                  style={{
                    background: "linear-gradient(180deg, #2A2F3B 0%, #161820 100%)",
                    border: "1px solid #090B0F",
                    borderTop: "1px solid rgba(255,255,255,0.22)",
                    borderRadius: "6px",
                    color: "#EAE2D2",
                    cursor: "pointer",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
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
                      background: playing ? "#22C55E" : "#52525B",
                      boxShadow: playing ? "0 0 8px #22C55E" : "none",
                    }}
                  />
                  <span style={{ fontFamily: "monospace", fontSize: "9px", color: playing ? "#22C55E" : "#71717A", letterSpacing: "0.08em" }}>
                    {playing ? "REC" : "PAUSE"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => ref.current?.requestFullscreen?.()}
                style={{
                  background: "linear-gradient(180deg, #2A2F3B 0%, #161820 100%)",
                  border: "1px solid #090B0F",
                  borderTop: "1px solid rgba(255,255,255,0.22)",
                  borderRadius: "6px",
                  color: "#EAE2D2",
                  cursor: "pointer",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
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
          background: "linear-gradient(180deg, #12141A 0%, #0B0D12 100%)",
          borderRadius: "10px",
          border: "1px solid #06080B",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8)",
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: isMobile ? "1.2rem" : "1.4rem",
            fontWeight: 600,
            color: "#E2BA70",
            marginBottom: "4px",
            textShadow: "0 1px 0 rgba(255,255,255,0.1), 0 -1px 0 rgba(0,0,0,0.9)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            lineHeight: 1.5,
            color: "#94A3B8",
            margin: 0,
            textShadow: "0 -1px 0 rgba(0,0,0,0.8)",
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
      // @ts-ignore
      const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (_) {}
    setTimeout(() => {
      setIsTakingPhoto(false);
      setReelVisible(true);
    }, 320);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 40) setCurrentIndex((prev) => Math.max(0, prev - 1));
    else if (info.offset.x < -40) setCurrentIndex((prev) => Math.min(PHOTOS.length - 1, prev + 1));
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
                  background: "radial-gradient(circle at 50% 50%, rgba(18,20,26,0.98) 0%, rgba(7,8,11,0.99) 100%)",
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
                    background: "linear-gradient(180deg, #1C2028 0%, #12141A 100%)",
                    border: "1px solid #2A2E38",
                    borderRadius: "16px",
                    padding: m ? "14px" : "20px",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                >
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "linear-gradient(180deg, #2D323E 0%, #171A21 100%)",
                      border: "1px solid #3A3F4E",
                      color: "#E2BA70",
                      borderRadius: "50%",
                      width: "34px",
                      height: "34px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: 30,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.7)",
                    }}
                  >
                    <X size={18} />
                  </button>

                  <div
                    style={{
                      background: "#F6F3EC",
                      padding: "8px 8px 12px 8px",
                      borderRadius: "6px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.85), inset 0 0 1px rgba(0,0,0,0.4)",
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
                        fontSize: m ? "1.35rem" : "1.75rem",
                        fontWeight: 600,
                        color: "#E2BA70",
                        margin: 0,
                        textShadow: "0 -1px 0 rgba(0,0,0,0.9)",
                      }}
                    >
                      {selectedPhoto.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: m ? "0.8rem" : "0.9rem",
                        color: "#94A3B8",
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
          background: "radial-gradient(ellipse at 50% 12%, rgba(200, 169, 110, 0.09) 0%, transparent 65%), #090B10",
        }}
      >
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
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: m ? "2.25rem" : "3.5rem", textAlign: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "1.25rem" }}>
              <div style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, transparent, #C8A96E)", opacity: 0.7 }} />
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "linear-gradient(180deg, #1C2028 0%, #0E1015 100%)",
                  padding: "4px 14px",
                  borderRadius: "6px",
                  border: "1px solid #06080B",
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.6)",
                }}
              >
                <Aperture size={12} color="#C8A96E" />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#C8A96E",
                    textShadow: "0 1px 0 rgba(0,0,0,0.8)",
                  }}
                >
                  O Proxecto
                </span>
              </div>
              <div style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #C8A96E, transparent)", opacity: 0.7 }} />
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#F4F0E8",
                textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 30px rgba(200,169,110,0.15)",
                margin: "0 0 0.8rem",
              }}
            >
              Nós, o <span style={{ color: "#E2BA70", fontStyle: "italic" }}>Equipo</span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: m ? "0.92rem" : "1.05rem",
                lineHeight: 1.7,
                color: "#94A3B8",
                maxWidth: "600px",
                margin: "0 auto",
                textShadow: "0 -1px 0 rgba(0,0,0,0.9)",
              }}
            >
              O equipo de traballo e colaboradores detrás da análise literaria de Faneca Brava.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: m ? "100%" : "880px", margin: "0 auto", marginBottom: m ? "1.5rem" : "2.25rem" }}
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
            style={{ maxWidth: m ? "100%" : "640px", margin: "0 auto", marginBottom: m ? "2rem" : "2.75rem" }}
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
              background: "linear-gradient(180deg, #1A1E26 0%, #11141B 50%, #0A0C11 100%)",
              border: "1px solid #080A0E",
              borderTop: "1px solid rgba(255,255,255,0.22)",
              borderRadius: "20px",
              boxShadow: "0 25px 60px -10px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.7)",
              padding: m ? "2rem 1.25rem" : "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: m ? "100%" : "480px",
              margin: "0 auto",
              marginBottom: reelVisible ? (m ? "2rem" : "3rem") : 0,
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
                  background: "radial-gradient(circle, #0F1217 0%, #050608 100%)",
                  boxShadow: "inset 0 4px 8px rgba(0,0,0,0.95), 0 1px 0 rgba(255,255,255,0.12)",
                  border: "1px solid #1C202A",
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
                    filter: "drop-shadow(0 12px 25px rgba(0,0,0,0.85))",
                    transform: isTakingPhoto ? "scale(0.92) rotate(-3deg)" : "scale(1) rotate(0deg)",
                    transition: "transform 0.15s ease-out",
                  }}
                />
              </motion.div>
            </div>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#E2BA70",
                marginBottom: "6px",
                textShadow: "0 1px 0 rgba(255,255,255,0.1), 0 -1px 0 rgba(0,0,0,0.9)",
              }}
            >
              {reelVisible ? "Equipo e Colaboradores" : "Colaboradores do Proxecto"}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: "#CBD5E1",
                maxWidth: "290px",
                margin: "0 0 1.25rem",
                textShadow: "0 -1px 0 rgba(0,0,0,0.9)",
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
                background: "linear-gradient(180deg, #E6C887 0%, #C8A96E 50%, #8E6F33 100%)",
                border: "1px solid #483718",
                borderRadius: "8px",
                padding: "8px 18px",
                color: "#120E06",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 6px 14px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.4)",
              }}
            >
              <Film size={14} color="#120E06" />
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
                    background: "linear-gradient(180deg, #18191D 0%, #0B0C0E 100%)",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                    borderRadius: "8px 8px 0 0",
                    border: "1px solid #060709",
                    borderTop: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.8)",
                  }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: "7.5px", color: "#F59E0B", opacity: 0.65, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    KODAK SAFETY FILM 5063
                  </span>
                  <div style={{ display: "flex", gap: m ? "8px" : "16px", alignItems: "center" }}>
                    {Array.from({ length: m ? 14 : 26 }).map((_, i) => (
                      <SprocketHole key={i} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "7.5px", color: "#F59E0B", opacity: 0.65, letterSpacing: "0.15em" }}>
                    ISO 400
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: m ? "320px" : "415px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "visible",
                    background: "radial-gradient(ellipse at 50% 50%, #101217 0%, #07080B 100%)",
                    borderLeft: "1px solid #14161B",
                    borderRight: "1px solid #14161B",
                    boxShadow: "inset 0 0 40px rgba(0,0,0,0.9)",
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
                      const curveFactor = m ? 7 : 12;
                      const rotateFactor = m ? 5 : 8;
                      const tx = diff * offsetMult;
                      const ty = Math.abs(diff) * Math.abs(diff) * curveFactor;
                      const rot = diff * rotateFactor;
                      const sc = 1 - Math.abs(diff) * 0.08;
                      const opacity = Math.abs(diff) > 3 ? 0 : 1 - Math.abs(diff) * 0.26;
                      const z = 100 - Math.abs(diff);
                      const cardW = m ? 142 : 200;
                      const cardH = m ? 190 : 270;

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
                            background: "#08090C",
                            border: "3px solid #14161D",
                            outline: isActive ? "1px solid #C8A96E" : "1px solid #222630",
                            boxShadow: isActive
                              ? "0 25px 60px rgba(0,0,0,0.95), 0 0 25px rgba(200,169,110,0.3)"
                              : "0 10px 25px rgba(0,0,0,0.8)",
                            cursor: "pointer",
                            transformOrigin: "center bottom",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            borderRadius: "6px",
                          }}
                          whileHover={isActive ? { y: ty - 8 } : {}}
                        >
                          <div
                            style={{
                              height: "15px",
                              background: "linear-gradient(180deg, #15171C 0%, #0A0B0E 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-around",
                              padding: "0 4px",
                              flexShrink: 0,
                              borderBottom: "1px solid #1C2028",
                            }}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <SprocketHole key={i} />
                            ))}
                          </div>

                          <div
                            style={{
                              flex: 1,
                              overflow: "hidden",
                              position: "relative",
                              background: "#040507",
                              borderTop: "2px solid #000",
                              borderBottom: "2px solid #000",
                            }}
                          >
                            <img
                              src={photo.img}
                              alt={photo.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center 18%",
                                filter: "contrast(1.05) brightness(0.95)",
                                display: "block",
                              }}
                            />

                            <span
                              style={{
                                position: "absolute",
                                top: "4px",
                                left: "5px",
                                fontFamily: "monospace",
                                fontSize: "9px",
                                color: "#F59E0B",
                                opacity: 0.85,
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
                                  background: "linear-gradient(135deg, rgba(200,169,110,0.1) 0%, transparent 60%)",
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
                                  bottom: "8px",
                                  right: "8px",
                                  background: "linear-gradient(180deg, #2A2E38 0%, #12141A 100%)",
                                  border: "1px solid #C8A96E",
                                  borderRadius: "50%",
                                  width: "32px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#E2BA70",
                                  cursor: "pointer",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3)",
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
                              background: "linear-gradient(180deg, #0A0B0E 0%, #15171C 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-around",
                              padding: "0 4px",
                              flexShrink: 0,
                              borderTop: "1px solid #1C2028",
                            }}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <SprocketHole key={i} />
                            ))}
                          </div>

                          <div
                            style={{
                              height: m ? "40px" : "48px",
                              background: "#08090C",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "4px 8px",
                              flexShrink: 0,
                              borderTop: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: m ? "0.82rem" : "0.98rem",
                                fontWeight: 600,
                                color: "#EAE2D2",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                              {photo.title}
                            </div>
                            <div
                              style={{
                                fontFamily: "monospace",
                                fontSize: m ? "5.5px" : "7px",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color: "#71717A",
                                marginTop: "2px",
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
                      background: "linear-gradient(180deg, #272B35 0%, #12141A 100%)",
                      border: "1px solid #090B0F",
                      borderTop: "1px solid rgba(255,255,255,0.25)",
                      color: "#E2BA70",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      opacity: currentIndex === 0 ? 0.25 : 0.95,
                      zIndex: 110,
                      boxShadow: "0 6px 16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)",
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
                      background: "linear-gradient(180deg, #272B35 0%, #12141A 100%)",
                      border: "1px solid #090B0F",
                      borderTop: "1px solid rgba(255,255,255,0.25)",
                      color: "#E2BA70",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      opacity: currentIndex === PHOTOS.length - 1 ? 0.25 : 0.95,
                      zIndex: 110,
                      boxShadow: "0 6px 16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>

                <div
                  style={{
                    width: "100%",
                    background: "linear-gradient(180deg, #0B0C0E 0%, #18191D 100%)",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                    borderRadius: "0 0 8px 8px",
                    border: "1px solid #060709",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.8)",
                  }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: "7.5px", color: "#F59E0B", opacity: 0.65, letterSpacing: "0.15em" }}>
                    FRAME 01-05
                  </span>
                  <div style={{ display: "flex", gap: m ? "8px" : "16px", alignItems: "center" }}>
                    {Array.from({ length: m ? 14 : 26 }).map((_, i) => (
                      <SprocketHole key={i} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "7.5px", color: "#F59E0B", opacity: 0.65, letterSpacing: "0.15em" }}>
                    MADE IN SPAIN
                  </span>
                </div>

                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "#71717A",
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
