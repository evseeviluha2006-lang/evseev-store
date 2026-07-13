import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

// Данные коллекций (пока одна, но структура готова для расширения)
const collections = [
  {
    id: "distress",
    title: "DISTRESS",
    subtitle: "SEASON 01 // 2024",
    image: "/distress-cover.jpg", // Твоя новая обложка
    itemsCount: 4,
    size: "large" // large, medium или small для разной сетки
  },
  // Примеры будущих коллекций для визуала:
  {
    id: "archive",
    title: "ARCHIVE",
    subtitle: "EARLY WORKS",
    image: "/archive-cover.jpg", 
    itemsCount: 12,
    size: "medium"
  },
  {
    id: "essentials",
    title: "ESSENTIALS",
    subtitle: "BASIC LINE",
    image: "/essentials-cover.jpg",
    itemsCount: 8,
    size: "small"
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

        {/* Мозаичная сетка */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          
          {collections.map((col) => {
            // Определяем размер ячейки в сетке
            let spanClass = "md:col-span-1 md:row-span-1"; // Small
            if (col.size === "large") spanClass = "md:col-span-2 md:row-span-2";
            if (col.size === "medium") spanClass = "md:col-span-1 md:row-span-2";

            return (
              <Link 
                href={`/collections/${col.id}`} 
                key={col.id}
                className={`group relative overflow-hidden border border-white/10 ${spanClass}`}
              >
                <Image 
                  src={col.image} 
                  alt={col.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
                />
                
                {/* Градиент снизу для читаемости текста */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Текст коллекции */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    {col.subtitle}
                  </p>
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
                    {col.title}
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono">
                    {col.itemsCount} ITEMS →
                  </p>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </main>
  );
}