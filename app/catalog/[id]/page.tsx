"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/_components/AddToCartButton";
import LikeButton from "@/_components/LikeButton";
import ProductCard from "@/_components/ProductCard";
import SectionHead from "@/_components/SectionHead";
import SizeGuide from "@/_components/SizeGuide";
import { collectionLabel } from "@/lib/collections";
import { formatPrice, MAX_QUANTITY, products } from "@/lib/products";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((item) => item.id === id);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mysteryAccepted, setMysteryAccepted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!product) {
    return (
      <main className="wrap flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow text-muted">Error 404</p>
        <h1 className="display mt-4 text-[clamp(2.2rem,6vw,4.5rem)]">ТОВАР НЕ НАЙДЕН</h1>
        <p className="mt-4 text-[13px] text-muted">
          Возможно, вещь продана или ссылка устарела.
        </p>
        <Link
          href="/catalog"
          className="mt-8 border border-ink px-7 py-4 text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
        >
          Вернуться в магазин
        </Link>
      </main>
    );
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeImageIndex < product.images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    } else if (isRightSwipe && activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const related = products.filter(
    (item) => item.collection === product.collection && item.id !== product.id
  );
  const suggested = (
    related.length > 0
      ? related
      : products.filter((item) => !item.hidden && item.id !== product.id)
  ).slice(0, 4);

  const activeImage = product.images[activeImageIndex];

  return (
    <main>
      {/* ХЛЕБНЫЕ КРОШКИ */}
      <div className="wrap pt-5 md:pt-7">
        <nav className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-muted">
          <Link href="/" className="hover:text-ink">Главная</Link>
          <span aria-hidden>/</span>
          <Link href="/catalog" className="hover:text-ink">Магазин</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      {product.isPreorder && (
        <div className="wrap mt-4">
          <div className="flex flex-col gap-1 border border-ink bg-paper px-4 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-ink sm:flex-row sm:items-center sm:justify-between">
            <span>Предзаказ — ограниченный тираж</span>
            <span>Отправка {product.preorderDate ?? "после отшива"}</span>
          </div>
        </div>
      )}

      {product.limitedDrop && !product.isPreorder && (
        <div className="wrap mt-4">
          <div className="flex flex-col gap-1 bg-ink px-4 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-paper sm:flex-row sm:items-center sm:justify-between">
            <span>Limited drop — ограниченный тираж</span>
            <span>Пока есть в наличии</span>
          </div>
        </div>
      )}

      <div className="wrap mt-5 grid gap-9 pb-4 md:mt-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 xl:gap-20">
        {/* ГАЛЕРЕЯ */}
        <div>
          <div
            className="group relative aspect-[4/5] w-full touch-pan-y overflow-hidden bg-paper-2 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {activeImage && (
              <Image
                key={activeImage}
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="animate-slide-up-blur object-contain p-2 md:p-6"
              />
            )}

            <div className="absolute top-3 right-3 z-20">
              <LikeButton
                id={product.id}
                type="product"
                title={product.name}
                image={product.images[0]}
                price={formatPrice(product.price)}
                description={product.description}
                size="md"
              />
            </div>

            <span className="absolute top-3 left-3 bg-paper/85 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.18em] backdrop-blur-sm">
              {collectionLabel(product.collection)}
            </span>

            {product.images.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 hidden items-center pl-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(Math.max(0, activeImageIndex - 1))}
                    disabled={activeImageIndex === 0}
                    aria-label="Предыдущее фото"
                    className="grid h-10 w-10 place-items-center border border-line bg-paper/90 text-[13px] backdrop-blur-sm transition-colors hover:bg-paper disabled:opacity-0"
                  >
                    ←
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 hidden items-center pr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex(Math.min(product.images.length - 1, activeImageIndex + 1))
                    }
                    disabled={activeImageIndex === product.images.length - 1}
                    aria-label="Следующее фото"
                    className="grid h-10 w-10 place-items-center border border-line bg-paper/90 text-[13px] backdrop-blur-sm transition-colors hover:bg-paper disabled:opacity-0"
                  >
                    →
                  </button>
                </div>
              </>
            )}

            <span className="absolute right-3 bottom-3 text-[9px] tabular-nums uppercase tracking-[0.18em] text-muted">
              {String(activeImageIndex + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
            </span>
          </div>

          {product.images.length > 1 && (
            <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Фото ${index + 1}`}
                  aria-pressed={activeImageIndex === index}
                  className={`relative aspect-square w-[18%] min-w-[64px] shrink-0 overflow-hidden border bg-paper-2 transition-opacity ${
                    activeImageIndex === index
                      ? "border-ink opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={image} alt="" fill sizes="90px" className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}

          {product.isMystery && (
            <p className="mt-3 text-[9px] uppercase tracking-[0.14em] text-muted">
              Примеры возможных вариантов
            </p>
          )}
        </div>

        {/* ИНФОРМАЦИЯ */}
        <div className="lg:sticky lg:top-[96px] lg:self-start">
          <p className="eyebrow text-muted">
            {collectionLabel(product.collection)} / 2026
          </p>

          <h1 className="display-sm mt-4 text-[clamp(1.9rem,4.2vw,3.4rem)]">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="text-[17px] tabular-nums">{formatPrice(product.price)}</span>
            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />
              {product.isPreorder ? "Предзаказ" : product.limitedDrop ? "Limited drop" : "В наличии"}
            </span>
          </div>

          <p className="mt-5 max-w-md text-[13px] leading-relaxed text-muted">
            {product.description}
          </p>

          {/* РАЗМЕРЫ */}
          {product.sizes.length > 0 && (
            <div className="mt-7 border-t border-line pt-5">
              <div className="mb-3 flex items-end justify-between gap-4">
                <span className="eyebrow">Размер</span>
                {!selectedSize ? (
                  <span className="text-[9px] uppercase tracking-[0.14em] text-muted">
                    Выберите размер
                  </span>
                ) : (
                  <span className="text-[9px] uppercase tracking-[0.14em] text-muted">
                    Выбран: {selectedSize}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`h-11 min-w-[52px] border px-4 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
                      selectedSize === size
                        ? "border-ink bg-ink text-paper"
                        : "border-line hover:border-ink"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {product.hasSizeGuide &&
                (product.id === "hat-sex" ? (
                  <div className="mt-4 overflow-x-auto border-t border-line">
                    <table className="w-full text-left text-[11px]">
                      <thead>
                        <tr className="border-b border-line text-[9px] uppercase tracking-[0.16em] text-muted">
                          <th className="py-2.5 pr-3 font-medium">Размер</th>
                          <th className="py-2.5 pr-3 font-medium">Обхват головы (см)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-line/70">
                          <td className="py-2.5 pr-3 font-medium">S</td>
                          <td className="py-2.5 pr-3 tabular-nums text-muted">54–56</td>
                        </tr>
                        <tr className="border-b border-line/70">
                          <td className="py-2.5 pr-3 font-medium">M</td>
                          <td className="py-2.5 pr-3 tabular-nums text-muted">56–58</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="pt-3 text-[9px] uppercase tracking-[0.12em] text-muted">
                      Допускается погрешность ±1 см.
                    </p>
                  </div>
                ) : (
                  <SizeGuide />
                ))}
            </div>
          )}

          {/* КНОПКА */}
          <div className="mt-7">
            {product.isMystery && (
              <div className="mb-5 border border-ink bg-paper-2/60 p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink">
                  Важно: случайная ключница
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">
                  Вы заказываете случайную ключницу. Выбрать конкретный дизайн нельзя — вы не знаете заранее, какая именно модель приедет, это будет сюрприз при получении.
                </p>
              </div>
            )}

            {product.isMystery && (
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-line pb-5">
                <span className="eyebrow text-muted">Количество</span>
                <div className="flex items-center border border-line">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Уменьшить количество"
                    className="grid h-10 w-10 place-items-center text-[14px] transition-colors hover:bg-ink hover:text-paper"
                  >
                    −
                  </button>
                  <span className="grid h-10 w-10 place-items-center border-x border-line text-[11px] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
                    aria-label="Увеличить количество"
                    className="grid h-10 w-10 place-items-center text-[14px] transition-colors hover:bg-ink hover:text-paper"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {product.isMystery && (
              <label className="mb-5 flex cursor-pointer items-start gap-3 border border-line p-4 text-[11px] leading-relaxed text-muted">
                <input
                  type="checkbox"
                  checked={mysteryAccepted}
                  onChange={(e) => setMysteryAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-black"
                />
                <span>Я понимаю, что получу случайную ключницу</span>
              </label>
            )}

            {(() => {
              const needsSize = product.sizes.length > 0;
              const sizeOk = !needsSize || Boolean(selectedSize);
              const mysteryOk = !product.isMystery || mysteryAccepted;
              const canAdd = sizeOk && mysteryOk;
              const resolvedSize = selectedSize || product.sizes[0] || "";

              if (canAdd) {
                return (
                  <AddToCartButton
                    productId={product.id}
                    size={resolvedSize}
                    quantity={product.isMystery ? quantity : 1}
                    customText={product.isPreorder ? "Забронировать пару" : undefined}
                  />
                );
              }

              return (
                <>
                  <AddToCartButton
                    productId={product.id}
                    size={resolvedSize}
                    quantity={product.isMystery ? quantity : 1}
                    disabled
                    customText={product.isPreorder ? "Забронировать пару" : undefined}
                  />
                  <p className="mt-2 text-center text-[9px] uppercase tracking-[0.14em] text-muted">
                    {needsSize && !sizeOk
                      ? "Выберите размер, чтобы продолжить"
                      : "Подтвердите, что вы понимаете условия случайного выбора"}
                  </p>
                </>
              );
            })()}
          </div>

          {/* ДЕТАЛИ */}
          <div className="mt-7 border-t border-line">
            <details className="group/details border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[10px] uppercase tracking-[0.16em]">
                <span>Доставка и оплата</span>
                <span className="text-[13px] transition-transform duration-300 group-open/details:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <div className="space-y-2 pb-4 text-[12px] leading-relaxed text-muted">
                <p>СДЭК и Почта России — 3–7 дней по стране. Бесплатно от 10 000 ₽.</p>
                <p>Самовывоз в Калининграде — по предварительной договорённости.</p>
                <p>Оплата картой онлайн через ЮKassa или наличными при самовывозе.</p>
              </div>
            </details>

            <details className="group/details border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[10px] uppercase tracking-[0.16em]">
                <span>Возврат и обмен</span>
                <span className="text-[13px] transition-transform duration-300 group-open/details:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <div className="space-y-2 pb-4 text-[12px] leading-relaxed text-muted">
                <p>7 дней с момента получения, если вещь не была в носке.</p>
                <p>Сохранение товарного вида, бирок и упаковки обязательно.</p>
              </div>
            </details>

            <details className="group/details border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[10px] uppercase tracking-[0.16em]">
                <span>Состав и уход</span>
                <span className="text-[13px] transition-transform duration-300 group-open/details:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <div className="space-y-2 pb-4 text-[12px] leading-relaxed text-muted">
                <p>{product.material ?? "100% хлопок"}</p>
                <p>Стирка при 30°C, без отбеливателей, сушить вдали от прямого солнца.</p>
              </div>
            </details>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-[9px] uppercase tracking-[0.12em] text-muted">
            <div className="flex justify-between border-b border-line/70 pb-1.5">
              <dt>Материал</dt>
              <dd className="text-ink">{product.material ?? "100% COTTON"}</dd>
            </div>
            <div className="flex justify-between border-b border-line/70 pb-1.5">
              <dt>Производство</dt>
              <dd className="text-ink">Russia</dd>
            </div>
            <div className="flex justify-between border-b border-line/70 pb-1.5">
              <dt>Коллекция</dt>
              <dd className="text-ink">{collectionLabel(product.collection)}</dd>
            </div>
            <div className="flex justify-between border-b border-line/70 pb-1.5">
              <dt>SKU</dt>
              <dd className="text-ink">EVS-{product.id.toUpperCase().replace(/-/g, "")}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* LOOKBOOK SCHOOL JEANS */}
      {product.id === "school-jeans" && (
        <section className="wrap mt-16 border-t border-line pt-10 md:mt-24 md:pt-14">
          <SectionHead
            eyebrow="School Jeans / Lookbook"
            title="Собери комплект"
            href="/catalog/school-jeans"
            link="Конструктор образа"
          />

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Link href="/catalog/sex-shirt" className="group relative block aspect-[4/5] overflow-hidden bg-paper-2 md:aspect-[4/5]">
              <Image
                src="/sex_shirt.jpg"
                alt="SEX Shirt"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-4 pt-12 text-paper">
                <span className="text-[10px] uppercase tracking-[0.16em]">SEX Shirt / Black</span>
                <span className="text-[9px] uppercase tracking-[0.16em] text-paper/70">
                  только в комплекте
                </span>
              </span>
            </Link>

            <Link href="/catalog/el-shirt" className="group relative block aspect-[4/5] overflow-hidden bg-paper-2 md:aspect-[4/5]">
              <Image
                src="/el_shirt.jpg"
                alt="LOG Shirt"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-4 pt-12 text-paper">
                <span className="text-[10px] uppercase tracking-[0.16em]">LOG Shirt / Black</span>
                <span className="text-[9px] uppercase tracking-[0.16em] text-paper/70">
                  только в комплекте
                </span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ПОХОЖИЕ */}
      {suggested.length > 0 && (
        <section className="wrap mt-16 md:mt-24">
          <SectionHead eyebrow="Complete the look" title="С этим носят" href="/catalog" link="Весь магазин" />
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5">
            {suggested.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
