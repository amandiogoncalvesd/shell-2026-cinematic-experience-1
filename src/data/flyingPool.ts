// Pool dos Posters Voadores — uma amostra de TODAS as categorias da Shelcia.
// Mantido leve (~30 fotos) para as texturas carregarem em segundos;
// o voo é infinito porque o componente recomeça do início em ciclo.
// A fotografia de destaque começa sempre no centro.
import {
  destaque18Photos,
  naturezaBosquesPhotos,
  naturezaFloresPhotos,
  naturezaPaisagensPhotos,
  arquiteturaSonhoPhotos,
  artTxtPhotos,
  frasesSeriePhotos,
} from "./media2026";
import { ruthCeremony, familyFriends2026, childhoodPublic, artMagic } from "./photos";
import { thumb } from "../utils/cloudinary";

const buildFlyingPool = () => {
  const hero = destaque18Photos[0];
  const all = [
    ...destaque18Photos.slice(1, 4),
    ...naturezaBosquesPhotos.slice(0, 3),
    ...naturezaFloresPhotos.slice(0, 3),
    ...naturezaPaisagensPhotos.slice(0, 3),
    ...arquiteturaSonhoPhotos.slice(0, 2),
    ...artTxtPhotos.slice(0, 2),
    ...frasesSeriePhotos.slice(0, 2),
    ...ruthCeremony.slice(0, 2),
    ...familyFriends2026.slice(0, 2),
    ...childhoodPublic.slice(0, 2),
    ...artMagic.slice(0, 2),
  ].map((u) => thumb(u, 400));
  // Intercala as categorias para o voo ser variado.
  const mixed = all.filter((_, i) => i % 2 === 0).concat(all.filter((_, i) => i % 2 === 1));
  const mid = Math.floor(mixed.length / 2);
  const withHero = [...mixed];
  withHero.splice(mid, 0, thumb(hero, 400));
  return withHero;
};

export const FLYING_ITEMS = buildFlyingPool();
