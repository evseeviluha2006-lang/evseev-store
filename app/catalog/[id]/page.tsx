"use client"; // <-- ЭТА СТРОКА ОБЯЗАТЕЛЬНА В САМОМ НАЧАЛЕ!

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import AddToCartButton from "../../components/AddToCartButton";
import LikeButton from "../../components/LikeButton";

const products = [
  { 
    id: "1", 
    name: "EVSEEV TEE 01", 
    price: "4 990 ₽", 
    image: "/product1.jpg", 
    extraImages: ["/product1.jpg", "/product2.jpg"], 
    desc: "Футболка оверсайз из плотного хлопка." 
  },
  { 
    id: "2", 
    name: "FUCK ITS EVS TOP 02", 
    price: "8 990 ₽", 
    image: "/product2.jpg", 
    extraImages: ["/product2.jpg", "/product1.jpg"], 
    desc: "Худи свободного кроя с капюшоном." 
  },
  { id: "3", name: "18+ EVS TOP 03", price: "6 990 ₽", image: "/product3.jpg", extraImages: ["/product3.jpg"], desc: "Брюки карго." },
  { id: "4", name: "18+ EVS TOP 04", price: "12 990 ₽", image: "/product4.jpg", extraImages: ["/product4.jpg"], desc: "Ветровка." },
];

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);
  
  const [activeImage, setActiveImage] = useState(product?.image || "");

  if (!product) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">ТОВАР НЕ НАЙДЕН</div>;
  }

  const handleImageChange = (newImage: string) => {
    if (newImage === activeImage) return;
    setActiveImage(newImage);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="flex-grow pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        
        {/* ЛЕВАЯ КОЛОНКА: МИНИАТЮРЫ + ОСНОВНОЕ ФОТО */}
        <div className="flex gap-4 h-full">
          
          {/* Колонка с миниатюрами */}
          <div className="hidden md:flex flex-col gap-4 w-[80px] flex-shrink-0">
            {product.extraImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleImageChange(img)}
                className={`relative aspect-square w-full overflow-hidden border transition-all duration-200 ${
                  activeImage === img 
                    ? "border-white opacity-100 ring-1 ring-white/50" 
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={img} alt={`View ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Основное большое фото */}
          <div className="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden border border-white/10 group">
            <Image 
              key={activeImage} 
              src={activeImage} 
              alt={product.name} 
              fill 
              className="object-cover animate-slide-up-blur" 
              priority 
            />
            
            {/* КНОПКА ЛАЙКА НА СТРАНИЦЕ ТОВАРА */}
            <div className="absolute top-4 right-4 z-20">
               <LikeButton 
                 id={product.id}
                 type="product"
                 title={product.name}
                 image={product.image}
                 price={product.price}
                 description={product.desc}
                 size="md"
               />
            </div>

            {/* Точки для мобильных */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 md:hidden">
              {product.extraImages.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleImageChange(img)}
                  className={`w-2 h-2 rounded-full transition-all ${activeImage === img ? "bg-white w-6" : "bg-white/30"}`}
                />
              ))}
            </div>
          </div>

        </div>
        
        {/* ПРАВАЯ КОЛОНКА: ИНФОРМАЦИЯ */}
        <div className="flex flex-col justify-center h-full py-8 md:py-0">
          <div className="mb-6 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            LIMITED DROP // COLLECTION 01
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 uppercase leading-[0.9]">
            {product.name}
          </h1>
          
          <p className="text-2xl text-zinc-300 mb-8 font-mono">{product.price}</p>
          
          <p className="text-zinc-400 leading-relaxed mb-10 text-sm md:text-base max-w-md">
            {product.desc}
          </p>
          
          <AddToCartButton product={product} />

          <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-[10px] font-mono text-zinc-600">
            <div>МАТЕРИАЛ: 100% COTTON</div>
            <div>ПРОИЗВОДСТВО: RUSSIA</div>
            <div>УХОД: 30°C MACHINE WASH</div>
            <div>SKU: {product.id.padStart(4, '0')}-EVS</div>
          </div>
        </div>
      </div>
    </main>
  );
}