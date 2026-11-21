import type { Metadata } from "next";
import Link from "next/link";
import CollectionHero from "@/_components/CollectionHero";
import ProductCard from "@/_components/ProductCard";
import { getProduct, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Влад Дробышев",
  description:
    "Капсула, посвящённая Владу Дробышеву: футболка, лонгслив и накидка в одном образе.",
};

const itemIds = ["vlad-tee", "vlad-ls", "vlad-cape"];

const items = itemIds
  .map((id) => getProduct(id))
  .filter((product): product is Product => Boolean(product));

export default function VladDrobyshevCollection() {
  return (
    <main>
      <CollectionHero
        title="ВЛАД ДРОБЫШЕВ"
        tag="Dedicated to a friend"
        description="Капсула, собранная вокруг одного человека и одного образа. Футболка, лонгслив и накидка — три слоя, которые работают только вместе."
        poster="/vlad-drobyshev-cover.jpg"
        video="/1116.mp4"
        year="2025"
        count={items.length}
      />

      <section className="wrap py-9 md:py-12">
        <div className="grid gap-8 border-b border-line pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-start md:gap-16">
          <div>
            <p className="eyebrow text-muted">О капсуле</p>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-muted md:text-sm">
              Дружба — это тоже материал. Капсула выросла из личной истории и
              стала отдельным высказыванием: агрессивный принт, свободный крой и
              накидка, которая закрывает образ.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-[9px] uppercase tracking-[0.14em] text-muted md:grid-cols-3">
            <div>
              <dt>Сезон</dt>
              <dd className="mt-1 text-ink">2025</dd>
            </div>
            <div>
              <dt>Вещей</dt>
              <dd className="mt-1 text-ink">{items.length}</dd>
            </div>
            <div>
              <dt>Статус</dt>
              <dd className="mt-1 text-ink">Available</dd>
            </div>
          </dl>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-9 md:mt-9 md:grid-cols-3 md:gap-x-5">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} priority={index < 2} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
            Капсула 02 / Vlad Drobyshev
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
