import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const chars = [
  { id: "concha", name: "Concha Pereira", alias: "A Faneca Brava", role: "Protagonista",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-concha-portrait-ZyBRp5FRRbMYRNpmNDvaVU.webp",
    audio: "/audios/concha.mp3", color: "#C8A96E", cardBg: "#2A1520", voiceActor: "Sabela Hermida",
    desc: "Orfa de nai, co pai emigrado, Concha crece baixo a tutela opresiva de Mamá Carme. Sofre o maltrato físico da mestra Dona Remedios —que lle fai sangrar as mans a golpes— e o acoso do cura Don Anselmo. Acusada falsamente do incendio da escola, é expulsada da familia. Foxe a Barcelona onde se converte en paparazzi de éxito, usando a cámara como arma de desquite contra os poderosos.",
    traits: ["Feroz", "Silenciosa", "Rebelde", "Libre", "Xusticeira"],
    quote: "Cando miro pola lente, deixo de ser a nena que collían. Por fin, son eu a que observa.",
    arc: "Da infancia oprimida ao desquite silencioso" },
  { id: "fernando", name: "Fernando Pereira", alias: "O médico atormentado", role: "Narrador",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-fernando-portrait-EQpQqF6VEH5zWNhiMpjMkL.webp",
    audio: "/audios/fernando.mp3", color: "#6B8CAE", cardBg: "#152535", voiceActor: "Xaime López",
    desc: "Médico de Santiago de Compostela que sofre de insomnio severo. As olleiras fórmanlle un medio arco azul escuro. Os seus síntomas son a somatización dunha profunda culpa herdada. Obsesionado con descubrir a verdade sobre a súa curmá Concha, investiga a través de conversas coa tía Lela e con Andreu Picart no Hostal dos Reis Católicos.",
    traits: ["Atormentado", "Obsesivo", "Culpable", "Determinado"],
    quote: "Non podo durmir porque os ollos de Concha perséguenme cando pecho os meus.",
    arc: "Da culpa herdada á redención a través da verdade" },
  { id: "mama", name: "Mamá Carme", alias: "A matriarca", role: "Antagonista",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-mama-carme-f7k2dQYFH5zPEkXNWFnfCL.webp",
    audio: "/audios/carme.mp3", color: "#9A8A7A", cardBg: "#251E16", voiceActor: "Alexandra Pacheco",
    desc: "Matriarca do clan Pereira. Impón unha disciplina despótica e prioriza as aparencias sociais por riba do amor. Berraba botando sapos pola boca e batendo coas palmas das mans nas coxas. Prefire ocultar monstros reais e castigar á vítima para manter a imaxe de familia respectable e católica.",
    traits: ["Despótica", "Hipócrita", "Fría", "Autoritaria"],
    quote: "O apelido é o que nos sustenta. Un nome limpo vale máis ca todo o ouro.",
    arc: "A autoridade moral que encobre a inxustiza" },
  { id: "andreu", name: "Andreu Picart", alias: "O fotógrafo catalán", role: "Confidente",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-andreu-VAxSfuAXwczWNcuCm2shyJ.webp",
    audio: "/audios/andreu.mp3", color: "#8B7355", cardBg: "#1A2520", voiceActor: "Jordi Pujol",
    desc: "Fotógrafo catalán veterano que coñeceu a Concha cando chegou a Barcelona. Viches como se converteu nunha das mellores paparazzi da cidade. Dicíalle que estaba xogando con lume. É a ponte entre o pasado de Concha e o presente de Fernando.",
    traits: ["Observador", "Sabio", "Melancólico", "Leal"],
    quote: "Concha non fotografaba para vivir. Fotografaba para desquitarse.",
    arc: "O testemuño que conecta pasado e presente" },
  { id: "encarna", name: "Encarna Pereira", alias: "A supervivente", role: "O contrapunto",
    img: "/manus-storage/encarna-portrait.jpg",
    audio: "/audios/encarna.mp3", color: "#7A6F8A", cardBg: "#1E1A28", voiceActor: "Anna Pujol",
    desc: "Irmá pequena de Concha, tamén orfa e criada por Mamá Carme. Mentres Concha é a rebeldía e a fuxida, Encarna é o reflexo doutro tipo de supervivencia feminina: a submisión calculada. Acata as normas da matriarca, cala, obedece e resiste dende dentro. Dúas irmás, dous camiños opostos fronte á mesma opresión.",
    traits: ["Calada", "Resignada", "Resiliente", "Sombra"],
    quote: "Eu quedei. Alguén tiña que quedar para que a casa não se derrubara.",
    arc: "A indómita vs. a supervivente: dúas respostas á mesma ferida" },
];

/* Card style — solid bg per character, no glassmorphism */
const cardStyle = (bg: string) => ({
  background: bg,
  borderRadius: '16px',
  boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.06)',
});

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
    <div style={{ background: `linear-gradient(135deg, ${color}10, ${color}05)`, border: `1px solid ${color}25`, borderRadius: '16px', padding: '14px 16px', backdropFilter: 'blur(20px)' }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: `${color}80`, marginBottom: '10px' }}>
        Voz · {voiceActor}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Botón play/pause */}
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
            background: isPlaying ? `linear-gradient(135deg, ${color}50, ${color}25)` : `linear-gradient(135deg, ${color}30, ${color}12)`,
            border: `1.5px solid ${color}${isPlaying ? '90' : '50'}`,
            boxShadow: isPlaying ? `0 0 20px ${color}35, 0 0 40px ${color}15` : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.3s ease',
          }}
        >
          {state === 'loading' ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              style={{ width: '16px', height: '16px', border: `2px solid ${color}30`, borderTop: `2px solid ${color}`, borderRadius: '50%' }} />
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

        {/* Info + ondas + progreso */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: isPlaying ? color : 'rgba(234,226,210,0.6)', letterSpacing: '0.02em', marginBottom: '6px', transition: 'color 0.3s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Barras de onda */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '20px', flexShrink: 0 }}>
              {WAVE_BARS.map((h, i) => (
                <motion.div key={i}
                  animate={isPlaying ? { scaleY: [h * 0.3 + 0.1, h, h * 0.5, h * 1.1, h * 0.3 + 0.1] } : { scaleY: 0.15 }}
                  transition={isPlaying ? { duration: 0.5 + i * 0.06, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 } : { duration: 0.4 }}
                  style={{ width: '2px', height: '20px', borderRadius: '2px', background: isPlaying ? color : `${color}35`, transformOrigin: 'center', transition: 'background 0.3s' }}
                />
              ))}
            </div>
            {/* Barra de progreso clicable */}
            <div onClick={handleSeek} style={{ flex: 1, height: '3px', background: `${color}20`, borderRadius: '3px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
              <motion.div style={{ height: '100%', width: `${progress * 100}%`, background: `linear-gradient(90deg, ${color}80, ${color})`, borderRadius: '3px' }} />
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
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);
  
  // Bloquear NavPill cando o modal está aberto
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
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden', background: '#07162C' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 30%, rgba(26,39,68,0.25) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }} animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9 }} style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }} style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>O Elenco</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Os <span style={{ color: '#C8A96E' }}>personaxes</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '600px', marginTop: '1.5rem' }}>
            Cada un carga co peso dunha verdade que a familia Pereira quixo enterrar. Preme para descubrir a súa historia e escoitar o seu testemuño.
          </p>
        </motion.div>

        {/* Grid 5 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: m ? '12px' : '20px' }}>
          {chars.map((c, i) => (
            <motion.div key={c.id}
              layoutId={`char-modal-${c.id}`}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={v ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={m ? {} : { y: -8, scale: 1.02 }}
              onClick={() => setSel(c.id)}
              style={{ ...cardStyle(c.cardBg), overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <motion.img src={c.img} alt={c.name}
                  whileHover={m ? {} : { scale: 1.08 }} transition={{ duration: 0.6 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.72) saturate(0.85)', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(8,8,13,0.96) 0%, rgba(8,8,13,0.1) 50%, transparent 100%)` }} />
                {/* Badge rol */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.45)', borderRadius: '9999px', padding: '3px 10px' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.1em', color: c.color }}>{c.role}</span>
                </div>
                {/* Icona audio */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 1.5L10 6L2 10.5V1.5Z" fill={c.color} />
                  </svg>
                </div>
                {/* Info */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: m ? '12px' : '18px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '1rem' : '1.25rem', fontWeight: 300, color: '#EAE2D2' }}>{c.name}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.78rem', color: c.color, marginTop: '2px' }}>{c.alias}</div>
                  {!m && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                      {c.traits.slice(0, 3).map((t, j) => (
                        <span key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', padding: '2px 7px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.06)', color: '#8B9BB4', border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {sel && selChar && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSel(null)}
              style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: m ? 'flex-end' : 'center', justifyContent: 'center', padding: m ? '0' : '2rem' }}
            >
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(8,8,13,0.85)', backdropFilter: 'blur(16px)' }} />
              <motion.div
                layoutId={`char-modal-${selChar.id}`}
                initial={{ scale: 0.95, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 40, opacity: 0, transition: { type: 'tween', duration: 0.25, ease: 'easeOut' } }}
                transition={{ type: 'spring', damping: 24, stiffness: 220 }}
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'relative', maxWidth: '900px', width: '100%',
                  maxHeight: m ? '95vh' : '85vh',
                  background: `linear-gradient(135deg, ${selChar.cardBg}FE, #070B13)`,
                  border: `1px solid ${selChar.color}25`,
                  borderTop: `1px solid ${selChar.color}40`,
                  borderRadius: m ? '32px 32px 0 0' : '28px',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Arrastro visual no móbil (drag handle) */}
                {m && (
                  <div style={{ width: '100%', height: '24px', position: 'absolute', top: 0, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.3)' }} />
                  </div>
                )}
                
                {/* Contido scrollable separado para non bloquear o drag da cabeceira no móbil se fose necesario */}
                <div 
                  style={{ overflowY: 'auto', flex: 1, borderRadius: m ? '32px 32px 0 0' : '28px', WebkitOverflowScrolling: 'touch' }}
                  onPointerDown={e => {
                    // Evitar que o scroll interfira co drag en dispositivos táctiles se non estamos arriba do todo
                    if (e.currentTarget.scrollTop > 0) e.stopPropagation();
                  }}
                >
                  <div style={{ display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined, gridTemplateColumns: m ? '1fr' : '2fr 3fr' }}>
                    {/* Imaxe */}
                    <motion.div 
                      drag={m ? "y" : false}
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={0.4}
                      onDragEnd={(e, info) => {
                        if (info.offset.y > 60) setSel(null);
                      }}
                      style={{ position: 'relative', minHeight: m ? '55vh' : '500px', overflow: 'hidden', flexShrink: 0, borderRadius: m ? '32px 32px 0 0' : undefined, cursor: m ? 'grab' : 'default' }}>
                      <img src={selChar.img} alt={selChar.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)', display: 'block', minHeight: m ? '55vh' : '500px', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', inset: 0, background: m ? 'linear-gradient(to bottom, transparent 40%, rgba(8,8,13,0.85) 100%)' : 'linear-gradient(to right, transparent 55%, rgba(8,8,13,0.95) 100%)', pointerEvents: 'none' }} />
                    </motion.div>

                    {/* Contido */}
                    <div style={{ padding: m ? '1.5rem 1.5rem' : '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <button onClick={() => setSel(null)}
                        style={{ position: 'absolute', top: m ? '24px' : '14px', right: m ? '16px' : '14px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: '#EAE2D2', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>✕</button>

                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: selChar.color, marginBottom: '8px' }}>{selChar.role}</div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: m ? '1.9rem' : '2.5rem', color: '#EAE2D2', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '6px' }}>{selChar.name}</h3>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? '0.95rem' : '1.05rem', color: selChar.color, marginBottom: '1.25rem' }}>{selChar.alias}</p>

                      {/* AUDIO PLAYER */}
                      <AudioPlayer src={selChar.audio} color={selChar.color} name={selChar.name.split(' ')[0]} voiceActor={selChar.voiceActor} />

                      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)', margin: '1.25rem 0 1rem' }} />
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.85rem' : '0.95rem', lineHeight: 1.85, color: 'rgba(234,226,210,0.85)', marginBottom: '1rem' }}>{selChar.desc}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{selChar.arc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
                        {selChar.traits.map((t, j) => (
                          <span key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', padding: '4px 10px', borderRadius: '9999px', backgroundColor: `${selChar.color}15`, color: selChar.color, border: `1px solid ${selChar.color}30` }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ padding: '12px 16px', borderRadius: '14px', backgroundColor: 'rgba(200,169,110,0.06)', borderLeft: `2px solid ${selChar.color}60` }}>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? '0.9rem' : '1rem', color: '#EAE2D2', lineHeight: 1.7 }}>"{selChar.quote}"</p>
                      </div>
                      {m && <div style={{ height: '3rem' }} />}
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
