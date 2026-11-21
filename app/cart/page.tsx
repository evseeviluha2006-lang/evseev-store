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

      {totals.items.length === 0 ? (
        <section className="wrap pb-8">
          <div className="flex min-h-[360px] flex-col items-center justify-center border border-line px-6 py-20 text-center">
            <p className="eyebrow text-muted">Empty</p>
            <h2 className="display-sm mt-4 text-[clamp(2rem,5vw,3.6rem)]">ПОКА ПУСТО</h2>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted">
              В корзине нет вещей. Начните с новой капсулы или архивных моделей.
            </p>
            <Link
              href="/catalog"
              className="mt-7 bg-ink px-7 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Перейти в магазин
            </Link>
          </div>
        </section>
      ) : (
        <section className="wrap grid gap-10 pb-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          {/* ТОВАРЫ */}
          <div>
            {totals.items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="grid grid-cols-[84px_minmax(0,1fr)] items-start gap-4 border-t border-line py-5 md:grid-cols-[104px_minmax(0,1fr)_130px_32px] md:items-center md:gap-5"
              >
                <Link
                  href={`/catalog/${item.id}`}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-paper-2"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="110px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>

                <div className="min-w-0">
                  <Link
                    href={`/catalog/${item.id}`}
                    className="text-[11px] font-medium uppercase leading-snug tracking-[0.05em] hover:text-muted md:text-[12px]"
                  >
                    {item.product.name}
                  </Link>

                  {item.product.sizes.length > 0 ? (
                    <label className="mt-2 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-muted">
                      <span className="sr-only">Размер</span>
                      <select
                        value={item.size}
                        onChange={(event) => setSize(item.id, item.size, event.target.value)}
                        className={`cursor-pointer border-b bg-transparent py-1 pr-4 text-[9px] uppercase tracking-[0.14em] outline-none ${
                          item.size ? "border-line text-ink" : "border-ink text-ink"
                        }`}
                      >
                        <option value="" disabled>
                          Выбрать размер
                        </option>
                        {item.product.sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-muted">
                      {item.product.isMystery ? "Рандом / случайный выбор" : "ONE SIZE"}
                    </p>
                  )}

                  <p className="mt-2 text-[11px] tabular-nums text-muted md:hidden">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id, item.size)}
                    className="mt-2 text-[9px] uppercase tracking-[0.14em] text-muted underline-offset-4 hover:text-ink hover:underline md:hidden"
                  >
                    Удалить
                  </button>
                </div>

                <div className="col-span-2 flex items-center justify-between md:col-span-1 md:justify-start">
                  <div className="flex items-center border border-line">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.size, -1)}
                      aria-label="Уменьшить количество"
                      className="grid h-9 w-9 place-items-center text-[13px] transition-colors hover:bg-ink hover:text-paper"
                    >
                      −
                    </button>
                    <span className="grid h-9 w-9 place-items-center border-x border-line text-[11px] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.size, 1)}
                      aria-label="Увеличить количество"
                      className="grid h-9 w-9 place-items-center text-[13px] transition-colors hover:bg-ink hover:text-paper"
                    >
                      +
                    </button>
                  </div>

                  <div className="hidden text-[12px] tabular-nums md:block">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>

                <div className="hidden text-right md:block">
                  <div className="text-[12px] tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.size)}
                  aria-label={`Удалить ${item.product.name}`}
                  className="hidden h-8 w-8 place-items-center text-muted transition-colors hover:text-ink md:grid"
                >
                  ×
                </button>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-line pt-4">
              <span className="text-[9px] uppercase tracking-[0.16em] text-muted">
                {totalItems} поз. в корзине
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="text-[9px] uppercase tracking-[0.16em] text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Очистить корзину
              </button>
            </div>
          </div>

          {/* ИТОГ */}
          <aside className="h-fit border border-ink bg-paper-2/40 p-6 lg:sticky lg:top-[96px] md:p-7">
            <p className="eyebrow text-muted">Order summary</p>
            <h2 className="display-sm mt-3 text-[26px]">ИТОГО</h2>

            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[11px]">
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
                <dd className="text-right text-[10px] uppercase tracking-[0.08em] text-muted">
                  рассчитаем при оформлении
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-end justify-between border-t border-ink pt-4">
              <span className="text-[10px] uppercase tracking-[0.16em]">К оплате</span>
              <span className="text-[24px] leading-none tabular-nums">{formatPrice(totals.total)}</span>
            </div>

            {hasMissingSize ? (
              <span className="mt-5 flex cursor-not-allowed items-center justify-center bg-ink/10 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
                Выберите размер
              </span>
            ) : (
              <Link
                href="/checkout"
                className="group mt-5 flex items-center justify-between gap-6 bg-ink px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Оформить заказ
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            )}

            {hasMissingSize && (
              <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-muted">
                У одной из вещей не выбран размер
              </p>
            )}

            <div className="mt-6 space-y-2 border-t border-line pt-4 text-[9px] uppercase tracking-[0.14em] text-muted">
              <p>Оплата картой через ЮKassa</p>
              <p>Доставка СДЭК / Почта России</p>
              <p>Возврат в течение 7 дней</p>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
