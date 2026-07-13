"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import { useCart } from "../components/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [sessionId, setSessionId] = useState("EVSEEV-SESSION");
  
  // Генерируем ID только на клиенте, чтобы не ломать гидратацию
  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  // Считаем общую сумму
  const totalPrice = items.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/\D/g, ""));
    return sum + priceNum * item.quantity;
  }, 0);

  // Логика промокода
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "EVSEEV10") {
      setIsPromoApplied(true);
    } else {
      alert("Неверный промокод");
    }
  };

  const finalPrice = isPromoApplied ? Math.round(totalPrice * 0.9) : totalPrice;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="h-20" />

      <div className="flex-grow px-6 py-10 max-w-4xl mx-auto w-full">
        
        {/* Заголовок */}
        <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
          <h1 className="text-3xl font-bold tracking-[6px] uppercase">
            КОРЗИНА <span className="text-zinc-500 text-lg align-middle ml-2">({items.length})</span>
          </h1>
          <Link href="/catalog" className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
            ← Продолжить покупки
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-sm">
            <p className="mb-6 text-zinc-500 font-mono text-sm">ВАША КОРЗИНА ПУСТА</p>
            <Link 
              href="/catalog" 
              className="inline-block bg-white text-black px-8 py-3 text-xs font-bold tracking-[4px] uppercase hover:bg-zinc-200 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <>
            {/* Список товаров */}
            <div className="flex flex-col gap-0 mb-12">
              {items.map((item) => (
                <div key={item.id} className="group flex gap-6 py-8 border-b border-white/5 first:border-t first:border-white/5 hover:bg-white/[0.02] transition-colors">
                  
                  {/* Фото */}
                  <div className="relative w-24 h-32 bg-zinc-900 flex-shrink-0 overflow-hidden border border-white/10">
                    <Image src={item.image} alt={item.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Инфо */}
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold tracking-wider uppercase text-lg">{item.name}</h3>
                      <p className="text-zinc-500 font-mono text-xs mt-1">АРТИКУЛ: EVS-00{item.id} // SIZE: M</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      {/* Управление количеством */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/20 rounded-sm overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-3 py-1 text-xs hover:bg-white/10 disabled:opacity-30 transition-colors"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-xs font-mono min-w-[40px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-xs hover:bg-white/10 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-zinc-600 hover:text-red-500 transition-colors uppercase tracking-widest underline decoration-zinc-700 underline-offset-4"
                        >
                          Удалить
                        </button>
                      </div>
                      <span className="text-xl font-mono">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Промокод и Итог */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              
              {/* Левая часть: Промокод */}
              <div className="w-full md:w-auto flex flex-col gap-3 max-w-xs">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Промокод</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Введите код"
                    className="bg-transparent border border-white/20 px-4 py-2 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-white transition-colors w-full"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
                  >
                    Применить
                  </button>
                </div>
                {isPromoApplied && <p className="text-[10px] text-green-500 font-mono">✓ Скидка 10% активна</p>}
              </div>

              {/* Правая часть: Сумма и кнопка */}
              <div className="w-full md:w-auto flex flex-col gap-4 min-w-[300px]">
                <div className="flex justify-between text-sm font-mono text-zinc-400 uppercase tracking-wider">
                  <span>Подытог</span>
                  <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between text-sm font-mono text-green-500 uppercase tracking-wider">
                    <span>Скидка (10%)</span>
                    <span>-{(totalPrice - finalPrice).toLocaleString("ru-RU")} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-2xl font-bold tracking-wider uppercase border-t border-white/10 pt-4">
                  <span>Итого</span>
                  <span>{finalPrice.toLocaleString("ru-RU")} ₽</span>
                </div>
                
                <button className="bg-white text-black py-5 text-xs font-bold tracking-[4px] uppercase hover:bg-zinc-200 transition-colors w-full mt-2 cursor-pointer group flex items-center justify-center gap-2">
                  <span>Оформить заказ</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Технический подвал */}
      <div className="px-6 py-4 text-[9px] text-white/20 font-mono flex justify-between border-t border-white/5 mt-auto">
        <span>SESSION_ID: {sessionId}</span>
        <span>SECURE SSL ENCRYPTION</span>
      </div>
    </main>
  );
}