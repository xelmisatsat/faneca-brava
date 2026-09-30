import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

/*
  Paleta Atlántica "Noite de Foz" para A Historia:
  - Fondo principal:    #101A1B (Noite de Foz)
  - Fondo tarxetas:     #1B2D31 (Azul néboa)
  - Superficie / citas: #162427 / #D8CDB6 (Papel vello para citas de arquivo)
  - Texto principal:    #F1EBDD (Marfil salgado)
  - Texto secundario:   #A9B4AE (Cinza néboa)
  - Acento cobre:       #B8734F (Cobre oxidado)
  - Acento lume:        #9E3F32 (Vermello lume)
  - Acento algas:       #607C70 (Verde algas)
  - Liñas/contornos:    #B69A62 (Latón apagado)
*/

const caps = [
  {
    n: "1",
    sub: "Santiago de Compostela, presente",
    title: "O insomnio de Fernando",
    text: "Fernando Pereira, médico de Santiago, non pode durmir. As olleiras fórmanlle un medio arco azul escuro baixo os ollos. Os seus síntomas físicos son a somatización dunha culpa herdada polo comportamento da súa familia no pasado. Cada noite, os ollos de Concha perségueno. No Hostal dos Reis Católicos, un encontro inesperado con Andreu Picart cambiará todo.",
    cita: "Non podo durmir porque os ollos de Concha perséguenme cando pecho os meus.",
    img: "/manus-storage/faneca-fernando-portrait.jpg",
    acento: "#B8734F"
  },
  {
    n: "2",
    sub: "Vila mariñeira galega, anos 1940–50",
    title: "A infancia na vila",
    text: "A primeira infancia de Concha pasouna nos escasos límites da foz que conformaba o peirao natural da vila, entre a casa da avoa —pegada ao comezo do areal— e a escola de dona Remedios. As tardes diluíanse entre as barrigas estomballadas das dornas con cheiro a brea e sabor a sal, capitaneando unha manchea de rillotes. Nas pelexas a tumbos, non había rapaz que conseguise domeala.",
    cita: "A mestura daquel incipiente liderado primixenio e a dureza do salitre forxaron o carácter rexo da súa infancia.",
    img: "/manus-storage/faneca-infancia-vila.png",
    acento: "#607C70"
  },
  {
    n: "3",
    sub: "A escola franquista",
    title: "Dona Remedios e os regrazos",
    text: "Dona Remedios, mestra de carácter espartano, martelaba obsesivamente nas cabezas da rapazada coas catro operacións aritméticas. Coa prima Concha asañábase aínda máis que co resto, vareándoa con saña nas xemas dos dedos. Os dedos de máis dun, arrubiados polos impactos, aquel día sangraron pola xunta das uñas. Concha soportou as batidas sen un queixume, cos ollos cravados no rostro arredondado da mestra.",
    cita: "Nin un laio, nin un lamento, cos ollos cravados no rostro arredondado, groso e mol de dona Remedios.",
    img: "/manus-storage/faneca-dona-remedios.png",
    acento: "#B69A62"
  },
  {
    n: "4",
    sub: "O punto de non retorno",
    title: "O incendio e a expulsión",
    text: "A escola arde nun incendio. A familia Pereira, instigada por Mamá Carme, acusa a Concha sen probas e expúlsana do seu seo para non manchar o apelido. A matriarca —que berraba botando sapos pola boca e batendo coas palmas das mans nas coxas— non estaba disposta a consentir que se luxase o nome dunha Pereira. Concha, de dezaseis anos, queda soa no mundo.",
    cita: "A vella negaba, botando sapos pola boca... non estaba disposta a consentir que se luxase o nome dunha Pereira así daquelá maneira.",
    img: "/manus-storage/faneca-incendio-memoria.png",
    acento: "#9E3F32"
  },
  {
    n: "5",
    sub: "Barcelona, anos 1960–70",
    title: "As fotos corsarias",
    text: "En Barcelona, Concha coñece a Andreu Picart e descobre que a cámara é poder. Convértese nunha das paparazzi máis temidas: retrata a políticos, banqueiros e membros da alta sociedade en situacións comprometidas, cobrando fortunas polas súas ‘fotos corsarias’. Monta un pequeno emporio baixo as iniciais F.B. —Faneca Brava— como franquicia de tendas de material fotográfico.",
    cita: "Non é fácil imaxinar a de cartos que amasou por aquel entón. Tanto diñeiro como riscos seguía correndo cando saía para facer as súas fotos corsarias.",
    img: "/manus-storage/faneca-barcelona.png",
    acento: "#B8734F"
  },
  {
    n: "6",
    sub: "O desenlace",
    title: "A memoria que non arde",
    text: "Fernando, extenuado física e mentalmente, monta o puzzle emocional a través das cartas da tía Lela e do relato de Andreu Picart. Descobre que Concha non foi unha marxinal derrotada, senón unha supervivente feroz que transformou o seu trauma en poder. A investigación devolve a dignidade a Concha e libera a Fernando da culpa que o tiña encadeado.",
    cita: "A memoria nunca arde completamente.",
    img: "/manus-storage/faneca-arquivo-mesa.png",
    acento: "#607C70"
  },
];

export default function HistoriaSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: 'relative', background: '#101A1B', overflow: 'hidden' }}>

      {/* ═══ CABECEIRA — Noite de Foz ═══════════ */}
      <div style={{
        background: 'linear-gradient(180deg, #0C1516 0%, #101A1B 100%)',
        padding: m ? '3.5rem 1.25rem 2.5rem' : '7rem 0 4rem',
        borderBottom: '1px solid rgba(182, 154, 98, 0.15)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0' : '0 5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.2rem' }}>
              <div style={{ width: '36px', height: '2px', background: '#B8734F' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#B8734F', fontWeight: 600 }}>
                A Historia
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.8rem, 6.5vw, 6rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#F1EBDD', margin: 0 }}>
              Seis capítulos<br /><span style={{ color: '#B8734F' }}>dunha ferida</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#A9B4AE', maxWidth: '580px', marginTop: '1.4rem' }}>
              A novela desvélase en dúas liñas temporais que converxen cara á verdade. Construída con texto real da novela de Manuel Portas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ═══ CAPÍTULOS — Bloques editoriais atlánticos ═══════════ */}
      <div style={{ padding: m ? '2.5rem 1.25rem 4rem' : '5rem 0 7rem' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0' : '0 5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: m ? '2.5rem' : '4rem' }}>
            {caps.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 45 }}
                animate={v ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: '#1B2D31',
                  border: '1px solid rgba(182, 154, 98, 0.2)',
                  borderLeft: `5px solid ${cap.acento}`,
                  borderRadius: '20px',
                  padding: m ? '20px 16px' : '36px 44px',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
                  display: m ? 'flex' : 'grid',
                  flexDirection: m ? 'column' : undefined,
                  gridTemplateColumns: m ? '1fr' : (i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr'),
                  gap: m ? '1.8rem' : '3.5rem',
                  alignItems: 'center'
                }}
              >
                {/* Imaxe */}
                <div style={{ order: i % 2 === 0 ? 1 : 2, width: '100%' }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(182, 154, 98, 0.25)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                      background: '#101A1B'
                    }}
                  >
                    <img
                      src={cap.img}
                      alt={cap.title}
                      style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '16px',
                      background: 'rgba(16, 26, 27, 0.75)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${cap.acento}88`,
                      borderRadius: '8px',
                      padding: '2px 10px'
                    }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: cap.acento, lineHeight: 1.2 }}>
                        {cap.n}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Texto e Cita */}
                <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.9rem' }}>
                    <div style={{ width: '18px', height: '1.5px', backgroundColor: cap.acento }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10.5px', letterSpacing: '0.25em', textTransform: 'uppercase', color: cap.acento, fontWeight: 600 }}>
                      {cap.sub}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', color: '#F1EBDD', letterSpacing: '-0.015em', lineHeight: 1.08, marginBottom: '1.2rem', margin: 0 }}>
                    {cap.title}
                  </h3>

                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.96rem' : '1.03rem', lineHeight: 1.85, color: '#A9B4AE', marginTop: '1rem', marginBottom: '1.4rem' }}>
                    {cap.text}
                  </p>

                  <div style={{
                    padding: m ? '12px 16px' : '14px 20px',
                    background: '#162427',
                    borderLeft: `3px solid ${cap.acento}`,
                    border: '1px solid rgba(182, 154, 98, 0.18)',
                    borderLeftWidth: '3px',
                    borderLeftColor: cap.acento,
                    borderRadius: '0 10px 10px 0'
                  }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? '0.95rem' : '1.02rem', color: '#D8CDB6', lineHeight: 1.65, margin: 0 }}>
                      "{cap.cita}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
