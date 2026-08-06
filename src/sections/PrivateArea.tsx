import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { LightboxHost } from "../components/media";
import { useMusic } from "../audio/MusicProvider";
import { audioTracks } from "../data/videos";
import { HomeSection, MemoriesSection, StoriesSection } from "./private/NarrativeSections";
import { FriendsSection, LettersSection } from "./private/PeopleSections";
import { LibrarySection, ArtSection } from "./private/CreativeSections";
import { CinemaSection, DreamsSection, SkySection, MusicSection } from "./private/FutureSections";

const SECTIONS = [
  { id: "p-home", label: "Home" },
  { id: "p-memorias", label: "Memórias" },
  { id: "p-historias", label: "Histórias" },
  { id: "p-amigos", label: "Amigos" },
  { id: "p-cartas", label: "Cartas" },
  { id: "p-livros", label: "Livros" },
  { id: "p-arte", label: "Arte" },
  { id: "p-videos", label: "Vídeos" },
  { id: "p-sonhos", label: "Sonhos" },
  { id: "p-ceu", label: "Céu" },
  { id: "p-musica", label: "Música" },
];

export default function PrivateArea({ onExit }: { onExit: () => void }) {
  const { play, energy } = useMusic();

  useEffect(() => {
    play(audioTracks[10]);
    window.scrollTo(0, 0);
  }, [play]);

  return (
    <div className="relative bg-[#03101f]">
      <LightboxHost />
      <Navbar sections={SECTIONS} brand="Shell 2026 · Shelcia" onExit={onExit} exitLabel="Sair" />
      <HomeSection energy={energy} />
      <MemoriesSection energy={energy} />
      <StoriesSection />
      <FriendsSection />
      <LettersSection />
      <LibrarySection />
      <ArtSection energy={energy} />
      <CinemaSection />
      <DreamsSection />
      <SkySection energy={energy} />
      <MusicSection />
      <footer className="border-t border-white/5 py-10 text-center text-xs uppercase tracking-[0.3em] text-ocean-300/40">
        Shell 2026 · Um universo privado para Shelcia Fernanda Neves Van-Dúnem
      </footer>
    </div>
  );
}
