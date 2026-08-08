import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./effects";

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-shell-sky">
      <span className="h-px w-6 bg-shell-sky/70" />
      {children}
      <span className="animate-sparkle text-[9px] text-shell-lavender">✦</span>
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  light = false,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {kicker && <Kicker>{kicker}</Kicker>}
        <h2
          className={`mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl ${
            light ? "text-white" : "glow-shell"
          }`}
        >
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-base leading-relaxed text-[#b9d9ec]/75 sm:text-lg">{subtitle}</p>}
      </div>
    </Reveal>
  );
}

export function GlassButton({
  children,
  onClick,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "solid";
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition ${
        variant === "solid" ? "btn-royal" : "glass text-ocean-50 hover:bg-white/10"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function Chip({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-widest transition ${
        active
          ? "border-shell-sky bg-shell-sky/20 text-white"
          : "border-white/10 text-[#b9d9ec]/70 hover:border-shell-sky/50 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
