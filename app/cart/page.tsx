"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/_components/Header";

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // ИСПРАВЛЕНО: используем evseev-cart (с дефисом)
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

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("evseev-cart", JSON.stringify(items));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    saveCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/\D/g, "")) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-32 pb-10 px-6 max-w-4xl mx-auto w-full min-h-[50vh]">
        <h1 className="text-lg font-bold tracking-[8px] uppercase mb-12 text-center md:text-left">
          КОРЗИНА ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 border border-white/10 bg-zinc-900/30">
            <p className="text-zinc-500 uppercase tracking-widest mb-6 text-sm">Корзина пуста</p>
            <Link 
              href="/catalog" 
              className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="group flex gap-6 p-4 border border-white/10 bg-zinc-900/30 hover:border-white/20 transition-colors">
                
                <div className="relative w-24 h-32 bg-zinc-900 flex-shrink-0 overflow-hidden border border-white/5">
                  {item.image && item.image.length > 0 ? (
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-[10px] uppercase">
                      Нет фото
                    </div>
                  )}
                </div>

                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-1">{item.name}</h3>
                    {/* ДОБАВЛЕН КЛАСС font-numbers ДЛЯ ЦЕНЫ */}
                    <p className="text-xs font-mono text-zinc-400 font-numbers">{item.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-white/20">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 text-xs hover:bg-white/10 transition-colors"
                      >
                        -
                      </button>
                      {/* ДОБАВЛЕН КЛАСС font-numbers ДЛЯ КОЛИЧЕСТВА */}
                      <span className="px-3 py-1 text-xs font-mono border-x border-white/20 min-w-[40px] text-center font-numbers">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-1 text-xs hover:bg-white/10 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] text-zinc-500 uppercase tracking-widest hover:text-red-500 transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-white/10 mt-8">
              <div className="flex justify-between items-end mb-8">
                <span className="text-sm uppercase tracking-widest text-zinc-400">Итого:</span>
                {/* ДОБАВЛЕН КЛАСС font-numbers ДЛЯ ИТОГОВОЙ СУММЫ */}
                <span className="text-2xl font-black font-mono font-numbers">{totalPrice.toLocaleString()} ₽</span>
              </div>
              
              <div className="flex gap-4">
                <Link href="/checkout" className="flex-grow py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors text-center">
                  ОФОРМИТЬ ЗАКАЗ
                </Link>
                <button 
                  onClick={clearCart}
                  className="px-6 py-4 border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
                >
                  ОЧИСТИТЬ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}