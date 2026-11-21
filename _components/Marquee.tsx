type Props = {
  items: string[];
  /** Длительность полного прохода, например "32s" */
  speed?: string;
  className?: string;
  itemClassName?: string;
  separator?: string;
  reverse?: boolean;
};

/**
 * Бесконечная бегущая строка на чистом CSS.
 * Контент дублируется, поэтому трек всегда шире экрана.
 */
export default function Marquee({
  items,
  speed = "34s",
  className = "",
  itemClassName = "",
  separator = "✦",
  reverse = false,
}: Props) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((text, index) => (
        <span key={`${text}-${index}`} className="flex items-center whitespace-nowrap">
          <span className={itemClassName}>{text}</span>
          <span aria-hidden className="mx-5 text-[0.55em] opacity-40">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee-track"
        style={{
          animationDuration: speed,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row}
        <div aria-hidden>{row}</div>
      </div>
    </div>
  );
}
