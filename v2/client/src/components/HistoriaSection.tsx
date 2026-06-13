import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const caps = [
  { n: "01", sub: "Santiago de Compostela, presente", title: "O Insomnio de Fernando",
    text: "Fernando Pereira, médico de Santiago, non pode durmir. As olleiras fórmanlle un medio arco azul escuro baixo os ollos. Os seus síntomas físicos son a somatización dunha culpa herdada polo comportamento da súa familia no pasado. Cada noite, os ollos de Concha perségueno. No Hostal dos Reis Católicos, un encontro inesperado con Andreu Picart cambiará todo.",
    cita: "Non podo durmir porque os ollos de Concha perséguenme cando pecho os meus.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-fernando-portrait-EQpQqF6VEH5zWNhiMpjMkL.webp" },
  { n: "02", sub: "Vila mariñeira galega, anos 1940–50", title: "A Infancia na Vila",
    text: "A primeira infancia de Concha pasouna nos escasos límites da foz que conformaba o peirao natural da vila, entre a casa da avoa —pegada ao comezo do areal— e a escola de dona Remedios. As tardes diluíanse entre as barrigas estomballadas das dornas con cheiro a brea e sabor a sal, capitaneando unha manchea de rillotes. Nas pelexas a tumbos, non había rapaz que conseguise domeala.",
    cita: "A mestura daquel incipiente liderado primixenio e a dureza do salitre forxaron o carácter rexo da súa infancia.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-village-night-JkiwiqgEL6ZDLZTtniYVuQ.webp" },
  { n: "03", sub: "A escola franquista", title: "Dona Remedios e os Regrazos",
    text: "Dona Remedios, mestra de carácter espartano, martelaba obsesivamente nas cabezas da rapazada coas catro operacións aritméticas. Coa prima Concha asañábase aínda máis que co resto, vareándoa con saña nas xemas dos dedos. Os dedos de máis dun, arrubiados polos impactos, aquel día sangraron pola xunta das uñas. Concha soportou as batidas sen un queixume, cos ollos cravados no rostro arredondado da mestra.",
    cita: "Nin un laio, nin un lamento, cos ollos cravados no rostro arredondado, groso e mol de dona Remedios.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-school-1960s-nAvQsmurgnEG3CJKH9fM67.webp" },
  { n: "04", sub: "O punto de non retorno", title: "O Incendio e a Expulsión",
    text: "A escola arde nun incendio. A familia Pereira, instigada por Mamá Carme, acusa a Concha sen probas e expúlsana do seu seo para non manchar o apelido. A matriarca —que berraba botando sapos pola boca e batendo coas palmas das mans nas coxas— non estaba disposta a consentir que se luxase o nome dunha Pereira. Concha, de dezaseis anos, queda soa no mundo.",
    cita: "A vella negaba, botando sapos pola boca... non estaba disposta a consentir que se luxase o nome dunha Pereira así daquela maneira.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-mama-carme-f7k2dQYFH5zPEkXNWFnfCL.webp" },
  { n: "05", sub: "Barcelona, anos 1960–70", title: "As Fotos Corsarias",
    text: "En Barcelona, Concha coñece a Andreu Picart e descobre que a cámara é poder. Convértese nunha das paparazzi máis temidas: retrata a políticos, banqueiros e membros da alta sociedade en situacións comprometidas, cobrando fortunas polas súas 'fotos corsarias'. Monta un pequeno emporio baixo as iniciais F.B. —Faneca Brava— como franquía de tendas de material fotográfico.",
    cita: "Non é fácil imaxinar a de cartos que amasou por aquel entón. Tanto diñeiro como riscos seguía correndo cando saía para facer as súas fotos corsarias.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-barcelona-escape-LUvRJ4CSgpchvTjESJRApB.webp" },
  { n: "06", sub: "O desenlace", title: "A Memoria que Non Arde",
    text: "Fernando, extenuado física e mentalmente, monta o puzzle emocional a través das cartas da tía Lela e do relato de Andreu Picart. Descobre que Concha non foi unha marxinal derrotada, senón unha supervivente feroz que transformou o seu trauma en poder. A investigación devolve a dignidade a Concha e libera a Fernando da culpa que o tiña encadeado.",
    cita: "A memoria nunca arde completamente.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-camera-archive-nL293BkWpqtR2ugZhHoA9a.webp" },
];

const G = { background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)', backdropFilter: 'blur(48px)', border: '1px solid rgba(255,255,255,0.12)', borderTop: '1px solid rgba(255,255,255,0.24)', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' };

const colors = ["#6B8CAE", "#8B9A86", "#A37081", "#D4924A", "#8E7E9E", "#C8A96E"];

export default function HistoriaSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(26,39,68,0.2) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }} animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9 }} style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }} style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>A Historia</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Seis capítulos<br /><span style={{ color: '#C8A96E' }}>dunha ferida</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '560px', marginTop: '1.5rem' }}>
            A novela desvélase en dúas liñas temporais que converxen cara á verdade. Construída con texto real da novela de Manuel Portas.
          </p>
        </motion.div>

        {/* Capítulos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {caps.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={v ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined, gridTemplateColumns: m ? '1fr' : (i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr'), gap: m ? '1.5rem' : '4rem', alignItems: 'center' }}
            >
              {/* Imaxe */}
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: i % 2 === 0 ? 2 : -2 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    border: `2px solid ${colors[i % colors.length]}`
                  }}
                >
                  <img src={cap.img} alt={cap.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', filter: 'brightness(0.72) saturate(0.8)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,8,13,0.3) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', fontWeight: 300, color: `${colors[i % colors.length]}2d`, lineHeight: 1 }}>{cap.n}</span>
                  </div>
                </motion.div>
              </div>

              {/* Texto */}
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: colors[i % colors.length] }}>{cap.n}</span>
                  <div style={{ width: '24px', height: '1px', backgroundColor: `${colors[i % colors.length]}66` }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B9BB4' }}>{cap.sub}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#EAE2D2', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '1.5rem' }}>{cap.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.82)', marginBottom: '1.5rem' }}>{cap.text}</p>
                <div style={{ paddingLeft: '20px', borderLeft: `2px solid ${colors[i % colors.length]}` }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1rem', color: colors[i % colors.length], lineHeight: 1.7 }}>"{cap.cita}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
