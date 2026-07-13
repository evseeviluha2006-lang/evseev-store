"use client";

import { useCart } from "./CartContext";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="bg-white text-black px-8 py-4 text-xs font-bold tracking-[4px] uppercase hover:bg-zinc-200 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
    >
      <span>Добавить в корзину</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  );
}