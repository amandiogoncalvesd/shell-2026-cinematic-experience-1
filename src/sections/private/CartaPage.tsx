import { useEffect } from "react";
import { motion } from "framer-motion";
import { requestImmersiveFullscreen } from "../../utils/fullscreen";

/* ─────────────────────────────────────────────────────────────
   A CARTA — página limpa, só dela. A experiência é exatamente
   a do livro original: estrelas, pétalas, o livro que se abre
   e a carta que se escreve sozinha — com a paleta do universo.
───────────────────────────────────────────────────────────── */
export default function CartaPage() {
  useEffect(() => {
    requestImmersiveFullscreen();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#03101f]">
      <section className="relative pb-4 pt-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="glow-shell font-display text-3xl font-semibold sm:text-4xl">
            Uma Carta Especial 🌹
          </h1>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-shell-sky/55">
            escrita palavra por palavra
          </p>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-6xl px-3 pb-14 sm:px-5"
      >
        <div className="royal-frame overflow-hidden rounded-3xl p-2">
          <iframe
            src="/a-carta.html?v=1"
            title="Uma carta especial para Shelcia"
            className="h-[82vh] w-full rounded-2xl border-0"
            allow="fullscreen"
          />
        </div>
      </motion.section>
    </div>
  );
}
