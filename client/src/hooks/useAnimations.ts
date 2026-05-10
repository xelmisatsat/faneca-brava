// Variantes de animación cinematográficas reutilizables
export const fadeUp = {
  hidden:  { opacity: 0, y: 60, filter: 'blur(4px)' },
  visible: (delay = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
  }),
};

export const fadeLeft = {
  hidden:  { opacity: 0, x: -80, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }
  }),
};

export const fadeRight = {
  hidden:  { opacity: 0, x: 80, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }
  }),
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
  }),
};

export const revealLine = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
  }),
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// Transición de páxina
export const pageTransition = {
  initial:  { opacity: 0, y: 30, scale: 0.98 },
  animate:  { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit:     { opacity: 0, y: -20, scale: 0.99,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
};
