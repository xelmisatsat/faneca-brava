import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { BookOpen, Bookmark, ArrowUpRight } from "lucide-react";

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
  },
  {
    num: "Parte II",
    roman: "II",
    title: "A obsesión",
    desc: "Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento a través de Andreu Picart e a tía Lela.",
  },
  {
    num: "Parte III",
    roman: "III",
    title: "A xustiza pola man",
    desc: "A revelación final. A faneca brava sempre crava as súas espiñas. A memoria devolve a dignidade.",
  },
  {
    num: "Coda",
    roman: "IV",
    title: "Epílogo",
    desc: "As últimas 10 páxinas. O remate emocional da historia. A resolución do destino de Concha.",
  },
];

const SERIF = "'Bodoni Moda', 'Playfair Display', Georgia, serif";
const SANS = "'DM Sans', 'Jost', system-ui, sans-serif";

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
        background: "linear-gradient(180deg, #F8F5EE 0%, #F3ECE1 50%, #ECE4D6 100%)",
        color: "#141416",
        padding: m ? "4.5rem 0 4rem" : "8rem 0 7.5rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "6%",
          right: "-5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200, 169, 110, 0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-6%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107, 45, 56, 0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: m ? "0 1.25rem" : "0 4rem", position: "relative", zIndex: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(20, 20, 22, 0.15)",
            paddingBottom: "14px",
            marginBottom: m ? "2rem" : "3.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: SANS, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#141416" }}>
              DISEÑO EDITORIAL
            </span>
          </div>

          <span style={{ fontFamily: SERIF, fontSize: "1.4rem", color: "#9B783E" }}>✻</span>

          <span style={{ fontFamily: SANS, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#6A6864" }}>
            ALTA COSTURA IMPRESA
          </span>
        </div>

        <div style={{ textAlign: "center", marginBottom: m ? "1.8rem" : "2.8rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: m ? "1.15rem" : "1.4rem",
              color: "#9B783E",
              marginBottom: "8px",
            }}
          >
            <span>Edición Literaria</span>
            <span style={{ fontStyle: "normal", fontSize: "0.9rem" }}>·</span>
            <span>Editorial Galaxia</span>
          </motion.div>

          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: m ? "clamp(3.2rem, 13vw, 5.2rem)" : "clamp(5.2rem, 10.5vw, 10.5rem)",
              lineHeight: 0.88,
              letterSpacing: m ? "-0.03em" : "-0.045em",
              textTransform: "uppercase",
              color: "#141416",
              margin: "0 auto",
              maxWidth: "1280px",
            }}
          >
            FANECA <span style={{ fontStyle: "italic", fontWeight: 300, color: "#9B783E" }}>BRAVA</span>
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: m ? "11px" : "12.5px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#5C5953",
              marginTop: m ? "14px" : "20px",
              marginBottom: 0,
            }}
          >
            Grandes titulares decorativos combinados con texto de corpo miúdo e lexible
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: m ? "1fr" : "320px 1fr",
            gap: m ? "2.5rem" : "4.5rem",
            alignItems: "start",
            borderTop: "1px solid rgba(20, 20, 22, 0.15)",
            paddingTop: m ? "2.5rem" : "4rem",
            marginBottom: m ? "3.5rem" : "5rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                position: "relative",
                background: "#FFFFFF",
                padding: "14px",
                border: "1px solid rgba(20, 20, 22, 0.14)",
                boxShadow: "0 24px 50px -15px rgba(20, 20, 22, 0.22), 0 4px 12px rgba(0,0,0,0.06)",
                borderRadius: "2px",
              }}
            >
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "2 / 3", background: "#1B1918" }}>
                <img
                  src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
                  alt="Faneca Brava — Cuberta do libro"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "contrast(1.04) brightness(0.98)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 0 30px rgba(0,0,0,0.4)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingTop: "10px",
                  borderTop: "1px solid rgba(20, 20, 22, 0.1)",
                  marginTop: "10px",
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A6864" }}>
                  PLATE 01 · CUBERTA
                </span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "11px", color: "#9B783E" }}>
                  Galaxia · 2024
                </span>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(20, 20, 22, 0.12)",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid rgba(20, 20, 22, 0.1)",
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#141416" }}>
                  COLOFÓN TÉCNICO
                </span>
                <Bookmark size={13} color="#9B783E" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {fichaItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      paddingBottom: "6px",
                      borderBottom: i < fichaItems.length - 1 ? "1px dotted rgba(20, 20, 22, 0.14)" : "none",
                    }}
                  >
                    <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 600, color: "#6A6864", letterSpacing: "0.04em" }}>
                      {item.label}
                    </span>
                    <span style={{ fontFamily: SERIF, fontSize: "1.05rem", fontWeight: 500, color: "#141416", textAlign: "right" }}>
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
            style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{ width: "24px", height: "1px", background: "#9B783E" }} />
                <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: "#9B783E" }}>
                  Sinopse da Novela
                </span>
              </div>

              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: m ? "1.45rem" : "1.85rem",
                  fontStyle: "italic",
                  lineHeight: 1.35,
                  color: "#141416",
                  marginBottom: "1.4rem",
                  paddingLeft: "1.2rem",
                  borderLeft: "2px solid #9B783E",
                }}
              >
                «Todas as familias agochan cadáveres na memoria. Concha transformou o trauma en poder a través da lente.»
              </div>

              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: "1.8rem" }}>
                <p
                  style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: m ? "14.5px" : "15.5px",
                    lineHeight: 1.85,
                    color: "#2C2A26",
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontSize: "3.2rem",
                      lineHeight: 0.85,
                      float: "left",
                      marginRight: "10px",
                      marginTop: "4px",
                      color: "#9B783E",
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
                    fontSize: m ? "14.5px" : "15.5px",
                    lineHeight: 1.85,
                    color: "#2C2A26",
                    margin: 0,
                  }}
                >
                  A través dunha investigación que o leva desde Santiago ata o Hostal dos Reis Católicos, Fernando vai destapando a verdade sobre Concha: non foi unha marxinal derrotada, senón unha supervivente feroz que usou a cámara como arma de vinganza.
                </p>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(20, 20, 22, 0.12)",
                borderBottom: "1px solid rgba(20, 20, 22, 0.12)",
                padding: "20px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <span style={{ fontFamily: SANS, fontSize: "10.5px", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "#141416" }}>
                  TEMAS CENTRAIS · LÉXICO DA OBRA
                </span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "12px", color: "#6A6864" }}>
                  10 conceptos clave
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {temas.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: SANS,
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      padding: "6px 14px",
                      background: "#FFFFFF",
                      border: "1px solid rgba(20, 20, 22, 0.15)",
                      color: "#141416",
                      borderRadius: "2px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
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
                padding: "14px 18px",
                background: "#FFFFFF",
                border: "1px solid rgba(20, 20, 22, 0.14)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <BookOpen size={16} color="#9B783E" />
                <span style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 700, color: "#141416" }}>
                  Dispoñible nas librarías de Galicia e na rede
                </span>
              </div>
              <a
                href="#mercar"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: SANS,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#9B783E",
                  textDecoration: "none",
                }}
              >
                <span>Adquirir exemplar</span>
                <ArrowUpRight size={13} />
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
              borderBottom: "1px solid rgba(20, 20, 22, 0.15)",
              paddingBottom: "12px",
              marginBottom: "2rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "#141416" }}>
                ESTRUTURA DA NOVELA
              </span>
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.1rem", color: "#9B783E" }}>
                Caderno de catro movementos
              </span>
            </div>
            <span style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A6864" }}>
              III PARTES + CODA
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "repeat(4, 1fr)",
              gap: m ? "1.2rem" : "1.5rem",
            }}
          >
            {partes.map((p, i) => (
              <motion.article
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(20, 20, 22, 0.14)",
                  padding: m ? "1.5rem" : "2rem 1.8rem",
                  boxShadow: "0 10px 25px -10px rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: m ? "auto" : "260px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "14px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid rgba(20, 20, 22, 0.08)",
                    }}
                  >
                    <span style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B783E" }}>
                      {p.num}
                    </span>
                    <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.3rem", color: "rgba(20, 20, 22, 0.35)" }}>
                      {p.roman}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: "1.65rem",
                      fontWeight: 400,
                      color: "#141416",
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
                      fontSize: "13.5px",
                      lineHeight: 1.75,
                      color: "#4A4742",
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "12px",
                    borderTop: "1px dotted rgba(20, 20, 22, 0.12)",
                    fontFamily: SANS,
                    fontSize: "9.5px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#7A7770",
                  }}
                >
                  Capítulo {i + 1} de 4
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
