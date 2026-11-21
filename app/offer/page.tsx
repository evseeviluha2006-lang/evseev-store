import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Публичная оферта",
  description:
    "Договор купли-продажи товаров дистанционным способом. Реквизиты и условия продавца EVSEEV.",
};

export default function OfferPage() {
  return (
    <main>
      <section className="wrap pt-10 pb-6 md:pt-16 md:pb-8">
        <p className="eyebrow text-muted">Legal / Public offer</p>
        <h1 className="display mt-4 max-w-4xl text-[clamp(2.4rem,7vw,6rem)]">
          ПУБЛИЧНАЯ
          <br />
          ОФЕРТА
        </h1>
        <p className="mt-5 max-w-2xl text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted">
          Договор купли-продажи товаров дистанционным способом
        </p>
      </section>

      <div className="wrap grid gap-10 border-t border-line pt-8 pb-4 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-16">
        <aside className="hidden lg:block">
          <p className="eyebrow text-muted">Содержание</p>
          <ol className="mt-4 space-y-2 text-[10px] uppercase tracking-[0.12em] text-muted">
            <li>01 / Общие положения</li>
            <li>02 / Предмет договора</li>
            <li>03 / Порядок оплаты</li>
            <li>04 / Возврат и обмен</li>
            <li>05 / Реквизиты и контакты</li>
          </ol>
          <p className="mt-8 text-[9px] uppercase tracking-[0.14em] text-muted">
            Актуально на 2026 год
          </p>
        </aside>

        <div className="space-y-9 text-[13px] leading-relaxed text-muted md:text-sm">
          <section>
            <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
              1. Общие положения
            </h2>
            <p>
              Настоящий документ является публичной офертой (предложением){" "}
              <strong className="font-medium text-ink">Евсеева Ильи Константиновича</strong>{" "}
              (далее — Продавец) в адрес любого физического лица (далее — Покупатель)
              заключить договор купли-продажи товаров дистанционным способом на
              условиях, определенных ниже.
            </p>
            <p className="mt-4">
              Продавец: Евсеев Илья Константинович
              <br />
              ИНН: 390518200460
              <br />
              СНИЛС: 196-775-695 59
              <br />
              Адрес: г. Калининград, ул. Новгородская, д. 7
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
              2. Предмет договора
            </h2>
            <p>
              Продавец обязуется передать в собственность Покупателю товары
              (одежду, аксессуары, услуги по обучению), а Покупатель обязуется
              принять и оплатить эти товары на условиях настоящей Оферты.
            </p>
            <p className="mt-4">Товары передаются Покупателю путем:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Самовывоза по адресу: г. Калининград, ул. Новгородская, д. 7 (по
                предварительному согласованию).
              </li>
              <li>
                Доставки транспортной компанией (СДЭК, Почта России) за счет
                Покупателя.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
              3. Порядок оплаты
            </h2>
            <p>Оплата Товаров производится одним из следующих способов:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong className="font-medium text-ink">Банковской картой онлайн</strong>{" "}
                через платежную систему ЮKassa на сайте Продавца.
              </li>
              <li>
                <strong className="font-medium text-ink">Наличными денежными средствами</strong>{" "}
                при самовывозе Товара по адресу Продавца.
              </li>
            </ul>
            <p className="mt-4">
              Моментом оплаты считается зачисление денежных средств на расчетный
              счет Продавца или передача наличных средств Продавцу при
              самовывозе.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
              4. Возврат и обмен
            </h2>
            <p>
              Покупатель вправе отказаться от товара в течение 7 дней после его
              получения, если товар надлежащего качества не был в употреблении,
              сохранены его товарный вид, упаковка и документы.
            </p>
            <p className="mt-4">
              Возврат денежных средств осуществляется тем же способом, которым
              была произведена оплата, в течение 10 рабочих дней с момента
              получения возвращенного товара Продавцом.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
              5. Реквизиты и контакты
            </h2>
            <div className="space-y-2 border border-line bg-paper-2/50 p-5 text-[11px] leading-relaxed text-ink">
              <p>Продавец: Евсеев Илья Константинович</p>
              <p>ИНН: 390518200460</p>
              <p>СНИЛС: 196-775-695 59</p>
              <p>Адрес: 236000, г. Калининград, ул. Новгородская, д. 7</p>
              <p>Телефон / Telegram: +7 (902) 252-76-34</p>
              <p>Email: eikboy1709@gmail.com</p>
            </div>
          </section>
        </div>
      </div>

      <div className="wrap mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 pb-2">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
            ←
          </span>
          На главную
        </Link>
        <span className="text-[9px] uppercase tracking-[0.14em] text-muted">
          Актуально на 2026 год
        </span>
      </div>
    </main>
  );
}
