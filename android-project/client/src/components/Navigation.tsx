import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero",       label: "Inicio" },
  { id: "sobre",      label: "Novela" },
  { id: "historia",   label: "Historia" },
  { id: "personaxes", label: "Personaxes" },
  { id: "galeria",    label: "Galería" },
  { id: "timeline",   label: "Cronoloxía" },
  { id: "arquivo",    label: "Análise" },
  { id: "libro",      label: "O Libro" },
  { id: "autor",      label: "O Autor" },
  { id: "conversa",   label: "IA" },
];

export default function Navigation() {
  const [active, setActive]   = useState("hero");
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", y => setVisible(y > 60));
  }, [scrollY]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.25 }
    );
    navItems.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* BARRA PÍLDORA FLOTANTE */}
      <motion.div
        className="fixed top-5 left-1/2 z-[1000]"
        style={{ translateX: "-50%" }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-pill flex items-center gap-1 px-4 py-2.5">
          {/* Logo con imaxe */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center justify-center p-1 mr-2 transition-all duration-300 hover:scale-110"
            style={{ cursor: 'none' }}
          >
            <img src="/assets/images/logo-fb.webp" alt="Faneca Brava Logo" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          </button>

          {/* Separador */}
          <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.15)', marginRight: '0.5rem' }} />

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative px-3 py-1.5 rounded-full font-body text-xs tracking-[0.08em] uppercase transition-all duration-300"
                style={{
                  color: active === item.id ? '#C8A96E' : 'rgba(234,226,210,0.5)',
                  backgroundColor: active === item.id ? 'rgba(200,169,110,0.12)' : 'transparent',
                  cursor: 'none',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Separador */}
          <div className="hidden md:block" style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.15)', margin: '0 0.5rem' }} />

          {/* Mercar */}
          <a
            href="https://www.galaxiagutenberg.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center glass-amber rounded-full px-4 py-1.5 font-body text-xs tracking-[0.12em] uppercase transition-all duration-300 hover:opacity-80"
            style={{ color: '#C8A96E', cursor: 'none', textDecoration: 'none', fontSize: '11px' }}
          >
            Mercar
          </a>

          {/* Menú móbil */}
          <button
            className="md:hidden flex flex-col gap-1.5 px-2 py-1"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: 'none' }}
          >
            <motion.span className="block w-5 h-px" style={{ backgroundColor: '#C8A96E' }} animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }} />
            <motion.span className="block w-3 h-px" style={{ backgroundColor: '#C8A96E' }} animate={{ opacity: menuOpen ? 0 : 1 }} />
            <motion.span className="block w-5 h-px" style={{ backgroundColor: '#C8A96E' }} animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }} />
          </button>
        </div>
      </motion.div>

      {/* MENÚ MÓBIL */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center md:hidden"
            style={{ backgroundColor: 'rgba(8,8,13,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-display text-3xl font-light py-3"
                style={{ color: active === item.id ? '#C8A96E' : '#EAE2D2', cursor: 'none' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* INDICADOR LATERAL */}
      <motion.div
        className="fixed right-7 top-1/2 -translate-y-1/2 z-[900] hidden xl:flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group flex items-center gap-2 justify-end"
            style={{ cursor: 'none' }}
            title={item.label}
          >
            <span
              className="font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
              style={{ color: '#8B9BB4', fontSize: '9px', letterSpacing: '0.15em' }}
            >
              {item.label}
            </span>
            <div
              className="transition-all duration-300 rounded-full"
              style={{
                width: active === item.id ? '20px' : '5px',
                height: active === item.id ? '2px' : '5px',
                backgroundColor: active === item.id ? '#C8A96E' : 'rgba(139,155,180,0.3)',
              }}
            />
          </button>
        ))}
      </motion.div>
    </>
  );
}

