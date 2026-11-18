# Аудит проекта EVSEEV Store

Дата: 15.11.2026 · Стек: Next.js 16.2.10 (App Router) · React 19.2 · Tailwind CSS 4 · TypeScript 5 · Node 26

---

## 0. Коротко

Сайт живой и симпатичный визуально, но в текущем виде **продавать через него опасно**: цена в каталоге и в корзине различаются, сумма платежа считается на клиенте, токен Telegram-бота лежит в JS-бандле, а после оплаты пользователь попадает на 404.

Плюс проект лежал мёртвым грузом с macOS: `node_modules` нерабочий на Windows, `.next` — 718 МБ мусора, половина картинок не находится.

---

## 1. КРИТИЧНО (деньги и безопасность)

### 1.1. Токен Telegram-бота утёк в браузер ⚠️ САМОЕ СРОЧНОЕ
`lib/telegram.ts`:
```ts
const BOT_TOKEN = "7765297336:AAFP8gz83t1WPcbQ9U6Fc8dl_JYqmgbLEds";
const CHAT_ID = "7465159990";
```
Файл импортируется в `app/education/page.tsx`, у которого стоит `"use client"`. Значит токен **попадает в клиентский JS-бандл**: любой открывает DevTools → Sources → ищет `api.telegram.org` → забирает токен.

Что можно сделать с токеном: читать всю переписку бота, отправлять сообщения от его имени, удалить вебхук, слить базу подписчиков.

**Действия:**
1. Отозвать токен у @BotFather (`/revoke`) — старый уже считается скомпрометированным.
2. Перенести отправку в серверный Route Handler (`app/api/lead/route.ts`), токен — в `.env.local` (`TELEGRAM_BOT_TOKEN`), в клиенте — обычный `fetch("/api/lead")`.
3. Проверить, не остался ли токен в git-истории (`git log -S AAFP8gz`). Если да — токен всё равно только отзывать.

### 1.2. Сумма платежа приходит с клиента
`app/checkout/page.tsx` считает `totalPrice` из `localStorage`, отправляет на `/api/create-payment`, а сервер (`app/api/create-payment/route.ts`) без проверки делает:
```ts
amount: { value: amount.toFixed(2), currency: 'RUB' }
```
Любой может вызвать эндпоинт напрямую:
```bash
curl -X POST https://evseev.store/api/create-payment -d "{\"amount\":1}"
```
и получить ссылку на оплату 1 ₽. Сервер **не знает**, что было в корзине, поэтому проверить нечего.

**Действия:** на сервере принимать только `[{id, size, qty}]`, цену брать из серверного каталога, сумму считать там же. Никогда не доверять `amount` из запроса.

### 1.3. Заказ нигде не сохраняется
- нет webhook'а ЮKassa → сайт не узнаёт об успешной оплате;
- нет письма/уведомления в Telegram о новом заказе;
- данные клиента уходят только в `metadata` платежа в личный кабинет ЮKassa.

Итог: клиент оплатил, а магазин об этом узнаёт, только если вручную полезет в кабинет ЮKassa.

### 1.4. После оплаты — 404
`return_url: 'https://evseev.store/success'`, но страницы `/success` нет. Пользователь платит и видит «This page could not be found».

### 1.5. Цена SCHOOL JEANS разная в разных местах
| Где | Цена |
|---|---|
| `app/catalog/page.tsx` | 5 990 ₽ |
| `app/catalog/[id]/page.tsx` | 5 990 ₽ |
| `_components/AddToCartButton.tsx` (`PRODUCTS_DB`) | **4 990 ₽** |
| `app/catalog/school-jeans/ page.tsx` | 5 990 ₽ |

`AddToCartButton` приоритетно берёт цену из своей `PRODUCTS_DB`, поэтому **на витрине 5 990, а в корзине и в чеке — 4 990**. Git-история это подтверждает: коммиты `fix price to 4990` / `fix price to 5990` ходят туда-сюда.

Плюс в `PRODUCTS_DB` ключ `"sexShirt"`, а реальный id товара — `"sex-shirt"`; `hat-sex` и `el-shirt` вообще отсутствуют. Спасает только фолбэк на props.

**Причина:** каталог продублирован в 5 местах (`catalog/page`, `catalog/[id]/page`, `AddToCartButton`, `collections/*`, `checkout`). Нужен один `lib/products.ts` как источник правды.

### 1.6. Нет `receipt` в платеже
ЮKassa для ИП/самозанятых с онлайн-кассой требует чек (54-ФЗ). Сейчас `receipt` не передаётся — часть платежей будет отваливаться с ошибкой, либо будут проблемы с налоговой. Нужно добавить `receipt.items` + `customer`.

### 1.7. Нет `.env.local`
Файлов `.env*` в проекте нет вообще. Без `YOOKASSA_SHOP_ID` / `YOOKASSA_SECRET_KEY` оформление заказа всегда падает с «Ошибка конфигурации сервера». Нужен `.env.example` в репозитории.

### 1.8. Юридические данные не совпадают
- Оферта: `г. Калининград, ул. Новгородская, д. 7`
- Контакты: `ул. Каштановая аллея, 1А`

Для оферты это критично — адрес продавца должен быть один и настоящий. Также в оферте нет ИП/ОГРНИП, только физлицо с ИНН — проверь, как оформлена деятельность.

---

## 2. ЛОМАЕТ САЙТ (баги)

### 2.1. Два файла с пробелом в имени — маршруты не существуют
```
app/creativity/ page.tsx
app/catalog/school-jeans/ page.tsx
```
Имя файла — `" page.tsx"` с ведущим пробелом. Next ищет ровно `page.tsx`, поэтому:
- раздела «Творчество» нет вообще;
- страница комплекта School Jeans (с конструктором образа и скидкой 15%) **мертва** — `/catalog/school-jeans` отдаёт обычную карточку товара из `[id]`.

Переименовать в `app/creativity/page.tsx` и `app/catalog/school-jeans/page.tsx`. Но учти: тогда `/catalog/school-jeans` начнёт матчиться статическим роутом вместо `[id]` — нужно решить, какая страница главная.

### 2.2. Семь битых картинок
| Путь в коде | Файл |
|---|---|
| `/placeholder.jpg` | `app/likes/page.tsx` — нет |
| `/creativity-cover.jpg` | `app/creativity/ page.tsx` — нет |
| `/school_jeans_glav.jpg` | `app/catalog/school-jeans/ page.tsx` — на диске `shool_jeans_glav.jpg` (опечатка) |
| `/history/era-first-show-cover.jpg` | `app/history/page.tsx` — нет |
| `/history/era-new-paths-cover.jpg` | `app/history/page.tsx` — нет |
| `/product3.jpg`, `/product4.jpg` | `app/collections/winter-2-6/page.tsx` — нет |
| `/distress-pants.jpg`, `/distress-tee.jpg`, `/distress-hoodie.jpg`, `/distress-cap.jpg` | `app/collections/[id]/page.tsx` — нет |

### 2.3. Битые ссылки на товары
- `app/collections/winter-2-6/page.tsx` → `id: "jacket-04"` — такого товара нет → «ТОВАР НЕ НАЙДЕН».
- `app/collections/[id]/page.tsx` → ids `d1`–`d4` — их нет в каталоге; причём этот роут вообще недостижим, потому что все три коллекции имеют статические страницы.

### 2.4. Невалидный HTML в оферте → ошибка гидрации
`app/offer/page.tsx` строки 54–61: `<p>` вложен в `<p>`. React 19 ругается `In HTML, <p> cannot be a descendant of <p>` и ломает разметку. Заменить внешний `<p>` на `<div>`.

### 2.5. Шрифт сайта не применяется
`app/globals.css`:
```css
--font-sans: var(--font-geist-sans);   /* такой переменной нет */
--font-mono: var(--font-geist-mono);   /* и такой нет */
```
А в `app/layout.tsx` подключён `Space_Grotesk` с переменной `--font-space`. Переменная нигде не используется, `font-sans` резолвится в пустоту, и `body { font-family: Arial }` перекрывает всё. **Весь сайт рендерится в Arial**, а не в Space Grotesk.

Плюс `.font-numbers` объявлен три раза подряд (строки 86–105) — оставить один.

### 2.6. Побочный эффект в рендере
`_components/Header.tsx` строки 17–20:
```tsx
if (typeof document !== 'undefined') {
  document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
}
```
Мутация DOM прямо в теле компонента. Нужен `useEffect`. Сейчас это ещё и оставляет `overflow: auto` после размонтирования и конфликтует с другими страницами.

### 2.7. Страница «Избранное» сканирует весь localStorage
`app/likes/page.tsx` перебирает **все** ключи localStorage, парсит их, и в `removeLike` перезаписывает **любой** массив, где встретился совпадающий `id`. Может затереть чужие данные (например, чужой ключ на том же домене). Нужно читать только `evseev-likes`.

### 2.8. Корзина живёт в трёх местах
`CartContext` (не используется для добавления!), `AddToCartButton` (пишет в localStorage напрямую), `cart/page.tsx` (читает localStorage при монтировании). `cart-updated` событие диспатчится, но никто его не слушает. Счётчика товаров в шапке нет, состояние рассинхронизировано до перезагрузки страницы.

### 2.9. Мёртвый код
- `_components/PreorderWidget.tsx` — не импортируется (в layout закомментирован).
- `app/collections/[id]/page.tsx` — недостижим.
- `app/catalog/school-jeans/ page.tsx` — недостижим (см. 2.1).
- `useSearchParams` импортирован в `checkout/page.tsx` и не используется.
- В `checkout` параметры `productId/size/sexShirt/elShirt` из `buildCheckoutUrl` полностью игнорируются — конструктор комплекта не работает.

---

## 3. ПРОИЗВОДИТЕЛЬНОСТЬ

### 3.1. Картинки — главная проблема
| Файл | Размер | Разрешение |
|---|---|---|
| `el_shirt.jpg` | **22,9 МБ** | 3376×6000 |
| `hero.jpg` | **22,6 МБ** | 5184×3456 |
| `shool_jeans_glav.jpg` | **17,2 МБ** | 2893×5143 |
| `sex_shirt.jpg` | **11,7 МБ** | 3123×3123 |

`hero.jpg` стоит на главной с `priority` → мобильный пользователь качает 22 МБ до первого экрана. Это гарантированный провал Core Web Vitals и отвал на мобильном интернете.

**Нужно:** прогнать через `sharp`/Squoosh в WebP, ширина 1600 px максимум, качество 80 → ~200–300 КБ каждая. Оригиналы держать вне `public/`.

### 3.2. Видео на 19 МБ автоплеится
`1116.mp4` (19,4 МБ), `winter26-bts.mp4` (13,7 МБ), `distress-bts.mp4` (7,4 МБ) — `autoPlay loop` без `poster`, без `preload="none"`. Трафик на каждого посетителя коллекций.

### 3.3. macOS-наследство
- `node_modules` — 396 МБ, все `.bin/*` были симлинками (`XSym`), на Windows не работают.
- `.next` — **718 МБ** сборки с Mac, для Windows бесполезна.
- ~сотни файлов `._*` (AppleDouble) и `.DS_Store` во всех папках, включая `node_modules`.

Сделано: `.next` и `._*`/`.DS_Store` удалены, `node_modules` переустанавливается, `._*` добавлены в `.gitignore`.

### 3.4. Диск E: почти полный
Было 1,4 ГБ свободно из 3,8 ГБ. После чистки — ~2,2 ГБ. Для нормальной работы Next (dev-кэш + сборка) лучше перенести проект на `D:` или `F:`, где 130+ ГБ свободно.

---

## 4. SEO И МЕТАДАННЫЕ

- Метаданные только в `layout.tsx` — **у всех страниц один title** «EVSEEV | Streetwear Brand», нет Open Graph, нет `metadataBase`.
- Нет `app/sitemap.ts`, нет `app/robots.ts`.
- **Все карточки товаров — клиентские компоненты** (`"use client"` в `catalog/[id]/page.tsx`), каталог зашит в бандл. Для магазина это плохо: нет серверного HTML с ценой и описанием, нет `generateMetadata`, нет структурированных данных `Product`/`Offer` → не будет rich snippets в Google.
- Нет `app/not-found.tsx` — стандартная английская 404.
- Нет `app/success/page.tsx` (см. 1.4).

---

## 5. UX И ДОСТУПНОСТЬ

- Формы (`checkout`, `education`): `<label>` не связаны с `<input>` (`htmlFor`/`id` отсутствуют).
- Кнопки галереи (точки, стрелки, `+`/`−` в корзине) без `aria-label`.
- Ошибки показываются через `alert()` — блокирует поток, на мобильных выглядит убого.
- Нет индикатора количества товаров в иконке корзины.
- `/likes`, `/history`, `/manifest` существуют, но **нигде не слинкованы** в шапке — попасть можно только по прямому URL.
- В шапке нет ссылки на избранное, хотя страница есть.
- В корзине `clearCart` не спрашивает подтверждение.

---

## 6. План действий по приоритету

**P0 — сегодня**
1. Отозвать токен Telegram-бота, вынести отправку на сервер.
2. Убрать `amount` из клиента: считать сумму на сервере из серверного каталога.
3. Создать `app/success/page.tsx`; добавить webhook ЮKassa и уведомление о заказе в Telegram.
4. Свести каталог в один `lib/products.ts` и починить цену SCHOOL JEANS.
5. Пережать `hero.jpg`, `el_shirt.jpg`, `shool_jeans_glav.jpg`, `sex_shirt.jpg`.

**P1 — эта неделя**
6. Переименовать файлы с пробелами, починить/удалить мёртвые роуты.
7. Добавить 7 недостающих картинок или заменить на существующие.
8. Починить `<p>` в `<p>` в оферте, `useEffect` в Header, шрифтовые переменные.
9. Свести корзину к одному стору (`CartContext`), добавить счётчик в шапку.
10. `.env.example`, `receipt` в платеже, валидация телефона/суммы.

**P2 — потом**
11. Серверный каталог + `generateMetadata` + `Product` JSON-LD + sitemap/robots.
12. Оптимизация видео (poster, `preload="none"`, сжатие).
13. Навигация: добавить `/likes`, `/history`, `/manifest` в меню.
14. Заменить `alert()` на аккуратные тосты, добавить `aria-label`.
15. Перенести проект с почти полного `E:` на `D:`/`F:`.

---

## 7. Как запускать на Windows

```powershell
cd E:\evseev-store-mac
npm install          # обязательно: node_modules приехал с macOS
npm run dev          # http://localhost:3000
```

`.env.local` (создать самому, в git не попадёт):
```
YOOKASSA_SHOP_ID=...
YOOKASSA_SECRET_KEY=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```
