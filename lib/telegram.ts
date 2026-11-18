// Только для серверного кода (Route Handlers).
// НЕ импортировать в компоненты с "use client" — токен должен жить только в env.

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendToTelegram(text: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error(
      "Telegram: не заданы переменные окружения TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID"
    );
    return false;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      console.error(
        "Telegram API error:",
        response.status,
        await response.text().catch(() => "")
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
    return false;
  }
}
