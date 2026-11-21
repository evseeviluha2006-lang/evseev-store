"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartLines, writeCart } from "@/lib/cart";
import { computeTotals, formatPrice } from "@/lib/products";
import { useIsClient } from "@/lib/use-is-client";

export default function CheckoutPage() {
  const lines = useCartLines();
  const isClient = useIsClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const totals = computeTotals(lines);
  const hasMissingSize = totals.items.some(
    (item) => !item.size && item.product.sizes.length > 0
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !phone || !address) {
      alert("Пожалуйста, заполни имя, телефон и адрес доставки.");
      return;
    }

    if (hasMissingSize) {
      alert("Вернись в корзину и выбери размер для всех товаров.");
      return;
    }

    if (totals.items.length === 0) {
      alert("Корзина пуста.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Цену на сервере считает /api/create-payment из своего каталога.
      // Клиент отправляет только состав заказа и данные доставки.
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: totals.items.map((item) => ({
            id: item.id,
            size: item.size,
            quantity: item.quantity,
          })),
          customer: { name, phone, address, comment },
        }),
      });

      const data: { url?: string; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (data.url) {
        writeCart([]);
        window.location.assign(data.url);
      } else {
        alert("Ошибка при создании платежа: " + (data.error || "Попробуйте позже"));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка соединения с платежной системой.");
      setIsSubmitting(false);
    }
  };

  if (!isClient) return null;

  if (totals.items.length === 0) {
    return (
      <main className="wrap flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow text-muted">Checkout</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,7vw,5rem)]">КОРЗИНА ПУСТА</h1>
        <p className="mt-4 text-[13px] text-muted">
          Добавьте вещи в корзину, чтобы оформить заказ.
        </p>
        <Link
          href="/catalog"
          className="mt-8 bg-ink px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          В магазин
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="wrap pt-10 pb-6 md:pt-16 md:pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="eyebrow text-muted">Checkout / Secure payment</p>
            <h1 className="display mt-4 text-[clamp(2.6rem,7.5vw,6rem)]">ОФОРМЛЕНИЕ</h1>
          </div>
          <Link
            href="/cart"
            className="group mb-1 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted hover:text-ink"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
              ←
            </span>
            В корзину
          </Link>
        </div>
      </section>

      <section className="wrap grid gap-10 pb-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.18em]">
                01 / Данные для доставки
              </h2>
              <span className="text-[9px] uppercase tracking-[0.14em] text-muted">
                * обязательные поля
              </span>
            </div>

            <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
              <div>
                <label htmlFor="customer-name" className="eyebrow text-muted">
                  Имя и фамилия *
                </label>
                <input
                  id="customer-name"
                  required
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Иван Иванов"
                  className="field mt-1"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="customer-phone" className="eyebrow text-muted">
                  Телефон *
                </label>
                <input
                  id="customer-phone"
                  required
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="field mt-1"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="customer-address" className="eyebrow text-muted">
                Адрес доставки или ПВЗ *
              </label>
              <input
                id="customer-address"
                required
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Город, улица, дом, квартира или номер ПВЗ"
                className="field mt-1"
                autoComplete="street-address"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="customer-comment" className="eyebrow text-muted">
                Комментарий к заказу
              </label>
              <textarea
                id="customer-comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Пожелания по упаковке, удобное время звонка..."
                rows={3}
                className="field mt-1 resize-none"
              />
            </div>
          </div>

          <div>
            <div className="border-b border-line pb-3">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.18em]">
                02 / Оплата
              </h2>
            </div>

            <div className="mt-5 flex items-start gap-3 border border-line p-4">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.06em]">
                  Банковская карта — ЮKassa
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted">
                  Безопасная оплата на стороне платёжного сервиса. После оплаты
                  вы вернётесь на сайт.
                </p>
              </div>
            </div>
          </div>

          {hasMissingSize && (
            <p className="border border-ink bg-paper px-4 py-3 text-[10px] uppercase leading-relaxed tracking-[0.12em]">
              У некоторых товаров не выбран размер.{" "}
              <Link href="/cart" className="underline underline-offset-4">
                Вернуться в корзину
              </Link>
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group flex w-full items-center justify-between gap-6 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors md:py-5 ${
                isSubmitting
                  ? "cursor-not-allowed bg-ink/10 text-ink/40"
                  : "bg-ink text-paper hover:bg-paper hover:text-ink"
              }`}
            >
              {isSubmitting ? "Переход к оплате..." : "Подтвердить заказ"}
              {!isSubmitting && (
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              )}
            </button>

            <p className="mt-3 text-[9px] uppercase leading-relaxed tracking-[0.12em] text-muted">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <Link href="/offer" className="text-ink underline underline-offset-4">
                публичной офертой
              </Link>
            </p>
          </div>
        </form>

        {/* СВОДКА */}
        <aside className="h-fit border border-ink bg-paper-2/40 p-5 lg:sticky lg:top-[96px] md:p-7">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-muted">Ваш заказ</p>
            <span className="text-[9px] uppercase tracking-[0.14em] text-muted">
              {totals.items.length} поз.
            </span>
          </div>

          <div className="mt-5 space-y-4 border-t border-line pt-5">
            {totals.items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-3">
                <div className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-paper-2">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <span className="absolute right-0 bottom-0 bg-ink px-1 text-[8px] tabular-nums text-paper">
                    {item.quantity}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase leading-snug tracking-[0.04em]">
                    {item.product.name}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-muted">
                    {item.size || "ONE SIZE"}
                  </p>
                  <p className="mt-1 text-[10px] tabular-nums text-muted">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-[11px]">
            <div className="flex justify-between gap-4">
              <dt className="uppercase tracking-[0.12em] text-muted">Подытог</dt>
              <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
            </div>

            {totals.discount > 0 && (
              <div className="flex justify-between gap-4 bg-ink px-2 py-1.5 text-paper">
                <dt className="uppercase tracking-[0.12em]">Комплект −15%</dt>
                <dd className="tabular-nums">−{formatPrice(totals.discount)}</dd>
              </div>
            )}

            <div className="flex justify-between gap-4">
              <dt className="uppercase tracking-[0.12em] text-muted">Доставка</dt>
              <dd className="text-[9px] uppercase tracking-[0.1em] text-muted">
                по тарифам СДЭК
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex items-end justify-between border-t border-ink pt-4">
            <span className="text-[10px] uppercase tracking-[0.16em]">Итого</span>
            <span className="text-[24px] leading-none tabular-nums">
              {formatPrice(totals.total)}
            </span>
          </div>

          <div className="mt-6 space-y-2 border-t border-line pt-4 text-[9px] uppercase tracking-[0.14em] text-muted">
            <p>Оплата картой через ЮKassa</p>
            <p>Доставка СДЭК / Почта России</p>
            <p>Возврат в течение 7 дней</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
