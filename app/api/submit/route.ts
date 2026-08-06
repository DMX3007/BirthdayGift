import { NextRequest, NextResponse } from "next/server";

type SubmitBody = {
  eat: string | null;
  entertain: string | null;
  relax: string | null;
  isUpdate?: boolean;
};

export async function POST(request: NextRequest) {
  let body: SubmitBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const lines = [
    body.isUpdate
      ? "✏️ Она обновила свой выбор на день рождения!"
      : "🎉 Она выбрала свой идеальный день рождения!",
    "",
    `🍽 Еда: ${body.eat ?? "—"}`,
    `🎈 Развлечение: ${body.entertain ?? "—"}`,
    `💆 Отдых: ${body.relax ?? "—"}`,
  ];
  const text = lines.join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("[submit] Telegram not configured, message was:\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("[submit] Telegram error:", errText);
      return NextResponse.json({ ok: true, delivered: false });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[submit] Telegram request failed:", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
