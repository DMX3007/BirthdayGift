"use client";

import { motion } from "framer-motion";

export default function SubmittingScreen({
  status,
  onContinue,
}: {
  status: "sending" | "sent";
  onContinue: () => void;
}) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {status === "sending" ? (
        <motion.div
          key="sending"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.span
            animate={{ x: [0, 12, 0], y: [0, -10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl"
          >
            💌
          </motion.span>
          <p className="font-script text-2xl sm:text-3xl text-rose-600 dark:text-rose-300">
            Отправляю твой выбор...
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.7 }}
          className="flex flex-col items-center gap-5 max-w-md"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.15 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-500 text-white text-4xl shadow-xl"
          >
            ✓
          </motion.span>
          <p className="font-script text-3xl sm:text-4xl text-rose-600 dark:text-rose-300">
            Готово!
          </p>
          <p className="text-rose-900/70 dark:text-rose-200/70 leading-relaxed">
            Твой выбор уже у меня. Дальше я сам обо всём позабочусь —
            тебе остаётся только ждать и наслаждаться днём рождения. 💖
          </p>
          <motion.button
            type="button"
            onClick={onContinue}
            whileTap={{ scale: 0.95 }}
            className="btn-love mt-4 rounded-full px-8 py-3 text-white font-semibold soft-pulse"
          >
            Открыть моё пожелание →
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
