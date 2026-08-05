# 💌 Birthday Invitation

A one-page animated birthday invitation, built with Next.js. She opens a
sealed letter (hearts + confetti) to the sound of her favorite music, picks
what she wants for her birthday — food, entertainment, relaxation — submits
her choices, and gets a scrolling birthday-wish "movie credits" screen. Her
choices get sent straight to a Telegram chat.

## Flow

1. **Envelope** — closed letter with a wax seal. Tapping it bursts hearts
   and confetti and opens the letter.
2. **Letter / menu**:
   - **Eat**: pick one cuisine — Georgian, Italian, Russian, Eastern, Asian,
     Seafood
   - **Развлечения и отдых**: drawing is already booked and paid for (shown
     locked, always included); she can additionally pick a cinema showtime
     ("Луч" / "Эпицентр") and any number of massage options — general, foot,
     erotic — all freely combinable, not one-per-category
3. **Sending / confirmation** — a short "sending" animation, then a warm
   confirmation that her choices were received and you'll take it from
   there.
4. **Finale** — her birthday wish scrolls like movie credits over a black
   screen, with screenshots of her favorite Instagram comments scattered
   and rotated behind the text.

As soon as she opens the letter, a music player appears (centered at the
top) and starts playing a random pick from her 4 favorite tracks. She can
play/pause and skip forward/back between them at any point, and it keeps
playing across every screen. A dark-mode toggle (top-left) is available
from the very first screen.

All copy, categories, options, times, and the birthday wish text live in
[`lib/data.ts`](./lib/data.ts) — edit that file to personalize everything
(her name, your sign-off, the wish text, cuisines, showtimes, prices, etc).

## 1. Personalize it

Open `lib/data.ts`:

- `HER_NAME`, `SIGN_OFF`, `BIRTHDAY_WISH` — the personal touches.
- `CUISINES`, `CINEMAS`, `DRAWING`, `RELAX` — categories/options and cinema
  showtimes.
- `TRACKS` — her 4 favorite songs (see below).
- `COMMENT_PHOTOS` — the finale's scattered background photos (see below).

Options currently use emoji + color gradients instead of photos (no real
images were available to bundle). If you'd rather use real photos, drop
images into `public/` and swap the emoji in `OptionCard` for an
`next/image`.

### Add her music (required for the player to actually play something)

Drop 4 audio files at:

```
public/audio/track-1.mp3
public/audio/track-2.mp3
public/audio/track-3.mp3
public/audio/track-4.mp3
```

Then rename the `title` for each entry in the `TRACKS` array in
`lib/data.ts` to match. If a file is missing, the player just skips to the
next track instead of breaking — so it's safe to add them one at a time.

### Add the finale's background photos (optional)

Screenshots of nice Instagram comments, scattered and rotated behind the
credits on the finale screen. Drop up to 7 images at:

```
public/photos/comment-1.jpg
public/photos/comment-2.jpg
...
public/photos/comment-7.jpg
```

Each has its own hand-placed position/size/rotation in the
`COMMENT_PHOTOS` array in `lib/data.ts` — add, remove, or tweak entries to
match how many photos you have (any image size/aspect ratio works; only
the `width` is fixed, height follows automatically). Missing files are
simply skipped, same as the tracks.

## 2. Get her choices on your phone (Telegram)

The submit form posts to `/api/submit`, which forwards the choices to a
Telegram chat via a bot. Takes about 2 minutes to set up:

1. Open Telegram, message **[@BotFather](https://t.me/BotFather)**, send
   `/newbot` and follow the prompts. You'll get a **bot token** like
   `123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`.
2. Start a chat with your new bot (search its username, hit **Start**) —
   otherwise it can't message you.
3. Get your **chat ID**: message your bot anything, then open
   `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser and
   look for `"chat":{"id": ...}` in the JSON response.
4. You'll set these as environment variables in Vercel (next step):
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

Without these env vars set, the app still works fine end-to-end — it just
logs the submission on the server instead of sending it to Telegram.

## 3. Deploy on Vercel

1. Push this repo to GitHub (already done if you're reading this from the
   repo).
2. Go to [vercel.com/new](https://vercel.com/new), import this repository.
3. Under **Environment Variables**, add:
   - `TELEGRAM_BOT_TOKEN` = the token from BotFather
   - `TELEGRAM_CHAT_ID` = your chat ID
4. Deploy. That's it — Vercel builds and hosts it automatically on every
   push.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a `.env.local`
with `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to test real Telegram
delivery locally (otherwise submissions are just logged to the terminal).

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) for animation
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for the
  heart/confetti burst
- A single Route Handler (`app/api/submit/route.ts`) for the Telegram
  notification
