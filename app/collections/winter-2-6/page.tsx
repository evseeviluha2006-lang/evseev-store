import type { Metadata } from "next";
import Link from "next/link";
import CollectionHero from "@/_components/CollectionHero";
import ProductCard from "@/_components/ProductCard";
import { formatPrice, getProduct, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Winter 2.6",
  description:
    "Winter 2.6 — базовые вещи с графикой: худи TVAR, топы 18+ и плотный трикотаж.",
};

// Состав коллекции берём из общего каталога — цены и картинки не разъезжаются
const winterItems = ["18-plus-w-evs-top", "18-plus-evs-top", "hoodie-tvar"]
  .map((id) => getProduct(id))
  .filter((product): product is Product => Boolean(product));

export default function Winter26Collection() {
  const total = winterItems.reduce((sum, product) => sum + product.price, 0);

  return (
    <main>
      <CollectionHero
        title="WINTER 2.6"
        tag="Essentials & graphics"
        description="Капсула про холодный город: плотный трикотаж, графика и слои. Вещи, которые носят каждый день и не жалеют."
        poster="/winter26-cover.jpg"
        video="/winter26-bts.mp4"
        year="2026"
        count={winterItems.length}
      />

      <section className="wrap py-9 md:py-12">
        <div className="grid gap-8 border-b border-line pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-start md:gap-16">
          <div>
            <p className="eyebrow text-muted">О капсуле</p>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-muted md:text-sm">
              Winter 2.6 — продолжение зимней линейки. Здесь нет случайных
              деталей: только плотные ткани, принты и крой, который держит форму
              после десятков стирок.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-[9px] uppercase tracking-[0.14em] text-muted md:grid-cols-3">
            <div>
              <dt>Сезон</dt>
              <dd className="mt-1 text-ink">2026</dd>
            </div>
            <div>
              <dt>Вещей</dt>
              <dd className="mt-1 text-ink">{winterItems.length}</dd>
            </div>
            <div>
              <dt>Комплект</dt>
              <dd className="mt-1 text-ink">{formatPrice(total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-9 md:mt-9 md:grid-cols-3 md:gap-x-5">
          {winterItems.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} priority={index < 2} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
            Капсула 03 / Winter 2.6
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
