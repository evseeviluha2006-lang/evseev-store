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
          <div className="flex min-h-[360px] flex-col items-center justify-center border border-line px-6 py-20 text-center">
            <p className="eyebrow text-muted">Wishlist is empty</p>
            <h2 className="display-sm mt-4 text-[clamp(2rem,5vw,3.6rem)]">ЗДЕСЬ ПОКА ПУСТО</h2>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted">
              Нажимайте на сердечко у вещи, чтобы сохранить её и вернуться к
              выбору позже.
            </p>
            <Link
              href="/catalog"
              className="mt-7 bg-ink px-7 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Перейти в магазин
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {likedItems.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={`/catalog/${product.id}`} className="block">
                  <div className="media relative aspect-[3/4] w-full">
                    <Image
                      src={product.image || "/logo.png"}
                      alt={product.title || "Товар"}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <h3 className="text-[11px] font-medium uppercase leading-snug tracking-[0.04em] md:text-[12px]">
                      {product.title || "Без названия"}
                    </h3>
                    <span className="text-[11px] tabular-nums whitespace-nowrap md:text-[12px]">
                      {product.price || ""}
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => removeLikedItem(product.id)}
                  className="absolute top-2.5 right-2.5 z-20 grid h-8 w-8 place-items-center border border-ink/10 bg-paper/90 text-[13px] text-ink backdrop-blur-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  title="Убрать из избранного"
                  aria-label={`Убрать ${product.title} из избранного`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
