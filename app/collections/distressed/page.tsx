import type { Metadata } from "next";
import Link from "next/link";
import CollectionHero from "@/_components/CollectionHero";
import ProductCard from "@/_components/ProductCard";
import { getProduct, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Distressed",
  description:
    "Distressed — коллекция про разрушение и восстановление: рваный деним, потертости и куртки из лоскутов.",
};

const itemIds = [
  "distressed-pants",
  "radioevs-shirt",
  "redholes-pants",
  "krest-jacket",
  "psyho-jacket",
];

const items = itemIds
  .map((id) => getProduct(id))
  .filter((product): product is Product => Boolean(product));

export default function DistressedCollection() {
  return (
    <main>
      <CollectionHero
        title="DISTRESSED"
        tag="Season 01 / Archive"
        description="Коллекция о разрушении и восстановлении. Каждая вещь несёт следы времени — потертости, разрывы, выцветшие участки. Это не дефекты, это история."
        poster="/distress-cover.jpg"
        video="/distress-bts.mp4"
        year="2024"
        count={items.length}
      />

      <section className="wrap py-9 md:py-12">
        <div className="grid gap-8 border-b border-line pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-start md:gap-16">
          <div>
            <p className="eyebrow text-muted">О капсуле</p>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-muted md:text-sm">
              Коллекция собрана вокруг идеи несовершенства: необработанные края,
              ручная состаривающая обработка и лоскутные куртки, где каждый шов
              виден. Вещи отшивались малым тиражом в Калининграде.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-[9px] uppercase tracking-[0.14em] text-muted md:grid-cols-3">
            <div>
              <dt>Сезон</dt>
              <dd className="mt-1 text-ink">2024</dd>
            </div>
            <div>
              <dt>Вещей</dt>
              <dd className="mt-1 text-ink">{items.length}</dd>
            </div>
            <div>
              <dt>Статус</dt>
              <dd className="mt-1 text-ink">Archive</dd>
            </div>
          </dl>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-9 md:mt-9 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} priority={index < 2} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
            Капсула 01 / Distressed
          </span>
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-4 border-b border-ink pb-1.5 text-[10px] uppercase tracking-[0.18em]"
          >
            Весь магазин
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
