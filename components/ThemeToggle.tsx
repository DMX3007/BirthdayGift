"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // private browsing / storage disabled — theme just won't persist
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Включить светлую тему" : "Включить тёмную тему"}
      className="fixed top-4 left-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white/90 text-lg shadow-lg backdrop-blur transition-colors dark:border-rose-800/60 dark:bg-rose-950/80"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
