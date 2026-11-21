"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/_components/ProductCard";
import {
  getProductCategory,
  products,
  productCategories,
  type ProductCategory,
} from "@/lib/products";

type Category = ProductCategory | "all";

const sortOptions = [
  { id: "featured", label: "ПО УМОЛЧАНИЮ" },
  { id: "price-asc", label: "СНАЧАЛА ДЕШЕВЛЕ" },
  { id: "price-desc", label: "СНАЧАЛА ДОРОЖЕ" },
] as const;

type Sort = (typeof sortOptions)[number]["id"];

const visibleProducts = products.filter((product) => !product.hidden);

function isCategory(value: string | undefined): value is Category {
  return Boolean(value) && productCategories.some((category) => category.id === value);
}

export default function CatalogGrid({ initialCategory }: { initialCategory?: string }) {
  const [active, setActive] = useState<Category>(
    isCategory(initialCategory) ? initialCategory : "all"
  );
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    const list =
      active === "all"
        ? visibleProducts
        : visibleProducts.filter((product) => getProductCategory(product) === active);

    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [active, sort]);

  return (
    <div>
      {/* ФИЛЬТРЫ */}
      <div className="sticky top-16 z-30 border-y border-line bg-paper/95 backdrop-blur-xl md:top-[72px]">
        <div className="wrap flex items-center gap-4 py-3 md:py-4">
          <div className="no-scrollbar -mx-1 flex flex-1 gap-1 overflow-x-auto px-1">
            {productCategories.map((category) => {
              const isActive = active === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActive(category.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.16em] transition-colors md:px-4 md:text-[10px] ${
                    isActive
                      ? "bg-ink text-paper"
                      : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <span className="text-[9px] uppercase tracking-[0.16em] text-muted">
              {filtered.length} вещей
            </span>
            <label className="sr-only" htmlFor="catalog-sort">
              Сортировка
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="cursor-pointer border border-line bg-transparent px-3 py-2 text-[9px] uppercase tracking-[0.14em] outline-none hover:border-ink"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ТОВАРЫ */}
      <div className="wrap pt-8 pb-4 md:pt-12">
        <div className="mb-6 flex items-center justify-between md:hidden">
          <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
            {filtered.length} вещей
          </span>
          <label className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-muted">
            <span className="sr-only">Сортировка</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="max-w-[180px] cursor-pointer border border-line bg-transparent px-2 py-1.5 text-[9px] uppercase tracking-[0.12em] outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-line py-24 text-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              В этой категории пока пусто
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-3 md:gap-x-5 md:gap-y-12 lg:grid-cols-4">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
