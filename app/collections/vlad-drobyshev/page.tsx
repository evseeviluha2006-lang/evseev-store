"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import LikeButton from "@/_components/LikeButton";

const vladItems = [
  { 
    id: "vlad-tee", 
    name: "VLAD DROBYSHEV // TEE", 
    price: "4 500 ₽", 
    image: "/vlad-tee-front.jpg", 
    description: "Футболка из коллекции, посвященной Владу." 
  },
  { 
    id: "vlad-ls", 
    name: "VLAD DROBYSHEV // LONGSLEEVE", 
    price: "5 900 ₽", 
    image: "/vlad-ls-front.jpg", 
    description: "Лонгслив с уникальным принтом." 
  },
  { 
    id: "vlad-cape", 
    name: "VLAD DROBYSHEV // CAPE", 
    price: "7 500 ₽", 
    image: "/vlad-cape-front.jpg", 
    description: "Накидка для завершения образа." 
  },
];

export default function VladDrobyshevCollection() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* ВИДЕО-ФОН КОЛЛЕКЦИИ */}
      <div className="relative w-full h-screen overflow-hidden">
        <video 
          src="/1116.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        
        <div className="absolute top-32 left-6 md:left-16 z-10 pointer-events-none">
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[4px] mb-2">DEDICATED TO A FRIEND</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            ВЛАД ДРОБЫШЕВ
          </h1>
        </div>
      </div>

      {/* СЕТКА ТОВАРОВ */}
      <div className="flex-grow px-6 py-16 max-w-7xl mx-auto w-full relative z-20 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {vladItems.map((product) => (
            <Link href={`/catalog/${product.id}`} key={product.id} className="group block cursor-pointer">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4 border border-white/5 hover:border-white/20 transition-colors">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
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