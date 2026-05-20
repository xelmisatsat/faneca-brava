import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  sectionId: string;
  sectionLabel: string;
  children: React.ReactNode;
  direction: 1 | -1;
}

// Variantes de transición cinematográfica
const variants = {
  initial: { opacity: 0, y: 60, scale: 0.96, filter: 'blur(8px)' },
  animate: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0, y: -40, scale: 0.97, filter: 'blur(6px)',
    transition: { duration: 0.4, ease: 'easeIn' as const },
  },
};

// Cortina de transición (overlay que aparece brevemente)
const curtainVariants = {
  initial: { scaleY: 0, originY: 1 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
};

export function SectionCurtain({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="curtain"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5000,
            background: 'linear-gradient(180deg, rgba(8,8,13,1) 0%, rgba(13,27,42,0.95) 100%)',
            transformOrigin: 'bottom',
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default function PageTransition({ sectionId, sectionLabel, children, direction }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={sectionId}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

