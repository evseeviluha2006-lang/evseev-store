"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useLikes } from "./LikeContext";

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { likedItems } = useLikes();

  const navLinks = [
    { href: "/catalog", label: "ТОВАРЫ" },
    { href: "/collections", label: "КОЛЛЕКЦИИ" },
    { href: "/education", label: "ОБУЧЕНИЕ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase hover:opacity-70 transition-opacity">
          EVSEEV
        </Link>

        {/* Навигация */}
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

        {/* Корзина и Лайки */}
        <div className="flex items-center gap-6">
          
          {/* Кнопка ЛАЙКИ */}
          <Link href="/likes" className="relative text-zinc-400 hover:text-red-500 transition-colors group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {likedItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                {likedItems.length}
              </span>
            )}
          </Link>
          
          {/* Кнопка КОРЗИНА */}
          <Link href="/cart" className="relative text-zinc-400 hover:text-white transition-colors group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}