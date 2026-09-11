"use client";
import { useState } from "react";
import Link from "next/link";

export default function PreorderWidget() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
      <Link 
        href="/catalog/school-jeans"
        className="group relative flex items-center gap-3 bg-white text-black px-6 py-4 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all duration-300 border border-black"
      >
        {/* Пульсирующая точка */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-500">Limited Drop</span>
          <span className="text-sm font-black uppercase tracking-wider group-hover:translate-x-1 transition-transform">Открыт предзаказ →</span>
        </div>

        {/* Кнопка закрытия */}
        <button 
          onClick={(e) => { e.preventDefault(); setIsVisible(false); }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          ×
        </button>
      </Link>
    </div>
  );
}