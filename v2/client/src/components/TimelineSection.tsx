import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const stages = [
  { 
    title: "A OPRESIÓN", 
    sub: "O microcosmos da vila mariñeira.", 
    desc: "A infancia de Concha está marcada pola asfixia moral de Mamá Carme e o sadismo de Dona Remedios. Unha nena atrapada nun sistema de aparencias e abusos silenciosos.", 
    theme: "storm" 
  },
  { 
    title: "O LUME", 
    sub: "O punto de ruptura.", 
    desc: "A escola arde e a vila sinala a Concha como culpable. O lume simboliza a destrución da súa inocencia e o inicio do seu estigma definitivo como a 'ovella negra'.", 
    theme: "fire" 
  },
  { 
    title: "O DESTERRO", 
    sub: "A expulsión do paraíso familiar.", 
    desc: "Para protexer a honra hipócrita da estirpe, Mamá Carme condena á súa neta ao exilio. Concha é borrada da memoria colectiva do clan Pereira.", 
    theme: "exile" 
  },
  { 
    title: "A LENTE CORSARIA", 
    sub: "A metamorfose en Barcelona.", 
    desc: "Concha transforma o trauma en poder. Como paparazzi da 'Gauche Divine', usa a cámara como arma para destapar as miserias de banqueiros e políticos.", 
    theme: "neon" 
  },
  { 
    title: "O REMORSO", 
    sub: "A culpa somatizada no presente.", 
    desc: "Décadas despois, o doutor Fernando Pereira sofre un insomnio crónico. É a somatización da culpa dunha familia que silenciou a verdade durante demasiado tempo.", 
    theme: "guilt" 
  },
  { 
    title: "A REVELACIÓN", 
    sub: "O arquivo da memoria.", 
    desc: "Fernando descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu á moralidade que a tentou destruír. A luz por fin limpa o pasado.", 
    theme: "crystal" 
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Background effects based on scroll
  const bgColor = useTransform(
    smoothProgress,
    [0, 0.4, 0.6, 0.8, 1],
    ["#08080D", "#1A1A1A", "#0F172A", "#1E1B4B", "#F8FAFC"]
  );

  const textColor = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    ["#EAE2D2", "#EAE2D2", "#0F172A"]
  );

  const [v, setV] = useState(false);
  useEffect(() => { setV(true); }, []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        padding: '12rem 0', 
        overflow: 'hidden',
        backgroundColor: bgColor,
        transition: 'background-color 1s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Background Textures / Overlays */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: useTransform(smoothProgress, [0, 0.5, 0.6, 1], [0.1, 0, 0, 0]),
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
          pointerEvents: 'none'
        }} 
      />
      
      {/* Neon Flash effect for Barcelona Stage */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          top: '50%', left: '50%', 
          width: '150vw', height: '150vh',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          x: '-50%', y: '-50%',
          opacity: useTransform(smoothProgress, [0.5, 0.6, 0.7], [0, 1, 0]),
          pointerEvents: 'none',
          filter: 'blur(100px)'
        }} 
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5rem', position: 'relative', zIndex: 10 }}>
        
        {/* Cabeceira */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ marginBottom: '8rem', textAlign: 'center' }}
        >
          <span style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: '12px', 
            letterSpacing: '0.5em', 
            textTransform: 'uppercase', 
            color: '#C8A96E',
            display: 'block',
            marginBottom: '2rem'
          }}>
            Mapa Emocional
          </span>
          <motion.h2 
            style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontWeight: 300, 
              fontSize: 'clamp(3.5rem, 8vw, 8rem)', 
              lineHeight: 0.9, 
              color: textColor,
              transition: 'color 1s ease'
            }}
          >
            Faneca <span style={{ fontStyle: 'italic', color: '#C8A96E' }}>Brava</span>
          </motion.h2>
        </motion.div>

        {/* Timeline Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15rem', position: 'relative' }}>
          
          {/* Vertical Line */}
          <div style={{ 
            position: 'absolute', 
            left: '50%', top: 0, bottom: 0, 
            width: '1px', 
            background: 'linear-gradient(to bottom, rgba(200,169,110,0.3), rgba(200,169,110,0))', 
            transform: 'translateX(-50%)' 
          }} />

          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                display: 'flex', 
                justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                position: 'relative',
                width: '100%'
              }}
            >
              <div style={{ 
                width: '45%', 
                textAlign: i % 2 === 0 ? 'left' : 'right' 
              }}>
                <motion.div
                  style={{
                    padding: '2rem',
                    borderRadius: '24px',
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <motion.h3 
                    style={{ 
                      fontFamily: "'Outfit', sans-serif", 
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
                      fontWeight: 600, 
                      letterSpacing: '0.15em', 
                      color: '#C8A96E',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {stage.title}
                  </motion.h3>
                  <div style={{ 
                    fontFamily: "'Cormorant Garamond', serif", 
                    fontSize: '1.4rem', 
                    fontStyle: 'italic',
                    color: textColor, 
                    marginBottom: '1.5rem',
                    opacity: 0.8
                  }}>
                    {stage.sub}
                  </div>
                  <p style={{ 
                    fontFamily: "'DM Sans', sans-serif", 
                    fontSize: '1.05rem', 
                    lineHeight: 1.7, 
                    color: textColor,
                    opacity: 0.6
                  }}>
                    {stage.desc}
                  </p>
                </motion.div>
              </div>

              {/* Central Node */}
              <div style={{ 
                position: 'absolute', 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <motion.div 
                  whileInView={{ scale: [0, 1.2, 1] }}
                  style={{ 
                    width: '10px', height: '10px', 
                    borderRadius: '50%', 
                    backgroundColor: '#C8A96E',
                    boxShadow: '0 0 20px rgba(200,169,110,0.5)'
                  }} 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
