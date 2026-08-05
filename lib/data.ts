// ---- Personalize me ----
export const HER_NAME = "любимая";
export const SIGN_OFF = "твой котик";
export const BIRTHDAY_WISH = `С днём рождения, ${HER_NAME}! 🎂

Каждый год рядом с тобой — подарок сам по себе,
а сегодня я хочу подарить тебе целый день,
собранный только из того, что любишь ты.

Пусть сегодня будет вкусно, весело и невероятно нежно.
Выбери всё, что хочется — а обо всём остальном
позабочусь я.

Я безумно тебя люблю и благодарен судьбе
за каждый прожитый рядом с тобой день.

С днём рождения, моя единственная. 💖

— ${SIGN_OFF}`;
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

export const ENTERTAINMENT: EntertainOption[] = [
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
  {
    id: "drawing",
    title: "Рисование",
    subtitle: "Мастер-класс в 18:00",
    emoji: "🎨",
    gradient: "from-teal-400 to-emerald-500",
    times: ["18:00"],
  },
];

export const RELAX: RelaxOption[] = [
  {
    id: "general",
    title: "Общий массаж",
    emoji: "💆‍♀️",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    id: "foot",
    title: "Массаж стоп",
    emoji: "🦶",
    gradient: "from-orange-300 to-rose-400",
  },
  {
    id: "erotic",
    title: "Эротический массаж",
    emoji: "🔥",
    gradient: "from-red-500 to-pink-600",
  },
];

export type Selection = {
  eat: string | null;
  entertain: { optionId: string; time: string } | null;
  relax: string | null;
};

export const EMPTY_SELECTION: Selection = {
  eat: null,
  entertain: null,
  relax: null,
};

export function describeSelection(selection: Selection) {
  const cuisine = CUISINES.find((c) => c.id === selection.eat);
  const entertainOption = ENTERTAINMENT.find(
    (e) => e.id === selection.entertain?.optionId
  );
  const relax = RELAX.find((r) => r.id === selection.relax);

  return {
    eat: cuisine?.title ?? null,
    entertain: entertainOption
      ? `${entertainOption.title} — ${selection.entertain?.time}`
      : null,
    relax: relax?.title ?? null,
  };
}
