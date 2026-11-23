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
    title: "РљРђРўР•Р“РћР РР",
    links: [
      { label: "Р’СЃС‘", href: "/catalog" },
      { label: "Р’РµСЂС…", href: "/catalog?cat=tops" },
      { label: "РќРёР·", href: "/catalog?cat=bottoms" },
      { label: "Р’РµСЂС…РЅСЏСЏ РѕРґРµР¶РґР°", href: "/catalog?cat=outerwear" },
      { label: "РђРєСЃРµСЃСЃСѓР°СЂС‹", href: "/catalog?cat=accessories" },
    ],
  },
  {
    title: "РљРћР›Р›Р•РљР¦РР",
    links: collections.map((collection) => ({
      label: collection.title,
      href: collection.href,
    })),
  },
];

const ticker = [
  "Р‘Р•РЎРџР›РђРўРќРђРЇ Р”РћРЎРўРђР’РљРђ РћРў 10 000 в‚Ѕ",
  "РќРћР’Р«Р™ Р”Р РћРџ вЂ” WINTER 2.6",
  "РљРћРњРџР›Р•РљРў РР— 3 Р’Р•Р©Р•Р™ вЂ” РЎРљРР”РљРђ 15%",
  "РЎР”Р•Р›РђРќРћ Р’ РљРђР›РРќРРќР“Р РђР”Р•",
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

  useEffect(() => {
    setIsMenuOpen(false);
    setMega(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Р’Р•Р РҐРќРЇРЇ Р‘Р•Р“РЈР©РђРЇ РЎРўР РћРљРђ */}
      <div className="bg-ink text-paper">
        <Marquee
          items={ticker}
          speed="44s"
          className="py-2.5"
          itemClassName="eyebrow text-[8.5px] tracking-[0.28em]"
        />
      </div>

      {/* РЁРђРџРљРђ */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-xl">
        <div className="wrap flex h-16 items-center justify-between gap-6 md:h-[72px]">
          {/* РњРћР‘РР›Р¬РќРћР• РњР•РќР® */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="-ml-2 flex h-11 w-11 flex-col items-start justify-center gap-[5px] px-2 md:hidden"
            aria-label="РћС‚РєСЂС‹С‚СЊ РјРµРЅСЋ"
            aria-expanded={isMenuOpen}
          >
            <span className="h-px w-6 bg-ink" />
            <span className="h-px w-6 bg-ink" />
            <span className="h-px w-4 bg-ink" />
          </button>

          {/* Р›РћР“РћРўРРџ */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            aria-label="EVSEEV вЂ” РЅР° РіР»Р°РІРЅСѓСЋ"
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
              <sup className="ml-0.5 align-super text-[8px] tracking-normal">В®</sup>
            </span>
          </Link>

          {/* Р”Р•РЎРљРўРћРџ-РњР•РќР® */}
          <nav className="hidden flex-1 items-center justify-center gap-7 lg:gap-10 md:flex">
            {nav.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setMega(item.label)}
                onMouseLeave={() => setMega(null)}
              >
                <Link
                  href={item.href}
                  onFocus={() => setMega(item.label)}
                  className={`eyebrow u-link py-2 text-[10px] transition-colors ${
                    isActive(item.href) ? "text-ink" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>

                {item.href === "/catalog" && mega === item.label && (
                  <div className="absolute top-full left-1/2 w-[640px] -translate-x-1/2 pt-5">
                    <div className="grid grid-cols-[1fr_1fr_0.9fr] gap-7 border border-line bg-paper p-6 shadow-[0_30px_70px_rgba(0,0,0,0.10)]">
                      {shopMenu.map((column) => (
                        <div key={column.title}>
                          <p className="eyebrow mb-4 text-[9px] text-muted">
                            {column.title}
                          </p>
                          <ul className="space-y-2.5">
                            {column.links.map((link) => (
                              <li key={link.href + link.label}>
                                <Link
                                  href={link.href}
                                  className="text-[12px] uppercase tracking-[0.04em] hover:text-muted transition-colors"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <Link
                        href="/collections/winter-2-6"
                        className="group relative block aspect-[3/4] overflow-hidden bg-paper-2"
                      >
                        <Image
                          src="/winter26-cover.jpg"
                          alt="Winter 2.6"
                          fill
                          sizes="220px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[10px] font-medium uppercase tracking-[0.16em] text-paper">
                          WINTER 2.6 в†’
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* РџР РђР’РђРЇ Р§РђРЎРўР¬ */}
          <div className="flex shrink-0 items-center gap-3 md:gap-5">
            <Link
              href="/likes"
              className="hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] hover:text-muted transition-colors sm:flex"
              aria-label={`РР·Р±СЂР°РЅРЅРѕРµ, С‚РѕРІР°СЂРѕРІ: ${likedCount}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="hidden lg:inline">РР—Р‘Р РђРќРќРћР•</span>
              <span>({likedCount})</span>
            </Link>

            <Link
              href="/cart"
              className="group flex items-center gap-2 border border-ink px-3.5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper md:px-4"
              aria-label={`РљРѕСЂР·РёРЅР°, С‚РѕРІР°СЂРѕРІ: ${cartCount}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="hidden sm:inline">РљРћР Р—РРќРђ</span>
              <span className="tabular-nums">({cartCount})</span>
            </Link>
          </div>
        </div>
      </header>

      {/* РњРћР‘РР›Р¬РќРћР• РњР•РќР® */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-[18px]">
          <span className="text-[24px] font-bold leading-none tracking-[-0.07em] uppercase">
            EVSEEV<sup className="ml-0.5 align-super text-[8px]">В®</sup>
          </span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="-mr-2 flex h-11 w-11 items-center justify-center"
            aria-label="Р—Р°РєСЂС‹С‚СЊ РјРµРЅСЋ"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-[18px] pt-6 pb-10">
          <nav className="flex flex-col">
            {nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-5"
              >
                <span className="w-6 shrink-0 text-[9px] tabular-nums tracking-[0.2em] text-muted">
                  0{index + 1}
                </span>
                <span className="display-sm text-[clamp(2rem,10vw,3rem)]">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Link
              href="/likes"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between border border-line px-4 py-4 text-[11px] uppercase tracking-[0.16em]"
            >
              РР·Р±СЂР°РЅРЅРѕРµ <span className="tabular-nums">{likedCount}</span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between border border-ink bg-ink px-4 py-4 text-[11px] uppercase tracking-[0.16em] text-paper"
            >
              РљРѕСЂР·РёРЅР° <span className="tabular-nums">{cartCount}</span>
            </Link>
          </div>

          <div className="mt-auto space-y-3 pt-10">
            <a
              href="https://t.me/evseevdizain"
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-[11px] uppercase tracking-[0.18em]"
            >
              Telegram-РєР°РЅР°Р»
            </a>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
              РљР°Р»РёРЅРёРЅРіСЂР°Рґ В· 10:00 вЂ” 22:00
            </p>
            <div className="flex gap-6 pt-2">
              <Link href="/manifest" className="u-link text-[10px] uppercase tracking-[0.18em] text-muted">
                РњР°РЅРёС„РµСЃС‚
              </Link>
              <Link href="/offer" className="u-link text-[10px] uppercase tracking-[0.18em] text-muted">
                РћС„РµСЂС‚Р°
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
