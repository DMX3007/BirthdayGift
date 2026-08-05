import confetti from "canvas-confetti";

export function burstConfetti() {
  const heart = confetti.shapeFromText({ text: "❤️", scalar: 3 });
  const sparkle = confetti.shapeFromText({ text: "✨", scalar: 3 });

  const duration = 1400;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors: ["#f472b6", "#fb7185", "#fbbf24", "#a78bfa"],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors: ["#f472b6", "#fb7185", "#fbbf24", "#a78bfa"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  confetti({
    particleCount: 22,
    spread: 100,
    startVelocity: 38,
    scalar: 1.4,
    shapes: [heart],
    origin: { x: 0.5, y: 0.55 },
  });

  setTimeout(() => {
    confetti({
      particleCount: 14,
      spread: 90,
      startVelocity: 30,
      scalar: 1.1,
      shapes: [sparkle],
      origin: { x: 0.5, y: 0.5 },
    });
  }, 200);
}
