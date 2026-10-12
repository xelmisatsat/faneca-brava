import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Star, Quote, Sparkles, Camera } from "lucide-react";

const isCapacitor = () => typeof window !== "undefined" && !!(window as any).Capacitor;

/* ── DATOS DOS MEMBROS DO EQUIPO E COLABORADORES ───────────────── */
const MEMBERS = [
  {
    id: "jun",
    name: "Jun Sieira Gerpe",
    role: "Deseñador gráfico, Dev web e Arquitecto técnico",
    badge: "Código & Deseño",
    img: "/manus-storage/collaborator-jun.jpg",
    blockColor: "#064E3B", // Verde Bosque Atlántico sólido
    accentColor: "#6EE7B7", // Esmeralda pastel
    badgeBg: "#022C22",
    rating: 5,
    opinion:
      "O libro gustoume máis do que esperaba. Cando o comecei pensaba que ía ser outra historia máis da posguerra, pero o tema da familia Pereira engancha bastante. O que máis me chamou a atención é o mala e hipócrita que chega a ser a avoa Carme só para salvar as aparencias. O personaxe de Concha está moi ben construído: no canto de afundirse cando a botan da casa, marcha a Barcelona e búscase a vida usando os segredos dos ricos ao seu favor. Tamén me pareceu clave o contraste coa súa irmá Encarna. En xeral, é unha novela que che fai ver como antes as familias tapaban calquera cousa polo que dirán.",
  },
  {
    id: "alvaro",
    name: "Álvaro Villar Gómez",
    role: "Desenvolvemento web, Voces e Arquitectura técnica",
    badge: "Narrativa & Voces",
    img: "/manus-storage/collaborator-alvaro.jpg",
    blockColor: "#B45309", // Ámbar Terracota sólido
    accentColor: "#FDE68A", // Amarelo solpor
    badgeBg: "#451A03",
    rating: 5,
    opinion:
      "A min o que máis me gustou do libro foi o fácil que se le. A historia empeza co problema do médico que non dá durmido, e ao principio non sabes moi ben por que, pero en canto empezan a investigar o pasado, a trama avanza soa. Dá moita rabia ler o que pasaba na escola con dona Remedios e o inxustos que foron con Concha na súa propia casa. Pero por iso mesmo o final é tan bo, cando descobres que a nena á que botaron rematou convertida nunha fotógrafa de éxito en Barcelona. É moi entretido e a intriga mantense ata a última páxina.",
  },
  {
    id: "martina",
    name: "Martina Gontá Martínez",
    role: "Colaboradora e Promotora (Videocrítica)",
    badge: "Videocrítica",
    img: "/manus-storage/collaborator-martina.png",
    blockColor: "#581C87", // Púrpura Imperial sólido
    accentColor: "#E9D5FF",
    badgeBg: "#2E1065",
    contribution: "Creación da videoanálise crítica do libro Faneca Brava, debullando o segredo da trama e a simboloxía do desterro.",
  },
  {
    id: "emma",
    name: "Emma Tabuyo Rodríguez",
    role: "Colaboradora e Promotora (Documental)",
    badge: "Documental",
    img: "/manus-storage/collaborator-emma.png",
    blockColor: "#1E3A8A", // Azul Cobalto Profundo sólido
    accentColor: "#93C5FD",
    badgeBg: "#172554",
    contribution: "Elaboración do documental audiovisual sobre a memoria histórica e o contexto social da novela.",
  },
  {
    id: "olga",
    name: "María Olga Rosario Iglesias de la Fuente",
    role: "Titora do Proxecto e Mestra de Galego",
    badge: "Titoría & Lingua",
    img: "/manus-storage/collaborator-olga.png",
    blockColor: "#831843", // Vermello Granate sólido
    accentColor: "#FBCFE8",
    badgeBg: "#500724",
    contribution: "Guía didáctica, supervisión lingüística do galego e asesoramento no marco literario da obra.",
  },
];

/* ── REPRODUTOR DE VÍDEO EN BLOQUE DE COR SÓLIDA ────────────────── */
function ColorBlockVideo({
  src,
  title,
  subtitle,
  blockBg,
  accentColor,
  isMobile,
}: {
  src: string;
  title: string;
  subtitle: string;
  blockBg: string;
  accentColor: string;
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
        backgroundColor: blockBg,
        borderRadius: "18px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 14px 34px -8px rgba(0,0,0,0.5)",
      }}
    >
      {/* Marco de vídeo */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#05070D" }}>
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
              whileTap={{ scale: 0.94 }}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: accentColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 24px ${accentColor}66`,
                paddingLeft: "3px",
              }}
            >
              <Play size={22} color="#0A0E1A" fill="#0A0E1A" />
            </motion.div>
          </div>
        )}

        {/* Controis de vídeo en barra plana de alto contraste */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)",
            padding: "8px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
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
              accentColor: accentColor,
              height: "3px",
              borderRadius: "2px",
              cursor: "pointer",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={toggle}
                style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", padding: 0 }}
              >
                {playing ? <Pause size={15} /> : <Play size={15} fill="#FFFFFF" />}
              </button>
              <button
                onClick={toggleMute}
                style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", padding: 0 }}
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
            <button
              onClick={() => ref.current?.requestFullscreen?.()}
              style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", padding: 0 }}
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Bloque sólido descritivo */}
      <div style={{ padding: isMobile ? "1rem 1.15rem" : "1.25rem 1.5rem" }}>
        <h4
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? "1.05rem" : "1.2rem",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            margin: "0 0 4px",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.84rem",
            lineHeight: 1.5,
            color: "rgba(255, 255, 255, 0.88)",
            margin: 0,
            fontWeight: 400,
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
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof MEMBERS)[0] | null>(null);

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
      setGalleryOpen((prev) => !prev);
    }, 280);
  };

  const video1Src = isCapacitor() ? "assets/images/nos-video.mp4" : "/manus-storage/nos-video.mp4";
  const video2Src = isCapacitor() ? "assets/images/nos-video-2.mp4" : "/manus-storage/nos-video-2.mp4";
  const stickerSrc = isCapacitor() ? "assets/images/camera-sticker.png" : "/manus-storage/camera-sticker.png";

  return (
    <>
      {/* LIGHTBOX MODAL */}
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
                  background: "rgba(6, 9, 15, 0.96)",
                  zIndex: 999999,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: m ? "1.5rem" : "3rem",
                  boxSizing: "border-box",
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "relative",
                    width: m ? "92vw" : "auto",
                    maxWidth: "540px",
                    backgroundColor: selectedPhoto.blockColor,
                    borderRadius: "22px",
                    overflow: "hidden",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                  }}
                >
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      background: "rgba(0,0,0,0.6)",
                      border: "none",
                      borderRadius: "50%",
                      width: "34px",
                      height: "34px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      zIndex: 10,
                    }}
                  >
                    <X size={18} />
                  </button>

                  <div style={{ maxHeight: "65vh", overflow: "hidden", background: "#000" }}>
                    <img
                      src={selectedPhoto.img}
                      alt={selectedPhoto.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "65vh",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>

                  <div style={{ padding: "1.25rem 1.5rem", color: "#FFFFFF" }}>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: selectedPhoto.accentColor,
                        marginBottom: "4px",
                      }}
                    >
                      {selectedPhoto.badge}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        margin: "0 0 6px",
                      }}
                    >
                      {selectedPhoto.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                        color: "rgba(255,255,255,0.85)",
                        margin: 0,
                      }}
                    >
                      {selectedPhoto.role}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* =========================================================================
          SECCIÓN DE NÓS: DESEÑO EN COLOR BLOCKING XEOMÉTRICO
          ========================================================================= */}
      <section
        id="nos"
        style={{
          position: "relative",
          padding: m ? "4.5rem 1rem 3.5rem" : "6.5rem 2rem 5.5rem",
          scrollMarginTop: "95px",
          backgroundColor: "#070A12", // Base escura que sostén os bloques
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10, width: "100%" }}>

          {/* =========================================================================
              1. BLOQUE HERO DE COR SÓLIDA: CABECEIRA DE NÓS (AZUL ATLÁNTICO SÓLIDO)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: "#0F1E36", // Azul Atlántico Sólido
              borderRadius: "24px",
              padding: m ? "2rem 1.5rem" : "3.5rem 3.5rem",
              marginBottom: m ? "1.5rem" : "2.5rem",
              display: "flex",
              flexDirection: m ? "column" : "row",
              alignItems: m ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: "2rem",
              boxShadow: "0 20px 50px -10px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              {/* Badge de alto contraste funcional */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#D97706", // Ámbar de alto contraste
                  color: "#0B1120",
                  padding: "5px 14px",
                  borderRadius: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                <Sparkles size={13} color="#0B1120" />
                <span>O Equipo & As Nosas Valoracións</span>
              </div>

              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: m ? "2.2rem" : "3.5rem",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  margin: "0 0 1rem",
                }}
              >
                NÓS, O EQUIPO CREATIVO
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: m ? "0.95rem" : "1.08rem",
                  lineHeight: 1.6,
                  color: "#CBD5E1",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                O grupo de traballo detrás da investigación, as voces literarias e a análise interactiva de{" "}
                <strong style={{ color: "#FDE68A" }}>Faneca Brava</strong>. Dúas perspectivas reais e un documental
                inmersivo.
              </p>
            </div>

            {/* Métrica / Bloque complementario de estatística */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                backgroundColor: "#091322",
                padding: "16px 20px",
                borderRadius: "16px",
              }}
            >
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.75rem", fontWeight: 800, color: "#38BDF8" }}>
                  5
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Creadores
                </div>
              </div>
              <div style={{ width: "1px", backgroundColor: "#1E293B", margin: "0 6px" }} />
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.75rem", fontWeight: 800, color: "#FBBF24" }}>
                  2
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Documentais
                </div>
              </div>
              <div style={{ width: "1px", backgroundColor: "#1E293B", margin: "0 6px" }} />
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.75rem", fontWeight: 800, color: "#34D399" }}>
                  5.0★
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Veredicto
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              2. BLOQUES DE VÍDEOS EN CONTRASTE FUNCIONAL (TERRACOTA VS COBALTO)
              ========================================================================= */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 1fr",
              gap: m ? "1.25rem" : "1.75rem",
              marginBottom: m ? "1.5rem" : "2.5rem",
            }}
          >
            {/* Bloque Martina: Terracota / Tellado Galego */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              <ColorBlockVideo
                src={video2Src}
                title="Videocrítica Literaria"
                subtitle="Martina Gontá Martínez analiza en detalle os conflitos, a culpa e a dignidade na novela."
                blockBg="#9A3412" // Terracota sólido saturado
                accentColor="#FDE047" // Amarelo solpor en contraste
                isMobile={m}
              />
            </motion.div>

            {/* Bloque Emma: Azul Mariño Atlántico */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25 }}
            >
              <ColorBlockVideo
                src={video1Src}
                title="Documental Audiovisual"
                subtitle="Emma Tabuyo Rodríguez achega o contexto histórico e as voces da memoria de Foz."
                blockBg="#0284C7" // Azul Atlántico sólido
                accentColor="#FEF08A" // Ouro suave
                isMobile={m}
              />
            </motion.div>
          </div>

          {/* =========================================================================
              3. AS NOSAS VALORACIÓNS: BLOQUES CONTRASTANTES DE JUN E ÁLVARO
              ========================================================================= */}
          <div style={{ marginBottom: m ? "1.5rem" : "2.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: m ? "1fr" : "1fr 1fr",
                gap: m ? "1.25rem" : "1.75rem",
              }}
            >
              {/* BLOQUE DE JUN: VERDE BOSQUE SÓLIDO (#064E3B) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  backgroundColor: "#064E3B", // Verde sólido
                  borderRadius: "20px",
                  padding: m ? "1.5rem" : "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 14px 34px -8px rgba(0,0,0,0.5)",
                }}
              >
                <div>
                  {/* Cabeceira do bloque de Jun */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div
                      style={{
                        backgroundColor: "#022C22",
                        color: "#6EE7B7",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Deseño & Código
                    </div>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} color="#FBBF24" fill="#FBBF24" />
                      ))}
                    </div>
                  </div>

                  {/* Cita de Valoración de Jun */}
                  <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                    <Quote
                      size={28}
                      color="#34D399"
                      style={{ opacity: 0.35, position: "absolute", top: "-8px", left: "-6px" }}
                    />
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: m ? "0.9rem" : "0.96rem",
                        lineHeight: 1.65,
                        color: "#ECFDF5",
                        margin: 0,
                        paddingLeft: "1.25rem",
                        fontWeight: 400,
                      }}
                    >
                      "{MEMBERS[0].opinion}"
                    </p>
                  </div>
                </div>

                {/* Perfil integrado con foto */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                    paddingTop: "14px",
                  }}
                >
                  <img
                    src={MEMBERS[0].img}
                    alt={MEMBERS[0].name}
                    onClick={() => setSelectedPhoto(MEMBERS[0])}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "2px solid #34D399",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      {MEMBERS[0].name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11.5px",
                        color: "#A7F3D0",
                        marginTop: "2px",
                      }}
                    >
                      {MEMBERS[0].role}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* BLOQUE DE ÁLVARO: ÁMBAR TERRAS DO SOLPOR (#B45309) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  backgroundColor: "#B45309", // Ámbar Terracota sólido
                  borderRadius: "20px",
                  padding: m ? "1.5rem" : "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 14px 34px -8px rgba(0,0,0,0.5)",
                }}
              >
                <div>
                  {/* Cabeceira do bloque de Álvaro */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div
                      style={{
                        backgroundColor: "#451A03",
                        color: "#FDE68A",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Voces & Narrativa
                    </div>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} color="#FEF08A" fill="#FEF08A" />
                      ))}
                    </div>
                  </div>

                  {/* Cita de Valoración de Álvaro */}
                  <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                    <Quote
                      size={28}
                      color="#FDE68A"
                      style={{ opacity: 0.4, position: "absolute", top: "-8px", left: "-6px" }}
                    />
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: m ? "0.9rem" : "0.96rem",
                        lineHeight: 1.65,
                        color: "#FFFBEB",
                        margin: 0,
                        paddingLeft: "1.25rem",
                        fontWeight: 400,
                      }}
                    >
                      "{MEMBERS[1].opinion}"
                    </p>
                  </div>
                </div>

                {/* Perfil integrado con foto */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    borderTop: "1px solid rgba(255,255,255,0.18)",
                    paddingTop: "14px",
                  }}
                >
                  <img
                    src={MEMBERS[1].img}
                    alt={MEMBERS[1].name}
                    onClick={() => setSelectedPhoto(MEMBERS[1])}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "2px solid #FDE68A",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      {MEMBERS[1].name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11.5px",
                        color: "#FEF3C7",
                        marginTop: "2px",
                      }}
                    >
                      {MEMBERS[1].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* =========================================================================
              4. TRIPLETE DE BLOQUES DE COLABORADORAS (PÚRPURA, COBALTO, GRANATE)
              ========================================================================= */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)",
              gap: m ? "1.25rem" : "1.5rem",
              marginBottom: m ? "1.5rem" : "2.5rem",
            }}
          >
            {/* Martina */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                backgroundColor: MEMBERS[2].blockColor,
                borderRadius: "18px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.4)",
              }}
            >
              <div>
                <div
                  style={{
                    backgroundColor: MEMBERS[2].badgeBg,
                    color: MEMBERS[2].accentColor,
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    display: "inline-block",
                    marginBottom: "12px",
                  }}
                >
                  {MEMBERS[2].badge}
                </div>
                <div style={{ textAlign: "center", margin: "10px 0" }}>
                  <img
                    src={MEMBERS[2].img}
                    alt={MEMBERS[2].name}
                    onClick={() => setSelectedPhoto(MEMBERS[2])}
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "16px",
                      objectFit: "cover",
                      margin: "0 auto",
                      display: "block",
                      cursor: "pointer",
                      border: "2px solid #E9D5FF",
                    }}
                  />
                </div>
                <h4
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.12rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    textAlign: "center",
                    margin: "8px 0 4px",
                  }}
                >
                  {MEMBERS[2].name}
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: MEMBERS[2].accentColor,
                    textAlign: "center",
                    margin: "0 0 12px",
                  }}
                >
                  {MEMBERS[2].role}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.85)",
                    margin: 0,
                  }}
                >
                  {MEMBERS[2].contribution}
                </p>
              </div>
            </motion.div>

            {/* Emma */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.42 }}
              style={{
                backgroundColor: MEMBERS[3].blockColor,
                borderRadius: "18px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.4)",
              }}
            >
              <div>
                <div
                  style={{
                    backgroundColor: MEMBERS[3].badgeBg,
                    color: MEMBERS[3].accentColor,
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    display: "inline-block",
                    marginBottom: "12px",
                  }}
                >
                  {MEMBERS[3].badge}
                </div>
                <div style={{ textAlign: "center", margin: "10px 0" }}>
                  <img
                    src={MEMBERS[3].img}
                    alt={MEMBERS[3].name}
                    onClick={() => setSelectedPhoto(MEMBERS[3])}
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "16px",
                      objectFit: "cover",
                      margin: "0 auto",
                      display: "block",
                      cursor: "pointer",
                      border: "2px solid #BAE6FD",
                    }}
                  />
                </div>
                <h4
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.12rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    textAlign: "center",
                    margin: "8px 0 4px",
                  }}
                >
                  {MEMBERS[3].name}
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: MEMBERS[3].accentColor,
                    textAlign: "center",
                    margin: "0 0 12px",
                  }}
                >
                  {MEMBERS[3].role}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.85)",
                    margin: 0,
                  }}
                >
                  {MEMBERS[3].contribution}
                </p>
              </div>
            </motion.div>

            {/* Olga */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.49 }}
              style={{
                backgroundColor: MEMBERS[4].blockColor,
                borderRadius: "18px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.4)",
              }}
            >
              <div>
                <div
                  style={{
                    backgroundColor: MEMBERS[4].badgeBg,
                    color: MEMBERS[4].accentColor,
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    display: "inline-block",
                    marginBottom: "12px",
                  }}
                >
                  {MEMBERS[4].badge}
                </div>
                <div style={{ textAlign: "center", margin: "10px 0" }}>
                  <img
                    src={MEMBERS[4].img}
                    alt={MEMBERS[4].name}
                    onClick={() => setSelectedPhoto(MEMBERS[4])}
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "16px",
                      objectFit: "cover",
                      margin: "0 auto",
                      display: "block",
                      cursor: "pointer",
                      border: "2px solid #FBCFE8",
                    }}
                  />
                </div>
                <h4
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.12rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    textAlign: "center",
                    margin: "8px 0 4px",
                  }}
                >
                  {MEMBERS[4].name}
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: MEMBERS[4].accentColor,
                    textAlign: "center",
                    margin: "0 0 12px",
                  }}
                >
                  {MEMBERS[4].role}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.85)",
                    margin: 0,
                  }}
                >
                  {MEMBERS[4].contribution}
                </p>
              </div>
            </motion.div>
          </div>

          {/* =========================================================================
              5. BLOQUE DE ACCIÓN INTERACTIVA: CÁMARA ANALÓXICA (OBSIDIANA & OURO)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              backgroundColor: "#0B0F19", // Carbón Obsidiana sólido
              borderRadius: "22px",
              padding: m ? "2rem 1.25rem" : "2.5rem 3rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 18px 45px -10px rgba(0,0,0,0.6)",
            }}
          >
            {/* Sticker da cámara analóxica con microinteracción táctil */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleCameraClick}
              style={{
                width: m ? "160px" : "190px",
                height: m ? "120px" : "145px",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              <img
                src={stickerSrc}
                alt="Cámara Analóxica"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: isTakingPhoto ? "scale(0.92) rotate(-3deg)" : "scale(1)",
                  transition: "transform 0.15s ease",
                  filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.7))",
                }}
              />
            </motion.div>

            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: m ? "1.35rem" : "1.6rem",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 6px",
              }}
            >
              Arquivo Fotográfico do Equipo
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: "#94A3B8",
                maxWidth: "420px",
                margin: "0 auto 1.25rem",
                lineHeight: 1.5,
              }}
            >
              Preme na cámara analóxica para {galleryOpen ? "ocultar" : "revelar"} todas as fotografías orixinais do equipo
              e colaboradores.
            </p>

            <button
              onClick={handleCameraClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#D97706",
                color: "#0B1120",
                border: "none",
                borderRadius: "12px",
                padding: "10px 22px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Camera size={16} />
              <span>{galleryOpen ? "Ocultar Fotografías" : "Revelar Fotografías"}</span>
            </button>

            {/* Galería revelada en bloques de cor */}
            <AnimatePresence>
              {galleryOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45 }}
                  style={{
                    width: "100%",
                    marginTop: "2rem",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
                      gap: "12px",
                    }}
                  >
                    {MEMBERS.map((mem) => (
                      <motion.div
                        key={mem.id}
                        whileHover={{ y: -4, scale: 1.02 }}
                        onClick={() => setSelectedPhoto(mem)}
                        style={{
                          backgroundColor: mem.blockColor,
                          borderRadius: "14px",
                          overflow: "hidden",
                          cursor: "pointer",
                          padding: "8px",
                          textAlign: "center",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                        }}
                      >
                        <div style={{ aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", marginBottom: "8px" }}>
                          <img
                            src={mem.img}
                            alt={mem.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {mem.name.split(" ")[0]}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "10px",
                            color: mem.accentColor,
                            marginTop: "2px",
                          }}
                        >
                          {mem.badge}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
