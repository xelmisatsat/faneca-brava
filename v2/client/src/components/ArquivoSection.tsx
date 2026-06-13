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

const G = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
  backdropFilter: 'blur(48px)', border: '1px solid rgba(255,255,255,0.12)',
  borderTop: '1px solid rgba(255,255,255,0.24)', borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
};

export default function ArquivoSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  const [active, setActive] = useState("familia");
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);
  const cur = temas.find(t => t.id === active)!;

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(13,27,42,0.3) 0%, transparent 55%)' }} />

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
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '560px', marginTop: '1.5rem' }}>
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
                    background: active === t.id ? 'rgba(200,169,110,0.10)' : 'transparent',
                    border: active === t.id ? '1px solid rgba(200,169,110,0.22)' : '1px solid transparent',
                    cursor: 'none', transition: 'all 0.25s',
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 300, color: active === t.id ? '#C8A96E' : 'rgba(200,169,110,0.25)', minWidth: '2.5rem' }}>{t.num}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 300, color: active === t.id ? '#EAE2D2' : '#8B9BB4' }}>{t.title}</span>
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
                style={{ ...G, padding: '3rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', fontWeight: 300, lineHeight: 1, color: 'rgba(200,169,110,0.18)' }}>{cur.num}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '2.2rem', color: '#EAE2D2', lineHeight: 1.1, paddingTop: '0.5rem' }}>{cur.title}</h3>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.85)', marginBottom: '2rem' }}>{cur.content}</p>
                <div style={{ padding: '20px 24px', borderRadius: '14px', backgroundColor: 'rgba(200,169,110,0.05)', borderLeft: '2px solid rgba(200,169,110,0.4)' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem', color: '#C8A96E', lineHeight: 1.7 }}>"{cur.quote}"</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Lugares */}
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginTop: '2rem' }}>
              {[
                { title: "Vila de Foz", desc: "A vila mariñeira onde crece Concha.", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-village-night-JkiwiqgEL6ZDLZTtniYVuQ.webp" },
                { title: "Santiago", desc: "Onde Fernando vive o presente.", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-fernando-portrait-EQpQqF6VEH5zWNhiMpjMkL.webp" },
                { title: "Barcelona", desc: "A cidade da liberdade e a vinganza.", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-barcelona-escape-LUvRJ4CSgpchvTjESJRApB.webp" },
              ].map((l, i) => (
                <motion.div key={i} whileHover={{ scale: 1.04, y: -4 }} style={{ ...G, overflow: 'hidden', borderRadius: '14px' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={l.img} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,13,0.9) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 300, color: '#EAE2D2' }}>{l.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4', marginTop: '2px' }}>{l.desc}</div>
                    </div>
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
