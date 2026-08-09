// SHELL 2026 — Pool de pré-carregamento.
// ~55% de todas as mídias da aplicação (principalmente imagens) são
// descarregadas ANTES da experiência abrir, para que tudo apareça
// instantaneamente. Os URLs são exatamente os mesmos que os componentes
// mostram depois (mesma resolução), para o browser usar a cache.
import * as P from "./photos";
import * as M from "./media2026";
import { videoPoster, videoRuthMoments, videoBackstage2026, videoTop } from "./videos";
import { thumb } from "../utils/cloudinary";

const local = [
  "/images/portal-bg.jpg",
  "/images/crystal-texture.jpg",
  "/images/sky-emotional.jpg",
  "/images/architect-blueprint.jpg",
];

// Heróis & molduras reais — resolução completa.
const fullRes = [
  ...P.featured,
  ...M.destaquePhotos,
  ...M.arquiteturaSonhoPhotos,
  ...M.naturezaPaisagensPhotos,
  ...M.naturezaFloresPhotos,
  ...M.naturezaBosquesPhotos,
  ...M.artTxtPhotos,
  ...M.frasesSeriePhotos,
  M.aniversarioMaePhoto,
  M.fraseBiblicaPhoto,
  M.bastidoresPhoto,
];

// Carrosséis & mosaicos — a mesma resolução (w_600) com que aparecem.
const carousels = [
  ...P.familyFriends2026,
  ...P.ruthCeremony.slice(0, 14),
  ...P.ruthMoments.slice(0, 24),
  ...P.memories,
  ...P.artMagic.slice(0, 20),
  ...P.childhoodPublic.slice(0, 10),
  ...P.chapters2023.slice(0, 10),
  ...P.familyFriendsAlbum.slice(0, 12),
  ...P.generic2026.slice(0, 15),
  ...P.backstage2026.slice(0, 10),
].map((s) => thumb(s, 600));

// Cartazes dos vídeos mais vistos.
const posters = [...videoRuthMoments.slice(0, 6), ...videoBackstage2026, ...videoTop.slice(0, 4)].map((s) =>
  videoPoster(s)
).filter(Boolean);

export const preloadImages: string[] = [...local, ...fullRes, ...carousels, ...posters];
