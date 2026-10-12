import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIsMobile } from "@/hooks/useIsMobile";

type City = "aldea" | "barcelona";

interface Stage {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  desc: string;
  location: string;
  city: City;
  img: string;
}

const stages: Stage[] = [
  {
    id: "01",
    numeral: "I",
    title: "A Opresión",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    location: "A vila na foz",
    city: "aldea",
    img: "/manus-storage/faneca-infancia-vila.png",
  },
  {
    id: "02",
    numeral: "II",
    title: "O Lume",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    location: "A Escola Parroquial",
    city: "aldea",
    img: "/manus-storage/faneca-incendio-memoria.png",
  },
  {
    id: "03",
    numeral: "III",
    title: "O Desterro",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    location: "Aldea",
    city: "aldea",
    img: "/manus-storage/faneca-vila-marineira.png",
  },
  {
    id: "04",
    numeral: "IV",
    title: "A Lente Corsaria",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa no é a vítima; é a executora.",
    location: "Barcelona · Estudio e Redacción",
    city: "barcelona",
    img: "/manus-storage/faneca-barcelona.png",
  },
  {
    id: "05",
    numeral: "V",
    title: "O Remorso",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    location: "Santiago de Compostela",
    city: "aldea",
    img: "/manus-storage/faneca-fernando-portrait.jpg",
  },
  {
    id: "06",
    numeral: "VI",
    title: "A Revelación",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    location: "O Cartafol de Lela",
    city: "aldea",
    img: "/manus-storage/faneca-arquivo-mesa.png",
  },
];

const cityText: Record<City, { name: string; region: string; text: string }> = {
  aldea: {
    name: "Aldea",
    region: "Galicia",
    text: "Escenario da infancia reprimida, a escola de dona Remedios, o estigma familiar de Mamá Carme e as posteriores pescudas médicas do doutor Fernando Pereira no presente.",
  },
  barcelona: {
    name: "Barcelona",
    region: "Cataluña",
    text: "Refuxio e renacemento de Concha. A urbe cosmopolita onde adquire a súa Leica e convértese na fotógrafa corsaria que axusta contas coa hipocrisía da burguesía.",
  },
};

const C = {
  bg: "linear-gradient(155deg, #132435 0%, #153036 45%, #122c26 100%)",
  paper: "#EDE5D8",
  ink: "#FAF6EE",
  body: "#E5E0D8",
  muted: "#A4BAC5",
  line: "rgba(237, 229, 216, 0.16)",
  accent: "#E5C394",
  borderDark: "rgba(237, 229, 216, 0.12)",
  cardBg: "rgba(18, 38, 48, 0.65)",
};

const SERIF = "'Bodoni Moda', 'Playfair Display', Georgia, serif";
const SANS = "'Jost', 'DM Sans', system-ui, sans-serif";

const aldeaPos: [number, number] = [42.8806, -8.5446];
const barcelonaPos: [number, number] = [41.3851, 2.1734];

const curve = (a: [number, number], b: [number, number], k = 3.5) => {
  const pts: [number, number][] = [];
  const mLat = (a[0] + b[0]) / 2 + k;
  const mLng = (a[1] + b[1]) / 2;
  for (let t = 0; t <= 1.0001; t += 0.05) {
    pts.push([
      (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * mLat + t * t * b[0],
      (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * mLng + t * t * b[1],
    ]);
  }
  return pts;
};

const pin = (active: boolean, label: string) =>
  L.divIcon({
    className: "",
    html: `<div style="position:relative;">
      <div style="position:absolute;top:-6px;left:-6px;width:12px;height:12px;border-radius:50%;background:${
        active ? C.accent : C.paper
      };box-shadow:0 0 12px ${active ? C.accent : "rgba(237,229,216,0.6)"};outline:2px solid ${
        active ? C.accent : "rgba(237,229,216,0.4)"
      };outline-offset:3px;"></div>
      <div style="position:absolute;top:15px;left:0;transform:translateX(-50%);font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:0.24em;color:${
        active ? C.accent : C.paper
      };text-shadow:0 2px 6px rgba(0,0,0,0.85);white-space:nowrap;">${label}</div>
    </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

export default function TimelineSection() {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState("01");
  const [city, setCity] = useState<City>("aldea");
  const m = useIsMobile();
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.id;
            const st = stages.find((s) => s.id === id);
            if (st) {
              setActiveId(st.id);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (st: Stage) => {
    setActiveId(st.id);
    refs.current[st.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToMap = (selectedCity: City) => {
    setCity(selectedCity);
    document.getElementById("mapa-traxectoria")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stage1 = stages[0];
  const remainingStages = stages.slice(1);

  return (
    <section
      id="timeline"
      style={{
        position: "relative",
        background: C.bg,
        color: C.ink,
        padding: m ? "4.5rem 0 4rem" : "7.5rem 0 7rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "4%",
          left: "4%",
          width: "580px",
          height: "580px",
          background: "radial-gradient(circle, rgba(28, 88, 126, 0.25) 0%, transparent 68%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          right: "4%",
          width: "640px",
          height: "640px",
          background: "radial-gradient(circle, rgba(22, 104, 86, 0.22) 0%, transparent 68%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: m ? "0 1.4rem" : "0 4rem", position: "relative", zIndex: 1 }}>
        <header style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto", marginBottom: m ? "2.5rem" : "4.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", marginBottom: m ? "1.2rem" : "1.8rem" }}>
            <span style={{ width: "48px", height: "1px", background: C.accent }} />
            <span style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 500, letterSpacing: "0.38em", textTransform: "uppercase", color: C.accent }}>
              Cronoloxía
            </span>
            <span style={{ width: "48px", height: "1px", background: C.accent }} />
          </div>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: m ? "2.7rem" : "clamp(3.6rem, 6.2vw, 6.2rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: C.ink,
              margin: 0,
            }}
          >
            A Liña do Tempo <span style={{ fontStyle: "italic", color: C.accent }}>de Concha</span>
          </h2>
          <p
            style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: m ? "1.05rem" : "1.22rem",
              lineHeight: 1.75,
              color: C.body,
              maxWidth: "660px",
              margin: m ? "1.3rem auto 0" : "1.8rem auto 0",
            }}
          >
            O itinerario vital e emocional de Concha Pereira. Un percorrido que vai dende a infancia ferida na vila ata a
            súa liberación e resistencia a través da fotografía en Barcelona.
          </p>
        </header>

        <nav
          style={{
            display: "flex",
            gap: m ? "1.6rem" : "0",
            justifyContent: m ? "flex-start" : "space-between",
            overflowX: "auto",
            scrollbarWidth: "none",
            borderTop: `1px solid ${C.line}`,
            borderBottom: `1px solid ${C.line}`,
            padding: "18px 0",
            marginBottom: m ? "3rem" : "4.5rem",
          }}
        >
          {stages.map((st) => {
            const on = st.id === activeId;
            return (
              <button
                key={st.id}
                onClick={() => goTo(st)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.15rem", color: on ? C.accent : C.muted }}>
                  {st.numeral}
                </span>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: on ? C.ink : C.muted,
                    borderBottom: `1px solid ${on ? C.accent : "transparent"}`,
                    paddingBottom: "3px",
                    transition: "color 0.25s, border-color 0.25s",
                  }}
                >
                  {st.title}
                </span>
              </button>
            );
          })}
        </nav>

        <div
          id="mapa-traxectoria"
          style={{
            background: C.cardBg,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${C.borderDark}`,
            borderRadius: "16px",
            padding: m ? "1.4rem" : "2.4rem",
            marginBottom: m ? "4rem" : "6rem",
            boxShadow: "0 20px 45px -15px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: m ? "column" : "row",
              justifyContent: "space-between",
              alignItems: m ? "flex-start" : "center",
              gap: "1rem",
              paddingBottom: "1.2rem",
              borderBottom: `1px solid ${C.line}`,
              marginBottom: "1.6rem",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontFamily: SANS,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: C.accent,
                  marginBottom: "4px",
                }}
              >
                O Eixo Xeográfico
              </span>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: m ? "1.6rem" : "2rem",
                  color: C.ink,
                  margin: 0,
                }}
              >
                Aldea ↔ Barcelona <span style={{ fontStyle: "italic", fontSize: "1.1rem", color: C.muted }}>· 1.050 km</span>
              </h3>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setCity("aldea")}
                style={{
                  background: city === "aldea" ? "rgba(229, 195, 148, 0.15)" : "transparent",
                  border: `1px solid ${city === "aldea" ? C.accent : C.borderDark}`,
                  borderRadius: "8px",
                  padding: "8px 18px",
                  fontFamily: SANS,
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: city === "aldea" ? C.accent : C.muted,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                Aldea
              </button>
              <button
                onClick={() => setCity("barcelona")}
                style={{
                  background: city === "barcelona" ? "rgba(229, 195, 148, 0.15)" : "transparent",
                  border: `1px solid ${city === "barcelona" ? C.accent : C.borderDark}`,
                  borderRadius: "8px",
                  padding: "8px 18px",
                  fontFamily: SANS,
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: city === "barcelona" ? C.accent : C.muted,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                Barcelona
              </button>
            </div>
          </div>

          <div
            style={{
              height: m ? "270px" : "380px",
              borderRadius: "12px",
              overflow: "hidden",
              border: `1px solid ${C.borderDark}`,
              position: "relative",
            }}
          >
            {mounted && (
              <MapContainer
                center={[42.2, -3.2]}
                zoom={m ? 4.7 : 5.4}
                scrollWheelZoom={false}
                attributionControl={false}
                zoomControl={false}
                style={{ height: "100%", width: "100%", background: "#13232B" }}
              >
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
                <Polyline
                  positions={curve(aldeaPos, barcelonaPos)}
                  pathOptions={{ color: C.accent, weight: 1.6, dashArray: "3, 7", opacity: 0.95 }}
                />
                <Marker
                  position={aldeaPos}
                  icon={pin(city === "aldea", "ALDEA")}
                  eventHandlers={{ click: () => setCity("aldea") }}
                />
                <Marker
                  position={barcelonaPos}
                  icon={pin(city === "barcelona", "BARCELONA")}
                  eventHandlers={{ click: () => setCity("barcelona") }}
                />
              </MapContainer>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 1fr",
              gap: "1.2rem",
              marginTop: "1.6rem",
            }}
          >
            <div
              onClick={() => setCity("aldea")}
              style={{
                padding: "1.2rem 1.4rem",
                borderRadius: "10px",
                background: city === "aldea" ? "rgba(229, 195, 148, 0.1)" : "rgba(255, 255, 255, 0.02)",
                border: `1px solid ${city === "aldea" ? C.accent : C.borderDark}`,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontFamily: SERIF, fontSize: "1.4rem", color: city === "aldea" ? C.accent : C.ink }}>
                  Aldea
                </span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "0.95rem", color: C.muted }}>
                  Galicia
                </span>
              </div>
              <p style={{ fontFamily: SANS, fontSize: "13.5px", lineHeight: 1.65, color: C.body, margin: 0 }}>
                {cityText.aldea.text}
              </p>
            </div>

            <div
              onClick={() => setCity("barcelona")}
              style={{
                padding: "1.2rem 1.4rem",
                borderRadius: "10px",
                background: city === "barcelona" ? "rgba(229, 195, 148, 0.1)" : "rgba(255, 255, 255, 0.02)",
                border: `1px solid ${city === "barcelona" ? C.accent : C.borderDark}`,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontFamily: SERIF, fontSize: "1.4rem", color: city === "barcelona" ? C.accent : C.ink }}>
                  Barcelona
                </span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "0.95rem", color: C.muted }}>
                  Cataluña
                </span>
              </div>
              <p style={{ fontFamily: SANS, fontSize: "13.5px", lineHeight: 1.65, color: C.body, margin: 0 }}>
                {cityText.barcelona.text}
              </p>
            </div>
          </div>
        </div>

        <article
          data-id={stage1.id}
          ref={(el) => {
            refs.current[stage1.id] = el;
          }}
          style={{
            paddingBottom: m ? "3.5rem" : "5.5rem",
            marginBottom: m ? "3.5rem" : "5.5rem",
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1.1fr 1fr",
              gap: m ? "1.8rem" : "4.5rem",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "1rem" }}>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: m ? "3.6rem" : "5rem",
                    lineHeight: 0.85,
                    color: C.accent,
                  }}
                >
                  {stage1.numeral}
                </span>
                <div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: SANS,
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: C.muted,
                      marginBottom: "4px",
                    }}
                  >
                    {stage1.location}
                  </span>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: m ? "2.4rem" : "clamp(2.8rem, 3.8vw, 4rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.025em",
                      color: C.ink,
                      margin: 0,
                    }}
                  >
                    {stage1.title}
                  </h3>
                </div>
              </div>

              <p
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: m ? "1.3rem" : "1.55rem",
                  lineHeight: 1.35,
                  color: C.accent,
                  margin: "0 0 1.2rem",
                }}
              >
                {stage1.subtitle}
              </p>

              <p
                style={{
                  fontFamily: SANS,
                  fontWeight: 400,
                  fontSize: m ? "1.02rem" : "1.1rem",
                  lineHeight: 1.85,
                  color: C.body,
                  margin: "0 0 1.6rem",
                }}
              >
                {stage1.desc}
              </p>

              <button
                onClick={() => scrollToMap(stage1.city)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0 0 4px",
                  cursor: "pointer",
                  fontFamily: SANS,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: C.accent,
                  borderBottom: `1px solid ${C.accent}`,
                  transition: "opacity 0.25s",
                }}
              >
                {cityText[stage1.city].name} — ver no mapa
              </button>
            </div>

            <div
              style={{
                width: "100%",
                aspectRatio: m ? "4 / 3" : "16 / 10",
                borderRadius: "14px",
                overflow: "hidden",
                border: `1px solid ${C.borderDark}`,
                boxShadow: "0 22px 45px -15px rgba(0, 0, 0, 0.5)",
                background: "#162728",
              }}
            >
              <img
                src={stage1.img}
                alt={stage1.title}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </article>

        <div>
          {remainingStages.map((st, i) => (
            <article
              key={st.id}
              data-id={st.id}
              ref={(el) => {
                refs.current[st.id] = el;
              }}
              style={{
                paddingBottom: m ? "3.5rem" : "5.5rem",
                marginBottom: m ? "3.5rem" : "5.5rem",
                borderBottom: i < remainingStages.length - 1 ? `1px solid ${C.line}` : "none",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: m ? "1fr" : "1.2fr 1fr",
                  gap: m ? "1.8rem" : "4.5rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: m ? "4 / 3" : "16 / 10",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: `1px solid ${C.borderDark}`,
                    boxShadow: "0 22px 45px -15px rgba(0, 0, 0, 0.5)",
                    background: "#162728",
                  }}
                >
                  <img
                    src={st.img}
                    alt={st.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "1rem" }}>
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontSize: m ? "3.6rem" : "5rem",
                        lineHeight: 0.85,
                        color: C.accent,
                      }}
                    >
                      {st.numeral}
                    </span>
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontFamily: SANS,
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: C.muted,
                          marginBottom: "4px",
                        }}
                      >
                        {st.location}
                      </span>
                      <h3
                        style={{
                          fontFamily: SERIF,
                          fontWeight: 400,
                          fontSize: m ? "2.4rem" : "clamp(2.8rem, 3.8vw, 4rem)",
                          lineHeight: 1,
                          letterSpacing: "-0.025em",
                          color: C.ink,
                          margin: 0,
                        }}
                      >
                        {st.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: m ? "1.3rem" : "1.55rem",
                      lineHeight: 1.35,
                      color: C.accent,
                      margin: "0 0 1.2rem",
                    }}
                  >
                    {st.subtitle}
                  </p>

                  <p
                    style={{
                      fontFamily: SANS,
                      fontWeight: 400,
                      fontSize: m ? "1.02rem" : "1.1rem",
                      lineHeight: 1.85,
                      color: C.body,
                      margin: "0 0 1.6rem",
                    }}
                  >
                    {st.desc}
                  </p>

                  <button
                    onClick={() => scrollToMap(st.city)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0 0 4px",
                      cursor: "pointer",
                      fontFamily: SANS,
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: C.accent,
                      borderBottom: `1px solid ${C.accent}`,
                      transition: "opacity 0.25s",
                    }}
                  >
                    {cityText[st.city].name} — ver no mapa
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
