"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import LikeButton from "@/_components/LikeButton";

// УНИКАЛЬНЫЙ СПИСОК ТОВАРОВ ДЛЯ WINTER 2.6
const winterItems = [
  { 
    id: "18-plus-w-evs-top", 
    name: "18+ W EVS // TOP", 
    price: "3 500 ₽", 
    image: "/product2.jpg", 
    description: "Белый топ с красным принтом." 
  },
  { 
    id: "18-plus-evs-top", 
    name: "18+ EVS // TOP", 
    price: "3 500 ₽", 
    image: "/product3.jpg", 
    description: "Черный топ с оранжевым принтом." 
  },
  { 
    id: "jacket-04", 
    name: "18 + EVS // TOP", 
    price: "3 500 ₽", 
    image: "/product4.jpg", 
    description: "Топик ." 
  },
];

export default function Winter26Collection() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* ВИДЕО-ФОН */}
      <div className="relative w-full h-screen overflow-hidden">
        <video src="/winter26-bts.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        
        <div className="absolute top-32 left-6 md:left-16 z-10 pointer-events-none">
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[4px] mb-2">ESSENTIALS & GRAPHICS</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">WINTER 2.6</h1>
        </div>
      </div>

      {/* СЕТКА ТОВАРОВ */}
      <div className="flex-grow px-6 py-16 max-w-7xl mx-auto w-full relative z-20 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {winterItems.map((product) => (
            <Link href={`/catalog/${product.id}`} key={product.id} className="group block cursor-pointer">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4 border border-white/5 hover:border-white/20 transition-colors">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div className="absolute top-3 right-3 z-20" onClick={(e) => e.stopPropagation()}>
                  <LikeButton id={product.id} type="product" title={product.name} image={product.image} price={product.price} description={product.description} size="sm" />
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-2 group-hover:border-white/30 transition-colors">
                <h3 className="text-xs font-bold uppercase tracking-wider truncate pr-2">{product.name}</h3>
                <span className="text-xs font-mono text-zinc-400">{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}