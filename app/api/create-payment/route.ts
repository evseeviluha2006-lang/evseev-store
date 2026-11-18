import { NextResponse } from "next/server";
import { computeTotals, getProduct, type CartLine } from "@/lib/products";
import { escapeHtml, sendToTelegram } from "@/lib/telegram";

const MAX_ITEMS = 50;
const MAX_QUANTITY = 10;
const MAX_AMOUNT = 1_000_000;

type Customer = {
  name: string;
  phone: string;
  address: string;
  comment: string;
};

function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parseCustomer(value: unknown): Customer {
  const raw = (value ?? {}) as Record<string, unknown>;
  return {
    name: clean(raw.name, 120),
    phone: clean(raw.phone, 40),
    address: clean(raw.address, 300),
    comment: clean(raw.comment, 500),
  };
}

function parseItems(value: unknown): string | CartLine[] {
  if (!Array.isArray(value) || value.length === 0) {
    return "Корзина пуста";
  }
  if (value.length > MAX_ITEMS) {
    return "Слишком много позиций в заказе";
  }

  const lines: CartLine[] = [];

  for (const raw of value) {
    if (!raw || typeof raw !== "object") {
      return "Некорректная позиция заказа";
    }

    const item = raw as Record<string, unknown>;
    const id = typeof item.id === "string" ? item.id : "";
    const product = getProduct(id);

    if (!product) {
      return `Неизвестный товар: ${id || "без id"}`;
    }

    const size = typeof item.size === "string" ? item.size : "";
    if (product.sizes.length > 0 && !product.sizes.includes(size)) {
      return `Неверный размер для ${product.name}`;
    }

    const quantity = Number(item.quantity ?? 1);
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      return `Неверное количество для ${product.name}`;
    }

    lines.push({ id, size, quantity });
  }

  return lines;
}

function buildReceipt(
  totals: ReturnType<typeof computeTotals>,
  customer: Customer
) {
  const vatCode = Number(process.env.YOOKASSA_VAT_CODE ?? 1);

  return {
    customer: {
      full_name: customer.name,
      phone: customer.phone,
    },
    items: totals.items.map((item) => ({
      description: item.product.name.slice(0, 128),
      quantity: String(item.quantity),
      amount: {
        value: item.product.price.toFixed(2),
        currency: "RUB",
      },
      vat_code: Number.isFinite(vatCode) ? vatCode : 1,
    })),
  };
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return fail("Некорректный запрос");
    }

    const data = (body ?? {}) as Record<string, unknown>;

    // ВАЖНО: сумму считаем только на сервере по своему каталогу.
    // Клиент присылает лишь id / размер / количество.
    const parsedItems = parseItems(data.items);
    if (typeof parsedItems === "string") {
      return fail(parsedItems);
    }

    const customer = parseCustomer(data.customer);
    if (!customer.name || !customer.phone || !customer.address) {
      return fail("Заполните имя, телефон и адрес доставки");
    }

    const totals = computeTotals(parsedItems);
    if (totals.items.length === 0 || totals.total <= 0) {
      return fail("Неверная сумма заказа");
    }
    if (totals.total > MAX_AMOUNT) {
      return fail("Сумма заказа слишком большая");
    }

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;

    if (!shopId || !secretKey) {
      console.error("Нет ключей ЮKassa в env (YOOKASSA_SHOP_ID / YOOKASSA_SECRET_KEY)");
      // Пользователю не показываем техническую формулировку — она пугает.
      return fail(
        "Оплата временно недоступна. Напишите в Telegram @evs_clo — оформим заказ вручную.",
        503
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      new URL(request.url).origin;

    const orderId = `EVS-${Date.now()}`;

    const payload: Record<string, unknown> = {
      amount: {
        value: totals.total.toFixed(2),
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: `${origin}/success?orderId=${encodeURIComponent(orderId)}`,
      },
      description: `Заказ EVSEEV ${orderId} (${customer.name})`.slice(0, 128),
      metadata: {
        order_id: orderId,
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_address: customer.address,
        customer_comment: customer.comment,
        items: totals.items
          .map((item) => `${item.id}/${item.size || "-"}x${item.quantity}`)
          .join(", ")
          .slice(0, 512),
      },
    };

    // Чек (54-ФЗ) включается только если касса настроена в кабинете ЮKassa.
    // При скидке за комплект чек не отправляем: сумма позиций не совпадёт с платежом.
    if (process.env.YOOKASSA_SEND_RECEIPT === "true" && totals.discount === 0) {
      payload.receipt = buildReceipt(totals, customer);
    }

    const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");

    const response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
        "Idempotence-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);
    const confirmationUrl = result?.confirmation?.confirmation_url;

    if (!response.ok || !confirmationUrl) {
      console.error("YooKassa API Error:", response.status, result);
      return fail(
        result?.description || result?.error_description || "Ошибка ЮKassa",
        502
      );
    }

    // Заказ создан — уведомляем, не дожидаясь оплаты.
    await sendToTelegram(
      [
        "🛒 <b>Новый заказ (ожидает оплаты)</b>",
        "",
        `<b>Заказ:</b> ${escapeHtml(orderId)}`,
        `<b>Сумма:</b> ${escapeHtml(totals.total.toFixed(2))} ₽`,
        "",
        totals.items
          .map(
            (item) =>
              `• ${escapeHtml(item.product.name)} — ${escapeHtml(
                item.size || "без размера"
              )} × ${item.quantity}`
          )
          .join("\n"),
        "",
        `<b>Имя:</b> ${escapeHtml(customer.name)}`,
        `<b>Телефон:</b> ${escapeHtml(customer.phone)}`,
        `<b>Адрес:</b> ${escapeHtml(customer.address)}`,
        customer.comment
          ? `<b>Комментарий:</b> ${escapeHtml(customer.comment)}`
          : "",
      ]
        .filter(Boolean)
        .join("\n")
    );

    return NextResponse.json({ url: confirmationUrl, orderId });
  } catch (error) {
    console.error("Server Error:", error);
    return fail("Внутренняя ошибка сервера", 500);
  }
}
