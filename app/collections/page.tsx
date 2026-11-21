import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Коллекции",
  description: "Капсульные коллекции EVSEEV: Winter 2.6, Distressed и Влад Дробышев.",
};

export default function CollectionsPage() {
  return (
    <main>
      <section className="wrap pt-10 pb-8 md:pt-16 md:pb-12">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] md:items-end">
          <div>
            <p className="eyebrow text-muted">Collections / 2024—2026</p>
            <h1 className="display mt-4 text-[clamp(3rem,9vw,8rem)]">КОЛЛЕКЦИИ</h1>
          </div>
          <p className="max-w-sm text-[12px] leading-relaxed text-muted md:pb-3">
            Каждая капсула — отдельная история и ограниченный тираж. Когда вещи
            заканчиваются, они не возвращаются в продажу.
          </p>
        </div>
      </section>

      <div className="wrap pb-4">
        {collections.map((collection, index) => {
          const reversed = index % 2 === 1;

          return (
            <Link
              key={collection.slug}
              href={collection.href}
              className="group grid items-center gap-5 border-t border-line py-8 md:grid-cols-12 md:gap-10 md:py-12"
            >
              <div
                className={`media relative aspect-[4/3] w-full overflow-hidden md:col-span-7 md:aspect-[16/10] ${
                  reversed ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={collection.cover}
                  alt={collection.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-paper px-2.5 py-1 text-[9px] tabular-nums uppercase tracking-[0.18em]">
                  0{index + 1} / {collection.year}
                </span>
              </div>

              <div className={`md:col-span-5 ${reversed ? "md:order-1" : ""}`}>
                <p className="eyebrow text-muted">{collection.tag}</p>
                <h2 className="display-sm mt-3 text-[clamp(2rem,4.6vw,3.8rem)]">
                  {collection.title}
                </h2>
                <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
                  {collection.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
                    {collection.count} вещи в капсуле
                  </span>
                  <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em]">
                    Смотреть
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="wrap mt-10 border-t border-line pt-6 md:mt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Все вещи из капсул доступны в магазине
          </p>
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-4 border-b border-ink pb-1.5 text-[10px] font-medium uppercase tracking-[0.18em]"
          >
            Перейти в магазин
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
