import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Logos SVG refinados con monograma e identidade visual
const StoreIcon = ({ letter, color = "#C8A96E", bg = "rgba(200,169,110,0.12)" }: { letter: string; color?: string; bg?: string }) => (
  <div style={{
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: bg,
    border: `1px solid ${color}33`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: `0 4px 12px ${color}15`,
  }}>
    <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color }}>{letter}</span>
  </div>
);

interface Tienda {
  name: string;
  desc: string;
  location: string;
  price: string;
  badge: string;
  badgeColor: string;
  category: "galaxia" | "santiago" | "madrid" | "independente";
  url: string;
  letter: string;
  letterColor: string;
  letterBg: string;
  highlight?: boolean;
}

const TIENDAS: Tienda[] = [
  {
    name: "Editorial Galaxia",
    desc: "Editora orixinal — compra directa sen intermediarios",
    location: "Vigo / Distribución oficial",
    price: "22,10 €",
    badge: "Editorial Oficial",
    badgeColor: "#C8A96E",
    category: "galaxia",
    url: "https://editorialgalaxia.gal/produto/faneca-brava/",
    letter: "G",
    letterColor: "#C8A96E",
    letterBg: "rgba(200,169,110,0.18)",
    highlight: true,
  },
  {
    name: "Libraría Couceiro",
    desc: "Libraría galega histórica de referencia",
    location: "Santiago de Compostela",
    price: "22,10 €",
    badge: "Santiago",
    badgeColor: "#8BA7C9",
    category: "santiago",
    url: "https://www.librariacouceiro.com/",
    letter: "C",
    letterColor: "#8BA7C9",
    letterBg: "rgba(139,167,201,0.15)",
  },
  {
    name: "Clarión libraría",
    desc: "Libraría especializada en literatura e cultura galega",
    location: "Galicia / Envíos online",
    price: "22,10 €",
    badge: "Especializada",
    badgeColor: "#7CC6C6",
    category: "independente",
    url: "https://www.clarionlibraria.com/",
    letter: "C",
    letterColor: "#7CC6C6",
    letterBg: "rgba(124,198,198,0.15)",
  },
  {
    name: "Libraría Pedreira",
    desc: "Amplo fondo galego no corazón histórico de Compostela",
    location: "Santiago de Compostela",
    price: "22,10 €",
    badge: "Santiago",
    badgeColor: "#8BA7C9",
    category: "santiago",
    url: "https://www.librariapedreira.com/",
    letter: "P",
    letterColor: "#A692C4",
    letterBg: "rgba(166,146,196,0.15)",
  },
  {
    name: "Follas Novas",
    desc: "O punto de encontro da literatura galega en Madrid",
    location: "Madrid",
    price: "22,10 €",
    badge: "Madrid",
    badgeColor: "#78B48D",
    category: "madrid",
    url: "https://www.follasnovas.com/",
    letter: "F",
    letterColor: "#78B48D",
    letterBg: "rgba(120,180,141,0.15)",
  },
  {
    name: "Librería Lila de Lilith",
    desc: "Libraría feminista, social e de pensamento crítico",
    location: "Santiago de Compostela",
    price: "22,10 €",
    badge: "Feminista",
    badgeColor: "#DE96A5",
    category: "independente",
    url: "https://www.liladelilith.com/",
    letter: "L",
    letterColor: "#DE96A5",
    letterBg: "rgba(222,150,165,0.15)",
  },
  {
    name: "Cronopios Libros",
    desc: "Libraría independente con servizo coidado e próximo",
    location: "Pontevedra / Santiago",
    price: "22,10 €",
    badge: "Independente",
    badgeColor: "#D4924A",
    category: "independente",
    url: "https://www.cronopios.es/",
    letter: "C",
    letterColor: "#D4924A",
    letterBg: "rgba(212,146,74,0.15)",
  },
  {
    name: "Númax",
    desc: "Proxecto cooperativo, centro cultural e libraría alternativa",
    location: "Santiago de Compostela",
    price: "22,10 €",
    badge: "Cultural",
    badgeColor: "#C8A96E",
    category: "santiago",
    url: "https://numax.org/",
    letter: "N",
    letterColor: "#C8A96E",
    letterBg: "rgba(200,169,110,0.15)",
  },
];

const CATEGORIES = [
  { id: "todas", label: "Todas as librarías (8)" },
  { id: "galaxia", label: "Editorial Oficial" },
  { id: "santiago", label: "Santiago de Compostela" },
  { id: "madrid", label: "Madrid" },
  { id: "independente", label: "Independentes e Culturais" },
];

export default function MercarSection() {
  const [v, setV] = useState(false);
  const [filter, setFilter] = useState("todas");
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  const filteredTiendas = filter === "todas" 
    ? TIENDAS 
    : TIENDAS.filter(t => t.category === filter || (filter === "santiago" && t.name === "Editorial Galaxia"));

  return (
    <section style={{ 
      position: 'relative', 
      padding: m ? '3.5rem 0 3rem' : '7rem 0 5rem', 
      backgroundColor: '#090E15',
      color: '#F1EBDD',
      overflow: 'hidden' 
    }}>
      {/* Luz ambiental de fondo */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '1400px', height: '400px', background: 'radial-gradient(ellipse at 50% 10%, rgba(200,169,110,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: m ? '0 1rem' : '0 3.5rem', position: 'relative', zIndex: 10 }}>

        {/* ── CABECEIRA PROFESIONAL ─────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={v ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.8 }} 
          style={{ marginBottom: m ? '2.5rem' : '3.5rem', textAlign: 'center' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.25)', marginBottom: '1.25rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8A96E', fontWeight: 600 }}>
              Edición Oficial Dispoñible
            </span>
          </div>

          <h2 style={{ 
            fontFamily: "'Cormorant Garamond', Georgia, serif", 
            fontWeight: 300, 
            fontSize: m ? 'clamp(2.5rem, 8vw, 3.2rem)' : 'clamp(3.2rem, 5.5vw, 4.8rem)', 
            lineHeight: 1, 
            letterSpacing: '-0.02em', 
            color: '#FFFFFF',
            margin: 0
          }}>
            Onde mercar <span style={{ color: '#C8A96E', fontStyle: 'italic', fontWeight: 400 }}>Faneca Brava</span>
          </h2>

          <p style={{ 
            fontFamily: "'DM Sans', sans-serif", 
            fontWeight: 300, 
            fontSize: m ? '0.98rem' : '1.15rem', 
            lineHeight: 1.7, 
            color: '#A9B4AE', 
            maxWidth: '640px', 
            margin: '1rem auto 0' 
          }}>
            Podes adquirir a túa copia na editorial oficial ou en librarías independentes de confianza. Prezo oficial fixo protexido por lei.
          </p>
        </motion.div>

        {/* ── HERO FEATURE CARD (O EXEMPLAR OFICIAL) ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            backgroundColor: '#111A24',
            border: '1.5px solid rgba(200,169,110,0.3)',
            borderRadius: '20px',
            padding: m ? '1.5rem 1.25rem' : '2.5rem 3rem',
            marginBottom: '3rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: m ? 'column' : 'row',
            alignItems: 'center',
            gap: m ? '1.5rem' : '3.5rem',
          }}
        >
          {/* Portada do libro */}
          <div style={{ flexShrink: 0, position: 'relative' }}>
            <motion.img
              src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
              alt="Faneca Brava portada"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              style={{
                width: m ? '110px' : '140px',
                aspectRatio: '2/3',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.65), 0 0 25px rgba(200,169,110,0.15)',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'block',
              }}
            />
          </div>

          {/* Datos do libro */}
          <div style={{ flex: 1, width: m ? '100%' : 'auto', textAlign: m ? 'center' : 'left' }}>
            <div style={{ display: 'inline-block', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#C8A96E', fontWeight: 600, marginBottom: '6px' }}>
              Edición Recomendada · Editorial Galaxia
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: m ? '2rem' : '2.6rem', fontWeight: 400, color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>
              Faneca Brava
            </h3>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#CBD5E1', marginTop: '6px', fontWeight: 300 }}>
              Novela de <strong style={{ color: '#FFFFFF', fontWeight: 500 }}>Manuel Portas</strong> · Galardón e Memoria
            </div>

            {/* Tags de especificacións */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: m ? 'center' : 'flex-start', marginTop: '1.25rem' }}>
              {[
                "244 Páxinas",
                "Lingua Galega",
                "Tapa branda con lapelas",
                "ISBN: 978-84-11763-33-2"
              ].map((tag, i) => (
                <span key={i} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  backgroundColor: '#162332',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#CBD5E1',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Prezo e CTA Principal */}
          <div style={{ 
            flexShrink: 0, 
            width: m ? '100%' : 'auto', 
            textAlign: m ? 'center' : 'right',
            borderTop: m ? '1px solid rgba(255,255,255,0.08)' : 'none',
            paddingTop: m ? '1.25rem' : 0,
          }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8BA7C9', marginBottom: '2px', fontWeight: 500 }}>
              PVP Recomendado
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: m ? '2.8rem' : '3.4rem', fontWeight: 300, color: '#C8A96E', lineHeight: 1 }}>
              22,10 €
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#10B981', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: m ? 'center' : 'flex-end', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              En stock · Envío rápido
            </div>

            <motion.a
              href="https://editorialgalaxia.gal/produto/faneca-brava/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '1rem',
                padding: '12px 26px',
                backgroundColor: '#C8A96E',
                color: '#0E1722',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '9999px',
                boxShadow: '0 8px 24px rgba(200,169,110,0.3)',
                width: m ? '100%' : 'auto',
              }}
            >
              Comprar na Editora Galaxia ↗
            </motion.a>
          </div>
        </motion.div>

        {/* ── SELECTOR DE FILTROS ───────────────────────────────────── */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '6px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}>
            {CATEGORIES.map(cat => {
              const active = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  style={{
                    padding: m ? '9px 16px' : '10px 20px',
                    borderRadius: '9999px',
                    backgroundColor: active ? '#C8A96E' : '#121D28',
                    color: active ? '#0E1722' : '#CBD5E1',
                    border: active ? '1px solid #C8A96E' : '1px solid rgba(255,255,255,0.08)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: active ? 600 : 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── GRID DE LIBRARÍAS DIRECTAS ────────────────────────────── */}
        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '16px',
            marginBottom: '3rem'
          }}
        >
          <AnimatePresence>
            {filteredTiendas.map((t, i) => (
              <motion.a
                key={t.name}
                layout
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ y: -5 }}
                style={{
                  backgroundColor: '#121B26',
                  border: t.highlight ? '1.5px solid rgba(200,169,110,0.45)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: m ? '18px 16px' : '22px 24px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {t.highlight && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #C8A96E, #E5C583, #C8A96E)' }} />
                )}

                {/* Parte superior: Icono + Nome + Badge */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <StoreIcon letter={t.letter} color={t.letterColor} bg={t.letterBg} />
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15.5px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>
                          {t.name}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8BA7C9', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>📍</span> {t.location}
                        </div>
                      </div>
                    </div>

                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '10px',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: `${t.badgeColor}18`,
                      color: t.badgeColor,
                      border: `1px solid ${t.badgeColor}33`,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      {t.badge}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12.5px',
                    fontWeight: 300,
                    lineHeight: 1.5,
                    color: '#A9B4AE',
                    margin: '0 0 16px 0',
                  }}>
                    {t.desc}
                  </p>
                </div>

                {/* Parte inferior: Prezo + Botón Mercar */}
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8BA7C9', fontWeight: 500 }}>
                      Prezo libro
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.9rem', fontWeight: 400, color: '#C8A96E', lineHeight: 1.1 }}>
                      {t.price}
                    </div>
                  </div>

                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    backgroundColor: t.highlight ? '#C8A96E' : '#1A2736',
                    color: t.highlight ? '#0E1722' : '#FFFFFF',
                    border: t.highlight ? '1px solid #C8A96E' : '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: t.highlight ? '0 4px 12px rgba(200,169,110,0.25)' : 'none',
                    transition: 'all 0.2s ease',
                  }}>
                    Mercar ↗
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── BANNER DE CONFIANZA / APOIO ÁS LIBRARÍAS ─────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={v ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            backgroundColor: '#0E1621',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: m ? '1.25rem' : '1.5rem 2.5rem',
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
            gap: m ? '14px' : '24px',
            textAlign: m ? 'left' : 'center',
          }}
        >
          {[
            { title: "Prezo Fixo Oficial", desc: "22,10 € garantido en todas as plataformas conforme á Lei do Libro." },
            { title: "Apoio ao Comercio Galego", desc: "Comprar nas librarías de proximidade fortalece a nosa cultura e lingua." },
            { title: "Envíos a Domicilio", desc: "Todas as tendas ofrecen envío postal certificado ou recollida en tenda." },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                ✓ {item.title}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11.5px', color: '#8BA7C9', fontWeight: 300, lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
