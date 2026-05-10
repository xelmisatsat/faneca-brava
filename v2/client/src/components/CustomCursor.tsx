import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    // Detectar hovers en links e botóns
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea");
      setHovering(!!isInteractive);
    };
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <div className="custom-cursor" style={{ display: visible ? 'block' : 'none' }}>
      <motion.div
        className="cursor-dot fixed"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: hovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ left: -4, top: -4 }}
      />
      <motion.div
        className="cursor-ring fixed"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: hovering ? 1.5 : 1,
          opacity: hovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
        style={{ left: -20, top: -20 }}
      />
    </div>
  );
}
