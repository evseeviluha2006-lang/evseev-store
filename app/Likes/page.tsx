"use client";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import { useLikes } from "../components/LikeContext";

export default function LikesPage() {
  const { likedItems, toggleLike } = useLikes();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="h-20" />

      <div className="flex-grow px-6 py-10 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold tracking-[6px] uppercase mb-10 border-b border-white/10 pb-4">
          СОХРАНЕННОЕ ({likedItems.length})
        </h1>

        {likedItems.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-sm">
            <p className="mb-6 text-zinc-500 font-mono text-sm">ВЫ ПОКА НИЧЕГО НЕ ЛАЙКНУЛИ</p>
            <Link href="/catalog" className="text-white underline underline-offset-4 hover:opacity-70">
              Перейти к товарам →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {likedItems.map((item) => (
              <div key={item.id} className="group relative bg-zinc-900/30 border border-white/5 p-4 hover:border-white/20 transition-colors">
                
                {/* Кнопка удаления (крестик) */}
                <button 
                  onClick={() => toggleLike(item)}
                  className="absolute top-2 right-2 z-10 bg-black/50 p-1 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Фото */}
                <div className="relative aspect-square w-full mb-4 overflow-hidden bg-zinc-900">
                  <Image src={item.image} alt={item.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Инфо */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold uppercase tracking-wider">{item.title}</h3>
                  
                  {/* Описание истории создания */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono border-l-2 border-white/20 pl-3 py-1">
                    {item.description}
                  </p>

                  {/* Цена и ссылка */}
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase">
                    {item.price && <span>{item.price}</span>}
                    <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1">
                      СВЯЗАТЬСЯ 
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}