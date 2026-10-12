import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Volume2, ArrowUpRight, Sparkles } from "lucide-react";

const chars = [
  {
    id: "concha",
    name: "Concha Pereira",
    alias: "A Faneca Brava",
    role: "Protagonista",
    img: "/manus-storage/faneca-concha-portrait.jpg",
    audio: "/audios/concha.mp3",
    color: "#C8A96E",
    cardBg: "#2A1520",
    voiceActor: "Sabela Hermida",
    desc: "Orfa de nai, co pai emigrado, Concha crece baixo a tutela opresiva de Mamá Carme. Sofre o maltrato físico da mestra Dona Remedios —que lle fai sangrar as mans a golpes— e o acoso do cura Don Anselmo. Acusada falsamente do incendio da escola, é expulsada da familia. Foxe a Barcelona onde se converte en paparazzi de éxito, usando a cámara como arma de desquite contra os poderosos.",
    traits: ["Feroz", "Silenciosa", "Rebelde", "Libre", "Xusticeira"],
    quote: "Cando miro pola lente, deixo de ser a nena que collían. Por fin, son eu a que observa.",
    arc: "Da infancia oprimida ao desquite silencioso",
  },
  {
    id: "fernando",
    name: "Fernando Pereira",
    alias: "O médico atormentado",
    role: "Narrador",
    img: "/manus-storage/faneca-fernando-portrait.jpg",
    audio: "/audios/fernando.mp3",
    color: "#6B8CAE",
    cardBg: "#152535",
    voiceActor: "Xaime López",
    desc: "Médico de Santiago de Compostela que sofre de insomnio severo. As olleiras fórmanlle un medio arco azul escuro. Os seus síntomas son a somatización dunha profunda culpa herdada. Obsesionado con descubrir a verdade sobre a súa curmá Concha, investiga a través de conversas coa tía Lela e con Andreu Picart no Hostal dos Reis Católicos.",
    traits: ["Atormentado", "Obsesivo", "Culpable", "Determinado"],
    quote: "Non podo durmir porque os ollos de Concha perséguenme cando pecho os meus.",
    arc: "Da culpa herdada á redención a través da verdade",
  },
  {
    id: "mama",
    name: "Mamá Carme",
    alias: "A matriarca",
    role: "Antagonista",
    img: "/manus-storage/faneca-mama-carme.jpg",
    audio: "/audios/carme.mp3",
    color: "#9A8A7A",
    cardBg: "#251E16",
    voiceActor: "Alexandra Pacheco",
    desc: "Matriarca do clan Pereira. Impón unha disciplina despótica e prioriza as aparencias sociais por riba do amor. Berraba botando sapos pola boca e batendo coas palmas das mans nas coxas. Prefire ocultar monstros reais e castigar á vítima para manter a imaxe de familia respectable e católica.",
    traits: ["Despótica", "Hipócrita", "Fría", "Autoritaria"],
    quote: "O apelido é o que nos sustenta. Un nome limpo vale máis ca todo o ouro.",
    arc: "A autoridade moral que encobre a inxustiza",
  },
  {
    id: "andreu",
    name: "Andreu Picart",
    alias: "O fotógrafo catalán",
    role: "Confidente",
    img: "/manus-storage/faneca-andreu-portrait.png",
    audio: "/audios/andreu.mp3",
    color: "#8B7355",
    cardBg: "#1A2520",
    voiceActor: "Jordi Pujol",
    desc: "Fotógrafo catalán veterano que coñeceu a Concha cando chegou a Barcelona. Viches como se converteu nunha das mollos paparazzi da cidade. Dicíalle que estaba xogando con lume. É a ponte entre o pasado de Concha e o presente de Fernando.",
    traits: ["Observador", "Sabio", "Melancólico", "Leal"],
    quote: "Concha non fotografaba para vivir. Fotografaba para desquitarse.",
    arc: "O testemuño que conecta pasado e presente",
  },
  {
    id: "encarna",
    name: "Encarna Pereira",
    alias: "A supervivente",
    role: "O contrapunto",
    img: "/manus-storage/encarna-portrait.jpg",
    audio: "/audios/encarna.mp3",
    color: "#7A6F8A",
    cardBg: "#1E1A28",
    voiceActor: "Anna Pujol",
    desc: "Irmá pequena de Concha, tamén orfa e criada por Mamá Carme. Mentres Concha é a rebeldía e a fuxida, Encarna é o reflexo doutro tipo de supervivencia feminina: a submisión calculada. Acata as normas da matriarca, cala, obedece e resiste dende dentro. Dúas irmás, dous camiños opostos fronte á mesma opresión.",
    traits: ["Calada", "Resignada", "Resiliente", "Sombra"],
    quote: "Eu quedei. Alguén tiña que quedar para que a casa non se derrubara.",
    arc: "A indómita vs. a supervivente: dúas respostas á mesma ferida",
  },
];

const WAVE_BARS = [0.4, 0.75, 1, 0.6, 0.85, 0.5, 0.9, 0.65, 0.75, 0.45, 0.55, 0.8];

function AudioPlayer({ src, color, name, voiceActor }: { src: string; color: string; name: string; voiceActor: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'paused'>('idle');
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);

  const tick = () => {
    const a = audioRef.current;
    if (!a) return;
    setProgress(a.currentTime / (a.duration || 1));
    if (!a.paused) rafRef.current = requestAnimationFrame(tick);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state === 'idle') {
      setState('loading');
      const a = new Audio(src);
      audioRef.current = a;
      a.onended = () => { setState('idle'); setProgress(0); };
      a.onerror = () => setState('idle');
      a.play().then(() => { setState('playing'); rafRef.current = requestAnimationFrame(tick); }).catch(() => setState('idle'));
      return;
    }
    if (state === 'playing') {
      audioRef.current?.pause();
      cancelAnimationFrame(rafRef.current);
      setState('paused');
    } else if (state === 'paused') {
      audioRef.current?.play();
      setState('playing');
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    a.currentTime = ratio * a.duration;
    setProgress(ratio);
  };

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  }, []);

  const isPlaying = state === 'playing';
  const label = state === 'loading' ? 'Cargando...' : isPlaying ? 'Reproducindo...' : state === 'paused' ? 'Pausado' : `Escoitar a ${name}`;

  return (
    <div style={{ background: `linear-gradient(135deg, ${color}12, ${color}06)`, border: `1px solid ${color}30`, borderRadius: '16px', padding: '14px 16px', backdropFilter: 'blur(20px)' }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', letterSpacing: '0.28em', textTransform: 'uppercase', color: `${color}95`, marginBottom: '10px' }}>
        Voz · {voiceActor}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            flexShrink: 0,
            background: isPlaying ? `linear-gradient(135deg, ${color}60, ${color}30)` : `linear-gradient(135deg, ${color}35, ${color}15)`,
            border: `1.5px solid ${color}${isPlaying ? '95' : '60'}`,
            boxShadow: isPlaying ? `0 0 20px ${color}40, 0 0 40px ${color}20` : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {state === 'loading' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              style={{ width: '16px', height: '16px', border: `2px solid ${color}30`, borderTop: `2px solid ${color}`, borderRadius: '50%' }}
            />
          ) : isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="3.5" height="10" rx="1.5" fill={color} />
              <rect x="8.5" y="2" width="3.5" height="10" rx="1.5" fill={color} />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 2.5L11.5 7L3.5 11.5V2.5Z" fill={color} />
            </svg>
          )}
        </motion.button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12.5px', color: isPlaying ? color : 'rgba(234,226,210,0.8)', letterSpacing: '0.02em', marginBottom: '6px', transition: 'color 0.3s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '20px', flexShrink: 0 }}>
              {WAVE_BARS.map((h, i) => (
                <motion.div
                  key={i}
                  animate={isPlaying ? { scaleY: [h * 0.3 + 0.1, h, h * 0.5, h * 1.1, h * 0.3 + 0.1] } : { scaleY: 0.15 }}
                  transition={isPlaying ? { duration: 0.5 + i * 0.06, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 } : { duration: 0.4 }}
                  style={{ width: '2px', height: '20px', borderRadius: '2px', background: isPlaying ? color : `${color}40`, transformOrigin: 'center', transition: 'background 0.3s' }}
                />
              ))}
            </div>
            <div onClick={handleSeek} style={{ flex: 1, height: '4px', background: `${color}25`, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
              <motion.div style={{ height: '100%', width: `${progress * 100}%`, background: `linear-gradient(90deg, ${color}80, ${color})`, borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PersonaxesSection() {
  const [v, setV] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const m = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (sel) document.body.setAttribute('data-modal-open', 'true');
      else document.body.removeAttribute('data-modal-open');
    }
    return () => {
      if (typeof document !== 'undefined') document.body.removeAttribute('data-modal-open');
    };
  }, [sel]);

  const selChar = chars.find(c => c.id === sel);

  return (
    <section
      id="personaxes"
      style={{
        position: 'relative',
        padding: m ? '4.5rem 0 3.5rem' : '8rem 0 7rem',
        overflow: 'hidden',
        background: 'linear-gradient(175deg, #060F1E 0%, #081427 40%, #0F1726 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 169, 110, 0.1) 0%, transparent 65%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107, 140, 174, 0.12) 0%, transparent 65%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 4rem', position: 'relative', zIndex: 10 }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: m ? '2.5rem' : '3.8rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.2rem' }}>
            <span style={{ width: '36px', height: '2px', background: '#C8A96E' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#E5B869', fontWeight: 700 }}>
              BENTO GRID · O ELENCO
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', justifyContent: 'space-between', alignItems: m ? 'flex-start' : 'flex-end', gap: '1.5rem' }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: m ? 'clamp(2.6rem, 9vw, 3.8rem)' : 'clamp(3.8rem, 6.5vw, 5.8rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.025em',
                color: '#FAF7F2',
                margin: 0,
              }}
            >
              Os <span style={{ fontStyle: 'italic', color: '#E5B869', fontWeight: 400 }}>personaxes</span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: m ? '14px' : '15.5px',
                lineHeight: 1.75,
                color: 'rgba(250, 247, 242, 0.72)',
                maxWidth: '560px',
                margin: 0,
              }}
            >
              Cada un carga co peso dunha verdade que a familia Pereira quixo enterrar. Preme en calquera tarxeta para abrir o perfil completo e escoitar o seu testemuño sonoro.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(12, 1fr)',
            gap: m ? '16px' : '22px',
          }}
        >
          {/* TILE 1: CONCHA PEREIRA (Bento Anchor - 7 cols) */}
          <motion.div
            layoutId="char-modal-concha"
            initial={{ opacity: 0, y: 40 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={m ? {} : { y: -6, scale: 1.01 }}
            onClick={() => setSel("concha")}
            style={{
              gridColumn: m ? 'span 1' : 'span 7',
              minHeight: m ? 'auto' : '440px',
              background: 'linear-gradient(135deg, #2D1420 0%, #170A12 100%)',
              borderRadius: '24px',
              border: '1.5px solid rgba(200, 169, 110, 0.35)',
              boxShadow: '0 20px 45px -10px rgba(0,0,0,0.7), 0 0 30px rgba(200, 169, 110, 0.1)',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              flexDirection: m ? 'column' : 'row',
            }}
          >
            <div style={{ position: 'relative', width: m ? '100%' : '44%', height: m ? '260px' : '100%', overflow: 'hidden', flexShrink: 0 }}>
              <img
                src="/manus-storage/faneca-concha-portrait.jpg"
                alt="Concha Pereira"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.9) contrast(1.05)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: m
                    ? 'linear-gradient(to bottom, transparent 40%, rgba(23,10,18,0.95) 100%)'
                    : 'linear-gradient(to right, transparent 50%, rgba(23,10,18,0.98) 100%)',
                }}
              />
              <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(10,5,8,0.75)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '4px 12px', border: '1px solid rgba(200,169,110,0.4)' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E5B869', fontWeight: 700 }}>
                  Protagonista · A Faneca Brava
                </span>
              </div>
            </div>

            <div style={{ flex: 1, padding: m ? '1.5rem' : '2.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A96E', fontWeight: 600 }}>
                    Voz · Sabela Hermida
                  </span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(200,169,110,0.18)', border: '1px solid rgba(200,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Volume2 size={15} color="#E5B869" />
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: m ? '1.8rem' : '2.3rem', fontWeight: 600, color: '#FAF7F2', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                  Concha Pereira
                </h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem', color: '#E5B869', margin: '0 0 16px' }}>
                  A fotógrafa indómita
                </p>

                <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(200, 169, 110, 0.08)', borderLeft: '3px solid #C8A96E', marginBottom: '16px' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? '13.5px' : '14.5px', color: 'rgba(250, 247, 242, 0.92)', margin: 0, lineHeight: 1.6 }}>
                    «Cando miro pola lente, deixo de ser a nena que collían. Por fin, son eu a que observa.»
                  </p>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {chars[0].traits.map((t, idx) => (
                    <span key={idx} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', fontWeight: 600, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(200,169,110,0.14)', color: '#FAF7F2', border: '1px solid rgba(200,169,110,0.25)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(200,169,110,0.18)' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.6)' }}>
                    Da infancia oprimida ao desquite silencioso
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, color: '#E5B869' }}>
                    Ver perfil <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TILE 2: FERNANDO PEREIRA (Bento Anchor - 5 cols) */}
          <motion.div
            layoutId="char-modal-fernando"
            initial={{ opacity: 0, y: 40 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={m ? {} : { y: -6, scale: 1.01 }}
            onClick={() => setSel("fernando")}
            style={{
              gridColumn: m ? 'span 1' : 'span 5',
              minHeight: m ? 'auto' : '440px',
              background: 'linear-gradient(135deg, #172638 0%, #0A131E 100%)',
              borderRadius: '24px',
              border: '1.5px solid rgba(107, 140, 174, 0.35)',
              boxShadow: '0 20px 45px -10px rgba(0,0,0,0.7), 0 0 30px rgba(107, 140, 174, 0.1)',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ position: 'relative', height: m ? '220px' : '230px', overflow: 'hidden' }}>
              <img
                src="/manus-storage/faneca-fernando-portrait.jpg"
                alt="Fernando Pereira"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85) contrast(1.05)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,19,30,0.98) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(10,19,30,0.8)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '4px 12px', border: '1px solid rgba(107,140,174,0.4)' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#90B4D8', fontWeight: 700 }}>
                  Narrador · Curmán
                </span>
              </div>
              <div style={{ position: 'absolute', top: '14px', right: '14px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(10,19,30,0.8)', border: '1px solid rgba(107,140,174,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Volume2 size={15} color="#90B4D8" />
              </div>
            </div>

            <div style={{ padding: m ? '1.5rem' : '1.8rem 2rem 2rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B8CAE', fontWeight: 600, marginBottom: '4px' }}>
                  Voz · Xaime López
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: m ? '1.7rem' : '2rem', fontWeight: 600, color: '#FAF7F2', margin: '0 0 2px' }}>
                  Fernando Pereira
                </h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.98rem', color: '#90B4D8', margin: '0 0 12px' }}>
                  O médico atormentado
                </p>

                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '13.5px', color: 'rgba(250, 247, 242, 0.85)', margin: '0 0 14px', lineHeight: 1.6 }}>
                  «Non podo durmir porque os ollos de Concha perséguenme cando pecho os meus.»
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {chars[1].traits.map((t, idx) => (
                    <span key={idx} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, padding: '3px 9px', borderRadius: '9999px', background: 'rgba(107,140,174,0.15)', color: '#FAF7F2', border: '1px solid rgba(107,140,174,0.28)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(107,140,174,0.2)' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.55)' }}>
                    Da culpa herdada á redención
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 700, color: '#90B4D8' }}>
                    Ver perfil <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TILE 3: MAMÁ CARME (Bento Bottom - 4 cols) */}
          <motion.div
            layoutId="char-modal-mama"
            initial={{ opacity: 0, y: 40 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={m ? {} : { y: -6, scale: 1.015 }}
            onClick={() => setSel("mama")}
            style={{
              gridColumn: m ? 'span 1' : 'span 4',
              minHeight: m ? 'auto' : '380px',
              background: 'linear-gradient(135deg, #251E17 0%, #120D09 100%)',
              borderRadius: '24px',
              border: '1.5px solid rgba(154, 138, 122, 0.3)',
              boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7)',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
              <img
                src="/manus-storage/faneca-mama-carme.jpg"
                alt="Mamá Carme"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.8) sepia(0.2)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,13,9,0.98) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(18,13,9,0.85)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '3px 10px', border: '1px solid rgba(154,138,122,0.4)' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4C4B5', fontWeight: 700 }}>
                  Antagonista · A Matriarca
                </span>
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(18,13,9,0.85)', border: '1px solid rgba(154,138,122,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Volume2 size={13} color="#D4C4B5" />
              </div>
            </div>

            <div style={{ padding: '1.4rem 1.6rem 1.6rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9A8A7A', fontWeight: 600, marginBottom: '2px' }}>
                  Voz · Alexandra Pacheco
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.55rem', fontWeight: 600, color: '#FAF7F2', margin: '0 0 2px' }}>
                  Mamá Carme
                </h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.9rem', color: '#D4C4B5', margin: '0 0 10px' }}>
                  A matriarca despótica
                </p>

                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '13px', color: 'rgba(250, 247, 242, 0.8)', margin: '0 0 12px', lineHeight: 1.55 }}>
                  «O apelido é o que nos sustenta. Un nome limpo vale máis ca todo o ouro.»
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                  {chars[2].traits.slice(0, 3).map((t, idx) => (
                    <span key={idx} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 600, padding: '2px 8px', borderRadius: '9999px', background: 'rgba(154,138,122,0.15)', color: '#FAF7F2', border: '1px solid rgba(154,138,122,0.25)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(154,138,122,0.2)' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', color: 'rgba(250,247,242,0.5)' }}>
                    Hipocrisía familiar
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', fontWeight: 700, color: '#D4C4B5' }}>
                    Ver perfil <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TILE 4: ANDREU PICART (Bento Bottom - 4 cols) */}
          <motion.div
            layoutId="char-modal-andreu"
            initial={{ opacity: 0, y: 40 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={m ? {} : { y: -6, scale: 1.015 }}
            onClick={() => setSel("andreu")}
            style={{
              gridColumn: m ? 'span 1' : 'span 4',
              minHeight: m ? 'auto' : '380px',
              background: 'linear-gradient(135deg, #1C2720 0%, #0C1510 100%)',
              borderRadius: '24px',
              border: '1.5px solid rgba(139, 115, 85, 0.35)',
              boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7)',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
              <img
                src="/manus-storage/faneca-andreu-portrait.png"
                alt="Andreu Picart"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,21,16,0.98) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(12,21,16,0.85)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '3px 10px', border: '1px solid rgba(139,115,85,0.4)' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D2BA99', fontWeight: 700 }}>
                  Confidente · Barcelona
                </span>
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(12,21,16,0.85)', border: '1px solid rgba(139,115,85,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Volume2 size={13} color="#D2BA99" />
              </div>
            </div>

            <div style={{ padding: '1.4rem 1.6rem 1.6rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: '2px' }}>
                  Voz · Jordi Pujol
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.55rem', fontWeight: 600, color: '#FAF7F2', margin: '0 0 2px' }}>
                  Andreu Picart
                </h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.9rem', color: '#D2BA99', margin: '0 0 10px' }}>
                  O fotógrafo catalán
                </p>

                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '13px', color: 'rgba(250, 247, 242, 0.8)', margin: '0 0 12px', lineHeight: 1.55 }}>
                  «Concha non fotografaba para vivir. Fotografaba para desquitarse.»
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                  {chars[3].traits.slice(0, 3).map((t, idx) => (
                    <span key={idx} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 600, padding: '2px 8px', borderRadius: '9999px', background: 'rgba(139,115,85,0.15)', color: '#FAF7F2', border: '1px solid rgba(139,115,85,0.25)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(139,115,85,0.2)' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', color: 'rgba(250,247,242,0.5)' }}>
                    Ponte co pasado
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', fontWeight: 700, color: '#D2BA99' }}>
                    Ver perfil <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TILE 5: ENCARNA PEREIRA (Bento Bottom - 4 cols) */}
          <motion.div
            layoutId="char-modal-encarna"
            initial={{ opacity: 0, y: 40 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={m ? {} : { y: -6, scale: 1.015 }}
            onClick={() => setSel("encarna")}
            style={{
              gridColumn: m ? 'span 1' : 'span 4',
              minHeight: m ? 'auto' : '380px',
              background: 'linear-gradient(135deg, #221B2B 0%, #100C16 100%)',
              borderRadius: '24px',
              border: '1.5px solid rgba(122, 111, 138, 0.35)',
              boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7)',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
              <img
                src="/manus-storage/encarna-portrait.jpg"
                alt="Encarna Pereira"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16,12,22,0.98) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(16,12,22,0.85)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '3px 10px', border: '1px solid rgba(122,111,138,0.4)' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#BDB3D1', fontWeight: 700 }}>
                  Contrapunto · Irmá
                </span>
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16,12,22,0.85)', border: '1px solid rgba(122,111,138,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Volume2 size={13} color="#BDB3D1" />
              </div>
            </div>

            <div style={{ padding: '1.4rem 1.6rem 1.6rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7A6F8A', fontWeight: 600, marginBottom: '2px' }}>
                  Voz · Anna Pujol
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.55rem', fontWeight: 600, color: '#FAF7F2', margin: '0 0 2px' }}>
                  Encarna Pereira
                </h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.9rem', color: '#BDB3D1', margin: '0 0 10px' }}>
                  A supervivente silenciosa
                </p>

                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '13px', color: 'rgba(250, 247, 242, 0.8)', margin: '0 0 12px', lineHeight: 1.55 }}>
                  «Eu quedei. Alguén tiña que quedar para que a casa non se derrubara.»
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                  {chars[4].traits.slice(0, 3).map((t, idx) => (
                    <span key={idx} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 600, padding: '2px 8px', borderRadius: '9999px', background: 'rgba(122,111,138,0.15)', color: '#FAF7F2', border: '1px solid rgba(122,111,138,0.25)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(122,111,138,0.2)' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', color: 'rgba(250,247,242,0.5)' }}>
                    Resistencia dende dentro
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', fontWeight: 700, color: '#BDB3D1' }}>
                    Ver perfil <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal Interactivo Completo */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {sel && selChar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setSel(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                display: 'flex',
                alignItems: m ? 'flex-end' : 'center',
                justifyContent: 'center',
                padding: m ? '0' : '2rem',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5,7,12,0.88)', backdropFilter: 'blur(16px)' }} />
              <motion.div
                layoutId={`char-modal-${selChar.id}`}
                initial={{ scale: 0.95, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 40, opacity: 0, transition: { type: 'tween', duration: 0.25, ease: 'easeOut' } }}
                transition={{ type: 'spring', damping: 24, stiffness: 220 }}
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: '920px',
                  width: '100%',
                  maxHeight: m ? '94vh' : '86vh',
                  background: `linear-gradient(145deg, ${selChar.cardBg}FE, #070B13)`,
                  border: `1.5px solid ${selChar.color}35`,
                  borderTop: `1.5px solid ${selChar.color}60`,
                  borderRadius: m ? '32px 32px 0 0' : '28px',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.85)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {m && (
                  <div style={{ width: '100%', height: '24px', position: 'absolute', top: 0, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.35)' }} />
                  </div>
                )}

                <div
                  style={{ overflowY: 'auto', flex: 1, borderRadius: m ? '32px 32px 0 0' : '28px', WebkitOverflowScrolling: 'touch' }}
                  onPointerDown={e => {
                    if (e.currentTarget.scrollTop > 0) e.stopPropagation();
                  }}
                >
                  <div style={{ display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined, gridTemplateColumns: m ? '1fr' : '2fr 3fr' }}>
                    <motion.div
                      drag={m ? "y" : false}
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={0.4}
                      onDragEnd={(e, info) => {
                        if (info.offset.y > 60) setSel(null);
                      }}
                      style={{ position: 'relative', minHeight: m ? '50vh' : '520px', overflow: 'hidden', flexShrink: 0, borderRadius: m ? '32px 32px 0 0' : undefined, cursor: m ? 'grab' : 'default' }}
                    >
                      <img
                        src={selChar.img}
                        alt={selChar.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.05)', display: 'block', minHeight: m ? '50vh' : '520px', pointerEvents: 'none' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: m
                            ? 'linear-gradient(to bottom, transparent 35%, rgba(7,11,19,0.92) 100%)'
                            : 'linear-gradient(to right, transparent 50%, rgba(7,11,19,0.98) 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </motion.div>

                    <div style={{ padding: m ? '1.5rem 1.4rem' : '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <button
                        onClick={() => setSel(null)}
                        style={{
                          position: 'absolute',
                          top: m ? '24px' : '16px',
                          right: m ? '16px' : '16px',
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.12)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#FAF7F2',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                        }}
                      >
                        ✕
                      </button>

                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: selChar.color, marginBottom: '8px', fontWeight: 700 }}>
                        {selChar.role}
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: m ? '2rem' : '2.6rem', color: '#FAF7F2', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '6px' }}>
                        {selChar.name}
                      </h3>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? '1rem' : '1.1rem', color: selChar.color, marginBottom: '1.4rem' }}>
                        {selChar.alias}
                      </p>

                      <AudioPlayer src={selChar.audio} color={selChar.color} name={selChar.name.split(' ')[0]} voiceActor={selChar.voiceActor} />

                      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.35), transparent)', margin: '1.4rem 0 1.1rem' }} />
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: m ? '14px' : '15px', lineHeight: 1.85, color: 'rgba(250,247,242,0.88)', marginBottom: '1.1rem' }}>
                        {selChar.desc}
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', color: '#90B4D8', letterSpacing: '0.06em', marginBottom: '0.9rem' }}>
                        {selChar.arc}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.2rem' }}>
                        {selChar.traits.map((t, j) => (
                          <span key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', padding: '4px 11px', borderRadius: '9999px', backgroundColor: `${selChar.color}18`, color: selChar.color, border: `1px solid ${selChar.color}35`, fontWeight: 600 }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div style={{ padding: '14px 18px', borderRadius: '14px', backgroundColor: 'rgba(200,169,110,0.08)', borderLeft: `3px solid ${selChar.color}` }}>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? '14px' : '15.5px', color: '#FAF7F2', lineHeight: 1.7, margin: 0 }}>
                          "{selChar.quote}"
                        </p>
                      </div>
                      {m && <div style={{ height: '2.5rem' }} />}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
