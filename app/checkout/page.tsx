"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/_components/Header";
import { useCartLines, writeCart } from "@/lib/cart";
import { computeTotals, formatPrice } from "@/lib/products";
import { useIsClient } from "@/lib/use-is-client";

export default function CheckoutPage() {
  const lines = useCartLines();
  const isClient = useIsClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Поля формы
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const totals = computeTotals(lines);
  const hasMissingSize = totals.items.some(
    (item) => !item.size && item.product.sizes.length > 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert("Пожалуйста, заполни имя, телефон и адрес доставки.");
      return;
    }

    if (hasMissingSize) {
      alert("Вернись в корзину и выбери размер для всех товаров.");
      return;
    }

    if (totals.items.length === 0) {
      alert("Корзина пуста.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Цену на сервере считает /api/create-payment из своего каталога.
      // Клиент отправляет только состав заказа и данные доставки.
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: totals.items.map((item) => ({
            id: item.id,
            size: item.size,
            quantity: item.quantity,
          })),
          customer: { name, phone, address, comment },
        }),
      });

      const data: { url?: string; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (data.url) {
        writeCart([]);
        window.location.assign(data.url);
      } else {
        alert("Ошибка при создании платежа: " + (data.error || "Попробуйте позже"));
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка соединения с платежной системой.");
      setIsSubmitting(false);
    }
  };

  if (!isClient) return null;

  if (totals.items.length === 0) {
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
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
              Твой заказ ({totals.items.length} поз.)
            </h2>
            <div className="space-y-4 mb-6">
              {totals.items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0"
                >
                  <span className="uppercase tracking-wider pr-4">
                    {item.product.name}
                    {item.size ? <span className="text-zinc-500"> / {item.size}</span> : null}
                    <span className="text-zinc-500"> x{item.quantity}</span>
                  </span>
                  <span className="font-mono font-numbers whitespace-nowrap">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {totals.discount > 0 && (
              <div className="flex justify-between items-center pt-4 border-t border-white/10 text-sm">
                <span className="text-green-500 uppercase tracking-widest text-xs">
                  Скидка за комплект −15%
                </span>
                <span className="font-mono text-green-500 font-numbers">
                  −{formatPrice(totals.discount)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-end pt-4 border-t border-white/10">
              <span className="text-sm uppercase tracking-widest text-zinc-400">К оплате:</span>
              <span className="text-xl font-black font-mono font-numbers">{formatPrice(totals.total)}</span>
            </div>
          </div>

          {hasMissingSize && (
            <p className="text-xs text-red-400 border border-red-500/30 bg-red-500/5 p-4">
              У некоторых товаров не выбран размер.{" "}
              <Link href="/cart" className="underline hover:text-red-300">
                Вернуться в корзину
              </Link>
            </p>
          )}

          {/* ФОРМА ДАННЫХ КЛИЕНТА */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Данные для доставки</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="customer-name" className="text-[10px] uppercase tracking-widest text-zinc-500">Имя Фамилия *</label>
                <input
                  id="customer-name"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="customer-phone" className="text-[10px] uppercase tracking-widest text-zinc-500">Телефон *</label>
                <input
                  id="customer-phone"
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
              <label htmlFor="customer-address" className="text-[10px] uppercase tracking-widest text-zinc-500">Адрес доставки / ПВЗ *</label>
              <input
                id="customer-address"
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Город, улица, дом, квартира или номер ПВЗ СДЭК/Почты"
                className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="customer-comment" className="text-[10px] uppercase tracking-widest text-zinc-500">Комментарий (необязательно)</label>
              <textarea
                id="customer-comment"
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
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              {isSubmitting ? "ПЕРЕХОД К ОПЛАТЕ..." : "ПОДТВЕРДИТЬ ЗАКАЗ →"}
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
