import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

/* ──────────────────────────────────────────────────────────────
   Material 3 Expressive — Paleta clara e refinada
   ────────────────────────────────────────────────────────────── */
const M3 = {
  surface:   "#FAF8FD",
  surfaceC:  "#F3EDF7",
  primary:   "#6750A4",
  onPrimary: "#FFFFFF",
  primaryC:  "#EADDFF",
  onSurface: "#1D1B20",
  onSurfVar: "#49454E",
  pinkC:     "#FFD8E4",
  limeC:     "#D7F0B0",
  blueC:     "#D3E3FD",
  peachC:    "#FFDBCB",
};

const FONT = "'DM Sans', 'Google Sans', system-ui, sans-serif";
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
const EASE_EMPH = [0.2, 0, 0, 1] as const;
const SPRING_CARD = { type: "spring" as const, stiffness: 180, damping: 22, mass: 0.9 };

const BOOK_COVER = "/manus-storage/NEjJma6w5Oln_b68f9430.jpg";

type Tone = { c: string; on: string; accent: string };
const CHARS: { id: string; name: string; alias: string; role: string; img: string; traits: string[]; quote: string; desc: string; tone: Tone }[] = [
  {
    id: "concha",
    name: "Concha Pereira",
    alias: "A Faneca Brava",
    role: "Protagonista",
    img: "/assets/images/concha-portrait.webp",
    traits: ["Feroz", "Rebelde", "Libre", "Xusticeira"],
    quote: "Cando miro pola lente, deixo de ser a nena que collían. Por fin, son eu a que observa.",
    desc: "Foxe a Barcelona onde se converte en paparazzi de éxito, usando a cámara como arma de vinganza contra os poderosos.",
    tone: { c: M3.pinkC, on: "#5E1133", accent: "#984061" }
  },
  {
    id: "fernando",
    name: "Fernando Pereira",
    alias: "O Médico Atormentado",
    role: "Narrador",
    img: "/assets/images/fernando-portrait.webp",
    traits: ["Atormentado", "Obsesivo", "Culpable", "Determinado"],
    quote: "Non podo durmir porque os ollos de Concha perséguenme cando pecho os meus.",
    desc: "Médico de Santiago que sofre de insomnio severo. Obsesionado con descubrir a verdade sobre a súa curmá Concha.",
    tone: { c: M3.blueC, on: "#0A2F6B", accent: "#0B57D0" }
  },
  {
    id: "mama",
    name: "Mamá Carme",
    alias: "A Matriarca",
    role: "Antagonista",
    img: "/assets/images/carme-portrait.webp",
    traits: ["Despótica", "Hipócrita", "Fría", "Autoritaria"],
    quote: "O apelido é o que nos sustenta. Un nome limpo vale máis ca todo o ouro.",
    desc: "Matriarca que prioriza as aparencias sociais por riba do amor. Oculta monstros reais.",
    tone: { c: M3.peachC, on: "#542600", accent: "#8B5000" }
  },
  {
    id: "andreu",
    name: "Andreu Picart",
    alias: "O Fotógrafo Catalán",
    role: "Confidente",
    img: "/assets/images/andreu-portrait.webp",
    traits: ["Observador", "Sabio", "Melancólico", "Leal"],
    quote: "Concha non fotografaba para vivir. Fotografaba para vingarse.",
    desc: "Fotógrafo catalán que coñeceu a Concha en Barcelona. A ponte entre o pasado e o presente.",
    tone: { c: M3.limeC, on: "#1E3A0E", accent: "#3B6923" }
  },
  {
    id: "encarna",
    name: "Encarna Pereira",
    alias: "A Supervivente",
    role: "Contrapunto",
    img: "/manus-storage/encarna-portrait.jpg",
    traits: ["Calada", "Resignada", "Resiliente", "Sombra"],
    quote: "Eu quedei. Alguén tiña que quedar para que a casa non se derrubara.",
    desc: "Irmá de Concha. Mentres Concha foxe, Encarna resiste dende dentro coa submisión calculada.",
    tone: { c: M3.primaryC, on: "#2E2163", accent: "#6750A4" }
  },
];

type Phase = "connect" | "book" | "char";

/* Formas orgánicas morfolóxicas de fondo */
function shape(n: number, amp: number, R = 100, pts = 120) {
  let d = "";
  for (let i = 0; i < pts; i++) {
    const t = (i / pts) * Math.PI * 2;
    const r = (R * (1 + amp * Math.cos(n * t))) / (1 + amp);
    const x = 100 + r * Math.cos(t);
    const y = 100 + r * Math.sin(t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + "Z";
}

const SHAPES = {
  cookie12: shape(12, 0.06),
  flower8:  shape(8, 0.10),
  clover4:  shape(4, 0.13),
  soft5:    shape(5, 0.08),
  circle:   shape(1, 0),
};

function MorphShape({ size, color }: { size: number; color: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <motion.path
          fill={color}
          initial={{ d: SHAPES.circle }}
          animate={{ d: [SHAPES.cookie12, SHAPES.flower8, SHAPES.soft5, SHAPES.clover4, SHAPES.cookie12] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

/* Indicador de progreso ondulado */
function WavyProgress({ width = 220 }: { width?: number }) {
  const wl = 20, amp = 3.2, h = 16, mid = h / 2;
  const wave = useMemo(() => {
    let d = "";
    for (let x = -wl * 2; x <= width + wl * 2; x += 2) {
      const y = mid + Math.sin((x / wl) * Math.PI * 2) * amp;
      d += `${d ? "L" : "M"}${x} ${y.toFixed(2)} `;
    }
    return d;
  }, [width]);
  const clipId = useMemo(() => "wave-clip-" + Math.random().toString(36).slice(2, 8), []);

  return (
    <svg width={width} height={h} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <clipPath id={clipId}>
          <motion.rect x={0} y={-4} height={h + 8} initial={{ width: 0 }} animate={{ width }} transition={{ duration: 2, ease: "easeInOut" }} />
        </clipPath>
      </defs>
      <line x1={0} x2={width} y1={mid} y2={mid} stroke={M3.primaryC} strokeWidth={4} strokeLinecap="round" />
      <g clipPath={`url(#${clipId})`}>
        <motion.path d={wave} fill="none" stroke={M3.primary} strokeWidth={4} strokeLinecap="round"
          animate={{ x: [0, -wl] }} transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }} />
      </g>
    </svg>
  );
}

/* Glifo de conexión máxica */
function MagicTouchGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={42} height={42} fill="none" stroke={M3.onPrimary} strokeWidth={2.2} strokeLinecap="round">
      {["M7 8.5a5 5 0 0 1 0 7", "M10.5 6a8.5 8.5 0 0 1 0 12", "M14 3.5a12 12 0 0 1 0 17"].map((d, i) => (
        <motion.path key={i} d={d} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.4, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </svg>
  );
}

export default function NfcShareOverlay() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("connect");
  const [char, setChar] = useState<typeof CHARS[0] | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const listenerRef = useRef<{ remove: () => void } | null>(null);

  const open = () => {
    setChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
    setPhase("connect");
    setVisible(true);
  };

  useEffect(() => {
    let alive = true;
    try {
      if (new URLSearchParams(window.location.search).get("nfc") === "1") {
        setTimeout(open, 600);
      }
    } catch {}

    (async () => {
      try {
        const { default: Nfc } = await import("@/plugins/NfcSharePlugin");
        const avail = await Nfc.isAvailable();
        if (!alive) return;
        if (!avail.available || !avail.enabled) {
          if (avail.available && !avail.enabled) {
            toast("Activa o sensor en Axustes para compartir contidos");
          }
          return;
        }
        await Nfc.startListening();
        const sub = await Nfc.addListener("nfcDetected", async () => {
          if (!alive) return;
          try { await Haptics.impact({ style: ImpactStyle.Heavy }); } catch {}
          open();
        });
        listenerRef.current = sub;
      } catch {}
    })();

    return () => {
      alive = false;
      listenerRef.current?.remove();
      import("@/plugins/NfcSharePlugin").then(m => m.default.stopListening()).catch(() => {});
    };
  }, []);

  function toast(msg: string) {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }

  // Transición suave da conexión á revelación do libro
  useEffect(() => {
    if (!visible || phase !== "connect") return;
    const t = setTimeout(async () => {
      try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
      setPhase("book");
    }, 2200);
    return () => clearTimeout(t);
  }, [visible, phase]);

  const reveal = async () => {
    try { await Haptics.impact({ style: ImpactStyle.Medium }); } catch {}
    setPhase("char");
  };

  const close = () => {
    setVisible(false);
  };

  return createPortal(
    <>
      {/* Toast informativo */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              bottom: 84,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 99998,
              background: "#313033",
              color: "#F4EFF4",
              borderRadius: 14,
              padding: "12px 18px",
              fontFamily: FONT,
              fontSize: 13.5,
              maxWidth: "88vw",
              boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
            }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pantalla completa inmersiva con peche suave */}
      <AnimatePresence onExitComplete={() => { setPhase("connect"); setChar(null); }}>
        {visible && char && (
          <motion.div
            key="full-screen-container"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.45, ease: EASE_SMOOTH }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: M3.surface,
              overflowY: "auto",
              overflowX: "hidden",
              fontFamily: FONT,
            }}
          >
            {/* Luces de fondo ambientais */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
              <motion.div
                animate={{ x: [0, 24, 0], y: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: 380,
                  height: 380,
                  left: -120,
                  top: -100,
                  borderRadius: "50%",
                  background: M3.primaryC,
                  filter: "blur(65px)",
                  opacity: 0.85,
                }}
              />
              <motion.div
                animate={{ x: [0, -20, 0], y: [0, -24, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: 340,
                  height: 340,
                  right: -100,
                  bottom: -80,
                  borderRadius: "50%",
                  background: M3.pinkC,
                  filter: "blur(70px)",
                  opacity: 0.8,
                }}
              />
            </div>

            {/* Barra superior con peche */}
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                background: "linear-gradient(to bottom, rgba(250,248,253,0.92) 0%, rgba(250,248,253,0.4) 100%)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px 6px 8px",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.85)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                <img src="/assets/images/logo-fb.webp" alt="Logo" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: M3.onSurface }}>Faneca Brava</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={close}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "none",
                  background: M3.primaryC,
                  color: M3.onSurface,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(103,80,164,0.18)",
                }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Contido Principal */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                minHeight: "calc(100% - 80px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 20px 40px",
              }}
            >
              {/* FASE 1: Conexión Literaria */}
              {phase === "connect" && (
                <motion.div
                  key="phase-connect"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    maxWidth: 380,
                    width: "100%",
                    gap: 22,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 140,
                      height: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MorphShape size={200} color={M3.primaryC} />

                    {[0, 1].map(i => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.6, opacity: 0.6 }}
                        animate={{ scale: 1.8 + i * 0.4, opacity: 0 }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          inset: 16,
                          borderRadius: "50%",
                          border: `2px solid ${M3.primary}`,
                        }}
                      />
                    ))}

                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: M3.primary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 28px rgba(103,80,164,0.35)",
                        position: "relative",
                        zIndex: 3,
                      }}
                    >
                      <MagicTouchGlyph />
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: M3.primary, marginBottom: 6 }}>
                      ✦ Transmisión Literaria ✦
                    </div>
                    <h2 style={{ fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 800, color: M3.onSurface, letterSpacing: "-0.03em", margin: "0 0 8px", lineHeight: 1.15 }}>
                      Mantén os teléfonos xuntos
                    </h2>
                    <p style={{ fontSize: 14, color: M3.onSurfVar, margin: 0, lineHeight: 1.5 }}>
                      Sintonizando memorias de Faneca Brava...
                    </p>
                  </div>

                  <WavyProgress width={220} />
                </motion.div>
              )}

              {/* FASE 2: Libro Recibido con Portada */}
              {phase === "book" && (
                <motion.div
                  key="phase-book"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: EASE_SMOOTH }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    maxWidth: 400,
                    width: "100%",
                    gap: 20,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: M3.primary, marginBottom: 4 }}>
                      Transmisión completada
                    </div>
                    <h2 style={{ fontSize: "clamp(26px, 7vw, 34px)", fontWeight: 800, color: M3.onSurface, letterSpacing: "-0.03em", margin: "0 0 4px", lineHeight: 1.1 }}>
                      Faneca Brava
                    </h2>
                    <p style={{ fontSize: 14, color: M3.onSurfVar, margin: 0 }}>
                      Recibiches un personaxe da novela
                    </p>
                  </div>

                  {/* Portada Flotante con Chips */}
                  <div
                    style={{ position: "relative", cursor: "pointer", margin: "14px 0 10px" }}
                    onClick={reveal}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: -1 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
                      style={{
                        width: 180,
                        height: 265,
                        borderRadius: 24,
                        overflow: "hidden",
                        boxShadow: "0 22px 50px rgba(0,0,0,0.22)",
                        border: "3px solid rgba(255,255,255,0.9)",
                      }}
                    >
                      <img src={BOOK_COVER} alt="Faneca Brava" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </motion.div>

                    {/* Chips Flotantes Informativos */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      style={{
                        position: "absolute",
                        top: 10,
                        left: -24,
                        background: M3.limeC,
                        color: "#1E3A0E",
                        fontSize: 11.5,
                        fontWeight: 700,
                        padding: "6px 14px",
                        borderRadius: 9999,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                      }}
                    >
                      Manuel Portas
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      style={{
                        position: "absolute",
                        top: 100,
                        right: -28,
                        background: M3.pinkC,
                        color: "#5E1133",
                        fontSize: 11.5,
                        fontWeight: 700,
                        padding: "6px 14px",
                        borderRadius: 9999,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                      }}
                    >
                      Editorial Galaxia
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      style={{
                        position: "absolute",
                        bottom: -12,
                        left: -16,
                        background: M3.blueC,
                        color: "#0A2F6B",
                        fontSize: 11.5,
                        fontWeight: 700,
                        padding: "6px 14px",
                        borderRadius: 9999,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                      }}
                    >
                      Galego · 244 páxinas
                    </motion.div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%", maxWidth: 300 }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={reveal}
                      style={{
                        width: "100%",
                        padding: "16px 26px",
                        borderRadius: 9999,
                        border: "none",
                        background: M3.primary,
                        color: M3.onPrimary,
                        fontFamily: FONT,
                        fontSize: 16,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        cursor: "pointer",
                        boxShadow: "0 8px 24px rgba(103,80,164,0.32)",
                      }}
                    >
                      <span>Revelar personaxe</span>
                      <ArrowRight size={18} />
                    </motion.button>
                    <span style={{ fontSize: 12.5, color: M3.onSurfVar }}>Ou toca na portada do libro</span>
                  </div>
                </motion.div>
              )}

              {/* FASE 3: Personaxe Revelado — Despregue Suave a Pantalla Completa */}
              {phase === "char" && (
                <motion.div
                  key="phase-char"
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: EASE_SMOOTH }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: 420,
                    width: "100%",
                    gap: 16,
                  }}
                >
                  {/* Imaxe Superior do Personaxe */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: EASE_SMOOTH }}
                    style={{
                      width: "100%",
                      height: 230,
                      borderRadius: 28,
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 14px 36px rgba(0,0,0,0.16)",
                      border: "3px solid #FFFFFF",
                    }}
                  >
                    <img
                      src={char.img}
                      alt={char.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 22%",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 14,
                        padding: "6px 14px",
                        borderRadius: 9999,
                        background: char.tone.c,
                        color: char.tone.on,
                        fontSize: 12,
                        fontWeight: 700,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.14)",
                      }}
                    >
                      {char.role}
                    </div>
                  </motion.div>

                  {/* Tarxeta de Contido que se Desprega */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: EASE_SMOOTH }}
                    style={{
                      width: "100%",
                      background: "#FFFFFF",
                      borderRadius: 28,
                      padding: "22px 22px 20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    <div>
                      <h2 style={{ margin: "0 0 2px", fontSize: 26, fontWeight: 800, color: M3.onSurface, letterSpacing: "-0.03em" }}>
                        {char.name}
                      </h2>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: char.tone.accent }}>
                        {char.alias}
                      </div>
                    </div>

                    {/* Divisor Onda */}
                    <div style={{ height: 2, background: `linear-gradient(90deg, ${char.tone.c}, transparent)` }} />

                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: M3.onSurfVar }}>
                      {char.desc}
                    </p>

                    {/* Trazos de personalidade */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {char.traits.map(trait => (
                        <span
                          key={trait}
                          style={{
                            padding: "6px 13px",
                            borderRadius: 9999,
                            background: char.tone.c,
                            color: char.tone.on,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    {/* Cita textual */}
                    <div
                      style={{
                        background: "rgba(0,0,0,0.025)",
                        borderLeft: `3px solid ${char.tone.accent}`,
                        borderRadius: "0 14px 14px 0",
                        padding: "12px 16px",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 13.5, fontStyle: "italic", lineHeight: 1.6, color: M3.onSurface }}>
                        "{char.quote}"
                      </p>
                    </div>

                    {/* Botón de Pechar */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={close}
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: 9999,
                        border: "none",
                        background: M3.primaryC,
                        color: M3.primary,
                        fontFamily: FONT,
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        marginTop: 4,
                      }}
                    >
                      Pechar
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
