import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Compass, MapPin, ArrowRight, Sparkles, Navigation } from "lucide-react";

const stages = [
  {
    id: "01",
    label: "A OPRESIÓN",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    location: "Foz · A Mariña Lucense",
    targetCity: "galicia" as const,
    color: "#5D7B9E",
    accent: "#93B3D9",
    bg: "rgba(22, 34, 50, 0.96)",
  },
  {
    id: "02",
    label: "O LUME",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    location: "A Escola Parroquial",
    targetCity: "galicia" as const,
    color: "#D95D5D",
    accent: "#F87171",
    bg: "rgba(48, 22, 24, 0.96)",
  },
  {
    id: "03",
    label: "O DESTERRO",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    location: "O Porto de Partida",
    targetCity: "galicia" as const,
    color: "#B88E67",
    accent: "#FBBF24",
    bg: "rgba(44, 34, 26, 0.96)",
  },
  {
    id: "04",
    label: "A LENTE CORSARIA",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa no é a vítima; é a executora.",
    location: "Barcelona · Estudi & Prensa",
    targetCity: "barcelona" as const,
    color: "#E5B96B",
    accent: "#FDE68A",
    bg: "rgba(46, 38, 22, 0.96)",
  },
  {
    id: "05",
    label: "O REMORSO",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    location: "Santiago de Compostela",
    targetCity: "galicia" as const,
    color: "#6BA0C9",
    accent: "#93C5FD",
    bg: "rgba(22, 38, 54, 0.96)",
  },
  {
    id: "06",
    label: "A REVELACIÓN",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    location: "O Cartafol de Lela",
    targetCity: "galicia" as const,
    color: "#E2C88F",
    accent: "#FEF08A",
    bg: "rgba(42, 36, 26, 0.96)",
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

const createGoldenIcon = (active: boolean, label: string) =>
  L.divIcon({
    className: "custom-div-icon",
    html: `<div style="position: relative;">
             <div style="width: 18px; height: 18px; background: ${active ? "#C8A96E" : "rgba(200,169,110,0.4)"}; border-radius: 50%; box-shadow: ${active ? "0 0 24px #C8A96E, 0 0 10px #FFF" : "0 0 6px rgba(0,0,0,0.8)"}; border: 2.5px solid ${active ? "#FFFFFF" : "rgba(255,255,255,0.4)"}; position: absolute; top: -9px; left: -9px; transition: all 0.3s ease;"></div>
             <div style="position: absolute; top: 13px; left: -50%; transform: translateX(-18%); font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.16em; color: ${active ? "#F5D898" : "#94A3B8"}; white-space: nowrap; text-shadow: 0 2px 4px rgba(0,0,0,0.95);">${label}</div>
           </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

export default function TimelineSection() {
  const [mounted, setMounted] = useState(false);
  const [activeStageId, setActiveStageId] = useState("01");
  const [activeCity, setActiveCity] = useState<"galicia" | "barcelona">("galicia");
  const m = useIsMobile();
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToStage = (id: string, targetCity: "galicia" | "barcelona") => {
    setActiveStageId(id);
    setActiveCity(targetCity);
    const el = cardRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <section
      id="timeline"
      style={{
        position: "relative",
        padding: m ? "4.5rem 0 3.5rem" : "7.5rem 0 6.5rem",
        overflow: "hidden",
        backgroundColor: "#070A12",
        backgroundImage:
          "radial-gradient(ellipse at 15% 25%, rgba(93, 123, 158, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(200, 169, 110, 0.09) 0%, transparent 60%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.25,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: m ? "0 1.25rem" : "0 3.5rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: m ? "2.5rem" : "4.5rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "1.25rem" }}>
            <div style={{ width: "42px", height: "1px", background: "linear-gradient(90deg, #C8A96E, transparent)" }} />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "linear-gradient(180deg, #1A2234 0%, #0F1626 100%)",
                padding: "4px 14px",
                borderRadius: "6px",
                border: "1px solid rgba(200,169,110,0.3)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
              }}
            >
              <Compass size={13} color="#C8A96E" />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C8A96E",
                }}
              >
                Percorrido Emocional
              </span>
            </div>
            <div style={{ width: "42px", height: "1px", background: "linear-gradient(90deg, transparent, #C8A96E)" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2.7rem, 6vw, 5.8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              color: "#F8FAFC",
              margin: "0 0 1rem",
            }}
          >
            Liña do tempo <span style={{ color: "#E2BA70", fontStyle: "italic" }}>Emocional</span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: m ? "0.98rem" : "1.15rem",
              lineHeight: 1.7,
              color: "#94A3B8",
              maxWidth: "680px",
              margin: 0,
            }}
          >
            Desde a opresión ata a revelación. Seis etapas dunha muller que se negou a ser vítima nunha travesía de máis de
            mil quilómetros entre a costa de Foz e o Mediterráneo catalán.
          </p>
        </motion.div>

        {m && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "14px",
              marginBottom: "1.75rem",
              scrollbarWidth: "none",
            }}
          >
            {stages.map((st) => {
              const isSelected = st.id === activeStageId;
              return (
                <button
                  key={st.id}
                  onClick={() => scrollToStage(st.id, st.targetCity)}
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: isSelected ? st.color : "rgba(20, 28, 44, 0.8)",
                    border: `1px solid ${isSelected ? "#FFFFFF" : "rgba(255,255,255,0.12)"}`,
                    borderRadius: "20px",
                    padding: "6px 14px",
                    cursor: "pointer",
                    color: isSelected ? "#FFFFFF" : "#CBD5E1",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: isSelected ? 700 : 500,
                    boxShadow: isSelected ? `0 4px 14px ${st.color}60` : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  <span style={{ opacity: isSelected ? 1 : 0.6, fontSize: "9.5px", fontFamily: "monospace" }}>
                    {st.id}
                  </span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: m ? "1fr" : "480px 1fr",
            gap: m ? "2.5rem" : "3.5rem",
            alignItems: "start",
          }}
        >
          <div
            style={{
              position: m ? "relative" : "sticky",
              top: m ? "auto" : "110px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              order: m ? 2 : 1,
            }}
          >
            <div
              style={{
                background: "linear-gradient(180deg, #121927 0%, #0B101A 100%)",
                border: "1px solid rgba(200,169,110,0.35)",
                borderRadius: "22px",
                padding: m ? "14px" : "18px",
                boxShadow: "0 25px 60px -10px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  padding: "0 4px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Navigation size={14} color="#C8A96E" />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#E2BA70",
                    }}
                  >
                    Eixo Cartográfico
                  </span>
                </div>

                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => setActiveCity("galicia")}
                    style={{
                      background: activeCity === "galicia" ? "#C8A96E" : "rgba(255,255,255,0.06)",
                      color: activeCity === "galicia" ? "#0A0D14" : "#CBD5E1",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Galicia
                  </button>
                  <button
                    onClick={() => setActiveCity("barcelona")}
                    style={{
                      background: activeCity === "barcelona" ? "#C8A96E" : "rgba(255,255,255,0.06)",
                      color: activeCity === "barcelona" ? "#0A0D14" : "#CBD5E1",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Barcelona
                  </button>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: m ? "280px" : "320px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  position: "relative",
                  background: "#080B11",
                }}
              >
                {mounted && (
                  <MapContainer
                    center={[42.0, -3.0]}
                    zoom={m ? 5 : 5.4}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    style={{ position: "absolute", inset: 0, background: "#080B11" }}
                    attributionControl={false}
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                      maxZoom={16}
                    />

                    <Polyline
                      positions={getCurvePoints(galiciaPos, barcelonaPos, m ? 4.5 : 3.5)}
                      color="#C8A96E"
                      weight={2.5}
                      dashArray="6, 6"
                      opacity={0.85}
                    />

                    <Marker
                      position={galiciaPos}
                      icon={createGoldenIcon(activeCity === "galicia", "GALICIA")}
                      eventHandlers={{
                        click: () => setActiveCity("galicia"),
                      }}
                    />

                    <Marker
                      position={barcelonaPos}
                      icon={createGoldenIcon(activeCity === "barcelona", "BARCELONA")}
                      eventHandlers={{
                        click: () => setActiveCity("barcelona"),
                      }}
                    />
                  </MapContainer>
                )}
              </div>

              <div
                style={{
                  marginTop: "14px",
                  background: "rgba(10, 14, 22, 0.75)",
                  borderRadius: "12px",
                  padding: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minHeight: "115px",
                }}
              >
                <AnimatePresence mode="wait">
                  {activeCity === "galicia" ? (
                    <motion.div
                      key="galicia"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h4
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "1.45rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: 0,
                          }}
                        >
                          Galicia
                        </h4>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            color: "#E2BA70",
                            textTransform: "uppercase",
                          }}
                        >
                          A Orixe e a Culpa
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.86rem",
                          lineHeight: 1.55,
                          color: "#CBD5E1",
                          marginTop: "6px",
                          marginBottom: 0,
                        }}
                      >
                        A vila mariñeira e Santiago de Compostela. Aquí nace o trauma baixo a man de ferro de Mamá Carme
                        e aquí xorde a somatización de Fernando décadas despois. É a terra da fuxida e do regreso
                        inevitable.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="barcelona"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h4
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "1.45rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: 0,
                          }}
                        >
                          Barcelona
                        </h4>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            color: "#E2BA70",
                            textTransform: "uppercase",
                          }}
                        >
                          O Rexurdimento
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.86rem",
                          lineHeight: 1.55,
                          color: "#CBD5E1",
                          marginTop: "6px",
                          marginBottom: 0,
                        }}
                      >
                        O refuxio onde Concha Pereira se reinventa. Lonxe da opresión, a Faneca Brava afía os seus dentes
                        e utiliza a súa cámara para desposuír do seu poder ás altas esferas que a rodean. A vítima faise
                        verdugo.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "12px",
                  padding: "0 4px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: currentStage.color,
                      boxShadow: `0 0 10px ${currentStage.color}`,
                    }}
                  />
                  <span style={{ fontFamily: "monospace", fontSize: "10px", color: currentStage.accent }}>
                    Etapa activa: {currentStage.id} · {currentStage.label}
                  </span>
                </div>
                <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#64748B" }}>
                  Traxecto: ~1.050 km
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: m ? "1.5rem" : "2rem",
              order: m ? 1 : 2,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "24px",
                top: "20px",
                bottom: "20px",
                width: "2px",
                background:
                  "linear-gradient(to bottom, #5D7B9E, #D95D5D, #B88E67, #E5B96B, #6BA0C9, #E2C88F)",
                opacity: 0.35,
                display: m ? "none" : "block",
              }}
            />

            {stages.map((st) => {
              const isActive = st.id === activeStageId;

              return (
                <div
                  key={st.id}
                  ref={(el) => {
                    cardRefs.current[st.id] = el;
                  }}
                  onClick={() => {
                    setActiveStageId(st.id);
                    setActiveCity(st.targetCity);
                  }}
                  style={{
                    position: "relative",
                    background: `linear-gradient(135deg, ${st.bg} 0%, rgba(11, 16, 26, 0.98) 100%)`,
                    border: `1.5px solid ${isActive ? st.color : "rgba(255,255,255,0.12)"}`,
                    borderLeft: `5px solid ${st.color}`,
                    borderRadius: "18px",
                    padding: m ? "1.5rem 1.25rem" : "2rem 2.25rem",
                    boxShadow: isActive
                      ? `0 20px 50px -10px rgba(0,0,0,0.8), 0 0 35px ${st.color}25`
                      : "0 10px 30px rgba(0,0,0,0.6)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    marginLeft: m ? 0 : "36px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: st.accent,
                          background: "rgba(0,0,0,0.4)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          border: `1px solid ${st.color}40`,
                        }}
                      >
                        {st.id}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 800,
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: st.accent,
                          margin: 0,
                        }}
                      >
                        {st.label}
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: "rgba(0,0,0,0.35)",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <MapPin size={11} color={st.accent} />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "10.5px",
                          color: "#CBD5E1",
                        }}
                      >
                        {st.location}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: m ? "1.35rem" : "1.65rem",
                      fontWeight: 600,
                      fontStyle: "italic",
                      color: "#FFFFFF",
                      margin: "0 0 10px",
                      lineHeight: 1.25,
                    }}
                  >
                    {st.subtitle}
                  </div>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: m ? "0.92rem" : "1.02rem",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: "#F1F5F9",
                      margin: 0,
                    }}
                  >
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
