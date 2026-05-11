import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "@/components/AudioPlayer";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Section { id: string; label: string; short: string; }
interface NavPillProps { sections: Section[]; activeIdx: number; onSelect: (idx: number) => void; }

export default function NavPill({ sections, activeIdx, onSelect }: NavPillProps) {
  const [open, setOpen] = useState(false);
  const [appleMode, setAppleMode] = useState(false);
  const m = useIsMobile();

  const isLiquid = m && appleMode;

  return (
    <>
      <div id="nav-pill-wrapper" className="fixed z-[1000] transition-all duration-500" style={{ top: isLiquid ? 'auto' : '20px', bottom: isLiquid ? '24px' : 'auto', left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: 'calc(100vw - 2rem)' }}>
        <motion.div
          drag={isLiquid ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(e, info) => {
            if (!isLiquid) return;
            if (info.offset.x > 50 && activeIdx > 0) onSelect(activeIdx - 1);
            else if (info.offset.x < -50 && activeIdx < sections.length - 1) onSelect(activeIdx + 1);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: isLiquid ? 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.10) 100%)',
            backdropFilter: isLiquid ? 'blur(50px) saturate(220%) brightness(1.2)' : 'blur(60px) saturate(200%) brightness(1.1)',
            WebkitBackdropFilter: isLiquid ? 'blur(50px) saturate(220%) brightness(1.2)' : 'blur(60px) saturate(200%) brightness(1.1)',
            border: isLiquid ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.18)',
            borderTop: isLiquid ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.30)',
            borderRadius: '9999px',
            boxShadow: isLiquid ? 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(255,255,255,0.1), 0 16px 40px rgba(0,0,0,0.6)' : '0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.20)',
            position: 'relative',
            overflow: 'visible',
            cursor: isLiquid ? 'grab' : 'default',
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

          {/* Logo FB Fullscreen */}
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => console.log(err));
              } else if (document.exitFullscreen) {
                document.exitFullscreen();
              }
            }}
            title="Pantalla completa"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.22em',
              color: '#C8A96E',
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '9999px',
              background: 'transparent',
              border: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.3s',
            }}
          >
            FB
          </button>

          {/* Toggle Apple Mode (Só móbil) */}
          {m && (
            <button
              onClick={() => setAppleMode(!appleMode)}
              title="Apple Liquid Mode"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: appleMode ? '#EAE2D2' : 'rgba(234,226,210,0.4)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                background: appleMode ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                transition: 'all 0.3s',
              }}
            >
              <svg width="14" height="16" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
            </button>
          )}

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
