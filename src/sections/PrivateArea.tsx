import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import FloatingMusic from "../components/FloatingMusic";
import WelcomeModal from "../components/WelcomeModal";
import AppFooter from "../components/AppFooter";
import { LightboxHost } from "../components/media";
import { CursorGlow, FilmGrain, ScrollProgress, SectionDock } from "../components/effects";
import { useMusic } from "../audio/MusicProvider";
import { SECTION_TRACKS } from "../audio/sectionTracks";
import { audioTracks } from "../data/videos";
import { HomeSection, MemoriesSection, StoriesSection } from "./private/NarrativeSections";
import { FriendsSection, LettersSection } from "./private/PeopleSections";
import { LibrarySection, ArtSection } from "./private/CreativeSections";
import { CinemaSection, DreamsSection, SkySection, MusicSection } from "./private/FutureSections";
import { NaturezaSection } from "./private/NatureSections";
import ImmersiveGallery from "./private/ImmersiveGallery";
import NeuralPuzzlePage from "./private/NeuralPuzzlePage";
import CartaPage from "./private/CartaPage";
import ReliquiasPage from "./private/ReliquiasPage";
import TimelinePage from "./private/TimelinePage";

type PrivatePage = "universo" | "galeria" | "carta" | "puzzle" | "reliquias" | "timeline";

const PAGES = [
  { id: "universo", label: "O Universo", emblem: "❈", desc: "As tuas memórias, histórias e sonhos" },
  { id: "timeline", label: "Linha do Tempo", emblem: "⏳", desc: "Quatro eras, do começo aos 18" },
  { id: "galeria", label: "Galeria Imersiva", emblem: "✦", desc: "Fotografias e vídeos sempre em movimento" },
  { id: "carta", label: "A Carta", emblem: "🌹", desc: "Uma carta especial, palavra por palavra" },
  { id: "puzzle", label: "Neural Puzzle", emblem: "⬡", desc: "O teu jogo de memória e cristal" },
  { id: "reliquias", label: "Relíquias 2024", emblem: "💌", desc: "O cartão e a explosão — o começo de tudo" },
];

const SECTIONS = [
  { id: "p-home", label: "Home" },
  { id: "p-memorias", label: "Memórias" },
  { id: "p-historias", label: "Histórias" },
  { id: "p-amigos", label: "Amigos" },
  { id: "p-cartas", label: "Cartas" },
  { id: "p-natureza", label: "Natureza" },
  { id: "p-livros", label: "Livros" },
  { id: "p-arte", label: "Arte" },
  { id: "p-videos", label: "Cinema" },
  { id: "p-sonhos", label: "Sonhos" },
  { id: "p-ceu", label: "Céu" },
  { id: "p-musica", label: "Música" },
];

export default function PrivateArea({ onExit }: { onExit: () => void }) {
  const { energy, isPlaying, play } = useMusic();
  const playingRef = useRef(false);
  const [page, setPage] = useState<PrivatePage>("universo");
  const pendingScroll = useRef<string | null>(null);

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Músicas por secção: só troca de faixa quando ela já deu play —
  // e as fotos trocam ao ritmo da energia da música (via `energy`).
  useEffect(() => {
    if (page !== "universo") return;
    const observers: IntersectionObserver[] = [];
    Object.entries(SECTION_TRACKS).forEach(([id, idx]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && playingRef.current) {
            play(audioTracks[idx]);
          }
        },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [page, play]);

  const goPage = (id: string) => {
    setPage(id as PrivatePage);
    pendingScroll.current = null;
    window.scrollTo(0, 0);
  };

  // Âncoras: se vierem de outra página, volta ao Universo e desce até à secção.
  const goAnchor = (id: string) => {
    if (page !== "universo") {
      pendingScroll.current = id;
      setPage("universo");
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (page === "universo" && pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
      return () => clearTimeout(t);
    }
  }, [page]);

  return (
    <div className="relative bg-[#03101f]">
      <LightboxHost />
      <WelcomeModal
        storageKey="shell2026-welcome-private"
        title="Bem-vinda, Princesinha ✦"
        paragraphs={[
          "Este espaço foi criado completamente a pensar em ti — o teu universo aguarda por ti.",
          "A parte mais incrível desta aplicação é o filme digno da Disney criado para ti: o Photograph 2026.",
          "Espero que gostes desta aplicação tanto quanto eu gostei de criá-la para ti.",
        ]}
        navigation={[
          "Para navegar na aplicação, podes simplesmente deslizar para baixo ou usar a barra de navegação no canto superior direito.",
          "A aplicação está dividida em seis páginas — o Universo (esta), a Linha do Tempo, a Galeria Imersiva, A Carta, o Neural Puzzle Pro e as Relíquias de 2024 — podes ir a qualquer uma delas pelos menus da barra de navegação.",
          "O Neural Puzzle Pro mudou muito: agora começa no nível básico, com 4 peças, e vai até ao nível final de 12×12. Encontrá-lo-ás na barra de navegação.",
        ]}
      />
      {page === "universo" && <ScrollProgress />}
      <FilmGrain />
      <CursorGlow />
      {/* SwarmCursor guardado no código — pode voltar quando quisermos.
          <SwarmCursor overlay color="#87C3E3" accentColor="#D9B8E3" count={9}
            size={8} spread={90} speed={2.2} trail={0.7} className="z-[45]" /> */}
      <FloatingMusic />
      {page === "universo" && <SectionDock sections={SECTIONS} />}

      <Navbar
        sections={SECTIONS}
        pages={PAGES}
        activePage={page}
        onPage={goPage}
        onAnchor={goAnchor}
        brand="Shell 2026 · Shelcia"
        onExit={onExit}
        exitLabel="Sair"
      />

      <AnimatePresence mode="wait">
        {page === "universo" && (
          <motion.div
            key="universo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <HomeSection energy={energy} />
            <MemoriesSection energy={energy} />
            <StoriesSection />
            <FriendsSection />
            <LettersSection onOpenCarta={() => goPage("carta")} />
            <NaturezaSection energy={energy} />
            <LibrarySection />
            <ArtSection energy={energy} />
            <CinemaSection />
            <DreamsSection energy={energy} />
            <SkySection energy={energy} />
            <MusicSection />
          </motion.div>
        )}

        {page === "galeria" && (
          <motion.div
            key="galeria"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImmersiveGallery />
          </motion.div>
        )}

        {page === "carta" && (
          <motion.div
            key="carta"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <CartaPage />
          </motion.div>
        )}

        {page === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TimelinePage />
          </motion.div>
        )}

        {page === "reliquias" && (
          <motion.div
            key="reliquias"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ReliquiasPage />
          </motion.div>
        )}

        {page === "puzzle" && (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <NeuralPuzzlePage />
          </motion.div>
        )}
      </AnimatePresence>

      <AppFooter pages={PAGES} onSelect={(id) => goPage(id)} />
    </div>
  );
}
