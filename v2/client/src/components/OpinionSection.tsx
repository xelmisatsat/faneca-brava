import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const opinions = [
  {
    name: "Jun Sieira Gerpe",
    role: "Dirección de Arte e Análise Literario",
    img: "/manus-storage/opinion-jun.jpg",
    color: "#C8A96E",
    quote: "Ler Faneca Brava foi descubrir que os monstros máis aterradores non están nos contos, senón no silencio e na hipocrisía das familias. A evolución de Concha fascíname: non é unha vítima perfecta, é unha supervivente indómita que usa a súa cámara como arma para desposuír de poder á mesma sociedade que a desterrou. A novela de Manuel Portas racha co mito da familia como refuxio seguro e fainos ver como a culpa herdada, somatizada no insomnio de Fernando, pode envelenar xeracións enteiras. O contraste coa súa irmá Encarna demostra, ademais, as distintas facianas da opresión feminina nunha ditadura. Unha autopsia familiar brillante e claustrofóbica.",
    rating: 5,
  },
  {
    name: "Álvaro Villar Gómez",
    role: "Desenvolvemento e Narrativa",
    img: "/manus-storage/opinion-alvaro.jpg",
    color: "#8B9BB4",
    quote: "O que máis me enganchou de Faneca Brava foi como o autor mestura a intriga coa historia do noso pasado. Ao principio parece a vida dun médico estresado, pero o crebacabezas da súa familia mantente en tensión todo o tempo. Impactoume ler a crueldade que se vivía nas escolas con figuras como Dona Remedios e a inxustiza da avoa Mamá Carme. O xiro final, descubrindo que a rapaza marxinada acabou sendo unha paparazzi de éxito que chantaxeaba aos ricos en Barcelona, é un final redondo que lle dá moito ritmo á novela. É un libro que se le rápido e que te fai pensar sobre o que agochan as aparencias.",
    rating: 5,
  },
];

const G = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(48px)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderTop: '1px solid rgba(255,255,255,0.22)',
  borderRadius: '24px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
};

export default function OpinionSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section id="opinion" style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '8rem 0 6rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 80%, rgba(26,39,68,0.2) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 5rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
          animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: m ? '2.5rem' : '5rem', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
              style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8A96E)', transformOrigin: 'right' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>Lecturas</span>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }}
              style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            O Noso <span style={{ color: '#C8A96E' }}>Veredicto</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.9rem' : '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '520px', margin: '1.5rem auto 0' }}>
            Dúas perspectivas, unha mesma certeza. A faneca brava deixa marca.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: m ? '2rem' : '3rem' }}>
          {opinions.map((op, i) => (
            <motion.div
              key={op.name}
              initial={{ opacity: 0, y: 60, filter: 'blur(4px)' }}
              animate={v ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...G,
                display: m ? 'flex' : 'grid',
                flexDirection: m ? 'column' : undefined,
                gridTemplateColumns: m ? '1fr' : (i % 2 === 0 ? '280px 1fr' : '1fr 280px'),
                overflow: 'hidden',
              }}
            >
              {/* Imaxe arriba en móbil, esquerda/dereita en desktop */}
              {(m || i % 2 === 0) && (
                <motion.div
                  whileHover={m ? {} : { scale: 1.04, filter: 'brightness(1.1)' }}
                  transition={{ duration: 0.5 }}
                  style={{
                    aspectRatio: m ? '16/9' : '2/3',
                    overflow: 'hidden',
                    borderRadius: m ? '20px 20px 0 0' : '20px 0 0 20px',
                    position: 'relative',
                    minHeight: m ? '200px' : '420px',
                  }}
                >
                  <img src={op.img} alt={op.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) saturate(0.75)', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: m ? 'linear-gradient(to bottom, transparent 50%, rgba(8,8,13,0.7) 100%)' : 'linear-gradient(to right, transparent 60%, rgba(8,8,13,0.6) 100%)' }} />
                </motion.div>
              )}

              {/* Texto */}
              <div style={{ padding: m ? '1.5rem' : '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: m ? '1rem' : '1.5rem' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: op.rating }).map((_, j) => (
                    <motion.span key={j} initial={{ opacity: 0, scale: 0 }} animate={v ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.2 + j * 0.07, type: 'spring', stiffness: 400 }}
                      style={{ color: op.color, fontSize: '1rem' }}>★</motion.span>
                  ))}
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '3rem' : '5rem', fontWeight: 300, color: `${op.color}20`, position: 'absolute', top: '-1rem', left: '-0.5rem', lineHeight: 1, userSelect: 'none' }}>"</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: m ? '0.88rem' : '0.97rem', lineHeight: 1.9, color: 'rgba(234,226,210,0.82)', position: 'relative', zIndex: 1, paddingLeft: '0.5rem' }}>
                    {op.quote}
                  </p>
                </div>
                <div style={{ height: '1px', background: `linear-gradient(90deg, ${op.color}40, transparent)` }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '1.2rem' : '1.4rem', fontWeight: 300, color: '#EAE2D2' }}>{op.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: op.color, marginTop: '4px' }}>{op.role}</div>
                </div>
              </div>

              {/* Imaxe dereita desktop só para i impar en modo desktop */}
              {!m && i % 2 !== 0 && (
                <motion.div
                  whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
                  transition={{ duration: 0.5 }}
                  style={{ aspectRatio: '2/3', overflow: 'hidden', borderRadius: '0 20px 20px 0', position: 'relative', minHeight: '420px' }}
                >
                  <img src={op.img} alt={op.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) saturate(0.75)', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 60%, rgba(8,8,13,0.6) 100%)' }} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
