import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Música por sección — galega tradicional nas máis importantes
const SECTION_MUSIC: Record<string, string> = {
  hero:       "/manus-storage/music-hero_8cb331ab.mp3",
  sobre:      "/manus-storage/music-galega-trad_8407bfe4.mp3",
  historia:   "/manus-storage/music-galega-trad_8407bfe4.mp3",
  personaxes: "/manus-storage/music-personaxes_cc141ca2.mp3",
  galeria:    "/manus-storage/music-galeria_9feedf8a.mp3",
  timeline:   "/manus-storage/music-historia_428d5e7d.mp3",
  arquivo:    "/manus-storage/music-personaxes_cc141ca2.mp3",
  libro:      "/manus-storage/music-galega-trad_8407bfe4.mp3",
  autor:      "/manus-storage/music-historia_428d5e7d.mp3",
  conversa:   "/manus-storage/music-hero_8cb331ab.mp3",
  mercar:     "/manus-storage/music-galeria_9feedf8a.mp3",
};

interface AudioPlayerProps {
  sectionId: string;
  inline?: boolean; // Se true, renderiza só a icona (para a barra)
}

export default function AudioPlayer({ sectionId, inline }: AudioPlayerProps) {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string>("");
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Inicializar audio
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(SECTION_MUSIC[sectionId] || SECTION_MUSIC.hero);
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
      currentTrackRef.current = SECTION_MUSIC[sectionId] || SECTION_MUSIC.hero;
    }
  }, []);

  // Cambiar pista con fade suave cando cambia a sección
  useEffect(() => {
    const newTrack = SECTION_MUSIC[sectionId] || SECTION_MUSIC.hero;
    if (newTrack === currentTrackRef.current) return;
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (playing && !muted) {
      // Fade out
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume = Math.max(0, audio.volume - 0.03);
        } else {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          // Cambiar pista
          audio.src = newTrack;
          audio.load();
          currentTrackRef.current = newTrack;
          audio.play().then(() => {
            // Fade in
            fadeIntervalRef.current = setInterval(() => {
              if (audio.volume < 0.28) {
                audio.volume = Math.min(0.3, audio.volume + 0.03);
              } else {
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
              }
            }, 50);
          }).catch(() => {});
        }
      }, 50);
    } else {
      // Se non está tocando, só cambiar a pista
      audio.src = newTrack;
      audio.load();
      currentTrackRef.current = newTrack;
    }
  }, [sectionId, playing, muted]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (muted) {
      audio.volume = 0;
      audio.play().then(() => {
        // Fade in suave
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = setInterval(() => {
          if (audio.volume < 0.28) {
            audio.volume = Math.min(0.3, audio.volume + 0.02);
          } else {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          }
        }, 40);
      }).catch(() => {});
      setMuted(false);
      setPlaying(true);
    } else {
      // Fade out suave
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume = Math.max(0, audio.volume - 0.02);
        } else {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          audio.pause();
        }
      }, 40);
      setMuted(true);
      setPlaying(false);
    }
  };

  // Versión inline para a barra de navegación
  if (inline) {
    return (
      <button
        onClick={toggleMute}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: muted ? 'rgba(255,255,255,0.06)' : 'rgba(200,169,110,0.15)',
          border: muted ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(200,169,110,0.3)',
          cursor: 'none',
          transition: 'all 0.3s',
          flexShrink: 0,
          position: 'relative',
        }}
        title={muted ? 'Activar son' : 'Silenciar'}
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(139,155,180,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.08" />
          </svg>
        )}
        {/* Punto indicador */}
        {muted && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ position: 'absolute', top: '-1px', right: '-1px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C8A96E', border: '1.5px solid #08080D' }}
          />
        )}
      </button>
    );
  }

  // Versión standalone (non usada agora)
  return null;
}
