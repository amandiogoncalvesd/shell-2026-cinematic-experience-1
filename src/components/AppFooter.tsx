import ElectricBorder from "./ElectricBorder";
import { universeQuote } from "../data/media2026";

/* ─────────────────────────────────────────────────────────────
   Rodapé premium — líquido, luminoso, com assinatura elétrica.
───────────────────────────────────────────────────────────── */
export default function AppFooter({
  pages,
  onSelect,
}: {
  pages?: { id: string; label: string; emblem: string }[];
  onSelect?: (id: string) => void;
}) {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-shell-sky/15">
      {/* Atmosfera */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-40 w-[36rem] -translate-x-1/2 rounded-full bg-shell-sky/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-24 w-64 rounded-full bg-shell-serenity/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-14 text-center">
        {/* Emblema */}
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-shell-sky/40 bg-shell-sky/10 text-xl text-shell-sky shadow-[0_0_30px_rgba(135,195,227,0.25)]">
          ❈
        </div>

        <p className="mt-5 font-display text-2xl font-semibold text-white">SHELL 2026</p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[#b9d9ec]/70">
          Shelcia Fernanda Neves Van-Dúnem
        </p>

        {/* A frase do universo */}
        <p className="mx-auto mt-6 max-w-md font-display text-sm italic leading-relaxed text-[#cfe6f5]/70">
          “{universeQuote.text}”
        </p>
        <p className="mt-1.5 text-[10px] uppercase tracking-[0.3em] text-shell-sky/70">— {universeQuote.author}</p>

        {/* Páginas */}
        {pages && pages.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect?.(p.id)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#b9d9ec]/65 transition hover:border-shell-sky/40 hover:text-white"
              >
                <span className="text-shell-sky/80">{p.emblem}</span> {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Assinatura com borda elétrica */}
        <div className="mt-10 flex justify-center">
          <ElectricBorder color="#87C3E3" speed={0.7} chaos={0.09} borderRadius={999}>
            <div className="rounded-full bg-[#061a33]/90 px-8 py-3.5">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#b9d9ec]/60">Designer by</p>
              <p className="mt-1 font-display text-lg font-semibold tracking-wide text-shell-sky">
                Amândio Gonçalves <span className="text-shell-lavender">✦</span>
              </p>
            </div>
          </ElectricBorder>
        </div>

        <p className="mt-8 text-[9px] uppercase tracking-[0.35em] text-[#b9d9ec]/35">
          10 de Agosto · A Cinderela cresceu
        </p>
      </div>
    </footer>
  );
}
