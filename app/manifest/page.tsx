import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Манифест",
  description: "Манифест бренда EVSEEV: одежда — это язык, ошибки — часть ДНК.",
};

const lines = [
  ["ОДЕЖДА — ЭТО НЕ ТКАНЬ.", "ЭТО ЯЗЫК."],
  ["МЫ НЕ СЛЕДУЕМ ТРЕНДАМ.", "МЫ СОЗДАЕМ КОНТЕКСТ."],
  ["ОШИБКИ — ЭТО ЧАСТЬ ДНК.", "ИДЕАЛЬНОСТЬ — ЭТО СКУКА.",],
  ["EVSEEV — ЭТО ДЛЯ ТЕХ,", "КТО НЕ БОИТСЯ БЫТЬ СОБОЙ."],
];

export default function ManifestoPage() {
  return (
    <main>
      <section className="wrap pt-10 pb-8 md:pt-16 md:pb-10">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)] md:items-end">
          <div>
            <p className="eyebrow text-muted">Manifesto / Est. 2024</p>
            <h1 className="display mt-4 text-[clamp(3rem,9vw,8rem)]">МАНИФЕСТ</h1>
          </div>
          <p className="max-w-xs text-[12px] leading-relaxed text-muted md:pb-3">
            Четыре утверждения, из которых собрана каждая вещь бренда.
            Калининград, без компромиссов.
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        {lines.map((line, index) => (
          <div
            key={line[0]}
            className="group grid grid-cols-[36px_minmax(0,1fr)] gap-4 border-b border-line py-8 md:grid-cols-[60px_minmax(0,1fr)] md:gap-10 md:py-12"
          >
            <span className="pt-2 text-[10px] tabular-nums tracking-[0.18em] text-muted">
              0{index + 1}
            </span>
            <h2 className="display text-[clamp(1.7rem,5.2vw,4.8rem)]">
              {line[0]}
              <br />
              <span className="text-muted transition-colors duration-500 group-hover:text-ink">
                {line[1]}
              </span>
            </h2>
          </div>
        ))}
      </section>

      <section className="wrap mt-10 flex flex-wrap items-center justify-between gap-5 pb-2">
        <p className="text-[9px] uppercase tracking-[0.18em] text-muted">
          EST. 2024 / KALININGRAD / RUSSIA
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="bg-ink px-6 py-3.5 text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Смотреть вещи
          </Link>
        </div>
      </section>
    </main>
  );
}
