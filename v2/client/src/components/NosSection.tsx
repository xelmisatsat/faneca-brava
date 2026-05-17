import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

const G = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(48px)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderTop: '1px solid rgba(255,255,255,0.22)',
  borderRadius: '24px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
};

export default function NosSection() {
  const [mounted, setMounted] = useState(false);
  const m = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

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
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newProgress = parseFloat(e.target.value);
    const duration = videoRef.current.duration || 0;
    videoRef.current.currentTime = (newProgress / 100) * duration;
    setProgress(newProgress);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Determine correct video path dynamically based on whether it is Capacitor (APK) or Web
  const videoSrc = (window as any).Capacitor ? "assets/images/nos-video.mp4" : "/manus-storage/nos-video.mp4";
  const junImg = (window as any).Capacitor ? "assets/images/opinion-jun.jpg" : "/manus-storage/opinion-jun.jpg";
  const alvaroImg = (window as any).Capacitor ? "assets/images/opinion-alvaro.jpg" : "/manus-storage/opinion-alvaro.jpg";

  return (
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

        {/* Layout en Reixa Adaptado */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '1fr 1fr',
          gap: m ? '2rem' : '3.5rem',
          alignItems: 'center'
        }}>
          {/* Columna Video: Reprodutor Personalizado */}
          <motion.div
            initial={{ opacity: 0, x: m ? 0 : -50 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...G, overflow: 'hidden', position: 'relative' }}
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
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              />

              {/* Botón central Play grande en pausa */}
              {!playing && (
                <div 
                  onClick={togglePlay}
                  style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.3)', cursor: 'pointer', transition: 'background 0.3s'
                  }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    style={{
                      width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(200,169,110,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(200,169,110,0.4)',
                      paddingLeft: '4px'
                    }}
                  >
                    <Play size={26} color="#08080D" fill="#08080D" />
                  </motion.div>
                </div>
              )}

              {/* Barra de controis customizada */}
              <div 
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(8,8,13,0.95) 0%, rgba(8,8,13,0.4) 60%, transparent 100%)',
                  padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 20
                }}
              >
                {/* Slider de progreso */}
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  style={{
                    width: '100%', accentColor: '#C8A96E', background: 'rgba(255,255,255,0.2)',
                    height: '4px', borderRadius: '2px', cursor: 'pointer', outline: 'none'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', width: '100%', justifyContentSpace: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Play / Pause */}
                    <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0 }}>
                      {playing ? <Pause size={18} /> : <Play size={18} fill="#EAE2D2" />}
                    </button>

                    {/* Mute / Unmute */}
                    <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0 }}>
                      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  {/* Fullscreen */}
                  <button onClick={handleFullscreen} style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0, marginLeft: 'auto' }}>
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#C8A96E', marginBottom: '8px' }}>
                Atmosfera Nocturna
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', lineHeight: 1.6, color: '#8B9BB4', margin: 0 }}>
                Un reflexo do insomnio e a busca constante de respostas que atravesan toda a obra de Manuel Portas.
              </p>
            </div>
          </motion.div>

          {/* Columna Imaxes e Creadores */}
          <motion.div
            initial={{ opacity: 0, x: m ? 0 : 50 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              {/* Imaxe Jun */}
              <div style={{ flex: 1, ...G, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                  <img src={junImg} alt="Jun Sieira Gerpe" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) saturate(0.8)' }} />
                </div>
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#EAE2D2' }}>Jun Sieira Gerpe</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8A96E', marginTop: '3px' }}>Deseño & Dirección</div>
                </div>
              </div>

              {/* Imaxe Álvaro */}
              <div style={{ flex: 1, ...G, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                  <img src={alvaroImg} alt="Álvaro Villar Gómez" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) saturate(0.8)' }} />
                </div>
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#EAE2D2' }}>Álvaro Villar Gómez</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B9BB4', marginTop: '3px' }}>Programación & Código</div>
                </div>
              </div>
            </div>

            {/* Texto de compromiso */}
            <div style={{ ...G, padding: '1.5rem' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(234,226,210,0.85)', margin: 0 }}>
                Este traballo nace da admiración pola novela de <strong>Manuel Portas</strong> e o desexo de darlle un espazo dixital digno da súa calidade. Coidamos cada animación, tipografía e recurso sonoro para envolver ao lector no universo de <em>Faneca Brava</em>.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
