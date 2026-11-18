import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import { formatPrice, products } from "@/lib/products";

export default function CatalogPage() {
  const visibleProducts = products.filter((product) => !product.hidden);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[4px] mb-2">ARCHIVE / SHOP</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">КАТАЛОГ</h1>
          </div>
          <span className="hidden md:block text-xs font-mono text-zinc-500">{visibleProducts.length} ITEMS</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {visibleProducts.map((product) => (
            <Link href={`/catalog/${product.id}`} key={product.id} className="group block">
              <div className="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden border border-white/5 mb-4">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <span className="bg-white text-black text-[10px] font-bold px-4 py-2 uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Смотреть
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-start md:gap-2">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wide leading-tight group-hover:text-zinc-400 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <span className="text-[11px] md:text-sm font-mono text-zinc-400 whitespace-nowrap font-numbers">
                  {formatPrice(product.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
