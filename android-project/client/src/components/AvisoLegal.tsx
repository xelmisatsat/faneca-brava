import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function AvisoLegal() {
  const [visible, setVisible] = useState(false);
  const m = useIsMobile();

  // Aparece sempre ao cargar — sen localStorage
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Bloquea o scroll do body mentres está aberto
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Fondo semitransparente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed", inset: 0, zIndex: 99999,
              background: "rgba(4,4,8,0.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 100000,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: m ? "1rem" : "2rem",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                pointerEvents: "auto",
                width: "100%",
                maxWidth: m ? "100%" : "720px",
                maxHeight: "92vh",
                overflowY: "auto",
                background: "linear-gradient(160deg, rgba(14,18,28,0.98) 0%, rgba(8,10,18,0.99) 100%)",
                backdropFilter: "blur(48px)",
                border: "1px solid rgba(200,169,110,0.22)",
                borderTop: "1px solid rgba(200,169,110,0.45)",
                borderRadius: m ? "20px" : "28px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04) inset",
                padding: m ? "1.8rem 1.4rem 2rem" : "3.5rem 4rem 3rem",
                position: "relative",
                scrollbarWidth: "none",
              }}
            >
              {/* Liña dourada topo */}
              <div style={{
                position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.7), transparent)",
              }} />

              {/* Icono / cabeceira */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: m ? "1.4rem" : "2rem" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                  background: "rgba(200,169,110,0.12)",
                  border: "1px solid rgba(200,169,110,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                }}>
                  ⚖️
                </div>
                <div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "10px",
                    letterSpacing: "0.35em", textTransform: "uppercase", color: "#C8A96E",
                    marginBottom: "4px",
                  }}>
                    Proxecto educativo
                  </div>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                    fontSize: m ? "1.5rem" : "2rem", color: "#EAE2D2",
                    lineHeight: 1.1, letterSpacing: "-0.01em",
                  }}>
                    Aviso sobre este proxecto
                  </h2>
                </div>
              </div>

              {/* Divisor */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                marginBottom: m ? "1.2rem" : "1.8rem",
              }} />

              {/* Corpo do texto */}
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: m ? "0.82rem" : "0.92rem", lineHeight: 1.85,
                color: "rgba(234,226,210,0.80)",
              }}>
                <p style={{ marginBottom: "1rem" }}>
                  Esta web é un <strong style={{ color: "#C8A96E", fontWeight: 400 }}>traballo educativo</strong> realizado por{" "}
                  <strong style={{ color: "#EAE2D2", fontWeight: 400 }}>Jun Sieira Gerpe</strong> e{" "}
                  <strong style={{ color: "#EAE2D2", fontWeight: 400 }}>Álvaro Villar Gómez</strong>, alumnos de{" "}
                  <strong style={{ color: "#EAE2D2", fontWeight: 400 }}>4º ESO do IES Arcebispo Xelmírez I</strong> (Santiago de Compostela),
                  para a materia de Lingua Galega e Literatura, curso 2025–2026.
                </p>

                <p style={{ marginBottom: "1rem" }}>
                  O proxecto foi desenvolvido baixo a supervisión e con autorización do IES Arcebispo Xelmírez I.
                  Ten <strong style={{ color: "#C8A96E", fontWeight: 400 }}>fins exclusivamente académicos e educativos</strong>,
                  sen ningún tipo de beneficio económico, comercial nin lucrativo de ningún tipo.
                </p>

                {/* Bloque: contidos da obra */}
                <div style={{
                  padding: m ? "0.9rem 1rem" : "1rem 1.4rem",
                  borderLeft: "2px solid rgba(200,169,110,0.35)",
                  background: "rgba(200,169,110,0.04)",
                  borderRadius: "0 10px 10px 0",
                  marginBottom: "1rem",
                }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "6px" }}>
                    Sobre os contidos da obra
                  </div>
                  <p style={{ margin: 0, fontSize: m ? "0.8rem" : "0.88rem" }}>
                    Os fragmentos textuais, citas, referencias á trama, aos personaxes e á obra <em>Faneca Brava</em> úsanse con fins
                    estritamente didácticos, no marco dun traballo de análise literaria escolar.
                    Non se reproduce a obra na súa totalidade nin se busca substituíla.
                  </p>
                </div>

                {/* Bloque: imaxes e audio */}
                <div style={{
                  padding: m ? "0.9rem 1rem" : "1rem 1.4rem",
                  borderLeft: "2px solid rgba(107,140,174,0.35)",
                  background: "rgba(107,140,174,0.04)",
                  borderRadius: "0 10px 10px 0",
                  marginBottom: "1rem",
                }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B9BB4", marginBottom: "6px" }}>
                    Sobre as imaxes e o audio
                  </div>
                  <p style={{ margin: 0, fontSize: m ? "0.8rem" : "0.88rem" }}>
                    As imaxes dos personaxes son creacións propias xeradas por intelixencia artificial con fins ilustrativos e escolares.
                    As recreacións de voz dos personaxes son producións propias realizadas como parte do proxecto educativo,
                    e non pretenden representar nin suplantar a ningún individuo real.
                  </p>
                </div>

                {/* Bloque: autoría */}
                <div style={{
                  padding: m ? "0.9rem 1rem" : "1rem 1.4rem",
                  borderLeft: "2px solid rgba(154,138,122,0.35)",
                  background: "rgba(154,138,122,0.04)",
                  borderRadius: "0 10px 10px 0",
                  marginBottom: "1rem",
                }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9A8A7A", marginBottom: "6px" }}>
                    Sobre a autoría e a editorial
                  </div>
                  <p style={{ margin: 0, fontSize: m ? "0.8rem" : "0.88rem" }}>
                    Este proxecto <strong style={{ color: "#EAE2D2", fontWeight: 400 }}>non está afiliado, non representa nin conta co respaldo oficial</strong> de
                    Editorial Galaxia nin do autor Manuel Portas. O botón "Mercar" redirixe á páxina oficial da editorial
                    unicamente para facilitar o acceso lexítimo á obra a quen queira adquirila.
                  </p>
                </div>

                {/* Bloque: datos persoais */}
                <div style={{
                  padding: m ? "0.9rem 1rem" : "1rem 1.4rem",
                  borderLeft: "2px solid rgba(74,124,89,0.35)",
                  background: "rgba(74,124,89,0.04)",
                  borderRadius: "0 10px 10px 0",
                  marginBottom: m ? "1.4rem" : "2rem",
                }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#4A7C59", marginBottom: "6px" }}>
                    Sobre os datos persoais
                  </div>
                  <p style={{ margin: 0, fontSize: m ? "0.8rem" : "0.88rem" }}>
                    Esta web <strong style={{ color: "#EAE2D2", fontWeight: 400 }}>non recolle, non almacena nin comparte ningún dato persoal</strong> dos visitantes.
                    Non se usan cookies de rastrexo nin sistemas de análise de usuarios.
                  </p>
                </div>
              </div>

              {/* Botón Entendido */}
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(200,169,110,0.18)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVisible(false)}
                style={{
                  width: "100%",
                  padding: m ? "14px" : "16px",
                  background: "rgba(200,169,110,0.10)",
                  border: "1px solid rgba(200,169,110,0.40)",
                  borderRadius: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: m ? "14px" : "15px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "#C8A96E",
                  cursor: "pointer",
                  transition: "background 0.25s",
                  marginBottom: "1rem",
                }}
              >
                Entendido — Continuar á web
              </motion.button>

              {/* Nota inferior */}
              <div style={{
                textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(139,155,180,0.45)",
                lineHeight: 1.6,
              }}>
                IES Arcebispo Xelmírez I · 4º ESO · Lingua Galega e Literatura 2025–2026
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
