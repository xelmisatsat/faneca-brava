import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const cardStyle = {
  background: '#152232',
  border: '1.5px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  boxShadow: '0 16px 45px rgba(0,0,0,0.4)',
};

const fichaItems = [
  { label: "Título",       value: "Faneca Brava" },
  { label: "Autor",        value: "Manuel Portas" },
  { label: "Editorial",    value: "Editorial Xerais (2013) · Editorial Galaxia (2024)" },
  { label: "Lingua",       value: "Galego" },
  { label: "Xénero",       value: "Novela de memoria" },
  { label: "Partes",       value: "III + Coda" },
  { label: "Nº páxinas",   value: "244" },
];

const temas = [
  "Memoria familiar", "Franquismo", "Vinganza", "Identidade",
  "Fotografía", "Segredos", "Culpa xeracional", "Resistencia feminina",
  "Hipocrisía social", "Trauma herdado",
];

const capitulosColors = [
  { bg: "#283B4F", border: "1px solid #3E5266" }, // Parte I
  { bg: "#364638", border: "1px solid #4C594A" }, // Parte II
  { bg: "#4A353C", border: "1px solid #5F4A51" }, // Parte III
  { bg: "#3D354A", border: "1px solid #51485F" }, // Coda
];

export default function LibroSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '7rem 0 5rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(200,169,110,0.06) 0%, transparent 55%)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 4rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.2rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }} style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>O Libro</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Faneca <span style={{ color: '#C8A96E' }}>Brava</span>
          </h2>
        </motion.div>

        {/* Grid: portada + info */}
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '260px 1fr', gap: '4rem', alignItems: 'start', marginBottom: '3rem' }}>

          {/* Portada real */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: [0.16,1,0.3,1] }}>
            <motion.div
              whileHover={{ scale: 1.03, rotateY: 3 }}
              transition={{ duration: 0.5 }}
              style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.6)', transformStyle: 'preserve-3d', perspective: '1000px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <img
                src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
                alt="Faneca Brava — Portada"
                style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          </motion.div>

          {/* Ficha + Sinopse */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2 }}>

            {/* Ficha técnica */}
            <div style={{ ...cardStyle, padding: '28px 32px', marginBottom: '2rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', fontWeight: 400, color: '#FFFFFF', marginBottom: '20px', letterSpacing: '-0.015em' }}>Ficha Técnica</div>
              <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '12px' }}>
                {fichaItems.map((item, i) => {
                  const isEditorial = item.label === "Editorial";
                  return (
                    <div 
                      key={i} 
                      style={{ 
                        padding: '14px 18px', 
                        backgroundColor: '#1C2B3C', 
                        borderRadius: '12px', 
                        border: '1px solid rgba(255,255,255,0.06)',
                        gridColumn: (!m && isEditorial) ? 'span 2' : undefined
                      }}
                    >
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '6px', fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.3 }}>{item.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sinopse */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', fontWeight: 400, color: '#FFFFFF', marginBottom: '14px', letterSpacing: '-0.015em' }}>Sinopse</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: '#F8FAFC', marginBottom: '12px' }}>
                Faneca Brava é unha novela de misterio familiar e reconstrución da memoria que se desenvolve en dúas liñas temporais que acaban chocando. No presente, Fernando Pereira, médico de Santiago, non pode durmir. No pasado, a súa curmá Concha foi borrada da memoria familiar.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: '#E2E8F0' }}>
                A través dunha investigación que o leva desde Santiago ata o Hostal dos Reis Católicos, Fernando vai destapando a verdade sobre Concha: non foi unha marxinal derrotada, senón unha supervivente feroz que usou a cámara como arma de vinganza.
              </p>
            </div>

            {/* Temas */}
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#FFFFFF', marginBottom: '12px' }}>Temas Centrais</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {temas.map((t, i) => (
                  <motion.span 
                    key={i} 
                    whileHover={{ scale: 1.05, y: -2 }}
                    style={{ 
                      fontFamily: "'DM Sans', sans-serif", 
                      fontSize: '12px', 
                      padding: '6px 14px', 
                      borderRadius: '9999px', 
                      background: '#1C2B3C', 
                      color: '#C8A96E', 
                      border: '1px solid rgba(200,169,110,0.3)', 
                      cursor: 'default' 
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Estrutura da novela */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.5 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', fontWeight: 400, color: '#FFFFFF', marginBottom: '20px', letterSpacing: '-0.015em' }}>Estrutura da Novela</div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { num: "Parte I",   title: "Estirpe",            desc: "A familia Pereira, os seus segredos e o pasado silenciado. A infancia de Concha na vila mariñeira galega." },
              { num: "Parte II",  title: "A obsesión",         desc: "Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento a través de Andreu Picart e a tía Lela." },
              { num: "Parte III", title: "A xustiza pola man", desc: "A revelación final. A faneca brava sempre crava as súas espiñas. A memoria devolve a dignidade." },
              { num: "Coda",      title: "Epílogo",            desc: "As últimas 10 páxinas. O remate emocional da historia. A resolución do destino de Concha." },
            ].map((p, i) => {
              const styleTheme = capitulosColors[i] || capitulosColors[0];
              return (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -6, scale: 1.01 }} 
                  transition={{ duration: 0.3 }}
                  style={{ 
                    backgroundColor: styleTheme.bg,
                    border: styleTheme.border,
                    borderRadius: '18px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    padding: '24px 26px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '8px', fontWeight: 500 }}>{p.num}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontWeight: 400, color: '#FFFFFF', marginBottom: '10px' }}>{p.title}</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.8, color: '#E2E8F0', margin: 0 }}>{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
