import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useIsMobile } from "@/hooks/useIsMobile";

const stages = [
  {
    label: "A OPRESIÓN",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    color: "#4A607A",
    bg: "rgba(12,18,30,0.95)",
  },
  {
    label: "O LUME",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    color: "#A94444",
    bg: "rgba(26,14,14,0.95)",
  },
  {
    label: "O DESTERRO",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    color: "#8C6D4F",
    bg: "rgba(22,17,13,0.95)",
  },
  {
    label: "A LENTE CORSARIA",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa non é a vítima; é a executora.",
    color: "#C8A96E",
    bg: "rgba(20,17,12,0.95)",
  },
  {
    label: "O REMORSO",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    color: "#4F7FA8",
    bg: "rgba(11,18,26,0.95)",
  },
  {
    label: "A REVELACIÓN",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    color: "#E5C583",
    bg: "rgba(24,20,15,0.95)",
  },
];

const galiciaPos: [number, number] = [42.8806, -8.5446]; // Santiago de Compostela
const barcelonaPos: [number, number] = [41.3851, 2.1734]; // Barcelona

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

const createGoldenIcon = (active: boolean, label: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="position: relative;">
           <div style="width: 16px; height: 16px; background: ${active ? '#C8A96E' : 'rgba(200,169,110,0.3)'}; border-radius: 50%; box-shadow: ${active ? '0 0 20px #C8A96E' : 'none'}; border: 2px solid ${active ? '#fff' : 'rgba(255,255,255,0.2)'}; position: absolute; top: -8px; left: -8px; transition: all 0.3s ease;"></div>
           <div style="position: absolute; top: 12px; left: -50%; transform: translateX(-20%); font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: bold; letter-spacing: 0.15em; color: ${active ? '#C8A96E' : '#8B9BB4'}; white-space: nowrap; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">${label}</div>
         </div>`,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

export default function TimelineSection() {
  const [v, setV] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [activeCity, setActiveCity] = useState<'galicia' | 'barcelona' | null>(null);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,8,13,1) 0%, rgba(13,27,42,0.15) 50%, rgba(8,8,13,1) 100%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
          animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
              style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>Percorrido Emocional</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Liña do tempo <span style={{ color: '#C8A96E' }}>Emocional</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '560px', marginTop: '1.5rem' }}>
            Desde a opresión ata a revelación. Seis etapas dunha muller que se negou a ser vítima.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Liña vertical */}
          <div style={{ position: 'absolute', left: m ? '16px' : '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, rgba(74,96,122,0.15), rgba(169,68,68,0.15), rgba(140,109,79,0.15), rgba(200,169,110,0.15), rgba(79,127,168,0.15), rgba(229,197,131,0.15))', transform: m ? 'none' : 'translateX(-50%)' }}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={v ? { scaleY: 1 } : {}}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, #4A607A, #A94444, #8C6D4F, #C8A96E, #4F7FA8, #E5C583)', transformOrigin: 'top' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: m ? '1.5rem' : '4.5rem' }}>
            {stages.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={v ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={m ? { display: 'flex', alignItems: 'flex-start', position: 'relative', paddingLeft: '40px' } : { display: 'flex', alignItems: 'flex-start', gap: 0, position: 'relative' }}
              >
                {/* Punto */}
                <div style={{ position: 'absolute', left: m ? '7px' : '50%', top: '20px', transform: m ? 'none' : 'translateX(-50%)', zIndex: 10 }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(7,11,19,0.85)',
                    border: `2px solid ${ev.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 16px ${ev.color}50`,
                  }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={v ? { scale: 1 } : {}}
                      transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 300 }}
                      style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: ev.color }}
                    />
                  </div>
                </div>

                {m ? (
                  /* Móbil: tarxeta simple á dereita */
                  <motion.div
                    style={{
                      background: `linear-gradient(135deg, ${ev.bg}, rgba(7,11,19,0.95))`,
                      backdropFilter: 'blur(40px)',
                      border: `1px solid ${ev.color}33`,
                      borderTop: `2.5px solid ${ev.color}bb`,
                      borderRadius: '16px',
                      padding: '20px 22px',
                      boxShadow: `0 8px 32px rgba(0,0,0,0.55), 0 0 16px ${ev.color}10, inset 0 1px 0 rgba(255,255,255,0.06)`,
                      width: '100%',
                    }}
                  >
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.4em', fontWeight: 600, color: ev.color, lineHeight: 1, textTransform: 'uppercase' }}>{ev.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', color: '#EAE2D2', marginTop: '8px', opacity: 0.9 }}>{ev.subtitle}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13.5px', fontWeight: 300, color: '#A0AEC0', marginTop: '12px', lineHeight: 1.75 }}>{ev.desc}</div>
                  </motion.div>
                ) : (
                  /* Desktop: layout alternante */
                  <>
                    {/* Lado esquerdo */}
                    <div style={{ width: '50%', paddingRight: '4.5rem', textAlign: 'right', display: i % 2 === 0 ? 'block' : 'none' }}>
                      <motion.div
                        whileHover={{ x: -6 }}
                        style={{
                          display: 'inline-block',
                          background: `linear-gradient(135deg, ${ev.bg}, rgba(7,11,19,0.95))`,
                          backdropFilter: 'blur(40px)',
                          border: `1px solid ${ev.color}33`,
                          borderTop: `2.5px solid ${ev.color}bb`,
                          borderRadius: '20px',
                          padding: '28px 32px',
                          boxShadow: `0 20px 45px rgba(0,0,0,0.55), 0 0 25px ${ev.color}12, inset 0 1px 0 rgba(255,255,255,0.05)`,
                          maxWidth: '450px',
                          textAlign: 'left',
                        }}
                      >
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.4em', fontWeight: 600, color: ev.color, lineHeight: 1, textTransform: 'uppercase' }}>{ev.label}</div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', fontWeight: 300, fontStyle: 'italic', color: '#EAE2D2', marginTop: '10px', opacity: 0.9 }}>{ev.subtitle}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14.5px', fontWeight: 300, color: '#A0AEC0', marginTop: '14px', lineHeight: 1.8 }}>{ev.desc}</div>
                      </motion.div>
                    </div>
                    {i % 2 !== 0 && <div style={{ width: '50%' }} />}

                    {/* Lado dereito */}
                    {i % 2 !== 0 && (
                      <div style={{ width: '50%', paddingLeft: '4.5rem' }}>
                        <motion.div
                          whileHover={{ x: 6 }}
                          style={{
                            background: `linear-gradient(135deg, ${ev.bg}, rgba(7,11,19,0.95))`,
                            backdropFilter: 'blur(40px)',
                            border: `1px solid ${ev.color}33`,
                            borderTop: `2.5px solid ${ev.color}bb`,
                            borderRadius: '20px',
                            padding: '28px 32px',
                            boxShadow: `0 20px 45px rgba(0,0,0,0.55), 0 0 25px ${ev.color}12, inset 0 1px 0 rgba(255,255,255,0.05)`,
                            maxWidth: '450px',
                          }}
                        >
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.4em', fontWeight: 600, color: ev.color, lineHeight: 1, textTransform: 'uppercase' }}>{ev.label}</div>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', fontWeight: 300, fontStyle: 'italic', color: '#EAE2D2', marginTop: '10px', opacity: 0.9 }}>{ev.subtitle}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14.5px', fontWeight: 300, color: '#A0AEC0', marginTop: '14px', lineHeight: 1.8 }}>{ev.desc}</div>
                        </motion.div>
                      </div>
                    )}
                    {i % 2 === 0 && <div style={{ width: '50%' }} />}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botón e Contedor do Mapa Narrativo */}
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMapOpen(!mapOpen)}
            style={{
              background: mapOpen ? 'rgba(200,169,110,0.1)' : 'rgba(255,255,255,0.03)',
              border: mapOpen ? '1px solid rgba(200,169,110,0.5)' : '1px solid rgba(255,255,255,0.15)',
              borderRadius: '30px',
              padding: '12px 32px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: mapOpen ? '#C8A96E' : '#EAE2D2',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            {mapOpen ? "Pechar Mapa" : "Ver Mapa Narrativo"}
          </motion.button>

          <AnimatePresence>
            {mapOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '3rem' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, rgba(12,18,32,0.88) 0%, rgba(8,8,13,0.78) 100%)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  padding: m ? '2rem 1.5rem' : '4rem',
                  display: 'flex',
                  flexDirection: m ? 'column' : 'row',
                  gap: '3rem',
                  alignItems: 'center',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                }}>
                  {/* Mapa interactivo OpenStreetMap */}
                  <div style={{ flex: m ? 'none' : 1, width: '100%', height: m ? '320px' : '380px', minHeight: m ? '320px' : '380px', display: 'block', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(200,169,110,0.2)', position: 'relative', zIndex: 1 }}>
                    <MapContainer
                      center={[42.0, -3.0]}
                      zoom={m ? 5 : 6}
                      zoomControl={false}
                      scrollWheelZoom={false}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#0a0a0a' }}
                      attributionControl={false}
                    >
                      <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                      />
                      
                      {/* Curva de conexión */}
                      <Polyline
                        positions={getCurvePoints(galiciaPos, barcelonaPos, m ? 4.5 : 3.5)}
                        color="rgba(200,169,110,0.5)"
                        weight={2}
                        dashArray="6, 6"
                      />

                      {/* Marcador Galicia */}
                      <Marker
                        position={galiciaPos}
                        icon={createGoldenIcon(activeCity === 'galicia', 'GALICIA')}
                        eventHandlers={{
                          click: () => setActiveCity('galicia'),
                        }}
                      />

                      {/* Marcador Barcelona */}
                      <Marker
                        position={barcelonaPos}
                        icon={createGoldenIcon(activeCity === 'barcelona', 'BARCELONA')}
                        eventHandlers={{
                          click: () => setActiveCity('barcelona'),
                        }}
                      />
                    </MapContainer>
                  </div>

                  {/* Texto dinámico */}
                  <div style={{ flex: 1, textAlign: 'left', minHeight: '180px' }}>
                    <AnimatePresence mode="wait">
                      {activeCity === 'galicia' && (
                        <motion.div key="g" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#EAE2D2', lineHeight: 1 }}>Galicia</h4>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '1rem', marginTop: '0.5rem' }}>A Orixe e a Culpa</div>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', color: '#8B9BB4', lineHeight: 1.8 }}>
                            A vila mariñeira e Santiago de Compostela. Aquí nace o trauma baixo a man de ferro de Mamá Carme e aquí xorde a somatización de Fernando décadas despois. É a terra da fuxida e do regreso inevitable.
                          </p>
                        </motion.div>
                      )}
                      {activeCity === 'barcelona' && (
                        <motion.div key="b" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#EAE2D2', lineHeight: 1 }}>Barcelona</h4>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: '1rem', marginTop: '0.5rem' }}>O Rexurdimento</div>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', color: '#8B9BB4', lineHeight: 1.8 }}>
                            O refuxio onde Concha Pereira se reinventa. Lonxe da opresión, a Faneca Brava afía os seus dentes e utiliza a súa cámara para desposuír do seu poder ás altas esferas que a rodean. A vítima faise verdugo.
                          </p>
                        </motion.div>
                      )}
                      {!activeCity && (
                        <motion.div key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', height: '100%', opacity: 0.5 }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: '#8B9BB4', fontStyle: 'italic' }}>
                            Preme nunha localización no mapa para descubrir os seus segredos...
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
