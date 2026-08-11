import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MusicProvider } from "./audio/MusicProvider";
import PreloadGate from "./components/PreloadGate";
import Portal from "./sections/Portal";
import GuestArea from "./sections/GuestArea";
import AuthGate from "./sections/AuthGate";
import PrivateArea from "./sections/PrivateArea";
import { PuzzleArcadePage, PostersPage } from "./sections/ArcadePages";
import { requestImmersiveFullscreen } from "./utils/fullscreen";

type View = "portal" | "guests" | "auth" | "private" | "puzzle" | "posters";

export default function App() {
  const [view, setView] = useState<View>("portal");
  const [mediaReady, setMediaReady] = useState(false);

  // A aplicação inteira vive em tela cheia: ao primeiro gesto do utilizador
  // (o navegador exige um gesto), pedimos fullscreen. Depois disso, navegar
  // entre páginas nunca o quebra — e nunca forçamos reentrar à força.
  useEffect(() => {
    const once = () => requestImmersiveFullscreen();
    window.addEventListener("pointerdown", once, { once: true });
    window.addEventListener("keydown", once, { once: true });
    return () => {
      window.removeEventListener("pointerdown", once);
      window.removeEventListener("keydown", once);
    };
  }, []);

  return (
    <MusicProvider>
      <div className="min-h-screen bg-[#03101f] text-white">
        <AnimatePresence mode="wait">
          {!mediaReady ? (
            <motion.div key="preload" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <PreloadGate onDone={() => setMediaReady(true)} />
            </motion.div>
          ) : view === "portal" ? (
            <motion.div key="portal" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Portal
                onEnter={(role) => setView(role === "guests" ? "guests" : "auth")}
                onOpenExtra={(page) => setView(page)}
              />
            </motion.div>
          ) : view === "guests" ? (
            <motion.div key="guests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <GuestArea onGoPrivate={() => setView("auth")} onExitPortal={() => setView("portal")} />
            </motion.div>
          ) : view === "auth" ? (
            <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <AuthGate onSuccess={() => setView("private")} onBack={() => setView("portal")} />
            </motion.div>
          ) : view === "puzzle" ? (
            <motion.div key="puzzle-arcade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <PuzzleArcadePage onExit={() => setView("portal")} />
            </motion.div>
          ) : view === "posters" ? (
            <motion.div key="posters" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <PostersPage onExit={() => setView("portal")} />
            </motion.div>
          ) : (
            <motion.div key="private" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <PrivateArea onExit={() => setView("portal")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MusicProvider>
  );
}
