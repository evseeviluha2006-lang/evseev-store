"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
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

    const without = lines.filter(
      (line) => !(line.id === id && line.size === oldSize)
    );
    const existing = without.find(
      (line) => line.id === id && line.size === newSize
    );

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
            quantity: Math.min(
              MAX_QUANTITY,
              Math.max(1, line.quantity + delta)
            ),
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
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="pt-32 pb-10 px-6 max-w-4xl mx-auto w-full min-h-[50vh]">
        <h1 className="text-lg font-bold tracking-[8px] uppercase mb-12 text-center md:text-left">
          КОРЗИНА ({totalItems})
        </h1>

        {totals.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 border border-white/10 bg-zinc-900/30">
            <p className="text-zinc-500 uppercase tracking-widest mb-6 text-sm">Корзина пуста</p>
            <Link
              href="/catalog"
              className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {totals.items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="group flex gap-6 p-4 border border-white/10 bg-zinc-900/30 hover:border-white/20 transition-colors"
              >
                <div className="relative w-24 h-32 bg-zinc-900 flex-shrink-0 overflow-hidden border border-white/5">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="96px"
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-1">
                      {item.product.name}
                    </h3>
                    {item.size ? (
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                        Размер: {item.size}
                      </p>
                    ) : item.product.sizes.length > 0 ? (
                      <div className="mb-2">
                        <p className="text-[10px] uppercase tracking-widest text-red-400 mb-1">
                          Выберите размер
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSize(item.id, "", size)}
                              className="px-2 py-1 border border-white/20 text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-colors"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <p className="text-xs font-mono text-zinc-400 font-numbers">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-white/20">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        aria-label="Уменьшить количество"
                        className="h-10 w-10 flex items-center justify-center text-sm hover:bg-white/10 transition-colors"
                      >
                        -
                      </button>
                      <span className="h-10 px-3 text-xs font-mono border-x border-white/20 min-w-[40px] flex items-center justify-center font-numbers">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        aria-label="Увеличить количество"
                        className="h-10 w-10 flex items-center justify-center text-sm hover:bg-white/10 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      aria-label={`Удалить ${item.product.name}`}
                      className="py-2.5 -my-2.5 px-1 -mr-1 text-[10px] text-zinc-500 uppercase tracking-widest hover:text-red-500 transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-white/10 mt-8">
              {totals.discount > 0 && (
                <div className="flex justify-between items-center mb-3 text-sm">
                  <span className="text-green-500 uppercase tracking-widest text-xs">
                    Скидка за комплект −15%
                  </span>
                  <span className="font-mono text-green-500 font-numbers">
                    −{formatPrice(totals.discount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-end mb-8">
                <span className="text-sm uppercase tracking-widest text-zinc-400">Итого:</span>
                <span className="text-2xl font-black font-mono font-numbers">
                  {formatPrice(totals.total)}
                </span>
              </div>

              <div className="flex gap-4">
                {hasMissingSize ? (
                  <span className="flex-grow py-4 bg-zinc-800 text-zinc-500 text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center cursor-not-allowed">
                    ВЫБЕРИТЕ РАЗМЕР
                  </span>
                ) : (
                  <Link
                    href="/checkout"
                    className="flex-grow py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors text-center flex items-center justify-center"
                  >
                    ОФОРМИТЬ ЗАКАЗ
                  </Link>
                )}
                <button
                  onClick={clearCart}
                  className="px-6 py-4 border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
                >
                  ОЧИСТИТЬ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
