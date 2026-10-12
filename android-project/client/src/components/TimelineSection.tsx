import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MapPin, Compass, ArrowRight, Navigation } from "lucide-react";

interface Milestone {
  id: string;
  year: string;
  label: string;
  subtitle: string;
  desc: string;
  location: string;
  tag: string;
  accent: string;
  targetCity: "galicia" | "barcelona";
  dateRange: string;
}

const stages: Milestone[] = [
  {
    id: "01",
    year: "1948",
    label: "A OPRESIÓN",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    location: "Vila de Foz · A Mariña",
    tag: "A Orixe",
    accent: "#B45309",
    targetCity: "galicia",
    dateRange: "Outono de 1948",
  },
  {
    id: "02",
    year: "1952",
    label: "O LUME",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    location: "A Escola Parroquial",
    tag: "A Ruptura",
    accent: "#DC2626",
    targetCity: "galicia",
    dateRange: "Inverno de 1952",
  },
  {
    id: "03",
    year: "1954",
    label: "O DESTERRO",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    location: "Porto de Foz",
    tag: "O Exilio",
    accent: "#9A3412",
    targetCity: "galicia",
    dateRange: "Primavera de 1954",
  },
  {
    id: "04",
    year: "1965",
    label: "A LENTE CORSARIA",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa no é a vítima; é a executora.",
    location: "Barcelona · Estudi & Redacción",
    tag: "A Vinganza",
    accent: "#0D9488",
    targetCity: "barcelona",
    dateRange: "Anos 1960 — 1970",
  },
  {
    id: "05",
    year: "1976",
    label: "O REMORSO",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    location: "Santiago de Compostela",
    tag: "A Culpa",
    accent: "#2563EB",
    targetCity: "galicia",
    dateRange: "Presente Clínico",
  },
  {
    id: "06",
    year: "1978",
    label: "A REVELACIÓN",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    location: "O Cartafol de Lela",
    tag: "A Verdade",
    accent: "#059669",
    targetCity: "galicia",
    dateRange: "Feche do Cartafol",
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

const createEditorialPin = (active: boolean, label: string) =>
  L.divIcon({
    className: "editorial-pin",
    html: `<div style="position: relative;">
             <div style="width: 18px; height: 18px; border-radius: 50%; background: ${
               active ? "#B45309" : "#0F172A"
             }; border: 3px solid #FFFFFF; box-shadow: 0 4px 14px rgba(15,23,42,0.25); position: absolute; top: -9px; left: -9px;"></div>
             <div style="position: absolute; top: 12px; left: -50%; transform: translateX(-20%); font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: ${
               active ? "#B45309" : "#0F172A"
             }; background: #FFFFFF; padding: 2px 8px; border-radius: 999px; box-shadow: 0 2px 8px rgba(15,23,42,0.1); border: 1px solid #E2E8F0; white-space: nowrap;">${label}</div>
           </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

export default function TimelineSection() {
  const [mounted, setMounted] = useState(false);
  const [activeStageId, setActiveStageId] = useState("01");
  const [activeCity, setActiveCity] = useState<"galicia" | "barcelona">("galicia");
  const m = useIsMobile();
  const milestoneRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollToMilestone = (id: string, city: "galicia" | "barcelona") => {
    setActiveStageId(id);
    setActiveCity(city);
    const target = milestoneRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const activeMilestone = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <section
      id="timeline"
      style={{
        position: "relative",
        padding: m ? "4.5rem 0 4rem" : "7.5rem 0 7rem",
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: m ? "0 1.25rem" : "0 3rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: m ? "2.5rem" : "4.5rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "1px",
                backgroundColor: "#B45309",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#B45309",
              }}
            >
              CRONOLOXÍA HISTÓRICA · 1948 — 1978
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
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "#0F172A",
                  margin: 0,
                }}
              >
                A Liña do Tempo <span style={{ fontStyle: "italic", color: "#B45309", fontWeight: 400 }}>de Concha</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: m ? "1rem" : "1.15rem",
                  lineHeight: 1.7,
                  color: "#475569",
                  maxWidth: "680px",
                  marginTop: "0.85rem",
                  marginBottom: 0,
                }}
              >
                Tres décadas de memoria, resistencia e desenlace. A transformación íntima desde a infancia asfixiada na
                posguerra de Foz ata a independencia e o desquite corsario en Barcelona.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                flexShrink: 0,
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#0F172A",
                  }}
                >
                  30 Anos
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#64748B",
                  }}
                >
                  1948 — 1978
                </span>
              </div>
              <div
                style={{
                  width: "1px",
                  height: "36px",
                  backgroundColor: "#CBD5E1",
                }}
              />
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#B45309",
                  }}
                >
                  1.050 km
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#64748B",
                  }}
                >
                  Foz ↔ Barcelona
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
              gap: m ? "1rem" : "2rem",
              minWidth: m ? "max-content" : "100%",
              justifyContent: m ? "flex-start" : "space-between",
              borderBottom: "1px solid #E2E8F0",
              paddingBottom: "1rem",
            }}
          >
            {stages.map((st) => {
              const active = activeStageId === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => scrollToMilestone(st.id, st.targetCity)}
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
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.4rem",
                      fontWeight: active ? 700 : 400,
                      color: active ? "#B45309" : "#94A3B8",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {st.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: active ? 700 : 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: active ? "#0F172A" : "#64748B",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {st.year} · {st.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="editorialActiveTab"
                      style={{
                        position: "absolute",
                        bottom: "-1rem",
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "#B45309",
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
            gridTemplateColumns: m ? "1fr" : "1fr 480px",
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
                left: m ? "16px" : "24px",
                width: "1px",
                backgroundColor: "#E2E8F0",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: m ? "3rem" : "4.5rem" }}>
              {stages.map((st) => {
                const isSelected = activeStageId === st.id;

                return (
                  <div
                    key={st.id}
                    ref={(el) => {
                      milestoneRefs.current[st.id] = el;
                    }}
                    style={{
                      position: "relative",
                      paddingLeft: m ? "46px" : "68px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: m ? "9px" : "17px",
                        top: "6px",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: isSelected ? "#B45309" : "#FFFFFF",
                        border: `2px solid ${isSelected ? "#B45309" : "#94A3B8"}`,
                        boxShadow: isSelected ? "0 0 0 4px rgba(180, 83, 9, 0.15)" : "none",
                        transition: "all 0.25s ease",
                      }}
                    />

                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          right: "0",
                          top: "-15px",
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: m ? "4.5rem" : "6.5rem",
                          fontWeight: 700,
                          lineHeight: 1,
                          color: "#E2E8F0",
                          userSelect: "none",
                          pointerEvents: "none",
                          zIndex: 0,
                          opacity: 0.7,
                        }}
                      >
                        {st.id}
                      </div>

                      <div style={{ position: "relative", zIndex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "0.4rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "12px",
                              fontWeight: 700,
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: isSelected ? "#B45309" : "#64748B",
                            }}
                          >
                            {st.year} · {st.dateRange}
                          </span>
                          <span style={{ color: "#CBD5E1" }}>—</span>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "12px",
                              fontWeight: 500,
                              color: "#475569",
                            }}
                          >
                            <MapPin size={12} color="#B45309" />
                            {st.location}
                          </span>
                        </div>

                        <h3
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: m ? "1.85rem" : "2.4rem",
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: "-0.015em",
                            color: "#0F172A",
                            margin: "0 0 0.35rem 0",
                          }}
                        >
                          {st.label}
                        </h3>

                        <h4
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: m ? "1rem" : "1.1rem",
                            fontWeight: 600,
                            color: "#B45309",
                            margin: "0 0 0.85rem 0",
                          }}
                        >
                          {st.subtitle}
                        </h4>

                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: m ? "0.96rem" : "1.06rem",
                            fontWeight: 400,
                            lineHeight: 1.8,
                            color: "#334155",
                            margin: 0,
                            maxWidth: "640px",
                          }}
                        >
                          {st.desc}
                        </p>

                        <div
                          style={{
                            marginTop: "1.25rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <button
                            onClick={() => {
                              setActiveStageId(st.id);
                              setActiveCity(st.targetCity);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              padding: "0",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: isSelected ? "#B45309" : "#64748B",
                              transition: "color 0.2s ease",
                            }}
                          >
                            <span>Localizar no mapa cartográfico</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
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
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Compass size={16} color="#B45309" />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#0F172A",
                    }}
                  >
                    Mesa Cartográfica de Operacións
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#64748B",
                  }}
                >
                  1.050 km
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  borderBottom: "1px solid #E2E8F0",
                  paddingBottom: "8px",
                }}
              >
                <button
                  onClick={() => setActiveCity("galicia")}
                  style={{
                    background: activeCity === "galicia" ? "#0F172A" : "#FFFFFF",
                    color: activeCity === "galicia" ? "#FFFFFF" : "#475569",
                    border: "1px solid",
                    borderColor: activeCity === "galicia" ? "#0F172A" : "#CBD5E1",
                    borderRadius: "999px",
                    padding: "6px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <MapPin size={12} color={activeCity === "galicia" ? "#FFFFFF" : "#B45309"} />
                  Galicia (Foz / Santiago)
                </button>
                <button
                  onClick={() => setActiveCity("barcelona")}
                  style={{
                    background: activeCity === "barcelona" ? "#0F172A" : "#FFFFFF",
                    color: activeCity === "barcelona" ? "#FFFFFF" : "#475569",
                    border: "1px solid",
                    borderColor: activeCity === "barcelona" ? "#0F172A" : "#CBD5E1",
                    borderRadius: "999px",
                    padding: "6px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Navigation size={12} color={activeCity === "barcelona" ? "#FFFFFF" : "#B45309"} />
                  Cataluña (Barcelona)
                </button>
              </div>
            </div>

            <div
              style={{
                height: m ? "300px" : "360px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
                position: "relative",
              }}
            >
              {mounted && (
                <MapContainer
                  center={[42.2, -3.2]}
                  zoom={m ? 4.9 : 5.4}
                  scrollWheelZoom={false}
                  attributionControl={false}
                  zoomControl={false}
                  style={{ height: "100%", width: "100%", background: "#F1F5F9" }}
                >
                  <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
                  <Polyline
                    positions={getCurvePoints(galiciaPos, barcelonaPos)}
                    pathOptions={{
                      color: "#B45309",
                      weight: 2.5,
                      dashArray: "6, 8",
                      opacity: 0.85,
                    }}
                  />
                  <Marker
                    position={galiciaPos}
                    icon={createEditorialPin(activeCity === "galicia", "FOZ / SANTIAGO")}
                    eventHandlers={{ click: () => setActiveCity("galicia") }}
                  />
                  <Marker
                    position={barcelonaPos}
                    icon={createEditorialPin(activeCity === "barcelona", "BARCELONA")}
                    eventHandlers={{ click: () => setActiveCity("barcelona") }}
                  />
                </MapContainer>
              )}
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid #E2E8F0",
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
                    color: "#B45309",
                  }}
                >
                  {activeCity === "galicia" ? "EIXO TERRITORIAL · GALICIA" : "EIXO TERRITORIAL · CATALUÑA"}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#64748B",
                  }}
                >
                  {activeCity === "galicia" ? "Foz & Santiago" : "Barcelona"}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  lineHeight: 1.65,
                  color: "#475569",
                  margin: 0,
                }}
              >
                {activeCity === "galicia"
                  ? "Escenario da infancia reprimida, a escola de dona Remedios, o estigma familiar de Mamá Carme e as posteriores pescudas médicas do doutor Fernando Pereira no presente."
                  : "Refuxio e renacemento de Concha. A urbe cosmopolita onde adquire a súa Leica e convértese na fotógrafa corsaria que axusta contas coa hipocrisía da burguesía."}
              </p>

              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "#94A3B8",
                  }}
                >
                  Fase activa: <strong style={{ color: "#0F172A" }}>{activeMilestone.label}</strong>
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#B45309",
                  }}
                >
                  {activeMilestone.dateRange}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
