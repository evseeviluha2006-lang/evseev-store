import Link from "next/link";
import Header from "@/_components/Header";

export default function OfferPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
          ПУБЛИЧНАЯ ОФЕРТА
        </h1>
        
        <p className="text-zinc-400 text-sm mb-12 font-mono uppercase tracking-widest border-b border-white/10 pb-4">
          Договор купли-продажи товаров дистанционным способом
        </p>

        <div className="space-y-8 text-zinc-300 text-sm md:text-base leading-relaxed">
          
          <section>
            <h2 className="text-white font-bold uppercase tracking-wider mb-4 text-lg">1. Общие положения</h2>
            <p>Настоящий документ является публичной офертой (предложением) <strong>Евсеева Ильи Константиновича</strong> (далее — Продавец) в адрес любого физического лица (далее — Покупатель) заключить договор купли-продажи товаров дистанционным способом на условиях, определенных ниже.</p>
            <p className="mt-4">Продавец: Евсеев Илья Константинович<br/>ИНН: 390518200460<br/>СНИЛС: 196-775-695 59<br/>Адрес: г. Калининград, ул. Новгородская, д. 7</p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-wider mb-4 text-lg">2. Предмет договора</h2>
            <p>Продавец обязуется передать в собственность Покупателю товары (одежду, аксессуары, услуги по обучению), а Покупатель обязуется принять и оплатить эти товары на условиях настоящей Оферты.</p>
            <p className="mt-4">Товары передаются Покупателю путем:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Самовывоза по адресу: г. Калининград, ул. Новгородская, д. 7 (по предварительному согласованию).</li>
              <li>Доставки транспортной компанией (СДЭК, Почта России) за счет Покупателя.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-wider mb-4 text-lg">3. Порядок оплаты</h2>
            <p>Оплата Товаров производится одним из следующих способов:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Банковской картой онлайн</strong> через платежную систему ЮKassa на сайте Продавца.</li>
              <li><strong>Наличными денежными средствами</strong> при самовывозе Товара по адресу Продавца.</li>
            </ul>
            <p className="mt-4">Моментом оплаты считается зачисление денежных средств на расчетный счет Продавца или передача наличных средств Продавцу при самовывозе.</p>
          </section>

          <section>
            <h2 className="text-white font-bold uppercase tracking-wider mb-4 text-lg">4. Возврат и обмен</h2>
            <p>Покупатель вправе отказаться от товара в течение 7 дней после его получения, если товар надлежащего качества не был в употреблении, сохранены его товарный вид, упаковка и документы.</p>
            <p className="mt-4">Возврат денежных средств осуществляется тем же способом, которым была произведена оплата, в течение 10 рабочих дней с момента получения возвращенного товара Продавцом.</p>
          </section>

          <section>
  <h2 className="text-white font-bold uppercase tracking-wider mb-4 text-lg">5. Реквизиты и контакты</h2>
  <p className="font-mono text-xs md:text-sm bg-zinc-900 p-6 border border-white/10 space-y-2">
    <p>Продавец: Евсеев Илья Константинович</p>
    <p>ИНН: 390518200460</p>
    <p>СНИЛС: 196-775-695 59</p>
    <p>Адрес: 236000, г. Калининград, ул. Новгородская, д. 7</p>
    <p>Телефон / Telegram: +7 (902) 252-76-34</p>
    <p>Email: eikboy1709@gmail.com</p>
  </p>
</section>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-zinc-400 transition-colors">
            ← Вернуться на главную
          </Link>
          <span className="text-[10px] text-zinc-600 font-mono">Актуально на 2026 год</span>
        </div>
      </div>
    </main>
  );
}