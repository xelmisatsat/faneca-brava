import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const items = [
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-village-night-JkiwiqgEL6ZDLZTtniYVuQ.webp",
    title: "A vila mariñeira",
    year: "1950s",
    desc: "Rúas de pedra, néboa e silencio. O microcosmos onde todo comezou.",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-school-1960s-nAvQsmurgnEG3CJKH9fM67.webp",
    title: "A escola franquista",
    year: "1952",
    desc: "Crucifixo, retrato de Franco e a regra de Dona Remedios. O terror cotián.",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-mama-carme-f7k2dQYFH5zPEkXNWFnfCL.webp",
    title: "Mamá Carme",
    year: "1960",
    desc: "A matriarca que preferiu ocultar monstros antes que perder a reputación.",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-barcelona-escape-LUvRJ4CSgpchvTjESJRApB.webp",
    title: "Barcelona — A Fuga",
    year: "1965",
    desc: "A cidade que lle deu anonimato, liberdade e unha cámara como arma.",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-concha-portrait-ZyBRp5FRRbMYRNpmNDvaVU.webp",
    title: "Concha — A paparazzi",
    year: "1970s",
    desc: "Detrás da lente, a nena maltratada converteuse na cazadora dos poderosos.",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-camera-archive-nL293BkWpqtR2ugZhHoA9a.webp",
    title: "O arquivo",
    year: "Sempre",
    desc: "Cartas, fotografías, cintas. Os fragmentos dunha memoria que non arde.",
  },
];

export default function GaleriaSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 80%, rgba(26,39,68,0.2) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <div style={{ padding: m ? '0 1.25rem' : '0 5rem', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
            animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
              <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
                style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>
                Galería Corsaria
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
              As <span style={{ color: '#C8A96E' }}>fotografías</span><br />prohibidas
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '560px', marginTop: '1.5rem' }}>
              As imaxes que Concha capturou coa súa Leica. Cada disparo, unha vinganza silenciosa. Arrastra para explorar.
            </p>
          </motion.div>
        </div>

        {/* Galería scroll horizontal — sen frechas, scroll nativo suave */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingLeft: '5rem',
            paddingRight: '5rem',
            paddingBottom: '2rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: 'grab',
          }}
          onMouseDown={(e) => {
            const el = scrollRef.current;
            if (!el) return;
            el.style.cursor = 'grabbing';
            const startX = e.pageX - el.offsetLeft;
            const scrollLeft = el.scrollLeft;
            const onMove = (ev: MouseEvent) => {
              const x = ev.pageX - el.offsetLeft;
              el.scrollLeft = scrollLeft - (x - startX);
            };
            const onUp = () => {
              el.style.cursor = 'grab';
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }}
        >
          <style>{`.gallery-scroll::-webkit-scrollbar { display: none; }`}</style>

          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={v ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{
                flexShrink: 0,
                width: '340px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderTop: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: hovered === i ? '0 24px 60px rgba(0,0,0,0.6)' : '0 8px 30px rgba(0,0,0,0.4)',
                transform: hovered === i ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
              }}
            >
              {/* Imaxe completa — sen recorte */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <motion.img
                  src={item.img}
                  alt={item.title}
                  animate={{ scale: hovered === i ? 1.06 : 1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: '100%',
                    height: '260px',
                    objectFit: 'cover',
                    display: 'block',
                    filter: hovered === i ? 'brightness(0.85) saturate(0.9)' : 'brightness(0.65) saturate(0.3)',
                    transition: 'filter 0.5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,13,0.85) 100%)',
                }} />

                {/* Ano badge */}
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: '9999px',
                  padding: '4px 12px',
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#C8A96E' }}>{item.year}</span>
                </div>

                {/* Visor cámara ao hover */}
                <motion.div
                  animate={{ opacity: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(200,169,110,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid rgba(200,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(200,169,110,0.8)' }} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Info */}
              <div style={{ padding: '20px 22px 22px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, color: '#EAE2D2', marginBottom: '8px' }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#8B9BB4', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={v ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ padding: m ? '0 1.25rem' : '0 5rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(139,155,180,0.4)' }}>
            Arrastra para explorar →
          </div>
        </motion.div>
      </div>
    </section>
  );
}
