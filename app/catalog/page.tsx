"use client"; // <-- Обязательно для работы кликов

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <-- Хук для перехода
import Header from "../components/Header";
import LikeButton from "../components/LikeButton";

const products = [
  { 
    id: "1", 
    name: "EVSEEV TEE 01", 
    price: "4 990 ₽", 
    image: "/product1.jpg", 
    description: "Футболка оверсайз из плотного хлопка. Принт нанесен методом шелкографии." 
  },
  { 
    id: "2", 
    name: "EVSEEV HOODIE 02", 
    price: "8 990 ₽", 
    image: "/product2.jpg", 
    description: "Худи свободного кроя с капюшоном. Флис внутри, kangaroo pocket." 
  },
  { 
    id: "3", 
    name: "EVSEEV PANTS 03", 
    price: "6 990 ₽", 
    image: "/product3.jpg", 
    description: "Брюки карго с множеством карманов. Прочная ткань, усиленные швы." 
  },
  { 
    id: "4", 
    name: "EVSEEV JACKET 04", 
    price: "12 990 ₽", 
    image: "/product4.jpg", 
    description: "Ветровка с мембраной. Защита от ветра и влаги, минималистичный крой." 
  },
];

export default function Catalog() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* Заголовок каталога */}
      <div className="pt-32 pb-10 px-6 max-w-7xl mx-auto w-full border-b border-white/5">
        <h1 className="text-lg font-bold tracking-[8px] uppercase text-center md:text-left">
          CATALOG
        </h1>
      </div>

      {/* Сетка товаров */}
      <div className="flex-grow px-6 py-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          
          {products.map((product) => (
            <div key={product.id} className="group block cursor-pointer" onClick={() => router.push(`/catalog/${product.id}`)}>
              
              {/* Контейнер фото с кнопкой лайка */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                />
                
                {/* КНОПКА ЛАЙКА (отдельно, не внутри ссылки) */}
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

              {/* Информация о товаре */}
              <div className="flex justify-between items-end border-b border-white/10 pb-2 group-hover:border-white/30 transition-colors">
                <h3 className="text-xs font-bold uppercase tracking-wider truncate pr-2">{product.name}</h3>
                <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">{product.price}</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}