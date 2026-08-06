"use client";

import { motion } from "framer-motion";
import { BIRTHDAY_WISH } from "@/lib/data";
import CommentPhotos from "./CommentPhotos";

export default function FinaleCredits({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="relative z-10 flex min-h-screen select-none flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 text-center [-webkit-touch-callout:none]">
      <CommentPhotos />
      <div aria-hidden className="absolute inset-0 z-[1] bg-black/45" />

      <div className="relative z-10 h-[70vh] w-full max-w-2xl overflow-hidden">
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

      <motion.button
        type="button"
        onClick={onReplay}
        whileTap={{ scale: 0.95 }}
        className="font-script btn-love relative z-10 mt-6 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
      >
        Посмотреть письмо ещё раз ❤️
      </motion.button>
    </div>
  );
}
