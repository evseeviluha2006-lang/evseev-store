import type { Metadata } from "next";
import CatalogGrid from "@/_components/CatalogGrid";

export const metadata: Metadata = {
  title: "Магазин",
  description:
    "Все вещи EVSEEV: верх, низ, верхняя одежда и аксессуары. Архивные модели и актуальные капсулы.",
};

type Props = {
  searchParams: Promise<{ cat?: string }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const { cat } = await searchParams;

  return (
    <main>
      <section className="wrap pt-10 pb-8 md:pt-16 md:pb-10">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] md:items-end">
          <div>
            <p className="eyebrow text-muted">Shop / 2026</p>
            <h1 className="display mt-4 text-[clamp(3rem,9vw,8rem)]">МАГАЗИН</h1>
          </div>
          <p className="max-w-sm text-[12px] leading-relaxed text-muted md:pb-3">
            Полный ассортимент бренда: капсулы, архив и базовые вещи. Размеры
            ограничены — каждая модель отшивается небольшим тиражом.
          </p>
        </div>
      </section>

      <CatalogGrid initialCategory={cat} />
    </main>
  );
}
