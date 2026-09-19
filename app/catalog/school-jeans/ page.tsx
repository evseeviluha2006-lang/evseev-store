"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import SizeGuide from "@/_components/SizeGuide";
import { useState } from "react";

// Функция для безопасного формирования ссылки
const buildCheckoutUrl = (size: string | null, look: any) => {
  const params = new URLSearchParams();
  params.set("productId", "school-jeans");
  params.set("size", size || "M");
  
  if (look.sexShirt) params.set("sexShirt", "true");
  if (look.elShirt) params.set("elShirt", "true");
  
  return `/checkout?${params.toString()}`;
};

export default function SchoolJeansPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [lookSelected, setLookSelected] = useState({ jeans: true, sexShirt: false, elShirt: false });

  const JEANS_PRICE = 5990;
  const SHIRT_PRICE = 3500;
  
  const totalPrice = (lookSelected.jeans ? JEANS_PRICE : 0) 
    + (lookSelected.sexShirt ? SHIRT_PRICE : 0) 
    + (lookSelected.elShirt ? SHIRT_PRICE : 0);
  
  const discountPrice = lookSelected.jeans && lookSelected.sexShirt && lookSelected.elShirt 
    ? Math.floor(totalPrice * 0.85) 
    : totalPrice;

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Header />
      
      {/* HERO СЕКЦИЯ */}
      <section className="pt-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-widest">Pre-order Only</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">School<br/>Jeans</h1>
          <p className="text-zinc-400 text-lg max-w-md">Плотный деним. Прямой крой. Идеальная посадка.</p>
          
          <div className="flex gap-2 mt-8">
            {["S", "M", "L", "XL"].map(size => (
              <button key={size} onClick={() => setSelectedSize(size)} 
                className={`w-12 h-12 border text-sm font-bold ${selectedSize === size ? 'bg-white text-black' : 'border-white/20 hover:border-white'}`}>
                {size}
              </button>
            ))}
          </div>
          
          <SizeGuide />
          
          <Link href={buildCheckoutUrl(selectedSize, lookSelected)} 
            className="block w-full py-5 bg-white text-black text-center font-black uppercase tracking-[4px] hover:bg-zinc-200 transition-colors mt-8">
            Забронировать пару →
          </Link>
        </div>
        
        {/* ГАЛЕРЕЯ */}
        <div className="flex flex-col gap-6">
          {/* Главная картинка */}
          <div className="relative w-full aspect-[3/4] bg-zinc-900 border border-white/10 overflow-hidden">
            <Image 
              src="/school_jeans_glav.jpg" 
              alt="School Jeans Lookbook" 
              fill 
              className="object-cover" 
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-xs font-mono text-white/70 uppercase tracking-widest">Главный образ коллекции</p>
            </div>
          </div>

          {/* Хаотичные футболки */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square bg-zinc-900 border border-white/10 overflow-hidden translate-y-8">
              <Image src="/sex_shirt.jpg" alt="SEX Shirt" fill className="object-cover" />
              <div className="absolute inset-0 flex items-end p-3 bg-black/60 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase leading-tight text-red-400">
                  Только в комплекте<br/>с джинсами
                </p>
              </div>
            </div>

            <div className="relative aspect-square bg-zinc-900 border border-white/10 overflow-hidden -translate-y-4">
              <Image src="/el_shirt.jpg" alt="EL Shirt" fill className="object-cover" />
               <div className="absolute inset-0 flex items-end p-3 bg-black/60 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase leading-tight text-red-400">
                  Только в комплекте<br/>с джинсами
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КОНСТРУКТОР ОБРАЗА */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10 mt-12">
        <h2 className="text-3xl font-black uppercase mb-12 text-center">Собери комплект</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { id: 'jeans', name: 'SCHOOL JEANS', price: JEANS_PRICE, img: '/school_jeans_front.jpg', active: lookSelected.jeans },
            { id: 'sexShirt', name: 'SEX SHIRT', price: SHIRT_PRICE, img: '/sex_shirt.jpg', active: lookSelected.sexShirt },
            { id: 'elShirt', name: 'EL SHIRT', price: SHIRT_PRICE, img: '/el_shirt.jpg', active: lookSelected.elShirt }
          ].map((item) => (
            <div key={item.id} 
              className={`p-6 border transition-all cursor-pointer ${item.active ? 'border-white bg-white/5' : 'border-white/10 opacity-50'}`}
              onClick={() => setLookSelected(p => ({...p, [item.id]: !p[item.id as keyof typeof p]}))}>
              <div className="aspect-square relative mb-4 bg-zinc-900">
                <Image src={item.img} alt={item.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold uppercase text-sm">{item.name}</h3>
              <p className="font-mono mt-2">{item.price.toLocaleString()} ₽</p>
              {item.id !== 'jeans' && !lookSelected.jeans && (
                <p className="text-[10px] text-red-500 mt-1 uppercase">Только с джинсами</p>
              )}
            </div>
          ))}
        </div>

        {lookSelected.jeans && (
          <div className="max-w-md mx-auto p-8 border border-white/20 bg-zinc-900/50 text-center">
            <p className="text-zinc-500 uppercase tracking-widest text-xs mb-2">Итого</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              {lookSelected.sexShirt && lookSelected.elShirt && (
                <span className="text-zinc-600 line-through font-mono">{totalPrice.toLocaleString()} ₽</span>
              )}
              <span className="text-4xl font-black font-mono">{discountPrice.toLocaleString()} ₽</span>
            </div>
            
            {lookSelected.sexShirt && lookSelected.elShirt && (
              <p className="text-green-500 text-xs uppercase tracking-wider mb-6">Скидка 15% за комплект</p>
            )}
            
            <Link href={buildCheckoutUrl(selectedSize, lookSelected)}
              className="block w-full py-4 bg-white text-black font-black uppercase tracking-[4px] hover:bg-zinc-200 transition-colors">
              Купить комплект →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}