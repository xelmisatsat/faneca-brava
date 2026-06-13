import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const temas = [
  { id: "familia", num: "01", title: "A Familia Tóxica",
    content: "A novela denuncia que o clan dos Pereira é unha estrutura tóxica e enferma. Mamá Carme prefire ocultar monstros reais — como o tío Daniel, un alcohólico, ou o cura abusador — e castigar á vítima (Concha) só para manter a imaxe de familia respectable e católica. A familia non é un refuxio: é a primeira prisión.",
    quote: "Todas as familias agochan cadáveres na memoria." },
  { id: "camara", num: "02", title: "A Cámara como Arma",
    content: "Concha non é unha fotógrafa artista que busca a beleza; é unha xusticeira social. Ao facerse paparazzi, usa os obxectivos das cámaras para destapar a realidade oculta das clases altas. É a súa forma de dicir: a min botástesme por mala, pero os que mandan son moito peores e eu teño as probas.",
    quote: "Eu teño as probas. E elas valen máis ca calquera apelido." },
  { id: "culpa", num: "03", title: "A Culpa Somatizada",
    content: "Fernando é o espello do lector. O seu insomnio e esgotamento representan a culpa das xeracións actuais por permitir ou ignorar os abusos do pasado. Non pode descansar ata que non desenterra a verdade de Concha e lle devolve a súa dignidade. O corpo non mente cando a mente cala.",
    quote: "Os ollos de Concha perséguenme cando pecho os meus." },
  { id: "franquismo", num: "04", title: "O Franquismo Doméstico",
    content: "A novela retrata o franquismo non como algo político e distante, senón como unha forza que se infiltra nos fogares, nas escolas, nas igrexas. A represión non vén só do Estado: vén da veciña, da mestra, do cura, da avoa. O réxime vivía nos corpos e nas conciencias das persoas.",
    quote: "O silencio foi a arma máis eficaz do réxime." },
  { id: "memoria", num: "05", title: "Memoria e Identidade",
    content: "A reconstrución do pasado a través de fragmentos: cartas, fotografías, conversas. Fernando monta un puzzle emocional para entender quen foi Concha e, ao facelo, descobre quen é el mesmo e que herdou da súa familia. A identidade non é o que somos: é o que lembramos e o que decidimos non esquecer.",
    quote: "A memoria nunca arde completamente." },
];

const cardStyle = {
  background: '#152232',
  border: '1.5px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  boxShadow: '0 16px 45px rgba(0,0,0,0.4)',
};

export default function ArquivoSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  const [active, setActive] = useState("familia");
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);
  const cur = temas.find(t => t.id === active)!;

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden', backgroundColor: '#202D3C' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(200,169,110,0.06) 0%, transparent 60%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }} animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9 }} style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }} style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>Análise</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            O arquivo <span style={{ color: '#C8A96E' }}>emocional</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.2rem', lineHeight: 1.8, color: '#CBD5E1', maxWidth: '620px', marginTop: '1.5rem' }}>
            Os cinco eixes que vertebran a novela. Cada tema é unha capa de significado que Manuel Portas tece con precisión literaria.
          </p>
        </motion.div>

        <div style={{ display: m ? 'flex' : 'grid', flexDirection: m ? 'column' : undefined, gridTemplateColumns: m ? '1fr' : '1fr 2fr', gap: m ? '1.5rem' : '3rem' }}>

          {/* Selector */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {temas.map((t, i) => (
                <motion.button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px', borderRadius: '14px', textAlign: 'left',
                    background: active === t.id ? '#C8A96E' : '#142232',
                    border: active === t.id ? '1px solid #C8A96E' : '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer', transition: 'all 0.25s',
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, color: active === t.id ? '#142232' : 'rgba(200,169,110,0.4)', minWidth: '2.5rem' }}>{t.num}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 500, color: active === t.id ? '#142232' : '#EAE2D2' }}>{t.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contido */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={v ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.3 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.4 }}
                style={{ ...cardStyle, padding: '3rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', fontWeight: 300, lineHeight: 1, color: 'rgba(200,169,110,0.18)' }}>{cur.num}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '2.4rem', color: '#FFFFFF', lineHeight: 1.1, paddingTop: '0.5rem' }}>{cur.title}</h3>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.1rem', lineHeight: 1.9, color: '#F8FAFC', marginBottom: '2rem' }}>{cur.content}</p>
                <div style={{ padding: '20px 24px', borderRadius: '14px', backgroundColor: '#0E1622', borderLeft: '3px solid #C8A96E' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#C8A96E', lineHeight: 1.7 }}>"{cur.quote}"</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Lugares */}
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginTop: '2rem' }}>
              {[
                { 
                  title: "Vila de Foz", 
                  desc: "A vila mariñeira onde crece Concha.", 
                  img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-village-night-JkiwiqgEL6ZDLZTtniYVuQ.webp",
                  bg: "#283B4F",
                  border: "1px solid #3E5266"
                },
                { 
                  title: "Santiago", 
                  desc: "Onde Fernando vive o presente.", 
                  img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-fernando-portrait-EQpQqF6VEH5zWNhiMpjMkL.webp",
                  bg: "#364638",
                  border: "1px solid #4C594A"
                },
                { 
                  title: "Barcelona", 
                  desc: "A cidade da liberdade e o desquite.", 
                  img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-barcelona-escape-LUvRJ4CSgpchvTjESJRApB.webp",
                  bg: "#4A353C",
                  border: "1px solid #5F4A51"
                },
              ].map((l, i) => (
                <motion.div 
                  key={i} 
                  initial="initial"
                  whileHover="hover"
                  variants={{
                    initial: { y: 0 },
                    hover: { y: -6 }
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    overflow: 'hidden', 
                    borderRadius: '16px', 
                    backgroundColor: l.bg,
                    border: l.border,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                    <motion.img 
                      variants={{
                        hover: { scale: 1.06 }
                      }}
                      transition={{ duration: 0.3 }}
                      src={l.img} 
                      alt={l.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)', display: 'block' }} 
                    />
                  </div>
                  <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontWeight: 600, color: '#FFFFFF' }}>{l.title}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12.5px', color: '#E2E8F0', marginTop: '6px', lineHeight: 1.45, fontWeight: 300 }}>{l.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
