import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fase 1: Escurecer
    const t1 = setTimeout(() => setPhase(1), 300);
    // Fase 2: Aparece o texto
    const t2 = setTimeout(() => setPhase(2), 1200);
    // Fase 3: Progreso
    const t3 = setTimeout(() => setPhase(3), 1800);
    // Progreso gradual
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    // Fase 4: Saída
    const t4 = setTimeout(() => setPhase(4), 4200);
    // Completar
    const t5 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5);
      clearInterval(interval);
    };
  }, [onComplete]);

  const letters = "FANECA BRAVA".split("");

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0A0A0F' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Efecto de revelado fotográfico — ondas de luz */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at ${20 + i * 15}% ${30 + i * 10}%, rgba(200,169,110,0.03) 0%, transparent 60%)`,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1.2, 0.9],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Liña horizontal superior */}
          <motion.div
            className="absolute top-0 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.6), transparent)' }}
            initial={{ width: 0 }}
            animate={{ width: phase >= 1 ? '100%' : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Texto principal */}
          <div className="relative text-center">
            {/* Subtítulo */}
            <motion.p
              className="font-body text-xs tracking-[0.4em] uppercase mb-8"
              style={{ color: 'rgba(200,169,110,0.6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Manuel Portas
            </motion.p>

            {/* Título letra a letra */}
            <div className="flex items-center justify-center flex-wrap overflow-hidden" style={{ padding: '0 1rem' }}>
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-display text-[clamp(2.5rem,10vw,7rem)] font-light"
                  style={{
                    color: letter === ' ' ? 'transparent' : '#E8E0D0',
                    letterSpacing: letter === ' ' ? '0.3em' : '-0.02em',
                    display: 'inline-block',
                    minWidth: letter === ' ' ? '0.5em' : 'auto',
                  }}
                  initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                  animate={{
                    opacity: phase >= 2 ? 1 : 0,
                    y: phase >= 2 ? 0 : 60,
                    filter: phase >= 2 ? 'blur(0px)' : 'blur(10px)',
                  }}
                  transition={{
                    duration: 0.6,
                    delay: phase >= 2 ? 0.3 + i * 0.06 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>

            {/* Frase */}
            <motion.p
              className="font-accent italic text-sm md:text-base mt-8"
              style={{ color: 'rgba(139,155,180,0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              "Todas as familias agochan cadáveres na memoria."
            </motion.p>
          </div>

          {/* Barra de progreso */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{ background: 'linear-gradient(90deg, rgba(200,169,110,0.8), rgba(200,169,110,0.3))' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-body text-xs" style={{ color: 'rgba(139,155,180,0.5)', fontSize: '10px', letterSpacing: '0.2em' }}>
                CARGANDO
              </span>
              <span className="font-body text-xs" style={{ color: 'rgba(200,169,110,0.6)', fontSize: '10px' }}>
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </motion.div>

          {/* Liña horizontal inferior */}
          <motion.div
            className="absolute bottom-0 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)' }}
            initial={{ width: 0 }}
            animate={{ width: phase >= 1 ? '100%' : 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
