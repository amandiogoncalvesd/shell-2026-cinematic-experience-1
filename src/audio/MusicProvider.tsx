import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface Track {
  title: string;
  src: string;
}

interface MusicContextValue {
  currentTrack: Track | null;
  isPlaying: boolean;
  energy: number; // 0..1 live amplitude, used to drive visuals
  volume: number;
  play: (track: Track) => void;
  toggle: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [energy, setEnergy] = useState(0);
  const [volume, setVolumeState] = useState(0.35);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.crossOrigin = "anonymous";
    audio.volume = volume;
    audioRef.current = audio;
    return () => {
      audio.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ensureGraph = useCallback(() => {
    if (!audioRef.current) return;
    if (!ctxRef.current) {
      try {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AC();
        const source = ctx.createMediaElementSource(audioRef.current);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        ctxRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;
        dataRef.current = new Uint8Array(analyser.frequencyBinCount);
      } catch {
        // Web audio unavailable — fallback silently
      }
    }
  }, []);

  const loop = useCallback(() => {
    try {
      const analyser = analyserRef.current;
      const data = dataRef.current;
      if (analyser && data) {
        analyser.getByteFrequencyData(data as any);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        const avg = sum / data.length / 255;
        setEnergy((prev) => prev * 0.7 + avg * 0.3);
      }
    } catch {
      // Cross-origin audio analysis unavailable — animate with a gentle synthetic pulse instead
      setEnergy(0.25 + Math.abs(Math.sin(Date.now() / 900)) * 0.2);
    }
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const play = useCallback(
    (track: Track) => {
      const audio = audioRef.current;
      if (!audio) return;
      ensureGraph();
      if (ctxRef.current?.state === "suspended") ctxRef.current.resume();
      if (currentTrack?.src !== track.src) {
        audio.src = track.src;
        setCurrentTrack(track);
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(loop);
        })
        .catch(() => setIsPlaying(false));
    },
    [currentTrack, ensureGraph, loop]
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else if (currentTrack) {
      play(currentTrack);
    }
  }, [currentTrack, isPlaying, play]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  return (
    <MusicContext.Provider
      value={{ currentTrack, isPlaying, energy, volume, play, toggle, stop, setVolume }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
