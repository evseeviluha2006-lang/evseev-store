"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import LikeButton from "@/_components/LikeButton";

const distressedItems = [
  { id: "distressed-pants", name: "DISTRESSED PANTS", price: "7 990 ₽", image: "/dipa-front.jpg", description: "Джинсы с эффектом дистресс." },
  { id: "radioevs-shirt", name: "RADIOEVS SHIRT", price: "5 990 ₽", image: "/radioevs-shirt-front.jpg", description: "Футболка по мотивам Radiohead." },
  { id: "redholes-pants", name: "RED HOLES PANTS", price: "8 490 ₽", image: "/redholes-front.jpg", description: "Штаны с огромными дырками." },
  { id: "krest-jacket", name: "KREST JACKET // CRUSADER", price: "18 990 ₽", image: "/krest-jacket-front.jpg", description: "Куртка из лоскутков хлопка." },
  { id: "psyho-jacket", name: "PSYHO JACKET // SLIM FIT", price: "14 990 ₽", image: "/psyho-jacket-front.jpg", description: "Куртка в слим фит." },
];

export default function DistressedCollection() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* ВИДЕО-ФОН НА ВЕСЬ ЭКРАН */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Само видео */}
        <video 
          src="/distress-bts.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        
        {/* Градиент снизу для плавного перехода в черный */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        
        {/* Текст в ЛЕВОМ ВЕРХНЕМ УГЛУ (маленький) */}
        <div className="absolute top-32 left-6 md:left-16 z-10 pointer-events-none">
          <p className="text-[10px] font-mono text-red-500 uppercase tracking-[4px] mb-2">SEASON 01 // 2024</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            DISTRESSED
          </h1>
        </div>
      </div>

      {/* СЕТКА ТОВАРОВ */}
      <div className="flex-grow px-6 py-16 max-w-7xl mx-auto w-full relative z-20 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {distressedItems.map((product) => (
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