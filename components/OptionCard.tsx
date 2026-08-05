"use client";

import { motion } from "framer-motion";

export default function OptionCard({
  emoji,
  title,
  subtitle,
  gradient,
  selected,
  onClick,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
  gradient: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -3 }}
      className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center shadow-md transition-shadow overflow-hidden bg-gradient-to-br ${gradient} ${
        selected
          ? "ring-4 ring-rose-500 ring-offset-2 ring-offset-[var(--background)] shadow-xl"
          : "ring-0"
      }`}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-rose-500 text-sm shadow"
        >
          ✓
        </motion.span>
      )}
      <span className="text-3xl drop-shadow-sm" aria-hidden>
        {emoji}
      </span>
      <span className="text-sm font-semibold text-white drop-shadow-sm leading-tight">
        {title}
      </span>
      {subtitle && (
        <span className="text-[11px] text-white/85 leading-tight">
          {subtitle}
        </span>
      )}
    </motion.button>
  );
}
