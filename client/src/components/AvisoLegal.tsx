import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Mic, ShieldCheck, Building2, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

/* Paleta Bento */
const C = {
  tray:     "#141418",
  lime:     "#D6F36A",
  lavender: "#C9B8FF",
  pink:     "#F8CBE4",
  cream:    "#F4EFE6",
  green:    "#4E8A66",
  yellow:   "#F4F29C",
  white:    "#FFFFFF",
  ink:      "#16161A",
};

const font = "'DM Sans', system-ui, sans-serif";

function Tile({ bg, span, children, style, delay = 0 }: { bg: string; span: string; children: ReactNode; style?: CSSProperties; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.9, 0.3, 1] }}
      style={{
        gridColumn: span,
        background: bg,
        borderRadius: 22,
        padding: "18px 20px",
        position: "relative",
        overflow: "hidden",
        color: C.ink,
        fontFamily: font,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 11px", borderRadius: 9999,
      background: dark ? C.ink : "rgba(22,22,26,0.08)",
      color: dark ? C.white : C.ink,
      fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em",
    }}>{children}</span>
  );
}

function IconDot({ children, bg = "rgba(22,22,26,0.08)", color = C.ink }: { children: ReactNode; bg?: string; color?: string }) {
  return (
    <div style={{ width: 34, height: 34, borderRadius: 12, background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {children}
    </div>
  );
}

export default function AvisoLegal() {
  const [visible, setVisible] = useState(false);
  const m = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  const sp = (desk: number, mob: number) => (m ? `span ${mob}` : `span ${desk}`);
  const h3: CSSProperties = { fontSize: m ? 15 : 16, fontWeight: 700, margin: "10px 0 4px", letterSpacing: "-0.01em" };
  const p: CSSProperties = { fontSize: m ? 12.5 : 13, lineHeight: 1.55, margin: 0, opacity: 0.82 };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="aviso-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(6,6,10,0.72)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          />

          <motion.div
            key="aviso-box"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 100000, display: "flex", alignItems: "center", justifyContent: "center", padding: m ? "12px" : "28px", pointerEvents: "none" }}
          >
            <div
              style={{
                pointerEvents: "auto",
                width: "100%", maxWidth: 920, maxHeight: m ? "94vh" : "92vh", overflowY: "auto",
                background: C.tray,
                borderRadius: m ? 26 : 32,
                padding: m ? 10 : 14,
                boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
                scrollbarWidth: "none",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(12, 1fr)", gap: m ? 8 : 10 }}>

                {/* A — Presentación */}
                <Tile bg={C.lime} span={sp(7, 2)} delay={0.05} style={{ padding: m ? "18px" : "24px 26px", minHeight: m ? undefined : 190, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Pill dark><GraduationCap size={12} /> Proxecto educativo</Pill>
                    <Pill>Curso 2025–2026</Pill>
                  </div>
                  <div>
                    <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.035em", margin: "16px 0 10px" }}>
                      Faneca Brava,<br />un traballo de aula.
                    </h2>
                    <p style={{ ...p, opacity: 0.85 }}>
                      Feito por <b>Jun Sieira Gerpe</b> e <b>Álvaro Villar Gómez</b>, 4º ESO do IES Arcebispo Xelmírez I (Santiago de Compostela), para Lingua Galega e Literatura.
                    </p>
                  </div>
                </Tile>

                {/* B — Métrica 0 € */}
                <Tile bg={C.lavender} span={sp(5, 1)} delay={0.1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: m ? "16px" : "24px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>Beneficio económico</div>
                  <div>
                    <div style={{ fontSize: m ? 40 : 64, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}>0 €</div>
                    <div style={{ fontSize: m ? 12 : 13, fontWeight: 600, marginTop: 6 }}>Fins exclusivamente académicos</div>
                  </div>
                </Tile>

                {/* F (móbil xunto a B) — Privacidade */}
                {m && (
                  <Tile bg={C.yellow} span="span 1" delay={0.12} style={{ padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>Cookies e rastrexo</div>
                    <div>
                      <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}>0</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>Non se gardan datos</div>
                    </div>
                  </Tile>
                )}

                {/* C — Obra con portada real */}
                <Tile bg={C.cream} span={sp(4, 2)} delay={0.15} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <img
                    src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
                    alt="Faneca Brava"
                    style={{ width: m ? 58 : 66, aspectRatio: "2/3", objectFit: "cover", borderRadius: 10, boxShadow: "0 10px 24px rgba(0,0,0,0.25)", flexShrink: 0, transform: "rotate(-4deg)" }}
                  />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.6 }}>A obra</div>
                    <div style={{ fontSize: m ? 16 : 17, fontWeight: 800, letterSpacing: "-0.02em", margin: "2px 0 4px" }}>Faneca Brava</div>
                    <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.45 }}>Manuel Portas<br />Editorial Galaxia</div>
                  </div>
                </Tile>

                {/* D — Imaxes e voces */}
                <Tile bg={C.pink} span={sp(4, 2)} delay={0.2}>
                  <IconDot><Mic size={16} /></IconDot>
                  <h3 style={h3}>Imaxes e voces</h3>
                  <p style={p}>Retratos ilustrados con IA e voces gravadas polo alumnado. Non representan a persoas reais.</p>
                </Tile>

                {/* E — Contidos */}
                <Tile bg={C.green} span={sp(4, 2)} delay={0.25} style={{ color: C.white }}>
                  <IconDot bg="rgba(255,255,255,0.16)" color={C.white}><BookOpen size={16} /></IconDot>
                  <h3 style={{ ...h3, color: C.white }}>Uso dos textos</h3>
                  <p style={{ ...p, color: C.white }}>Citas e fragmentos usados só para a análise literaria escolar. Non se reproduce a obra.</p>
                </Tile>

                {/* F (escritorio) — Privacidade */}
                {!m && (
                  <Tile bg={C.yellow} span="span 5" delay={0.3} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}>0</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700 }}><ShieldCheck size={16} /> Datos persoais</div>
                      <p style={{ ...p, marginTop: 4 }}>Sen cookies de rastrexo nin análise de usuarios.</p>
                    </div>
                  </Tile>
                )}

                {/* G — Independencia */}
                <Tile bg={C.white} span={sp(7, 2)} delay={0.35} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <IconDot bg={C.lavender}><Building2 size={16} /></IconDot>
                  <div>
                    <div style={{ fontSize: m ? 14 : 15, fontWeight: 700 }}>Proxecto independente</div>
                    <p style={{ ...p, marginTop: 2 }}>Sen relación oficial con Editorial Galaxia nin co autor. «Mercar» leva a tendas lexítimas.</p>
                  </div>
                </Tile>

                {/* Acción */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.42, ease: [0.2, 0.9, 0.3, 1] }}
                  style={{
                    gridColumn: m ? "span 2" : "span 12",
                    display: "flex", flexDirection: m ? "column" : "row", alignItems: m ? "stretch" : "center",
                    justifyContent: "space-between", gap: 12,
                    padding: m ? "14px 6px 6px" : "12px 8px 4px 14px",
                    fontFamily: font,
                  }}
                >
                  <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", textAlign: m ? "center" : "left" }}>
                    IES Arcebispo Xelmírez I · 4º ESO · Lingua Galega e Literatura
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setVisible(false)}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                      padding: "15px 26px", borderRadius: 9999, border: "none",
                      background: C.lime, color: C.ink,
                      fontFamily: font, fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.01em",
                      cursor: "pointer",
                    }}
                  >
                    Aceptar e entrar
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: C.ink, color: C.lime, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <ArrowRight size={14} />
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
