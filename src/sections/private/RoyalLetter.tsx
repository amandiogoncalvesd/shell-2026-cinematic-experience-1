import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { amandioLetter } from "../../data/content";

/* ─────────────────────────────────────────────────────────────
   O LIVRO — a carta original do Amândio, transformada numa
   experiência: um livro encantado que se abre e escreve sozinho,
   palavra por palavra, como no dia em que foi criada.
───────────────────────────────────────────────────────────── */
export default function RoyalLetter() {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const full = amandioLetter.paragraphs.join("\n\n");

  // A máquina de escrever começa quando o livro se abre.
  useEffect(() => {
    if (!open) return;
    let i = 0;
    const start = setTimeout(() => {
      const t = setInterval(() => {
        i += 3;
        if (i >= full.length) {
          setTyped(full);
          setDone(true);
          clearInterval(t);
        } else {
          setTyped(full.slice(0, i));
        }
      }, 22);
      (scrollRef.current as any).__timer = t;
    }, 1600);
    return () => {
      clearTimeout(start);
      const t = (scrollRef.current as any)?.__timer;
      if (t) clearInterval(t);
    };
  }, [open, full]);

  // Acompanha a escrita com scroll automático.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [typed]);

  // Tocar na página enquanto escreve completa a carta num instante.
  const skip = () => {
    if (open && !done) {
      const t = (scrollRef.current as any)?.__timer;
      if (t) clearInterval(t);
      setTyped(full);
      setDone(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ perspective: "1400px" }} className="relative">
        <motion.div
          className="relative h-[480px] w-[340px] cursor-pointer select-none sm:w-[380px]"
          style={{ transformStyle: "preserve-3d" }}
          onClick={() => !open && setOpen(true)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Página interior */}
          <div
            ref={scrollRef}
            onClick={skip}
            className="royal-frame absolute inset-0 overflow-y-auto rounded-2xl bg-[#071a33]/95 px-8 py-10 backdrop-blur-sm"
          >
            <div className={`transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}>
              <h3
                className="text-center text-4xl text-shell-sky"
                style={{ fontFamily: "'Great Vibes', cursive", textShadow: "0 0 24px rgba(135,195,227,.5)" }}
              >
                Para Shelcia
              </h3>
              <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-shell-lavender/80">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-shell-sky/60" />
                <span className="text-xs">✦ 🌸 ✦</span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-shell-sky/60" />
              </div>
              <p
                className="mt-6 whitespace-pre-wrap text-[15px] leading-8 text-[#cfe6f5]/90"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {typed}
                {open && !done && <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-shell-sky align-middle" />}
              </p>
              {done && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="mt-8 text-center text-[11px] uppercase tracking-[0.35em] text-shell-sky/60"
                >
                  ✦ Com amor, no dia especial dela ✦
                </motion.p>
              )}
            </div>
          </div>

          {/* Capa */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-shell-sky/40"
            style={{
              transformOrigin: "left center",
              background: "linear-gradient(135deg, #3e4e90 0%, #5a75c2 55%, #87c3e3 100%)",
              boxShadow: "8px 8px 40px rgba(2,10,24,.7), inset -4px 0 12px rgba(0,0,0,.25)",
            }}
            animate={{ rotateY: open ? -162 : 0 }}
            transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/25" />
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/35 to-transparent" />
            <div className="relative z-10 px-8 text-center">
              <h3
                className="text-5xl leading-tight text-white"
                style={{ fontFamily: "'Great Vibes', cursive", textShadow: "0 2px 20px rgba(0,0,0,.35), 0 0 60px rgba(191,228,247,.55)" }}
              >
                Para
                <br />
                Shelcia
              </h3>
              <p className="mt-3 text-xs italic tracking-[0.2em] text-white/80">— uma carta especial —</p>
              <motion.div
                className="mt-6 text-4xl"
                animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🌹
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicação */}
      <motion.p
        className={`mt-6 text-[11px] uppercase tracking-[0.35em] transition-opacity duration-500 ${
          open ? "opacity-0" : "animate-pulse-glow opacity-100"
        } text-shell-sky/70`}
      >
        ✦ Toca no livro para abrir ✦
      </motion.p>
      {open && !done && (
        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ocean-200/40">
          toca na página para revelar tudo
        </p>
      )}
    </div>
  );
}
