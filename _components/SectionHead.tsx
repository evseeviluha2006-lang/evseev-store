import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  href?: string;
  link?: string;
  className?: string;
};

export default function SectionHead({
  eyebrow,
  title,
  href,
  link = "Смотреть всё",
  className = "",
}: Props) {
  return (
    <div className={`flex items-end justify-between gap-6 border-b border-line pb-4 md:pb-5 ${className}`}>
      <div>
        <p className="eyebrow text-muted">{eyebrow}</p>
        <h2 className="display-sm mt-2.5 text-[clamp(1.75rem,4.2vw,3.3rem)]">{title}</h2>
      </div>

      {href && (
        <Link
          href={href}
          className="u-link group shrink-0 pb-1 text-[9px] font-medium uppercase tracking-[0.2em] md:text-[10px]"
        >
          {link}
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      )}
    </div>
  );
}
