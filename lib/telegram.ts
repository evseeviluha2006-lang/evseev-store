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

/* ---------- Публикация постов в канал ---------- */

export type TelegramButton = {
  text: string;
  url: string;
};

export type TelegramPublishInput = {
  chatId: string;
  text: string;
  /** Файл картинки или ссылка на неё. Без картинки уйдёт обычное сообщение. */
  photo?: Blob | { url: string };
  photoFilename?: string;
  button?: TelegramButton;
  parseMode?: "HTML";
};

export type TelegramPublishResult =
  | { ok: true; messageId: number }
  | { ok: false; error: string };

function buildReplyMarkup(button?: TelegramButton) {
  if (!button) return undefined;
  return { inline_keyboard: [[{ text: button.text, url: button.url }]] };
}

/**
 * Публикует пост от имени бота.
 * Бот должен быть админом канала с правом «Публикация сообщений».
 */
export async function publishTelegramPost(
  input: TelegramPublishInput
): Promise<TelegramPublishResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN не задан" };
  }

  const hasPhoto = Boolean(input.photo);
  const method = hasPhoto ? "sendPhoto" : "sendMessage";
  const endpoint = `https://api.telegram.org/bot${token}/${method}`;
  const replyMarkup = buildReplyMarkup(input.button);

  try {
    let response: Response;

    if (hasPhoto && input.photo) {
      const form = new FormData();
      form.append("chat_id", input.chatId);
      form.append("caption", input.text.slice(0, 1024));
      if (input.parseMode) form.append("parse_mode", input.parseMode);
      if (replyMarkup) {
        form.append("reply_markup", JSON.stringify(replyMarkup));
      }

      if ("url" in input.photo) {
        form.append("photo", input.photo.url);
      } else {
        form.append(
          "photo",
          input.photo,
          input.photoFilename || "post.jpg"
        );
      }

      response = await fetch(endpoint, { method: "POST", body: form });
    } else {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: input.chatId,
          text: input.text.slice(0, 4096),
          ...(input.parseMode ? { parse_mode: input.parseMode } : {}),
          ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
          link_preview_options: {
            is_disabled: false,
            prefer_large_media: true,
          },
        }),
      });
    }

    const data = (await response.json().catch(() => null)) as
      | {
          ok?: boolean;
          result?: { message_id?: number };
          description?: string;
        }
      | null;

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        error: data?.description || `Telegram API ${response.status}`,
      };
    }

    return { ok: true, messageId: data.result?.message_id ?? 0 };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Ошибка сети",
    };
  }
}
