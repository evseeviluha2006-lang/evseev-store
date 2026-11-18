import { NextResponse } from "next/server";
import { escapeHtml, sendToTelegram } from "@/lib/telegram";

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const name = clean(data.name, 80);
  const tg = clean(data.tg, 80);
  const phone = clean(data.phone, 40);
  const moduleTitle = clean(data.module, 120);
  const price = clean(data.price, 40);

  if (!name || !tg || !phone) {
    return NextResponse.json(
      { error: "Заполните имя, Telegram и телефон" },
      { status: 400 }
    );
  }

  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.error("Нет TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID");
    return NextResponse.json(
      { error: "Ошибка конфигурации сервера" },
      { status: 500 }
    );
  }

  const message = [
    "🔥 <b>НОВАЯ ЗАПИСЬ НА КУРС</b>",
    "",
    `📚 <b>Модуль:</b> ${escapeHtml(moduleTitle || "не указан")}`,
    `💰 <b>Цена:</b> ${escapeHtml(price || "не указана")}`,
    "",
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `✈️ <b>TG:</b> ${escapeHtml(tg)}`,
    `📞 <b>Тел:</b> ${escapeHtml(phone)}`,
  ].join("\n");

  const success = await sendToTelegram(message);

  if (!success) {
    return NextResponse.json(
      { error: "Не удалось отправить заявку" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
