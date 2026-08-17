import Image from "next/image";
import Header from "@/_components/Header";

const eras = [
  {
    id: "beginning",
    title: "НАЧАЛО // THE AWAKENING",
    date: "2019–2021",
    cover: "/history/era-beginning-cover.jpg",
    description: "Знакомство с миром творчества. Учился на электрика, но душа лежала к другому. Отчисление стало точкой невозврата — я погрузился в искусство по полной.",
    items: []
  },
  {
    id: "first-show",
    title: "ПЕРВЫЙ ПОКАЗ // BREAKTHROUGH",
    date: "2022",
    cover: "/history/era-first-show-cover.jpg",
    description: "Постановка первого показа мод. Активные знакомства в Калининграде, поступление на конструктора-модельера. Защита двух дипломных работ с отличием.",
    items: []
  },
  {
    id: "bastion",
    title: "АСТРОНОМИЧЕСКИЙ БАСТИОН // CHAOS",
    date: "2023",
    cover: "/history/era-bastion-cover.jpg",
    description: "Большой показ совместно с проектом Электродвор. Всё пошло не по плану, руки опускались, но я не сдался. Работал дальше вопреки всему.",
    items: []
  },
  {
    id: "new-paths",
    title: "НОВЫЕ ПУТИ // EVOLUTION",
    date: "2024",
    cover: "/history/era-new-paths-cover.jpg",
    description: "Поиск новых путей развития. Эксперименты с формами, материалами и подачей. Начало работы над коллекциями DISTRESSED и WINTER 2.6.",
    items: []
  }
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* ЗАГОЛОВОК */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto w-full border-b border-white/10 mb-12">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[4px] mb-2">ARCHIVE</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
          ИСТОРИЯ
        </h1>
      </div>

      {/* ТАЙМЛАЙН */}
      <div className="pb-24 px-6 max-w-5xl mx-auto w-full space-y-32 relative">
        {/* Вертикальная линия таймлайна (только для десктопа) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>

        {eras.map((era, index) => (
          <section key={era.id} className="relative flex flex-col md:flex-row gap-12 items-center">
            
            {/* ДАТА И ТОЧКА */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
              <div className="w-3 h-3 bg-white rounded-full border-4 border-black shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            </div>

            {/* ЛЕВАЯ ЧАСТЬ (Текст) */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:order-2 md:text-left md:pl-16'} pl-16 md:pl-0`}>
              <span className="block text-xs font-mono text-zinc-500 mb-2 tracking-widest">{era.date}</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 leading-tight">
                {era.title}
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {era.description}
              </p>
              
              {/* Блок для доп. контента (фото/видео внутри этапа) */}
              {era.items.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {era.items.map((item, i) => (
                    <div key={i} className="relative aspect-video bg-zinc-900 border border-white/10 overflow-hidden group">
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-600 uppercase">
                        {item.type === 'video' ? 'Video Archive' : 'Photo Archive'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ПРАВАЯ ЧАСТЬ (Обложка) */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2 md:pl-16' : 'md:pr-16'} pl-16 md:pl-0`}>
              <div className="relative aspect-[4/3] w-full bg-zinc-900 border border-white/10 overflow-hidden group">
                {/* Заглушка, если картинка не загрузится */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-800 text-xs uppercase tracking-widest">
                  Archive Visuals
                </div>
                
                {/* Картинка БЕЗ onError */}
                <Image 
                  src={era.cover} 
                  alt={era.title} 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
            </div>

          </section>
        ))}
      </div>
    </main>
  );
}