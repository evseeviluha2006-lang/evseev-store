"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/_components/Header";
import AddToCartButton from "@/_components/AddToCartButton";
import LikeButton from "@/_components/LikeButton";

type Product = {
  id: string;
  name: string;
  price: string;
  images: string[];
  description: string;
};

const products: Product[] = [
  {
    id: "vlad-tee",
    name: "VLAD DROBYSHEV // TEE",
    price: "4 500 ₽",
    images: ["/vlad-tee-front.jpg", "/vlad-tee-full1.jpg", "/vlad-tee-full2.jpg"],
    description: "Футболка из коллекции, посвященной Владу. Уникальный крой и принт."
  },
  {
    id: "vlad-ls",
    name: "VLAD DROBYSHEV // LONGSLEEVE",
    price: "5 900 ₽",
    images: ["/vlad-ls-front.jpg", "/vlad-ls-full.jpg", "/vlad-ls-full1.jpg"],
    description: "Лонгслив с агрессивным дизайном. Плотный хлопок."
  },
  {
    id: "vlad-cape",
    name: "VLAD DROBYSHEV // CAPE",
    price: "7 500 ₽",
    images: [
      "/vlad-cape-front.jpg",
      "/vlad-cape-full.jpg",
      "/vlad-cape-full1.jpg",
      "/vlad-cape-full2.jpg"
    ],
    description: "Накидка для завершения образа из коллекции ВЛАД ДРОБЫШЕВ."
  },
  {
    id: "hat-test-2",
    name: "ШАПКА ТЕСТ-2 // GREY",
    price: "2 000 ₽",
    images: [
      "/test-front.jpg", 
      "/test-full.jpg", 
      "/test-full1.jpg", 
      "/test-full2.jpg", 
      "/test-full3.jpg"
    ],
    description: "Материал: 100% хлопок. Принт 'ТЕСТ-2'. Размер универсальный.",
    sizes: ["ONE SIZE"]
  },
  {
    id: "hoodie-spasibo",
    name: "ХУДИ СПАСИБО // BLACK",
    price: "5 000 ₽",
    images: ["/hodie-thanks.jpg"],
    description: "Довольно давняя работа. Сделал базовый худак для повседневной носки. Принт спереди: thanks. Размер только один — L (по сетке оверсайз).",
    sizes: ["L"]
  },  
  {
    id: "fuck-its-evs-top",
    name: "FUCK IT'S EVS // TOP",
    price: "3 500 ₽",
    images: ["/product2.jpg"],
    description: "Укороченный топ с агрессивным принтом. Плотный хлопок."
  },
  {
    id: "18-plus-w-evs-top",
    name: "18+ W EVS // TOP",
    price: "3 500 ₽",
    images: ["/18+w-front.jpg", "/18+w-full1.jpg", "/18+w-full2.jpg"],
    description: "Белый топ с красным трафаретным принтом. Оверсайз крой."
  },
  {
    id: "18-plus-evs-top",
    name: "18+ EVS // TOP",
    price: "3 500 ₽",
    images: ["/18+-front.jpg", "/18+-full1.jpg", "/18+-full2.jpg", "/18+-full3.jpg"],
    description: "Черный топ с оранжевым принтом. Укороченная длина."
  },
  {
    id: "distressed-pants",
    name: "DISTRESSED PANTS",
    price: "7 990 ₽",
    images: ["/dipa-front.jpg", "/dipa-back.jpg", "/dipa-full.jpg", "/dipa-full2.jpg", "/dipa-glav.jpg"],
    description: "Джинсы с эффектом дистресс из коллекции DIPA."
  },
  {
    id: "radioevs-shirt",
    name: "RADIOEVS SHIRT // INSPIRED BY RADIOHEAD",
    price: "5 990 ₽",
    images: ["/radioevs-shirt-front.jpg", "/radioevs-shirt-full.jpg", "/radioevs-shirt-full2.jpg", "/radioevs-shirt-full3.jpg", "/radioevs-shirt-full4.jpg", "/radioevs-shirt-full5.jpg"],
    description: "Футболка, созданная по вдохновению группой Radiohead."
  },
  {
    id: "redholes-pants",
    name: "RED HOLES PANTS // DISTRESSED",
    price: "8 490 ₽",
    images: ["/redholes-front.jpg", "/redholes-back.jpg", "/redholes-full.jpg", "/redholes-full2.jpg", "/redholes-full3.jpg"],
    description: "Штаны с огромными дырками на коленях."
  },
  {
    id: "krest-jacket",
    name: "KREST JACKET // CRUSADER",
    price: "18 990 ₽",
    images: ["/krest-jacket-front.jpg", "/krest-jacket-double.jpg", "/krest-jacket-full.jpg"],
    description: "Куртка выполнена по технике сшивания множества маленьких кусочков ткани."
  },
  {
    id: "psyho-jacket",
    name: "PSYHO JACKET // SLIM FIT",
    price: "14 990 ₽",
    images: ["/psyho-jacket-front.jpg", "/psyho-jacket-full.jpg"],
    description: "Эта куртка выполнена в слим фит."
  },
];

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState<string | null>(
    product ? (product.images[0] || null) : null
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase mb-4">ТОВАР НЕ НАЙДЕН</h1>
          <a href="/catalog" className="text-zinc-500 underline hover:text-white">Вернуться в каталог</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="flex-grow pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start">
        
        {/* ГАЛЕРЕЯ */}
        <div className="flex gap-4 w-full md:w-auto">
          
          {/* Миниатюры */}
          <div className="hidden md:flex flex-col gap-4 w-[80px] flex-shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square w-full overflow-hidden border transition-all duration-200 ${
                  activeImage === img 
                    ? "border-white opacity-100 ring-1 ring-white/50" 
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                {img && <Image src={img} alt={`View ${idx}`} fill className="object-cover" />}
              </button>
            ))}
          </div>

          {/* Основное фото */}
          <div className="relative w-full md:w-[600px] min-h-[400px] bg-zinc-900 overflow-hidden border border-white/10 group flex items-center justify-center">
            {activeImage && (
              <Image 
                key={activeImage} 
                src={activeImage} 
                alt={product.name} 
                width={1200}
                height={1600}
                className="w-full h-auto object-contain animate-slide-up-blur" 
                priority 
              />
            )}
            
            <div className="absolute top-4 right-4 z-20">
               <LikeButton 
                 id={product.id}
                 type="product"
                 title={product.name}
                 image={product.images[0]}
                 price={product.price}
                 description={product.description}
                 size="md"
               />
            </div>

            {/* Точки для мобильных */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 md:hidden">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`w-2 h-2 rounded-full transition-all ${activeImage === img ? "bg-white w-6" : "bg-white/30"}`}
                />
              ))}
            </div>
          </div>

        </div>
        
        {/* ИНФОРМАЦИЯ */}
        <div className="flex flex-col justify-center h-full py-8 md:py-0 sticky top-24">
          <div className="mb-6 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            SEASON 01 // 2024
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 uppercase leading-[0.9]">
            {product.name}
          </h1>
          
          <p className="text-2xl text-zinc-300 mb-8 font-mono font-numbers">{product.price}</p>
          
          <p className="text-zinc-400 leading-relaxed mb-10 text-sm md:text-base max-w-md">
            {product.description}
          </p>
          
          <AddToCartButton product={product} />

          <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-[10px] font-mono text-zinc-600">
            <div>МАТЕРИАЛ: 100% COTTON</div>
            <div>ПРОИЗВОДСТВО: RUSSIA</div>
            <div>УХОД: 30°C MACHINE WASH</div>
            <div>SKU: EVS-{product.id.toUpperCase().replace(/-/g, "")}</div>
          </div>
        </div>
      </div>
    </main>
  );
}