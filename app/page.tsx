import Image from "next/image";
import Link from "next/link";
import Marquee from "@/_components/Marquee";
import ProductCard from "@/_components/ProductCard";
import SectionHead from "@/_components/SectionHead";
import { collections } from "@/lib/collections";
import { getProduct, type Product } from "@/lib/products";

const featuredIds = [
  "hoodie-tvar",
  "redholes-pants",
  "krest-jacket",
  "burgenzipper",
];

const featured = featuredIds
  .map((id) => getProduct(id))
  .filter((product): product is Product => Boolean(product));

const categories = [
  {
    label: "ВЕРХ",
    caption: "Футболки, худи, лонгсливы",
    href: "/catalog?cat=tops",
    image: "/tvar-glav.jpg",
  },
  {
    label: "НИЗ",
    caption: "Джинсы и штаны",
    href: "/catalog?cat=bottoms",
    image: "/dipa-glav.jpg",
  },
  {
    label: "ВЕРХНЯЯ ОДЕЖДА",
    caption: "Куртки и накидки",
    href: "/catalog?cat=outerwear",
    image: "/krest-jacket-front.jpg",
  },
  {
    label: "АКСЕССУАРЫ",
    caption: "Шапки и мелочи",
    href: "/catalog?cat=accessories",
    image: "/hat_glav.jpg",
  },
];

const academyModules = [
  { title: "Сумка / рюкзак", price: "5 500 ₽" },
  { title: "Брюки / худи / шорты", price: "8 000 ₽" },
  { title: "Базовое конструирование", price: "9 000 ₽" },
  { title: "Визуал и контент", price: "8 000 ₽" },
];

export default function Home() {
  const [winter, distressed, vlad] = collections;

  return (
    <main>
      {/* ---------- ГЕРОЙ ---------- */}
      <section className="relative bg-ink text-paper">
        <div className="relative h-[84svh] max-h-[940px] min-h-[560px] overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="EVSEEV — кампания 2026"
            fill
            priority
            sizes="100vw"
            className="animate-hero-zoom object-cover object-[50%_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/80" />

          <div className="absolute inset-x-0 top-0">
            <div className="wrap flex items-center justify-between py-5 text-[9px] uppercase tracking-[0.22em] text-paper/65">
              <span>Коллекция 01 / 2026</span>
              <span className="hidden md:block">54.7104° N — 20.4522° E</span>
              <span>Калининград</span>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="wrap pb-7 md:pb-11">
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div>
                  <p className="eyebrow rise text-paper">New collection / 2026</p>
                  <h1 className="display rise rise-1 mt-4 text-[clamp(3.4rem,10vw,9.5rem)]">
                    WINTER
                    <br />
                    2.6
                  </h1>
                  <p className="rise rise-2 mt-5 max-w-md text-[13px] leading-relaxed text-paper/70">
                    Тяжёлый трикотаж, графика и вещи, которые носят слоями.
                    Капсула про холодный город и людей, которые его не боятся.
                  </p>
                </div>

                <div className="rise rise-3 flex flex-col gap-3 md:items-end">
                  <Link
                    href={winter.href}
                    className="group flex items-center justify-between gap-8 bg-paper px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    Смотреть коллекцию
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </Link>
                  <Link
                    href="/catalog"
                    className="flex items-center justify-between gap-8 border border-paper/35 px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                  >
                    Весь магазин
                    <span aria-hidden>↗</span>
                  </Link>
                </div>
              </div>

              <div className="mt-9 flex items-center justify-between border-t border-paper/20 pt-4 text-[9px] uppercase tracking-[0.2em] text-paper/50">
                <span>01 / 03</span>
                <span className="hidden md:block">Скролл вниз ↓</span>
                <span>EST. 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- БЕГУЩАЯ СТРОКА ---------- */}
      <div className="border-y border-ink bg-ink text-paper">
        <Marquee
          items={[
            "БЕСПЛАТНАЯ ДОСТАВКА ОТ 10 000 ₽",
            "КОМПЛЕКТ ИЗ 3 ВЕЩЕЙ — −15%",
            "КАПСУЛЫ НЕ ПОВТОРЯЮТСЯ",
            "СДЕЛАНО В КАЛИНИНГРАДЕ",
          ]}
          speed="40s"
          className="py-3"
          itemClassName="eyebrow text-[9px] tracking-[0.24em]"
          separator="✦"
        />
      </div>

      {/* ---------- НОВОЕ ---------- */}
      <section className="wrap pt-14 md:pt-20">
        <SectionHead
          eyebrow="Drop 01 / 2026"
          title="Новое в магазине"
          href="/catalog"
          link="Все товары"
        />

        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-9 md:mt-8 md:grid-cols-4 md:gap-x-5">
          {featured.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      {/* ---------- КОЛЛЕКЦИИ ---------- */}
      <section className="wrap pt-16 md:pt-24">
        <SectionHead
          eyebrow="Collections"
          title="Капсулы"
          href="/collections"
          link="Все коллекции"
        />

        <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-12">
          {[winter, vlad].map((collection, index) => (
            <Link
              key={collection.slug}
              href={collection.href}
              className={`group relative min-h-[420px] overflow-hidden bg-ink md:min-h-[620px] ${
                index === 0 ? "md:col-span-7" : "md:col-span-5"
              }`}
            >
              <Image
                src={collection.cover}
                alt={collection.title}
                fill
                sizes={index === 0 ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
                className="object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/20" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 text-paper/60 md:p-6">
                <span className="text-[9px] tabular-nums tracking-[0.2em]">
                  0{index + 1}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em]">
                  {collection.year}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-7">
                <p className="eyebrow text-paper/55">{collection.tag}</p>
                <h3 className="display mt-2 text-[clamp(1.9rem,4.2vw,3.8rem)]">
                  {collection.title}
                </h3>
                <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-paper/55">
                  {collection.count} вещи · смотреть →
                </p>
              </div>

              <span className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-paper/35 text-[11px] text-paper transition-colors duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-ink md:top-6 md:right-6">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- КАТЕГОРИИ ---------- */}
      <section className="wrap pt-16 md:pt-24">
        <SectionHead eyebrow="Shop by category" title="Выбери своё" />

        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:mt-8 md:grid-cols-4 md:gap-x-5">
          {categories.map((category, index) => (
            <Link key={category.label} href={category.href} className="group block">
              <div className="media relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/0" />
                <span className="absolute top-2.5 left-2.5 text-[9px] tabular-nums tracking-[0.18em] text-paper mix-blend-difference">
                  0{index + 1}
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-3 pt-10 text-paper md:p-4">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
                    {category.label}
                  </span>
                  <span className="text-[11px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </div>
              <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-muted">
                {category.caption}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- МАНИФЕСТ ---------- */}
      <section className="mt-16 bg-ink text-paper md:mt-24">
        <div className="wrap py-12 md:py-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="eyebrow text-paper/60">Манифест</p>
              <h2 className="display mt-5 text-[clamp(2.3rem,6.6vw,6rem)]">
                ОДЕЖДА — ЭТО
                <br />
                НЕ ТКАНЬ.
                <br />
                ЭТО ЯЗЫК.
              </h2>
            </div>
            <Link
              href="/manifest"
              className="group flex w-fit items-center gap-6 border border-paper px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:bg-paper hover:text-ink"
            >
              Читать манифест
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>

        <Marquee
          items={["EVSEEV", "ARCHIVE 001", "KALININGRAD", "SINCE 2024"]}
          speed="38s"
          className="border-y border-paper/20 py-3 md:py-4"
          itemClassName="display text-[clamp(1.5rem,4vw,3rem)]"
          separator="/"
        />
      </section>

      {/* ---------- АКАДЕМИЯ ---------- */}
      <section className="mt-16 bg-ink text-paper md:mt-24">
        <div className="wrap grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:py-20">
          <div>
            <p className="eyebrow text-paper">Evseev Academy</p>
            <h2 className="display mt-5 text-[clamp(2.3rem,5.6vw,4.8rem)]">
              НАУЧИСЬ
              <br />
              ШИТЬ СВОЮ
              <br />
              ВЕЩЬ
            </h2>
            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-paper/60">
              Модульное обучение шитью в Калининграде. От простой сумки до
              конструирования и визуала — с обратной связью на каждом этапе.
            </p>

            <ul className="mt-8 max-w-md border-t border-paper/15">
              {academyModules.map((module, index) => (
                <li
                  key={module.title}
                  className="flex items-center justify-between gap-4 border-b border-paper/15 py-3.5"
                >
                  <span className="text-[11px] uppercase tracking-[0.08em] text-paper/75">
                    <span className="mr-3 text-[9px] tabular-nums text-paper/35">0{index + 1}</span>
                    {module.title}
                  </span>
                  <span className="text-[11px] tabular-nums text-paper/60">
                    {module.price}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/education"
              className="mt-8 inline-flex items-center gap-4 bg-paper px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper hover:border hover:border-paper"
            >
              Записаться на курс
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="media relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/education-1.jpg"
              alt="Обучение шитью в академии EVSEEV"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
            <span className="absolute top-3 right-3 bg-paper px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-ink">
              Kaliningrad
            </span>
          </div>
        </div>
      </section>

      {/* ---------- DISTRESSED PROMO ---------- */}
      <section className="wrap pt-16 md:pt-24">
        <Link href={distressed.href} className="group relative block min-h-[380px] overflow-hidden bg-ink md:min-h-[520px]">
          <Image
            src={distressed.cover}
            alt={distressed.title}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-85 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-5 text-paper md:p-9">
            <p className="eyebrow text-paper/60">Archive drop</p>
            <div>
              <h2 className="display text-[clamp(2.4rem,7vw,6rem)]">{distressed.title}</h2>
              <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-paper/65">
                {distressed.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-3 border border-paper/40 px-6 py-3 text-[10px] uppercase tracking-[0.18em] transition-colors group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                Смотреть капсулу
                <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
