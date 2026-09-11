"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import SizeGuide from "@/_components/SizeGuide";
import { useState } from "react";

// Данные для комплекта
const lookItems = [
  { id: "school-jeans", name: "SCHOOL JEANS", price: 5990, image: "/school_jeans_front.jpg", type: "main" },
  { id: "vlad-tee", name: "VLAD DROBYSHEV // TEE", price: 4500, image: "/vlad-tee-front.jpg", type: "add" },
  { id: "hat-test-2", name: "ШАПКА ТЕСТ-2 // GREY", price: 2000, image: "/test-front.jpg", type: "add" },
];

export default function SchoolJeansPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [lookSelected, setLookSelected] = useState({ jeans: true, tee: false, hat: false });

  const totalPrice = lookSelected.jeans ? 5990 : 0 
    + (lookSelected.tee ? 4500 : 0) 
    + (lookSelected.hat ? 2000 : 0);
  
  const discountPrice = lookSelected.jeans && lookSelected.tee && lookSelected.hat 
    ? Math.floor(totalPrice * 0.85) // Скидка 15% за комплект
    : totalPrice;

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <Header />
      
      {/* HERO СЕКЦИЯ */}
      <section className="pt-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-widest">Pre-order Only</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">School<br/>Jeans</h1>
          <p className="text-zinc-400 text-lg max-w-md">Плотный деним. Прямой крой. Идеальная посадка. Первая партия ограничена.</p>
          
          {/* Выбор размера */}
          <div className="flex gap-2 mt-8">
            {["S", "M", "L", "XL"].map(size => (
              <button key={size} onClick={() => setSelectedSize(size)} 
                className={`w-12 h-12 border text-sm font-bold ${selectedSize === size ? 'bg-white text-black' : 'border-white/20 hover:border-white'}`}>
                {size}
              </button>
            ))}
          </div>
          
          <SizeGuide />
          
          <Link href={`/checkout?productId=school-jeans&size=${selectedSize || 'M'}`} 
            className="block w-full py-5 bg-white text-black text-center font-black uppercase tracking-[4px] hover:bg-zinc-200 transition-colors mt-8">
            Забронировать пару →
          </Link>
        </div>
        
        {/* ГАЛЕРЕЯ */}
        <div className="grid grid-cols-2 gap-4">
          <Image src="/school_jeans_front.jpg" alt="Front" width={600} height={800} className="w-full h-auto object-cover border border-white/10" />
          <Image src="/school_jeans_back.jpg" alt="Back" width={600} height={800} className="w-full h-auto object-cover border border-white/10 mt-12" />
        </div>
      </section>

      {/* СЕКЦИЯ СОБЕРИ ОБРАЗ */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10 mt-24">
        <h2 className="text-3xl font-black uppercase mb-12 text-center">Собери полный образ</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {lookItems.map((item) => (
            <div key={item.id} className={`relative p-6 border transition-all cursor-pointer ${
              (item.type === 'main' && lookSelected.jeans) || 
              (item.id === 'vlad-tee' && lookSelected.tee) || 
              (item.id === 'hat-test-2' && lookSelected.hat) 
                ? 'border-white bg-white/5' : 'border-white/10 opacity-50 hover:opacity-100'
            }`}
            onClick={() => {
              if (item.type === 'main') setLookSelected(p => ({...p, jeans: !p.jeans}));
              if (item.id === 'vlad-tee') setLookSelected(p => ({...p, tee: !p.tee}));
              if (item.id === 'hat-test-2') setLookSelected(p => ({...p, hat: !p.hat}));
            }}>
              <div className="aspect-square relative mb-4 bg-zinc-900">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold uppercase text-sm">{item.name}</h3>
              <p className="font-mono mt-2">{item.price.toLocaleString()} ₽</p>
              
              {/* Чекбокс выбора */}
              <div className={`absolute top-4 right-4 w-6 h-6 border flex items-center justify-center ${
                ((item.type === 'main' && lookSelected.jeans) || 
                 (item.id === 'vlad-tee' && lookSelected.tee) || 
                 (item.id === 'hat-test-2' && lookSelected.hat)) ? 'bg-white border-white' : 'border-white/30'
              }`}>
                {((item.type === 'main' && lookSelected.jeans) || 
                  (item.id === 'vlad-tee' && lookSelected.tee) || 
                  (item.id === 'hat-test-2' && lookSelected.hat)) && <span className="text-black text-xs">✓</span>}
              </div>
            </div>
          ))}
        </div>

        {/* ИТОГ ПО КОМПЛЕКТУ */}
        {lookSelected.jeans && (
          <div className="max-w-md mx-auto p-8 border border-white/20 bg-zinc-900/50 text-center">
            <p className="text-zinc-500 uppercase tracking-widest text-xs mb-2">Итого за комплект</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              {lookSelected.tee && lookSelected.hat && (
                <span className="text-zinc-600 line-through font-mono">{totalPrice.toLocaleString()} ₽</span>
              )}
              <span className="text-4xl font-black font-mono">{discountPrice.toLocaleString()} ₽</span>
            </div>
            
            {lookSelected.tee && lookSelected.hat && (
              <p className="text-green-500 text-xs uppercase tracking-wider mb-6">Скидка 15% за полный образ</p>
            )}
            
            <Link href={`/checkout?bundle=true&jeans=${lookSelected.jeans}&tee=${lookSelected.tee}&hat=${lookSelected.hat}&size=${selectedSize || 'M'}`}
              className="block w-full py-4 bg-white text-black font-black uppercase tracking-[4px] hover:bg-zinc-200 transition-colors">
              Купить образ →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}