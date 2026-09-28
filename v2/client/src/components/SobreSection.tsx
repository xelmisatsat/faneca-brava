import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

/*
  Paleta Atlántica "Noite de Foz" (recomendada):
  - Fondo principal:    #101A1B (Noite de Foz)
  - Fondo tarxetas:     #1B2D31 (Azul néboa)
  - Superficie / capas: #162427 / #D8CDB6 (Papel vello para citas/tarxetas)
  - Texto principal:    #F1EBDD (Marfil salgado)
  - Texto secundario:   #A9B4AE (Cinza néboa)
  - Acento principal:   #B8734F (Cobre oxidado)
  - Acento histórico:   #9E3F32 (Vermello lume)
  - Acento fresco:      #607C70 (Verde algas)
  - Liñas/contornos:    #B69A62 (Latón apagado)
*/

const FI = { hidden: { opacity: 0, y: 35 }, show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } }) };
const FL = { hidden: { opacity: 0, x: -40 }, show: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.85, delay: d, ease: [0.16, 1, 0.3, 1] } }) };
const FR = { hidden: { opacity: 0, x: 40 }, show: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.85, delay: d, ease: [0.16, 1, 0.3, 1] } }) };

export default function SobreSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);
  const S = (props: any) => <motion.div variants={props.v} custom={props.d || 0} initial="hidden" animate={v ? "show" : "hidden"} {...props} />;

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#101A1B' }}>

      {/* ═══ 1. CABECEIRA — Noite de Foz con acento Cobre ═══════════ */}
      <div style={{
        background: 'linear-gradient(180deg, #0C1516 0%, #101A1B 100%)',
        padding: m ? '3.5rem 1.25rem 2rem' : '6.5rem 0 3.5rem',
        borderBottom: '1px solid rgba(182, 154, 98, 0.15)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem' }}>
          <S v={FI} d={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.2rem' }}>
              <div style={{ width: '32px', height: '2px', background: '#B8734F' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#B8734F', fontWeight: 600 }}>
                A Novela
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.7rem, 6.5vw, 5.8rem)', lineHeight: 0.92, color: '#F1EBDD', margin: 0, letterSpacing: '-0.02em' }}>
              Unha historia de<br /><span style={{ color: '#B8734F' }}>memoria e desquite</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.7, color: '#A9B4AE', maxWidth: '580px', marginTop: '1.2rem' }}>
              A novela de Manuel Portas que rescata a voz silenciada dunha muller rebelde fronte á hipocrisía dunha época.
            </p>
          </S>
        </div>
      </div>

      {/* ═══ 2. PORTADA + SINOPSE + STATS — Azul néboa e Marfil ═════════ */}
      <div style={{ padding: m ? '2.5rem 1.25rem 3rem' : '4.5rem 0 5rem', background: '#101A1B' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem',
          display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined,
          gridTemplateColumns: '1fr 1.6fr', gap: m ? '2.5rem' : '5rem', alignItems: 'start',
        }}>

          {/* Portada con Badge editorial */}
          <S v={FL} d={0.12}>
            <div style={{ position: 'relative', maxWidth: m ? '240px' : '300px', margin: m ? '0 auto' : undefined }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.35 }}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(182, 154, 98, 0.3)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55)',
                  background: '#1B2D31'
                }}
              >
                <img
                  src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
                  alt="Faneca Brava — Portada"
                  style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }}
                />
              </motion.div>

              {/* Badge editorial — Cobre Oxidado e Latón */}
              <motion.div
                initial={{ opacity: 0, y: 15 }} animate={v ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  position: m ? 'relative' : 'absolute',
                  bottom: m ? 'auto' : '-14px', right: m ? 'auto' : '-16px',
                  marginTop: m ? '1rem' : 0,
                  background: '#1B2D31',
                  border: '1px solid #B69A62',
                  borderLeft: '4px solid #B8734F',
                  borderRadius: '10px',
                  padding: m ? '10px 14px' : '12px 18px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.45)',
                  zIndex: 3,
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B69A62', fontWeight: 600 }}>
                  Editorial
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.45rem', fontWeight: 400, color: '#F1EBDD', lineHeight: 1.1 }}>
                  Galaxia
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#A9B4AE', marginTop: '2px' }}>
                  Manuel Portas
                </div>
              </motion.div>
            </div>
          </S>

          {/* Texto Sinopse + Ficha Resumo */}
          <S v={FR} d={0.18}>
            <div style={{
              background: '#162427',
              border: '1px solid rgba(182, 154, 98, 0.2)',
              borderRadius: '18px',
              padding: m ? '20px 18px' : '32px 36px',
              marginBottom: '1.8rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.96rem' : '1.05rem', lineHeight: 1.85, color: '#F1EBDD', marginBottom: '1.2rem', marginTop: 0 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.6rem', fontWeight: 300, float: 'left', marginRight: '10px', marginTop: '2px', lineHeight: 0.8, color: '#B8734F' }}>F</span>
                aneca Brava é unha novela de misterio familiar e reconstrución da memoria que se desenvolve en dúas liñas temporais que acaban chocando. A historia arrinca no presente cun protagonista atormentado: Fernando Pereira, un médico de Santiago de Compostela que sofre de insomnio severo e dores físicas sen explicación médica.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.94rem' : '1.01rem', lineHeight: 1.8, color: '#A9B4AE', margin: 0 }}>
                Obsesionado por atopar a verdade, Fernando comeza a indagar na historia da súa curmá Concha, alcumada a "Faneca Brava", a quen a familia borrou da súa memoria colectiva. A través de conversas coa súa tía Lela e cun veterano fotógrafo catalán chamado Andreu Picart no Hostal dos Reis Católicos, Fernando vai destapando a realidade.
              </p>
            </div>

            {/* Stats Cards — Azul néboa e Latón */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: m ? '10px' : '16px' }}>
              {[
                { l: 'Partes', v: 'III + Coda', acento: '#B8734F' },
                { l: 'Lugar',  v: 'Galicia',    acento: '#607C70' },
                { l: 'Época',  v: '1960',       acento: '#B69A62' },
              ].map((d, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 + i * 0.08 }}
                  whileHover={{ y: -3 }}
                  style={{
                    background: '#1B2D31',
                    border: '1px solid rgba(182, 154, 98, 0.25)',
                    borderTop: `3px solid ${d.acento}`,
                    borderRadius: '12px',
                    padding: m ? '14px 8px' : '18px 14px',
                    textAlign: 'center',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
                  }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '1.35rem' : '1.85rem', fontWeight: 300, color: '#F1EBDD' }}>{d.v}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '8px' : '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: d.acento, marginTop: '4px', fontWeight: 500 }}>{d.l}</div>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </div>

      {/* ═══ 3. ESTRUTURA DAS PARTES — Azul néboa con acentos narrativos ═══════════ */}
      <div style={{
        background: '#162427',
        padding: m ? '2.5rem 1.25rem' : '4rem 0',
        borderTop: '1px solid rgba(182, 154, 98, 0.15)',
        borderBottom: '1px solid rgba(182, 154, 98, 0.15)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem' }}>
          <S v={FI} d={0.25}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ width: '24px', height: '1.5px', background: '#B69A62' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B69A62', fontWeight: 600 }}>
                Estrutura Narrativa
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { n: 'I',   t: 'Estirpe',            d: 'A familia Pereira, os seus segredos e o pasado silenciado na vila mariñeira.',              acento: '#607C70' },
                { n: 'II',  t: 'A obsesión',         d: 'Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento en Santiago.',       acento: '#B8734F' },
                { n: 'III', t: 'A xustiza pola man', d: 'A revelación final en Barcelona. A faneca brava sempre crava as súas espiñas velenosas.', acento: '#9E3F32' },
              ].map((p, i) => (
                <motion.div key={i}
                  whileHover={{ x: m ? 0 : 6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex', gap: m ? '14px' : '22px', alignItems: 'flex-start',
                    padding: m ? '14px 16px' : '18px 24px',
                    background: '#1B2D31',
                    border: '1px solid rgba(182, 154, 98, 0.18)',
                    borderLeft: `4px solid ${p.acento}`,
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: p.acento, minWidth: '2rem' }}>
                    {p.n}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: '#F1EBDD' }}>
                      {p.t}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '12px' : '13.5px', color: '#A9B4AE', marginTop: '3px', lineHeight: 1.5, fontWeight: 300 }}>
                      {p.d}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </div>

      {/* ═══ 4. SIMBOLISMO — A Faneca Brava (Noite de Foz e Cobre) ═════════════ */}
      <div style={{ background: '#101A1B', padding: m ? '3rem 1.25rem 3.5rem' : '5rem 0 6rem' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem',
          display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined,
          gridTemplateColumns: '1.2fr 1fr', gap: m ? '2.5rem' : '5rem', alignItems: 'center',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
              <div style={{ width: '28px', height: '2px', background: '#B8734F' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B8734F', fontWeight: 600 }}>
                Simbolismo
              </span>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 0.92, color: '#F1EBDD', marginBottom: '1.4rem' }}>
              O Alcume<br /><span style={{ color: '#B8734F' }}>Faneca Brava</span>
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.95rem' : '1.02rem', lineHeight: 1.85, color: '#A9B4AE', marginBottom: '1.5rem' }}>
              A <strong style={{ color: '#F1EBDD', fontWeight: 500 }}>faneca brava</strong> é un peixe que se camufla na area e, se o pisan, crava unhas espiñas velenosas que causan moita dor. Concha é exactamente iso: alguén a quen a sociedade e a familia "pisaron", pero que en lugar de chorar, defendeuse e atacou de volta para sobrevivir.
            </p>
            <div style={{
              padding: '16px 20px',
              background: '#162427',
              borderLeft: '3px solid #B8734F',
              borderRadius: '0 12px 12px 0',
              border: '1px solid rgba(182, 154, 98, 0.2)',
              borderLeftWidth: '3px',
              borderLeftColor: '#B8734F'
            }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? '0.95rem' : '1.05rem', color: '#D8CDB6', lineHeight: 1.7, margin: 0 }}>
                "A min botástesme por mala, pero os que mandan son moito peores e eu teño as probas."
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(182, 154, 98, 0.3)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              background: '#1B2D31'
            }}>
              <img
                src="/manus-storage/faneca-peixe.jpg"
                alt="A Faneca Brava"
                style={{
                  width: m ? '100%' : '300px',
                  height: m ? '220px' : '300px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
