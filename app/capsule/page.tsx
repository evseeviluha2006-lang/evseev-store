import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/_components/ProductCard";
import { getProduct, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Capsule Drop — Предзаказ",
  description:
    "Капсульный дроп EVSEEV по предзаказу. Шапки и футболки. Предзаказ открыт до 12.12.2026.",
};

const capsuleIds = [
  "capsule-hat-01",
  "capsule-hat-02",
  "capsule-tee-white",
  "capsule-tee-black",
  "capsule-tee-sex-white",
  "capsule-tee-sex-black",
];

export default function CapsuleDropPage() {
  const items = capsuleIds
    .map((id) => getProduct(id))
    .filter((p): p is Product => Boolean(p));

  const hats = items.filter((p) => p.id.startsWith("capsule-hat"));
  const tees = items.filter((p) => p.id.startsWith("capsule-tee"));

  return (
    <main>
      <section className="wrap pt-8 pb-10 md:pt-12 md:pb-14 border-b border-line">
        <p className="eyebrow text-muted">EVSEEV / Предзаказ</p>
        <h1 className="display mt-4 text-[clamp(2.2rem,7vw,5.5rem)]">
          CAPSULE DROP
        </h1>
        <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-muted md:text-base">
          Капсульный дроп по предзаказу. Предзаказ открыт до{" "}
          <span className="text-ink">12.12.2026</span>.
        </p>
      </section>

      <section className="wrap py-10 md:py-14">
        <div className="mb-10 md:mb-14">
          <div className="mb-6 flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">Шапки</p>
              <h2 className="display-sm mt-2 text-[clamp(1.5rem,3vw,2.4rem)]">
                Шапки
              </h2>
            </div>
            <div className="text-[11px] leading-relaxed text-muted sm:text-right">
              <p>1 500 ₽</p>
              <p>Размер: ONE SIZE</p>
              <p>2 цвета</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-5 lg:max-w-[900px]">
            {hats.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                priority={index < 2}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">Футболки</p>
              <h2 className="display-sm mt-2 text-[clamp(1.5rem,3vw,2.4rem)]">
                Футболки
              </h2>
            </div>
            <div className="text-[11px] leading-relaxed text-muted sm:text-right">
              <p>2 490 ₽</p>
              <p>Размеры: S / M / L / XL</p>
              <p>4 модели</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5">
            {tees.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            Предзаказ открыт до 12.12.2026
          </p>
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-4 border-b border-ink pb-1.5 text-[10px] uppercase tracking-[0.18em]"
          >
            Весь каталог
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
