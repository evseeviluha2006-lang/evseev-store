"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/_components/Header";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      alert("Пожалуйста, заполни имя, телефон и адрес доставки.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = Date.now().toString();

      // Отправляем запрос на наш сервер для создания платежа в ЮKassa
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          description: `Заказ EVSEEV #${orderId} (${name})`,
          orderId: orderId,
          // Передаем данные клиента в metadata, чтобы они сохранились в чеке ЮKassa
          metadata: {
            customer_name: name,
            customer_phone: phone,
            customer_address: address,
            customer_comment: comment
          }
        }),
      });

      const data = await res.json();

      if (data.url) {
        // Очищаем корзину и редиректим на оплату
        localStorage.removeItem("evseev-cart");
        window.location.href = data.url; 
      } else {
        alert('Ошибка при создании платежа: ' + (data.error || 'Попробуйте позже'));
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка соединения с платежной системой.');
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return null;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center border border-white/10 p-12 bg-zinc-900/30">
            <p className="text-zinc-500 uppercase tracking-widest mb-6">Корзина пуста</p>
            <Link href="/catalog" className="text-white underline text-sm uppercase tracking-widest">Вернуться в каталог</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto w-full">
        <h1 className="text-lg font-bold tracking-[8px] uppercase mb-12 text-center md:text-left">
          ОФОРМЛЕНИЕ ЗАКАЗА
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* СПИСОК ТОВАРОВ */}
          <div className="border border-white/10 bg-zinc-900/30 p-6">
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">Твой заказ ({cartItems.length} поз.)</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                  <span className="uppercase tracking-wider pr-4">{item.name} <span className="text-zinc-500">x{item.quantity}</span></span>
                  <span className="font-mono font-numbers whitespace-nowrap">{(parseInt(item.price.replace(/\D/g, "")) * item.quantity).toLocaleString()} ₽</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-white/10">
              <span className="text-sm uppercase tracking-widest text-zinc-400">К оплате:</span>
              <span className="text-xl font-black font-mono font-numbers">{totalPrice.toLocaleString()} ₽</span>
            </div>
          </div>

          {/* ФОРМА ДАННЫХ КЛИЕНТА */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Данные для доставки</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Имя Фамилия *</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Телефон *</label>
                <input 
                  required
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">Адрес доставки / ПВЗ *</label>
              <input 
                required
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Город, улица, дом, квартира или номер ПВЗ СДЭК/Почты"
                className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">Комментарий (необязательно)</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Размер, пожелания по упаковке..."
                rows={3}
                className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>
          </div>

          {/* КНОПКИ */}
          <div className="pt-4 space-y-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 text-sm font-black uppercase tracking-[4px] transition-colors ${
                isSubmitting 
                  ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              {isSubmitting ? 'ПЕРЕХОД К ОПЛАТЕ...' : `ПОДТВЕРДИТЬ ЗАКАЗ →`}
            </button>
            
            <p className="text-[10px] text-zinc-600 mt-4 text-center leading-relaxed">
              НАЖИМАЯ КНОПКУ, ВЫ СОГЛАШАЕТЕСЬ С <Link href="/offer" className="underline hover:text-zinc-400">ПУБЛИЧНОЙ ОФЕРТОЙ</Link>
            </p>

            <Link 
              href="/cart" 
              className="block w-full py-4 border border-white/20 text-center text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
              ← ВЕРНУТЬСЯ В КОРЗИНУ
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}