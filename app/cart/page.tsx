"use client";

import Image from "next/image";
import Link from "next/link";
import { countCartItems, useCartLines, writeCart } from "@/lib/cart";
import { computeTotals, formatPrice, MAX_QUANTITY, type CartLine } from "@/lib/products";
import { useIsClient } from "@/lib/use-is-client";

export default function CartPage() {
  const lines = useCartLines();
  const isClient = useIsClient();

  const save = (next: CartLine[]) => {
    writeCart(next);
  };

  const setSize = (id: string, oldSize: string, newSize: string) => {
    const target = lines.find((line) => line.id === id && line.size === oldSize);
    if (!target) return;

    const without = lines.filter((line) => !(line.id === id && line.size === oldSize));
    const existing = without.find((line) => line.id === id && line.size === newSize);

    const next = existing
      ? without.map((line) =>
          line.id === id && line.size === newSize
            ? {
                ...line,
                quantity: Math.min(MAX_QUANTITY, line.quantity + target.quantity),
              }
            : line
        )
      : [...without, { ...target, size: newSize }];

    save(next);
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    const next = lines.map((line) =>
      line.id === id && line.size === size
        ? {
            ...line,
            quantity: Math.min(MAX_QUANTITY, Math.max(1, line.quantity + delta)),
          }
        : line
    );
    save(next);
  };

  const removeItem = (id: string, size: string) => {
    save(lines.filter((line) => !(line.id === id && line.size === size)));
  };

  const clearCart = () => {
    if (!window.confirm("Очистить корзину?")) return;
    save([]);
  };

  const totals = computeTotals(lines);
  const totalItems = countCartItems(lines);
  const hasMissingSize = totals.items.some(
    (item) => !item.size && item.product.sizes.length > 0
  );

  if (!isClient) return null;

  return (
    <main>
      <section className="wrap pt-10 pb-6 md:pt-16 md:pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="eyebrow text-muted">Cart / {totalItems} items</p>
            <h1 className="display mt-4 text-[clamp(2.6rem,7.5vw,6rem)]">КОРЗИНА</h1>
          </div>
          <Link
            href="/catalog"
            className="group mb-1 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted hover:text-ink"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
              ←
            </span>
            Продолжить покупки
          </Link>
        </div>
      </section>

      <section className="wrap pb-6">
        {totals.items.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center border border-line py-16 text-center">
            <p className="eyebrow text-muted">Корзина пуста</p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              В корзине пока ничего нет. Добавь вещи из каталога, чтобы оформить заказ.
            </p>
            <Link
              href="/catalog"
              className="mt-8 bg-ink px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Перейти в магазин
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
            {/* Список */}
            <div>
              <div className="hidden grid-cols-[minmax(0,1fr)_120px_140px_100px_32px] gap-4 border-b border-line pb-3 text-[9px] uppercase tracking-[0.16em] text-muted md:grid">
                <span>Товар</span>
                <span>Размер</span>
                <span>Кол-во</span>
                <span className="text-right">Сумма</span>
                <span />
              </div>

              <div>
                {totals.items.map((item, index) => {
                  const lineKey = item.id + ":" + (item.size || "nosize") + ":" + index;
                  const missingSize = !item.size && item.product.sizes.length > 0;

                  return (
                    <div
                      key={lineKey}
                      className="grid gap-4 border-b border-line py-5 md:grid-cols-[minmax(0,1fr)_120px_140px_100px_32px] md:items-center md:gap-4"
                    >
                      <div className="flex gap-4">
                        <Link
                          href={`/catalog/${item.id}`}
                          className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-paper-2 md:w-28"
                        >
                          {item.product.images[0] && (
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              sizes="112px"
                              className="object-cover"
                            />
                          )}
                        </Link>

                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/catalog/${item.id}`}
                            className="block text-[12px] font-medium uppercase tracking-[0.04em] hover:opacity-60"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1.5 text-[11px] tabular-nums text-muted">
                            {formatPrice(item.product.price)}
                          </p>
                          {missingSize && (
                            <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-muted">
                              Выбери размер
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        {item.product.sizes.length > 0 ? (
                          <select
                            value={item.size}
                            onChange={(e) => setSize(item.id, item.size, e.target.value)}
                            className="h-10 w-full border border-line bg-transparent px-3 text-[11px] uppercase tracking-[0.06em] outline-none focus:border-ink md:w-[110px]"
                            aria-label={`Размер для ${item.product.name}`}
                          >
                            {!item.size && <option value="">Размер</option>}
                            {item.product.sizes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-[11px] text-muted">—</span>
                        )}
                      </div>

                      <div className="flex items-center">
                        <div className="inline-flex items-center border border-line">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, -1)}
                            className="grid h-10 w-10 place-items-center text-sm transition-colors hover:bg-paper-2"
                            aria-label="Уменьшить количество"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-[12px] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, 1)}
                            className="grid h-10 w-10 place-items-center text-sm transition-colors hover:bg-paper-2"
                            aria-label="Увеличить количество"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end">
                        <span className="text-[13px] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.size)}
                          className="ml-4 grid h-8 w-8 place-items-center text-lg text-muted transition-colors hover:text-ink md:hidden"
                          aria-label={`Удалить ${item.product.name}`}
                        >
                          ×
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        className="hidden h-8 w-8 place-items-center text-lg text-muted transition-colors hover:text-ink md:grid"
                        aria-label={`Удалить ${item.product.name}`}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="mt-5 text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
              >
                Очистить корзину
              </button>
            </div>

            {/* ИТОГО */}
            <aside className="lg:sticky lg:top-[100px] lg:self-start">
              <div className="border border-line p-5 md:p-6">
                <h2 className="eyebrow text-muted">Сводка заказа</h2>

                <div className="mt-5 space-y-3 border-b border-line pb-5 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Товары</span>
                    <span className="tabular-nums">{formatPrice(totals.subtotal)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex items-center justify-between text-ink">
                      <span>Скидка</span>
                      <span className="tabular-nums">−{formatPrice(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-muted">
                    <span>Доставка</span>
                    <span className="text-[10px] uppercase tracking-[0.1em]">На этапе оплаты</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between py-5">
                  <span className="text-[10px] uppercase tracking-[0.16em]">Итого</span>
                  <span className="text-xl tabular-nums">{formatPrice(totals.total)}</span>
                </div>

                {hasMissingSize && (
                  <p className="mb-4 text-[9px] uppercase tracking-[0.14em] text-muted">
                    Выбери размер для всех товаров перед оформлением
                  </p>
                )}

                <Link
                  href="/checkout"
                  className={`flex w-full items-center justify-center gap-3 bg-ink py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-ink ${
                    hasMissingSize ? "pointer-events-none opacity-40" : ""
                  }`}
                >
                  Оформить заказ
                  <span aria-hidden>→</span>
                </Link>

                <p className="mt-4 text-center text-[9px] leading-relaxed tracking-[0.04em] text-muted">
                  В сумму не включена доставка. Стоимость рассчитается на этапе оформления.
                </p>
              </div>

              <div className="mt-4 space-y-2 text-[9px] uppercase tracking-[0.14em] text-muted">
                <p>Оплата картой через ЮKassa</p>
                <p>Доставка СДЭК / Почта России</p>
                <p>Возврат в течение 7 дней</p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
