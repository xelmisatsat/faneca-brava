import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stages = [
  {
    label: "A OPRESIÓN",
    subtitle: "O microcosmos da vila mariñeira.",
    desc: "A infancia de Concha está marcada pola asfixia. Crece baixo a ditadura moral de Mamá Carme, matriarca despótica que prioriza as aparencias. Sofre os abusos da mestra Dona Remedios e o acoso do cura Don Anselmo. É unha vítima do sistema.",
    color: "#5D6D7E",
    bg: "rgba(20,20,28,0.95)",
  },
  {
    label: "O LUME",
    subtitle: "O punto de ruptura.",
    desc: "A escola de Dona Remedios arde nun incendio. A vila enteira e a propia familia sinalan a Concha como culpable. O lume simboliza a destrución da súa infancia e o inicio do seu estigma como a ovella negra do clan.",
    color: "#8B4040",
    bg: "rgba(30,18,18,0.95)",
  },
  {
    label: "O DESTERRO",
    subtitle: "A expulsión do paraíso familiar.",
    desc: "Para protexer o bo nome dos Pereira, Mamá Carme condena á súa propia neta e expúlsana sen piedade. Só a tía Lela e o tío Seso lle ofrecen un mínimo de acubillo antes do exilio forzoso.",
    color: "#5A4A3A",
    bg: "rgba(25,20,15,0.95)",
  },
  {
    label: "A LENTE CORSARIA",
    subtitle: "A metamorfose en Barcelona.",
    desc: "Concha foxe a Cataluña e transforma o trauma en poder. Convértese nunha temida paparazzi. Usa a cámara como arma para destapar as miserias de banqueiros e políticos. Xa non é a vítima; é a executora.",
    color: "#C8A96E",
    bg: "rgba(15,15,25,0.9)",
  },
  {
    label: "O REMORSO",
    subtitle: "A culpa somatizada no presente.",
    desc: "Anos despois, o doutor Fernando Pereira sofre insomnio crónico e dores inexplicables. Non é enfermidade: é a somatización da culpa colectiva da familia por silenciar a verdade de Concha.",
    color: "#6B8CAE",
    bg: "rgba(13,20,30,0.9)",
  },
  {
    label: "A REVELACIÓN",
    subtitle: "O arquivo da memoria.",
    desc: "Incapaz de durmir, Fernando investiga o pasado. Grazas a un cartafol da tía Lela e ao fotógrafo Andreu Picart, descobre a verdadeira dimensión da Faneca Brava: unha muller libre que venceu á moralidade que a tentou destruír.",
    color: "#C8A96E",
    bg: "rgba(18,22,28,0.85)",
  },
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
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>Percorrido Emocional</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Timeline <span style={{ color: '#C8A96E' }}>Emocional</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '560px', marginTop: '1.5rem' }}>
            Desde a opresión ata a revelación. Seis etapas dunha muller que se negou a ser vítima.
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
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, #5D6D7E, #8B4040, #C8A96E)', transformOrigin: 'top' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {stages.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={v ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 0, position: 'relative' }}
              >
                {/* Lado esquerdo */}
                <div style={{ width: '50%', paddingRight: '3.5rem', textAlign: 'right', display: i % 2 === 0 ? 'block' : 'none' }}>
                  <motion.div
                    whileHover={{ x: -6 }}
                    style={{
                      display: 'inline-block',
                      background: `linear-gradient(135deg, ${ev.bg}, rgba(255,255,255,0.04))`,
                      backdropFilter: 'blur(40px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderTop: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: '16px',
                      padding: '24px 28px',
                      boxShadow: `0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`,
                      maxWidth: '420px',
                    }}
                  >
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.4em', fontWeight: 500, color: ev.color, lineHeight: 1 }}>{ev.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', color: '#EAE2D2', marginTop: '8px', opacity: 0.85 }}>{ev.subtitle}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#8B9BB4', marginTop: '12px', lineHeight: 1.75 }}>{ev.desc}</div>
                  </motion.div>
                </div>
                {i % 2 !== 0 && <div style={{ width: '50%' }} />}

                {/* Punto central */}
                <div style={{ position: 'absolute', left: '50%', top: '20px', transform: 'translateX(-50%)', zIndex: 10 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={v ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 300 }}
                    style={{
                      width: '14px', height: '14px', borderRadius: '50%',
                      backgroundColor: ev.color,
                      boxShadow: `0 0 24px ${ev.color}70`,
                      border: '2px solid rgba(255,255,255,0.15)',
                    }}
                  />
                </div>

                {/* Lado dereito */}
                {i % 2 !== 0 && (
                  <div style={{ width: '50%', paddingLeft: '3.5rem' }}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      style={{
                        background: `linear-gradient(135deg, ${ev.bg}, rgba(255,255,255,0.04))`,
                        backdropFilter: 'blur(40px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderTop: '1px solid rgba(255,255,255,0.22)',
                        borderRadius: '16px',
                        padding: '24px 28px',
                        boxShadow: `0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`,
                        maxWidth: '420px',
                      }}
                    >
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.4em', fontWeight: 500, color: ev.color, lineHeight: 1 }}>{ev.label}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, fontStyle: 'italic', color: '#EAE2D2', marginTop: '8px', opacity: 0.85 }}>{ev.subtitle}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#8B9BB4', marginTop: '12px', lineHeight: 1.75 }}>{ev.desc}</div>
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
