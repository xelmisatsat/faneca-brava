import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MapPin, ArrowRight } from "lucide-react";

interface Milestone {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  desc: string;
  location: string;
  targetCity: "aldea" | "barcelona";
  inkColor: string;
}

const stages: Milestone[] = [
  {
    id: "01",
    numeral: "I",
    title: "A Opresión",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    location: "A vila na foz",
    targetCity: "aldea",
    inkColor: "#C5A880",
  },
  {
    id: "02",
    numeral: "II",
    title: "O Lume",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    location: "A Escola Parroquial",
    targetCity: "aldea",
    inkColor: "#C86A58",
  },
  {
    id: "03",
    numeral: "III",
    title: "O Desterro",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    location: "Aldea",
    targetCity: "aldea",
    inkColor: "#C98A53",
  },
  {
    id: "04",
    numeral: "IV",
    title: "A Lente Corsaria",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa no é a vítima; é a executora.",
    location: "Barcelona · Estudio e Redacción",
    targetCity: "barcelona",
    inkColor: "#6FA4B8",
  },
  {
    id: "05",
    numeral: "V",
    title: "O Remorso",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    location: "Santiago de Compostela",
    targetCity: "aldea",
    inkColor: "#9385B8",
  },
  {
    id: "06",
    numeral: "VI",
    title: "A Revelación",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    location: "O Cartafol de Lela",
    targetCity: "aldea",
    inkColor: "#6FA585",
  },
];

const aldeaPos: [number, number] = [42.8806, -8.5446];
const barcelonaPos: [number, number] = [41.3851, 2.1734];

const getCurvePoints = (start: [number, number], end: [number, number], offset: number = 3.5) => {
  const points: [number, number][] = [];
  const midLat = (start[0] + end[0]) / 2 + offset;
  const midLng = (start[1] + end[1]) / 2;

  for (let t = 0; t <= 1; t += 0.05) {
    const lat = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * midLat + t * t * end[0];
    const lng = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * midLng + t * t * end[1];
    points.push([lat, lng]);
  }
  return points;
};

const createEditorialMapPin = (active: boolean, label: string) =>
  L.divIcon({
    className: "editorial-pin-node",
    html: `<div style="position: relative;">
             <div style="width: 12px; height: 12px; border-radius: 50%; background: ${
               active ? "#C5A880" : "#7E8E9E"
             }; border: 2px solid #FFFFFF; position: absolute; top: -6px; left: -6px; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>
             <div style="position: absolute; top: 10px; left: -50%; transform: translateX(-20%); font-family: 'DM Sans', sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: ${
               active ? "#C5A880" : "#D4DEE8"
             }; background: #111822; padding: 2px 8px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.18); white-space: nowrap;">${label}</div>
           </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

export default function TimelineSection() {
  const [mounted, setMounted] = useState(false);
  const [activeStageId, setActiveStageId] = useState("01");
  const [activeCity, setActiveCity] = useState<"aldea" | "barcelona">("aldea");
  const m = useIsMobile();
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollToStage = (id: string, city: "aldea" | "barcelona") => {
    setActiveStageId(id);
    setActiveCity(city);
    const target = stageRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="timeline"
      style={{
        position: "relative",
        padding: m ? "4.5rem 0 4rem" : "7.5rem 0 7rem",
        backgroundColor: "#111822",
        color: "#F4EFE6",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: m ? "0 1.25rem" : "0 3.5rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: m ? "2.5rem" : "4rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "1px",
                backgroundColor: "#C5A880",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#C5A880",
              }}
            >
              CRÓNICA VITAL · ARQUIVO NARRATIVO
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: m ? "column" : "row",
              justifyContent: "space-between",
              alignItems: m ? "flex-start" : "flex-end",
              gap: "1.75rem",
              paddingBottom: "1.75rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.015em",
                  color: "#FAF6F0",
                  margin: 0,
                }}
              >
                A Liña do Tempo <span style={{ fontStyle: "italic", color: "#C5A880" }}>de Concha</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: m ? "1.02rem" : "1.14rem",
                  lineHeight: 1.75,
                  color: "#BAC7D5",
                  maxWidth: "680px",
                  marginTop: "0.85rem",
                  marginBottom: 0,
                }}
              >
                O itinerario vital e emocional de Concha Pereira. Un percorrido que vai dende a infancia ferida na vila
                ata a súa liberación e resistencia a través da fotografía en Barcelona.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: m ? "flex-start" : "flex-end",
                gap: "4px",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                  fontSize: "1.65rem",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: "#C5A880",
                }}
              >
                Aldea ↔ Barcelona
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#8393A6",
                }}
              >
                Percorrido narrativo · 1.050 km
              </span>
            </div>
          </div>
        </motion.div>

        <div
          style={{
            marginBottom: m ? "2.5rem" : "3.5rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: "4px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: m ? "1.25rem" : "2.25rem",
              minWidth: m ? "max-content" : "100%",
              justifyContent: m ? "flex-start" : "space-between",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: "1rem",
            }}
          >
            {stages.map((st) => {
              const active = activeStageId === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => scrollToStage(st.id, st.targetCity)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                      fontSize: "1.35rem",
                      fontWeight: 400,
                      color: active ? "#C5A880" : "#687A8E",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {st.numeral}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "15px",
                      fontWeight: active ? 600 : 400,
                      color: active ? "#FAF6F0" : "#94A3B4",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {st.title}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="editorialActiveSpine"
                      style={{
                        position: "absolute",
                        bottom: "-1rem",
                        left: 0,
                        right: 0,
                        height: "1.5px",
                        backgroundColor: "#C5A880",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: m ? "1fr" : "460px 1fr",
            gap: m ? "3.5rem" : "4.5rem",
            alignItems: "start",
          }}
        >
          <div
            style={{
              position: m ? "relative" : "sticky",
              top: m ? "0" : "5.5rem",
              order: m ? 2 : 1,
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.85rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#C5A880",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#FAF6F0",
                    }}
                  >
                    Cartografía Narrativa
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "#8393A6",
                  }}
                >
                  Aldea ↔ Barcelona · 1.050 km
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: "8px",
                }}
              >
                <button
                  onClick={() => setActiveCity("aldea")}
                  style={{
                    background: activeCity === "aldea" ? "rgba(197, 168, 128, 0.15)" : "transparent",
                    color: activeCity === "aldea" ? "#C5A880" : "#8A9AA9",
                    border: "1px solid",
                    borderColor: activeCity === "aldea" ? "#C5A880" : "rgba(255, 255, 255, 0.1)",
                    borderRadius: "2px",
                    padding: "6px 14px",
                    fontSize: "12.5px",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <MapPin size={12} color={activeCity === "aldea" ? "#C5A880" : "#8A9AA9"} />
                  Aldea (Galicia)
                </button>
                <button
                  onClick={() => setActiveCity("barcelona")}
                  style={{
                    background: activeCity === "barcelona" ? "rgba(197, 168, 128, 0.15)" : "transparent",
                    color: activeCity === "barcelona" ? "#C5A880" : "#8A9AA9",
                    border: "1px solid",
                    borderColor: activeCity === "barcelona" ? "#C5A880" : "rgba(255, 255, 255, 0.1)",
                    borderRadius: "2px",
                    padding: "6px 14px",
                    fontSize: "12.5px",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <MapPin size={12} color={activeCity === "barcelona" ? "#C5A880" : "#8A9AA9"} />
                  Barcelona (Cataluña)
                </button>
              </div>
            </div>

            <div
              style={{
                height: m ? "290px" : "350px",
                borderRadius: "3px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                position: "relative",
              }}
            >
              {mounted && (
                <MapContainer
                  center={[42.2, -3.2]}
                  zoom={m ? 4.9 : 5.3}
                  scrollWheelZoom={false}
                  attributionControl={false}
                  zoomControl={false}
                  style={{ height: "100%", width: "100%", background: "#0F1620" }}
                >
                  <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
                  <Polyline
                    positions={getCurvePoints(aldeaPos, barcelonaPos)}
                    pathOptions={{
                      color: "#C5A880",
                      weight: 2,
                      dashArray: "5, 7",
                      opacity: 0.85,
                    }}
                  />
                  <Marker
                    position={aldeaPos}
                    icon={createEditorialMapPin(activeCity === "aldea", "ALDEA")}
                    eventHandlers={{ click: () => setActiveCity("aldea") }}
                  />
                  <Marker
                    position={barcelonaPos}
                    icon={createEditorialMapPin(activeCity === "barcelona", "BARCELONA")}
                    eventHandlers={{ click: () => setActiveCity("barcelona") }}
                  />
                </MapContainer>
              )}
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                padding: "16px 20px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderLeft: "2px solid #C5A880",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#C5A880",
                  }}
                >
                  {activeCity === "aldea" ? "EIXO TERRITORIAL · ALDEA" : "EIXO TERRITORIAL · BARCELONA"}
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "12px",
                    color: "#8393A6",
                  }}
                >
                  {activeCity === "aldea" ? "Galicia" : "Cataluña"}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  lineHeight: 1.7,
                  color: "#CBD5E1",
                  margin: 0,
                }}
              >
                {activeCity === "aldea"
                  ? "Escenario da infancia reprimida, a escola de dona Remedios, o estigma familiar de Mamá Carme e as posteriores pescudas médicas do doutor Fernando Pereira no presente."
                  : "Refuxio e renacemento de Concha. A urbe cosmopolita onde adquire a súa Leica e convértese na fotógrafa corsaria que axusta contas coa hipocrisía da burguesía."}
              </p>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              order: m ? 1 : 2,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: m ? "12px" : "16px",
                width: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: m ? "2.75rem" : "3.75rem" }}>
              {stages.map((st) => {
                const isSelected = activeStageId === st.id;

                return (
                  <div
                    key={st.id}
                    ref={(el) => {
                      stageRefs.current[st.id] = el;
                    }}
                    style={{
                      position: "relative",
                      paddingLeft: m ? "38px" : "50px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: m ? "8px" : "12px",
                        top: "10px",
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        backgroundColor: isSelected ? "#C5A880" : "#1B2430",
                        border: `1.5px solid ${isSelected ? "#C5A880" : "#556475"}`,
                        transition: "all 0.25s ease",
                      }}
                    />

                    <div
                      onClick={() => {
                        setActiveStageId(st.id);
                        setActiveCity(st.targetCity);
                      }}
                      style={{
                        paddingBottom: "1.75rem",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "0.35rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: isSelected ? "#C5A880" : "#7A8B9C",
                          }}
                        >
                          ACTA {st.numeral}
                        </span>
                        <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>·</span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#8FA0B2",
                          }}
                        >
                          {st.location}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                          fontSize: m ? "1.95rem" : "2.4rem",
                          fontWeight: 400,
                          lineHeight: 1.15,
                          letterSpacing: "-0.015em",
                          color: "#FAF6F0",
                          margin: "0 0 0.35rem 0",
                        }}
                      >
                        {st.title}
                      </h3>

                      <h4
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontStyle: "italic",
                          fontSize: m ? "1.05rem" : "1.15rem",
                          fontWeight: 400,
                          color: "#C5A880",
                          margin: "0 0 0.85rem 0",
                        }}
                      >
                        {st.subtitle}
                      </h4>

                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: m ? "0.98rem" : "1.06rem",
                          fontWeight: 300,
                          lineHeight: 1.82,
                          color: "#BAC7D5",
                          margin: 0,
                        }}
                      >
                        {st.desc}
                      </p>

                      <div
                        style={{
                          marginTop: "1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: isSelected ? "#C5A880" : "#687A8E",
                          fontSize: "12px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          transition: "color 0.2s ease",
                        }}
                      >
                        <span>Ver no mapa</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
