"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/_components/Header";
import LikeButton from "@/_components/LikeButton";

const products = [
  { 
    id: "hoodie-spasibo", 
    name: "ХУДИ СПАСИБО // BLACK", 
    price: "5 000 ₽", 
    image: "/hodie-thanks.jpg", 
    description: "Базовый худи для повседневной носки. Принт 'thanks'. Размер L (оверсайз)." 
  },
    {
    id: "hoodie-tvar",
    name: "TVAR HOODIE // BLACK",
    price: "7 500 ₽",
    image: "/tvar-front.jpg", // Для сетки нужна только одна картинка
    description: "Новый худи из коллекции TVAR."
  },
  { 
    id: "hat-test-2", 
    name: "ШАПКА ТЕСТ-2 // GREY", 
    price: "2 000 ₽", 
    image: "/test-front.jpg", 
    description: "Шапка из 100% хлопка. Принт 'ТЕСТ-2'. One size." 
  },
  { 
    id: "vlad-tee", 
    name: "VLAD DROBYSHEV // TEE", 
    price: "4 500 ₽", 
    image: "/vlad-tee-front.jpg", 
    description: "Футболка из коллекции ВЛАД ДРОБЫШЕВ." 
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
  { 
    id: "distressed-pants", 
    name: "DISTRESSED PANTS", 
    price: "7 990 ₽", 
    image: "/dipa-front.jpg", 
    description: "Джинсы с эффектом дистресс. Рваные колени, потертости. Плотный деним." 
  },
  { 
    id: "fuck-its-evs-top", 
    name: "FUCK IT'S EVS // TOP", 
    price: "3 500 ₽", 
    image: "/product2.jpg", 
    description: "Укороченный топ с агрессивным принтом." 
  },
  { 
    id: "radioevs-shirt", 
    name: "RADIOEVS SHIRT // INSPIRED BY RADIOHEAD", 
    price: "5 990 ₽", 
    image: "/radioevs-shirt-front.jpg", 
    description: "Футболка, созданная по вдохновению группой Radiohead. Принт передает атмосферу их музыки." 
  },
  { 
    id: "redholes-pants", 
    name: "RED HOLES PANTS // DISTRESSED", 
    price: "8 490 ₽", 
    image: "/redholes-front.jpg", 
    description: "Штаны с огромными дырками на коленях. Агрессивный дистресс, рваные края." 
  },
  { 
    id: "krest-jacket", 
    name: "KREST JACKET // CRUSADER", 
    price: "18 990 ₽", 
    image: "/krest-jacket-front.jpg", 
    description: "Куртка из лоскутков 100% хлопка." 
  },
  { 
    id: "psyho-jacket", 
    name: "PSYHO JACKET // SLIM FIT", 
    price: "14 990 ₽", 
    image: "/psyho-jacket-front.jpg", 
    description: "Куртка в слим фит." 
  },
  { 
    id: "18-plus-w-evs-top", 
    name: "18+ W EVS // TOP", 
    price: "3 500 ₽", 
    image: "/18+w-front.jpg", 
    description: "Белый топ с красным трафаретным принтом." 
  },
  { 
    id: "18-plus-evs-top", 
    name: "18+ EVS // TOP", 
    price: "3 500 ₽", 
    image: "/18+-front.jpg", 
    description: "Черный топ с оранжевым принтом." 
  },
];

export default function Catalog() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-32 pb-10 px-6 max-w-7xl mx-auto w-full border-b border-white/5">
        <h1 className="text-lg font-bold tracking-[8px] uppercase text-center md:text-left">CATALOG</h1>
      </div>

      <div className="flex-grow px-6 py-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          
          {products.map((product) => (
            <div key={product.id} className="group block cursor-pointer" onClick={() => router.push(`/catalog/${product.id}`)}>
              
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                />
                
                <div className="absolute top-3 right-3 z-20" onClick={(e) => e.stopPropagation()}>
                  <LikeButton 
                    id={product.id}
                    type="product"
                    title={product.name}
                    image={product.image}
                    price={product.price}
                    description={product.description}
                    size="sm"
                  />
                </div>
              </div>

              <div className="flex justify-between items-end border-b border-white/10 pb-2 group-hover:border-white/30 transition-colors">
                <h3 className="text-xs font-bold uppercase tracking-wider truncate pr-2">{product.name}</h3>
                <span className="text-xs font-mono text-zinc-400 whitespace-nowrap font-numbers">{product.price}</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}