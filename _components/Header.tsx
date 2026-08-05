"use client";

import Link from "next/link";
import { useState } from "react";
// Импортируй свои контексты/компоненты лайков и корзины, если они там были
// import { useCart } from "./CartContext"; 
// import { useLike } from "./LikeContext";

const navLinks = [
  { href: "/catalog", label: "ТОВАРЫ" },
  { href: "/collections", label: "КОЛЛЕКЦИИ" },
  { href: "/education", label: "ОБУЧЕНИЕ" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { cartCount } = useCart(); // Раскомментируй, если используешь контекст

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* ЛОГОТИП */}
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase z-50 relative">
          EVSEEV
        </Link>

        {/* ДЕСКТОП МЕНЮ (скрыто на мобилке) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ИКОНКИ СПРАВА */}
        <div className="flex items-center gap-6 z-50 relative">
          {/* Лайки (если нужны) */}
          {/* <Link href="/likes" className="hover:text-zinc-400 transition-colors">
             <svg ... /> 
          </Link> */}

          {/* Корзина */}
          <Link href="/cart" className="relative hover:text-zinc-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.51l1.65-7.43H5.12"></path>
            </svg>
            {/* Бейджик корзины */}
            {/* {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )} */}
          </Link>

          {/* БУРГЕР КНОПКА (видна только на мобилке) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-50 relative"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ (Выезжает на весь экран) */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-black uppercase tracking-tighter hover:text-zinc-400 transition-colors"
          >
            {link.label}
          </Link>
        ))}
        {/* Доп ссылки для мобилки */}
        <Link href="/offer" onClick={() => setIsMenuOpen(false)} className="text-sm text-zinc-500 uppercase tracking-widest mt-8">
          Оферта
        </Link>
      </div>
    </header>
  );
}