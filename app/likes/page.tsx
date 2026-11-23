"use client";

import Image from "next/image";
import Link from "next/link";
import { removeLikedItem, useLikedItems } from "@/lib/likes";
import { useIsClient } from "@/lib/use-is-client";

export default function LikesPage() {
  const likedItems = useLikedItems();
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <main>
      <section className="wrap pt-10 pb-6 md:pt-16 md:pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="eyebrow text-muted">Wishlist / {likedItems.length}</p>
            <h1 className="display mt-4 text-[clamp(2.6rem,7.5vw,6rem)]">ИЗБРАННОЕ</h1>
          </div>
          {likedItems.length > 0 && (
            <Link
              href="/catalog"
              className="group mb-1 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted hover:text-ink"
            >
              Добавить ещё
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          )}
        </div>
      </section>

      <section className="wrap pb-6">
        {likedItems.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center border border-line py-16 text-center">
            <p className="eyebrow text-muted">Пока пусто</p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              Сохраняй понравившиеся вещи здесь, чтобы вернуться к ним позже. Лайкни что-нибудь в каталоге.
            </p>
            <Link
              href="/catalog"
              className="mt-8 bg-ink px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Перейти в магазин
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {likedItems.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={`/catalog/${product.id}`} className="block">
                  <div className="media relative aspect-[3/4] overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-[10px] uppercase tracking-[0.16em] text-muted">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <h3 className="text-[11px] font-medium uppercase leading-snug tracking-[0.04em] md:text-[12px]">
                      {product.title}
                    </h3>
                    {product.price && (
                      <p className="mt-1.5 text-[11px] tabular-nums text-muted md:text-[12px]">
                        {product.price}
                      </p>
                    )}
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => removeLikedItem(product.id)}
                  className="mt-3 text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
                  title="Убрать из избранного"
                  aria-label={`Убрать ${product.title} из избранного`}
                >
                  Убрать
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
