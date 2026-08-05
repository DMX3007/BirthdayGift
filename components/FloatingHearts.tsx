"use client";

import { useState } from "react";

const HEART_EMOJIS = ["💕", "💖", "💗", "💓", "❤️"];

type Heart = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  driftX: number;
  emoji: string;
};

function generateHearts(count: number): Heart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 8,
    size: 14 + Math.random() * 18,
    driftX: (Math.random() - 0.5) * 120,
    emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
  }));
}

export default function FloatingHearts({ count = 12 }: { count?: number }) {
  const [hearts] = useState<Heart[]>(() => generateHearts(count));

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart absolute bottom-0 select-none opacity-0"
          style={
            {
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              "--drift-x": `${h.driftX}px`,
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
