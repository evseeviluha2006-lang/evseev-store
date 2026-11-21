"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SizeGuide from "@/_components/SizeGuide";
import { writeCart } from "@/lib/cart";
import { computeTotals, formatPrice, getProduct, type CartLine } from "@/lib/products";

const SIZES = ["S", "M", "L", "XL"];

export default function SchoolJeansPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [needSize, setNeedSize] = useState(false);
  const [lookSelected, setLookSelected] = useState({
    sexShirt: false,
    elShirt: false,
  });

  const jeans = getProduct("school-jeans");
  const sexShirt = getProduct("sex-shirt");
  const elShirt = getProduct("el-shirt");

  const previewLines: CartLine[] = [
    { id: "school-jeans", size: selectedSize ?? "M", quantity: 1 },
  ];
  if (lookSelected.sexShirt) previewLines.push({ id: "sex-shirt", size: selectedSize ?? "M", quantity: 1 });
  if (lookSelected.elShirt) previewLines.push({ id: "el-shirt", size: selectedSize ?? "M", quantity: 1 });
  const preview = computeTotals(previewLines);

  const reserve = () => {
    if (!selectedSize) {
      setNeedSize(true);
      return;
    }

    const lines: CartLine[] = [{ id: "school-jeans", size: selectedSize, quantity: 1 }];
    if (lookSelected.sexShirt) lines.push({ id: "sex-shirt", size: selectedSize, quantity: 1 });
    if (lookSelected.elShirt) lines.push({ id: "el-shirt", size: selectedSize, quantity: 1 });

    writeCart(lines);
    router.push("/checkout");
  };

  const toggleLook = (id: "sexShirt" | "elShirt") => {
    setLookSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const lookItems = [
    { key: "jeans" as const, name: "SCHOOL JEANS", product: jeans, active: true },
    { key: "sexShirt" as const, name: "SEX SHIRT", product: sexShirt, active: lookSelected.sexShirt },
    { key: "elShirt" as const, name: "LOG SHIRT", product: elShirt, active: lookSelected.elShirt },
  ];

  return (
    <main>
      {/* ГЕРОЙ */}
      <section className="wrap grid gap-8 pt-6 md:pt-10 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 lg:order-1 lg:py-8">
          <div className="flex items-center gap-3">
            <span className="bg-acid px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-ink">
              Pre-order only
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
              School capsule / 2026
            </span>
          </div>

          <h1 className="display mt-6 text-[clamp(3rem,8.5vw,7rem)]">
            SCHOOL
            <br />
            JEANS
          </h1>

          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-muted">
            Плотный деним, прямой крой и посадка, ради которой эту пару
            заказывали заново. Каждая пара отшивается под заказ.
          </p>

          <div className="mt-7 border-t border-line pt-5">
            <div className="mb-3 flex items-end justify-between">
              <span className="eyebrow">Размер</span>
              <span className="text-[9px] uppercase tracking-[0.14em] text-muted">
                {selectedSize ? `Выбран: ${selectedSize}` : "Выберите размер"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(size);
                    setNeedSize(false);
                  }}
                  aria-pressed={selectedSize === size}
                  aria-label={`Размер ${size}`}
                  className={`h-11 min-w-[52px] border px-4 text-[11px] font-medium transition-colors ${
                    selectedSize === size
                      ? "border-ink bg-ink text-paper"
                      : "border-line hover:border-ink"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <SizeGuide />
          </div>

          {needSize && (
            <p className="mt-3 text-[9px] uppercase tracking-[0.14em] text-muted">
              Выберите размер, чтобы продолжить
            </p>
          )}

          <button
            type="button"
            onClick={reserve}
            className="mt-6 flex w-full items-center justify-between gap-6 bg-ink px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-paper transition-colors hover:bg-acid hover:text-ink md:py-5"
          >
            Забронировать пару
            <span aria-hidden>→</span>
          </button>

          <p className="mt-3 text-[9px] uppercase tracking-[0.14em] text-muted">
            Отправка после отшива тиража · предоплата
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <div className="media relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/shool_jeans_glav.jpg"
              alt="School Jeans — образ коллекции"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 bg-paper px-3 py-1.5 text-[9px] uppercase tracking-[0.18em]">
              Full look / 01
            </span>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="relative aspect-square overflow-hidden bg-paper-2">
              <Image src="/sex_shirt.jpg" alt="SEX Shirt" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-[0.14em] text-paper mix-blend-difference">
                SEX Shirt
              </span>
            </div>
            <div className="relative aspect-square overflow-hidden bg-paper-2">
              <Image src="/el_shirt.jpg" alt="Log Shirt" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-[0.14em] text-paper mix-blend-difference">
                Log Shirt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* КОНСТРУКТОР ОБРАЗА */}
      <section className="wrap mt-16 border-t border-line pt-10 md:mt-24 md:pt-14">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="eyebrow text-muted">Complete the set</p>
            <h2 className="display-sm mt-3 text-[clamp(2rem,5vw,3.8rem)]">Собери комплект</h2>
          </div>
          <p className="max-w-xs text-[11px] leading-relaxed text-muted">
            Футболки доступны только вместе с джинсами. При покупке полного
            комплекта — скидка 15%.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {lookItems.map((item) => (
            <div
              key={item.key}
              role={item.key === "jeans" ? undefined : "button"}
              tabIndex={item.key === "jeans" ? undefined : 0}
              aria-pressed={item.key === "jeans" ? undefined : item.active}
              onClick={() => {
                if (item.key !== "jeans") toggleLook(item.key);
              }}
              onKeyDown={(event) => {
                if (item.key !== "jeans" && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  toggleLook(item.key);
                }
              }}
              className={`group relative border p-3 transition-colors ${
                item.active ? "border-ink" : "border-line opacity-55 hover:opacity-80"
              } ${item.key !== "jeans" ? "cursor-pointer" : ""}`}
            >
              <div className="relative aspect-square overflow-hidden bg-paper-2">
                {item.product && (
                  <Image
                    src={item.product.images[0]}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
                <span
                  className={`absolute top-2 right-2 grid h-7 w-7 place-items-center border text-[11px] ${
                    item.active
                      ? "border-ink bg-acid text-ink"
                      : "border-ink/20 bg-paper/80 text-ink/50"
                  }`}
                  aria-hidden
                >
                  {item.active ? "✓" : "+"}
                </span>
              </div>

              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.06em]">{item.name}</h3>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-muted">
                    {item.key === "jeans" ? "В комплекте" : "Только с джинсами"}
                  </p>
                </div>
                <span className="text-[11px] tabular-nums">
                  {item.product ? formatPrice(item.product.price) : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 border border-ink bg-ink p-6 text-paper md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <div>
            <p className="eyebrow text-paper/45">Итого</p>
            <div className="mt-2 flex items-baseline gap-3">
              {preview.discount > 0 && (
                <span className="text-[13px] tabular-nums text-paper/40 line-through">
                  {formatPrice(preview.subtotal)}
                </span>
              )}
              <span className="text-[clamp(1.8rem,4vw,2.8rem)] tabular-nums leading-none">
                {formatPrice(preview.total)}
              </span>
            </div>
            <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-paper/50">
              {preview.discount > 0 ? "Скидка 15% за комплект применена" : "Скидка 15% при полном комплекте"}
            </p>
          </div>

          <button
            type="button"
            onClick={reserve}
            className="flex items-center justify-between gap-8 bg-paper px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-acid md:py-5"
          >
            Купить комплект
            <span aria-hidden>→</span>
          </button>
        </div>

        <Link
          href="/catalog/school-jeans"
          className="mt-6 inline-block text-[9px] uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          ← Вернуться в магазин
        </Link>
      </section>
    </main>
  );
}
