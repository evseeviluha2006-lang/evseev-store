"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

const STORAGE_KEY = "evseev-admin-password";
const SITE_URL = "https://www.evseev.store";
const PHOTO_CAPTION_LIMIT = 1024;
const TEXT_LIMIT = 4096;

type Config = {
  botToken: boolean;
  channel: string | null;
  chat: boolean;
  canPost: boolean;
};

type Status =
  | { kind: "idle" }
  | { kind: "ok"; text: string }
  | { kind: "error"; text: string };

async function compressImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const maxSide = 1600;
  const scale = Math.min(
    1,
    maxSide / Math.max(bitmap.width, bitmap.height)
  );
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas недоступен");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.9);
  });

  if (!blob) throw new Error("Не удалось сжать картинку");

  return new File([blob], "post.jpg", { type: "image/jpeg" });
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(false);
  const [authError, setAuthError] = useState("");
  const [config, setConfig] = useState<Config | null>(null);

  const [target, setTarget] = useState<"channel" | "test">("channel");
  const [caption, setCaption] = useState("");
  const [buttonText, setButtonText] = useState("SALE NOW →");
  const [buttonUrl, setButtonUrl] = useState(`${SITE_URL}/catalog`);
  const [useHtml, setUseHtml] = useState(false);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [preparing, setPreparing] = useState(false);

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const hasPhoto = Boolean(photoFile || photoUrl.trim());
  const captionLimit = hasPhoto ? PHOTO_CAPTION_LIMIT : TEXT_LIMIT;

  const previewImage = photoPreview || photoUrl.trim() || null;

  const verify = useCallback(async (value: string) => {
    if (!value) {
      setAuthError("Введи пароль");
      return;
    }

    setChecking(true);
    setAuthError("");

    try {
      const response = await fetch("/api/admin/telegram-post", {
        headers: { "x-admin-password": value },
        cache: "no-store",
      });
      const data = (await response.json().catch(() => ({}))) as
        | Config
        | { error?: string };

      if (!response.ok) {
        sessionStorage.removeItem(STORAGE_KEY);
        setAuthorized(false);
        setConfig(null);
        setAuthError(
          "error" in data && data.error ? data.error : "Неверный пароль"
        );
        return;
      }

      sessionStorage.setItem(STORAGE_KEY, value);
      setPassword(value);
      setConfig(data as Config);
      setAuthorized(true);
    } catch {
      setAuthError("Нет связи с сервером. Попробуй ещё раз.");
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    // Автовход откладываем на микрозадачу, чтобы не дёргать state прямо в эффекте
    queueMicrotask(() => void verify(saved));
  }, [verify]);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    void verify(password);
  };

  const handleFile = async (file: File | null) => {
    if (!file) {
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }

    setPreparing(true);
    setStatus({ kind: "idle" });
    setPhotoUrl("");

    try {
      const prepared = await compressImage(file);
      setPhotoFile(prepared);
      setPhotoPreview(URL.createObjectURL(prepared));
    } catch {
      setStatus({
        kind: "error",
        text: "Не удалось прочитать картинку. Попробуй JPG или PNG.",
      });
    } finally {
      setPreparing(false);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!authorized) return;

    setSending(true);
    setStatus({ kind: "idle" });

    try {
      const form = new FormData();
      form.append("password", password);
      form.append("target", target);
      form.append("caption", caption);
      form.append("buttonText", buttonText);
      form.append("buttonUrl", buttonUrl);

      if (photoFile) {
        form.append("photo", photoFile);
      } else if (photoUrl.trim()) {
        form.append("photoUrl", photoUrl.trim());
      }

      if (useHtml) form.append("html", "1");

      const response = await fetch("/api/admin/telegram-post", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: form,
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        messageId?: number;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus({
          kind: "error",
          text: data.error || "Не удалось опубликовать пост",
        });
        return;
      }

      setStatus({
        kind: "ok",
        text:
          target === "test"
            ? `Отправлено в личный чат с ботом (message_id ${data.messageId ?? "—"}). Проверь Telegram.`
            : `Опубликовано в канал (message_id ${data.messageId ?? "—"}).`,
      });
    } catch {
      setStatus({
        kind: "error",
        text: "Сервер не ответил. Проверь интернет и попробуй ещё раз.",
      });
    } finally {
      setSending(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthorized(false);
    setConfig(null);
    setPassword("");
    setAuthError("");
  };

  const targetLabel = useMemo(() => {
    if (target === "test") return "личный чат с ботом (тест)";
    if (config?.channel) return `канал ${config.channel}`;
    return "канал";
  }, [target, config]);

  if (!authorized) {
    return (
      <main className="wrap flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-sm border-t border-ink pt-7">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow text-muted">EVSEEV / Admin</p>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-ink text-[14px]">
              ✈
            </span>
          </div>

          <h1 className="display mt-6 text-[clamp(2.4rem,7vw,3.6rem)]">
            ПОСТ
            <br />В TELEGRAM
          </h1>

          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            Введи пароль администратора, чтобы публиковать посты в канал.
          </p>

          <form onSubmit={handleLogin} className="mt-8">
            <label className="eyebrow block text-muted" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field mt-2"
              placeholder="••••••••"
            />

            {authError ? (
              <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.14em] text-red-600">
                {authError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={checking}
              className="mt-7 flex w-full items-center justify-between gap-5 bg-ink px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
            >
              {checking ? "Проверяю…" : "Войти"}
              <span aria-hidden>→</span>
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink pb-6">
        <div>
          <p className="eyebrow text-muted">EVSEEV / Admin</p>
          <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4.6rem)]">
            ПОСТ В TELEGRAM
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="eyebrow text-muted">Публикация</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em]">
              {config?.channel || config?.chat ? targetLabel : "канал не задан"}
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="border border-line px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-ink hover:text-ink"
          >
            Выйти
          </button>
        </div>
      </div>

      {config && !config.canPost ? (
        <div className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-[11px] uppercase leading-relaxed tracking-[0.12em] text-red-700">
          Не хватает настроек:{" "}
          {[
            !config.botToken ? "TELEGRAM_BOT_TOKEN" : null,
            !(config.channel || config.chat) ? "TELEGRAM_CHANNEL_ID" : null,
          ]
            .filter(Boolean)
            .join(", ")}
          . Добавь их в Vercel и передеплой.
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14"
      >
        <div className="space-y-8">
          <fieldset>
            <legend className="eyebrow text-muted">Куда публиковать</legend>
            <div className="mt-3 flex gap-2">
              {(
                [
                  { value: "channel", label: "В канал" },
                  { value: "test", label: "В мой чат (тест)" },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTarget(option.value)}
                  className={`flex-1 border px-4 py-3 text-[9px] uppercase tracking-[0.16em] transition-colors ${
                    target === option.value
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {target === "channel" && !config?.channel ? (
              <p className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                TELEGRAM_CHANNEL_ID не задан — пост уйдёт в чат из
                TELEGRAM_CHAT_ID.
              </p>
            ) : null}
          </fieldset>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label className="eyebrow text-muted" htmlFor="caption">
                Текст поста
              </label>
              <span
                className={`text-[10px] tabular-nums tracking-[0.1em] ${
                  caption.length > captionLimit ? "text-red-600" : "text-muted"
                }`}
              >
                {caption.length} / {captionLimit}
              </span>
            </div>
            <textarea
              id="caption"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              rows={8}
              className="field mt-2 resize-y text-[14px] leading-relaxed"
              placeholder={"Например:\n\nBURGENZIPPER — уже в магазине.\nФутер 2 нитка с начёсом. Размер L.\n6490 ₽"}
            />
            <label className="mt-3 flex items-start gap-3 text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted">
              <input
                type="checkbox"
                checked={useHtml}
                onChange={(event) => setUseHtml(event.target.checked)}
                className="check mt-0.5 shrink-0"
              />
              <span>
                HTML-разметка (Telegram: &lt;b&gt;жирный&lt;/b&gt;,{" "}
                &lt;i&gt;курсив&lt;/i&gt;)
              </span>
            </label>
          </div>

          <div>
            <p className="eyebrow text-muted">Картинка</p>

            <label className="mt-3 flex cursor-pointer items-center justify-between gap-4 border border-dashed border-line px-4 py-5 transition-colors hover:border-ink">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em]">
                  {preparing
                    ? "Сжимаю…"
                    : photoFile
                      ? "Картинка выбрана — заменить"
                      : "Выбрать файл"}
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted">
                  JPG/PNG/WebP. Сожму до 1600 px и 4 МБ автоматически.
                </p>
              </div>
              <span aria-hidden className="text-[16px]">
                +
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                  void handleFile(event.target.files?.[0] ?? null)
                }
              />
            </label>

            <div className="mt-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-line" />
              <span className="text-[9px] uppercase tracking-[0.16em] text-muted">
                или ссылка
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <input
              type="url"
              value={photoUrl}
              onChange={(event) => {
                setPhotoUrl(event.target.value);
                if (event.target.value.trim()) removePhoto();
              }}
              className="field mt-2"
              placeholder="https://…/photo.jpg"
            />

            {previewImage ? (
              <div className="mt-4 flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImage}
                  alt="Предпросмотр"
                  className="h-28 w-28 border border-line object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    removePhoto();
                    setPhotoUrl("");
                  }}
                  className="text-[9px] uppercase tracking-[0.16em] text-muted underline underline-offset-4 hover:text-ink"
                >
                  Убрать картинку
                </button>
              </div>
            ) : null}
          </div>

          <div>
            <p className="eyebrow text-muted">Кнопка под постом</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-[9px] uppercase tracking-[0.16em] text-muted"
                  htmlFor="buttonText"
                >
                  Текст кнопки
                </label>
                <input
                  id="buttonText"
                  type="text"
                  value={buttonText}
                  onChange={(event) => setButtonText(event.target.value)}
                  className="field"
                  placeholder="SALE NOW →"
                  maxLength={64}
                />
              </div>
              <div>
                <label
                  className="text-[9px] uppercase tracking-[0.16em] text-muted"
                  htmlFor="buttonUrl"
                >
                  Ссылка кнопки
                </label>
                <input
                  id="buttonUrl"
                  type="url"
                  value={buttonUrl}
                  onChange={(event) => setButtonUrl(event.target.value)}
                  className="field"
                  placeholder={`${SITE_URL}/catalog`}
                />
              </div>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-muted">
              Чтобы кнопки не было — оставь оба поля пустыми.
            </p>
          </div>

          {status.kind !== "idle" ? (
            <p
              className={`border px-4 py-3 text-[11px] uppercase leading-relaxed tracking-[0.12em] ${
                status.kind === "ok"
                  ? "border-ink bg-ink text-paper"
                  : "border-red-300 bg-red-50 text-red-700"
              }`}
            >
              {status.text}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={
              sending ||
              preparing ||
              !caption.trim() ||
              caption.length > captionLimit
            }
            className="flex w-full items-center justify-between gap-5 bg-ink px-6 py-5 text-[10px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            {sending ? "Публикую…" : `Опубликовать ${target === "test" ? "в чат" : "в канал"}`}
            <span aria-hidden>→</span>
          </button>
        </div>

        {/* ПРЕДПРОСМОТР */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-muted">Предпросмотр</p>

          <div className="mt-3 overflow-hidden border border-line bg-[#17212b] text-white">
            {previewImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewImage}
                alt=""
                className="max-h-[420px] w-full object-cover"
              />
            ) : null}

            <div className="px-4 py-3">
              {caption ? (
                <p className="whitespace-pre-wrap break-words text-[13px] leading-relaxed">
                  {caption}
                </p>
              ) : (
                <p className="text-[13px] leading-relaxed text-white/40">
                  Здесь появится текст поста…
                </p>
              )}
              <p className="mt-2 text-right text-[9px] tracking-[0.06em] text-white/40">
                {new Date().toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {buttonText && buttonUrl ? (
              <div className="px-3 pb-3">
                <div className="flex items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-2.5 text-[12px] font-medium text-[#7ab8e8]">
                  {buttonText}
                </div>
              </div>
            ) : null}
          </div>

          <ul className="mt-5 space-y-2 border-t border-line pt-4 text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted">
            <li>Бот должен быть админом канала.</li>
            <li>Пост публикуется сразу, без подтверждения.</li>
            <li>Ограничение подписи с фото — 1024 символа.</li>
          </ul>
        </aside>
      </form>
    </main>
  );
}
