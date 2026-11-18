import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/_components/Header";

export const metadata: Metadata = {
  title: "Заказ оплачен — EVSEEV",
  description: "Спасибо за заказ в EVSEEV.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-lg border border-white/10 bg-zinc-900/30 p-10 md:p-14">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-green-500 text-green-500 text-2xl mb-8">
            ✓
          </span>

          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            Оплата прошла
          </h1>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            Спасибо за заказ! Я получил уведомление и свяжусь с тобой
            для подтверждения деталей доставки.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/catalog"
              className="flex-1 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              В каталог
            </Link>
            <Link
              href="/"
              className="flex-1 py-4 border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
              На главную
            </Link>
          </div>

          <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest">
            Если оплата списалась, а заказ не подтвердился — напиши в Telegram
          </p>
        </div>
      </div>
    </main>
  );
}
