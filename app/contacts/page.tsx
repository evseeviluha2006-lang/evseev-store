import Link from "next/link";
import Header from "@/_components/Header";

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f0] text-black flex flex-col font-mono selection:bg-black selection:text-white">
      <Header />
      
      <div className="flex-grow pt-32 pb-20 px-6 max-w-5xl mx-auto w-full relative">
        
        {/* ДЕКОРАТИВНЫЕ ЭЛЕМЕНТЫ */}
        <div className="absolute top-24 right-6 border-2 border-black/20 p-2 rotate-12 pointer-events-none hidden md:block">
          <span className="text-xs font-bold uppercase tracking-widest text-black/30">CONFIDENTIAL</span>
        </div>

        {/* ЗАГОЛОВОК */}
        <div className="mb-16 relative">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mix-blend-multiply opacity-90">
            КОНТАКТЫ
          </h1>
          <div className="absolute -bottom-4 left-0 w-full h-1 bg-black/10 skew-x-12"></div>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-black/60 max-w-md leading-relaxed">
            Официальные каналы связи с брендом EVSEEV. 
            Для оптовых запросов и коллабораций используйте прямые контакты ниже.
          </p>
        </div>

        {/* СЕТКА КОНТАКТОВ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10 mb-16">
          
          {/* БЛОК 1: АДРЕС */}
          <div className="md:col-span-4 space-y-6 transform md:-rotate-1">
            <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2 inline-block">
              ЛОКАЦИЯ
            </h2>
            <div className="space-y-2 text-sm md:text-base leading-relaxed opacity-80">
              <p>Россия, 236010</p>
              <p>Калининградская обл.,</p>
              <p>г. Калининград,</p>
              <p className="font-bold">ул. Каштановая аллея, 1А</p>
            </div>
            <div className="pt-4">
               <span className="text-[10px] uppercase tracking-widest border border-black/30 px-2 py-1 inline-block rotate-2">
                 HQ // BASE
               </span>
            </div>
          </div>

          {/* БЛОК 2: СОЦСЕТИ (БЫЛО КАНАЛЫ) */}
          <div className="md:col-span-4 space-y-8 transform md:translate-y-4 md:rotate-1">
            <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2 inline-block ml-4">
              СОЦСЕТИ
            </h2>
            
            <div className="space-y-6 pl-4 border-l-2 border-black/20">
              {/* ТЕЛЕФОН */}
              <div className="group">
                <span className="text-[10px] uppercase text-black/50 block mb-1">Direct Line</span>
                <a href="tel:+79022527634" className="text-lg md:text-xl font-bold hover:underline decoration-wavy underline-offset-4">
                  +7 902 252 76 34
                </a>
              </div>

              {/* TELEGRAM */}
              <div className="group">
                <span className="text-[10px] uppercase text-black/50 block mb-1">Telegram</span>
                <a 
                  href="https://t.me/evs_clo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg md:text-xl font-bold hover:translate-x-1 transition-transform"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.21-1.12-.33-1.08-.7.02-.19.27-.39.75-.6 2.95-1.29 4.92-2.14 5.9-2.55 2.81-1.18 3.39-1.38 3.77-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                  </svg>
                  @evs_clo
                </a>
              </div>

              {/* INSTAGRAM */}
              <div className="group">
                <span className="text-[10px] uppercase text-black/50 block mb-1">Instagram</span>
                <a 
                  href="https://www.instagram.com/evseev_design?igsh=ZXc4bjF1OHQ1ZHA4&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg md:text-xl font-bold hover:translate-x-1 transition-transform"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  @evseev_design
                </a>
              </div>
            </div>
          </div>

          {/* БЛОК 3: РЕЖИМ */}
          <div className="md:col-span-4 space-y-6 transform md:rotate-2 md:-translate-y-2">
             <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2 inline-block float-right">
              РЕЖИМ
            </h2>
            <div className="clear-both pt-4 space-y-4 text-right opacity-70">
              <div className="flex justify-between items-center border-b border-dashed border-black/30 pb-2">
                <span className="text-xs uppercase">ПН-ВС</span>
                <span className="font-bold">10:00 — 22:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-dashed border-black/30 pb-2">
                <span className="text-xs uppercase">ONLINE</span>
                <span className="font-bold">24/7</span>
              </div>
            </div>
            
            <div className="mt-12 p-4 border border-black bg-black/5 rotate-1">
              <p className="text-xs uppercase leading-tight">
                * Ответ в Telegram и Instagram обычно занимает до 2 часов в рабочее время.
              </p>
            </div>
          </div>
        </div>

                               {/* БЛОК С КАРТОЙ */}
        <div className="w-full h-[400px] border-2 border-black relative overflow-hidden grayscale contrast-125 mt-16">
           {/* Используем iframe Яндекс.Карт с твоими точными координатами */}
           <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=20.467126%2C54.710558&z=17&pt=20.467126,54.710558,pm2rdm" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen={true}
              style={{ filter: 'invert(90%) hue-rotate(180deg)' }} // Инверсия цветов для стиля "документа"
           ></iframe>
           
           {/* Поверх карты лейбл */}
           <div className="absolute top-4 left-4 bg-[#f4f4f0] border border-black px-3 py-1 text-xs font-bold uppercase shadow-sm z-10">
             LOCATION MAP // KASHTANOVAYA 1A
           </div>
        </div>

        {/* ФУТЕР ДОКУМЕНТА */}
        <div className="mt-12 pt-8 border-t-2 border-black flex justify-between items-end text-[10px] uppercase tracking-widest opacity-50">
          <span>EVSEEV ARCHIVE © 2026</span>
          <span>KALININGRAD REGION</span>
        </div>

      </div>
    </main>
  );
}