import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

/* ──────────────────────────────────────────────────────────────
   Material 3 Expressive — Paleta limpa e refinada
   ────────────────────────────────────────────────────────────── */
const M3 = {
  surface:   "#FAF8FD",
  surfaceCard: "#FFFFFF",
  primary:   "#6750A4",
  onPrimary: "#FFFFFF",
  primaryC:  "#EADDFF",
  onSurface: "#1C1B1F",
  onSurfVar: "#49454E",
  pinkC:     "#FFD8E4",
  limeC:     "#E2F6B8",
  blueC:     "#D3E3FD",
  peachC:    "#FFDBCB",
};

const FONT = "'DM Sans', 'Google Sans', system-ui, sans-serif";
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

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

/* Indicador de progreso ondulado */
function WavyProgress({ width = 200 }: { width?: number }) {
  const wl = 20, amp = 3, h = 14, mid = h / 2;
  const wave = useMemo(() => {
    let d = "";
    for (let x = -wl * 2; x <= width + wl * 2; x += 2) {
      const y = mid + Math.sin((x / wl) * Math.PI * 2) * amp;
      d += `${d ? "L" : "M"}${x} ${y.toFixed(2)} `;
    }
    return d;
  }, [width]);
  const clipId = useMemo(() => "wave-clip-" + Math.random().toString(36).slice(2, 7), []);

  return (
    <svg width={width} height={h} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <clipPath id={clipId}>
          <motion.rect x={0} y={-4} height={h + 8} initial={{ width: 0 }} animate={{ width }} transition={{ duration: 1.8, ease: "easeOut" }} />
        </clipPath>
      </defs>
      <line x1={0} x2={width} y1={mid} y2={mid} stroke={M3.primaryC} strokeWidth={3.5} strokeLinecap="round" />
      <g clipPath={`url(#${clipId})`}>
        <motion.path d={wave} fill="none" stroke={M3.primary} strokeWidth={3.5} strokeLinecap="round"
          animate={{ x: [0, -wl] }} transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }} />
      </g>
    </svg>
  );
}

/* Glifo NFC con animación suave */
function NfcGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={38} height={38} fill="none" stroke={M3.primary} strokeWidth={2.4} strokeLinecap="round">
      {["M7 8.5a5 5 0 0 1 0 7", "M10.5 6a8.5 8.5 0 0 1 0 12", "M14 3.5a12 12 0 0 1 0 17"].map((d, i) => (
        <motion.path key={i} d={d} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }} />
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
        setTimeout(open, 800);
      }
    } catch {}

    (async () => {
      try {
        const { default: Nfc } = await import("@/plugins/NfcSharePlugin");
        const avail = await Nfc.isAvailable();
        if (!alive) return;
        if (!avail.available || !avail.enabled) {
          if (avail.available && !avail.enabled) {
            toast("Activa o NFC en Axustes para compartir personaxes");
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

  // Transición suave de conexión a libro
  useEffect(() => {
    if (!visible || phase !== "connect") return;
    const t = setTimeout(async () => {
      try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
      setPhase("book");
    }, 2000);
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

      {/* Overlay principal con saída suave e natural */}
      <AnimatePresence onExitComplete={() => { setPhase("connect"); setChar(null); }}>
        {visible && char && (
          <motion.div
            key="nfc-modal-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(22, 20, 26, 0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              fontFamily: FONT,
              overflowY: "auto",
            }}
          >
            {/* Tarxeta contedor con animación suave */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: EASE_SMOOTH }}
              onClick={e => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 410,
                maxHeight: "92vh",
                overflowY: "auto",
                background: M3.surface,
                borderRadius: 32,
                boxShadow: "0 24px 60px rgba(0,0,0,0.32)",
                padding: "20px 22px 24px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                scrollbarWidth: "none",
              }}
            >
              {/* Barra superior da tarxeta */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px 5px 6px", borderRadius: 9999, background: M3.primaryC }}>
                  <img src="/assets/images/logo-fb.webp" alt="" style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: M3.onSurface }}>Faneca Brava</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={close}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0,0,0,0.06)",
                    color: M3.onSurface,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* FASE 1: Conexión NFC */}
              {phase === "connect" && (
                <motion.div
                  key="phase-connect"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "16px 8px 12px", gap: 16 }}
                >
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      background: M3.primaryC,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {[1, 2].map(i => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: 1.6 + i * 0.4, opacity: 0 }}
                        transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: `2px solid ${M3.primary}`,
                        }}
                      />
                    ))}
                    <NfcGlyph />
                  </div>

                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: M3.primary, marginBottom: 4 }}>
                      Sincronización NFC
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: M3.onSurface, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                      Mantén os teléfonos xuntos
                    </h3>
                    <p style={{ fontSize: 13, color: M3.onSurfVar, margin: 0 }}>
                      Compartindo contidos de Faneca Brava...
                    </p>
                  </div>

                  <WavyProgress width={200} />
                </motion.div>
              )}

              {/* FASE 2: Libro recibido */}
              {phase === "book" && (
                <motion.div
                  key="phase-book"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE_SMOOTH }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}
                >
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: M3.primary, marginBottom: 3 }}>
                      Conexión completada
                    </div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: M3.onSurface, margin: "0 0 2px", letterSpacing: "-0.02em" }}>
                      Faneca Brava
                    </h3>
                    <p style={{ fontSize: 13, color: M3.onSurfVar, margin: 0 }}>
                      Recibiches un personaxe da novela
                    </p>
                  </div>

                  {/* Portada do libro con botón */}
                  <div style={{ position: "relative", cursor: "pointer" }} onClick={reveal}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: 170,
                        height: 250,
                        borderRadius: 20,
                        overflow: "hidden",
                        boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                        border: "2px solid rgba(255,255,255,0.8)",
                      }}
                    >
                      <img src={BOOK_COVER} alt="Faneca Brava" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </motion.div>

                    {/* Chips flotantes limpos sen erros de texto */}
                    <div
                      style={{
                        position: "absolute",
                        top: -8,
                        left: -18,
                        background: M3.limeC,
                        color: "#1E3A0E",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: 9999,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                      }}
                    >
                      Manuel Portas
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: 40,
                        right: -24,
                        background: M3.pinkC,
                        color: "#5E1133",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: 9999,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                      }}
                    >
                      Editorial Galaxia
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: -10,
                        left: -12,
                        background: M3.blueC,
                        color: "#0A2F6B",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: 9999,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                      }}
                    >
                      Galego · 244 páxinas
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={reveal}
                    style={{
                      marginTop: 10,
                      width: "100%",
                      padding: "14px 20px",
                      borderRadius: 9999,
                      border: "none",
                      background: M3.primary,
                      color: M3.onPrimary,
                      fontFamily: FONT,
                      fontSize: 15,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(103,80,164,0.3)",
                    }}
                  >
                    <span>Revelar personaxe</span>
                    <ArrowRight size={17} />
                  </motion.button>
                </motion.div>
              )}

              {/* FASE 3: Personaxe revelado — Presentación limpa, suave e sen parpadeos */}
              {phase === "char" && (
                <motion.div
                  key="phase-char"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {/* Foto do personaxe */}
                  <div
                    style={{
                      width: "100%",
                      height: 190,
                      borderRadius: 22,
                      overflow: "hidden",
                      position: "relative",
                      background: char.tone.c,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    }}
                  >
                    <img
                      src={char.img}
                      alt={char.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 22%", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 12,
                        padding: "5px 12px",
                        borderRadius: 9999,
                        background: char.tone.c,
                        color: char.tone.on,
                        fontSize: 11.5,
                        fontWeight: 700,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      {char.role}
                    </div>
                  </div>

                  {/* Nome e alcume */}
                  <div>
                    <h3 style={{ margin: "0 0 2px", fontSize: 24, fontWeight: 800, color: M3.onSurface, letterSpacing: "-0.02em" }}>
                      {char.name}
                    </h3>
                    <div style={{ fontSize: 14, fontWeight: 700, color: char.tone.accent }}>
                      {char.alias}
                    </div>
                  </div>

                  {/* Descrición sen fallos de texto */}
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: M3.onSurfVar }}>
                    {char.desc}
                  </p>

                  {/* Trazos de personalidade */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {char.traits.map(trait => (
                      <span
                        key={trait}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 9999,
                          background: char.tone.c,
                          color: char.tone.on,
                          fontSize: 11.5,
                          fontWeight: 700,
                        }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* Cita */}
                  <div
                    style={{
                      background: "rgba(0,0,0,0.03)",
                      borderLeft: `3px solid ${char.tone.accent}`,
                      borderRadius: "0 14px 14px 0",
                      padding: "10px 14px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 13, fontStyle: "italic", lineHeight: 1.55, color: M3.onSurface }}>
                      "{char.quote}"
                    </p>
                  </div>

                  {/* Botón de pechar suave */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={close}
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: 9999,
                      border: "none",
                      background: M3.primaryC,
                      color: M3.primary,
                      fontFamily: FONT,
                      fontSize: 14.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginTop: 4,
                    }}
                  >
                    Pechar
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
