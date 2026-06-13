import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const FI = { hidden: { opacity: 0, y: 60, filter: 'blur(4px)' }, show: (d=0) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, delay: d, ease: [0.16,1,0.3,1] } }) };
const FL = { hidden: { opacity: 0, x: -70, filter: 'blur(6px)' }, show: (d=0) => ({ opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.0, delay: d, ease: [0.16,1,0.3,1] } }) };
const FR = { hidden: { opacity: 0, x: 70, filter: 'blur(6px)' }, show: (d=0) => ({ opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.0, delay: d, ease: [0.16,1,0.3,1] } }) };

/* ─── Paleta sólida "Arquivo Atlántico" ─────────────────────────────────────
   Sen glassmorphism. Bloques completamente opacos con fondos azul-pizarra.
   Fondos: #16202E (principal) · #1C2B3D (tarxetas) · #1A2538 (secundario)
   Acento: #C8A96E (ámbar dourado) — identidade visual intacta
   Texto: #EAE2D2 (marfil) · #B8C4D4 (corpo) · #8FA3B8 (labels)
   ─────────────────────────────────────────────────────────────────────────── */

const CARD_SOLID = {
  background: '#1C2B3D',
  border: '1px solid rgba(200,169,110,0.20)',
  borderTop: '2px solid rgba(200,169,110,0.38)',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
};

export default function SobreSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  const S = (props: any) => <motion.div variants={props.v} custom={props.d||0} initial="hidden" animate={v ? "show" : "hidden"} {...props} />;

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', background: 'linear-gradient(160deg, #131D2A 0%, #16202E 50%, #141C2A 100%)' }}>

      {/* Acento de luz ámbar moi suave na esquina superior esquerda */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 10% 20%, rgba(200,169,110,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* ── Cabeceira ── */}
        <S v={FI} d={0.1} style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.05 }}
              style={{ width: '48px', height: '2px', background: '#C8A96E', transformOrigin: 'left', borderRadius: '2px' }}
            />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E', fontWeight: 500 }}>A Novela</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Unha historia de<br /><span style={{ color: '#C8A96E' }}>memoria e vinganza</span>
          </h2>
        </S>

        {/* ── Grid principal: portada + texto ── */}
        <div style={{ display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined, gridTemplateColumns: m ? '1fr' : '1fr 1.4fr', gap: m ? '2rem' : '6rem', alignItems: 'start', marginBottom: m ? '3rem' : '6rem' }}>

          {/* Portada */}
          <S v={FL} d={0.2}>
            <div style={{ position: 'relative' }}>
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 3 }}
                transition={{ duration: 0.5 }}
                style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6)', transformStyle: 'preserve-3d', perspective: '1000px', maxWidth: m ? '220px' : '320px', margin: m ? '0 auto' : undefined }}
              >
                <img src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg" alt="Faneca Brava — Portada"
                  style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
              </motion.div>

              {/* Card de editorial — agora sólida */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={v ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                style={{
                  position: m ? 'relative' : 'absolute',
                  bottom: m ? 'auto' : '-24px',
                  right: m ? 'auto' : '-16px',
                  marginTop: m ? '1rem' : 0,
                  ...CARD_SOLID,
                  padding: m ? '12px 16px' : '16px 20px',
                  zIndex: 2
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8FA3B8' }}>Editorial</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: '#C8A96E', lineHeight: 1.1, marginTop: '4px' }}>Galaxia</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8FA3B8', marginTop: '2px' }}>Manuel Portas</div>
              </motion.div>
            </div>
          </S>

          {/* Texto */}
          <div>
            <S v={FR} d={0.3}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: '#D4C8B4', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4.5rem', fontWeight: 300, float: 'left', marginRight: '12px', marginTop: '4px', lineHeight: 0.85, color: '#C8A96E' }}>F</span>
                aneca Brava é unha novela de misterio familiar e reconstrución da memoria que se desenvolve en dúas liñas temporais que acaban chocando. A historia arrinca no presente cun protagonista atormentado: Fernando Pereira, un médico de Santiago de Compostela que sofre de insomnio severo e dores físicas sen explicación médica.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: '#B8C4D4', marginBottom: '2.5rem' }}>
                Obsesionado por atopar a verdade, Fernando comeza a indagar na historia da súa curmá Concha, alcumada a "Faneca Brava", a quen a familia borrou da súa memoria colectiva. A través de conversas coa súa tía Lela —que garda un cartafol con vellos recortes e cartas— e cun veterano fotógrafo catalán chamado Andreu Picart no Hostal dos Reis Católicos, Fernando vai destapando a realidade.
              </p>
            </S>

            {/* Divisor */}
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ delay: 0.5, duration: 0.8 }}
              style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)', margin: '0 0 2.5rem', transformOrigin: 'left' }} />

            {/* Stats — bloques sólidos */}
            <S v={FI} d={0.5}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: m ? '8px' : '14px', marginBottom: '2.5rem' }}>
                {[{ l: 'Partes', v: 'III + Coda' }, { l: 'Lugar', v: 'Galicia' }, { l: 'Época', v: '1960' }].map((d, i) => (
                  <motion.div key={i} whileHover={m ? {} : { scale: 1.04, y: -3 }} transition={{ duration: 0.3 }}
                    style={{ ...CARD_SOLID, padding: m ? '14px 8px' : '20px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '1.5rem' : '2.2rem', fontWeight: 300, color: '#C8A96E' }}>{d.v}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '8px' : '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8FA3B8', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.l}</div>
                  </motion.div>
                ))}
              </div>
            </S>

            {/* Estrutura das partes */}
            <S v={FI} d={0.65}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { n: 'I',   t: 'Estirpe',            d: 'A familia Pereira, os seus segredos e o pasado silenciado' },
                  { n: 'II',  t: 'A obsesión',         d: 'Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento' },
                  { n: 'III', t: 'A xustiza pola man', d: 'A revelación final. A faneca brava sempre crava as súas espiñas' },
                ].map((p, i) => (
                  <motion.div key={i}
                    whileHover={{ x: 6, background: 'rgba(200,169,110,0.06)' }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '14px 16px', borderRadius: '10px', borderLeft: '2px solid rgba(200,169,110,0.25)' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: '#C8A96E', minWidth: '2.5rem' }}>{p.n}</span>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#EAE2D2' }}>{p.t}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#8FA3B8', marginTop: '3px', lineHeight: 1.6 }}>{p.d}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </S>
          </div>
        </div>

        {/* ── Simbolismo — bloque sólido ── */}
        <S v={FI} d={0.7}>
          <motion.div
            whileHover={{ scale: 1.005 }}
            style={{ ...CARD_SOLID, padding: m ? '2rem 1.5rem' : '4rem 5rem', borderRadius: '24px', borderTop: '2px solid rgba(200,169,110,0.40)', boxShadow: '0 12px 48px rgba(0,0,0,0.40)' }}
          >
            <div style={{ display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined, gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '5rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '2px', background: '#C8A96E', borderRadius: '2px' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E', fontWeight: 500 }}>Simbolismo</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#EAE2D2', marginBottom: '1.5rem' }}>
                  O Alcume<br /><span style={{ color: '#C8A96E' }}>Faneca Brava</span>
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: '#B8C4D4', marginBottom: '1.5rem' }}>
                  A <strong style={{ color: '#C8A96E', fontWeight: 400 }}>faneca brava</strong> é un peixe que se camufla na area e, se o pisan, crava unhas espiñas velenosas que causan moita dor. Concha é exactamente iso: alguén a quen a sociedade e a familia "pisaron", pero que en lugar de chorar, defendeuse e atacou de volta para sobrevivir.
                </p>
                <div style={{ paddingLeft: '20px', borderLeft: '2px solid rgba(200,169,110,0.5)' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1rem', color: '#C8A96E', lineHeight: 1.7 }}>
                    "A min botástesme por mala, pero os que mandan son moito peores e eu teño as probas."
                  </p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.04, rotate: 1 }} transition={{ duration: 0.5 }} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <img src="/manus-storage/faneca-peixe.jpg"
                  alt="A Faneca Brava" style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '20px', filter: 'brightness(0.9) saturate(0.85)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
              </motion.div>
            </div>
          </motion.div>
        </S>
      </div>

    </section>
  );
}
