import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";

const collections = [
  {
    id: "distressed",
    title: "DISTRESSED",
    subtitle: "SEASON 01 // 2024",
    image: "/distress-cover.jpg",
    itemsCount: 5,
    heightClass: "md:row-span-2" 
  },
  {
    id: "winter-2-6",
    title: "WINTER 2.6",
    subtitle: "ESSENTIALS & GRAPHICS",
    image: "/winter26-cover.jpg",
    itemsCount: 3,
    heightClass: "md:row-span-3" 
  },
  {
    id: "vlad-drobyshev",
    title: "ВЛАД ДРОБЫШЕВ",
    subtitle: "FRIENDSHIP COLLECTION",
    image: "/vlad-drobyshev-cover.jpg",
    itemsCount: 3,
    heightClass: "md:row-span-1" 
  }
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-32 pb-10 px-6 max-w-7xl mx-auto w-full">
        <h1 className="text-lg font-bold tracking-[8px] uppercase mb-12 text-center md:text-left">
          COLLECTIONS
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
          
          {collections.map((col) => (
            <Link 
              href={`/collections/${col.id}`} 
              key={col.id}
              className={`group relative block overflow-hidden border border-white/10 bg-zinc-900 ${col.heightClass} flex items-center justify-center p-4`}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={col.image} 
                  alt={col.title} 
                  fill 
                  className="object-contain transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                />
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm p-3 border-l-2 border-red-600">
                  <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    {col.subtitle}
                  </p>
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none text-white">
                    {col.title}
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">
                    {col.itemsCount} ITEMS →
                  </p>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}