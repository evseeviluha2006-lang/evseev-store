"use client";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import AddToCartButton from "@/_components/AddToCartButton";
import LikeButton from "@/_components/LikeButton";
import SizeGuide from "@/_components/SizeGuide";

type Product = {
  id: string;
  name: string;
  price: string;
  images: string[];
  description: string;
  sizes?: string[];
  collection?: string;
  isPreorder?: boolean;
  preorderDate?: string;
  hideSizeGuide?: boolean; // <-- ДОБАВИЛИ ПОЛЕ ДЛЯ СКРЫТИЯ ТАБЛИЦЫ
};

const products: Product[] = [
  {
    id: "school-jeans",
    name: "SCHOOL JEANS",
    price: "5 990 ₽", // ИСПРАВИЛ ЦЕНУ ОБРАТНО НА 5990
    images: ["/school_jeans_front.jpg", "/school_jeans_back.jpg"],
    description: "Джинсы, созданные специально к началу учебного года. Плотный деним, прямой крой, идеальная посадка.",
    sizes: ["S", "M", "L", "XL"],
    collection: "school",
    isPreorder: true,
    preorderDate: "21 СЕНТЯБРЯ"
  },
  {
    id: "sex-shirt",
    name: "SEX Shirt // BLACK",
    price: "3 500 ₽",
    images: ["/sex_shirt.jpg"],
    description: "Эксклюзивная майка. Доступна только при заказе комплектом с School Jeans.",
    sizes: ["S", "M", "L", "XL"],
    collection: "school"
  },
  {
    id: "hat-sex",
    name: "HAT - SEX",
    price: "750 ₽",
    images: ["/hat_front.jpg", "/hat_glav.jpg"],
    description: "Очень теплая шапка. Плотная вязка, не продувает.",
    sizes: ["S", "M"],
    collection: "accessories",
    hideSizeGuide: true // <-- ТАБЛИЦА РАЗМЕРОВ БУДЕТ СКРЫТА
  },
  {
    id: "el-shirt",
    name: "LOG SHIRT // BLACK",
    price: "3 500 ₽",
    images: ["/el_shirt.jpg"],
    description: "Футболка с логотипом. Доступна только в комплекте с джинсами SCHOOL JEANS.",
    sizes: ["S", "M", "L", "XL"],
    collection: "school"
  },
  {
    id: "hoodie-tvar",
    name: "TVAR HOODIE // BLACK",
    price: "5 500 ₽",
    images: ["/tvar-front.jpg", "/tvar-glav.jpg"],
    description: "Новый худи из коллекции TVAR. Плотный хлопок, агрессивный крой.",
    sizes: ["S", "M", "L", "XL"],
    collection: "tvar"
  },
  {
    id: "vlad-tee",
    name: "VLAD DROBYSHEV // TEE",
    price: "4 500 ₽",
    images: ["/vlad-tee-front.jpg", "/vlad-tee-full1.jpg", "/vlad-tee-full2.jpg"],
    description: "Футболка из коллекции, посвященной Владу. Уникальный крой и принт.",
    sizes: ["S", "M", "L", "XL"],
    collection: "vlad"
  },
  {
    id: "vlad-ls",
    name: "VLAD DROBYSHEV // LONGSLEEVE",
    price: "5 900 ₽",
    images: ["/vlad-ls-front.jpg", "/vlad-ls-full.jpg", "/vlad-ls-full1.jpg"],
    description: "Лонгслив с агрессивным дизайном. Плотный хлопок.",
    sizes: ["S", "M", "L", "XL"],
    collection: "vlad"
  },
  {
    id: "vlad-cape",
    name: "VLAD DROBYSHEV // CAPE",
    price: "7 500 ₽",
    images: ["/vlad-cape-front.jpg", "/vlad-cape-full.jpg", "/vlad-cape-full1.jpg", "/vlad-cape-full2.jpg"],
    description: "Накидка для завершения образа из коллекции ВЛАД ДРОБЫШЕВ.",
    sizes: ["S", "M", "L", "XL"],
    collection: "vlad"
  },
  {
    id: "hat-test-2",
    name: "ШАПКА ТЕСТ-2 // GREY",
    price: "2 000 ₽",
    images: ["/test-front.jpg", "/test-full.jpg", "/test-full1.jpg", "/test-full2.jpg", "/test-full3.jpg"],
    description: "Материал: 100% хлопок. Принт 'ТЕСТ-2'. Размер универсальный.",
    sizes: ["ONE SIZE"],
    collection: "test"
  },
  {
    id: "hoodie-spasibo",
    name: "ХУДИ СПАСИБО // BLACK",
    price: "5 000 ₽",
    images: ["/hodie-thanks.jpg"],
    description: "Довольно давняя работа. Сделал базовый худак для повседневной носки.",
    sizes: ["L"],
    collection: "archive"
  },
  {
    id: "fuck-its-evs-top",
    name: "FUCK IT'S EVS // TOP",
    price: "3 500 ₽",
    images: ["/product2.jpg"],
    description: "Укороченный топ с агрессивным принтом. Плотный хлопок.",
    sizes: ["S", "M", "L", "XL"],
    collection: "18plus"
  },
  {
    id: "18-plus-w-evs-top",
    name: "18+ W EVS // TOP",
    price: "3 500 ₽",
    images: ["/18+w-front.jpg", "/18+w-full1.jpg", "/18+w-full2.jpg"],
    description: "Белый топ с красным трафаретным принтом. Оверсайз крой.",
    sizes: ["S", "M", "L", "XL"],
    collection: "18plus"
  },
  {
    id: "18-plus-evs-top",
    name: "18+ EVS // TOP",
    price: "3 500 ₽",
    images: ["/18+-front.jpg", "/18+-full1.jpg", "/18+-full2.jpg", "/18+-full3.jpg"],
    description: "Черный топ с оранжевым принтом. Укороченная длина.",
    sizes: ["S", "M", "L", "XL"],
    collection: "18plus"
  },
  {
    id: "distressed-pants",
    name: "DISTRESSED PANTS",
    price: "7 990 ₽",
    images: ["/dipa-front.jpg", "/dipa-back.jpg", "/dipa-full.jpg", "/dipa-full2.jpg", "/dipa-glav.jpg"],
    description: "Джинсы с эффектом дистресс из коллекции DIPA.",
    sizes: ["S", "M", "L", "XL"],
    collection: "dipa"
  },
  {
    id: "radioevs-shirt",
    name: "RADIOEVS SHIRT // INSPIRED BY RADIOHEAD",
    price: "5 990 ₽",
    images: ["/radioevs-shirt-front.jpg", "/radioevs-shirt-full.jpg", "/radioevs-shirt-full2.jpg", "/radioevs-shirt-full3.jpg", "/radioevs-shirt-full4.jpg", "/radioevs-shirt-full5.jpg"],
    description: "Футболка, созданная по вдохновению группой Radiohead.",
    sizes: ["S", "M", "L", "XL"],
    collection: "radioevs"
  },
  {
    id: "redholes-pants",
    name: "RED HOLES PANTS // DISTRESSED",
    price: "8 490 ₽",
    images: ["/redholes-front.jpg", "/redholes-back.jpg", "/redholes-full.jpg", "/redholes-full2.jpg", "/redholes-full3.jpg"],
    description: "Штаны с огромными дырками на коленях.",
    sizes: ["S", "M", "L", "XL"],
    collection: "dipa"
  },
  {
    id: "krest-jacket",
    name: "KREST JACKET // CRUSADER",
    price: "18 990 ₽",
    images: ["/krest-jacket-front.jpg", "/krest-jacket-double.jpg", "/krest-jacket-full.jpg"],
    description: "Куртка выполнена по технике сшивания множества маленьких кусочков ткани.",
    sizes: ["S", "M", "L", "XL"],
    collection: "archive"
  },
  {
    id: "psyho-jacket",
    name: "PSYHO JACKET // SLIM FIT",
    price: "14 990 ₽",
    images: ["/psyho-jacket-front.jpg", "/psyho-jacket-full.jpg"],
    description: "Эта куртка выполнена в слим фит.",
    sizes: ["S", "M", "L", "XL"],
    collection: "archive"
  },
];

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase mb-4">ТОВАР НЕ НАЙДЕН</h1>
          <Link href="/catalog" className="text-zinc-500 underline hover:text-white">Вернуться в каталог</Link>
        </div>
      </main>
    );
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeImageIndex < product.images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    } else if (isRightSwipe && activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const relatedProducts = products.filter(p => p.collection === product.collection && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* БАННЕР ПРЕДЗАКАЗА */}
      {product.isPreorder && (
        <div className="w-full bg-red-600 text-white text-center py-2 text-xs font-bold tracking-[4px] uppercase animate-pulse">
          LIMITED PRE-ORDER // ОТПРАВКА {product.preorderDate}
        </div>
      )}

      <div className="flex-grow pt-12 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start">
        
        {/* ГАЛЕРЕЯ */}
        <div className="flex gap-4 w-full md:w-auto flex-col md:flex-row">
          <div className="hidden md:flex flex-col gap-4 w-[80px] flex-shrink-0 order-2 md:order-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-square w-full overflow-hidden border transition-all duration-200 ${
                  activeImageIndex === idx
                    ? "border-white opacity-100 ring-1 ring-white/50"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                {img && <Image src={img} alt={`View ${idx}`} fill className="object-cover" />}
              </button>
            ))}
          </div>

          <div 
            className={`relative w-full md:w-[600px] min-h-[400px] md:min-h-[600px] bg-zinc-900 overflow-hidden border group flex items-center justify-center order-1 md:order-2 select-none ${product.isPreorder ? 'border-red-500/50' : 'border-white/10'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {product.images[activeImageIndex] && (
              <Image
                key={product.images[activeImageIndex]}
                src={product.images[activeImageIndex]}
                alt={product.name}
                width={1200}
                height={1600}
                className="w-full h-auto object-contain animate-slide-up-blur pointer-events-none"
                priority
              />
            )}
            
            {product.isPreorder && (
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-red-500 px-3 py-1 z-20">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">PRE-ORDER</span>
              </div>
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

            <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 md:hidden z-20">
               <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                 {activeImageIndex + 1} / {product.images.length}
               </span>
               <div className="flex justify-center gap-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${activeImageIndex === idx ? "bg-white w-6" : "bg-white/30 w-1.5"}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex absolute inset-y-0 left-0 right-0 justify-between items-center px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
               <button 
                 onClick={() => setActiveImageIndex(Math.max(0, activeImageIndex - 1))}
                 className="pointer-events-auto p-2 bg-black/50 rounded-full text-white hover:bg-black/80 disabled:opacity-0"
                 disabled={activeImageIndex === 0}
               >
                 ←
               </button>
               <button 
                 onClick={() => setActiveImageIndex(Math.min(product.images.length - 1, activeImageIndex + 1))}
                 className="pointer-events-auto p-2 bg-black/50 rounded-full text-white hover:bg-black/80 disabled:opacity-0"
                 disabled={activeImageIndex === product.images.length - 1}
               >
                 →
               </button>
            </div>
          </div>
        </div>

        {/* ИНФОРМАЦИЯ */}
        <div className="flex flex-col justify-center h-full py-8 md:py-0 sticky top-24">
          <div className="mb-6 text-[10px] font-mono text-zinc-500 tracking-widest uppercase flex items-center gap-2">
            {product.isPreorder ? (
              <span className="text-red-500 font-bold">DROP 00 // PRE-ORDER</span>
            ) : (
              <span>SEASON 01 // 2024</span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 uppercase leading-[0.9]">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-8">
            <p className="text-2xl text-zinc-300 font-mono font-numbers">{product.price}</p>
            {product.isPreorder && (
              <span className="text-xs border border-red-500/50 text-red-400 px-2 py-1 rounded uppercase tracking-wide">
                Предзаказ
              </span>
            )}
          </div>

          <p className="text-zinc-400 leading-relaxed mb-6 text-sm md:text-base max-w-md">
            {product.description}
          </p>

          {product.isPreorder && (
            <div className="mb-8 p-4 border border-white/10 bg-zinc-900/50 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div className="text-xs text-zinc-300 leading-relaxed">
                <p className="font-bold text-white mb-1 uppercase tracking-wide">Внимание: Предзаказ</p>
                <p>Отправка состоится <span className="text-white font-bold">{product.preorderDate}</span>.</p>
              </div>
            </div>
          )}
          
          {/* БЛОК РАЗМЕРОВ (СКРЫТ ДЛЯ ШАПКИ ЧЕРЕЗ hideSizeGuide) */}
          {product.sizes && product.sizes.length > 0 && (
             <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                   <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Выберите размер:</p>
                   {!selectedSize && <span className="text-[10px] text-red-500 uppercase tracking-wider">Обязательно</span>}
                </div>
                
                {/* АДАПТИВНАЯ СЕТКА КНОПОК */}
                <div className={`grid gap-2 mb-4 ${product.sizes.length === 2 ? 'grid-cols-2 max-w-[240px]' : 'grid-cols-4'}`}>
                   {product.sizes.map(size => (
                      <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 border text-sm font-bold transition-all ${
                          selectedSize === size 
                            ? 'bg-white text-black border-white' 
                            : 'bg-transparent text-white border-white/20 hover:border-white'
                        }`}
                      >
                        {size}
                      </button>
                   ))}
                </div>

                {/* ТАБЛИЦА РАЗМЕРОВ (ТОЛЬКО ЕСЛИ НЕ hideSizeGuide) */}
                {!product.hideSizeGuide && (
                  <SizeGuide />
                )}
             </div>
          )}

          {/* КНОПКА */}
          <div className="mb-4">
             {!selectedSize ? (
                <>
                   <button 
                     disabled 
                     className="w-full py-5 bg-zinc-800 text-zinc-500 text-sm font-black uppercase tracking-[4px] cursor-not-allowed opacity-50"
                   >
                     {product.isPreorder ? "ЗАБРОНИРОВАТЬ ПАРУ →" : "ДОБАВИТЬ В КОРЗИНУ"}
                   </button>
                   <p className="mt-2 text-[10px] text-red-500 text-center uppercase tracking-wider animate-pulse">
                     Выберите размер для продолжения
                   </p>
                </>
             ) : (
                <AddToCartButton 
                   product={{...product, selectedSize}} 
                   customText={product.isPreorder ? "ЗАБРОНИРОВАТЬ ПАРУ →" : undefined} 
                />
             )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-[10px] font-mono text-zinc-600">
            <div>МАТЕРИАЛ: 100% COTTON</div>
            <div>ПРОИЗВОДСТВО: RUSSIA</div>
            <div>УХОД: 30°C MACHINE WASH</div>
            <div>SKU: EVS-{product.id.toUpperCase().replace(/-/g, "")}</div>
          </div>
        </div>
      </div>

      {/* LOOKBOOK SECTION (ТОЛЬКО ДЛЯ SCHOOL JEANS) */}
      {product.id === "school-jeans" && (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-white/10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">School Jeans Lookbook</h2>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Complete The Set</p>
          </div>

          <div className="w-full mb-24 relative group">
            <Link href="/catalog/school-jeans" className="block relative aspect-[3/4] md:aspect-[16/9] w-full bg-zinc-900 overflow-hidden border border-white/10">
              <Image src="/shool_jeans_glav.jpg" alt="School Jeans Full Look" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 to-transparent">
                <span className="bg-white text-black px-6 py-2 font-bold uppercase tracking-widest text-sm">Смотреть джинсы</span>
              </div>
            </Link>
            <p className="text-center mt-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Full Set Look</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="relative group md:translate-y-12 md:-rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <Link href="/catalog/sex-shirt" className="block relative aspect-square w-full max-w-md mx-auto bg-zinc-900 border border-white/10 overflow-hidden">
                <Image src="/sex_shirt.jpg" alt="Sex Shirt" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
                  <p className="text-white font-bold uppercase tracking-wider text-sm mb-1">Sex Shirt</p>
                  <p className="text-zinc-300 text-[10px] uppercase tracking-widest mb-3">Только в комплекте</p>
                  <span className="text-white text-xs font-bold border-b border-white pb-0.5">Купить комплект</span>
                </div>
              </Link>
              <p className="text-center mt-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Sex Shirt // Black</p>
            </div>

            <div className="relative group md:-translate-y-12 md:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <Link href="/catalog/el-shirt" className="block relative aspect-square w-full max-w-md mx-auto bg-zinc-900 border border-white/10 overflow-hidden">
                <Image src="/el_shirt.jpg" alt="Log Shirt" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
                  <p className="text-white font-bold uppercase tracking-wider text-sm mb-1">Log Shirt</p>
                  <p className="text-zinc-300 text-[10px] uppercase tracking-widest mb-3">Только в комплекте</p>
                  <span className="text-white text-xs font-bold border-b border-white pb-0.5">Купить комплект</span>
                </div>
              </Link>
              <p className="text-center mt-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Log Shirt // Black</p>
            </div>
          </div>
        </div>
      )}

      {/* ПОХОЖИЕ ТОВАРЫ */}
      {relatedProducts.length > 0 && (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-24 mt-12 border-t border-white/10 pt-12">
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[4px] mb-12 text-center">
            Также может понравиться
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((item) => (
              <Link 
                href={`/catalog/${item.id}`} 
                key={item.id}
                className="group block"
              >
                <div className="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden border border-white/5 mb-3">
                  {item.images[0] && (
                    <Image 
                      src={item.images[0]} 
                      alt={item.name}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wide truncate group-hover:text-white text-zinc-400 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs font-mono text-zinc-500 mt-1">
                  {item.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}