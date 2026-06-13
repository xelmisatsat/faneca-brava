import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║  "A NOVELA" — Redeseño total. Estilo Editorial Mariñeiro.   ║
  ║  Paleta: Azul profundo océano + Laranxa ámbar portuario     ║
  ║  Sen glassmorphism. Riqueza visual con gradientes e capas.  ║
  ╚══════════════════════════════════════════════════════════════╝

  AZUIS: #0A1628 (fondo) · #0D1E3A (sección) · #112240 (cards)
         #1C3A5E (highlight) · #2A5080 (borde teal)
  LARANXA: #E8831A (primario) · #F4A847 (claro) · #C85E0A (escuro)
  COMPLEMENTOS: #6E87A6 (steel-blue) · #EAE2D2 (marfil texto)
*/

const FI = { hidden: { opacity: 0, y: 50 }, show: (d=0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: d, ease: [0.16,1,0.3,1] } }) };
const FL = { hidden: { opacity: 0, x: -60 }, show: (d=0) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: [0.16,1,0.3,1] } }) };
const FR = { hidden: { opacity: 0, x: 60 }, show: (d=0) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: [0.16,1,0.3,1] } }) };

export default function SobreSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);
  const S = (props: any) => <motion.div variants={props.v} custom={props.d||0} initial="hidden" animate={v ? "show" : "hidden"} {...props} />;

  return (
    <section style={{
      position: 'relative',
      padding: m ? '4rem 0 3rem' : '8rem 0 6rem',
      overflow: 'hidden',
      /* Fondo: degradado oceánico profundo — non plano, con capas */
      background: 'linear-gradient(170deg, #0A1628 0%, #0D1E3A 40%, #091525 75%, #0C1B34 100%)',
    }}>

      {/* Capa de luz laranxa — como un porto ao solpor */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 80% 0%, rgba(232,131,26,0.12) 0%, transparent 45%), radial-gradient(ellipse at 5% 80%, rgba(28,58,94,0.6) 0%, transparent 40%)',
      }} />

      {/* Liña decorativa superior — laranxa */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #E8831A 30%, #F4A847 60%, transparent)', opacity: 0.8 }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* ══ CABECEIRA ══════════════════════════════════════════════ */}
        <S v={FI} d={0.05} style={{ marginBottom: m ? '3rem' : '5rem' }}>
          {/* Etiqueta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
            <div style={{ width: '32px', height: '2px', background: '#E8831A', borderRadius: '2px' }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.4em',
              textTransform: 'uppercase', color: '#E8831A', fontWeight: 600,
            }}>A Novela</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(232,131,26,0.3), transparent)', maxWidth: '120px' }} />
          </div>

          {/* Título principal */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88,
            letterSpacing: '-0.025em', color: '#EAE2D2',
          }}>
            Unha historia de<br />
            <span style={{ color: '#E8831A' }}>memoria e vinganza</span>
          </h2>
        </S>

        {/* ══ GRID PRINCIPAL: portada + texto ══════════════════════════ */}
        <div style={{
          display: m ? 'flex' : 'grid',
          flexDirection: m ? 'column' : undefined,
          gridTemplateColumns: '1fr 1.5fr',
          gap: m ? '2.5rem' : '7rem',
          alignItems: 'start',
          marginBottom: m ? '3rem' : '7rem',
        }}>

          {/* ── PORTADA ── */}
          <S v={FL} d={0.15}>
            <div style={{ position: 'relative' }}>
              <motion.div
                whileHover={{ scale: 1.025, rotateY: 4 }}
                transition={{ duration: 0.5 }}
                style={{
                  borderRadius: '20px', overflow: 'hidden',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,131,26,0.15)',
                  transformStyle: 'preserve-3d', perspective: '1000px',
                  maxWidth: m ? '200px' : '300px', margin: m ? '0 auto' : undefined,
                }}
              >
                <img src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg" alt="Faneca Brava — Portada"
                  style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
              </motion.div>

              {/* Badge editorial */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                animate={v ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.06, y: -3 }}
                style={{
                  position: m ? 'relative' : 'absolute',
                  bottom: m ? 'auto' : '-20px', right: m ? 'auto' : '-20px',
                  marginTop: m ? '1rem' : 0,
                  background: 'linear-gradient(135deg, #E8831A 0%, #C85E0A 100%)',
                  borderRadius: '14px',
                  padding: m ? '12px 16px' : '16px 22px',
                  boxShadow: '0 8px 30px rgba(232,131,26,0.4)',
                  zIndex: 3,
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: '3px' }}>Editorial</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', fontWeight: 400, color: '#FFF', lineHeight: 1.0 }}>Galaxia</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Manuel Portas</div>
              </motion.div>
            </div>
          </S>

          {/* ── TEXTO ── */}
          <S v={FR} d={0.2}>
            {/* Sinopse con drop-cap */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '1rem' : '1.08rem', lineHeight: 1.95, color: '#C8D8E8', marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: '4.2rem', fontWeight: 400,
                float: 'left', marginRight: '10px', marginTop: '6px', lineHeight: 0.8,
                color: '#E8831A', textShadow: '0 0 40px rgba(232,131,26,0.4)',
              }}>F</span>
              aneca Brava é unha novela de misterio familiar e reconstrución da memoria que se desenvolve en dúas liñas temporais que acaban chocando. A historia arrinca no presente cun protagonista atormentado: Fernando Pereira, un médico de Santiago de Compostela que sofre de insomnio severo e dores físicas sen explicación médica.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.97rem' : '1.05rem', lineHeight: 1.9, color: '#8FACC4', marginBottom: '3rem' }}>
              Obsesionado por atopar a verdade, Fernando comeza a indagar na historia da súa curmá Concha, alcumada a "Faneca Brava", a quen a familia borrou da súa memoria colectiva. A través de conversas coa súa tía Lela e cun veterano fotógrafo catalán chamado Andreu Picart no Hostal dos Reis Católicos, Fernando vai destapando a realidade.
            </p>

            {/* Divisor */}
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ delay: 0.4, duration: 0.9 }}
              style={{ height: '1px', background: 'linear-gradient(90deg, #E8831A, rgba(232,131,26,0.2), transparent)', margin: '0 0 2.5rem', transformOrigin: 'left' }} />

            {/* ── Stats: III partes, Galicia, 1960 ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: m ? '8px' : '12px', marginBottom: '2.5rem' }}>
              {[{ l: 'Partes', v: 'III + Coda', i: 0 }, { l: 'Lugar', v: 'Galicia', i: 1 }, { l: 'Época', v: '1960', i: 2 }].map((d) => (
                <motion.div key={d.i}
                  initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + d.i * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(232,131,26,0.25)' }}
                  style={{
                    background: 'linear-gradient(145deg, #112240 0%, #0D1B35 100%)',
                    border: '1px solid rgba(232,131,26,0.25)',
                    borderTop: '2px solid #E8831A',
                    borderRadius: '14px',
                    padding: m ? '14px 8px' : '22px 16px',
                    textAlign: 'center',
                    transition: 'box-shadow 0.3s',
                  }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '1.4rem' : '2rem', fontWeight: 300, color: '#F4A847', letterSpacing: '-0.01em' }}>{d.v}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '8px' : '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6E87A6', marginTop: '6px' }}>{d.l}</div>
                </motion.div>
              ))}
            </div>

            {/* ── Estrutura: I, II, III ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { n: 'I',   t: 'Estirpe',            d: 'A familia Pereira, os seus segredos e o pasado silenciado' },
                { n: 'II',  t: 'A obsesión',         d: 'Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento' },
                { n: 'III', t: 'A xustiza pola man', d: 'A revelación final. A faneca brava sempre crava as súas espiñas' },
              ].map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 30 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ x: 8, background: 'rgba(232,131,26,0.07)' }}
                  style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '13px 14px', borderRadius: '10px', borderLeft: '3px solid rgba(232,131,26,0.35)', transition: 'all 0.25s' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#E8831A', minWidth: '2.2rem', lineHeight: 1 }}>{p.n}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 300, color: '#EAE2D2' }}>{p.t}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6E87A6', marginTop: '2px', lineHeight: 1.5 }}>{p.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </S>
        </div>

        {/* ══ SIMBOLISMO ═══════════════════════════════════════════════ */}
        <S v={FI} d={0.6}>
          <div style={{
            background: 'linear-gradient(135deg, #112240 0%, #0E1D36 60%, #132540 100%)',
            border: '1px solid rgba(232,131,26,0.20)',
            borderTop: '3px solid #E8831A',
            borderRadius: '24px',
            padding: m ? '2rem 1.5rem' : '4rem 5rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(244,168,71,0.08)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Acento de luz interior */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(232,131,26,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{
              display: m ? 'flex' : 'grid',
              flexDirection: m ? 'column' : undefined,
              gridTemplateColumns: '1fr 1fr',
              gap: m ? '2rem' : '5rem', alignItems: 'center',
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
                  <div style={{ width: '32px', height: '2px', background: '#E8831A', borderRadius: '2px' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#E8831A', fontWeight: 600 }}>Simbolismo</span>
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#EAE2D2', marginBottom: '1.5rem' }}>
                  O Alcume<br /><span style={{ color: '#E8831A' }}>Faneca Brava</span>
                </h3>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: '#8FACC4', marginBottom: '1.8rem' }}>
                  A <strong style={{ color: '#F4A847', fontWeight: 500 }}>faneca brava</strong> é un peixe que se camufla na area e, se o pisan, crava unhas espiñas velenosas que causan moita dor. Concha é exactamente iso: alguén a quen a sociedade e a familia "pisaron", pero que en lugar de chorar, defendeuse e atacou de volta para sobrevivir.
                </p>

                {/* Cita */}
                <div style={{ paddingLeft: '20px', borderLeft: '3px solid #E8831A' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem', color: '#F4A847', lineHeight: 1.7, margin: 0 }}>
                    "A min botástesme por mala, pero os que mandan son moito peores e eu teño as probas."
                  </p>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }} transition={{ duration: 0.5 }}
                style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
              >
                {/* Marco laranxa ao redor da foto */}
                <div style={{
                  padding: '6px', borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(232,131,26,0.4) 0%, rgba(18,34,64,0.8) 50%, rgba(232,131,26,0.2) 100%)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                }}>
                  <img src="/manus-storage/faneca-peixe.jpg"
                    alt="A Faneca Brava"
                    style={{ width: m ? '100%' : '260px', height: m ? '220px' : '260px', objectFit: 'cover', borderRadius: '18px', filter: 'brightness(0.88) saturate(0.9) contrast(1.05)', display: 'block' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </S>

      </div>
    </section>
  );
}
