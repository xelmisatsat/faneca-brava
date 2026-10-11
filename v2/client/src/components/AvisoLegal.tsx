import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function AvisoLegal() {
  const [visible, setVisible] = useState(false);
  const m = useIsMobile();

  // Aparece ao cargar
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 350);
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
          {/* Backdrop con desenfoque cinematográfico */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(5, 7, 12, 0.85)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          />

          {/* Contedor Centrado Bento Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: m ? "1rem 0.85rem" : "2rem",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                pointerEvents: "auto",
                width: "100%",
                maxWidth: "880px",
                maxHeight: "92vh",
                overflowY: "auto",
                background: "linear-gradient(170deg, #0E141E 0%, #080C13 100%)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: m ? "22px" : "28px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.1)",
                padding: m ? "1.2rem 1rem" : "2rem 2.2rem",
                position: "relative",
                scrollbarWidth: "none",
              }}
            >
              {/* Liña superior dourada sutil estilo Bento */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "15%",
                  right: "15%",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #C8A96E, transparent)",
                  borderRadius: "9999px",
                }}
              />

              {/* Cabeceira Compacta Bento */}
              <div style={{ marginBottom: "1.2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "10px",
                      background: "rgba(200, 169, 110, 0.15)",
                      border: "1px solid rgba(200, 169, 110, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                    }}
                  >
                    ⚖️
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "9.5px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#C8A96E",
                        fontWeight: 600,
                        display: "block",
                      }}
                    >
                      Aviso Oficial
                    </span>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 400,
                        fontSize: m ? "1.35rem" : "1.65rem",
                        color: "#FFFFFF",
                        margin: 0,
                        lineHeight: 1.1,
                      }}
                    >
                      Cadro de Transparencia do Proxecto
                    </h2>
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "10px",
                    color: "rgba(234, 226, 210, 0.75)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
                  IES Arcebispo Xelmírez I
                </div>
              </div>

              {/* Bento Grid Layout */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: m ? "1fr" : "repeat(12, 1fr)",
                  gap: "10px",
                  marginBottom: "1.2rem",
                }}
              >
                {/* BLOQUE 1 (Hero Bento): Autoría escolar (8 columnas desktop) */}
                <div
                  style={{
                    gridColumn: m ? "span 1" : "span 8",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "18px",
                    padding: m ? "1rem" : "1.25rem 1.4rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#C8A96E",
                        marginBottom: "4px",
                        fontWeight: 600,
                      }}
                    >
                      Autores e Ámbito
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: m ? "1.15rem" : "1.3rem",
                        color: "#FFFFFF",
                        fontWeight: 400,
                        marginBottom: "6px",
                      }}
                    >
                      Jun Sieira Gerpe & Álvaro Villar Gómez
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: m ? "0.82rem" : "0.86rem",
                        color: "rgba(234, 226, 210, 0.8)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      Alumnos de <strong>4º ESO do IES Arcebispo Xelmírez I</strong> (Santiago de Compostela).
                      Traballo escolar para a materia de <em>Lingua Galega e Literatura</em>, curso 2025–2026.
                    </p>
                  </div>
                </div>

                {/* BLOQUE 2 (Metric Bento): Fins Académicos (4 columnas desktop) */}
                <div
                  style={{
                    gridColumn: m ? "span 1" : "span 4",
                    background: "linear-gradient(135deg, rgba(200, 169, 110, 0.1) 0%, rgba(200, 169, 110, 0.03) 100%)",
                    border: "1px solid rgba(200, 169, 110, 0.25)",
                    borderRadius: "18px",
                    padding: m ? "1rem" : "1.25rem 1.3rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#C8A96E", lineHeight: 1, fontWeight: 400, marginBottom: "4px" }}>
                    0 €
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>
                    Fins 100% Didácticos
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(234, 226, 210, 0.75)", lineHeight: 1.5, margin: 0 }}>
                    Sen ningún beneficio comercial nin lucrativo.
                  </p>
                </div>

                {/* BLOQUE 3 (Bento Medio): Análise da Obra (6 columnas desktop) */}
                <div
                  style={{
                    gridColumn: m ? "span 1" : "span 6",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "18px",
                    padding: m ? "1rem" : "1.2rem 1.3rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "1rem" }}>📖</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
                      Contidos e Análise Literaria
                    </span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(234, 226, 210, 0.75)", lineHeight: 1.6, margin: 0 }}>
                    Fragmentos, referencias e citas de <em>Faneca Brava</em> úsanse estritamente como exercicio didáctico e divulgativo. Non se reproduce a obra íntegra nin se substitúe.
                  </p>
                </div>

                {/* BLOQUE 4 (Bento Medio): Ilustracións e Son (6 columnas desktop) */}
                <div
                  style={{
                    gridColumn: m ? "span 1" : "span 6",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "18px",
                    padding: m ? "1rem" : "1.2rem 1.3rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "1rem" }}>🎙️</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
                      Imaxes con IA e Gravacións
                    </span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(234, 226, 210, 0.75)", lineHeight: 1.6, margin: 0 }}>
                    Retratos ilustrados con intelixencia artificial escolar e dramatizacións de voz gravadas polos propios alumnos para a recreación literaria sen suplantar a ninguén.
                  </p>
                </div>

                {/* BLOQUE 5 (Bento Inferior 1): Editorial e Autor (7 columnas desktop) */}
                <div
                  style={{
                    gridColumn: m ? "span 1" : "span 7",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "18px",
                    padding: m ? "1rem" : "1.1rem 1.3rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "1rem" }}>🏛️</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
                      Editorial Galaxia e Autoría
                    </span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(234, 226, 210, 0.75)", lineHeight: 1.6, margin: 0 }}>
                    Proxecto independente sen afiliación oficial con Editorial Galaxia nin con Manuel Portas. O acceso «Mercar» enlaza a tendas legais para adquirir o libro.
                  </p>
                </div>

                {/* BLOQUE 6 (Bento Inferior 2): Privacidade (5 columnas desktop) */}
                <div
                  style={{
                    gridColumn: m ? "span 1" : "span 5",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "18px",
                    padding: m ? "1rem" : "1.1rem 1.3rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "1rem" }}>🔒</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
                      0 Rastreamento · 100% Privado
                    </span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(234, 226, 210, 0.75)", lineHeight: 1.6, margin: 0 }}>
                    Non se recollen nin almacenan datos persoais. Sen cookies de terceiros nin publicidade.
                  </p>
                </div>
              </div>

              {/* Bento Botón de Aceptar (Full Width) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: m ? "column" : "row",
                  gap: "12px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "18px",
                  padding: m ? "12px" : "12px 18px",
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10.5px", color: "rgba(234, 226, 210, 0.6)", textAlign: m ? "center" : "left" }}>
                  Ao pulsar «Aceptar e Entrar», confirmas que comprendes a natureza educativa deste proxecto escolar.
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#E0BF80" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisible(false)}
                  style={{
                    padding: "11px 24px",
                    background: "#C8A96E",
                    border: "none",
                    borderRadius: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    color: "#080C13",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    width: m ? "100%" : "auto",
                    boxShadow: "0 4px 16px rgba(200, 169, 110, 0.3)",
                    transition: "background 0.2s",
                  }}
                >
                  Aceptar e Entrar á Web →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
