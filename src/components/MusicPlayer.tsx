"use client";

import { useCallback, useRef, useState } from "react";
import { WEDDING_CONFIG } from "@/config/wedding";
import { assetPath } from "@/lib/asset";

interface MusicPlayerProps {
  autoPrompt?: boolean;
}

export default function MusicPlayer({ autoPrompt = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(autoPrompt);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
        setShowPrompt(false);
      } catch {
        setShowPrompt(true);
      }
    }
  }, [playing]);

  return (
    <>
      <audio ref={audioRef} src={assetPath(WEDDING_CONFIG.music.src)} loop preload="auto" />

      {showPrompt && (
        <button
          onClick={toggle}
          className="fixed bottom-24 right-4 z-50 animate-pulse rounded-full bg-sage px-4 py-2 font-heading text-xs tracking-wider text-white shadow-lg md:bottom-8 cursor-pointer"
        >
          Tap for music ♪
        </button>
      )}

      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-white/95 text-sage shadow-lg backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer"
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
