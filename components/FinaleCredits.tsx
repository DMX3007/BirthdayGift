"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BIRTHDAY_WISH } from "@/lib/data";

export default function FinaleCredits({ onReplay }: { onReplay: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true));
    }
  }

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 text-center">
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        onError={() => setAudioAvailable(false)}
      />

      <div className="relative h-[70vh] w-full max-w-2xl overflow-hidden">
        <div className="credits-scroll absolute inset-x-0 top-full flex flex-col items-center gap-8">
          <span className="text-5xl">🎂</span>
          {BIRTHDAY_WISH.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="font-script text-2xl sm:text-3xl leading-relaxed text-rose-100 max-w-xl whitespace-pre-line"
            >
              {para}
            </p>
          ))}
          <span className="text-4xl">❤️</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        {audioAvailable && (
          <button
            type="button"
            onClick={toggleAudio}
            className="rounded-full border border-rose-300/50 px-5 py-2 text-sm text-rose-200 hover:bg-rose-500/10 transition-colors"
          >
            {playing ? "⏸ пауза музыки" : "▶ включить музыку"}
          </button>
        )}

        <motion.button
          type="button"
          onClick={onReplay}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-rose-600"
        >
          Посмотреть письмо ещё раз ↺
        </motion.button>
      </div>
    </div>
  );
}
