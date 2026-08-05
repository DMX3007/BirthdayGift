"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import OptionCard from "./OptionCard";
import {
  CUISINES,
  ENTERTAINMENT,
  RELAX,
  Selection,
  HER_NAME,
} from "@/lib/data";

export default function LetterMenu({
  selection,
  onChange,
  onSubmit,
}: {
  selection: Selection;
  onChange: (s: Selection) => void;
  onSubmit: () => void;
}) {
  const [activeEntertainId, setActiveEntertainId] = useState<string | null>(
    selection.entertain?.optionId ?? null
  );

  const complete = Boolean(
    selection.eat && selection.entertain && selection.relax
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-40 pt-10 sm:pt-16"
    >
      <div className="rounded-3xl bg-white/90 backdrop-blur shadow-2xl border border-rose-100 p-6 sm:p-10">
        <p className="font-script text-3xl sm:text-4xl text-rose-600 text-center mb-1">
          Милая {HER_NAME},
        </p>
        <p className="text-center text-sm sm:text-base text-rose-900/70 leading-relaxed mb-8">
          выбери, чего хочется на день рождения — а обо всём остальном
          позабочусь я. Можно выбрать по одному варианту в каждом разделе.
        </p>

        {/* EAT */}
        <Section title="Что будем есть?" icon="🍽">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CUISINES.map((c) => (
              <OptionCard
                key={c.id}
                emoji={c.emoji}
                title={c.title}
                gradient={c.gradient}
                selected={selection.eat === c.id}
                onClick={() => onChange({ ...selection, eat: c.id })}
              />
            ))}
          </div>
        </Section>

        {/* ENTERTAIN */}
        <Section title="Чем развлечёмся?" icon="🎈">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ENTERTAINMENT.map((e) => (
              <OptionCard
                key={e.id}
                emoji={e.emoji}
                title={e.title}
                subtitle={e.subtitle}
                gradient={e.gradient}
                selected={selection.entertain?.optionId === e.id}
                onClick={() => {
                  setActiveEntertainId(e.id);
                  if (e.times.length === 1) {
                    onChange({
                      ...selection,
                      entertain: { optionId: e.id, time: e.times[0] },
                    });
                  } else {
                    onChange({ ...selection, entertain: null });
                  }
                }}
              />
            ))}
          </div>

          <AnimatePresence>
            {activeEntertainId &&
              (() => {
                const opt = ENTERTAINMENT.find(
                  (e) => e.id === activeEntertainId
                );
                if (!opt || opt.times.length <= 1) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 mb-2 text-xs uppercase tracking-wide text-rose-400 font-semibold">
                      Выбери время сеанса — {opt.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {opt.times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() =>
                            onChange({
                              ...selection,
                              entertain: { optionId: opt.id, time: t },
                            })
                          }
                          className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
                            selection.entertain?.optionId === opt.id &&
                            selection.entertain?.time === t
                              ? "bg-rose-500 text-white border-rose-500"
                              : "bg-white text-rose-500 border-rose-300 hover:bg-rose-50"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
          </AnimatePresence>
        </Section>

        {/* RELAX */}
        <Section title="Как расслабимся?" icon="💆">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {RELAX.map((r) => (
              <OptionCard
                key={r.id}
                emoji={r.emoji}
                title={r.title}
                gradient={r.gradient}
                selected={selection.relax === r.id}
                onClick={() => onChange({ ...selection, relax: r.id })}
              />
            ))}
          </div>
        </Section>
      </div>

      {/* Sticky submit bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-6 pt-10 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-transparent">
        <motion.button
          type="button"
          disabled={!complete}
          onClick={onSubmit}
          whileTap={complete ? { scale: 0.96 } : undefined}
          className={`w-full max-w-md rounded-full py-4 text-base font-semibold shadow-xl transition-all ${
            complete
              ? "bg-rose-500 text-white hover:bg-rose-600 soft-pulse"
              : "bg-rose-100 text-rose-300 cursor-not-allowed"
          }`}
        >
          {complete
            ? "Отправить мой выбор 💌"
            : "Выбери по варианту в каждом разделе"}
        </motion.button>
      </div>
    </motion.div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-rose-700 mb-3">
        <span aria-hidden>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}
