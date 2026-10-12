import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "@/components/AudioPlayer";

interface Section { id: string; label: string; short: string; }
interface NavPillProps { sections: Section[]; activeIdx: number; onSelect: (idx: number) => void; }

export default function NavPill({ sections, activeIdx, onSelect }: NavPillProps) {
  const [open, setOpen] = useState(false);
  const currentSectionId = sections[activeIdx]?.id;
  const isMercar = currentSectionId === 'mercar';
  const isNos = currentSectionId === 'nos';

  return (
    <>
      <div className="fixed top-5 left-1/2 z-[1000]" style={{ transform: 'translateX(-50%)', width: 'max-content', maxWidth: 'calc(100vw - 2rem)' }}>
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: isMercar
              ? '#0D141F'
              : (isNos
                ? 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(246,241,232,0.94) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.10) 100%)'),
            backdropFilter: (isMercar || isNos) ? 'none' : 'blur(60px) saturate(200%) brightness(1.1)',
            WebkitBackdropFilter: (isMercar || isNos) ? 'none' : 'blur(60px) saturate(200%) brightness(1.1)',
            border: isMercar
              ? '1.5px solid rgba(200,169,110,0.4)'
              : (isNos
                ? '1.5px solid rgba(20,20,22,0.18)'
                : '1px solid rgba(255,255,255,0.18)'),
            borderTop: isMercar
              ? '1.5px solid #C8A96E'
              : (isNos
                ? '1.5px solid rgba(255,255,255,0.9)'
                : '1px solid rgba(255,255,255,0.30)'),
            borderRadius: '9999px',
            boxShadow: isMercar
              ? '0 16px 40px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)'
              : (isNos
                ? '0 10px 32px rgba(20,15,10,0.22), 0 2px 8px rgba(0,0,0,0.08)'
                : '0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.20)'),
            position: 'relative',
            overflow: 'visible',
            transition: 'all 0.3s ease',
          }}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brillo superior */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
            background: isNos
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(200,169,110,0.4), rgba(255,255,255,0.5), transparent)',
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
              border: isNos ? '1.5px solid rgba(160,110,25,0.7)' : '1.5px solid rgba(200,169,110,0.55)',
              boxShadow: isNos ? '0 0 10px rgba(160,110,25,0.3)' : '0 0 10px rgba(200,169,110,0.25)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.09)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <img src="/manus-storage/logo-fb.webp" alt="Faneca Brava Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </button>

          {/* Separador */}
          <div style={{
            width: '1px',
            height: '18px',
            background: isMercar ? 'rgba(200,169,110,0.35)' : (isNos ? 'rgba(20,20,22,0.22)' : 'rgba(255,255,255,0.15)'),
            flexShrink: 0
          }} />

          {/* Links desktop */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2px' }}>
            {sections.filter(s => s.id !== 'mercar').map((s) => {
              const realIdx = sections.findIndex(sec => sec.id === s.id);
              const isSelected = activeIdx === realIdx;

              let textColor = 'rgba(234,226,210,0.75)';
              if (isSelected) {
                textColor = isNos ? '#8A5D10' : '#C8A96E';
              } else if (isNos) {
                textColor = '#141416';
              } else if (isMercar) {
                textColor = 'rgba(234,226,210,0.95)';
              }

              let bg = 'transparent';
              if (isSelected) {
                bg = isNos ? 'rgba(154,106,24,0.14)' : (isMercar ? 'rgba(200,169,110,0.22)' : 'rgba(200,169,110,0.14)');
              }

              let border = '1px solid transparent';
              if (isSelected) {
                border = isNos ? '1px solid rgba(154,106,24,0.35)' : '1px solid rgba(200,169,110,0.35)';
              }

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
                  fontWeight: isSelected ? 700 : (isNos ? 600 : 400),
                  letterSpacing: '0.08em',
                  color: textColor,
                  background: bg,
                  border: border,
                  cursor: 'pointer',
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
          <div className="hidden md:block" style={{
            width: '1px',
            height: '18px',
            background: isMercar ? 'rgba(200,169,110,0.35)' : (isNos ? 'rgba(20,20,22,0.22)' : 'rgba(255,255,255,0.15)'),
            flexShrink: 0
          }} />

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
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: isNos ? '#FFFFFF' : (isMercar ? '#0D141F' : '#C8A96E'),
              background: isNos ? '#141416' : (isMercar ? '#C8A96E' : 'rgba(200,169,110,0.12)'),
              border: isNos ? '1px solid #141416' : (isMercar ? '1px solid #C8A96E' : '1px solid rgba(200,169,110,0.28)'),
              boxShadow: isMercar ? '0 2px 12px rgba(200,169,110,0.4)' : 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
          >
            Mercar
          </button>

          {/* Menú móbil */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ cursor: 'pointer', padding: '6px 8px', background: 'none', border: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            <motion.span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: isNos ? '#141416' : '#C8A96E' }}
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} />
            <motion.span style={{ display: 'block', width: '13px', height: '1.5px', backgroundColor: isNos ? '#141416' : '#C8A96E' }}
              animate={{ opacity: open ? 0 : 1 }} />
            <motion.span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: isNos ? '#141416' : '#C8A96E' }}
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
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.2rem, 4vh, 1.8rem)', fontWeight: 300, padding: 'clamp(4px, 1vh, 10px) 0', color: activeIdx === i ? '#C8A96E' : '#EAE2D2', cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'center' }}
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
