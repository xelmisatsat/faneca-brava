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

  // Camera & Shutter states
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [shutterFlash, setShutterFlash] = useState(false);
  const [reelVisible, setReelVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    } catch (e) {
      // safe fallback in browser
    }

    setTimeout(() => {
      setShutterFlash(false);
      setIsTakingPhoto(false);
      setReelVisible(true);
    }, 280);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 40;
    if (info.offset.x > threshold) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else if (info.offset.x < -threshold) {
      setCurrentIndex(prev => Math.min(PHOTOS.length - 1, prev + 1));
    }
  };

  const videoSrc = (window as any).Capacitor ? "assets/images/nos-video.mp4" : "/manus-storage/nos-video.mp4";

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
              position: 'fixed',
              inset: 0,
              backgroundColor: '#FFF',
              zIndex: 99999,
              pointerEvents: 'none'
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
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5,5,8,0.94)',
              backdropFilter: 'blur(15px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                width: 'min(480px, 92vw)',
                background: '#FDFBF7',
                padding: m ? '12px 12px 36px' : '18px 18px 48px',
                borderRadius: '8px',
                boxShadow: '0 30px 70px rgba(0,0,0,0.85)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '-44px',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: '#EAE2D2',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem'
                }}
              >
                <X size={18} /> Pechar
              </button>

              <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#222', borderRadius: '4px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                <img
                  src={selectedPhoto.img}
                  alt={selectedPhoto.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <h4 style={{ 
                  fontFamily: "'Cormorant Garamond', Georgia, serif", 
                  fontSize: m ? '1.3rem' : '1.6rem', 
                  fontWeight: 500, 
                  color: '#1C1C24',
                  margin: 0
                }}>
                  {selectedPhoto.title}
                </h4>
                <p style={{ 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontSize: m ? '0.75rem' : '0.85rem', 
                  color: '#8B8B9B',
                  marginTop: '4px',
                  marginBottom: 0
                }}>
                  {selectedPhoto.subtitle}
                </p>
              </div>
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

          {/* Layout en Reixa (Video á esquerda, Cámara á dereita) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : '1fr 1fr',
            gap: m ? '2rem' : '3.5rem',
            alignItems: 'center',
            marginBottom: reelVisible ? '2rem' : '0'
          }}>
            {/* Columna Video */}
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

                {/* Botón central Play */}
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
                        width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(200,169,110,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(200,169,110,0.4)',
                        paddingLeft: '3px'
                      }}
                    >
                      <Play size={24} color="#08080D" fill="#08080D" />
                    </motion.div>
                  </div>
                )}

                {/* Barra de controis */}
                <div 
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(8,8,13,0.95) 0%, rgba(8,8,13,0.4) 60%, transparent 100%)',
                    padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 20
                  }}
                >
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
                      onClick={() => {
                        if (videoRef.current?.requestFullscreen) videoRef.current.requestFullscreen();
                      }}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#C8A96E', marginBottom: '6px' }}>
                  Atmosfera Nocturna
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.83rem', lineHeight: 1.6, color: '#8B9BB4', margin: 0 }}>
                  Un reflexo do insomnio e a busca constante de respostas que atravesan toda a obra de Manuel Portas.
                </p>
              </div>
            </motion.div>

            {/* Columna Cámara SVG */}
            <motion.div
              initial={{ opacity: 0, x: m ? 0 : 50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                ...G, 
                padding: '2.5rem 1.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '260px'
              }}
            >
              {/* Realistic Camera SVG */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                {/* Glowing pulse behind camera */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: '180px', height: '100px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #C8A96E 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />

                <div style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ position: 'relative', width: '220px', height: '140px', cursor: 'pointer' }} onClick={handleCameraClick}>
                    <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))' }}>
                      <path d="M20 30C20 24.4772 24.4772 20 30 20H190C195.523 20 200 24.4772 200 30V45H20V30Z" fill="url(#metalGrad)" />
                      <rect x="10" y="45" width="200" height="85" rx="8" fill="#1C1C24" stroke="#2D2D3A" strokeWidth="1" />
                      <rect x="15" y="50" width="190" height="75" rx="6" fill="#121216" />
                      
                      <rect x="35" y="10" width="20" height="10" rx="2" fill="url(#metalGrad)" />
                      <motion.rect 
                        x="38" 
                        y={isTakingPhoto ? 10 : 6} 
                        width="14" 
                        height="5" 
                        rx="1" 
                        fill="#D4AF37" 
                        animate={{ y: isTakingPhoto ? 10 : 6 }}
                        transition={{ duration: 0.1 }}
                      />
                      
                      <rect x="160" y="12" width="25" height="8" rx="1" fill="url(#metalGrad)" />
                      <line x1="165" y1="12" x2="165" y2="20" stroke="#333" />
                      <line x1="170" y1="12" x2="170" y2="20" stroke="#333" />
                      <line x1="175" y1="12" x2="175" y2="20" stroke="#333" />
                      <line x1="180" y1="12" x2="180" y2="20" stroke="#333" />
                      
                      <rect x="95" y="12" width="30" height="18" rx="2" fill="#222" stroke="url(#metalGrad)" strokeWidth="2" />
                      <rect x="100" y="16" width="20" height="10" rx="1" fill="#3D5A80" />
                      
                      <circle cx="55" cy="65" r="7" fill="#D83A3A" />
                      <circle cx="110" cy="85" r="42" fill="url(#metalGrad)" stroke="#1A1A22" strokeWidth="1" />
                      <circle cx="110" cy="85" r="37" fill="#0C0C10" stroke="#333" strokeWidth="2" />
                      <circle cx="110" cy="85" r="33" fill="none" stroke="#C8A96E" strokeWidth="1.5" />
                      <circle cx="110" cy="85" r="28" fill="url(#lensGlass)" stroke="#222" />
                      
                      <motion.g 
                        animate={{ rotate: isTakingPhoto ? 90 : 0, scale: isTakingPhoto ? 0.35 : 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ originX: '110px', originY: '85px' }}
                      >
                        <path d="M110 57L128 75H110V57Z" fill="#15151A" opacity="0.85" />
                        <path d="M138 85L120 103V85H138Z" fill="#181820" opacity="0.85" />
                        <path d="M110 113L92 95H110V113Z" fill="#15151A" opacity="0.85" />
                        <path d="M82 85L100 67V85H82Z" fill="#181820" opacity="0.85" />
                      </motion.g>
                      
                      <circle cx="102" cy="77" r="18" fill="url(#lensReflection)" opacity="0.4" />
                      
                      <defs>
                        <linearGradient id="metalGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#E2E2E9" />
                          <stop offset="50%" stopColor="#A8A8B5" />
                          <stop offset="100%" stopColor="#7D7D8A" />
                        </linearGradient>
                        <radialGradient id="lensGlass" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#1A2D42" />
                          <stop offset="70%" stopColor="#0B131C" />
                          <stop offset="100%" stopColor="#020406" />
                        </radialGradient>
                        <linearGradient id="lensReflection" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#3A86C8" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#C8A96E', marginBottom: '8px' }}>
                {reelVisible ? "Carrete Revelado" : "Cámara de Concha"}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', lineHeight: 1.6, color: '#EAE2D2', opacity: 0.8, maxWidth: '280px', margin: 0 }}>
                {reelVisible 
                  ? "Arrastra ou usa as frechas para ollar as nosas fotos históricas."
                  : "Preme a cámara analóxica para disparar o flash e revelar o noso carrete."}
              </p>
            </motion.div>
          </div>

          {/* Curved Photo Reel */}
          <AnimatePresence>
            {reelVisible && (
              <motion.div
                initial={{ opacity: 0, y: 60, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                style={{ overflow: 'visible', width: '100%' }}
              >
                <div style={{ width: '100%', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'visible', marginTop: m ? '1.5rem' : '3rem' }}>
                  
                  <motion.div 
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'grab'
                    }}
                    whileTap={{ cursor: 'grabbing' }}
                  >
                    {PHOTOS.map((photo, index) => {
                      const diff = index - currentIndex;
                      const isActive = index === currentIndex;
                      
                      const offsetMultiplier = m ? 125 : 200;
                      const curveFactor = m ? 6 : 10;
                      const rotateFactor = m ? 5 : 8;
                      const scaleFactor = 0.08;
                      
                      const tx = diff * offsetMultiplier;
                      const ty = Math.abs(diff) * Math.abs(diff) * curveFactor;
                      const rot = diff * rotateFactor;
                      const sc = 1 - Math.abs(diff) * scaleFactor;
                      const opacity = Math.abs(diff) > 3 ? 0 : 1 - Math.abs(diff) * 0.28;
                      const z = 100 - Math.abs(diff);

                      return (
                        <motion.div
                          key={photo.id}
                          animate={{
                            x: tx,
                            y: ty,
                            rotate: rot,
                            scale: sc,
                            opacity: opacity,
                            zIndex: z
                          }}
                          transition={{ type: "spring", damping: 25, stiffness: 180 }}
                          onClick={() => {
                            if (isActive) {
                              setSelectedPhoto(photo);
                            } else {
                              setCurrentIndex(index);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            width: m ? '150px' : '210px',
                            height: m ? '200px' : '280px',
                            background: '#FDFBF7',
                            padding: m ? '8px 8px 24px' : '10px 10px 38px',
                            borderRadius: '4px',
                            boxShadow: isActive 
                              ? '0 25px 50px rgba(0,0,0,0.65), 0 0 15px rgba(200,169,110,0.25)' 
                              : '0 10px 25px rgba(0,0,0,0.4)',
                            cursor: 'pointer',
                            transformOrigin: 'center bottom',
                            border: '1px solid rgba(0,0,0,0.1)'
                          }}
                          whileHover={isActive ? { y: ty - 10, scale: sc + 0.02, boxShadow: '0 30px 60px rgba(0,0,0,0.75)' } : {}}
                        >
                          <div style={{ width: '100%', height: '80%', overflow: 'hidden', background: '#111', borderRadius: '2px', position: 'relative' }}>
                            <img 
                              src={photo.img} 
                              alt={photo.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.08) contrast(1.03)' }} 
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
                          </div>
                          
                          <div style={{ height: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '4px' }}>
                            <div style={{ 
                              fontFamily: "'Cormorant Garamond', Georgia, serif", 
                              fontSize: m ? '0.8rem' : '1.05rem', 
                              fontWeight: 500, 
                              color: '#1C1C24', 
                              textAlign: 'center',
                              lineHeight: 1.1,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '100%'
                            }}>
                              {photo.title}
                            </div>
                            <div style={{ 
                              fontFamily: "'DM Sans', sans-serif", 
                              fontSize: m ? '5.5px' : '7.5px', 
                              letterSpacing: '0.04em', 
                              textTransform: 'uppercase', 
                              color: '#8B8B9B', 
                              marginTop: '1px'
                            }}>
                              {photo.subtitle}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <button 
                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    style={{
                      position: 'absolute',
                      left: m ? '0px' : '20px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#EAE2D2',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      opacity: currentIndex === 0 ? 0.25 : 0.85,
                      zIndex: 110,
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  <button 
                    onClick={() => setCurrentIndex(prev => Math.min(PHOTOS.length - 1, prev + 1))}
                    disabled={currentIndex === PHOTOS.length - 1}
                    style={{
                      position: 'absolute',
                      right: m ? '0px' : '20px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#EAE2D2',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      opacity: currentIndex === PHOTOS.length - 1 ? 0.25 : 0.85,
                      zIndex: 110,
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}
