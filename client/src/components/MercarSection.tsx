import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Libraria {
  name: string;
  desc: string;
  city: string;
  price: string;
  url: string;
  tag: string;
  tagBg: string;
  highlight?: boolean;
}

const LIBRARIAS: Libraria[] = [
  {
    name: "Editorial Galaxia",
    desc: "Edición orixinal directamente desde a editorial oficial.",
    city: "Vigo / Distribución oficial",
    price: "22,10 €",
    tag: "EDITOR OFICIAL",
    tagBg: "#FFE600",
    url: "https://editorialgalaxia.gal/produto/faneca-brava/",
    highlight: true,
  },
  {
    name: "Libraría Couceiro",
    desc: "Libraría histórica de referencia na Praza de Cervantes.",
    city: "Santiago de Compostela",
    price: "22,10 €",
    tag: "SANTIAGO",
    tagBg: "#A7F3D0",
    url: "https://librariacouceiro.gal/",
  },
  {
    name: "Clarión Libraría",
    desc: "Libraría de fondo galego e venda online.",
    city: "Galicia / Envíos",
    price: "22,10 €",
    tag: "ONLINE",
    tagBg: "#BAE6FD",
    url: "https://www.clarionlibraria.gal/ga/index.php",
  },
  {
    name: "Libraría Pedreira",
    desc: "Especialistas en libro galego na Rúa do Hórreo.",
    city: "Santiago de Compostela",
    price: "22,10 €",
    tag: "SANTIAGO",
    tagBg: "#DDD6FE",
    url: "https://www.librariapedreira.com/",
  },
  {
    name: "Follas Novas",
    desc: "Referente do libro e da cultura na Rúa Montero Ríos.",
    city: "Santiago de Compostela",
    price: "22,10 €",
    tag: "SANTIAGO",
    tagBg: "#FED7AA",
    url: "https://www.follasnovas.com/",
  },
  {
    name: "Libraría Lila de Lilith",
    desc: "Espazo independente de pensamento e literatura.",
    city: "Santiago de Compostela",
    price: "22,10 €",
    tag: "INDEPENDENTE",
    tagBg: "#FBCFE8",
    url: "https://maps.app.goo.gl/6XiU7PgiJ3J7Y8oi8?g_st=ai",
  },
  {
    name: "Númax",
    desc: "Proxecto cooperativo e libraría no casco histórico.",
    city: "Santiago de Compostela",
    price: "22,10 €",
    tag: "CULTURAL",
    tagBg: "#FDE047",
    url: "https://numax.org/",
  },
];

export default function MercarSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section 
      id="mercar"
      style={{ 
        position: 'relative', 
        padding: m ? '3.5rem 0 3.5rem' : '6.5rem 0 6rem', 
        backgroundColor: '#FFFFFF',
        color: '#000000',
        fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        borderTop: '4px solid #000000',
        borderBottom: '4px solid #000000',
      }}
    >
      
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.07,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: m ? '0 1rem' : '0 3rem', position: 'relative', zIndex: 10 }}>

        
        <div style={{ marginBottom: m ? '2rem' : '3.5rem' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#FFE600',
              color: '#000000',
              border: '2px solid #000000',
              boxShadow: '3px 3px 0px #000000',
              padding: '4px 12px',
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              DISTRIBUCIÓN OFICIAL
            </span>

            <span style={{
              display: 'inline-block',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '2px solid #000000',
              padding: '4px 10px',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              PVP FIXO 22,10 €
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: m ? 'column' : 'row',
            alignItems: m ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            borderBottom: '4px solid #000000',
            paddingBottom: m ? '1.25rem' : '1.75rem',
          }}>
            <div>
              <h2 style={{
                fontSize: m ? 'clamp(2.4rem, 10vw, 3.2rem)' : 'clamp(3.5rem, 6vw, 5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                margin: 0,
                color: '#000000',
              }}>
                MERCAR <span style={{ backgroundColor: '#FFE600', padding: '0 8px', border: '3px solid #000000', boxShadow: '4px 4px 0px #000000', display: 'inline-block', marginTop: m ? '6px' : 0 }}>O LIBRO</span>
              </h2>
              <p style={{
                fontSize: m ? '14px' : '17px',
                fontWeight: 600,
                color: '#222222',
                margin: '12px 0 0',
                maxWidth: '650px',
                lineHeight: 1.4,
              }}>
                Dispoñible nas principais librarías de proximidade e na editora orixinal. Compra directa sen intermediarios estraños.
              </p>
            </div>

            
            <div style={{
              backgroundColor: '#FF5E5B',
              color: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              padding: '10px 16px',
              fontWeight: 900,
              fontSize: '13px',
              textAlign: 'center',
              textTransform: 'uppercase',
              transform: m ? 'none' : 'rotate(-2deg)',
              alignSelf: m ? 'stretch' : 'auto',
            }}>
              7 PUNTOS DE VENDA VERIFICADOS
            </div>
          </div>
        </div>

        
        <div style={{
          backgroundColor: '#F3F4F6',
          border: '3px solid #000000',
          boxShadow: m ? '5px 5px 0px #000000' : '8px 8px 0px #000000',
          padding: m ? '1.25rem' : '2.25rem',
          marginBottom: m ? '2.5rem' : '3.5rem',
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '150px 1fr auto',
          gap: m ? '1.25rem' : '2.5rem',
          alignItems: 'center',
        }}>
          
          <div style={{ textAlign: 'center' }}>
            <img 
              src="/manus-storage/NEjJma6w5Oln_b68f9430.jpg"
              alt="Faneca Brava portada"
              style={{
                width: m ? '120px' : '140px',
                aspectRatio: '2/3',
                objectFit: 'cover',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0px #000000',
                display: 'inline-block',
              }}
            />
          </div>

          
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#000000', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, padding: '3px 8px', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              NOVELA DE MEMORIA · 2024
            </div>
            <h3 style={{ fontSize: m ? '2rem' : '2.5rem', fontWeight: 900, margin: 0, lineHeight: 1, textTransform: 'uppercase' }}>
              FANECA BRAVA
            </h3>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#333333', marginTop: '6px' }}>
              Autor: Manuel Portas · Editorial Galaxia
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
              <span style={{ border: '2px solid #000000', backgroundColor: '#FFFFFF', padding: '3px 10px', fontSize: '12px', fontWeight: 700 }}>
                244 PÁXINAS
              </span>
              <span style={{ border: '2px solid #000000', backgroundColor: '#FFFFFF', padding: '3px 10px', fontSize: '12px', fontWeight: 700 }}>
                GALEGO
              </span>
              <span style={{ border: '2px solid #000000', backgroundColor: '#FFFFFF', padding: '3px 10px', fontSize: '12px', fontWeight: 700 }}>
                ISBN: 978-84-11763-33-2
              </span>
            </div>
          </div>

          
          <div style={{
            borderLeft: m ? 'none' : '3px solid #000000',
            borderTop: m ? '3px solid #000000' : 'none',
            paddingLeft: m ? 0 : '2.25rem',
            paddingTop: m ? '1.25rem' : 0,
            textAlign: m ? 'center' : 'right',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555555' }}>
              PREZO FIXO
            </div>
            <div style={{ fontSize: m ? '3rem' : '3.6rem', fontWeight: 900, lineHeight: 1, color: '#000000', margin: '4px 0 12px' }}>
              22,10 €
            </div>

            <a
              href="https://editorialgalaxia.gal/produto/faneca-brava/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#FFE600',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                padding: '12px 24px',
                fontWeight: 900,
                fontSize: '14px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                width: m ? '100%' : 'auto',
                boxSizing: 'border-box',
              }}
            >
              MERCAR EN GALAXIA [DIRECTO] ↗
            </a>
          </div>
        </div>

        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}>
          <h4 style={{
            fontSize: m ? '1.3rem' : '1.7rem',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            LIBRARÍAS DISPOÑIBLES
          </h4>
          <span style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            padding: '4px 10px',
          }}>
            7 TENDAS
          </span>
        </div>

        
        <div style={{
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: m ? '16px' : '22px',
        }}>
          {LIBRARIAS.map((lib) => (
            <div
              key={lib.name}
              style={{
                backgroundColor: lib.highlight ? '#FFFDF0' : '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: lib.highlight ? '6px 6px 0px #000000' : '5px 5px 0px #000000',
                padding: m ? '1.25rem' : '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
                  <span style={{
                    backgroundColor: lib.tagBg,
                    color: '#000000',
                    border: '2px solid #000000',
                    padding: '2px 8px',
                    fontSize: '10px',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {lib.tag}
                  </span>

                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#444444',
                    textTransform: 'uppercase',
                  }}>
                    {lib.city}
                  </span>
                </div>

                <h5 style={{
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  margin: '0 0 6px',
                  color: '#000000',
                  lineHeight: 1.15,
                }}>
                  {lib.name}
                </h5>

                <p style={{
                  fontSize: '13.5px',
                  fontWeight: 500,
                  color: '#333333',
                  margin: '0 0 16px',
                  lineHeight: 1.45,
                }}>
                  {lib.desc}
                </p>
              </div>

              
              <div style={{
                borderTop: '2px dashed #000000',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#555555', textTransform: 'uppercase' }}>
                    PREZO OFICIAL
                  </div>
                  <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#000000', lineHeight: 1 }}>
                    {lib.price}
                  </div>
                </div>

                <a
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: lib.highlight ? '#FFE600' : '#000000',
                    color: lib.highlight ? '#000000' : '#FFFFFF',
                    border: '2px solid #000000',
                    boxShadow: '3px 3px 0px #000000',
                    padding: '10px 18px',
                    fontWeight: 900,
                    fontSize: '12.5px',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                >
                  IR Á TENDA ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        
        <div style={{
          marginTop: m ? '2.5rem' : '3.5rem',
          border: '3px solid #000000',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: '14px 20px',
          display: 'flex',
          flexDirection: m ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          boxShadow: '4px 4px 0px #FFE600',
        }}>
          <div style={{ fontWeight: 700, fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            APOIA O COMERCIO LOCAL E A LITERATURA EN GALEGO
          </div>
          <div style={{ fontWeight: 800, fontSize: '12px', color: '#FFE600' }}>
            EDITORIAL GALAXIA · MANUEL PORTAS · 2024
          </div>
        </div>

      </div>
    </section>
  );
}
