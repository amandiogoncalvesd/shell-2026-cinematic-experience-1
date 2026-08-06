import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MusicProvider } from "./audio/MusicProvider";
import Portal from "./sections/Portal";
import GuestArea from "./sections/GuestArea";
import AuthGate from "./sections/AuthGate";
import PrivateArea from "./sections/PrivateArea";

type View = "portal" | "guests" | "auth" | "private";

export default function App() {
  const [view, setView] = useState<View>("portal");

  return (
    <MusicProvider>
      <div className="min-h-screen bg-[#03101f] text-white">
        <AnimatePresence mode="wait">
          {view === "portal" && (
            <motion.div key="portal" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Portal onEnter={(role) => setView(role === "guests" ? "guests" : "auth")} />
            </motion.div>
          )}
          {view === "guests" && (
            <motion.div key="guests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <GuestArea onGoPrivate={() => setView("auth")} onExitPortal={() => setView("portal")} />
            </motion.div>
          )}
          {view === "auth" && (
            <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <AuthGate onSuccess={() => setView("private")} onBack={() => setView("portal")} />
            </motion.div>
          )}
          {view === "private" && (
            <motion.div key="private" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <PrivateArea onExit={() => setView("portal")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MusicProvider>
  );
}
