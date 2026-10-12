import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Camera, ChevronLeft, ChevronRight, LayoutGrid, StretchHorizontal, X, ZoomIn } from "lucide-react";

interface GalleryItem {
  id: string;
  img: string;
  title: string;
  year: string;
  desc: string;
  objectPosition?: string;
  clay: {
    bg: string;
    accent: string;
    border: string;
    badgeBg: string;
    shadow: string;
  };
}

const items: GalleryItem[] = [
  {
    id: "01",
    img: "/manus-storage/faneca-vila-marineira.png",
    title: "A vila mariñeira",
    year: "1950s",
    desc: "Rúas de pedra, néboa e silencio. O microcosmos onde todo comezou.",
    clay: {
      bg: "linear-gradient(145deg, #2A5663 0%, #1D434E 100%)",
      accent: "#3FE0F2",
      border: "rgba(63, 224, 242, 0.45)",
      badgeBg: "linear-gradient(145deg, #346876 0%, #234D58 100%)",
      shadow: "rgba(15, 45, 54, 0.65)",
    },
  },
  {
    id: "02",
    img: "/manus-storage/faneca-escola-franquista.png",
    title: "A escola franquista",
    year: "1952",
    desc: "Crucifixo, retrato de Franco e a regra de Dona Remedios. O terror cotián.",
    clay: {
      bg: "linear-gradient(145deg, #5B573C 0%, #46422C 100%)",
      accent: "#FCE066",
      border: "rgba(252, 224, 102, 0.45)",
      badgeBg: "linear-gradient(145deg, #6C6647 0%, #4E4A31 100%)",
      shadow: "rgba(45, 42, 22, 0.65)",
    },
  },
  {
    id: "03",
    img: "/manus-storage/faneca-mama-carme.jpg",
    title: "Mamá Carme",
    year: "1960",
    desc: "A matriarca que preferiu ocultar monstros antes que perder a reputación.",
    objectPosition: "top center",
    clay: {
      bg: "linear-gradient(145deg, #6B4040 0%, #522E2E 100%)",
      accent: "#FF9982",
      border: "rgba(255, 153, 130, 0.45)",
      badgeBg: "linear-gradient(145deg, #7F4D4D 0%, #5C3434 100%)",
      shadow: "rgba(54, 25, 25, 0.65)",
    },
  },
  {
    id: "04",
    img: "/manus-storage/faneca-barcelona.png",
    title: "Barcelona — A Fuga",
    year: "1965",
    desc: "A cidade que lle deu anonimato, liberdade e unha cámara como arma.",
    clay: {
      bg: "linear-gradient(145deg, #395275 0%, #2A3E5C 100%)",
      accent: "#7EBCFF",
      border: "rgba(126, 188, 255, 0.45)",
      badgeBg: "linear-gradient(145deg, #46638C 0%, #31496D 100%)",
      shadow: "rgba(24, 38, 62, 0.65)",
    },
  },
  {
    id: "05",
    img: "/manus-storage/faneca-concha-portrait.jpg",
    title: "Concha — A paparazzi",
    year: "1970s",
    desc: "Detrás da lente, a nena maltratada converteuse na cazadora dos poderosos.",
    objectPosition: "top center",
    clay: {
      bg: "linear-gradient(145deg, #66415B 0%, #4E2E44 100%)",
      accent: "#F793C2",
      border: "rgba(247, 147, 194, 0.45)",
      badgeBg: "linear-gradient(145deg, #7A4E6C 0%, #56334C 100%)",
      shadow: "rgba(52, 22, 45, 0.65)",
    },
  },
  {
    id: "06",
    img: "/manus-storage/faneca-arquivo-mesa.png",
    title: "O arquivo",
    year: "Sempre",
    desc: "Cartas, fotografías, cintas. Os fragmentos dunha memoria que non arde.",
    clay: {
      bg: "linear-gradient(145deg, #355C4A 0%, #254637 100%)",
      accent: "#5FE6A3",
      border: "rgba(95, 230, 163, 0.45)",
      badgeBg: "linear-gradient(145deg, #416F59 0%, #2B4E3E 100%)",
      shadow: "rgba(22, 50, 38, 0.65)",
    },
  },
];

const clayShadow = {
  card: "18px 26px 44px -6px rgba(8, 16, 22, 0.65), 0 8px 18px rgba(0, 0, 0, 0.35), inset 5px 5px 12px rgba(255, 255, 255, 0.52), inset -6px -7px 15px rgba(0, 0, 0, 0.48)",
  cardHover: "24px 36px 58px -8px rgba(8, 16, 22, 0.75), 0 12px 24px rgba(0, 0, 0, 0.4), inset 6px 6px 14px rgba(255, 255, 255, 0.65), inset -7px -8px 18px rgba(0, 0, 0, 0.55)",
  pill: "5px 8px 16px rgba(0, 0, 0, 0.45), inset 2.5px 2.5px 6px rgba(255, 255, 255, 0.65), inset -3px -3px 6px rgba(0, 0, 0, 0.4)",
  pillActive: "4px 6px 14px rgba(0, 0, 0, 0.55), inset 3px 3px 7px rgba(0, 0, 0, 0.45), inset -2px -2px 5px rgba(255, 255, 255, 0.45)",
  button: "8px 14px 26px rgba(8, 16, 22, 0.55), inset 3px 3px 7px rgba(255, 255, 255, 0.6), inset -4px -4px 9px rgba(0, 0, 0, 0.45)",
  imageWell: "inset 4px 4px 10px rgba(0, 0, 0, 0.65), inset -3px -3px 8px rgba(255, 255, 255, 0.22)",
  modal: "28px 44px 75px rgba(6, 12, 16, 0.85), inset 7px 7px 18px rgba(255, 255, 255, 0.5), inset -8px -9px 22px rgba(0, 0, 0, 0.55)",
};

export default function GaleriaSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  const [hovered, setHovered] = useState<number | null>(null);
  const [layoutMode, setLayoutMode] = useState<"carousel" | "grid">("carousel");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="galeria"
      style={{
        position: "relative",
        padding: m ? "4.5rem 0 3.5rem" : "8rem 0 6.5rem",
        overflow: "hidden",
        background: "linear-gradient(135deg, #24353E 0%, #2D4249 32%, #363A48 68%, #3B333F 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "-5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239, 161, 141, 0.18) 0%, transparent 68%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "35%",
          right: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(118, 196, 208, 0.16) 0%, transparent 68%)",
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "25%",
          width: "580px",
          height: "580px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234, 167, 197, 0.15) 0%, transparent 68%)",
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(226, 207, 136, 0.16) 0%, transparent 68%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={{ padding: m ? "0 1.25rem" : "0 5rem", marginBottom: m ? "2.5rem" : "3.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.4rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  background: "linear-gradient(145deg, #3B4E56 0%, #2C3C43 100%)",
                  boxShadow: clayShadow.pill,
                  border: "1.5px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <Camera size={14} color="#3FE0F2" />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                  }}
                >
                  Galería Corsaria
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: m ? "column" : "row",
                justifyContent: "space-between",
                alignItems: m ? "flex-start" : "flex-end",
                gap: "1.5rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: m ? "2.6rem" : "clamp(3.2rem, 5.5vw, 5.2rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  As <span style={{ color: "#FF9982" }}>fotografías</span>
                  <br />
                  prohibidas
                </h2>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: m ? "1.02rem" : "1.12rem",
                    lineHeight: 1.75,
                    color: "#E2EDF2",
                    maxWidth: "580px",
                    marginTop: "1.2rem",
                    marginBottom: 0,
                  }}
                >
                  As imaxes que Concha capturou coa súa Leica. Cada disparo, unha vinganza silenciosa. Arrastra para explorar.
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {!m && (
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      borderRadius: "9999px",
                      background: "linear-gradient(145deg, #32454C 0%, #26353B 100%)",
                      boxShadow: clayShadow.pill,
                      border: "1.5px solid rgba(255, 255, 255, 0.25)",
                    }}
                  >
                    <button
                      onClick={() => setLayoutMode("carousel")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        border: "none",
                        background:
                          layoutMode === "carousel"
                            ? "linear-gradient(145deg, #445D66 0%, #33484F 100%)"
                            : "transparent",
                        boxShadow: layoutMode === "carousel" ? clayShadow.pillActive : "none",
                        color: layoutMode === "carousel" ? "#FFFFFF" : "#B0C4CC",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 800,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <StretchHorizontal size={14} />
                      <span>Carrusel</span>
                    </button>
                    <button
                      onClick={() => setLayoutMode("grid")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        border: "none",
                        background:
                          layoutMode === "grid"
                            ? "linear-gradient(145deg, #445D66 0%, #33484F 100%)"
                            : "transparent",
                        boxShadow: layoutMode === "grid" ? clayShadow.pillActive : "none",
                        color: layoutMode === "grid" ? "#FFFFFF" : "#B0C4CC",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 800,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <LayoutGrid size={14} />
                      <span>Mosaico</span>
                    </button>
                  </div>
                )}

                {layoutMode === "carousel" && !m && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => scrollBy(-360)}
                      aria-label="Anterior"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: "none",
                        background: "linear-gradient(145deg, #3A4F58 0%, #2A3940 100%)",
                        boxShadow: clayShadow.button,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => scrollBy(360)}
                      aria-label="Seguinte"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: "none",
                        background: "linear-gradient(145deg, #3A4F58 0%, #2A3940 100%)",
                        boxShadow: clayShadow.button,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {layoutMode === "carousel" ? (
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: m ? "18px" : "28px",
              overflowX: "auto",
              paddingLeft: m ? "1.25rem" : "5rem",
              paddingRight: m ? "1.25rem" : "5rem",
              paddingTop: "1rem",
              paddingBottom: "2.5rem",
              scrollbarWidth: "none",
              cursor: "grab",
            }}
            onMouseDown={(e) => {
              const el = scrollRef.current;
              if (!el) return;
              el.style.cursor = "grabbing";
              const startX = e.pageX - el.offsetLeft;
              const scrollLeft = el.scrollLeft;
              const onMove = (ev: MouseEvent) => {
                const x = ev.pageX - el.offsetLeft;
                el.scrollLeft = scrollLeft - (x - startX);
              };
              const onUp = () => {
                el.style.cursor = "grab";
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                animate={v ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => setSelectedItem(item)}
                style={{
                  flexShrink: 0,
                  width: m ? "82vw" : "360px",
                  maxWidth: "360px",
                  background: item.clay.bg,
                  borderRadius: "32px",
                  border: `2.5px solid ${item.clay.border}`,
                  boxShadow: hovered === i ? clayShadow.cardHover : clayShadow.card,
                  transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  padding: "16px 16px 22px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "22px",
                    overflow: "hidden",
                    height: "260px",
                    border: "2px solid rgba(255, 255, 255, 0.18)",
                    boxShadow: clayShadow.imageWell,
                    background: "#162329",
                    marginBottom: "18px",
                  }}
                >
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    animate={{ scale: hovered === i ? 1.05 : 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: item.objectPosition || "center",
                      display: "block",
                      filter: hovered === i ? "brightness(1) contrast(1.06)" : "brightness(0.92) contrast(1.04)",
                      transition: "filter 0.4s ease",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      background: item.clay.badgeBg,
                      border: `1.5px solid ${item.clay.border}`,
                      boxShadow: clayShadow.pill,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 800,
                        color: item.clay.accent,
                        letterSpacing: "0.08em",
                        textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <motion.div
                    animate={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1 : 0.85 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "rgba(18, 30, 36, 0.9)",
                      backdropFilter: "blur(8px)",
                      border: `1.5px solid ${item.clay.accent}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: clayShadow.pill,
                    }}
                  >
                    <ZoomIn size={16} color={item.clay.accent} />
                  </motion.div>
                </div>

                <div style={{ padding: "0 6px" }}>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
                      marginBottom: "8px",
                      marginTop: 0,
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 500,
                      color: "#EAF1F5",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: "6px",
                    paddingRight: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: item.clay.accent,
                    }}
                  >
                    Arquivo #{item.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      opacity: 0.95,
                    }}
                  >
                    Toca para ampliar →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
              padding: m ? "0 1.25rem" : "0 5rem",
              paddingBottom: "2.5rem",
            }}
          >
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => setSelectedItem(item)}
                style={{
                  background: item.clay.bg,
                  borderRadius: "32px",
                  border: `2.5px solid ${item.clay.border}`,
                  boxShadow: hovered === i ? clayShadow.cardHover : clayShadow.card,
                  transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  padding: "16px 16px 22px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "22px",
                    overflow: "hidden",
                    height: "240px",
                    border: "2px solid rgba(255, 255, 255, 0.18)",
                    boxShadow: clayShadow.imageWell,
                    background: "#162329",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: item.objectPosition || "center",
                      display: "block",
                      filter: "brightness(0.92) contrast(1.04)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      background: item.clay.badgeBg,
                      border: `1.5px solid ${item.clay.border}`,
                      boxShadow: clayShadow.pill,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: 800,
                        color: item.clay.accent,
                        letterSpacing: "0.08em",
                        textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                </div>

                <div style={{ padding: "0 6px" }}>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "1.32rem",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
                      marginBottom: "6px",
                      marginTop: 0,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 500,
                      color: "#EAF1F5",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div
          style={{
            padding: m ? "0 1.25rem" : "0 5rem",
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 18px",
              borderRadius: "9999px",
              background: "rgba(36, 53, 62, 0.75)",
              boxShadow: clayShadow.pill,
              border: "1.5px solid rgba(255, 255, 255, 0.22)",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#3FE0F2",
              }}
            >
              Leica IIIc · 6 capturas históricas
            </span>
          </div>

          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C2D7E0",
            }}
          >
            {m ? "Arrastra cara os lados para explorar" : "Despraza ou preme nas fotos para ampliar"}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(14, 22, 28, 0.85)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: m ? "1rem" : "2rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "680px",
                background: selectedItem.clay.bg,
                borderRadius: "36px",
                border: `3px solid ${selectedItem.clay.border}`,
                boxShadow: clayShadow.modal,
                padding: m ? "18px" : "26px",
                position: "relative",
              }}
            >
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Pechar"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "none",
                  background: "linear-gradient(145deg, #445660 0%, #303F47 100%)",
                  boxShadow: clayShadow.button,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  maxHeight: m ? "320px" : "440px",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: clayShadow.imageWell,
                  background: "#162329",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <img
                  src={selectedItem.img}
                  alt={selectedItem.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: m ? "320px" : "440px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span
                    style={{
                      padding: "5px 14px",
                      borderRadius: "9999px",
                      background: selectedItem.clay.badgeBg,
                      border: `1.5px solid ${selectedItem.clay.border}`,
                      boxShadow: clayShadow.pill,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: selectedItem.clay.accent,
                    }}
                  >
                    {selectedItem.year}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C2D7E0",
                    }}
                  >
                    Arquivo de Concha
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: m ? "1.6rem" : "2rem",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "-0.02em",
                    margin: "0 0 8px",
                  }}
                >
                  {selectedItem.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14.5px",
                    fontWeight: 500,
                    color: "#EAF1F5",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {selectedItem.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
