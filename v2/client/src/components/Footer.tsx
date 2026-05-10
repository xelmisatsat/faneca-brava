import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(13,27,42,0.3) 0%, rgba(8,8,13,1) 100%)'
      }} />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="font-accent italic" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#C8A96E', lineHeight: 1.5 }}>
            "A memoria nunca arde completamente."
          </p>
          <div className="divider-amber mx-auto mt-8" style={{ maxWidth: '180px' }} />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            {
              title: "O Libro",
              content: (
                <>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#8B9BB4' }}>
                    <strong style={{ color: '#C8A96E' }}>Faneca Brava</strong><br />
                    Manuel Portas<br />
                    Editorial Galaxia<br />
                    Novela en galego
                  </p>
                </>
              )
            },
            {
              title: "O Autor",
              content: (
                <p className="font-body text-sm leading-relaxed" style={{ color: '#8B9BB4' }}>
                  Manuel Portas é un escritor galego especializado na reconstrución histórica e social de Galicia a través da memoria familiar e os traumas xeracionais do franquismo.
                </p>
              )
            },
            {
              title: "Esta Experiencia",
              content: (
                <p className="font-body text-sm leading-relaxed" style={{ color: '#8B9BB4' }}>
                  Experiencia web inmersiva creada como homenaxe artístico á novela. Deseño cinematográfico, IA de personaxes entrenada co texto orixinal e narrativa interactiva.
                </p>
              )
            },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-display text-xl font-light mb-5" style={{ color: '#EAE2D2' }}>{col.title}</h4>
              {col.content}
            </div>
          ))}
        </motion.div>

        <div className="divider-amber" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-display text-3xl font-light tracking-[0.2em]" style={{ color: '#EAE2D2' }}>
            FANECA BRAVA
          </p>
          <p className="font-body text-xs" style={{ color: 'rgba(139,155,180,0.45)' }}>
            Experiencia inmersiva baseada na novela de Manuel Portas
          </p>
        </div>
      </div>
    </footer>
  );
}
