import { useCallback, useEffect, useRef, useState } from "react";
import "./CelebrationFilm.css";

const DURATION = 60;
const chapters = [
  { at: 0, title: "Tudo começa\ncom um sonho.", tag: "SHELL 2026 · UM FILME PARA SHELCIA" },
  { at: 10, title: "Um brilho\nque é só teu.", tag: "CAPÍTULO I · A TUA LUZ" },
  { at: 20, title: "De cada memória,\nnasce um universo.", tag: "CAPÍTULO II · MEMÓRIAS" },
  { at: 30, title: "Amizades que\nse tornam casa.", tag: "CAPÍTULO III · QUEM CAMINHA CONTIGO" },
  { at: 40, title: "Dezoito anos.\nE infinitas possibilidades.", tag: "CAPÍTULO IV · O QUE VEM A SEGUIR" },
  { at: 51, title: "A Cinderela\ncresceu.", tag: "10 DE AGOSTO · O TEU PRÓXIMO CAPÍTULO" },
];
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (v: number) => { const x = clamp(v); return x * x * (3 - 2 * x); };

/** A seek(t) renderer: every frame is derived only from absolute film time. */
function drawFrame(canvas: HTMLCanvasElement, t: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#061326"); g.addColorStop(.52, "#111c3c"); g.addColorStop(1, "#241a3b");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  const beat = t * Math.PI * 2 / 4;
  const cx = w * (.5 + Math.sin(t * .09) * .12), cy = h * (.47 + Math.cos(t * .07) * .08);
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * .62);
  glow.addColorStop(0, "rgba(135,195,227,.25)"); glow.addColorStop(.4, "rgba(90,117,194,.1)"); glow.addColorStop(1, "rgba(3,10,27,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
  // Deterministic star field, with gentle orbital motion and an occasional shimmer.
  for (let i = 0; i < 100; i++) {
    const seed = i * 127.1 + 311.7;
    const x = ((Math.sin(seed) * 43758.5453) % 1 + 1) % 1 * w;
    const y = ((Math.sin(seed * 1.7) * 24634.6345) % 1 + 1) % 1 * h;
    const r = .6 + (i % 4) * .38;
    ctx.globalAlpha = .2 + .5 * (.5 + .5 * Math.sin(beat + i * 2.1));
    ctx.fillStyle = i % 7 === 0 ? "#e9c5e7" : "#c6e9ff";
    ctx.beginPath(); ctx.arc((x + t * (i % 3 + 1) * .5) % w, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  // Concentric portal rings are part of the visual motif, not decoration alone.
  for (let i = 0; i < 5; i++) {
    const r = Math.min(w, h) * (.12 + i * .075) + Math.sin(beat + i) * 5;
    ctx.strokeStyle = `rgba(178,216,244,${.16 - i * .018})`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(cx, cy, r * 1.18, r, -.12 + Math.sin(t * .15) * .04, 0, Math.PI * 2); ctx.stroke();
  }
  // Fine cinematic grain, deterministic and low contrast.
  ctx.fillStyle = "rgba(255,255,255,.025)";
  for (let i = 0; i < 260; i++) {
    const x = ((i * 73 + Math.floor(t * 8) * 17) % 997) / 997 * w;
    const y = ((i * 191 + Math.floor(t * 8) * 31) % 991) / 991 * h;
    ctx.fillRect(x, y, 1, 1);
  }
  const chapter = [...chapters].reverse().find(c => t >= c.at) || chapters[0];
  const index = chapters.indexOf(chapter);
  const local = t - chapter.at;
  const intro = ease(local / 1.1), outro = index < chapters.length - 1 ? ease((chapter.at + (index === 4 ? 11 : 10) - t) / 1.1) : 1;
  const alpha = Math.min(intro, outro);
  const titleSize = Math.min(68, Math.max(36, w * .066));
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.globalAlpha = alpha * .86; ctx.font = `500 ${Math.max(10, w * .011)}px Inter, sans-serif`;
  ctx.letterSpacing = `${Math.max(2, w * .004)}px`; ctx.fillStyle = "#b7d9ee";
  ctx.fillText(chapter.tag, w / 2, h * .36);
  ctx.globalAlpha = alpha; ctx.font = `600 ${titleSize}px 'Playfair Display', Georgia, serif`;
  ctx.letterSpacing = "0px"; ctx.fillStyle = "#f3f1ff";
  const lines = chapter.title.split("\n");
  lines.forEach((line, i) => ctx.fillText(line, w / 2, h * .47 + (i - (lines.length - 1) / 2) * titleSize * 1.18 + (1 - intro) * 22));
  ctx.globalAlpha = alpha * .7; ctx.font = `italic ${Math.max(13, w * .018)}px 'Cormorant Garamond', Georgia, serif`;
  ctx.fillStyle = "#d8c5e4";
  const subtitle = index === 5 ? "Este universo é teu. Feliz aniversário, Shelcia." : "Uma história feita de luz, amor e possibilidades.";
  ctx.fillText(subtitle, w / 2, h * .67);
  ctx.globalAlpha = 1;
  // Letterbox treatment.
  const bar = Math.max(18, h * .055); ctx.fillStyle = "rgba(1,5,16,.58)";
  ctx.fillRect(0, 0, w, bar); ctx.fillRect(0, h - bar, w, bar);
}

export default function CelebrationFilm({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [sound, setSound] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const timeRef = useRef(0);
  timeRef.current = time;

  const render = useCallback((t: number) => { if (canvasRef.current) drawFrame(canvasRef.current, t); }, []);
  useEffect(() => {
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(.05, (now - prev) / 1000); prev = now;
      if (playing) {
        const next = Math.min(DURATION, timeRef.current + dt);
        timeRef.current = next; setTime(next); render(next);
        if (next >= DURATION) setPlaying(false);
      } else render(timeRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    const resize = () => render(timeRef.current);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); audioRef.current?.close(); };
  }, [playing, render]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.code === "Space") { e.preventDefault(); setPlaying(p => !p); } };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, [onClose]);
  const toggleSound = async () => {
    try {
      if (sound) { await audioRef.current?.suspend(); setSound(false); return; }
      const Audio = window.AudioContext;
      if (!Audio) { setAudioError(true); return; }
      if (audioRef.current) { await audioRef.current.resume(); setSound(true); return; }
      const ac = new Audio(); audioRef.current = ac; await ac.resume();
      // A restrained original ambient score, generated locally with Web Audio.
      const master = ac.createGain(); master.gain.value = .045; master.connect(ac.destination);
      const notes = [146.83, 174.61, 220, 261.63];
      notes.forEach((hz, i) => { const osc = ac.createOscillator(), gain = ac.createGain(); osc.type = "sine"; osc.frequency.value = hz; gain.gain.value = i === 0 ? .6 : .25; osc.connect(gain); gain.connect(master); osc.start(); });
      const lfo = ac.createOscillator(), lfoGain = ac.createGain(); lfo.frequency.value = .12; lfoGain.gain.value = .018; lfo.connect(lfoGain); lfoGain.connect(master.gain); lfo.start();
      setSound(true);
    } catch { setAudioError(true); }
  };
  const seek = (v: number) => { const next = Number(v); timeRef.current = next; setTime(next); render(next); if (next >= DURATION) setPlaying(false); };
  const currentChapter = [...chapters].reverse().find(c => time >= c.at) || chapters[0];
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020611] text-white" role="dialog" aria-label="Filme cinematográfico SHELL 2026">
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/65" />
    <button onClick={onClose} aria-label="Fechar filme" className="absolute right-5 top-5 z-10 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs uppercase tracking-[.22em] text-white/75 backdrop-blur transition hover:bg-white/15">Fechar ×</button>
    <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-7 pt-14 sm:px-12 sm:pb-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[.22em] text-white/55"><span>{currentChapter.tag}</span><span>{Math.floor(time / 60).toString().padStart(2,"0")}:{Math.floor(time % 60).toString().padStart(2,"0")} / 01:00</span></div>
        <input aria-label="Posição no filme" type="range" min="0" max={DURATION} step=".05" value={time} onChange={e => seek(Number(e.target.value))} className="film-seek mb-4 w-full" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><button onClick={() => { if (time >= DURATION) seek(0); setPlaying(p => !p); }} className="grid h-11 w-11 place-items-center rounded-full border border-shell-sky/40 bg-shell-sky/15 text-lg text-shell-sky transition hover:bg-shell-sky/30" aria-label={playing ? "Pausar" : "Reproduzir"}>{playing ? "Ⅱ" : "▶"}</button><span className="text-xs text-white/60">{playing ? "A tua história, em movimento" : "Em pausa"}</span></div>
          <div className="flex items-center gap-4"><button onClick={toggleSound} className="text-xs text-white/60 transition hover:text-white">{sound ? "♫ Som ligado" : "♫ Ativar som"}</button>{audioError && <span className="text-[10px] text-rose-200">Som indisponível neste navegador</span>}<span className="hidden text-[10px] uppercase tracking-[.18em] text-white/35 sm:inline">60 segundos · 6 capítulos</span></div>
        </div>
      </div>
    </div>
  </div>;
}
