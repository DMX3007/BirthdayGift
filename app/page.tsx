"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import LetterMenu from "@/components/LetterMenu";
import SubmittingScreen from "@/components/SubmittingScreen";
import FinaleCredits from "@/components/FinaleCredits";
import { describeSelection, EMPTY_SELECTION, Selection } from "@/lib/data";

const FloatingHearts = dynamic(() => import("@/components/FloatingHearts"), {
  ssr: false,
});

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
});

const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  ssr: false,
});

type Scene = "envelope" | "letter" | "sending" | "sent" | "finale";

export default function Home() {
  const [scene, setScene] = useState<Scene>("envelope");
  const [selection, setSelection] = useState<Selection>(EMPTY_SELECTION);

  async function handleSubmit() {
    setScene("sending");
    const described = describeSelection(selection);

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(described),
      });
    } catch {
      // she still gets a warm confirmation regardless of delivery status
    }

    setTimeout(() => setScene("sent"), 1200);
  }

  function handleReplay() {
    setSelection(EMPTY_SELECTION);
    setScene("envelope");
  }

  return (
    <div className="relative min-h-screen w-full bg-[var(--background)]">
      <FloatingHearts />
      <ThemeToggle />
      {scene !== "envelope" && <MusicPlayer />}

      <AnimatePresence mode="wait">
        {scene === "envelope" && (
          <Envelope key="envelope" onOpened={() => setScene("letter")} />
        )}
        {scene === "letter" && (
          <LetterMenu
            key="letter"
            selection={selection}
            onChange={setSelection}
            onSubmit={handleSubmit}
          />
        )}
        {(scene === "sending" || scene === "sent") && (
          <SubmittingScreen
            key="submitting"
            status={scene === "sending" ? "sending" : "sent"}
            onContinue={() => setScene("finale")}
          />
        )}
        {scene === "finale" && (
          <FinaleCredits key="finale" onReplay={handleReplay} />
        )}
      </AnimatePresence>
    </div>
  );
}
