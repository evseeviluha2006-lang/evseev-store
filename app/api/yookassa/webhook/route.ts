import { NextResponse } from "next/server";
import { escapeHtml, sendToTelegram } from "@/lib/telegram";

/**
 * Вебхук ЮKassa.
 * Тело запроса не подписано, поэтому статус платежа обязательно
 * перепроверяем отдельным запросом к API.
 *
 * Настройка: Личный кабинет ЮKassa → Интеграция → HTTP-уведомления
 * URL: https://<домен>/api/yookassa/webhook, событие payment.succeeded
 */
export async function POST(request: Request) {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;

  if (!shopId || !secretKey) {
    console.error("Webhook: нет ключей ЮKassa в env");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const event = (body as { event?: string } | null)?.event;
  const paymentId = (body as { object?: { id?: string } } | null)?.object?.id;

  if (event !== "payment.succeeded" || typeof paymentId !== "string") {
    // Остальные события нам не нужны, но отвечаем 200, чтобы ЮKassa не ретраила
    return NextResponse.json({ ok: true });
  }

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");

  const response = await fetch(
    `https://api.yookassa.ru/v3/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );

  if (!response.ok) {
    console.error("Webhook: не удалось проверить платёж", paymentId, response.status);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  const payment = await response.json().catch(() => null);

  if (payment?.status !== "succeeded") {
    return NextResponse.json({ ok: true });
  }

  const metadata = (payment.metadata ?? {}) as Record<string, unknown>;
  const amount = payment?.amount?.value ?? "—";
  const orderId = typeof metadata.order_id === "string" ? metadata.order_id : paymentId;

  await sendToTelegram(
    [
      "✅ <b>Оплата получена</b>",
      "",
      `<b>Заказ:</b> ${escapeHtml(orderId)}`,
      `<b>Сумма:</b> ${escapeHtml(String(amount))} ₽`,
      "",
      `<b>Имя:</b> ${escapeHtml(String(metadata.customer_name ?? "—"))}`,
      `<b>Телефон:</b> ${escapeHtml(String(metadata.customer_phone ?? "—"))}`,
      `<b>Адрес:</b> ${escapeHtml(String(metadata.customer_address ?? "—"))}`,
      metadata.customer_comment
        ? `<b>Комментарий:</b> ${escapeHtml(String(metadata.customer_comment))}`
        : "",
      `<b>Состав:</b> ${escapeHtml(String(metadata.items ?? "—"))}`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return NextResponse.json({ ok: true });
}
