// Mergulho cinematográfico: sempre que a Shelcia (ou um convidado) entra
// numa área, pedimos ao navegador para ocultar tudo o que distrai —
// barras do browser, barra do telemóvel — e ficar só o universo dela.
// É um pedido feito dentro do clique do utilizador (regra dos navegadores);
// quando o dispositivo não permite (ex.: iPhone), falha em silêncio.
export function requestImmersiveFullscreen() {
  try {
    const el = document.documentElement as any;
    if (el.requestFullscreen) {
      el.requestFullscreen({ navigationUI: "hide" } as any).catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  } catch {
    /* silencioso — a experiência continua normalmente */
  }
}
