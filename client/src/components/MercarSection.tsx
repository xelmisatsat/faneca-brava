import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Logos SVG inline das plataformas
const LogoGalaxia = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="rgba(200,169,110,0.15)" />
    <text x="16" y="21" textAnchor="middle" fill="#C8A96E" fontSize="13" fontFamily="Georgia, serif" fontWeight="bold">G</text>
  </svg>
);

const LogoAmazon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="rgba(255,153,0,0.15)" />
    <text x="16" y="21" textAnchor="middle" fill="#FF9900" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold">amzn</text>
  </svg>
);

const LogoFnac = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="rgba(226,0,26,0.15)" />
    <text x="16" y="21" textAnchor="middle" fill="#E2001A" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold">fnac</text>
  </svg>
);

const LogoCasaLibro = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="rgba(0,102,204,0.15)" />
    <text x="16" y="15" textAnchor="middle" fill="#0066CC" fontSize="7" fontFamily="Arial, sans-serif" fontWeight="bold">CASA</text>
    <text x="16" y="24" textAnchor="middle" fill="#0066CC" fontSize="7" fontFamily="Arial, sans-serif" fontWeight="bold">LIBRO</text>
  </svg>
);

const LogoLorca = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="rgba(74,124,89,0.15)" />
    <text x="16" y="21" textAnchor="middle" fill="#4A7C59" fontSize="9" fontFamily="Georgia, serif" fontWeight="bold">Lorca</text>
  </svg>
);

const LogoClarion = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="rgba(107,140,174,0.15)" />
    <text x="16" y="21" textAnchor="middle" fill="#6B8CAE" fontSize="8" fontFamily="Georgia, serif" fontWeight="bold">Clarión</text>
  </svg>
);

const tiendas = [
  {
    name: "Editorial Galaxia",
    desc: "Editora orixinal — directamente do editor",
    price: "22,10 €",
    badge: "Orixinal",
    badgeColor: "#C8A96E",
    url: "https://editorialgalaxia.gal/produto/faneca-brava/",
    Logo: LogoGalaxia,
    highlight: true,
  },
  {
    name: "Amazon España",
    desc: "Envío rápido, Prime dispoñible",
    price: "21,00 €",
    badge: "Prime",
    badgeColor: "#FF9900",
    url: "https://www.amazon.es/Faneca-brava-Literaria-Manuel-Portas/dp/8411763331",
    Logo: LogoAmazon,
    highlight: false,
  },
  {
    name: "Fnac",
    desc: "5% de desconto en libros",
    price: "20,99 €",
    badge: "−5%",
    badgeColor: "#E2001A",
    url: "https://www.fnac.es/a11349070/Manuel-Portas-Faneca-brava",
    Logo: LogoFnac,
    highlight: false,
  },
  {
    name: "Casa del Libro",
    desc: "Envío gratis desde 19 €",
    price: "22,10 €",
    badge: "Envío gratis",
    badgeColor: "#0066CC",
    url: "https://www.casadellibro.com/libro-faneca-brava/9788411763332/16423955",
    Logo: LogoCasaLibro,
    highlight: false,
  },
  {
    name: "Librería Lorca",
    desc: "Librería especializada en galego",
    price: "22,00 €",
    badge: "Galego",
    badgeColor: "#4A7C59",
    url: "https://www.librerialorca.com/es/libro/faneca-brava_D730780545",
    Logo: LogoLorca,
    highlight: false,
  },
  {
    name: "Clarión Libraría",
    desc: "Libraría galega de referencia",
    price: "22,10 €",
    badge: "Galicia",
    badgeColor: "#6B8CAE",
    url: "https://www.clarionlibraria.gal/es/libro/faneca-brava_D730780545",
    Logo: LogoClarion,
    highlight: false,
  },
];

export default function MercarSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  const G = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
    backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderTop: '1px solid rgba(255,255,255,0.20)',
    borderRadius: '18px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
  };

  return (
    <section style={{ position: 'relative', padding: m ? '4rem 0 3rem' : '7rem 0 5rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(13,27,42,0.3) 0%, transparent 55%)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 4rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}>
            <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8A96E)' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>Onde mercar</span>
            <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)' }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.9, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Mercar <span style={{ color: '#C8A96E' }}>Faneca Brava</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#8B9BB4', maxWidth: '520px', margin: '1.5rem auto 0' }}>
            Dispoñible en todas as plataformas. Prezos actualizados. Apoia as librerías galegas.
          </p>
        </motion.div>

        {/* Info do libro */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }}
          style={{ ...G, padding: m ? '1.5rem' : '2.5rem 3rem', marginBottom: '3rem', display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? '1.5rem' : '3rem', alignItems: m ? 'flex-start' : 'center' }}>
          <div style={{ display: 'flex', gap: m ? '1rem' : '3rem', alignItems: 'center', width: m ? '100%' : undefined }}>
            <motion.img
              src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
              alt="Faneca Brava"
              whileHover={{ scale: 1.04, rotateY: 3 }}
              transition={{ duration: 0.4 }}
              style={{ width: m ? '80px' : '100px', aspectRatio: '2/3', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', flexShrink: 0, transformStyle: 'preserve-3d', perspective: '800px' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: m ? '1.3rem' : '1.6rem', fontWeight: 300, color: '#EAE2D2', marginBottom: '4px' }}>Faneca Brava</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#C8A96E', marginBottom: m ? '8px' : '14px' }}>Manuel Portas · Editorial Galaxia</div>
              {m && (
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#C8A96E', lineHeight: 1 }}>
                  22,10 €
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#8B9BB4', marginLeft: '8px' }}>PVP recomendado</span>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: m ? '10px' : '24px', width: m ? '100%' : undefined }}>
            {[
              { l: 'ISBN', v: '978-84-11763-33-2' },
              { l: 'Páxinas', v: '244' },
              { l: 'Lingua', v: 'Galego' },
              { l: 'Formato', v: 'Tapa branda' },
            ].map((d, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B9BB4', marginBottom: '2px' }}>{d.l}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#EAE2D2' }}>{d.v}</div>
              </div>
            ))}
          </div>
          {!m && (
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B9BB4', marginBottom: '4px' }}>PVP recomendado</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', fontWeight: 300, color: '#C8A96E', lineHeight: 1 }}>22,10 €</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4', marginTop: '4px' }}>IVE incluído</div>
            </div>
          )}
        </motion.div>

        {/* Grid de tendas */}
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
          {tiendas.map((t, i) => (
            <motion.a
              key={i}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={v ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{
                ...G,
                padding: '22px 24px',
                textDecoration: 'none',
                display: 'block',
                cursor: 'none',
                position: 'relative',
                overflow: 'hidden',
                ...(t.highlight ? {
                  background: 'linear-gradient(135deg, rgba(200,169,110,0.14) 0%, rgba(200,169,110,0.05) 100%)',
                  border: '1px solid rgba(200,169,110,0.28)',
                  borderTop: '1px solid rgba(200,169,110,0.45)',
                } : {}),
              }}
            >
              {t.highlight && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.6), transparent)' }} />
              )}

              {/* Header: logo + nome + badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <t.Logo />
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#EAE2D2', letterSpacing: '-0.01em' }}>{t.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4', marginTop: '2px' }}>{t.desc}</div>
                  </div>
                </div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px', padding: '3px 9px', borderRadius: '9999px',
                  backgroundColor: `${t.badgeColor}20`, color: t.badgeColor, border: `1px solid ${t.badgeColor}35`,
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {t.badge}
                </span>
              </div>

              {/* Prezo + botón */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: t.highlight ? '#C8A96E' : '#EAE2D2' }}>
                  {t.price}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px', padding: '7px 16px', borderRadius: '9999px',
                  background: t.highlight ? 'rgba(200,169,110,0.18)' : 'rgba(255,255,255,0.07)',
                  border: t.highlight ? '1px solid rgba(200,169,110,0.4)' : '1px solid rgba(255,255,255,0.12)',
                  color: t.highlight ? '#C8A96E' : '#EAE2D2',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  Mercar →
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Nota */}
        <motion.p initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ delay: 1 }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(139,155,180,0.4)', textAlign: 'center', marginTop: '2rem' }}>
          Os prezos son orientativos e poden variar. Apoia as librerías galegas sempre que poidas.
        </motion.p>
      </div>
    </section>
  );
}
