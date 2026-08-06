"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import LetterMenu from "@/components/LetterMenu";
import SubmittingScreen from "@/components/SubmittingScreen";
import FinaleCredits from "@/components/FinaleCredits";
import { describeSelection, EMPTY_SELECTION, Selection } from "@/lib/data";

const SELECTION_STORAGE_KEY = "birthday-selection-v1";
const SUBMITTED_STORAGE_KEY = "birthday-submitted-v1";

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
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
  // Captured once when a submission starts, so the sending/sent screens
  // don't flip their wording mid-animation when hasSubmittedBefore updates.
  const [submissionIsUpdate, setSubmissionIsUpdate] = useState(false);
  const skipNextPersist = useRef(true);

  // Restore whatever she picked last time — a reload or replaying the
  // letter shouldn't force her to redo the tedious part. localStorage only
  // exists client-side, so this has to run in an effect rather than a
  // lazy useState initializer.
  useEffect(() => {
    try {
      const savedSelection = localStorage.getItem(SELECTION_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedSelection) setSelection(JSON.parse(savedSelection));
      setHasSubmittedBefore(
        localStorage.getItem(SUBMITTED_STORAGE_KEY) === "1"
      );
    } catch {
      // storage unavailable (private browsing, etc.) — just start fresh
    }
  }, []);

  // Persist every change so it survives reloads. Skipped on the very first
  // effect pass, which would otherwise re-save the pre-restore empty state
  // before the restore above has a chance to land.
  useEffect(() => {
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    try {
      localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(selection));
    } catch {
      // ignore — nothing we can do if storage is unavailable
    }
  }, [selection]);

  async function handleSubmit() {
    const isUpdate = hasSubmittedBefore;
    setSubmissionIsUpdate(isUpdate);
    setScene("sending");
    const described = describeSelection(selection);

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...described, isUpdate }),
      });
    } catch {
      // she still gets a warm confirmation regardless of delivery status
    }

    try {
      localStorage.setItem(SUBMITTED_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setHasSubmittedBefore(true);

    setTimeout(() => setScene("sent"), 1200);
  }

  function handleReplay() {
    // Keep her selections — replaying the letter is for reviewing or
    // changing her mind, not starting over.
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
            isUpdate={hasSubmittedBefore}
          />
        )}
        {(scene === "sending" || scene === "sent") && (
          <SubmittingScreen
            key="submitting"
            status={scene === "sending" ? "sending" : "sent"}
            onContinue={() => setScene("finale")}
            isUpdate={submissionIsUpdate}
          />
        )}
        {scene === "finale" && (
          <FinaleCredits key="finale" onReplay={handleReplay} />
        )}
      </AnimatePresence>
    </div>
  );
}
