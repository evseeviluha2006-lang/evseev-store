"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/_components/Header";
import SizeGuide from "@/_components/SizeGuide";
import { writeCart } from "@/lib/cart";
import { computeTotals, formatPrice, getProduct, type CartLine } from "@/lib/products";

const SIZES = ["S", "M", "L", "XL"];

export default function SchoolJeansPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [needSize, setNeedSize] = useState(false);
  const [lookSelected, setLookSelected] = useState({
    sexShirt: false,
    elShirt: false,
  });

  const jeans = getProduct("school-jeans");
  const sexShirt = getProduct("sex-shirt");
  const elShirt = getProduct("el-shirt");

  // Предпросмотр цены считается тем же кодом, что и на сервере
  const previewLines: CartLine[] = [{ id: "school-jeans", size: selectedSize ?? "M", quantity: 1 }];
  if (lookSelected.sexShirt) previewLines.push({ id: "sex-shirt", size: selectedSize ?? "M", quantity: 1 });
  if (lookSelected.elShirt) previewLines.push({ id: "el-shirt", size: selectedSize ?? "M", quantity: 1 });
  const preview = computeTotals(previewLines);

  const reserve = () => {
    if (!selectedSize) {
      setNeedSize(true);
      return;
    }

    const lines: CartLine[] = [
      { id: "school-jeans", size: selectedSize, quantity: 1 },
    ];
    if (lookSelected.sexShirt) {
      lines.push({ id: "sex-shirt", size: selectedSize, quantity: 1 });
    }
    if (lookSelected.elShirt) {
      lines.push({ id: "el-shirt", size: selectedSize, quantity: 1 });
    }

    writeCart(lines);
    router.push("/checkout");
  };

  const toggleLook = (id: "sexShirt" | "elShirt") => {
    setLookSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
            {SIZES.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => { setSelectedSize(size); setNeedSize(false); }}
                aria-label={`Размер ${size}`}
                className={`w-12 h-12 border text-sm font-bold ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white'}`}>
                {size}
              </button>
            ))}
          </div>

          {needSize && (
            <p className="text-[10px] text-red-500 uppercase tracking-wider animate-pulse">
              Выберите размер, чтобы продолжить
            </p>
          )}

          <SizeGuide />

          <button
            type="button"
            onClick={reserve}
            className="block w-full py-5 bg-white text-black text-center font-black uppercase tracking-[4px] hover:bg-zinc-200 transition-colors mt-8">
            Забронировать пару →
          </button>
        </div>

        {/* ГАЛЕРЕЯ */}
        <div className="flex flex-col gap-6">
          {/* Главная картинка */}
          <div className="relative w-full aspect-[3/4] bg-zinc-900 border border-white/10 overflow-hidden">
            <Image
              src="/shool_jeans_glav.jpg"
              alt="School Jeans Lookbook"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
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
              <Image src="/sex_shirt.jpg" alt="SEX Shirt" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              <div className="absolute inset-0 flex items-end p-3 bg-black/60 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase leading-tight text-red-400">
                  Только в комплекте<br/>с джинсами
                </p>
              </div>
            </div>

            <div className="relative aspect-square bg-zinc-900 border border-white/10 overflow-hidden -translate-y-4">
              <Image src="/el_shirt.jpg" alt="EL Shirt" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
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
            { id: 'jeans', name: 'SCHOOL JEANS', product: jeans, active: true },
            { id: 'sexShirt', name: 'SEX SHIRT', product: sexShirt, active: lookSelected.sexShirt },
            { id: 'elShirt', name: 'EL SHIRT', product: elShirt, active: lookSelected.elShirt }
          ].map((item) => (
            <div
              key={item.id}
              className={`p-6 border transition-all ${item.id !== 'jeans' ? 'cursor-pointer' : ''} ${item.active ? 'border-white bg-white/5' : 'border-white/10 opacity-50'}`}
              onClick={() => {
                if (item.id === 'sexShirt' || item.id === 'elShirt') toggleLook(item.id);
              }}
            >
              <div className="aspect-square relative mb-4 bg-zinc-900 overflow-hidden">
                {item.product && (
                  <Image
                    src={item.product.images[0]}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="font-bold uppercase text-sm">{item.name}</h3>
              <p className="font-mono mt-2 font-numbers">
                {item.product ? formatPrice(item.product.price) : "—"}
              </p>
              {item.id !== 'jeans' && (
                <p className="text-[10px] text-red-500 mt-1 uppercase">Только с джинсами</p>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto p-8 border border-white/20 bg-zinc-900/50 text-center">
          <p className="text-zinc-500 uppercase tracking-widest text-xs mb-2">Итого</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            {preview.discount > 0 && (
              <span className="text-zinc-600 line-through font-mono font-numbers">
                {formatPrice(preview.subtotal)}
              </span>
            )}
            <span className="text-4xl font-black font-mono font-numbers">
              {formatPrice(preview.total)}
            </span>
          </div>

          {preview.discount > 0 && (
            <p className="text-green-500 text-xs uppercase tracking-wider mb-6">
              Скидка 15% за комплект
            </p>
          )}

          <button
            type="button"
            onClick={reserve}
            className="block w-full py-4 bg-white text-black font-black uppercase tracking-[4px] hover:bg-zinc-200 transition-colors">
            Купить комплект →
          </button>
        </div>
      </section>
    </main>
  );
}
