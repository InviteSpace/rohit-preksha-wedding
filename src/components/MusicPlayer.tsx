"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WEDDING_CONFIG } from "@/config/wedding";
import { assetPath } from "@/lib/asset";
import type { InvitationLanguage } from "@/lib/invitationSide";
import { getUiCopy } from "@/lib/uiCopy";

export const WEDDING_MUSIC_START_EVENT = "wedding-music-start";

interface MusicPlayerProps {
  language?: InvitationLanguage;
  autoStart?: boolean;
  autoPrompt?: boolean;
  hidden?: boolean;
}

const FADE_MS = 500;
const TARGET_VOLUME = 0.5;

/** Survives React Strict Mode remounts so we never kick off playback twice. */
let musicBootstrapped = false;

function trackFor(language: InvitationLanguage) {
  return WEDDING_CONFIG.music[language] ?? WEDDING_CONFIG.music.en;
}

export default function MusicPlayer({
  language = "en",
  autoStart = false,
  autoPrompt = false,
  hidden = false,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const languageRef = useRef(language);
  const startedRef = useRef(false);
  const startingRef = useRef(false);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(autoPrompt && !hidden);
  const [trackSrc, setTrackSrc] = useState(() => assetPath(trackFor(language).src));
  const t = getUiCopy(language);

  const clearFade = useCallback(() => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(
    (audio: HTMLAudioElement) => {
      clearFade();
      audio.volume = 0;
      const steps = 12;
      const step = TARGET_VOLUME / steps;
      const interval = FADE_MS / steps;
      let n = 0;
      fadeRef.current = window.setInterval(() => {
        n += 1;
        audio.volume = Math.min(TARGET_VOLUME, n * step);
        if (n >= steps) clearFade();
      }, interval);
    },
    [clearFade],
  );

  const waitReady = useCallback((audio: HTMLAudioElement) => {
    if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      const onReady = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error("audio load failed"));
      };
      const cleanup = () => {
        audio.removeEventListener("canplay", onReady);
        audio.removeEventListener("loadeddata", onReady);
        audio.removeEventListener("error", onError);
      };
      audio.addEventListener("canplay", onReady, { once: true });
      audio.addEventListener("loadeddata", onReady, { once: true });
      audio.addEventListener("error", onError, { once: true });
      if (
        audio.networkState === HTMLMediaElement.NETWORK_EMPTY ||
        audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE
      ) {
        audio.load();
      }
    });
  }, []);

  const seekQuietly = useCallback(async (audio: HTMLAudioElement, offset: number) => {
    if (offset <= 0) {
      if (audio.currentTime > 0.05) audio.currentTime = 0;
      return;
    }
    const target =
      Number.isFinite(audio.duration) && audio.duration > 0
        ? Math.min(offset, Math.max(0, audio.duration - 0.5))
        : offset;

    if (Math.abs(audio.currentTime - target) < 0.15) return;

    await new Promise<void>((resolve) => {
      const onSeeked = () => {
        audio.removeEventListener("seeked", onSeeked);
        resolve();
      };
      audio.addEventListener("seeked", onSeeked, { once: true });
      try {
        audio.currentTime = target;
      } catch {
        audio.removeEventListener("seeked", onSeeked);
        resolve();
      }
      window.setTimeout(() => {
        audio.removeEventListener("seeked", onSeeked);
        resolve();
      }, 400);
    });
  }, []);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || musicBootstrapped || startedRef.current || startingRef.current) {
      return false;
    }

    startingRef.current = true;
    musicBootstrapped = true;
    const offset = trackFor(languageRef.current).startOffsetSec ?? 0;
    try {
      audio.volume = 0;
      await waitReady(audio);
      await seekQuietly(audio, offset);
      await audio.play();
      startedRef.current = true;
      setPlaying(true);
      setShowPrompt(false);
      fadeIn(audio);
      return true;
    } catch {
      musicBootstrapped = false;
      startingRef.current = false;
      setShowPrompt(true);
      return false;
    } finally {
      startingRef.current = false;
    }
  }, [fadeIn, seekQuietly, waitReady]);

  // Keep track in sync with invitation language
  useEffect(() => {
    languageRef.current = language;
    const nextSrc = assetPath(trackFor(language).src);
    setTrackSrc(nextSrc);

    const audio = audioRef.current;
    if (!audio) return;

    const absoluteNext = new URL(nextSrc, window.location.href).href;
    if (audio.src === absoluteNext) return;

    const wasPlaying = !audio.paused && startedRef.current;
    clearFade();
    audio.pause();
    audio.src = nextSrc;
    audio.load();
    startedRef.current = false;
    musicBootstrapped = false;

    if (wasPlaying || autoStart) {
      void startMusic();
    }
  }, [language, autoStart, clearFade, startMusic]);

  // Seamless loop from start offset
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!startedRef.current) return;
      const offset = trackFor(languageRef.current).startOffsetSec ?? 0;
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      if (audio.currentTime >= audio.duration - 0.35) {
        audio.currentTime = offset;
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  useEffect(() => {
    const onStartEvent = () => {
      void startMusic();
    };
    window.addEventListener(WEDDING_MUSIC_START_EVENT, onStartEvent);
    return () => window.removeEventListener(WEDDING_MUSIC_START_EVENT, onStartEvent);
  }, [startMusic]);

  useEffect(() => {
    if (!autoStart || startedRef.current) return;
    void startMusic();
  }, [autoStart, startMusic]);

  useEffect(() => () => clearFade(), [clearFade]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      clearFade();
      audio.pause();
      setPlaying(false);
      return;
    }

    if (startedRef.current) {
      try {
        await audio.play();
        setPlaying(true);
        setShowPrompt(false);
        fadeIn(audio);
      } catch {
        setShowPrompt(true);
      }
      return;
    }

    await startMusic();
  }, [clearFade, fadeIn, playing, startMusic]);

  return (
    <>
      <audio ref={audioRef} src={trackSrc} preload="auto" playsInline />

      {!hidden && showPrompt && (
        <button
          onClick={toggle}
          className="fixed right-4 bottom-24 z-50 max-w-[calc(100vw-5.5rem)] animate-pulse rounded-full bg-sage px-3 py-2 font-heading text-[11px] tracking-wide text-white shadow-lg sm:px-4 sm:text-xs sm:tracking-wider md:bottom-8 cursor-pointer"
        >
          {t.tapForMusic}
        </button>
      )}

      {!hidden && (
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-white/95 text-sage shadow-lg backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer"
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
      )}
    </>
  );
}
