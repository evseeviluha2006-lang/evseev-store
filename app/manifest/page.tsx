import Header from "@/_components/Header";

export default function ManifestoPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="max-w-4xl w-full space-y-16">
          
          {/* ЗАГОЛОВОК */}
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-center md:text-left">
            МАНИФЕСТ<br/>EVSEEV
          </h1>

          {/* ТЕКСТ (Замени на свои слова) */}
          <div className="space-y-8 text-xl md:text-3xl font-bold uppercase tracking-wide leading-relaxed opacity-90">
            <p>ОДЕЖДА — ЭТО НЕ ТКАНЬ.<br/>ЭТО ЯЗЫК.</p>
            
            <p>МЫ НЕ СЛЕДУЕМ ТРЕНДАМ.<br/>МЫ СОЗДАЕМ КОНТЕКСТ.</p>
            
            <p>ОШИБКИ — ЭТО ЧАСТЬ ДНК.<br/>ИДЕАЛЬНОСТЬ — ЭТО СКУКА.</p>
            
            <p>EVSEEV — ЭТО ДЛЯ ТЕХ,<br/>КТО НЕ БОИТСЯ БЫТЬ СОБОЙ.</p>
          </div>

          {/* ПОДПИСЬ */}
          <div className="pt-12 border-t border-white/20">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[4px]">
              EST. 2024 // KALININGRAD
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}