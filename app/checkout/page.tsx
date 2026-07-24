"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";
import { sendToTelegram } from "@/lib/telegram"; // Импортируем функцию отправки

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Поля формы
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("evseev-cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        console.error("Ошибка чтения корзины", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/\D/g, "")) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !address) {
      alert("Заполни все обязательные поля!");
      return;
    }

    setIsSending(true);

    // Формируем список товаров для сообщения
    let itemsList = "";
    cartItems.forEach(item => {
      itemsList += `• ${item.name} (${item.quantity} шт.) - ${item.price}\n`;
    });

    // Формируем красивое сообщение для Телеги
    const message = `
🛍️ <b>НОВЫЙ ЗАКАЗ В МАГАЗИНЕ!</b>

📦 <b>Товары:</b>
${itemsList}
💰 <b>Итого:</b> ${totalPrice.toLocaleString()} ₽

👤 <b>Клиент:</b> ${name}
📞 <b>Телефон:</b> ${phone}
🏠 <b>Адрес:</b> ${address}
💬 <b>Комментарий:</b> ${comment || "Нет"}
    `.trim();

    const success = await sendToTelegram(message);

    if (success) {
      // Очищаем корзину и перенаправляем
      localStorage.removeItem("evseev-cart");
      alert("Заказ успешно отправлен! Я свяжусь с тобой для подтверждения.");
      window.location.href = "/";
    } else {
      alert("Ошибка отправки заказа. Пожалуйста, напиши мне напрямую в Telegram.");
    }
    
    setIsSending(false);
  };

  if (!isLoaded) return null;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center border border-white/10 p-12 bg-zinc-900/30">
            <p className="text-zinc-500 uppercase tracking-widest mb-6">Корзина пуста</p>
            <Link href="/catalog" className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-32 pb-10 px-6 max-w-3xl mx-auto w-full">
        <h1 className="text-lg font-bold tracking-[8px] uppercase mb-12 text-center md:text-left">
          ОФОРМЛЕНИЕ ЗАКАЗА
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* СПИСОК ТОВАРОВ */}
          <div className="border border-white/10 bg-zinc-900/30 p-6">
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">Твой заказ ({cartItems.length} поз.)</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-zinc-800 flex-shrink-0 overflow-hidden border border-white/5">
                    {item.image && item.image.length > 0 ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-600 uppercase">Нет фото</div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold uppercase tracking-wider">{item.name}</p>
                    <p className="text-xs font-mono text-zinc-400 font-numbers">{item.quantity} шт. × {item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-sm uppercase tracking-widest text-zinc-400">Итого:</span>
              <span className="text-xl font-black font-mono font-numbers">{totalPrice.toLocaleString()} ₽</span>
            </div>
          </div>

          {/* ФОРМА КОНТАКТОВ */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Имя и фамилия *</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Влад Дробышев"
                required
                className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Телефон *</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                required
                className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Адрес доставки / ПВЗ *</label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Город, улица, дом, квартира или номер ПВЗ СДЭК/Почты"
                required
                rows={3}
                className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Комментарий (необязательно)</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Размер, пожелания по упаковке..."
                rows={2}
                className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>
          </div>

          {/* КНОПКИ */}
          <div className="pt-6 space-y-4">
            <button 
              type="submit"
              disabled={isSending}
              className="w-full py-5 bg-white text-black text-sm font-black uppercase tracking-[4px] hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? "ОТПРАВЛЯЕМ ЗАКАЗ..." : "ПОДТВЕРДИТЬ ЗАКАЗ →"}
              <p className="text-[10px] text-zinc-600 mt-4 text-center">
  Нажимая кнопку, вы соглашаетесь с{' '}
  <Link href="/offer" className="underline hover:text-zinc-400 transition-colors">
    Публичной офертой
  </Link>
</p>
            </button>
            
            <Link 
              href="/cart"
              className="block w-full py-4 border border-white/20 text-center text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
              ← Вернуться в корзину
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
  <p className="text-[10px] text-zinc-600 mt-4 text-center">
  Нажимая кнопку, вы соглашаетесь с <Link href="/offer" className="underline hover:text-zinc-400">Публичной офертой</Link>
</p>
}