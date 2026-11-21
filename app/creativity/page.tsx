"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CreativityPage() {
  const [clicked, setClicked] = useState(false);

  return (
    <main>
      <section className="wrap grid gap-6 pt-8 pb-4 md:grid-cols-2 md:gap-12 md:pt-12">
        <div className="flex flex-col justify-center md:py-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow text-muted">Studio / Coming soon</p>
            <span className="border border-ink bg-paper px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-ink">
              В разработке
            </span>
          </div>

          <h1 className="display mt-5 text-[clamp(2.8rem,7.5vw,6.5rem)]">
            ТВОРЧЕСТВО
            <br />
            И КАРТИНЫ
          </h1>

          <p className="mt-5 max-w-md text-[13px] leading-relaxed text-muted">
            Этот раздел в активной разработке. Здесь появятся записи из книжки,
            эскизы, эксперименты с формой и архивные работы, которые не вошли в
            коллекции.
          </p>

          <div className="mt-8 border-t border-line pt-6">
            <p className="eyebrow text-muted">Ваше влияние на процесс</p>

            <button
              type="button"
              onClick={() => setClicked(true)}
              disabled={clicked}
              className={`mt-4 flex w-fit items-center gap-4 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                clicked
                  ? "cursor-default bg-paper text-ink"
                  : "bg-ink text-paper hover:bg-paper hover:text-ink"
              }`}
            >
              {clicked ? "Активность показана ✓" : "Показать активность"}
              {!clicked && <span aria-hidden>→</span>}
            </button>

            <p
              className={`mt-3 text-[10px] uppercase tracking-[0.12em] text-muted transition-opacity ${
                clicked ? "opacity-100" : "opacity-0"
              }`}
            >
              Илья Евсеев получил сигнал. Раздел будет готов как можно скорее.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2 md:aspect-auto md:min-h-[560px]">
          <Image
            src="/education-3.jpg"
            alt="Рабочий процесс в студии EVSEEV"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 bg-paper px-3 py-1.5 text-[9px] uppercase tracking-[0.16em]">
            Sketchbook / 2026
          </span>
        </div>
      </section>

      <section className="wrap mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="text-[9px] uppercase tracking-[0.16em] text-muted">
          Пока здесь пусто — но недолго
        </p>
        <Link
          href="/catalog"
          className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.18em]"
        >
          Вернуться к товарам
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </section>
    </main>
  );
}
