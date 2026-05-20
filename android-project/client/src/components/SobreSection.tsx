import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const FI = { hidden: { opacity: 0, y: 60, filter: 'blur(4px)' }, show: (d=0) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, delay: d, ease: [0.16,1,0.3,1] } }) };
const FL = { hidden: { opacity: 0, x: -70, filter: 'blur(6px)' }, show: (d=0) => ({ opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.0, delay: d, ease: [0.16,1,0.3,1] } }) };
const FR = { hidden: { opacity: 0, x: 70, filter: 'blur(6px)' }, show: (d=0) => ({ opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.0, delay: d, ease: [0.16,1,0.3,1] } }) };
const SI = { hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' }, show: (d=0) => ({ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, delay: d, ease: [0.16,1,0.3,1] } }) };

export default function SobreSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  const S = (props: any) => <motion.div variants={props.v} custom={props.d||0} initial="hidden" animate={v ? "show" : "hidden"} {...props} />;

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 50%, rgba(15,30,53,0.35) 0%, transparent 55%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <S v={FI} d={0.1} style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.05 }} style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>A Novela</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Unha historia de<br /><span style={{ color: '#C8A96E' }}>memoria e vinganza</span>
          </h2>
        </S>

        {/* Grid principal */}
        <div style={{ display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined, gridTemplateColumns: m ? '1fr' : '1fr 1.4fr', gap: m ? '2rem' : '6rem', alignItems: 'start', marginBottom: m ? '3rem' : '6rem' }}>

          {/* Portada real */}
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

              {/* Card flotante */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={v ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                style={{
                  position: m ? 'relative' : 'absolute', 
                  bottom: m ? 'auto' : '-24px', 
                  right: m ? 'auto' : '-16px',
                  left: 'auto',
                  transform: 'none',
                  marginTop: m ? '1rem' : 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.15)',
                  borderTop: '1px solid rgba(255,255,255,0.28)', borderRadius: '16px',
                  padding: m ? '12px 16px' : '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  zIndex: 2
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B9BB4' }}>Editorial</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: '#C8A96E', lineHeight: 1.1, marginTop: '4px' }}>Galaxia</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4', marginTop: '2px' }}>Manuel Portas</div>
              </motion.div>
            </div>
          </S>

          {/* Texto */}
          <div>
            <S v={FR} d={0.3}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.85)', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4.5rem', fontWeight: 300, float: 'left', marginRight: '12px', marginTop: '4px', lineHeight: 0.85, color: '#C8A96E' }}>F</span>
                aneca Brava é unha novela de misterio familiar e reconstrución da memoria que se desenvolve en dúas liñas temporais que acaban chocando. A historia arrinca no presente cun protagonista atormentado: Fernando Pereira, un médico de Santiago de Compostela que sofre de insomnio severo e dores físicas sen explicación médica.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.8)', marginBottom: '2.5rem' }}>
                Obsesionado por atopar a verdade, Fernando comeza a indagar na historia da súa curmá Concha, alcumada a "Faneca Brava", a quen a familia borrou da súa memoria colectiva. A través de conversas coa súa tía Lela —que garda un cartafol con vellos recortes e cartas— e cun veterano fotógrafo catalán chamado Andreu Picart no Hostal dos Reis Católicos, Fernando vai destapando a realidade.
              </p>
            </S>

            {/* Divisor */}
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ delay: 0.5, duration: 0.8 }}
              style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)', margin: '0 0 2.5rem', transformOrigin: 'left' }} />

            {/* Stats */}
            <S v={FI} d={0.5}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: m ? '8px' : '16px', marginBottom: '2.5rem' }}>
                {[{ l: 'Partes', v: 'III' }, { l: 'Ambientación', v: 'Galicia' }, { l: 'Época', v: '1960s' }].map((d, i) => (
                  <motion.div key={i} whileHover={m ? {} : { scale: 1.04, y: -3 }} transition={{ duration: 0.3 }}
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.12)', borderTop: '1px solid rgba(255,255,255,0.22)', borderRadius: m ? '12px' : '16px', padding: m ? '14px 8px' : '20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '1.5rem' : '2.2rem', fontWeight: 300, color: '#C8A96E' }}>{d.v}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '8px' : '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B9BB4', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.l}</div>
                  </motion.div>
                ))}
              </div>
            </S>

            {/* Estrutura */}
            <S v={FI} d={0.65}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { n: 'I',   t: 'Estirpe',            d: 'A familia Pereira, os seus segredos e o pasado silenciado' },
                  { n: 'II',  t: 'A Obsesión',         d: 'Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento' },
                  { n: 'III', t: 'A Xustiza pola Man', d: 'A revelación final. A faneca brava sempre clava as súas espiñas' },
                ].map((p, i) => (
                  <motion.div key={i} whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.03)' }} transition={{ duration: 0.25 }}
                    style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '16px', borderRadius: '12px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: '#C8A96E', minWidth: '2.5rem' }}>{p.n}</span>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#EAE2D2' }}>{p.t}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#8B9BB4', marginTop: '3px', lineHeight: 1.6 }}>{p.d}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </S>
          </div>
        </div>

        {/* Simbolismo */}
        <S v={FI} d={0.7}>
          <motion.div
            whileHover={{ scale: 1.005 }}
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)', backdropFilter: 'blur(48px)', border: '1px solid rgba(255,255,255,0.12)', borderTop: '1px solid rgba(255,255,255,0.24)', borderRadius: '24px', padding: m ? '2rem 1.5rem' : '4rem 5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
          >
            <div style={{ display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined, gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? '2rem' : '5rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>Simbolismo</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#EAE2D2', marginBottom: '1.5rem' }}>
                  O Alcume<br /><span style={{ color: '#C8A96E' }}>Faneca Brava</span>
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.82)', marginBottom: '1.5rem' }}>
                  A <strong style={{ color: '#C8A96E', fontWeight: 400 }}>faneca brava</strong> é un peixe que se camufla na area e, se o pisan, clava unhas espiñas velenosas que causan moita dor. Concha é exactamente iso: alguén a quen a sociedade e a familia "pisaron", pero que en lugar de chorar, defendeuse e atacou de volta para sobrevivir.
                </p>
                <div style={{ paddingLeft: '20px', borderLeft: '2px solid rgba(200,169,110,0.4)' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1rem', color: '#C8A96E', lineHeight: 1.7 }}>
                    "A min botástesme por mala, pero os que mandan son moito peores e eu teño as probas."
                  </p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.04, rotate: 1 }} transition={{ duration: 0.5 }} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <img src="/assets/images/fish-symbol.webp"
                  alt="A Faneca Brava" style={{ width: '280px', height: '280px', objectFit: 'cover', borderRadius: '20px', filter: 'brightness(0.85) saturate(0.8)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
              </motion.div>
            </div>
          </motion.div>
        </S>
      </div>

    </section>
  );
}

