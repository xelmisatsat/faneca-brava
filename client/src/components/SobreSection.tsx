import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

/*
  ╔═══════════════════════════════════════════════════════════════╗
  ║  "A NOVELA" — Redeseño editorial por bloques de cor.         ║
  ║  5 franxas horizontais, cada unha cunha cor sólida distinta. ║
  ║  Sen glassmorphism, sen bordos brillantes, sen glows.        ║
  ║                                                               ║
  ║  1. Cabeceira:      #0A1A33  (azul mariño profundo)          ║
  ║  2. Portada+Texto:  #1C2F57  (azul intermedio)               ║
  ║  3. Stats:          #6E87A6  (steel blue — contraste)        ║
  ║  4. Estrutura:      #1A3048  (teal escuro)                   ║
  ║  5. Simbolismo:     #2E2215  (marrón kraft cálido)           ║
  ║                                                               ║
  ║  Acentos:           #D4924A  (ámbar/laranxa terroso)         ║
  ║  Stats cards:       3 cores diferentes cada unha             ║
  ╚═══════════════════════════════════════════════════════════════╝
*/

const FI = { hidden: { opacity: 0, y: 40 }, show: (d=0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.16,1,0.3,1] } }) };
const FL = { hidden: { opacity: 0, x: -50 }, show: (d=0) => ({ opacity: 1, x: 0, transition: { duration: 0.85, delay: d, ease: [0.16,1,0.3,1] } }) };
const FR = { hidden: { opacity: 0, x: 50 }, show: (d=0) => ({ opacity: 1, x: 0, transition: { duration: 0.85, delay: d, ease: [0.16,1,0.3,1] } }) };

export default function SobreSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);
  const S = (props: any) => <motion.div variants={props.v} custom={props.d||0} initial="hidden" animate={v ? "show" : "hidden"} {...props} />;

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ═══ FRANXA 1: Cabeceira — azul mariño profundo ═══════════ */}
      <div style={{ background: '#0A1A33', padding: m ? '3.5rem 1.25rem 2.5rem' : '7rem 0 4rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem' }}>
          <S v={FI} d={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ width: '28px', height: '2px', background: '#D4924A' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4924A', fontWeight: 600 }}>A Novela</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 0.9, color: '#EAE2D2', margin: 0 }}>
              Unha historia de<br /><span style={{ color: '#D4924A' }}>memoria e vinganza</span>
            </h2>
          </S>
        </div>
      </div>

      {/* ═══ FRANXA 2: Portada + Sinopse — azul intermedio ═════════ */}
      <div style={{ background: '#1C2F57', padding: m ? '2.5rem 1.25rem' : '5rem 0' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem',
          display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined,
          gridTemplateColumns: '1fr 1.6fr', gap: m ? '2rem' : '6rem', alignItems: 'start',
        }}>

          {/* Portada */}
          <S v={FL} d={0.12}>
            <div style={{ position: 'relative' }}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}
                style={{ borderRadius: '14px', overflow: 'hidden', maxWidth: m ? '200px' : '280px', margin: m ? '0 auto' : undefined }}>
                <img src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg" alt="Faneca Brava — Portada"
                  style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
              </motion.div>

              {/* Badge editorial — sólido marrón/pumpkin */}
              <motion.div
                initial={{ opacity: 0, y: 15 }} animate={v ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.5 }}
                style={{
                  position: m ? 'relative' : 'absolute',
                  bottom: m ? 'auto' : '-16px', right: m ? 'auto' : '-14px',
                  marginTop: m ? '0.8rem' : 0,
                  background: '#B5722A',
                  borderRadius: '10px',
                  padding: m ? '10px 14px' : '14px 20px',
                  zIndex: 3,
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Editorial</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: '#FFF', lineHeight: 1 }}>Galaxia</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>Manuel Portas</div>
              </motion.div>
            </div>
          </S>

          {/* Texto */}
          <S v={FR} d={0.18}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.97rem' : '1.06rem', lineHeight: 1.9, color: '#D6DDE8', marginBottom: '1.2rem', marginTop: 0 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.8rem', fontWeight: 300, float: 'left', marginRight: '10px', marginTop: '4px', lineHeight: 0.8, color: '#D4924A' }}>F</span>
              aneca Brava é unha novela de misterio familiar e reconstrución da memoria que se desenvolve en dúas liñas temporais que acaban chocando. A historia arrinca no presente cun protagonista atormentado: Fernando Pereira, un médico de Santiago de Compostela que sofre de insomnio severo e dores físicas sen explicación médica.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.95rem' : '1.02rem', lineHeight: 1.85, color: '#9EB0C8', margin: 0 }}>
              Obsesionado por atopar a verdade, Fernando comeza a indagar na historia da súa curmá Concha, alcumada a "Faneca Brava", a quen a familia borrou da súa memoria colectiva. A través de conversas coa súa tía Lela e cun veterano fotógrafo catalán chamado Andreu Picart no Hostal dos Reis Católicos, Fernando vai destapando a realidade.
            </p>
          </S>
        </div>
      </div>

      {/* ═══ FRANXA 3: Stats — steel blue (cor clara de contraste) ═ */}
      <div style={{ background: '#6E87A6', padding: m ? '1.5rem 1.25rem' : '3rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: m ? '8px' : '16px' }}>
          {[
            { l: 'Partes', v: 'III + Coda', bg: '#0D1E3A', txt: '#F4A847', ltxt: 'rgba(255,255,255,0.55)' },
            { l: 'Lugar',  v: 'Galicia',    bg: '#B5722A', txt: '#FFFFFF', ltxt: 'rgba(255,255,255,0.6)' },
            { l: 'Época',  v: '1960',       bg: '#1A4A5A', txt: '#8ECAE6', ltxt: 'rgba(255,255,255,0.5)' },
          ].map((d, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 + i * 0.08 }}
              whileHover={{ y: -3 }}
              style={{
                background: d.bg,
                borderRadius: m ? '10px' : '12px',
                padding: m ? '14px 8px' : '22px',
                textAlign: 'center',
              }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '1.4rem' : '2rem', fontWeight: 300, color: d.txt }}>{d.v}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? '8px' : '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: d.ltxt, marginTop: '5px' }}>{d.l}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ FRANXA 4: Estrutura das partes — teal escuro ═══════════ */}
      <div style={{ background: '#122535', padding: m ? '2rem 1.25rem' : '3.5rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem' }}>
          <S v={FI} d={0.4}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { n: 'I',   t: 'Estirpe',            d: 'A familia Pereira, os seus segredos e o pasado silenciado',             bg: '#1A3048' },
                { n: 'II',  t: 'A obsesión',         d: 'Fernando investiga. A verdade sobre Concha emerxe fragmento a fragmento', bg: '#1E3652' },
                { n: 'III', t: 'A xustiza pola man', d: 'A revelación final. A faneca brava sempre crava as súas espiñas',        bg: '#1A3048' },
              ].map((p, i) => (
                <motion.div key={i}
                  whileHover={{ x: 8 }}
                  style={{
                    display: 'flex', gap: '20px', alignItems: 'flex-start',
                    padding: '18px 20px',
                    background: p.bg,
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#D4924A', minWidth: '2rem' }}>{p.n}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 400, color: '#EAE2D2' }}>{p.t}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#7A9AB8', marginTop: '2px', lineHeight: 1.5 }}>{p.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </S>
        </div>
      </div>

      {/* ═══ FRANXA 5: Simbolismo — marrón kraft cálido ═════════════ */}
      <div style={{ background: '#2E2215', padding: m ? '2.5rem 1.25rem' : '5rem 0' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: m ? '0' : '0 5rem',
          display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined,
          gridTemplateColumns: '1.2fr 1fr', gap: m ? '2rem' : '5rem', alignItems: 'center',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ width: '28px', height: '2px', background: '#D4924A' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4924A', fontWeight: 600 }}>Simbolismo</span>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 0.92, color: '#EAE2D2', marginBottom: '1.5rem' }}>
              O Alcume<br /><span style={{ color: '#D4924A' }}>Faneca Brava</span>
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.85, color: '#C4AE94', marginBottom: '1.5rem' }}>
              A <strong style={{ color: '#E8A54A', fontWeight: 500 }}>faneca brava</strong> é un peixe que se camufla na area e, se o pisan, crava unhas espiñas velenosas que causan moita dor. Concha é exactamente iso: alguén a quen a sociedade e a familia "pisaron", pero que en lugar de chorar, defendeuse e atacou de volta para sobrevivir.
            </p>
            <div style={{ paddingLeft: '18px', borderLeft: '2px solid #D4924A' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1rem', color: '#E8C17A', lineHeight: 1.65, margin: 0 }}>
                "A min botástesme por mala, pero os que mandan son moito peores e eu teño as probas."
              </p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/manus-storage/faneca-peixe.jpg" alt="A Faneca Brava"
              style={{ width: m ? '100%' : '270px', height: m ? '210px' : '270px', objectFit: 'cover', borderRadius: '14px', display: 'block' }} />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
