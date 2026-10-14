import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Mic,
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft,
  Code2,
  Sparkles,
  Users,
  Info,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import MochiCompanion from "./mochi/MochiCompanion";

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
  blue:     "#2563EB",
  blueSoft: "#DBEAFE",
  darkTile: "#1F1F25",
};

const font = "'DM Sans', system-ui, sans-serif";

function Tile({
  bg,
  span,
  children,
  style,
  delay = 0,
  fromRight = false,
}: {
  bg: string;
  span: string;
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
  fromRight?: boolean;
}) {
  return (
    <motion.div
      initial={
        fromRight
          ? { opacity: 0, x: 80, scale: 0.95 }
          : { opacity: 0, y: 16, scale: 0.98 }
      }
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={
        fromRight
          ? { opacity: 0, x: 50, scale: 0.95 }
          : { opacity: 0, y: -10, scale: 0.98 }
      }
      transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
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
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 11px",
        borderRadius: 9999,
        background: dark ? C.ink : "rgba(22,22,26,0.08)",
        color: dark ? C.white : C.ink,
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </span>
  );
}

function IconDot({
  children,
  bg = "rgba(22,22,26,0.08)",
  color = C.ink,
}: {
  children: ReactNode;
  bg?: string;
  color?: string;
}) {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 12,
        background: bg,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

export default function AvisoLegal() {
  const [visible, setVisible] = useState(true);
  const [view, setView] = useState<"aviso" | "sobre">("aviso");
  const m = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const sp = (desk: number, mob: number) => (m ? `span ${mob}` : `span ${desk}`);
  const h3: CSSProperties = {
    fontSize: m ? 15 : 16,
    fontWeight: 700,
    margin: "10px 0 4px",
    letterSpacing: "-0.01em",
  };
  const p: CSSProperties = {
    fontSize: m ? 12.5 : 13,
    lineHeight: 1.55,
    margin: 0,
    opacity: 0.85,
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="aviso-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(6,6,10,0.72)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          <motion.div
            key="aviso-box"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: m ? "12px" : "28px",
              pointerEvents: "none",
            }}
          >
            <div
              ref={scrollContainerRef}
              style={{
                pointerEvents: "auto",
                width: "100%",
                maxWidth: 920,
                maxHeight: m ? "94vh" : "92vh",
                overflowY: "auto",
                background: C.tray,
                borderRadius: m ? 26 : 32,
                padding: m ? 10 : 14,
                boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
                scrollbarWidth: "none",
              }}
            >
              <AnimatePresence mode="wait">
                {view === "aviso" ? (
                  <motion.div
                    key="panel-aviso"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(12, 1fr)",
                      gap: m ? 8 : 10,
                    }}
                  >
                    {/* A — Presentación */}
                    <Tile
                      bg={C.lime}
                      span={sp(7, 2)}
                      delay={0.04}
                      style={{
                        padding: m ? "18px" : "24px 26px",
                        minHeight: m ? undefined : 190,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <Pill dark>
                          <GraduationCap size={12} /> Proxecto educativo
                        </Pill>
                        <Pill>Curso 2026–2027</Pill>
                      </div>
                      <div>
                        <h2
                          style={{
                            fontSize: m ? 26 : 36,
                            fontWeight: 800,
                            lineHeight: 1.02,
                            letterSpacing: "-0.035em",
                            margin: "16px 0 10px",
                          }}
                        >
                          Faneca Brava,<br />un traballo de aula.
                        </h2>
                        <p style={{ ...p, opacity: 0.88 }}>
                          Feito por <b>Jun Sieira Gerpe</b> e <b>Álvaro Villar Gómez</b>, 1º Bacharelato do IES Arcebispo Xelmírez I (Santiago de Compostela), para Lingua Galega e Literatura.
                        </p>
                      </div>
                    </Tile>

                    {/* B — Métrica 0 € */}
                    <Tile
                      bg={C.lavender}
                      span={sp(5, 1)}
                      delay={0.08}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: m ? "16px" : "24px",
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>Beneficio económico</div>
                      <div>
                        <div
                          style={{
                            fontSize: m ? 38 : 64,
                            fontWeight: 800,
                            letterSpacing: "-0.05em",
                            lineHeight: 1,
                          }}
                        >
                          0 €
                        </div>
                        <div style={{ fontSize: m ? 12 : 13, fontWeight: 600, marginTop: 6 }}>
                          Fins exclusivamente académicos
                        </div>
                      </div>
                    </Tile>

                    {/* F (móbil) — Privacidade */}
                    {m && (
                      <Tile
                        bg={C.yellow}
                        span="span 1"
                        delay={0.1}
                        style={{
                          padding: "16px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>Cookies e rastrexo</div>
                        <div>
                          <div
                            style={{
                              fontSize: 38,
                              fontWeight: 800,
                              letterSpacing: "-0.05em",
                              lineHeight: 1,
                            }}
                          >
                            0
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>
                            Non se gardan datos
                          </div>
                        </div>
                      </Tile>
                    )}

                    {/* C — Obra con portada real */}
                    <Tile
                      bg={C.cream}
                      span={sp(4, 2)}
                      delay={0.12}
                      style={{ display: "flex", gap: 14, alignItems: "center" }}
                    >
                      <img
                        src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
                        alt="Faneca Brava"
                        style={{
                          width: m ? 58 : 66,
                          aspectRatio: "2/3",
                          objectFit: "cover",
                          borderRadius: 10,
                          boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
                          flexShrink: 0,
                          transform: "rotate(-4deg)",
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.6 }}>A obra</div>
                        <div
                          style={{
                            fontSize: m ? 16 : 17,
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            margin: "2px 0 4px",
                          }}
                        >
                          Faneca Brava
                        </div>
                        <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.45 }}>
                          Manuel Portas<br />Editorial Galaxia
                        </div>
                      </div>
                    </Tile>

                    {/* D — Imaxes e voces */}
                    <Tile bg={C.pink} span={sp(4, 2)} delay={0.16}>
                      <IconDot>
                        <Mic size={16} />
                      </IconDot>
                      <h3 style={h3}>Imaxes e voces</h3>
                      <p style={p}>
                        Retratos ilustrados con IA e voces gravadas polo alumnado. Non representan a persoas reais.
                      </p>
                    </Tile>

                    {/* E — Contidos */}
                    <Tile bg={C.green} span={sp(4, 2)} delay={0.2} style={{ color: C.white }}>
                      <IconDot bg="rgba(255,255,255,0.16)" color={C.white}>
                        <BookOpen size={16} />
                      </IconDot>
                      <h3 style={{ ...h3, color: C.white }}>Uso dos textos</h3>
                      <p style={{ ...p, color: C.white }}>
                        Citas e fragmentos usados só para a análise literaria escolar. Non se reproduce a obra.
                      </p>
                    </Tile>

                    {/* F (escritorio) — Privacidade */}
                    {!m && (
                      <Tile
                        bg={C.yellow}
                        span="span 5"
                        delay={0.24}
                        style={{ display: "flex", alignItems: "center", gap: 18 }}
                      >
                        <div
                          style={{
                            fontSize: 60,
                            fontWeight: 800,
                            letterSpacing: "-0.05em",
                            lineHeight: 1,
                          }}
                        >
                          0
                        </div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              fontSize: 14,
                              fontWeight: 700,
                            }}
                          >
                            <ShieldCheck size={16} /> Datos persoais
                          </div>
                          <p style={{ ...p, marginTop: 4 }}>
                            Sen cookies de rastrexo nin análise de usuarios.
                          </p>
                        </div>
                      </Tile>
                    )}

                    {/* G — Independencia */}
                    <Tile
                      bg={C.white}
                      span={sp(7, 2)}
                      delay={0.28}
                      style={{ display: "flex", alignItems: "center", gap: 14 }}
                    >
                      <IconDot bg={C.lavender}>
                        <Building2 size={16} />
                      </IconDot>
                      <div>
                        <div style={{ fontSize: m ? 14 : 15, fontWeight: 700 }}>Proxecto independente</div>
                        <p style={{ ...p, marginTop: 2 }}>
                          Sen relación oficial con Editorial Galaxia nin co autor. «Mercar» leva a tendas lexítimas.
                        </p>
                      </div>
                    </Tile>

                    {/* Barra inferior de accións */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.32, ease: [0.2, 0.9, 0.3, 1] }}
                      style={{
                        gridColumn: m ? "span 2" : "span 12",
                        display: "flex",
                        flexDirection: m ? "column" : "row",
                        alignItems: m ? "stretch" : "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: m ? "12px 4px 4px" : "12px 8px 4px 14px",
                        fontFamily: font,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11.5,
                          color: "rgba(255,255,255,0.6)",
                          textAlign: m ? "center" : "left",
                        }}
                      >
                        IES Arcebispo Xelmírez I · 1º Bacharelato (2026–2027) · Lingua Galega e Literatura
                      </span>

                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          width: m ? "100%" : "auto",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setView("sobre")}
                          style={{
                            flex: m ? 1 : undefined,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: m ? "13px 14px" : "13px 20px",
                            borderRadius: 9999,
                            border: "none",
                            background: C.blue,
                            color: C.white,
                            fontFamily: font,
                            fontSize: m ? 13.5 : 14,
                            fontWeight: 700,
                            letterSpacing: "-0.01em",
                            cursor: "pointer",
                            boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
                          }}
                        >
                          <Info size={16} />
                          Sobre nós
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setVisible(false)}
                          style={{
                            flex: m ? 1 : undefined,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            padding: m ? "13px 16px" : "13px 24px",
                            borderRadius: 9999,
                            border: "none",
                            background: C.lime,
                            color: C.ink,
                            fontFamily: font,
                            fontSize: m ? 13.5 : 14.5,
                            fontWeight: 700,
                            letterSpacing: "-0.01em",
                            cursor: "pointer",
                          }}
                        >
                          Aceptar e entrar
                          <span
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: C.ink,
                              color: C.lime,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ArrowRight size={13} />
                          </span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  /* =========================================================
                     PANEL BENTO: SOBRE NÓS
                     ========================================================= */
                  <motion.div
                    key="panel-sobre"
                    initial={{ opacity: 0, x: 90 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 70 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(12, 1fr)",
                      gap: m ? 8 : 10,
                    }}
                  >
                    {/* Header Bento Tile */}
                    <Tile
                      fromRight
                      bg={C.blueSoft}
                      span={sp(12, 2)}
                      delay={0.03}
                      style={{
                        padding: m ? "16px 18px" : "22px 26px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                        <Pill dark>
                          <Users size={12} /> Sobre nós
                        </Pill>
                        <Pill>
                          <GraduationCap size={12} /> 1º Bacharelato (2026–2027)
                        </Pill>
                        <Pill>IES Arcebispo Xelmírez I</Pill>
                      </div>
                      <div>
                        <h2
                          style={{
                            fontSize: m ? 22 : 30,
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            margin: "4px 0 6px",
                            color: C.ink,
                          }}
                        >
                          Equipo, Desenvolvemento e Propósito
                        </h2>
                        <p style={{ ...p, fontSize: m ? 12 : 13, opacity: 0.82 }}>
                          Plataforma interactiva escolar arredor da novela <i>Faneca Brava</i> de Manuel Portas. Un proxecto que combina tecnoloxía web de vangarda, intelixencia artificial asistida e compromiso coa literatura en lingua galega.
                        </p>
                      </div>
                    </Tile>

                    {/* Jun Sieira Gerpe — Perfil Técnico */}
                    <Tile
                      fromRight
                      bg={C.white}
                      span={sp(7, 2)}
                      delay={0.07}
                      style={{
                        padding: m ? "18px" : "22px 24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                          <Pill dark>
                            <Code2 size={12} /> Desenvolvedor Web & IA
                          </Pill>
                          <IconDot bg="#EFF6FF" color={C.blue}>
                            <Sparkles size={16} />
                          </IconDot>
                        </div>
                        <h3
                          style={{
                            fontSize: m ? 18 : 20,
                            fontWeight: 800,
                            margin: "12px 0 2px",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          Jun Sieira Gerpe
                        </h3>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: C.blue,
                            marginBottom: 10,
                          }}
                        >
                          Arquitectura web, deseño de interfaces e desenvolvemento asistido por IA
                        </div>
                        <p style={{ ...p, fontSize: m ? 12 : 12.5, lineHeight: 1.55 }}>
                          Desenvolvedor enfocado no desenvolvemento web contemporáneo, creación de aplicacións e integración práctica de intelixencia artificial no ciclo de software: planificación, deseño UI/UX, xeración e implementación asistida de código, integración de funcionalidades e optimización.
                        </p>
                        <p style={{ ...p, fontSize: m ? 12 : 12.5, lineHeight: 1.55, marginTop: 8 }}>
                          Creador e arquitecto técnico da plataforma de <b>Faneca Brava</b>, integrando React, TypeScript, Framer Motion e Capacitor para ofrecer unha experiencia interactiva fluída, reactiva e adaptada a calquera pantalla.
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
                        <Pill>React + TypeScript</Pill>
                        <Pill>IA no ciclo de software</Pill>
                        <Pill>UI / UX</Pill>
                        <Pill>Capacitor App</Pill>
                      </div>
                    </Tile>

                    {/* Álvaro Villar Gómez — Colaboración */}
                    <Tile
                      fromRight
                      bg={C.pink}
                      span={sp(5, 2)}
                      delay={0.11}
                      style={{
                        padding: m ? "18px" : "22px 24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                          <Pill dark>
                            <Mic size={12} /> Produción e Deseño
                          </Pill>
                          <IconDot bg="rgba(0,0,0,0.06)" color="#9D174D">
                            <Users size={16} />
                          </IconDot>
                        </div>
                        <h3
                          style={{
                            fontSize: m ? 18 : 20,
                            fontWeight: 800,
                            margin: "12px 0 2px",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          Álvaro Villar Gómez
                        </h3>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#9D174D",
                            marginBottom: 10,
                          }}
                        >
                          Colaboración audiovisual, voces e imaxes
                        </div>
                        <p style={{ ...p, fontSize: m ? 12 : 12.5, lineHeight: 1.55 }}>
                          Colaborador indispensable no apartado sonoro e gráfico do proxecto. Participou na gravación e produción das voces que dan vida aos personaxes da novela e na selección e curación visual das ilustracións para enriquecer a ambientación da obra.
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
                        <Pill dark>Produción sonora</Pill>
                        <Pill dark>Curación visual</Pill>
                      </div>
                    </Tile>

                    {/* Ámbito escolar e paixón tecnolóxica */}
                    <Tile
                      fromRight
                      bg={C.lavender}
                      span={sp(5, 2)}
                      delay={0.15}
                      style={{
                        padding: m ? "16px 18px" : "20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <IconDot bg="rgba(22,22,26,0.08)" color={C.ink}>
                            <GraduationCap size={16} />
                          </IconDot>
                          <span style={{ fontSize: 11.5, fontWeight: 700 }}>Comunidade Escolar</span>
                        </div>
                        <h3 style={{ fontSize: m ? 15 : 16, fontWeight: 800, margin: "6px 0 4px" }}>
                          IES Arcebispo Xelmírez I
                        </h3>
                        <p style={{ ...p, fontSize: m ? 12 : 12.5 }}>
                          Estudantes actuais de <b>1º de Bacharelato (Curso 2026–2027)</b> en Santiago de Compostela. Un proxecto nado da curiosidade técnica, a experimentación dixital e o amor pola cultura galega.
                        </p>
                      </div>
                      <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, opacity: 0.75 }}>
                        Santiago de Compostela · Galicia
                      </div>
                    </Tile>

                    {/* Marco Legal, Fins Educativos e Dereitos */}
                    <Tile
                      fromRight
                      bg={C.cream}
                      span={sp(7, 2)}
                      delay={0.19}
                      style={{
                        padding: m ? "16px 18px" : "20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <IconDot bg="rgba(22,22,26,0.08)" color={C.ink}>
                            <ShieldCheck size={16} />
                          </IconDot>
                          <span style={{ fontSize: 11.5, fontWeight: 700 }}>Aviso Legal e Finalidade</span>
                        </div>
                        <h3 style={{ fontSize: m ? 15 : 16, fontWeight: 800, margin: "6px 0 4px" }}>
                          Estritamente Educativo · Sen Ánimo de Lucro
                        </h3>
                        <p style={{ ...p, fontSize: m ? 12 : 12.5, lineHeight: 1.5 }}>
                          Este traballo ten fins exclusivamente académicos e pedagóxicos (0 € de beneficio). Non existe vinculación comercial, oficial nin afiliación con Editorial Galaxia nin co autor Manuel Portas. O uso de extractos baséase no dereito lexítimo de cita con fins docentes. A sección «Mercar» dirixe a canles e librarías oficiais para apoiar a compra legal da obra.
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                        <Pill>0% Comercial</Pill>
                        <Pill>Dereito de cita educativa</Pill>
                        <Pill>Privacidade absoluta</Pill>
                      </div>
                    </Tile>

                    {/* Botóns de navegación e acción no panel Sobre nós */}
                    <motion.div
                      initial={{ opacity: 0, x: 75 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.23, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        gridColumn: m ? "span 2" : "span 12",
                        display: "flex",
                        flexDirection: m ? "column" : "row",
                        alignItems: m ? "stretch" : "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: m ? "12px 4px 4px" : "12px 8px 4px 14px",
                        fontFamily: font,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11.5,
                          color: "rgba(255,255,255,0.6)",
                          textAlign: m ? "center" : "left",
                        }}
                      >
                        Faneca Brava · Jun Sieira Gerpe & Álvaro Villar Gómez
                      </span>

                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          width: m ? "100%" : "auto",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {/* Botón Volver atrás: volta á páxina de aceptar */}
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setView("aviso")}
                          style={{
                            flex: m ? 1 : undefined,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: m ? "13px 14px" : "13px 20px",
                            borderRadius: 9999,
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: C.darkTile,
                            color: C.white,
                            fontFamily: font,
                            fontSize: m ? 13.5 : 14,
                            fontWeight: 700,
                            letterSpacing: "-0.01em",
                            cursor: "pointer",
                          }}
                        >
                          <ArrowLeft size={16} />
                          Volver atrás
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setVisible(false)}
                          style={{
                            flex: m ? 1 : undefined,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            padding: m ? "13px 16px" : "13px 24px",
                            borderRadius: 9999,
                            border: "none",
                            background: C.lime,
                            color: C.ink,
                            fontFamily: font,
                            fontSize: m ? 13.5 : 14.5,
                            fontWeight: 700,
                            letterSpacing: "-0.01em",
                            cursor: "pointer",
                          }}
                        >
                          Aceptar e entrar
                          <span
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: C.ink,
                              color: C.lime,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ArrowRight size={13} />
                          </span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mascota 3D flotante e interactiva: viaxa libremente acompañando o usuario sen estar pechada nun recadro */}
            <AnimatePresence>
              {view === "sobre" && (
                <MochiCompanion
                  isMobile={m}
                  scrollContainerRef={scrollContainerRef}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
