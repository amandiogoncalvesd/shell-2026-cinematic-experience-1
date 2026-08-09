// Ajusta a largura de entrega de um URL Cloudinary já otimizado.
// As galerias densas (carrosséis, scroll-cinema) pedem uma resolução menor
// do que os heróis — isto reduz drasticamente o tempo de carregamento.
export function thumb(src: string, w: number): string {
  return src.replace(/w_\d+,/, `w_${w},`);
}
