import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Star, Quote, Sparkles, BookOpen } from "lucide-react";

const opinions = [
  {
    id: "jun",
    name: "Jun Sieira Gerpe",
    role: "Alumno de 4º ESO · IES Arcebispo Xelmírez I",
    badge: "Crítica Estrutural & Personaxes",
    img: "/manus-storage/opinion-jun.jpg",
    blockColor: "#064E3B",
    frameColor: "#022C22",
    accentColor: "#6EE7B7",
    tagColor: "#34D399",
    rating: 5,
    quote:
      "O libro gustoume máis do que esperaba. Cando o comecei pensaba que ía ser outra historia máis da posguerra, pero o tema da familia Pereira engancha bastante. O que máis me chamou a atención é o mala e hipócrita que chega a ser a avoa Carme só para salvar as aparencias. O personaxe de Concha está moi ben construído: no canto de afundirse cando a botan da casa, marcha a Barcelona e búscase a vida usando os segredos dos ricos ao seu favor. Tamén me pareceu clave o contraste coa súa irmá Encarna, que queda na vila aguantando todo en silencio. En xeral, é unha novela que che fai ver como antes as familias tapaban calquera cousa polo que dirán.",
  },
  {
    id: "alvaro",
    name: "Álvaro Villar Gómez",
    role: "Alumno de 4º ESO · IES Arcebispo Xelmírez I",
    badge: "Ritmo Narrativo & Intriga",
    img: "/manus-storage/opinion-alvaro.jpg",
    blockColor: "#B45309",
    frameColor: "#451A03",
    accentColor: "#FDE68A",
    tagColor: "#F59E0B",
    rating: 5,
    quote:
      "A min o que máis me gustou do libro foi o fácil que se le. A historia empeza co problema do médico que non dá durmido, e ao principio non sabes moi ben por que, pero en canto empezan a investigar o pasado, a trama avanza soa. Dá moita rabia ler o que pasaba na escola con dona Remedios e o inxustos que foron con Concha na súa propia casa. Pero por iso mesmo o final é tan bo, cando descobres que a nena á que botaron da vila rematou convertida nunha fotógrafa de éxito en Barcelona. É un libro moi entretido e a intriga manténse ata a última páxina.",
  },
];

export default function OpinionSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="opinion"
      style={{
        position: "relative",
        padding: m ? "4.5rem 1rem 3.5rem" : "6.5rem 2rem 5.5rem",
        scrollMarginTop: "95px",
        backgroundColor: "#070A12",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto", position: "relative", zIndex: 10, width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: "#0F1E36",
            borderRadius: "22px",
            padding: m ? "2rem 1.4rem" : "3rem 3.5rem",
            marginBottom: m ? "1.5rem" : "2.5rem",
            display: "flex",
            flexDirection: m ? "column" : "row",
            alignItems: m ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            boxShadow: "0 18px 45px -10px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ maxWidth: "680px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#D97706",
                color: "#080E1A",
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
              <Sparkles size={13} color="#080E1A" />
              <span>Lecturas Literarias · 4º ESO</span>
            </div>

            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: m ? "2.2rem" : "3.4rem",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                margin: "0 0 1rem",
              }}
            >
              O NOSO VEREDICTO
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
              Dúas perspectivas críticas, un debate xeracional e unha mesma conclusión compartida. A historia da familia
              Pereira e a memoria de Concha deixan pegada.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#081324",
              borderRadius: "16px",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={24} color="#0A0E1A" />
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.45rem", fontWeight: 800, color: "#FFFFFF" }}>
                100%
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Recomendada
              </div>
            </div>
          </div>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: m ? "1.5rem" : "2.25rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "320px 1fr",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 18px 45px -8px rgba(0,0,0,0.55)",
            }}
          >
            <div
              style={{
                backgroundColor: opinions[0].frameColor,
                padding: m ? "1.5rem" : "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: m ? "120px" : "150px",
                  height: m ? "120px" : "150px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: `3px solid ${opinions[0].tagColor}`,
                  marginBottom: "1rem",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={opinions[0].img}
                  alt={opinions[0].name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  backgroundColor: "#064E3B",
                  color: opinions[0].accentColor,
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {opinions[0].badge}
              </div>

              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: "0 0 4px",
                }}
              >
                {opinions[0].name}
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  color: "#A7F3D0",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {opinions[0].role}
              </p>
            </div>

            <div
              style={{
                backgroundColor: opinions[0].blockColor,
                padding: m ? "1.75rem 1.4rem" : "2.75rem 3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[...Array(opinions[0].rating)].map((_, i) => (
                      <Star key={i} size={18} color="#FBBF24" fill="#FBBF24" />
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: opinions[0].accentColor,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Valoración: 5.0 / 5.0
                  </span>
                </div>

                <div style={{ position: "relative" }}>
                  <Quote
                    size={36}
                    color="#34D399"
                    style={{ opacity: 0.35, position: "absolute", top: "-10px", left: "-8px" }}
                  />
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: m ? "0.93rem" : "1.05rem",
                      lineHeight: 1.75,
                      color: "#ECFDF5",
                      margin: 0,
                      paddingLeft: "1.5rem",
                      fontWeight: 400,
                    }}
                  >
                    "{opinions[0].quote}"
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#022C22",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11.5px", color: "#A7F3D0", fontWeight: 600 }}>
                  Clave crítica: Hipocrisía familiar e personaxe de Concha
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#6EE7B7", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Lectura Finalizada
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 320px",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 18px 45px -8px rgba(0,0,0,0.55)",
            }}
          >
            <div
              style={{
                backgroundColor: opinions[1].blockColor,
                padding: m ? "1.75rem 1.4rem" : "2.75rem 3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.5rem",
                order: m ? 2 : 1,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[...Array(opinions[1].rating)].map((_, i) => (
                      <Star key={i} size={18} color="#FEF08A" fill="#FEF08A" />
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: opinions[1].accentColor,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Valoración: 5.0 / 5.0
                  </span>
                </div>

                <div style={{ position: "relative" }}>
                  <Quote
                    size={36}
                    color="#FDE68A"
                    style={{ opacity: 0.4, position: "absolute", top: "-10px", left: "-8px" }}
                  />
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: m ? "0.93rem" : "1.05rem",
                      lineHeight: 1.75,
                      color: "#FFFBEB",
                      margin: 0,
                      paddingLeft: "1.5rem",
                      fontWeight: 400,
                    }}
                  >
                    "{opinions[1].quote}"
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#451A03",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11.5px", color: "#FEF3C7", fontWeight: 600 }}>
                  Clave crítica: Intriga progresiva, inxustiza escolar e final audaz
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#FDE68A", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Lectura Finalizada
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: opinions[1].frameColor,
                padding: m ? "1.5rem" : "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                order: m ? 1 : 2,
              }}
            >
              <div
                style={{
                  width: m ? "120px" : "150px",
                  height: m ? "120px" : "150px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: `3px solid ${opinions[1].tagColor}`,
                  marginBottom: "1rem",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={opinions[1].img}
                  alt={opinions[1].name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  backgroundColor: "#B45309",
                  color: opinions[1].accentColor,
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {opinions[1].badge}
              </div>

              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: "0 0 4px",
                }}
              >
                {opinions[1].name}
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  color: "#FEF3C7",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {opinions[1].role}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
