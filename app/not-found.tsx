import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[66vh] flex-col justify-center py-16">
      <div className="border-t border-ink pt-7">
        <p className="eyebrow text-muted">Error 404</p>

        <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] md:items-end">
          <h1 className="display text-[clamp(4rem,15vw,12rem)] leading-[0.78]">404</h1>
          <div className="md:pb-3">
            <p className="display-sm text-[clamp(1.4rem,3vw,2.2rem)]">
              СТРАНИЦА НЕ НАЙДЕНА
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Возможно, товар продан или ссылка устарела. Актуальные вещи — в
              магазине.
            </p>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/catalog"
            className="flex items-center justify-between gap-6 bg-ink px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-acid hover:text-ink sm:w-56"
          >
            В магазин
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-between gap-6 border border-ink px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper sm:w-56"
          >
            На главную
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
