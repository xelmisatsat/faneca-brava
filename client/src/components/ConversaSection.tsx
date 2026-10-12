import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Volume2, VolumeX, Send, Sparkles, MessageSquare, Compass, ShieldCheck } from "lucide-react";

interface Character {
  id: string;
  name: string;
  alias: string;
  role: string;
  color: string;
  glow: string;
  avatar: string;
  sticker: string;
  voiceId: string;
  quote: string;
  suggestions: string[];
}

const CHARACTERS: Character[] = [
  {
    id: "concha",
    name: "Concha Pereira",
    alias: "A Faneca Brava",
    role: "Protagonista",
    color: "#E2BA70",
    glow: "rgba(226, 186, 112, 0.35)",
    avatar: "/manus-storage/faneca-concha-portrait.jpg",
    sticker: "/manus-storage/sticker-concha_7276b1d9.png",
    voiceId: "SbxCN6LQhBInYaeKjhhW",
    quote: "«Cando miro pola lente, son eu a que observa.»",
    suggestions: [
      "Que sentes cando miras pola lente?",
      "Como foi a túa infancia na vila?",
      "Por que non voltaches á familia?",
      "Que son as fotos corsarias?",
    ],
  },
  {
    id: "fernando",
    name: "Fernando Pereira",
    alias: "O Médico Atormentado",
    role: "Narrador e Curmán",
    color: "#7FB3D5",
    glow: "rgba(127, 179, 213, 0.35)",
    avatar: "/manus-storage/faneca-fernando-portrait.jpg",
    sticker: "/manus-storage/sticker-fernando_e1828bc1.png",
    voiceId: "syjZiIvIUSwKREBfMpKZ",
    quote: "«A culpa herdada dos Pereira somatízase nas miñas noites en vela.»",
    suggestions: [
      "Por que non podes durmir?",
      "Que descubriches sobre Concha?",
      "Como é a túa familia?",
      "Que sentes cara a Mamá Carme?",
    ],
  },
  {
    id: "mama",
    name: "Mamá Carme",
    alias: "A Matriarca",
    role: "Antagonista do Clan",
    color: "#D4A373",
    glow: "rgba(212, 163, 115, 0.35)",
    avatar: "/manus-storage/faneca-mama-carme.jpg",
    sticker: "/manus-storage/sticker-mama_e022af0c.png",
    voiceId: "GszuzIPs4fVZTjP0EXrv",
    quote: "«Un nome respectado vale máis ca calquera rebelde.»",
    suggestions: [
      "Por que expulsastes a Concha?",
      "Que é o máis importante para os Pereira?",
      "Arrepínteste de algo?",
      "Como era Concha de pequena?",
    ],
  },
  {
    id: "andreu",
    name: "Andreu Picart",
    alias: "O Fotógrafo Catalán",
    role: "Mestre e Confidente",
    color: "#B08968",
    glow: "rgba(176, 137, 104, 0.35)",
    avatar: "/manus-storage/faneca-andreu-portrait.png",
    sticker: "/manus-storage/sticker-andreu_0cf93efc.png",
    voiceId: "4FMxnogu8ehUVsRIxx9H",
    quote: "«A memoria nunca arde completamente: sempre queda un negativo.»",
    suggestions: [
      "Como era Concha en Barcelona?",
      "Que eran as fotos corsarias?",
      "Que pasou ao final?",
      "Por que non a detiveches?",
    ],
  },
];

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export default function ConversaSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  const [charIdx, setCharIdx] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setV(true), 80);
    return () => clearTimeout(t);
  }, []);

  const char = CHARACTERS[charIdx];

  const isCapacitor = () => typeof window !== "undefined" && !!(window as any).Capacitor;
  const API_BASE = isCapacitor() ? "https://faneca-brava.onrender.com" : "";

  const OFFLINE_RESPONSES: Record<string, string[]> = {
    concha: [
      "Cando miro pola lente da cámara, deixo de ser a nena que todos sinalaban na vila. Por fin son eu a que observa e a que ten o control. Cada fotografía que fixen en Barcelona foi unha forma de poñer a cada quen no seu sitio e esixir a xustiza que me negaron.",
      "A min botástesme por mala e queimei a ponte detrás de min, pero os que mandan e presumen de moral son moito peores e eu teño as probas nas miñas mans. O arquivo garda todo o que a familia Pereira intentou enterrar baixo o silencio.",
      "Non fuxín a Barcelona para esquecer nin para renderme, senón para transformar toda a rabia acumulada nunha forza imparable. Alí aprendín con Andreu que unha cámara pode ser máis poderosa ca calquera tribunal.",
      "A Faneca Brava sempre se agocha na area... parece invisible ata que alguén a pisa e sinte as súas espiñas. Así foi a miña vida: aguantar a marea e devolver o golpe no momento axeitado.",
    ],
    fernando: [
      "Non podo durmir porque os ollos de Concha perséguenme en canto pecho os meus. Non é un simple insomnio médico nin un desaxuste físico: é a somatización da culpa colectiva que a miña familia leva arrastrando durante décadas.",
      "A culpa herdada dos Pereira é unha carga pesadísima que non se cura con fármacos. Só atoparei a paz e o descanso se son quen de reconstruír o puzzle da vida de Concha e devolverlle a dignidade que lle roubaron.",
      "Entre as cartas que custodiaba a tía Lela e as conversas con Andreu Picart no Hostal dos Reis Católicos, fun descubrindo que a nosa historia oficial era unha mentira piadosa tecida polo medo ao escándalo.",
      "Como médico sei perfectamente que o corpo remata por berrar o que a memoria cala. Cada noite en vela é unha chamada de atención para que non deixe morrer a verdade.",
    ],
    mama: [
      "O apelido Pereira é o alicerce desta casa, e un nome respectado vale máis ca calquera capricho individual. Nesta vila as aparencias e a honra son as que sosteñen a familia, e eu non ía permitir que nada as derrubase.",
      "Fixen exactamente o que calquera matriarca con sentido do deber tiña que facer para salvar aos seus. Había que tomar decisións duras e amargas, e non me tremeu o pulso á hora de manter a orde.",
      "Non estaba disposta a consentir que se luxase o noso nome daquela maneira diante de toda a veciñanza. A igrexa, a decencia e a familia van sempre por diante de calquera rebelde.",
      "As familias fortes sobreviven porque saben calar e conter as treboadas. O que pasou con Concha foi doloroso, pero a estabilidade da casa esixía sacrificios inapelables.",
    ],
    andreu: [
      "Concha non fotografaba simplemente para gañar a vida ou facer arte: fotografaba para tomarse a xustiza pola súa man. Cando miraba polo visor da súa Leica, vías nos seus ollos a determinación de quen xa non ten medo a nada.",
      "Dicíalle decote en Barcelona que estaba xogando con lume e que desafiar aos poderosos tiña un prezo moi alto, pero ela só ría polo baixo con aquela ironía feroz. Era unha forza da natureza indomable.",
      "A memoria nunca arde completamente, por moito que algúns intenten queimar os arquivos e borrar os nomes. Sempre queda un negativo gardado, unha copia na escuridade esperando a saír á luz.",
      "Fun testemuña directa da súa transformación: chegou rota polo desterro da súa vila e converteuse na reporteira máis audaz e temida da cidade. Ninguén foi quen de dobrala.",
    ],
  };

  const speakText = async (text: string) => {
    if (speaking) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setSpeaking(false);
      return;
    }

    setSpeaking(true);

    try {
      const r = await fetch(`${API_BASE}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceId: char.voiceId }),
      });

      if (r.ok && r.headers.get("content-type")?.includes("audio")) {
        const blob = await r.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => {
          setSpeaking(false);
          audioRef.current = null;
        };
        audio.onerror = () => {
          setSpeaking(false);
          audioRef.current = null;
        };
        audio.play();
        return;
      }
    } catch {

    }

    try {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "gl-ES";
        utterance.rate = 0.92;
        utterance.pitch = char.id === "mama" ? 1.05 : char.id === "concha" ? 1.0 : 0.95;
        const voices = window.speechSynthesis.getVoices();
        const esVoice = voices.find((v) => v.lang.startsWith("gl") || v.lang.startsWith("es"));
        if (esVoice) utterance.voice = esVoice;
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeaking(false);
      }
    } catch {
      setSpeaking(false);
    }
  };

  const send = async (textToSend?: string) => {
    const content = (textToSend || input).trim();
    if (!content || loading) return;

    setError(null);
    const userMsg: Msg = { role: "user", content };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId: char.id,
          messages: newMsgs.slice(-8),
        }),
      });

      if (!r.ok) {
        const errData = await r.json().catch(() => ({ error: `HTTP ${r.status}` }));
        throw new Error(errData.error || `HTTP ${r.status}`);
      }

      const data = await r.json();
      setMsgs((p) => [...p, { role: "assistant", content: data.reply || "..." }]);
    } catch (e: any) {
      console.warn("[Conversa] Fallback activado:", e?.message || e);
      const offlinePool = OFFLINE_RESPONSES[char.id] || OFFLINE_RESPONSES.concha;
      const randomReply = offlinePool[Math.floor(Math.random() * offlinePool.length)];
      setMsgs((p) => [...p, { role: "assistant", content: randomReply }]);
    }

    setLoading(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 120);
  };

  const changeChar = (idx: number) => {
    if (speaking) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setSpeaking(false);
    }
    setCharIdx(idx);
    setMsgs([]);
    setInput("");
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <section
      id="conversa"
      style={{
        position: "relative",
        padding: m ? "4rem 1rem 3rem" : "5rem 1.5rem 4rem",
        scrollMarginTop: "95px",
        overflow: "hidden",
        backgroundColor: "#06080F",
        minHeight: m ? "100vh" : "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "8%",
            left: "5%",
            width: m ? "280px" : "550px",
            height: m ? "280px" : "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.52) 0%, rgba(3, 105, 161, 0.28) 45%, transparent 70%)",
            filter: "blur(75px)",
            opacity: 0.85,
          }}
        />

        
        <motion.div
          animate={{
            x: [0, -45, 30, 0],
            y: [0, 40, -35, 0],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "25%",
            right: "4%",
            width: m ? "320px" : "620px",
            height: m ? "320px" : "620px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.48) 0%, rgba(217, 119, 6, 0.22) 50%, transparent 75%)",
            filter: "blur(85px)",
            opacity: 0.9,
          }}
        />

        
        <motion.div
          animate={{
            x: [0, 35, -25, 0],
            y: [0, 30, -40, 0],
            scale: [0.95, 1.1, 1, 0.95],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "10%",
            left: "15%",
            width: m ? "260px" : "500px",
            height: m ? "260px" : "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.42) 0%, rgba(126, 34, 206, 0.18) 45%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.8,
          }}
        />

        
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "5%",
            right: "18%",
            width: m ? "290px" : "520px",
            height: m ? "290px" : "520px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.38) 0%, rgba(5, 150, 105, 0.15) 50%, transparent 70%)",
            filter: "blur(70px)",
            opacity: 0.75,
          }}
        />

        
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="prism-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2BA70" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <line x1="0" y1="20%" x2="100%" y2="80%" stroke="url(#prism-grad)" strokeWidth="1.5" />
          <line x1="0" y1="80%" x2="100%" y2="20%" stroke="url(#prism-grad)" strokeWidth="1.5" />
          <circle cx="50%" cy="45%" r="320" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 8" />
        </svg>
      </div>

      
      <div style={{ maxWidth: m ? "100%" : "960px", width: "100%", margin: "0 auto", position: "relative", zIndex: 10 }}>

        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: m ? "2rem" : "1.8rem", textAlign: m ? "center" : "left" }}
        >
          
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "6px 16px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              borderTop: "1px solid rgba(255, 255, 255, 0.45)",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.35)",
              marginBottom: "0.85rem",
            }}
          >
            <Sparkles size={13} color="#E2BA70" />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#E2BA70",
              }}
            >
              Experiencia Inmersiva · Diálogo
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: m ? "2.6rem" : "clamp(2.1rem, 2.8vw, 2.6rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#F8FAFC",
              margin: "0 0 0.5rem",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            Conversa cos <span style={{ color: "#E2BA70", fontStyle: "italic", textShadow: "0 0 35px rgba(226,186,112,0.4)" }}>Personaxes</span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: m ? "0.95rem" : "0.98rem",
              lineHeight: 1.55,
              color: "rgba(226, 232, 240, 0.8)",
              maxWidth: "580px",
              margin: m ? "0 auto" : "0",
              fontWeight: 300,
            }}
          >
            Pregúntalles directamente sobre o desterro, os segredos familiares e as fotos corsarias.
            Respostas auténticas construídas dende o texto real da novela.
          </p>
        </motion.div>

        
        {m && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "14px",
              marginBottom: "1.25rem",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {CHARACTERS.map((c, i) => {
              const active = charIdx === i;
              return (
                <motion.button
                  key={c.id}
                  onClick={() => changeChar(i)}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 14px",
                    borderRadius: "20px",
                    background: active
                      ? `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 100%)`
                      : "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: active ? `1px solid ${c.color}` : "1px solid rgba(255, 255, 255, 0.12)",
                    borderTop: active ? "1px solid rgba(255, 255, 255, 0.6)" : "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: active
                      ? `0 10px 25px -4px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.4)`
                      : "0 6px 16px rgba(0,0,0,0.25)",
                    color: active ? "#FFFFFF" : "rgba(226, 232, 240, 0.7)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div style={{ position: "relative", width: "32px", height: "32px", flexShrink: 0 }}>
                    <img
                      src={c.avatar}
                      alt={c.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: active ? `2px solid ${c.color}` : "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                    {active && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-1px",
                          right: "-1px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#22C55E",
                          boxShadow: "0 0 8px #22C55E",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.98rem", fontWeight: 600, color: active ? c.color : "#FFFFFF" }}>
                      {c.name.split(" ")[0]}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", opacity: 0.75 }}>
                      {c.role.split(" ")[0]}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 25 }}
          animate={v ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: m ? "1fr" : "250px 1fr",
            gap: "0",
            borderRadius: m ? "24px" : "26px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderTop: "1px solid rgba(255, 255, 255, 0.38)",
            boxShadow: "0 30px 90px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 0 35px rgba(255, 255, 255, 0.015)",
            overflow: "hidden",
            height: m ? "auto" : "510px",
            minHeight: m ? "560px" : "510px",
            maxHeight: m ? "none" : "510px",
          }}
        >
          
          {!m && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                padding: "14px 12px",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "8px",
                  paddingLeft: "4px",
                }}
              >
                <Compass size={13} color="#E2BA70" />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(226, 232, 240, 0.6)",
                  }}
                >
                  Elixe Protagonista
                </span>
              </div>

              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {CHARACTERS.map((c, i) => {
                  const active = charIdx === i;
                  return (
                    <motion.button
                      key={c.id}
                      onClick={() => changeChar(i)}
                      whileHover={{ x: 3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 10px",
                        borderRadius: "14px",
                        textAlign: "left",
                        background: active
                          ? `linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%)`
                          : "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: active ? `1px solid ${c.color}70` : "1px solid rgba(255, 255, 255, 0.08)",
                        borderTop: active ? "1px solid rgba(255, 255, 255, 0.5)" : "1px solid rgba(255, 255, 255, 0.14)",
                        boxShadow: active
                          ? `0 10px 24px -5px ${c.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.35)`
                          : "0 3px 8px rgba(0,0,0,0.12)",
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div style={{ position: "relative", width: "34px", height: "34px", flexShrink: 0 }}>
                        <img
                          src={c.avatar}
                          alt={c.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: active ? `2px solid ${c.color}` : "1.5px solid rgba(255,255,255,0.18)",
                            boxShadow: active ? `0 0 12px ${c.color}50` : "none",
                          }}
                        />
                        {active && (
                          <span
                            style={{
                              position: "absolute",
                              bottom: "0px",
                              right: "0px",
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#22C55E",
                              boxShadow: "0 0 8px #22C55E",
                              border: "1.5px solid #0F172A",
                            }}
                          />
                        )}
                      </div>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "0.96rem",
                            fontWeight: 600,
                            color: active ? c.color : "#F8FAFC",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: 1.15,
                          }}
                        >
                          {c.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "10px",
                            color: active ? "rgba(248, 250, 252, 0.85)" : "rgba(226, 232, 240, 0.5)",
                            marginTop: "1px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {c.role}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              
              <div
                style={{
                  marginTop: "auto",
                  padding: "8px 10px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.22)",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                  <ShieldCheck size={12} color="#E2BA70" />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9.5px", color: "#E2BA70", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Voz Literaria
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.75rem",
                    lineHeight: 1.38,
                    color: "rgba(248, 250, 252, 0.8)",
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {char.quote}
                </p>
              </div>
            </div>
          )}

          
          <div style={{ display: "flex", flexDirection: "column", minHeight: m ? "560px" : "0", height: "100%", overflow: "hidden" }}>

            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: m ? "14px 16px" : "10px 18px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ position: "relative", width: m ? "38px" : "34px", height: m ? "38px" : "34px" }}>
                  <img
                    src={char.avatar}
                    alt={char.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: `2px solid ${char.color}`,
                      boxShadow: `0 0 14px ${char.glow}`,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#22C55E",
                      boxShadow: "0 0 8px #22C55E",
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: m ? "1.15rem" : "1.15rem",
                      fontWeight: 600,
                      color: "#F8FAFC",
                      lineHeight: 1.1,
                    }}
                  >
                    {char.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      color: char.color,
                      marginTop: "1px",
                      fontWeight: 500,
                    }}
                  >
                    {char.alias}
                  </div>
                </div>
              </div>

              
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const lastMsg = [...msgs].reverse().find((m) => m.role === "assistant");
                  if (lastMsg) speakText(lastMsg.content);
                }}
                disabled={msgs.length === 0}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: m ? "7px 12px" : "5px 12px",
                  borderRadius: "9999px",
                  background: speaking
                    ? `linear-gradient(135deg, ${char.color}40, ${char.color}15)`
                    : "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: speaking ? `1px solid ${char.color}` : "1px solid rgba(255, 255, 255, 0.14)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.35)",
                  boxShadow: speaking ? `0 0 16px ${char.glow}` : "0 3px 8px rgba(0,0,0,0.18)",
                  color: speaking ? char.color : "rgba(248, 250, 252, 0.8)",
                  cursor: msgs.length === 0 ? "not-allowed" : "pointer",
                  opacity: msgs.length === 0 ? 0.4 : 1,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  transition: "all 0.25s ease",
                }}
              >
                {speaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span>{speaking ? "Pausar" : "Voz literaria"}</span>
              </motion.button>
            </div>

            
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: m ? "16px 14px" : "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.15) transparent",
              }}
            >
              
              {msgs.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    padding: m ? "2rem 1rem" : "1.2rem 1rem",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      width: m ? "72px" : "54px",
                      height: m ? "72px" : "54px",
                      borderRadius: "50%",
                      padding: "3px",
                      background: `linear-gradient(135deg, ${char.color}60, rgba(255,255,255,0.1))`,
                      boxShadow: `0 15px 30px -8px ${char.glow}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                      marginBottom: "0.7rem",
                    }}
                  >
                    <img
                      src={char.avatar}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        filter: "brightness(0.9)",
                      }}
                    />
                  </motion.div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: m ? "1.5rem" : "1.35rem",
                      fontWeight: 600,
                      color: "#F8FAFC",
                      margin: "0 0 4px",
                    }}
                  >
                    Conversa con {char.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: m ? "0.95rem" : "0.86rem",
                      color: "rgba(226, 232, 240, 0.7)",
                      maxWidth: "420px",
                      margin: "0 auto 0.9rem",
                      lineHeight: 1.45,
                    }}
                  >
                    «{char.quote}»
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.6rem" }}>
                    <MessageSquare size={12} color="#E2BA70" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#E2BA70", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
                      Suxestións de preguntas
                    </span>
                  </div>

                  
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      justifyContent: "center",
                      maxWidth: "480px",
                    }}
                  >
                    {char.suggestions.map((s, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => send(s)}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          fontWeight: 400,
                          padding: "5px 12px",
                          borderRadius: "9999px",
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                          backdropFilter: "blur(18px)",
                          WebkitBackdropFilter: "blur(18px)",
                          border: `1px solid rgba(255, 255, 255, 0.14)`,
                          borderTop: "1px solid rgba(255, 255, 255, 0.32)",
                          boxShadow: "0 3px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
                          color: "#E2E8F0",
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                        }}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              
              <AnimatePresence>
                {msgs.map((msg, i) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: "flex",
                        justifyContent: isUser ? "flex-end" : "flex-start",
                        gap: "8px",
                        alignItems: "flex-end",
                      }}
                    >
                      
                      {!isUser && (
                        <img
                          src={char.sticker}
                          alt=""
                          style={{
                            width: m ? "36px" : "28px",
                            height: m ? "36px" : "28px",
                            objectFit: "contain",
                            flexShrink: 0,
                            marginBottom: "2px",
                            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))",
                          }}
                        />
                      )}

                      <div
                        style={{
                          maxWidth: m ? "84%" : "78%",
                          padding: m ? "12px 16px" : "9px 14px",
                          borderRadius: isUser ? "18px 18px 5px 18px" : "18px 18px 18px 5px",
                          background: isUser
                            ? `linear-gradient(135deg, rgba(226, 186, 112, 0.28) 0%, rgba(226, 186, 112, 0.10) 100%)`
                            : `linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)`,
                          backdropFilter: "blur(24px)",
                          WebkitBackdropFilter: "blur(24px)",
                          border: isUser ? `1px solid rgba(226, 186, 112, 0.45)` : `1px solid rgba(255, 255, 255, 0.18)`,
                          borderTop: isUser ? `1px solid rgba(255, 255, 255, 0.45)` : `1px solid rgba(255, 255, 255, 0.35)`,
                          boxShadow: isUser
                            ? `0 8px 24px -5px rgba(0, 0, 0, 0.4), 0 0 18px ${char.color}15, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                            : `0 8px 24px -5px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: m ? "0.92rem" : "0.89rem",
                            lineHeight: 1.55,
                            color: "#F8FAFC",
                            margin: 0,
                            fontWeight: 300,
                            wordBreak: "break-word",
                          }}
                        >
                          {msg.content}
                        </p>

                        {!isUser && (
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                            <button
                              onClick={() => speakText(msg.content)}
                              style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                color: char.color,
                                fontSize: "10px",
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 600,
                                opacity: 0.9,
                              }}
                            >
                              <Volume2 size={12} />
                              <span>{speaking ? "Pausar" : "Reproducir voz"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}
                >
                  <img
                    src={char.avatar}
                    alt=""
                    style={{
                      width: m ? "32px" : "26px",
                      height: m ? "32px" : "26px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: `1.5px solid ${char.color}`,
                    }}
                  />
                  <div
                    style={{
                      padding: "8px 14px",
                      borderRadius: "16px 16px 16px 5px",
                      background: "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.35)",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.22)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                      {[0, 1, 2].map((j) => (
                        <motion.div
                          key={j}
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: char.color,
                            boxShadow: `0 0 7px ${char.color}`,
                          }}
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.25, 0.8] }}
                          transition={{ duration: 1.1, repeat: Infinity, delay: j * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(239, 68, 68, 0.12)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "#FCA5A5",
                  }}
                >
                  {error}
                </div>
              )}

              <div ref={endRef} />
            </div>

            
            <div
              style={{
                padding: m ? "14px 16px" : "10px 18px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
              }}
            >
              <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder={`Escríbelle a ${char.name}...`}
                  style={{
                    flex: 1,
                    padding: m ? "13px 18px" : "9px 16px",
                    borderRadius: "16px",
                    background: "rgba(10, 14, 24, 0.55)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.28)",
                    color: "#F8FAFC",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: m ? "14px" : "13.5px",
                    fontWeight: 300,
                    outline: "none",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)",
                    transition: "all 0.25s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = char.color;
                    e.target.style.boxShadow = `0 0 20px ${char.glow}, inset 0 2px 4px rgba(0,0,0,0.4)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.14)";
                    e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.4)";
                  }}
                />

                
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: m ? "13px 18px" : "9px 18px",
                    borderRadius: "16px",
                    background: input.trim()
                      ? `linear-gradient(135deg, ${char.color}50 0%, ${char.color}20 100%)`
                      : "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: input.trim() ? `1px solid ${char.color}80` : "1px solid rgba(255, 255, 255, 0.1)",
                    borderTop: input.trim() ? "1px solid rgba(255, 255, 255, 0.6)" : "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: input.trim() ? `0 10px 25px -4px ${char.glow}, inset 0 1px 0 rgba(255,255,255,0.4)` : "none",
                    color: input.trim() ? "#FFFFFF" : "rgba(226, 232, 240, 0.4)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  <span>Enviar</span>
                  <Send size={13} />
                </motion.button>
              </div>

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  color: "rgba(226, 232, 240, 0.4)",
                  marginTop: "5px",
                  paddingLeft: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Preme Enter para enviar · Conversa literaria co personaxe</span>
                <span style={{ opacity: 0.7 }}>v54.1.0</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
