import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MapPin, Navigation, Sparkles } from "lucide-react";

interface Milestone {
  id: string;
  stageName: string;
  title: string;
  subtitle: string;
  desc: string;
  location: string;
  targetCity: "aldea" | "barcelona";
  accent: string;
  accentBg: string;
  tagColor: string;
}

const stages: Milestone[] = [
  {
    id: "01",
    stageName: "I · A Orixe",
    title: "A Opresión",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    location: "A vila na foz",
    targetCity: "aldea",
    accent: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.12)",
    tagColor: "#FBBF24",
  },
  {
    id: "02",
    stageName: "II · A Ruptura",
    title: "O Lume",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    location: "A Escola Parroquial",
    targetCity: "aldea",
    accent: "#EF4444",
    accentBg: "rgba(239, 68, 68, 0.12)",
    tagColor: "#F87171",
  },
  {
    id: "03",
    stageName: "III · O Exilio",
    title: "O Desterro",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    location: "Aldea",
    targetCity: "aldea",
    accent: "#F97316",
    accentBg: "rgba(249, 115, 22, 0.12)",
    tagColor: "#FB923C",
  },
  {
    id: "04",
    stageName: "IV · A Metamorfose",
    title: "A Lente Corsaria",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa no é a vítima; é a executora.",
    location: "Barcelona · Estudio e Redacción",
    targetCity: "barcelona",
    accent: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.12)",
    tagColor: "#22D3EE",
  },
  {
    id: "05",
    stageName: "V · A Culpa",
    title: "O Remorso",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    location: "Santiago de Compostela",
    targetCity: "aldea",
    accent: "#A855F7",
    accentBg: "rgba(168, 85, 247, 0.12)",
    tagColor: "#C084FC",
  },
  {
    id: "06",
    stageName: "VI · A Verdade",
    title: "A Revelación",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    location: "O Cartafol de Lela",
    targetCity: "aldea",
    accent: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    tagColor: "#34D399",
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

const createMapPin = (active: boolean, label: string) =>
  L.divIcon({
    className: "map-pin-marker",
    html: `<div style="position: relative;">
             <div style="width: 16px; height: 16px; border-radius: 50%; background: ${
               active ? "#F59E0B" : "#38BDF8"
             }; border: 2.5px solid #FFFFFF; box-shadow: 0 0 14px ${
               active ? "rgba(245, 158, 11, 0.8)" : "rgba(56, 189, 248, 0.6)"
             }; position: absolute; top: -8px; left: -8px;"></div>
             <div style="position: absolute; top: 12px; left: -50%; transform: translateX(-20%); font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: ${
               active ? "#FBBF24" : "#E2E8F0"
             }; background: #132235; padding: 3px 9px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.22); box-shadow: 0 4px 12px rgba(0,0,0,0.5); white-space: nowrap;">${label}</div>
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
        padding: m ? "4.5rem 0 4rem" : "7rem 0 6.5rem",
        background: "linear-gradient(165deg, #18283B 0%, #1F344D 45%, #18283B 100%)",
        color: "#F8FAFC",
        borderTop: "1px solid rgba(245, 158, 11, 0.2)",
        borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "20%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "650px",
          height: "650px",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1320px",
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
          style={{ marginBottom: m ? "2.5rem" : "3.75rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "999px",
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              marginBottom: "1rem",
            }}
          >
            <Sparkles size={14} color="#FBBF24" />
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "13.5px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#FDE68A",
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
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(2.6rem, 5.2vw, 4.8rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  color: "#FFFFFF",
                  margin: 0,
                  textShadow: "0 2px 14px rgba(0, 0, 0, 0.35)",
                }}
              >
                A Liña do Tempo <span style={{ fontStyle: "italic", color: "#FBBF24" }}>de Concha</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: m ? "1.02rem" : "1.15rem",
                  lineHeight: 1.75,
                  color: "#CBD5E1",
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
                alignItems: "center",
                gap: "1.25rem",
                flexShrink: 0,
                background: "rgba(255, 255, 255, 0.05)",
                padding: "10px 18px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: "#FBBF24",
                  }}
                >
                  Aldea ↔ Barcelona
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#38BDF8",
                  }}
                >
                  Percorrido narrativo · 1.050 km
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
            paddingBottom: "6px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: m ? "1.25rem" : "2rem",
              minWidth: m ? "max-content" : "100%",
              justifyContent: m ? "flex-start" : "space-between",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
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
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      color: active ? st.accent : "#94A3B8",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {st.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "16px",
                      fontWeight: active ? 600 : 400,
                      color: active ? "#FFFFFF" : "#CBD5E1",
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
                        bottom: "-1rem",
                        left: 0,
                        right: 0,
                        height: "2.5px",
                        backgroundColor: st.accent,
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
            gridTemplateColumns: m ? "1fr" : "480px 1fr",
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
                  <MapPin size={17} color="#F59E0B" />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#F8FAFC",
                    }}
                  >
                    Mapa de Operacións
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#38BDF8",
                  }}
                >
                  Aldea ↔ Barcelona · 1.050 km
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                  paddingBottom: "10px",
                }}
              >
                <button
                  onClick={() => setActiveCity("aldea")}
                  style={{
                    background: activeCity === "aldea" ? "#F59E0B" : "rgba(255, 255, 255, 0.06)",
                    color: activeCity === "aldea" ? "#0F172A" : "#E2E8F0",
                    border: "1px solid",
                    borderColor: activeCity === "aldea" ? "#F59E0B" : "rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    padding: "7px 16px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <MapPin size={13} color={activeCity === "aldea" ? "#0F172A" : "#F59E0B"} />
                  Aldea (Galicia)
                </button>
                <button
                  onClick={() => setActiveCity("barcelona")}
                  style={{
                    background: activeCity === "barcelona" ? "#06B6D4" : "rgba(255, 255, 255, 0.06)",
                    color: activeCity === "barcelona" ? "#0F172A" : "#E2E8F0",
                    border: "1px solid",
                    borderColor: activeCity === "barcelona" ? "#06B6D4" : "rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    padding: "7px 16px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Navigation size={13} color={activeCity === "barcelona" ? "#0F172A" : "#38BDF8"} />
                  Barcelona (Cataluña)
                </button>
              </div>
            </div>

            <div
              style={{
                height: m ? "300px" : "360px",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                boxShadow: "0 14px 35px rgba(0, 0, 0, 0.4)",
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
                    positions={getCurvePoints(aldeaPos, barcelonaPos)}
                    pathOptions={{
                      color: "#F59E0B",
                      weight: 3,
                      dashArray: "6, 8",
                      opacity: 0.9,
                    }}
                  />
                  <Marker
                    position={aldeaPos}
                    icon={createMapPin(activeCity === "aldea", "ALDEA")}
                    eventHandlers={{ click: () => setActiveCity("aldea") }}
                  />
                  <Marker
                    position={barcelonaPos}
                    icon={createMapPin(activeCity === "barcelona", "BARCELONA")}
                    eventHandlers={{ click: () => setActiveCity("barcelona") }}
                  />
                </MapContainer>
              )}
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                padding: "16px 20px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
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
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: activeCity === "aldea" ? "#FBBF24" : "#22D3EE",
                  }}
                >
                  {activeCity === "aldea" ? "EIXO TERRITORIAL · ALDEA" : "EIXO TERRITORIAL · BARCELONA"}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#E2E8F0",
                  }}
                >
                  {activeCity === "aldea" ? "Galicia" : "Cataluña"}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  lineHeight: 1.68,
                  color: "#E2E8F0",
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
                left: m ? "14px" : "20px",
                width: "2px",
                background: "linear-gradient(180deg, rgba(245, 158, 11, 0.6) 0%, rgba(6, 182, 212, 0.6) 100%)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: m ? "2.25rem" : "3.25rem" }}>
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
                      paddingLeft: m ? "42px" : "56px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: m ? "8px" : "14px",
                        top: "12px",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: isSelected ? st.accent : "#1E2F46",
                        border: `2.5px solid ${isSelected ? "#FFFFFF" : st.accent}`,
                        boxShadow: isSelected ? `0 0 14px ${st.accent}` : "none",
                        transition: "all 0.25s ease",
                      }}
                    />

                    <div
                      onClick={() => {
                        setActiveStageId(st.id);
                        setActiveCity(st.targetCity);
                      }}
                      style={{
                        background: isSelected ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.035)",
                        border: "1px solid",
                        borderColor: isSelected ? st.accent : "rgba(255, 255, 255, 0.1)",
                        borderRadius: "14px",
                        padding: m ? "20px 18px" : "26px 30px",
                        borderLeft: `5px solid ${st.accent}`,
                        boxShadow: isSelected ? `0 12px 28px rgba(0, 0, 0, 0.35)` : "0 6px 18px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "0.45rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontStyle: "italic",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: st.tagColor,
                          }}
                        >
                          {st.stageName}
                        </span>
                        <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>·</span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#E2E8F0",
                          }}
                        >
                          <MapPin size={12} color={st.accent} />
                          {st.location}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "'Prata', 'Playfair Display', Georgia, serif",
                          fontSize: m ? "2rem" : "2.45rem",
                          fontWeight: 400,
                          lineHeight: 1.15,
                          letterSpacing: "-0.01em",
                          color: "#FFFFFF",
                          margin: "0 0 0.3rem 0",
                        }}
                      >
                        {st.title}
                      </h3>

                      <h4
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontStyle: "italic",
                          fontSize: m ? "1.08rem" : "1.18rem",
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
                          fontSize: m ? "0.98rem" : "1.06rem",
                          fontWeight: 300,
                          lineHeight: 1.8,
                          color: "#E2E8F0",
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
        </div>
      </div>
    </section>
  );
}
