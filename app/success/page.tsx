import type { Metadata } from "next";
import Link from "next/link";
import ClearCartOnSuccess from "@/_components/ClearCartOnSuccess";

export const metadata: Metadata = {
  title: "Заказ оплачен",
  description: "Спасибо за заказ в EVSEEV.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="wrap flex min-h-[68vh] items-center justify-center py-16">
      <ClearCartOnSuccess />
      <div className="w-full max-w-xl border-t border-ink pt-7">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow text-muted">Order confirmed</p>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-ink bg-paper text-[14px] text-ink">
            ✓
          </span>
        </div>

        <h1 className="display mt-6 text-[clamp(2.6rem,7vw,5.2rem)]">
          СПАСИБО
          <br />
          ЗА ЗАКАЗ
        </h1>

        <p className="mt-5 max-w-md text-[13px] leading-relaxed text-muted">
          Оплата прошла. Я получил уведомление и свяжусь с тобой для
          подтверждения деталей доставки — обычно в течение пары часов.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/catalog"
            className="flex flex-1 items-center justify-between gap-5 bg-ink px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            В магазин
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/"
            className="flex flex-1 items-center justify-between gap-5 border border-ink px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
          >
            На главную
            <span aria-hidden>↗</span>
          </Link>
        </div>

        <p className="mt-6 border-t border-line pt-4 text-[9px] uppercase leading-relaxed tracking-[0.13em] text-muted">
          Если оплата списалась, а заказ не подтвердился — напиши в Telegram-канал{" "}
          <a
            href="https://t.me/evseevdizain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-4"
          >
            @evseevdizain
          </a>
        </p>
      </div>
    </main>
  );
}
