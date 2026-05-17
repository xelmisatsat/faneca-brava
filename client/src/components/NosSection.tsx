import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from "lucide-react";

const G = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(48px)',
  WebkitBackdropFilter: 'blur(48px)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderTop: '1px solid rgba(255,255,255,0.22)',
  borderRadius: '24px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
};

type LightboxItem = { src: string; type: 'image' | 'video' };

export default function NosSection() {
  const [mounted, setMounted] = useState(false);
  const m = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [lightbox]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.warn(err));
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress((videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const v = parseFloat(e.target.value);
    videoRef.current.currentTime = (v / 100) * (videoRef.current.duration || 0);
    setProgress(v);
  };

  const videoSrc = "/manus-storage/nos-video.mp4";
  const junImg = "/manus-storage/opinion-jun.jpg";
  const alvaroImg = "/manus-storage/opinion-alvaro.jpg";

  const creators = [
    { name: "Jun Sieira Gerpe", role: "Código e Deseño", color: "#C8A96E", img: junImg },
    { name: "Álvaro Villar Gómez", role: "Colaborador", color: "#8B9BB4", img: alvaroImg },
  ];

  return (
    <>
      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.94)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%', width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#EAE2D2', cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '92vw', maxHeight: '88vh', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}
            >
              {lightbox.type === 'image' ? (
                <img src={lightbox.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', maxHeight: '88vh' }} />
              ) : (
                <video src={lightbox.src} controls autoPlay loop playsInline
                  style={{ width: '100%', maxHeight: '88vh', display: 'block', background: '#000' }} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="nos" style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 80%, rgba(26,39,68,0.25) 0%, transparent 50%)' }} />

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10, width: '100%' }}>
          
          {/* Cabeceira */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
            animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: m ? '2.5rem' : '4rem', textAlign: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}>
              <motion.div initial={{ scaleX: 0 }} animate={mounted ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
                style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8A96E)', transformOrigin: 'right' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>O Proxecto</span>
              <motion.div initial={{ scaleX: 0 }} animate={mounted ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
                style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#EAE2D2' }}>
              Nós, os <span style={{ color: '#C8A96E' }}>Creadores</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.9rem' : '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '600px', margin: '1.5rem auto 0' }}>
              Unha viaxe dixital a través da memoria, do insomnio e da revelación fotográfica de Faneca Brava.
            </p>
          </motion.div>

          {/* Layout principal */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : '1fr 1fr',
            gap: m ? '1.5rem' : '3.5rem',
            alignItems: 'start'
          }}>
            {/* Vídeo */}
            <motion.div
              initial={{ opacity: 0, x: m ? 0 : -50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...G, overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  loop
                  muted={muted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', display: 'block' }}
                />

                {/* Botón central Play */}
                {!playing && (
                  <div
                    onClick={togglePlay}
                    style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,0,0,0.28)', cursor: 'pointer',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      style={{
                        width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(200,169,110,0.92)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 28px rgba(200,169,110,0.45)', paddingLeft: '3px',
                      }}
                    >
                      <Play size={24} color="#08080D" fill="#08080D" />
                    </motion.div>
                  </div>
                )}

                {/* Controis inferiores */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(8,8,13,0.95) 0%, transparent 100%)',
                  padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 20,
                }}>
                  <input type="range" min="0" max="100" value={progress} onChange={handleProgressChange}
                    style={{ width: '100%', accentColor: '#C8A96E', height: '3px', borderRadius: '2px', cursor: 'pointer', outline: 'none', background: `linear-gradient(to right, #C8A96E ${progress}%, rgba(255,255,255,0.2) ${progress}%)` }} />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0, display: 'flex' }}>
                        {playing ? <Pause size={16} /> : <Play size={16} fill="#EAE2D2" />}
                      </button>
                      <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0, display: 'flex' }}>
                        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                    <button
                      onClick={() => setLightbox({ src: videoSrc, type: 'video' })}
                      style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0, display: 'flex', marginLeft: 'auto' }}
                      title="Ver en pantalla completa"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ padding: m ? '1.2rem' : '1.5rem' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#C8A96E', margin: '0 0 6px' }}>
                  Atmosfera Nocturna
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.83rem', lineHeight: 1.6, color: '#8B9BB4', margin: 0 }}>
                  Un reflexo do insomnio e a busca constante de respostas que atravesan toda a obra de Manuel Portas.
                </p>
              </div>
            </motion.div>

            {/* Creadores + texto */}
            <motion.div
              initial={{ opacity: 0, x: m ? 0 : 50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {/* Cards creadores — redeseñados para móbil */}
              {creators.map((cr, i) => (
                <motion.div
                  key={cr.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    ...G,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflow: 'hidden',
                    gap: 0,
                    cursor: 'pointer',
                  }}
                  onClick={() => setLightbox({ src: cr.img, type: 'image' })}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Imaxe á esquerda */}
                  <div style={{
                    width: m ? '100px' : '130px',
                    minWidth: m ? '100px' : '130px',
                    height: m ? '100px' : '130px',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                  }}>
                    <img
                      src={cr.img}
                      alt={cr.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.82) saturate(0.75)', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(8,8,13,0.6) 100%)' }} />
                    {/* Icona expand */}
                    <div style={{
                      position: 'absolute', bottom: '8px', right: '8px',
                      background: 'rgba(200,169,110,0.15)', borderRadius: '6px', padding: '4px',
                      color: '#C8A96E', display: 'flex',
                    }}>
                      <Maximize2 size={12} />
                    </div>
                  </div>

                  {/* Info á dereita */}
                  <div style={{ padding: m ? '1rem 1.1rem' : '1.4rem 1.5rem', flex: 1 }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: m ? '1.2rem' : '1.4rem',
                      fontWeight: 300,
                      color: '#EAE2D2',
                      lineHeight: 1.2,
                      marginBottom: '6px',
                    }}>{cr.name}</div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '9.5px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: cr.color,
                    }}>{cr.role}</div>
                    <div style={{
                      marginTop: '10px',
                      height: '1px',
                      background: `linear-gradient(90deg, ${cr.color}50, transparent)`,
                      width: '60%',
                    }} />
                  </div>
                </motion.div>
              ))}

              {/* Texto compromiso */}
              <div style={{ ...G, padding: m ? '1.2rem' : '1.5rem' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', lineHeight: 1.75, color: 'rgba(234,226,210,0.85)', margin: 0 }}>
                  Este traballo nace da admiración pola novela de <strong>Manuel Portas</strong> e o desexo de darlle un espazo dixital digno da súa calidade. Coidamos cada animación, tipografía e recurso sonoro para envolver ao lector no universo de <em>Faneca Brava</em>.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}
