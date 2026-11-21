import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Связаться с EVSEEV: Telegram, Instagram, телефон и адрес студии в Калининграде.",
};

const socials = [
  {
    label: "Telegram",
    value: "@evs_clo",
    href: "https://t.me/evs_clo",
    note: "Быстрее всего — здесь",
  },
  {
    label: "Instagram",
    value: "@evseev_design",
    href: "https://www.instagram.com/evseev_design",
    note: "Процесс, архив, новые вещи",
  },
  {
    label: "Телефон",
    value: "+7 902 252 76 34",
    href: "tel:+79022527634",
    note: "Пн–Вс / 10:00–22:00",
  },
];

export default function ContactsPage() {
  return (
    <main>
      <section className="wrap pt-10 pb-8 md:pt-16 md:pb-12">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] md:items-end">
          <div>
            <p className="eyebrow text-muted">Contacts / Kaliningrad</p>
            <h1 className="display mt-4 text-[clamp(3rem,9vw,8rem)]">КОНТАКТЫ</h1>
          </div>
          <p className="max-w-sm text-[12px] leading-relaxed text-muted md:pb-3">
            Официальные каналы связи с брендом. По оптовым запросам,
            коллаборациям и индивидуальным заказам — напрямую.
          </p>
        </div>
      </section>

      <section className="wrap grid gap-10 border-t border-line py-8 md:grid-cols-3 md:gap-8 md:py-10">
        <div>
          <p className="eyebrow text-muted">Студия / HQ</p>
          <address className="mt-4 not-italic">
            <p className="display-sm text-[clamp(1.5rem,3vw,2.2rem)]">
              КАЛИНИНГРАД
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              ул. Каштановая аллея, 1А
              <br />
              236010, Россия
            </p>
          </address>
          <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-muted">
            Самовывоз — по предварительной договорённости
          </p>
        </div>

        <div>
          <p className="eyebrow text-muted">Связь</p>
          <ul className="mt-4 border-t border-line">
            {socials.map((social) => (
              <li key={social.label} className="border-b border-line">
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 py-3.5"
                >
                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.16em] text-muted">
                      {social.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] uppercase tracking-[0.04em] transition-colors group-hover:text-muted">
                      {social.value}
                    </span>
                  </span>
                  <span className="text-[12px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-muted">Режим</p>
          <dl className="mt-4 border-t border-line">
            <div className="flex items-center justify-between border-b border-line py-3.5">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Пн–Вс</dt>
              <dd className="text-[13px] tabular-nums">10:00 — 22:00</dd>
            </div>
            <div className="flex items-center justify-between border-b border-line py-3.5">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Онлайн</dt>
              <dd className="text-[13px] tabular-nums">24 / 7</dd>
            </div>
            <div className="flex items-center justify-between border-b border-line py-3.5">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">Ответ</dt>
              <dd className="text-[13px]">до 2 часов</dd>
            </div>
          </dl>

          <div className="mt-5 border border-ink bg-paper p-4 text-ink">
            <p className="text-[9px] uppercase leading-relaxed tracking-[0.13em]">
              * В Telegram и Instagram обычно отвечаю быстрее, чем по телефону.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap pb-4">
        <div className="relative h-[300px] w-full overflow-hidden border border-line bg-paper-2 md:h-[420px]">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=20.467126%2C54.710558&z=17&pt=20.467126,54.710558,pm2rdm"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Студия EVSEEV на карте"
            className="grayscale-[0.9] contrast-[1.05]"
          />

          <div className="pointer-events-none absolute top-3 left-3 bg-paper px-3 py-2 text-[9px] uppercase tracking-[0.16em]">
            Location map / Kashtanovaya 1A
          </div>
        </div>
      </section>

      <div className="wrap mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 pb-2 text-[9px] uppercase tracking-[0.16em] text-muted">
        <span>EVSEEV ARCHIVE © 2026</span>
        <span>Калининградская область</span>
        <Link href="/offer" className="hover:text-ink">
          Оферта
        </Link>
      </div>
    </main>
  );
}
