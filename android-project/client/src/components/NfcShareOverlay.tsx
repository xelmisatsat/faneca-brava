import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, Sparkles } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const CHARS = [
  { id:"concha",   name:"Concha Pereira",   alias:"A Faneca Brava",       role:"Protagonista", color:"#C8A96E", img:"assets/images/concha-portrait.webp",   traits:["Feroz","Rebelde","Libre","Xusticeira"],   quote:"Cando miro pola lente, deixo de ser a nena que collían. Por fin, son eu a que observa.",       desc:"Foxe a Barcelona onde se converte en paparazzi de éxito, usando a cámara como arma de vinganza contra os poderosos." },
  { id:"fernando", name:"Fernando Pereira", alias:"O Médico Atormentado", role:"Narrador",     color:"#6B8CAE", img:"assets/images/fernando-portrait.webp", traits:["Atormentado","Obsesivo","Culpable","Determinado"], quote:"Non podo durmir porque os ollos de Concha perséguenme cando pecho os meus.", desc:"Médico de Santiago que sofre de insomnio severo. Obsesionado con descubrir a verdade sobre a súa curmá Concha." },
  { id:"mama",     name:"Mamá Carme",       alias:"A Matriarca",          role:"Antagonista",  color:"#9A8A7A", img:"assets/images/carme-portrait.webp",    traits:["Despótica","Hipócrita","Fría","Autoritaria"],    quote:"O apelido é o que nos sustenta. Un nome limpo vale máis ca todo o ouro.", desc:"Matriarca que prioriza as aparencias sociais por riba do amor. Oculta monstros reais." },
  { id:"andreu",   name:"Andreu Picart",    alias:"O Fotógrafo Catalán",  role:"Confidente",   color:"#8B7355", img:"assets/images/andreu-portrait.webp",   traits:["Observador","Sabio","Melancólico","Leal"],        quote:"Concha non fotografaba para vivir. Fotografaba para vingarse.", desc:"Fotógrafo catalán que coñeceu a Concha en Barcelona. A ponte entre o pasado e o presente." },
  { id:"encarna",  name:"Encarna Pereira",  alias:"A Supervivente",       role:"Contrapunto",  color:"#7A6F8A", img:"manus-storage/encarna-portrait.jpg",   traits:["Calada","Resignada","Resiliente","Sombra"],       quote:"Eu quedei. Alguén tiña que quedar para que a casa non se derrubara.", desc:"Irmá de Concha. Mentres Concha foxe, Encarna resiste dende dentro coa submisión calculada." },
];

type Phase = "ring" | "book" | "char";

// Orb pulsante de fondo
function BgOrb({ color, x, y, size, delay }: { color:string; x:string; y:string; size:number; delay:number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.18, 0], scale: [0.5, 1.2, 0.8] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ position:"absolute", left:x, top:y, width:size, height:size,
               borderRadius:"50%", background:`radial-gradient(circle, ${color} 0%, transparent 70%)`,
               transform:"translate(-50%,-50%)", pointerEvents:"none" }}
    />
  );
}

// Anel de onda
function Ring({ i }: { i: number }) {
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0.8 }}
      animate={{ scale: 2.8 + i * 0.6, opacity: 0 }}
      transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
      style={{
        position:"absolute", inset:0, borderRadius:"50%",
        border: `${1.5 - i * 0.3}px solid rgba(200,169,110,${0.7 - i * 0.2})`,
      }}
    />
  );
}

// Partícula dourada
function Particle({ i }: { i: number }) {
  const angle = (i / 12) * 360;
  const r = 90 + Math.random() * 40;
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0],
                 x: Math.cos(angle * Math.PI / 180) * r,
                 y: Math.sin(angle * Math.PI / 180) * r }}
      transition={{ duration: 1.6, delay: i * 0.08, repeat: Infinity, ease: "easeOut" }}
      style={{ position:"absolute", width:5, height:5, borderRadius:"50%",
               background:"#C8A96E", left:"50%", top:"50%", marginLeft:-2.5, marginTop:-2.5 }}
    />
  );
}

function BookCover({ onTap }: { onTap: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, rotateY: -15 }}
      animate={{ y: [0, -14, 0], opacity: 1, rotateY: 0 }}
      transition={{ y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 }, rotateY: { duration: 0.7 } }}
      onClick={onTap}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      style={{ cursor:"pointer", perspective: 800 }}
    >
      <motion.div
        animate={{ rotateY: hover ? 8 : 0, scale: hover ? 1.04 : 1 }}
        transition={{ type:"spring", damping: 18 }}
        style={{
          width: 170, height: 240, borderRadius: 14, overflow:"hidden", position:"relative",
          background: "linear-gradient(150deg, #0d0d1a 0%, #12192e 60%, #0a0a14 100%)",
          border: "1px solid rgba(200,169,110,0.4)",
          boxShadow: hover
            ? "0 32px 80px rgba(0,0,0,0.8), 0 0 60px rgba(200,169,110,0.25), inset 0 1px 0 rgba(200,169,110,0.2)"
            : "0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(200,169,110,0.1)",
          transformStyle:"preserve-3d",
        }}
      >
        {/* Lomo */}
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:10,
                      background:"linear-gradient(180deg,#C8A96E,#6B4F10,#C8A96E)" }} />
        {/* Partículas */}
        {Array.from({length:12}).map((_,i) => <Particle key={i} i={i} />)}
        {/* Contido */}
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
                      alignItems:"center", justifyContent:"center", gap:14, padding:"0 18px" }}>
          <motion.img src="assets/images/logo-fb.webp" alt="FB"
            animate={{ rotate: hover ? [0,5,-5,0] : 0 }}
            transition={{ duration: 0.5 }}
            style={{ width:72, height:72, borderRadius:"50%", objectFit:"cover",
                     border:"2px solid rgba(200,169,110,0.6)",
                     boxShadow:"0 0 20px rgba(200,169,110,0.3)" }} />
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
                          fontSize:"1.2rem", color:"#EAE2D2", letterSpacing:"0.04em", lineHeight:1.15 }}>
              Faneca<br/>Brava
            </div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"8px",
                          letterSpacing:"0.28em", color:"#C8A96E88", textTransform:"uppercase", marginTop:6 }}>
              Manuel Portas
            </div>
          </div>
          <div style={{ width:"55%", height:1,
                        background:"linear-gradient(90deg,transparent,#C8A96E,transparent)" }} />
          <motion.div animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.4, repeat:Infinity }}
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"0.2em",
                     color:"rgba(200,169,110,0.65)", textTransform:"uppercase",
                     display:"flex", alignItems:"center", gap:5 }}>
            <Sparkles size={10} /> Revelar personaxe
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CharCard({ char, onClose }: { char: typeof CHARS[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type:"spring", damping:22, stiffness:200 }}
      onClick={e => e.stopPropagation()}
      style={{
        width:"min(400px, 92vw)", maxHeight:"80vh", borderRadius:24, overflow:"hidden",
        background:"linear-gradient(135deg, rgba(10,15,28,0.97) 0%, rgba(6,6,12,0.93) 100%)",
        backdropFilter:"blur(60px)",
        border:"1px solid rgba(255,255,255,0.09)",
        borderTop:"1px solid rgba(255,255,255,0.18)",
        boxShadow:`0 40px 100px rgba(0,0,0,0.85), 0 0 60px ${char.color}18`,
        display:"flex", flexDirection:"column",
      }}
    >
      {/* Imaxe */}
      <div style={{ position:"relative", height:220, flexShrink:0 }}>
        <motion.img src={char.img} alt={char.name}
          initial={{ scale:1.1 }} animate={{ scale:1 }} transition={{ duration:0.8 }}
          style={{ width:"100%", height:"100%", objectFit:"cover",
                   filter:"brightness(0.7) saturate(0.8)", display:"block" }} />
        <div style={{ position:"absolute", inset:0,
                      background:`linear-gradient(to bottom, transparent 30%, rgba(6,6,12,0.98) 100%)` }} />
        {/* Brillos laterais cor */}
        <div style={{ position:"absolute", inset:0,
                      background:`radial-gradient(ellipse at 0% 50%, ${char.color}15, transparent 60%)` }} />
        <button onClick={onClose} style={{
          position:"absolute", top:12, right:12, width:34, height:34, borderRadius:"50%",
          background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.18)",
          color:"#EAE2D2", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        }}><X size={15} /></button>
        {/* Badge */}
        <div style={{ position:"absolute", bottom:12, left:14,
          background:`${char.color}22`, backdropFilter:"blur(16px)",
          border:`1px solid ${char.color}40`, borderRadius:9999, padding:"3px 10px" }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9,
                         letterSpacing:"0.15em", color:char.color }}>{char.role}</span>
        </div>
        <div style={{ position:"absolute", bottom:12, right:14,
          background:"rgba(255,255,255,0.06)", backdropFilter:"blur(16px)",
          border:"1px solid rgba(255,255,255,0.12)", borderRadius:9999, padding:"3px 10px" }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9,
                         letterSpacing:"0.12em", color:"rgba(200,169,110,0.7)" }}>✦ NFC</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:"1.2rem 1.4rem 1.4rem", overflowY:"auto" }}>
        <motion.div initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15 }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
                       fontSize:"1.8rem", color:"#EAE2D2", lineHeight:1, margin:"0 0 3px" }}>
            {char.name}
          </h3>
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
                      fontSize:"0.88rem", color:char.color, margin:"0 0 1rem" }}>{char.alias}</p>
        </motion.div>

        <div style={{ height:1, background:`linear-gradient(90deg,transparent,${char.color}50,transparent)`, marginBottom:"1rem" }} />

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}
          style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.83rem",
                   lineHeight:1.85, color:"rgba(234,226,210,0.82)", margin:"0 0 1rem" }}>
          {char.desc}
        </motion.p>

        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:"1rem" }}>
          {char.traits.map(t => (
            <span key={t} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10,
              padding:"3px 9px", borderRadius:9999,
              background:`${char.color}12`, color:char.color, border:`1px solid ${char.color}28` }}>
              {t}
            </span>
          ))}
        </div>

        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
          style={{ padding:"11px 14px", borderRadius:12,
                   background:`${char.color}08`, borderLeft:`2px solid ${char.color}55` }}>
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
                      fontSize:"0.86rem", color:"#EAE2D2", lineHeight:1.75, margin:0 }}>
            "{char.quote}"
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function NfcShareOverlay() {
  const [visible, setVisible]   = useState(false);
  const [phase, setPhase]       = useState<Phase>("ring");
  const [char, setChar]         = useState<typeof CHARS[0] | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg]   = useState("");
  const listenerRef = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { default: Nfc } = await import("@/plugins/NfcSharePlugin");
        const avail = await Nfc.isAvailable();
        if (!alive) return;
        if (!avail.available || !avail.enabled) {
          if (avail.available && !avail.enabled) toast("Activa o NFC en Axustes para compartir personaxes");
          return;
        }
        await Nfc.startListening();
        const sub = await Nfc.addListener("nfcDetected", async () => {
          if (!alive) return;
          try { await Haptics.impact({ style: ImpactStyle.Heavy }); } catch (e) {}
          setChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
          setPhase("ring");
          setVisible(true);
        });
        listenerRef.current = sub;
      } catch { /* silencioso en web */ }
    })();
    return () => {
      alive = false;
      listenerRef.current?.remove();
      import("@/plugins/NfcSharePlugin").then(m => m.default.stopListening()).catch(() => {});
    };
  }, []);

  function toast(msg: string) {
    setToastMsg(msg); setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }

  useEffect(() => {
    if (!visible || phase !== "ring") return;
    const t = setTimeout(() => setPhase("book"), 1400);
    return () => clearTimeout(t);
  }, [visible, phase]);

  const close = () => { setVisible(false); setPhase("ring"); setChar(null); };

  const randChar = char;

  return createPortal(
    <>
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div key="toast"
            initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:50 }}
            style={{ position:"fixed", bottom:88, left:"50%", transform:"translateX(-50%)",
                     zIndex:99998, background:"rgba(10,15,28,0.95)", backdropFilter:"blur(20px)",
                     border:"1px solid rgba(200,169,110,0.28)", borderRadius:14,
                     padding:"11px 18px", display:"flex", alignItems:"center", gap:9,
                     boxShadow:"0 8px 32px rgba(0,0,0,0.5)", maxWidth:"88vw" }}>
            <motion.div animate={{ scale:[1,1.4,1] }} transition={{ duration:1.2, repeat:Infinity }}
              style={{ width:7, height:7, borderRadius:"50%", background:"#E8A87C", flexShrink:0 }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#EAE2D2" }}>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay principal */}
      <AnimatePresence>
        {visible && randChar && (
          <motion.div key="overlay"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.35 }}
            onClick={close}
            style={{ position:"fixed", inset:0, zIndex:99999,
                     display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>

            {/* Fondo */}
            <div style={{ position:"absolute", inset:0, background:"rgba(3,3,8,0.93)",
                          backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)" }} />

            {/* Orbs de cor de fondo */}
            <BgOrb color="#C8A96E" x="20%" y="25%" size={400} delay={0} />
            <BgOrb color="#1a2644" x="80%" y="70%" size={350} delay={1.2} />
            <BgOrb color={randChar.color} x="60%" y="30%" size={250} delay={2} />

            {/* Botón X */}
            <button onClick={close} style={{
              position:"absolute", top:22, right:22, zIndex:10,
              width:40, height:40, borderRadius:"50%",
              background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.14)",
              color:"#EAE2D2", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <X size={17} />
            </button>

            {/* Contido */}
            <div style={{ position:"relative", zIndex:5, display:"flex", flexDirection:"column",
                          alignItems:"center", gap:28 }} onClick={e => e.stopPropagation()}>

              {/* Header — só en fases ring/book */}
              <AnimatePresence mode="wait">
                {phase !== "char" && (
                  <motion.div key="hdr"
                    initial={{ opacity:0, y:-24, filter:"blur(6px)" }}
                    animate={{ opacity:1, y:0, filter:"blur(0px)" }}
                    exit={{ opacity:0, y:-12 }}
                    transition={{ duration:0.5 }}
                    style={{ textAlign:"center" }}>
                    <motion.div
                      animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}
                      style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:"0.35em",
                               textTransform:"uppercase", color:"#C8A96E", marginBottom:8 }}>
                      ✦ NFC Share · Faneca Brava ✦
                    </motion.div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
                                  fontSize:"clamp(1.6rem,5vw,2.4rem)", color:"#EAE2D2",
                                  letterSpacing:"-0.015em", lineHeight:1.1 }}>
                      {phase === "ring" ? "Sincronizando…" : "O teu destino agarda"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fases */}
              <AnimatePresence mode="wait">
                {phase === "ring" && (
                  <motion.div key="ring"
                    initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }}
                    exit={{ opacity:0, scale:1.6, filter:"blur(10px)" }}
                    transition={{ duration:0.5 }}
                    style={{ position:"relative", width:100, height:100,
                             display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {[0,1,2].map(i => <Ring key={i} i={i} />)}
                    {/* Logo central */}
                    <div style={{ width:60, height:60, borderRadius:"50%", position:"relative", zIndex:3,
                                  border:"1.5px solid rgba(200,169,110,0.5)",
                                  background:"rgba(200,169,110,0.07)",
                                  display:"flex", alignItems:"center", justifyContent:"center",
                                  boxShadow:"0 0 24px rgba(200,169,110,0.2)" }}>
                      <motion.img src="assets/images/logo-fb.webp" alt=""
                        animate={{ scale:[1,1.08,1] }} transition={{ duration:2, repeat:Infinity }}
                        style={{ width:42, height:42, borderRadius:"50%", objectFit:"cover", display:"block" }} />
                    </div>
                  </motion.div>
                )}

                {phase === "book" && (
                  <motion.div key="book"
                    initial={{ opacity:0, scale:0.6, y:40 }} animate={{ opacity:1, scale:1, y:0 }}
                    exit={{ opacity:0, scale:0.5, y:-30 }}
                    transition={{ type:"spring", damping:16, stiffness:160 }}>
                    <BookCover onTap={async () => {
                      try { await Haptics.impact({ style: ImpactStyle.Light }); } catch (e) {}
                      setPhase("char");
                    }} />
                  </motion.div>
                )}

                {phase === "char" && randChar && (
                  <motion.div key="char"
                    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                    <CharCard char={randChar} onClose={close} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicador pulsante */}
              {phase !== "char" && (
                <motion.div
                  initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 16px",
                           borderRadius:9999, background:"rgba(200,169,110,0.07)",
                           border:"1px solid rgba(200,169,110,0.18)" }}>
                  <motion.div animate={{ scale:[1,1.5,1], opacity:[0.6,1,0.6] }}
                    transition={{ duration:1.4, repeat:Infinity }}
                    style={{ width:7, height:7, borderRadius:"50%", background:"#C8A96E" }} />
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11,
                                 letterSpacing:"0.1em", color:"rgba(200,169,110,0.75)" }}>
                    {phase === "ring" ? "Conectando dispositivos…" : "Toca a portada para revelar"}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
