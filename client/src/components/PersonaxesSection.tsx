import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chars = [
  { id: "concha", name: "Concha Pereira", alias: "A Faneca Brava", role: "Protagonista",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-concha-portrait-ZyBRp5FRRbMYRNpmNDvaVU.webp",
    color: "#C8A96E",
    desc: "Orfa de nai, co pai emigrado, Concha crece baixo a tutela opresiva de Mamá Carme. Sofre o maltrato físico da mestra Dona Remedios —que lle fai sangrar as mans a golpes— e o acoso do cura Don Anselmo. Acusada falsamente do incendio da escola, é expulsada da familia. Foxe a Barcelona onde se converte en paparazzi de éxito, usando a cámara como arma de vinganza contra os poderosos.",
    traits: ["Feroz", "Silenciosa", "Rebelde", "Libre", "Xusticeira"],
    quote: "Cando miro pola lente, deixo de ser a nena que collían. Por fin, son eu a que observa.",
    arc: "Da infancia oprimida á vinganza silenciosa" },
  { id: "fernando", name: "Fernando Pereira", alias: "O Médico Atormentado", role: "Narrador",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-fernando-portrait-EQpQqF6VEH5zWNhiMpjMkL.webp",
    color: "#6B8CAE",
    desc: "Médico de Santiago de Compostela que sofre de insomnio severo. As olleiras fórmanlle un medio arco azul escuro. Os seus síntomas son a somatización dunha profunda culpa herdada. Obsesionado con descubrir a verdade sobre a súa curmá Concha, investiga a través de conversas coa tía Lela e con Andreu Picart no Hostal dos Reis Católicos.",
    traits: ["Atormentado", "Obsesivo", "Culpable", "Determinado"],
    quote: "Non podo durmir porque os ollos de Concha perséguenme cando pecho os meus.",
    arc: "Da culpa herdada á redención a través da verdade" },
  { id: "mama", name: "Mamá Carme", alias: "A Matriarca", role: "Antagonista",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-mama-carme-f7k2dQYFH5zPEkXNWFnfCL.webp",
    color: "#9A8A7A",
    desc: "Matriarca do clan Pereira. Impón unha disciplina despótica e prioriza as aparencias sociais por riba do amor. Berraba botando sapos pola boca e batendo coas palmas das mans nas coxas. Prefire ocultar monstros reais e castigar á vítima (Concha) para manter a imaxe de familia respectable e católica.",
    traits: ["Despótica", "Hipócrita", "Fría", "Autoritaria"],
    quote: "O apelido é o que nos sustenta. Un nome limpo vale máis ca todo o ouro.",
    arc: "A autoridade moral que encobre a inxustiza" },
  { id: "andreu", name: "Andreu Picart", alias: "O Fotógrafo Catalán", role: "Confidente",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-andreu-VAxSfuAXwczWNcuCm2shyJ.webp",
    color: "#8B7355",
    desc: "Fotógrafo catalán veterano que coñeceu a Concha cando chegou a Barcelona. Viches como se converteu nunha das mellores paparazzi da cidade. Dicíalle que estaba xogando con lume. É a ponte entre o pasado de Concha e o presente de Fernando.",
    traits: ["Observador", "Sabio", "Melancólico", "Leal"],
    quote: "Concha non fotografaba para vivir. Fotografaba para vingarse.",
    arc: "O testemuño que conecta pasado e presente" },
];

const G = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
  backdropFilter: 'blur(48px)', border: '1px solid rgba(255,255,255,0.12)',
  borderTop: '1px solid rgba(255,255,255,0.24)', borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
};

export default function PersonaxesSection() {
  const [v, setV] = useState(false);
  const [sel, setSel] = useState<string|null>(null);
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);
  const selChar = chars.find(c => c.id === sel);

  return (
    <section style={{ position: 'relative', padding: '8rem 0 6rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 30%, rgba(26,39,68,0.2) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }} animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }} style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }} style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>O Elenco</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Os <span style={{ color: '#C8A96E' }}>Personaxes</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '600px', marginTop: '1.5rem' }}>
            Cada un carga co peso dunha verdade que a familia Pereira quixo enterrar para sempre. Preme para descubrir a súa historia completa.
          </p>
        </motion.div>

        {/* Grid 4 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {chars.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              animate={v ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.16,1,0.3,1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSel(c.id)}
              style={{ ...G, overflow: 'hidden', cursor: 'none', position: 'relative' }}
            >
              {/* Imaxe */}
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <motion.img src={c.img} alt={c.name}
                  whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.72) saturate(0.85)', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(8,8,13,0.96) 0%, rgba(8,8,13,0.1) 50%, transparent 100%)` }} />

                {/* Badge rol */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '9999px', padding: '4px 12px' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.1em', color: c.color }}>{c.role}</span>
                </div>

                {/* Info inferior */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 300, color: '#EAE2D2' }}>{c.name}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.85rem', color: c.color, marginTop: '3px' }}>{c.alias}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(139,155,180,0.75)', marginTop: '8px', lineHeight: 1.5 }}>{c.arc}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {c.traits.slice(0,3).map((t,j) => (
                      <span key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.06)', color: '#8B9BB4', border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {sel && selChar && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(8,8,13,0.92)', backdropFilter: 'blur(24px)' }} />
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '900px', width: '100%', background: 'linear-gradient(135deg, rgba(12,18,32,0.92) 0%, rgba(8,8,13,0.85) 100%)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.2)', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr' }}>
                <div style={{ position: 'relative', minHeight: '500px' }}>
                  <img src={selChar.img} alt={selChar.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)', display: 'block', minHeight: '500px' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(8,8,13,0.95) 100%)' }} />
                </div>
                <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <button onClick={() => setSel(null)} style={{ position: 'absolute', top: '20px', right: '20px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#8B9BB4', cursor: 'none', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: selChar.color, marginBottom: '8px' }}>{selChar.role}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '2.5rem', color: '#EAE2D2', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '6px' }}>{selChar.name}</h3>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.1rem', color: selChar.color, marginBottom: '1.5rem' }}>{selChar.alias}</p>
                  <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)', margin: '0 0 1.5rem' }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.85)', marginBottom: '1.5rem' }}>{selChar.desc}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4', letterSpacing: '0.08em', marginBottom: '1rem' }}>{selChar.arc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                    {selChar.traits.map((t,j) => (
                      <span key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', padding: '5px 12px', borderRadius: '9999px', backgroundColor: `${selChar.color}15`, color: selChar.color, border: `1px solid ${selChar.color}30` }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ padding: '16px 20px', borderRadius: '14px', backgroundColor: 'rgba(200,169,110,0.06)', borderLeft: '2px solid rgba(200,169,110,0.4)' }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1rem', color: '#EAE2D2', lineHeight: 1.7 }}>"{selChar.quote}"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
