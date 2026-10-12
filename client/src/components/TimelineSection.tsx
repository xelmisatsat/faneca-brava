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
  img?: string;
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
  bg: "#2F2A25",
  paper: "#EDE5D8",
  ink: "#FBF6EE",
  body: "#E6DDCF",
  muted: "#BBAF9B",
  line: "rgba(237, 229, 216, 0.22)",
  accent: "#D9B48A",
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
      <div style="position:absolute;top:-5px;left:-5px;width:10px;height:10px;border-radius:50%;background:${
        active ? C.accent : C.paper
      };outline:1px solid ${active ? C.accent : "rgba(237,229,216,0.5)"};outline-offset:4px;"></div>
      <div style="position:absolute;top:14px;left:0;transform:translateX(-50%);font-family:${SANS};font-size:10px;font-weight:500;letter-spacing:0.28em;color:${
        active ? C.accent : C.paper
      };white-space:nowrap;">${label}</div>
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
              setCity(st.city);
            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (st: Stage) => {
    setActiveId(st.id);
    setCity(st.city);
    refs.current[st.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const active = stages.find((s) => s.id === activeId) || stages[0];

  const textLink = (on: boolean): React.CSSProperties => ({
    background: "none",
    border: "none",
    padding: "0 0 4px",
    cursor: "pointer",
    fontFamily: SANS,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: on ? C.ink : C.muted,
    borderBottom: `1px solid ${on ? C.accent : "transparent"}`,
    transition: "color .25s, border-color .25s",
  });

  const mapBlock = (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingBottom: "14px",
          borderBottom: `1px solid ${C.line}`,
          marginBottom: "18px",
        }}
      >
        <span style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: C.muted }}>
          Mapa
        </span>
        <div style={{ display: "flex", gap: "22px" }}>
          <button onClick={() => setCity("aldea")} style={textLink(city === "aldea")}>
            Aldea
          </button>
          <button onClick={() => setCity("barcelona")} style={textLink(city === "barcelona")}>
            Barcelona
          </button>
        </div>
      </div>

      <div
        style={{
          height: m ? "260px" : "min(46vh, 380px)",
          overflow: "hidden",
          filter: "sepia(0.35) saturate(0.7) brightness(1.08)",
        }}
      >
        {mounted && (
          <MapContainer
            center={[42.2, -3.2]}
            zoom={m ? 4.8 : 5.3}
            scrollWheelZoom={false}
            attributionControl={false}
            zoomControl={false}
            style={{ height: "100%", width: "100%", background: "#1C1915" }}
          >
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" />
            <Polyline
              positions={curve(aldeaPos, barcelonaPos)}
              pathOptions={{ color: C.accent, weight: 1.2, dashArray: "2, 6", opacity: 0.9 }}
            />
            <Marker position={aldeaPos} icon={pin(city === "aldea", "ALDEA")} eventHandlers={{ click: () => setCity("aldea") }} />
            <Marker
              position={barcelonaPos}
              icon={pin(city === "barcelona", "BARCELONA")}
              eventHandlers={{ click: () => setCity("barcelona") }}
            />
          </MapContainer>
        )}
      </div>

      <motion.div
        key={city}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginTop: "22px" }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "10px" }}>
          <span style={{ fontFamily: SERIF, fontSize: "1.9rem", lineHeight: 1, color: C.ink }}>{cityText[city].name}</span>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1rem", color: C.accent }}>{cityText[city].region}</span>
        </div>
        <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "15px", lineHeight: 1.75, color: C.body, margin: 0 }}>
          {cityText[city].text}
        </p>
      </motion.div>

      {!m && (
        <div style={{ marginTop: "34px", paddingTop: "16px", borderTop: `1px solid ${C.line}`, display: "flex", alignItems: "baseline", gap: "14px" }}>
          <span style={{ fontFamily: SERIF, fontSize: "2.6rem", lineHeight: 1, color: C.accent }}>{active.numeral}</span>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.1rem", color: C.ink }}>{active.title}</span>
        </div>
      )}
    </div>
  );

  return (
    <section
      id="timeline"
      style={{
        position: "relative",
        background: C.bg,
        color: C.ink,
        padding: m ? "4.5rem 0 4rem" : "7.5rem 0 7rem",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: m ? "0 1.4rem" : "0 4rem" }}>
        <header style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto", marginBottom: m ? "2.8rem" : "4.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", marginBottom: m ? "1.4rem" : "2rem" }}>
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
              fontSize: m ? "2.7rem" : "clamp(3.6rem, 6.4vw, 6.4rem)",
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
              color: C.ink,
              opacity: 0.92,
              maxWidth: "640px",
              margin: m ? "1.4rem auto 0" : "2rem auto 0",
            }}
          >
            O itinerario vital e emocional de Concha Pereira. Un percorrido que vai dende a infancia ferida na vila ata a
            súa liberación e resistencia a través da fotografía en Barcelona.
          </p>
        </header>

        <nav
          style={{
            display: "flex",
            gap: m ? "1.8rem" : "0",
            justifyContent: m ? "flex-start" : "space-between",
            overflowX: "auto",
            scrollbarWidth: "none",
            borderTop: `1px solid ${C.line}`,
            borderBottom: `1px solid ${C.line}`,
            padding: "18px 0",
            marginBottom: m ? "2.8rem" : "5rem",
          }}
        >
          {stages.map((st) => {
            const on = st.id === activeId;
            return (
              <button
                key={st.id}
                onClick={() => goTo(st)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "baseline", gap: "10px", flexShrink: 0 }}
              >
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.1rem", color: on ? C.accent : C.muted }}>{st.numeral}</span>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: on ? C.ink : C.muted,
                    borderBottom: `1px solid ${on ? C.accent : "transparent"}`,
                    paddingBottom: "3px",
                  }}
                >
                  {st.title}
                </span>
              </button>
            );
          })}
        </nav>

        {m && (
          <div id="timeline-map" style={{ marginBottom: "3.5rem" }}>
            {mapBlock}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: m ? "1fr" : "minmax(340px, 5fr) 7fr",
            columnGap: "5.5rem",
            alignItems: "start",
          }}
        >
          {!m && <aside style={{ position: "sticky", top: "6rem" }}>{mapBlock}</aside>}

          <div>
            {stages.map((st, i) => (
              <article
                key={st.id}
                data-id={st.id}
                ref={(el) => {
                  refs.current[st.id] = el;
                }}
                style={{
                  paddingBottom: m ? "3.2rem" : "4.5rem",
                  marginBottom: m ? "3.2rem" : "4.5rem",
                  borderBottom: i < stages.length - 1 ? `1px solid ${C.line}` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-end", gap: m ? "16px" : "24px", marginBottom: m ? "1.2rem" : "1.6rem" }}>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: m ? "3.4rem" : "4.6rem",
                      lineHeight: 0.8,
                      color: C.accent,
                      minWidth: m ? "64px" : "92px",
                    }}
                  >
                    {st.numeral}
                  </span>
                  <div style={{ flex: 1, paddingBottom: "4px" }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: SANS,
                        fontSize: "11.5px",
                        fontWeight: 500,
                        letterSpacing: "0.26em",
                        textTransform: "uppercase",
                        color: C.muted,
                        marginBottom: "8px",
                      }}
                    >
                      {st.location}
                    </span>
                    <h3
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 400,
                        fontSize: m ? "2.2rem" : "clamp(2.6rem, 3.6vw, 3.6rem)",
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

                {st.img && (
                  <div style={{ width: "100%", aspectRatio: m ? "4 / 3" : "16 / 9", overflow: "hidden", background: "#26221E", marginBottom: m ? "1.4rem" : "1.8rem" }}>
                    <img
                      src={st.img}
                      alt={st.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                )}

                <p
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: m ? "1.3rem" : "1.5rem",
                    lineHeight: 1.35,
                    color: C.accent,
                    margin: "0 0 0.9rem",
                  }}
                >
                  {st.subtitle}
                </p>
                <p
                  style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: m ? "1.02rem" : "1.08rem",
                    lineHeight: 1.85,
                    color: C.body,
                    margin: 0,
                    maxWidth: "640px",
                  }}
                >
                  {st.desc}
                </p>
                <button
                  onClick={() => {
                    setCity(st.city);
                    setActiveId(st.id);
                    if (m) document.getElementById("timeline-map")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  style={{ ...textLink(false), marginTop: "1.3rem", color: C.accent, borderBottom: `1px solid ${C.accent}` }}
                >
                  {cityText[st.city].name} — ver no mapa
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
