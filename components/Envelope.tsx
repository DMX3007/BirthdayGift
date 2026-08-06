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
        className="font-script text-2xl sm:text-3xl text-rose-600 dark:text-rose-300 mb-10 sm:mb-12"
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

          {/* letter peeking out — kept outside the clipped shell below so it
              can rise freely above the envelope instead of being cut off */}
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

          {/* flap shell — `perspective` gives the flip real 3D depth.
              Note: no overflow-hidden here — combined with perspective on
              a rotateX'd 3D child, Chromium clips it almost immediately
              into the rotation, well before it should visually vanish.
              The flap corners are chamfered in their own clip-path below
              instead, so they never poke past the body's rounded-xl. */}
          <div className="absolute inset-0" style={{ perspective: 700 }}>
            {/* bottom flap, folds open downward like real paper */}
            <motion.div
              animate={{ rotateX: opening ? -150 : 0 }}
              transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                transformOrigin: "bottom center",
                transformStyle: "preserve-3d",
                clipPath:
                  "polygon(50% 40%, 96% 96%, 92% 100%, 8% 100%, 4% 96%)",
                background: "linear-gradient(135deg, #fbcfe8, #f9a8d4)",
              }}
              className="absolute inset-x-0 bottom-0 h-full"
            />

            {/* top flap (the seal side), folds open upward like real paper */}
            <motion.div
              animate={{ rotateX: opening ? 150 : 0 }}
              transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                clipPath: "polygon(50% 62%, 96% 4%, 92% 0%, 8% 0%, 4% 4%)",
                background: "linear-gradient(135deg, #fda4af, #fb7185)",
              }}
              className="absolute inset-x-0 top-0 h-full z-10"
            />
          </div>

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
        className="font-script mt-8 text-lg text-rose-400 dark:text-rose-300/70 tracking-wide"
      >
        нажми, чтобы открыть
      </motion.p>
    </div>
  );
}
