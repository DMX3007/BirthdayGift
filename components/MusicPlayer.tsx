"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TRACKS } from "@/lib/data";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-[1px]">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
    </svg>
  );
}

export default function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(() =>
    Math.floor(Math.random() * TRACKS.length)
  );
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const failCountRef = useRef(0);

  // Start playback once, right when the letter opens.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  function switchTo(index: number) {
    setTrackIndex(index);
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = playing;
    // load() picks up the new src on the next tick; play once ready.
    requestAnimationFrame(() => {
      audio.load();
      if (wasPlaying) {
        audio.play().catch(() => setPlaying(false));
      }
    });
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true));
    }
  }

  function next() {
    switchTo((trackIndex + 1) % TRACKS.length);
  }

  function prev() {
    switchTo((trackIndex - 1 + TRACKS.length) % TRACKS.length);
  }

  const track = TRACKS[trackIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="fixed top-4 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-2 rounded-full border border-rose-100 bg-white/90 py-2 pl-2 pr-4 shadow-lg backdrop-blur dark:border-rose-800/60 dark:bg-rose-950/80"
    >
      <audio
        ref={audioRef}
        src={track.src}
        onEnded={next}
        onError={() => {
          setPlaying(false);
          failCountRef.current += 1;
          if (failCountRef.current < TRACKS.length) next();
        }}
      />
      <button
        type="button"
        onClick={prev}
        aria-label="Предыдущий трек"
        className="flex h-8 w-8 items-center justify-center rounded-full text-rose-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-rose-300/70 dark:hover:bg-rose-900/50 dark:hover:text-rose-100"
      >
        <PrevIcon />
      </button>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Пауза" : "Играть"}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white shadow-md transition-colors hover:bg-rose-600"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Следующий трек"
        className="flex h-8 w-8 items-center justify-center rounded-full text-rose-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:text-rose-300/70 dark:hover:bg-rose-900/50 dark:hover:text-rose-100"
      >
        <NextIcon />
      </button>
      <span className="max-w-[110px] truncate text-sm font-medium text-rose-600 dark:text-rose-200">
        {track.title}
      </span>
    </motion.div>
  );
}
