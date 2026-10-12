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
  accent: string;
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
    accent: "#C8A96E",
  },
  {
    id: "02",
    stageName: "II · A Ruptura",
    title: "O Lume",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    location: "A Escola Parroquial",
    targetCity: "galicia",
    accent: "#E07A5F",
  },
  {
    id: "03",
    stageName: "III · O Exilio",
    title: "O Desterro",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    location: "Aldea",
    targetCity: "galicia",
    accent: "#D4924A",
  },
  {
    id: "04",
    stageName: "IV · A Metamorfose",
    title: "A Lente Corsaria",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa no é a vítima; é a executora.",
    location: "Barcelona · Estudio e Redacción",
    targetCity: "barcelona",
    accent: "#7CA8C2",
  },
  {
    id: "05",
    stageName: "V · A Culpa",
    title: "O Remorso",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    location: "Santiago de Compostela",
    targetCity: "galicia",
    accent: "#9381FF",
  },
  {
    id: "06",
    stageName: "VI · A Verdade",
    title: "A Revelación",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    location: "O Cartafol de Lela",
    targetCity: "galicia",
    accent: "#8BB49E",
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
             <div style="width: 16px; height: 16px; border-radius: 50%; background: ${
               active ? "#C8A96E" : "#4A627A"
             }; border: 2px solid #FFFFFF; box-shadow: 0 0 12px ${
               active ? "rgba(200, 169, 110, 0.6)" : "rgba(0,0,0,0.5)"
             }; position: absolute; top: -8px; left: -8px;"></div>
             <div style="position: absolute; top: 12px; left: -50%; transform: translateX(-20%); font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: ${
               active ? "#C8A96E" : "#D2DCED"
             }; background: #131E2A; padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 4px 10px rgba(0,0,0,0.4); white-space: nowrap;">${label}</div>
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
        background: "linear-gradient(180deg, #131E2B 0%, #172434 45%, #131E2B 100%)",
        color: "#F4EFE6",
        borderTop: "1px solid rgba(200, 169, 110, 0.15)",
        borderBottom: "1px solid rgba(200, 169, 110, 0.15)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "450px",
          background: "radial-gradient(ellipse at center, rgba(200, 169, 110, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: m ? "0 1.25rem" : "0 3rem",
          position: "relative",
          zIndex: 1,
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
                width: "28px",
                height: "2px",
                backgroundColor: "#C8A96E",
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "14px",
                letterSpacing: "0.12em",
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
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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
                  color: "#FAF6EF",
                  margin: 0,
                }}
              >
                A Liña do Tempo <span style={{ fontStyle: "italic", color: "#C8A96E" }}>de Concha</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: m ? "1rem" : "1.12rem",
                  lineHeight: 1.75,
                  color: "#B4C2D4",
                  maxWidth: "660px",
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
                    fontSize: "1.85rem",
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
                    color: "#94A5BC",
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
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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
                      fontSize: "1.35rem",
                      fontWeight: 400,
                      color: active ? "#C8A96E" : "#72859D",
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
                      color: active ? "#FAF6EF" : "#94A5BC",
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
            gap: m ? "3rem" : "4rem",
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
                width: "2px",
                background: "linear-gradient(180deg, rgba(200, 169, 110, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: m ? "2.5rem" : "3.5rem" }}>
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
                        top: "10px",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: isSelected ? "#C8A96E" : "#1A2838",
                        border: `2px solid ${isSelected ? "#C8A96E" : "#576E87"}`,
                        boxShadow: isSelected ? "0 0 10px rgba(200, 169, 110, 0.5)" : "none",
                        transition: "all 0.25s ease",
                      }}
                    />

                    <div
                      style={{
                        background: isSelected ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.015)",
                        border: "1px solid",
                        borderColor: isSelected ? "rgba(200, 169, 110, 0.3)" : "rgba(255, 255, 255, 0.06)",
                        borderRadius: "14px",
                        padding: m ? "18px 16px" : "26px 30px",
                        borderLeft: `4px solid ${st.accent}`,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontStyle: "italic",
                            fontSize: "13.5px",
                            fontWeight: 400,
                            color: st.accent,
                          }}
                        >
                          {st.stageName}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12.5px",
                            fontWeight: 400,
                            color: "#AABCCC",
                          }}
                        >
                          <MapPin size={12} color={st.accent} />
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
                          color: "#FAF6EF",
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
                          color: st.accent,
                          margin: "0 0 0.85rem 0",
                        }}
                      >
                        {st.subtitle}
                      </h4>

                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: m ? "0.96rem" : "1.05rem",
                          fontWeight: 300,
                          lineHeight: 1.8,
                          color: "#D2DCED",
                          margin: 0,
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
                    color: "#94A5BC",
                  }}
                >
                  Foz / Santiago ↔ Barcelona
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: "8px",
                }}
              >
                <button
                  onClick={() => setActiveCity("galicia")}
                  style={{
                    background: activeCity === "galicia" ? "rgba(200, 169, 110, 0.2)" : "rgba(255, 255, 255, 0.03)",
                    color: activeCity === "galicia" ? "#C8A96E" : "#AABCCC",
                    border: "1px solid",
                    borderColor: activeCity === "galicia" ? "#C8A96E" : "rgba(255,255,255,0.12)",
                    borderRadius: "6px",
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
                  <MapPin size={12} color="#C8A96E" />
                  Galicia
                </button>
                <button
                  onClick={() => setActiveCity("barcelona")}
                  style={{
                    background: activeCity === "barcelona" ? "rgba(200, 169, 110, 0.2)" : "rgba(255, 255, 255, 0.03)",
                    color: activeCity === "barcelona" ? "#C8A96E" : "#AABCCC",
                    border: "1px solid",
                    borderColor: activeCity === "barcelona" ? "#C8A96E" : "rgba(255,255,255,0.12)",
                    borderRadius: "6px",
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
                  <Navigation size={12} color="#C8A96E" />
                  Barcelona
                </button>
              </div>
            </div>

            <div
              style={{
                height: m ? "280px" : "340px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(200, 169, 110, 0.25)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
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
                  style={{ height: "100%", width: "100%", background: "#101923" }}
                >
                  <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
                  <Polyline
                    positions={getCurvePoints(galiciaPos, barcelonaPos)}
                    pathOptions={{
                      color: "#C8A96E",
                      weight: 2.5,
                      dashArray: "5, 7",
                      opacity: 0.85,
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
