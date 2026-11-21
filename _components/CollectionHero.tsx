import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  tag: string;
  description: string;
  poster: string;
  video?: string;
  year: string;
  count: number;
};

export default function CollectionHero({
  title,
  tag,
  description,
  poster,
  video,
  year,
  count,
}: Props) {
  return (
    <section className="relative h-[82svh] max-h-[920px] min-h-[540px] overflow-hidden bg-ink text-paper">
      {video ? (
        <video
          src={video}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={poster}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-ink/85" />

      <div className="absolute inset-x-0 top-0">
        <div className="wrap flex items-center justify-between py-5 text-[9px] uppercase tracking-[0.2em] text-paper/65">
          <Link href="/collections" className="u-link hover:text-paper">
            ← Все коллекции
          </Link>
          <span>
            {year} / {String(count).padStart(2, "0")} вещи
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="wrap pb-8 md:pb-12">
          <p className="eyebrow rise text-paper">{tag}</p>
          <h1 className="display rise rise-1 mt-4 text-[clamp(2.8rem,9vw,8.5rem)]">{title}</h1>
          <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,460px)_auto] md:items-end md:justify-between">
            <p className="text-[12px] leading-relaxed text-paper/65 md:text-[13px]">
              {description}
            </p>
            <span className="hidden items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-paper/50 md:flex">
              Скролл вниз
              <span className="h-8 w-px bg-paper/30" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
