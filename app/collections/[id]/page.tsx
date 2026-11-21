import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CollectionFallback({ params }: Props) {
  const { id } = await params;

  return (
    <main className="wrap flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow text-muted">Collection / 404</p>
      <h1 className="display mt-4 text-[clamp(2.4rem,7vw,5.5rem)]">
        КОЛЛЕКЦИЯ
        <br />
        НЕ НАЙДЕНА
      </h1>
      <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
        Капсулы «{id}» нет в архиве. Возможно, ссылка устарела — посмотрите
        актуальные коллекции или весь магазин.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/collections"
          className="bg-ink px-7 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-acid hover:text-ink"
        >
          Все коллекции
        </Link>
        <Link
          href="/catalog"
          className="border border-ink px-7 py-4 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
        >
          В магазин
        </Link>
      </div>
    </main>
  );
}
