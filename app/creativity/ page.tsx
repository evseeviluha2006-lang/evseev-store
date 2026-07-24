"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";

export default function CreativityPage() {
  const [clicked, setClicked] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <Image 
             src="/creativity-cover.jpg" 
             alt="Art Cover" 
             fill 
             className="object-cover grayscale blur-sm" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl w-full text-center border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 md:p-12">
          
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            ТВОРЧЕСТВО & КАРТИНЫ
          </h1>
          
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8 font-mono">
            Этот раздел находится в активной разработке.<br/>
            Здесь скоро появятся записи из моей книжки, эскизы и архивные работы.
          </p>

          <div className="border-t border-white/10 pt-8 mt-8">
            <p className="text-xs uppercase tracking-[4px] text-zinc-500 mb-4">
              Ваше влияние на процесс
            </p>
            
            <button 
              onClick={() => setClicked(true)}
              disabled={clicked}
              className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                clicked 
                  ? "bg-green-600 border-green-600 text-white cursor-default" 
                  : "bg-white text-black hover:bg-zinc-200 hover:scale-105"
              }`}
            >
              {clicked ? "АКТИВНОСТЬ ПОКАЗАНА ✓" : "ПОКАЗАТЬ АКТИВНОСТЬ →"}
            </button>

            {clicked && (
              <p className="mt-6 text-sm text-white animate-pulse">
                Илья Евсеев получил сигнал. Раздел будет готов как можно скорее.
              </p>
            )}
          </div>
        </div>

        <Link 
          href="/catalog" 
          className="mt-12 text-[10px] text-zinc-600 uppercase tracking-widest hover:text-white transition-colors z-10"
        >
          Вернуться к товарам
        </Link>

      </div>
    </main>
  );
}