import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "@/components/AudioPlayer";

interface Section { id: string; label: string; short: string; }
interface NavPillProps { sections: Section[]; activeIdx: number; onSelect: (idx: number) => void; }

export default function NavPill({ sections, activeIdx, onSelect }: NavPillProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed top-5 left-1/2 z-[1000]" style={{ transform: 'translateX(-50%)', width: 'max-content', maxWidth: 'calc(100vw - 2rem)' }}>
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.10) 100%)',
            backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderTop: '1px solid rgba(255,255,255,0.30)',
            borderRadius: '9999px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.20)',
            position: 'relative',
            overflow: 'visible',
          }}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brillo superior */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(200,169,110,0.4), rgba(255,255,255,0.5), transparent)',
            borderRadius: '9999px',
            pointerEvents: 'none',
          }} />

          {/* Logo FB con imaxe circular */}
          <button
            onClick={() => {
              const el = document.documentElement as any;
              const doc = document as any;
              const isFS = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);
              if (!isFS) {
                if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
                else if (el.msRequestFullscreen) el.msRequestFullscreen();
              } else {
                if (doc.exitFullscreen) doc.exitFullscreen().catch(() => {});
                else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
                else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
                else if (doc.msExitFullscreen) doc.msExitFullscreen();
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              overflow: 'hidden',
              border: '1.5px solid rgba(200,169,110,0.55)',
              boxShadow: '0 0 10px rgba(200,169,110,0.25)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.09)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(200,169,110,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(200,169,110,0.25)'; }}
            >
              <img src="/manus-storage/logo-fb.webp" alt="Faneca Brava Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </button>

          {/* Separador */}
          <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

          {/* Links desktop */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2px' }}>
            {sections.filter(s => s.id !== 'mercar').map((s, i) => {
              const realIdx = sections.findIndex(sec => sec.id === s.id);
              return (
              <button
                key={s.id}
                onClick={() => onSelect(realIdx)}
                style={{
                  position: 'relative',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  color: activeIdx === realIdx ? '#C8A96E' : 'rgba(234,226,210,0.5)',
                  background: activeIdx === realIdx ? 'rgba(200,169,110,0.14)' : 'transparent',
                  border: activeIdx === realIdx ? '1px solid rgba(200,169,110,0.25)' : '1px solid transparent',
                  cursor: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                }}
              >
                {s.label}
              </button>
              );
            })}
          </div>

          {/* Separador */}
          <div className="hidden md:block" style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

          {/* Botón Música */}
          <AudioPlayer sectionId={sections[activeIdx]?.id || 'hero'} inline />

          {/* Botón Mercar - leva á sección de compra */}
          <button
            onClick={() => {
              const idx = sections.findIndex(s => s.id === 'mercar');
              if (idx >= 0) onSelect(idx);
            }}
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              padding: '7px 16px',
              borderRadius: '9999px',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '11.5px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#C8A96E',
              background: 'rgba(200,169,110,0.12)',
              border: '1px solid rgba(200,169,110,0.28)',
              cursor: 'none',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.3s',
              flexShrink: 0,
            }}
          >
            Mercar
          </button>

          {/* Menú móbil */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ cursor: 'none', padding: '6px 8px', background: 'none', border: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            <motion.span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#C8A96E' }}
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} />
            <motion.span style={{ display: 'block', width: '13px', height: '1px', backgroundColor: '#C8A96E' }}
              animate={{ opacity: open ? 0 : 1 }} />
            <motion.span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: '#C8A96E' }}
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} />
          </button>
        </motion.div>
      </div>

      {/* Menú móbil */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center md:hidden"
            style={{ backgroundColor: 'rgba(8,8,13,0.97)', backdropFilter: 'blur(20px)', overflowY: 'auto', paddingTop: '70px', paddingBottom: '1rem', justifyContent: 'center' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', width: '100%', maxHeight: '100%' }}>
            {sections.map((s, i) => (
              <motion.button key={s.id} onClick={() => { onSelect(i); setOpen(false); }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.2rem, 4vh, 1.8rem)', fontWeight: 300, padding: 'clamp(4px, 1vh, 10px) 0', color: activeIdx === i ? '#C8A96E' : '#EAE2D2', cursor: 'none', background: 'none', border: 'none', width: '100%', textAlign: 'center' }}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                {s.label}
              </motion.button>
            ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
