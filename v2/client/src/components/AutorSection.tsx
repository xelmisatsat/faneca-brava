import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const G = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(40px)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderTop: '1px solid rgba(255,255,255,0.20)',
  borderRadius: '18px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
};

export default function AutorSection() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: 'relative', padding: '7rem 0 5rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, rgba(26,39,68,0.2) 0%, transparent 55%)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.2rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }} style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>O Autor</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Manuel <span style={{ color: '#C8A96E' }}>Portas</span>
          </h2>
        </motion.div>

        {/* Layout: imaxe + texto principal */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '4rem', alignItems: 'start', marginBottom: '3.5rem' }}>

          {/* Imaxe */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: [0.16,1,0.3,1] }}>
            <motion.div whileHover={{ scale: 1.02, rotateY: 2 }} transition={{ duration: 0.5 }} style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.55)', transformStyle: 'preserve-3d', perspective: '1000px' }}>
              <img
                src="/manus-storage/XO9fsMxMuBcu_706b4fc2.jpg"
                alt="Manuel Portas"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: 'brightness(0.88) saturate(0.9)' }}
              />
            </motion.div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
              style={{ ...G, padding: '16px 20px', marginTop: '16px' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B9BB4', marginBottom: '4px' }}>Escritor galego</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 300, color: '#C8A96E' }}>Manuel Portas</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#8B9BB4', marginTop: '2px' }}>Galicia, España</div>
            </motion.div>
          </motion.div>

          {/* Texto */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.88)', marginBottom: '1.5rem' }}>
              Manuel Portas é un escritor galego que destaca por unha linguaxe rica e detallada, centrada na reconstrución histórica e social de Galicia a través da memoria familiar. A súa obra explora as feridas que o franquismo deixou nas familias galegas, os silencios que se transmitiron de xeración en xeración e a necesidade de desenterrar a verdade para poder vivir.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.78)', marginBottom: '2.5rem' }}>
              En <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>Faneca Brava</em>, Portas utiliza unha linguaxe emocional e detallada para armar unha crónica sobre a identidade e o peso da herdanza. A novela combina a investigación persoal co retrato dunha época marcada pola represión e a hipocrisía social, creando un thriller psicolóxico atlántico de gran forza narrativa.
            </p>

            {/* Divisor */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.25), transparent)', marginBottom: '2.5rem' }} />

            {/* 4 cards de características */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { label: "Estilo Literario", text: "Linguaxe emocional e detallada. Narración en primeira persoa que crea intimidade co lector e constrúe a atmosfera galega con precisión cinematográfica." },
                { label: "Temática Central", text: "A memoria familiar como mecanismo de resistencia. A culpa xeracional como forza narrativa. A identidade rota e a necesidade de reconstrución." },
                { label: "Influencias", text: "A tradición narrativa galega, o realismo social europeo e a novela de investigación contemporánea. A literatura de memoria histórica." },
                { label: "Achega Literaria", text: "Recupera voces silenciadas polo franquismo e devolve a dignidade ás vítimas da hipocrisía social. Denuncia a violencia doméstica e institucional." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={v ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  style={{ ...G, padding: '20px 22px' }}
                >
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '10px' }}>{item.label}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.75, color: 'rgba(234,226,210,0.78)', margin: 0 }}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cita final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7 }}
          style={{
            padding: '3rem 4rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(200,169,110,0.08) 0%, rgba(200,169,110,0.03) 100%)',
            border: '1px solid rgba(200,169,110,0.15)',
            borderTop: '1px solid rgba(200,169,110,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '20px', left: '30px', fontFamily: "'Cormorant Garamond', serif", fontSize: '6rem', color: 'rgba(200,169,110,0.12)', lineHeight: 1, pointerEvents: 'none' }}>"</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1.75, color: '#EAE2D2', position: 'relative', zIndex: 1, margin: 0 }}>
            Portas utiliza a memoria como bisturí. Non narra o pasado: autopsíao. E no proceso, devolve a vida ás que o silencio quixo matar dúas veces.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4', marginTop: '16px', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>— Sobre Faneca Brava</p>
        </motion.div>
      </div>
    </section>
  );
}
