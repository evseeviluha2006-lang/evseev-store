import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  publishTelegramPost,
  type TelegramButton,
} from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const ALLOWED_URL = /^(https?:\/\/|tg:\/\/)/i;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

type AuthResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

function checkPassword(request: Request, formPassword?: string): AuthResult {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return {
      ok: false,
      status: 500,
      error:
        "ADMIN_PASSWORD не задан в переменных окружения. Добавь его в Vercel и передеплой.",
    };
  }

  const provided =
    request.headers.get("x-admin-password") || formPassword || "";

  if (!provided || !safeEqual(provided, expected)) {
    return { ok: false, status: 401, error: "Неверный пароль" };
  }

  return { ok: true };
}

function maskChannel(id: string): string {
  if (id.startsWith("@")) return id;
  if (id.length <= 6) return id;
  return `${id.slice(0, 4)}…${id.slice(-4)}`;
}

function resolveChatId(target: string): string | null {
  const channel = process.env.TELEGRAM_CHANNEL_ID;
  const chat = process.env.TELEGRAM_CHAT_ID;

  if (target === "test") {
    return chat || channel || null;
  }

  return channel || chat || null;
}

export async function GET(request: Request) {
  const auth = checkPassword(request);
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.error },
      { status: auth.status }
    );
  }

  const channel = process.env.TELEGRAM_CHANNEL_ID;
  const chat = process.env.TELEGRAM_CHAT_ID;

  return NextResponse.json({
    ok: true,
    botToken: Boolean(process.env.TELEGRAM_BOT_TOKEN),
    channel: channel ? maskChannel(channel) : null,
    chat: Boolean(chat),
    canPost: Boolean(
      process.env.TELEGRAM_BOT_TOKEN && (channel || chat)
    ),
  });
}

export async function POST(request: Request) {
  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Некорректный запрос" },
      { status: 400 }
    );
  }

  const password = clean(form.get("password"), 200);
  const auth = checkPassword(request, password);
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.error },
      { status: auth.status }
    );
  }

  const caption = clean(form.get("caption"), 4096);
  const buttonText = clean(form.get("buttonText"), 64);
  const buttonUrl = clean(form.get("buttonUrl"), 500);
  const photoUrl = clean(form.get("photoUrl"), 1000);
  const target = clean(form.get("target"), 20) === "test" ? "test" : "channel";
  const parseMode =
    clean(form.get("html"), 4) === "1" ? ("HTML" as const) : undefined;

  if (!caption) {
    return NextResponse.json(
      { error: "Добавь текст поста" },
      { status: 400 }
    );
  }

  if (!buttonText !== !buttonUrl) {
    return NextResponse.json(
      { error: "У кнопки должны быть и текст, и ссылка" },
      { status: 400 }
    );
  }

  if (buttonUrl && !ALLOWED_URL.test(buttonUrl)) {
    return NextResponse.json(
      { error: "Ссылка кнопки должна начинаться с https:// или tg://" },
      { status: 400 }
    );
  }

  if (photoUrl && !/^https?:\/\//i.test(photoUrl)) {
    return NextResponse.json(
      { error: "Ссылка на картинку должна начинаться с https://" },
      { status: 400 }
    );
  }

  if (caption.length > 1024 && (photoUrl || form.get("photo"))) {
    return NextResponse.json(
      {
        error:
          "С картинкой подпись не может быть длиннее 1024 символов — сократи текст.",
      },
      { status: 400 }
    );
  }

  const rawPhoto = form.get("photo");
  let photo: Blob | { url: string } | undefined;

  if (rawPhoto instanceof Blob && rawPhoto.size > 0) {
    if (!rawPhoto.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Файл должен быть картинкой" },
        { status: 400 }
      );
    }

    if (rawPhoto.size > MAX_PHOTO_BYTES) {
      return NextResponse.json(
        { error: "Картинка больше 4 МБ — сожми её или дай ссылку" },
        { status: 400 }
      );
    }

    photo = rawPhoto;
  } else if (photoUrl) {
    photo = { url: photoUrl };
  }

  const chatId = resolveChatId(target);

  if (!chatId) {
    return NextResponse.json(
      {
        error:
          "Не задан chat_id канала. Добавь TELEGRAM_CHANNEL_ID в Vercel (например @username или -100…).",
      },
      { status: 500 }
    );
  }

  const button: TelegramButton | undefined = buttonText && buttonUrl
    ? { text: buttonText, url: buttonUrl }
    : undefined;

  const result = await publishTelegramPost({
    chatId,
    text: caption,
    photo,
    photoFilename: "post.jpg",
    button,
    parseMode,
  });

  if (!result.ok) {
    console.error("Не удалось опубликовать пост:", result.error);
    return NextResponse.json(
      { error: result.error },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    messageId: result.messageId,
    target,
  });
}
