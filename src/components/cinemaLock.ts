// ─────────────────────────────────────────────────────────────
// CINEMA LOCK — quando um vídeo é aberto, ele passa a ser a
// ÚNICA coisa a funcionar no sistema: os outros vídeos param,
// os carrosséis congelam, as partículas descansam e a música
// silencia-se. Nada atrapalha a reprodução.
// ─────────────────────────────────────────────────────────────
type Listener = (on: boolean) => void;

let active = false;
const listeners = new Set<Listener>();

export function setCinema(on: boolean) {
  if (active === on) return;
  active = on;
  listeners.forEach((l) => l(on));
}

export function isCinema() {
  return active;
}

export function onCinema(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
