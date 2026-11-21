"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Module = {
  id: string;
  level: string;
  title: string;
  price: string;
  bgImage: string;
  description: string;
  extras: string[];
};

const modules: Module[] = [
  {
    id: "module-1",
    level: "БАЗОВЫЙ УРОВЕНЬ",
    title: "СУМКА / РЮКЗАК",
    price: "5 500 ₽",
    bgImage: "/education-1.jpg",
    description: "Идеально для старта — быстро, понятно, сразу виден результат.",
    extras: ["Свой уникальный фасон: +1 000 ₽"],
  },
  {
    id: "module-2",
    level: "СРЕДНИЙ УРОВЕНЬ",
    title: "БРЮКИ / ХУДИ / ШОРТЫ",
    price: "8 000 ₽",
    bgImage: "/education-2.jpg",
    description: "На выбор несколько вариантов из лёгких материалов.",
    extras: ["Индивидуальный дизайн: +1 000 ₽"],
  },
  {
    id: "module-3",
    level: "КОНСТРУИРОВАНИЕ",
    title: "БАЗОВОЕ КОНСТРУИРОВАНИЕ",
    price: "9 000 ₽",
    bgImage: "/education-3.jpg",
    description: "Учимся переводить идеи в лекала. Бумага или CLO3D.",
    extras: [],
  },
  {
    id: "module-4",
    level: "ВИЗУАЛ",
    title: "ВИЗУАЛ И КОНТЕНТ",
    price: "8 000 ₽",
    bgImage: "/education-4.jpg",
    description: "Фото/видео съемка, обработка и монтаж для соцсетей.",
    extras: [],
  },
];

export default function EducationPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [formData, setFormData] = useState({ name: "", tg: "", phone: "" });
  const [isSending, setIsSending] = useState(false);

  const closeModal = () => {
    setSelectedModule(null);
    setFormData({ name: "", tg: "", phone: "" });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedModule) return;

    setIsSending(true);

    try {
      // Токен бота живёт только на сервере (app/api/lead)
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          tg: formData.tg,
          phone: formData.phone,
          module: selectedModule.title,
          price: selectedModule.price,
        }),
      });

      if (response.ok) {
        alert("Заявка успешно отправлена! Я свяжусь с тобой.");
        closeModal();
      } else {
        alert("Ошибка отправки. Попробуй написать нам в Telegram-канал: https://t.me/evseevdizain");
      }
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      alert("Ошибка отправки. Попробуй написать нам в Telegram-канал: https://t.me/evseevdizain");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main>
      {/* ГЕРОЙ */}
      <section className="bg-ink text-paper">
        <div className="wrap grid gap-8 py-8 md:grid-cols-2 md:items-end md:gap-14 md:py-12">
          <div className="pb-2 md:pb-8">
            <p className="eyebrow text-paper">Evseev Academy / Kaliningrad</p>
            <h1 className="display mt-5 text-[clamp(2.8rem,8vw,7rem)]">
              АКАДЕМИЯ
              <br />
              EVSEEV
            </h1>
            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-paper/60">
              Модульное обучение шитью. От первой сумки до конструирования и
              съёмки собственной капсулы. Практика на реальном оборудовании, с
              обратной связью на каждом этапе.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-paper/15 pt-5 text-[9px] uppercase tracking-[0.16em] text-paper/50">
              <span>Калининград</span>
              <span>4 модуля</span>
              <span>Индивидуально / мини-группы</span>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2 md:aspect-[4/5]">
            <Image
              src="/education-2.jpg"
              alt="Обучение шитью в академии EVSEEV"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute top-3 left-3 bg-paper px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-ink">
              Practice first
            </span>
          </div>
        </div>
      </section>

      {/* МОДУЛИ */}
      <section className="wrap pt-10 md:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="eyebrow text-muted">Program / 2026</p>
            <h2 className="display-sm mt-3 text-[clamp(1.9rem,4.4vw,3.4rem)]">МОДУЛИ</h2>
          </div>
          <p className="max-w-xs text-[10px] uppercase leading-relaxed tracking-[0.14em] text-muted">
            Каждый модуль — отдельный навык. Можно брать по одному или пройти всё подряд
          </p>
        </div>

        <div className="space-y-12 py-12">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className="group relative w-full min-h-[500px] overflow-hidden border border-line bg-paper md:min-h-[600px]"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={module.bgImage}
                  alt={module.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 flex min-h-[500px] flex-col items-start justify-between gap-8 p-6 md:min-h-[600px] md:p-12">
                <div className="relative w-full max-w-2xl">
                  <div className="absolute -inset-3 bg-paper/85 backdrop-blur-[2px]" aria-hidden />
                  <div className="relative p-1">
                    <div className="mb-6 flex flex-wrap items-center gap-3 md:gap-4">
                      <span className="border border-ink bg-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-paper">
                        Модуль {index + 1}
                      </span>
                      <span className="bg-paper/90 px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-ink md:text-xs">
                        {module.level}
                      </span>
                    </div>

                    <h3 className="display mb-4 text-3xl leading-[0.9] tracking-tighter md:mb-6 md:text-6xl">
                      {module.title.replace("КОНСТРУИРОВАНИЕ", "КОНСТРУИ\u00ADРОВАНИЕ")}
                    </h3>
                    <p className="mb-6 max-w-xl text-base font-medium leading-tight text-ink md:text-xl">
                      {module.description}
                    </p>

                    {module.extras.length > 0 && (
                      <div className="inline-block space-y-2 border-t-2 border-ink bg-paper/80 p-4 backdrop-blur-sm">
                        {module.extras.map((extra, i) => (
                          <p key={i} className="flex items-start gap-2 text-sm font-mono font-bold text-ink">
                            <span className="text-xl leading-none">+</span> {extra}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-6">
                  <div className="border border-ink bg-paper/90 p-3 backdrop-blur-sm md:p-4">
                    <p className="eyebrow mb-1 text-muted">Стоимость</p>
                    <p className="text-3xl font-bold tabular-nums md:text-4xl">{module.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedModule(module)}
                    className="transform bg-ink px-8 py-4 text-sm font-bold uppercase tracking-widest text-paper shadow-xl transition-all duration-200 hover:scale-105 hover:bg-paper hover:text-ink md:px-10"
                  >
                    Записаться →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* БОНУС */}
      <section className="mt-12 bg-ink text-paper md:mt-16">
        <div className="wrap grid gap-6 py-8 md:grid-cols-[1fr_auto] md:items-center md:py-10">
          <div className="flex items-start gap-5">
            <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper text-[13px]">
              ★
            </span>
            <div>
              <p className="eyebrow text-paper/60">Бонус для лучших</p>
              <h2 className="display-sm mt-2 text-[clamp(1.5rem,3.4vw,2.4rem)]">
                ШАНС ВОЙТИ В КОМАНДУ EVSEEV
              </h2>
              <p className="mt-2 max-w-lg text-[12px] leading-relaxed text-paper/70">
                Показывай прогресс и горящие глаза. Лучшие ученики получают
                возможность работать над реальными вещами бренда.
              </p>
            </div>
          </div>

          <a
            href="https://t.me/evseevdizain"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-4 border border-paper px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-paper hover:text-ink"
          >
            Telegram-канал
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <div className="wrap mt-6">
        <Link
          href="/contacts"
          className="group inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
            ←
          </span>
          Контакты и адрес студии
        </Link>
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      {selectedModule && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Запись на курс"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-md bg-paper p-6 text-ink shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow text-muted">Запись / {selectedModule.price}</p>
                <h2 className="display-sm mt-3 text-[26px]">ЗАЯВКА НА КУРС</h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted">
                  {selectedModule.title}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Закрыть"
                className="grid h-9 w-9 shrink-0 place-items-center border border-line text-[15px] transition-colors hover:border-ink"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="lead-name" className="eyebrow text-muted">
                  Имя и фамилия
                </label>
                <input
                  id="lead-name"
                  required
                  type="text"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className="field mt-1"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="lead-tg" className="eyebrow text-muted">
                  Telegram
                </label>
                <input
                  id="lead-tg"
                  required
                  type="text"
                  placeholder="@username"
                  value={formData.tg}
                  onChange={(event) => setFormData({ ...formData, tg: event.target.value })}
                  className="field mt-1"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="eyebrow text-muted">
                  Телефон
                </label>
                <input
                  id="lead-phone"
                  required
                  type="tel"
                  placeholder="+7 (999) 000-00-00"
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  className="field mt-1"
                  autoComplete="tel"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`mt-2 flex w-full items-center justify-between gap-4 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                  isSending
                    ? "cursor-not-allowed bg-ink/10 text-ink/40"
                    : "bg-ink text-paper hover:bg-paper hover:text-ink"
                }`}
              >
                {isSending ? "Отправляем..." : "Отправить заявку"}
                {!isSending && <span aria-hidden>→</span>}
              </button>

              <p className="text-[9px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                Я свяжусь с тобой в Telegram, чтобы согласовать даты и оплату.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
