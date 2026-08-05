"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TRACKS } from "@/lib/data";

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
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="fixed top-3 right-3 z-30 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1.5 shadow-lg border border-rose-100"
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
        className="px-1 text-rose-400 hover:text-rose-600"
      >
        ⏮
      </button>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Пауза" : "Играть"}
        className="px-1 text-base text-rose-500 hover:text-rose-700"
      >
        {playing ? "⏸" : "▶️"}
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Следующий трек"
        className="px-1 text-rose-400 hover:text-rose-600"
      >
        ⏭
      </button>
      <span className="ml-1 max-w-[84px] truncate text-xs text-rose-600">
        {track.title}
      </span>
    </motion.div>
  );
}
