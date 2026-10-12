import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MapPin, Navigation } from "lucide-react";

interface Milestone {
  id: string;
  stageName: string;
  title: string;
  subtitle: string;
  desc: string;
  location: string;
  targetCity: "galicia" | "barcelona";
}

const stages: Milestone[] = [
  {
    id: "01",
    stageName: "I · A Orixe",
    title: "A Opresión",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    location: "A vila na foz",
    targetCity: "galicia",
  },
  {
    id: "02",
    stageName: "II · A Ruptura",
    title: "O Lume",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    location: "A Escola Parroquial",
    targetCity: "galicia",
  },
  {
    id: "03",
    stageName: "III · O Exilio",
    title: "O Desterro",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    location: "Aldea",
    targetCity: "galicia",
  },
  {
    id: "04",
    stageName: "IV · A Metamorfose",
    title: "A Lente Corsaria",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa no é a vítima; é a executora.",
    location: "Barcelona · Estudio e Redacción",
    targetCity: "barcelona",
  },
  {
    id: "05",
    stageName: "V · A Culpa",
    title: "O Remorso",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    location: "Santiago de Compostela",
    targetCity: "galicia",
  },
  {
    id: "06",
    stageName: "VI · A Verdade",
    title: "A Revelación",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    location: "O Cartafol de Lela",
    targetCity: "galicia",
  },
];

const galiciaPos: [number, number] = [42.8806, -8.5446];
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

const createMapPin = (active: boolean, label: string) =>
  L.divIcon({
    className: "map-pin-marker",
    html: `<div style="position: relative;">
             <div style="width: 14px; height: 14px; border-radius: 50%; background: ${
               active ? "#C8A96E" : "#475569"
             }; border: 2px solid #FFFFFF; box-shadow: 0 0 10px rgba(0,0,0,0.6); position: absolute; top: -7px; left: -7px;"></div>
             <div style="position: absolute; top: 10px; left: -50%; transform: translateX(-20%); font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: ${
               active ? "#C8A96E" : "#94A3B8"
             }; background: #0E141D; padding: 2px 7px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); white-space: nowrap;">${label}</div>
           </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

export default function TimelineSection() {
  const [mounted, setMounted] = useState(false);
  const [activeStageId, setActiveStageId] = useState("01");
  const [activeCity, setActiveCity] = useState<"galicia" | "barcelona">("galicia");
  const m = useIsMobile();
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollToStage = (id: string, city: "galicia" | "barcelona") => {
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
        padding: m ? "4.5rem 0 4rem" : "7rem 0 6.5rem",
        backgroundColor: "#0D131D",
        color: "#F1EBDD",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: m ? "0 1.25rem" : "0 3rem",
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
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "0.85rem",
            }}
          >
            <span
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: "#C8A96E",
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.15em",
                color: "#C8A96E",
              }}
            >
              Cronoloxía da memoria
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: m ? "column" : "row",
              justifyContent: "space-between",
              alignItems: m ? "flex-start" : "flex-end",
              gap: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(2.5rem, 5vw, 4.6rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.01em",
                  color: "#F1EBDD",
                  margin: 0,
                }}
              >
                A Liña do Tempo <span style={{ fontStyle: "italic", color: "#C8A96E" }}>de Concha</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: m ? "1rem" : "1.1rem",
                  lineHeight: 1.7,
                  color: "#A0ABBA",
                  maxWidth: "640px",
                  marginTop: "0.75rem",
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
                alignItems: "center",
                gap: "1.25rem",
                flexShrink: 0,
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                    fontSize: "1.8rem",
                    fontWeight: 400,
                    lineHeight: 1,
                    color: "#C8A96E",
                  }}
                >
                  Galicia ↔ Barcelona
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                    color: "#78879B",
                  }}
                >
                  Percorrido narrativo
                </span>
              </div>
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
              gap: m ? "1.25rem" : "2rem",
              minWidth: m ? "max-content" : "100%",
              justifyContent: m ? "flex-start" : "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "0.85rem",
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
                      fontSize: "1.3rem",
                      fontWeight: 400,
                      color: active ? "#C8A96E" : "#64748B",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {st.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "15px",
                      fontWeight: active ? 600 : 400,
                      color: active ? "#F1EBDD" : "#8090A4",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {st.title}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="timelineActiveIndicator"
                      style={{
                        position: "absolute",
                        bottom: "-0.85rem",
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "#C8A96E",
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
            gridTemplateColumns: m ? "1fr" : "1fr 440px",
            gap: m ? "3.5rem" : "4.5rem",
            alignItems: "start",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: m ? "14px" : "20px",
                width: "1px",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: m ? "3.25rem" : "4.5rem" }}>
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
                      paddingLeft: m ? "42px" : "58px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: m ? "8px" : "14px",
                        top: "8px",
                        width: "13px",
                        height: "13px",
                        borderRadius: "50%",
                        backgroundColor: isSelected ? "#C8A96E" : "#1A2534",
                        border: `2px solid ${isSelected ? "#C8A96E" : "#4A5B70"}`,
                        transition: "all 0.25s ease",
                      }}
                    />

                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "0.35rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontStyle: "italic",
                            fontSize: "13px",
                            fontWeight: 400,
                            color: isSelected ? "#C8A96E" : "#8090A4",
                          }}
                        >
                          {st.stageName}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#94A3B8",
                          }}
                        >
                          <MapPin size={12} color="#C8A96E" />
                          {st.location}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                          fontSize: m ? "1.9rem" : "2.4rem",
                          fontWeight: 400,
                          lineHeight: 1.15,
                          letterSpacing: "-0.01em",
                          color: "#F1EBDD",
                          margin: "0 0 0.25rem 0",
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
                          color: "#C8A96E",
                          margin: "0 0 0.85rem 0",
                        }}
                      >
                        {st.subtitle}
                      </h4>

                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: m ? "0.96rem" : "1.04rem",
                          fontWeight: 300,
                          lineHeight: 1.8,
                          color: "#CAD3DF",
                          margin: 0,
                          maxWidth: "620px",
                        }}
                      >
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              position: m ? "relative" : "sticky",
              top: m ? "0" : "6rem",
            }}
          >
            <div style={{ marginBottom: "0.85rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#C8A96E",
                  }}
                >
                  Mapa do Percorrido
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "#78879B",
                  }}
                >
                  Foz / Santiago ↔ Barcelona
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  paddingBottom: "8px",
                }}
              >
                <button
                  onClick={() => setActiveCity("galicia")}
                  style={{
                    background: activeCity === "galicia" ? "rgba(200, 169, 110, 0.15)" : "transparent",
                    color: activeCity === "galicia" ? "#C8A96E" : "#8090A4",
                    border: "1px solid",
                    borderColor: activeCity === "galicia" ? "#C8A96E" : "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    padding: "5px 12px",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <MapPin size={12} color="#C8A96E" />
                  Galicia
                </button>
                <button
                  onClick={() => setActiveCity("barcelona")}
                  style={{
                    background: activeCity === "barcelona" ? "rgba(200, 169, 110, 0.15)" : "transparent",
                    color: activeCity === "barcelona" ? "#C8A96E" : "#8090A4",
                    border: "1px solid",
                    borderColor: activeCity === "barcelona" ? "#C8A96E" : "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    padding: "5px 12px",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Navigation size={12} color="#C8A96E" />
                  Barcelona
                </button>
              </div>
            </div>

            <div
              style={{
                height: m ? "280px" : "340px",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
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
                  style={{ height: "100%", width: "100%", background: "#0B111A" }}
                >
                  <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
                  <Polyline
                    positions={getCurvePoints(galiciaPos, barcelonaPos)}
                    pathOptions={{
                      color: "#C8A96E",
                      weight: 2,
                      dashArray: "5, 7",
                      opacity: 0.8,
                    }}
                  />
                  <Marker
                    position={galiciaPos}
                    icon={createMapPin(activeCity === "galicia", "GALICIA")}
                    eventHandlers={{ click: () => setActiveCity("galicia") }}
                  />
                  <Marker
                    position={barcelonaPos}
                    icon={createMapPin(activeCity === "barcelona", "BARCELONA")}
                    eventHandlers={{ click: () => setActiveCity("barcelona") }}
                  />
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
