# 💌 Birthday Invitation

A one-page animated birthday invitation, built with Next.js. She opens a
sealed letter (hearts + confetti), picks what she wants for her birthday —
food, entertainment, relaxation — submits her choices, and gets a scrolling
birthday-wish "movie credits" screen with background music. Her choices get
sent straight to a Telegram chat.

## Flow

1. **Envelope** — closed letter with a wax seal. Tapping it bursts hearts
   and confetti and opens the letter.
2. **Letter / menu** — three categories, pick one option in each:
   - **Eat**: Georgian, Italian, Russian, Eastern, Asian, Seafood cuisine
   - **Entertain**: Cinema "Луч" (showtimes), Cinema "Эпицентр" (showtimes),
     or a drawing class at 18:00
   - **Relax**: general massage, foot massage, erotic massage
3. **Sending / confirmation** — a short "sending" animation, then a warm
   confirmation that her choices were received and you'll take it from
   there.
4. **Finale** — her birthday wish scrolls like movie credits over a black
   screen with background music.

All copy, categories, options, times, and the birthday wish text live in
[`lib/data.ts`](./lib/data.ts) — edit that file to personalize everything
(her name, your sign-off, the wish text, cuisines, showtimes, prices, etc).

## 1. Personalize it

Open `lib/data.ts`:

- `HER_NAME`, `SIGN_OFF`, `BIRTHDAY_WISH` — the personal touches.
- `CUISINES`, `ENTERTAINMENT`, `RELAX` — categories/options and cinema
  showtimes.

Options currently use emoji + color gradients instead of photos (no real
images were available to bundle). If you'd rather use real photos, drop
images into `public/` and swap the emoji in `OptionCard` for an
`next/image`.

### Add background music (optional)

Drop an audio file at `public/music.mp3` (any royalty-free or personal
track). The finale screen will autoplay it; if the file is missing the
player just quietly hides the music toggle — nothing breaks.

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
