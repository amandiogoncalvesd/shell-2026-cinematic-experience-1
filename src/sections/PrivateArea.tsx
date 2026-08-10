import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import FloatingMusic from "../components/FloatingMusic";
import { LightboxHost } from "../components/media";
import { CursorGlow, FilmGrain, ScrollProgress, SectionDock } from "../components/effects";
import { useMusic } from "../audio/MusicProvider";
import { audioTracks } from "../data/videos";
import { HomeSection, MemoriesSection, StoriesSection } from "./private/NarrativeSections";
import { FriendsSection, LettersSection } from "./private/PeopleSections";
import { LibrarySection, ArtSection } from "./private/CreativeSections";
import { CinemaSection, DreamsSection, SkySection, MusicSection } from "./private/FutureSections";
import { NaturezaSection } from "./private/NatureSections";
import ImmersiveGallery from "./private/ImmersiveGallery";
import NeuralPuzzlePage from "./private/NeuralPuzzlePage";

type PrivatePage = "universo" | "galeria" | "puzzle";

const PAGES = [
  { id: "universo", label: "O Universo", emblem: "❈", desc: "As tuas memórias, histórias e sonhos" },
  { id: "galeria", label: "Galeria Imersiva", emblem: "✦", desc: "Fotografias e vídeos sempre em movimento" },
  { id: "puzzle", label: "Neural Puzzle", emblem: "⬡", desc: "O teu jogo de memória e cristal" },
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
  const { play, energy } = useMusic();
  const startedRef = useRef(false);
  const [page, setPage] = useState<PrivatePage>("universo");
  const pendingScroll = useRef<string | null>(null);

  // A música dela — Photograph — começa a tocar assim que abre a sua página.
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      play(audioTracks[0]);
    }
    window.scrollTo(0, 0);
  }, [play]);

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
      {page === "universo" && <ScrollProgress />}
      <FilmGrain />
      <CursorGlow />
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
            <LettersSection />
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

      <footer className="border-t border-white/5 py-10 text-center">
        <p className="font-display text-xs italic text-[#b9d9ec]/50">
          “A fotografia é a história que não consigo contar com palavras.” — Destin Sparks
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-shell-sky/45">
          Shell 2026 · Shelcia Fernanda Neves Van-Dúnem
        </p>
      </footer>
    </div>
  );
}
