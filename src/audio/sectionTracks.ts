// Cada secção do Universo tem a sua melodia. Quando a música já está a tocar
// (a utilizadora deu play), navegar entre secções troca suavemente de faixa —
// e as fotografias aceleram/trocam ao ritmo da energia da música (via `energy`).
export const SECTION_TRACKS: Record<string, number> = {
  "p-home": 0, // Experience — a melodia favorita
  "p-memorias": 1, // Photograph
  "p-historias": 1, // Photograph
  "p-amigos": 2, // Perfect
  "p-cartas": 4, // Wicked Game
  "p-natureza": 3, // Golden Hour
  "p-livros": 6, // Solas
  "p-arte": 6, // Solas
  "p-videos": 5, // Interstellar
  "p-sonhos": 5, // Interstellar
  "p-ceu": 4, // Wicked Game
};
