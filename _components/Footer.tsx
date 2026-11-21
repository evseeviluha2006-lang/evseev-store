import Link from "next/link";
import Marquee from "@/_components/Marquee";

const columns = [
  {
    title: "МАГАЗИН",
    links: [
      { label: "Все товары", href: "/catalog" },
      { label: "Новинки", href: "/catalog?cat=all" },
      { label: "Верх", href: "/catalog?cat=tops" },
      { label: "Низ", href: "/catalog?cat=bottoms" },
      { label: "Аксессуары", href: "/catalog?cat=accessories" },
      { label: "Избранное", href: "/likes" },
    ],
  },
  {
    title: "КОЛЛЕКЦИИ",
    links: [
      { label: "Winter 2.6", href: "/collections/winter-2-6" },
      { label: "Distressed", href: "/collections/distressed" },
      { label: "Влад Дробышев", href: "/collections/vlad-drobyshev" },
      { label: "Все коллекции", href: "/collections" },
    ],
  },
  {
    title: "БРЕНД",
    links: [
      { label: "Манифест", href: "/manifest" },
      { label: "Академия", href: "/education" },
      { label: "Творчество", href: "/creativity" },
    ],
  },
  {
    title: "СВЯЗЬ",
    links: [
      { label: "Контакты", href: "/contacts" },
      { label: "Telegram", href: "https://t.me/evs_clo" },
      { label: "Instagram", href: "https://www.instagram.com/evseev_design" },
      { label: "Оферта", href: "/offer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-paper md:mt-28">
      <Marquee
        items={["EVSEEV", "STREETWEAR FROM KALININGRAD", "EST. 2024", "ARCHIVE 001"]}
        speed="52s"
        className="border-b border-paper/15 py-4"
        itemClassName="display text-[clamp(1.4rem,3.4vw,2.6rem)] opacity-90"
        separator="/"
      />

      <div className="wrap pt-14 pb-8 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.35fr] lg:gap-20">
          <div>
            <p className="eyebrow text-paper/45">ОСТАВАТЬСЯ НА СВЯЗИ</p>
            <h2 className="display mt-5 text-[clamp(2.7rem,6vw,5rem)]">
              БУДЬ
              <br />
              В КУРСЕ
            </h2>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-paper/55">
              Новые дропы, архивные вещи и записи на обучение — первым делом
              в Telegram. Без спама, только по делу.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://t.me/evs_clo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-paper px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper hover:border hover:border-paper"
              >
                Написать в Telegram
                <span aria-hidden>↗</span>
              </a>
              <a
                href="tel:+79022527634"
                className="border border-paper/25 px-6 py-4 text-[10px] uppercase tracking-[0.18em] text-paper/80 transition-colors hover:border-paper hover:text-paper"
              >
                +7 902 252 76 34
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 border-t border-paper/15 pt-6 text-[10px] uppercase tracking-[0.18em] text-paper/40">
              <span>Калининград</span>
              <span>Пн–Вс / 10:00–22:00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="eyebrow mb-5 text-[9px] text-paper/40">{column.title}</p>
                <ul className="space-y-3">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="text-[11px] uppercase tracking-[0.06em] text-paper/70 transition-colors hover:text-paper"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 overflow-hidden md:mt-24">
          <p className="display text-[clamp(4.2rem,18.4vw,19rem)] leading-[0.72] tracking-[-0.06em]">
            EVSEEV
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/15 pt-6 text-[9px] uppercase tracking-[0.2em] text-paper/40 md:flex-row md:items-center md:justify-between">
          <span>© 2026 EVSEEV ARCHIVE</span>
          <span>Калининград, RU</span>
          <div className="flex gap-6">
            <Link href="/offer" className="hover:text-paper">
              Оферта
            </Link>
            <Link href="/manifest" className="hover:text-paper">
              Манифест
            </Link>
          </div>
          <span>Оплата картой / ЮKassa</span>
        </div>
      </div>
    </footer>
  );
}
