import { useState } from "react";
import { motion } from "framer-motion";
import { CanvasParticles, LiquidBlobs } from "../components/effects";
import { requestImmersiveFullscreen } from "../utils/fullscreen";

const VALID = ["10082026", "10/08", "1008", "shelcia18", "cinderela", "shelcia", "18082026"];

export default function AuthGate({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = value.trim().toLowerCase().replace(/\s+/g, "");
    setChecking(true);
    setTimeout(() => {
      if (VALID.includes(normalized)) {
        // O universo dela abre em tela cheia, sem distrações.
        requestImmersiveFullscreen();
        onSuccess();
      } else {
        setError(true);
        setChecking(false);
        setTimeout(() => setError(false), 700);
      }
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03101f] px-6">
      <div className="absolute inset-0">
        <img src="/images/crystal-texture.jpg" className="h-full w-full object-cover opacity-30" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/50 via-[#03101f]/80 to-[#03101f]" />
      </div>
      <LiquidBlobs />
      <CanvasParticles density={70} />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        animate={
          error
            ? { x: [0, -14, 14, -10, 10, -4, 4, 0], opacity: 1, y: 0 }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: error ? 0.55 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong shimmer-border relative z-10 w-full max-w-md rounded-3xl px-8 py-12 text-center"
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-ocean-200/40 text-3xl text-ocean-200">
          ❈
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-white">Entrada Privada</h1>
        <p className="mt-2 text-sm text-ocean-100/60">
          Este espaço pertence a Shelcia. Introduz a chave de acesso para entrar.
        </p>

        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Chave de acesso"
          className="mt-8 w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center text-sm tracking-widest text-white placeholder:text-ocean-200/40 outline-none focus:border-ocean-300/70"
        />
        <p className="mt-3 text-[11px] uppercase tracking-widest text-ocean-300/40">
          dica: a data do teu aniversário
        </p>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-rose-300">
            Chave incorreta. Tenta novamente, princesa.
          </motion.p>
        )}

        <button
          type="submit"
          disabled={checking}
          className="btn-royal mt-8 w-full rounded-full py-3 text-sm font-semibold uppercase tracking-widest transition hover:brightness-110 disabled:opacity-60"
        >
          {checking ? "A verificar…" : "Abrir o Portal"}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-xs uppercase tracking-widest text-ocean-200/50 transition hover:text-white"
        >
          ← Voltar ao portal
        </button>
      </motion.form>
    </div>
  );
}
