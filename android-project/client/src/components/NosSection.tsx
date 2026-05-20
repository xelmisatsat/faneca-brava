import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const G = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(48px)',
  WebkitBackdropFilter: 'blur(48px)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderTop: '1px solid rgba(255,255,255,0.22)',
  borderRadius: '24px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
};

const PHOTOS = [
  {
    id: "jun",
    title: "Jun Sieira",
    subtitle: "Deseño & Dirección",
    img: (window as any).Capacitor ? "assets/images/opinion-jun.jpg" : "/manus-storage/opinion-jun.jpg"
  },
  {
    id: "alvaro",
    title: "Álvaro Villar",
    subtitle: "Programación & Código",
    img: (window as any).Capacitor ? "assets/images/opinion-alvaro.jpg" : "/manus-storage/opinion-alvaro.jpg"
  },
  {
    id: "santiago",
    title: "Santiago de Compostela",
    subtitle: "Rúas de pedra e choiva",
    img: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cies",
    title: "Illas Cíes",
    subtitle: "Praia de Rodas, area e mar",
    img: "https://images.unsplash.com/photo-1544913716-6081a1fd0411?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fragas",
    title: "Fragas do Eume",
    subtitle: "Bosque máxico e néboa",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "sil",
    title: "Canón do Sil",
    subtitle: "Ribeira Sacra",
    img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "combarro",
    title: "Combarro",
    subtitle: "Hórreos ao pé da ría",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "barona",
    title: "Castro de Baroña",
    subtitle: "Historia celta sobre o mar",
    img: "https://images.unsplash.com/photo-1579712267787-0431e1e39ff7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "lugo",
    title: "Muralla de Lugo",
    subtitle: "Pedra romana milenaria",
    img: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "loiba",
    title: "Acantilados de Loiba",
    subtitle: "O mellor banco do mundo",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "catedrais",
    title: "Praia das Catedrais",
    subtitle: "Catedrais de pedra e mar",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fisterra",
    title: "Cabo Fisterra",
    subtitle: "A fin do mundo antigo",
    img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=600&auto=format&fit=crop"
  }
];

export default function NosSection() {
  const [mounted, setMounted] = useState(false);
  const m = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [shutterFlash, setShutterFlash] = useState(false);
  const [reelVisible, setReelVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof PHOTOS[0] | null>(null);

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
    setProgress((videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const v = parseFloat(e.target.value);
    videoRef.current.currentTime = (v / 100) * (videoRef.current.duration || 0);
    setProgress(v);
  };

  const handleCameraClick = async () => {
    if (isTakingPhoto) return;
    setIsTakingPhoto(true);
    setShutterFlash(true);
    
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (e) {}

    setTimeout(() => {
      setShutterFlash(false);
      setIsTakingPhoto(false);
      setReelVisible(true);
    }, 280);
  };

  const videoSrc = (window as any).Capacitor ? "assets/images/nos-video.mp4" : "/manus-storage/nos-video.mp4";
  const cameraSrc = (window as any).Capacitor ? "assets/images/camera_sticker.png" : "/manus-storage/camera_sticker.png";

  return (
    <>
      {/* Visual shutter flash */}
      <AnimatePresence>
        {shutterFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'fixed', inset: 0, backgroundColor: '#FFF', zIndex: 99999, pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* Lightbox details modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed', inset: 0, backgroundColor: 'rgba(5,5,8,0.95)', backdropFilter: 'blur(15px)',
              zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: m ? '1rem' : '3rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative', width: '100%', maxWidth: '1200px', height: '100%', maxHeight: '90vh',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute', top: m ? '-30px' : '-40px', right: '0', background: 'none', border: 'none',
                  color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', zIndex: 10
                }}
              >
                <X size={24} /> Pechar
              </button>

              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={selectedPhoto.img}
                  alt={selectedPhoto.title}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                />
              </div>
              
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: m ? '1.5rem' : '2rem', fontWeight: 500, color: '#FFF', margin: 0 }}>
                  {selectedPhoto.title}
                </h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '0.9rem' : '1rem', color: '#AAA', marginTop: '8px', marginBottom: 0 }}>
                  {selectedPhoto.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film Reel Overlay */}
      <AnimatePresence>
        {reelVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
              zIndex: 99990, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
            }}
          >
            <button
              onClick={() => setReelVisible(false)}
              style={{
                position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none',
                color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', zIndex: 100
              }}
            >
              <X size={24} /> Pechar Carrete
            </button>

            {/* Film Strip */}
            <div style={{ width: '100%', overflowX: 'auto', padding: '2rem 0', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ 
                display: 'inline-flex', background: '#0a0a0a', padding: '16px 20px', 
                borderTop: '2px solid #222', borderBottom: '2px solid #222', position: 'relative'
              }}>
                {/* Perforations Top/Bottom */}
                <div style={{ position: 'absolute', top: '4px', left: 0, right: 0, height: '6px', background: 'repeating-linear-gradient(90deg, transparent, transparent 12px, #222 12px, #222 18px)' }} />
                <div style={{ position: 'absolute', bottom: '4px', left: 0, right: 0, height: '6px', background: 'repeating-linear-gradient(90deg, transparent, transparent 12px, #222 12px, #222 18px)' }} />
                
                {PHOTOS.map((photo, i) => (
                  <motion.div 
                    key={photo.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedPhoto(photo)}
                    style={{
                      width: m ? '240px' : '320px', height: m ? '160px' : '220px', flexShrink: 0,
                      margin: '0 8px', border: '1px solid #333', background: '#000', cursor: 'pointer', overflow: 'hidden'
                    }}
                  >
                    <img src={photo.img} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2) contrast(1.1) brightness(0.9)' }} />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <p style={{ color: '#888', marginTop: '20px', fontFamily: "'DM Sans', sans-serif" }}>
              Desliza para ver máis. Preme unha foto para ampliala.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="nos" style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 80%, rgba(26,39,68,0.25) 0%, transparent 50%)' }} />

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10, width: '100%' }}>
          
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

          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '3.5rem', alignItems: 'center' }}>
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', display: 'block' }}
                />

                {!playing && (
                  <div 
                    onClick={togglePlay}
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', cursor: 'pointer', transition: 'background 0.3s' }}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.15 }}
                      style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(200,169,110,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(200,169,110,0.4)', paddingLeft: '3px' }}
                    >
                      <Play size={24} color="#08080D" fill="#08080D" />
                    </motion.div>
                  </div>
                )}

                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(8,8,13,0.95) 0%, rgba(8,8,13,0.4) 60%, transparent 100%)', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 20 }}>
                  <input type="range" min="0" max="100" value={progress} onChange={handleProgressChange} style={{ width: '100%', accentColor: '#C8A96E', background: 'rgba(255,255,255,0.2)', height: '4px', borderRadius: '2px', cursor: 'pointer', outline: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0 }}>
                        {playing ? <Pause size={16} /> : <Play size={16} fill="#EAE2D2" />}
                      </button>
                      <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0 }}>
                        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: '#EAE2D2', cursor: 'pointer', padding: 0, display: 'flex', marginLeft: 'auto' }}
                      onClick={() => { if (videoRef.current?.requestFullscreen) videoRef.current.requestFullscreen(); }}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#C8A96E', marginBottom: '6px' }}>
                  A Nosa Compañeira
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.83rem', lineHeight: 1.6, color: '#8B9BB4', margin: 0 }}>
                  Emma Tabuyo Rodríguez, a través deste pequeno documental ou reportaxe.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: m ? 0 : 50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...G, padding: '3.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '300px' }}
            >
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: 'absolute', top: '50%', left: '50%', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none' }}
                />

                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCameraClick}
                  style={{ position: 'relative', zIndex: 10, cursor: 'pointer', padding: '10px', background: '#fff', borderRadius: '12px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }}
                >
                  <img src={cameraSrc} alt="Cámara analóxica" style={{ width: '180px', height: 'auto', display: 'block', borderRadius: '8px' }} />
                </motion.div>
              </div>

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: '#C8A96E', marginBottom: '8px' }}>
                O Noso Carrete
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', lineHeight: 1.6, color: '#EAE2D2', opacity: 0.8, maxWidth: '280px', margin: 0 }}>
                Preme na cámara para disparar e revelar o carrete de fotografías do equipo.
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}
