import { useEffect, useMemo, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ArrowRight } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Material 3 Expressive â€” paleta clara
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const M3 = {
  surface:   "#FEF7FF",
  surfaceC:  "#F3EDF7",
  primary:   "#6750A4",
  onPrimary: "#FFFFFF",
  primaryC:  "#E8DEF8",
  onSurface: "#1D1B20",
  onSurfVar: "#49454F",
  pinkC:     "#FFD8E4",
  limeC:     "#D7F0B0",
  blueC:     "#D3E3FD",
  peachC:    "#FFDBCB",
};
const FONT = "'DM Sans', 'Google Sans', system-ui, sans-serif";
const EASE_EMPH = [0.2, 0, 0, 1] as const;          // M3 emphasized
const SPRING = { type: "spring" as const, stiffness: 140, damping: 20, mass: 0.9 };

const BOOK_COVER = "manus-storage/NEjJma6w5Oln_b68f9430.jpg";

type Tone = { c: string; on: string; accent: string };
const CHARS: { id: string; name: string; alias: string; role: string; img: string; traits: string[]; quote: string; desc: string; tone: Tone }[] = [
  { id:"concha",   name:"Concha Pereira",   alias:"A Faneca Brava",       role:"Protagonista", img:"assets/images/concha-portrait.webp",   traits:["Feroz","Rebelde","Libre","Xusticeira"],            quote:"Cando miro pola lente, deixo de ser a nena que collÃ­an. Por fin, son eu a que observa.", desc:"Foxe a Barcelona onde se converte en paparazzi de Ã©xito, usando a cÃ¡mara como arma de vinganza contra os poderosos.", tone:{ c:M3.pinkC,  on:"#5E1133", accent:"#984061" } },
  { id:"fernando", name:"Fernando Pereira", alias:"O MÃ©dico Atormentado", role:"Narrador",     img:"assets/images/fernando-portrait.webp", traits:["Atormentado","Obsesivo","Culpable","Determinado"], quote:"Non podo durmir porque os ollos de Concha persÃ©guenme cando pecho os meus.",            desc:"MÃ©dico de Santiago que sofre de insomnio severo. Obsesionado con descubrir a verdade sobre a sÃºa curmÃ¡ Concha.", tone:{ c:M3.blueC,  on:"#0A2F6B", accent:"#0B57D0" } },
  { id:"mama",     name:"MamÃ¡ Carme",       alias:"A Matriarca",          role:"Antagonista",  img:"assets/images/carme-portrait.webp",    traits:["DespÃ³tica","HipÃ³crita","FrÃ­a","Autoritaria"],      quote:"O apelido Ã© o que nos sustenta. Un nome limpo vale mÃ¡is ca todo o ouro.",                desc:"Matriarca que prioriza as aparencias sociais por riba do amor. Oculta monstros reais.", tone:{ c:M3.peachC, on:"#542600", accent:"#8B5000" } },
  { id:"andreu",   name:"Andreu Picart",    alias:"O FotÃ³grafo CatalÃ¡n",  role:"Confidente",   img:"assets/images/andreu-portrait.webp",   traits:["Observador","Sabio","MelancÃ³lico","Leal"],         quote:"Concha non fotografaba para vivir. Fotografaba para vingarse.",                          desc:"FotÃ³grafo catalÃ¡n que coÃ±eceu a Concha en Barcelona. A ponte entre o pasado e o presente.", tone:{ c:M3.limeC,  on:"#1E3A0E", accent:"#3B6923" } },
  { id:"encarna",  name:"Encarna Pereira",  alias:"A Supervivente",       role:"Contrapunto",  img:"manus-storage/encarna-portrait.jpg",   traits:["Calada","Resignada","Resiliente","Sombra"],        quote:"Eu quedei. AlguÃ©n tiÃ±a que quedar para que a casa non se derrubara.",                    desc:"IrmÃ¡ de Concha. Mentres Concha foxe, Encarna resiste dende dentro coa submisiÃ³n calculada.", tone:{ c:M3.primaryC, on:"#2E2163", accent:"#6750A4" } },
];

type Phase = "connect" | "book" | "char";

/* â”€â”€ Formas M3 (morph): mesmo nÂº de puntos â†’ interpolables â”€â”€ */
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

function MorphShape({ size, color, phaseKey, speed = 14 }: { size: number; color: string; phaseKey: string; speed?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      style={{ width: size, height: size, position: "absolute", left: "50%", top: "50%", marginLeft: -size / 2, marginTop: -size / 2, pointerEvents: "none" }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <motion.path
          key={phaseKey}
          fill={color}
          initial={{ d: SHAPES.circle }}
          animate={{ d: [SHAPES.cookie12, SHAPES.flower8, SHAPES.soft5, SHAPES.clover4, SHAPES.cookie12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

/* â”€â”€ Indicador de progreso ondulado (M3 Expressive) â”€â”€ */
function WavyProgress({ width = 220, duration = 2 }: { width?: number; duration?: number }) {
  const wl = 22, amp = 3.2, h = 16, mid = h / 2;
  const wave = useMemo(() => {
    let d = "";
    for (let x = -wl * 2; x <= width + wl * 2; x += 2) {
      const y = mid + Math.sin((x / wl) * Math.PI * 2) * amp;
      d += `${d ? "L" : "M"}${x} ${y.toFixed(2)} `;
    }
    return d;
  }, [width]);
  const id = useMemo(() => "wp" + Math.random().toString(36).slice(2, 8), []);
  return (
    <svg width={width} height={h} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <clipPath id={id}>
          <motion.rect x={0} y={-4} height={h + 8} initial={{ width: 0 }} animate={{ width }} transition={{ duration, ease: [0.4, 0, 0.2, 1] }} />
        </clipPath>
      </defs>
      <line x1={0} x2={width} y1={mid} y2={mid} stroke={M3.primaryC} strokeWidth={4} strokeLinecap="round" />
      <circle cx={width} cy={mid} r={2.5} fill={M3.primary} />
      <g clipPath={`url(#${id})`}>
        <motion.path d={wave} fill="none" stroke={M3.primary} strokeWidth={4} strokeLinecap="round"
          animate={{ x: [0, -wl] }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />
      </g>
    </svg>
  );
}

/* â”€â”€ Glifo NFC â”€â”€ */
function NfcGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={40} height={40} fill="none" stroke={M3.onPrimary} strokeWidth={2.2} strokeLinecap="round">
      {["M7 8.5a5 5 0 0 1 0 7", "M10.5 6a8.5 8.5 0 0 1 0 12", "M14 3.5a12 12 0 0 1 0 17"].map((d, i) => (
        <motion.path key={i} d={d} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.4, delay: i * 0.18, repeat: Infinity }} />
      ))}
    </svg>
  );
}

function Chip({ children, bg, color, style, delay }: { children: ReactNode; bg: string; color: string; style: CSSProperties; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ opacity: { delay, duration: 0.3 }, scale: { ...SPRING, delay }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 } }}
      style={{ position: "absolute", zIndex: 4, padding: "8px 14px", borderRadius: 9999, background: bg, color, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", boxShadow: "0 6px 18px rgba(103,80,164,0.14)", ...style }}
    >
      {children}
    </motion.div>
  );
}

export default function NfcShareOverlay() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("connect");
  const [char, setChar] = useState<typeof CHARS[0] | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const listenerRef = useRef<{ remove: () => void } | null>(null);
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 400));

  useEffect(() => {
    const r = () => setVw(window.innerWidth);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  const open = () => {
    setChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
    setPhase("connect");
    setVisible(true);
  };

  useEffect(() => {
    let alive = true;
    // Vista previa en navegador: ?nfc=1
    try { if (new URLSearchParams(window.location.search).get("nfc") === "1") setTimeout(open, 800); } catch {}
    (async () => {
      try {
        const { default: Nfc } = await import("@/plugins/NfcSharePlugin");
        const avail = await Nfc.isAvailable();
        if (!alive) return;
        if (!avail.available || !avail.enabled) {
          if (avail.available && !avail.enabled) toast("Activa o NFC en Axustes para compartir personaxes");
          return;
        }
        await Nfc.startListening();
        const sub = await Nfc.addListener("nfcDetected", async () => {
          if (!alive) return;
          try { await Haptics.impact({ style: ImpactStyle.Heavy }); } catch {}
          open();
        });
        listenerRef.current = sub;
      } catch { /* silencioso en web */ }
    })();
    return () => {
      alive = false;
      listenerRef.current?.remove();
      import("@/plugins/NfcSharePlugin").then(m => m.default.stopListening()).catch(() => {});
    };
  }, []);

  function toast(msg: string) {
    setToastMsg(msg); setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }

  useEffect(() => {
    if (!visible || phase !== "connect") return;
    const t = setTimeout(async () => {
      try { await Haptics.impact({ style: ImpactStyle.Light }); } catch {}
      setPhase("book");
    }, 2300);
    return () => clearTimeout(t);
  }, [visible, phase]);

  const reveal = async () => {
    try { await Haptics.impact({ style: ImpactStyle.Medium }); } catch {}
    setPhase("char");
  };
  const close = () => setVisible(false);

  const W = Math.min(380, vw * 0.9);
  const hero =
    phase === "connect" ? { width: 112, height: 112, borderRadius: 56, background: M3.primary } :
    phase === "book"    ? { width: 186, height: 279, borderRadius: 28, background: M3.primaryC } :
                          { width: W,   height: 230, borderRadius: 32, background: char?.tone.c ?? M3.primaryC };
  const stageH = phase === "connect" ? 270 : phase === "book" ? 350 : 230;

  return createPortal(
    <>
      {/* Snackbar M3 */}
      <AnimatePresence>
        {showToast && (
          <motion.div key="toast"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: EASE_EMPH }}
            style={{ position: "fixed", bottom: 88, left: "50%", x: "-50%", zIndex: 99998, background: "#322F35", color: "#F5EFF7",
                     borderRadius: 12, padding: "14px 18px", fontFamily: FONT, fontSize: 14, maxWidth: "88vw", boxShadow: "0 6px 20px rgba(0,0,0,0.25)" }}>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence onExitComplete={() => { setPhase("connect"); setChar(null); }}>
        {visible && char && (
          <motion.div key="nfc-overlay"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)", transition: { duration: 0.5, ease: [0.3, 0, 0.8, 0.15] } }}
            transition={{ duration: 0.8, ease: EASE_EMPH }}
            style={{ position: "fixed", inset: 0, zIndex: 99999, background: M3.surface, overflowY: "auto", overflowX: "hidden", fontFamily: FONT }}
          >
            {/* Fondo tonal suave */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
              <motion.div animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", width: 420, height: 420, left: -140, top: -120, borderRadius: "50%", background: M3.primaryC, filter: "blur(70px)", opacity: 0.9 }} />
              <motion.div animate={{ x: [0, -30, 0], y: [0, -24, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", width: 380, height: 380, right: -140, bottom: -100, borderRadius: "50%", background: M3.pinkC, filter: "blur(70px)", opacity: 0.85 }} />
              <motion.div animate={{ opacity: phase === "char" ? 0.7 : 0.45 }}
                style={{ position: "absolute", width: 300, height: 300, right: -60, top: "30%", borderRadius: "50%", background: char.tone.c, filter: "blur(80px)" }} />
            </div>

            {/* Barra superior */}
            <div style={{ position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 18px 0" }}>
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px 8px 8px", borderRadius: 9999, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}>
                <img src="assets/images/logo-fb.webp" alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: M3.onSurface }}>Faneca Brava</span>
              </motion.div>
              <motion.button onClick={close} whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...SPRING, delay: 0.5 }}
                style={{ width: 48, height: 48, borderRadius: 9999, border: "none", background: M3.primaryC, color: M3.onSurface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={20} />
              </motion.button>
            </div>

            {/* Contido */}
            <div style={{ position: "relative", zIndex: 5, minHeight: "calc(100% - 66px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px 16px 40px", gap: 22 }}>

              {/* Cabeceira */}
              <AnimatePresence mode="wait">
                {phase !== "char" && (
                  <motion.div key={phase}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE_EMPH, delay: phase === "connect" ? 0.35 : 0.15 }}
                    style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: M3.primary, marginBottom: 8 }}>
                      {phase === "connect" ? "Compartir por NFC" : "ConexiÃ³n completada"}
                    </div>
                    <div style={{ fontSize: "clamp(26px, 7vw, 34px)", fontWeight: 700, letterSpacing: "-0.03em", color: M3.onSurface, lineHeight: 1.1 }}>
                      {phase === "connect" ? "MantÃ©n os telÃ©fonos xuntos" : "Faneca Brava"}
                    </div>
                    {phase === "book" && (
                      <div style={{ fontSize: 15, color: M3.onSurfVar, marginTop: 6 }}>Recibiches un personaxe da novela</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Escenario */}
              <motion.div animate={{ height: stageH }} transition={{ duration: 0.7, ease: EASE_EMPH }}
                style={{ position: "relative", width: "100%", maxWidth: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>

                {/* Forma morfolÃ³xica de fondo */}
                <motion.div
                  animate={{ opacity: phase === "char" ? 0 : 1, scale: phase === "connect" ? 1 : 1.45 }}
                  transition={{ duration: 0.8, ease: EASE_EMPH }}
                  style={{ position: "absolute", inset: 0 }}>
                  <MorphShape size={220} color={phase === "connect" ? M3.primaryC : M3.pinkC} phaseKey="bg" speed={16} />
                </motion.div>

                {/* Ondas */}
                {phase === "connect" && [0, 1, 2].map(i => (
                  <motion.div key={i}
                    initial={{ scale: 0.5, opacity: 0.55 }} animate={{ scale: 2.1, opacity: 0 }}
                    transition={{ duration: 2.2, delay: 0.5 + i * 0.55, repeat: Infinity, ease: [0.2, 0, 0, 1] }}
                    style={{ position: "absolute", width: 120, height: 120, left: "50%", top: "50%", marginLeft: -60, marginTop: -60, borderRadius: "50%", border: `2px solid ${M3.primary}` }} />
                ))}

                {/* Chips do libro */}
                <AnimatePresence>
                  {phase === "book" && (
                    <>
                      <Chip key="c1" bg={M3.limeC} color="#1E3A0E" delay={0.35} style={{ left: "calc(50% - 175px)", top: 34 }}>Manuel Portas</Chip>
                      <Chip key="c2" bg={M3.pinkC} color="#5E1133" delay={0.48} style={{ right: "calc(50% - 178px)", top: 150 }}>Editorial Galaxia</Chip>
                      <Chip key="c3" bg={M3.blueC} color="#0A2F6B" delay={0.6} style={{ left: "calc(50% - 160px)", bottom: 40 }}>Galego Â· 244 pÃ¡x.</Chip>
                    </>
                  )}
                </AnimatePresence>

                {/* Heroe: cÃ­rculo NFC â†’ portada â†’ retrato (container transform) */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ ...hero, scale: 1, rotate: phase === "book" ? -3 : 0 }}
                  transition={{ ...SPRING, scale: { ...SPRING, delay: 0.25 }, rotate: { ...SPRING, delay: phase === "connect" ? 0.25 : 0 } }}
                  whileTap={phase === "book" ? { scale: 0.96 } : undefined}
                  onClick={phase === "book" ? reveal : undefined}
                  style={{ position: "relative", zIndex: 3, overflow: "hidden", cursor: phase === "book" ? "pointer" : "default",
                           boxShadow: phase === "connect" ? "0 10px 30px rgba(103,80,164,0.35)" : "0 24px 50px rgba(29,27,32,0.22)" }}
                >
                  <motion.div animate={{ opacity: phase === "connect" ? 1 : 0, scale: phase === "connect" ? 1 : 0.5 }} transition={{ duration: 0.3 }}
                    style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <NfcGlyph />
                  </motion.div>
                  <motion.img src={BOOK_COVER} alt="Faneca Brava"
                    animate={{ opacity: phase === "book" ? 1 : 0, scale: phase === "book" ? 1 : 1.2 }}
                    transition={{ duration: 0.55, ease: EASE_EMPH, delay: phase === "book" ? 0.12 : 0 }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <motion.img src={char.img} alt={char.name}
                    animate={{ opacity: phase === "char" ? 1 : 0, scale: phase === "char" ? 1 : 1.15 }}
                    transition={{ duration: 0.6, ease: EASE_EMPH, delay: phase === "char" ? 0.15 : 0 }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
                  {phase === "char" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.35 }}
                      style={{ position: "absolute", left: 14, bottom: 14, padding: "7px 14px", borderRadius: 9999, background: char.tone.c, color: char.tone.on, fontSize: 12.5, fontWeight: 700 }}>
                      {char.role}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* PÃ© de cada fase */}
              <AnimatePresence mode="wait">
                {phase === "connect" && (
                  <motion.div key="f-connect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 0.3 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                    <WavyProgress width={Math.min(240, vw * 0.6)} duration={2} />
                    <span style={{ fontSize: 14, color: M3.onSurfVar }}>Recibindo datosâ€¦</span>
                  </motion.div>
                )}

                {phase === "book" && (
                  <motion.div key="f-book" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, ease: EASE_EMPH, delay: 0.5 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <motion.button onClick={reveal} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}
                      style={{ height: 56, padding: "0 26px 0 28px", borderRadius: 9999, border: "none", background: M3.primary, color: M3.onPrimary,
                               fontFamily: FONT, fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", boxShadow: "0 8px 22px rgba(103,80,164,0.3)" }}>
                      Revelar personaxe <ArrowRight size={18} />
                    </motion.button>
                    <span style={{ fontSize: 12.5, color: M3.onSurfVar }}>Ou toca a portada</span>
                  </motion.div>
                )}

                {phase === "char" && (
                  <motion.div key="f-char"
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_EMPH, delay: 0.25 }}
                    style={{ width: W, marginTop: -14, background: "#FFFFFF", borderRadius: 32, padding: "22px 22px 20px", boxShadow: "0 10px 30px rgba(29,27,32,0.08)" }}>
                    <h3 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: M3.onSurface, lineHeight: 1.05 }}>{char.name}</h3>
                    <div style={{ fontSize: 15, fontWeight: 600, color: char.tone.accent, marginTop: 4 }}>{char.alias}</div>

                    {/* Divisor ondulado */}
                    <svg width="100%" height="12" viewBox="0 0 300 12" preserveAspectRatio="none" style={{ display: "block", margin: "14px 0" }}>
                      <path d={Array.from({ length: 76 }, (_, i) => `${i ? "L" : "M"}${i * 4} ${(6 + Math.sin(i * 4 / 18 * Math.PI * 2) * 3).toFixed(2)}`).join(" ")}
                        fill="none" stroke={char.tone.c} strokeWidth={3} strokeLinecap="round" />
                    </svg>

                    <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.6, color: M3.onSurfVar }}>{char.desc}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                      {char.traits.map((t, i) => (
                        <motion.span key={t} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...SPRING, delay: 0.5 + i * 0.07 }}
                          style={{ padding: "7px 14px", borderRadius: 10, border: `1px solid ${char.tone.c}`, background: i === 0 ? char.tone.c : "transparent", color: char.tone.on, fontSize: 13, fontWeight: 600 }}>
                          {t}
                        </motion.span>
                      ))}
                    </div>

                    <div style={{ background: char.tone.c, borderRadius: 24, padding: "16px 18px", color: char.tone.on }}>
                      <svg width="22" height="18" viewBox="0 0 22 18" fill={char.tone.accent} style={{ marginBottom: 6, opacity: 0.8 }}>
                        <path d="M0 18V10C0 4.5 3 1 8.5 0l1 2.4C6.3 3.6 5 5.8 5 8h4v10H0Zm12.5 0V10C12.5 4.5 15.5 1 21 0l1 2.4C18.8 3.6 17.5 5.8 17.5 8h4v10h-9Z" />
                      </svg>
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>{char.quote}</p>
                    </div>

                    <motion.button onClick={close} whileTap={{ scale: 0.96 }}
                      style={{ marginTop: 16, width: "100%", height: 52, borderRadius: 9999, border: "none", background: M3.primaryC, color: M3.onSurface, fontFamily: FONT, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                      Pechar
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
