"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { countCartItems, useCartLines } from "@/lib/cart";

const navLinks = [
  { href: "/catalog", label: "ТОВАРЫ" },
  { href: "/collections", label: "КОЛЛЕКЦИИ" },
  { href: "/education", label: "ОБУЧЕНИЕ" },
  { href: "/contacts", label: "КОНТАКТЫ" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartLines = useCartLines();
  const cartCount = countCartItems(cartLines);

  // Блокируем скролл, когда открыто мобильное меню (побочный эффект — только в effect)
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* ЛОГОТИП */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter uppercase text-white z-50 relative"
            onClick={() => setIsMenuOpen(false)}
          >
            EVSEEV
          </Link>

          {/* ДЕСКТОП МЕНЮ (скрыто на мобилке) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold tracking-[2px] uppercase transition-colors ${
                  pathname === link.href ? "text-white border-b border-white pb-1" : "text-zinc-500 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ПРАВАЯ ЧАСТЬ: Корзина и Бургер */}
          <div className="flex items-center gap-6">

            {/* Ссылка на корзину (видна всегда) */}
            <Link
              href="/cart"
              className="relative z-50 -m-2.5 flex h-11 w-11 items-center justify-center p-2.5"
              aria-label={`Корзина, товаров: ${cartCount}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-zinc-400 transition-colors"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* КНОПКА БУРГЕР (видна только на мобилке) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden -m-1 flex h-11 w-11 flex-col gap-1.5 items-center justify-center p-2.5 z-50 relative"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* МОБИЛЬНОЕ МЕНЮ (Полноэкранное) */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-black uppercase tracking-tighter text-white hover:text-zinc-500 transition-colors active:scale-95 transform"
          >
            {link.label}
          </Link>
        ))}

        {/* Доп. ссылки внизу меню */}
        <div className="absolute bottom-10 flex flex-col items-center gap-4">
           <Link href="/offer" onClick={() => setIsMenuOpen(false)} className="text-xs text-zinc-500 uppercase tracking-widest">Оферта</Link>
        </div>
      </div>
    </>
  );
}
