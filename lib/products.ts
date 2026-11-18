// Единый источник правды по товарам.
// Используется и витриной, и корзиной, и серверным расчётом цены в /api/create-payment.
// Цена хранится числом (в рублях), форматируется только на выводе.

export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  sizes: string[];
  collection: string;
  /** Материал для блока характеристик на карточке товара */
  material?: string;
  hasSizeGuide?: boolean;
  isPreorder?: boolean;
  preorderDate?: string;
  /** Скрыть из общего каталога, но оставить карточку и покупку доступными */
  hidden?: boolean;
};

export type CartLine = {
  id: string;
  size: string;
  quantity: number;
};

/** Товары, которые дают скидку 15% при покупке полным комплектом */
export const BUNDLE_IDS = ["school-jeans", "sex-shirt", "el-shirt"] as const;
export const BUNDLE_DISCOUNT = 0.15;

export const MAX_QUANTITY = 10;

export const products: Product[] = [
  {
    id: "burgziper",
    name: "BURGZIPER",
    price: 6490,
    images: [
      "/burgziper-front.jpg",
      "/burgziper-back.jpg",
      "/burgziper-open.jpg",
      "/burgziper-detail.jpg",
    ],
    description:
      "Зип-худи из плотного футера. Свободный крой, капюшон с регулировкой, металлический зип.",
    material: "ФУТЕР 2 НИТКА С НАЧЁСОМ",
    sizes: ["S", "M", "L", "XL"],
    collection: "archive",
  },
  {
    id: "school-jeans",
    name: "SCHOOL JEANS",
    price: 5990,
    images: ["/school_jeans_front.jpg", "/school_jeans_back.jpg"],
    description:
      "Джинсы, созданные специально к началу учебного года. Плотный деним, прямой крой, идеальная посадка.",
    sizes: ["S", "M", "L", "XL"],
    collection: "school",
    hasSizeGuide: true,
  },
  {
    id: "sex-shirt",
    name: "SEX Shirt // BLACK",
    price: 3500,
    images: ["/sex_shirt.jpg"],
    description:
      "Эксклюзивная майка. Доступна только при заказе комплектом с School Jeans.",
    sizes: ["S", "M", "L", "XL"],
    collection: "school",
  },
  {
    id: "el-shirt",
    name: "LOG SHIRT // BLACK",
    price: 3500,
    images: ["/el_shirt.jpg"],
    description:
      "Футболка с логотипом. Доступна только в комплекте с джинсами SCHOOL JEANS.",
    sizes: ["S", "M", "L", "XL"],
    collection: "school",
    hidden: true,
  },
  {
    id: "hat-sex",
    name: "HAT - SEX",
    price: 750,
    images: ["/hat_front.jpg", "/hat_glav.jpg"],
    description: "Очень теплая шапка. Плотная вязка, не продувает.",
    sizes: ["S", "M"],
    collection: "accessories",
    hasSizeGuide: true,
  },
  {
    id: "hoodie-tvar",
    name: "TVAR HOODIE // BLACK",
    price: 5500,
    images: ["/tvar-front.jpg", "/tvar-glav.jpg"],
    description:
      "Новый худи из коллекции TVAR. Плотный хлопок, агрессивный крой.",
    sizes: ["S", "M", "L", "XL"],
    collection: "tvar",
  },
  {
    id: "vlad-tee",
    name: "VLAD DROBYSHEV // TEE",
    price: 4500,
    images: ["/vlad-tee-front.jpg", "/vlad-tee-full1.jpg", "/vlad-tee-full2.jpg"],
    description:
      "Футболка из коллекции, посвященной Владу. Уникальный крой и принт.",
    sizes: ["S", "M", "L", "XL"],
    collection: "vlad",
  },
  {
    id: "vlad-ls",
    name: "VLAD DROBYSHEV // LONGSLEEVE",
    price: 5900,
    images: ["/vlad-ls-front.jpg", "/vlad-ls-full.jpg", "/vlad-ls-full1.jpg"],
    description: "Лонгслив с агрессивным дизайном. Плотный хлопок.",
    sizes: ["S", "M", "L", "XL"],
    collection: "vlad",
  },
  {
    id: "vlad-cape",
    name: "VLAD DROBYSHEV // CAPE",
    price: 7500,
    images: [
      "/vlad-cape-front.jpg",
      "/vlad-cape-full.jpg",
      "/vlad-cape-full1.jpg",
      "/vlad-cape-full2.jpg",
    ],
    description:
      "Накидка для завершения образа из коллекции ВЛАД ДРОБЫШЕВ.",
    sizes: ["S", "M", "L", "XL"],
    collection: "vlad",
  },
  {
    id: "hat-test-2",
    name: "ШАПКА ТЕСТ-2 // GREY",
    price: 2000,
    images: [
      "/test-front.jpg",
      "/test-full.jpg",
      "/test-full1.jpg",
      "/test-full2.jpg",
      "/test-full3.jpg",
    ],
    description:
      "Материал: 100% хлопок. Принт 'ТЕСТ-2'. Размер универсальный.",
    sizes: ["ONE SIZE"],
    collection: "test",
  },
  {
    id: "hoodie-spasibo",
    name: "ХУДИ СПАСИБО // BLACK",
    price: 5000,
    images: ["/hodie-thanks.jpg"],
    description:
      "Довольно давняя работа. Сделал базовый худак для повседневной носки.",
    sizes: ["L"],
    collection: "archive",
  },
  {
    id: "fuck-its-evs-top",
    name: "FUCK IT'S EVS // TOP",
    price: 3500,
    images: ["/product2.jpg"],
    description: "Укороченный топ с агрессивным принтом. Плотный хлопок.",
    sizes: ["S", "M", "L", "XL"],
    collection: "18plus",
  },
  {
    id: "18-plus-w-evs-top",
    name: "18+ W EVS // TOP",
    price: 3500,
    images: ["/18+w-front.jpg", "/18+w-full1.jpg", "/18+w-full2.jpg"],
    description: "Белый топ с красным трафаретным принтом. Оверсайз крой.",
    sizes: ["S", "M", "L", "XL"],
    collection: "18plus",
  },
  {
    id: "18-plus-evs-top",
    name: "18+ EVS // TOP",
    price: 3500,
    images: ["/18+-front.jpg", "/18+-full1.jpg", "/18+-full2.jpg", "/18+-full3.jpg"],
    description: "Черный топ с оранжевым принтом. Укороченная длина.",
    sizes: ["S", "M", "L", "XL"],
    collection: "18plus",
  },
  {
    id: "distressed-pants",
    name: "DISTRESSED PANTS",
    price: 7990,
    images: [
      "/dipa-front.jpg",
      "/dipa-back.jpg",
      "/dipa-full.jpg",
      "/dipa-full2.jpg",
      "/dipa-glav.jpg",
    ],
    description: "Джинсы с эффектом дистресс из коллекции DIPA.",
    sizes: ["S", "M", "L", "XL"],
    collection: "dipa",
    hasSizeGuide: true,
  },
  {
    id: "radioevs-shirt",
    name: "RADIOEVS SHIRT // INSPIRED BY RADIOHEAD",
    price: 5990,
    images: [
      "/radioevs-shirt-front.jpg",
      "/radioevs-shirt-full.jpg",
      "/radioevs-shirt-full2.jpg",
      "/radioevs-shirt-full3.jpg",
      "/radioevs-shirt-full4.jpg",
      "/radioevs-shirt-full5.jpg",
    ],
    description: "Футболка, созданная по вдохновению группой Radiohead.",
    sizes: ["S", "M", "L", "XL"],
    collection: "radioevs",
  },
  {
    id: "redholes-pants",
    name: "RED HOLES PANTS // DISTRESSED",
    price: 8490,
    images: [
      "/redholes-front.jpg",
      "/redholes-back.jpg",
      "/redholes-full.jpg",
      "/redholes-full2.jpg",
      "/redholes-full3.jpg",
    ],
    description: "Штаны с огромными дырками на коленях.",
    sizes: ["S", "M", "L", "XL"],
    collection: "dipa",
    hasSizeGuide: true,
  },
  {
    id: "krest-jacket",
    name: "KREST JACKET // CRUSADER",
    price: 18990,
    images: [
      "/krest-jacket-front.jpg",
      "/krest-jacket-double.jpg",
      "/krest-jacket-full.jpg",
    ],
    description:
      "Куртка выполнена по технике сшивания множества маленьких кусочков ткани.",
    sizes: ["S", "M", "L", "XL"],
    collection: "archive",
  },
  {
    id: "psyho-jacket",
    name: "PSYHO JACKET // SLIM FIT",
    price: 14990,
    images: ["/psyho-jacket-front.jpg", "/psyho-jacket-full.jpg"],
    description: "Эта куртка выполнена в слим фит.",
    sizes: ["S", "M", "L", "XL"],
    collection: "archive",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

/** Детерминированное форматирование цены (одинаково на сервере и клиенте) */
export function formatPrice(value: number): string {
  const rounded = Math.round(value);
  return `${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")} ₽`;
}

/**
 * Считает итоги корзины по каталогу.
 * Одна и та же функция используется для витрины, корзины и серверного платежа,
 * поэтому клиент не может подменить цену.
 */
export function computeTotals(lines: CartLine[]) {
  const items = lines
    .map((line) => ({ ...line, product: getProduct(line.id) }))
    .filter(
      (line): line is CartLine & { product: Product } =>
        Boolean(line.product) && line.quantity > 0
    );

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const hasBundle = BUNDLE_IDS.every((id) =>
    items.some((item) => item.id === id)
  );

  const bundleSubtotal = items
    .filter((item) => (BUNDLE_IDS as readonly string[]).includes(item.id))
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discount = hasBundle ? Math.round(bundleSubtotal * BUNDLE_DISCOUNT) : 0;

  return {
    items,
    subtotal,
    discount,
    total: subtotal - discount,
    hasBundle,
  };
}
