import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";

// Обновленный тип товара
type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  isPreorder?: boolean; // <--- ДОБАВИЛИ ПОЛЕ ДЛЯ ПРЕДЗАКАЗА
};

const products: Product[] = [
  // 1. ГЛАВНЫЙ ТОВАР (ДЖИНСЫ) - Стоит первым
  {
    id: "school-jeans",
    name: "SCHOOL JEANS",
    price: "6 500 ₽",
    image: "/school_jeans_front.jpg",
    isPreorder: true, // <--- ВКЛЮЧИЛИ ПЛАШКУ
  },
  // 2. ОСТАЛЬНЫЕ ТОВАРЫ
  {
    id: "hoodie-tvar",
    name: "TVAR HOODIE // BLACK",
    price: "5 500 ₽",
    image: "/tvar-front.jpg",
  },
  {
    id: "vlad-tee",
    name: "VLAD DROBYSHEV // TEE",
    price: "4 500 ₽",
    image: "/vlad-tee-front.jpg",
  },
  {
    id: "vlad-ls",
    name: "VLAD DROBYSHEV // LONGSLEEVE",
    price: "5 900 ₽",
    image: "/vlad-ls-front.jpg",
  },
  {
    id: "vlad-cape",
    name: "VLAD DROBYSHEV // CAPE",
    price: "7 500 ₽",
    image: "/vlad-cape-front.jpg",
  },
  {
    id: "hat-test-2",
    name: "ШАПКА ТЕСТ-2 // GREY",
    price: "2 000 ₽",
    image: "/test-front.jpg",
  },
  {
    id: "hoodie-spasibo",
    name: "ХУДИ СПАСИБО // BLACK",
    price: "5 000 ₽",
    image: "/hodie-thanks.jpg",
  },
  {
    id: "fuck-its-evs-top",
    name: "FUCK IT'S EVS // TOP",
    price: "3 500 ₽",
    image: "/product2.jpg",
  },
  {
    id: "18-plus-w-evs-top",
    name: "18+ W EVS // TOP",
    price: "3 500 ₽",
    image: "/18+w-front.jpg",
  },
  {
    id: "18-plus-evs-top",
    name: "18+ EVS // TOP",
    price: "3 500 ₽",
    image: "/18+-front.jpg",
  },
  {
    id: "distressed-pants",
    name: "DISTRESSED PANTS",
    price: "7 990 ₽",
    image: "/dipa-front.jpg",
  },
  {
    id: "radioevs-shirt",
    name: "RADIOEVS SHIRT",
    price: "5 990 ₽",
    image: "/radioevs-shirt-front.jpg",
  },
  {
    id: "redholes-pants",
    name: "RED HOLES PANTS",
    price: "8 490 ₽",
    image: "/redholes-front.jpg",
  },
  {
    id: "krest-jacket",
    name: "KREST JACKET",
    price: "18 990 ₽",
    image: "/krest-jacket-front.jpg",
  },
  {
    id: "psyho-jacket",
    name: "PSYHO JACKET",
    price: "14 990 ₽",
    image: "/psyho-jacket-front.jpg",
  },
];

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* ЗАГОЛОВОК */}
        <div className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[4px] mb-2">ARCHIVE / SHOP</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">КАТАЛОГ</h1>
          </div>
          <span className="hidden md:block text-xs font-mono text-zinc-500">{products.length} ITEMS</span>
        </div>

        {/* СЕТКА ТОВАРОВ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <Link href={`/catalog/${product.id}`} key={product.id} className="group block">
              
              {/* ФОТО ТОВАРА */}
              <div className="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden border border-white/5 mb-4">
                
                {/* БЕЙДЖ PRE-ORDER (Появляется только если isPreorder: true) */}
                {product.isPreorder && (
                  <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider animate-pulse">
                    PRE-ORDER
                  </div>
                )}

                {/* Картинка */}
                {product.image && (
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                
                {/* Эффект при наведении (кнопка "Смотреть") */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                   <span className="bg-white text-black text-[10px] font-bold px-4 py-2 uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     Смотреть
                   </span>
                </div>
              </div>

              {/* НАЗВАНИЕ И ЦЕНА */}
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wide leading-tight group-hover:text-zinc-400 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <span className="text-xs md:text-sm font-mono text-zinc-400 whitespace-nowrap font-numbers">
                  {product.price}
                </span>
              </div>
              
              {/* Доп инфа для предзаказа в каталоге */}
              {product.isPreorder && (
                 <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wide font-bold">
                   Drop: Sept 2026
                 </p>
              )}

            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}