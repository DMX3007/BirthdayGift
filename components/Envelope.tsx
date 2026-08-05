"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { burstConfetti } from "@/lib/celebrate";
import { HER_NAME } from "@/lib/data";

export default function Envelope({ onOpened }: { onOpened: () => void }) {
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    burstConfetti();
    setTimeout(() => burstConfetti(), 350);
    setTimeout(() => {
      onOpened();
    }, 1300);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-script text-2xl sm:text-3xl text-rose-600 mb-10 sm:mb-12"
      >
        Для тебя, {HER_NAME} 💌
      </motion.p>

      <motion.button
        type="button"
        aria-label="Открыть письмо"
        onClick={handleOpen}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        className="relative w-64 h-44 sm:w-80 sm:h-56 cursor-pointer"
        whileHover={{ scale: opening ? 1 : 1.03 }}
      >
        <motion.div
          animate={
            opening ? { y: -14, scale: 1.05 } : { y: [0, -6, 0] }
          }
          transition={
            opening
              ? { duration: 0.4 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative w-full h-full"
        >
          {/* envelope body */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-100 to-pink-200 shadow-2xl border border-rose-200" />

          {/* letter peeking out */}
          <AnimatePresence>
            {opening && (
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -18, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="absolute left-1/2 top-3 -translate-x-1/2 w-[80%] h-[62%] rounded-md bg-white shadow-lg border border-rose-100 flex items-center justify-center"
              >
                <span className="text-3xl">💗</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* bottom flap */}
          <div
            className="absolute inset-x-0 bottom-0 h-full"
            style={{
              clipPath: "polygon(0 100%, 50% 40%, 100% 100%)",
              background:
                "linear-gradient(135deg, #fbcfe8, #f9a8d4)",
            }}
          />

          {/* top flap (the seal side), flips open */}
          <motion.div
            animate={{ rotateX: opening ? 130 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 50% 62%, 100% 0)",
              background: "linear-gradient(135deg, #fda4af, #fb7185)",
            }}
            className="absolute inset-x-0 top-0 h-full z-10"
          />

          {/* wax seal */}
          <motion.div
            animate={
              opening
                ? { scale: 0, opacity: 0 }
                : { scale: [1, 1.08, 1] }
            }
            transition={
              opening
                ? { duration: 0.3 }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg"
          >
            <span className="text-lg">❤</span>
          </motion.div>
        </motion.div>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 text-sm text-rose-400 tracking-wide"
      >
        нажми, чтобы открыть
      </motion.p>
    </div>
  );
}
