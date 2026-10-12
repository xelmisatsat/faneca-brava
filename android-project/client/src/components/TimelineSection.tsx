import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FileText, MapPin, Compass, ShieldAlert, FolderOpen, ArrowUpRight } from "lucide-react";

const stages = [
  {
    id: "01",
    expNum: "EXP-1948/01",
    label: "A OPRESIÓN",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    location: "Vila de Foz · A Mariña",
    tag: "TESTEMUÑO INICIAL",
    sealColor: "#B91C1C",
    targetCity: "galicia" as const,
    archiveDate: "Outono de 1948",
  },
  {
    id: "02",
    expNum: "EXP-1952/02",
    label: "O LUME",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    location: "A Escola Parroquial",
    tag: "INFORME DE SINISTRO",
    sealColor: "#C2410C",
    targetCity: "galicia" as const,
    archiveDate: "Inverno de 1952",
  },
  {
    id: "03",
    expNum: "EXP-1954/03",
    label: "O DESTERRO",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    location: "Porto de Foz",
    tag: "ORDE DE EXPULSIÓN",
    sealColor: "#78350F",
    targetCity: "galicia" as const,
    archiveDate: "Primavera de 1954",
  },
  {
    id: "04",
    expNum: "EXP-1965/04",
    label: "A LENTE CORSARIA",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa no é a vítima; é a executora.",
    location: "Barcelona · Estudi & Redacción",
    tag: "ACTA DE METAMORFOSE",
    sealColor: "#854D0E",
    targetCity: "barcelona" as const,
    archiveDate: "Anos 1960 - 1970",
  },
  {
    id: "05",
    expNum: "EXP-1976/05",
    label: "O REMORSO",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    location: "Santiago de Compostela",
    tag: "HISTORIAL CLÍNICO",
    sealColor: "#1E3A8A",
    targetCity: "galicia" as const,
    archiveDate: "Presente Clínico",
  },
  {
    id: "06",
    expNum: "EXP-1978/06",
    label: "A REVELACIÓN",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    location: "O Cartafol de Lela",
    tag: "RESOLUCIÓN DO CASO",
    sealColor: "#065F46",
    targetCity: "galicia" as const,
    archiveDate: "Feche do Cartafol",
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

const createArchivePin = (active: boolean, label: string) =>
  L.divIcon({
    className: "archive-map-pin",
    html: `<div style="position: relative;">
             <div style="width: 20px; height: 20px; border-radius: 50%; background: ${
               active ? "#B91C1C" : "#1E293B"
             }; border: 3px solid #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; position: absolute; top: -10px; left: -10px;">
               <div style="width: 6px; height: 6px; border-radius: 50%; background: #FFFFFF;"></div>
             </div>
             <div style="position: absolute; top: 14px; left: -50%; transform: translateX(-15%); font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; color: ${
               active ? "#991B1B" : "#334155"
             }; background: #FFFFFF; padding: 2px 7px; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.15); border: 1px solid #CBD5E1; white-space: nowrap;">${label}</div>
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
    const t = setTimeout(() => setMounted(true), 80);
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
        padding: m ? "4.5rem 0 3.5rem" : "7rem 0 6.5rem",
        overflow: "hidden",
        backgroundColor: "#EFE8DA",
        backgroundImage: "radial-gradient(#D8CEBC 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        borderTop: "1px solid #D5C9B4",
        borderBottom: "1px solid #D5C9B4",
      }}
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: m ? "0 1.25rem" : "0 3.5rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: m ? "2.5rem" : "3.75rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#FFFFFF",
              padding: "5px 14px",
              borderRadius: "4px",
              border: "1px dashed #B8A892",
              boxShadow: "0 2px 4px rgba(60,45,25,0.06)",
              marginBottom: "1.25rem",
            }}
          >
            <FolderOpen size={14} color="#991B1B" />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#991B1B",
              }}
            >
              CARTAFOL DE LELA · ARQUIVO N.º 1948-1978
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: m ? "column" : "row",
              alignItems: m ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.6rem, 5.8vw, 5.4rem)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.025em",
                  color: "#1C1917",
                  margin: 0,
                }}
              >
                Crónica do <span style={{ color: "#92400E", fontStyle: "italic" }}>Expediente</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: m ? "0.95rem" : "1.1rem",
                  lineHeight: 1.65,
                  color: "#57534E",
                  maxWidth: "650px",
                  marginTop: "0.75rem",
                  marginBottom: 0,
                }}
              >
                Percorrido emocional e documental do caso Concha Pereira. Seis actas arquivadas que reconstruen a vida
                dunha muller dende a asfixia da posguerra ata a súa liberación en Barcelona.
              </p>
            </div>

            <div
              style={{
                background: "#FAF7F2",
                border: "1px solid #D8CFC0",
                borderRadius: "8px",
                padding: "10px 16px",
                display: "flex",
                gap: "18px",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(60,45,25,0.06)",
                flexShrink: 0,
              }}
            >
              <div>
                <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#78716C", textTransform: "uppercase" }}>
                  Rexisto
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#1C1917" }}>
                  06 Actas
                </div>
              </div>
              <div style={{ width: "1px", height: "26px", background: "#D8CFC0" }} />
              <div>
                <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#78716C", textTransform: "uppercase" }}>
                  Itinerario
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#1C1917" }}>
                  ~1.050 km
                </div>
              </div>
              <div style={{ width: "1px", height: "26px", background: "#D8CFC0" }} />
              <div>
                <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#78716C", textTransform: "uppercase" }}>
                  Estado
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#065F46" }}>
                  Desvelado
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div
          style={{
            display: "flex",
            gap: "6px",
            overflowX: "auto",
            paddingBottom: "10px",
            marginBottom: "2rem",
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
                  gap: "7px",
                  background: isSelected ? "#FFFFFF" : "#E5DEC9",
                  border: "1px solid",
                  borderColor: isSelected ? "#B8A892" : "#D4C8B5",
                  borderBottom: isSelected ? "3px solid #991B1B" : "1px solid #D4C8B5",
                  borderRadius: "6px 6px 0 0",
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: isSelected ? "#1C1917" : "#57534E",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11.5px",
                  fontWeight: isSelected ? 800 : 600,
                  boxShadow: isSelected ? "0 -2px 8px rgba(60,45,25,0.06)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    color: isSelected ? "#991B1B" : "#78716C",
                    fontWeight: 700,
                  }}
                >
                  {st.id}
                </span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

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
              top: m ? "auto" : "105px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              order: m ? 2 : 1,
            }}
          >
            <div
              style={{
                background: "#FCFBF7",
                border: "1px solid #D5C9B4",
                borderRadius: "14px",
                padding: m ? "14px" : "18px",
                boxShadow: "0 18px 45px -8px rgba(60,45,25,0.14), 0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #EBE3D3",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Compass size={16} color="#991B1B" />
                  <div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        color: "#991B1B",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      MESA CARTOGRÁFICA
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#1C1917" }}>
                      Plano Foz ↔ Barcelona
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => setActiveCity("galicia")}
                    style={{
                      background: activeCity === "galicia" ? "#1C1917" : "#F3EDE2",
                      color: activeCity === "galicia" ? "#FFFFFF" : "#57534E",
                      border: "1px solid",
                      borderColor: activeCity === "galicia" ? "#1C1917" : "#D8CEBC",
                      borderRadius: "4px",
                      padding: "4px 10px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
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
                      background: activeCity === "barcelona" ? "#1C1917" : "#F3EDE2",
                      color: activeCity === "barcelona" ? "#FFFFFF" : "#57534E",
                      border: "1px solid",
                      borderColor: activeCity === "barcelona" ? "#1C1917" : "#D8CEBC",
                      borderRadius: "4px",
                      padding: "4px 10px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
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
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #D5C9B4",
                  position: "relative",
                  background: "#E5DEC9",
                }}
              >
                {mounted && (
                  <MapContainer
                    center={[42.0, -3.0]}
                    zoom={m ? 5 : 5.4}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    style={{ position: "absolute", inset: 0, background: "#E5DEC9" }}
                    attributionControl={false}
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                      maxZoom={16}
                    />

                    <Polyline
                      positions={getCurvePoints(galiciaPos, barcelonaPos, m ? 4.5 : 3.5)}
                      color="#B91C1C"
                      weight={2.5}
                      dashArray="6, 6"
                      opacity={0.9}
                    />

                    <Marker
                      position={galiciaPos}
                      icon={createArchivePin(activeCity === "galicia", "GALICIA")}
                      eventHandlers={{
                        click: () => setActiveCity("galicia"),
                      }}
                    />

                    <Marker
                      position={barcelonaPos}
                      icon={createArchivePin(activeCity === "barcelona", "BARCELONA")}
                      eventHandlers={{
                        click: () => setActiveCity("barcelona"),
                      }}
                    />
                  </MapContainer>
                )}
              </div>

              <div
                style={{
                  marginTop: "12px",
                  background: "#F7F3EB",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  border: "1px solid #D8CFC0",
                  minHeight: "110px",
                }}
              >
                <AnimatePresence mode="wait">
                  {activeCity === "galicia" ? (
                    <motion.div
                      key="galicia"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "1.45rem",
                            fontWeight: 700,
                            color: "#1C1917",
                            lineHeight: 1,
                          }}
                        >
                          Galicia
                        </div>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#991B1B",
                            letterSpacing: "0.15em",
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
                          color: "#44403C",
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
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "1.45rem",
                            fontWeight: 700,
                            color: "#1C1917",
                            lineHeight: 1,
                          }}
                        >
                          Barcelona
                        </div>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#854D0E",
                            letterSpacing: "0.15em",
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
                          color: "#44403C",
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
                  marginTop: "10px",
                  padding: "0 2px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: currentStage.sealColor,
                    }}
                  />
                  <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#57534E", fontWeight: 600 }}>
                    Acta seleccionada: {currentStage.id} · {currentStage.label}
                  </span>
                </div>
                <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#78716C" }}>
                  Traxecto: ~1.050 km
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              order: m ? 1 : 2,
              position: "relative",
            }}
          >
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
                    background: "#FCFBF7",
                    border: "1px solid",
                    borderColor: isActive ? "#991B1B" : "#D8CEBC",
                    borderRadius: "14px",
                    padding: m ? "1.6rem 1.3rem" : "2.2rem 2.5rem",
                    boxShadow: isActive
                      ? "0 18px 45px -8px rgba(60,45,25,0.16), 0 0 0 1px #991B1B"
                      : "0 8px 24px -4px rgba(60,45,25,0.08)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      right: "22px",
                      top: "14px",
                      fontSize: m ? "4.5rem" : "6.5rem",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 700,
                      color: "#EFE8DA",
                      pointerEvents: "none",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {st.id}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                      flexWrap: "wrap",
                      gap: "8px",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: st.sealColor,
                          background: "#F3EDE2",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          border: `1px solid ${st.sealColor}40`,
                        }}
                      >
                        {st.expNum}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "10.5px",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#78716C",
                        }}
                      >
                        {st.tag}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#FAF7F2",
                        padding: "3px 10px",
                        borderRadius: "4px",
                        border: "1px solid #E5DED1",
                      }}
                    >
                      <MapPin size={11} color="#78716C" />
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "10.5px",
                          color: "#57534E",
                        }}
                      >
                        {st.location}
                      </span>
                    </div>
                  </div>

                  <div style={{ position: "relative", zIndex: 2 }}>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: m ? "1.65rem" : "2.1rem",
                        fontWeight: 700,
                        color: "#1C1917",
                        margin: "0 0 4px",
                        lineHeight: 1.1,
                      }}
                    >
                      {st.label}
                    </h3>

                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: m ? "1.15rem" : "1.32rem",
                        fontWeight: 600,
                        fontStyle: "italic",
                        color: st.sealColor,
                        marginBottom: "12px",
                      }}
                    >
                      {st.subtitle}
                    </div>

                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: m ? "0.94rem" : "1.05rem",
                        fontWeight: 400,
                        lineHeight: 1.75,
                        color: "#292524",
                        margin: 0,
                      }}
                    >
                      {st.desc}
                    </p>

                    <div
                      style={{
                        marginTop: "16px",
                        paddingTop: "10px",
                        borderTop: "1px dashed #E5DED1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "monospace",
                        fontSize: "9.5px",
                        color: "#78716C",
                      }}
                    >
                      <span>Período rexistrado: {st.archiveDate}</span>
                      <span style={{ color: isActive ? "#991B1B" : "#A8A29E", fontWeight: 700 }}>
                        {isActive ? "Ficha activa en lectura" : "Preme para fixar no mapa"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
