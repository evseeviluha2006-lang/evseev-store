// Витринные данные коллекций: используются на главной и в разделе /collections.

export type CollectionMeta = {
  slug: string;
  title: string;
  tag: string;
  year: string;
  cover: string;
  href: string;
  description: string;
  count: number;
};

export const collections: CollectionMeta[] = [
  {
    slug: "winter-2-6",
    title: "WINTER 2.6",
    tag: "ESSENTIALS & GRAPHICS",
    year: "2026",
    cover: "/winter26-cover.jpg",
    href: "/collections/winter-2-6",
    description:
      "Базовые вещи с графикой: худи, топы и шапки. Коллекция про холодный город и плотные слои.",
    count: 3,
  },
  {
    slug: "distressed",
    title: "DISTRESSED",
    tag: "SEASON 01",
    year: "2024",
    cover: "/distress-cover.jpg",
    href: "/collections/distressed",
    description:
      "Коллекция о разрушении и восстановлении. Потертости, разрывы и выцветшие участки — не дефекты, а история.",
    count: 5,
  },
  {
    slug: "vlad-drobyshev",
    title: "ВЛАД ДРОБЫШЕВ",
    tag: "FRIENDSHIP COLLECTION",
    year: "2025",
    cover: "/vlad-drobyshev-cover.jpg",
    href: "/collections/vlad-drobyshev",
    description:
      "Капсула, посвященная другу. Три вещи, собранные в один образ: футболка, лонгслив и накидка.",
    count: 3,
  },
];

/** Человекочитаемые подписи для поля collection товара */
export const collectionLabels: Record<string, string> = {
  archive: "ARCHIVE",
  school: "SCHOOL JEANS",
  tvar: "TVAR",
  vlad: "VLAD DROBYSHEV",
  dipa: "DIPA",
  "18plus": "18+",
  accessories: "ACCESSORIES",
  keychains: "KEYCHAINS",
  test: "TEST",
  radioevs: "RADIOEVS",
  winter: "WINTER 2.6",
  capsule: "CAPSULE DROP",
};

export function collectionLabel(collection: string) {
  return collectionLabels[collection] ?? collection.toUpperCase();
}
