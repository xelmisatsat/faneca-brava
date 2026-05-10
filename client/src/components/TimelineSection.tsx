import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const events = [
  { year: "1945", title: "Nacemento de Concha", desc: "Nace nunha vila mariñeira galega, orfa de nai. O pai emigra. Criada baixo a tutela de Mamá Carme.", color: "#6B8CAE" },
  { year: "1952", title: "A Escola do Terror", desc: "Sofre o maltrato físico da mestra Dona Remedios. Os dedos sangraban pola xunta das uñas. O cura Don Anselmo acósaa.", color: "#8B6B4A" },
  { year: "1958", title: "O Incendio", desc: "A escola arde. A familia acúsaa sen probas. Mamá Carme decide expulsala para protexer o apelido.", color: "#8B4040" },
  { year: "1959", title: "A Expulsión", desc: "Concha, de dezaseis anos, é botada da familia. Queda soa no mundo. Comeza a súa fuga cara á liberdade.", color: "#5A4A3A" },
  { year: "1963", title: "Barcelona", desc: "Chega a Barcelona. Coñece ao fotógrafo catalán Andreu Picart. Descobre que a cámara é poder.", color: "#4A7C59" },
  { year: "1968", title: "As Fotos Corsarias", desc: "Convértese nunha das paparazzi máis temidas. Retrata a poderosos en situacións comprometidas. Monta o emporio F.B.", color: "#C8A96E" },
  { year: "1975", title: "O Éxito", desc: "No ano da morte de Franco, Concha é libre e poderosa. A faneca brava sobreviviu e atacou de volta.", color: "#7A9B6A" },
  { year: "1985", title: "A Desaparición", desc: "Concha desaparece. Ninguén sabe onde está. A familia cala. O silencio vólvese a impoñer.", color: "#5D6D7E" },
  { year: "2020", title: "A Investigación", desc: "Fernando Pereira, médico de Santiago, non pode durmir. Comeza a buscar a verdade sobre Concha.", color: "#4A5A6A" },
  { year: "2024", title: "A Verdade", desc: "A memoria nunca arde completamente. A verdade sae á luz. Fernando devolve a dignidade a Concha.", color: "#C8A96E" },
];

export default function TimelineSection() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: 'relative', padding: '8rem 0 6rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,8,13,1) 0%, rgba(13,27,42,0.15) 50%, rgba(8,8,13,1) 100%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
          animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
              style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>Cronoloxía</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            A Liña do <span style={{ color: '#C8A96E' }}>Tempo</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '560px', marginTop: '1.5rem' }}>
            Desde a infancia oprimida ata a vinganza silenciosa. A cronoloxía dunha muller que se negou a ser vítima.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Liña vertical */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(200,169,110,0.12)', transform: 'translateX(-50%)' }}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={v ? { scaleY: 1 } : {}}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, #C8A96E, rgba(200,169,110,0.2))', transformOrigin: 'top' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={v ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 0, position: 'relative' }}
              >
                {/* Lado esquerdo */}
                <div style={{ width: '50%', paddingRight: '3.5rem', textAlign: 'right', display: i % 2 === 0 ? 'block' : 'none' }}>
                  <motion.div
                    whileHover={{ x: -6 }}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                      backdropFilter: 'blur(40px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderTop: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: '16px',
                      padding: '20px 24px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      maxWidth: '380px',
                    }}
                  >
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: ev.color, lineHeight: 1 }}>{ev.year}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#EAE2D2', marginTop: '6px' }}>{ev.title}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#8B9BB4', marginTop: '8px', lineHeight: 1.7 }}>{ev.desc}</div>
                  </motion.div>
                </div>
                {i % 2 !== 0 && <div style={{ width: '50%' }} />}

                {/* Punto central */}
                <div style={{ position: 'absolute', left: '50%', top: '20px', transform: 'translateX(-50%)', zIndex: 10 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={v ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 300 }}
                    style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      backgroundColor: ev.color,
                      boxShadow: `0 0 20px ${ev.color}60`,
                    }}
                  />
                </div>

                {/* Lado dereito */}
                {i % 2 !== 0 && (
                  <div style={{ width: '50%', paddingLeft: '3.5rem' }}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                        backdropFilter: 'blur(40px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderTop: '1px solid rgba(255,255,255,0.22)',
                        borderRadius: '16px',
                        padding: '20px 24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        maxWidth: '380px',
                      }}
                    >
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: ev.color, lineHeight: 1 }}>{ev.year}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#EAE2D2', marginTop: '6px' }}>{ev.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#8B9BB4', marginTop: '8px', lineHeight: 1.7 }}>{ev.desc}</div>
                    </motion.div>
                  </div>
                )}
                {i % 2 === 0 && <div style={{ width: '50%' }} />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
