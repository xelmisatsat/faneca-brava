import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

/*
  Paleta "Âmbar Costeiro" — distinta de Historia (#1B2D31/cobre) e Galería (glassmorphism)
  Fondo:        #1A1208 (Negro melaza)  /  #231A0C (Café escuro)
  Superficie:   #2E2210 (Madeira queimada)
  Texto:        #F5EDD4 (Pergamino)  /  #BFA880 (Âmbar apagado)
  Acento:       #D4924A (Âmbar cálido)  /  #9E6230 (Cobre escuro)
  Liñas:        #8B6840 (Coiro)
  Perigo/Lume:  #C05A3A (Terracota)
*/

const PALETTE = {
  bg:        '#1A1208',
  bgAlt:     '#231A0C',
  surface:   '#2E2210',
  text:      '#F5EDD4',
  textSub:   '#BFA880',
  accent:    '#D4924A',
  accentDk:  '#9E6230',
  line:      '#8B6840',
  fire:      '#C05A3A',
};

const stages = [
  {
    n: "I",
    label: "A OPRESIÓN",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    color: "#7CA8C2",
    icon: "⚓",
  },
  {
    n: "II",
    label: "O LUME",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    color: "#C05A3A",
    icon: "🔥",
  },
  {
    n: "III",
    label: "O DESTERRO",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lhe ofrecen un mínimo de acubillo antes do exilio forzoso.",
    color: "#D4924A",
    icon: "🧭",
  },
  {
    n: "IV",
    label: "A LENTE CORSARIA",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe e reencontra co seu pai emigrado. Desde alí, chega a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa non é a vítima; é a executora.",
    color: "#BFA880",
    icon: "📷",
  },
  {
    n: "V",
    label: "O REMORSO",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    color: "#7CA8C2",
    icon: "🌙",
  },
  {
    n: "VI",
    label: "A REVELACIÓN",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu a moralidade que a tentou destruír.",
    color: "#D4924A",
    icon: "📜",
  },
];

const mapCities = {
  galicia: {
    x: 78, y: 145,
    label: "GALICIA",
    title: "Galicia",
    sub: "A Orixe e a Culpa",
    text: "A vila mariñeira e Santiago de Compostela. Aquí nace o trauma baixo a man de ferro de Mamá Carme e aquí xorde a somatización de Fernando décadas despois. É a terra da fuxida e do regreso inevitable.",
  },
  barcelona: {
    x: 332, y: 158,
    label: "BARCELONA",
    title: "Barcelona",
    sub: "O Rexurdimento",
    text: "O refuxio onde Concha Pereira se reinventa. Lonxe da opresión, a Faneca Brava afía os seus dentes e utiliza a súa cámara para desposuír do seu poder ás altas esferas. A vítima faise verdugo.",
  },
};

/* SVG path aproximado da Península Ibérica simplificada */
const IBERIA_PATH = "M 20 60 C 30 30, 60 15, 100 20 C 140 25, 165 10, 195 22 C 225 34, 250 18, 280 30 C 310 42, 345 28, 370 55 C 395 82, 400 110, 395 140 C 390 170, 375 195, 355 215 C 335 235, 310 248, 285 255 C 260 262, 235 258, 210 250 C 185 242, 175 260, 155 265 C 135 270, 110 262, 90 248 C 70 234, 58 215, 45 195 C 32 175, 15 155, 12 130 C 9 105, 12 85, 20 60 Z";

export default function TimelineSection() {
  const [v, setV] = useState(false);
  const [activeCity, setActiveCity] = useState<'galicia' | 'barcelona' | null>(null);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: 'relative', background: PALETTE.bg, overflow: 'hidden' }}>

      {/* Textura de fondo */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `radial-gradient(ellipse at 20% 30%, rgba(212,146,74,0.06) 0%, transparent 60%),
                     radial-gradient(ellipse at 80% 70%, rgba(124,168,194,0.04) 0%, transparent 55%)`,
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '4rem 1rem 3.5rem' : '8rem 5rem 7rem', position: 'relative', zIndex: 10 }}>

        {/* ═══ CABECEIRA ══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          style={{ marginBottom: m ? '3rem' : '5.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.2rem' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.9 }}
              style={{ width: '44px', height: '2px', background: `linear-gradient(90deg, ${PALETTE.accent}, transparent)`, transformOrigin: 'left' }}
            />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.38em', textTransform: 'uppercase', color: PALETTE.accent, fontWeight: 600 }}>
              Percorrido Emocional
            </span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 0.9, letterSpacing: '-0.025em', color: PALETTE.text, margin: 0 }}>
            Liña do tempo<br /><span style={{ color: PALETTE.accent }}>Emocional</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '1rem' : '1.1rem', lineHeight: 1.8, color: PALETTE.textSub, maxWidth: '580px', marginTop: '1.4rem' }}>
            Desde a opresión ata a revelación. Seis etapas dunha muller que se negou a ser vítima.
          </p>
        </motion.div>

        {/* ═══ TIMELINE ══════════════════════════════════ */}
        {m ? (
          /* ── MÓBIL: lista vertical limpa ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {stages.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={v ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.09 }}
                style={{
                  display: 'flex',
                  gap: '0',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: `0 4px 20px rgba(0,0,0,0.45), 0 0 0 1px ${ev.color}22`,
                }}
              >
                {/* Barra lateral de acento */}
                <div style={{ width: '5px', flexShrink: 0, background: ev.color }} />
                {/* Contido */}
                <div style={{ background: PALETTE.bgAlt, padding: '16px 16px 18px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: ev.color, lineHeight: 1 }}>{ev.n}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.32em', fontWeight: 700, color: ev.color, textTransform: 'uppercase' }}>{ev.label}</span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontStyle: 'italic', color: PALETTE.text, marginBottom: '8px', lineHeight: 1.2 }}>{ev.subtitle}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.93rem', fontWeight: 300, color: PALETTE.textSub, lineHeight: 1.75 }}>{ev.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ── DESKTOP: timeline con liña e cards alternos ── */
          <div style={{ position: 'relative' }}>
            {/* Liña vertical central */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', transform: 'translateX(-50%)', background: `linear-gradient(to bottom, ${PALETTE.surface}, ${PALETTE.accent}66, ${PALETTE.fire}66, ${PALETTE.accentDk}66, ${PALETTE.line}66, ${PALETTE.accent}66)` }}>
              <motion.div
                initial={{ scaleY: 0 }} animate={v ? { scaleY: 1 } : {}}
                transition={{ duration: 2.2, delay: 0.3, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${PALETTE.accent}, ${PALETTE.fire}, ${PALETTE.accentDk}, ${PALETTE.line}, ${PALETTE.accent}, ${PALETTE.textSub})`, transformOrigin: 'top' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {stages.map((ev, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 36 }}
                    animate={v ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.11, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}
                  >
                    {/* Nodo central */}
                    <div style={{ position: 'absolute', left: '50%', top: '24px', transform: 'translateX(-50%)', zIndex: 10 }}>
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: PALETTE.bgAlt,
                        border: `2px solid ${ev.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 18px ${ev.color}55`,
                      }}>
                        <motion.span
                          initial={{ scale: 0 }} animate={v ? { scale: 1 } : {}}
                          transition={{ delay: 0.25 + i * 0.11, type: 'spring', stiffness: 280 }}
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 700, color: ev.color }}
                        >{ev.n}</motion.span>
                      </div>
                    </div>

                    {/* Tarxeta esquerda */}
                    <div style={{ width: '50%', paddingRight: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
                      {isLeft && (
                        <motion.div
                          whileHover={{ x: -5, boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px ${ev.color}44` }}
                          style={{
                            background: PALETTE.bgAlt,
                            border: `1px solid ${ev.color}33`,
                            borderRight: `4px solid ${ev.color}`,
                            borderRadius: '16px',
                            padding: '26px 30px',
                            maxWidth: '460px',
                            boxShadow: `0 12px 35px rgba(0,0,0,0.4), 0 0 20px ${ev.color}15`,
                            transition: 'box-shadow 0.3s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '18px' }}>{ev.icon}</span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.38em', fontWeight: 700, color: ev.color, textTransform: 'uppercase' }}>{ev.label}</span>
                          </div>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontStyle: 'italic', color: PALETTE.text, marginBottom: '10px', lineHeight: 1.2 }}>{ev.subtitle}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.98rem', fontWeight: 300, color: PALETTE.textSub, lineHeight: 1.85 }}>{ev.desc}</div>
                        </motion.div>
                      )}
                    </div>

                    {/* Tarxeta dereita */}
                    <div style={{ width: '50%', paddingLeft: '4rem', display: 'flex', justifyContent: 'flex-start' }}>
                      {!isLeft && (
                        <motion.div
                          whileHover={{ x: 5, boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px ${ev.color}44` }}
                          style={{
                            background: PALETTE.bgAlt,
                            border: `1px solid ${ev.color}33`,
                            borderLeft: `4px solid ${ev.color}`,
                            borderRadius: '16px',
                            padding: '26px 30px',
                            maxWidth: '460px',
                            boxShadow: `0 12px 35px rgba(0,0,0,0.4), 0 0 20px ${ev.color}15`,
                            transition: 'box-shadow 0.3s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '18px' }}>{ev.icon}</span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.38em', fontWeight: 700, color: ev.color, textTransform: 'uppercase' }}>{ev.label}</span>
                          </div>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontStyle: 'italic', color: PALETTE.text, marginBottom: '10px', lineHeight: 1.2 }}>{ev.subtitle}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.98rem', fontWeight: 300, color: PALETTE.textSub, lineHeight: 1.85 }}>{ev.desc}</div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ MAPA NARRATIVO SVG ══════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ marginTop: m ? '3rem' : '5rem' }}
        >
          {/* Cabeceira mapa */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
            <div style={{ width: '36px', height: '2px', background: PALETTE.accent }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: PALETTE.accent, fontWeight: 600 }}>Mapa Narrativo</span>
          </div>

          <div style={{
            background: PALETTE.bgAlt,
            border: `1px solid ${PALETTE.line}55`,
            borderRadius: '20px',
            padding: m ? '1.5rem 1rem' : '3rem 3.5rem',
            display: 'flex',
            flexDirection: m ? 'column' : 'row',
            gap: m ? '1.5rem' : '3rem',
            alignItems: m ? 'stretch' : 'center',
            boxShadow: `0 20px 55px rgba(0,0,0,0.5), 0 0 0 1px ${PALETTE.line}33`,
          }}>

            {/* SVG Map */}
            <div style={{ flex: m ? 'none' : '0 0 420px', position: 'relative' }}>
              <svg
                viewBox="0 0 420 290"
                style={{ width: '100%', maxWidth: m ? '100%' : '420px', display: 'block', borderRadius: '12px', background: '#100D06', border: `1px solid ${PALETTE.line}44` }}
              >
                {/* Ocean background */}
                <rect width="420" height="290" fill="#0F1A0A" rx="12" />

                {/* Iberian Peninsula shape (simplified) */}
                <path
                  d={IBERIA_PATH}
                  fill="#2A1F0E"
                  stroke={PALETTE.line}
                  strokeWidth="1.2"
                  opacity="0.85"
                />

                {/* France stub */}
                <path d="M 195 22 C 225 12, 270 8, 310 20 C 340 30, 370 45, 370 55 L 310 42 C 280 30, 250 18, 225 22 Z" fill="#1E1508" stroke={PALETTE.line} strokeWidth="0.8" opacity="0.6" />

                {/* Atlantic label */}
                <text x="18" y="200" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={PALETTE.accentDk} opacity="0.6" letterSpacing="2">ATLÁNTICO</text>
                {/* Mediterranean label */}
                <text x="360" y="210" fontFamily="'DM Sans', sans-serif" fontSize="9" fill={PALETTE.accentDk} opacity="0.6" letterSpacing="2" transform="rotate(-30, 360, 210)">MED</text>

                {/* Route arc — Galicia to Barcelona */}
                <path
                  d={`M ${mapCities.galicia.x} ${mapCities.galicia.y} Q 210 80 ${mapCities.barcelona.x} ${mapCities.barcelona.y}`}
                  fill="none"
                  stroke={PALETTE.accent}
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity="0.7"
                />

                {/* Arrow tip near Barcelona */}
                <polygon points={`${mapCities.barcelona.x - 6},${mapCities.barcelona.y - 4} ${mapCities.barcelona.x + 2},${mapCities.barcelona.y} ${mapCities.barcelona.x - 6},${mapCities.barcelona.y + 4}`} fill={PALETTE.accent} opacity="0.8" />

                {/* GALICIA marker */}
                <g
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveCity(activeCity === 'galicia' ? null : 'galicia')}
                >
                  <circle cx={mapCities.galicia.x} cy={mapCities.galicia.y} r="16" fill={activeCity === 'galicia' ? `${PALETTE.accent}30` : 'transparent'} stroke={PALETTE.accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
                  <circle cx={mapCities.galicia.x} cy={mapCities.galicia.y} r="7" fill={activeCity === 'galicia' ? PALETTE.accent : PALETTE.accentDk} stroke={PALETTE.text} strokeWidth="1.5" />
                  <circle cx={mapCities.galicia.x} cy={mapCities.galicia.y} r="3" fill={PALETTE.text} opacity={activeCity === 'galicia' ? 1 : 0.5} />
                  <text x={mapCities.galicia.x} y={mapCities.galicia.y + 28} textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={activeCity === 'galicia' ? PALETTE.accent : PALETTE.textSub} fontWeight="700" letterSpacing="1.5">GALICIA</text>
                </g>

                {/* BARCELONA marker */}
                <g
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveCity(activeCity === 'barcelona' ? null : 'barcelona')}
                >
                  <circle cx={mapCities.barcelona.x} cy={mapCities.barcelona.y} r="16" fill={activeCity === 'barcelona' ? `${PALETTE.accent}30` : 'transparent'} stroke={PALETTE.accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
                  <circle cx={mapCities.barcelona.x} cy={mapCities.barcelona.y} r="7" fill={activeCity === 'barcelona' ? PALETTE.accent : PALETTE.accentDk} stroke={PALETTE.text} strokeWidth="1.5" />
                  <circle cx={mapCities.barcelona.x} cy={mapCities.barcelona.y} r="3" fill={PALETTE.text} opacity={activeCity === 'barcelona' ? 1 : 0.5} />
                  <text x={mapCities.barcelona.x} y={mapCities.barcelona.y + 28} textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8.5" fill={activeCity === 'barcelona' ? PALETTE.accent : PALETTE.textSub} fontWeight="700" letterSpacing="1.5">BARCELONA</text>
                </g>

                {/* Instruction hint */}
                {!activeCity && (
                  <text x="210" y="278" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="8" fill={PALETTE.textSub} opacity="0.5" letterSpacing="1">Toca un punto para explorar</text>
                )}
              </svg>
            </div>

            {/* Texto dinámico */}
            <div style={{ flex: 1, minHeight: m ? 'auto' : '200px', display: 'flex', alignItems: 'center' }}>
              <AnimatePresence mode="wait">
                {activeCity ? (
                  <motion.div
                    key={activeCity}
                    initial={{ opacity: 0, x: m ? 0 : 20, y: m ? 16 : 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: m ? 0 : -16, y: m ? -10 : 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                      <div style={{ width: '22px', height: '2px', background: PALETTE.accent }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: PALETTE.accent, textTransform: 'uppercase', fontWeight: 700 }}>
                        {mapCities[activeCity].sub}
                      </span>
                    </div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '2.2rem' : '2.8rem', color: PALETTE.text, lineHeight: 1, margin: '0 0 0.8rem' }}>
                      {mapCities[activeCity].title}
                    </h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '0.95rem' : '1.05rem', color: PALETTE.textSub, lineHeight: 1.85, margin: 0 }}>
                      {mapCities[activeCity].text}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  >
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '1rem' : '1.1rem', color: PALETTE.textSub, fontStyle: 'italic', lineHeight: 1.75, margin: 0 }}>
                      Preme nunha localización no mapa para descubrir os seus segredos...
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1.4rem' }}>
                      {(['galicia', 'barcelona'] as const).map(c => (
                        <button
                          key={c}
                          onClick={() => setActiveCity(c)}
                          style={{
                            background: 'transparent',
                            border: `1px solid ${PALETTE.line}66`,
                            borderRadius: '30px',
                            padding: '8px 22px',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '11px',
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: PALETTE.textSub,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.accent; (e.currentTarget as HTMLButtonElement).style.color = PALETTE.accent; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = `${PALETTE.line}66`; (e.currentTarget as HTMLButtonElement).style.color = PALETTE.textSub; }}
                        >
                          → {mapCities[c].title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
