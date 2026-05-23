import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Share2 } from "lucide-react";
const LETTERS = "FANECA BRAVA".split("");

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const m = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Faneca Brava — Manuel Portas',
          text: 'Todas as familias agochan cadáveres na memoria. Descobre a historia en Faneca Brava.',
          url: window.location.href,
        });
      } else {
        // Fallback para escritorio sen share api
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado ao portapapeis!');
      }
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh', display: 'flex',
      alignItems: 'center', overflow: 'hidden',
    }}>
      {/* Vídeo de fondo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) saturate(0.6)' }}>
          <source src="/manus-storage/faneca-hero-video_de19ce83.mp4" type="video/mp4" />
        </video>
        {/* Gradientes overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,13,0.2) 0%, rgba(8,8,13,0.05) 30%, rgba(8,8,13,0.6) 75%, rgba(8,8,13,1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,13,0.6) 0%, transparent 50%)' }} />
      </div>

      {/* Contido */}
      <div style={{ position: 'relative', zIndex: 10, padding: m ? '0 1.25rem' : '0 5rem', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>

        {/* Etiqueta superior */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '2.5rem' }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={mounted ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }}
          />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>
            Manuel Portas — Editorial Galaxia
          </span>
        </motion.div>

        {/* Título letra a letra */}
        <div style={{ marginBottom: '2rem', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
            {['FANECA', ' ', 'BRAVA'].map((word, wi) => (
              <span key={wi} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
                {word.split('').map((l, i) => {
                  const globalIdx = wi === 0 ? i : (wi === 1 ? 7 : 7 + i);
                  return (
                    <motion.span
                      key={`${wi}-${i}`}
                      initial={{ opacity: 0, y: 80, rotateX: -45 }}
                      animate={mounted ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.4 + globalIdx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 300,
                        fontSize: 'clamp(3rem, 10vw, 9.5rem)',
                        lineHeight: 0.85,
                        letterSpacing: '-0.03em',
                        color: l === ' ' ? 'transparent' : (wi === 2 ? '#C8A96E' : '#EAE2D2'),
                        display: 'inline-block',
                        minWidth: l === ' ' ? '0.4em' : 'auto',
                        transformStyle: 'preserve-3d',
                        perspective: '800px',
                      }}
                    >
                      {l === ' ' ? '\u00A0' : l}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </div>
        </div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: 'rgba(139,155,180,0.9)',
            lineHeight: 1.65,
            maxWidth: '520px',
            marginBottom: '3.5rem',
          }}
        >
          "A autopsia emocional dunha estirpe familiar galega durante o franquismo"
        </motion.p>

        {/* Stats en liña */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', marginBottom: '4rem' }}
        >
          {[
            { label: 'Partes', val: 'III' },
            { label: 'Época', val: '1960' },
            { label: 'Lugar', val: 'Galicia' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#C8A96E', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B9BB4', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{ position: 'absolute', bottom: '3.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <motion.div
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '1px', height: '52px', background: 'rgba(200,169,110,0.4)' }}
          />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(139,155,180,0.45)' }}>
            Preme as frechas para navegar
          </span>
        </motion.div>
      </div>

      {/* Créditos esquerda */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={mounted ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '3.5rem', left: '2.5rem', zIndex: 10, textAlign: 'left' }}
      >
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(234,226,210,0.65)', marginBottom: '3px' }}>Jun Sieira Gerpe</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(234,226,210,0.65)', marginBottom: '8px' }}>Álvaro Villar Gómez</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.65)' }}>IES Arcebispo Xelmírez I · 4º ESO</div>
      </motion.div>

      {/* Info lateral dereita */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={mounted ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '3.5rem', right: '2.5rem', zIndex: 10, textAlign: 'right' }}
      >
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(139,155,180,0.5)' }}>GALICIA</div>
      </motion.div>

      {/* Botón de Compartir (Top Right) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.8 }}
        onClick={handleShare}
        style={{
          position: 'absolute',
          top: m ? '1.5rem' : '2.5rem',
          right: m ? '1.5rem' : '2.5rem',
          zIndex: 50,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(200,169,110,0.2)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          cursor: 'none',
          color: 'rgba(200,169,110,0.8)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(200,169,110,0.1)';
          e.currentTarget.style.border = '1px solid rgba(200,169,110,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          e.currentTarget.style.border = '1px solid rgba(200,169,110,0.2)';
        }}
        aria-label="Compartir"
      >
        <Share2 size={18} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
}
