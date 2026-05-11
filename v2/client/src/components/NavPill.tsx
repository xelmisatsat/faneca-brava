import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "@/components/AudioPlayer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Home, BookOpen, History, Users, Image as ImageIcon, Clock, BarChart, FileText, PenTool, Cpu, MessageSquare, X, Apple } from "lucide-react";

interface Section { id: string; label: string; short: string; }

function getSectionIcon(id: string) {
  switch (id) {
    case 'hero': return <Home size={22} strokeWidth={1.5} />;
    case 'intro': return <BookOpen size={22} strokeWidth={1.5} />;
    case 'historia': return <History size={22} strokeWidth={1.5} />;
    case 'personaxes': return <Users size={22} strokeWidth={1.5} />;
    case 'galeria': return <ImageIcon size={22} strokeWidth={1.5} />;
    case 'cronoloxia': return <Clock size={22} strokeWidth={1.5} />;
    case 'analise': return <BarChart size={22} strokeWidth={1.5} />;
    case 'libro': return <FileText size={22} strokeWidth={1.5} />;
    case 'autor': return <PenTool size={22} strokeWidth={1.5} />;
    case 'ia': return <Cpu size={22} strokeWidth={1.5} />;
    case 'opinion': return <MessageSquare size={22} strokeWidth={1.5} />;
    default: return <Home size={22} strokeWidth={1.5} />;
  }
}
interface NavPillProps { sections: Section[]; activeIdx: number; onSelect: (idx: number) => void; }

export default function NavPill({ sections, activeIdx, onSelect }: NavPillProps) {
  const [open, setOpen] = useState(false);
  const [appleMode, setAppleMode] = useState(false);
  const m = useIsMobile();

  const isLiquid = m && appleMode;

  return (
    <>
      <div id="nav-pill-wrapper" className="fixed z-[1000] transition-all duration-500" style={{ top: '20px', left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: 'calc(100vw - 2rem)', opacity: isLiquid ? 0 : 1, pointerEvents: isLiquid ? 'none' : 'auto' }}>
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
            style={{ backgroundColor: 'rgba(8,8,13,0.97)', backdropFilter: 'blur(20px)', overflowY: 'auto', paddingTop: '70px', paddingBottom: '2rem', justifyContent: 'center' }}
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
            
            {/* Divisor */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: sections.length * 0.02 }} style={{ width: '40px', height: '1px', background: 'rgba(200,169,110,0.3)', margin: '20px 0' }} />

            {/* Apple Toggle en el menú móbil */}
            <motion.button
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (sections.length + 1) * 0.02 }}
              onClick={() => { setAppleMode(true); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 400, letterSpacing: '0.1em', color: '#EAE2D2', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '999px' }}
            >
              <Apple size={16} />
              <span>ACTIVAR IOS MODE</span>
            </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menú inferior Apple Liquid Glass (Só se appleMode está activo) */}
      <AnimatePresence>
        {isLiquid && (
          <motion.div
            initial={{ y: 120, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 120, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[94vw] max-w-[500px]"
          >
            {/* Reflexo luminoso decorativo do Apple Glass */}
            <div style={{ position: 'absolute', top: '-20px', left: '10%', right: '10%', height: '40px', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(10px)' }} />
            
            <div
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(45px) saturate(220%)',
                WebkitBackdropFilter: 'blur(45px) saturate(220%)',
                borderRadius: '32px',
                borderTop: '1px solid rgba(255,255,255,0.4)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                borderLeft: '1px solid rgba(255,255,255,0.15)',
                borderRight: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.3), inset 0 -2px 5px rgba(0,0,0,0.2)',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Contenedor escrolleable */}
              <div 
                className="no-scrollbar"
                style={{
                  display: 'flex',
                  gap: '2px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  padding: '0 4px',
                  width: '100%',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {sections.map((s, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <button
                      key={s.id}
                      onClick={() => onSelect(i)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 4px',
                        minWidth: '72px',
                        scrollSnapAlign: 'start',
                        borderRadius: '20px',
                        background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.2)' : 'none'
                      }}
                    >
                      <motion.div whileTap={{ scale: 0.9 }}>
                        {getSectionIcon(s.id)}
                      </motion.div>
                      <span style={{ fontSize: '10px', fontWeight: isActive ? 500 : 400, letterSpacing: '0.02em', marginTop: '2px' }}>
                        {s.short}
                      </span>
                    </button>
                  );
                })}
                
                {/* Botón para pechar o modo Apple */}
                <div style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)', margin: '8px 4px' }} />
                
                <button
                  onClick={() => setAppleMode(false)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 4px',
                    minWidth: '72px',
                    scrollSnapAlign: 'start',
                    borderRadius: '20px',
                    background: 'transparent',
                    color: '#ff4d4f',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: 0.8,
                  }}
                >
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <X size={22} strokeWidth={1.5} />
                  </motion.div>
                  <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.02em', marginTop: '2px' }}>Pechar</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
