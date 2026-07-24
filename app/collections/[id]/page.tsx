"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import LikeButton from "@/_components/LikeButton";

// Данные для коллекции DISTRESS
const distressCollection = [
  {
    id: "d1",
    name: "DISTRESS PANTS // GREY",
    price: "7 990 ₽",
    image: "/distress-pants.jpg", // Положи фото брюк в public
    description: "Джинсы с эффектом дистресс. Рваные колени, потертости по всей длине. Плотный деним 14 oz."
  },
  {
    id: "d2",
    name: "DISTRESS TEE // WASHED",
    price: "5 490 ₽",
    image: "/distress-tee.jpg",
    description: "Футболка с кислотной стиркой. Эффект состаривания, выцветший принт. Оверсайз крой."
  },
  {
    id: "d3",
    name: "DISTRESS HOODIE // BLACK",
    price: "9 990 ₽",
    image: "/distress-hoodie.jpg",
    description: "Худи с необработанными краями. Капюшон без завязок, рукава спущены. Тяжелая ткань."
  },
  {
    id: "d4",
    name: "DISTRESS CAP // RED",
    price: "3 490 ₽",
    image: "/distress-cap.jpg",
    description: "Кепка с красной вышивкой. Потертый козырек, металлическая пряжка. Лимитированная серия."
  }
];

export default function CollectionPage() {
  const params = useParams();
  const id = params?.id as string;

  // Пока только одна коллекция, но структура готова для расширения
  if (id !== "distress") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="font-mono text-zinc-500 uppercase tracking-widest">COLLECTION NOT FOUND</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* Обложка коллекции */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <Image 
          src="/distress-cover.jpg" 
          alt="DISTRESS Collection" 
          fill 
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-10 left-6 md:left-16 max-w-7xl w-full">
          <p className="text-[10px] font-mono text-red-500 uppercase tracking-[4px] mb-2">SEASON 01 // 2024</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            DISTRESS
          </h1>
          <p className="text-zinc-400 max-w-md text-sm md:text-base leading-relaxed">
            Коллекция о разрушении и восстановлении. Каждая вещь несет следы времени — потертости, разрывы, выцветшие участки. Это не дефекты, это история.
          </p>
        </div>
      </div>

      {/* Сетка товаров коллекции */}
      <div className="flex-grow px-6 py-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          
          {distressCollection.map((product) => (
            <Link href={`/catalog/${product.id}`} key={product.id} className="group block cursor-pointer">
              
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                />
                
                {/* Кнопка лайка */}
                <div className="absolute top-3 right-3 z-20" onClick={(e) => e.stopPropagation()}>
                  <LikeButton 
                    id={product.id}
                    type="product"
                    title={product.name}
                    image={product.image}
                    price={product.price}
                    description={product.description}
                    size="sm"
                  />
                </div>
              </div>

              <div className="flex justify-between items-end border-b border-white/10 pb-2 group-hover:border-white/30 transition-colors">
                <h3 className="text-xs font-bold uppercase tracking-wider truncate pr-2">{product.name}</h3>
                <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">{product.price}</span>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}