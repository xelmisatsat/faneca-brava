import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { BookOpen, Bookmark, ArrowUpRight, Sparkles } from "lucide-react";

const fichaItems = [
  { label: "Título", value: "Faneca Brava" },
  { label: "Autor", value: "Manuel Portas" },
  { label: "Editorial", value: "Editorial Galaxia (2024)" },
  { label: "Lingua", value: "Galego" },
  { label: "Xénero", value: "Novela de memoria" },
  { label: "Partes", value: "III + Coda" },
  { label: "Nº páxinas", value: "244" },
];

const temas = [
  "Memoria familiar",
  "Franquismo",
  "Vinganza",
  "Identidade",
  "Fotografía",
  "Segredos",
  "Culpa xeracional",
  "Resistencia feminina",
  "Hipocrisía social",
  "Trauma herdado",
];

const partes = [
  {
    num: "Parte I",
    roman: "I",
    title: "Estirpe",
    desc: "A familia Pereira, os seus segredos e o pasado silenciado. A infancia de Concha na vila mariñeira galega.",
    focus: "As orixes silenciadas",
  },
  {
    num: "Parte II",
    roman: "II",
    title: "A obsesión",
    desc: "Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento a través de Andreu Picart e a tía Lela.",
    focus: "O rastro de Barcelona",
  },
  {
    num: "Parte III",
    roman: "III",
    title: "A xustiza pola man",
    desc: "A revelación final. A faneca brava sempre crava as súas espiñas. A memoria devolve a dignidade.",
    focus: "O desquite da lente",
  },
  {
    num: "Coda",
    roman: "IV",
    title: "Epílogo",
    desc: "As últimas 10 páxinas. O remate emocional da historia. A resolución do destino de Concha.",
    focus: "O peche da ferida",
  },
];

const SERIF = "'Playfair Display', 'Cinzel', Georgia, serif";
const SANS = "'DM Sans', -apple-system, system-ui, sans-serif";

export default function LibroSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="libro"
      style={{
        position: "relative",
        background: "linear-gradient(165deg, #070D18 0%, #0D1626 35%, #151828 70%, #090E1A 100%)",
        color: "#FAF7F2",
        padding: m ? "4.5rem 0 4rem" : "8rem 0 7.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "4%",
          right: "-6%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200, 169, 110, 0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          left: "-5%",
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120, 32, 54, 0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(200, 169, 110, 0.15), transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: m ? "0 1.25rem" : "0 4rem", position: "relative", zIndex: 10 }}>
        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(200, 169, 110, 0.22)",
            paddingBottom: "14px",
            marginBottom: m ? "2.2rem" : "3.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C8A96E" }} />
            <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E5B869" }}>
              CADERNO LITERARIO
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={14} color="#C8A96E" />
            <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(250, 247, 242, 0.6)" }}>
              ALTA COSTURA EDITORIAL
            </span>
          </div>

          <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E" }}>
            Nº 01 · 2024
          </span>
        </div>

        <div style={{ textAlign: "center", marginBottom: m ? "2.2rem" : "3.6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: SANS,
              fontSize: m ? "12px" : "13.5px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C8A96E",
              marginBottom: "12px",
            }}
          >
            <span>Edición Especial</span>
            <span style={{ opacity: 0.5 }}>—</span>
            <span>Editorial Galaxia</span>
          </motion.div>

          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: m ? "clamp(3.4rem, 14vw, 5.4rem)" : "clamp(5.4rem, 11vw, 10.5rem)",
              lineHeight: 0.9,
              letterSpacing: m ? "-0.02em" : "-0.035em",
              textTransform: "uppercase",
              color: "#FAF7F2",
              margin: "0 auto",
              maxWidth: "1300px",
              textShadow: "0 10px 40px rgba(0,0,0,0.6)",
            }}
          >
            FANECA <span style={{ fontStyle: "italic", fontWeight: 400, color: "#E5B869" }}>BRAVA</span>
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: m ? "13px" : "15px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "rgba(250, 247, 242, 0.75)",
              marginTop: m ? "14px" : "22px",
              marginBottom: 0,
            }}
          >
            A novela de Manuel Portas que rescata a memoria roubada e o desquite da lente
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: m ? "1fr" : "360px 1fr",
            gap: m ? "2.5rem" : "4.5rem",
            alignItems: "start",
            borderTop: "1px solid rgba(200, 169, 110, 0.22)",
            paddingTop: m ? "2.5rem" : "4rem",
            marginBottom: m ? "3.5rem" : "5rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "22px" }}
          >
            <div
              style={{
                position: "relative",
                background: "linear-gradient(145deg, #162032 0%, #0E1624 100%)",
                padding: "16px",
                border: "1px solid rgba(200, 169, 110, 0.35)",
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(200, 169, 110, 0.12)",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "2 / 3",
                  background: "#080C14",
                  borderRadius: "10px",
                }}
              >
                <img
                  src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
                  alt="Faneca Brava — Cuberta do libro"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "contrast(1.05) brightness(1.02)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 0 35px rgba(0,0,0,0.55)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(200, 169, 110, 0.2)",
                  marginTop: "12px",
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A96E" }}>
                  PLATE 01 · CUBERTA
                </span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "12.5px", color: "#FAF7F2" }}>
                  Galaxia · 2024
                </span>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(145deg, rgba(20, 28, 44, 0.85) 0%, rgba(13, 19, 32, 0.95) 100%)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(200, 169, 110, 0.25)",
                borderRadius: "16px",
                padding: "22px 24px",
                boxShadow: "0 18px 36px rgba(0,0,0,0.45)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid rgba(200, 169, 110, 0.2)",
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "#E5B869" }}>
                  COLOFÓN TÉCNICO
                </span>
                <Bookmark size={15} color="#C8A96E" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {fichaItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      paddingBottom: "8px",
                      borderBottom: i < fichaItems.length - 1 ? "1px dotted rgba(200, 169, 110, 0.18)" : "none",
                    }}
                  >
                    <span style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 600, color: "rgba(250, 247, 242, 0.65)", letterSpacing: "0.04em" }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 600, color: "#FAF7F2", textAlign: "right" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ width: "32px", height: "2px", background: "#C8A96E" }} />
                <span style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E5B869" }}>
                  Sinopse da Novela
                </span>
              </div>

              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: m ? "1.5rem" : "1.95rem",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                  color: "#FAF7F2",
                  marginBottom: "1.8rem",
                  paddingLeft: "1.4rem",
                  borderLeft: "3px solid #C8A96E",
                  background: "linear-gradient(90deg, rgba(200, 169, 110, 0.08) 0%, transparent 100%)",
                  padding: "16px 18px",
                  borderRadius: "0 12px 12px 0",
                }}
              >
                «Todas as familias agochan cadáveres na memoria. Concha transformou o trauma en poder a través da lente.»
              </div>

              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: "2rem" }}>
                <p
                  style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: m ? "15.5px" : "16.5px",
                    lineHeight: 1.85,
                    color: "rgba(250, 247, 242, 0.88)",
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontSize: "3.4rem",
                      lineHeight: 0.85,
                      float: "left",
                      marginRight: "12px",
                      marginTop: "4px",
                      color: "#E5B869",
                      fontWeight: 700,
                    }}
                  >
                    F
                  </span>
                  aneca Brava é unha novela de misterio familiar e reconstrución da memoria que se desenvolve en dúas liñas temporais que acaban chocando. No presente, Fernando Pereira, médico de Santiago, non pode durmir. No pasado, a súa curmá Concha foi borrada da memoria familiar.
                </p>

                <p
                  style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: m ? "15.5px" : "16.5px",
                    lineHeight: 1.85,
                    color: "rgba(250, 247, 242, 0.88)",
                    margin: 0,
                  }}
                >
                  A través dunha investigación que o leva desde Santiago ata o Hostal dos Reis Católicos, Fernando vai destapando a verdade sobre Concha: non foi unha marxinal derrotada, senón unha supervivente feroz que usou a cámara como arma de vinganza.
                </p>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(200, 169, 110, 0.2)",
                borderBottom: "1px solid rgba(200, 169, 110, 0.2)",
                padding: "24px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: "11.5px", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "#E5B869" }}>
                  TEMAS CENTRAIS · LÉXICO DA OBRA
                </span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "13px", color: "rgba(250, 247, 242, 0.6)" }}>
                  10 conceptos clave
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {temas.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: SANS,
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      padding: "8px 16px",
                      background: "rgba(200, 169, 110, 0.12)",
                      border: "1px solid rgba(200, 169, 110, 0.28)",
                      color: "#FAF7F2",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 24px",
                background: "linear-gradient(135deg, rgba(200, 169, 110, 0.15) 0%, rgba(13, 20, 34, 0.9) 100%)",
                border: "1.5px solid rgba(200, 169, 110, 0.35)",
                borderRadius: "14px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                flexWrap: m ? "wrap" : "nowrap",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <BookOpen size={18} color="#E5B869" />
                <span style={{ fontFamily: SANS, fontSize: "13.5px", fontWeight: 700, color: "#FAF7F2" }}>
                  Dispoñible nas librarías de Galicia e na rede
                </span>
              </div>
              <a
                href="#mercar"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: SANS,
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#0B111C",
                  background: "linear-gradient(135deg, #E5B869 0%, #C8A96E 100%)",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(200, 169, 110, 0.35)",
                  transition: "all 0.25s ease",
                }}
              >
                <span>Adquirir exemplar</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(200, 169, 110, 0.22)",
              paddingBottom: "14px",
              marginBottom: "2.2rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
              <span style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 800, letterSpacing: "0.26em", textTransform: "uppercase", color: "#E5B869" }}>
                ESTRUTURA DA NOVELA
              </span>
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.2rem", color: "rgba(250, 247, 242, 0.75)" }}>
                Caderno de catro movementos
              </span>
            </div>
            <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E" }}>
              III PARTES + CODA
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "repeat(4, 1fr)",
              gap: m ? "1.4rem" : "1.6rem",
            }}
          >
            {partes.map((p, i) => (
              <motion.article
                key={i}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "linear-gradient(155deg, #131B2B 0%, #0D1422 100%)",
                  border: "1px solid rgba(200, 169, 110, 0.22)",
                  borderRadius: "16px",
                  padding: m ? "1.6rem" : "2.2rem 1.8rem",
                  boxShadow: "0 16px 36px -10px rgba(0, 0, 0, 0.6)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: m ? "auto" : "280px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, rgba(200, 169, 110, 0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "16px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid rgba(200, 169, 110, 0.15)",
                    }}
                  >
                    <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E5B869" }}>
                      {p.num}
                    </span>
                    <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.4rem", color: "rgba(200, 169, 110, 0.5)" }}>
                      {p.roman}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      color: "#FAF7F2",
                      letterSpacing: "-0.015em",
                      margin: "0 0 10px",
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: SANS,
                      fontWeight: 400,
                      fontSize: "14.5px",
                      lineHeight: 1.8,
                      color: "rgba(250, 247, 242, 0.78)",
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    paddingTop: "14px",
                    borderTop: "1px dotted rgba(200, 169, 110, 0.2)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C8A96E",
                    }}
                  >
                    Capítulo {i + 1} de 4
                  </span>
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "rgba(250, 247, 242, 0.5)",
                    }}
                  >
                    {p.focus}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
