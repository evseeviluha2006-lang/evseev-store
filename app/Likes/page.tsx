"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";

export default function LikesPage() {
  const [likedItems, setLikedItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    let foundData: any[] = [];

    for (const key of allKeys) {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const firstItem = parsed[0];
            if (firstItem.id && (firstItem.image || firstItem.img || firstItem.src)) {
              foundData = parsed;
              break;
            }
          }
        }
      } catch (e) {}
    }

    setLikedItems(foundData);
    setIsLoaded(true);
  }, []);

  const removeLike = (idToRemove: string) => {
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            const updated = parsed.filter((item: any) => item.id !== idToRemove);
            localStorage.setItem(key, JSON.stringify(updated));
          }
        }
      } catch (e) {}
    });
    setLikedItems(prev => prev.filter(item => item.id !== idToRemove));
  };

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-32 pb-10 px-6 max-w-7xl mx-auto w-full min-h-[50vh]">
        <h1 className="text-lg font-bold tracking-[8px] uppercase mb-12 text-center md:text-left">
          ИЗБРАННОЕ ({likedItems.length})
        </h1>

        {likedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 border border-white/10 bg-zinc-900/30">
            <p className="text-zinc-500 uppercase tracking-widest mb-6 text-sm">Здесь пока пусто</p>
            <Link 
              href="/catalog" 
              className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {likedItems.map((product) => (
              <div key={product.id} className="group relative block">
                <Link href={`/catalog/${product.id}`} className="block cursor-pointer">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4 border border-white/5 hover:border-white/20 transition-colors">
                    <Image 
                      src={product.image || product.img || product.src || "/placeholder.jpg"} 
                      alt={product.name || product.title || "Товар"} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 25vw" 
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                    />
                  </div>
                  
                  <div className="flex justify-between items-end border-b border-white/10 pb-2 group-hover:border-white/30 transition-colors">
                    <h3 className="text-xs font-bold uppercase tracking-wider truncate pr-2">
                      {product.name || product.title || "Без названия"}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      {product.price || ""}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeLike(product.id);
                  }}
                  className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all text-zinc-400"
                  title="Убрать из избранного"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}