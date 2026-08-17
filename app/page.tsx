import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";

export default function Home() {
  return (
    <main className="relative w-full bg-black text-white flex flex-col">
      
      {/* ПЕРВЫЙ ЭКРАН (ГЛАВНАЯ) - Остается неизменным */}
      <div className="relative h-screen w-full overflow-hidden flex flex-col">
        {/* ШАПКА */}
        <Header />

        {/* ФОН С АНИМАЦИЕЙ */}
        <div className="absolute inset-0 animate-hero-zoom will-change-transform z-0">
          <Image
            src="/hero.jpg"
            alt="EVSEEV Campaign"
            fill
            priority
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* КОНТЕНТ ПЕРВОГО ЭКРАНА */}
        <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
          <div className="h-20" /> 

          <div className="flex items-end justify-between px-6 pb-10 pointer-events-auto">
            
            {/* Левый угол: Инфо */}
            <div className="hidden md:block text-[10px] text-white/60 font-mono leading-relaxed animate-fade-in-delayed opacity-0">
              <p>COLLECTION 01 / 2026</p>
              <p>55.7558° N, 37.6173° E</p>
              <p>KALININGRAD // STREETWEAR</p>
            </div>

            {/* Центр: Кнопка LOOK */}
            <div className="animate-fade-in-late opacity-0 absolute left-1/2 -translate-x-1/2 bottom-12">
              <Link href="/catalog" className="group relative flex items-center justify-center w-48 h-16 hover:scale-105 transition-transform duration-300">
                <svg className="absolute inset-0 w-full h-full text-white pointer-events-none" viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10 C 20 5, 180 2, 195 8 C 198 20, 199 50, 195 62 C 180 68, 20 65, 5 60 C 2 50, 1 20, 5 10 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  <path d="M10 15 C 30 12, 170 10, 190 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-40" />
                </svg>
                <span className="relative z-10 text-sm font-bold tracking-[6px] uppercase text-white group-hover:text-white transition-colors">LOOK</span>
              </Link>
            </div>

             <div className="hidden md:block w-32"></div>
          </div>
        </div>
      </div>

      {/* БЛОК КОНТАКТОВ (Появляется при скролле вниз) */}
      <section className="w-full border-t border-white/10 bg-black py-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-12">
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            КОНТАКТНЫЕ ДАННЫЕ
          </h2>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full justify-center items-center">
            
            {/* ТЕЛЕФОН */}
            <a 
              href="tel:+79022527634" 
              className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-70"
            >
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[4px]">Телефон</span>
              <span className="text-xl md:text-2xl font-bold font-mono tracking-wide">+7 902 252 76 34</span>
            </a>

            {/* ТЕЛЕГРАМ */}
            <a 
              href="https://t.me/evs_clo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-70"
            >
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[4px]">Telegram</span>
              <span className="text-xl md:text-2xl font-bold uppercase tracking-wide">@evs_clo</span>
            </a>

            {/* ИНСТАГРАМ */}
            <a 
              href="https://instagram.com/evseev_design" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-70"
            >
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[4px]">Instagram</span>
              <span className="text-xl md:text-2xl font-bold uppercase tracking-wide">@evseev_design</span>
            </a>

          </div>
        </div>
      </section>
    </main>
  );
}