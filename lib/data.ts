// ---- Personalize me ----
export const HER_NAME = "Окси";
export const SIGN_OFF = "Ромаш";
export const BIRTHDAY_WISH = `С днём рождения, ${HER_NAME}! 🎂

Время рядом с тобой — подарок сам по себе,
Я хочу чтобы ты собрала свой праздничный пазл из того, что любишь ты.

Пусть сегодня будет вкусно, весело и невероятно нежно.
Выбери всё, что хочется — а обо всём остальном
позабочусь я.

С днём рождения, моя единственная. 💖

— ${SIGN_OFF}`;
// Her 4 favorite tracks — add the actual files at public/audio/track-N.mp3
// and rename the titles below.
export type Track = {
  id: string;
  title: string;
  src: string;
};

export const TRACKS: Track[] = [
  { id: "track-1", title: "Трек 1", src: "/audio/track-1.mp3" },
  { id: "track-2", title: "Трек 2", src: "/audio/track-2.mp3" },
  { id: "track-3", title: "Трек 3", src: "/audio/track-3.mp3" },
  { id: "track-4", title: "Трек 4", src: "/audio/track-4.mp3" },
];
// -------------------------

export type CuisineOption = {
  id: string;
  title: string;
  emoji: string;
  gradient: string;
};

export type EntertainOption = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  times: string[];
};

export type DrawingBooking = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  time: string;
};

export type RelaxOption = {
  id: string;
  title: string;
  emoji: string;
  gradient: string;
};

export const CUISINES: CuisineOption[] = [
  {
    id: "georgian",
    title: "Грузинская кухня",
    emoji: "🍢",
    gradient: "from-rose-400 to-orange-400",
  },
  {
    id: "italian",
    title: "Итальянская кухня",
    emoji: "🍝",
    gradient: "from-emerald-400 to-lime-400",
  },
  {
    id: "russian",
    title: "Русская кухня",
    emoji: "🥟",
    gradient: "from-sky-400 to-indigo-400",
  },
  {
    id: "eastern",
    title: "Восточная кухня",
    emoji: "🥙",
    gradient: "from-amber-400 to-yellow-500",
  },
  {
    id: "asian",
    title: "Азиатская кухня",
    emoji: "🍜",
    gradient: "from-red-400 to-pink-500",
  },
  {
    id: "sea",
    title: "Морская кухня",
    emoji: "🦞",
    gradient: "from-cyan-400 to-blue-500",
  },
];

// Already paid & booked — always included, not optional.
export const DRAWING: DrawingBooking = {
  id: "drawing",
  title: "Рисование",
  subtitle: "Уже забронировано — 18:00",
  emoji: "🎨",
  gradient: "from-teal-400 to-emerald-500",
  time: "18:00",
};

// Optional add-on: pick a cinema showtime alongside the drawing class.
export const CINEMAS: EntertainOption[] = [
  {
    id: "cinema-luch",
    title: "Кино «Луч»",
    subtitle: "Выбери сеанс",
    emoji: "🎬",
    gradient: "from-violet-400 to-fuchsia-500",
    times: ["12:15", "15:30", "18:45", "22:00"],
  },
  {
    id: "cinema-epicenter",
    title: "Кино «Эпицентр»",
    subtitle: "Выбери сеанс",
    emoji: "🍿",
    gradient: "from-fuchsia-400 to-rose-500",
    times: ["12:30", "16:00", "19:30", "23:00"],
  },
];

export const RELAX: RelaxOption[] = [
  {
    id: "walking",
    title: "Прогулка вдвоём",
    emoji: "👫",
    gradient: "from-green-400 to-teal-500",
  },
  {
    id: "biking",
    title: "Катание на вело",
    emoji: "🚲",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    id: "picnic",
    title: "Пикник",
    emoji: "🧺🥪",
    gradient: "from-orange-300 to-rose-400",
  },
  {
    id: "moto",
    title: "Катание на мото",
    emoji: "🏍️",
    gradient: "from-red-500 to-pink-600",
  }, {
    id: "shooting",
    title: "Тир",
    emoji: "🎯",
    gradient: "from-yellow-400 to-orange-500",
  },
];

export type Selection = {
  eat: string | null;
  // Drawing is always included (already paid & booked). Cinema is an
  // optional add-on alongside it.
  cinema: { optionId: string; time: string } | null;
  relax: string | null;
};

export const EMPTY_SELECTION: Selection = {
  eat: null,
  cinema: null,
  relax: null,
};

export function describeSelection(selection: Selection) {
  const cuisine = CUISINES.find((c) => c.id === selection.eat);
  const cinemaOption = CINEMAS.find(
    (c) => c.id === selection.cinema?.optionId
  );
  const relax = RELAX.find((r) => r.id === selection.relax);

  const entertain = cinemaOption
    ? `${DRAWING.title} — ${DRAWING.time} + ${cinemaOption.title} — ${selection.cinema?.time}`
    : `${DRAWING.title} — ${DRAWING.time}`;

  return {
    eat: cuisine?.title ?? null,
    entertain,
    relax: relax?.title ?? null,
  };
}
