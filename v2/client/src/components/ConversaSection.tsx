import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const CHARACTERS = [
  {
    id: "concha",
    name: "Concha Pereira",
    alias: "A Faneca Brava",
    role: "Protagonista",
    color: "#C8A96E",
    avatar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-concha-portrait-ZyBRp5FRRbMYRNpmNDvaVU.webp",
    sticker: "/manus-storage/sticker-concha_7276b1d9.png",
    voiceId: "SbxCN6LQhBInYaeKjhhW",
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
    role: "Narrador",
    color: "#6B8CAE",
    avatar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-fernando-portrait-EQpQqF6VEH5zWNhiMpjMkL.webp",
    sticker: "/manus-storage/sticker-fernando_e1828bc1.png",
    voiceId: "syjZiIvIUSwKREBfMpKZ",
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
    role: "Antagonista",
    color: "#9A8A7A",
    avatar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-mama-carme-f7k2dQYFH5zPEkXNWFnfCL.webp",
    sticker: "/manus-storage/sticker-mama_e022af0c.png",
    voiceId: "GszuzIPs4fVZTjP0EXrv",
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
    role: "Confidente",
    color: "#8B7355",
    avatar: "https://d2xsxph8kpxj0f.cloudfront.net/310519663643442601/erhsSpbuxQaSwrF6gHEwu3/faneca-andreu-VAxSfuAXwczWNcuCm2shyJ.webp",
    sticker: "/manus-storage/sticker-andreu_0cf93efc.png",
    voiceId: "4FMxnogu8ehUVsRIxx9H",
    suggestions: [
      "Como era Concha en Barcelona?",
      "Que eran as fotos corsarias?",
      "Que pasou ao final?",
      "Por que non a detiveches?",
    ],
  },
];

interface Msg { role: "user" | "assistant"; content: string; }

export default function ConversaSection() {
  const [v, setV] = useState(false);
  const m = useIsMobile();
  const [charIdx, setCharIdx] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { const t = setTimeout(() => setV(true), 80); return () => clearTimeout(t); }, []);

  const char = CHARACTERS[charIdx];
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Función para reproducir voz - usa ElevenLabs con fallback a Web Speech API
  const speakText = async (text: string) => {
    if (speaking) {
      window.speechSynthesis.cancel();
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    try {
      // Intentar ElevenLabs primeiro
      const r = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId: char.voiceId }),
      });
      if (r.ok && r.headers.get('content-type')?.includes('audio')) {
        const blob = await r.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => { setSpeaking(false); audioRef.current = null; };
        audio.play();
        return;
      }
    } catch {}
    // Fallback: Web Speech API (gratis, sempre funciona)
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'gl-ES'; // Galego
      utterance.rate = 0.9;
      utterance.pitch = char.id === 'mama' ? 1.1 : char.id === 'concha' ? 1.0 : 0.9;
      // Buscar voz española/galega
      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find(v => v.lang.startsWith('es') || v.lang.startsWith('gl'));
      if (esVoice) utterance.voice = esVoice;
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeaking(false);
    }
  };

  const send = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setError(null);
    const userMsg: Msg = { role: "user", content };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs);
    setInput("");
    setLoading(true);

    try {
      // Usar o proxy do servidor para evitar problemas de CORS e expor a key
      const r = await fetch("/api/chat", {
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
      setMsgs(p => [...p, { role: "assistant", content: data.reply || "..." }]);
    } catch (e: any) {
      console.error("Chat error:", e);
      setError(`Erro: ${e.message || "Non se puido conectar coa IA"}`);
      setMsgs(p => [...p, { role: "assistant", content: "Non podo falar agora... inténtao de novo." }]);
    }
    setLoading(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const changeChar = (idx: number) => {
    setCharIdx(idx);
    setMsgs([]);
    setInput("");
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const GS = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
    backdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderTop: '1px solid rgba(255,255,255,0.18)',
  };

  return (
    <section style={{ position: 'relative', padding: m ? '3rem 0 2rem' : '6rem 0 5rem', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 30%, rgba(26,39,68,0.2) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: m ? '0 1.25rem' : '0 4rem', position: 'relative', zIndex: 10 }}>

        {/* Cabeceira */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1rem' }}>
            <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}} transition={{ duration: 0.8 }} style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #C8A96E, transparent)', transformOrigin: 'left' }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8A96E' }}>IA — Personaxes</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.9, letterSpacing: '-0.025em', color: '#EAE2D2' }}>
            Fala cos <span style={{ color: '#C8A96E' }}>Personaxes</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: '#8B9BB4', maxWidth: '500px', marginTop: '1rem' }}>
            Cada personaxe está entrenado co texto real do libro. Responden en galego coa súa personalidade auténtica.
          </p>
        </motion.div>

        {/* Layout */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '260px 1fr', gap: '20px' }}>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B9BB4', marginBottom: '6px', paddingLeft: '4px' }}>Personaxe</div>
            {CHARACTERS.map((c, i) => (
              <motion.button key={c.id} onClick={() => changeChar(i)} whileHover={{ x: 3 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderRadius: '14px', textAlign: 'left',
                  background: charIdx === i ? `${c.color}18` : 'rgba(255,255,255,0.03)',
                  border: charIdx === i ? `1px solid ${c.color}35` : '1px solid rgba(255,255,255,0.06)',
                  cursor: 'none', transition: 'all 0.22s',
                }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={c.avatar} alt={c.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', filter: 'brightness(0.85)', border: charIdx === i ? `2px solid ${c.color}` : '2px solid rgba(255,255,255,0.1)' }} />
                  {charIdx === i && <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#4ADE80', border: '2px solid #08080D' }} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 300, color: charIdx === i ? c.color : '#EAE2D2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4', marginTop: '1px' }}>{c.role}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Chat */}
          <div style={{ ...GS, borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '520px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <img src={char.avatar} alt={char.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${char.color}`, filter: 'brightness(0.85)' }} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 300, color: '#EAE2D2' }}>{char.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: char.color }}>{char.alias}</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#4ADE80' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8B9BB4' }}>En liña</span>
              </div>
            </div>

            {/* Mensaxes */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {msgs.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '18px', padding: '2rem', textAlign: 'center' }}>
                  <img src={char.avatar} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', filter: 'brightness(0.65) grayscale(0.3)', border: `2px solid ${char.color}40` }} />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(139,155,180,0.65)', margin: 0 }}>
                    Pregúntalle algo a {char.name}...
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '440px' }}>
                    {char.suggestions.map((s, i) => (
                      <button key={i} onClick={() => send(s)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', padding: '7px 14px', borderRadius: '9999px', background: `${char.color}12`, border: `1px solid ${char.color}25`, color: char.color, cursor: 'none', transition: 'all 0.2s' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {msgs.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}
                  style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '10px', alignItems: 'flex-end' }}>
                  {msg.role === 'assistant' && <img src={char.sticker} alt="" style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0, marginBottom: '2px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />}
                  <div style={{
                    maxWidth: '72%', padding: '11px 16px',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.role === 'user' ? `linear-gradient(135deg, ${char.color}22, ${char.color}10)` : 'rgba(255,255,255,0.08)',
                    border: msg.role === 'user' ? `1px solid ${char.color}30` : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.93rem', lineHeight: 1.75, color: '#EAE2D2', margin: 0 }}>{msg.content}</p>
                    {msg.role === 'assistant' && (
                      <button onClick={() => speakText(msg.content)} style={{ marginTop: '8px', background: 'none', border: 'none', cursor: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: speaking ? char.color : '#8B9BB4', fontSize: '11px', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08"/></svg>
                        {speaking ? 'Pausar' : 'Escoitar'}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                  <img src={char.avatar} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', filter: 'brightness(0.8)', flexShrink: 0 }} />
                  <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      {[0,1,2].map(j => (
                        <motion.div key={j} style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: char.color }}
                          animate={{ opacity: [0.3,1,0.3], scale: [0.8,1.2,0.8] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: j * 0.2 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(200,60,60,0.1)', border: '1px solid rgba(200,60,60,0.2)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,120,120,0.8)' }}>
                  {error}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder={`Escríbelle a ${char.name}...`}
                  style={{
                    flex: 1, padding: '12px 18px', borderRadius: '14px',
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#EAE2D2', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
                    outline: 'none', cursor: 'text', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = `${char.color}50`}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  style={{
                    padding: '12px 20px', borderRadius: '14px',
                    background: input.trim() ? `linear-gradient(135deg, ${char.color}30, ${char.color}18)` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${input.trim() ? char.color + '40' : 'rgba(255,255,255,0.08)'}`,
                    color: input.trim() ? char.color : '#8B9BB4',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 400,
                    cursor: loading || !input.trim() ? 'not-allowed' : 'none',
                    opacity: loading || !input.trim() ? 0.5 : 1,
                    transition: 'all 0.25s', whiteSpace: 'nowrap',
                  }}
                >
                  Enviar ↵
                </button>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(139,155,180,0.3)', marginTop: '7px', paddingLeft: '4px' }}>
                Preme Enter para enviar · IA entrenada co texto real do libro
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
