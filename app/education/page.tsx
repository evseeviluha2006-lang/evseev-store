"use client";

import { useState } from "react";
import Header from "@/_components/Header";
import { sendToTelegram } from "@/lib/telegram"; // Убедись, что импорт правильный

const modules = [
  {
    id: "module-1", level: "БАЗОВЫЙ УРОВЕНЬ", title: "СУМКА / РЮКЗАК", price: "5 500 ₽",
    bgImage: "/education-1.jpg",
    description: "Идеально для старта — быстро, понятно, сразу виден результат.",
    extras: ["Свой уникальный фасон: +1 000 ₽"]
  },
  {
    id: "module-2", level: "СРЕДНИЙ УРОВЕНЬ", title: "БРЮКИ / ХУДИ / ШОРТЫ", price: "8 000 ₽",
    bgImage: "/education-2.jpg",
    description: "На выбор несколько вариантов из лёгких материалов.",
    extras: ["Индивидуальный дизайн: +1 000 ₽"]
  },
  {
    id: "module-3", level: "КОНСТРУИРОВАНИЕ", title: "БАЗОВОЕ КОНСТРУИРОВАНИЕ", price: "9 000 ₽",
    bgImage: "/education-3.jpg",
    description: "Учимся переводить идеи в лекала. Бумага или CLO3D.",
    extras: []
  },
  {
    id: "module-4", level: "ВИЗУАЛ", title: "ВИЗУАЛ И КОНТЕНТ", price: "8 000 ₽",
    bgImage: "/education-4.jpg",
    description: "Фото/видео съемка, обработка и монтаж для соцсетей.",
    extras: []
  }
];

export default function EducationPage() {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", tg: "", phone: "" });
  const [isSending, setIsSending] = useState(false);

  const closeModal = () => { 
    setSelectedModule(null); 
    setFormData({ name: "", tg: "", phone: "" }); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModule) return;

    setIsSending(true);

    // Формируем сообщение
    const message = `
🔥 <b>НОВАЯ ЗАПИСЬ НА КУРС!</b>

📚 <b>Модуль:</b> ${selectedModule.title}
💰 <b>Цена:</b> ${selectedModule.price}

 <b>Имя:</b> ${formData.name}
✈️ <b>TG:</b> ${formData.tg}
📞 <b>Тел:</b> ${formData.phone}
    `.trim();

    console.log("Отправляем в Telegram:", message); // Для отладки

    const success = await sendToTelegram(message);

    if (success) {
      alert("Заявка успешно отправлена! Я свяжусь с тобой.");
      closeModal();
    } else {
      alert("Ошибка отправки. Попробуй написать мне напрямую в Telegram.");
    }
    
    setIsSending(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative">
      <Header />
      
      <div className="pt-32 pb-12 px-6 max-w-6xl mx-auto w-full border-b border-white/10">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[4px] mb-2">EVSEEV ACADEMY</p>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">МОДУЛЬНОЕ ОБУЧЕНИЕ ШИТЬЮ</h1>
      </div>

      <div className="flex-grow px-6 py-12 max-w-6xl mx-auto w-full space-y-12">
        {modules.map((mod, index) => (
          <div key={mod.id} className="group relative w-full h-[500px] md:h-[600px] overflow-hidden border border-white/20 bg-white">
            <div className="absolute inset-0 z-0">
              <img src={mod.bgImage} alt={mod.title} className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between items-start">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest border border-white">Модуль {index + 1}</span>
                  <span className="text-xs font-mono text-black font-bold uppercase tracking-widest bg-white/90 px-2 py-1">{mod.level}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-black leading-[0.9] drop-shadow-sm">{mod.title}</h2>
                <p className="text-black text-lg md:text-xl font-bold leading-tight mb-6 max-w-xl drop-shadow-sm">{mod.description}</p>
                {mod.extras.length > 0 && (
                  <div className="space-y-2 border-t-2 border-black pt-4 inline-block bg-white/80 p-4 backdrop-blur-sm">
                    {mod.extras.map((extra, i) => (
                      <p key={i} className="text-sm font-mono text-black font-bold flex items-start gap-2"><span className="text-xl leading-none">+</span> {extra}</p>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mt-auto">
                <div className="bg-white/90 p-4 backdrop-blur-sm border border-black">
                  <p className="text-[10px] text-black uppercase tracking-widest mb-1 font-bold">Стоимость</p>
                  <p className="text-4xl font-black font-numbers text-black">{mod.price}</p>
                </div>
                <button onClick={() => setSelectedModule(mod)} className="px-10 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-xl hover:scale-105 transform duration-200">Записаться →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* БОНУС */}
      <div className="px-6 py-12 border-t border-white/10 bg-zinc-900/30 mb-20">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xl"></div>
            <div><h3 className="text-lg font-black uppercase tracking-tight">БОНУС ДЛЯ ЛУЧШИХ</h3><p className="text-xs text-zinc-400">Показывай прогресс и горящие глаза</p></div>
          </div>
          <p className="text-sm text-zinc-300 font-bold">Шанс вступить в команду <span className="text-white underline">EVSEEV</span>!</p>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО С ФОРМОЙ */}
      {selectedModule && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white border-2 border-black w-full max-w-md p-8 relative shadow-2xl text-black">
            <button onClick={closeModal} className="absolute top-4 right-4 text-black hover:text-red-600 font-bold text-xl">×</button>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Запись на курс</h3>
            <p className="text-sm font-mono text-zinc-600 mb-6 font-bold">{selectedModule.title} // {selectedModule.price}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                required type="text" placeholder="Имя и Фамилия" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                className="w-full bg-zinc-100 border border-black p-4 text-black font-bold focus:bg-white outline-none" 
              />
              <input 
                required type="text" placeholder="@telegram" 
                value={formData.tg} onChange={e => setFormData({...formData, tg: e.target.value})} 
                className="w-full bg-zinc-100 border border-black p-4 text-black font-bold focus:bg-white outline-none" 
              />
              <input 
                required type="tel" placeholder="+7 (999) 000-00-00" 
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} 
                className="w-full bg-zinc-100 border border-black p-4 text-black font-bold focus:bg-white outline-none" 
              />
              
              <button 
                type="submit" disabled={isSending} 
                className="w-full py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ ЗАЯВКУ"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}