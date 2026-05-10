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

const fichaItems = [
  { label: "Título",       value: "Faneca Brava" },
  { label: "Autor",        value: "Manuel Portas" },
  { label: "Editorial",    value: "Galaxia Gutenberg" },
  { label: "Ano",          value: "2024" },
  { label: "Lingua",       value: "Galego" },
  { label: "Xénero",       value: "Novela de memoria" },
  { label: "Partes",       value: "III" },
  { label: "Ambientación", value: "Galicia / Barcelona" },
];

const temas = [
  "Memoria familiar", "Franquismo", "Vinganza", "Identidade",
  "Fotografía", "Segredos", "Culpa xeracional", "Resistencia feminina",
  "Hipocrisía social", "Trauma herdado",
];

export default function LibroSection() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: 'relative', padding: '7rem 0 5rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(13,27,42,0.3) 0%, transparent 55%)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 4rem', position: 'relative', zIndex: 10 }}>

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
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '4rem', alignItems: 'start', marginBottom: '3rem' }}>

          {/* Portada real */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: [0.16,1,0.3,1] }}>
            <motion.div
              whileHover={{ scale: 1.03, rotateY: 3 }}
              transition={{ duration: 0.5 }}
              style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.6)', transformStyle: 'preserve-3d', perspective: '1000px' }}
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
            <div style={{ ...G, padding: '28px 32px', marginBottom: '2rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#EAE2D2', marginBottom: '20px' }}>Ficha Técnica</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                {fichaItems.map((item, i) => (
                  <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B9BB4', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 300, color: '#EAE2D2' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sinopse */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#EAE2D2', marginBottom: '14px' }}>Sinopse</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.97rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.82)', marginBottom: '12px' }}>
                Faneca Brava é unha novela de misterio familiar e reconstrución da memoria que se desenvolve en dúas liñas temporais que acaban chocando. No presente, Fernando Pereira, médico de Santiago, non pode durmir. No pasado, a súa curmá Concha foi borrada da memoria familiar.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.97rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.75)' }}>
                A través dunha investigación que o leva desde Santiago ata o Hostal dos Reis Católicos, Fernando vai destapando a verdade sobre Concha: non foi unha marxinal derrotada, senón unha supervivente feroz que usou a cámara como arma de vinganza.
              </p>
            </div>

            {/* Temas */}
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#EAE2D2', marginBottom: '12px' }}>Temas Centrais</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {temas.map((t, i) => (
                  <motion.span key={i} whileHover={{ scale: 1.05, y: -2 }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(200,169,110,0.09)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.22)', cursor: 'default' }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Estrutura da novela */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.5 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#EAE2D2', marginBottom: '20px' }}>Estrutura da Novela</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { num: "Parte I",   title: "Estirpe",            desc: "A familia Pereira, os seus segredos e o pasado silenciado. A infancia de Concha na vila mariñeira galega." },
              { num: "Parte II",  title: "A Obsesión",         desc: "Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento a través de Andreu Picart e a tía Lela." },
              { num: "Parte III", title: "A Xustiza pola Man", desc: "A revelación final. A faneca brava sempre clava as súas espiñas. A memoria devolve a dignidade." },
            ].map((p, i) => (
              <motion.div key={i} whileHover={{ y: -4, scale: 1.01 }} style={{ ...G, padding: '24px 26px' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '8px' }}>{p.num}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, color: '#EAE2D2', marginBottom: '10px' }}>{p.title}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.75, color: '#8B9BB4', margin: 0 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
