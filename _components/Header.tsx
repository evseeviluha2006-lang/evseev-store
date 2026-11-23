"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { countCartItems, useCartLines } from "@/lib/cart";
import { useLikedItems } from "@/lib/likes";
import { collections } from "@/lib/collections";
import Marquee from "@/_components/Marquee";

const nav = [
  { href: "/catalog", label: "МАГАЗИН" },
  { href: "/capsule", label: "CAPSULE DROP" },
  { href: "/collections", label: "КОЛЛЕКЦИИ" },
  { href: "/education", label: "АКАДЕМИЯ" },
  { href: "/contacts", label: "КОНТАКТЫ" },
];

const shopMenu = [
  {
    title: "КАТЕГОРИИ",
    links: [
      { label: "Всё", href: "/catalog" },
      { label: "Верх", href: "/catalog?cat=tops" },
      { label: "Низ", href: "/catalog?cat=bottoms" },
      { label: "Верхняя одежда", href: "/catalog?cat=outerwear" },
      { label: "Аксессуары", href: "/catalog?cat=accessories" },
    ],
  },
  {
    title: "КОЛЛЕКЦИИ",
    links: collections.map((collection) => ({
      label: collection.title,
      href: collection.href,
    })),
  },
];

const ticker = [
  "БЕСПЛАТНАЯ ДОСТАВКА ОТ 10 000 ₽",
  "НОВЫЙ ДРОП — WINTER 2.6",
  "КОМПЛЕКТ ИЗ 3 ВЕЩЕЙ — СКИДКА 15%",
  "СДЕЛАНО В КАЛИНИНГРАДЕ",
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const pathname = usePathname();
  const cartLines = useCartLines();
  const cartCount = countCartItems(cartLines);
  const likedCount = useLikedItems().length;

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ВЕРХНЯЯ БЕГУЩАЯ СТРОКА */}
      <div className="bg-ink text-paper">
        <Marquee
          items={ticker}
          speed="44s"
          className="py-2.5"
          itemClassName="eyebrow text-[8.5px] tracking-[0.28em]"
        />
      </div>

      {/* ШАПКА */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-xl">
        <div className="wrap flex h-16 items-center justify-between gap-6 md:h-[72px]">
          {/* МОБИЛЬНОЕ МЕНЮ */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="-ml-2 flex h-11 w-11 flex-col items-start justify-center gap-[5px] px-2 md:hidden"
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
            <span className="h-px w-6 bg-ink" />
            <span className="h-px w-6 bg-ink" />
            <span className="h-px w-4 bg-ink" />
          </button>

          {/* ЛОГОТИП */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            aria-label="EVSEEV — на главную"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/logo-mark-dark.png"
              alt=""
              width={371}
              height={800}
              priority
              className="h-6 w-auto md:h-7"
            />
            <span className="text-[26px] leading-none font-bold tracking-[-0.07em] uppercase md:text-[30px]">
              EVSEEV
              <sup className="ml-0.5 align-super text-[8px] tracking-normal">®</sup>
            </span>
          </Link>

          {/* НАВИГАЦИЯ ДЕСКТОП */}
          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {nav.map((item) => {
              if (item.href === "/catalog") {
                return (
                  <button
                    key={item.href}
                    type="button"
                    onMouseEnter={() => setMega("shop")}
                    onClick={() => setMega(mega === "shop" ? null : "shop")}
                    className={`eyebrow relative py-6 transition-colors hover:text-ink ${
                      isActive(item.href) || mega === "shop" ? "text-ink" : "text-muted"
                    }`}
                    aria-expanded={mega === "shop"}
                    aria-haspopup="menu"
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-[22px] left-0 h-px bg-ink transition-all duration-300 ${
                        isActive(item.href) || mega === "shop" ? "w-full" : "w-0"
                      }`}
                    />
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setMega(null)}
                  className={`eyebrow relative py-6 transition-colors hover:text-ink ${
                    isActive(item.href) ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-[22px] left-0 h-px bg-ink transition-all duration-300 ${
                      isActive(item.href) ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ИКОНКИ */}
          <div className="flex items-center gap-4 md:gap-5">
            <Link
              href="/likes"
              className="eyebrow group hidden items-center gap-1.5 text-muted transition-colors hover:text-ink sm:flex"
            >
              <span className="hidden lg:inline">ИЗБРАННОЕ</span>
              <span className="lg:hidden" aria-hidden>
                ♡
              </span>
              <span className="tabular-nums text-[9px] text-muted group-hover:text-ink">
                ({likedCount})
              </span>
            </Link>

            <Link
              href="/cart"
              className="eyebrow group flex items-center gap-2 text-ink"
            >
              <span className="hidden md:inline">КОРЗИНА</span>
              <span className="grid h-8 min-w-8 place-items-center border border-ink px-2 text-[10px] tabular-nums transition-colors group-hover:bg-ink group-hover:text-paper">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* МЕГА-МЕНЮ */}
        <div
          onMouseLeave={() => setMega(null)}
          className={`absolute inset-x-0 top-full overflow-hidden border-b border-line bg-paper transition-all duration-300 ${
            mega === "shop"
              ? "max-h-[420px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="wrap grid grid-cols-[1fr_1fr_minmax(220px,280px)] gap-10 py-10">
            {shopMenu.map((column) => (
              <div key={column.title}>
                <p className="eyebrow mb-4 text-muted">{column.title}</p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMega(null)}
                        className="text-[13px] tracking-[0.01em] text-ink/75 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Link href="/collections/winter-2-6" onClick={() => setMega(null)} className="group relative block overflow-hidden bg-ink">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/winter26-cover.jpg"
                  alt="Winter 2.6"
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/20 transition-colors duration-500 group-hover:bg-ink/35" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                  <p className="eyebrow text-paper/70">Новый дроп</p>
                  <p className="mt-2 text-[15px] font-medium uppercase tracking-[0.04em]">
                    Winter 2.6
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      <div
        className={`fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 z-[70] flex h-full w-[min(86vw,360px)] flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Мобильное меню"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="text-[22px] leading-none font-bold tracking-[-0.07em]">EVSEEV</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="-mr-2 grid h-11 w-11 place-items-center text-2xl font-light"
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-0">
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-[9px] tabular-nums tracking-[0.16em] text-muted">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-[14px] font-medium tracking-[0.06em] ${
                        isActive(item.href) ? "text-ink" : "text-ink/80"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>
                  <span className="text-muted" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            <Link
              href="/likes"
              onClick={() => setIsMenuOpen(false)}
              className="eyebrow flex items-center justify-between text-muted"
            >
              <span>Избранное</span>
              <span className="tabular-nums">({likedCount})</span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="eyebrow flex items-center justify-between text-muted"
            >
              <span>Корзина</span>
              <span className="tabular-nums">({cartCount})</span>
            </Link>
          </div>
        </nav>

        <div className="border-t border-line px-5 py-5 text-[10px] uppercase tracking-[0.14em] text-muted">
          <p>Kaliningrad, Russia</p>
          <p className="mt-1">@evseev.store</p>
        </div>
      </aside>
    </>
  );
}
