"use client";

import { motion } from "framer-motion";
import { BIRTHDAY_WISH } from "@/lib/data";

export default function FinaleCredits({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 text-center">
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

      <motion.button
        type="button"
        onClick={onReplay}
        whileTap={{ scale: 0.95 }}
        className="mt-6 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-rose-600"
      >
        Посмотреть письмо ещё раз ↺
      </motion.button>
    </div>
  );
}
